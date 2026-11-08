import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/users", label: "Users" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <div
      className="min-h-[calc(100vh-var(--topbar-height))]"
      style={{
        background:
          "linear-gradient(180deg, var(--accent-wash), transparent 18rem), var(--page)",
      }}
    >
      <div className="mx-auto grid max-w-[1400px] gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[220px_1fr]">
        <aside
          className="h-fit rounded-[var(--radius-panel)] border p-4"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--accent)" }}
          >
            Admin
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            {session.user.name || session.user.email}
          </p>
          <nav className="mt-6 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium transition hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
                style={{ color: "var(--text-heading)" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              className="mt-3 rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              ← Back to site
            </Link>
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
