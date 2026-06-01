// ─── TNR Solutions — Central Config & Constants ───────────────────────────────
// Update these values in ONE place and they propagate throughout the entire app.

import { env } from './config/env';

export const SITE_URL = env.SITE_URL;

// Contact
export const PHONE_PRIMARY   = '+91 9999640071';
export const EMAIL            = 'info@tnrsolutions.co.in';
export const WHATSAPP_NUMBER  = '919999640071'; // country code + number, no + or spaces

// Address / Business details
export const ADDRESS_LINE1 = 'Site C Surajpur Industrial Area Greater Noida';
export const ADDRESS_LINE2 = 'Uttar Pradesh – 201306, India';
export const GST_NUMBER    = 'GSTIN: 09CDSPS1891J3ZJ';
export const SERVICES_GST_NUMBER = 'GSTIN: 07CDSPS1891J1ZP';
export const SERVICES_ADDRESS = 'A-4, Metro Piller No. 340, Basai Darapur, Chotey Lal Park, New Delhi, West Delhi, Delhi – 110015';
export const COMPANY_NAME  = 'TNR Solutions Pvt. Ltd.';

// Social (add real URLs when available)
export const SOCIAL_LINKEDIN  = 'https://linkedin.com/company/tnrsolutions';
export const SOCIAL_INSTAGRAM = 'https://instagram.com/tnrsolutions';
export const SOCIAL_FACEBOOK  = 'https://facebook.com/tnrsolutions';
