import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../animations/gsap';

export default function CTA() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.querySelectorAll('.reveal-item'), {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      gsap.from(btnRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        delay: 0.4,
      });

      // Floating orbs
      gsap.to('.cta-orb-1', {
        y: -30,
        x: 20,
        duration: 5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
      gsap.to('.cta-orb-2', {
        y: 30,
        x: -20,
        duration: 7,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-ink-muted">
      {/* Background elements */}
      <div
        className="cta-orb-1 absolute w-96 h-96 rounded-full"
        style={{
          top: '-10%',
          left: '10%',
          background: 'radial-gradient(circle, rgba(200, 255, 0, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="cta-orb-2 absolute w-[500px] h-[500px] rounded-full"
        style={{
          bottom: '-20%',
          right: '5%',
          background: 'radial-gradient(circle, rgba(107, 92, 255, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Decorative text */}
      <div
        className="absolute top-8 right-8 font-mono text-xs tracking-widest uppercase text-chalk/5 select-none"
        style={{ fontSize: '10px' }}
      >
        Ready to build? →
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div ref={textRef}>
          <div className="reveal-item section-label mb-6 text-center">Let's Work Together</div>
          <h2 className="reveal-item text-display text-[clamp(3rem,7vw,7.5rem)] text-chalk mb-6 leading-[0.92]">
            Have a Project
          </h2>
          <h2 className="reveal-item text-display text-[clamp(3rem,7vw,7.5rem)] leading-[0.92]">
            <span className="text-acid">in Mind?</span>
          </h2>
          <p className="reveal-item font-body text-chalk/40 text-lg mt-8 max-w-lg mx-auto leading-relaxed">
            Tell us about your vision. We'll take it from napkin sketch to production-ready product.
          </p>
        </div>

        <div ref={btnRef} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact" className="btn-primary text-base px-10 py-5">
            Start the Conversation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </Link>
          <a
            href="mailto:hello@prodigydev.io"
            className="font-body text-sm text-chalk/40 hover:text-chalk transition-colors duration-300"
          >
            or email us directly →
          </a>
        </div>

        {/* Bottom decoration */}
        <div className="mt-20 flex items-center gap-6 justify-center">
          {['No Lock-in Contracts', 'Fast Turnarounds', 'Senior Engineers'].map((item, i) => (
            <div key={item} className="flex items-center gap-2">
              {i > 0 && <div className="w-px h-4 bg-chalk/10" />}
              <span className="font-mono text-xs text-chalk/30 tracking-widest">
                ✓ {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
