import { motion } from 'framer-motion';
import { FiInstagram } from 'react-icons/fi';
import { socialLinks, profileData } from '../../data/portfolio';

const iconMap: Record<string, React.ElementType> = {
  instagram: FiInstagram,
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 md:py-24 px-8 md:px-20 lg:px-32 bg-charcoal border-t border-white/5">
      <div className="max-w-[1200px] mx-auto">
        {/* Large Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2
            className="text-4xl md:text-6xl lg:text-8xl text-white/5 select-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {profileData.name}
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {/* Left */}
          <div>
            <p
              className="text-sm text-white/40 mb-4"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {profileData.profession}
            </p>
            <p
              className="text-[10px] tracking-[0.2em] text-white/20"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              &copy; {new Date().getFullYear()} {profileData.name}. All rights reserved.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = iconMap[social.icon];
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold/40 hover:bg-gold/5 transition-all duration-500 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  data-cursor-hover="true"
                >
                  {Icon && (
                    <Icon className="w-4 h-4 text-white/40 group-hover:text-gold transition-colors duration-300" />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 group"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            data-cursor-hover="true"
            aria-label="Scroll to top"
          >
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-white/30 group-hover:text-gold/60 transition-colors duration-300"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Back to top
            </span>
            <motion.svg
              width="12" height="12" viewBox="0 0 24 24" fill="none"
              className="text-white/30 group-hover:text-gold/60 transition-colors duration-300"
              whileHover={{ y: -3 }}
            >
              <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
