import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import AntiGravity from '../components/AntiGravity'
import useScrollReveal from '../animations/useScrollReveal'

const contactDetails = [
  { icon: '📧', label: 'Email', value: 'theprooodigyd3v@gmai.com', href: 'mailto:theprodigyd3v@gmail.com' },
  { icon: '📞', label: 'Phone', value: '+91-9266464066', href: 'tel:+91-9266464066' },
  { icon: '📍', label: 'Location', value: 'Faridabad, Haryana' },
  { icon: '🕐', label: 'Office Hours', value: 'Mon – Fri, 9am – 6pm EAT' },
]
const socials = ['TW','LI','GH','DR']

const inputFields = [
  [{ name:'name',  label:'Full Name *',       type:'text',  placeholder:'John Doe',          req:true },
   { name:'email', label:'Email Address *',   type:'email', placeholder:'john@company.com',  req:true }],
  [{ name:'company', label:'Company',         type:'text',  placeholder:'Acme Corp (optional)' },
   { name:'budget',  label:'Project Budget',  type:'text',  placeholder:'$5,000 – $20,000' }],
]

export default function Contact() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const tagRef = useRef(null)
  const formRef = useScrollReveal()
  const infoRef = useScrollReveal()

  const [form, setForm] = useState({ name:'', email:'', company:'', budget:'', message:'' })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(tagRef.current, { opacity:0, y:20, duration:0.6 }, 0.3)
        .from(titleRef.current?.querySelectorAll('.hl'), { opacity:0, y:65, stagger:0.12, duration:1 }, 0.5)
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => { setStatus('sent'); setForm({ name:'',email:'',company:'',budget:'',message:'' }) }, 2000)
  }

  return (
    <div className="page-wrap">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[62vh] flex flex-col justify-end pb-[7%] px-[4%] overflow-hidden" style={{background:'var(--bg)'}}>
        <AntiGravity particleCount={500} color="#2d7a45" opacity={0.4} />
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{
          background: 'radial-gradient(ellipse 55% 55% at 60% 35%, rgba(45,122,69,.06) 0%, transparent 70%)'
        }}/>
        <div className="relative z-10">
          <div ref={tagRef} className="inline-flex items-center gap-2 px-3 py-[5px] border text-[.72rem] tracking-[.12em] uppercase mb-7 w-fit font-display font-semibold"
            style={{borderColor:'rgba(45,122,69,.35)', color:'var(--accent)'}}>
            <span className="w-[6px] h-[6px] rounded-full" style={{background:'var(--accent)'}}/>
            Get In Touch
          </div>
          <h1 ref={titleRef} className="font-display font-black leading-[.93] tracking-[-0.048em]" style={{fontSize:'clamp(2rem,6.5vw,7.5rem)'}}>
            <span className="hl block overflow-hidden" style={{color:'var(--ink)'}}>Let's build</span>
            <span className="hl block overflow-hidden italic" style={{color:'var(--accent)'}}>something great</span>
          </h1>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────── */}
      <section className="py-28 px-[4%]" style={{background:'var(--bg)'}}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-20">

          {/* Info */}
          <div ref={infoRef}>
            <div className="section-label reveal">Contact Info</div>
            <h2 className="font-display font-bold leading-[1.15] mb-6 reveal delay-1"
              style={{fontSize:'clamp(1.5rem,3vw,2.2rem)', letterSpacing:'-0.03em', color:'var(--ink)'}}>
              Ready to start a conversation?
            </h2>
            <p className="leading-relaxed mb-10 reveal delay-2" style={{color:'var(--ink2)'}}>
              Tell us about your project. We respond to every inquiry within 24 hours.
            </p>

            {contactDetails.map(({icon,label,value,href},i) => (
              <div key={label} className={`reveal delay-${i+2} flex items-start gap-4 mb-6`}>
                <div className="text-xl mt-0.5">{icon}</div>
                <div>
                  <div className="text-[.7rem] tracking-[.12em] uppercase mb-1" style={{color:'var(--muted)'}}>{label}</div>
                  {href
                    ? <a href={href} className="text-sm no-underline transition-colors duration-300 hover:text-accent" style={{color:'var(--ink)'}}>{value}</a>
                    : <span className="text-sm" style={{color:'var(--ink)'}}>{value}</span>
                  }
                </div>
              </div>
            ))}

            <div className="reveal mt-8">
              <div className="text-[.7rem] tracking-[.12em] uppercase mb-3" style={{color:'var(--muted)'}}>Follow Us</div>
              <div className="flex gap-2">
                {socials.map(s => (
                  <button key={s} className="w-10 h-10 border text-[.72rem] font-display font-bold transition-all duration-300 hover:border-accent hover:text-accent"
                    style={{borderColor:'var(--border)', color:'var(--muted)'}}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div ref={formRef}>
            <div className="section-label reveal">Send a Message</div>

            {status === 'sent' ? (
              <div className="reveal mt-4 p-10 border" style={{borderColor:'rgba(45,122,69,.3)', background:'rgba(45,122,69,.05)'}}>
                <div className="text-4xl mb-4">✅</div>
                <h3 className="font-display font-bold text-2xl mb-3" style={{color:'var(--accent)'}}>Message Sent!</h3>
                <p className="leading-relaxed" style={{color:'var(--ink2)'}}>Thank you! We've received your message and will reply within 24 hours.</p>
                <button className="btn-outline mt-6 text-sm" onClick={() => setStatus('idle')}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-8 reveal delay-1">

                {inputFields.map((row, ri) => (
                  <div key={ri} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {row.map(({ name, label, type, placeholder, req }) => (
                      <div key={name} className="relative group">
                        <label className="block text-[.7rem] tracking-[.12em] uppercase mb-2" style={{color:'var(--muted)'}}>{label}</label>
                        <input type={type} placeholder={placeholder} value={form[name]} required={req}
                          onChange={e => setForm({...form,[name]:e.target.value})}
                          className="w-full bg-transparent py-3 text-sm outline-none transition-colors duration-300"
                          style={{borderBottom:'1px solid var(--border)', color:'var(--ink)'}}
                          onFocus={e => e.target.style.borderBottomColor='var(--accent)'}
                          onBlur={e => e.target.style.borderBottomColor='var(--border)'}
                        />
                      </div>
                    ))}
                  </div>
                ))}

                <div className="relative group">
                  <label className="block text-[.7rem] tracking-[.12em] uppercase mb-2" style={{color:'var(--muted)'}}>
                    Tell Us About Your Project *
                  </label>
                  <textarea placeholder="Describe your project, goals, timeline..." value={form.message} required rows={6}
                    onChange={e => setForm({...form,message:e.target.value})}
                    className="w-full bg-transparent py-3 text-sm outline-none resize-none transition-colors duration-300"
                    style={{borderBottom:'1px solid var(--border)', color:'var(--ink)'}}
                    onFocus={e => e.target.style.borderBottomColor='var(--accent)'}
                    onBlur={e => e.target.style.borderBottomColor='var(--border)'}
                  />
                </div>

                <button type="submit" disabled={status==='sending'}
                  className={`btn-primary self-start text-sm py-4 px-10 ${status==='sending' ? 'opacity-60 pointer-events-none' : ''}`}>
                  <span>{status==='sending' ? 'Sending...' : 'Send Message'}</span>
                  <span className="relative z-10 text-lg leading-none">{status==='sending' ? '⏳' : '→'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Map Graphic ───────────────────────────────────── */}
      <section className="pb-28 px-[4%]" style={{background:'var(--bg)'}}>
        <div className="relative overflow-hidden border h-48 md:h-64 flex items-center justify-center" style={{borderColor:'var(--border)', background:'var(--bg2)'}}>
          <AntiGravity particleCount={25} color="#2d7a45" opacity={0.25} />
          <div className="relative z-10 text-center">
            <div className="text-4xl mb-3">🌍</div>
            <div className="font-display font-bold text-lg tracking-tight" style={{color:'var(--ink)'}}>Faridabad, Haryana</div>
            <div className="text-sm mt-1" style={{color:'var(--muted)'}}>India · Serving clients globally</div>
          </div>
          {/* Grid lines */}
          {Array.from({length:12}).map((_,i) => (
            <div key={i} className="absolute w-px h-full" style={{left:`${(i+1)*8}%`, background:'var(--border)'}} />
          ))}
          {Array.from({length:6}).map((_,i) => (
            <div key={i} className="absolute h-px w-full" style={{top:`${(i+1)*16}%`, background:'var(--border)'}} />
          ))}
        </div>
      </section>
    </div>
  )
}
