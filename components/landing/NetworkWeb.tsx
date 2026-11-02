"use client";

import { useEffect, useId, useMemo, useState } from "react";

type NetworkPoint = {
  x: number;
  y: number;
  label?: string;
  anchor?: "start" | "middle" | "end";
};

const points: NetworkPoint[] = [
  { x: 160, y: 180, label: "Website", anchor: "start" },
  { x: 420, y: 120, label: "Ecommerce", anchor: "start" },
  { x: 700, y: 150, label: "SEO", anchor: "middle" },
  { x: 980, y: 130, label: "Apps", anchor: "start" },
  { x: 1240, y: 260, label: "Ads", anchor: "end" },
  { x: 1180, y: 520, label: "Social", anchor: "end" },
  { x: 760, y: 620, label: "Growth", anchor: "middle" },
  { x: 320, y: 540 },
  { x: 540, y: 360 },
  { x: 880, y: 390 },
];

/** Quiet background links (no motion) */
const staticEdges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 0],
  [0, 8],
  [8, 2],
  [2, 9],
  [9, 4],
  [8, 9],
  [7, 6],
] as const;

/** Single travel route: one node → next → next … */
const travelRoute = [0, 1, 2, 3, 4, 5, 6, 7, 0] as const;
const TRAVEL_DURATION = 14;

export function NetworkWeb() {
  const reactId = useId().replace(/:/g, "");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [activeHop, setActiveHop] = useState(0);

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

  return (
    <div className="network-web" aria-hidden="true">
      <svg
        className="network-web__svg"
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <path id={pathId} d={travelPath} />
        </defs>

        {/* Static network lines */}
        <g className="network-web__lines">
          {staticEdges.map(([a, b]) => {
            const isActiveHop =
              (a === from && b === to) || (a === to && b === from);
            return (
              <path
                key={`${a}-${b}`}
                d={`M${points[a].x} ${points[a].y} L${points[b].x} ${points[b].y}`}
                className={isActiveHop ? "network-web__line--active" : undefined}
              />
            );
          })}
        </g>

        {!reduceMotion && (
          <g>
            {/* Only the current hop lights as a moving stroke */}
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
                values="0;1;1;0.35"
                keyTimes="0;0.08;0.85;1"
                dur={`${TRAVEL_DURATION / (travelRoute.length - 1)}s`}
                fill="freeze"
              />
            </path>

            {/* One particle traveling the full loop, node to node */}
            <circle className="network-web__particle" r="4">
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
            return (
              <g key={`${point.x}-${point.y}-${index}`}>
                <circle
                  className={`network-web__node${isLive ? " network-web__node--live" : ""}`}
                  cx={point.x}
                  cy={point.y}
                  r={point.label ? 5 : 3.5}
                />
                {point.label ? (
                  <text
                    className={`network-web__label${isLive ? " network-web__label--live" : ""}`}
                    x={point.x + (point.anchor === "end" ? -12 : point.anchor === "middle" ? 0 : 12)}
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
