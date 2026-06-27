import { useRef, useCallback } from 'react';
import { lerp } from '../utils/cn';

export function useMagneticEffect(strength: number = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        posRef.current.x = lerp(posRef.current.x, deltaX, 0.15);
        posRef.current.y = lerp(posRef.current.y, deltaY, 0.15);
        element.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    const animate = () => {
      posRef.current.x = lerp(posRef.current.x, 0, 0.1);
      posRef.current.y = lerp(posRef.current.y, 0, 0.1);

      element.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;

      if (Math.abs(posRef.current.x) > 0.1 || Math.abs(posRef.current.y) > 0.1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        element.style.transform = 'translate(0, 0)';
      }
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
