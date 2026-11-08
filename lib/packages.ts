export type PackageRecord = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  features: string;
  priceInr: number;
  compareAt: number | null;
  serviceSlugs?: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type PublicPackage = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  features: string[];
  priceInr: number;
  compareAt: number | null;
  serviceSlugs: string[];
  featured: boolean;
  sortOrder: number;
};

export const SERVICE_SLUG_OPTIONS = [
  { value: "web-design", label: "Website Design (services)" },
  { value: "website-design", label: "Website Design page" },
  { value: "software-development", label: "Software Development" },
  { value: "mobile-app", label: "Mobile Apps" },
  { value: "ecommerce-app", label: "Ecommerce Apps" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "video-production", label: "Video Production" },
  { value: "aeo", label: "SEO / AEO" },
  { value: "geo", label: "GEO" },
  { value: "youtube-seo", label: "YouTube SEO" },
  { value: "youtube-ads", label: "YouTube Ads" },
  { value: "aio", label: "AIO" },
  { value: "sxo", label: "SXO" },
] as const;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function parseFeatures(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => String(item).trim()).filter(Boolean);
  } catch {
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }
}

export function serializeFeatures(features: string[]): string {
  return JSON.stringify(features.map((item) => item.trim()).filter(Boolean));
}

export function parseServiceSlugs(raw?: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => String(item).trim()).filter(Boolean);
  } catch {
    return raw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

export function serializeServiceSlugs(slugs: string[]): string {
  return JSON.stringify(
    Array.from(new Set(slugs.map((item) => item.trim()).filter(Boolean))),
  );
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function toPublicPackage(pkg: PackageRecord): PublicPackage {
  return {
    id: pkg.id,
    title: pkg.title,
    slug: pkg.slug,
    category: pkg.category,
    description: pkg.description,
    features: parseFeatures(pkg.features),
    priceInr: pkg.priceInr,
    compareAt: pkg.compareAt,
    serviceSlugs: parseServiceSlugs(pkg.serviceSlugs),
    featured: pkg.featured,
    sortOrder: pkg.sortOrder,
  };
}

export function packageMatchesService(
  pkg: Pick<PublicPackage, "serviceSlugs">,
  serviceSlug: string,
): boolean {
  return pkg.serviceSlugs.includes(serviceSlug);
}
