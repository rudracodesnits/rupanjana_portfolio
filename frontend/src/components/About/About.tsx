import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profileData, languages, categories } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the large quote text
      gsap.fromTo(
        '.about-quote-line',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-quote',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate the description paragraphs
      gsap.fromTo(
        '.about-desc',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-desc-container',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate tags
      gsap.fromTo(
        '.about-tag',
        { y: 20, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-tags',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Image reveal
      gsap.fromTo(
        '.about-image-wrapper',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: '.about-image-wrapper',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const specialties = categories.map((c) => c.title);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-40 px-6 md:px-16 lg:px-24 bg-primary"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <span
            className="text-[10px] tracking-[0.5em] uppercase text-grey-400"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            01 / About
          </span>
        </motion.div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — Image */}
          <div className="lg:col-span-5">
            <div className="about-image-wrapper relative aspect-[3/4] overflow-hidden image-placeholder">
              <img
                src="/images/gallery/IMG_1693.PNG"
                alt="Rupanjana Roy"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 to-transparent z-10 pointer-events-none" />
            </div>

            {/* Image caption */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-4 text-[10px] tracking-[0.3em] uppercase text-grey-400"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Portrait &mdash; {profileData.edition}
            </motion.p>
          </div>

          {/* Right — Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Large editorial quote */}
            <div className="about-quote mb-12 md:mb-16">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.15] text-charcoal"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <span className="about-quote-line block">Elegance is not about</span>
                <span className="about-quote-line block">
                  being noticed, it&apos;s about
                </span>
                <span className="about-quote-line block">
                  being <em className="text-gold">remembered.</em>
                </span>
              </h2>
            </div>

            {/* Description */}
            <div className="about-desc-container mb-12">
              <p
                className="about-desc text-sm md:text-base leading-[1.8] text-grey-500 max-w-xl"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {profileData.description}
              </p>
            </div>

            {/* Divider */}
            <motion.div
              className="w-16 h-px bg-gold/40 mb-10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
            />

            {/* Languages & Specialties */}
            <div className="about-tags space-y-8">
              <div>
                <h3
                  className="text-[10px] tracking-[0.4em] uppercase text-grey-400 mb-4"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <span
                      key={lang}
                      className="about-tag inline-flex items-center px-4 py-2 text-[10px] tracking-[0.2em] uppercase border border-charcoal/10 text-charcoal/70 hover:border-gold hover:text-gold transition-all duration-300"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className="text-[10px] tracking-[0.4em] uppercase text-grey-400 mb-4"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Specialties
                </h3>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((spec) => (
                    <span
                      key={spec}
                      className="about-tag inline-flex items-center px-4 py-2 text-[10px] tracking-[0.2em] uppercase border border-charcoal/10 text-charcoal/70 hover:border-gold hover:text-gold transition-all duration-300"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
