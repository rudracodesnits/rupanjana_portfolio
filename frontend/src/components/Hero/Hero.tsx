import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profileData } from '../../data/portfolio';
import { useMagneticEffect } from '../../hooks/useMagneticEffect';

gsap.registerPlugin(ScrollTrigger);

function MagneticButton({
  children,
  className,
  href,
  variant = 'primary',
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  variant?: 'primary' | 'secondary';
}) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.25);

  const baseStyles =
    variant === 'primary'
      ? 'bg-charcoal text-white hover:bg-gold'
      : 'border border-charcoal/20 text-charcoal hover:border-gold hover:text-gold';

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href || '#portfolio'}
      className={`inline-flex items-center justify-center px-8 py-4 text-[10px] md:text-[11px] tracking-[0.3em] uppercase transition-all duration-500 ${baseStyles} ${className || ''}`}
      style={{ fontFamily: 'var(--font-body)' }}
      onMouseMove={handleMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover="true"
    >
      {children}
    </a>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Only run parallax and fade animations on desktop / tablet (>768px)
      mm.add("(min-width: 768px)", () => {
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            y: '20%',
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }

        if (contentRef.current) {
          gsap.to(contentRef.current, {
            y: -50,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: '30% top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-primary"
    >

      {/* Hero Image - Saree Picture */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none mix-blend-multiply">
        <motion.div
          ref={imageRef}
          className="w-full h-[120%] -top-[10%] relative"
        >
          <picture className="w-full h-full block">
            <source
              media="(max-width: 767px)"
              srcSet="/images/gallery/IMG_1708.PNG"
            />
            <img
              src="/images/gallery/IMG_1709.PNG"
              alt="Rupanjana Roy"
              className="w-full h-full object-cover object-[84%_20%] md:object-center"
            />
          </picture>
        </motion.div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16 lg:px-24"
      >
        <div className="max-w-[1400px] mx-auto w-full">
          {/* Edition tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <span
              className="text-[10px] tracking-[0.5em] uppercase text-gold font-bold"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {profileData.edition}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.0, duration: 0.01 }}
          >
            <motion.span
              className="block text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] xl:text-[10rem] leading-[0.9] text-gold"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 400,
              }}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 3.1,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {profileData.firstName}
            </motion.span>
            <motion.span
              className="block text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] xl:text-[10rem] leading-[0.9] text-gold"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 400,
                fontStyle: 'italic',
              }}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 3.3,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {profileData.lastName}
            </motion.span>
          </motion.h1>

          {/* Subtitle & CTAs */}
          <div className="mt-6 md:mt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] md:text-xs tracking-[0.4em] uppercase text-charcoal/60"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {profileData.profession}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col xs:flex-row gap-3 xs:gap-4"
            >
              <MagneticButton href="#portfolio" variant="primary">
                View Portfolio
              </MagneticButton>
              <MagneticButton href="#contact" variant="secondary">
                Book Now
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2, duration: 1 }}
      >
        <span
          className="text-[9px] tracking-[0.3em] uppercase text-charcoal/40 rotate-0"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-charcoal/40 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
}
