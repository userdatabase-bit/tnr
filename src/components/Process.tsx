import { motion } from 'framer-motion';
import { ClipboardList, Cog, Truck, PackageCheck } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    title: 'Consult',
    desc: 'Share your specs — dimensions, weight, volume, timeline.',
    color: 'bg-orange',
  },
  {
    icon: Cog,
    title: 'Engineer',
    desc: 'We design the optimal packaging solution for your product.',
    color: 'bg-navy',
  },
  {
    icon: Truck,
    title: 'Produce & Deliver',
    desc: 'Manufactured at scale and delivered to your door in 48hrs.',
    color: 'bg-kraft',
  },
  {
    icon: PackageCheck,
    title: 'Succeed',
    desc: 'Your product ships safely. Every. Single. Time.',
    color: 'bg-orange',
  },
];

export default function Process() {
  return (
    <section className="relative py-24 md:py-32 bg-navy overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-orange/20 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
            HOW WE WORK
          </span>
          <h2 className="font-heading font-black text-white text-3xl sm:text-4xl lg:text-5xl">
            From Brief to <span className="text-orange">Delivery</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-6 md:gap-4 relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-orange/40 via-white/20 to-orange/40" />

          {/* Mobile vertical connector */}
          <div className="absolute md:hidden left-14 top-0 bottom-0 w-px bg-gradient-to-b from-orange/40 via-white/20 to-orange/40" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center md:text-center flex md:block items-start md:items-center gap-5 md:gap-0 pl-4 md:pl-0"
              >
                {/* Step icon */}
                <div className="relative inline-flex flex-shrink-0 items-center justify-center mb-0 md:mb-6">
                  <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center shadow-xl relative z-10`}>
                    <Icon className="w-9 h-9 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-md z-20">
                    <span className="font-heading font-black text-navy text-xs">{i + 1}</span>
                  </div>
                </div>

                <div className="md:mt-0 mt-1 text-left md:text-center">
                  <h3 className="font-heading font-bold text-white text-lg mb-2">{step.title}</h3>
                  <p className="font-body text-white/50 text-sm leading-relaxed max-w-[220px] md:mx-auto">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
