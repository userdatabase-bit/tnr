import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Globe, Mail, ArrowRight, Send, CheckCircle,
  User, Building2, Package, Hash, MessageSquare,
  MapPin, Linkedin, Instagram, Facebook,
} from 'lucide-react';
import {
  WHATSAPP_NUMBER, PHONE_PRIMARY, PHONE_ALTERNATE, EMAIL,
  ADDRESS_LINE1, ADDRESS_LINE2, GST_NUMBER, COMPANY_NAME,
  SOCIAL_LINKEDIN, SOCIAL_INSTAGRAM, SOCIAL_FACEBOOK,
} from '../constants';

const productOptions = [
  'Wooden Boxes',
  'Corrugated Boxes',
  'Press Wood Pallets',
  'Timber Pallets',
  'Edge Protectors',
  'Digital Printing',
  'Custom Packaging',
  'Other',
];

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
}

const initialForm: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  product: '',
  quantity: '',
  message: '',
};

function buildWhatsAppURL(data: FormData): string {
  const divider = '──────────────────';
  const lines: string[] = [];

  lines.push('*TNR SOLUTIONS — Quote Request*');
  lines.push(divider);
  lines.push('');
  lines.push(`*Name*        : ${data.name}`);

  if (data.company) lines.push(`*Company*   : ${data.company}`);
  if (data.email)   lines.push(`*Email*       : ${data.email}`);

  lines.push(`*Phone*      : ${data.phone}`);
  lines.push('');
  lines.push(divider);
  lines.push(`*Product*    : ${data.product || 'Not specified'}`);

  if (data.quantity) lines.push(`*Quantity*  : ${data.quantity}`);

  if (data.message) {
    lines.push('');
    lines.push(divider);
    lines.push(`*Message* :`);
    lines.push(data.message);
  }

  lines.push('');
  lines.push(divider);
  lines.push('_Sent from tnrsolutions.co.in_');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function buildMailtoURL(data: FormData): string {
  const subject = `Quote Request — ${data.product || 'Packaging'}`;
  const body = [
    `Name: ${data.name}`,
    data.company  ? `Company: ${data.company}`  : '',
    `Phone: ${data.phone}`,
    data.quantity ? `Quantity: ${data.quantity}` : '',
    '',
    data.message || 'Please send me a quote.',
  ].filter(Boolean).join('\n');

  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const inputBase   = 'w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.08] border text-white font-body text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange/40 transition-all';
const inputError  = 'border-red-400/60 focus:ring-red-400/30';
const inputNormal = 'border-white/10';
const labelClass  = 'block font-heading font-semibold text-white/70 text-xs tracking-wider mb-2.5';

const quickLinks = [
  { label: 'Wooden Boxes',     href: '#wooden'     },
  { label: 'Corrugated Boxes', href: '#corrugated' },
  { label: 'Pallet Solutions', href: '#pallets'    },
  { label: 'Digital Printing', href: '#printing'   },
  { label: 'Get a Quote',      href: '#contact'    },
];

export default function ContactFooter() {
  const [form,      setForm]      = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [sendMode,  setSendMode]  = useState<'whatsapp' | 'email'>('whatsapp');
  const [errors,    setErrors]    = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[\d\s+()-]{7,15}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.product) e.product = 'Please select a product';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const url = sendMode === 'whatsapp' ? buildWhatsAppURL(form) : buildMailtoURL(form);
    window.open(url, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm(initialForm);
    }, 4000);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      aria-describedby="contact-description"
      className="relative overflow-hidden"
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

      {/* ── Quote form section ───────────────────────────────────────────── */}
      <div className="relative py-20 md:py-28">
        <div className="relative max-w-3xl mx-auto px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 id="contact-heading" className="font-heading font-black text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
              Ready to Package Your{' '}
              <span className="text-orange-light">Success?</span>
            </h2>
            <p id="contact-description" className="font-body text-white/60 text-base max-w-md mx-auto leading-relaxed">
              Tell us what you need — we'll get back to you within 24 hours.
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-6 sm:p-10 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm">

              {/* Send-mode toggle (#10) */}
              <div className="flex items-center gap-2 mb-8 p-1.5 bg-white/[0.08] rounded-xl w-fit mx-auto">
                {(['whatsapp', 'email'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSendMode(mode)}
                    aria-pressed={sendMode === mode}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-heading font-semibold tracking-wider uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/80 focus-visible:ring-offset-2 focus-visible:ring-offset-navy ${
                      sendMode === mode
                        ? 'bg-white text-navy shadow-md'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {mode === 'whatsapp' ? (
                      <>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                      </>
                    ) : (
                      <>
                        <Mail className="w-3.5 h-3.5" />
                        Email
                      </>
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    role="status"
                    aria-live="polite"
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-400/20 flex items-center justify-center mb-5">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h4 className="font-heading font-bold text-white text-xl mb-2">Quote Sent!</h4>
                    <p className="font-body text-white/60 text-sm max-w-xs">
                      {sendMode === 'whatsapp'
                        ? 'Your WhatsApp chat is opening with pre-filled details. Our team will respond shortly.'
                        : 'Your email client is opening. Our team will respond within 24 hours.'}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    {/* Name & Company */}
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                          <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            value={form.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            placeholder="Your name"
                            required
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? 'error-name' : undefined}
                            className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                          />
                        </div>
                        {errors.name && <p id="error-name" className="mt-1.5 text-red-300 text-xs font-body">{errors.name}</p>}
                      </div>

                      <div>
                        <label className={labelClass}>Company</label>
                        <div className="relative">
                          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                          <input
                            type="text"
                            autoComplete="organization"
                            value={form.company}
                            onChange={(e) => updateField('company', e.target.value)}
                            placeholder="Company name"
                            className={`${inputBase} ${inputNormal}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                      <div>
                        <label className={labelClass}>Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                          <input
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            placeholder="you@company.com"
                            className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                          />
                        </div>
                        {errors.email && <p className="mt-1.5 text-red-300 text-xs font-body">{errors.email}</p>}
                      </div>

                      <div>
                        <label className={labelClass}>Phone *</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                          <input
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            value={form.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            placeholder="+91 00000 00000"
                            required
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={errors.phone ? 'error-phone' : undefined}
                            className={`${inputBase} ${errors.phone ? inputError : inputNormal}`}
                          />
                        </div>
                        {errors.phone && <p id="error-phone" className="mt-1.5 text-red-300 text-xs font-body">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Product & Quantity */}
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                      <div>
                        <label className={labelClass}>Product Interest *</label>
                        <div className="relative">
                          <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                          <select
                            name="product"
                            value={form.product}
                            onChange={(e) => updateField('product', e.target.value)}
                            required
                            aria-invalid={Boolean(errors.product)}
                            aria-describedby={errors.product ? 'error-product' : undefined}
                            className={`${inputBase} appearance-none cursor-pointer ${form.product ? 'text-white' : 'text-white/30'} ${errors.product ? inputError : inputNormal}`}
                          >
                            <option value="" disabled className="bg-[#1B2A5E] text-white/50">Select a product</option>
                            {productOptions.map((opt) => (
                              <option key={opt} value={opt} className="bg-[#1B2A5E] text-white">{opt}</option>
                            ))}
                          </select>
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        {errors.product && <p id="error-product" className="mt-1.5 text-red-300 text-xs font-body">{errors.product}</p>}
                      </div>

                      <div>
                        <label className={labelClass}>Quantity</label>
                        <div className="relative">
                          <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                          <input
                            type="text"
                            value={form.quantity}
                            onChange={(e) => updateField('quantity', e.target.value)}
                            placeholder="e.g. 500 units"
                            className={`${inputBase} ${inputNormal}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-8">
                      <label className={labelClass}>Message / Requirements</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-4 w-4 h-4 text-white/25 pointer-events-none" />
                        <textarea
                          value={form.message}
                          onChange={(e) => updateField('message', e.target.value)}
                          placeholder="Describe your packaging requirements, dimensions, timeline, etc."
                          rows={4}
                          className={`${inputBase} resize-none pt-3.5 ${inputNormal}`}
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange hover:bg-orange-light text-white font-heading font-bold text-base rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/80 focus-visible:ring-offset-2 focus-visible:ring-offset-navy hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(232,130,26,0.4)] active:scale-[0.98]"
                    >
                      <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      {sendMode === 'whatsapp' ? 'Send via WhatsApp' : 'Send via Email'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Info Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <a
              href={`tel:${PHONE_PRIMARY.replace(/\s/g, '')}`}
              className="flex flex-col items-center gap-2.5 p-5 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] hover:border-white/20 transition-all text-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange/15 flex items-center justify-center group-hover:bg-orange/25 transition-colors">
                <Phone className="w-4 h-4 text-orange-light" />
              </div>
              <span className="font-body text-white/40 text-[10px] tracking-wider uppercase">Primary</span>
              <span className="font-heading font-semibold text-white text-xs">{PHONE_PRIMARY}</span>
            </a>

            <a
              href={`tel:${PHONE_ALTERNATE.replace(/\s/g, '')}`}
              className="flex flex-col items-center gap-2.5 p-5 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] hover:border-white/20 transition-all text-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange/15 flex items-center justify-center group-hover:bg-orange/25 transition-colors">
                <Phone className="w-4 h-4 text-orange-light" />
              </div>
              <span className="font-body text-white/40 text-[10px] tracking-wider uppercase">Alternate</span>
              <span className="font-heading font-semibold text-white text-xs">{PHONE_ALTERNATE}</span>
            </a>

            <a
              href="https://www.tnrsolutions.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2.5 p-5 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] hover:border-white/20 transition-all text-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange/15 flex items-center justify-center group-hover:bg-orange/25 transition-colors">
                <Globe className="w-4 h-4 text-orange-light" />
              </div>
              <span className="font-body text-white/40 text-[10px] tracking-wider uppercase">Website</span>
              <span className="font-heading font-semibold text-white text-xs break-all">tnrsolutions.co.in</span>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="flex flex-col items-center gap-2.5 p-5 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] hover:border-white/20 transition-all text-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange/15 flex items-center justify-center group-hover:bg-orange/25 transition-colors">
                <Mail className="w-4 h-4 text-orange-light" />
              </div>
              <span className="font-body text-white/40 text-[10px] tracking-wider uppercase">Email</span>
              <span className="font-heading font-semibold text-white text-xs break-all">{EMAIL}</span>
            </a>
          </motion.div>

          {/* WhatsApp badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex items-center justify-center gap-2.5"
          >
            <svg className="w-4 h-4 text-green-400/70" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="font-body text-white/40 text-xs">Your quote opens your preferred app with pre-filled details</span>
          </motion.div>
        </div>
      </div>

      {/* ── Enriched Footer (#17) ──────────────────────────────────────────── */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <img
                src="/uploads/upload_1.png"
                alt="TNR Solutions"
                className="h-10 w-auto bg-white/90 rounded-lg px-2 py-1 mb-5"
                loading="lazy"
                decoding="async"
              />
              <p className="font-body text-white/50 text-sm leading-relaxed mb-5">
                Premium packaging, pallets, and digital printing solutions built for strength, reliability, and brand impact.
              </p>
              {/* Social links */}
              <div className="flex items-center gap-3">
                {[
                  { href: SOCIAL_LINKEDIN,  Icon: Linkedin,  label: 'LinkedIn'  },
                  { href: SOCIAL_INSTAGRAM, Icon: Instagram, label: 'Instagram' },
                  { href: SOCIAL_FACEBOOK,  Icon: Facebook,  label: 'Facebook'  },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-white/[0.08] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-orange/20 hover:border-orange/30 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-heading font-bold text-white text-sm tracking-wider mb-5">SERVICES</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-body text-white/50 text-sm hover:text-orange transition-colors flex items-center gap-1.5 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Address */}
            <div>
              <h4 className="font-heading font-bold text-white text-sm tracking-wider mb-5">ADDRESS</h4>
              <div className="flex items-start gap-2.5 mb-4">
                <MapPin className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-white/50 text-sm leading-relaxed">{ADDRESS_LINE1}</p>
                  <p className="font-body text-white/50 text-sm leading-relaxed">{ADDRESS_LINE2}</p>
                </div>
              </div>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-white/50 hover:text-orange transition-colors text-sm font-body mb-2"
              >
                <Mail className="w-3.5 h-3.5 text-orange flex-shrink-0" />
                {EMAIL}
              </a>
              <a
                href={`tel:${PHONE_PRIMARY.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-white/50 hover:text-orange transition-colors text-sm font-body"
              >
                <Phone className="w-3.5 h-3.5 text-orange flex-shrink-0" />
                {PHONE_PRIMARY}
              </a>
            </div>

            {/* Business info */}
            <div>
              <h4 className="font-heading font-bold text-white text-sm tracking-wider mb-5">BUSINESS INFO</h4>
              <p className="font-body text-white/40 text-xs mb-2">{GST_NUMBER}</p>
              <p className="font-body text-white/40 text-xs mb-5">CIN: U74999UP2009PTC123456</p>
              <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
                <p className="font-heading font-semibold text-white/70 text-xs tracking-wider mb-1">WORKING HOURS</p>
                <p className="font-body text-white/50 text-xs">Mon – Sat: 9:00 AM – 6:00 PM</p>
                <p className="font-body text-white/50 text-xs">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.07] py-5">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-body text-white/30 text-xs">
              &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
            </p>
            <p className="font-body text-white/20 text-xs">
              Made with ❤️ in India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
