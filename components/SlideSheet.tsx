"use client";

import type { ReactNode } from "react";

type SlideSheetProps = {
  children: ReactNode;
  className?: string;
};

/** Section content wrapper — normal document flow (no flip / snap). */
export function SlideSheet({ children, className = "" }: SlideSheetProps) {
  return (
    <div className={`slide-panel__sheet ${className}`.trim()}>{children}</div>
  );
}
