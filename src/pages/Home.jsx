import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Marquee from '../components/Marquee'
import ServiceCard from '../components/ServiceCard'
import ProjectRow from '../components/ProjectRow'
import AntiGravity from '../components/AntiGravity'
import Aurora from '../components/Aurora'
import useScrollReveal from '../animations/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: <svg viewBox="0 0 48 48" fill="none" stroke="#2d7a45" strokeWidth="1.5" strokeLinecap="round"><rect x="5" y="9" width="38" height="30" rx="2.5"/><path d="M14 24l6 6-6 6M24 30h10"/></svg>,
    title: 'Custom Enterprise Software',
    description: 'Scalable, robust platforms built specifically for your workflows — from ERP systems to internal tools.',
  },
  {
    icon: <svg viewBox="0 0 48 48" fill="none" stroke="#2d7a45" strokeWidth="1.5" strokeLinecap="round"><rect x="5" y="7" width="38" height="34" rx="2.5"/><path d="M5 17h38M16 7v10M32 7v10"/></svg>,
    title: 'Company Websites',
    description: 'Visually stunning, high-performance websites that represent your brand with precision and purpose.',
  },
  {
    icon: <svg viewBox="0 0 48 48" fill="none" stroke="#2d7a45" strokeWidth="1.5" strokeLinecap="round"><rect x="13" y="3" width="22" height="42" rx="4"/><circle cx="24" cy="39" r="2" fill="#2d7a45" stroke="none"/></svg>,
    title: 'Mobile Apps',
    description: 'Native and cross-platform apps delivering exceptional user experiences on both iOS and Android.',
  },
  {
    icon: <svg viewBox="0 0 48 48" fill="none" stroke="#2d7a45" strokeWidth="1.5" strokeLinecap="round"><path d="M6 36l10-14 8 8 8-12 10 18"/><circle cx="6" cy="36" r="2" fill="#2d7a45" stroke="none"/></svg>,
    title: 'Digital Marketing',
    description: 'Data-driven campaigns that grow your audience, boost visibility, and convert leads into loyal customers.',
  },
  {
    icon: <svg viewBox="0 0 48 48" fill="none" stroke="#2d7a45" strokeWidth="1.5" strokeLinecap="round"><ellipse cx="24" cy="11" rx="17" ry="6"/><path d="M7 11v10c0 3.3 7.6 6 17 6s17-2.7 17-6V11M7 21v10c0 3.3 7.6 6 17 6s17-2.7 17-6V21"/></svg>,
    title: 'Hosting Services',
    description: 'Reliable, secure cloud hosting with 99.9% uptime SLA, auto-scaling, and round-the-clock support.',
  },
]

const projects = [
  { title: 'Custom ERP for UA Consultants', description: 'End-to-end enterprise resource planning with real-time analytics, workflow automation, and role-based access.', tags: ['React', 'Node.js', 'PostgreSQL', 'Redis'] },
  { title: 'SEMrush Clone', description: 'Full-featured SEO analytics platform with keyword tracking, backlink analysis, site audits, and white-label reporting.', tags: ['Vue.js', 'Python', 'Elasticsearch'] },
  { title: 'Farm Management App', description: 'Mobile-first platform managing crop cycles, livestock records, inventory, and financial reporting.', tags: ['React Native', 'Firebase', 'Maps API'] },
]

export default function Home() {
  const heroRef = useRef(null)
  const tagRef = useRef(null)
  const linesRef = useRef([])
  const subRef = useRef(null)
  const actionsRef = useRef(null)
  const scrollHintRef = useRef(null)

  const servicesReveal = useScrollReveal()
  const projectsReveal = useScrollReveal()
  const statsReveal = useScrollReveal()
  const ctaReveal = useScrollReveal()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(tagRef.current, { opacity: 0, y: 22, duration: 0.7 }, 0.3)
        .from(linesRef.current.filter(Boolean), { opacity: 0, y: 75, stagger: 0.13, duration: 1.1 }, 0.5)
        .from(subRef.current, { opacity: 0, y: 28, duration: 0.75 }, 1.0)
        .from(actionsRef.current, { opacity: 0, y: 20, duration: 0.65 }, 1.2)
        .from(scrollHintRef.current, { opacity: 0, duration: 0.5 }, 1.5)
    }, heroRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-item', { opacity: 0, y: 50, stagger: 0.09, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-grid', start: 'top 80%' } })
      gsap.from('.proj-row', { opacity: 0, x: -40, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-list', start: 'top 78%' } })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="page-wrap">

      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end pb-[8%] px-[4%] overflow-hidden" style={{background:'var(--bg)'}}>
        
        <AntiGravity particleCount={600} color="#2d7a45" opacity={0.35} />

        {/* Warm gradient overlays */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          background: 'radial-gradient(ellipse 65% 55% at 70% 25%, rgba(45,122,69,.06) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 15% 85%, rgba(224,92,42,.05) 0%, transparent 60%)'
        }}/>

        {/* Big decorative BG letters */}
        <div className="absolute top-[22%] right-[2%] font-display font-black pointer-events-none leading-none select-none z-[1]"
          style={{fontSize:'clamp(8rem,22vw,22rem)', color:'rgba(17,16,9,.03)'}}>PD</div>

        {/* Content — z-10 so above canvas */}
        <div className="relative z-10">
          <div ref={tagRef} className="inline-flex items-center gap-2 px-3 py-[5px] border text-[.72rem] tracking-[.12em] uppercase mb-7 w-fit font-display font-semibold"
            style={{borderColor:'rgba(45,122,69,.35)', color:'var(--accent)'}}>
            <span className="w-[6px] h-[6px] rounded-full" style={{background:'var(--accent)'}} />
            Digital Agency · Est. 2020
          </div>

          <h1 className="font-display font-black leading-[.93] tracking-[-0.048em] mb-8 overflow-hidden"
            style={{fontSize:'clamp(3.4rem,9.5vw,10rem)'}}>
            {['We Build', 'Digital', 'Excellence'].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span ref={el => linesRef.current[i] = el}
                  className="block"
                  style={{color: i === 1 ? 'var(--accent)' : 'var(--ink)', fontStyle: i === 1 ? 'italic' : 'normal'}}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p ref={subRef} className="max-w-[430px] text-[1.05rem] leading-[1.75] mb-10" style={{color:'var(--ink2)'}}>
            ProdigyDev crafts premium software, web experiences, and mobile products that transform businesses and delight users globally.
          </p>

          <div ref={actionsRef} className="flex items-center gap-8 flex-wrap">
            <Link to="/contact" className="btn-primary no-underline">
              <span>Start a Project</span>
              <span className="relative z-10 text-lg leading-none">→</span>
            </Link>
            <button className="btn-ghost" onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}>
              View Our Work <span className="arr">→</span>
            </button>
          </div>
        </div>

        <div ref={scrollHintRef} className="absolute bottom-10 right-[4%] text-[.68rem] tracking-[.22em] uppercase flex flex-col items-center gap-3 z-10"
          style={{writingMode:'vertical-rl', color:'var(--muted)'}}>
          <span className="w-px h-14" style={{background:'linear-gradient(to bottom, transparent, var(--muted))'}} />
          Scroll to explore
        </div>
      </section>

      <Marquee />

      {/* ── Services ──────────────────────────────────────── */}
      <section id="services" className="py-40 px-[4%]" style={{background:'var(--bg)'}} ref={servicesReveal}>
        <div className="mb-16 reveal">
          <div className="section-label">What We Do</div>
          <h2 className="section-title">Services that<br /><em>move the needle</em></h2>
        </div>
        <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l" style={{borderColor:'var(--border)'}}>
          {services.map((s, i) => (
            <div key={i} className="svc-item"><ServiceCard num={i + 1} {...s} /></div>
          ))}
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────────── */}
      <section className="py-36 px-[4%] relative overflow-hidden" style={{background:'var(--bg2)'}} ref={projectsReveal}>
        {/* Particles in projects section too */}
        <AntiGravity particleCount={150} color="#2d7a45" opacity={0.3} />
        <div className="relative z-10">
          <div className="mb-16 reveal">
            <div className="section-label">Selected Work</div>
            <h2 className="section-title">Projects that<br /><em>define us</em></h2>
          </div>
          <div className="projects-list border-t" style={{borderColor:'var(--border)'}}>
            {projects.map((p, i) => (
              <div key={i} className="proj-row"><ProjectRow num={i + 1} {...p} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="py-28 px-[4%] border-t" style={{background:'var(--bg)', borderColor:'var(--border)'}} ref={statsReveal}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{background:'var(--border)'}}>
          {[['50+','Projects Delivered'],['30+','Happy Clients'],['5','Years Experience'],['99.9%','Uptime SLA']].map(([num, label]) => (
            <div key={label} className="p-10 reveal" style={{background:'var(--bg)'}}>
              <div className="font-display font-black tracking-tight leading-none mb-2" style={{fontSize:'clamp(2.5rem,5vw,4.5rem)', color:'var(--accent)'}}>
                {num}
              </div>
              <div className="text-sm" style={{color:'var(--muted)'}}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section
        className="relative py-52 px-[4%] text-center overflow-hidden"
        style={{ background: '#0d1f1a' }}
        ref={ctaReveal}
      >
        {/* Aurora fills the entire section */}
        <Aurora />

        {/* Very subtle dark vignette so edges stay deep */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(8,18,14,.65) 100%)'
        }} />

        {/* Content */}
        <div className="relative z-10 reveal">
          {/* Label */}
          <div className="inline-flex items-center gap-2 mb-8 text-[.72rem] tracking-[.18em] uppercase font-semibold"
            style={{ color: '#7de8c8' }}>
            <span className="w-7 h-px" style={{ background: '#7de8c8' }} />
            Let's Collaborate
            <span className="w-7 h-px" style={{ background: '#7de8c8' }} />
          </div>

          {/* Headline — solid white for maximum legibility over aurora */}
          <h2
            className="font-display font-black leading-[.92] mb-8"
            style={{
              fontSize: 'clamp(3rem,9vw,9rem)',
              letterSpacing: '-0.05em',
              color: '#ffffff',
              textShadow: '0 2px 40px rgba(0,0,0,0.35)',
            }}
          >
            Got a project
            <br />
            {/* Outlined word — still readable because aurora is behind, not on top */}
            <span
              className="font-display font-black"
              style={{
                WebkitTextStroke: '2px rgba(120,230,200,0.7)',
                color: 'transparent',
                filter: 'drop-shadow(0 0 18px rgba(100,220,190,0.35))',
              }}
            >
              in mind?
            </span>
          </h2>

          <p className="text-lg mb-14 max-w-md mx-auto leading-relaxed"
            style={{ color: 'rgba(200,240,230,0.72)' }}>
            We'd love to hear about it. Let's build something extraordinary together.
          </p>

          {/* CTA button — dark bg so it pops cleanly over the aurora */}
          <Link
            to="/contact"
            className="no-underline inline-flex items-center gap-3 text-sm font-display font-bold tracking-widest uppercase py-5 px-12 transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.96)',
              color: '#0d1f1a',
              boxShadow: '0 0 40px rgba(100,220,190,0.25)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#7de8c8'
              e.currentTarget.style.boxShadow = '0 0 60px rgba(100,220,190,0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.96)'
              e.currentTarget.style.boxShadow = '0 0 40px rgba(100,220,190,0.25)'
            }}
          >
            Let's Talk <span className="text-xl leading-none">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
