import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { outfitSets, type OutfitSet } from '../../data/portfolio';
import Lightbox from './Lightbox';

gsap.registerPlugin(ScrollTrigger);

function OutfitCard({
  outfit,
  index,
  onClick,
}: {
  outfit: OutfitSet;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const aspectClass = 'aspect-[3/4]';

  return (
    <motion.div
      ref={cardRef}
      className="outfit-card w-full cursor-pointer group relative break-inside-avoid mb-6 md:mb-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay: (index % 3) * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      aria-label={`View ${outfit.title} outfit collection`}
    >
      <div className={`relative overflow-hidden w-full rounded-sm ${aspectClass} bg-charcoal/5 shadow-md border border-black/5 group-hover:border-gold/30 transition-all duration-500`}>
        {/* Cover Image */}
        <img
          src={outfit.coverImage.src}
          alt={outfit.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-90 transition-all duration-500" />

        {/* Photo Count Badge (Top Right) */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-medium bg-black/60 backdrop-blur-md text-gold border border-gold/30 shadow-sm flex items-center gap-1.5 group-hover:bg-gold group-hover:text-charcoal transition-all duration-300">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            {outfit.images.length} {outfit.images.length === 1 ? 'Photo' : 'Photos'}
          </span>
        </div>

        {/* Content Details (Bottom Overlay) */}
        <div className="absolute bottom-0 inset-x-0 p-5 z-10 flex flex-col justify-end text-left">
          <span
            className="text-[9px] tracking-[0.3em] uppercase text-gold/90 mb-1"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {outfit.category.replace('-', ' ')}
          </span>
          <h3
            className="text-lg md:text-xl text-white font-serif group-hover:text-gold transition-colors duration-300 line-clamp-1"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {outfit.title}
          </h3>
          <p
            className="text-[10px] tracking-[0.2em] uppercase text-white/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Expand Outfit Lookbook &rarr;
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedOutfitIndex, setSelectedOutfitIndex] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const selectedOutfit = selectedOutfitIndex !== null ? outfitSets[selectedOutfitIndex] : null;

  const handleKeyNavigation = useCallback((e: KeyboardEvent) => {
    if (!selectedOutfit) return;

    if (e.key === 'ArrowRight') {
      setCurrentImageIndex((prev) => (prev + 1) % selectedOutfit.images.length);
    } else if (e.key === 'ArrowLeft') {
      setCurrentImageIndex((prev) => (prev - 1 + selectedOutfit.images.length) % selectedOutfit.images.length);
    } else if (e.key === 'Escape') {
      setSelectedOutfitIndex(null);
    }
  }, [selectedOutfit]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, [handleKeyNavigation]);

  const handleOpenOutfit = (index: number) => {
    setSelectedOutfitIndex(index);
    setCurrentImageIndex(0); // Start at default cover photo
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="portfolio"
        className="relative py-24 md:py-40 px-6 md:px-20 lg:px-32 bg-white"
      >
        <div className="w-full mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-20">
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
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs md:text-sm text-grey-400 tracking-wider max-w-md"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Click any outfit collection below to explore full lookbooks and detailed shoot captures.
            </motion.p>
          </div>

          {/* Outfit Collections Grid (6 Visible Outfits) */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {outfitSets.map((outfit, index) => (
              <OutfitCard
                key={outfit.id}
                outfit={outfit}
                index={index}
                onClick={() => handleOpenOutfit(index)}
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
              6 Outfit Collections &bull; {outfitSets.reduce((acc, o) => acc + o.images.length, 0)} Photos
            </span>
          </motion.div>
        </div>
      </section>

      {/* Lightbox for Selected Outfit */}
      {selectedOutfit && (
        <Lightbox
          images={selectedOutfit.images}
          currentIndex={currentImageIndex}
          title={selectedOutfit.title}
          onClose={() => setSelectedOutfitIndex(null)}
          onNavigate={(index) => setCurrentImageIndex(index)}
        />
      )}
    </>
  );
}
