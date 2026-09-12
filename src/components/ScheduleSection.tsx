"use client";

import React, { useState } from "react";
import { Clock, MapPin, Sparkles, Terminal, Cpu } from "lucide-react";

interface ScheduleItem {
  time: string;
  title: string;
  speaker: string;
  type: "Keynote" | "Hands-on Workshop" | "Live Demo" | "Hackathon";
  desc: string;
}

const DAY_1: ScheduleItem[] = [
  {
    time: "09:00 - 10:00 IST",
    title: "Opening Keynote: Earth Observation in 2026 & Food Security",
    speaker: "IEEE GRSS Global Chair & ISRO Scientists",
    type: "Keynote",
    desc: "Satellite constellations, revisit cycles, and optical/SAR synergy for agrarian economies.",
  },
  {
    time: "10:30 - 13:00 IST",
    title: "Workshop: Multi-Spectral & Sentinel-2 Vegetation Index Processing",
    speaker: "Agri-Geospatial Lab Team",
    type: "Hands-on Workshop",
    desc: "Hands-on Python, Google Earth Engine (GEE), computing NDVI, NDRE, and EVI across regional crop plots.",
  },
  {
    time: "14:30 - 17:00 IST",
    title: "Microwave Remote Sensing: SAR Backscatter & Soil Moisture Inversion",
    speaker: "Dr. Radhakrishnan (NRSC / ISRO)",
    type: "Hands-on Workshop",
    desc: "De-speckling radar images, Polarimetric SAR decompositions, and surface moisture mapping.",
  },
];

const DAY_2: ScheduleItem[] = [
  {
    time: "09:30 - 12:00 IST",
    title: "UAV Hyperspectral & Thermal Crop Phenotyping Field Demonstration",
    speaker: "Drone AgriTech Operations",
    type: "Live Demo",
    desc: "Live drone payload flight over field test beds with thermal radiometric calibration.",
  },
  {
    time: "13:00 - 17:30 IST",
    title: "GeoAI Hackathon: High-Yield Crop Boundary Segmentation Challenge",
    speaker: "Open to All Registered Student Teams",
    type: "Hackathon",
    desc: "Train vision models on Srirangapatna satellite imagery. ₹1,00,000 prize pool.",
  },
];

export const ScheduleSection: React.FC = () => {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  const items = activeDay === 1 ? DAY_1 : DAY_2;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ndvi-neon/20 pb-3">
        <div>
          <span className="text-xs font-mono text-ndvi-neon uppercase tracking-widest">
            // MISSION TIMELINE & AGENDA
          </span>
          <h3 className="text-xl md:text-2xl font-display font-bold text-white mt-1">
            2-Day Intensive Scientific Track
          </h3>
        </div>

        <div className="flex items-center bg-space-900 border border-slate-700 rounded-lg p-1">
          <button
            onClick={() => setActiveDay(1)}
            className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all ${
              activeDay === 1
                ? "bg-ndvi-neon text-space-950 shadow-neon-green"
                : "text-slate-400 hover:text-white"
            }`}
          >
            DAY 01: SPACEBORNE SENSORS
          </button>
          <button
            onClick={() => setActiveDay(2)}
            className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all ${
              activeDay === 2
                ? "bg-ndvi-neon text-space-950 shadow-neon-green"
                : "text-slate-400 hover:text-white"
            }`}
          >
            DAY 02: DRONES & GEOAI
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-space-950/70 border border-slate-800 hover:border-ndvi-neon/40 backdrop-blur-md transition-all gap-3"
          >
            <div className="space-y-1 md:max-w-xl">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-radar-cyan/15 text-radar-cyan border border-radar-cyan/30">
                  {item.type}
                </span>
                <span className="text-xs font-mono text-ndvi-neon flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {item.time}
                </span>
              </div>
              <h4 className="text-base font-display font-bold text-white mt-1">
                {item.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
            </div>

            <div className="flex md:flex-col items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-slate-800/80 pt-2 md:pt-0 md:pl-4 shrink-0 text-right">
              <span className="text-[10px] font-mono text-slate-400">LEAD INSTRUCTOR</span>
              <span className="text-xs font-mono font-semibold text-slate-200">{item.speaker}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
