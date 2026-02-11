"use client";
import { useState } from "react";

interface Video {
  title: string;
  url: string;
}

interface VideoSliderProps {
  videos?: Video[]; // make it optional
}

export function VideoSlider({ videos = [] }: VideoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!videos.length) {
    return <p className="text-center py-10">No videos available</p>;
  }

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      {/* Featured video */}
      <div className="relative w-full">
        <video
          key={videos[currentIndex].url}
          src={videos[currentIndex].url}
          controls
          autoPlay
          className="w-full h-auto max-h-[80vh] object-cover"
        />
        {/* Arrows */}
        <button
          onClick={prevVideo}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded"
        >
          ◀
        </button>
        <button
          onClick={nextVideo}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded"
        >
          ▶
        </button>
      </div>

      {/* Video thumbnails */}
      <div className="mt-4 flex gap-4 overflow-x-auto px-4">
        {videos.map((video, index) => (
          <div
            key={video.url}
            onClick={() => setCurrentIndex(index)}
            className={`flex-shrink-0 cursor-pointer border-2 ${
              index === currentIndex ? "border-gold" : "border-transparent"
            }`}
          >
            <video src={video.url} className="w-32 h-20 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}