import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../../data/portfolio';
import { cn } from '../../utils/cn';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      setIsScrolled(currentY > 80);

      // Hide on scroll down, show on scroll up
      if (currentY > lastScrollY.current && currentY > 300) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;

      // Active section detection
      const sections = navLinks
        .map((link) => document.querySelector(link.href))
        .filter(Boolean) as HTMLElement[];

      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= 200) {
          setActiveSection(navLinks[i].href.replace('#', ''));
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[1000] transition-all duration-500',
          isScrolled
            ? 'py-3 md:py-4'
            : 'py-5 md:py-6'
        )}
        animate={{
          y: isHidden ? -100 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Glassmorphism background */}
        <motion.div
          className={cn(
            'absolute inset-0 border-b transition-all duration-400',
            isScrolled
              ? 'bg-[rgba(250,250,250,0.85)] border-b-[rgba(0,0,0,0.05)] backdrop-blur-[20px] backdrop-saturate-[180%]'
              : 'bg-transparent border-b-transparent backdrop-blur-0'
          )}
        />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="relative z-10"
            data-cursor-hover="true"
          >
            <motion.span
              className="text-sm md:text-base tracking-[0.3em] uppercase"
              style={{
                fontFamily: 'var(--font-heading)',
                color: isScrolled ? '#111111' : '#111111',
              }}
              whileHover={{ letterSpacing: '0.4em' }}
              transition={{ duration: 0.3 }}
            >
              Rupanjana
            </motion.span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="relative group"
                data-cursor-hover="true"
              >
                <span
                  className={cn(
                    'text-[11px] tracking-[0.2em] uppercase transition-colors duration-300',
                    activeSection === link.href.replace('#', '')
                      ? 'text-charcoal'
                      : 'text-grey-500 hover:text-charcoal'
                  )}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {link.label}
                </span>
                {/* Animated underline */}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-px bg-gold transition-all duration-500 ease-out',
                    activeSection === link.href.replace('#', '')
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  )}
                />
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="relative z-10 md:hidden w-8 h-8 flex flex-col items-end justify-center gap-[5px]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            data-cursor-hover="true"
          >
            <motion.span
              className="block h-px bg-charcoal origin-right"
              animate={{
                width: isMenuOpen ? 24 : 24,
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? 0 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-px bg-charcoal"
              animate={{
                width: isMenuOpen ? 0 : 16,
                opacity: isMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-px bg-charcoal origin-right"
              animate={{
                width: isMenuOpen ? 24 : 20,
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 0 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center"
            style={{ backgroundColor: '#FAFAFA' }}
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 30px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 30px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 30px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-3xl tracking-[0.15em] uppercase text-charcoal hover:text-gold transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-center"
              >
                <p
                  className="text-[10px] tracking-[0.4em] uppercase text-grey-400"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Rupanjana Roy &bull; Model
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
