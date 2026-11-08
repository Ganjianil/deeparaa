"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { formatInr, SERVICE_SLUG_OPTIONS } from "@/lib/packages";

type AdminPackage = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  features: string[];
  priceInr: number;
  compareAt: number | null;
  serviceSlugs: string[];
  featured: boolean;
  active: boolean;
  sortOrder: number;
};

type FormState = {
  title: string;
  slug: string;
  category: string;
  description: string;
  featuresText: string;
  priceInr: string;
  compareAt: string;
  serviceSlugs: string[];
  featured: boolean;
  active: boolean;
  sortOrder: string;
};

const emptyForm: FormState = {
  title: "",
  slug: "",
  category: "Digital Marketing",
  description: "",
  featuresText: "",
  priceInr: "",
  compareAt: "",
  serviceSlugs: [],
  featured: false,
  active: true,
  sortOrder: "0",
};

function toForm(pkg: AdminPackage): FormState {
  return {
    title: pkg.title,
    slug: pkg.slug,
    category: pkg.category,
    description: pkg.description,
    featuresText: pkg.features.join("\n"),
    priceInr: String(pkg.priceInr),
    compareAt: pkg.compareAt != null ? String(pkg.compareAt) : "",
    serviceSlugs: pkg.serviceSlugs || [],
    featured: pkg.featured,
    active: pkg.active,
    sortOrder: String(pkg.sortOrder),
  };
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<AdminPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/packages");
      const data = (await res.json()) as {
        packages?: AdminPackage[];
        error?: string;
      };
      if (!res.ok) {
        setError(data.error || "Failed to load packages.");
        return;
      }
      setPackages(data.packages || []);
    } catch {
      setError("Failed to load packages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const sorted = useMemo(
    () =>
      [...packages].sort(
        (a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title),
      ),
    [packages],
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
    setMessage("");
  };

  const openEdit = (pkg: AdminPackage) => {
    setEditingId(pkg.id);
    setForm(toForm(pkg));
    setFormOpen(true);
    setMessage("");
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    const features = form.featuresText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim() || undefined,
      category: form.category.trim(),
      description: form.description.trim(),
      features,
      priceInr: Number(form.priceInr),
      compareAt: form.compareAt.trim() ? Number(form.compareAt) : null,
      serviceSlugs: form.serviceSlugs,
      featured: form.featured,
      active: form.active,
      sortOrder: Number(form.sortOrder || 0),
    };

    try {
      const res = await fetch(
        editingId ? `/api/admin/packages/${editingId}` : "/api/admin/packages",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = (await res.json()) as {
        package?: AdminPackage;
        error?: string;
      };
      if (!res.ok) {
        setError(data.error || "Unable to save package.");
        return;
      }
      setMessage(editingId ? "Package updated." : "Package created.");
      closeForm();
      await load();
    } catch {
      setError("Unable to save package.");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (pkg: AdminPackage) => {
    const res = await fetch(`/api/admin/packages/${pkg.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !pkg.active }),
    });
    if (!res.ok) {
      setError("Unable to update status.");
      return;
    }
    await load();
  };

  const removePackage = async (pkg: AdminPackage) => {
    const ok = window.confirm(`Delete “${pkg.title}”? This cannot be undone.`);
    if (!ok) return;
    const res = await fetch(`/api/admin/packages/${pkg.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      setError("Unable to delete package.");
      return;
    }
    setMessage("Package deleted.");
    await load();
  };

  const inputStyle = {
    borderColor: "var(--border-strong)",
    background: "var(--surface)",
    color: "var(--text-heading)",
  } as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl">Packages</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            Create, edit, and price packages. Assign them to service pages so
            YouTube SEO, Website Design, and others show the right offers.
          </p>
        </div>
        <button type="button" className="btn-accent" onClick={openCreate}>
          New package
        </button>
      </div>

      {loading ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Loading packages…
        </p>
      ) : null}
      {error ? (
        <p className="text-sm" style={{ color: "#b42318" }}>
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="text-sm" style={{ color: "var(--accent)" }}>
          {message}
        </p>
      ) : null}

      {sorted.length > 0 ? (
        <div
          className="overflow-x-auto rounded-[var(--radius-panel)] border"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <table className="min-w-full text-left text-sm">
            <thead style={{ background: "var(--surface-sunken)" }}>
              <tr>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Package
                </th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Price
                </th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Sort
                </th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Status
                </th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((pkg) => (
                <tr key={pkg.id} style={{ borderTop: "1px solid var(--border)" }}>
                  <td className="px-4 py-4 align-top">
                    <p className="font-medium" style={{ color: "var(--text-heading)" }}>
                      {pkg.title}
                      {pkg.featured ? (
                        <span className="ml-2 text-xs" style={{ color: "var(--accent)" }}>
                          Featured
                        </span>
                      ) : null}
                    </p>
                    <p style={{ color: "var(--text-muted)" }}>{pkg.category}</p>
                    <p className="text-xs" style={{ color: "var(--text-faint)" }}>
                      /{pkg.slug}
                    </p>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <p style={{ color: "var(--text-heading)" }}>
                      {formatInr(pkg.priceInr)}
                    </p>
                    {pkg.compareAt != null ? (
                      <p
                        className="text-xs line-through"
                        style={{ color: "var(--text-faint)" }}
                      >
                        {formatInr(pkg.compareAt)}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-4 py-4 align-top" style={{ color: "var(--text-muted)" }}>
                    {pkg.sortOrder}
                  </td>
                  <td className="px-4 py-4 align-top">
                    <button
                      type="button"
                      onClick={() => void toggleActive(pkg)}
                      className="rounded-[var(--radius-control)] px-2 py-1 text-xs font-semibold"
                      style={{
                        background: pkg.active
                          ? "var(--accent-soft)"
                          : "var(--fill-soft)",
                        color: pkg.active
                          ? "var(--accent)"
                          : "var(--text-muted)",
                      }}
                    >
                      {pkg.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="btn-ghost"
                        onClick={() => openEdit(pkg)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-ghost"
                        onClick={() => void removePackage(pkg)}
                        style={{ color: "#b42318" }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading ? (
        <p
          className="rounded-[var(--radius-panel)] border p-6 text-sm"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
            color: "var(--text-muted)",
          }}
        >
          No packages yet. Create your first package to show it on `/packages`.
        </p>
      ) : null}

      {formOpen ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="package-form-title"
            className="my-auto w-full max-w-2xl rounded-[var(--radius-panel)] border p-6"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="package-form-title" className="text-2xl">
                  {editingId ? "Edit package" : "New package"}
                </h2>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                  Prices are in INR. Features: one per line.
                </p>
              </div>
              <button type="button" className="btn-ghost" onClick={closeForm}>
                Close
              </button>
            </div>

            <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block space-y-2 sm:col-span-2">
                <span className="text-sm font-medium" style={{ color: "var(--text-heading)" }}>
                  Title
                </span>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full rounded-[var(--radius-control)] border px-3 py-2.5 text-sm outline-none"
                  style={inputStyle}
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium" style={{ color: "var(--text-heading)" }}>
                  Slug
                </span>
                <input
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="auto from title"
                  className="w-full rounded-[var(--radius-control)] border px-3 py-2.5 text-sm outline-none"
                  style={inputStyle}
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium" style={{ color: "var(--text-heading)" }}>
                  Category
                </span>
                <input
                  required
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  className="w-full rounded-[var(--radius-control)] border px-3 py-2.5 text-sm outline-none"
                  style={inputStyle}
                />
              </label>

              <label className="block space-y-2 sm:col-span-2">
                <span className="text-sm font-medium" style={{ color: "var(--text-heading)" }}>
                  Description
                </span>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="w-full rounded-[var(--radius-control)] border px-3 py-2.5 text-sm outline-none"
                  style={inputStyle}
                />
              </label>

              <label className="block space-y-2 sm:col-span-2">
                <span className="text-sm font-medium" style={{ color: "var(--text-heading)" }}>
                  Features (one per line)
                </span>
                <textarea
                  required
                  rows={5}
                  value={form.featuresText}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, featuresText: e.target.value }))
                  }
                  className="w-full rounded-[var(--radius-control)] border px-3 py-2.5 text-sm outline-none"
                  style={inputStyle}
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium" style={{ color: "var(--text-heading)" }}>
                  Price (INR)
                </span>
                <input
                  required
                  type="number"
                  min={0}
                  value={form.priceInr}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, priceInr: e.target.value }))
                  }
                  className="w-full rounded-[var(--radius-control)] border px-3 py-2.5 text-sm outline-none"
                  style={inputStyle}
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium" style={{ color: "var(--text-heading)" }}>
                  Compare-at (optional)
                </span>
                <input
                  type="number"
                  min={0}
                  value={form.compareAt}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, compareAt: e.target.value }))
                  }
                  className="w-full rounded-[var(--radius-control)] border px-3 py-2.5 text-sm outline-none"
                  style={inputStyle}
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium" style={{ color: "var(--text-heading)" }}>
                  Sort order
                </span>
                <input
                  type="number"
                  min={0}
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, sortOrder: e.target.value }))
                  }
                  className="w-full rounded-[var(--radius-control)] border px-3 py-2.5 text-sm outline-none"
                  style={inputStyle}
                />
              </label>

              <fieldset className="space-y-2 sm:col-span-2">
                <legend
                  className="text-sm font-medium"
                  style={{ color: "var(--text-heading)" }}
                >
                  Show on service pages
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {SERVICE_SLUG_OPTIONS.map((option) => {
                    const checked = form.serviceSlugs.includes(option.value);
                    return (
                      <label
                        key={option.value}
                        className="inline-flex items-center gap-2 text-sm"
                        style={{ color: "var(--text-body)" }}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            setForm((f) => ({
                              ...f,
                              serviceSlugs: checked
                                ? f.serviceSlugs.filter(
                                    (slug) => slug !== option.value,
                                  )
                                : [...f.serviceSlugs, option.value],
                            }))
                          }
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="flex items-end gap-4 pb-2">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, featured: e.target.checked }))
                    }
                  />
                  Featured
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, active: e.target.checked }))
                    }
                  />
                  Active
                </label>
              </div>

              <div className="flex flex-wrap gap-3 sm:col-span-2">
                <button
                  type="submit"
                  className="btn-accent"
                  disabled={saving}
                >
                  {saving
                    ? "Saving…"
                    : editingId
                      ? "Save changes"
                      : "Create package"}
                </button>
                <button type="button" className="btn-ghost" onClick={closeForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
