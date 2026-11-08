"use client";

import { useEffect } from "react";

const ANIM_MS = 950;
/** Absorb leftover trackpad / touch inertia after a flip finishes. */
const COOLDOWN_MS = 380;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/** Reliable document Y for sticky / transformed ancestors. */
function layoutTop(el: HTMLElement) {
  return el.getBoundingClientRect().top + window.scrollY;
}

/**
 * Full-page snap on ALL devices.
 * Bottom-right corner flip on every page change (down and up).
 * Upward flips boost the target above stacked sticky panels to avoid overlap.
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

    /** Which page owns the viewport center — works for both up and down. */
    const nearestIndex = () => {
      if (!tops.length) return 0;
      const mid = window.scrollY + window.innerHeight * 0.42;
      let best = 0;
      for (let i = 0; i < tops.length; i++) {
        const start = tops[i];
        const end =
          i + 1 < tops.length
            ? tops[i + 1]
            : start + window.innerHeight;
        if (mid >= start && mid < end) return i;
        if (start <= mid) best = i;
      }
      return best;
    };

    const sheetOf = (page: HTMLElement) =>
      page.querySelector<HTMLElement>(".slide-panel__sheet");

    const clearFlipClasses = (sheet: HTMLElement | null) => {
      if (!sheet) return;
      sheet.classList.remove("is-flip-from", "is-flip-in", "is-flip-ready");
    };

    const clearStackOverrides = () => {
      pages.forEach((page) => {
        page.classList.remove("is-snap-active", "is-snap-behind");
        page.style.removeProperty("z-index");
      });
    };

    /**
     * Sticky slides stack by z-index — later pages cover earlier ones.
     * When flipping up, hide pages below the target and raise the target.
     */
    const applyStackFor = (active: number) => {
      pages.forEach((page, i) => {
        page.classList.remove("is-snap-active", "is-snap-behind");
        if (i === active) {
          page.classList.add("is-snap-active");
          page.style.zIndex = "80";
        } else if (i > active) {
          page.classList.add("is-snap-behind");
          page.style.zIndex = "0";
        } else {
          page.style.zIndex = String(10 + i);
        }
      });
    };

    const settleAll = () => {
      pages.forEach((page) => {
        const sheet = sheetOf(page);
        clearFlipClasses(sheet);
        sheet?.classList.add("is-flip-in");
      });
      applyStackFor(index);
    };

    const locked = () => animating || performance.now() < cooldownUntil;

    const unlock = (nextIndex: number) => {
      animating = false;
      index = nextIndex;
      cooldownUntil = performance.now() + COOLDOWN_MS;
      window.clearTimeout(unlockTimer);
      applyStackFor(index);
      // Re-measure after layout settles (sticky tops can shift)
      requestAnimationFrame(() => {
        if (!disposed) measure();
      });
    };

    const goTo = (next: number) => {
      if (disposed || reduce.matches) return;

      measure();
      if (!pages.length) return;

      next = clamp(next, 0, pages.length - 1);
      if (next === index) {
        animating = false;
        applyStackFor(index);
        return;
      }

      if (animating) return;

      animating = true;
      const target = pages[next];
      const top = Math.max(0, tops[next] ?? layoutTop(target));
      const sheet = sheetOf(target);

      // Bring target above stacked stickies BEFORE scrolling (critical for up)
      applyStackFor(next);

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
            unlockTimer = window.setTimeout(() => unlock(next), 100);
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
      measure();
      const synced = nearestIndex();
      // Prefer sync when user drifted, but don't skip a page on intentional step
      if (Math.abs(synced - index) >= 1) index = synced;
      goTo(index + dir);
    };

    const onWheel = (event: WheelEvent) => {
      if (reduce.matches || disposed) return;
      if (Math.abs(event.deltaY) < 8) return;

      const target = event.target as HTMLElement | null;
      if (target?.closest?.("a, button, input, textarea, select")) return;

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

      if (Math.abs(deltaY) < 5 && Math.abs(deltaX) < 5) return;
      touchMoved = true;

      // Lock vertical native scroll so sticky stack can't fight the snap
      if (Math.abs(deltaY) >= Math.abs(deltaX) * 0.85) {
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
      // Slightly easier upward swipe (finger moves down → go up a page)
      const threshold = deltaY < 0 ? 22 : 28;
      if (Math.abs(deltaY) < threshold || Math.abs(deltaY) < Math.abs(deltaX)) {
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
        clearStackOverrides();
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
      clearStackOverrides();
      pages.forEach((page) => clearFlipClasses(sheetOf(page)));
    };
  }, []);

  return null;
}
