import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

// ── Nav data with sub-items ───────────────────────────────────────────────────

type NavItem = {
  label: string;
  href: string;
  subItems?: { label: string; href: string; description?: string }[];
};

const navLinks: NavItem[] = [
  {
    label: 'Products',
    href: '/products',
    subItems: [
      { label: 'Corrugated Boxes', href: '/products/corrugated-boxes', description: 'Custom printed & shipping boxes' },
      { label: 'Wooden Pallets', href: '/products/wooden-pallets', description: 'Industrial pallets & timber packaging' },
      { label: 'Wooden Boxes', href: '/products/wooden-boxes', description: 'Premium wooden & plywood boxes' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    subItems: [
      { label: 'Digital Marketing', href: '/services/digital-marketing', description: 'SEO, PPC, social media & content' },
      { label: 'IT Management', href: '/services/it-management', description: 'Cloud, cybersecurity & infrastructure' },
      { label: 'Software Services', href: '/services/software-services', description: 'Custom apps, ERP & AI solutions' },
    ],
  },
  { label: 'About Us', href: '/about' },
];

// ── Dropdown component ────────────────────────────────────────────────────────

function DropdownMenu({
  item,
  linkClass,
  isOpen,
  onOpen,
  onClose,
  textColor,
}: {
  item: NavItem;
  linkClass: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  textColor: 'white' | 'navy';
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <Link
        to={item.href}
        className={`relative flex items-center gap-1 font-body text-sm font-medium tracking-wide transition-colors duration-300 group ${linkClass}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange group-hover:w-full transition-all duration-300" />
      </Link>

      <AnimatePresence>
        {isOpen && item.subItems && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-2xl overflow-hidden shadow-2xl border ${
              textColor === 'navy'
                ? 'bg-white border-navy/10'
                : 'bg-navy-dark/95 backdrop-blur-xl border-white/10'
            }`}
            role="menu"
          >
            <div className="py-2">
              {/* Overview link */}
              <Link
                to={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-5 py-3 transition-colors ${
                  textColor === 'navy'
                    ? 'text-navy/60 hover:text-orange hover:bg-orange/5'
                    : 'text-white/60 hover:text-orange hover:bg-white/5'
                }`}
                role="menuitem"
              >
                <span className="font-heading font-bold text-sm">{item.label} Overview</span>
                <span className="ml-auto text-xs opacity-50">→</span>
              </Link>

              {/* Divider */}
              <div className={`mx-5 my-1 h-px ${textColor === 'navy' ? 'bg-navy/10' : 'bg-white/10'}`} />

              {/* Sub-items */}
              {item.subItems.map((sub) => (
                <Link
                  key={sub.href}
                  to={sub.href}
                  onClick={onClose}
                  className={`flex flex-col px-5 py-3 transition-colors ${
                    textColor === 'navy'
                      ? 'hover:bg-orange/5 hover:text-orange'
                      : 'hover:bg-white/5 hover:text-orange'
                  }`}
                  role="menuitem"
                >
                  <span className={`font-heading font-semibold text-sm ${
                    textColor === 'navy' ? 'text-navy' : 'text-white'
                  }`}>
                    {sub.label}
                  </span>
                  {sub.description && (
                    <span className="font-body text-xs mt-0.5 opacity-50">{sub.description}</span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

export default function Navbar({ scrolled: forceScrolled = false }: { scrolled?: boolean }) {
  const [scrolled, setScrolled] = useState(forceScrolled);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forceScrolled) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [forceScrolled]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [mobileOpen]);

  const isDark = scrolled || !forceScrolled;
  const linkClass = isDark
    ? 'text-white/80 hover:text-white'
    : 'text-navy/70 hover:text-navy';

  const logoTextClass = isDark ? 'text-white' : 'text-navy';
  const textColor: 'white' | 'navy' = isDark ? 'white' : 'navy';

  const mobileToggleClass = isDark
    ? 'text-white hover:bg-white/10'
    : 'text-navy hover:bg-navy/10';

  return (
    <motion.nav
      ref={menuRef as React.RefObject<HTMLElement>}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy/95 backdrop-blur-xl shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group"
        >
          <img
            src="/images/logo.png"
            alt="TNR Solutions Logo"
            className="bg-white rounded-lg px-1.5 py-0.5 group-hover:scale-110 transition-transform shadow-sm"
            style={{ height: '40px', width: 'auto' }}
            decoding="async"
          />
          <span className={`font-heading font-bold text-lg tracking-wide hidden sm:block transition-colors duration-300 ${logoTextClass}`}>
            TNR <span className="text-orange">Solutions</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.subItems ? (
              <DropdownMenu
                key={link.label}
                item={link}
                linkClass={linkClass}
                isOpen={openDropdown === link.label}
                onOpen={() => setOpenDropdown(link.label)}
                onClose={() => setOpenDropdown(null)}
                textColor={textColor}
              />
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className={`relative font-body text-sm font-medium tracking-wide transition-colors duration-300 group ${linkClass}`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange group-hover:w-full transition-all duration-300" />
              </Link>
            )
          )}
          <Link
            to="/#contact"
            className="ml-4 px-6 py-2.5 bg-orange hover:bg-orange-light text-white font-heading font-semibold text-sm rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(232,130,26,0.4)]"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${mobileToggleClass}`}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-navy-dark/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={'mobile-' + link.label}>
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-white/80 hover:text-orange font-body text-base font-medium transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                  {/* Mobile sub-items */}
                  {link.subItems && (
                    <div className="ml-4 pl-4 border-l border-white/10 space-y-1 mb-2 mt-1">
                      {link.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-white/50 hover:text-orange font-body text-sm transition-colors py-1.5"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 px-6 py-3 bg-orange text-white font-heading font-semibold text-center rounded-full"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
