import { useEffect, useRef, useState, useCallback } from "react";

const radius = 250; // in px
const diameter = 2 * radius;

const Spotlight = () => {
  const [isLightOn, updateIsLightOn] = useState(false);
  // directly manipulate DOM element for efficiency
  // otherwise spotlight lags too hard
  const spotlightRef = useRef<HTMLDivElement>(null);
  const lightImageRef = useRef<HTMLImageElement>(null); // Ref for the light image
  const lightOpacityRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (spotlightRef.current) {
      // Update the spotlight position
      spotlightRef.current.style.transform = `translate(${
        e.clientX - radius
      }px, ${e.clientY - radius}px)`;
      spotlightRef.current.style.opacity = String(lightOpacityRef.current);
    }
    if (lightImageRef.current) {
      // Rotate the light fixture
      const spotlightRect = lightImageRef.current.getBoundingClientRect();
      const spotlightCenterX = spotlightRect.left + spotlightRect.width / 2;
      const spotlightCenterY = spotlightRect.top + spotlightRect.height / 2;

      const deltaX = e.x - spotlightCenterX;
      const deltaY = e.y - spotlightCenterY;

      // Compute the light's opacity (dims as it gets close to the fixture)
      const dist = deltaX * deltaX + deltaY * deltaY;
      lightOpacityRef.current =
        (20 / 100) * Math.min(1, Math.max(0, (dist - 1e3) / (radius * radius)));

      // prevent glitchly movements from being too close to point of rotation
      if (dist < (radius * radius / 16)) return;

      // Calculate the angle between the cursor and the spotlight center
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert radians to degrees

      // Rotate the light image to face the cursor
      lightImageRef.current.style.transform = `rotate(${angle - 90}deg)`;
      lightImageRef.current.style.transformOrigin = "center 30%"; // Rotate around the bottom center
    }
  }, []);

  // add listener to entire window; fixes nav bar bug
  useEffect(() => {
    // Simulate a mouse event at the center of the screen
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [handleMouseMove])

  return (
    <div
      className="overflow-hidden"
    >
      {/* Spotlight */}
      {isLightOn ? (
        <div
          ref={spotlightRef}
          className={`pointer-events-none fixed rounded-full bg-violet-500`}
          style={{
            opacity: lightOpacityRef.current, // initial opacity
            width: `${diameter}px`,
            height: `${diameter}px`,
            transform: `translate(-${diameter}px, -${diameter}px)`, // Initial position
            transition: "opacity 0.2s ease-out", // Smooth transition for opacity
          }}
        ></div>
      ) : (
        <></>
      )}

      {/* Fixture */}
      <div className="absolute top-30 right-0 relative">
        <img
          onClick={() => updateIsLightOn(!isLightOn)}
          ref={lightImageRef} // Reference for direct DOM manipulation
          src={isLightOn ? "/spotlight-light-on.png" : "/spotlight-light-off.png"}
          alt="Spotlight light"
          className="fixed absolute top-30 right-0 left-13/16 transform -translate-x-1/2"
          style={{
            width: "150px",
            height: "auto",
          }}
        />
      </div>
    </div>
  );
};

export default Spotlight;
