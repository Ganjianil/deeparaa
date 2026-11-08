"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ArrowUpRight,
  CheckCircle2,
  Search,
} from "lucide-react";
import { formatInr, type PublicPackage } from "@/lib/packages";

type PackagesCatalogProps = {
  packages: PublicPackage[];
};

export function PackagesCatalog({ packages }: PackagesCatalogProps) {
  const router = useRouter();
  const { status } = useSession();
  const [activeCategory, setActiveCategory] = useState("All Packages");
  const [searchTerm, setSearchTerm] = useState("");
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState("");

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(packages.map((item) => item.category).filter(Boolean)),
    ).sort((a, b) => a.localeCompare(b));
    return ["All Packages", ...unique];
  }, [packages]);

  const filteredPackages = packages.filter((item) => {
    const matchesCategory =
      activeCategory === "All Packages" || item.category === activeCategory;
    const search = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  async function handleBuy(item: PublicPackage) {
    setCheckoutError("");

    if (status !== "authenticated") {
      router.push("/login?callbackUrl=/packages");
      return;
    }

    setCheckoutId(item.id);
    try {
      const res = await fetch("/api/orders/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: item.id }),
      });
      const data = (await res.json()) as {
        error?: string;
        redirectUrl?: string;
      };

      if (!res.ok) {
        setCheckoutError(data.error || "Unable to place order.");
        return;
      }

      router.push(data.redirectUrl || "/orders");
    } catch {
      setCheckoutError("Unable to place order right now.");
    } finally {
      setCheckoutId(null);
    }
  }

  return (
    <section id="packages" className="packages-catalog">
      <div className="packages-catalog__inner">
        <div className="packages-toolbar">
          <div className="packages-search">
            <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name or category…"
              aria-label="Search packages"
            />
          </div>

          <div
            className="packages-filters"
            role="tablist"
            aria-label="Package categories"
          >
            {categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(category)}
                  className={`packages-filter${active ? " is-active" : ""}`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {checkoutError ? (
          <p className="packages-alert">{checkoutError}</p>
        ) : null}

        <div className="packages-grid">
          {filteredPackages.map((item) => (
            <article
              key={item.id}
              className={`package-card${item.featured ? " is-featured" : ""}`}
            >
              <div className="package-card__top">
                <span className="package-card__category">{item.category}</span>
                {item.featured ? (
                  <span className="package-card__badge">Featured</span>
                ) : null}
              </div>

              <h3 className="package-card__title">{item.title}</h3>

              <div className="package-card__price">
                <span className="package-card__amount">
                  {formatInr(item.priceInr)}
                </span>
                {item.compareAt != null && item.compareAt > item.priceInr ? (
                  <span className="package-card__compare">
                    {formatInr(item.compareAt)}
                  </span>
                ) : null}
              </div>

              <p className="package-card__desc">{item.description}</p>

              <ul className="package-card__features">
                {item.features.slice(0, 5).map((feature) => (
                  <li key={feature}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                disabled={checkoutId === item.id}
                onClick={() => void handleBuy(item)}
                className="btn-accent package-card__cta"
              >
                {checkoutId === item.id
                  ? "Placing order…"
                  : status === "authenticated"
                    ? "Pay COD"
                    : "Sign in to buy"}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>

        {filteredPackages.length === 0 ? (
          <div className="packages-empty">
            <Search className="mx-auto h-7 w-7" />
            <h3>No packages match</h3>
            <p>Try another search or category.</p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("All Packages");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
