import { motion } from 'motion/react';
import { useLanguage } from './LanguageProvider';

export default function Services() {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-brand-black relative" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-12 h-px bg-gold-500/50"></span>
              <h2 className="text-gold-500 font-medium tracking-[0.2em] uppercase text-xs">{t.services.menu}</h2>
              <span className="w-12 h-px bg-gold-500/50"></span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#F4F1ED] mb-6">
              {t.services.title1}<br />
              <span className="italic text-gold-400">{t.services.title2}</span>
            </h3>
            <p className="text-zinc-400 text-lg font-light">
              {t.services.subtitle}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {t.services.items.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col items-center text-center p-8 border-b-2 border-brand-gray hover:border-gold-500/50 transition-colors duration-500"
            >
              <h4 className="text-2xl font-display text-[#F4F1ED] group-hover:text-gold-400 transition-colors mb-4">
                {service.name}
              </h4>
              <p className="text-zinc-400 font-light leading-relaxed max-w-md">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
