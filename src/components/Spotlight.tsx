import React, { useState } from "react";

const SpotlightEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none fixed w-64 h-64 rounded-full bg-gradient-to-r from-white/20 to-transparent"
        style={{
          top: position.y - 128, // Center the spotlight vertically
          left: position.x - 128, // Center the spotlight horizontally
        }}
      ></div>

    </div>
  );
};

export default SpotlightEffect;