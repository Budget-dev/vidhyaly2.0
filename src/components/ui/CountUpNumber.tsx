
"use client";

import React, { useEffect, useState, useRef } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export const CountUpNumber = ({ end, duration = 1200, suffix = "", className }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countRef.current) {
          countRef.current = true;
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // easeOutQuart curve
            const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
            
            setCount(Math.floor(easeOutQuart * end));

            if (percentage < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={elementRef} className={className}>
      {count}{suffix}
    </span>
  );
};
