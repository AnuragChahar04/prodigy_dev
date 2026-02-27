export default function ProjectRow({ num, title, description, tags }) {
  return (
    <div className="group relative grid grid-cols-1 md:grid-cols-[80px_1fr_auto] items-center gap-6 p-8 md:px-10 border-b overflow-hidden cursor-pointer" style={{borderColor:'var(--border)'}} data-cursor>
      {/* BG fill on hover */}
      <div className="absolute inset-0 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(.23,1,.32,1)] z-0" style={{background:'var(--bg2)'}} />

      <div className="relative z-10 font-display text-[.7rem] tracking-[.12em]" style={{color:'var(--muted)'}}>
        {String(num).padStart(2, '0')}
      </div>

      <div className="relative z-10">
        <h3 className="font-display font-bold text-[clamp(1.1rem,2.5vw,1.65rem)] tracking-tight leading-tight mb-1 transition-colors duration-300" style={{color:'var(--ink)'}}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{color:'var(--muted)'}}>{description}</p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="px-3 py-1 text-[.68rem] tracking-[.08em] uppercase transition-all duration-300 border" style={{border:'1px solid var(--border)',color:'var(--muted)'}}>
            {tag}
          </span>
        ))}
      </div>

      <div className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 text-xl opacity-0 -translate-x-[10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 z-10" style={{color:'var(--accent)'}}>
        ↗
      </div>
    </div>
  )
}
