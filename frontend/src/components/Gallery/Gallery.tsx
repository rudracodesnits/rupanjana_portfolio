import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryImages, type GalleryImage } from '../../data/portfolio';
import Lightbox from './Lightbox';

gsap.registerPlugin(ScrollTrigger);

function GalleryImageCard({
  image,
  index,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const aspectClasses = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    square: 'aspect-square',
  };

  return (
    <motion.div
      ref={cardRef}
      className={`gallery-card cursor-pointer group break-inside-avoid mb-4 md:mb-8 ${image.src ? '' : aspectClasses[image.aspect]}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay: (index % 3) * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onClick}
      data-cursor-text="View"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      aria-label={`View ${image.alt}`}
    >
      <div className="relative overflow-hidden w-full">
        {/* Image / Placeholder */}
        {image.src ? (
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
              <span
                className="text-[9px] tracking-[0.3em] uppercase text-grey-400/60"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {image.category}
              </span>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-500" />
      </div>

      {/* Optional Caption */}
      {image.caption && (
        <div className="mt-3 text-center">
          <span 
            className="text-[10px] tracking-[0.2em] uppercase text-charcoal/60"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {image.caption}
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = galleryImages;

  const handleKeyNavigation = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return;

    if (e.key === 'ArrowRight') {
      setLightboxIndex((prev) =>
        prev !== null ? (prev + 1) % filteredImages.length : 0
      );
    } else if (e.key === 'ArrowLeft') {
      setLightboxIndex((prev) =>
        prev !== null
          ? (prev - 1 + filteredImages.length) % filteredImages.length
          : 0
      );
    } else if (e.key === 'Escape') {
      setLightboxIndex(null);
    }
  }, [lightboxIndex, filteredImages.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, [handleKeyNavigation]);

  return (
    <>
      <section
        ref={sectionRef}
        id="portfolio"
        className="relative py-24 md:py-40 px-6 md:px-16 lg:px-24 bg-white"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[10px] tracking-[0.5em] uppercase text-grey-400 block mb-6"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                02 / Portfolio
              </motion.span>
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl text-charcoal"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Selected <em className="text-gold">Works</em>
              </motion.h2>
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
            {filteredImages.map((image, index) => (
              <GalleryImageCard
                key={image.id}
                image={image}
                index={index}
                onClick={() => setLightboxIndex(index)}
              />
            ))}
          </div>

          {/* Gallery count */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <span
              className="text-[10px] tracking-[0.4em] uppercase text-grey-400"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {filteredImages.length} Images
            </span>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(index) => setLightboxIndex(index)}
      />
    </>
  );
}
