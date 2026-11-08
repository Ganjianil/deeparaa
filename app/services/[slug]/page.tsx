import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { servicePages } from "@/data/servicePages";
import { ServicePackages } from "@/components/ServicePackages";
import { whatsappUrl } from "@/lib/contact";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicePages.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);

  if (!service) {
    return { title: "Service Not Found | Deepara Solutions" };
  }

  return {
    title: `${service.title} | Deepara Solutions`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);

  if (!service) notFound();

  const consultUrl = whatsappUrl(
    `Hello Deepara Solutions! I would like to know more about ${service.title}.`,
  );

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 80% 45% at 50% -8%, var(--accent-wash), transparent 55%), var(--page)",
        color: "var(--text-body)",
      }}
    >
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p
              className="text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: "var(--accent)" }}
            >
              Deepara Solutions
            </p>

            <h1
              className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: "var(--text-heading)", fontWeight: 400 }}
            >
              {service.title}
            </h1>

            <h2
              className="mt-4 text-xl font-semibold sm:text-2xl"
              style={{ color: "var(--accent)" }}
            >
              {service.subtitle}
            </h2>

            <p
              className="mt-6 max-w-2xl text-base leading-8 sm:text-lg"
              style={{ color: "var(--text-muted)" }}
            >
              {service.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={consultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent min-h-12 px-6"
              >
                <MessageCircle className="h-4 w-4" />
                Get free consultation
              </a>

              <Link href="/packages" className="btn-ghost min-h-12 px-6">
                View packages
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: "var(--accent)" }}
            >
              What we offer
            </p>
            <h2
              className="mt-3 font-serif text-3xl sm:text-4xl"
              style={{ color: "var(--text-heading)", fontWeight: 400 }}
            >
              Our {service.title} services
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl text-sm leading-7 sm:text-base"
              style={{ color: "var(--text-muted)" }}
            >
              Explore solutions tailored to your business requirements and
              digital growth goals.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.services.map((item, index) => (
              <article
                key={item.title}
                className="flex flex-col border p-6"
                style={{
                  borderRadius: "var(--radius-panel)",
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                }}
              >
                <span
                  className="inline-flex h-10 w-10 items-center justify-center text-sm font-bold"
                  style={{
                    borderRadius: "var(--radius-control)",
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3
                  className="mt-5 font-serif text-xl"
                  style={{ color: "var(--text-heading)", fontWeight: 400 }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-3 flex-1 text-sm leading-7"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServicePackages serviceSlug={service.slug} serviceTitle={service.title} />

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: "var(--accent)" }}
            >
              Why choose us
            </p>
            <h2
              className="mt-3 font-serif text-3xl sm:text-4xl"
              style={{ color: "var(--text-heading)", fontWeight: 400 }}
            >
              Solutions built around your business goals
            </h2>
            <p
              className="mt-5 text-base leading-8"
              style={{ color: "var(--text-muted)" }}
            >
              We combine thoughtful planning, practical implementation, and
              ongoing improvement to help businesses build a stronger digital
              presence.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex gap-3 border p-5"
                style={{
                  borderRadius: "var(--radius-panel)",
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                }}
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0"
                  style={{ color: "var(--accent)" }}
                />
                <p
                  className="text-sm font-medium leading-6"
                  style={{ color: "var(--text-body)" }}
                >
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: "var(--accent)" }}
            >
              FAQs
            </p>
            <h2
              className="mt-3 font-serif text-3xl sm:text-4xl"
              style={{ color: "var(--text-heading)", fontWeight: 400 }}
            >
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border p-5 sm:p-6"
                style={{
                  borderRadius: "var(--radius-panel)",
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                }}
              >
                <summary
                  className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold"
                  style={{ color: "var(--text-heading)" }}
                >
                  {faq.question}
                  <span style={{ color: "var(--accent)" }}>+</span>
                </summary>
                <p
                  className="mt-4 text-sm leading-7 sm:text-base"
                  style={{ color: "var(--text-muted)" }}
                >
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div
          className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 border p-8 sm:p-10 lg:flex-row lg:items-center"
          style={{
            borderRadius: "var(--radius-panel)",
            borderColor: "var(--border)",
            background:
              "linear-gradient(135deg, var(--accent-wash), var(--surface))",
          }}
        >
          <div>
            <h2
              className="font-serif text-2xl sm:text-3xl"
              style={{ color: "var(--text-heading)", fontWeight: 400 }}
            >
              Ready to grow your business?
            </h2>
            <p
              className="mt-3 max-w-2xl text-sm leading-7"
              style={{ color: "var(--text-muted)" }}
            >
              Tell us your goals and we&apos;ll recommend the right{" "}
              {service.title.toLowerCase()} package for you.
            </p>
          </div>
          <a
            href={consultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent min-h-12 shrink-0 px-6"
          >
            Get started today
          </a>
        </div>
      </section>
    </div>
  );
}
