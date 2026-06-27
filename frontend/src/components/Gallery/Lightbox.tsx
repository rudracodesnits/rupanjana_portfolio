import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type GalleryImage } from '../../data/portfolio';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isOpen = currentIndex !== null;
  const currentImage = isOpen ? images[currentIndex] : null;

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Touch/swipe support
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - startX;
      const deltaY = e.changedTouches[0].clientY - startY;

      // Horizontal swipe
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0 && currentIndex !== null) {
          onNavigate((currentIndex - 1 + images.length) % images.length);
        } else if (deltaX < 0 && currentIndex !== null) {
          onNavigate((currentIndex + 1) % images.length);
        }
      }

      // Vertical swipe down to close
      if (deltaY > 100) {
        onClose();
      }
    };

    const el = containerRef.current;
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[5000] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          data-cursor-hide="true"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Image */}
          <motion.div
            className="relative z-10 max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentImage.src ? (
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-w-full max-h-[85vh] object-contain"
              />
            ) : (
              <div className="w-[60vw] max-w-[800px] aspect-[3/4] image-placeholder rounded-sm">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase text-grey-400/80"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {currentImage.alt}
                  </span>
                  <span
                    className="text-[9px] tracking-[0.2em] uppercase text-grey-400/50"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {currentImage.category.replace('-', ' ')}
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Close Button */}
          <motion.button
            className="absolute top-6 right-6 md:top-10 md:right-10 z-20 w-12 h-12 flex items-center justify-center group"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            aria-label="Close lightbox"
          >
            <span className="relative w-6 h-6">
              <span className="absolute top-1/2 left-0 w-full h-px bg-white/60 group-hover:bg-white transition-colors duration-300 rotate-45" />
              <span className="absolute top-1/2 left-0 w-full h-px bg-white/60 group-hover:bg-white transition-colors duration-300 -rotate-45" />
            </span>
          </motion.button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <motion.button
                className="hidden md:flex absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center group"
                onClick={() => onNavigate((currentIndex! - 1 + images.length) % images.length)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                aria-label="Previous image"
              >
                <svg
                  width="24" height="24" viewBox="0 0 24 24" fill="none"
                  className="text-white/60 group-hover:text-white transition-colors duration-300"
                >
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>

              <motion.button
                className="hidden md:flex absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center group"
                onClick={() => onNavigate((currentIndex! + 1) % images.length)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                aria-label="Next image"
              >
                <svg
                  width="24" height="24" viewBox="0 0 24 24" fill="none"
                  className="text-white/60 group-hover:text-white transition-colors duration-300"
                >
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </>
          )}

          {/* Counter */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span
              className="text-[10px] tracking-[0.4em] text-white/40"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {String(currentIndex! + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
