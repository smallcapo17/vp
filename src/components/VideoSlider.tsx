"use client";

import { useEffect, useState, useRef } from "react";
import { getVideos, Video } from "@/lib/getVideos";
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

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? match[1] : "";
}

export default function VideoSlider() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getVideos().then(setVideos);
  }, []);

  if (!videos.length) return null;

  const currentVideo = videos[currentIndex];
  const videoId = getYouTubeId(currentVideo.url);

  function goTo(index: number, dir: "left" | "right") {
    if (isTransitioning) return;
    setDirection(dir);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  }

  const prev = () => goTo((currentIndex - 1 + videos.length) % videos.length, "left");
  const next = () => goTo((currentIndex + 1) % videos.length, "right");

  return (
    <section className="w-full py-12 relative overflow-hidden">

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 60%, rgba(139,101,8,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-8 relative">

        {/* Header */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className={`${raleway.className} text-xl tracking-[0.5em] uppercase mb-3`}
              style={{ color: '#9a7209' }}>
              Showreel
            </p>
          </div>

          {/* Counter */}
          <div className="flex items-end gap-1 mb-2">
            <span className={`${cormorant.className} text-5xl font-light`}
              style={{ color: '#8b6508', lineHeight: 1 }}>
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className={`${raleway.className} text-xs tracking-widest mb-2`}
              style={{ color: 'rgba(100,70,0,0.35)' }}>
              / {String(videos.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Main layout: large player left, thumbnails stacked right */}
        <div className="flex gap-6 items-start">

          {/* Player */}
          <div className="flex-1 relative">

            {/* Video container */}
            <div
              className="relative w-full aspect-video rounded-sm overflow-hidden"
              style={{
                boxShadow: '0 24px 80px rgba(100,70,0,0.18), 0 8px 24px rgba(0,0,0,0.14)',
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning
                  ? `translateX(${direction === "right" ? "-20px" : "20px"})`
                  : 'translateX(0)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              <iframe
                key={videoId}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video title + nav row */}
            <div className="flex items-center justify-between mt-5">
              <div
                style={{
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'translateY(6px)' : 'translateY(0)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                }}
              >
                <h3 className={`${cormorant.className} text-2xl font-medium italic`}
                  style={{ color: '#1a0a00' }}>
                  {currentVideo.title}
                </h3>
              </div>

              {/* Prev / Next arrows */}
              <div className="flex gap-3">
                {[{ fn: prev, label: "←" }, { fn: next, label: "→" }].map(({ fn, label }, i) => (
                  <button
                    key={i}
                    onClick={fn}
                    className="flex items-center justify-center transition-all duration-300"
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      border: '2px solid #8b6508',
                      color: '#8b6508',
                      fontSize: '22px',
                      fontWeight: '600',
                      background: 'rgba(139,101,8,0.08)',
                      boxShadow: '0 2px 12px rgba(139,101,8,0.15)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#8b6508';
                      e.currentTarget.style.color = '#fff8dc';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(139,101,8,0.4)';
                      e.currentTarget.style.transform = 'scale(1.08)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(139,101,8,0.08)';
                      e.currentTarget.style.color = '#8b6508';
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(139,101,8,0.15)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-5 h-px w-full" style={{ background: 'rgba(100,70,0,0.1)' }}>
              <div
                className="h-px transition-all duration-500 ease-out"
                style={{
                  width: `${((currentIndex + 1) / videos.length) * 100}%`,
                  background: 'linear-gradient(90deg, #8b6508, #f5c842)',
                }}
              />
            </div>
          </div>

          {/* Thumbnail sidebar */}
          <div
            ref={thumbsRef}
            className="flex flex-col gap-3 shrink-0 overflow-y-auto"
            style={{ width: '180px', maxHeight: '360px' }}
          >
            {videos.map((video, index) => {
              const id = getYouTubeId(video.url);
              const isActive = index === currentIndex;

              return (
                <button
                  key={index}
                  onClick={() => goTo(index, index > currentIndex ? "right" : "left")}
                  className="relative rounded-sm overflow-hidden shrink-0 text-left transition-all duration-300"
                  style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    outline: isActive ? '2px solid #8b6508' : '2px solid transparent',
                    outlineOffset: '2px',
                    transform: isActive ? 'scale(1.03)' : 'scale(1)',
                    boxShadow: isActive ? '0 6px 24px rgba(139,101,8,0.25)' : '0 2px 8px rgba(0,0,0,0.08)',
                  }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover transition-all duration-300"
                    style={{ filter: isActive ? 'brightness(1)' : 'brightness(0.6)' }}
                  />

                  {/* Overlay with title on inactive */}
                  {!isActive && (
                    <div className="absolute inset-0 flex items-end p-2"
                      style={{ background: 'linear-gradient(to top, rgba(10,4,0,0.7) 0%, transparent 60%)' }}>
                      <p className={`${raleway.className} text-white leading-tight`}
                        style={{ fontSize: '9px', letterSpacing: '0.05em' }}>
                        {video.title}
                      </p>
                    </div>
                  )}

                  {/* Active gold bar */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: 'linear-gradient(90deg, #8b6508, #f5c842)' }} />
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}