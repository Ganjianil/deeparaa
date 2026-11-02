"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import testimonials from "@/data/testimonials.json";

export function SuccessStories() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;
  const t = testimonials[active];

  const goPrev = useCallback(() => {
    setActive((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  const initials = t.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <section
      className="premium-stories slide-panel"
      style={{ ["--slide-z" as string]: 9 }}
      aria-labelledby="success-stories-title"
    >
      <div className="premium-stories__glow" aria-hidden="true" />
      <div className="premium-stories__grain" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="premium-stories__kicker">Success Stories</p>
          <h2 id="success-stories-title" className="premium-stories__title">
            Voices from the work
          </h2>
          <p className="premium-stories__lead">
            Real partnerships. Clear outcomes. Words from teams who trusted us
            with their digital growth.
          </p>
        </div>

        <div className="premium-stories__stage">
          <div className="premium-stories__quote-mark" aria-hidden="true">
            <Quote className="h-8 w-8 md:h-10 md:w-10" strokeWidth={1.4} />
          </div>

          <blockquote key={t.id} className="premium-stories__quote">
            <p>&ldquo;{t.quote}&rdquo;</p>
          </blockquote>

          <div className="premium-stories__person">
            <span className="premium-stories__avatar" aria-hidden="true">
              {initials}
            </span>
            <div>
              <cite className="premium-stories__name">{t.name}</cite>
              <p className="premium-stories__role">
                {t.role} · {t.company}
              </p>
            </div>
          </div>

          <div className="premium-stories__controls">
            <button
              type="button"
              className="premium-stories__nav"
              onClick={goPrev}
              aria-label="Previous story"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
            </button>

            <div className="premium-stories__progress" aria-hidden="true">
              <span
                className="premium-stories__progress-bar"
                style={{ width: `${((active + 1) / total) * 100}%` }}
              />
            </div>

            <span className="premium-stories__count">
              {String(active + 1).padStart(2, "0")}
              <span>/</span>
              {String(total).padStart(2, "0")}
            </span>

            <button
              type="button"
              className="premium-stories__nav"
              onClick={goNext}
              aria-label="Next story"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Desktop secondary cards */}
        <div className="premium-stories__grid">
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`premium-stories__card${
                index === active ? " is-active" : ""
              }`}
              onClick={() => setActive(index)}
              aria-current={index === active ? "true" : undefined}
            >
              <p className="premium-stories__card-quote">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="premium-stories__card-meta">
                <span className="premium-stories__card-name">{item.name}</span>
                <span className="premium-stories__card-company">
                  {item.company}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Mobile company pills */}
        <div className="premium-stories__pills" role="tablist" aria-label="Stories">
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              className={`premium-stories__pill${
                index === active ? " is-active" : ""
              }`}
              onClick={() => setActive(index)}
            >
              {item.company}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
