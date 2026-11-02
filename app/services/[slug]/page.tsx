import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { servicePages } from "@/data/servicePages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const WHATSAPP_NUMBER = "919985888237";

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

  const whatsappMessage = encodeURIComponent(
    `Hello Deepara Solutions! I would like to know more about ${service.title}.`,
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-slate-950 px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-950 via-slate-950 to-violet-950" />

        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute -bottom-32 left-1/4 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-200">
              <Sparkles className="h-4 w-4" />
              Deepara Solutions
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              {service.title}
            </h1>

            <h2 className="mt-5 text-xl font-semibold text-blue-200 sm:text-2xl">
              {service.subtitle}
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {service.description}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#f5790c] px-7 py-4 font-semibold text-white shadow-lg shadow-orange-950/20 transition hover:-translate-y-0.5 hover:bg-[#df6800]"
              >
                <MessageCircle className="h-5 w-5" />
                Get Free Consultation
                <ArrowUpRight className="h-5 w-5" />
              </a>

              <Link
                href="/#contact"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service offerings */}
      <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              What We Offer
            </span>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                {service.title}
              </span>{" "}
              Services
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Explore solutions tailored to your business requirements and
              digital growth goals.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.services.map((item, index) => (
              <article
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 via-violet-100 to-fuchsia-100 text-blue-700">
                  <span className="text-lg font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-700">
                  {item.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 sm:text-base">
                  {item.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-700">
                  Learn More
                  <ArrowUpRight className="h-4 w-4" />
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-600 via-violet-500 to-fuchsia-500 transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Why Choose Us
            </span>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Solutions built around your business goals
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              We combine thoughtful planning, practical implementation, and
              ongoing improvement to help businesses build a stronger digital
              presence.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <p className="text-sm font-medium leading-6 text-slate-700">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              FAQs
            </span>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-slate-600">
              Find answers to common questions about{" "}
              {service.title.toLowerCase()}.
            </p>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-5 open:border-blue-200 sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                  {faq.question}

                  <span className="text-xl text-blue-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-violet-700 to-fuchsia-700 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Grow Your Business?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/85">
            Let us discuss your goals and find the right{" "}
            {service.title.toLowerCase()} solution for your business.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-50"
          >
            Get Started Today
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </main>
  );
}
