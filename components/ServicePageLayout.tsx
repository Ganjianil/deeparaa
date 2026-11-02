import Link from "next/link";
import { FAQ } from "./FAQ";

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
};

export function ServicePageLayout({
  title,
  tagline,
  heroDescription,
  features,
  faqIds,
}: ServicePageLayoutProps) {
  return (
    <>
      <section
        className="relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24"
        style={{
          background:
            "linear-gradient(145deg, var(--brand-900), var(--brand-700))",
        }}
      >
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <Link
            href="/#services"
            className="mb-6 inline-flex items-center text-sm text-white/65 transition hover:text-white"
          >
            ← Back to services
          </Link>
          <p className="section-eyebrow mb-3" style={{ color: "var(--brand-200)" }}>
            Service
          </p>
          <h1
            className="mt-3 max-w-3xl font-serif text-4xl tracking-tight text-white md:text-5xl lg:text-6xl"
            style={{ fontWeight: 400 }}
          >
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-xl" style={{ color: "var(--brand-200)" }}>
            {tagline}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            {heroDescription}
          </p>
          <Link href="/#contact" className="btn-accent mt-10 inline-flex">
            Request a Consultation
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: "var(--page)" }}>
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h2
            className="mb-12 text-center font-serif text-3xl tracking-tight md:text-4xl"
            style={{ color: "var(--text-heading)", fontWeight: 400 }}
          >
            What&apos;s included
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="surface-card p-6">
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

      <FAQ ids={faqIds} />
    </>
  );
}
