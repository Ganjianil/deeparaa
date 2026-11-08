import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashOtp } from "@/lib/otp";

const schema = z.object({
  email: z.string().email(),
  otp: z.string().trim().regex(/^\d{6}$/),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Enter the 6-digit OTP." },
        { status: 400 },
      );
    }

    const email = parsed.data.email.toLowerCase().trim();
    const otpHash = hashOtp(parsed.data.otp);

    const user = await prisma.user.findUnique({ where: { email } });
    if (
      !user?.resetToken ||
      !user.resetTokenExpires ||
      user.resetTokenExpires < new Date() ||
      user.resetToken !== otpHash
    ) {
      return NextResponse.json(
        { error: "Invalid or expired OTP. Request a new code." },
        { status: 400 },
      );
    }

    // Swap OTP for a short-lived reset session token
    const resetToken = randomBytes(32).toString("hex");
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpires: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    return NextResponse.json({
      ok: true,
      resetToken,
      message: "OTP verified. Set a new password.",
    });
  } catch (err) {
    console.error("OTP verify error:", err);
    return NextResponse.json(
      { error: "Unable to verify OTP." },
      { status: 500 },
    );
  }
}
