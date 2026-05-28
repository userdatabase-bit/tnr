import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, ChevronRight, X, Phone, Mail, CheckCircle, Filter } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { COMPANY_NAME, SITE_URL } from '../constants';

// ─── Types ───────────────────────────────────────────────────────────────────

interface CorrugatedSpec {
  label: string;
  value: string;
}

interface CorrugatedProduct {
  id: number;
  name: string;
  image: string;
  badge?: string;
  specs: CorrugatedSpec[];
  deliveryTime: string;
  supplyAbility: string;
  description: string;
  tags: string[];
}

// ─── Product Data ─────────────────────────────────────────────────────────────

const products: CorrugatedProduct[] = [
  {
    id: 1,
    name: "Corrugated Boxes",
    image: "/images/Corrugated-Box.jpg",
    badge: "Popular",
    description:
      "Heavy-duty corrugated boxes with a fluted middle layer sandwiched between two flat liners. Lightweight yet strong — ideal for shipping across e-commerce, electronics, food & beverage, and industrial sectors.",
    specs: [
      { label: "Wall Type", value: "Single / Double / Triple-wall" },
      { label: "Custom Sizes", value: "Available" },
      { label: "Material", value: "Recyclable & eco-friendly" },
      { label: "Stack Capacity", value: "Up to 500 kg" },
    ],
    deliveryTime: "3–5 Days",
    supplyAbility: "10,000+ / Month",
    tags: ["Standard", "Eco-Friendly", "Custom"],
  },
  {
    id: 2,
    name: "Custom Printed Corrugated Boxes",
    image: "/images/Custom-Printed-Corrugated-Boxes.jpg",
    badge: "Best Seller",
    description:
      "Full-colour custom printed corrugated boxes that showcase your logo, brand colours, and messaging. Elevate unboxing experience and drive brand recall with tailored dimensions and high-quality print.",
    specs: [
      { label: "Print Type", value: "Full-colour CMYK" },
      { label: "Custom Artwork", value: "Brand logos & designs" },
      { label: "Box Style", value: "Regular Slotted Container (RSC)" },
      { label: "MOQ", value: "Flexible" },
    ],
    deliveryTime: "5–7 Days",
    supplyAbility: "5,000+ / Month",
    tags: ["Custom Print", "Branded", "RSC"],
  },
  {
    id: 3,
    name: "Customised Shipping Boxes",
    image: "/images/Customised-Shipping-Boxe.jpg",
    description:
      "Purpose-built shipping boxes designed to protect goods during transportation. Available in a variety of flute grades to match product weight and fragility requirements, with tamper-evident closures.",
    specs: [
      { label: "Closure", value: "Tamper-evident" },
      { label: "Flute Options", value: "E / B / C / BC" },
      { label: "Coating", value: "Moisture-resistant available" },
      { label: "Optimised For", value: "Courier networks" },
    ],
    deliveryTime: "3–5 Days",
    supplyAbility: "8,000+ / Month",
    tags: ["Shipping", "Tamper-Evident", "Moisture-Resistant"],
  },
  {
    id: 4,
    name: "Die-Cut Boxes",
    image: "/images/Die-Cut-Boxes.png",
    description:
      "Custom-shaped die-cut boxes manufactured through a specialised die-cutting process for precise designs and tailored sizes. Ideal for retail packaging, POP displays, and products requiring unique shapes.",
    specs: [
      { label: "Shapes", value: "Unique custom designs" },
      { label: "Assembly", value: "No glue/tape required" },
      { label: "Best For", value: "Retail & POP displays" },
      { label: "Waste", value: "Reduced material waste" },
    ],
    deliveryTime: "5–7 Days",
    supplyAbility: "3,000+ / Month",
    tags: ["Die-Cut", "No Assembly", "Retail"],
  },
  {
    id: 5,
    name: "Pizza Boxes",
    image: "/images/Pizza-Boxes.jpg",
    description:
      "Food-grade corrugated pizza boxes engineered for heat retention and grease resistance. Available in 7″–20″ sizes with custom print options for your restaurant brand.",
    specs: [
      { label: "Material", value: "Food-safe, grease-resistant" },
      { label: "Sizes", value: '7" to 20"' },
      { label: "Ventilation", value: "Holes available" },
      { label: "Branding", value: "Custom restaurant print" },
    ],
    deliveryTime: "3–5 Days",
    supplyAbility: "20,000+ / Month",
    tags: ["Food Grade", "Grease-Resistant", "Custom Print"],
  },
  {
    id: 6,
    name: "Sweet Boxes",
    image: "/images/Sweet-Boxes.jpg",
    badge: "Premium",
    description:
      "Elegant corrugated sweet and mithai boxes for festive gifting, weddings, and retail. Premium finish with optional foiling, embossing, and window cut-outs to showcase your confections.",
    specs: [
      { label: "Designs", value: "Festive & wedding" },
      { label: "Window", value: "Cut-outs optional" },
      { label: "Finishing", value: "Foil & emboss" },
      { label: "Themes", value: "Diwali / Eid / seasonal" },
    ],
    deliveryTime: "4–6 Days",
    supplyAbility: "5,000+ / Month",
    tags: ["Gift", "Premium", "Festive"],
  },
  {
    id: 7,
    name: "Fancy Corrugated Boxes",
    image: "/images/Fancy-Corrugated-Boxes.jpg",
    badge: "Premium",
    description:
      "High-end fancy corrugated boxes that blend aesthetic appeal with structural integrity. Magnetic closures, ribbon pulls, and textured finishes available — ideal for gifting, cosmetics, and premium retail.",
    specs: [
      { label: "Closure", value: "Magnetic / ribbon" },
      { label: "Exterior", value: "Textured finishes" },
      { label: "Construction", value: "Rigid & corrugated hybrid" },
      { label: "Experience", value: "Premium unboxing" },
    ],
    deliveryTime: "5–7 Days",
    supplyAbility: "2,000+ / Month",
    tags: ["Premium", "Magnetic Closure", "Ribbon"],
  },
  {
    id: 8,
    name: "Master Packaging",
    image: "/images/Master-Packaging.jpg",
    badge: "High Volume",
    description:
      "Heavy-duty master cartons and outer packaging solutions designed for bulk distribution and warehouse storage. Double-wall and triple-wall constructions support high stacking loads.",
    specs: [
      { label: "Construction", value: "Double / triple-wall" },
      { label: "Stacking", value: "High load bearing" },
      { label: "Footprint", value: "Pallet-compatible" },
      { label: "Labelling", value: "Barcoded versions available" },
    ],
    deliveryTime: "3–5 Days",
    supplyAbility: "15,000+ / Month",
    tags: ["Bulk", "Heavy-Duty", "Industrial"],
  },
  {
    id: 9,
    name: "Flutes",
    image: "/images/Flutes.jpg",
    description:
      "Raw corrugated flute materials including A, B, C, E, and F flute profiles. Supplied as sheets or rolls for packaging manufacturers, box plants, and converters who require precise flute grades.",
    specs: [
      { label: "Profiles", value: "A / B / C / E / F" },
      { label: "Liner Types", value: "Kraft & test liner" },
      { label: "GSM & Thickness", value: "Custom" },
      { label: "Format", value: "Sheet or roll" },
    ],
    deliveryTime: "3–5 Days",
    supplyAbility: "10,000+ / Month",
    tags: ["Raw Material", "Sheet/Roll", "Industrial"],
  },
];

// ─── Filter options ───────────────────────────────────────────────────────────

const filterOptions = ["All", "Custom", "Food", "Retail", "Industrial", "Eco-Friendly", "Premium"];

// ─── Badge colors ─────────────────────────────────────────────────────────────

const badgeColors: Record<string, string> = {
  Popular: "bg-blue-600 text-white",
  "Best Seller": "bg-amber-500 text-white",
  Premium: "bg-red-600 text-white",
  "High Volume": "bg-purple-600 text-white",
};

// ─── Inquiry Modal ────────────────────────────────────────────────────────────

function InquiryModal({
  product,
  onClose,
}: {
  product: CorrugatedProduct;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Modal */}
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Header */}
        <div className="bg-[#1B2A5E] px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-widest font-medium">Send Inquiry</p>
            <h3 className="text-white font-bold text-lg leading-tight mt-0.5">{product.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-emerald-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Inquiry Sent!</h4>
            <p className="text-gray-500 text-sm mb-6">
              We've received your request and will get back to you within 24 hours.
            </p>
            <div className="flex gap-4 text-sm text-gray-600">
              <a href="tel:+918045478121" className="flex items-center gap-1.5 hover:text-[#1B2A5E]">
                <Phone size={14} /> Call us now
              </a>
              <a href="mailto:info@tnrsolutions.co.in" className="flex items-center gap-1.5 hover:text-[#1B2A5E]">
                <Mail size={14} /> Email us
              </a>
            </div>
          </div>
        ) : (
          <form
            className="p-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="inquiry-name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Your Name *
                </label>
                <input
                  id="inquiry-name"
                  required
                  type="text"
                  placeholder="Full name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A5E]/30 focus:border-[#1B2A5E]"
                />
              </div>
              <div>
                <label htmlFor="inquiry-company" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Company
                </label>
                <input
                  id="inquiry-company"
                  type="text"
                  placeholder="Company name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A5E]/30 focus:border-[#1B2A5E]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="inquiry-mobile" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Mobile Number *
              </label>
              <input
                id="inquiry-mobile"
                required
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A5E]/30 focus:border-[#1B2A5E]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="inquiry-quantity" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Quantity
                </label>
                <input
                  id="inquiry-quantity"
                  type="number"
                  placeholder="e.g. 100"
                  min={50}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A5E]/30 focus:border-[#1B2A5E]"
                />
              </div>
              <div>
                <label htmlFor="inquiry-unit" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Unit
                </label>
                <select id="inquiry-unit" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A5E]/30 focus:border-[#1B2A5E] bg-white">
                  <option>Pieces</option>
                  <option>Nos</option>
                  <option>Units</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="inquiry-message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Message / Requirements
              </label>
              <textarea
                id="inquiry-message"
                rows={3}
                placeholder="Describe your size, print, or custom requirements..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A5E]/30 focus:border-[#1B2A5E] resize-none"
              />
            </div>
            <p className="text-xs text-gray-400">Minimum order quantity: 50 boxes</p>
            <button
              type="submit"
              className="w-full bg-[#1B2A5E] hover:bg-[#243570] text-white font-semibold py-3 rounded-lg transition-colors text-sm tracking-wide"
            >
              Send Inquiry →
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function CorrugatedCard({
  product,
  onInquire,
  onView,
  index,
}: {
  product: CorrugatedProduct;
  onInquire: (p: CorrugatedProduct) => void;
  onView: (p: CorrugatedProduct) => void;
  index: number;
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/e8e0d0/8B7355?text=Corrugated+Box'; }}
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${
              badgeColors[product.badge] ?? "bg-gray-700 text-white"
            }`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-2">{product.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{product.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Quick specs */}
        <div className="border-t border-gray-100 pt-3 mb-4 grid grid-cols-2 gap-y-1.5 gap-x-2">
          <div className="text-xs text-gray-400">
            Delivery: <span className="text-gray-700 font-medium">{product.deliveryTime}</span>
          </div>
          <div className="text-xs text-gray-400 col-span-2">
            Supply: <span className="text-gray-700 font-medium">{product.supplyAbility}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onInquire(product)}
            className="flex-1 bg-[#1B2A5E] hover:bg-[#243570] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
          >
            Send Inquiry
          </button>
          <button
            onClick={() => onView(product)}
            className="flex items-center gap-1 border border-gray-200 hover:border-[#1B2A5E] text-gray-600 hover:text-[#1B2A5E] text-sm px-3 py-2.5 rounded-lg transition-colors"
          >
            Details <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function DetailModal({
  product,
  onClose,
  onInquire,
}: {
  product: CorrugatedProduct;
  onClose: () => void;
  onInquire: (p: CorrugatedProduct) => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur rounded-full p-1.5 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="overflow-y-auto flex-1">
          {/* Image */}
          <div className="relative bg-gray-50 h-56 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x300/e8e0d0/8B7355?text=Corrugated+Box'; }}
            />
            {product.badge && (
              <span
                className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${
                  badgeColors[product.badge] ?? "bg-gray-700 text-white"
                }`}
              >
                {product.badge}
              </span>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-start mb-3">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h2>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

            {/* Specs table */}
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Specifications
            </h4>
            <div className="rounded-xl border border-gray-100 overflow-hidden mb-6">
              {product.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex py-2.5 px-4 text-sm ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <span className="text-gray-400 w-44 shrink-0">{spec.label}</span>
                  <span className="text-gray-800 font-medium">{spec.value}</span>
                </div>
              ))}
              <div className="flex py-2.5 px-4 text-sm bg-gray-50">
                <span className="text-gray-400 w-44 shrink-0">Delivery Time</span>
                <span className="text-gray-800 font-medium">{product.deliveryTime}</span>
              </div>
              <div className="flex py-2.5 px-4 text-sm bg-white">
                <span className="text-gray-400 w-44 shrink-0">Supply Ability</span>
                <span className="text-gray-800 font-medium">{product.supplyAbility}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mb-4">Minimum order quantity: 50 boxes</p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-gray-100 p-4 flex gap-3 bg-white">
          <button
            onClick={() => {
              onClose();
              onInquire(product);
            }}
            className="flex-1 bg-[#1B2A5E] hover:bg-[#243570] text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Send Inquiry
          </button>
          <a
            href="tel:+918045478121"
            className="flex items-center gap-2 border border-gray-200 hover:border-[#1B2A5E] text-gray-600 hover:text-[#1B2A5E] px-4 py-3 rounded-xl transition-colors text-sm font-medium"
          >
            <Phone size={15} /> Call Us
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CorrugatedBoxes() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [inquiryProduct, setInquiryProduct] = useState<CorrugatedProduct | null>(null);
  const [detailProduct, setDetailProduct] = useState<CorrugatedProduct | null>(null);

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.tags.some((t) => t.includes(activeFilter)));

  return (
    <>
      <Helmet>
        <title>Corrugated Boxes & Packaging | {COMPANY_NAME}</title>
        <meta
          name="description"
          content={`Premium corrugated boxes, custom printed packaging, die-cut boxes, pizza boxes, sweet boxes & more by ${COMPANY_NAME} in Greater Noida. Custom sizes, full-colour print, eco-friendly solutions.`}
        />
        <meta
          name="keywords"
          content="corrugated boxes, custom printed corrugated boxes, shipping boxes, die cut boxes, pizza boxes, sweet boxes, fancy boxes, master packaging, flutes, corrugated packaging manufacturer, TNR Solutions, Greater Noida"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/products/corrugated-boxes`} />
        <meta property="og:title" content={`Corrugated Boxes & Packaging | ${COMPANY_NAME}`} />
        <meta
          property="og:description"
          content="Custom corrugated boxes, printed packaging, die-cut boxes, pizza boxes, sweet boxes and industrial master cartons. Eco-friendly, custom sizes available."
        />
        <meta property="og:url" content={`${SITE_URL}/products/corrugated-boxes`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={COMPANY_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Corrugated Boxes & Packaging | ${COMPANY_NAME}`} />
        <meta
          name="twitter:description"
          content="Custom corrugated boxes & packaging — printed, die-cut, pizza, sweet, master cartons & flutes."
        />
        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Corrugated Boxes & Packaging',
            description:
              'Premium corrugated boxes, custom printed packaging, die-cut boxes, and industrial packaging solutions.',
            brand: { '@type': 'Brand', name: COMPANY_NAME },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              url: `${SITE_URL}/products/corrugated-boxes`,
            },
            image: `${SITE_URL}/images/logo.png`,
          })}
        </script>
      </Helmet>

      <Navbar scrolled />
      <div className="min-h-screen bg-[#F7F5F0]">
      {/* ── Hero Banner ── */}
      <section className="relative bg-[#1B2A5E] overflow-hidden">
        {/* Corrugation-line texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.15) 2px,
              rgba(255,255,255,0.15) 3px
            )`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A5E] via-[#1B2A5E]/95 to-[#E8821A]/30" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight size={14} />
            <span className="text-white/80">Corrugated Boxes</span>
          </nav>

          <div className="max-w-2xl">
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#E8821A] flex items-center justify-center">
                <Package size={20} className="text-white" />
              </div>
              <span className="text-[#E8821A] font-semibold text-sm uppercase tracking-widest">
                Corrugated Boxes
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl lg:text-5xl font-black text-white leading-tight mb-5"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Custom
              <br />
              <span className="text-[#E8821A]">Corrugated Packaging</span>
            </motion.h1>

            <motion.p
              className="text-white/70 text-base leading-relaxed mb-8 max-w-xl"
              style={{ fontFamily: "Open Sans, sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Premium corrugated boxes built for e-commerce, retail, food service,
              and industrial shipping. Available in custom sizes, full-colour print,
              and eco-friendly materials.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {[
                { val: "9+", label: "Box Variants" },
                { val: "500 kg", label: "Stack Capacity" },
                { val: "3 Days", label: "Fastest Delivery" },
                { val: "10,000+", label: "Monthly Supply" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-black text-white">{s.val}</p>
                  <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Description strip ── */}
      <div className="bg-orange-50 border-y border-orange-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-orange-900/70 text-sm leading-relaxed">
            <span className="font-semibold text-orange-900">About Corrugated Boxes —</span>{' '}
            Corrugated boxes are the most widely used shipping and packaging solution worldwide.
            TNR Solutions manufactures premium corrugated boxes from high-quality kraft and recycled
            materials. Available in single, double, and triple-wall constructions with custom
            printing, they are lightweight yet strong — ideal for protecting goods across e-commerce,
            food & beverage, electronics, and industrial sectors.
          </p>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="sticky top-0 z-20 bg-[#F7F5F0]/95 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3 overflow-x-auto scrollbar-none">
          <Filter size={15} className="text-gray-400 shrink-0" />
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 text-sm font-semibold px-4 py-1.5 rounded-full border transition-all ${
                activeFilter === f
                  ? "bg-[#1B2A5E] text-white border-[#1B2A5E]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#1B2A5E] hover:text-[#1B2A5E]"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400 shrink-0">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filtered.map((product, i) => (
                <CorrugatedCard
                  key={product.id}
                  product={product}
                  index={i}
                  onInquire={setInquiryProduct}
                  onView={setDetailProduct}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="text-center py-20 text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Package size={40} className="mx-auto mb-3 opacity-30" />
              <p>No products match that filter.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-[#1B2A5E] mx-6 mb-12 rounded-2xl overflow-hidden">
        <div className="px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl font-bold mb-1">Need a custom corrugated solution?</h3>
            <p className="text-white/60 text-sm">
              We manufacture to your exact specifications — size, print, flute grade, and quantity.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() =>
                setInquiryProduct(
                  products.find((p) => p.name === "Corrugated Boxes") ?? products[0]
                )
              }
              className="bg-[#E8821A] hover:bg-[#d67a18] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Request Custom Quote
            </button>
            <a
              href="tel:+918045478121"
              className="flex items-center gap-2 border border-white/30 hover:border-white text-white text-sm font-medium px-5 py-3 rounded-xl transition-colors"
            >
              <Phone size={14} /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ── Modals ── */}
      <AnimatePresence>
        {inquiryProduct && (
          <InquiryModal product={inquiryProduct} onClose={() => setInquiryProduct(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {detailProduct && (
          <DetailModal
            product={detailProduct}
            onClose={() => setDetailProduct(null)}
            onInquire={(p) => {
              setDetailProduct(null);
              setInquiryProduct(p);
            }}
          />
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
