"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { formatInr, type PublicPackage } from "@/lib/packages";

type ServicePackagesProps = {
  serviceSlug: string;
  serviceTitle: string;
};

export function ServicePackages({
  serviceSlug,
  serviceTitle,
}: ServicePackagesProps) {
  const router = useRouter();
  const { status } = useSession();
  const [packages, setPackages] = useState<PublicPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const [matchedRes, allRes] = await Promise.all([
          fetch(`/api/packages?service=${encodeURIComponent(serviceSlug)}`),
          fetch("/api/packages"),
        ]);
        const matchedData = (await matchedRes.json()) as {
          packages?: PublicPackage[];
        };
        const allData = (await allRes.json()) as { packages?: PublicPackage[] };
        const matched = matchedData.packages || [];
        const all = allData.packages || [];

        if (cancelled) return;

        if (matched.length > 0) {
          setPackages(matched);
          setUsingFallback(false);
        } else {
          // Still show packages so service pages never look empty
          setPackages(all.slice(0, 6));
          setUsingFallback(all.length > 0);
        }
      } catch {
        if (!cancelled) {
          setPackages([]);
          setUsingFallback(false);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [serviceSlug]);

  async function handleBuy(item: PublicPackage) {
    setError("");
    if (status !== "authenticated") {
      router.push(`/login?callbackUrl=/services/${serviceSlug}`);
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
        setError(data.error || "Unable to place order.");
        return;
      }
      router.push(data.redirectUrl || "/orders");
    } catch {
      setError("Unable to place order right now.");
    } finally {
      setCheckoutId(null);
    }
  }

  return (
    <section
      className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20"
      style={{ background: "var(--page)" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--accent)" }}
          >
            Packages & pricing
          </p>
          <h2
            className="mt-3 font-serif text-3xl sm:text-4xl"
            style={{ color: "var(--text-heading)", fontWeight: 400 }}
          >
            {serviceTitle} packages
          </h2>
          <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-muted)" }}>
            {usingFallback
              ? "No packages are assigned to this service yet—showing live offers from the catalog. Assign packages in Admin → Packages."
              : "Prices are managed from the admin dashboard. Checkout uses COD / offline payment."}
          </p>
        </div>

        {error ? (
          <p className="mt-6 text-center text-sm" style={{ color: "#b42318" }}>
            {error}
          </p>
        ) : null}

        {loading ? (
          <p
            className="mt-10 text-center text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Loading packages…
          </p>
        ) : null}

        {!loading && packages.length === 0 ? (
          <div
            className="mt-10 border px-6 py-10 text-center"
            style={{
              borderRadius: "var(--radius-panel)",
              borderColor: "var(--border)",
              background: "var(--surface)",
            }}
          >
            <p style={{ color: "var(--text-muted)" }}>
              No active packages yet. Create and activate packages in the admin
              dashboard.
            </p>
            <Link href="/packages" className="btn-accent mt-5 inline-flex">
              Browse packages
            </Link>
          </div>
        ) : null}

        {!loading && packages.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((item) => (
              <article
                key={item.id}
                className="flex h-full flex-col border p-6"
                style={{
                  borderRadius: "var(--radius-panel)",
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                }}
              >
                <span
                  className="w-fit px-2.5 py-1 text-xs font-semibold"
                  style={{
                    borderRadius: "var(--radius-control)",
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                  }}
                >
                  {item.category}
                </span>
                <h3
                  className="mt-4 font-serif text-xl"
                  style={{ color: "var(--text-heading)", fontWeight: 400 }}
                >
                  {item.title}
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span
                    className="text-2xl font-semibold tabular-nums"
                    style={{ color: "var(--accent)" }}
                  >
                    {formatInr(item.priceInr)}
                  </span>
                  {item.compareAt != null && item.compareAt > item.priceInr ? (
                    <span
                      className="text-sm line-through"
                      style={{ color: "var(--text-faint)" }}
                    >
                      {formatInr(item.compareAt)}
                    </span>
                  ) : null}
                </div>
                <p
                  className="mt-3 text-sm leading-7"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.features.slice(0, 4).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "var(--text-body)" }}
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: "var(--accent)" }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  disabled={checkoutId === item.id}
                  onClick={() => void handleBuy(item)}
                  className="btn-accent mt-auto min-h-11 w-full justify-center disabled:opacity-70"
                  style={{ marginTop: "1.5rem" }}
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
        ) : null}

        <div className="mt-8 text-center">
          <Link
            href="/packages"
            className="text-sm font-semibold"
            style={{ color: "var(--accent)" }}
          >
            View all packages →
          </Link>
        </div>
      </div>
    </section>
  );
}
