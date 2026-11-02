import {
  LayoutDashboard,
  Megaphone,
  Smartphone,
  ShoppingCart,
  Video,
  Code2,
  Search,
  Globe2,
  PlayCircle,
  MonitorPlay,
  BrainCircuit,
  MousePointerClick,
} from "lucide-react";

type ServiceIconProps = {
  name: string;
  className?: string;
};

const iconStyles = {
  layout: {
    Icon: LayoutDashboard,
    color: "#3B82F6",
    second: "#06B6D4",
    bg: "from-blue-100 via-sky-50 to-cyan-100",
    glow: "group-hover:shadow-blue-500/30",
  },
  megaphone: {
    Icon: Megaphone,
    color: "#F97316",
    second: "#EC4899",
    bg: "from-orange-100 via-rose-50 to-pink-100",
    glow: "group-hover:shadow-pink-500/30",
  },
  smartphone: {
    Icon: Smartphone,
    color: "#8B5CF6",
    second: "#D946EF",
    bg: "from-violet-100 via-purple-50 to-fuchsia-100",
    glow: "group-hover:shadow-violet-500/30",
  },
  cart: {
    Icon: ShoppingCart,
    color: "#10B981",
    second: "#06B6D4",
    bg: "from-emerald-100 via-teal-50 to-cyan-100",
    glow: "group-hover:shadow-emerald-500/30",
  },
  video: {
    Icon: Video,
    color: "#F43F5E",
    second: "#A855F7",
    bg: "from-rose-100 via-pink-50 to-purple-100",
    glow: "group-hover:shadow-rose-500/30",
  },
  code: {
    Icon: Code2,
    color: "#6366F1",
    second: "#06B6D4",
    bg: "from-indigo-100 via-blue-50 to-cyan-100",
    glow: "group-hover:shadow-indigo-500/30",
  },
  search: {
    Icon: Search,
    color: "#16A34A",
    second: "#84CC16",
    bg: "from-green-100 via-lime-50 to-emerald-100",
    glow: "group-hover:shadow-green-500/30",
  },
  globe: {
    Icon: Globe2,
    color: "#0284C7",
    second: "#6366F1",
    bg: "from-sky-100 via-blue-50 to-indigo-100",
    glow: "group-hover:shadow-sky-500/30",
  },
  youtube: {
    Icon: PlayCircle,
    color: "#EF4444",
    second: "#F97316",
    bg: "from-red-100 via-orange-50 to-rose-100",
    glow: "group-hover:shadow-red-500/30",
  },
  "monitor-play": {
    Icon: MonitorPlay,
    color: "#DB2777",
    second: "#8B5CF6",
    bg: "from-pink-100 via-fuchsia-50 to-violet-100",
    glow: "group-hover:shadow-pink-500/30",
  },
  "brain-circuit": {
    Icon: BrainCircuit,
    color: "#9333EA",
    second: "#6366F1",
    bg: "from-purple-100 via-violet-50 to-indigo-100",
    glow: "group-hover:shadow-purple-500/30",
  },
  "mouse-pointer-click": {
    Icon: MousePointerClick,
    color: "#D97706",
    second: "#F43F5E",
    bg: "from-amber-100 via-orange-50 to-rose-100",
    glow: "group-hover:shadow-amber-500/30",
  },
};

export function ServiceIcon({ name, className = "h-7 w-7" }: ServiceIconProps) {
  const config =
    iconStyles[name as keyof typeof iconStyles] ?? iconStyles.layout;

  const Icon = config.Icon;
  const gradientId = `service-${name.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <span
      className={`
        group/icon relative isolate inline-flex shrink-0
        items-center justify-center overflow-hidden
        rounded-2xl border border-white/80
        bg-gradient-to-br ${config.bg}
        p-3.5 shadow-sm
        transition-all duration-300 ease-out
        group-hover:-translate-y-1.5
        group-hover:scale-105
        group-hover:shadow-xl ${config.glow}
      `}
    >
      {/* Soft decorative glow */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-4 -top-4
          h-12 w-12 rounded-full bg-white/70 blur-xl
          transition-all duration-500
          group-hover/icon:scale-150
        "
      />

      {/* Gradient icon stroke */}
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={config.color} />
            <stop offset="100%" stopColor={config.second} />
          </linearGradient>
        </defs>
      </svg>

      <Icon
        className={`
          ${className}
          relative z-10
          transition-transform duration-300
          group-hover/icon:rotate-[-4deg]
          group-hover/icon:scale-110
        `}
        stroke={`url(#${gradientId})`}
        strokeWidth={1.9}
        aria-hidden="true"
      />

      {/* Glass border */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          rounded-2xl ring-1 ring-inset ring-white/70
        "
      />
    </span>
  );
}
