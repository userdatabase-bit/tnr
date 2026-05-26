import { motion } from 'framer-motion';

const industries = [
  'Automotive', 'Pharmaceuticals', 'Electronics', 'FMCG',
  'Agriculture', 'E-Commerce', 'Export', 'Defence',
  'Textiles', 'Chemical', 'Food Processing', 'Machinery',
];

export default function TrustMarquee() {
  return (
    <section className="relative py-16 bg-white overflow-hidden">
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-heading font-semibold text-grey text-xs tracking-[0.3em] uppercase"
        >
          Trusted Across Industries
        </motion.p>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex overflow-hidden">
          <div className="flex shrink-0 items-center gap-8 animate-marquee">
            {[...industries, ...industries].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-navy/8 bg-offwhite/50 shrink-0"
              >
                <div className="w-2 h-2 rounded-full bg-orange" />
                <span className="font-heading font-semibold text-navy/60 text-sm whitespace-nowrap">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
