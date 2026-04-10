"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  zoom?: boolean;
}

export function ParallaxSection({ children, className, speed = 0.5, zoom = false }: ParallaxSectionProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState(0);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const scrollPos = window.scrollY + window.innerHeight / 2;
          const containerPos = containerRef.current.offsetTop + containerRef.current.offsetHeight / 2;
          const distance = scrollPos - containerPos;
          
          setOffset(distance * speed);
          
          if (zoom) {
            // Subtle zoom in as we approach the center of the viewport
            const progress = Math.max(0, 1 - Math.abs(distance) / (window.innerHeight * 1.5));
            setScale(1 + progress * 0.1);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, zoom]);

  return (
    <div ref={containerRef} className={cn("parallax-container", className)}>
      <div 
        className="parallax-bg"
        style={{ 
          transform: `translateY(${offset}px) scale(${scale})`,
          transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {children}
      </div>
    </div>
  );
}