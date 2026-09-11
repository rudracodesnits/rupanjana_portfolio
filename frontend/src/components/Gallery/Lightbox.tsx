import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type GalleryImage } from '../../data/portfolio';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  title?: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ images, currentIndex, title, onClose, onNavigate }: LightboxProps) {
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
          className="fixed inset-0 z-[5000] flex flex-col items-center justify-between py-6 px-4 md:py-10 md:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          data-cursor-hide="true"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Top Bar: Title & Close Button */}
          <div className="relative z-20 w-full max-w-7xl flex items-center justify-between px-2 md:px-6">
            <div className="flex flex-col">
              <span
                className="text-[11px] md:text-[13px] tracking-[0.3em] uppercase text-gold font-medium"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {title || currentImage.caption || 'Outfit Collection'}
              </span>
              <span
                className="text-[9px] tracking-[0.2em] uppercase text-white/50 mt-1"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Photo {currentIndex! + 1} of {images.length}
              </span>
            </div>

            <button
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group"
              onClick={onClose}
              aria-label="Close lightbox"
            >
              <span className="relative w-5 h-5">
                <span className="absolute top-1/2 left-0 w-full h-px bg-white group-hover:bg-gold transition-colors duration-300 rotate-45" />
                <span className="absolute top-1/2 left-0 w-full h-px bg-white group-hover:bg-gold transition-colors duration-300 -rotate-45" />
              </span>
            </button>
          </div>

          {/* Center Image Container */}
          <div className="relative z-10 w-full max-w-6xl flex-1 flex items-center justify-center my-4 overflow-hidden">
            <motion.div
              key={currentImage.id}
              className="relative max-w-full max-h-[72vh] flex items-center justify-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-w-full max-h-[72vh] object-contain rounded-sm shadow-2xl"
              />
            </motion.div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  className="hidden md:flex absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-black/40 hover:bg-gold/20 text-white hover:text-gold border border-white/10 hover:border-gold/40 transition-all duration-300"
                  onClick={() => onNavigate((currentIndex! - 1 + images.length) % images.length)}
                  aria-label="Previous image"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <button
                  className="hidden md:flex absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-black/40 hover:bg-gold/20 text-white hover:text-gold border border-white/10 hover:border-gold/40 transition-all duration-300"
                  onClick={() => onNavigate((currentIndex! + 1) % images.length)}
                  aria-label="Next image"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          {images.length > 1 && (
            <motion.div
              className="relative z-20 flex items-center justify-center gap-2 max-w-full overflow-x-auto px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => onNavigate(idx)}
                  className={`relative w-12 h-12 md:w-14 md:h-14 rounded-md overflow-hidden transition-all duration-300 shrink-0 ${
                    idx === currentIndex
                      ? 'ring-2 ring-gold scale-105 opacity-100'
                      : 'opacity-40 hover:opacity-80 scale-95'
                  }`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
