"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

type AuthNavProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export function AuthNav({ mobile = false, onNavigate }: AuthNavProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <span
        className={mobile ? "text-sm" : "text-sm"}
        style={{ color: "var(--text-faint)" }}
      >
        …
      </span>
    );
  }

  if (session?.user) {
    const isAdmin = session.user.role === "ADMIN";
    const displayName =
      session.user.name?.trim() ||
      session.user.email?.split("@")[0] ||
      "User";

    return (
      <div className={mobile ? "flex flex-col gap-3" : "flex items-center gap-2"}>
        <span
          className={
            mobile
              ? "text-base font-semibold"
              : "max-w-[9rem] truncate text-sm font-semibold xl:max-w-[12rem]"
          }
          style={{ color: "var(--text-heading)" }}
          title={displayName}
        >
          {displayName}
        </span>
        {isAdmin ? (
          <Link
            href="/admin"
            onClick={onNavigate}
            className={mobile ? "nav-link text-base" : "nav-link text-sm"}
          >
            Dashboard
          </Link>
        ) : null}
        <Link
          href="/orders"
          onClick={onNavigate}
          className={mobile ? "nav-link text-base" : "nav-link text-sm"}
        >
          My Orders
        </Link>
        <button
          type="button"
          onClick={() => {
            onNavigate?.();
            void signOut({ callbackUrl: "/" });
          }}
          className={mobile ? "btn-ghost w-full justify-center" : "btn-ghost"}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      onClick={onNavigate}
      className={mobile ? "btn-ghost w-full justify-center" : "btn-ghost"}
    >
      Login / Signup
    </Link>
  );
}
