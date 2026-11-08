import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toPublicClient } from "@/lib/clients";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({
      clients: clients.map(toPublicClient),
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Public clients error:", err);
    return NextResponse.json(
      { error: "Unable to load clients.", clients: [] },
      { status: 500 },
    );
  }
}
