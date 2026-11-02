"use client";

import {
  Compass,
  ClipboardList,
  Code2,
  ShieldCheck,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import onboarding from "@/data/onboarding.json";

const stepIcons: LucideIcon[] = [
  Compass,
  ClipboardList,
  Code2,
  ShieldCheck,
  Rocket,
];

export function OnboardingSteps() {
  return (
    <section id="about" className="premium-onboarding kota-band relative z-10">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kota-kicker">How we work</p>
          <h2 className="kota-display mt-3">Client onboarding process</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
            A calm, collaborative journey from first conversation to launch —
            designed for clarity, craft, and measurable outcomes.
          </p>
        </div>

        {/* Desktop / tablet: premium horizontal journey */}
        <div className="premium-onboarding__rail mt-14 hidden md:block">
          <div className="premium-onboarding__line" aria-hidden="true">
            <span className="premium-onboarding__pulse" />
          </div>

          <ol className="premium-onboarding__grid">
            {onboarding.map((step, index) => {
              const Icon = stepIcons[index] ?? Compass;
              return (
                <li key={step.step} className="premium-step">
                  <div className="premium-step__card">
                    <div className="premium-step__meta">
                      <span className="premium-step__num">
                        {String(step.step).padStart(2, "0")}
                      </span>
                      <span className="premium-step__icon" aria-hidden="true">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                    </div>
                    <h3 className="premium-step__title">{step.title}</h3>
                    <p className="premium-step__text">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile: premium stacked journey */}
        <ol className="premium-onboarding__mobile mt-12 space-y-4 md:hidden">
          {onboarding.map((step, index) => {
            const Icon = stepIcons[index] ?? Compass;
            const isLast = index === onboarding.length - 1;
            return (
              <li key={step.step} className="premium-step-mobile">
                {!isLast && (
                  <span className="premium-step-mobile__connector" aria-hidden />
                )}
                <div className="premium-step-mobile__badge">
                  <Icon className="h-4 w-4" strokeWidth={1.85} />
                </div>
                <article className="premium-step-mobile__card">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="premium-step__title">{step.title}</h3>
                    <span className="premium-step__num">
                      {String(step.step).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="premium-step__text mt-2">{step.description}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
