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

    const handleMouseMove = (event: MouseEvent) => {
      rootStyle.setProperty("--spotlight-x", `${event.clientX}px`);
      rootStyle.setProperty("--spotlight-y", `${event.clientY}px`);

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
        <img
          onClick={() => updateIsLightOn((current) => !current)}
          ref={lightImageRef}
          src={isLightOn ? "/spotlight-light-on.png" : "/spotlight-light-off.png"}
          alt="Spotlight light"
          className="fixed absolute z-50 top-30 right-0 left-13/16 transform -translate-x-1/2"
          style={{ width: "150px", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default Spotlight;
