import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

const ORDER_STATUSES = ["NEW", "CONFIRMED", "COMPLETED", "CANCELLED"] as const;

const updateSchema = z.object({
  id: z.string().min(1),
  status: z.enum(ORDER_STATUSES),
});

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ orders });
}

export async function PATCH(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid order update." }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id: parsed.data.id },
      data: { status: parsed.data.status },
    });

    return NextResponse.json({ order });
  } catch (err) {
    console.error("Update order error:", err);
    return NextResponse.json({ error: "Unable to update order." }, { status: 500 });
  }
}
