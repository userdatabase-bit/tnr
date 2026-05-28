import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Supply Chain Head',
    text: 'TNR delivered 5,000 custom wooden boxes in under a week. Zero defects. Their reliability is unmatched in the NCR region.',
    rating: 5,
    avatarColor: 'bg-blue-600',
    initials: 'RK',
  },
  {
    name: 'Priya Sharma',
    role: 'Operations Manager',
    text: 'The corrugated packaging from TNR meets all our pharma compliance requirements. Their 48-hour delivery keeps our production running.',
    rating: 5,
    avatarColor: 'bg-purple-600',
    initials: 'PS',
  },
  {
    name: 'Amit Verma',
    role: 'Logistics Director',
    text: 'Switched to TNR press wood pallets and cut our shipping costs by 30%. ISPM-15 compliant right out of the box. Exceptional quality.',
    rating: 5,
    avatarColor: 'bg-emerald-600',
    initials: 'AV',
  },
  {
    name: 'Suresh Nair',
    role: 'Procurement Manager',
    text: 'We have been sourcing timber pallets from TNR for 3 years. Consistent quality, fair pricing, and always on-time. Highly recommended.',
    rating: 5,
    avatarColor: 'bg-orange-600',
    initials: 'SN',
  },
  {
    name: 'Kavita Mehra',
    role: 'Brand Manager',
    text: 'TNR\'s digital printing team transformed our packaging. Vibrant CMYK printing, quick turnaround, and the team was extremely responsive.',
    rating: 5,
    avatarColor: 'bg-rose-600',
    initials: 'KM',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView    = useInView(sectionRef, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = useCallback(() => setActive(a => (a - 1 + testimonials.length) % testimonials.length), []);
  const next = useCallback(() => setActive(a => (a + 1) % testimonials.length), []);

  // Auto-rotate, pauses on hover
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, paused]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-offwhite overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-orange/10 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
            TESTIMONIALS
          </span>
          <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl">
            What Our <span className="text-orange">Clients</span> Say
          </h2>
        </motion.div>

        {/* Testimonial card + nav arrows */}
        <div className="relative max-w-2xl mx-auto">
          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 hidden sm:flex w-11 h-11 items-center justify-center rounded-full bg-white border border-navy/10 shadow-md hover:border-orange/30 hover:shadow-lg hover:scale-110 transition-all z-10"
          >
            <ChevronLeft className="w-5 h-5 text-navy" />
          </button>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 hidden sm:flex w-11 h-11 items-center justify-center rounded-full bg-white border border-navy/10 shadow-md hover:border-orange/30 hover:shadow-lg hover:scale-110 transition-all z-10"
          >
            <ChevronRight className="w-5 h-5 text-navy" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-navy/5 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-8 w-10 h-10 bg-orange rounded-xl flex items-center justify-center shadow-lg">
                <Quote className="w-5 h-5 text-white" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5 mt-2">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-orange fill-orange" />
                ))}
              </div>

              {/* Text */}
              <p className="font-body text-navy/80 text-base md:text-lg leading-relaxed mb-8">
                "{testimonials[active].text}"
              </p>

              {/* Author with colored avatar (#15) */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${testimonials[active].avatarColor} flex items-center justify-center shadow-md ring-2 ring-white`}>
                  <span className="font-heading font-bold text-white text-sm">
                    {testimonials[active].initials}
                  </span>
                </div>
                <div>
                  <span className="font-heading font-bold text-navy text-sm block">
                    {testimonials[active].name}
                  </span>
                  <span className="font-body text-grey text-xs">
                    {testimonials[active].role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots with aria-pressed (#13) */}
          <div className="flex items-center justify-center gap-3 mt-8" role="group" aria-label="Testimonial navigation">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                aria-label={`Go to testimonial by ${t.name}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? 'bg-orange w-8' : 'bg-navy/15 hover:bg-navy/30 w-2.5'
                }`}
              />
            ))}
          </div>

          {/* Mobile arrow row */}
          <div className="flex items-center justify-center gap-4 mt-6 sm:hidden">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-navy/10 shadow-md"
            >
              <ChevronLeft className="w-5 h-5 text-navy" />
            </button>
            <span className="font-body text-grey text-xs">
              {active + 1} / {testimonials.length}
            </span>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-navy/10 shadow-md"
            >
              <ChevronRight className="w-5 h-5 text-navy" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
