"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface SpotlightTextProps {
  children: ReactNode;
  className?: string;
}

function useSpotlightClip<T extends HTMLElement>() {
  const textRef = useRef<T>(null);

  useEffect(() => {
    const updateClipPath = () => {
      const element = textRef.current;
      if (!element) return;

      // The fixture is hidden on mobile; hidden text stays readable there.
      if (window.matchMedia("(max-width: 768px)").matches) {
        element.style.clipPath = "none";
        return;
      }

      const rect = element.getBoundingClientRect();
      const rootStyle = getComputedStyle(document.documentElement);
      const x = parseFloat(rootStyle.getPropertyValue("--spotlight-x")) || 0;
      const y = parseFloat(rootStyle.getPropertyValue("--spotlight-y")) || 0;
      const radius = parseFloat(rootStyle.getPropertyValue("--spotlight-radius")) || 250;
      const isOn = parseFloat(rootStyle.getPropertyValue("--spotlight-on")) || 0;

      element.style.clipPath = `circle(${isOn * radius}px at ${x - rect.left}px ${y - rect.top}px)`;
    };

    updateClipPath();
    window.addEventListener("mousemove", updateClipPath);
    window.addEventListener("click", updateClipPath);
    window.addEventListener("scroll", updateClipPath, true);
    window.addEventListener("resize", updateClipPath);

    return () => {
      window.removeEventListener("mousemove", updateClipPath);
      window.removeEventListener("click", updateClipPath);
      window.removeEventListener("scroll", updateClipPath, true);
      window.removeEventListener("resize", updateClipPath);
    };
  }, []);

  return textRef;
}

export function SpotlightInline({ children, className = "" }: SpotlightTextProps) {
  const textRef = useSpotlightClip<HTMLSpanElement>();
  return (
    <span ref={textRef} className={`spotlight-text ${className}`}>
      {children}
    </span>
  );
}

export function SpotlightBlock({ children, className = "" }: SpotlightTextProps) {
  const textRef = useSpotlightClip<HTMLDivElement>();
  return (
    <div ref={textRef} className={`spotlight-text ${className}`}>
      {children}
    </div>
  );
}

export default SpotlightInline;
