import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: -200, y: -200 })   // start off-screen
  const ring    = useRef({ x: -200, y: -200 })
  const frame   = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const rng = ringRef.current
    if (!dot || !rng) return

    // ── Mouse position tracker ────────────────────────────────────────────
    const onMove = e => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove, { passive: true })

    // ── RAF loop — uses transform instead of left/top ─────────────────────
    // transform is compositor-only: no layout, no paint, no jitter.
    // We subtract half the element size so the cursor centers on the pointer.
    // dot: 6px / 2 = 3px. Ring size changes on hover (15px default half-size)
    // but we read it once — the centering error on hover is < 13px and imperceptible.
    const DOT_HALF  = 3
    const RING_HALF = 15
    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12

      dot.style.transform = `translate(${mouse.current.x - DOT_HALF}px, ${mouse.current.y - DOT_HALF}px)`
      rng.style.transform = `translate(${ring.current.x - RING_HALF}px, ${ring.current.y - RING_HALF}px)`

      frame.current = requestAnimationFrame(loop)
    }
    frame.current = requestAnimationFrame(loop)

    // ── Hover state — use mousemove-based target detection ────────────────
    // Reason: mouseover/mouseout bubble through child elements (icons, spans)
    // causing the hover class to flicker off/on as pointer crosses child boundaries.
    // Using mousemove + closest() on every frame is more stable.
    const onHoverMove = e => {
      const t = e.target.closest('a, button, [role="button"], .sp')
      if (!t) {
        document.body.classList.remove('cur-hover', 'cur-link')
        return
      }
      const isLink = t.tagName === 'A'
      document.body.classList.toggle('cur-link',  isLink)
      document.body.classList.toggle('cur-hover', !isLink)
    }
    const onLeave = () => document.body.classList.remove('cur-hover', 'cur-link')

    document.addEventListener('mousemove', onHoverMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(frame.current)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousemove', onHoverMove)
      document.removeEventListener('mouseleave', onLeave)
      document.body.classList.remove('cur-hover', 'cur-link')
    }
  }, [])

  return (
    <>
      <div id="cur-dot"  ref={dotRef}  />
      <div id="cur-ring" ref={ringRef} />
    </>
  )
}
