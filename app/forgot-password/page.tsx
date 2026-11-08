"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    borderColor: "var(--border-strong)",
    background: "var(--surface)",
    color: "var(--text-heading)",
  } as const;

  const verifyAccount = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });
      const data = (await res.json()) as {
        error?: string;
        message?: string;
        resetToken?: string | null;
      };
      if (!res.ok) {
        setError(data.error || "Unable to verify account.");
        return;
      }
      if (!data.resetToken) {
        setError(
          "No matching account for that email and mobile. Check and try again.",
        );
        return;
      }
      setResetToken(data.resetToken);
      setMessage(data.message || "Verified. Set a new password.");
    } catch {
      setError("Unable to verify account right now.");
    } finally {
      setLoading(false);
    }
  };

  const savePassword = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!resetToken) {
      setError("Verification expired. Start again.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken, password }),
      });
      const data = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) {
        setError(data.error || "Unable to reset password.");
        return;
      }
      setMessage(data.message || "Password updated.");
      setTimeout(() => router.push("/login"), 900);
    } catch {
      setError("Unable to reset password right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative min-h-[calc(100vh-var(--topbar-height))] px-5 py-16 sm:px-8"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, var(--accent-wash), transparent 55%), var(--page)",
      }}
    >
      <div
        className="mx-auto w-full max-w-md rounded-[var(--radius-panel)] border p-8"
        style={{
          borderColor: "var(--border)",
          background: "var(--surface)",
          boxShadow: "0 1rem 2.5rem rgba(0,0,0,0.06)",
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ color: "var(--accent)" }}
        >
          Deepara Solutions
        </p>
        <h1 className="mt-3 text-3xl">Reset password</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
          {resetToken
            ? "Choose a new password for your account."
            : "Confirm the email and mobile number used at signup."}
        </p>

        {!resetToken ? (
          <form onSubmit={verifyAccount} className="mt-8 space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[var(--radius-control)] border px-4 py-3 text-sm"
                style={inputStyle}
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium">Mobile number</span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-[var(--radius-control)] border px-4 py-3 text-sm"
                style={inputStyle}
              />
            </label>
            {error ? (
              <p className="text-sm" style={{ color: "#b42318" }}>
                {error}
              </p>
            ) : null}
            <button type="submit" className="btn-accent w-full justify-center" disabled={loading}>
              {loading ? "Checking…" : "Continue"}
            </button>
          </form>
        ) : (
          <form onSubmit={savePassword} className="mt-8 space-y-4">
            {message ? (
              <p className="text-sm" style={{ color: "var(--accent)" }}>
                {message}
              </p>
            ) : null}
            <label className="block space-y-2">
              <span className="text-sm font-medium">New password</span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[var(--radius-control)] border px-4 py-3 text-sm"
                style={inputStyle}
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium">Confirm password</span>
              <input
                type="password"
                required
                minLength={6}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-[var(--radius-control)] border px-4 py-3 text-sm"
                style={inputStyle}
              />
            </label>
            {error ? (
              <p className="text-sm" style={{ color: "#b42318" }}>
                {error}
              </p>
            ) : null}
            <button type="submit" className="btn-accent w-full justify-center" disabled={loading}>
              {loading ? "Saving…" : "Update password"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm" style={{ color: "var(--text-muted)" }}>
          <Link href="/login" className="font-medium" style={{ color: "var(--accent)" }}>
            Back to sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
