import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function Reviews() {
  const { t } = useLanguage();
  return (
    <section className="py-32 bg-brand-black border-y border-gold-500/10 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.7 }}
           className="flex flex-col items-center"
        >
          <div className="flex gap-2 mb-8 opacity-60">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-8 h-8 text-gold-500 fill-current" />
            ))}
          </div>
          
          <h3 className="text-4xl sm:text-6xl md:text-8xl font-display text-[#F4F1ED] mb-6 leading-none">
            4.8<span className="text-2xl sm:text-4xl text-zinc-500 italic">/5</span>
          </h3>
          
          <p className="text-xl font-light text-zinc-300 mb-12 tracking-[0.1em] uppercase text-sm">
            {t.reviews.basedOn} <span className="font-semibold text-gold-500">{t.reviews.google}</span>
          </p>

          <div className="inline-block px-8 py-4 border-y border-gold-500/20 bg-brand-dark/50">
            <p className="text-zinc-400 font-light italic text-lg">
              {t.reviews.quote}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
