import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../animations/gsap';

export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Split heading into lines
      const lines = headingRef.current.querySelectorAll('.hero-line');
      const tag = taglineRef.current;
      const sub = subRef.current;
      const cta = ctaRef.current.querySelectorAll('.cta-item');
      const scrollInd = scrollIndicatorRef.current;

      // Initial states
      gsap.set(lines, { y: 120, opacity: 0, rotateX: -15 });
      gsap.set([tag, sub], { y: 30, opacity: 0 });
      gsap.set(cta, { y: 30, opacity: 0 });
      gsap.set(scrollInd, { opacity: 0 });

      tl.to(tag, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
        .to(lines, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.1,
        }, '-=0.3')
        .to(sub, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .to(cta, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1 }, '-=0.4')
        .to(scrollInd, { opacity: 1, duration: 0.5 }, '-=0.2');

      // Floating orb animations
      gsap.to(orb1Ref.current, {
        x: 60,
        y: -40,
        duration: 6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(orb2Ref.current, {
        x: -40,
        y: 60,
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1,
      });

      // Parallax on scroll
      gsap.to(headingRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-ink"
    >
      {/* Background orbs */}
      <div
        ref={orb1Ref}
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          top: '-10%',
          right: '-5%',
          background: 'radial-gradient(circle, rgba(107, 92, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          bottom: '-10%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(200, 255, 0, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#F0EDE8 1px, transparent 1px), linear-gradient(90deg, #F0EDE8 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">
        {/* Tagline pill */}
        <div ref={taglineRef} className="mb-8 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 bg-ink-muted border border-acid/20 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse" />
            <span className="font-mono text-xs text-acid/80 tracking-widest uppercase">Premium Digital Agency</span>
          </span>
        </div>

        {/* Heading */}
        <div
          ref={headingRef}
          className="mb-8"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          <div className="overflow-hidden">
            <h1 className="hero-line text-display text-[clamp(3.5rem,9vw,9rem)] text-chalk leading-[0.92]">
              We Build
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-line text-display text-[clamp(3.5rem,9vw,9rem)] leading-[0.92]">
              <span className="text-acid">Digital</span>
              <span className="text-chalk"> Products</span>
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-line text-display text-[clamp(3.5rem,9vw,9rem)] text-chalk/30 leading-[0.92]">
              That Matter.
            </h1>
          </div>
        </div>

        {/* Subheading */}
        <p
          ref={subRef}
          className="font-body text-chalk/50 text-lg max-w-md leading-relaxed mb-12"
        >
          Enterprise software, stunning websites, and mobile apps—engineered for
          performance and designed for humans.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
          <Link to="/contact" className="cta-item btn-primary">
            Start a Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </Link>
          <a href="#projects" className="cta-item btn-outline">
            View Our Work
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-sm">
          {[
            { num: '50+', label: 'Projects Delivered' },
            { num: '8+', label: 'Years Experience' },
            { num: '98%', label: 'Client Satisfaction' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="font-display font-800 text-2xl text-chalk tracking-tight">{stat.num}</div>
              <div className="font-body text-xs text-chalk/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-chalk/30 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-chalk/30 to-transparent relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1/2 bg-acid"
            style={{ animation: 'scrollDown 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}
