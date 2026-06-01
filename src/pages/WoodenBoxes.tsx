import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, ChevronRight, X, Phone, Mail, CheckCircle, Filter, Box, Weight, Ruler, Shield } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { COMPANY_NAME, SITE_URL } from '../constants';

// ─── Types ───────────────────────────────────────────────────────────────────

interface WoodenBoxSpec {
  label: string;
  value: string;
}

interface WoodenBoxProduct {
  id: number;
  name: string;
  image: string;
  badge?: string;
  specs: WoodenBoxSpec[];
  deliveryTime: string;
  supplyAbility: string;
  description: string;
  tags: string[];
  moq: string;
}

// ─── Product Data (from Shiva Packaging wooden box catalogue) ─────────────────

const products: WoodenBoxProduct[] = [
  // ── SOLID WOOD BOXES ──
  {
    id: 1,
    name: "Wooden Cargo Box",
    image: "/images/wooden-boxes/wooden-cargo-box.jpg",
    badge: "Heavy Duty",
    description:
      "Heavy-duty wooden cargo boxes made from solid wood, designed to securely transport and protect goods during shipping. Ideal for electrical equipment and large industrial components requiring robust protection.",
    specs: [
      { label: "Wood Type", value: "Solid Wood" },
      { label: "Dimensions (L×W)", value: "3000 × 2000 mm" },
      { label: "Weight Capacity", value: "1000 kg" },
      { label: "Shape", value: "Rectangle" },
      { label: "Usage", value: "Electrical Equipment" },
      { label: "Color", value: "Brown" },
    ],
    deliveryTime: "5–7 Days",
    supplyAbility: "500+ / Month",
    tags: ["Solid Wood", "Heavy Duty", "Cargo"],
    moq: "100 Piece",
  },
  {
    id: 2,
    name: "Heavy Wooden Packaging Box",
    image: "/images/wooden-boxes/heavy-wooden-packaging-box.jpeg",
    badge: "Popular",
    description:
      "Strong, reinforced heavy wooden packaging boxes made from thick, high-quality hardwood. Designed to protect bulky and heavy items during transport and storage with maximum durability and impact resistance.",
    specs: [
      { label: "Wood Type", value: "Hard Wood" },
      { label: "Dimensions (L×W)", value: "3000 × 1200 mm" },
      { label: "Load Capacity", value: "3000 Kg" },
      { label: "Shape", value: "Rectangle" },
      { label: "Usage", value: "Electrical Equipment" },
      { label: "Product Type", value: "Box" },
    ],
    deliveryTime: "5–7 Days",
    supplyAbility: "500+ / Month",
    tags: ["Hard Wood", "Heavy Duty", "Industrial"],
    moq: "100 Piece",
  },
  {
    id: 3,
    name: "Machine Packaging Wooden Box",
    image: "/images/wooden-boxes/machine-packaging-wooden-box.jpeg",
    badge: "Premium",
    description:
      "Robust machine packaging wooden boxes made from high-quality hardwood, specifically designed to securely protect heavy machinery during storage and transport. Provides strong support and cushioning against damage.",
    specs: [
      { label: "Wood Type", value: "Hard Wood" },
      { label: "Dimensions (L×W)", value: "1000 × 1000 mm" },
      { label: "Load Capacity", value: "3800 Kg" },
      { label: "Shape", value: "Rectangle" },
      { label: "Usage", value: "Heavy Electronics" },
      { label: "Product Type", value: "Crate" },
    ],
    deliveryTime: "5–7 Days",
    supplyAbility: "300+ / Month",
    tags: ["Hard Wood", "Machine", "Crate"],
    moq: "200 Piece",
  },
  {
    id: 4,
    name: "Goods Packaging Wooden Box",
    image: "/images/wooden-boxes/goods-packaging-wooden-box.jpeg",
    description:
      "Sturdy goods packaging wooden boxes crafted from quality solid wood, designed to safely pack and protect various products during storage and transportation. Ensures secure handling and prevents damage to goods.",
    specs: [
      { label: "Wood Type", value: "Solid Wood" },
      { label: "Dimensions (L×W)", value: "2000 × 1000 mm" },
      { label: "Weight Capacity", value: "4000 kg" },
      { label: "Style", value: "Nailed" },
      { label: "Entry Type", value: "2-Way" },
      { label: "Usage", value: "Heavy Electronics / Automotive" },
    ],
    deliveryTime: "5–7 Days",
    supplyAbility: "500+ / Month",
    tags: ["Solid Wood", "Nailed", "Heavy Duty"],
    moq: "200 Piece",
  },
  {
    id: 5,
    name: "Export Wooden Packing Box",
    image: "/images/wooden-boxes/export-wooden-packing-box.jpg",
    badge: "Export Ready",
    description:
      "Export-grade wooden packing boxes that are sturdy, well-crafted containers designed to protect goods during international shipping. Heat-treated surface meets global standards for safe handling and export compliance.",
    specs: [
      { label: "Wood Type", value: "Solid Wood" },
      { label: "Dimensions (L×W)", value: "1000 × 1000 mm" },
      { label: "Weight Capacity", value: "1000 kg" },
      { label: "Shape", value: "Square" },
      { label: "Surface Property", value: "Heat Treated" },
      { label: "Material Thickness", value: "50 inch" },
    ],
    deliveryTime: "5–7 Days",
    supplyAbility: "500+ / Month",
    tags: ["Export", "Heat Treated", "Solid Wood"],
    moq: "200 Piece",
  },
  {
    id: 6,
    name: "Popular Wooden Box",
    image: "/images/wooden-boxes/popular-wooden-box.jpg",
    description:
      "Versatile, durable popular wooden boxes crafted from quality solid wood, widely used for packaging, storage, and shipping. Offers strong protection and a classic look for various industrial and commercial uses.",
    specs: [
      { label: "Wood Type", value: "Solid Wood" },
      { label: "Dimensions", value: "24 × 24 inch" },
      { label: "Load Capacity", value: "Up to 500 kg" },
      { label: "Box Style", value: "Fully Closed" },
      { label: "Packaging Type", value: "Cased" },
      { label: "Usage", value: "Laboratory Instruments" },
    ],
    deliveryTime: "3–5 Days",
    supplyAbility: "1,000+ / Month",
    tags: ["Solid Wood", "Compact", "Versatile"],
    moq: "200 Piece",
  },
  {
    id: 7,
    name: "Wooden Large Box",
    image: "/images/wooden-boxes/wooden-large-box.jpeg",
    badge: "High Volume",
    description:
      "Spacious, sturdy wooden large boxes made from solid hardwood, designed for storing or transporting bulky and heavy items. Provides strong protection and durability for demanding industrial and commercial needs.",
    specs: [
      { label: "Wood Type", value: "Hard Wood" },
      { label: "Dimensions (L×W)", value: "1900 × 1000 mm" },
      { label: "Weight Capacity", value: "3000 Kg" },
      { label: "Box Style", value: "Fully Closed" },
      { label: "Shape", value: "Rectangle" },
      { label: "Usage", value: "Laboratory Instruments" },
    ],
    deliveryTime: "5–7 Days",
    supplyAbility: "300+ / Month",
    tags: ["Hard Wood", "Large", "Industrial"],
    moq: "200 Piece",
  },
  {
    id: 8,
    name: "Heavy Open Wooden Box",
    image: "/images/wooden-boxes/heavy-open-wooden-box.jpeg",
    badge: "Best Value",
    description:
      "Strong, open-top heavy wooden boxes made from pine wood, designed for easy loading and unloading of bulky or heavy items. Open slatted crate style provides sturdy protection while allowing ventilation.",
    specs: [
      { label: "Wood Type", value: "Pine Wood" },
      { label: "Dimensions (L×W)", value: "1000 × 1000 mm" },
      { label: "Load Capacity", value: "3000 Kg" },
      { label: "Box Style", value: "Crate (Open Slatted)" },
      { label: "Weight Capacity", value: "15 Ton" },
      { label: "Shape", value: "Square" },
    ],
    deliveryTime: "3–5 Days",
    supplyAbility: "1,000+ / Month",
    tags: ["Pine Wood", "Open Crate", "Ventilated"],
    moq: "200 Piece",
  },
  {
    id: 9,
    name: "Export Packing Wooden Box",
    image: "/images/wooden-boxes/export-packaging-wooden-box.jpg",
    description:
      "Durable, high-quality export packing wooden boxes designed to protect goods during international shipping. Made from hardwood and compliant with global export standards for safe and secure transport.",
    specs: [
      { label: "Material", value: "Hardwood" },
      { label: "Dimensions (L×W)", value: "1000 × 1000 mm" },
      { label: "Load Capacity", value: "1500 Kg" },
      { label: "Weight Capacity", value: "1000 kg" },
      { label: "Shape", value: "Square" },
      { label: "Usage", value: "Heavy Electronics" },
    ],
    deliveryTime: "3–5 Days",
    supplyAbility: "1,000+ / Month",
    tags: ["Hardwood", "Export", "Compact"],
    moq: "200 Piece",
  },
  {
    id: 10,
    name: "Lightweight Wooden Box",
    image: "/images/wooden-boxes/lightweight-wooden-box.jpg",
    description:
      "Lightweight yet sturdy wooden storage box perfect for lighter items and general storage needs. Easy to handle and transport while providing reliable protection for your products.",
    specs: [
      { label: "Material", value: "Wood" },
      { label: "Dimensions (L×W×H)", value: "10 × 10 × 4 Inch" },
      { label: "Product Type", value: "Storage Box" },
      { label: "Shape", value: "Rectangle" },
      { label: "Compartments", value: "1" },
      { label: "Country of Origin", value: "India" },
    ],
    deliveryTime: "2–3 Days",
    supplyAbility: "2,000+ / Month",
    tags: ["Lightweight", "Storage", "Compact"],
    moq: "10 Piece",
  },

  // ── PLYWOOD BOXES ──
  {
    id: 11,
    name: "Plywood Wooden Packaging Box",
    image: "/images/wooden-boxes/plywood-packaging-box.jpg",
    description:
      "Heavy machinery plywood packaging boxes made from high-quality pine wood plywood, designed to securely protect and transport heavy industrial equipment. Offers excellent strength, durability, and impact resistance during shipping.",
    specs: [
      { label: "Wood Type", value: "Pine Wood / Ply" },
      { label: "Dimensions (L×W)", value: "4000 × 1000 mm" },
      { label: "Load Capacity", value: "3000 Kg" },
      { label: "Plywood Thickness", value: "12 mm" },
      { label: "Box Style", value: "Fully Closed" },
      { label: "Usage", value: "Electrical Equipment" },
    ],
    deliveryTime: "5–7 Days",
    supplyAbility: "500+ / Month",
    tags: ["Plywood", "Heavy Machinery", "Nailed Box"],
    moq: "250 Piece",
  },
  {
    id: 12,
    name: "Heavy Machine Packaging Wooden Boxes",
    image: "/images/wooden-boxes/heavy-machine-packaging-boxes.jpg",
    badge: "Heavy Duty",
    description:
      "Robust heavy machine packaging wooden boxes that provide strong protection and secure handling for transporting large, heavy machinery. Ensures safety from damage during shipping and storage with massive load capacity.",
    specs: [
      { label: "Material", value: "Plywood" },
      { label: "Dimensions (L×W)", value: "10000 × 10000 mm" },
      { label: "Load Capacity", value: "10000 Kg" },
      { label: "Shape", value: "Rectangle" },
      { label: "Weight Capacity", value: "1000 kg" },
      { label: "Usage", value: "Heavy Electronics" },
    ],
    deliveryTime: "7–10 Days",
    supplyAbility: "100+ / Month",
    tags: ["Plywood", "Super Heavy", "Industrial"],
    moq: "200 Piece",
  },
  {
    id: 13,
    name: "Wooden Ply Heavy Machine Packaging Box",
    image: "/images/wooden-boxes/wooden-ply-heavy-machine-box.jpeg",
    badge: "Premium",
    description:
      "High-strength plywood heavy machine packaging boxes designed to securely hold and protect heavy machinery during transport. Offers excellent durability, shock resistance, and structural support for the most demanding loads.",
    specs: [
      { label: "Material", value: "Plywood" },
      { label: "Dimensions (L×W)", value: "5000 × 2000 mm" },
      { label: "Load Capacity", value: "6000 Kg" },
      { label: "Wood Type", value: "Solid Wood" },
      { label: "Shape", value: "Rectangle" },
      { label: "Usage", value: "Heavy Electronics" },
    ],
    deliveryTime: "7–10 Days",
    supplyAbility: "100+ / Month",
    tags: ["Plywood", "Machine", "Heavy Duty"],
    moq: "200 Piece",
  },
  {
    id: 14,
    name: "Wooden Ply Boxes",
    image: "/images/wooden-boxes/wooden-ply-boxes.jpeg",
    description:
      "Versatile wooden ply boxes made from plywood, offering lightweight yet strong packaging solutions for storage and transport. Ideal for export applications with 2-way pallet base construction.",
    specs: [
      { label: "Box Type", value: "Nailed Box" },
      { label: "Plywood Thickness", value: "12 mm" },
      { label: "Load Capacity", value: "Up to 500 kg" },
      { label: "Usage", value: "Export" },
      { label: "Construction", value: "2-Way Pallet Base" },
      { label: "Shape", value: "Square" },
    ],
    deliveryTime: "5–7 Days",
    supplyAbility: "500+ / Month",
    tags: ["Plywood", "Export", "Pallet Base"],
    moq: "200 Piece",
  },
  {
    id: 15,
    name: "Wooden Packaging Plywood Boxes",
    image: "/images/wooden-boxes/wooden-packaging-plywood-boxes.jpeg",
    badge: "High Volume",
    description:
      "Durable wooden packaging plywood boxes made from high-quality plywood, ideal for safely packing and transporting various goods. Heat-treated surface and 2-way pallet base for export readiness.",
    specs: [
      { label: "Box Type", value: "Nailed Box" },
      { label: "Dimensions (L×W)", value: "4000 × 2000 mm" },
      { label: "Plywood Thickness", value: "12 mm" },
      { label: "Wood Type", value: "Plywood" },
      { label: "Weight Capacity", value: "15 Ton" },
      { label: "Surface Property", value: "Heat Treated" },
    ],
    deliveryTime: "5–7 Days",
    supplyAbility: "300+ / Month",
    tags: ["Plywood", "Heat Treated", "Export"],
    moq: "200 Piece",
  },
  {
    id: 16,
    name: "Wooden Ply Nut Bolt Packing",
    image: "/images/wooden-boxes/wooden-ply-nut-bolt-packing.jpeg",
    description:
      "Sturdy wooden ply nut bolt packing boxes made from plywood and secured with nuts and bolts for added strength. Ideal for transporting heavy-duty industrial goods and machinery parts with maximum security.",
    specs: [
      { label: "Box Type", value: "Nailless Box" },
      { label: "Dimensions", value: "8 × 4 Feet" },
      { label: "Plywood Thickness", value: "12 mm" },
      { label: "Load Capacity", value: "3000 Kg" },
      { label: "Construction", value: "2-Way Pallet Base" },
      { label: "Usage", value: "Export / Packaging" },
    ],
    deliveryTime: "5–7 Days",
    supplyAbility: "300+ / Month",
    tags: ["Plywood", "Nailless", "Nut Bolt"],
    moq: "200 Piece",
  },
];

// ─── Filter options ───────────────────────────────────────────────────────────

const filterOptions = ["All", "Solid Wood", "Plywood", "Export", "Heavy Duty", "Machine", "Compact"];

// ─── Badge colors ─────────────────────────────────────────────────────────────

const badgeColors: Record<string, string> = {
  "Heavy Duty": "bg-blue-600 text-white",
  Popular: "bg-amber-500 text-white",
  Premium: "bg-red-600 text-white",
  "High Volume": "bg-purple-600 text-white",
  "Export Ready": "bg-emerald-600 text-white",
  "Best Value": "bg-green-600 text-white",
};

// ─── SVG Wooden Box Icon ──────────────────────────────────────────────────────

function WoodenBoxIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="8" y="12" width="48" height="40" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="8" y="12" width="48" height="28" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M8 40 L8 50 C8 51.5 9.5 53 11 53 L53 53 C54.5 53 56 51.5 56 50 L56 40" stroke="currentColor" strokeWidth="2" fill="none" />
      {/* Wood grain */}
      <line x1="12" y1="16" x2="52" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="12" y1="20" x2="52" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="12" y1="24" x2="52" y2="24" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="12" y1="28" x2="52" y2="28" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="12" y1="32" x2="52" y2="32" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="12" y1="36" x2="52" y2="36" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      {/* Closure lines */}
      <line x1="16" y1="12" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="12" x2="32" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="48" y1="12" x2="48" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="6" x2="48" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Inquiry Modal ────────────────────────────────────────────────────────────

function InquiryModal({
  product,
  onClose,
}: {
  product: WoodenBoxProduct;
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
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="bg-[#1B2A5E] px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-widest font-medium">Send Inquiry</p>
            <h3 className="text-white font-bold text-lg leading-tight mt-0.5">{product.name}</h3>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors p-1">
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
                  min={10}
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
                placeholder="Describe your size, wood type, load, or custom requirements..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A5E]/30 focus:border-[#1B2A5E] resize-none"
              />
            </div>
            <p className="text-xs text-gray-400">Minimum order: {product.moq}</p>
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

function WoodenBoxCard({
  product,
  onInquire,
  onView,
  index,
}: {
  product: WoodenBoxProduct;
  onInquire: (p: WoodenBoxProduct) => void;
  onView: (p: WoodenBoxProduct) => void;
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
      <div className="relative overflow-hidden bg-amber-50 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width={400}
          height={300}
          className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/8B6914/FFF8E7?text=Wooden+Box'; }}
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
        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">{product.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-medium"
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
          <div className="text-xs text-gray-400">
            MOQ: <span className="text-gray-700 font-medium">{product.moq}</span>
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
  product: WoodenBoxProduct;
  onClose: () => void;
  onInquire: (p: WoodenBoxProduct) => void;
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
          <div className="relative bg-amber-50 h-56 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              width={600}
              height={224}
              className="w-full h-full object-contain p-8"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x300/8B6914/FFF8E7?text=Wooden+Box'; }}
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
              <div className="flex py-2.5 px-4 text-sm bg-white">
                <span className="text-gray-400 w-44 shrink-0">Minimum Order</span>
                <span className="text-gray-800 font-medium">{product.moq}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mb-4">Minimum order quantity: {product.moq}</p>
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

export default function WoodenBoxes() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [inquiryProduct, setInquiryProduct] = useState<WoodenBoxProduct | null>(null);
  const [detailProduct, setDetailProduct] = useState<WoodenBoxProduct | null>(null);

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.tags.some((t) => t.includes(activeFilter)));

  return (
    <>
      <Helmet>
        <title>Wooden Boxes & Packaging | {COMPANY_NAME}</title>
        <meta
          name="description"
          content={`Premium wooden boxes, cargo boxes, plywood packaging boxes, and industrial wooden packaging by ${COMPANY_NAME} in Greater Noida. Solid wood & plywood, custom sizes, heavy-load capacity.`}
        />
        <meta
          name="keywords"
          content="wooden boxes, wooden cargo box, plywood box, heavy wooden packaging box, machine packaging wooden box, export wooden box, wooden packaging, TNR Solutions, Greater Noida"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/products/wooden-boxes`} />
        <meta property="og:title" content={`Wooden Boxes & Packaging | ${COMPANY_NAME}`} />
        <meta
          property="og:description"
          content="Premium wooden boxes, cargo boxes, and plywood packaging solutions. Custom sizes, heavy-load capacity, export-ready."
        />
        <meta property="og:url" content={`${SITE_URL}/products/wooden-boxes`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={COMPANY_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Wooden Boxes & Packaging | ${COMPANY_NAME}`} />
        <meta
          name="twitter:description"
          content="Premium wooden boxes & plywood packaging — cargo boxes, heavy-duty boxes, export-grade solutions."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Wooden Boxes & Packaging',
            description: 'Premium wooden boxes, cargo boxes, plywood packaging, and industrial wooden packaging solutions.',
            brand: { '@type': 'Brand', name: COMPANY_NAME },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              url: `${SITE_URL}/products/wooden-boxes`,
            },
            image: `${SITE_URL}/images/logo.png`,
          })}
        </script>
      </Helmet>

      <Navbar scrolled />
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
                rgba(255,255,255,0.15) 3px,
                rgba(255,255,255,0.15) 4px
              )`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A5E] via-[#1B2A5E]/95 to-[#8B6914]/30" />

          <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-8">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link to="/products" className="hover:text-white transition-colors">Products</Link>
              <ChevronRight size={14} />
              <span className="text-white/80">Wooden Boxes</span>
            </nav>

            <div className="max-w-2xl">
              <motion.div
                className="flex items-center gap-3 mb-5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#8B6914] flex items-center justify-center">
                  <Box size={20} className="text-white" />
                </div>
                <span className="text-[#8B6914] font-semibold text-sm uppercase tracking-widest">
                  Wooden Boxes
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl lg:text-5xl font-black text-white leading-tight mb-5"
                style={{ fontFamily: "Montserrat, sans-serif" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                Premium
                <br />
                <span className="text-[#C9884C]">Wooden Boxes</span>
              </motion.h1>

              <motion.p
                className="text-white/70 text-base leading-relaxed mb-8 max-w-xl"
                style={{ fontFamily: "Open Sans, sans-serif" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Heavy-duty wooden boxes, cargo crates, and plywood packaging built for industrial strength.
                Available in solid wood and plywood, custom sizes, and export-ready configurations with load capacities up to 15 tons.
              </motion.p>

              {/* Stats */}
              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {[
                  { val: "16+", label: "Box Variants" },
                  { val: "15 Ton", label: "Max Load Capacity" },
                  { val: "2 Days", label: "Fastest Delivery" },
                  { val: "2,000+", label: "Monthly Supply" },
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
              <span className="font-semibold text-amber-900">About Wooden Boxes —</span>{' '}
              TNR Solutions manufactures premium wooden boxes and plywood packaging for industrial, commercial, and export applications.
              Our range includes solid wood cargo boxes, heavy-duty machine packaging, plywood nailed boxes, export heat-treated boxes,
              and lightweight storage boxes — all customizable to your exact dimensions, load requirements, and wood type preferences.
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
                  <WoodenBoxCard
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
                <Box size={40} className="mx-auto mb-3 opacity-30" />
                <p>No products match that filter.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── CTA Banner ── */}
        <section className="bg-[#1B2A5E] mx-6 mb-12 rounded-2xl overflow-hidden">
          <div className="px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-xl font-bold mb-1">Need a custom wooden box solution?</h3>
              <p className="text-white/60 text-sm">
                We manufacture to your exact specifications — size, wood type, load rating, and finish.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() =>
                  setInquiryProduct(
                    products.find((p) => p.name === "Wooden Cargo Box") ?? products[0]
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
