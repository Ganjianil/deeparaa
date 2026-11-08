"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const cleanedPhone = phone.replace(/[\s()+-]/g, "");
    if (!/^\d{10,15}$/.test(cleanedPhone)) {
      setError("Please enter a valid mobile number (10–15 digits).");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: cleanedPhone,
          password,
        }),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Unable to create account.");
        setLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (result?.error) {
        router.push("/login");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Unable to create account right now.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    borderColor: "var(--border-strong)",
    background: "var(--surface)",
    color: "var(--text-heading)",
  } as const;

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
        <h1 className="mt-3 text-3xl">Create account</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
          Join to request audits and manage your details.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium" style={{ color: "var(--text-heading)" }}>
              Full name
            </span>
            <input
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-[var(--radius-control)] border px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
              style={inputStyle}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium" style={{ color: "var(--text-heading)" }}>
              Email
            </span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[var(--radius-control)] border px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
              style={inputStyle}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium" style={{ color: "var(--text-heading)" }}>
              Mobile number
            </span>
            <input
              type="tel"
              required
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10–15 digit mobile"
              className="w-full rounded-[var(--radius-control)] border px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
              style={inputStyle}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium" style={{ color: "var(--text-heading)" }}>
              Password
            </span>
            <input
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[var(--radius-control)] border px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
              style={inputStyle}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium" style={{ color: "var(--text-heading)" }}>
              Confirm password
            </span>
            <input
              type="password"
              required
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-[var(--radius-control)] border px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
              style={inputStyle}
            />
          </label>

          {error ? (
            <p className="text-sm" style={{ color: "#b42318" }} role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="btn-accent w-full justify-center"
          >
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link href="/login" className="font-medium" style={{ color: "var(--accent)" }}>
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
