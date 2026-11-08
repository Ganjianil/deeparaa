"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Monitor, Code2, TrendingUp } from "lucide-react";
import { SlideSheet } from "@/components/SlideSheet";
import { services } from "@/components/Services";

const focusAreas = [
  {
    title: "Websites & brand",
    blurb: "Sites that look sharp, load fast, and turn visits into enquiries.",
    href: "/services/web-design",
    icon: Monitor,
  },
  {
    title: "Apps & software",
    blurb: "Custom products, mobile apps, and ecommerce built for real workflows.",
    href: "/services/software-development",
    icon: Code2,
  },
  {
    title: "Growth marketing",
    blurb: "SEO, AI search, paid media, and content with clear targets.",
    href: "/services/digital-marketing",
    icon: TrendingUp,
  },
];

const servicePanels = [
  {
    id: "brand-web",
    title: "Website & brand experiences",
    description:
      "When your site feels dated, unclear, or hard to use, we rebuild the digital front door with layouts that look sharp and convert. Every page is planned around your offer, audience, and next step.",
    href: "/services/web-design",
    accent: "mint",
    image: "/website.jpg",
    imageAlt: "Website and brand design work",
    highlights: [
      "Conversion-focused homepage and service pages",
      "Mobile-first layouts that stay fast and clear",
      "Brand-aligned visuals, forms, and CTAs",
      "Basic SEO structure ready for growth",
    ],
    deliverables:
      "Wireframes, UI design, responsive build, contact flows, and a launch checklist your team can own.",
    tags: [
      { label: "Website design", href: "/services/web-design" },
      { label: "Ecommerce", href: "/services/ecommerce-app" },
      { label: "Video production", href: "/services/video-production" },
    ],
  },
  {
    id: "build",
    title: "Web apps & software",
    description:
      "We design and build products that solve real workflows—customer apps, admin tools, and storefronts that stay reliable as you scale. Clear requirements, iterative delivery, and measurable outcomes.",
    href: "/services/software-development",
    accent: "cream",
    image: "/web.jpg",
    imageAlt: "Web apps and software development",
    highlights: [
      "Custom software mapped to your business process",
      "Native-feel mobile apps for iOS and Android",
      "Ecommerce apps with cart, catalog, and checkout",
      "Integrations for payments, CRM, and ops tools",
    ],
    deliverables:
      "Product scope, UX flows, development sprints, QA, deployment support, and handoff documentation.",
    tags: [
      { label: "Software development", href: "/services/software-development" },
      { label: "Mobile apps", href: "/services/mobile-app" },
      { label: "Ecommerce apps", href: "/services/ecommerce-app" },
    ],
  },
  {
    id: "growth",
    title: "Growth marketing",
    description:
      "Get found by the right people and turn attention into leads. We combine SEO, AI search readiness, paid media, and content so every channel has a job—and a number to hit.",
    href: "/services/digital-marketing",
    accent: "lilac",
    image: "/seo.jpg",
    imageAlt: "Growth marketing and SEO campaigns",
    highlights: [
      "SEO / AEO foundations and content plans",
      "GEO and AI-search visibility improvements",
      "Paid campaigns with clear targeting and reporting",
      "YouTube, SXO, and ongoing optimization support",
    ],
    deliverables:
      "Audit, channel strategy, campaign setup, creative guidance, and monthly performance reviews.",
    tags: [
      { label: "Digital marketing", href: "/services/digital-marketing" },
      { label: "SEO", href: "/services/aeo" },
      { label: "GEO", href: "/services/geo" },
      { label: "YouTube ads", href: "/services/youtube-ads" },
      { label: "AIO", href: "/services/aio" },
      { label: "SXO", href: "/services/sxo" },
    ],
  },
];

export function ServicesGrid() {
  return (
    <section id="services" className="kota-band relative z-10">
      <div
        className="slide-panel slide-panel--intro"
        style={{ ["--slide-z" as string]: 1 }}
      >
        <SlideSheet className="slide-panel__sheet--intro">
          <div className="services-intro mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14 lg:px-8">
            <div className="services-intro__head">
              <p className="kota-kicker">Our services</p>
              <h2 className="kota-display mt-3">
                Everything you need to win online
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
                From first impression to long-term growth, we cover websites,
                products, and marketing under one team. Start with a focus area,
                open any service, or jump straight to packaged offers.
              </p>
            </div>

            <div className="services-intro__focus">
              {focusAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <Link
                    key={area.href}
                    href={area.href}
                    className="services-intro__focus-link"
                    prefetch
                  >
                    <span className="services-intro__focus-icon" aria-hidden>
                      <Icon size={18} strokeWidth={2} />
                    </span>
                    <span className="services-intro__focus-copy">
                      <span className="services-intro__focus-title">
                        {area.title}
                      </span>
                      <span className="services-intro__focus-blurb">
                        {area.blurb}
                      </span>
                    </span>
                    <ArrowRight
                      className="services-intro__focus-arrow"
                      size={16}
                      aria-hidden
                    />
                  </Link>
                );
              })}
            </div>

            <div className="services-intro__directory">
              <p className="services-intro__directory-label">All services</p>
              <ul className="services-intro__directory-list">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link href={service.href} prefetch>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="services-intro__cta">
              <Link href="/packages" className="btn-accent" prefetch>
                View packages
              </Link>
              <p>
                Prefer a ready offer? Browse priced packages with COD checkout.
              </p>
            </div>
          </div>
        </SlideSheet>
      </div>

      <div className="kota-panels slide-stack">
        {servicePanels.map((panel, index) => (
          <article
            key={panel.id}
            className={`kota-panel kota-panel--${panel.accent} slide-panel`}
            style={{ ["--slide-z" as string]: index + 2 }}
          >
            <SlideSheet>
              <div className="kota-panel__content">
                <h3 className="kota-panel__title">{panel.title}</h3>

                <div className="kota-panel__tags">
                  {panel.tags.map((tag) => (
                    <Link
                      key={tag.href + tag.label}
                      href={tag.href}
                      className="kota-tag"
                      prefetch
                    >
                      {tag.label}
                    </Link>
                  ))}
                </div>

                <p className="kota-panel__text">{panel.description}</p>

                <ul className="kota-panel__list">
                  {panel.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p className="kota-panel__deliverables">
                  <strong>What you receive:</strong> {panel.deliverables}
                </p>

                <Link href={panel.href} className="kota-more" prefetch>
                  <span>Open full service page</span>
                </Link>
              </div>

              <div className="kota-panel__visual">
                <Image
                  src={panel.image}
                  alt={panel.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="kota-panel__image"
                />
              </div>
            </SlideSheet>
          </article>
        ))}
      </div>
    </section>
  );
}
