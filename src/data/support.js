export const SUPPORT_EMAIL =
  import.meta.env.VITE_SUPPORT_EMAIL?.trim() || 'care@naturesgoldengift.example';
export const HAS_CONFIGURED_EMAIL = Boolean(import.meta.env.VITE_SUPPORT_EMAIL?.trim());
export const SUPPORT_WHATSAPP_NUMBER = String(import.meta.env.VITE_SUPPORT_WHATSAPP_NUMBER || '').replace(/\D/g, '');
export const SUPPORT_PHONE = String(import.meta.env.VITE_SUPPORT_PHONE || '').replace(/[^\d+]/g, '');
export const SUPPORT_STUDIO_ADDRESS = import.meta.env.VITE_SUPPORT_STUDIO_ADDRESS?.trim() || '';

export const SUPPORT_WHATSAPP_URL = /^\d{8,15}$/.test(SUPPORT_WHATSAPP_NUMBER)
  ? `https://wa.me/${SUPPORT_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello, I have a question about my haldi order.')}`
  : '';
