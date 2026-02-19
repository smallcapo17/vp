"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const links = [
  { label: "Videos", href: "#videos" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  function handleNav(href: string) {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 35;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveLink(href);
  }

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50"
      style={{
        background: 'rgba(10, 4, 0, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(139,101,8,0.25)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(139,101,8,0.15)',
      }}
    >
      {/* Ultra-thin gold top accent line */}
      <div className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #8b6508 30%, #f5c842 50%, #8b6508 70%, transparent 100%)' }}
      />

      <div className="w-full flex justify-between items-center h-20 px-12">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative transition-all duration-300"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(139,101,8,0.0))' }}
            onMouseEnter={e => (e.currentTarget.style.filter = 'drop-shadow(0 4px 16px rgba(139,101,8,0.5))')}
            onMouseLeave={e => (e.currentTarget.style.filter = 'drop-shadow(0 2px 8px rgba(139,101,8,0.0))')}
          >
            <Image
              src="/vp_logo2.png"
              alt="Victorious Productions Logo"
              width={54}
              height={54}
              priority
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Wordmark next to logo */}
          <div className="flex flex-col leading-none">
            <span className={`${raleway.className} text-xs tracking-[0.35em] uppercase`}
              style={{ color: '#f5c842', letterSpacing: '0.35em' }}>
              Victorious
            </span>
            <span className={`${raleway.className} text-xs italic`}
              style={{ color: 'rgba(245,200,66,0.5)', letterSpacing: '0.35em', marginTop: '1px' }}>
              Productions
            </span>
          </div>
        </Link>

        {/* Center decorative line */}
        <div className="hidden md:block flex-1 mx-12 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(139,101,8,0.2), transparent)' }}
        />

        {/* Nav Links */}
        <div className={`${raleway.className} flex items-center gap-10`}>
          {links.map(({ label, href }) => {
            const isHovered = hoveredLink === href;
            const isActive = activeLink === href;

            return (
              <button
                key={href}
                onClick={() => handleNav(href)}
                onMouseEnter={() => setHoveredLink(href)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer pb-1"
                style={{ outline: 'none' }}
              >
                <span
                  className="text-xs tracking-[0.35em] uppercase transition-all duration-300"
                  style={{
                    color: isActive || isHovered ? '#f5c842' : 'rgba(245,200,66,0.55)',
                    transform: isHovered ? 'translateY(-1px)' : 'none',
                    textShadow: isHovered ? '0 0 20px rgba(245,200,66,0.4)' : 'none',
                  }}
                >
                  {label}
                </span>

                {/* Animated underline */}
                <span
                  className="absolute bottom-0 left-0 h-px transition-all duration-300"
                  style={{
                    width: isHovered || isActive ? '100%' : '0%',
                    background: 'linear-gradient(90deg, transparent, #f5c842, transparent)',
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}