import { motion } from 'framer-motion';
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope, HiOutlineGlobeAlt } from 'react-icons/hi2';
import { contactData, profileData } from '../../data/portfolio';
import { useMagneticEffect } from '../../hooks/useMagneticEffect';

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  delay: number;
}) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.15);

  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      className="group block p-6 md:p-8 border border-charcoal/5 hover:border-gold/20 transition-all duration-500 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover="true"
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full border border-charcoal/10 group-hover:border-gold/30 flex items-center justify-center transition-all duration-500 flex-shrink-0">
          <Icon className="w-4 h-4 text-grey-400 group-hover:text-gold transition-colors duration-500" />
        </div>

        <div>
          <span
            className="text-[9px] tracking-[0.4em] uppercase text-grey-400 block mb-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {label}
          </span>
          <span
            className="text-sm md:text-base text-charcoal group-hover:text-gold transition-colors duration-300"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {value}
          </span>
        </div>
      </div>

      {/* Hover accent */}
      <div className="absolute bottom-0 left-0 w-0 h-px bg-gold/40 group-hover:w-full transition-all duration-700" />
    </motion.a>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-40 px-6 md:px-16 lg:px-24 bg-primary"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Typography */}
          <div className="flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] tracking-[0.5em] uppercase text-grey-400 block mb-6"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              08 / Contact
            </motion.span>

            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl text-charcoal mb-8"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Let&apos;s Work <em className="text-gold">Together</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm md:text-base leading-[1.8] text-grey-500 max-w-md mb-10"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {profileData.description}
            </motion.p>

            {/* Decorative line */}
            <motion.div
              className="w-20 h-px bg-gold/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          {/* Right — Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ContactCard
              icon={HiOutlineMapPin}
              label="Location"
              value={contactData.address}
              href={`https://maps.google.com/?q=${encodeURIComponent(contactData.address)}`}
              delay={0.1}
            />
            <ContactCard
              icon={HiOutlinePhone}
              label="Phone"
              value={contactData.phone}
              href={`tel:${contactData.phone.replace(/\s/g, '')}`}
              delay={0.2}
            />
            <ContactCard
              icon={HiOutlineEnvelope}
              label="Email"
              value={contactData.email}
              href={`mailto:${contactData.email}`}
              delay={0.3}
            />
            <ContactCard
              icon={HiOutlineGlobeAlt}
              label="Website"
              value={contactData.website}
              href={`https://${contactData.website}`}
              delay={0.4}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
