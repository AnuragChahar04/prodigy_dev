import { useEffect, useRef } from 'react'

export default function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            if (!options.repeat) observer.unobserve(entry.target)
          } else if (options.repeat) {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      {
        threshold: options.threshold ?? 0.12,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
      }
    )

    // observe all children with .reveal class, or the element itself
    const targets = el.querySelectorAll('.reveal')
    if (targets.length > 0) {
      targets.forEach((t) => observer.observe(t))
    } else {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return ref
}
