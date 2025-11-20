import React, { useRef, useEffect } from "react";

interface SpotlightTextProps {
  children: React.ReactNode;
  className?: string;
}

const SpotlightText = ({ children, className = "" }: SpotlightTextProps) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const updateClipPath = () => {
      if (!textRef.current) return;

      // Get the element's position relative to the viewport
      const rect = textRef.current.getBoundingClientRect();
      
      // Get the global CSS variables
      const spotlightX = parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--spotlight-x')
          .replace('px', '')
      ) || 0;
      const spotlightY = parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--spotlight-y')
          .replace('px', '')
      ) || 0;
      const spotlightRadius = parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--spotlight-radius')
          .replace('px', '')
      ) || 250;
      const spotlightOn = parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--spotlight-on')
      ) || 0;

      // Calculate position relative to this element's bounding box
      const relativeX = spotlightX - rect.left;
      const relativeY = spotlightY - rect.top;
      const radius = spotlightOn * spotlightRadius;

      // Update the clip-path for this specific element
      textRef.current.style.clipPath = `circle(${radius}px at ${relativeX}px ${relativeY}px)`;
    };

    // Update on mount
    updateClipPath();
    
    // Listen for mouse moves, clicks, scroll, and resize to update clip-path
    window.addEventListener('mousemove', updateClipPath);
    window.addEventListener('click', updateClipPath);
    window.addEventListener('scroll', updateClipPath, true);
    window.addEventListener('resize', updateClipPath);

    return () => {
      window.removeEventListener('mousemove', updateClipPath);
      window.removeEventListener('click', updateClipPath);
      window.removeEventListener('scroll', updateClipPath, true);
      window.removeEventListener('resize', updateClipPath);
    };
  }, []);

  return (
    <span ref={textRef} className={`spotlight-text ${className}`}>
      {children}
    </span>
  );
};

export default SpotlightText;

