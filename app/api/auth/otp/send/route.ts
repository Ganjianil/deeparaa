import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  generateOtp,
  hashOtp,
  maskPhone,
  otpExpiresAt,
  otpWhatsAppLink,
  sendOtpSms,
} from "@/lib/otp";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }

    const email = parsed.data.email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email } });

    // Same outer shape whether or not the account exists
    if (!user || !user.phone) {
      return NextResponse.json({
        ok: true,
        sent: false,
        message:
          "If an account exists for that email, an OTP was sent to the registered mobile.",
      });
    }

    const otp = generateOtp();
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: hashOtp(otp),
        resetTokenExpires: otpExpiresAt(10),
      },
    });

    const smsSent = await sendOtpSms(user.phone, otp);
    const whatsappUrl = otpWhatsAppLink(email, otp);

    return NextResponse.json({
      ok: true,
      sent: true,
      channel: smsSent ? "sms" : "whatsapp",
      maskedPhone: maskPhone(user.phone),
      whatsappUrl: smsSent ? undefined : whatsappUrl,
      message: smsSent
        ? `OTP sent to ${maskPhone(user.phone)}.`
        : `OTP ready. Open WhatsApp to receive your code for ${maskPhone(user.phone)}.`,
    });
  } catch (err) {
    console.error("OTP send error:", err);
    return NextResponse.json(
      { error: "Unable to send OTP right now." },
      { status: 500 },
    );
  }
}
