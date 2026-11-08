import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import {
  serializeFeatures,
  serializeServiceSlugs,
  slugify,
  toPublicPackage,
} from "@/lib/packages";

const updateSchema = z.object({
  title: z.string().trim().min(2).max(120).optional(),
  slug: z.string().trim().max(80).optional().nullable(),
  category: z.string().trim().min(2).max(80).optional(),
  description: z.string().trim().min(10).max(2000).optional(),
  features: z
    .array(z.string().trim().min(1).max(200))
    .min(1)
    .max(30)
    .optional(),
  priceInr: z.number().int().min(0).max(10_000_000).optional(),
  compareAt: z.number().int().min(0).max(10_000_000).optional().nullable(),
  serviceSlugs: z.array(z.string().trim().min(1).max(80)).max(30).optional(),
  featured: z.boolean().optional(),
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
        { error: "Invalid package update." },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const existing = await prisma.package.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Package not found." }, { status: 404 });
    }

    let nextSlug = existing.slug;
    if (data.slug !== undefined && data.slug !== null && data.slug.trim()) {
      nextSlug = slugify(data.slug);
    } else if (data.title && !data.slug) {
      // keep existing slug unless explicitly provided
      nextSlug = existing.slug;
    }

    if (!nextSlug) {
      return NextResponse.json({ error: "Invalid slug." }, { status: 400 });
    }

    if (nextSlug !== existing.slug) {
      const clash = await prisma.package.findUnique({
        where: { slug: nextSlug },
      });
      if (clash) {
        return NextResponse.json(
          { error: "A package with this slug already exists." },
          { status: 409 },
        );
      }
    }

    const updated = await prisma.package.update({
      where: { id },
      data: {
        ...(data.title !== undefined ? { title: data.title } : {}),
        slug: nextSlug,
        ...(data.category !== undefined ? { category: data.category } : {}),
        ...(data.description !== undefined
          ? { description: data.description }
          : {}),
        ...(data.features !== undefined
          ? { features: serializeFeatures(data.features) }
          : {}),
        ...(data.priceInr !== undefined ? { priceInr: data.priceInr } : {}),
        ...(data.compareAt !== undefined ? { compareAt: data.compareAt } : {}),
        ...(data.serviceSlugs !== undefined
          ? { serviceSlugs: serializeServiceSlugs(data.serviceSlugs) }
          : {}),
        ...(data.featured !== undefined ? { featured: data.featured } : {}),
        ...(data.active !== undefined ? { active: data.active } : {}),
        ...(data.sortOrder !== undefined ? { sortOrder: data.sortOrder } : {}),
      },
    });

    return NextResponse.json({
      package: {
        ...toPublicPackage(updated),
        active: updated.active,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
      },
    });
  } catch (err) {
    console.error("Update package error:", err);
    return NextResponse.json(
      { error: "Unable to update package." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await context.params;

  try {
    await prisma.package.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Delete package error:", err);
    return NextResponse.json(
      { error: "Unable to delete package." },
      { status: 500 },
    );
  }
}
