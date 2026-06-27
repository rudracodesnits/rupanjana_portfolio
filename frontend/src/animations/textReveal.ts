import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Split text into spans for reveal animation */
export function splitTextIntoSpans(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || '';
  element.textContent = '';

  const spans: HTMLSpanElement[] = [];
  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.overflow = 'hidden';
    element.appendChild(span);
    spans.push(span);
  });

  return spans;
}

/** Animate text reveal with stagger — characters slide up from below */
export function animateTextReveal(
  element: HTMLElement,
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
    scrollTrigger?: boolean;
  } = {}
) {
  const { delay = 0, duration = 0.8, stagger = 0.03, scrollTrigger = false } = options;
  const spans = splitTextIntoSpans(element);

  const config: gsap.TweenVars = {
    y: '110%',
    opacity: 0,
    duration,
    stagger,
    delay,
    ease: 'power4.out',
  };

  if (scrollTrigger) {
    config.scrollTrigger = {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none none',
    };
  }

  gsap.fromTo(spans, { y: '110%', opacity: 0 }, config);
}

/** Animate words reveal — each word slides up */
export function animateWordsReveal(
  element: HTMLElement,
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
    scrollTrigger?: boolean;
  } = {}
) {
  const { delay = 0, duration = 0.8, stagger = 0.08, scrollTrigger = false } = options;
  const text = element.textContent || '';
  element.textContent = '';

  const words = text.split(' ');
  const wordSpans: HTMLElement[] = [];

  words.forEach((word, i) => {
    const wrapper = document.createElement('span');
    wrapper.style.display = 'inline-block';
    wrapper.style.overflow = 'hidden';
    wrapper.style.verticalAlign = 'top';

    const inner = document.createElement('span');
    inner.textContent = word;
    inner.style.display = 'inline-block';

    wrapper.appendChild(inner);
    element.appendChild(wrapper);

    if (i < words.length - 1) {
      element.appendChild(document.createTextNode(' '));
    }

    wordSpans.push(inner);
  });

  const config: gsap.TweenVars = {
    y: 0,
    opacity: 1,
    duration,
    stagger,
    delay,
    ease: 'power3.out',
  };

  if (scrollTrigger) {
    config.scrollTrigger = {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none none',
    };
  }

  gsap.fromTo(wordSpans, { y: '100%', opacity: 0 }, config);
}

/** Line-by-line paragraph reveal */
export function animateLinesReveal(
  container: HTMLElement,
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
  } = {}
) {
  const { delay = 0, duration = 0.8, stagger = 0.1 } = options;
  const children = container.children;

  gsap.fromTo(
    children,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
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
