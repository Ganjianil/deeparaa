"use client";

import { useEffect } from "react";

const ANIM_MS = 950;
/** Absorb leftover trackpad wheel ticks after a flip finishes. */
const COOLDOWN_MS = 420;

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
 * Full-page snap on ALL devices.
 * Bottom-right corner flip on every page change (down and up).
 * One gesture → one page (no double-flip from trackpad wheel bursts).
 */
export function MobilePageSnap() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let pages: HTMLElement[] = [];
    let tops: number[] = [];
    let index = 0;
    let animating = false;
    let cooldownUntil = 0;
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
      const y = window.scrollY + window.innerHeight * 0.25;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < tops.length; i++) {
        const dist = Math.abs(tops[i] - (window.scrollY + 1));
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
        if (tops[i] <= y) best = i;
      }
      return best;
    };

    const sheetOf = (page: HTMLElement) =>
      page.querySelector<HTMLElement>(".slide-panel__sheet");

    const clearFlipClasses = (sheet: HTMLElement | null) => {
      if (!sheet) return;
      sheet.classList.remove("is-flip-from", "is-flip-in", "is-flip-ready");
    };

    const settleAll = () => {
      pages.forEach((page) => {
        const sheet = sheetOf(page);
        clearFlipClasses(sheet);
        sheet?.classList.add("is-flip-in");
      });
    };

    const locked = () => animating || performance.now() < cooldownUntil;

    const unlock = (nextIndex: number) => {
      animating = false;
      index = nextIndex;
      cooldownUntil = performance.now() + COOLDOWN_MS;
      window.clearTimeout(unlockTimer);
    };

    const goTo = (next: number) => {
      if (disposed || reduce.matches) return;

      measure();
      if (!pages.length) return;

      next = clamp(next, 0, pages.length - 1);
      if (next === index) {
        animating = false;
        return;
      }

      if (animating) return;

      animating = true;
      const target = pages[next];
      const top = Math.max(0, tops[next] ?? layoutTop(target));
      const sheet = sheetOf(target);

      pages.forEach((page) => {
        if (page === target) return;
        const other = sheetOf(page);
        clearFlipClasses(other);
        other?.classList.add("is-flip-in");
      });

      if (sheet) {
        clearFlipClasses(sheet);
        sheet.classList.add("is-flip-ready", "is-flip-from");
        void sheet.offsetWidth;
      }

      window.scrollTo({ top, left: 0, behavior: "auto" });

      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        requestAnimationFrame(() => {
          if (!sheet) {
            unlockTimer = window.setTimeout(() => unlock(next), 120);
            return;
          }

          sheet.classList.remove("is-flip-ready", "is-flip-from");
          sheet.classList.add("is-flip-in");

          let finished = false;
          const finish = () => {
            if (finished) return;
            finished = true;
            sheet.removeEventListener("transitionend", onEnd);
            unlock(next);
          };

          const onEnd = (event: TransitionEvent) => {
            if (
              event.propertyName !== "transform" &&
              event.propertyName !== "-webkit-transform"
            ) {
              return;
            }
            finish();
          };

          sheet.addEventListener("transitionend", onEnd);
          unlockTimer = window.setTimeout(finish, ANIM_MS + 80);
        });
      }, 32);
    };

    const step = (dir: 1 | -1) => {
      if (locked()) return;
      const synced = nearestIndex();
      if (Math.abs(synced - index) >= 1) index = synced;
      goTo(index + dir);
    };

    const onWheel = (event: WheelEvent) => {
      if (reduce.matches || disposed) return;
      if (Math.abs(event.deltaY) < 8) return;

      // Don't trap wheel while user interacts with links/buttons
      const target = event.target as HTMLElement | null;
      if (target?.closest?.("a, button, input, textarea, select")) return;

      // Always consume wheel so native scroll can't fight the snap
      event.preventDefault();
      if (locked()) return;

      step(event.deltaY > 0 ? 1 : -1);
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

      if (Math.abs(deltaY) < 6 && Math.abs(deltaX) < 6) return;
      touchMoved = true;

      if (Math.abs(deltaY) >= Math.abs(deltaX)) {
        event.preventDefault();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (reduce.matches) return;
      const wasActive = touchActive;
      touchActive = false;
      if (!wasActive) return;
      if (locked()) return;

      const endY = event.changedTouches[0]?.clientY ?? touchY;
      const endX = event.changedTouches[0]?.clientX ?? touchX;
      const deltaY = touchY - endY;
      const deltaX = touchX - endX;

      if (!touchMoved) return;
      if (Math.abs(deltaY) < 28 || Math.abs(deltaY) < Math.abs(deltaX) * 1.05) {
        return;
      }

      step(deltaY > 0 ? 1 : -1);
    };

    const onKey = (event: KeyboardEvent) => {
      if (reduce.matches) return;
      if (locked()) {
        if (
          event.key === "ArrowDown" ||
          event.key === "PageDown" ||
          event.key === "ArrowUp" ||
          event.key === "PageUp"
        ) {
          event.preventDefault();
        }
        return;
      }
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        step(1);
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        step(-1);
      }
    };

    const boot = () => {
      measure();
      index = nearestIndex();
      settleAll();
      if (!reduce.matches) {
        document.documentElement.classList.add("page-snap-on");
      } else {
        document.documentElement.classList.remove("page-snap-on");
      }
    };

    const onReduce = () => {
      if (reduce.matches) {
        pages.forEach((page) => clearFlipClasses(sheetOf(page)));
        animating = false;
        cooldownUntil = 0;
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
    window.visualViewport?.addEventListener("resize", measure);
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
      window.visualViewport?.removeEventListener("resize", measure);
      reduce.removeEventListener("change", onReduce);
      document.documentElement.classList.remove("page-snap-on");
      pages.forEach((page) => clearFlipClasses(sheetOf(page)));
    };
  }, []);

  return null;
}
