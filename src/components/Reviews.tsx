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
            5.0<span className="text-2xl sm:text-4xl text-zinc-500 italic">/5</span>
          </h3>
          
          <p className="text-xl font-light text-zinc-300 mb-12 tracking-[0.1em] uppercase text-sm">
            {t.reviews.basedOn} 133 <span className="font-semibold text-gold-500">{t.reviews.google}</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-8 w-full">
            {[
              { name: "salman khribi", text: "been coming to this barber shop for 3 years now and by far the best barber ever" },
              { name: "Ahmed Salem", text: "One of the best barber shops in Rabat. Don't hesitate to book" },
              { name: "Alaoui Ali", text: "Thé best barber in wold thanks m’y barber" }
            ].map((review, i) => (
              <div key={i} className="bg-brand-dark border border-gold-500/10 p-6 rounded-xl flex flex-col items-center text-center">
                 <div className="flex gap-1 mb-4 opacity-80">
                   {[1, 2, 3, 4, 5].map((star) => (
                     <Star key={star} className="w-4 h-4 text-gold-500 fill-current" />
                   ))}
                 </div>
                 <p className="text-zinc-300 font-light italic mb-6 text-sm flex-grow">"{review.text}"</p>
                 <p className="font-display text-gold-500 text-sm">{review.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
