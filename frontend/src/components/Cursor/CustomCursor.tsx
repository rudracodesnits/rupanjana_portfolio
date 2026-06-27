import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorState {
  isHovering: boolean;
  text: string;
  isHidden: boolean;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>({
    isHovering: false,
    text: '',
    isHidden: false,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const cursorText = target.getAttribute('data-cursor-text');
      const cursorHide = target.getAttribute('data-cursor-hide');

      if (cursorHide === 'true') {
        setState((prev) => ({ ...prev, isHidden: true }));
      } else {
        setState({
          isHovering: true,
          text: cursorText || '',
          isHidden: false,
        });
      }
    };

    const handleMouseLeave = () => {
      setState({ isHovering: false, text: '', isHidden: false });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Attach hover listeners to all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], [data-cursor-text], [data-cursor-hover], input, textarea'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Use MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll(
        'a, button, [role="button"], [data-cursor-text], [data-cursor-hover], input, textarea'
      );
      newElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      observer.disconnect();
      document.body.classList.remove('custom-cursor-active');
    };
  }, [mouseX, mouseY]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: state.isHidden ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Outer ring */}
        <motion.div
          className="rounded-full border border-charcoal/40 mix-blend-difference"
          animate={{
            width: state.isHovering ? (state.text ? 100 : 56) : 32,
            height: state.isHovering ? (state.text ? 100 : 56) : 32,
            borderColor: state.isHovering ? 'rgba(255,255,255,0.8)' : 'rgba(17,17,17,0.4)',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Cursor text label */}
          <motion.span
            className="text-white text-[10px] font-body uppercase tracking-[0.2em] whitespace-nowrap"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: state.text ? 1 : 0,
              scale: state.text ? 1 : 0.5,
            }}
            transition={{ duration: 0.2 }}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {state.text}
          </motion.span>
        </motion.div>

        {/* Inner dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 rounded-full bg-charcoal mix-blend-difference"
          style={{ transform: 'translate(-50%, -50%)' }}
          animate={{
            width: state.isHovering ? 0 : 4,
            height: state.isHovering ? 0 : 4,
            backgroundColor: state.isHovering ? '#ffffff' : '#111111',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        />
      </motion.div>
    </>
  );
}
