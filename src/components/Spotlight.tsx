import React, { useRef } from "react";

const radius = 250; // in px
const diameter = 2 * radius;

const Spotlight = () => {
  // directly manipulate DOM element for efficiency
  // otherwise spotlight lags too hard
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (spotlightRef.current) {
      // Update the spotlight position directly via CSS transform
      spotlightRef.current.style.transform = `translate(${e.clientX - radius}px, ${e.clientY - radius}px)`;
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="absolute w-full h-screen overflow-hidden"
    >
      {/* Spotlight */}
      <div
        ref={spotlightRef}
        className={`pointer-events-none fixed rounded-full bg-gradient-to-r from-violet-500/20 to-violet-500/20`}
        style={{
          width: `${diameter}px`,
          height: `${diameter}px`,
          transform: `translate(-${diameter}px, -${diameter}px)`, // Initial position
        }}
      ></div>
    </div>

  );
};

export default Spotlight;