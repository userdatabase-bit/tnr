import { useState } from "react";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { Package, ChevronRight, X, Phone, Mail, CheckCircle, Filter } from "lucide-react";
import Navbar from './Navbar';

// ─── Types ───────────────────────────────────────────────────────────────────

interface PalletSpec {
  label: string;
  value: string;
}

interface Pallet {
  id: number;
  name: string;
  image: string;
  badge?: string;
  specs: PalletSpec[];
  deliveryTime: string;
  supplyAbility: string;
  description: string;
  tags: string[];
}

// ─── Product Data (sourced from reference catalogue) ─────────────────────────

const pallets: Pallet[] = [
  {
    id: 1,
    name: "Two Ways Wooden Pallet",
    image: "https://cpimg.tistatic.com/06000038/b/4/Two-Ways-Wooden-Pallet.jpg",
    badge: "Popular",
    description:
      "Standard two-way entry wooden pallets suitable for forklift and hand pallet trucks. Ideal for warehousing and logistics operations requiring reliable load support.",
    specs: [
      { label: "Color", value: "Natural Wood" },
      { label: "Dimension (L×W)", value: "1200×800, 1200×1000 mm" },
      { label: "Load Capacity", value: "400–2000 kg" },
      { label: "Material", value: "Wood" },
      { label: "Pallet Type", value: "Slip Sheet" },
      { label: "Size", value: "Customizable" },
      { label: "Style", value: "Single Faced" },
    ],
    deliveryTime: "5 Days",
    supplyAbility: "6,000 / Month",
    tags: ["2-Way", "Single Faced", "Customizable"],
  },
  {
    id: 2,
    name: "Warehouse Wooden Pallets",
    image: "https://cpimg.tistatic.com/06000041/b/4/Warehouse-Wooden-Pallets.jpg",
    description:
      "Euro-style double-faced wooden pallets designed specifically for warehouse storage and racking systems. Built to withstand heavy stacking loads.",
    specs: [
      { label: "Material", value: "Wood" },
      { label: "Pallet Type", value: "Euro Pallet" },
      { label: "Product Type", value: "Warehouse Wooden Pallets" },
      { label: "Style", value: "Double Faced" },
    ],
    deliveryTime: "5 Days",
    supplyAbility: "6,000 / Month",
    tags: ["Euro Pallet", "Double Faced", "Warehouse"],
  },
  {
    id: 3,
    name: "Heavy Duty Pallets",
    image: "https://cpimg.tistatic.com/06000040/b/4/Heavy-Duty-Pallets.jpg",
    badge: "Best Seller",
    description:
      "Heavy-duty single-faced pallets with 2-way entry for both forklift and handlift access. Built for demanding industrial environments with high load requirements.",
    specs: [
      { label: "Entry Type", value: "2-Way" },
      { label: "Forklift", value: "2-Way Compatible" },
      { label: "Handlift", value: "2-Way Compatible" },
      { label: "Material", value: "Wood" },
      { label: "Pallet Type", value: "Euro Pallet" },
      { label: "Style", value: "Single Faced" },
    ],
    deliveryTime: "5 Days",
    supplyAbility: "6,000 / Month",
    tags: ["2-Way", "Heavy Duty", "Industrial"],
  },
  {
    id: 4,
    name: "Industrial Heat Treated Wooden Pallets",
    image: "https://cpimg.tistatic.com/06000039/b/4/Industrial-Heat-Treated-Wooden-Pallets.jpg",
    badge: "Export Ready",
    description:
      "ISPM-15 compliant heat-treated wooden pallets for international shipping. Double-faced construction ensures durability during long-distance transport.",
    specs: [
      { label: "Color", value: "Brown" },
      { label: "Forklift", value: "2-Way Compatible" },
      { label: "Handlift", value: "2-Way Compatible" },
      { label: "Material", value: "Wood" },
      { label: "Treatment", value: "Heat Treated (ISPM-15)" },
      { label: "Style", value: "Double Faced" },
    ],
    deliveryTime: "5 Days",
    supplyAbility: "6,000 / Month",
    tags: ["Heat Treated", "Export", "Double Faced"],
  },
  {
    id: 5,
    name: "Pinewood Pallet",
    image: "https://cpimg.tistatic.com/06000043/b/4/Pinewood-Pallet.jpg",
    description:
      "Lightweight pinewood pallets with collar pallet design. Double-faced and cost-effective for light-to-medium load applications in retail and storage.",
    specs: [
      { label: "Handlift", value: "2-Way Compatible" },
      { label: "Material", value: "Pinewood" },
      { label: "Pallet Type", value: "Collar Pallet" },
      { label: "Style", value: "Double Faced" },
    ],
    deliveryTime: "5 Days",
    supplyAbility: "6,000 / Month",
    tags: ["Pinewood", "Collar Pallet", "Lightweight"],
  },
  {
    id: 6,
    name: "Hardwood Industrial Wooden Pallets",
    image: "https://cpimg.tistatic.com/06000042/b/4/Hardwood-Industrial-Wooden-Pallets.jpg",
    badge: "Heavy Load",
    description:
      "Premium 4-way entry hardwood pallets for maximum load-bearing capacity. Available in multiple standard sizes to suit diverse industrial requirements.",
    specs: [
      { label: "Color", value: "Brown" },
      { label: "Entry Type", value: "4-Way" },
      { label: "Load Capacity", value: "1000–2000 kg" },
      { label: "Material", value: "Hardwood" },
      { label: "Sizes Available", value: "1200×800, 1200×1000, 1000×1000, 1200×900 mm" },
      { label: "Weight", value: "15–30 kg" },
    ],
    deliveryTime: "5 Days",
    supplyAbility: "400 / Month",
    tags: ["4-Way", "Hardwood", "High Capacity"],
  },
  {
    id: 7,
    name: "Four Way Wooden Pallets",
    image: "https://cpimg.tistatic.com/05845820/b/4/Four-Way-Wooden-Pallets.jpg",
    description:
      "Versatile 4-way entry pallets allowing forklift access from all four sides for maximum handling flexibility on busy warehouse floors.",
    specs: [
      { label: "Entry Type", value: "4-Way" },
      { label: "Material", value: "Wood" },
      { label: "Product Type", value: "Pallet" },
      { label: "Size", value: "As per requirement" },
    ],
    deliveryTime: "2–3 Days",
    supplyAbility: "2,000 / Week",
    tags: ["4-Way", "Fast Delivery", "Custom Size"],
  },
  {
    id: 8,
    name: "Heavy Duty Wooden Pallets",
    image: "https://cpimg.tistatic.com/05845818/b/4/Heavy-Duty-Wooden-Pallets.jpg",
    badge: "High Volume",
    description:
      "Industrial-grade heavy-duty pallets with flat/slatted deck construction. Handles up to 3000 kg — ideal for manufacturing plants and large-scale storage facilities.",
    specs: [
      { label: "Deck Type", value: "Flat / Slatted" },
      { label: "Dimension", value: "Customizable" },
      { label: "Entry Type", value: "2-Way" },
      { label: "Forklift", value: "Compatible" },
      { label: "Load Capacity", value: "200–3000 kg" },
      { label: "Style", value: "Single Faced" },
    ],
    deliveryTime: "3–4 Days",
    supplyAbility: "6,000–10,000 / Month",
    tags: ["2-Way", "Heavy Duty", "High Volume"],
  },
  {
    id: 9,
    name: "Commercial Wooden Pallets",
    image: "https://cpimg.tistatic.com/05845819/b/4/Commercial-Wooden-Pallets.jpg",
    description:
      "Double-faced commercial pallets designed for retail distribution and supply chains. Customizable dimensions to fit specific logistics needs.",
    specs: [
      { label: "Color", value: "Natural Wood" },
      { label: "Dimension", value: "Customizable" },
      { label: "Entry Type", value: "2-Way" },
      { label: "Handlift", value: "2-Way Compatible" },
      { label: "Material", value: "Wood" },
      { label: "Style", value: "Double Faced" },
      { label: "Weight Capacity", value: "200–3000 kg" },
    ],
    deliveryTime: "3–4 Days",
    supplyAbility: "6,000–10,000 / Month",
    tags: ["2-Way", "Double Faced", "Commercial"],
  },
  {
    id: 10,
    name: "Customized Wooden Pallets",
    image: "https://cpimg.tistatic.com/04943343/b/4/Customized-Wooden-Pallets.jpg",
    badge: "Custom",
    description:
      "Fully customizable wooden pallets manufactured to your exact specifications. Specify size, wood type, entry style, and load capacity to match your unique workflow.",
    specs: [
      { label: "Entry Type", value: "4-Way" },
      { label: "Material", value: "Wood" },
      { label: "Product Type", value: "Pallet" },
      { label: "Size", value: "As per requirement" },
    ],
    deliveryTime: "3–4 Days",
    supplyAbility: "6,000–10,000 / Month",
    tags: ["Custom", "4-Way", "Made to Order"],
  },
];

// ─── Filter options ───────────────────────────────────────────────────────────

const filterOptions = ["All", "2-Way", "4-Way", "Heat Treated", "Custom", "Heavy Duty", "Export"];

// ─── Badge colors ─────────────────────────────────────────────────────────────

const badgeColors: Record<string, string> = {
  Popular: "bg-blue-600 text-white",
  "Best Seller": "bg-amber-500 text-white",
  "Export Ready": "bg-emerald-600 text-white",
  "Heavy Load": "bg-red-600 text-white",
  "High Volume": "bg-purple-600 text-white",
  Custom: "bg-[#1B2A5E] text-white",
};

// ─── Inquiry Modal ────────────────────────────────────────────────────────────

function InquiryModal({
  pallet,
  onClose,
}: {
  pallet: Pallet;
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
            <h3 className="text-white font-bold text-lg leading-tight mt-0.5">{pallet.name}</h3>
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
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Your Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Full name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A5E]/30 focus:border-[#1B2A5E]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="Company name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A5E]/30 focus:border-[#1B2A5E]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Mobile Number *
              </label>
              <input
                required
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A5E]/30 focus:border-[#1B2A5E]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Quantity
                </label>
                <input
                  type="number"
                  placeholder="e.g. 100"
                  min={50}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A5E]/30 focus:border-[#1B2A5E]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Unit
                </label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A5E]/30 focus:border-[#1B2A5E] bg-white">
                  <option>Pieces</option>
                  <option>Nos</option>
                  <option>Units</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Message / Requirements
              </label>
              <textarea
                rows={3}
                placeholder="Describe your size, load, or custom requirements..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A5E]/30 focus:border-[#1B2A5E] resize-none"
              />
            </div>
            <p className="text-xs text-gray-400">Minimum order quantity: 50 pallets</p>
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

function PalletCard({
  pallet,
  onInquire,
  onView,
  index,
}: {
  pallet: Pallet;
  onInquire: (p: Pallet) => void;
  onView: (p: Pallet) => void;
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
          src={pallet.image}
          alt={pallet.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/400x300/e8e0d0/8B7355?text=Wooden+Pallet";
          }}
        />
        {pallet.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${
              badgeColors[pallet.badge] ?? "bg-gray-700 text-white"
            }`}
          >
            {pallet.badge}
          </span>
        )        }
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-2">{pallet.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{pallet.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pallet.tags.map((tag) => (
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
            Delivery: <span className="text-gray-700 font-medium">{pallet.deliveryTime}</span>
          </div>
          <div className="text-xs text-gray-400 col-span-2">
            Supply: <span className="text-gray-700 font-medium">{pallet.supplyAbility}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onInquire(pallet)}
            className="flex-1 bg-[#1B2A5E] hover:bg-[#243570] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
          >
            Send Inquiry
          </button>
          <button
            onClick={() => onView(pallet)}
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
  pallet,
  onClose,
  onInquire,
}: {
  pallet: Pallet;
  onClose: () => void;
  onInquire: (p: Pallet) => void;
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
              src={pallet.image}
              alt={pallet.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/600x300/e8e0d0/8B7355?text=Wooden+Pallet";
              }}
            />
            {pallet.badge && (
              <span
                className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${
                  badgeColors[pallet.badge] ?? "bg-gray-700 text-white"
                }`}
              >
                {pallet.badge}
              </span>
            )}
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-3">{pallet.name}</h2>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">{pallet.description}</p>

            {/* Specs table */}
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Specifications
            </h4>
            <div className="rounded-xl border border-gray-100 overflow-hidden mb-6">
              {pallet.specs.map((spec, i) => (
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
                <span className="text-gray-800 font-medium">{pallet.deliveryTime}</span>
              </div>
              <div className="flex py-2.5 px-4 text-sm bg-white">
                <span className="text-gray-400 w-44 shrink-0">Supply Ability</span>
                <span className="text-gray-800 font-medium">{pallet.supplyAbility}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mb-4">Minimum order quantity: 50 pallets</p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-gray-100 p-4 flex gap-3 bg-white">
          <button
            onClick={() => {
              onClose();
              onInquire(pallet);
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

export default function WoodenPallets() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [inquiryPallet, setInquiryPallet] = useState<Pallet | null>(null);
  const [detailPallet, setDetailPallet] = useState<Pallet | null>(null);

  const filtered =
    activeFilter === "All"
      ? pallets
      : pallets.filter((p) => p.tags.some((t) => t.includes(activeFilter)));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F7F5F0]">
      {/* ── Hero Banner ── */}
      <section className="relative bg-[#1B2A5E] overflow-hidden">
        {/* Wood grain texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(255,255,255,0.4) 3px,
              rgba(255,255,255,0.4) 4px
            )`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A5E] via-[#1B2A5E]/95 to-[#C9884C]/30" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/50 text-sm mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span>Products</span>
            <ChevronRight size={14} />
            <span className="text-white/80">Wooden Pallets</span>
          </div>

          <div className="max-w-2xl">
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#C9884C] flex items-center justify-center">
                <Package size={20} className="text-white" />
              </div>
              <span className="text-[#C9884C] font-semibold text-sm uppercase tracking-widest">
                Wooden Pallets
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl lg:text-5xl font-black text-white leading-tight mb-5"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Strength in Every
              <br />
              <span className="text-[#C9884C]">Wooden Pallet</span>
            </motion.h1>

            <motion.p
              className="text-white/70 text-base leading-relaxed mb-8 max-w-xl"
              style={{ fontFamily: "Open Sans, sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Premium wood pallets built for warehousing, logistics, and export.
              Available in 2-way and 4-way entry configurations, heat-treated for
              international shipping, and customizable to your exact load requirements.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {[
                { val: "10+", label: "Pallet Variants" },
                { val: "3000 kg", label: "Max Load Capacity" },
                { val: "5 Days", label: "Standard Delivery" },
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
      <div className="bg-amber-50 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-amber-900/70 text-sm leading-relaxed">
            <span className="font-semibold text-amber-900">About Wooden Pallets —</span>{" "}
            Pallets are typically used to hold produced materials and goods in warehouses. TNR
            Solutions delivers wood pallets that are stronger than corrugated, plastic, and metal
            alternatives. Constructed from quality hardwood and softwood, they endure lifted
            pressures, heavy loads, and outdoor climatic conditions — available in custom sizes,
            shapes, and dimensions for versatile storage and logistics use.
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
              {filtered.map((pallet, i) => (
                <PalletCard
                  key={pallet.id}
                  pallet={pallet}
                  index={i}
                  onInquire={setInquiryPallet}
                  onView={setDetailPallet}
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
              <p>No pallets match that filter.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-[#1B2A5E] mx-6 mb-12 rounded-2xl overflow-hidden">
        <div className="px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl font-bold mb-1">Need a custom pallet solution?</h3>
            <p className="text-white/60 text-sm">
              We manufacture to your exact specifications — size, wood grade, load rating, and entry type.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() =>
                setInquiryPallet(
                  pallets.find((p) => p.name === "Customized Wooden Pallets") ?? pallets[0]
                )
              }
              className="bg-[#C9884C] hover:bg-[#b87a40] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
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
        {inquiryPallet && (
          <InquiryModal pallet={inquiryPallet} onClose={() => setInquiryPallet(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {detailPallet && (
          <DetailModal
            pallet={detailPallet}
            onClose={() => setDetailPallet(null)}
            onInquire={(p) => {
              setDetailPallet(null);
              setInquiryPallet(p);
            }}
          />
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
