import { motion } from 'motion/react';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import EditableImage from './EditableImage';
import { useLanguage } from './LanguageProvider';

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Image managed by Admin */}
      <EditableImage 
        configKey="heroImage"
        defaultSrc="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        isBackground={true}
        className="absolute inset-0 z-0 bg-cover bg-center"
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-brand-black/30" />
      </EditableImage>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-block px-4 py-1.5 border-y border-gold-500/30 text-gold-400 text-xs font-medium tracking-[0.3em] uppercase mb-8">
            {t.hero.location}
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display text-[#F4F1ED] leading-[1.1] mb-8">
            {t.hero.title1} <br />
            <span className="italic font-normal text-gold-500">{t.hero.title2}</span><br />
            <span className="text-zinc-400 text-2xl sm:text-5xl md:text-7xl font-sans font-light mt-2 block sm:mt-0 sm:inline">{t.hero.title3}</span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a 
              href="https://wa.me/212666566085?text=Hello%20Royal%20Barber%20Agdal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-gold-500 hover:bg-gold-400 text-brand-black font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              {t.hero.bookAppt}
            </a>
            <a 
              href="tel:+212666566085" 
              className="w-full sm:w-auto px-8 py-4 bg-brand-dark hover:bg-zinc-800 border border-zinc-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
            >
              <Phone className="w-5 h-5" />
              {t.hero.callUs}
            </a>
            <a 
              href="https://maps.google.com/?q=Rue+Tansift,+Rabat+10090,+Morocco" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-brand-dark hover:bg-zinc-800 border border-zinc-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
            >
              <MapPin className="w-5 h-5" />
              {t.location.getDirections}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
