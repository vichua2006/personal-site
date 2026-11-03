"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export default function ImageCarousel({
  photos,
  label,
}: {
  photos: Photo[];
  label: string;
}) {
  const trackId = useId();
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  function goTo(index: number) {
    if (!track.current) return;
    const next = Math.max(0, Math.min(index, photos.length - 1));
    track.current.scrollTo({
      left: next * track.current.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    const destinations: Record<string, number> = {
      ArrowLeft: current - 1,
      ArrowRight: current + 1,
      Home: 0,
      End: photos.length - 1,
    };
    if (!(event.key in destinations)) return;
    event.preventDefault();
    goTo(destinations[event.key]);
  }

  if (!photos.length) return null;

  const buttonClass =
    "inline-flex size-9 items-center justify-center rounded-md border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white disabled:cursor-default disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400";

  return (
    <div
      className="mt-6 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        ref={track}
        id={trackId}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-lg border border-gray-800 bg-gray-900/40 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={() => {
          if (!track.current) return;
          setCurrent(Math.max(0, Math.min(
            photos.length - 1,
            Math.round(track.current.scrollLeft / track.current.clientWidth),
          )));
        }}
      >
        {photos.map((photo, index) => (
          <div
            key={photo.src}
            className="aspect-4/3 w-full shrink-0 snap-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${photos.length}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading={index === 0 ? "eager" : "lazy"}
              draggable={false}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-sm text-gray-400">
        <a
          href={photos[current].src}
          target="_blank"
          rel="noreferrer"
          className="hover:text-gray-200 underline underline-offset-4"
          aria-label={`View photo ${current + 1} at full size`}
        >
          View full size ↗
        </a>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className={buttonClass}
            aria-label="Previous photo"
            aria-controls={trackId}
            disabled={current === 0}
            onClick={() => goTo(current - 1)}
          >
            <span aria-hidden="true">←</span>
          </button>
          <span className="min-w-10 text-center tabular-nums" aria-live="polite" aria-atomic="true">
            {current + 1} / {photos.length}
          </span>
          <button
            type="button"
            className={buttonClass}
            aria-label="Next photo"
            aria-controls={trackId}
            disabled={current === photos.length - 1}
            onClick={() => goTo(current + 1)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
