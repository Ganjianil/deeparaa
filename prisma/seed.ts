import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import seedClients from "../data/clients.json";

const prisma = new PrismaClient();

function normalizeLogo(logo?: string) {
  const value = (logo || "").trim();
  if (!value) return "";
  if (value.startsWith("./")) return `/${value.slice(2)}`;
  if (!value.startsWith("/") && !value.startsWith("http")) return `/${value}`;
  return value;
}

const seedPackages = [
  {
    title: "Google Ads / PPC Ads",
    slug: "google-ads-ppc-ads",
    category: "Digital Marketing",
    description:
      "Reach the right audience, generate quality leads, and improve your advertising performance.",
    features: [
      "Google Ads campaign setup",
      "Keyword and audience research",
      "Ad copy creation",
      "Campaign optimization",
      "Performance reporting",
    ],
    priceInr: 14999,
    compareAt: 19999,
    featured: true,
    sortOrder: 1,
    serviceSlugs: ["digital-marketing", "youtube-ads"],
  },
  {
    title: "SEO Packages",
    slug: "seo-packages",
    category: "Digital Marketing",
    description:
      "Improve your website visibility and attract relevant organic traffic from search engines.",
    features: [
      "Website SEO audit",
      "Keyword research",
      "On-page SEO",
      "Technical SEO recommendations",
      "Monthly performance reporting",
    ],
    priceInr: 12999,
    compareAt: 16999,
    featured: false,
    sortOrder: 2,
    serviceSlugs: ["aeo", "youtube-seo", "digital-marketing", "sxo", "geo", "aio"],
  },
  {
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    category: "Digital Marketing",
    description:
      "Build your brand presence and connect with your audience across social media platforms.",
    features: [
      "Social media strategy",
      "Content planning",
      "Creative post guidance",
      "Audience engagement strategy",
      "Performance tracking",
    ],
    priceInr: 9999,
    compareAt: 12999,
    featured: false,
    sortOrder: 3,
    serviceSlugs: ["digital-marketing", "youtube-ads"],
  },
  {
    title: "Website Design",
    slug: "website-design",
    category: "Website",
    description:
      "Create a professional, responsive website that presents your business effectively.",
    features: [
      "Responsive website design",
      "Mobile-friendly layout",
      "Contact form integration",
      "Basic on-page SEO",
      "User-friendly navigation",
    ],
    priceInr: 24999,
    compareAt: 29999,
    featured: true,
    sortOrder: 4,
    serviceSlugs: ["web-design", "website-design"],
  },
  {
    title: "Ecommerce Website",
    slug: "ecommerce-website",
    category: "Website",
    description:
      "Build an online store designed to showcase products and support your sales process.",
    features: [
      "Product page design",
      "Shopping cart setup",
      "Responsive storefront",
      "Order flow integration",
      "Store management guidance",
    ],
    priceInr: 44999,
    compareAt: 54999,
    featured: false,
    sortOrder: 5,
    serviceSlugs: ["ecommerce-app", "web-design", "website-design"],
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    category: "App Development",
    description:
      "Plan and develop a mobile application tailored to your business requirements.",
    features: [
      "Project requirement planning",
      "App UI/UX design",
      "Development consultation",
      "Testing and quality checks",
      "Deployment guidance",
    ],
    priceInr: 79999,
    compareAt: 99999,
    featured: false,
    sortOrder: 6,
    serviceSlugs: ["mobile-app", "software-development"],
  },
  {
    title: "Complete Digital Growth",
    slug: "complete-digital-growth",
    category: "Special Packages",
    description:
      "Combine digital marketing services into a coordinated strategy for your business.",
    features: [
      "Digital strategy planning",
      "SEO recommendations",
      "Paid advertising strategy",
      "Content planning",
      "Performance reviews",
    ],
    priceInr: 59999,
    compareAt: 74999,
    featured: true,
    sortOrder: 7,
    serviceSlugs: [
      "digital-marketing",
      "aeo",
      "youtube-seo",
      "software-development",
    ],
  },
];

async function main() {
  const email = (
    process.env.ADMIN_EMAIL ?? "admin@deeparasolutions.com"
  ).toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "Admin@12345";
  const name = process.env.ADMIN_NAME ?? "Deepara Admin";
  const adminPhone =
    process.env.ADMIN_PHONE ?? process.env.NEXT_PUBLIC_ADMIN_WHATSAPP ?? "919985888237";

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      name,
      phone: adminPhone,
      passwordHash,
      role: "ADMIN",
    },
    create: {
      name,
      email,
      phone: adminPhone,
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`Admin ready: ${admin.email} (${admin.role})`);

  for (const pkg of seedPackages) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: {
        title: pkg.title,
        category: pkg.category,
        description: pkg.description,
        features: JSON.stringify(pkg.features),
        priceInr: pkg.priceInr,
        compareAt: pkg.compareAt,
        serviceSlugs: JSON.stringify(pkg.serviceSlugs),
        featured: pkg.featured,
        active: true,
        sortOrder: pkg.sortOrder,
      },
      create: {
        title: pkg.title,
        slug: pkg.slug,
        category: pkg.category,
        description: pkg.description,
        features: JSON.stringify(pkg.features),
        priceInr: pkg.priceInr,
        compareAt: pkg.compareAt,
        serviceSlugs: JSON.stringify(pkg.serviceSlugs),
        featured: pkg.featured,
        active: true,
        sortOrder: pkg.sortOrder,
      },
    });
  }

  console.log(`Packages seeded: ${seedPackages.length}`);

  for (const [index, client] of seedClients.entries()) {
    const existing = await prisma.client.findFirst({
      where: { name: client.name },
    });
    const data = {
      name: client.name,
      initials: client.initials,
      industry: client.industry,
      logo: normalizeLogo(client.logo),
      active: true,
      sortOrder: index + 1,
    };
    if (existing) {
      await prisma.client.update({ where: { id: existing.id }, data });
    } else {
      await prisma.client.create({ data });
    }
  }

  console.log(`Clients seeded: ${seedClients.length}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
