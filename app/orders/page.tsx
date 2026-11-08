"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Suspense } from "react";
import { CheckCircle2, Package } from "lucide-react";
import { formatInr } from "@/lib/packages";

type Order = {
  id: string;
  packageTitle: string;
  packageSlug: string | null;
  priceInr: number;
  paymentMethod: string;
  status: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

const STATUS_COPY: Record<string, string> = {
  NEW: "Received — waiting for confirmation",
  CONFIRMED: "Confirmed — team will arrange COD / offline payment",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

function OrdersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const placedId = searchParams.get("placed");
  const { status: authStatus } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.replace("/login?callbackUrl=/orders");
    }
  }, [authStatus, router]);

  useEffect(() => {
    if (authStatus !== "authenticated") return;

    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/orders");
        const data = (await res.json()) as { orders?: Order[]; error?: string };
        if (!res.ok) {
          if (!cancelled) setError(data.error || "Unable to load orders.");
          return;
        }
        if (!cancelled) setOrders(data.orders || []);
      } catch {
        if (!cancelled) setError("Unable to load orders.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authStatus]);

  if (authStatus === "loading" || authStatus === "unauthenticated") {
    return (
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        Loading…
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {placedId ? (
        <div
          className="flex items-start gap-3 border px-4 py-3 text-sm"
          style={{
            borderRadius: "var(--radius-panel)",
            borderColor: "var(--accent-line)",
            background: "var(--accent-soft)",
            color: "var(--text-heading)",
          }}
        >
          <CheckCircle2
            className="mt-0.5 h-4 w-4 shrink-0"
            style={{ color: "var(--accent)" }}
          />
          <div>
            <p className="font-semibold">Order placed successfully</p>
            <p className="mt-1" style={{ color: "var(--text-muted)" }}>
              Track progress below. Our team will contact you for COD / offline
              payment.
            </p>
          </div>
        </div>
      ) : null}

      {loading ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Loading your orders…
        </p>
      ) : null}

      {error ? (
        <p className="text-sm" style={{ color: "#b42318" }}>
          {error}
        </p>
      ) : null}

      {!loading && !error && orders.length === 0 ? (
        <div
          className="border px-6 py-12 text-center"
          style={{
            borderRadius: "var(--radius-panel)",
            borderColor: "var(--border)",
            background: "var(--surface)",
          }}
        >
          <Package
            className="mx-auto h-8 w-8"
            style={{ color: "var(--text-faint)" }}
          />
          <h2
            className="mt-4 font-serif text-2xl"
            style={{ color: "var(--text-heading)", fontWeight: 400 }}
          >
            No orders yet
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            When you buy a package with COD, it will show up here for tracking.
          </p>
          <Link href="/packages" className="btn-accent mt-6 inline-flex">
            Browse packages
          </Link>
        </div>
      ) : null}

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => {
            const highlight = placedId === order.id;
            return (
              <article
                key={order.id}
                className="border p-5 sm:p-6"
                style={{
                  borderRadius: "var(--radius-panel)",
                  borderColor: highlight
                    ? "var(--accent-line)"
                    : "var(--border)",
                  background: "var(--surface)",
                  boxShadow: highlight
                    ? "0 0 0 1px var(--accent-soft)"
                    : undefined,
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.14em]"
                      style={{ color: "var(--accent)" }}
                    >
                      {order.paymentMethod} · {order.status}
                    </p>
                    <h2
                      className="mt-2 font-serif text-xl"
                      style={{ color: "var(--text-heading)", fontWeight: 400 }}
                    >
                      {order.packageTitle}
                    </h2>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {STATUS_COPY[order.status] || order.status}
                    </p>
                  </div>
                  <p
                    className="text-lg font-semibold tabular-nums"
                    style={{ color: "var(--accent)" }}
                  >
                    {formatInr(order.priceInr)}
                  </p>
                </div>

                <dl
                  className="mt-5 grid gap-3 border-t pt-4 text-sm sm:grid-cols-3"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div>
                    <dt style={{ color: "var(--text-faint)" }}>Order ID</dt>
                    <dd
                      className="mt-1 font-mono text-xs"
                      style={{ color: "var(--text-heading)" }}
                    >
                      {order.id}
                    </dd>
                  </div>
                  <div>
                    <dt style={{ color: "var(--text-faint)" }}>Placed</dt>
                    <dd className="mt-1" style={{ color: "var(--text-heading)" }}>
                      {new Date(order.createdAt).toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt style={{ color: "var(--text-faint)" }}>Mobile</dt>
                    <dd className="mt-1" style={{ color: "var(--text-heading)" }}>
                      {order.phone}
                    </dd>
                  </div>
                </dl>

                <div className="mt-4">
                  <Link
                    href={`/packages/order/${order.id}`}
                    className="text-sm font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    View details →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default function OrdersPage() {
  return (
    <section
      className="mx-auto min-h-[calc(100vh-var(--topbar-height))] max-w-3xl px-5 py-14 sm:px-8"
      style={{
        background:
          "radial-gradient(ellipse 80% 45% at 50% -8%, var(--accent-wash), transparent 55%)",
      }}
    >
      <div className="mb-8">
        <p
          className="text-xs font-semibold uppercase tracking-[0.16em]"
          style={{ color: "var(--accent)" }}
        >
          Your account
        </p>
        <h1
          className="mt-2 font-serif text-3xl sm:text-4xl"
          style={{ color: "var(--text-heading)", fontWeight: 400 }}
        >
          My orders
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
          Track COD / offline package orders and their status.
        </p>
      </div>

      <Suspense
        fallback={
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Loading…
          </p>
        }
      >
        <OrdersContent />
      </Suspense>
    </section>
  );
}
