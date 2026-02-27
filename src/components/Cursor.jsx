import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, raf

    const onMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    }
    const animate = () => {
      ringX += (mouseX - ringX) * 0.11
      ringY += (mouseY - ringY) * 0.11
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      raf = requestAnimationFrame(animate)
    }
    const grow = () => document.body.classList.add('cursor-grow')
    const shrink = () => document.body.classList.remove('cursor-grow')

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })
    animate()

    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor" />
      <div ref={ringRef} className="cursor-follower" />
    </>
  )
}
