"use client";

import { useEffect } from "react";

const ANIM_MS = 2000;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/** Document Y from layout — safe for sticky (getBoundingClientRect is not). */
function layoutTop(el: HTMLElement) {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

/**
 * Full-page snap on ALL devices (phone, tablet, desktop):
 * each scroll/swipe jumps to the next page with a bottom-right slide-in.
 * Touch is intercepted so iOS native vertical sticky cannot replace the effect.
 */
export function MobilePageSnap() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let pages: HTMLElement[] = [];
    let tops: number[] = [];
    let index = 0;
    let animating = false;
    let touchY = 0;
    let touchX = 0;
    let touchActive = false;
    let touchMoved = false;
    let disposed = false;
    let unlockTimer = 0;

    const measure = () => {
      const hero = document.querySelector<HTMLElement>(".landing-hero");
      const slides = [
        ...document.querySelectorAll<HTMLElement>(".slide-panel"),
      ];
      pages = hero ? [hero, ...slides] : slides;
      tops = pages.map((page) => layoutTop(page));
    };

    const nearestIndex = () => {
      if (!tops.length) return 0;
      const y = window.scrollY + 8;
      let best = 0;
      for (let i = 0; i < tops.length; i++) {
        if (tops[i] <= y + window.innerHeight * 0.4) best = i;
      }
      return best;
    };

    const setSheet = (
      page: HTMLElement,
      state: "from-br" | "to" | "reset",
      withTransition: boolean,
    ) => {
      const sheet = page.querySelector<HTMLElement>(".slide-panel__sheet");
      if (!sheet) return;

      sheet.style.transition = withTransition
        ? "transform 2s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 1.5s ease, border-radius 2s ease, box-shadow 2s ease"
        : "none";

      if (state === "from-br") {
        sheet.style.transform = "translate3d(62vw, 118%, 0) scale(0.9)";
        sheet.style.opacity = "0.2";
        sheet.style.borderRadius = "1.85rem 1.85rem 0 0";
        sheet.style.boxShadow = "-32px -48px 90px rgba(17, 17, 17, 0.24)";
      } else if (state === "to") {
        sheet.style.transform = "translate3d(0, 0, 0) scale(1)";
        sheet.style.opacity = "1";
        sheet.style.borderRadius = "0";
        sheet.style.boxShadow = "";
      } else {
        sheet.style.transform = "";
        sheet.style.opacity = "";
        sheet.style.borderRadius = "";
        sheet.style.boxShadow = "";
        sheet.style.transition = "";
      }
    };

    const unlock = (nextIndex: number) => {
      animating = false;
      index = nextIndex;
      window.clearTimeout(unlockTimer);
    };

    const goTo = (next: number) => {
      if (disposed || reduce.matches) return;
      if (animating) return;

      measure();
      if (!pages.length) return;

      next = clamp(next, 0, pages.length - 1);
      if (next === index) return;

      animating = true;
      const target = pages[next];
      const top = Math.max(0, tops[next] ?? layoutTop(target));
      const hasSheet = Boolean(target.querySelector(".slide-panel__sheet"));

      // All devices / both directions: bottom-right entrance
      if (hasSheet) {
        setSheet(target, "from-br", false);
        void target.offsetWidth;
      }

      window.scrollTo({ top, left: 0, behavior: "auto" });

      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        requestAnimationFrame(() => {
          if (hasSheet) setSheet(target, "to", true);
          const wait = hasSheet ? ANIM_MS : 180;
          unlockTimer = window.setTimeout(() => unlock(next), wait);
        });
      }, hasSheet ? 200 : 40);
    };

    const sheetBlocksPageSwipe = (
      sheet: HTMLElement,
      deltaY: number,
    ): boolean => {
      const overflow = sheet.scrollHeight - sheet.clientHeight;
      if (overflow < 48) return false;
      const atTop = sheet.scrollTop <= 1;
      const atBottom =
        sheet.scrollTop + sheet.clientHeight >= sheet.scrollHeight - 1;
      if (deltaY < 0 && !atTop) return true;
      if (deltaY > 0 && !atBottom) return true;
      return false;
    };

    const onWheel = (event: WheelEvent) => {
      if (reduce.matches) return;
      if (Math.abs(event.deltaY) < 6) return;

      const sheet = (event.target as HTMLElement | null)?.closest?.(
        ".slide-panel__sheet",
      ) as HTMLElement | null;
      if (sheet && sheetBlocksPageSwipe(sheet, event.deltaY)) return;

      event.preventDefault();
      if (animating) return;

      const synced = nearestIndex();
      if (Math.abs(synced - index) > 1) index = synced;

      goTo(index + (event.deltaY > 0 ? 1 : -1));
    };

    const onTouchStart = (event: TouchEvent) => {
      if (reduce.matches) return;
      touchActive = true;
      touchMoved = false;
      touchY = event.touches[0]?.clientY ?? 0;
      touchX = event.touches[0]?.clientX ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (reduce.matches || !touchActive) return;

      const y = event.touches[0]?.clientY ?? touchY;
      const x = event.touches[0]?.clientX ?? touchX;
      const deltaY = touchY - y;
      const deltaX = touchX - x;

      if (Math.abs(deltaY) < 10 && Math.abs(deltaX) < 10) return;
      touchMoved = true;

      const sheet = (event.target as HTMLElement | null)?.closest?.(
        ".slide-panel__sheet",
      ) as HTMLElement | null;
      if (sheet && sheetBlocksPageSwipe(sheet, deltaY)) return;

      if (Math.abs(deltaY) >= Math.abs(deltaX)) {
        event.preventDefault();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (reduce.matches) return;
      const wasActive = touchActive;
      touchActive = false;
      if (!wasActive || animating) return;

      const endY = event.changedTouches[0]?.clientY ?? touchY;
      const endX = event.changedTouches[0]?.clientX ?? touchX;
      const deltaY = touchY - endY;
      const deltaX = touchX - endX;

      if (!touchMoved) return;
      if (Math.abs(deltaY) < 40 || Math.abs(deltaY) < Math.abs(deltaX) * 1.05) {
        return;
      }

      const sheet = (event.target as HTMLElement | null)?.closest?.(
        ".slide-panel__sheet",
      ) as HTMLElement | null;
      if (sheet && sheetBlocksPageSwipe(sheet, deltaY)) return;

      const synced = nearestIndex();
      if (Math.abs(synced - index) > 1) index = synced;

      goTo(index + (deltaY > 0 ? 1 : -1));
    };

    const onKey = (event: KeyboardEvent) => {
      if (reduce.matches || animating) return;
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        goTo(index + 1);
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goTo(index - 1);
      }
    };

    const boot = () => {
      measure();
      index = nearestIndex();
      pages.forEach((page) => setSheet(page, "to", false));
      if (!reduce.matches) {
        document.documentElement.classList.add("page-snap-on");
      } else {
        document.documentElement.classList.remove("page-snap-on");
      }
    };

    const onReduce = () => {
      if (reduce.matches) {
        pages.forEach((page) => setSheet(page, "reset", false));
        animating = false;
        document.documentElement.classList.remove("page-snap-on");
      } else {
        boot();
      }
    };

    boot();
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", measure);
    reduce.addEventListener("change", onReduce);

    return () => {
      disposed = true;
      window.clearTimeout(unlockTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", measure);
      reduce.removeEventListener("change", onReduce);
      document.documentElement.classList.remove("page-snap-on");
      pages.forEach((page) => setSheet(page, "reset", false));
    };
  }, []);

  return null;
}
