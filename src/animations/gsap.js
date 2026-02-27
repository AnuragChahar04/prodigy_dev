import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// Text reveal animation
export const textReveal = (elements, options = {}) => {
  const defaults = {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out',
    stagger: 0.08,
    delay: 0,
  };
  const config = { ...defaults, ...options };

  return gsap.from(elements, {
    y: config.y,
    opacity: config.opacity,
    duration: config.duration,
    ease: config.ease,
    stagger: config.stagger,
    delay: config.delay,
  });
};

// Fade in from below with scroll trigger
export const fadeInUp = (elements, trigger, options = {}) => {
  const defaults = {
    y: 60,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.1,
    start: 'top 85%',
  };
  const config = { ...defaults, ...options };

  return gsap.from(elements, {
    y: config.y,
    opacity: config.opacity,
    duration: config.duration,
    ease: config.ease,
    stagger: config.stagger,
    scrollTrigger: {
      trigger: trigger,
      start: config.start,
      toggleActions: 'play none none none',
    },
  });
};

// Scale reveal
export const scaleReveal = (elements, trigger, options = {}) => {
  const defaults = {
    scale: 0.85,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.15,
    start: 'top 85%',
  };
  const config = { ...defaults, ...options };

  return gsap.from(elements, {
    scale: config.scale,
    opacity: config.opacity,
    duration: config.duration,
    ease: config.ease,
    stagger: config.stagger,
    scrollTrigger: {
      trigger: trigger,
      start: config.start,
      toggleActions: 'play none none none',
    },
  });
};

// Line draw animation
export const lineReveal = (element, trigger) => {
  return gsap.from(element, {
    scaleX: 0,
    transformOrigin: 'left center',
    duration: 1.2,
    ease: 'power4.inOut',
    scrollTrigger: {
      trigger: trigger,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
};

// Parallax effect
export const parallax = (element, speed = 0.5) => {
  return gsap.to(element, {
    y: () => -window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// Clip path reveal
export const clipReveal = (element, trigger) => {
  return gsap.from(element, {
    clipPath: 'inset(0 100% 0 0)',
    duration: 1.2,
    ease: 'power4.inOut',
    scrollTrigger: {
      trigger: trigger || element,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
};

// Counter animation
export const countUp = (element, end, duration = 2) => {
  return gsap.from(element, {
    textContent: 0,
    duration: duration,
    ease: 'power2.out',
    snap: { textContent: 1 },
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    onUpdate() {
      element.textContent = Math.floor(element.textContent);
    },
  });
};

// Stagger children
export const staggerChildren = (parent, childSelector, trigger, options = {}) => {
  const defaults = {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.12,
    start: 'top 85%',
  };
  const config = { ...defaults, ...options };

  const children = parent.querySelectorAll(childSelector);

  return gsap.from(children, {
    y: config.y,
    opacity: config.opacity,
    duration: config.duration,
    ease: config.ease,
    stagger: config.stagger,
    scrollTrigger: {
      trigger: trigger || parent,
      start: config.start,
      toggleActions: 'play none none none',
    },
  });
};

export default {
  textReveal,
  fadeInUp,
  scaleReveal,
  lineReveal,
  parallax,
  clipReveal,
  countUp,
  staggerChildren,
};
