export default function ServiceCard({ num, icon, title, description }) {
  return (
    <div className="service-card-light group relative p-10 overflow-hidden cursor-pointer transition-colors duration-400" data-cursor>
      {/* Green bottom sweep */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(.23,1,.32,1)]" style={{background:'var(--accent)'}} />

      <div className="text-[.68rem] tracking-[.14em] mb-8 font-display font-semibold" style={{color:'var(--accent)'}}>
        {String(num).padStart(2, '0')}
      </div>

      <div className="w-11 h-11 mb-6 opacity-90">{icon}</div>

      <h3 className="font-display font-bold text-xl tracking-tight mb-3 leading-tight" style={{color:'var(--ink)'}}>
        {title}
      </h3>

      <p className="text-sm leading-relaxed" style={{color:'var(--ink2)'}}>{description}</p>

      <div className="mt-6 text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" style={{color:'var(--accent)'}}>
        →
      </div>
    </div>
  )
}
