import { ClientsGrid } from "@/components/ClientsGrid";
import { FAQ } from "@/components/FAQ";
import { FixedMeshBackground } from "@/components/FixedMeshBackground";
import { Hero } from "@/components/Hero";
import { OnboardingSteps } from "@/components/OnboardingSteps";
import { PlatformsTools } from "@/components/PlatformsTools";
import { ServicesGrid } from "@/components/ServicesGrid";
import { SuccessStories } from "@/components/SuccessStories";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* KOTA-style: fixed mesh stays while content scrolls over it */}
      <div className="kota-scroll-world">
        <FixedMeshBackground />

        <div className="kota-scroll-world__content">
          <ServicesGrid />
          <OnboardingSteps />
          <ClientsGrid />
          <PlatformsTools />
          <FAQ />
        </div>
      </div>

      <SuccessStories />

      <section
        className="slide-panel relative isolate overflow-hidden py-16 sm:py-20 md:py-24"
        style={{
          ["--slide-z" as string]: 10,
          background:
            "linear-gradient(145deg, var(--brand-800), var(--brand-600))",
          color: "#fff",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--brand-300)" }}
        />

        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span
            className="inline-flex items-center px-4 py-2 text-sm font-semibold"
            style={{
              borderRadius: "var(--radius-control)",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.1)",
              color: "var(--brand-100)",
            }}
          >
            Let&apos;s Build Something Great
          </span>

          <h2
            className="mt-6 font-serif text-3xl tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: "#fff", fontWeight: 400 }}
          >
            Ready to grow your digital presence?
          </h2>

          <p
            className="mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            Tell us about your business goals. Our team at Deepara Solutions
            will help you discover the right digital strategy to grow your
            business online.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="mailto:info@deeparasolution.com"
              className="inline-flex min-h-12 w-full items-center justify-center px-8 py-3 text-base font-semibold sm:w-auto"
              style={{
                borderRadius: "999px",
                background: "#fff",
                color: "var(--brand-700)",
              }}
            >
              Get in Touch
            </Link>

            <a
              href="tel:+919985888237"
              className="inline-flex min-h-12 w-full items-center justify-center px-8 py-3 text-base font-semibold sm:w-auto"
              style={{
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
              }}
            >
              Call Us: +91 9985888237
            </a>
          </div>

          <p
            className="mt-6 text-sm"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Website Design · Digital Marketing · Software Development
          </p>
        </div>
      </section>
    </>
  );
}
