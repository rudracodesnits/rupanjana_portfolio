import { useState } from 'react';
import { motion } from 'framer-motion';

export default function VideoReel() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative py-24 md:py-40 px-8 md:px-20 lg:px-32 bg-white">
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
            07 / Showreel
          </motion.span>
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl text-charcoal"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            In <em className="text-gold">Motion</em>
          </motion.h2>
        </div>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-video overflow-hidden group cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
          data-cursor-text={isPlaying ? 'Pause' : 'Play'}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsPlaying(!isPlaying); }}
          aria-label={isPlaying ? 'Pause showreel' : 'Play showreel'}
        >
          {/* Thumbnail / Placeholder */}
          {!isPlaying && (
            <>
              {/* 
                REPLACE: Add video thumbnail here
                <img src="/images/video-thumbnail.jpg" alt="Showreel thumbnail" className="w-full h-full object-cover" />
              */}
              <div className="image-placeholder w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-charcoal/10 to-charcoal/20" />
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <motion.div
                  className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border border-white/30 group-hover:border-white/60 transition-all duration-500" />

                  {/* Pulsing ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-white/20"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Play triangle */}
                  <svg
                    width="24" height="28" viewBox="0 0 24 28" fill="none"
                    className="ml-1 text-white"
                  >
                    <path
                      d="M22 14L2 26V2L22 14Z"
                      fill="currentColor"
                      fillOpacity="0.9"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Label */}
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10">
                <span
                  className="text-[10px] tracking-[0.4em] uppercase text-white/50"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Play Showreel
                </span>
              </div>
            </>
          )}

          {/* Video placeholder when "playing" */}
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full flex items-center justify-center bg-charcoal"
            >
              {/* 
                REPLACE: Add actual video element or iframe here 
                <video src="/videos/showreel.mp4" autoPlay controls className="w-full h-full object-cover" />
              */}
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 rounded-full border border-gold/30 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="w-2 h-2 rounded-full bg-gold/60" />
                </motion.div>
                <p
                  className="text-[10px] tracking-[0.4em] uppercase text-grey-500"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Video Coming Soon
                </p>
                <p
                  className="text-[9px] tracking-[0.2em] text-grey-600 mt-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Replace with your showreel video
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
