"use client";

import { useEffect, useState } from "react";
import type { LeadStatus } from "@/lib/roles";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string;
  status: string;
  createdAt: string;
};

const statuses: LeadStatus[] = ["NEW", "READ", "CLOSED"];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads");
      const data = (await res.json()) as { leads?: Lead[]; error?: string };
      if (!res.ok) {
        setError(data.error || "Failed to load leads.");
        return;
      }
      setLeads(data.leads || []);
    } catch {
      setError("Failed to load leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const updateStatus = async (id: string, status: LeadStatus) => {
    const res = await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) return;
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Leads</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
          Free audit and contact submissions.
        </p>
      </div>

      {loading ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Loading leads…
        </p>
      ) : null}
      {error ? (
        <p className="text-sm" style={{ color: "#b42318" }}>
          {error}
        </p>
      ) : null}

      {!loading && !error && leads.length === 0 ? (
        <p
          className="rounded-[var(--radius-panel)] border p-6 text-sm"
          style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text-muted)" }}
        >
          No leads yet. Submissions from Free Audit will appear here.
        </p>
      ) : null}

      {leads.length > 0 ? (
        <div
          className="overflow-x-auto rounded-[var(--radius-panel)] border"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <table className="min-w-full text-left text-sm">
            <thead style={{ background: "var(--surface-sunken)" }}>
              <tr>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Contact
                </th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Source
                </th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Status
                </th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Received
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} style={{ borderTop: "1px solid var(--border)" }}>
                  <td className="px-4 py-4 align-top">
                    <p className="font-medium" style={{ color: "var(--text-heading)" }}>
                      {lead.name}
                    </p>
                    <p style={{ color: "var(--text-muted)" }}>{lead.email}</p>
                    {lead.phone ? (
                      <p style={{ color: "var(--text-faint)" }}>{lead.phone}</p>
                    ) : null}
                    {lead.message ? (
                      <p className="mt-2 max-w-md whitespace-pre-wrap text-xs" style={{ color: "var(--text-body)" }}>
                        {lead.message}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-4 py-4 align-top" style={{ color: "var(--text-muted)" }}>
                    {lead.source}
                  </td>
                  <td className="px-4 py-4 align-top">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        void updateStatus(lead.id, e.target.value as LeadStatus)
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
                  <td className="px-4 py-4 align-top whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                    {new Date(lead.createdAt).toLocaleString()}
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
