"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { formatInr } from "@/lib/packages";

type Order = {
  id: string;
  packageTitle: string;
  priceInr: number;
  paymentMethod: string;
  status: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
};

export default function OrderConfirmationPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/orders/${params.id}`);
        const data = (await res.json()) as { order?: Order; error?: string };
        if (!res.ok) {
          if (!cancelled) setError(data.error || "Order not found.");
          return;
        }
        if (!cancelled) setOrder(data.order || null);
      } catch {
        if (!cancelled) setError("Unable to load order.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  return (
    <section
      className="mx-auto min-h-[calc(100vh-var(--topbar-height))] max-w-2xl px-5 py-16 sm:px-8"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, var(--accent-wash), transparent 55%)",
      }}
    >
      {loading ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Loading order…
        </p>
      ) : null}

      {error ? (
        <div
          className="rounded-[var(--radius-panel)] border p-8"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <h1 className="text-2xl">Order unavailable</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            {error}
          </p>
          <Link href="/packages" className="btn-accent mt-6 inline-flex">
            Back to packages
          </Link>
        </div>
      ) : null}

      {order ? (
        <div
          className="rounded-[var(--radius-panel)] border p-8"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
            boxShadow: "0 1rem 2.5rem rgba(0,0,0,0.06)",
          }}
        >
          <div
            className="inline-flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
          >
            <CheckCircle2 className="h-6 w-6" />
          </div>

          <p
            className="mt-5 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--accent)" }}
          >
            COD / Offline payment
          </p>
          <h1 className="mt-2 text-3xl">Order placed</h1>
          <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-muted)" }}>
            Your package order is confirmed for cash on delivery / offline
            payment. Our team has been notified and will contact you shortly.
          </p>

          <dl className="mt-8 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b pb-3" style={{ borderColor: "var(--border)" }}>
              <dt style={{ color: "var(--text-muted)" }}>Order ID</dt>
              <dd className="font-mono text-xs" style={{ color: "var(--text-heading)" }}>
                {order.id}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b pb-3" style={{ borderColor: "var(--border)" }}>
              <dt style={{ color: "var(--text-muted)" }}>Package</dt>
              <dd style={{ color: "var(--text-heading)" }}>{order.packageTitle}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b pb-3" style={{ borderColor: "var(--border)" }}>
              <dt style={{ color: "var(--text-muted)" }}>Amount</dt>
              <dd className="font-semibold" style={{ color: "var(--text-heading)" }}>
                {formatInr(order.priceInr)}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b pb-3" style={{ borderColor: "var(--border)" }}>
              <dt style={{ color: "var(--text-muted)" }}>Payment</dt>
              <dd style={{ color: "var(--text-heading)" }}>COD / Offline</dd>
            </div>
            <div className="flex justify-between gap-4 border-b pb-3" style={{ borderColor: "var(--border)" }}>
              <dt style={{ color: "var(--text-muted)" }}>Mobile</dt>
              <dd style={{ color: "var(--text-heading)" }}>{order.phone}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt style={{ color: "var(--text-muted)" }}>Status</dt>
              <dd style={{ color: "var(--text-heading)" }}>{order.status}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/orders" className="btn-accent">
              Track my orders
            </Link>
            <Link href="/packages" className="btn-ghost">
              Browse more packages
            </Link>
          </div>
        </div>
      ) : null}
    </section>
  );
}
