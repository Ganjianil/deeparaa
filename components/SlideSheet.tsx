"use client";

import type { ReactNode } from "react";

type SlideSheetProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Full-page sheet markup. Motion is driven by MobilePageSnap on mobile
 * (fast bottom-right page transitions).
 */
export function SlideSheet({ children, className = "" }: SlideSheetProps) {
  return (
    <div className={`slide-panel__sheet ${className}`.trim()}>{children}</div>
  );
}
