"use client";

import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  type: string;
  left: string;
  delay: string;
  duration: string;
  color?: string;
  rotation?: string;
}

export default function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ["#ff1493", "#ff69b4", "#ffb6c1", "#ffd700", "#dc143c", "#d4a574", "#f3e5ab"];
    const types = ["sprinkle", "wafer", "popcorn", "cherry"];
    const generated: Particle[] = Array.from({ length: 30 }).map((_, i) => {
      const type = types[Math.floor(Math.random() * types.length)];
      return {
        id: i,
        type,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${Math.random() * 8 + 8}s`,
        color: type === "sprinkle" ? colors[Math.floor(Math.random() * colors.length)] : undefined,
        rotation: `${Math.random() * 360}deg`,
      };
    });
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => {
        if (p.type === "sprinkle") {
          return (
            <div
              key={p.id}
              className="absolute floating-sprinkle"
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
                background: p.color,
                transform: `rotate(${p.rotation})`,
              }}
            />
          );
        } else if (p.type === "wafer") {
          return (
            <div
              key={p.id}
              className="absolute w-3 h-1 bg-caramel rounded-sm opacity-50"
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
                animationName: "fall-sprinkle",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                transform: `rotate(${p.rotation})`,
              }}
            />
          );
        } else if (p.type === "popcorn") {
          return (
            <div
              key={p.id}
              className="absolute w-2.5 h-2.5 bg-popcorn rounded-[50%_50%_50%_0] opacity-50"
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
                animationName: "fall-sprinkle",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                transform: `rotate(${p.rotation})`,
              }}
            />
          );
        } else {
          return (
            <div
              key={p.id}
              className="absolute w-3 h-3 bg-red-500 rounded-full opacity-50"
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
                animationName: "fall-sprinkle",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                transform: `rotate(${p.rotation})`,
              }}
            />
          );
        }
      })}
    </div>
  );
}
