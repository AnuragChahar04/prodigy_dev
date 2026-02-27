import { Link } from 'react-router-dom'

const socials = [
  { label: 'TW', href: '#' }, { label: 'LI', href: '#' },
  { label: 'GH', href: '#' }, { label: 'DR', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-bg pt-20 pb-8 px-[4%]">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">
        <div>
          <Link to="/" className="font-display font-black text-2xl tracking-tight text-bg no-underline block mb-4">
            Prodigy<span style={{color:'#4caf70'}}>Dev</span>
          </Link>
          <p className="text-bg/40 text-sm leading-relaxed max-w-[280px]">
            We craft premium software, web experiences, and mobile products that transform businesses and delight users worldwide.
          </p>
          <div className="flex gap-3 mt-6">
            {socials.map(({ label, href }) => (
              <a key={label} href={href} className="w-9 h-9 border border-bg/15 flex items-center justify-center text-[.7rem] text-bg/35 no-underline hover:border-accentlt hover:text-accentlt transition-all duration-300 font-display"
                style={{'--tw-text-opacity':1}}>
                {label}
              </a>
            ))}
          </div>
        </div>

        {[
          { title: 'Services', items: [['Custom Software','/'],['Company Websites','/'],['Mobile Apps','/'],['Digital Marketing','/'],['Hosting','/']] },
          { title: 'Company', items: [['Home','/'],['About Us','/about'],['Contact','/contact']] },
          { title: 'Contact', items: [['hello@prodigydev.io','mailto:hello@prodigydev.io',true],['+255 700 000 000','tel:+255700000000',true],['Dar es Salaam, TZ',null]] },
        ].map(({ title, items }) => (
          <div key={title}>
            <h4 className="text-[.7rem] tracking-[.15em] uppercase mb-5" style={{color:'#4caf70'}}>{title}</h4>
            <ul className="list-none flex flex-col gap-3">
              {items.map(([label, href, isExternal]) => (
                <li key={label}>
                  {href ? (
                    isExternal
                      ? <a href={href} className="text-bg/40 text-sm no-underline hover:text-bg transition-colors duration-300">{label}</a>
                      : <Link to={href} className="text-bg/40 text-sm no-underline hover:text-bg transition-colors duration-300">{label}</Link>
                  ) : (
                    <span className="text-bg/40 text-sm">{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-bg/[0.08]">
        <p className="text-bg/25 text-xs">© {new Date().getFullYear()} ProdigyDev. All rights reserved.</p>
        <p className="text-bg/25 text-xs">Built with passion in East Africa 🌍</p>
      </div>
    </footer>
  )
}
