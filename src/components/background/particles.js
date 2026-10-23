import { BufferAttribute, BufferGeometry, Color, DynamicDrawUsage, LineSegments, Points, ShaderMaterial } from 'three'
import { CURSOR, MIN_PARTICLES, SCENE } from './config.js'

// Points are drawn as soft round sprites; size is in CSS px at the z=0 plane and scales with depth.
const POINT_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  uniform float uPixelRatio;
  uniform float uCamZ;
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    gl_PointSize = aSize * uPixelRatio * (uCamZ / (uCamZ - position.z));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const POINT_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.3, d);
    gl_FragColor = vec4(uColor, a * vAlpha * uOpacity);
    #include <colorspace_fragment>
  }
`
const LINE_VERT = /* glsl */ `
  attribute float aAlpha;
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const LINE_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(uColor, vAlpha * uOpacity);
    #include <colorspace_fragment>
  }
`

const INACTIVE_CURSOR = { active: false, x: 0, y: 0 }
const rand = (min, max) => min + Math.random() * (max - min)

// Particles live in a region slightly larger than the screen and wrap around its edge. The strip
// outside the screen can be narrower than the connection radius, so a wrapping particle's lines would
// vanish while still partly visible. This factor is 1 up to `start` (the screen edge) and eases to 0
// at the wrap seam `seam`; lines are scaled by it, so they fade out BEFORE the jump, entirely off
// screen. It never affects a particle that is on screen.
function seamFade(p, start, seam) {
  const a = Math.abs(p)
  if (a <= start || seam <= start) return 1
  const t = (seam - a) / (seam - start)
  return t <= 0 ? 0 : t * t * (3 - 2 * t)
}

/**
 * Owns the Points + LineSegments objects and all of their buffers. Everything is allocated once
 * up front (sized for the worst case); frames only write into existing typed arrays.
 *
 * Connection rule (one rule for every pair, cursor included): two points are connected while the
 * distance between them ON SCREEN (CSS px, after perspective + parallax) is below the radius.
 * Nothing is remembered between frames: eligibility is recomputed from current positions, and the
 * line opacity is a continuous function of that distance (1 when touching, 0 at the radius), so a
 * connection fades in as a point enters the radius and fades out as it leaves, without popping.
 *
 * There is no connection cap. The line buffers are sized for EVERY possible pair, so no eligible
 * pair can ever be dropped. See `pairCapacity` below.
 */
export function createParticleSystem({ color, maxParticles }) {
  const total = Math.max(maxParticles, MIN_PARTICLES)

  // Simulation state, in normalised screen space (u, v) plus a fixed world depth (z).
  const u = new Float32Array(total)
  const v = new Float32Array(total)
  const z = new Float32Array(total)
  // Heading + speed + a slow sinusoidal "wander" of the heading give curved, organic paths.
  const heading = new Float32Array(total)
  const speed = new Float32Array(total)
  const wanderRate = new Float32Array(total)
  const wanderPhase = new Float32Array(total)
  const alphaOf = new Float32Array(total)
  // 0..1 line-opacity factor that hides the wrap-around seam (see seamFade); 1 everywhere on screen.
  const edge = new Float32Array(total)
  // World-space positions for the current frame (the endpoints that get drawn).
  const wx = new Float32Array(total)
  const wy = new Float32Array(total)
  // Screen-space positions (CSS px) for the current frame: what the proximity rule measures.
  const sx = new Float32Array(total)
  const sy = new Float32Array(total)
  // Particle indices sorted by screen x (sweep-and-prune order).
  const order = new Uint16Array(total)

  const positions = new Float32Array(total * 3)
  const sizes = new Float32Array(total)
  const pointAlpha = new Float32Array(total)

  for (let i = 0; i < total; i++) {
    u[i] = rand(-SCENE.margin, SCENE.margin)
    v[i] = rand(-SCENE.margin, SCENE.margin)
    z[i] = rand(SCENE.depthFar, SCENE.depthNear)
    const depth = (z[i] - SCENE.depthFar) / (SCENE.depthNear - SCENE.depthFar) // 0 far … 1 near
    const spd = rand(SCENE.drift[0], SCENE.drift[1]) * (0.7 + depth * 0.6)
    heading[i] = rand(0, Math.PI * 2)
    speed[i] = spd
    wanderRate[i] = rand(SCENE.wander[0], SCENE.wander[1])
    wanderPhase[i] = rand(0, Math.PI * 2)
    sizes[i] = rand(SCENE.size[0], SCENE.size[1]) * (0.75 + depth * 0.5)
    alphaOf[i] = 0.3 + depth * 0.7
    pointAlpha[i] = alphaOf[i]
    edge[i] = 1
    positions[i * 3 + 2] = z[i]
  }

  const rgb = new Color(color)
  const pointUniforms = {
    uColor: { value: rgb },
    uOpacity: { value: 0.6 },
    uPixelRatio: { value: 1 },
    uCamZ: { value: 1000 },
  }
  const lineUniforms = { uColor: { value: rgb }, uOpacity: { value: 0.2 } }

  const pointGeometry = new BufferGeometry()
  pointGeometry.setAttribute('position', new BufferAttribute(positions, 3))
  pointGeometry.setAttribute('aSize', new BufferAttribute(sizes, 1))
  pointGeometry.setAttribute('aAlpha', new BufferAttribute(pointAlpha, 1))

  const pointMaterial = new ShaderMaterial({
    uniforms: pointUniforms,
    vertexShader: POINT_VERT,
    fragmentShader: POINT_FRAG,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  })
  const points = new Points(pointGeometry, pointMaterial)
  points.frustumCulled = false
  points.renderOrder = 2

  // ---- Line buffers: sized so that EVERY possible connection fits, so nothing is ever dropped ----
  // Each unordered pair is visited at most once per frame, so the number of ambient segments can
  // never exceed C(total, 2) (230 particles -> 26,335 segments, ~0.8 MB of float data once; in
  // practice a few hundred to a couple of thousand are eligible). The cursor adds at most one
  // segment per particle. Because capacity >= the mathematical maximum, no cap check is needed.
  const pairCapacity = (total * (total - 1)) / 2
  const cursorCapacity = total

  const linkPositions = new Float32Array(Math.max(pairCapacity, 1) * 6)
  const linkAlpha = new Float32Array(Math.max(pairCapacity, 1) * 2)
  const lineGeometry = new BufferGeometry()
  lineGeometry.setAttribute('position', new BufferAttribute(linkPositions, 3).setUsage(DynamicDrawUsage))
  lineGeometry.setAttribute('aAlpha', new BufferAttribute(linkAlpha, 1).setUsage(DynamicDrawUsage))
  lineGeometry.setDrawRange(0, 0)
  const lineMaterial = new ShaderMaterial({
    uniforms: lineUniforms,
    vertexShader: LINE_VERT,
    fragmentShader: LINE_FRAG,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  })
  const lines = new LineSegments(lineGeometry, lineMaterial)
  lines.frustumCulled = false
  lines.renderOrder = 1

  // ---- Cursor web: its own buffers/material so distance + intensity tune independently ----
  const cursorPositions = new Float32Array(cursorCapacity * 6)
  const cursorAlpha = new Float32Array(cursorCapacity * 2)
  const cursorGeometry = new BufferGeometry()
  cursorGeometry.setAttribute('position', new BufferAttribute(cursorPositions, 3).setUsage(DynamicDrawUsage))
  cursorGeometry.setAttribute('aAlpha', new BufferAttribute(cursorAlpha, 1).setUsage(DynamicDrawUsage))
  cursorGeometry.setDrawRange(0, 0)
  const cursorUniforms = { uColor: { value: rgb }, uOpacity: { value: 0.9 } }
  const cursorMaterial = new ShaderMaterial({
    uniforms: cursorUniforms,
    vertexShader: LINE_VERT,
    fragmentShader: LINE_FRAG,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  })
  const cursorLines = new LineSegments(cursorGeometry, cursorMaterial)
  cursorLines.frustumCulled = false
  cursorLines.renderOrder = 3 // drawn over the ambient web

  let time = 0
  let viewW = 1
  let viewH = 1
  let cursorRadius = 0
  let count = 0
  let linkDistance = 0
  let linksOn = false
  // 0..1: how "present" the cursor is. Eases in when the pointer is in the viewport and out when it
  // leaves, so the whole cursor web fades as one instead of popping. It is the only cursor state.
  let presence = 0
  let tanHalf = Math.tan((SCENE.fov * Math.PI) / 360)
  let aspect = 1
  let camZ = 1000

  // Last-frame connection counts (for inspection/tests; not used for rendering).
  const stats = { particles: 0, links: 0, cursorLinks: 0, linkCapacity: pairCapacity, cursorCapacity }

  function setActive({ particles, links, distance, radius }) {
    const next = Math.min(total, Math.max(1, particles))
    if (next !== count) {
      count = next
      for (let i = 0; i < count; i++) order[i] = i // identity; insertion sort re-sorts cheaply
    }
    linksOn = links
    linkDistance = distance
    cursorRadius = radius
    stats.particles = count
    pointGeometry.setDrawRange(0, count)
    lines.visible = linksOn
    if (!linksOn) lineGeometry.setDrawRange(0, 0)
  }

  function setView({ cameraZ, viewAspect, pixelRatio, width, height }) {
    camZ = cameraZ
    aspect = viewAspect
    viewW = width
    viewH = height
    tanHalf = Math.tan((SCENE.fov * Math.PI) / 360)
    pointUniforms.uCamZ.value = cameraZ
    pointUniforms.uPixelRatio.value = pixelRatio
  }

  function setOpacity({ pointOpacity, lineOpacity, cursorOpacity }) {
    pointUniforms.uOpacity.value = pointOpacity
    lineUniforms.uOpacity.value = lineOpacity
    cursorUniforms.uOpacity.value = cursorOpacity
  }

  /** Publish `segments` line segments: draw exactly those, and upload only the bytes that changed. */
  function flushLines(geometry, segments) {
    geometry.setDrawRange(0, segments * 2) // anything beyond this is never drawn, so no stale lines
    if (segments === 0) return
    const position = geometry.attributes.position
    const alpha = geometry.attributes.aAlpha
    position.clearUpdateRanges()
    position.addUpdateRange(0, segments * 6)
    position.needsUpdate = true
    alpha.clearUpdateRanges()
    alpha.addUpdateRange(0, segments * 2)
    alpha.needsUpdate = true
  }

  /**
   * Cursor web. The cursor is one extra node in the same screen-space proximity rule: EVERY
   * particle inside `cursorRadius` is joined to it, with a line that fades with distance. The
   * cursor end of each line is placed at the particle's own depth so it projects exactly onto the
   * visible pointer, whatever the camera parallax is. Runs every frame, so a stationary cursor
   * keeps gaining and losing connections as particles drift through its radius.
   */
  function updateCursor(dt, camX, camY, cursor) {
    const active = cursor.active && cursorRadius > 0
    if (dt === 0 && !active) {
      presence = 0 // static frame: no lingering lines
    } else {
      const rate = active ? CURSOR.attack : CURSOR.release
      presence += ((active ? 1 : 0) - presence) * (1 - Math.exp(-rate * dt))
      if (presence < 0.01 && !active) presence = 0
    }
    if (presence === 0) {
      stats.cursorLinks = 0
      cursorGeometry.setDrawRange(0, 0)
      return
    }

    const radius = cursorRadius
    const r2 = radius * radius
    let n = 0
    for (let i = 0; i < count; i++) {
      const dx = sx[i] - cursor.x
      const dy = sy[i] - cursor.y
      const d2 = dx * dx + dy * dy
      if (d2 >= r2) continue
      // Continuous in d: 0 at the radius edge, so entering/leaving never pops.
      const alpha = presence * Math.pow(1 - Math.sqrt(d2) / radius, CURSOR.falloff) * edge[i]
      const halfH = (camZ - z[i]) * tanHalf
      const halfW = halfH * aspect
      // Cursor position expressed at this particle's depth (so the line is straight on screen).
      const cx = ((cursor.x / viewW) * 2 - 1) * halfW + camX
      const cy = (1 - (cursor.y / viewH) * 2) * halfH + camY
      const o = n * 6
      cursorPositions[o] = cx
      cursorPositions[o + 1] = cy
      cursorPositions[o + 2] = z[i]
      cursorPositions[o + 3] = wx[i]
      cursorPositions[o + 4] = wy[i]
      cursorPositions[o + 5] = z[i]
      cursorAlpha[n * 2] = alpha
      cursorAlpha[n * 2 + 1] = alpha * CURSOR.particleEndFade * (0.6 + 0.4 * alphaOf[i])
      n++ // n <= count <= cursorCapacity: one segment per particle at most
    }
    stats.cursorLinks = n
    flushLines(cursorGeometry, n)
  }

  /** Ambient web: connect every pair of particles closer than `linkDistance` on screen. */
  function updateLinks() {
    // Sweep-and-prune over screen x. Insertion sort is ~O(n) because the order barely changes from
    // frame to frame (and a particle that wraps around the screen is just one long shift).
    for (let a = 1; a < count; a++) {
      const idx = order[a]
      const x = sx[idx]
      let b = a - 1
      while (b >= 0 && sx[order[b]] > x) {
        order[b + 1] = order[b]
        b--
      }
      order[b + 1] = idx
    }

    // Visit every unordered pair exactly once, from its left-hand member. The inner loop stops as
    // soon as the x gap alone reaches the radius (all later particles are even further right), so
    // it skips only pairs that are provably out of range. There is deliberately NO early exit based
    // on how many links were found, so no region of the screen is favoured over another.
    const limit = linkDistance
    const limit2 = limit * limit
    let n = 0
    for (let a = 0; a < count; a++) {
      const i = order[a]
      const xi = sx[i]
      const yi = sy[i]
      for (let b = a + 1; b < count; b++) {
        const j = order[b]
        const dx = sx[j] - xi
        if (dx >= limit) break
        const dy = sy[j] - yi
        if (dy >= limit || dy <= -limit) continue
        const d2 = dx * dx + dy * dy
        if (d2 >= limit2) continue
        // Continuous in d: 0 at the radius edge, strongest when close.
        const alpha = (1 - Math.sqrt(d2) / limit) * Math.min(alphaOf[i], alphaOf[j]) * edge[i] * edge[j]
        const o = n * 6
        linkPositions[o] = wx[i]
        linkPositions[o + 1] = wy[i]
        linkPositions[o + 2] = z[i]
        linkPositions[o + 3] = wx[j]
        linkPositions[o + 4] = wy[j]
        linkPositions[o + 5] = z[j]
        linkAlpha[n * 2] = alpha
        linkAlpha[n * 2 + 1] = alpha
        n++ // each pair is visited once, so n <= C(count, 2) <= pairCapacity
      }
    }
    stats.links = n
    flushLines(lineGeometry, n)
  }

  /** Advance the simulation by `dt` seconds (0 = just lay particles out) and refill buffers. */
  function update(dt, camX = 0, camY = 0, cursor = INACTIVE_CURSOR) {
    time += dt
    const m = SCENE.margin
    for (let i = 0; i < count; i++) {
      // Elapsed-time based: speed is independent of frame rate.
      const a = heading[i] + Math.sin(time * wanderRate[i] + wanderPhase[i]) * 0.9
      let ui = u[i] + Math.cos(a) * speed[i] * dt
      let vi = v[i] + Math.sin(a) * speed[i] * dt
      if (ui > m) ui -= 2 * m
      else if (ui < -m) ui += 2 * m
      if (vi > m) vi -= 2 * m
      else if (vi < -m) vi += 2 * m
      u[i] = ui
      v[i] = vi
      const halfH = (camZ - z[i]) * tanHalf
      const halfW = halfH * aspect
      const x = ui * halfW
      const y = vi * halfH
      wx[i] = x
      wy[i] = y
      // Fade starts at the screen edge, pushed out by the largest parallax shift so a particle that is
      // visible is never dimmed.
      edge[i] = seamFade(ui, 1 + SCENE.parallax / halfW, m) * seamFade(vi, 1 + SCENE.parallax / halfH, m)
      // Where this particle actually appears on screen (CSS px), parallax included.
      sx[i] = (ui - camX / halfW) * 0.5 * viewW + viewW * 0.5
      sy[i] = viewH * 0.5 - (vi - camY / halfH) * 0.5 * viewH
      const o = i * 3
      positions[o] = x
      positions[o + 1] = y
    }
    pointGeometry.attributes.position.needsUpdate = true

    updateCursor(dt, camX, camY, cursor)
    if (linksOn) updateLinks()
    else stats.links = 0
  }

  function dispose() {
    pointGeometry.dispose()
    pointMaterial.dispose()
    lineGeometry.dispose()
    lineMaterial.dispose()
    cursorGeometry.dispose()
    cursorMaterial.dispose()
  }

  return { points, lines, cursorLines, total, stats, setActive, setView, setOpacity, update, dispose }
}
