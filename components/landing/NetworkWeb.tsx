"use client";

import {
  Code2,
  Monitor,
  Search,
  ShoppingCart,
  Smartphone,
  Sparkles,
  TrendingUp,
  Video,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

type NetworkPoint = {
  x: number;
  y: number;
  label: string;
  Icon: LucideIcon;
};

/**
 * Reference (ABDM) format: 8 primary icon+label nodes in a ring around center,
 * thin grey mesh lines, cursor becomes a temporary vertex (V / fan links).
 */
const CX = 720;
const CY = 360;
const RING_R = 265;

function ringPoint(index: number, total: number, radius = RING_R) {
  // Start near top-left, clockwise — matches ABDM octagon feel
  const angle = -Math.PI * 0.72 + (index / total) * Math.PI * 2;
  return {
    x: CX + Math.cos(angle) * radius,
    y: CY + Math.sin(angle) * radius,
  };
}

const nodeMeta: { label: string; Icon: LucideIcon }[] = [
  { label: "WEBSITE", Icon: Monitor },
  { label: "APPS", Icon: Smartphone },
  { label: "ECOMMERCE", Icon: ShoppingCart },
  { label: "SEO", Icon: Search },
  { label: "MARKETING", Icon: TrendingUp },
  { label: "SOFTWARE", Icon: Code2 },
  { label: "VIDEO", Icon: Video },
  { label: "GROWTH", Icon: Sparkles },
];

const points: NetworkPoint[] = nodeMeta.map((meta, index) => {
  const pos = ringPoint(index, nodeMeta.length);
  return { ...pos, ...meta };
});

/** Ring edges + spokes to center + every-second chords (ABDM mesh density) */
const staticEdges: [number, number][] = [];
for (let i = 0; i < points.length; i++) {
  staticEdges.push([i, (i + 1) % points.length]);
  staticEdges.push([i, (i + 2) % points.length]);
}

const travelRoute = [0, 1, 2, 3, 4, 5, 6, 7, 0] as const;
const TRAVEL_DURATION = 16;
const CURSOR_LINK_RADIUS = 280;
const MAX_CURSOR_LINKS_DESKTOP = 3;
const MAX_CURSOR_LINKS_MOBILE = 2;

export function NetworkWeb() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reactId = useId().replace(/:/g, "");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [activeHop, setActiveHop] = useState(0);
  const [cursor, setCursor] = useState({ x: CX, y: CY, active: false });

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
      return {
        x: ((clientX - rect.left) / Math.max(rect.width, 1)) * 1440,
        y: ((clientY - rect.top) / Math.max(rect.height, 1)) * 760,
      };
    };

    const onMove = (event: PointerEvent) => {
      setCursor({ ...toSvgPoint(event.clientX, event.clientY), active: true });
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

  const cursorLinks = useMemo(() => {
    if (!cursor.active) return [] as { index: number; dist: number }[];
    const maxLinks =
      typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
        ? MAX_CURSOR_LINKS_MOBILE
        : MAX_CURSOR_LINKS_DESKTOP;
    return points
      .map((point, index) => ({
        index,
        dist: Math.hypot(point.x - cursor.x, point.y - cursor.y),
      }))
      .filter((item) => item.dist <= CURSOR_LINK_RADIUS)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, maxLinks);
  }, [cursor]);

  const nearIndexes = useMemo(
    () => new Set(cursorLinks.map((item) => item.index)),
    [cursorLinks],
  );

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
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
            <stop offset="42%" stopColor="var(--accent)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Faint hub spokes — same ring→center format as reference */}
        <g className="network-web__spokes">
          {points.map((point, index) => (
            <path
              key={`spoke-${index}`}
              d={`M${CX} ${CY} L${point.x} ${point.y}`}
            />
          ))}
        </g>

        {cursor.active && !reduceMotion ? (
          <circle
            className="network-web__cursor-glow"
            cx={cursor.x}
            cy={cursor.y}
            r={160}
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

        {cursor.active && cursorLinks.length > 0 ? (
          <g className="network-web__cursor-links">
            {cursorLinks.map(({ index, dist }) => {
              const point = points[index];
              const strength = 1 - dist / CURSOR_LINK_RADIUS;
              return (
                <path
                  key={`cursor-link-${index}`}
                  className="network-web__cursor-link"
                  d={`M${point.x} ${point.y} L${cursor.x} ${cursor.y}`}
                  style={{ opacity: 0.4 + strength * 0.6 }}
                />
              );
            })}
            <circle
              className="network-web__cursor-node"
              cx={cursor.x}
              cy={cursor.y}
              r={4}
            />
          </g>
        ) : null}

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
            <circle className="network-web__particle" r="3.25">
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

        {/* Center hub (reference has emblem; we keep a quiet core) */}
        <circle className="network-web__hub" cx={CX} cy={CY} r={5} />

        <g>
          {points.map((point, index) => {
            const isLive = index === from || index === to;
            const isNear = nearIndexes.has(index);
            const lit = isLive || isNear;
            const Icon = point.Icon;
            return (
              <g
                key={point.label}
                className={`network-web__point${lit ? " network-web__point--live" : ""}`}
                transform={`translate(${point.x} ${point.y})`}
              >
                {lit ? (
                  <circle className="network-web__node-halo" cx={0} cy={0} r={28} />
                ) : null}
                <circle className="network-web__node-disc" cx={0} cy={0} r={18} />
                <foreignObject x={-11} y={-11} width={22} height={22}>
                  <div className="network-web__icon">
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                </foreignObject>
                <text className="network-web__label" x={0} y={34} textAnchor="middle">
                  {point.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
