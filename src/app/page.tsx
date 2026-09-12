"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { TargetReticle } from "@/components/TargetReticle";
import { AudioAmbience } from "@/components/AudioAmbience";
import { RegistrationModal } from "@/components/RegistrationModal";
import { 
  Sparkles, 
  ChevronDown, 
  Globe, 
  Award, 
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from "lucide-react";

// Dynamic import for SatelliteMap to prevent SSR canvas issues
const SatelliteMap = dynamic(
  () => import("@/components/SatelliteMap").then((mod) => mod.SatelliteMap),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-0 bg-space-950 flex flex-col items-center justify-center pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 60%, rgba(10, 35, 65, 0.7) 0%, rgba(2, 4, 8, 0.95) 70%, #020408 100%)"
          }}
        />
        <div className="relative z-10 flex flex-col items-center opacity-40">
          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-ndvi-neon/30 animate-ping-slow" />
          <span className="text-[10px] font-mono text-ndvi-neon tracking-widest uppercase mt-4 animate-pulse">
            // SENSORS CONNECTING TO SATELLITE FEED...
          </span>
        </div>
      </div>
    )
  }
);

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isInteractive = false;
  const spectralMode = "rgb";
  const isAudioOn = false;

  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress smoothly across the scroll track
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const current = window.scrollY;
      const progress = Math.min(1, Math.max(0, current / totalScroll));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      ref={containerRef}
      suppressHydrationWarning
      className="relative bg-space-950 text-slate-100 overflow-x-clip selection:bg-ndvi-neon selection:text-space-950 font-sans"
    >
      {/* ================= BACKGROUND SATELLITE MAP ================= */}
      <SatelliteMap
        scrollProgress={scrollProgress}
        isInteractive={isInteractive}
        spectralMode={spectralMode}
      />

      {/* ================= AUDIO AMBIENCE SYNTHESIZER ================= */}
      <AudioAmbience isPlaying={isAudioOn} scrollProgress={scrollProgress} />

      {/* ================= SCREEN OVERLAYS (CRT, VIGNETTE, GRID) ================= */}
      <div suppressHydrationWarning className="fixed inset-0 crt-overlay z-10 pointer-events-none" />
      <div suppressHydrationWarning className="fixed inset-0 vignette-overlay z-10 pointer-events-none" />
      <div suppressHydrationWarning className="fixed inset-0 grid-bg-overlay z-10 pointer-events-none opacity-30" />

      {/* ================= GROUND TARGET RETICLE OVERLAY ================= */}
      <TargetReticle opacity={Math.max(0, (scrollProgress - 0.7) / 0.3)} />

      {/* ================= SERIAL CONTENT NARRATIVE TRACK ================= */}
      <div suppressHydrationWarning className="relative z-20 w-full max-w-4xl mx-auto px-4 py-16 space-y-28 md:space-y-36">
        
        {/* ----------------------------------------------------------------- */}
        {/* SECTION 1: INTRO (Space View)                                      */}
        {/* ----------------------------------------------------------------- */}
        <section suppressHydrationWarning className="min-h-screen flex flex-col justify-center items-center text-center space-y-6 pt-12">
          
          <div suppressHydrationWarning className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-space-900/90 border border-ndvi-neon/40 shadow-neon-green backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-ndvi-neon animate-ping-slow" />
            <span className="text-xs font-mono font-bold text-ndvi-neon tracking-widest uppercase">
              NISB–GRSS CHAPTER PRESENTS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white leading-tight">
            From the world above us, <br />
            <span className="bg-gradient-to-r from-ndvi-neon via-ndvi-bright to-radar-cyan bg-clip-text text-transparent text-glow-green">
              to the fields beneath us.
            </span>
          </h1>

          <div suppressHydrationWarning className="max-w-2xl bg-space-950/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4 text-slate-200 text-sm md:text-base leading-relaxed text-center shadow-hud-card">
            <p>
              <strong className="text-white">The Earth has always been telling us a story.</strong> Every crop that grows, every drop of water that moves, every change in the soil leaves a trace across the planet, but what if we could see those changes from above?
            </p>
            <p>
              From acquiring data about the Earth to understanding crops and soil and finally using intelligence to manage water and irrigation, this event takes you from <strong className="text-ndvi-neon">observation to insight</strong> and from <strong className="text-radar-cyan">insight to action</strong>.
            </p>
            <div suppressHydrationWarning className="pt-2 text-xs md:text-sm font-mono font-bold text-white border-t border-white/10">
              Three days. One planet. A world of data waiting to be explored.
            </div>
          </div>

          <p className="text-xs md:text-sm font-mono text-slate-300 italic pt-2">
            Our journey begins at the place where engineers learn to turn possibilities into reality.
          </p>

          <div suppressHydrationWarning className="pt-8 flex flex-col items-center gap-2 text-ndvi-neon animate-pulse">
            <span className="text-[11px] font-mono tracking-widest uppercase font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Scroll to Descend
            </span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>

        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 2: ABOUT NIE & ABOUT NISB-GRSS                             */}
        {/* ----------------------------------------------------------------- */}
        <section suppressHydrationWarning className="space-y-8">
          
          {/* About NIE */}
          <div suppressHydrationWarning className="bg-space-950/85 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-ndvi-neon/30 corner-bracket shadow-hud-card space-y-3">
            <div suppressHydrationWarning className="flex items-center gap-2 text-xs font-mono text-ndvi-neon font-bold uppercase tracking-wider">
              <Globe className="w-4 h-4 text-ndvi-neon" />
              <span>ABOUT NIE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
              The National Institute of Engineering
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Established in <strong className="text-white">1946</strong>, <strong className="text-white">NIE</strong> has grown into one of India&apos;s leading engineering institutions, building a legacy of education, innovation, and technological excellence, <strong className="text-ndvi-neon">and today, that journey extends far beyond the campus</strong>, beyond the horizon, and beyond the atmosphere into the systems that allow us to observe our planet itself.
            </p>
          </div>

          {/* About NISB-GRSS */}
          <div suppressHydrationWarning className="bg-space-950/85 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-radar-cyan/30 corner-bracket shadow-hud-card space-y-3">
            <div suppressHydrationWarning className="flex items-center gap-2 text-xs font-mono text-radar-cyan font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-radar-cyan" />
              <span>ABOUT NISB-GRSS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
              NIE IEEE Student Branch — GRSS
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              At the heart of this journey is the <strong className="text-white">NIE IEEE Student Branch — GRSS</strong>, bringing the world of geoscience and remote sensing closer to students.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Backed by <strong className="text-white">IEEE</strong>, <strong className="text-white">GRSS</strong> brings together a global community exploring Earth through <strong className="text-radar-cyan">remote sensing, geospatial technologies, and Earth observation</strong> to NIE, and that global vision takes shape through the <strong className="text-ndvi-neon">NISB–GRSS Chapter</strong>, connecting students to the world of geoscience and remote sensing through technical learning, expert interactions, and hands-on experiences, and now, this chapter brings that global perspective to you.
            </p>
          </div>

        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 3: THE SCHEDULE (Three Days)                               */}
        {/* ----------------------------------------------------------------- */}
        <section suppressHydrationWarning className="space-y-6">
          
          <div suppressHydrationWarning className="text-center space-y-2 bg-space-950/80 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <span className="text-xs font-mono text-ndvi-neon font-bold tracking-widest uppercase">
              // EVENT AGENDA
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
              THE SCHEDULE
            </h2>
            <p className="text-sm font-mono text-radar-cyan font-semibold">
              THREE DAYS. THREE PERSPECTIVES. THREE LEAPS.
            </p>
            <p className="text-xs text-slate-300 italic">
              The journey unfolds in three stages — from seeing the Earth, to understanding it, to making smarter decisions for it.
            </p>
          </div>

          <div suppressHydrationWarning className="space-y-4">
            
            {/* Day 1 */}
            <div suppressHydrationWarning className="bg-space-950/85 backdrop-blur-md p-6 rounded-2xl border border-ndvi-neon/30 hover:border-ndvi-neon transition-all space-y-3">
              <div suppressHydrationWarning className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-mono font-bold text-ndvi-neon">
                  DAY 01 · NOVEMBER 3
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  OBSERVATION
                </span>
              </div>
              <h3 className="text-lg font-display font-bold text-white">
                SEE THE EARTH DIFFERENTLY
              </h3>
              <div suppressHydrationWarning className="text-xs font-mono text-radar-cyan font-semibold">
                Geospatial Data Acquisition &amp; Earth Observation
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Begin with <strong className="text-white">Geo-AI for Precision Agriculture</strong>, bringing together satellite, UAV, and field-based observations.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Then get hands-on with <strong className="text-white">Google Earth Engine and UAV data</strong> to map agricultural fields and monitor crops.
              </p>
              <div suppressHydrationWarning className="pt-2 text-[11px] font-mono italic text-ndvi-bright">
                From observation to insight
              </div>
            </div>

            {/* Day 2 */}
            <div suppressHydrationWarning className="bg-space-950/85 backdrop-blur-md p-6 rounded-2xl border border-radar-cyan/30 hover:border-radar-cyan transition-all space-y-3">
              <div suppressHydrationWarning className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-mono font-bold text-radar-cyan">
                  DAY 02 · NOVEMBER 4
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  INTELLIGENCE
                </span>
              </div>
              <h3 className="text-lg font-display font-bold text-white">
                READ WHAT THE LAND REVEALS
              </h3>
              <div suppressHydrationWarning className="text-xs font-mono text-radar-cyan font-semibold">
                Geo-AI for Crop &amp; Soil Assessment
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Go deeper with <strong className="text-white">machine learning and deep learning</strong> for crop classification and agricultural monitoring.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Explore how Geo-AI can reveal <strong className="text-white">crop health, soil moisture, and vegetation stress</strong>—then apply it yourself using satellite and UAV data.
              </p>
              <div suppressHydrationWarning className="pt-2 text-[11px] font-mono italic text-radar-cyan">
                From insight to intelligence
              </div>
            </div>

            {/* Day 3 */}
            <div suppressHydrationWarning className="bg-space-950/85 backdrop-blur-md p-6 rounded-2xl border border-radar-amber/30 hover:border-radar-amber transition-all space-y-3">
              <div suppressHydrationWarning className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-mono font-bold text-radar-amber">
                  DAY 03 · NOVEMBER 5
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  ACTION
                </span>
              </div>
              <h3 className="text-lg font-display font-bold text-white">
                TURN INTELLIGENCE INTO ACTION
              </h3>
              <div suppressHydrationWarning className="text-xs font-mono text-radar-cyan font-semibold">
                Geo-AI for Water Management &amp; Precision Irrigation
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Explore AI-driven approaches to <strong className="text-white">agricultural drought, crop water stress, and irrigation management.</strong>
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bring it all together by developing a <strong className="text-white">Geo-AI-based Precision Irrigation Decision-Support System.</strong>
              </p>
              <div suppressHydrationWarning className="pt-2 text-[11px] font-mono italic text-radar-amber">
                From intelligence to action.
              </div>
            </div>

          </div>

        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 4: THE SPEAKERS                                           */}
        {/* ----------------------------------------------------------------- */}
        <section suppressHydrationWarning className="bg-space-950/85 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-ndvi-neon/30 space-y-4">
          <div suppressHydrationWarning className="space-y-1">
            <span className="text-xs font-mono text-ndvi-neon font-bold tracking-widest uppercase">
              // EXPERT FACULTY
            </span>
            <h2 className="text-2xl font-display font-bold text-white">
              THE SPEAKERS
            </h2>
            <p className="text-xs font-mono text-slate-300 italic">
              Learn from those shaping the future of Earth observation.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Meet the <strong className="text-white">experts, researchers, and practitioners</strong> bringing their experience in <strong className="text-ndvi-neon">Geoscience, Remote Sensing, Geo-AI, and Precision Agriculture</strong> to the event.
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Through expert talks and hands-on sessions, gain insights from those working at the intersection of <strong className="text-white">technology, data, and our planet. Explore their expertise, discover new perspectives and learn from the people shaping the field.</strong>
          </p>

          <div suppressHydrationWarning className="pt-2 text-xs font-mono text-radar-cyan font-semibold italic">
            Meet the minds behind the journey.
          </div>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 5: BENEFITS & FAQ PLACEHOLDERS                            */}
        {/* ----------------------------------------------------------------- */}
        <section suppressHydrationWarning className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div suppressHydrationWarning className="bg-space-950/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-display font-bold text-white text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-ndvi-neon" />
              Event Benefits
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Hands-on GEE &amp; UAV workflows, IEEE GRSS Certificates, Datasets, and networking.
            </p>
          </div>

          <div suppressHydrationWarning className="bg-space-950/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-display font-bold text-white text-base flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-radar-cyan" />
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Open to students, researchers, and engineers interested in Geo-AI.
            </p>
          </div>

        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 6: REGISTRATION (Ground Level Target)                     */}
        {/* ----------------------------------------------------------------- */}
        <section suppressHydrationWarning className="bg-space-950/90 backdrop-blur-2xl border-2 border-ndvi-neon rounded-3xl p-6 sm:p-10 shadow-neon-green space-y-6 text-center">
          
          <div suppressHydrationWarning className="space-y-2">
            <span className="text-xs font-mono font-bold text-ndvi-neon tracking-widest uppercase">
              FINAL CALL FOR REGISTRATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
              Your view of Earth is about to change.
            </h2>
          </div>

          <div suppressHydrationWarning className="max-w-xl mx-auto space-y-2 text-xs sm:text-sm font-mono text-slate-300">
            <p>You&apos;ve seen the planet from above.</p>
            <p>You&apos;ve followed the data.</p>
            <p>You&apos;ve explored the technology.</p>
            <p className="text-ndvi-neon font-bold text-base pt-2">
              Now it&apos;s your turn to step into the field.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-lg mx-auto leading-relaxed">
            Join us and explore how <strong className="text-white">satellites, UAVs, geospatial data, and AI</strong> are transforming the way we understand agriculture and our planet.
          </p>

          <div suppressHydrationWarning className="pt-2 text-sm sm:text-base font-display font-bold text-white tracking-wider text-glow-green">
            LOOK BEYOND THE HORIZON AND STEP INTO THE WORLD OF GEO-AI.
          </div>

          {/* Prominent CTA */}
          <div suppressHydrationWarning className="pt-4 flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-xl bg-ndvi-neon text-space-950 font-display font-black text-base tracking-wider shadow-neon-green hover:bg-ndvi-bright hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              <span>[ REGISTER NOW ]</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </section>

        {/* Footer */}
        <footer suppressHydrationWarning className="pt-8 pb-16 text-center text-xs font-mono text-slate-400 space-y-2 border-t border-white/10">
          <p>© 2026 NIE IEEE Student Branch — GRSS Chapter. All rights reserved.</p>
          <p className="text-[10px] text-slate-300">Mysuru, Karnataka, India</p>
        </footer>

      </div>

      {/* ================= REGISTRATION MODAL ================= */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </main>
  );
}
