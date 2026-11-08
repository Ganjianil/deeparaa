"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormEvent, Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
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
      <h1 className="mt-3 text-3xl">Welcome back</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
        Sign in to access your account and admin tools.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
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
            style={{
              borderColor: "var(--border-strong)",
              background: "var(--surface)",
              color: "var(--text-heading)",
            }}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium" style={{ color: "var(--text-heading)" }}>
            Password
          </span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-[var(--radius-control)] border px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
            style={{
              borderColor: "var(--border-strong)",
              background: "var(--surface)",
              color: "var(--text-heading)",
            }}
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
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm" style={{ color: "var(--text-muted)" }}>
        New here?{" "}
        <Link href="/signup" className="font-medium" style={{ color: "var(--accent)" }}>
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <section
      className="relative min-h-[calc(100vh-var(--topbar-height))] px-5 py-16 sm:px-8"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, var(--accent-wash), transparent 55%), var(--page)",
      }}
    >
      <Suspense
        fallback={
          <div className="mx-auto max-w-md text-center text-sm" style={{ color: "var(--text-muted)" }}>
            Loading…
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </section>
  );
}
