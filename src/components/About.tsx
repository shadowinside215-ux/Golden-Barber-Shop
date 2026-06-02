import { motion } from 'motion/react';
import { Scissors } from 'lucide-react';
import EditableImage from './EditableImage';
import { useLanguage } from './LanguageProvider';

export default function About() {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-brand-dark relative" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] arch-shape overflow-hidden relative border-8 border-brand-gray shadow-2xl">
              <EditableImage 
                configKey="aboutImage"
                defaultSrc="https://images.unsplash.com/photo-1521590838726-2bb6da41f872?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                className="w-full h-full opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-black/60 to-transparent pointer-events-none" />
            </div>
            
            <div className="absolute -bottom-8 -right-8 bg-brand-dark border border-gold-500/20 p-8 rounded-xl shadow-2xl hidden md:block">
              <Scissors className="w-12 h-12 text-gold-500 mb-4" />
              <p className="font-display italic text-2xl font-bold text-[#F4F1ED]">{t.about.stats.precision}</p>
              <p className="text-zinc-400 font-light mt-1 text-xs uppercase tracking-[0.2em]">{t.about.stats.inEveryCut}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-px bg-gold-500/50"></span>
                <h2 className="text-gold-500 font-medium tracking-[0.2em] uppercase text-xs">{t.about.tradition}</h2>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#F4F1ED] leading-[1.1] mb-6">
                {t.about.title1}<br />
                <span className="italic text-gold-400 font-normal">{t.about.title1b}</span>
              </h3>
            </div>
            
            <div className="space-y-6 text-lg text-zinc-300 font-light leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
            
            <div className="pt-6 border-t border-zinc-800">
              <div className="flex items-center gap-4 sm:gap-6">
                <div>
                  <p className="text-2xl sm:text-3xl font-display font-bold text-white">{t.about.stats.stars}<span className="text-gold-500">★</span></p>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-1">{t.about.stats.google}</p>
                </div>
                <div className="w-px h-10 sm:h-12 bg-zinc-800"></div>
                <div>
                  <p className="text-2xl sm:text-3xl font-display font-bold text-white">{t.about.stats.open}</p>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-1">{t.about.stats.days}</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
