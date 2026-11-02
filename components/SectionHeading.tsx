type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass} mb-12 md:mb-16`}>
      {eyebrow && (
        <p
          className="section-eyebrow mb-3"
          style={dark ? { color: "var(--brand-300)" } : undefined}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="font-serif text-3xl tracking-tight md:text-4xl lg:text-[2.5rem]"
        style={{
          color: dark ? "#fff" : "var(--text-heading)",
          fontWeight: 400,
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-4 text-lg leading-relaxed"
          style={{
            color: dark ? "rgba(255,255,255,0.72)" : "var(--text-muted)",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
