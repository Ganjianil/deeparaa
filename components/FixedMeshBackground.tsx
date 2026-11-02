"use client";

import { useEffect, useRef } from "react";

type Blob = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
};

/**
 * KOTA-style fixed viewport mesh: soft color fields stay pinned while page content scrolls over them.
 */
export function FixedMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let scrollY = window.scrollY;
    let pointer = { x: 0.5, y: 0.35 };
    let running = true;

    const blobs: Blob[] = [
      { x: 0.18, y: 0.22, r: 0.42, vx: 0.00012, vy: 0.00008, color: "#7ee0d6" },
      { x: 0.78, y: 0.18, r: 0.38, vx: -0.0001, vy: 0.00011, color: "#d7a8ff" },
      { x: 0.55, y: 0.72, r: 0.48, vx: 0.00009, vy: -0.00007, color: "#ffb4a2" },
      { x: 0.28, y: 0.68, r: 0.34, vx: -0.00008, vy: -0.0001, color: "#ffe08a" },
      { x: 0.62, y: 0.42, r: 0.3, vx: 0.00007, vy: 0.00009, color: "#ffb4d9" },
    ];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      if (!running) return;

      const t = time * 0.001;
      const scrollPull = (scrollY / Math.max(height, 1)) * 0.04;

      ctx.fillStyle = "#efefef";
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "source-over";

      for (const blob of blobs) {
        if (!reduceMotion) {
          blob.x += blob.vx;
          blob.y += blob.vy;
          if (blob.x < 0.05 || blob.x > 0.95) blob.vx *= -1;
          if (blob.y < 0.05 || blob.y > 0.95) blob.vy *= -1;
        }

        const px =
          (blob.x + (pointer.x - 0.5) * 0.06 - scrollPull * 0.35) * width;
        const py =
          (blob.y +
            (pointer.y - 0.5) * 0.05 +
            Math.sin(t * 0.35 + blob.x * 8) * 0.012 +
            scrollPull) *
          height;
        const radius = blob.r * Math.max(width, height) * 0.55;

        const gradient = ctx.createRadialGradient(px, py, 0, px, py, radius);
        gradient.addColorStop(0, `${blob.color}cc`);
        gradient.addColorStop(0.45, `${blob.color}66`);
        gradient.addColorStop(1, `${blob.color}00`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Soft light wash like KOTA's blurred overlay feel
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      ctx.fillRect(0, 0, width, height);

      raf = window.requestAnimationFrame(draw);
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onPointer = (event: PointerEvent) => {
      pointer = {
        x: event.clientX / Math.max(width, 1),
        y: event.clientY / Math.max(height, 1),
      };
    };

    resize();
    draw(0);

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div className="webgl-mesh" aria-hidden="true">
      <canvas ref={canvasRef} className="webgl-mesh__canvas" />
      <div className="webgl-mesh__noise" />
      <div className="webgl-mesh__veil" />
    </div>
  );
}
