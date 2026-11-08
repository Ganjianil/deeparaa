import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

function isUsableClient(client: PrismaClient | undefined): client is PrismaClient {
  if (!client) return false;
  const models = client as { package?: unknown; client?: unknown };
  return (
    typeof models.package !== "undefined" &&
    typeof models.client !== "undefined"
  );
}

export const prisma = isUsableClient(globalForPrisma.prisma)
  ? globalForPrisma.prisma
  : createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
