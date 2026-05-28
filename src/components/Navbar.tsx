import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';


const navLinks = [
  { label: 'Products',       href: '/products' },
  { label: 'Corrugated box', href: '/products/corrugated-boxes' },
  { label: 'Wooden pallets', href: '/products/wooden-pallets' },
  { label: 'Wooden box',     href: '/#wooden' },
  { label: 'Printing',       href: '/#printing' },
];

export default function Navbar({ scrolled: forceScrolled = false }: { scrolled?: boolean }) {
  const [scrolled,   setScrolled]   = useState(forceScrolled);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If parent forces scrolled (inner pages like Products), lock it — never reset
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

  // 3 states:
  // scrolled=true              → navy bg     → white text ✓
  // forceScrolled + !scrolled  → transparent over light page → navy text ✓
  // !forceScrolled + !scrolled → transparent over dark hero  → white text ✓
  const linkClass = scrolled
    ? 'text-white/80 hover:text-white'
    : forceScrolled
      ? 'text-navy/70 hover:text-navy'
      : 'text-white/80 hover:text-white';

  const logoTextClass = scrolled
    ? 'text-white'
    : forceScrolled
      ? 'text-navy'
      : 'text-white';

  const mobileToggleClass = (!scrolled && forceScrolled)
    ? 'text-navy hover:bg-navy/10'
    : 'text-white hover:bg-white/10';

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
          {navLinks.map((link) => (
            <Link
              key={link.label + link.href}
              to={link.href}
              className={`relative font-body text-sm font-medium tracking-wide transition-colors duration-300 group ${linkClass}`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
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

      {/* Mobile Menu — original dark style preserved */}
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
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={'mobile-' + link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/80 hover:text-orange font-body text-base font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-6 py-3 bg-orange text-white font-heading font-semibold text-center rounded-full"
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