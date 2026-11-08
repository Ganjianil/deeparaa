import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  let userCount = 0;
  let leadCount = 0;
  let newLeadCount = 0;
  let packageCount = 0;
  let orderCount = 0;
  let clientCount = 0;

  try {
    [
      userCount,
      leadCount,
      newLeadCount,
      packageCount,
      orderCount,
      clientCount,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.package.count(),
      prisma.order.count(),
      prisma.client.count(),
    ]);
  } catch (err) {
    console.error("Admin overview stats error:", err);
  }

  const stats = [
    { label: "Packages", value: packageCount, href: "/admin/packages" },
    { label: "Clients", value: clientCount, href: "/admin/clients" },
    { label: "Orders", value: orderCount, href: "/admin/orders" },
    { label: "Users", value: userCount, href: "/admin/users" },
    { label: "Leads total", value: leadCount, href: "/admin/leads" },
    { label: "New leads", value: newLeadCount, href: "/admin/leads" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl">Overview</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
          Snapshot of accounts and inbound audit/contact leads.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-[var(--radius-panel)] border p-5 transition hover:border-[var(--accent-line)]"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
            }}
          >
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {stat.label}
            </p>
            <p
              className="mt-3 text-4xl font-semibold tabular-nums"
              style={{ color: "var(--text-heading)" }}
            >
              {stat.value}
            </p>
          </Link>
        ))}
      </div>

      <div
        className="rounded-[var(--radius-panel)] border p-5"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <h2 className="text-xl">Quick links</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/packages" className="btn-accent">
            Manage packages
          </Link>
          <Link href="/admin/clients" className="btn-ghost">
            Manage clients
          </Link>
          <Link href="/admin/orders" className="btn-ghost">
            Review orders
          </Link>
          <Link href="/admin/leads" className="btn-ghost">
            Review leads
          </Link>
          <Link href="/admin/users" className="btn-ghost">
            Manage users
          </Link>
        </div>
      </div>
    </div>
  );
}
