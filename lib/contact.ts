export const ADMIN_WHATSAPP =
  process.env.NEXT_PUBLIC_ADMIN_WHATSAPP ?? "919985888237";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function normalizePhone(phone: string): string {
  return phone.replace(/[\s()+-]/g, "");
}

export function isValidPhone(phone: string): boolean {
  return /^\d{10,15}$/.test(normalizePhone(phone));
}
