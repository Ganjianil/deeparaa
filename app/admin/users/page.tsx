"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { Role } from "@/lib/roles";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/users");
      const data = (await res.json()) as { users?: UserRow[]; error?: string };
      if (!res.ok) {
        setError(data.error || "Failed to load users.");
        return;
      }
      setUsers(data.users || []);
    } catch {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const updateRole = async (id: string, role: Role) => {
    setMessage("");
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, role }),
    });
    const data = (await res.json()) as { user?: UserRow; error?: string };
    if (!res.ok) {
      setMessage(data.error || "Unable to update role.");
      return;
    }
    if (data.user) {
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? data.user! : user)),
      );
      setMessage("Role updated.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Users</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
          Promote or demote accounts. You cannot demote yourself.
        </p>
      </div>

      {loading ? (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Loading users…
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

      {users.length > 0 ? (
        <div
          className="overflow-x-auto rounded-[var(--radius-panel)] border"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <table className="min-w-full text-left text-sm">
            <thead style={{ background: "var(--surface-sunken)" }}>
              <tr>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Name
                </th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Email
                </th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Role
                </th>
                <th className="px-4 py-3 font-medium" style={{ color: "var(--text-heading)" }}>
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isSelf = user.id === session?.user?.id;
                return (
                  <tr key={user.id} style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-4 py-4" style={{ color: "var(--text-heading)" }}>
                      {user.name}
                      {isSelf ? (
                        <span className="ml-2 text-xs" style={{ color: "var(--text-faint)" }}>
                          (you)
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-4" style={{ color: "var(--text-muted)" }}>
                      {user.email}
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={user.role}
                        disabled={isSelf}
                        onChange={(e) =>
                          void updateRole(user.id, e.target.value as Role)
                        }
                        className="rounded-[var(--radius-control)] border px-2 py-1.5 text-sm disabled:opacity-60"
                        style={{
                          borderColor: "var(--border-strong)",
                          background: "var(--surface)",
                          color: "var(--text-heading)",
                        }}
                      >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
