"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NetworkWeb } from "@/components/landing/NetworkWeb";
import { SplitFlapBoard } from "@/components/landing/SplitFlapBoard";

const goalCards = [
  {
    intent: "I need a website",
    short: "Web",
    href: "/website-design",
  },
  {
    intent: "I want to grow online",
    short: "Marketing",
    href: "/services/digital-marketing",
  },
  {
    intent: "I need software or an app",
    short: "Build",
    href: "/services/software-development",
  },
];

export function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="landing-hero"
    >
      <NetworkWeb />

      <div className="landing-hero__copy">
        <p className="landing-hero__board">
          <span className="landing-hero__mark" aria-hidden="true">
            D
          </span>
          <SplitFlapBoard
            text="DEEPARA SOLUTIONS"
            reduceMotion={reduceMotion}
          />
        </p>

        <h1 id="home-title" className="landing-hero__statement">
          Build what your business needs next
        </h1>

        <p className="landing-hero__lede">
          Practical digital services to help your business get online, reach
          more customers, and work smarter. Secure. Clear. Built to last.
        </p>
      </div>

      <div className="landing-hero__goals">
        <p className="landing-hero__goals-prompt">
          What do you want to solve today?
        </p>
        <nav
          aria-label="Choose a digital service"
          className="landing-hero__goals-list"
        >
          {goalCards.map((card) => (
            <Link key={card.href} href={card.href} className="landing-hero__goal">
              <span className="landing-hero__goal-intent">{card.intent}</span>
              <span className="landing-hero__goal-short">{card.short}</span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
