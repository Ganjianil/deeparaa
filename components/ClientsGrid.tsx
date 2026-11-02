"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Client = {
  id: string;
  name: string;
  initials: string;
  industry: string;
  logo?: string;
};

function ClientTile({ client }: { client: Client }) {
  return (
    <article className="premium-client-tile">
      <div className="premium-client-tile__inner">
        {client.logo ? (
          <Image
            src={client.logo}
            alt={client.name}
            width={180}
            height={90}
            className="premium-client-tile__logo"
            unoptimized
          />
        ) : (
          <div className="premium-client-tile__fallback">
            <span className="premium-client-tile__initials">
              {client.initials}
            </span>
          </div>
        )}
        <div className="premium-client-tile__meta">
          <p className="premium-client-tile__name">{client.name}</p>
          <p className="premium-client-tile__industry">{client.industry}</p>
        </div>
      </div>
    </article>
  );
}

export function ClientsGrid() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    let active = true;

    fetch("/api/clients")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load clients");
        return res.json();
      })
      .then((data: { clients: Client[] }) => {
        if (active) setClients(data.clients);
      })
      .catch((error) => {
        console.error("Unable to load clients:", error);
      });

    return () => {
      active = false;
    };
  }, []);

  const marqueeClients = [...clients, ...clients];

  return (
    <section id="clients" className="premium-clients kota-band relative z-10">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="kota-kicker">Trusted partnerships</p>
            <h2 className="kota-display mt-3">Our clients</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
              Brands that chose Deepara to build presence, performance, and
              long-term digital growth.
            </p>
          </div>
          <div className="premium-clients__stats">
            <div>
              <p className="premium-clients__stat-value">
                {clients.length || "—"}+
              </p>
              <p className="premium-clients__stat-label">Active partners</p>
            </div>
            <div>
              <p className="premium-clients__stat-value">12+</p>
              <p className="premium-clients__stat-label">Industries served</p>
            </div>
          </div>
        </div>
      </div>

      <div className="premium-clients__stage">
        {clients.length > 0 ? (
          <>
            <div className="premium-clients__fade premium-clients__fade--left" />
            <div className="premium-clients__fade premium-clients__fade--right" />

            <div className="client-marquee premium-clients__marquee">
              <div className="client-marquee-track client-marquee-left premium-clients__track">
                {marqueeClients.map((client, index) => (
                  <ClientTile
                    key={`left-${client.id}-${index}`}
                    client={client}
                  />
                ))}
              </div>
            </div>

            <div className="client-marquee premium-clients__marquee mt-5 md:mt-6">
              <div className="client-marquee-track client-marquee-right premium-clients__track">
                {[...marqueeClients].reverse().map((client, index) => (
                  <ClientTile
                    key={`right-${client.id}-${index}`}
                    client={client}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-40 items-center justify-center">
            <p className="text-sm text-neutral-500">Loading client logos...</p>
          </div>
        )}
      </div>
    </section>
  );
}
