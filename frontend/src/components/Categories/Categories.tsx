import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categories } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.category-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.categories-grid',
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
      className="relative py-24 md:py-40 px-8 md:px-20 lg:px-32 bg-primary"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.5em] uppercase text-grey-400 block mb-6"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            03 / Categories
          </motion.span>
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl text-charcoal"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Explore by <em className="text-gold">Genre</em>
          </motion.h2>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`category-card group relative overflow-hidden cursor-pointer ${
                index === 0 || index === 5 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
              data-cursor-text="Explore"
              role="button"
              tabIndex={0}
              aria-label={`View ${category.title} gallery`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                {/* Image / Placeholder */}
                {category.coverImage ? (
                  <img
                    src={category.coverImage}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="image-placeholder w-full h-full transition-transform duration-700 ease-out group-hover:scale-105" />
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <span
                      className="text-[9px] tracking-[0.4em] uppercase text-white/40 block mb-2"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {category.subtitle}
                    </span>
                    <h3
                      className="text-2xl md:text-3xl text-white mb-2"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {category.title}
                    </h3>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span
                        className="text-[10px] tracking-[0.2em] uppercase text-gold"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {category.count} Works
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gold">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hover border accent */}
                <div className="absolute inset-0 border border-transparent group-hover:border-gold/20 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
