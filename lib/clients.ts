export type PublicClient = {
  id: string;
  name: string;
  initials: string;
  industry: string;
  logo?: string;
  sortOrder: number;
};

export type ClientRecord = {
  id: string;
  name: string;
  initials: string;
  industry: string;
  logo: string;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export function initialsFromName(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "CL";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

export function normalizeLogoPath(logo?: string | null): string {
  const value = (logo || "").trim();
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("./")) return `/${value.slice(2)}`;
  if (!value.startsWith("/")) return `/${value}`;
  return value;
}

export function toPublicClient(client: ClientRecord): PublicClient {
  const logo = normalizeLogoPath(client.logo);
  return {
    id: client.id,
    name: client.name,
    initials: client.initials || initialsFromName(client.name),
    industry: client.industry,
    ...(logo ? { logo } : {}),
    sortOrder: client.sortOrder,
  };
}
