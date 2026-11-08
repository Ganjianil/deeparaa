"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Step = "email" | "otp" | "password";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [maskedPhone, setMaskedPhone] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    borderColor: "var(--border-strong)",
    background: "var(--surface)",
    color: "var(--text-heading)",
  } as const;

  const requestOtp = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as {
        error?: string;
        message?: string;
        sent?: boolean;
        maskedPhone?: string;
        whatsappUrl?: string;
      };
      if (!res.ok) {
        setError(data.error || "Unable to send OTP.");
        return;
      }
      if (!data.sent) {
        setError("No account found for that email, or mobile is missing.");
        return;
      }
      setMaskedPhone(data.maskedPhone || "");
      setWhatsappUrl(data.whatsappUrl || null);
      setMessage(data.message || "OTP sent.");
      setOtp("");
      setStep("otp");
    } catch {
      setError("Unable to send OTP right now.");
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (event: FormEvent) => {
    event.preventDefault();
    await requestOtp();
  };

  const verifyOtp = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = (await res.json()) as {
        error?: string;
        message?: string;
        resetToken?: string;
      };
      if (!res.ok || !data.resetToken) {
        setError(data.error || "Invalid OTP.");
        return;
      }
      setResetToken(data.resetToken);
      setMessage(data.message || "OTP verified.");
      setStep("password");
    } catch {
      setError("Unable to verify OTP right now.");
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
      setError("Session expired. Start again.");
      setStep("email");
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

  const stepCopy =
    step === "email"
      ? "Enter your account email. We’ll send a one-time password (OTP)."
      : step === "otp"
        ? `Enter the 6-digit OTP sent for ${maskedPhone || "your mobile"}.`
        : "Choose a new password for your account.";

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
        <h1 className="mt-3 text-3xl">Reset with OTP</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
          {stepCopy}
        </p>

        <div className="mt-5 flex gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
          {(["email", "otp", "password"] as Step[]).map((item, index) => (
            <span
              key={item}
              className="rounded-full px-2.5 py-1"
              style={{
                background:
                  step === item ? "var(--accent-soft)" : "var(--fill-soft)",
                color: step === item ? "var(--accent)" : "var(--text-muted)",
              }}
            >
              {index + 1}. {item}
            </span>
          ))}
        </div>

        {step === "email" ? (
          <form onSubmit={sendOtp} className="mt-8 space-y-4">
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
            {error ? (
              <p className="text-sm" style={{ color: "#b42318" }}>
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              className="btn-accent w-full justify-center"
              disabled={loading}
            >
              {loading ? "Sending OTP…" : "Send OTP"}
            </button>
          </form>
        ) : null}

        {step === "otp" ? (
          <form onSubmit={verifyOtp} className="mt-8 space-y-4">
            {message ? (
              <p className="text-sm" style={{ color: "var(--accent)" }}>
                {message}
              </p>
            ) : null}
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost inline-flex w-full justify-center"
              >
                Get OTP on WhatsApp
              </a>
            ) : null}
            <label className="block space-y-2">
              <span className="text-sm font-medium">6-digit OTP</span>
              <input
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                required
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className="w-full rounded-[var(--radius-control)] border px-4 py-3 text-center text-lg tracking-[0.35em]"
                style={inputStyle}
                placeholder="••••••"
              />
            </label>
            {error ? (
              <p className="text-sm" style={{ color: "#b42318" }}>
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              className="btn-accent w-full justify-center"
              disabled={loading || otp.length !== 6}
            >
              {loading ? "Verifying…" : "Verify OTP"}
            </button>
            <button
              type="button"
              className="btn-ghost w-full justify-center"
              disabled={loading}
              onClick={() => void requestOtp()}
            >
              Resend OTP
            </button>
          </form>
        ) : null}

        {step === "password" ? (
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
            <button
              type="submit"
              className="btn-accent w-full justify-center"
              disabled={loading}
            >
              {loading ? "Saving…" : "Update password"}
            </button>
          </form>
        ) : null}

        <p
          className="mt-6 text-center text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          <Link
            href="/login"
            className="font-medium"
            style={{ color: "var(--accent)" }}
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
