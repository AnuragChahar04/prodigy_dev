// GSAP animation helpers — called after component mounts

export const heroTimeline = (gsap, elements) => {
  const { tag, lines, sub, actions, scroll } = elements
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  if (tag) tl.from(tag, { opacity: 0, y: 20, duration: 0.6 }, 0.2)
  if (lines?.length) tl.from(lines, { opacity: 0, y: 70, stagger: 0.12, duration: 1 }, 0.4)
  if (sub) tl.from(sub, { opacity: 0, y: 30, duration: 0.7 }, 0.9)
  if (actions) tl.from(actions, { opacity: 0, y: 20, duration: 0.6 }, 1.1)
  if (scroll) tl.from(scroll, { opacity: 0, duration: 0.6 }, 1.4)

  return tl
}

export const staggerReveal = (gsap, ScrollTrigger, container, selector = '.stagger-item') => {
  const items = container.querySelectorAll(selector)
  if (!items.length) return

  gsap.from(items, {
    opacity: 0,
    y: 50,
    stagger: 0.1,
    duration: 0.85,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })
}

export const parallaxEl = (gsap, ScrollTrigger, el, yPercent = -25) => {
  gsap.to(el, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

export const textRevealSplit = (gsap, el) => {
  const words = el.textContent.split(' ')
  el.innerHTML = words
    .map((w) => `<span class="word-wrap" style="overflow:hidden;display:inline-block;"><span class="word">${w}</span></span>`)
    .join(' ')

  gsap.from(el.querySelectorAll('.word'), {
    y: '110%',
    opacity: 0,
    stagger: 0.05,
    duration: 0.9,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 82%',
    },
  })
}
