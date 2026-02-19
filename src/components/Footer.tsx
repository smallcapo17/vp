"use client";

import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import { useState } from "react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const socials = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaXTwitter, href: "https://x.com", label: "X" },
];

export function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [emailHovered, setEmailHovered] = useState(false);

  return (
    <footer
      id="contact"
      className="w-full relative overflow-hidden"
      style={{ background: 'rgba(10, 4, 0, 0.97)' }}
    >
      {/* Top gold accent line */}
      <div className="w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #8b6508 30%, #f5c842 50%, #8b6508 70%, transparent 100%)' }}
      />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(139,101,8,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-5xl mx-auto px-8 py-16">

        {/* Top row: heading left, socials right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12">

          {/* Left — heading */}
          <div>
            <p className={`${raleway.className} text-xs tracking-[0.5em] uppercase mb-3`}
              style={{ color: '#8b6508' }}>
              Let's Connect
            </p>
            <h2 className={`${cormorant.className} text-5xl md:text-6xl font-light italic`}
              style={{ color: '#f5c842' }}>
              Get In Touch
            </h2>
          </div>

          {/* Right — socials */}
          <div className="flex flex-col gap-4">
            <p className={`${raleway.className} text-xs tracking-[0.35em] uppercase`}
              style={{ color: 'rgba(245,200,66)' }}>
              Follow Us
            </p>
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredSocial(label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  className="flex items-center justify-center transition-all duration-300"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: hoveredSocial === label ? '1px solid #f5c842' : '1px solid rgba(139,101,8,0.4)',
                    color: hoveredSocial === label ? '#f5c842' : 'rgba(245,200,66,0.5)',
                    background: hoveredSocial === label ? 'rgba(139,101,8,0.2)' : 'transparent',
                    boxShadow: hoveredSocial === label ? '0 0 16px rgba(245,200,66,0.15)' : 'none',
                    transform: hoveredSocial === label ? 'translateY(-2px)' : 'none',
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-12"
          style={{ background: 'linear-gradient(90deg, rgba(139,101,8,0.4), rgba(139,101,8,0.1), transparent)' }}
        />

        {/* Email row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <a
            href="mailto:info@victorious.com"
            onMouseEnter={() => setEmailHovered(true)}
            onMouseLeave={() => setEmailHovered(false)}
            className="flex items-center gap-4 group transition-all duration-300"
          >
            <div
              className="flex items-center justify-center transition-all duration-300"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: emailHovered ? '1px solid #f5c842' : '1px solid rgba(139,101,8,0.4)',
                color: emailHovered ? '#f5c842' : 'rgba(245,200,66,0.5)',
                background: emailHovered ? 'rgba(139,101,8,0.2)' : 'transparent',
                boxShadow: emailHovered ? '0 0 16px rgba(245,200,66,0.15)' : 'none',
              }}
            >
              <FaEnvelope size={16} />
            </div>
            <div>
              <p className={`${raleway.className} text-xs tracking-[0.3em] uppercase mb-1`}
                style={{ color: 'rgba(245,200,66)' }}>
                Email Us
              </p>
              <p className={`${cormorant.className} text-xl italic transition-all duration-300`}
                style={{ color: emailHovered ? '#f5c842' : 'rgba(245,200,66,0.7)' }}>
                info@victorious.com
              </p>
            </div>
          </a>

          {/* Copyright */}
          <p className={`${raleway.className} text-xs tracking-[0.2em]`}
            style={{ color: 'rgba(139,101,8,0.35)' }}>
            © {new Date().getFullYear()} Victorious Productions. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}