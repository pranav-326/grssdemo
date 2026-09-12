"use client";

import React, { useEffect, useState } from "react";
import { 
  Activity, 
  Compass, 
  Layers, 
  Maximize2, 
  Minimize2, 
  Radio, 
  Satellite, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Wifi,
  Sparkles,
  Cpu
} from "lucide-react";

interface AgriHUDProps {
  scrollProgress: number; // 0 to 1
  isInteractive: boolean;
  onToggleInteractive: () => void;
  spectralMode: "rgb" | "ndvi" | "sar" | "thermal";
  onChangeSpectralMode: (mode: "rgb" | "ndvi" | "sar" | "thermal") => void;
  isAudioOn: boolean;
  onToggleAudio: () => void;
}

export const AgriHUD: React.FC<AgriHUDProps> = ({
  scrollProgress,
  isInteractive,
  onToggleInteractive,
  spectralMode,
  onChangeSpectralMode,
  isAudioOn,
  onToggleAudio,
}) => {
  const [utcTime, setUtcTime] = useState<string>("");
  const [frameTick, setFrameTick] = useState<number>(0);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setUtcTime(d.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      setFrameTick((prev) => (prev + 1) % 100);
    }, 200);
    return () => clearInterval(tick);
  }, []);

  // Compute dynamic telemetry values based on scrollProgress
  // 0% -> Space, 50% -> Atmosphere, 100% -> Mysuru Fields
  const altitudeKm = Math.max(
    0.45,
    Number((35786 * Math.pow(1 - scrollProgress, 2.8) + 0.45).toFixed(1))
  );

  const altitudeDisplay =
    altitudeKm > 100
      ? `${altitudeKm.toLocaleString()} KM`
      : altitudeKm > 1
      ? `${altitudeKm.toFixed(1)} KM`
      : `${(altitudeKm * 1000).toFixed(0)} M (AGL)`;

  const ndviValue = (0.12 + scrollProgress * 0.64 + (Math.sin(frameTick) * 0.01)).toFixed(2);
  const soilMoisture = Math.min(48, Math.round(18 + scrollProgress * 28 + (frameTick % 3)));
  const gsdValue = scrollProgress > 0.85 ? "0.3m / px" : scrollProgress > 0.4 ? "10.0m / px" : "250.0m / px";

  const targetLabel =
    scrollProgress > 0.8
      ? "MYSURU AGRI-BELT // CAUVERY BASIN"
      : scrollProgress > 0.35
      ? "KARNATAKA SOUTHERN AGRO-ZONE"
      : "INDIAN SUBCONTINENT [ORBITAL]";

  const scanStatus =
    scrollProgress > 0.85
      ? "HIGH-RES CROP CANOPY DETECTED"
      : scrollProgress > 0.4
      ? "ATMOSPHERIC PENETRATION // CLEAR"
      : "WIDE ORBITAL RECONNAISSANCE";

  const stageIndex = scrollProgress < 0.33 ? 1 : scrollProgress < 0.75 ? 2 : 3;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 md:p-6 select-none font-mono text-xs text-slate-300">
      
      {/* ================= TOP HUD BAR ================= */}
      <header className="flex items-center justify-between w-full border-b border-ndvi-neon/20 bg-space-950/70 backdrop-blur-md px-3 py-2.5 rounded-t-lg">
        {/* Left: Organization & Sensor Lock */}
        <div className="flex items-center gap-2 md:gap-4 pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ndvi-neon opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-ndvi-neon"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-white tracking-widest text-xs md:text-sm flex items-center gap-1.5">
                IEEE GRSS <span className="text-ndvi-neon hidden sm:inline">// EO-SAT-AGRI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
                SENSOR: SENTINEL-2 MSI + NISAR L/S-BAND
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 border-l border-white/10 pl-3">
            <Radio className="w-3.5 h-3.5 text-radar-cyan animate-pulse" />
            <span className="text-slate-300 text-[11px]">TELEMETRY: <span className="text-ndvi-neon font-bold">ACTIVE LOCK</span></span>
          </div>
        </div>

        {/* Center: Mission Clock & Target Indicator */}
        <div className="hidden md:flex flex-col items-center">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Satellite className="w-3.5 h-3.5 text-ndvi-bright" />
            <span className="text-white font-mono">{utcTime || "SYNCHRONIZING..."}</span>
          </div>
          <span className="text-[10px] text-ndvi-neon tracking-wider font-semibold">
            {targetLabel}
          </span>
        </div>

        {/* Right: Controls (Interactive Toggle, Audio, Spectral Mode) */}
        <div className="flex items-center gap-1.5 md:gap-2 pointer-events-auto">
          {/* Spectral Mode Switcher */}
          <div className="hidden sm:flex items-center bg-space-900/90 border border-ndvi-neon/30 rounded p-0.5 text-[10px]">
            {(["rgb", "ndvi", "sar", "thermal"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => onChangeSpectralMode(mode)}
                className={`px-2 py-1 rounded transition-all uppercase font-mono font-bold ${
                  spectralMode === mode
                    ? "bg-ndvi-neon text-space-950 shadow-neon-green"
                    : "text-slate-400 hover:text-white"
                }`}
                title={`Switch to ${mode.toUpperCase()} spectral filter`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleAudio}
            className={`p-1.5 rounded border transition-colors ${
              isAudioOn
                ? "border-ndvi-neon/60 bg-ndvi-neon/10 text-ndvi-neon"
                : "border-slate-800 bg-space-900/60 text-slate-400 hover:text-white"
            }`}
            title={isAudioOn ? "Mute Sensor Ambience" : "Enable Sensor Audio Feed"}
          >
            {isAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Interactive Free-Roam Map Mode Toggle */}
          <button
            onClick={onToggleInteractive}
            className={`flex items-center gap-1 px-2 py-1.5 rounded border transition-all text-[11px] font-mono font-semibold ${
              isInteractive
                ? "border-radar-cyan bg-radar-cyan/20 text-radar-cyan shadow-neon-cyan animate-pulse"
                : "border-slate-700 bg-space-900/80 text-slate-300 hover:border-ndvi-neon/40 hover:text-white"
            }`}
            title="Toggle Free Interactive Orbit Map"
          >
            {isInteractive ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {isInteractive ? "EXIT FREE-LOOK" : "FREE ORBIT"}
            </span>
          </button>
        </div>
      </header>

      {/* ================= MIDDLE HUD SIDE PANELS ================= */}
      <div className="flex justify-between items-center w-full my-auto pointer-events-none">
        
        {/* Left Telemetry Column */}
        <div className="hidden lg:flex flex-col gap-2.5 max-w-[240px] bg-space-950/60 backdrop-blur-md p-3 rounded-lg border border-ndvi-neon/20 corner-bracket shadow-hud-card">
          <div className="flex items-center justify-between border-b border-white/10 pb-1">
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Compass className="w-3 h-3 text-ndvi-neon" /> ORBITAL DATA
            </span>
            <span className="text-[9px] text-ndvi-neon">BAND: S2-MSI</span>
          </div>

          <div className="space-y-1.5">
            <div>
              <div className="text-[9px] text-slate-400">ALTITUDE (AGL)</div>
              <div className="text-sm font-bold text-white font-mono tracking-wider text-glow-green">
                {altitudeDisplay}
              </div>
            </div>

            <div>
              <div className="text-[9px] text-slate-400">TARGET POSITION</div>
              <div className="text-[11px] text-slate-200 font-mono">
                12°24&apos;15.1&quot;N 76°38&apos;35.9&quot;E
              </div>
              <div className="text-[9px] text-ndvi-bright">MGRS: 43PDN4212971842</div>
            </div>

            <div>
              <div className="text-[9px] text-slate-400">SPATIAL RESOLUTION (GSD)</div>
              <div className="text-xs font-semibold text-radar-cyan font-mono">
                {gsdValue}
              </div>
            </div>

            <div>
              <div className="text-[9px] text-slate-400">ATMOSPHERIC OPTICAL DEPTH</div>
              <div className="text-xs text-slate-200 font-mono flex items-center justify-between">
                <span>AOD: 0.14</span>
                <span className="text-[9px] text-ndvi-neon">CLEAR SKY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Agri-Index Column */}
        <div className="hidden lg:flex flex-col gap-2.5 max-w-[240px] bg-space-950/60 backdrop-blur-md p-3 rounded-lg border border-ndvi-neon/20 corner-bracket shadow-hud-card">
          <div className="flex items-center justify-between border-b border-white/10 pb-1">
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Activity className="w-3 h-3 text-radar-cyan" /> AGRI-ANALYTICS
            </span>
            <span className="text-[9px] text-radar-cyan">LIVE NDVI</span>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
                <span>NDVI VEGETATION INDEX</span>
                <span className="text-ndvi-neon font-bold">{ndviValue}</span>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 w-full bg-space-800 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-radar-amber via-ndvi-bright to-ndvi-neon transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(10, parseFloat(ndviValue) * 100))}%` }}
                />
              </div>
              <span className="text-[9px] text-slate-400">
                {parseFloat(ndviValue) > 0.6 ? "HEALTHY SUGARCANE / PADDY" : "REGIONAL VEGETATION"}
              </span>
            </div>

            <div>
              <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
                <span>SAR SOIL MOISTURE (VV/VH)</span>
                <span className="text-radar-cyan font-bold">{soilMoisture}%</span>
              </div>
              <div className="h-1.5 w-full bg-space-800 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-radar-cyan transition-all duration-300"
                  style={{ width: `${soilMoisture * 2}%` }}
                />
              </div>
            </div>

            <div className="pt-1 border-t border-white/10 flex items-center justify-between text-[10px]">
              <span className="text-slate-400">CANOPY NITROGEN:</span>
              <span className="text-white font-bold">94.2 kg/ha</span>
            </div>

            <div className="flex items-center gap-1.5 text-[9px] text-ndvi-bright bg-ndvi-dark/40 border border-ndvi-neon/30 p-1.5 rounded">
              <Sparkles className="w-3 h-3 text-ndvi-neon animate-spin-slow shrink-0" />
              <span>{scanStatus}</span>
            </div>
          </div>
        </div>

      </div>

      {/* ================= BOTTOM HUD NAVIGATION BAR ================= */}
      <footer className="flex flex-col md:flex-row items-center justify-between w-full border-t border-ndvi-neon/20 bg-space-950/70 backdrop-blur-md px-3 py-2 rounded-b-lg gap-2">
        {/* Left: Current Coordinates & Target info */}
        <div className="flex items-center gap-3 text-[10px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ndvi-neon animate-ping-slow"></span>
            <span className="text-white font-bold">SRIRANGAPATNA / MYSURU</span>
          </div>
          <span className="hidden sm:inline text-slate-400">
            LAT: 12.4042° N | LON: 76.6433° E
          </span>
          <span className="hidden md:inline text-slate-400">
            ELEV: 672m MSL
          </span>
        </div>

        {/* Center: Stage Step Progress */}
        <div className="flex items-center gap-2 md:gap-3 text-[10px]">
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
            stageIndex === 1 ? "bg-ndvi-neon/20 border border-ndvi-neon text-ndvi-neon font-bold" : "text-slate-400"
          }`}>
            <span>01</span>
            <span className="hidden sm:inline">ORBIT</span>
          </div>
          <div className="w-4 h-[1px] bg-slate-700"></div>
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
            stageIndex === 2 ? "bg-ndvi-neon/20 border border-ndvi-neon text-ndvi-neon font-bold" : "text-slate-400"
          }`}>
            <span>02</span>
            <span className="hidden sm:inline">ATMOSPHERE</span>
          </div>
          <div className="w-4 h-[1px] bg-slate-700"></div>
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
            stageIndex === 3 ? "bg-ndvi-neon/20 border border-ndvi-neon text-ndvi-neon font-bold text-glow-green" : "text-slate-400"
          }`}>
            <span>03</span>
            <span className="hidden sm:inline">SURFACE TARGET</span>
          </div>
        </div>

        {/* Right: Scroll percentage and Scan telemetry */}
        <div className="flex items-center gap-3 text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>SCAN PROGRESS:</span>
            <span className="text-ndvi-neon font-mono font-bold">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
          {isInteractive && (
            <span className="text-radar-cyan font-semibold animate-pulse">
              [FREE-LOOK ACTIVE]
            </span>
          )}
        </div>
      </footer>

    </div>
  );
};
