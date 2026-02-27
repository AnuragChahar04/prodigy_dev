import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }, [location.pathname])
  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : '' }, [menuOpen])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[900] flex items-center justify-between px-[4%] py-5 transition-all duration-500 ${
        scrolled ? 'bg-bg/90 backdrop-blur-xl border-b border-ink/[0.07] shadow-sm' : ''
      }`}>
        <Link to="/" className="font-display font-black text-[1.3rem] tracking-tight text-ink no-underline">
          Prodigy<span className="text-accent">Dev</span>
        </Link>

        <ul className="hidden md:flex items-center gap-10 list-none">
          {links.map(({ label, path }) => (
            <li key={path}>
              <Link to={path} className={`text-[.82rem] tracking-[.1em] uppercase no-underline transition-colors duration-300 font-medium ${
                location.pathname === path ? 'text-accent' : 'text-ink2 hover:text-ink'
              }`}>{label}</Link>
            </li>
          ))}
        </ul>

        <Link to="/contact" className="hidden md:inline-block btn-primary text-[.78rem] py-3 px-5 no-underline">
          <span>Start a Project</span>
        </Link>

        <button className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`block w-6 h-[2px] bg-ink transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-[2px] bg-ink transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-ink transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-[800] bg-bg flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-[cubic-bezier(.23,1,.32,1)] ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {links.map(({ label, path }) => (
          <Link key={path} to={path} className="font-display text-[clamp(2.2rem,8vw,3.5rem)] font-bold text-ink no-underline hover:text-accent transition-colors duration-300" onClick={() => setMenuOpen(false)}>
            {label}
          </Link>
        ))}
        <Link to="/contact" className="btn-primary mt-4 no-underline text-sm" onClick={() => setMenuOpen(false)}>
          <span>Start a Project</span>
        </Link>
      </div>
    </>
  )
}
