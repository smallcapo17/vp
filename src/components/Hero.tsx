"use client";

import { useEffect, useState } from "react";
import { Fleur_De_Leah, Raleway, Cormorant_Garamond } from "next/font/google";

const fleur = Fleur_De_Leah({
  weight: "400",
  subsets: ["latin"],
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["italic"],
});

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

      {/* Marble background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/site-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Soft warm white veil — tones down the marble without darkening */}
      <div className="absolute inset-0" style={{
        background: 'rgba(255,252,245,0.45)',
      }} />

      {/* Subtle gold center bloom */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 48%, rgba(184,134,11,0.07) 0%, transparent 70%)',
      }} />

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 flex flex-col items-center"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}
      >
        {/* Eyebrow */}
        <p
          className={`${raleway.className} text-xs tracking-[0.6em] uppercase mb-8`}
          style={{
            color: '#9a7209',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 1.2s ease 0.2s',
          }}
        >
          Est. Los Angeles
        </p>

        {/* Top line */}
        <div style={{
          width: mounted ? '140px' : '0px',
          height: '1px',
          marginBottom: '2rem',
          background: 'linear-gradient(90deg, transparent, #b8860b, transparent)',
          transition: 'width 1.2s ease 0.3s',
        }} />

        {/* Title — deep espresso, bold enough to read on marble */}
        <h1
          className={`${fleur.className} text-gold-shiny leading-none`}
          style={{
            fontSize: 'clamp(4.5rem, 12vw, 10rem)',
            textShadow: '0 2px 16px rgba(184,134,11,0.2)',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 1s ease 0.15s, transform 1s ease 0.15s',
          }}
        >
          Victorious Productions
        </h1>

        {/* Bottom line */}
        <div style={{
          width: mounted ? '140px' : '0px',
          height: '1px',
          marginTop: '2rem',
          marginBottom: '1.75rem',
          background: 'linear-gradient(90deg, transparent, #b8860b, transparent)',
          transition: 'width 1.2s ease 0.5s',
        }} />

        {/* Tagline */}
        <p
          className={`${cormorant.className} text-2xl md:text-3xl font-light italic`}
          style={{
            color: '#6b3f00',
            letterSpacing: '0.06em',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 1.2s ease 0.55s, transform 1.2s ease 0.55s',
          }}
        >
          Live experiences. Visual storytelling. Cultural moments.
        </p>

        {/* Scroll indicator */}
        <div
          className="mt-20 flex flex-col items-center gap-3"
          style={{
            opacity: mounted ? 0.8 : 0,
            transition: 'opacity 2s ease 1s',
          }}
        >
          <p className={`${raleway.className} text-xs tracking-[0.45em] uppercase`}
            style={{ color: 'rgba(139,101,8,0.5)' }}>
            Scroll
          </p>
          <div className="w-px h-10" style={{
            background: 'linear-gradient(to bottom, #b8860b, transparent)',
          }} />
        </div>
      </div>
    </section>
  );
}