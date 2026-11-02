import { ServicePageLayout } from "@/components/ServicePageLayout";
import servicePages from "@/data/service-pages.json";
import type { Metadata } from "next";

const page = servicePages["software-development"];

export const metadata: Metadata = {
  title: page.title,
  description: page.heroDescription,
};

export default function SoftwareDevelopmentPage() {
  return (
    <ServicePageLayout
      title={page.title}
      tagline={page.tagline}
      heroDescription={page.heroDescription}
      features={page.features}
      faqIds={page.faqIds}
    />
  );
}
