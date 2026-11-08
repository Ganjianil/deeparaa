import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  packageMatchesService,
  toPublicPackage,
} from "@/lib/packages";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const service = searchParams.get("service")?.trim() || "";

  const packages = await prisma.package.findMany({
    where: { active: true },
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });

  const mapped = packages.map(toPublicPackage);
  const filtered = service
    ? mapped.filter((pkg) => packageMatchesService(pkg, service))
    : mapped;

  return NextResponse.json({ packages: filtered });
}
