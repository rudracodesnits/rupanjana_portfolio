import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceData } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Only animate timeline vertical line on desktop
      mm.add("(min-width: 768px)", () => {
        if (lineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: lineRef.current,
                start: 'top 70%',
                end: 'bottom 30%',
                scrub: 1,
              },
            }
          );
        }
      });

      // Entry reveals run on both mobile and desktop
      gsap.fromTo(
        '.timeline-entry',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const typeColors: Record<string, string> = {
    runway: 'text-gold',
    editorial: 'text-white/70',
    campaign: 'text-gold-light',
    commercial: 'text-gold-light',
    event: 'text-grey-400',
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative pt-32 pb-24 md:pt-56 md:pb-40 px-8 md:px-20 lg:px-32 bg-charcoal"
    >
      {/* Subtle top divider to separate from Measurements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-[900px] mx-auto">
        {/* Section header */}
        <div className="mb-16 md:mb-24 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.5em] uppercase text-grey-500 block mb-6"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            05 / Experience
          </motion.span>
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Career <em className="text-gold">Journey</em>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="timeline-container relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/30 via-gold/10 to-transparent"
            style={{ transformOrigin: 'top' }}
          />

          {/* Timeline entries */}
          <div className="space-y-12 md:space-y-16">
            {experienceData.map((entry, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={entry.id}
                  className={`timeline-entry relative flex items-start ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-charcoal border border-gold/40 z-10 mt-2" />

                  {/* Content */}
                  <div
                    className={`pl-12 md:pl-0 md:w-[45%] ${
                      isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    }`}
                  >
                    <span
                      className="text-[10px] tracking-[0.4em] uppercase text-grey-500 block mb-2"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {entry.year}
                    </span>

                    <span
                      className={`text-[9px] tracking-[0.3em] uppercase ${typeColors[entry.type] || 'text-grey-400'} block mb-3`}
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {entry.type}
                    </span>

                    <h3
                      className="text-xl md:text-2xl text-white mb-3"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {entry.title}
                    </h3>

                    <div className="space-y-2">
                      {entry.description.split('. ').map((sentence, idx, arr) => (
                        <p
                          key={idx}
                          className="text-sm md:text-base leading-[2] tracking-wide text-grey-500"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {sentence}{idx < arr.length - 1 ? '.' : ''}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
