import { ArrowRight, MessageCircle, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { toPublicPackage } from "@/lib/packages";
import { ADMIN_WHATSAPP, whatsappUrl } from "@/lib/contact";
import { PackagesCatalog } from "@/components/PackagesCatalog";

export const dynamic = "force-dynamic";

export default async function PackagesPage() {
  const rows = await prisma.package.findMany({
    where: { active: true },
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });
  const packages = rows.map(toPublicPackage);

  return (
    <div className="packages-page">
      <section className="packages-hero">
        <div className="packages-hero__grid" aria-hidden="true" />
        <div className="packages-hero__orb packages-hero__orb--a" aria-hidden="true" />
        <div className="packages-hero__orb packages-hero__orb--b" aria-hidden="true" />

        <div className="packages-hero__inner">
          <p className="packages-hero__brand">
            <span className="packages-hero__mark" aria-hidden="true">
              D
            </span>
            Deepara Solutions
          </p>

          <h1 className="packages-hero__title">
            Service packages,
            <span className="packages-hero__title-em"> priced with clarity</span>
          </h1>

          <p className="packages-hero__lede">
            Choose the work you need. Sign in once with your mobile
            number—checkout uses your account for COD / offline payment.
          </p>

          <div className="packages-hero__actions">
            <a href="#packages" className="btn-accent min-h-12 px-6">
              Browse packages
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={whatsappUrl(
                "Hello Deepara Solutions! I would like to know more about your service packages.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost min-h-12 px-6"
            >
              <MessageCircle className="h-4 w-4" />
              Talk to us
            </a>
          </div>

          <ul className="packages-hero__perks">
            <li>
              <ShieldCheck className="h-4 w-4" />
              Account-based checkout
            </li>
            <li>
              <Sparkles className="h-4 w-4" />
              Transparent INR pricing
            </li>
            <li>
              <CheckCircle2 className="h-4 w-4" />
              COD / offline payment
            </li>
          </ul>
        </div>
      </section>

      <PackagesCatalog packages={packages} />

      <section className="packages-help">
        <div className="packages-help__panel">
          <div>
            <p className="packages-help__eyebrow">Need a recommendation?</p>
            <h2>We’ll help you pick the right package</h2>
            <p>
              Share your goals and we’ll suggest a fit, then confirm COD /
              offline payment next steps.
            </p>
          </div>
          <a
            href={whatsappUrl(
              "Hello Deepara Solutions! Please help me choose the right package for my business.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent min-h-12 shrink-0 px-6"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp us
          </a>
        </div>
      </section>

      <p className="sr-only">Admin WhatsApp {ADMIN_WHATSAPP}</p>
    </div>
  );
}
