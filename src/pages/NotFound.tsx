import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { COMPANY_NAME, SITE_URL } from '../constants';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | {COMPANY_NAME}</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved. Return to TNR Solutions homepage." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={SITE_URL} />
      </Helmet>

      <div
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #B8874A 0%, #8B6530 50%, #6B4D24 100%)' }}
      >
        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 text-center px-6">
          {/* Large 404 */}
          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-heading font-black text-white text-[10rem] sm:text-[14rem] leading-none tracking-tight"
          >
            404
          </motion.h1>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-heading font-bold text-white/70 text-lg sm:text-xl tracking-widest uppercase mb-3"
          >
            Page Not Found
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-body text-white/50 text-base max-w-md mx-auto mb-10 leading-relaxed"
          >
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </motion.p>

          {/* Back home button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-navy font-heading font-bold text-sm rounded-full hover:bg-white/90 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#6B4D24]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Homepage
            </Link>
          </motion.div>
        </div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="absolute bottom-8 font-body text-white/25 text-xs"
        >
          TNR Solutions &copy; {new Date().getFullYear()}
        </motion.p>
      </div>
    </>
  );
}
