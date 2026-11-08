import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { ROLES } from "@/lib/roles";

const updateRoleSchema = z.object({
  id: z.string().min(1),
  role: z.enum(ROLES),
});

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ users });
}

export async function PATCH(request: Request) {
  const { session, error } = await requireAdmin();
  if (error || !session) return error;

  try {
    const body = await request.json();
    const parsed = updateRoleSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid role update." }, { status: 400 });
    }

    if (parsed.data.id === session.user.id && parsed.data.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You cannot demote your own admin account." },
        { status: 400 },
      );
    }

    const user = await prisma.user.update({
      where: { id: parsed.data.id },
      data: { role: parsed.data.role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user });
  } catch (err) {
    console.error("Update user role error:", err);
    return NextResponse.json({ error: "Unable to update user." }, { status: 500 });
  }
}
