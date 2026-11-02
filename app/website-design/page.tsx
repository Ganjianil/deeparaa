import { ServicePageLayout } from "@/components/ServicePageLayout";
import servicePages from "@/data/service-pages.json";
import type { Metadata } from "next";

const page = servicePages["website-design"];

export const metadata: Metadata = {
  title: page.title,
  description: page.heroDescription,
};

export default function WebsiteDesignPage() {
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
