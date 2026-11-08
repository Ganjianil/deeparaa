import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatInr } from "@/lib/packages";

const checkoutSchema = z.object({
  packageId: z.string().min(1),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid package selection." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    if (!user) {
      return NextResponse.json({ error: "Account not found." }, { status: 404 });
    }
    if (!user.phone) {
      return NextResponse.json(
        { error: "Your account is missing a mobile number. Please contact support." },
        { status: 400 },
      );
    }

    const pkg = await prisma.package.findFirst({
      where: { id: parsed.data.packageId, active: true },
    });
    if (!pkg) {
      return NextResponse.json({ error: "Package not found." }, { status: 404 });
    }

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        packageId: pkg.id,
        packageTitle: pkg.title,
        packageSlug: pkg.slug,
        priceInr: pkg.priceInr,
        name: user.name,
        email: user.email,
        phone: user.phone,
        paymentMethod: "COD",
        status: "NEW",
        source: "package-checkout",
      },
    });

    await prisma.lead.create({
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        message: [
          `COD order for package: ${pkg.title}`,
          `Price: ${formatInr(pkg.priceInr)}`,
          `Order ID: ${order.id}`,
          `Payment: Cash on Delivery / Offline`,
        ].join("\n"),
        source: "package-checkout",
        status: "NEW",
      },
    });

    return NextResponse.json({
      order: {
        id: order.id,
        packageTitle: order.packageTitle,
        priceInr: order.priceInr,
        paymentMethod: order.paymentMethod,
        status: order.status,
      },
      redirectUrl: `/orders?placed=${order.id}`,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Unable to place COD order right now." },
      { status: 500 },
    );
  }
}
