import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import {
  initialsFromName,
  normalizeLogoPath,
  toPublicClient,
} from "@/lib/clients";

const clientSchema = z.object({
  name: z.string().trim().min(2).max(120),
  initials: z.string().trim().max(6).optional().nullable(),
  industry: z.string().trim().min(2).max(80),
  logo: z.string().trim().max(500).optional().nullable(),
  active: z.boolean().optional(),
  sortOrder: z.number().int().min(0).max(10_000).optional(),
});

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const clients = await prisma.client.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return NextResponse.json({
    clients: clients.map((client) => ({
      ...toPublicClient(client),
      logo: client.logo,
      active: client.active,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    })),
  });
}

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const parsed = clientSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid client details." },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const initials =
      (data.initials || "").trim() || initialsFromName(data.name);

    const created = await prisma.client.create({
      data: {
        name: data.name,
        initials: initials.slice(0, 6).toUpperCase(),
        industry: data.industry,
        logo: normalizeLogoPath(data.logo),
        active: data.active ?? true,
        sortOrder: data.sortOrder ?? 0,
      },
    });

    return NextResponse.json(
      {
        client: {
          ...toPublicClient(created),
          logo: created.logo,
          active: created.active,
          createdAt: created.createdAt,
          updatedAt: created.updatedAt,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Create client error:", err);
    return NextResponse.json(
      { error: "Unable to create client." },
      { status: 500 },
    );
  }
}
