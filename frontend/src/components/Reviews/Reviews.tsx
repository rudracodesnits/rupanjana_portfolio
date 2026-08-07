import { useRef } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { reviewsData } from '../../data/portfolio';

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    dragFree: true,
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-40 px-6 md:px-16 lg:px-24 bg-primary overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.5em] uppercase text-grey-400 block mb-6"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            06 / Testimonials
          </motion.span>
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl text-charcoal"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Kind <em className="text-gold">Words</em>
          </motion.h2>
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden" data-cursor-text="Drag">
          <div className="flex gap-6">
            {reviewsData.map((review, index) => (
              <motion.div
                key={review.id}
                className="flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Glassmorphism card */}
                <div className="relative p-8 md:p-10 h-full border border-charcoal/5 bg-white/60 backdrop-blur-sm hover:border-gold/20 transition-all duration-500 group">
                  {/* Quote mark */}
                  <span
                    className="text-6xl md:text-7xl text-gold/15 leading-none block mb-4"
                    style={{ fontFamily: 'var(--font-heading)' }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>

                  {/* Quote text */}
                  <div className="mb-8 space-y-3">
                    {review.quote.split('. ').map((sentence, idx, arr) => (
                      <p
                        key={idx}
                        className="text-sm md:text-base leading-[1.95] tracking-wide text-charcoal/70"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {sentence}{idx < arr.length - 1 ? '.' : ''}
                      </p>
                    ))}
                  </div>

                  {/* Reviewer info */}
                  <div className="border-t border-charcoal/5 pt-6">
                    <p
                      className="text-sm text-charcoal mb-1"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {review.name}
                    </p>
                    <p
                      className="text-[10px] tracking-[0.2em] uppercase text-grey-400"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {review.role}, {review.company}
                    </p>
                  </div>

                  {/* Hover accent line */}
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-gold/40 group-hover:w-full transition-all duration-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Drag hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <span
            className="text-[9px] tracking-[0.4em] uppercase text-grey-400"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Drag to explore
          </span>
        </motion.div>
      </div>
    </section>
  );
}
