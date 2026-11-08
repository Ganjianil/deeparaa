"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

type NetworkPoint = {
  x: number;
  y: number;
  label?: string;
  anchor?: "start" | "middle" | "end";
};

/** ABDM-style constellation — labels map to Deepara services */
const points: NetworkPoint[] = [
  { x: 120, y: 160, label: "Website", anchor: "start" },
  { x: 310, y: 90, label: "Brand", anchor: "middle" },
  { x: 520, y: 140, label: "Ecommerce", anchor: "start" },
  { x: 760, y: 100, label: "SEO", anchor: "middle" },
  { x: 980, y: 150, label: "AEO", anchor: "middle" },
  { x: 1200, y: 120, label: "Apps", anchor: "end" },
  { x: 1320, y: 280, label: "Mobile", anchor: "end" },
  { x: 1260, y: 460, label: "Software", anchor: "end" },
  { x: 1100, y: 600, label: "Ads", anchor: "end" },
  { x: 820, y: 660, label: "YouTube", anchor: "middle" },
  { x: 540, y: 640, label: "Social", anchor: "middle" },
  { x: 280, y: 580, label: "Growth", anchor: "start" },
  { x: 140, y: 400, label: "Video", anchor: "start" },
  { x: 360, y: 300 },
  { x: 600, y: 280 },
  { x: 860, y: 320 },
  { x: 1040, y: 380 },
  { x: 700, y: 480 },
  { x: 460, y: 450 },
  { x: 240, y: 260 },
];

const staticEdges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [12, 0],
  [0, 19],
  [19, 13],
  [13, 2],
  [2, 14],
  [14, 3],
  [3, 15],
  [15, 4],
  [4, 16],
  [16, 6],
  [16, 7],
  [15, 17],
  [17, 9],
  [14, 18],
  [18, 11],
  [13, 18],
  [18, 17],
  [12, 19],
  [1, 19],
  [10, 17],
] as const;

const travelRoute = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0] as const;
const TRAVEL_DURATION = 18;
const HOVER_RADIUS = 120;

export function NetworkWeb() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reactId = useId().replace(/:/g, "");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [activeHop, setActiveHop] = useState(0);
  const [cursor, setCursor] = useState({ x: 720, y: 380, active: false });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const hopMs = (TRAVEL_DURATION / (travelRoute.length - 1)) * 1000;
    const id = window.setInterval(() => {
      setActiveHop((prev) => (prev + 1) % (travelRoute.length - 1));
    }, hopMs);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    const host = wrapRef.current?.closest(".landing-hero") ?? wrapRef.current;
    if (!host) return;

    const toSvgPoint = (clientX: number, clientY: number) => {
      const rect = host.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 1440;
      const y = ((clientY - rect.top) / rect.height) * 760;
      return { x, y };
    };

    const onMove = (event: PointerEvent) => {
      const next = toSvgPoint(event.clientX, event.clientY);
      setCursor({ ...next, active: true });
    };
    const onLeave = () => setCursor((prev) => ({ ...prev, active: false }));

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const travelPath = useMemo(
    () =>
      travelRoute
        .map((idx, i) => {
          const p = points[idx];
          return `${i === 0 ? "M" : "L"}${p.x} ${p.y}`;
        })
        .join(" "),
    [],
  );

  const from = travelRoute[activeHop];
  const to = travelRoute[activeHop + 1];
  const hopPath = `M${points[from].x} ${points[from].y} L${points[to].x} ${points[to].y}`;
  const pathId = `network-travel-${reactId}`;
  const glowId = `network-glow-${reactId}`;

  const nearIndexes = useMemo(() => {
    if (!cursor.active) return new Set<number>();
    const set = new Set<number>();
    points.forEach((point, index) => {
      const dx = point.x - cursor.x;
      const dy = point.y - cursor.y;
      if (Math.hypot(dx, dy) <= HOVER_RADIUS) set.add(index);
    });
    return set;
  }, [cursor]);

  return (
    <div ref={wrapRef} className="network-web" aria-hidden="true">
      <svg
        className="network-web__svg"
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <path id={pathId} d={travelPath} />
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="45%" stopColor="var(--accent)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft cursor aura — matches ABDM pointer glow */}
        {cursor.active && !reduceMotion ? (
          <circle
            className="network-web__cursor-glow"
            cx={cursor.x}
            cy={cursor.y}
            r={150}
            fill={`url(#${glowId})`}
          />
        ) : null}

        <g className="network-web__lines">
          {staticEdges.map(([a, b]) => {
            const isActiveHop =
              (a === from && b === to) || (a === to && b === from);
            const isNear = nearIndexes.has(a) || nearIndexes.has(b);
            return (
              <path
                key={`${a}-${b}`}
                d={`M${points[a].x} ${points[a].y} L${points[b].x} ${points[b].y}`}
                className={
                  isActiveHop || isNear
                    ? "network-web__line--active"
                    : undefined
                }
              />
            );
          })}
        </g>

        {!reduceMotion && (
          <g>
            <path
              key={`hop-${activeHop}`}
              className="network-web__flow"
              d={hopPath}
              pathLength={1}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="1"
                to="0"
                dur={`${TRAVEL_DURATION / (travelRoute.length - 1)}s`}
                fill="freeze"
              />
              <animate
                attributeName="stroke-opacity"
                values="0;1;1;0.25"
                keyTimes="0;0.08;0.85;1"
                dur={`${TRAVEL_DURATION / (travelRoute.length - 1)}s`}
                fill="freeze"
              />
            </path>

            <circle className="network-web__particle" r="3.5">
              <animateMotion
                dur={`${TRAVEL_DURATION}s`}
                repeatCount="indefinite"
                rotate="auto"
              >
                <mpath href={`#${pathId}`} />
              </animateMotion>
            </circle>
          </g>
        )}

        <g>
          {points.map((point, index) => {
            const isLive = index === from || index === to;
            const isNear = nearIndexes.has(index);
            const lit = isLive || isNear;
            return (
              <g key={`${point.x}-${point.y}-${index}`}>
                {lit ? (
                  <circle
                    className="network-web__node-halo"
                    cx={point.x}
                    cy={point.y}
                    r={point.label ? 16 : 12}
                  />
                ) : null}
                <circle
                  className={`network-web__node${lit ? " network-web__node--live" : ""}`}
                  cx={point.x}
                  cy={point.y}
                  r={point.label ? 5 : 3.25}
                />
                {point.label ? (
                  <text
                    className={`network-web__label${lit ? " network-web__label--live" : ""}`}
                    x={
                      point.x +
                      (point.anchor === "end"
                        ? -12
                        : point.anchor === "middle"
                          ? 0
                          : 12)
                    }
                    y={point.y - 14}
                    textAnchor={point.anchor ?? "middle"}
                  >
                    {point.label}
                  </text>
                ) : null}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
