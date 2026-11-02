"use client";

type MeshBackdropProps = {
  className?: string;
  intensity?: "soft" | "vivid";
};

export function MeshBackdrop({
  className = "",
  intensity = "soft",
}: MeshBackdropProps) {
  return (
    <div
      className={`mesh-backdrop ${intensity === "vivid" ? "mesh-backdrop--vivid" : ""} ${className}`}
      aria-hidden="true"
    >
      <span className="mesh-backdrop__blob mesh-backdrop__blob--a" />
      <span className="mesh-backdrop__blob mesh-backdrop__blob--b" />
      <span className="mesh-backdrop__blob mesh-backdrop__blob--c" />
      <span className="mesh-backdrop__blob mesh-backdrop__blob--d" />
      <span className="mesh-backdrop__grain" />
    </div>
  );
}
