"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import faq from "@/data/faq.json";

type FAQProps = {
  ids?: string[];
  limit?: number;
};

export function FAQ({ ids, limit }: FAQProps) {
  const items = faq
    .filter((item) => (ids ? ids.includes(item.id) : true))
    .slice(0, limit ?? faq.length);

  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();

  return (
    <section id="faq" className="premium-faq kota-band relative z-10">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="premium-faq__shell">
          <div className="premium-faq__intro">
            <p className="kota-kicker">FAQ</p>
            <h2 className="kota-display mt-3">Answers, refined</h2>
            <p className="premium-faq__lead">
              Clear guidance on how we partner, deliver, and stay accountable —
              so you always know what comes next.
            </p>
            <div className="premium-faq__stats" aria-hidden="true">
              <div className="premium-faq__stat">
                <span className="premium-faq__stat-value">{items.length}</span>
                <span className="premium-faq__stat-label">Key topics</span>
              </div>
              <div className="premium-faq__stat">
                <span className="premium-faq__stat-value">24h</span>
                <span className="premium-faq__stat-label">Avg. reply</span>
              </div>
            </div>
          </div>

          <div className="premium-faq__list" role="list">
            {items.map((item, index) => {
              const isOpen = openId === item.id;
              const panelId = `${baseId}-panel-${item.id}`;
              const buttonId = `${baseId}-button-${item.id}`;

              return (
                <div
                  key={item.id}
                  role="listitem"
                  className={`premium-faq__item${isOpen ? " is-open" : ""}`}
                >
                  <button
                    type="button"
                    id={buttonId}
                    className="premium-faq__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    <span className="premium-faq__index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="premium-faq__question">{item.question}</span>
                    <span className="premium-faq__icon" aria-hidden="true">
                      {isOpen ? (
                        <Minus className="h-4 w-4" strokeWidth={2.2} />
                      ) : (
                        <Plus className="h-4 w-4" strokeWidth={2.2} />
                      )}
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="premium-faq__panel"
                    hidden={!isOpen}
                  >
                    <p className="premium-faq__answer">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
