import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { createParticleSystem } from './particles.js'
import {
  CURSOR,
  GOVERNOR,
  LEVELS,
  MIN_PARTICLES,
  PARTICLE_COLOR,
  RESPECT_REDUCED_MOTION,
  SCENE,
  THEME_OPACITY,
  TIERS,
} from './config.js'

const warn = (...args) => {
  if (import.meta.env.DEV) console.warn('[ThreeBackground]', ...args)
}

// Pick a starting tier from device hints (not just screen width). The governor can still step down.
function detectTier() {
  const nav = navigator
  const cores = nav.hardwareConcurrency || 4
  const memory = nav.deviceMemory || 4
  const coarse = window.matchMedia('(pointer: coarse)').matches
  if (nav.connection?.saveData || cores <= 2 || memory <= 2) return 'low'
  if (coarse || cores <= 4 || memory <= 4) return 'medium'
  return 'high'
}

const readTheme = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

/**
 * Creates the single shared renderer/scene/loop inside `container`.
 * Returns `{ dispose }`, or `null` if WebGL is unavailable (the page is left untouched).
 */
export function createBackgroundScene(container) {
  const tier = TIERS[detectTier()]

  // Acquire the WebGL2 context ourselves so that an unsupported browser takes this quiet path
  // (Three.js would otherwise log a console error before throwing).
  const canvas = document.createElement('canvas')
  let gl = null
  try {
    gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: tier.antialias,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    })
  } catch (error) {
    warn('Could not create a WebGL context.', error)
  }
  if (!gl) return null // the page is left exactly as it was

  let renderer
  try {
    renderer = new WebGLRenderer({ canvas, context: gl, alpha: true, antialias: tier.antialias })
  } catch (error) {
    warn('Renderer initialisation failed; background disabled.', error)
    return null
  }

  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.cssText = 'display:block;width:100%;height:100%;pointer-events:none'
  renderer.setClearColor(0x000000, 0)
  container.replaceChildren(canvas) // never more than one canvas in the layer

  const scene = new Scene()
  const camera = new PerspectiveCamera(SCENE.fov, 1, 10, 2000)
  const system = createParticleSystem({ color: PARTICLE_COLOR, maxParticles: tier.maxParticles })
  scene.add(system.lines, system.cursorLines, system.points)

  // ---- state ----
  let disposed = false
  let failed = false
  let raf = 0
  let lastTime = 0
  let width = 1
  let height = 1
  let level = LEVELS.length - 1
  let govFrames = 0
  let govTime = 0
  let warmup = GOVERNOR.warmupFrames
  let pointerX = 0
  let pointerY = 0
  let camX = 0
  let camY = 0
  let contextLost = false
  const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let reduceMotion = RESPECT_REDUCED_MOTION && reduceQuery.matches
  // Pointer position in canvas CSS px (the layer is fixed at the viewport's top-left).
  const cursor = { active: false, x: 0, y: 0 }
  let layerLeft = 0
  let layerTop = 0
  if (reduceMotion) warn('prefers-reduced-motion is on: the background is static. See RESPECT_REDUCED_MOTION in config.js.')

  function applyQuality() {
    const lv = LEVELS[level]
    const diagonal = Math.hypot(width, height)
    const base = Math.round((width * height) / tier.areaPerParticle)
    const particles = Math.max(MIN_PARTICLES * lv.countScale, Math.min(tier.maxParticles, base) * lv.countScale)
    const { min, max, perDiagonal } = SCENE.linkDistance
    system.setActive({
      particles: Math.round(particles),
      links: lv.links,
      distance: Math.min(max, Math.max(min, diagonal * perDiagonal)) * (level === 0 ? 0.85 : 1),
      radius: Math.min(CURSOR.radius.max, Math.max(CURSOR.radius.min, Math.min(width, height) * CURSOR.radius.perShortSide)),
    })
    const dpr = targetDpr()
    appliedDpr = dpr
    renderer.setPixelRatio(dpr)
    renderer.setSize(width, height, false)
    system.setView({ cameraZ: camera.position.z, viewAspect: camera.aspect, pixelRatio: dpr, width, height })
  }

  let appliedDpr = 0
  const targetDpr = () => Math.min(window.devicePixelRatio || 1, LEVELS[level].dpr ?? tier.maxDpr)

  function resize() {
    const rect = container.getBoundingClientRect()
    const w = Math.max(1, Math.round(rect.width))
    const h = Math.max(1, Math.round(rect.height))
    // Nothing to do unless the size or the pixel ratio (browser zoom, moving between screens) changed.
    if (w === width && h === height && targetDpr() === appliedDpr) return
    layerLeft = rect.left
    layerTop = rect.top
    width = w
    height = h
    camera.aspect = w / h
    camera.position.z = h / 2 / Math.tan((SCENE.fov * Math.PI) / 360) // z=0 plane maps 1 unit : 1 CSS px
    camera.far = camera.position.z + Math.abs(SCENE.depthFar) + 400
    camera.updateProjectionMatrix()
    applyQuality()
    requestStaticFrame()
  }

  function applyTheme() {
    const o = THEME_OPACITY[readTheme()]
    system.setOpacity({ pointOpacity: o.points, lineOpacity: o.lines, cursorOpacity: o.cursor })
    requestStaticFrame()
  }

  function renderFrame() {
    try {
      renderer.render(scene, camera)
    } catch (error) {
      warn('Render failed; background disabled.', error)
      failed = true
      teardown()
    }
  }

  // Draw once without advancing time (used while paused for reduced motion, and after resize/theme).
  function requestStaticFrame() {
    if (raf || disposed || failed || contextLost || document.hidden) return
    system.update(0) // inactive cursor: a static frame never shows cursor lines
    renderFrame()
  }

  function govern(rawDt) {
    if (warmup > 0) {
      warmup--
      return
    }
    if (rawDt > 0.25) return // tab was backgrounded / throttled, not a rendering-cost signal
    govTime += rawDt
    if (++govFrames < GOVERNOR.windowFrames) return
    const average = govTime / govFrames
    govFrames = 0
    govTime = 0
    if (average > GOVERNOR.slowFrameSeconds && level > 0) {
      level--
      applyQuality()
    }
  }

  function tick(now) {
    raf = 0
    if (disposed) return
    const rawDt = lastTime ? (now - lastTime) / 1000 : 0
    lastTime = now
    const dt = Math.min(rawDt, 0.05)

    // Ease the camera toward the pointer for a gentle parallax.
    const k = 1 - Math.exp(-SCENE.parallaxEase * dt)
    camX += (pointerX * SCENE.parallax - camX) * k
    camY += (pointerY * SCENE.parallax - camY) * k
    camera.position.x = camX
    camera.position.y = camY

    system.update(dt, camX, camY, cursor)
    renderFrame()
    if (failed) return
    govern(rawDt)
    raf = requestAnimationFrame(tick)
  }

  function sync() {
    const shouldAnimate = !reduceMotion && !document.hidden && !contextLost && !failed && !disposed
    if (shouldAnimate) {
      if (!raf) {
        lastTime = 0
        warmup = Math.max(warmup, 10)
        raf = requestAnimationFrame(tick)
      }
    } else if (raf) {
      cancelAnimationFrame(raf)
      raf = 0
    }
    if (reduceMotion) {
      camX = camY = 0
      camera.position.x = camera.position.y = 0
      requestStaticFrame()
    }
  }

  // ---- listeners ----
  const onPointerMove = (event) => {
    // Mouse/pen only: touch is left alone so scrolling gestures are never affected.
    if (reduceMotion || event.pointerType === 'touch') return
    cursor.x = event.clientX - layerLeft
    cursor.y = event.clientY - layerTop
    cursor.active = true
    pointerX = (event.clientX / window.innerWidth - 0.5) * 2
    pointerY = -(event.clientY / window.innerHeight - 0.5) * 2
  }
  const onPointerLeave = () => {
    cursor.active = false // lines fade out smoothly; the stale x/y is only used for that fade
    pointerX = 0
    pointerY = 0
  }
  const onVisibility = () => {
    if (document.hidden) onPointerLeave()
    sync()
  }
  const onReduceChange = (event) => {
    reduceMotion = RESPECT_REDUCED_MOTION && event.matches
    if (reduceMotion) onPointerLeave()
    sync()
  }
  const onContextLost = (event) => {
    event.preventDefault() // lets the browser restore the context
    contextLost = true
    sync()
  }
  const onContextRestored = () => {
    contextLost = false
    sync()
    requestStaticFrame()
  }

  const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(() => resize()) : null
  resizeObserver?.observe(container)
  if (!resizeObserver) window.addEventListener('resize', resize)
  const themeObserver = new MutationObserver(applyTheme)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('blur', onPointerLeave)
  document.documentElement.addEventListener('pointerleave', onPointerLeave)
  document.addEventListener('visibilitychange', onVisibility)
  reduceQuery.addEventListener('change', onReduceChange)
  canvas.addEventListener('webglcontextlost', onContextLost)
  canvas.addEventListener('webglcontextrestored', onContextRestored)

  function teardown() {
    if (disposed) return
    disposed = true
    if (raf) cancelAnimationFrame(raf)
    raf = 0
    if (resizeObserver) resizeObserver.disconnect()
    else window.removeEventListener('resize', resize)
    themeObserver.disconnect()
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('blur', onPointerLeave)
    document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    document.removeEventListener('visibilitychange', onVisibility)
    reduceQuery.removeEventListener('change', onReduceChange)
    canvas.removeEventListener('webglcontextlost', onContextLost)
    canvas.removeEventListener('webglcontextrestored', onContextRestored)
    system.dispose()
    renderer.dispose()
    renderer.forceContextLoss() // release the GPU context now rather than waiting for GC
    canvas.remove()
  }

  // ---- go ----
  resize()
  applyTheme()
  sync()

  return { dispose: teardown }
}
