"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  MessageCircle,
  CheckCircle2,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact us" },
];

const serviceLinks = [
  { href: "/services/web-design", label: "Website Design" },
  { href: "/services/digital-marketing", label: "Digital Marketing" },
  { href: "/services/mobile-app", label: "Mobile Application" },
  { href: "/services/ecommerce-app", label: "Ecommerce Application" },
  { href: "/services/video-production", label: "Video Production" },
  { href: "/services/software-development", label: "Software Development" },
  { href: "/services/aeo", label: "SEO" },
  { href: "/services/geo", label: "GEO (Google Engine)" },
  { href: "/services/youtube-seo", label: "YouTube SEO" },
  { href: "/services/youtube-ads", label: "YouTube Ads" },
  { href: "/services/aio", label: "AIO (AI Optimization)" },
  { href: "/services/sxo", label: "SXO (Search Experience)" },
];

const WHATSAPP_NUMBER = "919985888237";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || auditOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, auditOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileServicesOpen(false);
        setMobileOpen(false);
        setAuditOpen(false);
        setFormError("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  const openAuditForm = () => {
    closeMobileMenu();
    setServicesOpen(false);
    setFormError("");
    setAuditOpen(true);
  };

  const closeAuditForm = () => {
    setAuditOpen(false);
    setFormError("");
  };

  const handleAuditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanedPhone = phone.replace(/[\s()+-]/g, "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10,15}$/.test(cleanedPhone)) {
      setFormError(
        "Please enter a valid phone number with country code if needed.",
      );
      return;
    }

    let websiteUrl = website.trim();
    if (websiteUrl) {
      if (!/^https?:\/\//i.test(websiteUrl)) {
        websiteUrl = `https://${websiteUrl}`;
      }
      try {
        const parsedUrl = new URL(websiteUrl);
        if (
          !["http:", "https:"].includes(parsedUrl.protocol) ||
          !parsedUrl.hostname.includes(".")
        ) {
          throw new Error("Invalid website URL");
        }
      } catch {
        setFormError("Please enter a valid website URL.");
        return;
      }
    }

    const message = [
      "Hello Deepara Solutions!",
      "",
      "I would like to request a Free Website Audit.",
      "",
      `Full Name: ${fullName.trim()}`,
      `Email Address: ${email.trim()}`,
      `Phone Number: ${phone.trim()}`,
      `Company Name: ${company.trim() || "Not provided"}`,
      `Website URL: ${websiteUrl || "Not provided"}`,
      "",
      "Please run a detailed search and performance audit for my brand.",
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    closeAuditForm();
  };

  const inputClass =
    "w-full rounded-[var(--radius-control)] border px-4 py-3 text-sm outline-none transition";
  const inputStyle = {
    borderColor: "var(--border-strong)",
    background: "var(--surface)",
    color: "var(--text-heading)",
  } as const;

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-300"
        style={{
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          background: scrolled ? "var(--chrome-veil)" : "var(--chrome-veil)",
          backdropFilter: "blur(12px)",
          boxShadow: scrolled ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div
          className="mx-auto flex max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-10"
          style={{ height: "var(--topbar-height)" }}
        >
          <Link
            href="/"
            aria-label="Deepara Solutions home"
            className="inline-flex items-center gap-2"
          >
            <Image
              src="/deep.png"
              alt="Deepara Solutions"
              width={180}
              height={54}
              priority
              className="h-auto w-[120px] object-contain sm:w-[150px]"
            />
          </Link>

          <nav
            className="ml-auto hidden items-center gap-6 lg:flex xl:gap-8"
            aria-label="Main navigation"
          >
            <Link href="/#home" className="nav-link">
              Home
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>

            <div className="relative">
              <button
                type="button"
                className={`nav-link flex items-center gap-1.5 ${
                  servicesOpen ? "text-[var(--accent)]" : ""
                }`}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((open) => !open)}
              >
                Services
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  <path d="M5.25 7.5 10 12.25 14.75 7.5H5.25Z" />
                </svg>
              </button>

              {servicesOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close services dropdown"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setServicesOpen(false)}
                  />
                  <div className="absolute left-1/2 top-full z-50 w-[min(900px,90vw)] -translate-x-1/2 pt-4">
                    <div
                      className="grid grid-cols-2 gap-1 p-3 sm:grid-cols-3 lg:grid-cols-6"
                      style={{
                        borderRadius: "var(--radius-panel)",
                        border: "1px solid var(--border)",
                        background: "var(--surface-raised)",
                        boxShadow: "0 1rem 2rem rgba(0,0,0,0.1)",
                      }}
                    >
                      {serviceLinks.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          onClick={() => setServicesOpen(false)}
                          className="flex min-h-[52px] items-center rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium transition"
                          style={{ color: "var(--text-body)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "var(--accent-soft)";
                            e.currentTarget.style.color = "var(--accent)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "var(--text-body)";
                          }}
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <Link href="/careers" className="nav-link">
              Careers
            </Link>
            <Link href="/blog" className="nav-link">
              Blog
            </Link>
            <Link href="/#contact" className="nav-link whitespace-nowrap">
              Contact us
            </Link>
          </nav>

          <div className="ml-3 hidden shrink-0 items-center gap-2 lg:flex xl:ml-6">
            <button
              type="button"
              className="curtain__toggle"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>
            <button type="button" onClick={openAuditForm} className="btn-accent">
              Get Free Audit
            </button>
            <Link href="/packages" className="btn-ghost">
              Choose Package
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <button
              type="button"
              className="curtain__toggle"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)]"
              style={{ color: "var(--accent)" }}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            mobileOpen ? "max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            borderTop: mobileOpen ? "1px solid var(--border)" : "none",
            background: "var(--surface)",
          }}
        >
          <nav
            className="max-h-[calc(100vh-4rem)] overflow-y-auto px-5 py-4"
            aria-label="Mobile navigation"
          >
            <Link href="/#home" className="mobile-link" onClick={closeMobileMenu}>
              Home
            </Link>
            <Link href="/about" className="mobile-link" onClick={closeMobileMenu}>
              About
            </Link>
            <button
              type="button"
              className="mobile-link flex w-full items-center justify-between"
              onClick={() => setMobileServicesOpen((open) => !open)}
              aria-expanded={mobileServicesOpen}
            >
              Services
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`h-4 w-4 transition-transform ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
              >
                <path d="M5.25 7.5 10 12.25 14.75 7.5H5.25Z" />
              </svg>
            </button>
            {mobileServicesOpen && (
              <div
                className="mb-3 ml-3 pl-3"
                style={{ borderLeft: "2px solid var(--border)" }}
              >
                {serviceLinks.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="block rounded-[var(--radius-control)] px-3 py-3 text-sm font-medium"
                    style={{ color: "var(--text-muted)" }}
                    onClick={closeMobileMenu}
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            )}
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-link"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={openAuditForm} className="btn-accent">
                Get Free Audit
              </button>
              <Link
                href="/packages"
                className="btn-ghost"
                onClick={closeMobileMenu}
              >
                Choose Package
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {auditOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeAuditForm();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="audit-title"
            className="relative my-auto w-full max-w-lg overflow-hidden shadow-2xl"
            style={{
              borderRadius: "var(--radius-panel)",
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="relative px-6 py-7 sm:px-8"
              style={{
                background:
                  "linear-gradient(145deg, var(--brand-900), var(--brand-600))",
                color: "#fff",
              }}
            >
              <button
                type="button"
                onClick={closeAuditForm}
                aria-label="Close audit form"
                className="absolute right-4 top-4 rounded-[var(--radius-control)] p-2 text-white/80 transition hover:bg-white/15"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-control)] border border-white/20 bg-white/10">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Complimentary Website Review
              </p>
              <h2
                id="audit-title"
                className="mt-2 pr-5 font-serif text-2xl sm:text-3xl"
                style={{ color: "#fff", fontWeight: 400 }}
              >
                Get a Free Website Audit
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/80">
                Fill in your details below and our team will run a detailed
                search and performance audit for your brand.
              </p>
            </div>

            <form onSubmit={handleAuditSubmit} className="space-y-4 p-6 sm:p-8">
              {(
                [
                  ["audit-full-name", "Full Name", fullName, setFullName, "text", true],
                  ["audit-email", "Email Address", email, setEmail, "email", true],
                  ["audit-phone", "Phone Number", phone, setPhone, "tel", true],
                  ["audit-company", "Company Name", company, setCompany, "text", false],
                  ["audit-website", "Website URL", website, setWebsite, "text", false],
                ] as const
              ).map(([id, label, value, setter, type, required]) => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="mb-2 block text-sm font-semibold"
                    style={{ color: "var(--text-heading)" }}
                  >
                    {label}{" "}
                    {required ? (
                      <span className="text-red-500">*</span>
                    ) : (
                      <span
                        className="font-normal"
                        style={{ color: "var(--text-faint)" }}
                      >
                        (Optional)
                      </span>
                    )}
                  </label>
                  <input
                    id={id}
                    type={type}
                    required={required}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              ))}

              {formError && (
                <p
                  role="alert"
                  className="rounded-[var(--radius-control)] px-4 py-3 text-sm text-red-700"
                  style={{ background: "rgba(179,38,30,0.08)" }}
                >
                  {formError}
                </p>
              )}

              <button type="submit" className="btn-accent w-full gap-2">
                <MessageCircle className="h-5 w-5" />
                Get Free Audit
                <ArrowUpRight className="h-5 w-5" />
              </button>
              <p
                className="text-center text-xs leading-5"
                style={{ color: "var(--text-faint)" }}
              >
                WhatsApp will open with your audit request. Review the message
                and press Send to contact our team.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
