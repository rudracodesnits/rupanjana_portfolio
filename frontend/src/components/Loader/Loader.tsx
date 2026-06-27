import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [counter, setCounter] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        setTimeout(onComplete, 600);
      },
    });

    // Counter animation
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCounter(Math.round(counterObj.value));
      },
    });

    // Line expand
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 2, ease: 'power4.inOut' },
      0
    );

    // Name reveal - staggered characters
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll('.char');
      tl.fromTo(
        chars,
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          stagger: 0.04,
          ease: 'power4.out',
        },
        0.3
      );
    }

    // Subtitle fade
    tl.fromTo(
      '.loader-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      1.2
    );

    // Final exit — clip away
    tl.to(containerRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.8,
      ease: 'power4.inOut',
      delay: 0.5,
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const nameChars = 'RUPANJANA ROY'.split('');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{
            backgroundColor: '#111111',
            clipPath: 'inset(0 0 0% 0)',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Counter */}
          <div className="absolute top-8 right-8 md:top-12 md:right-12">
            <span
              ref={counterRef}
              className="text-sm tracking-[0.3em] text-white/40"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {String(counter).padStart(3, '0')}
            </span>
          </div>

          {/* Horizontal line */}
          <div
            ref={lineRef}
            className="absolute top-1/2 left-1/2 w-[120px] h-px -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)',
              transformOrigin: 'center',
              transform: 'translateX(-50%) translateY(-50%) scaleX(0)',
            }}
          />

          {/* Name */}
          <h1
            ref={nameRef}
            className="text-3xl md:text-5xl lg:text-6xl tracking-[0.3em] text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
          >
            {nameChars.map((char, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden"
                style={{ verticalAlign: 'top' }}
              >
                <span className="char inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            className="loader-subtitle text-[10px] md:text-xs tracking-[0.5em] uppercase"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(201, 169, 110, 0.6)',
            }}
          >
            Model &bull; Talent
          </p>

          {/* Bottom progress bar */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[200px]">
            <div className="w-full h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, rgba(201,169,110,0.3), rgba(201,169,110,0.8))',
                  width: `${counter}%`,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
