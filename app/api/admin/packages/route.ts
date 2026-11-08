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

const packageSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z.string().trim().max(80).optional().nullable(),
  category: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(2000),
  features: z.array(z.string().trim().min(1).max(200)).min(1).max(30),
  priceInr: z.number().int().min(0).max(10_000_000),
  compareAt: z.number().int().min(0).max(10_000_000).optional().nullable(),
  serviceSlugs: z.array(z.string().trim().min(1).max(80)).max(30).optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
  sortOrder: z.number().int().min(0).max(10_000).optional(),
});

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const packages = await prisma.package.findMany({
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });

  return NextResponse.json({
    packages: packages.map((pkg) => ({
      ...toPublicPackage(pkg),
      active: pkg.active,
      createdAt: pkg.createdAt,
      updatedAt: pkg.updatedAt,
    })),
  });
}

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const parsed = packageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid package details." },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const slug = slugify(data.slug || data.title);
    if (!slug) {
      return NextResponse.json({ error: "Invalid slug." }, { status: 400 });
    }

    const existing = await prisma.package.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "A package with this slug already exists." },
        { status: 409 },
      );
    }

    const created = await prisma.package.create({
      data: {
        title: data.title,
        slug,
        category: data.category,
        description: data.description,
        features: serializeFeatures(data.features),
        priceInr: data.priceInr,
        compareAt: data.compareAt ?? null,
        serviceSlugs: serializeServiceSlugs(data.serviceSlugs ?? []),
        featured: data.featured ?? false,
        active: data.active ?? true,
        sortOrder: data.sortOrder ?? 0,
      },
    });

    return NextResponse.json(
      {
        package: {
          ...toPublicPackage(created),
          active: created.active,
          createdAt: created.createdAt,
          updatedAt: created.updatedAt,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Create package error:", err);
    return NextResponse.json(
      { error: "Unable to create package." },
      { status: 500 },
    );
  }
}
