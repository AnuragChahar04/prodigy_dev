import { useEffect, useRef } from 'react'

/**
 * Aurora — animated WebGL-style aurora borealis using Canvas 2D.
 * Soft curtains of blue-green light drift and breathe across the background.
 * Works beautifully behind dark or light text.
 */
export default function Aurora({ className = '' }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let t = 0

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // --- Aurora band definition ---
    // Each band has a vertical anchor, wave params, colour stops
    const bands = [
      {
        baseY: 0.42,
        amp: [0.09, 0.06, 0.05],
        freq: [0.0018, 0.003, 0.0055],
        speed: [0.0555, 0.0875, 0.1375],
        phase: [0, 1.2, 2.5],
        thickness: 0.28,
        colors: [
          { stop: 0.0,  rgba: [120, 220, 190, 0.0]  },
          { stop: 0.25, rgba: [80,  210, 180, 0.38] },
          { stop: 0.45, rgba: [60,  190, 200, 0.55] },
          { stop: 0.6,  rgba: [100, 230, 160, 0.42] },
          { stop: 0.8,  rgba: [140, 215, 175, 0.18] },
          { stop: 1.0,  rgba: [120, 220, 190, 0.0]  },
        ],
      },
      {
        baseY: 0.35,
        amp: [0.07, 0.05, 0.04],
        freq: [0.0022, 0.004, 0.007],
        speed: [0.0218, 0.0328, 0.0845],
        phase: [1.0, 2.3, 4.1],
        thickness: 0.20,
        colors: [
          { stop: 0.0,  rgba: [60,  180, 220, 0.0]  },
          { stop: 0.2,  rgba: [50,  170, 240, 0.28] },
          { stop: 0.5,  rgba: [80,  200, 230, 0.45] },
          { stop: 0.75, rgba: [100, 215, 210, 0.22] },
          { stop: 1.0,  rgba: [60,  180, 220, 0.0]  },
        ],
      },
      {
        baseY: 0.52,
        amp: [0.06, 0.04, 0.035],
        freq: [0.0016, 0.0028, 0.005],
        speed: [0.00025, 0.0004, 0.0006],
        phase: [2.0, 0.5, 3.3],
        thickness: 0.22,
        colors: [
          { stop: 0.0,  rgba: [100, 240, 170, 0.0]  },
          { stop: 0.3,  rgba: [80,  230, 160, 0.30] },
          { stop: 0.55, rgba: [60,  220, 185, 0.48] },
          { stop: 0.8,  rgba: [120, 235, 195, 0.20] },
          { stop: 1.0,  rgba: [100, 240, 170, 0.0]  },
        ],
      },
      // Subtle warm undertone band
      {
        baseY: 0.47,
        amp: [0.05, 0.03, 0.025],
        freq: [0.0012, 0.002, 0.004],
        speed: [0.00015, 0.00022, 0.00038],
        phase: [3.5, 1.8, 0.2],
        thickness: 0.16,
        colors: [
          { stop: 0.0,  rgba: [160, 230, 180, 0.0]  },
          { stop: 0.35, rgba: [130, 225, 200, 0.20] },
          { stop: 0.6,  rgba: [110, 240, 210, 0.32] },
          { stop: 1.0,  rgba: [160, 230, 180, 0.0]  },
        ],
      },
    ]

    // Compute wavy Y position for a band at x pixel position
    const waveY = (band, x, time) => {
      const W = canvas.width
      let y = band.baseY * canvas.height
      for (let i = 0; i < band.amp.length; i++) {
        y += band.amp[i] * canvas.height *
             Math.sin(band.freq[i] * x + band.phase[i] + band.speed[i] * time)
      }
      return y
    }

    const draw = () => {
      t++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const W = canvas.width
      const H = canvas.height

      for (const band of bands) {
        const halfH = band.thickness * H * 0.5

        // Build a path along the wave spine
        // Sample N points across width
        const N = Math.ceil(W / 4)
        const xs = []
        const ys = []
        for (let i = 0; i <= N; i++) {
          const x = (i / N) * W
          xs.push(x)
          ys.push(waveY(band, x, t))
        }

        // Draw vertical gradient strips for each x step
        // This gives the 'curtain' look
        const stripW = W / N + 1

        for (let i = 0; i < N; i++) {
          const x   = xs[i]
          const cy  = ys[i]
          const top = cy - halfH
          const bot = cy + halfH

          const grad = ctx.createLinearGradient(x, top, x, bot)

          for (const { stop, rgba } of band.colors) {
            // Subtle horizontal brightness variation — shimmer
            const shimmer = 0.85 + 0.15 * Math.sin(0.008 * x + 0.0004 * t + band.phase[0])
            const [r, g, b, a] = rgba
            grad.addColorStop(stop, `rgba(${r},${g},${b},${(a * shimmer).toFixed(3)})`)
          }

          ctx.fillStyle = grad
          ctx.fillRect(x, top, stripW, bot - top)
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  )
}
