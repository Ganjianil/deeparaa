"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  X,
  Search,
  MessageCircle,
  LockKeyhole,
} from "lucide-react";

type PackageItem = {
  title: string;
  category: string;
  description: string;
  features: string[];
  slug: string;
};

const packages: PackageItem[] = [
  {
    title: "Google Ads / PPC Ads",
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
    slug: "google-ads-ppc-ads",
  },
  {
    title: "SEO Packages",
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
    slug: "seo-packages",
  },
  {
    title: "Social Media Marketing",
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
    slug: "social-media-marketing",
  },
  {
    title: "Website Design",
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
    slug: "website-design",
  },
  {
    title: "Ecommerce Website",
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
    slug: "ecommerce-website",
  },
  {
    title: "Mobile App Development",
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
    slug: "mobile-app-development",
  },
  {
    title: "Complete Digital Growth",
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
    slug: "complete-digital-growth",
  },
];

const categories = [
  "All Packages",
  "Digital Marketing",
  "Website",
  "App Development",
  "Special Packages",
];

const WHATSAPP_NUMBER = "919985888237";

export default function PackagesPage() {
  const [activeCategory, setActiveCategory] = useState("All Packages");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(
    null,
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const [formError, setFormError] = useState("");

  const filteredPackages = packages.filter((item) => {
    const matchesCategory =
      activeCategory === "All Packages" || item.category === activeCategory;

    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      item.title.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  function openUnlockForm(item: PackageItem) {
    setSelectedPackage(item);
    setFormError("");
  }

  function closeUnlockForm() {
    setSelectedPackage(null);
    setFormError("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedPackage) return;

    const cleanedPhone = phone.replace(/[\s()+-]/g, "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10,15}$/.test(cleanedPhone)) {
      setFormError(
        "Please enter a valid phone number with country code if needed.",
      );
      return;
    }

    const message = [
      "Hello Deepara Solutions!",
      "",
      "I would like to know more about your package.",
      "",
      `Selected Package: ${selectedPackage.title}`,
      `Full Name: ${fullName.trim()}`,
      `Email Address: ${email.trim()}`,
      `Phone Number: ${phone.trim()}`,
      `Company Name: ${company.trim() || "Not provided"}`,
      "",
      "Please share the package details, pricing, and next steps.",
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    closeUnlockForm();
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--surface-sunken)", color: "var(--text-heading)" }}
    >
      {/* Hero */}
      <section
        className="relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:py-28"
        style={{
          background:
            "linear-gradient(145deg, var(--brand-900), var(--brand-700))",
        }}
      >
        <div
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--brand-400)" }}
        />
        <div
          className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--brand-500)" }}
        />

        <div className="relative mx-auto max-w-6xl text-center">
          <span
            className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/85"
            style={{ borderRadius: "var(--radius-control)" }}
          >
            <CheckCircle2 className="h-4 w-4" />
            Digital Solutions for Growing Businesses
          </span>

          <h1
            className="mx-auto mt-6 max-w-4xl font-serif text-4xl tracking-tight sm:text-5xl lg:text-6xl"
            style={{ fontWeight: 400 }}
          >
            Find the Right Package for Your Business
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
            Explore our digital marketing, website development, and app
            development services. Unlock package details and contact our team
            directly on WhatsApp.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#packages"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-950 transition hover:bg-sky-100"
            >
              Explore Packages
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hello Deepara Solutions! I would like to know more about your service packages.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              <MessageCircle className="h-5 w-5" />
              Talk to Our Team
            </a>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-700">
              Our Services
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Explore Our Packages
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Choose a service to learn more about the available features and
              pricing options.
            </p>
          </div>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-xl">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-100">
              <Search className="h-5 w-5 shrink-0 text-slate-400" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search packages..."
                aria-label="Search packages"
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-sky-700 text-white shadow-md shadow-sky-700/20"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Package cards */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPackages.map((item) => (
              <article
                key={item.slug}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-900/5"
              >
                <div className="h-2 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600" />

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <span className="w-fit rounded-full bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-800">
                    {item.category}
                  </span>

                  <h3 className="mt-5 text-xl font-bold tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <p className="text-sm font-semibold text-slate-800">
                      What&apos;s included
                    </p>

                    <ul className="mt-4 space-y-3">
                      {item.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-slate-600"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-7">
                    <button
                      type="button"
                      onClick={() => openUnlockForm(item)}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white transition hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-200"
                    >
                      <LockKeyhole className="h-4 w-4" />
                      Unlock Details
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <Search className="mx-auto h-8 w-8 text-slate-400" />
              <h3 className="mt-4 text-lg font-semibold">No packages found</h3>
              <p className="mt-2 text-sm text-slate-500">
                Try a different search term or category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All Packages");
                }}
                className="mt-5 font-semibold text-sky-700 hover:text-sky-900"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact banner */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-slate-900 p-8 text-white sm:p-10 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Need help choosing a package?
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">
              Tell us about your business goals. Our team can help you explore
              suitable service options.
            </p>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hello Deepara Solutions! Please help me choose the right package for my business.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
          >
            <MessageCircle className="h-5 w-5" />
            Contact on WhatsApp
          </a>
        </div>
      </section>

      {/* Unlock details modal */}
      {selectedPackage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeUnlockForm();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="unlock-title"
            className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-sky-800 px-6 py-7 text-white sm:px-8">
              <button
                type="button"
                onClick={closeUnlockForm}
                aria-label="Close form"
                className="absolute right-4 top-4 rounded-full p-2 text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <LockKeyhole className="h-6 w-6" />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-sky-200">
                Package Access
              </p>

              <h2
                id="unlock-title"
                className="mt-2 pr-5 text-2xl font-bold sm:text-3xl"
              >
                Unlock {selectedPackage.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-blue-100">
                Enter your details to request our comprehensive checklists and
                pricing models.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6 sm:p-8">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  minLength={10}
                  maxLength={20}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Company Name{" "}
                  <span className="font-normal text-slate-400">(Optional)</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  maxLength={150}
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  placeholder="Your company name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              {formError && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {formError}
                </p>
              )}

              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"
              >
                <MessageCircle className="h-5 w-5" />
                Unlock Full Packages
                <ArrowRight className="h-5 w-5" />
              </button>

              <p className="text-center text-xs leading-5 text-slate-500">
                Submitting opens WhatsApp with your details and selected
                package. You can review the message before sending it.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
