import { useEffect, useRef } from 'react'
export function useReveal(delay = 0) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add('in'), delay); obs.disconnect() }
    }, { threshold: 0.1, rootMargin: '-50px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return ref
}
