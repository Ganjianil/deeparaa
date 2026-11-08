import { createHash, randomInt } from "crypto";
import { ADMIN_WHATSAPP, normalizePhone, whatsappUrl } from "@/lib/contact";

export function generateOtp(): string {
  return String(randomInt(100000, 999999));
}

export function hashOtp(otp: string): string {
  return createHash("sha256").update(otp).digest("hex");
}

export function maskPhone(phone: string): string {
  const digits = normalizePhone(phone);
  if (digits.length < 4) return "****";
  return `${"*".repeat(Math.max(0, digits.length - 4))}${digits.slice(-4)}`;
}

export function otpWhatsAppLink(email: string, otp: string): string {
  return whatsappUrl(
    `Deepara password reset OTP for ${email}: ${otp}\nValid for 10 minutes. Do not share this code.`,
  );
}

export function otpExpiresAt(minutes = 10): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}

/** Optional SMS providers. Returns true when a provider accepted the send. */
export async function sendOtpSms(phone: string, otp: string): Promise<boolean> {
  const digits = normalizePhone(phone);
  if (!digits) return false;

  const fast2smsKey = process.env.FAST2SMS_API_KEY;
  if (fast2smsKey) {
    try {
      const res = await fetch("https://www.fast2sms.com/dev/bulkV2", {
        method: "POST",
        headers: {
          authorization: fast2smsKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route: "q",
          message: `Deepara password reset OTP: ${otp}. Valid 10 minutes.`,
          language: "english",
          flash: 0,
          numbers: digits,
        }),
      });
      return res.ok;
    } catch (err) {
      console.error("Fast2SMS OTP error:", err);
    }
  }

  const msg91Key = process.env.MSG91_AUTH_KEY;
  const msg91Template = process.env.MSG91_TEMPLATE_ID;
  if (msg91Key && msg91Template) {
    try {
      const res = await fetch(
        `https://control.msg91.com/api/v5/flow/`,
        {
          method: "POST",
          headers: {
            authkey: msg91Key,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            template_id: msg91Template,
            recipients: [{ mobiles: digits, otp }],
          }),
        },
      );
      return res.ok;
    } catch (err) {
      console.error("MSG91 OTP error:", err);
    }
  }

  // Always available fallback channel for this project
  void ADMIN_WHATSAPP;
  return false;
}
