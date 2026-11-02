"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const servicePanels = [
  {
    id: "brand-web",
    title: "Website & brand experiences",
    description:
      "When your site feels dated, unclear, or hard to use, we rebuild the digital front door with layouts that look sharp and convert.",
    href: "/services/web-design",
    accent: "mint",
    image: "/website.jpg",
    imageAlt: "Website and brand design work",
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
      "Crafting digital products where craft meets ROI—apps, platforms, and tools that turn heads and unlock revenue with every click.",
    href: "/services/software-development",
    accent: "cream",
    image: "/web.jpg",
    imageAlt: "Web apps and software development",
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
      "SEO, AI search, ads, content, and ongoing support. Get seen and make it count with work that moves, connects, and performs.",
    href: "/services/digital-marketing",
    accent: "lilac",
    image: "/seo.jpg",
    imageAlt: "Growth marketing and SEO campaigns",
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
      <div className="slide-panel slide-panel--intro" style={{ ["--slide-z" as string]: 1 }}>
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="kota-kicker">Our services</p>
            <h2 className="kota-display mt-3">
              Everything you need to win online
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
              From first impression to long-term growth, we cover the full digital
              lifecycle with specialised teams and a clear strategy.
            </p>
          </div>
        </div>
      </div>

      <div className="kota-panels slide-stack">
        {servicePanels.map((panel, index) => (
          <article
            key={panel.id}
            className={`kota-panel kota-panel--${panel.accent} slide-panel`}
            style={{
              ["--slide-z" as string]: index + 2,
              animationDelay: `${index * 90}ms`,
            }}
          >
            <div className="kota-panel__content">
              <h3 className="kota-panel__title">{panel.title}</h3>

              <div className="kota-panel__tags">
                {panel.tags.map((tag) => (
                  <Link
                    key={tag.href + tag.label}
                    href={tag.href}
                    className="kota-tag"
                  >
                    {tag.label}
                  </Link>
                ))}
              </div>

              <p className="kota-panel__text">{panel.description}</p>

              <Link href={panel.href} className="kota-more">
                <span>Find out more</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
          </article>
        ))}
      </div>
    </section>
  );
}
