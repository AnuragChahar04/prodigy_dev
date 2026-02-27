import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AntiGravity from '../components/AntiGravity'
import useScrollReveal from '../animations/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const values = [
  { icon: '⚡', name: 'Speed & Precision', desc: 'We ship fast without compromising quality. Every decision is intentional.' },
  { icon: '🎯', name: 'Client-First', desc: 'Your goals drive everything we do. We immerse ourselves in your vision to exceed expectations.' },
  { icon: '🔮', name: 'Innovation', desc: 'Leveraging emerging technologies to give your product a real competitive edge.' },
  { icon: '🤝', name: 'Transparency', desc: 'Clear communication and honest timelines. You always know exactly where your project stands.' },
  { icon: '♾️', name: 'Scalability', desc: 'We architect for growth. Our solutions scale seamlessly from startup to enterprise.' },
  { icon: '💎', name: 'Polish', desc: 'We obsess over micro-interactions and refined aesthetics that make products unforgettable.' },
]

const team = [
  { name: 'Anurag Chahar', role: 'Founder & CEO', init: 'AN' },
  { name: 'Komal Goswami', role: 'Co-Founder', init: 'KG' },
  { name: 'Neeti Wadhawan', role: 'Marketing Head', init: 'NW' },
]

export default function About() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const tagRef = useRef(null)
  const storyRef = useScrollReveal()
  const valuesRef = useScrollReveal()
  const teamRef = useScrollReveal()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(tagRef.current, { opacity: 0, y: 20, duration: 0.6 }, 0.3)
        .from(titleRef.current?.querySelectorAll('.hl'), { opacity: 0, y: 65, stagger: 0.13, duration: 1 }, 0.5)

      gsap.from('.val-card', { opacity: 0, y: 45, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.values-grid', start: 'top 78%' } })
      gsap.from('.tm-card', { opacity: 0, scale: 0.92, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.team-grid', start: 'top 80%' } })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="page-wrap">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[72vh] flex flex-col justify-end pb-[7%] px-[4%] overflow-hidden" style={{background:'var(--bg)'}}>
        <AntiGravity particleCount={55} color="#2d7a45" opacity={0.32} />
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          background: 'radial-gradient(ellipse 60% 55% at 65% 30%, rgba(45,122,69,.06) 0%, transparent 65%)'
        }}/>
        <div className="relative z-10">
          <div ref={tagRef} className="inline-flex items-center gap-2 px-3 py-[5px] border text-[.72rem] tracking-[.12em] uppercase mb-7 w-fit font-display font-semibold"
            style={{borderColor:'rgba(45,122,69,.35)', color:'var(--accent)'}}>
            <span className="w-[6px] h-[6px] rounded-full" style={{background:'var(--accent)'}}/>
            Our Story
          </div>
          <h1 ref={titleRef} className="font-display font-black leading-[.93] tracking-[-0.048em]" style={{fontSize:'clamp(1rem,5.5vw,6rem)'}}>
            <span className="hl block overflow-hidden" style={{color:'var(--ink)'}}>About</span>
            <span className="hl block overflow-hidden italic" style={{color:'var(--accent)'}}>ProdigyDev</span>
          </h1>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────── */}
      <section className="py-36 px-[4%]" style={{background:'var(--bg)'}} ref={storyRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          <div>
            <div className="section-label reveal">Our Mission</div>
            <h2 className="font-display font-bold leading-[1.1] mb-8 reveal delay-1"
              style={{fontSize:'clamp(1.8rem,3.5vw,3.2rem)', letterSpacing:'-0.03em', color:'var(--ink)'}}>
              Building the digital future,<br />one product at a time
            </h2>
            <p className="leading-relaxed mb-5 reveal delay-2" style={{color:'var(--ink2)'}}>
              ProdigyDev was founded in 2020 with a singular vision: create digital products that are not just functional, but transformative. We believe technology should be beautiful, intuitive, and powerful enough to change how businesses operate.
            </p>
            <p className="leading-relaxed reveal delay-3" style={{color:'var(--ink2)'}}>
              From our base in East Africa, we serve clients globally — bringing world-class development expertise with a deep understanding of emerging market opportunities and global standards.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[['50+','Projects Completed'],['30+','Happy Clients'],['5yrs','Experience'],['3','Industry Awards']].map(([num,label],i) => (
              <div key={label} className={`reveal delay-${i+2} p-8 hover:border-accent/40 transition-colors duration-300`}
                style={{border:'1px solid var(--border)'}}>
                <div className="font-display font-black tracking-tight leading-none mb-2" style={{fontSize:'clamp(2.2rem,4vw,3.5rem)', color:'var(--accent)'}}>{num}</div>
                <div className="text-sm" style={{color:'var(--muted)'}}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div className="border-t pt-20" style={{borderColor:'var(--border)'}}>
          <div className="section-label reveal">Our Vision</div>
          <h2 className="font-display font-black leading-[1.1] max-w-3xl mb-6 reveal delay-1"
            style={{fontSize:'clamp(1.8rem,4.5vw,4rem)', letterSpacing:'-0.035em', color:'var(--ink)'}}>
            To be the most trusted digital partner for ambitious companies worldwide
          </h2>
          <p className="max-w-xl leading-relaxed reveal delay-2" style={{color:'var(--ink2)'}}>
            We aim to bridge the gap between cutting-edge technology and real business impact — proving that world-class digital solutions can be built anywhere.
          </p>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────── */}
      <section className="py-36 px-[4%] relative overflow-hidden" style={{background:'var(--bg2)'}} ref={valuesRef}>
        <AntiGravity particleCount={35} color="#2d7a45" opacity={0.22} />
        <div className="relative z-10">
          <div className="mb-16">
            <div className="section-label reveal">What Drives Us</div>
            <h2 className="section-title reveal delay-1">Our values &<br /><em>principles</em></h2>
          </div>
          <div className="values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l" style={{borderColor:'var(--border)'}}>
            {values.map((v) => (
              <div key={v.name} className="val-card group p-10 border-b border-r hover:bg-bg transition-colors duration-300 cursor-default" style={{borderColor:'var(--border)'}}>
                <div className="text-4xl mb-6">{v.icon}</div>
                <h3 className="font-display font-bold text-lg mb-3 transition-colors duration-300 group-hover:text-accent" style={{color:'var(--ink)'}}>{v.name}</h3>
                <p className="text-sm leading-relaxed" style={{color:'var(--ink2)'}}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────── */}
      <section className="py-36 px-[4%]" style={{background:'var(--bg)'}} ref={teamRef}>
        <div className="mb-16">
          <div className="section-label reveal">The People</div>
          <h2 className="section-title reveal delay-1">Meet the<br /><em>team</em></h2>
        </div>
        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((m) => (
            <div key={m.name} className="tm-card group relative overflow-hidden border cursor-default transition-colors duration-300 hover:border-accent/40" style={{borderColor:'var(--border)'}}>
              <div className="h-56 flex items-end p-6 relative overflow-hidden" style={{background:'var(--bg2)'}}>
                <div className="absolute top-6 right-6 w-14 h-14 rounded-full border flex items-center justify-center font-display font-bold text-lg" style={{borderColor:'var(--accent)', color:'var(--accent)'}}>
                  {m.init}
                </div>
                {/* Green line sweep */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{background:'var(--accent)'}} />
              </div>
              <div className="p-6 border-t" style={{borderColor:'var(--border)'}}>
                <div className="font-display font-bold" style={{color:'var(--ink)'}}>{m.name}</div>
                <div className="text-sm mt-1" style={{color:'var(--muted)'}}>{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA bar ───────────────────────────────────────── */}
      <section className="py-28 px-[4%]" style={{background:'var(--accent)'}}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="font-display font-black leading-tight text-white" style={{fontSize:'clamp(1.8rem,4vw,3.5rem)', letterSpacing:'-0.03em'}}>
            Ready to work with us?
          </h2>
          <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white text-sm font-semibold tracking-wide no-underline hover:bg-white hover:text-accent transition-all duration-300 whitespace-nowrap">
            Start a Conversation →
          </a>
        </div>
      </section>
    </div>
  )
}
