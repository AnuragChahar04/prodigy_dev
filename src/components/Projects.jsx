import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../animations/gsap';

const projects = [
  {
    id: '01',
    title: 'Custom ERP for UA Consultants',
    category: 'Enterprise Software',
    description: 'A comprehensive enterprise resource planning system built for UA Consultants — integrating HR, finance, and project management into a unified, real-time dashboard.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    year: '2024',
    color: '#C8FF00',
    bg: 'linear-gradient(135deg, #0D2A00 0%, #1A1A2E 100%)',
  },
  {
    id: '02',
    title: 'SEMrush Analytics Clone',
    category: 'Web Application',
    description: 'A full-featured SEO analytics platform with keyword tracking, backlink analysis, competitive research, and automated reporting capabilities at scale.',
    tags: ['Next.js', 'Python', 'Redis', 'Elasticsearch'],
    year: '2024',
    color: '#6B5CFF',
    bg: 'linear-gradient(135deg, #0A0A2E 0%, #1A0A2E 100%)',
  },
  {
    id: '03',
    title: 'Farm Management App',
    category: 'Mobile Application',
    description: 'An intelligent farm management platform with IoT sensor integration, crop cycle planning, weather forecasting, and yield optimization — built for modern agriculture.',
    tags: ['React Native', 'IoT', 'ML/AI', 'AWS'],
    year: '2023',
    color: '#FF4D6D',
    bg: 'linear-gradient(135deg, #2A0010 0%, #1A0A0A 100%)',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.from(titleRef.current.querySelectorAll('.reveal-item'), {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      });

      // Project cards
      projectsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        });

        // Hover - image scale
        const visual = card.querySelector('.project-visual');
        const overlay = card.querySelector('.project-overlay');

        card.addEventListener('mouseenter', () => {
          gsap.to(visual, { scale: 1.05, duration: 0.6, ease: 'power2.out' });
          gsap.to(overlay, { opacity: 0.6, duration: 0.4 });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(visual, { scale: 1, duration: 0.6, ease: 'power2.in' });
          gsap.to(overlay, { opacity: 0, duration: 0.4 });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-28 bg-ink-light relative">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="reveal-item section-label mb-4">Featured Work</div>
            <h2 className="reveal-item text-headline text-[clamp(2.5rem,5vw,5rem)] text-chalk">
              Projects We're<br />
              <span className="text-chalk/30">Proud Of</span>
            </h2>
          </div>
          <a href="#" className="reveal-item btn-outline self-start md:self-auto">
            View All Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>
        </div>

        {/* Projects list */}
        <div className="space-y-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={el => projectsRef.current[i] = el}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ background: project.bg }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 md:p-10">
                {/* Left: Number & category */}
                <div className="flex-shrink-0 w-16">
                  <span className="font-mono text-xs tracking-widest" style={{ color: project.color }}>
                    {project.id}
                  </span>
                </div>

                {/* Visual pill */}
                <div
                  className="project-visual flex-shrink-0 w-20 h-20 md:w-28 md:h-20 rounded-xl overflow-hidden"
                  style={{ background: `${project.color}15`, border: `1px solid ${project.color}20` }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-mono text-xs tracking-widest opacity-40" style={{ color: project.color }}>
                      {project.category.split(' ')[0]}
                    </span>
                  </div>
                  <div className="project-overlay absolute inset-0 opacity-0" style={{ background: project.color }} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="font-mono text-xs tracking-widest uppercase mb-2 text-chalk/30">
                    {project.category} — {project.year}
                  </div>
                  <h3 className="font-display font-700 text-xl md:text-2xl text-chalk tracking-tight mb-2 group-hover:text-chalk transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body text-chalk/40 text-sm leading-relaxed max-w-lg">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-3 py-1 rounded-full border"
                        style={{ borderColor: `${project.color}30`, color: `${project.color}80` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ borderColor: `${project.color}30`, color: project.color }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </div>
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 h-px w-full transition-all duration-700 group-hover:opacity-100 opacity-0"
                style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
