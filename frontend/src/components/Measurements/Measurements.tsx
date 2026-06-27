import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { measurements } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Measurements() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated counters for numeric measurements
      measurements.forEach((m, i) => {
        if (m.numericValue && counterRefs.current[i]) {
          const counter = { value: 0 };
          gsap.to(counter, {
            value: m.numericValue,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: counterRefs.current[i],
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            onUpdate: () => {
              if (counterRefs.current[i]) {
                const display = m.unit === 'ft'
                  ? `${Math.floor(counter.value)}'${Math.round((counter.value % 1) * 10)}"`
                  : `${Math.round(counter.value)}`;
                counterRefs.current[i]!.textContent = display;
              }
            },
          });
        }
      });

      // Card reveal
      gsap.fromTo(
        '.measurement-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.measurements-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-40 px-6 md:px-16 lg:px-24 bg-charcoal"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.5em] uppercase text-grey-500 block mb-6"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            04 / Measurements
          </motion.span>
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The <em className="text-gold">Details</em>
          </motion.h2>
        </div>

        {/* Measurements Grid */}
        <div className="measurements-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {measurements.map((m, index) => (
            <div
              key={m.label}
              className="measurement-card group relative p-8 md:p-10 border border-white/5 hover:border-gold/20 transition-all duration-500"
            >
              {/* Decorative corner */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <span
                className="text-[9px] tracking-[0.4em] uppercase text-grey-500 block mb-4"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {m.label}
              </span>

              {m.numericValue ? (
                <div className="flex items-baseline gap-1">
                  <span
                    ref={(el) => { counterRefs.current[index] = el; }}
                    className="text-4xl md:text-5xl lg:text-6xl text-white"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    0
                  </span>
                  {m.unit && (
                    <span
                      className="text-sm text-gold/60 ml-1"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {m.unit}
                    </span>
                  )}
                </div>
              ) : (
                <span
                  className={`${m.value.length > 12 ? 'text-base md:text-lg text-grey-300 font-normal leading-relaxed' : 'text-3xl md:text-4xl lg:text-5xl text-white'} block`}
                  style={{ fontFamily: m.value.length > 12 ? 'var(--font-body)' : 'var(--font-heading)' }}
                >
                  {m.value}
                </span>
              )}

              {/* Subtle gold line at bottom */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-gold/40 group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
