import { useEffect, useRef } from 'react'

export default function AntiGravity({ particleCount = 500, color = '#1a6b3a', opacity = 0.55 }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }
    canvas.addEventListener('mousemove', onMouse)
    canvas.addEventListener('mouseleave', onLeave)

    // Particle shapes
    const shapes = ['circle', 'ring', 'square', 'diamond']

    class Particle {
      constructor() { this.reset(true) }

      reset(randomY = false) {
        this.x = Math.random() * canvas.width
        this.y = randomY ? Math.random() * canvas.height : canvas.height + 20
        this.baseSize = 2.5 + Math.random() * 9
        this.size = this.baseSize
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = -(0.18 + Math.random() * 0.55)   // anti-gravity: always upward
        this.alpha = 0.08 + Math.random() * 0.38
        this.wobble = Math.random() * Math.PI * 2
        this.wobbleSpeed = 0.008 + Math.random() * 0.018
        this.wobbleAmp = 0.25 + Math.random() * 0.6
        this.shape = shapes[Math.floor(Math.random() * shapes.length)]
        this.rotation = Math.random() * Math.PI * 2
        this.rotSpeed = (Math.random() - 0.5) * 0.015
        this.pulse = Math.random() * Math.PI * 2
        this.pulseSpeed = 0.02 + Math.random() * 0.03
      }

      update() {
        this.wobble += this.wobbleSpeed
        this.pulse += this.pulseSpeed
        this.rotation += this.rotSpeed

        // Gentle side wobble
        this.vx += Math.sin(this.wobble) * 0.008
        // Clamp horizontal drift
        this.vx *= 0.995

        // Mouse repulsion (subtle)
        const dx = this.x - mouseRef.current.x
        const dy = this.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120
          this.vx += (dx / dist) * force * 0.4
          this.vy += (dy / dist) * force * 0.2
        }

        this.x += this.vx
        this.y += this.vy

        // Size pulse
        this.size = this.baseSize + Math.sin(this.pulse) * (this.baseSize * 0.18)

        // Wrap horizontally
        if (this.x < -20) this.x = canvas.width + 20
        if (this.x > canvas.width + 20) this.x = -20

        // Reset when off top
        if (this.y < -30) this.reset(false)
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.alpha * opacity
        ctx.strokeStyle = color
        ctx.fillStyle = color
        ctx.lineWidth = 1.2
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        const s = this.size

        switch (this.shape) {
          case 'circle':
            ctx.beginPath()
            ctx.arc(0, 0, s, 0, Math.PI * 2)
            ctx.globalAlpha = this.alpha * opacity * 0.25
            ctx.fill()
            ctx.globalAlpha = this.alpha * opacity
            ctx.stroke()
            break

          case 'ring':
            ctx.beginPath()
            ctx.arc(0, 0, s, 0, Math.PI * 2)
            ctx.stroke()
            break

          case 'square':
            ctx.strokeRect(-s * 0.7, -s * 0.7, s * 1.4, s * 1.4)
            break

          case 'diamond':
            ctx.beginPath()
            ctx.moveTo(0, -s)
            ctx.lineTo(s * 0.65, 0)
            ctx.lineTo(0, s)
            ctx.lineTo(-s * 0.65, 0)
            ctx.closePath()
            ctx.stroke()
            break

          case 'triangle':
            ctx.beginPath()
            ctx.moveTo(0, -s)
            ctx.lineTo(s * 0.87, s * 0.5)
            ctx.lineTo(-s * 0.87, s * 0.5)
            ctx.closePath()
            ctx.stroke()
            break

          case 'cross':
            ctx.beginPath()
            ctx.moveTo(-s, 0); ctx.lineTo(s, 0)
            ctx.moveTo(0, -s); ctx.lineTo(0, s)
            ctx.stroke()
            break
        }

        ctx.restore()
      }
    }

    // Init particles
    particlesRef.current = Array.from({ length: particleCount }, () => new Particle())

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connecting lines between nearby particles
      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            ctx.save()
            ctx.globalAlpha = ((110 - dist) / 110) * 0.07 * opacity
            ctx.strokeStyle = color
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }

      // Update and draw each particle
      particles.forEach((p) => { p.update(); p.draw() })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouse)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [particleCount, color, opacity])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  )
}
