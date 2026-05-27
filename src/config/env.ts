// ─── Environment Variable Config ────────────────────────────────────────────
// Centralised typed access to VITE_* env vars with runtime validation so
// missing critical vars fail fast in dev instead of silently breaking at
// runtime.  All env access goes through this file — never import.meta.env
// directly in components.

// ═══════════════════════════════════════════════════════════════════════════════
//  Schema — add new VITE_* vars here
// ═══════════════════════════════════════════════════════════════════════════════

interface EnvSchema {
  /** Primary site URL (used for canonical, OG, sitemap). */
  SITE_URL: string;

  /** Backend API base URL (optional — set when a backend is connected). */
  API_URL: string | undefined;

  /** Form submission endpoint (optional — for server-side form handling). */
  FORM_ENDPOINT: string | undefined;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  Validation helper
// ═══════════════════════════════════════════════════════════════════════════════

class EnvValidationError extends Error {
  name = 'EnvValidationError';
}

/**
 * Reads a VITE_* variable with optional fallback.
 * In dev mode, logs a warning for missing vars (without a fallback).
 * In production, silently uses the fallback or empty string.
 */
function read(key: string, fallback?: string): string | undefined {
  const raw = import.meta.env[key] as string | undefined;
  const val = raw ?? fallback;

  if (val === undefined || val === '') {
    if (import.meta.env.DEV) {
      console.warn(
        `[env] Missing environment variable ${key}. ` +
          (fallback !== undefined
            ? `Using fallback "${fallback}".`
            : 'No fallback provided — value will be undefined.'),
      );
    }
    return undefined;
  }

  return val;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  Exported env object (typed & validated)
// ═══════════════════════════════════════════════════════════════════════════════

export const env: EnvSchema = {
  SITE_URL: read('VITE_SITE_URL', 'https://tnrsolutions.co.in')!,

  API_URL: read('VITE_API_URL'),

  FORM_ENDPOINT: read('VITE_FORM_ENDPOINT'),
};

// ── Strict-mode getter (opt-in per environment) ────────────────────────────
// If the app absolutely requires a variable to be set (e.g. API_URL in
// production), call this at the top of main.tsx or a route loader so it
// throws before the first render.
//
// Usage:
//   import { requireEnv } from './config/env';
//   const apiUrl = requireEnv('API_URL');  // returns `string`, throws if undefined

export function requireEnv(key: keyof EnvSchema): string {
  if (env[key] === undefined) {
    const viteKey = `VITE_${key}`;
    if (import.meta.env.DEV) {
      throw new EnvValidationError(
        `[env] Required variable ${viteKey} is not set.
  → Add it to your .env file or set it in the shell:
      ${viteKey}=your-value npm run dev
`,
      );
    }
    throw new EnvValidationError(
      `[env] Required variable ${viteKey} is not set. Check your deployment environment variables.`,
    );
  }
  return env[key] as string;
}
