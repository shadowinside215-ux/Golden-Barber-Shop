import { motion } from 'motion/react';
import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function Contact() {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-brand-dark" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-brand-gray border border-gold-500/20 p-10 sm:p-16 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent pointer-events-none" />
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-px bg-gold-500/50"></span>
            <h2 className="text-gold-500 font-medium tracking-[0.2em] uppercase text-xs">{t.contact.book}</h2>
            <span className="w-12 h-px bg-gold-500/50"></span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-display text-[#F4F1ED] mb-6 relative z-10 leading-[1.1]">
            {t.contact.title1} <br />
            <span className="italic text-gold-400">{t.contact.title2}</span>
          </h2>
          
          <p className="text-xl text-zinc-300 font-light mb-12 relative z-10">
            {t.contact.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <a 
              href="https://wa.me/212666566085?text=Hello%20Royal%20Barber%20Agdal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-lg flex items-center justify-center gap-3 transition-colors duration-300 shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle className="w-6 h-6" />
              {t.contact.whatsapp}
            </a>
            <a 
              href="tel:+212666566085" 
              className="w-full sm:w-auto px-8 py-4 bg-brand-black hover:bg-black border border-zinc-700 hover:border-zinc-500 text-white font-semibold rounded-lg flex items-center justify-center gap-3 transition-colors duration-300"
            >
              <Phone className="w-6 h-6" />
              {t.contact.call}
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
