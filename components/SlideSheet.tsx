"use client";

import { useEffect, useRef, type ReactNode } from "react";

type SlideSheetProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Page-turn reveal while scrolling.
 * Uses CSS view() timelines when available; IntersectionObserver fallback.
 * Sheets stay fully readable by default — never sticky / never stacked.
 */
export function SlideSheet({ children, className = "" }: SlideSheetProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const supportsViewTimeline =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("animation-timeline", "view()");

    if (supportsViewTimeline) {
      el.classList.add("page-turn--view");
      return;
    }

    el.classList.add("page-turn--io");

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.12) {
          el.classList.add("is-page-in");
          io.unobserve(el);
        }
      },
      { threshold: [0.12, 0.25], rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`slide-panel__sheet page-turn-sheet ${className}`.trim()}
    >
      {children}
    </div>
  );
}
