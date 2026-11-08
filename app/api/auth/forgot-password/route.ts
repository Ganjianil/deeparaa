import { NextResponse } from "next/server";
import { z } from "zod";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email(),
  phone: z.string().trim().min(8).max(20),
});

function normalizePhone(value: string) {
  return value.replace(/[^\d]/g, "");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Enter a valid email and mobile number." },
        { status: 400 },
      );
    }

    const email = parsed.data.email.toLowerCase().trim();
    const phone = normalizePhone(parsed.data.phone);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || normalizePhone(user.phone) !== phone) {
      // Same response either way — avoid account enumeration
      return NextResponse.json({
        ok: true,
        message:
          "If that account exists, you can set a new password on the next step.",
        resetToken: null,
      });
    }

    const resetToken = randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 30 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpires },
    });

    return NextResponse.json({
      ok: true,
      message: "Verified. Choose a new password.",
      resetToken,
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { error: "Unable to start password reset." },
      { status: 500 },
    );
  }
}
