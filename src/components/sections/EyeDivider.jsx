import { useEffect, useRef } from 'react'

const EYES = [
  { x: 16, y: 16 },
  { x: 56, y: 16 },
]
const EYE_RADIUS = 14
const PUPIL_RADIUS = 5.5
// Keep a tiny gap so the pupil never appears to cross the white eye boundary.
const PUPIL_TRAVEL = EYE_RADIUS - PUPIL_RADIUS - 0.75
// Time-based easing keeps tracking responsive and smooth across different refresh rates.
const FOLLOW_TIME_MS = 34

export default function EyeDivider() {
  const svgRef = useRef(null)
  const pupilRefs = useRef([])
  const positionsRef = useRef(EYES.map(({ x, y }) => ({ x, y })))
  const targetsRef = useRef(EYES.map(({ x, y }) => ({ x, y })))
  const frameRef = useRef(0)
  const lastFrameTimeRef = useRef(0)

  useEffect(() => {
    const updatePupils = (timestamp) => {
      frameRef.current = 0
      const delta = lastFrameTimeRef.current ? Math.min(timestamp - lastFrameTimeRef.current, 40) : 16.67
      lastFrameTimeRef.current = timestamp
      // Exponential easing is frame-rate independent and catches up quickly without jitter.
      const ease = 1 - Math.exp(-delta / FOLLOW_TIME_MS)
      let stillMoving = false

      positionsRef.current = positionsRef.current.map((position, index) => {
        const target = targetsRef.current[index]
        const x = position.x + (target.x - position.x) * ease
        const y = position.y + (target.y - position.y) * ease
        const next = {
          x: Math.abs(target.x - x) < 0.03 ? target.x : x,
          y: Math.abs(target.y - y) < 0.03 ? target.y : y,
        }
        if (next.x !== target.x || next.y !== target.y) stillMoving = true
        const pupil = pupilRefs.current[index]
        if (pupil) {
          pupil.setAttribute('cx', next.x.toFixed(2))
          pupil.setAttribute('cy', next.y.toFixed(2))
        }
        return next
      })

      if (stillMoving) frameRef.current = window.requestAnimationFrame(updatePupils)
    }

    const scheduleAnimation = () => {
      if (!frameRef.current) frameRef.current = window.requestAnimationFrame(updatePupils)
    }

    const onPointerMove = (event) => {
      const svg = svgRef.current
      if (!svg) return
      const rect = svg.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      targetsRef.current = EYES.map((eye) => {
        const eyeX = rect.left + (eye.x / 72) * rect.width
        const eyeY = rect.top + (eye.y / 32) * rect.height
        const dx = event.clientX - eyeX
        const dy = event.clientY - eyeY
        const distance = Math.hypot(dx, dy)
        if (distance < 0.001) return { x: eye.x, y: eye.y }

        // Aim directly at the pointer, clamping the pupil centre to the inner edge.
        const travel = Math.min(PUPIL_TRAVEL, distance)
        return {
          x: eye.x + (dx / distance) * travel,
          y: eye.y + (dy / distance) * travel,
        }
      })
      scheduleAnimation()
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current)
      lastFrameTimeRef.current = 0
    }
  }, [])

  return (
    <div className="mx-auto w-full max-w-212.5 px-5 sm:px-8" role="presentation" aria-hidden="true">
      <div className="flex h-8 items-center">
        <div className="h-px flex-1 bg-line" />
        <svg
          ref={svgRef}
          width="72"
          height="32"
          viewBox="0 0 72 32"
          className="mx-2 shrink-0"
          focusable="false"
        >
          <g fill="var(--fg)">
            <circle cx="16" cy="16" r={EYE_RADIUS} />
            <circle cx="56" cy="16" r={EYE_RADIUS} />
          </g>
          <g fill="var(--bg)">
            {EYES.map((eye, index) => (
              <circle
                key={index}
                ref={(node) => { pupilRefs.current[index] = node }}
                cx={eye.x}
                cy={eye.y}
                r={PUPIL_RADIUS}
              />
            ))}
          </g>
        </svg>
        <div className="h-px flex-1 bg-line" />
      </div>
    </div>
  )
}
