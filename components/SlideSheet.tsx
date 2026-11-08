import type { ReactNode } from "react";

type SlideSheetProps = {
  children: ReactNode;
  className?: string;
};

/** Plain section wrapper — no flip / page-turn / scale. */
export function SlideSheet({ children, className = "" }: SlideSheetProps) {
  return (
    <div className={`slide-panel__sheet ${className}`.trim()}>{children}</div>
  );
}
