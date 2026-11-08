import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { LEAD_STATUSES } from "@/lib/roles";

const createLeadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().nullable(),
  message: z.string().trim().max(4000).optional().nullable(),
  source: z.string().trim().max(80).optional(),
});

const updateLeadSchema = z.object({
  id: z.string().min(1),
  status: z.enum(LEAD_STATUSES),
});

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ leads });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createLeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid lead payload." }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        phone: parsed.data.phone || null,
        message: parsed.data.message || null,
        source: parsed.data.source || "contact",
        status: "NEW",
      },
    });

    return NextResponse.json({ lead }, { status: 201 });
  } catch (err) {
    console.error("Create lead error:", err);
    return NextResponse.json({ error: "Unable to save lead." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const parsed = updateLeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid update." }, { status: 400 });
    }

    const lead = await prisma.lead.update({
      where: { id: parsed.data.id },
      data: { status: parsed.data.status },
    });

    return NextResponse.json({ lead });
  } catch (err) {
    console.error("Update lead error:", err);
    return NextResponse.json({ error: "Unable to update lead." }, { status: 500 });
  }
}
