import clients from "@/data/clients.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    clients,
    source: "demo-json",
    message: "Simulated database connection via JSON data store",
    fetchedAt: new Date().toISOString(),
  });
}
