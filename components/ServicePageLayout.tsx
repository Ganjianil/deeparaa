import Link from "next/link";
import { FAQ } from "./FAQ";
import { ServicePackages } from "@/components/ServicePackages";

type Feature = {
  title: string;
  description: string;
};

type ServicePageLayoutProps = {
  title: string;
  tagline: string;
  heroDescription: string;
  features: Feature[];
  faqIds: string[];
  /** Slug used to pull admin-managed packages for this page */
  serviceSlug: string;
};

export function ServicePageLayout({
  title,
  tagline,
  heroDescription,
  features,
  faqIds,
  serviceSlug,
}: ServicePageLayoutProps) {
  return (
    <div
      style={{
        background:
          "radial-gradient(ellipse 80% 45% at 50% -8%, var(--accent-wash), transparent 55%), var(--page)",
      }}
    >
      <section className="relative overflow-hidden px-5 pb-14 pt-16 sm:px-8 md:pb-20 md:pt-24">
        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/#services"
            className="mb-6 inline-flex items-center text-sm transition hover:opacity-80"
            style={{ color: "var(--text-muted)" }}
          >
            ← Back to services
          </Link>
          <p
            className="text-xs font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--accent)" }}
          >
            Service
          </p>
          <h1
            className="mt-3 max-w-3xl font-serif text-4xl tracking-tight md:text-5xl lg:text-6xl"
            style={{ color: "var(--text-heading)", fontWeight: 400 }}
          >
            {title}
          </h1>
          <p
            className="mt-4 max-w-2xl text-xl"
            style={{ color: "var(--accent)" }}
          >
            {tagline}
          </p>
          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {heroDescription}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/#contact" className="btn-accent">
              Request a consultation
            </Link>
            <Link href="/packages" className="btn-ghost">
              View packages
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2
            className="mb-10 text-center font-serif text-3xl tracking-tight md:text-4xl"
            style={{ color: "var(--text-heading)", fontWeight: 400 }}
          >
            What&apos;s included
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="border p-6"
                style={{
                  borderRadius: "var(--radius-panel)",
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                }}
              >
                <h3
                  className="font-serif text-lg tracking-tight"
                  style={{ color: "var(--text-heading)", fontWeight: 400 }}
                >
                  {feature.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServicePackages serviceSlug={serviceSlug} serviceTitle={title} />

      <FAQ ids={faqIds} />
    </div>
  );
}
