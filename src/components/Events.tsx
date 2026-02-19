"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getEvents, Event } from "../lib/getEvents";
import { Cormorant_Garamond, Raleway } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    getEvents().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="w-full py-24 flex items-center justify-center">
        <p className={`${raleway.className} text-sm tracking-[0.3em] uppercase text-gold-mid animate-pulse`}>
          Loading Events...
        </p>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="w-full py-24 flex items-center justify-center">
        <p className={`${raleway.className} text-sm tracking-[0.3em] uppercase text-gray-500`}>
          No Upcoming Events
        </p>
      </section>
    );
  }

  return (
    <section className="w-full py-24">
      <div className="max-w-5xl mx-auto px-8">

        {/* Section Header */}
        <div className="mb-16 flex items-end gap-6">
          <div>
            <p className={`${raleway.className} text-sm tracking-[0.4em] uppercase mb-3`}
              style={{ color: '#9a7209' }}>
              Calendar
            </p>
            <h2 className={`${cormorant.className} text-6xl md:text-5xl font-light italic`}
              style={{ color: '#1a0a00', filter: 'drop-shadow(0 2px 8px rgba(100,70,0,0.1))' }}>
              Upcoming Events
            </h2>
          </div>
          <div className="flex-1 h-px mb-4" style={{ background: 'linear-gradient(90deg, rgba(100,70,0,0.3), transparent)' }} />
        </div>

        {/* Events List */}
        <ul className="space-y-0">
          {events.map((event, index) => (
            <li
              key={event.slug}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
              <Link
                href={`/events/${event.slug}`}
                className="group flex items-start gap-8 py-8 relative overflow-hidden"
                style={{ borderBottom: '1px solid rgba(100,70,0,0.15)' }}
              >
                {/* Hover background */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, rgba(155,114,9,0.06) 0%, transparent 100%)',
                    opacity: hoveredIndex === index ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                  }}
                />

                {/* Index number */}
                <span
                  className={`${cormorant.className} text-6xl font-light shrink-0 w-14 text-right leading-none`}
                  style={{
                    color: hoveredIndex === index ? '#8b6508' : 'rgba(100,70,0,0.4)',
                    transition: 'color 0.4s ease',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <h3
                      className={`${cormorant.className} text-4xl md:text-3xl font-medium`}
                      style={{
                        color: hoveredIndex === index ? '#6b3f00' : '#1a0a00',
                        transition: 'color 0.4s ease',
                      }}
                    >
                      {event.title}
                    </h3>
                    <p className={`${raleway.className} text-sm font-semibold tracking-[0.25em] uppercase shrink-0`}
                      style={{ color: 'rgba(100,70,0,0.75)' }}>
                      {new Date(event.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <span
                    className={`${raleway.className} text-md font-semibold tracking-[0.3em] uppercase mt-4 inline-flex items-center gap-2`}
                    style={{
                      color: hoveredIndex === index ? '#8b6508' : 'rgba(100,70,0,0.5)',
                      transition: 'all 0.4s ease',
                      transform: hoveredIndex === index ? 'translateX(6px)' : 'translateX(0)',
                    }}
                  >
                    View Details
                    <span style={{
                      transform: hoveredIndex === index ? 'translateX(4px)' : 'translateX(0)',
                      transition: 'transform 0.4s ease',
                    }}>→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}