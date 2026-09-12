"use client";

import React from "react";
import { MapPin, Compass, CheckCircle2 } from "lucide-react";

interface TargetReticleProps {
  opacity: number; // 0 to 1 based on scroll progress
  locked?: boolean;
}

export const TargetReticle: React.FC<TargetReticleProps> = ({ opacity }) => {
  if (opacity <= 0.05) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500 z-20"
      style={{ opacity }}
    >
      {/* Central Cartographic Survey Reticle */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        
        {/* Outer Compass / Coordinate Ring */}
        <div className="absolute inset-0 rounded-full border border-copper/30 animate-spin-slow" />
        
        {/* Fine Inner Dotted Circle */}
        <div className="absolute inset-4 rounded-full border border-dashed border-tea/25" />

        {/* 4 Subtle Corner Framing Guides */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-copper/60" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-copper/60" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-copper/60" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-copper/60" />

        {/* Center Fine Hairline Crosshairs */}
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-copper/40 to-transparent" />
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-copper/40 to-transparent" />

        {/* Center Target Dot with Subtle Pulsing Ring */}
        <div className="relative flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-olive shadow-earth-subtle" />
          <div className="absolute w-10 h-10 rounded-full border border-olive/40 animate-pulse-slow" />
        </div>

        {/* Cartographic Location Card - Top Right */}
        <div className="absolute -top-12 -right-16 md:-right-28 bg-earth-900/80 backdrop-blur-md border border-copper/30 px-3 py-2 rounded-xl text-[11px] font-sans text-vanilla/90 shadow-earth-card">
          <div className="flex items-center gap-1.5 text-tea font-serif font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-olive" />
            <span>Field Study Site</span>
          </div>
          <div className="text-[10px] text-vanilla/70 font-mono mt-0.5">Mysuru Agro-Ecological Basin</div>
        </div>

        {/* Geodetic Coordinates - Bottom Left */}
        <div className="absolute -bottom-12 -left-16 md:-left-28 bg-earth-900/80 backdrop-blur-md border border-copper/30 px-3 py-2 rounded-xl text-[11px] font-mono text-tea/90 shadow-earth-card">
          <div className="text-copper font-serif font-semibold flex items-center gap-1 text-[11px]">
            <Compass className="w-3 h-3 text-copper" />
            <span>12.4042° N, 76.6433° E</span>
          </div>
          <div className="text-[10px] text-vanilla/60 mt-0.5">Elevation: ~670m MSL</div>
        </div>
      </div>
    </div>
  );
};
