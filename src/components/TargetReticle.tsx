"use client";

import React from "react";
import { Crosshair, Scan, Target, CheckCircle2, Zap } from "lucide-react";

interface TargetReticleProps {
  opacity: number; // 0 to 1 based on scroll progress
  locked?: boolean;
}

export const TargetReticle: React.FC<TargetReticleProps> = ({ opacity, locked = true }) => {
  if (opacity <= 0.05) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-20"
      style={{ opacity }}
    >
      {/* Central Targeting Reticle Frame */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        
        {/* Outer Rotating Degree Ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-ndvi-neon/40 animate-spin-slow" />
        
        {/* Secondary Counter-rotating Ring */}
        <div 
          className="absolute inset-4 rounded-full border border-dotted border-radar-cyan/40"
          style={{ animation: "spin 12s linear infinite reverse" }}
        />

        {/* Pulse radar sweep */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-ndvi-neon/10 via-transparent to-transparent animate-radar-sweep rounded-full" />

        {/* 4 Corner Targeting Brackets */}
        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-ndvi-neon text-glow-green" />
        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-ndvi-neon text-glow-green" />
        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-ndvi-neon text-glow-green" />
        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-ndvi-neon text-glow-green" />

        {/* Center Crosshairs */}
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-ndvi-neon/60 to-transparent" />
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-ndvi-neon/60 to-transparent" />

        {/* Center Target Dot with Ping Ring */}
        <div className="relative flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-ndvi-neon shadow-neon-green" />
          <div className="absolute w-12 h-12 rounded-full border border-ndvi-neon animate-ping-slow" />
          <div className="absolute w-24 h-24 rounded-full border border-ndvi-neon/30 animate-radar-pulse" />
        </div>

        {/* Target Meta Data Labels - Top Right */}
        <div className="absolute -top-10 -right-24 md:-right-36 bg-space-950/85 backdrop-blur-md border border-ndvi-neon/50 px-3 py-1.5 rounded text-[10px] font-mono text-slate-200 shadow-hud-card">
          <div className="flex items-center gap-1.5 text-ndvi-neon font-bold">
            <CheckCircle2 className="w-3 h-3 text-ndvi-neon" />
            <span>FIELD TARGET ACQUIRED</span>
          </div>
          <div className="text-slate-300">CAUVERY BASIN #0492</div>
          <div className="text-radar-cyan text-[9px]">CROP: SUGARCANE & PADDY</div>
        </div>

        {/* Target Meta Data Labels - Bottom Left */}
        <div className="absolute -bottom-10 -left-24 md:-left-36 bg-space-950/85 backdrop-blur-md border border-radar-cyan/50 px-3 py-1.5 rounded text-[10px] font-mono text-slate-200 shadow-hud-card">
          <div className="text-radar-cyan font-bold flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <span>SPECTRAL SCAN: 0.74 NDVI</span>
          </div>
          <div className="text-slate-300">12.4042° N, 76.6433° E</div>
          <div className="text-ndvi-neon text-[9px]">RESOLUTION: 0.3m ULTRA-RES</div>
        </div>

        {/* Scanning Grid Laser Line */}
        <div className="absolute inset-x-0 h-0.5 bg-ndvi-neon/80 shadow-neon-green animate-scan-line" />
      </div>
    </div>
  );
};
