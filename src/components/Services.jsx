import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../animations/gsap';

const services = [
  {
    number: '01',
    title: 'Custom Enterprise Software',
    description: 'Bespoke ERP, CRM, and workflow systems engineered for scale, security, and seamless integration.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M7 8h10M7 11h7"/>
      </svg>
    ),
    accent: '#C8FF00',
  },
  {
    number: '02',
    title: 'Company Websites',
    description: 'High-performance, visually stunning web experiences that convert visitors into loyal customers.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2c-2.761 3.03-4 6.476-4 10s1.239 6.97 4 10"/>
        <path d="M12 2c2.761 3.03 4 6.476 4 10s-1.239 6.97-4 10"/>
      </svg>
    ),
    accent: '#6B5CFF',
  },
  {
    number: '03',
    title: 'Mobile Applications',
    description: 'Native and cross-platform apps that deliver intuitive, delightful experiences on every device.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <path d="M12 18h.01"/>
      </svg>
    ),
    accent: '#FF4D6D',
  },
  {
    number: '04',
    title: 'Digital Marketing',
    description: 'Data-driven SEO, PPC, and content strategies that amplify your brand and drive measurable growth.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 20V10M12 20V4M6 20v-6"/>
        <path d="M3 20h18"/>
      </svg>
    ),
    accent: '#FFB347',
  },
  {
    number: '05',
    title: 'Hosting & Infrastructure',
    description: 'Managed cloud hosting, DevOps pipelines, and 24/7 monitoring to keep your systems always-on.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="8" rx="2"/>
        <rect x="2" y="14" width="20" height="8" rx="2"/>
        <path d="M6 6h.01M6 18h.01"/>
      </svg>
    ),
    accent: '#00E5FF',
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
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

      // Cards stagger
      const cards = cardsRef.current.querySelectorAll('.service-card');
      gsap.from(cards, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
      });

      // Hover animations
      cards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        const line = card.querySelector('.service-line');

        card.addEventListener('mouseenter', () => {
          gsap.to(icon, { rotate: 10, scale: 1.1, duration: 0.3, ease: 'power2.out' });
          gsap.to(line, { scaleX: 1, duration: 0.4, ease: 'power2.out' });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(icon, { rotate: 0, scale: 1, duration: 0.3, ease: 'power2.in' });
          gsap.to(line, { scaleX: 0, duration: 0.3, ease: 'power2.in' });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-28 bg-ink relative overflow-hidden">
      {/* Section label line */}
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="reveal-item section-label mb-4">What We Do</div>
            <h2 className="reveal-item text-headline text-[clamp(2.5rem,5vw,5rem)] text-chalk">
              Services Built<br />
              <span className="text-chalk/30">for Impact</span>
            </h2>
          </div>
          <p className="reveal-item font-body text-chalk/50 text-base max-w-xs leading-relaxed">
            From concept to launch, we deliver end-to-end digital solutions that drive real business results.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <div
              key={service.number}
              className={`service-card card-dark p-8 group cursor-pointer relative ${
                i === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <div
                  className="service-icon w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${service.accent}15`, color: service.accent }}
                >
                  {service.icon}
                </div>
                <span className="font-mono text-xs text-chalk/20">{service.number}</span>
              </div>

              {/* Content */}
              <h3 className="font-display font-700 text-xl text-chalk tracking-tight mb-3 group-hover:text-chalk transition-colors">
                {service.title}
              </h3>
              <p className="font-body text-chalk/40 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Animated line */}
              <div
                className="service-line absolute bottom-0 left-0 h-px w-full"
                style={{
                  background: `linear-gradient(90deg, ${service.accent}, transparent)`,
                  transformOrigin: 'left center',
                  transform: 'scaleX(0)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
