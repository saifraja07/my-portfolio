import { BufferAttribute, BufferGeometry, Color, LineSegments, Points, ShaderMaterial } from 'three'
import { MIN_PARTICLES, SCENE } from './config.js'

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

const rand = (min, max) => min + Math.random() * (max - min)

/**
 * Owns the Points + LineSegments objects and all of their buffers. Everything is allocated once
 * up front (sized for the worst case); frames only write into existing typed arrays.
 */
export function createParticleSystem({ color, maxParticles, maxLinks }) {
  const total = Math.max(maxParticles, MIN_PARTICLES)

  // Simulation state, in normalised screen space (u, v) plus a fixed world depth (z).
  const u = new Float32Array(total)
  const v = new Float32Array(total)
  const z = new Float32Array(total)
  const du = new Float32Array(total)
  const dv = new Float32Array(total)
  const alphaOf = new Float32Array(total)
  // World-space positions for the current frame (read by the link pass).
  const wx = new Float32Array(total)
  const wy = new Float32Array(total)
  const order = new Uint16Array(total)

  const positions = new Float32Array(total * 3)
  const sizes = new Float32Array(total)
  const pointAlpha = new Float32Array(total)

  for (let i = 0; i < total; i++) {
    u[i] = rand(-SCENE.margin, SCENE.margin)
    v[i] = rand(-SCENE.margin, SCENE.margin)
    z[i] = rand(SCENE.depthFar, SCENE.depthNear)
    const depth = (z[i] - SCENE.depthFar) / (SCENE.depthNear - SCENE.depthFar) // 0 far … 1 near
    const speed = rand(SCENE.drift[0], SCENE.drift[1]) * (0.7 + depth * 0.6)
    const angle = rand(0, Math.PI * 2)
    du[i] = Math.cos(angle) * speed
    dv[i] = Math.sin(angle) * speed
    sizes[i] = rand(SCENE.size[0], SCENE.size[1]) * (0.75 + depth * 0.5)
    alphaOf[i] = 0.3 + depth * 0.7
    pointAlpha[i] = alphaOf[i]
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

  // Link buffers are sized for the worst case; only the used range is drawn.
  const linkPositions = new Float32Array(Math.max(maxLinks, 1) * 6)
  const linkAlpha = new Float32Array(Math.max(maxLinks, 1) * 2)
  const lineGeometry = new BufferGeometry()
  lineGeometry.setAttribute('position', new BufferAttribute(linkPositions, 3))
  lineGeometry.setAttribute('aAlpha', new BufferAttribute(linkAlpha, 1))
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
  lines.visible = maxLinks > 0

  let count = 0
  let linkLimit = 0
  let linkDistance = 0
  let linksOn = false
  let tanHalf = Math.tan((SCENE.fov * Math.PI) / 360)
  let aspect = 1
  let camZ = 1000

  function setActive({ particles, links, distance }) {
    const next = Math.min(total, Math.max(1, particles))
    if (next !== count) {
      count = next
      for (let i = 0; i < count; i++) order[i] = i // identity; insertion sort re-sorts cheaply
    }
    linksOn = links && maxLinks > 0
    linkLimit = linksOn ? maxLinks : 0
    linkDistance = distance
    pointGeometry.setDrawRange(0, count)
    lines.visible = linksOn
    if (!linksOn) lineGeometry.setDrawRange(0, 0)
  }

  function setView({ cameraZ, viewAspect, pixelRatio }) {
    camZ = cameraZ
    aspect = viewAspect
    tanHalf = Math.tan((SCENE.fov * Math.PI) / 360)
    pointUniforms.uCamZ.value = cameraZ
    pointUniforms.uPixelRatio.value = pixelRatio
  }

  function setOpacity({ pointOpacity, lineOpacity }) {
    pointUniforms.uOpacity.value = pointOpacity
    lineUniforms.uOpacity.value = lineOpacity
  }

  /** Advance the simulation by `dt` seconds (0 = just lay particles out) and refill buffers. */
  function update(dt) {
    const m = SCENE.margin
    for (let i = 0; i < count; i++) {
      let ui = u[i] + du[i] * dt
      let vi = v[i] + dv[i] * dt
      if (ui > m) ui -= 2 * m
      else if (ui < -m) ui += 2 * m
      if (vi > m) vi -= 2 * m
      else if (vi < -m) vi += 2 * m
      u[i] = ui
      v[i] = vi
      const halfH = (camZ - z[i]) * tanHalf
      const x = ui * halfH * aspect
      const y = vi * halfH
      wx[i] = x
      wy[i] = y
      const o = i * 3
      positions[o] = x
      positions[o + 1] = y
    }
    pointGeometry.attributes.position.needsUpdate = true

    if (!linksOn) return

    // Sweep-and-prune over x: insertion sort is ~O(n) because order barely changes frame to frame,
    // and the inner loop stops as soon as x-distance exceeds the link distance.
    for (let a = 1; a < count; a++) {
      const idx = order[a]
      const x = wx[idx]
      let b = a - 1
      while (b >= 0 && wx[order[b]] > x) {
        order[b + 1] = order[b]
        b--
      }
      order[b + 1] = idx
    }

    const limit = linkDistance
    const limit2 = limit * limit
    let n = 0
    for (let a = 0; a < count && n < linkLimit; a++) {
      const i = order[a]
      const xi = wx[i]
      const yi = wy[i]
      const zi = z[i]
      for (let b = a + 1; b < count; b++) {
        const j = order[b]
        const dx = wx[j] - xi
        if (dx > limit) break
        const dy = wy[j] - yi
        if (dy > limit || dy < -limit) continue
        const dz = z[j] - zi
        const d2 = dx * dx + dy * dy + dz * dz
        if (d2 >= limit2) continue
        const fade = 1 - Math.sqrt(d2) / limit
        const alpha = fade * Math.min(alphaOf[i], alphaOf[j])
        const o = n * 6
        linkPositions[o] = xi
        linkPositions[o + 1] = yi
        linkPositions[o + 2] = zi
        linkPositions[o + 3] = wx[j]
        linkPositions[o + 4] = wy[j]
        linkPositions[o + 5] = z[j]
        linkAlpha[n * 2] = alpha
        linkAlpha[n * 2 + 1] = alpha
        if (++n >= linkLimit) break
      }
    }
    lineGeometry.setDrawRange(0, n * 2)
    lineGeometry.attributes.position.needsUpdate = true
    lineGeometry.attributes.aAlpha.needsUpdate = true
  }

  function dispose() {
    pointGeometry.dispose()
    pointMaterial.dispose()
    lineGeometry.dispose()
    lineMaterial.dispose()
  }

  return { points, lines, total, setActive, setView, setOpacity, update, dispose }
}
