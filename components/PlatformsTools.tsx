"use client";

import { useState } from "react";
import {
  Palette,
  Megaphone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import * as SimpleIcons from "react-icons/si";
import { FaGoogle } from "react-icons/fa";
import type { ElementType } from "react";
import tools from "@/data/tools.json";

type BrandConfig = {
  icon: string;
  color: string;
};

const brandStyles: Record<string, BrandConfig> = {
  Canva: { icon: "SiCanva", color: "#00C4CC" },
  Photoshop: { icon: "SiAdobephotoshop", color: "#31A8FF" },
  "Adobe Premiere Pro": { icon: "SiAdobepremierepro", color: "#9999FF" },
  Figma: { icon: "SiFigma", color: "#F24E1E" },
  Illustrator: { icon: "SiAdobeillustrator", color: "#FF9A00" },
  InDesign: { icon: "SiAdobeindesign", color: "#FF3366" },
  Sketch: { icon: "SiSketch", color: "#F7B500" },
  "Affinity Designer": { icon: "SiAffinitydesigner", color: "#246BFD" },
  CorelDRAW: { icon: "SiCoreldraw", color: "#22A447" },
  "After Effects": { icon: "SiAdobeaftereffects", color: "#9999FF" },
  "Google Ads": { icon: "SiGoogleads", color: "#4285F4" },
  "Meta Ads": { icon: "SiMeta", color: "#0866FF" },
  "LinkedIn Ads": { icon: "SiLinkedin", color: "#0A66C2" },
  "Twitter/X Ads": { icon: "SiX", color: "#111827" },
  "Jio Ads": { icon: "SiJio", color: "#1759D1" },
  "Adobe Ads": { icon: "SiAdobe", color: "#FF0000" },
  "YouTube Ads": { icon: "SiYoutube", color: "#FF0033" },
  "GMAP Ads": { icon: "SiGooglemaps", color: "#34A853" },
  "Google Merchant Ads": { icon: "SiGoogle", color: "#4285F4" },
  "Google Analytics": { icon: "SiGoogleanalytics", color: "#E69500" },
  "Google Search Console": { icon: "SiGooglesearchconsole", color: "#4285F4" },
  "Bing Webmaster": { icon: "SiBing", color: "#008373" },
  "SE Ranking": { icon: "SiSeranking", color: "#147DFF" },
  Hootsuite: { icon: "SiHootsuite", color: "#F04B4B" },
  "Meta Certification": { icon: "SiMeta", color: "#0866FF" },
  "Google Certification": { icon: "SiGoogle", color: "#4285F4" },
  "Microsoft Certification": { icon: "SiMicrosoft", color: "#00A4EF" },
  "Google Ecommerce Certification": { icon: "SiGoogle", color: "#4285F4" },
  "HubSpot Certification": { icon: "SiHubspot", color: "#F15A24" },
};

type Category = {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
  icon: LucideIcon;
  accent: string;
};

const categories: Category[] = [
  {
    id: "design",
    title: "Designing tools",
    subtitle: "Creative systems we craft with",
    items: tools.designingTools,
    icon: Palette,
    accent: "#8B5CF6",
  },
  {
    id: "marketing",
    title: "Paid marketing tools",
    subtitle: "Channels that drive measurable growth",
    items: tools.paidMarketingTools,
    icon: Megaphone,
    accent: "#2563EB",
  },
  {
    id: "certs",
    title: "Certifications",
    subtitle: "Proof of platform mastery",
    items: tools.certifications,
    icon: ShieldCheck,
    accent: "#DB2777",
  },
];

function BrandIcon({ name }: { name: string }) {
  const brand = brandStyles[name];

  if (!brand) {
    return (
      <span className="premium-tool__fallback" aria-hidden="true">
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  const Icon = (SimpleIcons as unknown as Record<string, ElementType>)[
    brand.icon
  ];
  const BrandComponent = Icon || FaGoogle;

  return (
    <span className="premium-tool__glyph" title={name}>
      <BrandComponent size={22} color={brand.color} aria-hidden="true" />
    </span>
  );
}

export function PlatformsTools() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const active =
    categories.find((category) => category.id === activeId) ?? categories[0];
  const ActiveIcon = active.icon;

  return (
    <section
      className="premium-tools kota-band slide-panel relative z-10"
      style={{ ["--slide-z" as string]: 7 }}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kota-kicker">Platforms &amp; tools</p>
          <h2 className="kota-display mt-3">
            Built with industry-leading stacks
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
            Design systems, ad platforms, and certifications — curated so every
            project feels polished, scalable, and ready for growth.
          </p>
        </div>

        {/* Category switcher */}
        <div
          className="premium-tools__tabs"
          role="tablist"
          aria-label="Tool categories"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = category.id === activeId;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`premium-tools__tab${isActive ? " is-active" : ""}`}
                style={
                  isActive
                    ? ({ ["--tab-accent" as string]: category.accent } as React.CSSProperties)
                    : undefined
                }
                onClick={() => setActiveId(category.id)}
              >
                <span className="premium-tools__tab-icon">
                  <Icon className="h-4 w-4" strokeWidth={1.85} />
                </span>
                <span className="premium-tools__tab-copy">
                  <span className="premium-tools__tab-title">
                    {category.title}
                  </span>
                  <span className="premium-tools__tab-sub">
                    {category.subtitle}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Featured stage */}
        <div
          className="premium-tools__stage"
          style={{ ["--tab-accent" as string]: active.accent }}
        >
          <div className="premium-tools__stage-head">
            <div
              className="premium-tools__stage-badge"
              style={{ color: active.accent }}
            >
              <ActiveIcon className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="premium-tools__stage-title">{active.title}</h3>
              <p className="premium-tools__stage-sub">{active.subtitle}</p>
            </div>
            <p className="premium-tools__count">
              {String(active.items.length).padStart(2, "0")} tools
            </p>
          </div>

          <div className="premium-tools__grid">
            {active.items.map((name) => (
              <div key={name} className="premium-tool">
                <BrandIcon name={name} />
                <span className="premium-tool__name">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop overview strip */}
        <div className="premium-tools__overview">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={`overview-${category.id}`}
                type="button"
                className={`premium-tools__overview-card${
                  category.id === activeId ? " is-active" : ""
                }`}
                onClick={() => setActiveId(category.id)}
              >
                <span
                  className="premium-tools__overview-icon"
                  style={{ color: category.accent }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span className="premium-tools__overview-title">
                  {category.title}
                </span>
                <span className="premium-tools__overview-count">
                  {category.items.length} platforms
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
