"use client";

import { useEffect, useState } from "react";
import { formatInr } from "@/lib/packages";

type Order = {
  id: string;
  packageTitle: string;
  priceInr: number;
  name: string;
  email: string;
  phone: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
};

const statuses = ["NEW", "CONFIRMED", "COMPLETED", "CANCELLED"] as const;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/orders");
      const data = (await res.json()) as { orders?: Order[]; error?: string };
      if (!res.ok) {
        setError(data.error || "Failed to load orders.");
        return;
      }
      setOrders(data.orders || []);
    } catch {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const updateStatus = async (id: string, status: (typeof statuses)[number]) => {
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) return;
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order)),
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Orders</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
          COD / offline package checkouts from signed-in customers.
        </p>
      </div>

      {loading ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Loading orders…
        </p>
      ) : null}
      {error ? (
        <p className="text-sm" style={{ color: "#b42318" }}>
          {error}
        </p>
      ) : null}

      {!loading && !error && orders.length === 0 ? (
        <p
          className="rounded-[var(--radius-panel)] border p-6 text-sm"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
            color: "var(--text-muted)",
          }}
        >
          No COD orders yet.
        </p>
      ) : null}

      {orders.length > 0 ? (
        <div
          className="overflow-x-auto rounded-[var(--radius-panel)] border"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <table className="min-w-full text-left text-sm">
            <thead style={{ background: "var(--surface-sunken)" }}>
              <tr>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Customer
                </th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Package
                </th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Amount
                </th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Status
                </th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Placed
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderTop: "1px solid var(--border)" }}>
                  <td className="px-4 py-4 align-top">
                    <p className="font-medium" style={{ color: "var(--text-heading)" }}>
                      {order.name}
                    </p>
                    <p style={{ color: "var(--text-muted)" }}>{order.email}</p>
                    <p style={{ color: "var(--text-faint)" }}>{order.phone}</p>
                  </td>
                  <td className="px-4 py-4 align-top" style={{ color: "var(--text-heading)" }}>
                    {order.packageTitle}
                    <p className="text-xs" style={{ color: "var(--text-faint)" }}>
                      {order.paymentMethod}
                    </p>
                  </td>
                  <td className="px-4 py-4 align-top" style={{ color: "var(--text-heading)" }}>
                    {formatInr(order.priceInr)}
                  </td>
                  <td className="px-4 py-4 align-top">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        void updateStatus(
                          order.id,
                          e.target.value as (typeof statuses)[number],
                        )
                      }
                      className="rounded-[var(--radius-control)] border px-2 py-1.5 text-sm"
                      style={{
                        borderColor: "var(--border-strong)",
                        background: "var(--surface)",
                        color: "var(--text-heading)",
                      }}
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td
                    className="px-4 py-4 align-top whitespace-nowrap"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
