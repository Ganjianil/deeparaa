"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { initialsFromName } from "@/lib/clients";

type AdminClient = {
  id: string;
  name: string;
  initials: string;
  industry: string;
  logo?: string;
  active: boolean;
  sortOrder: number;
};

type FormState = {
  name: string;
  initials: string;
  industry: string;
  logo: string;
  active: boolean;
  sortOrder: string;
};

const emptyForm: FormState = {
  name: "",
  initials: "",
  industry: "",
  logo: "",
  active: true,
  sortOrder: "0",
};

function toForm(client: AdminClient): FormState {
  return {
    name: client.name,
    initials: client.initials,
    industry: client.industry,
    logo: client.logo || "",
    active: client.active,
    sortOrder: String(client.sortOrder),
  };
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<AdminClient[]>([]);
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
      const res = await fetch("/api/admin/clients");
      const data = (await res.json()) as {
        clients?: AdminClient[];
        error?: string;
      };
      if (!res.ok) {
        setError(data.error || "Failed to load clients.");
        return;
      }
      setClients(data.clients || []);
    } catch {
      setError("Failed to load clients.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const sorted = useMemo(
    () =>
      [...clients].sort(
        (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name),
      ),
    [clients],
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
    setMessage("");
  };

  const openEdit = (client: AdminClient) => {
    setEditingId(client.id);
    setForm(toForm(client));
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

    const payload = {
      name: form.name.trim(),
      initials: form.initials.trim() || undefined,
      industry: form.industry.trim(),
      logo: form.logo.trim() || "",
      active: form.active,
      sortOrder: Number(form.sortOrder || 0),
    };

    try {
      const res = await fetch(
        editingId ? `/api/admin/clients/${editingId}` : "/api/admin/clients",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = (await res.json()) as {
        client?: AdminClient;
        error?: string;
      };
      if (!res.ok) {
        setError(data.error || "Unable to save client.");
        return;
      }
      setMessage(editingId ? "Client updated." : "Client created.");
      closeForm();
      await load();
    } catch {
      setError("Unable to save client.");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (client: AdminClient) => {
    const res = await fetch(`/api/admin/clients/${client.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !client.active }),
    });
    if (!res.ok) {
      setError("Unable to update status.");
      return;
    }
    await load();
  };

  const removeClient = async (client: AdminClient) => {
    const ok = window.confirm(`Delete “${client.name}”? This cannot be undone.`);
    if (!ok) return;
    const res = await fetch(`/api/admin/clients/${client.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      setError("Unable to delete client.");
      return;
    }
    setMessage("Client deleted.");
    await load();
  };

  const inputStyle = {
    borderColor: "var(--border-strong)",
    background: "var(--surface)",
    color: "var(--text-heading)",
  } as const;

  const previewInitials =
    form.initials.trim() || initialsFromName(form.name) || "CL";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl">Clients</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            Add and manage brands shown in the homepage “Our clients” section.
            Use a public path like `/logo.png` or a full image URL.
          </p>
        </div>
        <button type="button" className="btn-accent" onClick={openCreate}>
          New client
        </button>
      </div>

      {loading ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Loading clients…
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
                <th
                  className="px-4 py-3 font-medium"
                  style={{ color: "var(--text-heading)" }}
                >
                  Client
                </th>
                <th
                  className="px-4 py-3 font-medium"
                  style={{ color: "var(--text-heading)" }}
                >
                  Industry
                </th>
                <th
                  className="px-4 py-3 font-medium"
                  style={{ color: "var(--text-heading)" }}
                >
                  Sort
                </th>
                <th
                  className="px-4 py-3 font-medium"
                  style={{ color: "var(--text-heading)" }}
                >
                  Status
                </th>
                <th
                  className="px-4 py-3 font-medium"
                  style={{ color: "var(--text-heading)" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((client) => (
                <tr
                  key={client.id}
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <td className="px-4 py-4 align-top">
                    <div className="flex items-center gap-3">
                      {client.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={client.logo}
                          alt=""
                          className="h-10 w-16 rounded object-contain"
                          style={{ background: "var(--surface-sunken)" }}
                        />
                      ) : (
                        <span
                          className="inline-flex h-10 w-10 items-center justify-center rounded text-xs font-semibold"
                          style={{
                            background: "var(--accent-soft)",
                            color: "var(--accent)",
                          }}
                        >
                          {client.initials}
                        </span>
                      )}
                      <div>
                        <p
                          className="font-medium"
                          style={{ color: "var(--text-heading)" }}
                        >
                          {client.name}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-faint)" }}
                        >
                          {client.initials}
                          {client.logo ? ` · ${client.logo}` : ""}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    className="px-4 py-4 align-top"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {client.industry}
                  </td>
                  <td
                    className="px-4 py-4 align-top"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {client.sortOrder}
                  </td>
                  <td className="px-4 py-4 align-top">
                    <button
                      type="button"
                      onClick={() => void toggleActive(client)}
                      className="rounded-[var(--radius-control)] px-2 py-1 text-xs font-semibold"
                      style={{
                        background: client.active
                          ? "var(--accent-soft)"
                          : "var(--fill-soft)",
                        color: client.active
                          ? "var(--accent)"
                          : "var(--text-muted)",
                      }}
                    >
                      {client.active ? "Active" : "Hidden"}
                    </button>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="btn-ghost"
                        onClick={() => openEdit(client)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-ghost"
                        onClick={() => void removeClient(client)}
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
          No clients yet. Add your first client to show it on the homepage.
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
            aria-labelledby="client-form-title"
            className="my-auto w-full max-w-xl rounded-[var(--radius-panel)] border p-6"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="client-form-title" className="text-2xl">
                  {editingId ? "Edit client" : "New client"}
                </h2>
                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  Preview initials: {previewInitials}
                </p>
              </div>
              <button type="button" className="btn-ghost" onClick={closeForm}>
                Close
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Name</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full rounded-[var(--radius-control)] border px-3 py-2"
                  style={inputStyle}
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium">Initials</span>
                  <input
                    value={form.initials}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        initials: e.target.value.toUpperCase().slice(0, 6),
                      }))
                    }
                    placeholder="Auto from name"
                    className="w-full rounded-[var(--radius-control)] border px-3 py-2"
                    style={inputStyle}
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium">Industry</span>
                  <input
                    required
                    value={form.industry}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, industry: e.target.value }))
                    }
                    className="w-full rounded-[var(--radius-control)] border px-3 py-2"
                    style={inputStyle}
                  />
                </label>
              </div>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Logo path / URL</span>
                <input
                  value={form.logo}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, logo: e.target.value }))
                  }
                  placeholder="/client-logo.png"
                  className="w-full rounded-[var(--radius-control)] border px-3 py-2"
                  style={inputStyle}
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium">Sort order</span>
                  <input
                    type="number"
                    min={0}
                    value={form.sortOrder}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        sortOrder: e.target.value,
                      }))
                    }
                    className="w-full rounded-[var(--radius-control)] border px-3 py-2"
                    style={inputStyle}
                  />
                </label>
                <label className="flex items-center gap-2 pt-7 text-sm">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        active: e.target.checked,
                      }))
                    }
                  />
                  Show on homepage
                </label>
              </div>

              <div className="flex flex-wrap justify-end gap-3 pt-2">
                <button type="button" className="btn-ghost" onClick={closeForm}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-accent"
                  disabled={saving}
                >
                  {saving ? "Saving…" : editingId ? "Save changes" : "Create client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
