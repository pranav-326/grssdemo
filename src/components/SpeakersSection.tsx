"use client";

import React from "react";
import { Award, Globe, Satellite, ExternalLink } from "lucide-react";

interface Speaker {
  name: string;
  role: string;
  org: string;
  topic: string;
  imageTag: string;
  badge: string;
}

const SPEAKERS: Speaker[] = [
  {
    name: "Dr. K. S. Radhakrishnan",
    role: "Distinguished Scientist & Former Lead",
    org: "ISRO / NRSC Earth Observation Division",
    topic: "NISAR Dual-Frequency SAR for Indian Crop Phenology",
    imageTag: "ISRO",
    badge: "Keynote 01",
  },
  {
    name: "Prof. Elena Rostova",
    role: "Chair of Geospatial Earth Analytics",
    org: "IEEE GRSS Global / ETH Zürich",
    topic: "Hyperspectral Canopy Chlorophyll & Yield Inversion Models",
    imageTag: "GRSS",
    badge: "Keynote 02",
  },
  {
    name: "Dr. M. Venkatesh",
    role: "Director of Precision Agronomy",
    org: "University of Agricultural Sciences, Bengaluru",
    topic: "Cauvery River Basin: Drought & Soil Moisture Telemetry",
    imageTag: "UASB",
    badge: "Field Specialist",
  },
  {
    name: "Aarav Nambiar",
    role: "Chief AI Architect",
    org: "AgriVision Earth Intelligence Labs",
    topic: "Foundation Vision Models (GeoFM) for Micro-Plot Segmentation",
    imageTag: "AI",
    badge: "Industry Pioneer",
  },
];

export const SpeakersSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-ndvi-neon/20 pb-3">
        <div>
          <span className="text-xs font-mono text-ndvi-neon uppercase tracking-widest">
            // SATELLITE FACULTY & SCIENTISTS
          </span>
          <h3 className="text-xl md:text-2xl font-display font-bold text-white mt-1">
            Distinguished Earth Observation Keynotes
          </h3>
        </div>
        <span className="hidden sm:inline-block px-3 py-1 bg-space-900 border border-slate-700 rounded text-xs font-mono text-slate-300">
          4 LEAD SESSIONS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SPEAKERS.map((speaker, idx) => (
          <div
            key={idx}
            className="group relative bg-space-950/70 border border-slate-800 hover:border-ndvi-neon/50 rounded-xl p-5 backdrop-blur-md transition-all duration-300 hover:shadow-neon-green corner-bracket"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-space-900 border border-ndvi-neon/30 flex items-center justify-center font-display font-black text-ndvi-neon text-base shadow-inner group-hover:scale-105 transition-transform">
                  {speaker.imageTag}
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base group-hover:text-ndvi-neon transition-colors">
                    {speaker.name}
                  </h4>
                  <p className="text-xs font-mono text-slate-400">{speaker.role}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-ndvi-neon/10 text-ndvi-neon border border-ndvi-neon/20 shrink-0">
                {speaker.badge}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1">
              <div className="text-[10px] font-mono text-slate-400">ORGANIZATION / LAB</div>
              <div className="text-xs text-slate-200 font-semibold">{speaker.org}</div>
            </div>

            <div className="mt-3 bg-space-900/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[10px] font-mono text-radar-cyan font-semibold flex items-center gap-1.5">
                <Satellite className="w-3 h-3 text-radar-cyan" /> SESSION FOCUS
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                &ldquo;{speaker.topic}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
