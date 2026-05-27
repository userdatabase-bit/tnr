# TNR Solutions — Corporate Website

Premium packaging, pallets, and digital printing solutions for businesses across India. Built with React 19, TypeScript, and Vite.

**Site:** [tnrsolutions.co.in](https://tnrsolutions.co.in)

---

## Tech Stack

| Layer            | Technology |
| ---------------- | ---------- |
| Framework        | React 19   |
| Language         | TypeScript |
| Build tool       | Vite 7     |
| Styling          | Tailwind CSS 4 |
| Routing          | React Router DOM 7 |
| Animations       | Framer Motion + GSAP |
| SEO              | react-helmet-async |
| Icons            | Lucide React |
| Map              | Leaflet / react-leaflet |
| Lint / Format    | ESLint + Prettier |

---

## Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/<org>/tnr-solutions.git
cd tnr-solutions

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Start dev server
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Commands

| Command              | Description                  |
| -------------------- | ---------------------------- |
| `npm run dev`        | Start Vite dev server (HMR)  |
| `npm run build`      | TypeScript check + production build |
| `npm run preview`    | Preview production build      |
| `npm run lint`       | Run ESLint                    |
| `npm run format`     | Format with Prettier          |

---

## Project Structure

```
tnr-solutions/
├── public/uploads/          # Static assets (images, favicon)
├── src/
│   ├── components/          # React components (Hero, Navbar, ContactFooter, etc.)
│   ├── pages/               # Route-level page components (NotFound)
│   ├── hooks/               # Custom hooks (useCountUp, useScrollAnimation, useAnimation)
│   ├── config/              # Environment variable config (env.ts)
│   ├── utils/               # Utility functions (woodenBoxStyles.ts)
│   ├── constants.ts         # App-wide constants (contact info, social links)
│   ├── App.tsx              # Root app component with lazy-loaded sections
│   ├── main.tsx             # Entry point (router, providers)
│   └── index.css            # Global styles + Tailwind imports
├── .env.example             # Documented environment variables
├── vercel.json              # Vercel SPA routing config
├── vite.config.ts           # Vite build config + manualChunks
├── tsconfig.json            # TypeScript config
├── eslint.config.js         # ESLint flat config
└── .prettierrc              # Prettier config
```

### Key Components

| Component          | Description |
| ------------------ | ----------- |
| **Hero**           | Above-fold hero with headline, CTA, animated corner decorations |
| **WoodenBoxes**    | Interactive 3D wooden box viewer with play/pause rotation |
| **CorrugatedBoxes** | Content section with animated product cards |
| **Pallets**        | Pallet product showcase |
| **DigitalPrinting** | Digital printing services section |
| **Process**        | 4-step manufacturing/order process |
| **BrandPillars**   | Company values / differentiators |
| **Testimonials**   | Customer testimonial carousel |
| **Stats**          | Animated statistics counter |
| **ServiceMap**     | Service area map (Leaflet) + CTA |
| **ContactFooter**  | Quote request form (WhatsApp / Email) + footer |
| **ScrollToTop**    | Scroll-to-top on route change |
| **ErrorBoundary**  | Render error catch-all with fallback UI |

---

## Deployment

The site is deployed on **Vercel**.

1. Push to your Git provider (GitHub / GitLab / Bitbucket).
2. Import the repository into Vercel.
3. Add the environment variable `VITE_SITE_URL` in the Vercel project dashboard.
4. Deploy — the `vercel.json` at the root handles SPA routing automatically.

```bash
# Or deploy from CLI:
npx vercel --prod
```

### Environment Variables

| Variable         | Required | Default                          | Description |
| ---------------- | -------- | -------------------------------- | ----------- |
| `VITE_SITE_URL`  | No       | `https://tnrsolutions.co.in`     | Canonical site URL for SEO meta tags |
| `VITE_API_URL`   | No       | —                                | Backend API base URL (future) |
| `VITE_FORM_ENDPOINT` | No   | —                                | Server-side form submission endpoint (future) |

See `.env.example` for all available variables.

---

## Architecture Notes

- **Animations:** GSAP handles parallax / scroll-triggered effects (scrub-based). Framer Motion handles component entrance / exit animations (`whileInView`, `AnimatePresence`). Both are re-exported from `src/hooks/useAnimation.ts` with documented conventions.
- **Code splitting:** Heavy sections (CorrugatedBoxes, Pallets, DigitalPrinting, etc.) are lazy-loaded with `React.lazy` + `Suspense`. Vendor chunks are split via `manualChunks` in `vite.config.ts`.
- **Forms:** The quote form opens the user's WhatsApp or email client with pre-filled details — no backend API required.
- **Error handling:** `ErrorBoundary` wraps the entire router in `main.tsx`. A `ScrollToTop` component resets scroll position on route changes.

---

## License

© 2025 TNR Solutions Pvt. Ltd. All rights reserved.
