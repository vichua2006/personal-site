"use client";

import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";

const radius = 250;
const diameter = 2 * radius;

interface SpotlightProps {
  isLightOn: boolean;
  updateIsLightOn: Dispatch<SetStateAction<boolean>>;
}

const Spotlight = ({ isLightOn, updateIsLightOn }: SpotlightProps) => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const lightImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty("--spotlight-on", isLightOn ? "1" : "0");
    rootStyle.setProperty("--spotlight-radius", `${radius}px`);
    window.dispatchEvent(new Event("spotlightchange"));

    const handleMouseMove = (event: MouseEvent) => {
      rootStyle.setProperty("--spotlight-x", `${event.clientX}px`);
      rootStyle.setProperty("--spotlight-y", `${event.clientY}px`);
      if (document.documentElement.dataset.spotlightKeyboardReveal === "true") {
        delete document.documentElement.dataset.spotlightKeyboardReveal;
        window.dispatchEvent(new Event("spotlightchange"));
      }

      const fixture = lightImageRef.current;
      if (!fixture) return;

      const fixtureRect = fixture.getBoundingClientRect();
      const deltaX = event.clientX - (fixtureRect.left + fixtureRect.width / 2);
      const deltaY = event.clientY - (fixtureRect.top + fixtureRect.height / 2);
      const distanceSquared = deltaX * deltaX + deltaY * deltaY;

      const glow = spotlightRef.current;
      if (glow) {
        glow.style.transform = `translate(${event.clientX - radius}px, ${event.clientY - radius}px)`;
        glow.style.opacity = String(
          0.2 * Math.min(1, Math.max(0, (distanceSquared - 1e3) / (radius * radius))),
        );
      }

      // Avoid unstable rotation when the cursor is close to the pivot.
      if (distanceSquared < radius * radius / 16) return;

      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      fixture.style.transform = `rotate(${angle - 90}deg)`;
      fixture.style.transformOrigin = "center 30%";
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isLightOn]);

  return (
    <div className="overflow-hidden">
      {isLightOn && (
        <div
          ref={spotlightRef}
          className="pointer-events-none fixed z-40 rounded-full bg-violet-500"
          style={{
            opacity: 0,
            width: `${diameter}px`,
            height: `${diameter}px`,
            transform: `translate(-${diameter}px, -${diameter}px)`,
            transition: "opacity 0.2s ease-out",
          }}
        />
      )}

      <div className="absolute top-30 right-0 relative">
        <button
          type="button"
          aria-label="Toggle spotlight"
          aria-pressed={isLightOn}
          onClick={(event) => {
            const nextIsOn = !isLightOn;
            document.documentElement.dataset.spotlightKeyboardReveal =
              event.detail === 0 && nextIsOn ? "true" : "false";
            updateIsLightOn(nextIsOn);
          }}
          className="fixed z-50 top-30 right-0 left-13/16 w-[150px] -translate-x-1/2 border-0 bg-transparent p-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-violet-400"
        >
          <img
            ref={lightImageRef}
            src={isLightOn ? "/spotlight-light-on.png" : "/spotlight-light-off.png"}
            alt=""
            className="block"
            style={{ width: "150px", height: "auto" }}
          />
        </button>
      </div>
    </div>
  );
};

export default Spotlight;
