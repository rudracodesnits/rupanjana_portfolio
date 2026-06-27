import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Curtain/mask reveal — image slides in from behind a cover */
export function animateImageReveal(
  container: HTMLElement,
  options: {
    direction?: 'left' | 'right' | 'up' | 'down';
    delay?: number;
    duration?: number;
  } = {}
) {
  const { direction = 'up', delay = 0, duration = 1.2 } = options;
  const image = container.querySelector('img, .image-placeholder');
  if (!image) return;

  const clipPaths: Record<string, { from: string; to: string }> = {
    up: { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
    down: { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },
    left: { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
    right: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
  };

  gsap.fromTo(
    container,
    { clipPath: clipPaths[direction].from },
    {
      clipPath: clipPaths[direction].to,
      duration,
      delay,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );

  // Counter-scale: the image scales down as it reveals for a cinematic feel
  gsap.fromTo(
    image,
    { scale: 1.3 },
    {
      scale: 1,
      duration: duration * 1.5,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/** Parallax scroll effect on an element */
export function createParallax(
  element: HTMLElement,
  speed: number = 0.3,
  options: {
    direction?: 'vertical' | 'horizontal';
  } = {}
) {
  const { direction = 'vertical' } = options;
  const prop = direction === 'vertical' ? 'y' : 'x';

  gsap.to(element, {
    [prop]: `${speed * 100}%`,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });
}

/** Fade + scale reveal on scroll */
export function animateFadeScale(
  elements: HTMLElement | HTMLElement[] | NodeListOf<Element>,
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
    scale?: number;
  } = {}
) {
  const { delay = 0, duration = 0.8, stagger = 0.15, scale = 0.95 } = options;

  gsap.fromTo(
    elements,
    { opacity: 0, scale, y: 30 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elements instanceof NodeList ? elements[0] : Array.isArray(elements) ? elements[0] : elements,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
}
