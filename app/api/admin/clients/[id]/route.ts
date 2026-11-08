import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import {
  initialsFromName,
  normalizeLogoPath,
  toPublicClient,
} from "@/lib/clients";

const updateSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  initials: z.string().trim().max(6).optional().nullable(),
  industry: z.string().trim().min(2).max(80).optional(),
  logo: z.string().trim().max(500).optional().nullable(),
  active: z.boolean().optional(),
  sortOrder: z.number().int().min(0).max(10_000).optional(),
});

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await context.params;

  try {
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid client update." },
        { status: 400 },
      );
    }

    const existing = await prisma.client.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Client not found." }, { status: 404 });
    }

    const data = parsed.data;
    const nextName = data.name ?? existing.name;
    let nextInitials = existing.initials;
    if (data.initials !== undefined) {
      nextInitials =
        (data.initials || "").trim() || initialsFromName(nextName);
    } else if (data.name) {
      nextInitials = existing.initials || initialsFromName(nextName);
    }

    const updated = await prisma.client.update({
      where: { id },
      data: {
        ...(data.name !== undefined ? { name: data.name } : {}),
        initials: nextInitials.slice(0, 6).toUpperCase(),
        ...(data.industry !== undefined ? { industry: data.industry } : {}),
        ...(data.logo !== undefined
          ? { logo: normalizeLogoPath(data.logo) }
          : {}),
        ...(data.active !== undefined ? { active: data.active } : {}),
        ...(data.sortOrder !== undefined ? { sortOrder: data.sortOrder } : {}),
      },
    });

    return NextResponse.json({
      client: {
        ...toPublicClient(updated),
        logo: updated.logo,
        active: updated.active,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
      },
    });
  } catch (err) {
    console.error("Update client error:", err);
    return NextResponse.json(
      { error: "Unable to update client." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await context.params;

  try {
    await prisma.client.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Delete client error:", err);
    return NextResponse.json(
      { error: "Unable to delete client." },
      { status: 500 },
    );
  }
}
