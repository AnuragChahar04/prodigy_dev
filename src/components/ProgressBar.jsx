import { useEffect, useRef } from 'react';
import { gsap } from '../animations/gsap';

export default function ProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      gsap.set(bar, { scaleX: progress });
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: '100%',
        background: 'linear-gradient(90deg, #C8FF00, #6B5CFF)',
        zIndex: 10000,
        transformOrigin: 'left center',
        transform: 'scaleX(0)',
      }}
    />
  );
}
