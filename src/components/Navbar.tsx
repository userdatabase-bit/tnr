import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Products',     href: '/products/wooden-pallets', isRouterLink: true },
  { label: 'Wooden Boxes', href: '/#wooden', isRouterLink: true },
  { label: 'Corrugated',   href: '/#corrugated', isRouterLink: true },
  { label: 'Pallets',      href: '/#pallets', isRouterLink: true },
  { label: 'Printing',     href: '/#printing', isRouterLink: true },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on outside tap/click (#11)
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
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
          <img
            src="/images/logo.png"
            alt="TNR Solutions Logo"
            style={{ height: '40px', width: 'auto' }}
            className="bg-white rounded-lg px-1.5 py-0.5 group-hover:scale-110 transition-transform shadow-sm"
            decoding="async"
          />
          <span className="font-heading font-bold text-white text-lg tracking-wide hidden sm:block">
            TNR <span className="text-orange">Solutions</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.isRouterLink ? (
              <Link
                key={link.href}
                to={link.href}
                className="relative text-white/80 hover:text-white font-body text-sm font-medium tracking-wide transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange group-hover:w-full transition-all duration-300" />
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="relative text-white/80 hover:text-white font-body text-sm font-medium tracking-wide transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange group-hover:w-full transition-all duration-300" />
              </a>
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
          className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
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
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) =>
                link.isRouterLink ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-white/80 hover:text-orange font-body text-base font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-white/80 hover:text-orange font-body text-base font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
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
