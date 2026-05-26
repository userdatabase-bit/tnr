import { motion } from 'framer-motion';

export default function TrustBar() {
  const clients = [
    'Maruti Suzuki',
    'Hero MotoCorp',
    'Honda',
    'Yamaha',
    'LG Electronics',
    'Samsung',
    'Tata Motors',
    'Mahindra',
  ];

  return (
    <section className="relative py-12 md:py-16 bg-white border-y border-navy/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-heading font-semibold text-grey/60 text-xs tracking-[0.25em] uppercase mb-8"
        >
          Trusted by Industry Leaders
        </motion.p>

        {/* Scrolling marquee */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex overflow-hidden">
            <div className="flex items-center gap-12 md:gap-16 animate-marquee whitespace-nowrap">
              {[...clients, ...clients].map((client, i) => (
                <div
                  key={`${client}-${i}`}
                  className="flex-shrink-0 px-6 py-3 rounded-xl bg-offwhite/80 border border-navy/5 hover:border-orange/20 hover:bg-orange/5 transition-all"
                >
                  <span className="font-heading font-bold text-navy/25 hover:text-navy/50 transition-colors text-sm md:text-base tracking-wide">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
