import React, { useRef } from "react";
import lightOn from "../../public/spotlight-light-on.png";
import lightOff from "../../public/spotlight-light-off.png";
import lightYoke from "../../public/spotlight-yoke.png";

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

      {/* fixture */}
      <div className="absolute relative top-0 right-0 flex flex-col items-center">
        <img
          src={lightOn}
          alt="Spotlight light"
          className="absolute top-16 left-13/16 transform -translate-x-1/2"
          style={{
            width: "150px",
            height: "auto",
          }}
        />
        <img
          src={lightYoke}
          alt="Spotlight yoke"
          className="absolute top-0 left-13/16 transform -translate-x-1/2"
          style={{
            width: "80px",
            height: "auto",
          }}
        />
      </div>
    </div>

  );
};

export default Spotlight;