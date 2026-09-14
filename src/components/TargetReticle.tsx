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
      {/* Central Cartographic Survey Reticle (Amber #F59E0B) */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        
        {/* Outer Compass / Coordinate Ring */}
        <div className="absolute inset-0 rounded-full border border-[#F59E0B]/35 animate-spin-slow" />
        
        {/* Fine Inner Dotted Circle */}
        <div className="absolute inset-4 rounded-full border border-dashed border-[#F59E0B]/25" />

        {/* 4 Subtle Corner Framing Guides */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-[#F59E0B]/60" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-[#F59E0B]/60" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-[#F59E0B]/60" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-[#F59E0B]/60" />

        {/* Center Fine Hairline Crosshairs */}
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B]/40 to-transparent" />
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-[#F59E0B]/40 to-transparent" />

        {/* Center Target Dot with Amber Pulsing Ring */}
        <div className="relative flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#F59E0B] shadow-[0_0_14px_rgba(245,158,11,0.8)]" />
          <div className="absolute w-10 h-10 rounded-full border border-[#F59E0B]/45 animate-pulse-slow" />
        </div>

        {/* Cartographic Location Card - Top Right (Adaptive Glass Container) */}
        <div className="absolute -top-12 -right-16 md:-right-28 bg-[rgba(11,15,19,0.70)] backdrop-blur-[12px] border border-[#F59E0B]/30 px-3.5 py-2.5 rounded-xl text-[11px] font-sans font-normal tracking-tight shadow-2xl">
          <div className="flex items-center gap-1.5 text-white font-subheading font-bold tracking-tight">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Field Study Site</span>
          </div>
          <div className="text-[10px] text-[#A6B3A0] font-mono tracking-tight mt-0.5">Mysuru Agro-Ecological Basin</div>
        </div>

        {/* Geodetic Coordinates - Bottom Left (Adaptive Glass Container) */}
        <div className="absolute -bottom-12 -left-16 md:-left-28 bg-[rgba(11,15,19,0.70)] backdrop-blur-[12px] border border-[#F59E0B]/30 px-3.5 py-2.5 rounded-xl text-[11px] font-mono tracking-tight shadow-2xl">
          <div className="text-white font-subheading font-bold flex items-center gap-1 text-[11px] tracking-tight">
            <Compass className="w-3 h-3 text-[#F59E0B]" />
            <span>12.4042° N, 76.6433° E</span>
          </div>
          <div className="text-[10px] text-[#A6B3A0] mt-0.5 tracking-tight">Elevation: ~670m MSL</div>
        </div>
      </div>
    </div>
  );
};
