"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { TargetReticle } from "@/components/TargetReticle";
import { RegistrationModal } from "@/components/RegistrationModal";
import { 
  ChevronDown, 
  Globe, 
  Award, 
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Calendar,
  Compass
} from "lucide-react";

// Dynamic import for SatelliteMap to prevent SSR canvas issues
const SatelliteMap = dynamic(
  () => import("@/components/SatelliteMap").then((mod) => mod.SatelliteMap),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-0 bg-earth-950 flex flex-col items-center justify-center pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 60%, rgba(35, 30, 25, 0.7) 0%, rgba(13, 11, 9, 0.95) 70%, #0d0b09 100%)"
          }}
        />
        <div className="relative z-10 flex flex-col items-center opacity-40">
          <div className="w-36 h-36 rounded-full border border-copper/30 animate-pulse-slow" />
          <span className="text-[10px] font-mono text-tea tracking-widest uppercase mt-4">
            Earth Observation Feed Initializing...
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
      className="relative bg-earth-950 text-vanilla overflow-x-clip selection:bg-olive selection:text-earth-950 font-sans"
    >
      {/* ================= BACKGROUND SATELLITE MAP ================= */}
      <SatelliteMap
        scrollProgress={scrollProgress}
        isInteractive={isInteractive}
        spectralMode={spectralMode}
      />

      {/* ================= ATMOSPHERIC VIGNETTE OVERLAY ================= */}
      <div suppressHydrationWarning className="fixed inset-0 vignette-overlay z-10 pointer-events-none" />

      {/* ================= GROUND TARGET RETICLE OVERLAY ================= */}
      <TargetReticle opacity={Math.max(0, (scrollProgress - 0.7) / 0.3)} />

      {/* ================= SERIAL CONTENT NARRATIVE TRACK ================= */}
      <div suppressHydrationWarning className="relative z-20 w-full max-w-4xl mx-auto px-6 py-20 space-y-36 md:space-y-48">
        
        {/* ----------------------------------------------------------------- */}
        {/* SECTION 1: INTRO (Space View)                                      */}
        {/* ----------------------------------------------------------------- */}
        <section suppressHydrationWarning className="min-h-screen flex flex-col justify-center items-center text-center space-y-8 pt-8">
          
          {/* Institutional Badge */}
          <div suppressHydrationWarning className="narration-fade-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-earth-900/80 border border-copper/30 backdrop-blur-md shadow-earth-subtle">
            <span className="h-2 w-2 rounded-full bg-olive animate-pulse" />
            <span className="text-xs font-serif font-medium text-tea tracking-widest uppercase">
              NISB–GRSS Chapter Presents
            </span>
          </div>

          {/* Main Title */}
          <h1 className="narration-fade-2 text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-vanilla leading-tight max-w-3xl">
            From the world above us, <br />
            <span className="italic text-tea font-light">
              to the fields beneath us.
            </span>
          </h1>

          <div className="copper-rule w-32 md:w-48" />

          {/* Narrative Paragraphs */}
          <div suppressHydrationWarning className="narration-fade-3 max-w-2xl text-center space-y-5 text-vanilla/90 text-base md:text-lg leading-relaxed font-sans">
            <p>
              <strong className="text-vanilla font-serif font-semibold text-xl block mb-2">
                The Earth has always been telling us a story.
              </strong>
              Every crop that grows, every drop of water that moves, every change in the soil leaves a trace across the planet, but what if we could see those changes from above?
            </p>
            <p className="text-sm md:text-base text-tea/90 leading-relaxed">
              From acquiring data about the Earth to understanding crops and soil and finally using intelligence to manage water and irrigation, this event takes you from <span className="text-vanilla font-medium underline decoration-copper/50 underline-offset-4">observation to insight</span> and from <span className="text-vanilla font-medium underline decoration-olive/60 underline-offset-4">insight to action</span>.
            </p>
            
            <div suppressHydrationWarning className="pt-4 text-sm md:text-base font-serif font-medium text-tea border-t border-copper/20 tracking-wide">
              Three days. One planet. A world of data waiting to be explored.
            </div>
          </div>

          <p className="narration-fade-4 text-xs md:text-sm font-sans text-copper italic">
            Our journey begins at the place where engineers learn to turn possibilities into reality.
          </p>

          <div suppressHydrationWarning className="pt-10 flex flex-col items-center gap-2 text-tea/80">
            <span className="text-[11px] font-serif tracking-widest uppercase">
              Scroll to Descend
            </span>
            <ChevronDown className="w-4 h-4 text-copper animate-bounce" />
          </div>

        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 2: ABOUT NIE & ABOUT NISB-GRSS                             */}
        {/* ----------------------------------------------------------------- */}
        <section suppressHydrationWarning className="space-y-12">
          
          {/* About NIE */}
          <div suppressHydrationWarning className="bg-earth-900/60 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-copper/25 shadow-earth-card space-y-4 text-left">
            <div suppressHydrationWarning className="flex items-center gap-2 text-xs font-serif text-tea uppercase tracking-wider">
              <Globe className="w-4 h-4 text-olive" />
              <span>About NIE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-vanilla">
              The National Institute of Engineering
            </h2>
            <div className="copper-rule w-24 my-2" />
            <p className="text-sm md:text-base text-vanilla/90 leading-relaxed font-sans">
              Established in <strong className="text-tea font-serif">1946</strong>, <strong className="text-vanilla font-serif">NIE</strong> has grown into one of India&apos;s leading engineering institutions, building a legacy of education, innovation, and technological excellence, <span className="text-tea">and today, that journey extends far beyond the campus</span>, beyond the horizon, and beyond the atmosphere into the systems that allow us to observe our planet itself.
            </p>
          </div>

          {/* About NISB-GRSS */}
          <div suppressHydrationWarning className="bg-earth-900/60 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-copper/25 shadow-earth-card space-y-4 text-left">
            <div suppressHydrationWarning className="flex items-center gap-2 text-xs font-serif text-tea uppercase tracking-wider">
              <Award className="w-4 h-4 text-olive" />
              <span>About NISB–GRSS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-vanilla">
              NIE IEEE Student Branch — GRSS
            </h2>
            <div className="copper-rule w-24 my-2" />
            <p className="text-sm md:text-base text-vanilla/90 leading-relaxed font-sans">
              At the heart of this journey is the <strong className="text-vanilla font-serif">NIE IEEE Student Branch — GRSS</strong>, bringing the world of geoscience and remote sensing closer to students.
            </p>
            <p className="text-sm md:text-base text-tea/90 leading-relaxed font-sans">
              Backed by <strong className="text-vanilla font-serif">IEEE</strong>, <strong className="text-vanilla font-serif">GRSS</strong> brings together a global community exploring Earth through <span className="text-vanilla font-medium">remote sensing, geospatial technologies, and Earth observation</span> to NIE, and that global vision takes shape through the <span className="text-tea font-medium">NISB–GRSS Chapter</span>, connecting students to the world of geoscience and remote sensing through technical learning, expert interactions, and hands-on experiences, and now, this chapter brings that global perspective to you.
            </p>
          </div>

        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 3: THE SCHEDULE (Three Days)                               */}
        {/* ----------------------------------------------------------------- */}
        <section suppressHydrationWarning className="space-y-10">
          
          <div suppressHydrationWarning className="text-center space-y-3">
            <span className="text-xs font-serif text-tea tracking-widest uppercase">
              Event Itinerary
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-vanilla">
              The Schedule
            </h2>
            <p className="text-base font-serif italic text-tea/90">
              Three Days. Three Perspectives. Three Leaps.
            </p>
            <p className="text-xs sm:text-sm text-copper font-sans max-w-lg mx-auto">
              The journey unfolds in three stages — from seeing the Earth, to understanding it, to making smarter decisions for it.
            </p>
            <div className="copper-rule w-32 mx-auto pt-2" />
          </div>

          <div suppressHydrationWarning className="space-y-6">
            
            {/* Day 1 */}
            <div suppressHydrationWarning className="bg-earth-900/50 backdrop-blur-md p-8 rounded-2xl border border-copper/25 shadow-earth-card space-y-4 text-left transition-all hover:border-olive/40">
              <div suppressHydrationWarning className="flex items-center justify-between border-b border-copper/20 pb-3">
                <span className="text-xs font-serif font-bold text-tea uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-olive" />
                  Day 01 · November 3
                </span>
                <span className="text-[10px] font-mono text-copper uppercase tracking-wider">
                  Stage I: Observation
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-vanilla">
                See the Earth Differently
              </h3>
              <div suppressHydrationWarning className="text-xs font-serif text-tea italic">
                Geospatial Data Acquisition &amp; Earth Observation
              </div>
              <p className="text-sm text-vanilla/90 leading-relaxed font-sans">
                Begin with <strong className="text-vanilla font-serif">Geo-AI for Precision Agriculture</strong>, bringing together satellite, UAV, and field-based observations.
              </p>
              <p className="text-sm text-vanilla/90 leading-relaxed font-sans">
                Then get hands-on with <strong className="text-vanilla font-serif">Google Earth Engine and UAV data</strong> to map agricultural fields and monitor crops.
              </p>
              <div suppressHydrationWarning className="pt-2 text-xs font-serif italic text-copper border-t border-copper/15">
                From observation to insight
              </div>
            </div>

            {/* Day 2 */}
            <div suppressHydrationWarning className="bg-earth-900/50 backdrop-blur-md p-8 rounded-2xl border border-copper/25 shadow-earth-card space-y-4 text-left transition-all hover:border-olive/40">
              <div suppressHydrationWarning className="flex items-center justify-between border-b border-copper/20 pb-3">
                <span className="text-xs font-serif font-bold text-tea uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-olive" />
                  Day 02 · November 4
                </span>
                <span className="text-[10px] font-mono text-copper uppercase tracking-wider">
                  Stage II: Insight
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-vanilla">
                Read What the Land Reveals
              </h3>
              <div suppressHydrationWarning className="text-xs font-serif text-tea italic">
                Geo-AI for Crop &amp; Soil Assessment
              </div>
              <p className="text-sm text-vanilla/90 leading-relaxed font-sans">
                Go deeper with <strong className="text-vanilla font-serif">machine learning and deep learning</strong> for crop classification and agricultural monitoring.
              </p>
              <p className="text-sm text-vanilla/90 leading-relaxed font-sans">
                Explore how Geo-AI can reveal <strong className="text-vanilla font-serif">crop health, soil moisture, and vegetation stress</strong>—then apply it yourself using satellite and UAV data.
              </p>
              <div suppressHydrationWarning className="pt-2 text-xs font-serif italic text-copper border-t border-copper/15">
                From insight to intelligence
              </div>
            </div>

            {/* Day 3 */}
            <div suppressHydrationWarning className="bg-earth-900/50 backdrop-blur-md p-8 rounded-2xl border border-copper/25 shadow-earth-card space-y-4 text-left transition-all hover:border-olive/40">
              <div suppressHydrationWarning className="flex items-center justify-between border-b border-copper/20 pb-3">
                <span className="text-xs font-serif font-bold text-tea uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-olive" />
                  Day 03 · November 5
                </span>
                <span className="text-[10px] font-mono text-copper uppercase tracking-wider">
                  Stage III: Action
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-vanilla">
                Turn Intelligence into Action
              </h3>
              <div suppressHydrationWarning className="text-xs font-serif text-tea italic">
                Geo-AI for Water Management &amp; Precision Irrigation
              </div>
              <p className="text-sm text-vanilla/90 leading-relaxed font-sans">
                Explore AI-driven approaches to <strong className="text-vanilla font-serif">agricultural drought, crop water stress, and irrigation management.</strong>
              </p>
              <p className="text-sm text-vanilla/90 leading-relaxed font-sans">
                Bring it all together by developing a <strong className="text-vanilla font-serif">Geo-AI-based Precision Irrigation Decision-Support System.</strong>
              </p>
              <div suppressHydrationWarning className="pt-2 text-xs font-serif italic text-copper border-t border-copper/15">
                From intelligence to action.
              </div>
            </div>

          </div>

        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 4: THE SPEAKERS                                           */}
        {/* ----------------------------------------------------------------- */}
        <section suppressHydrationWarning className="bg-earth-900/60 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-copper/25 shadow-earth-card space-y-5 text-left">
          <div suppressHydrationWarning className="space-y-2">
            <span className="text-xs font-serif text-tea tracking-widest uppercase">
              Academic Faculty &amp; Practitioners
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-vanilla">
              The Speakers
            </h2>
            <p className="text-sm font-serif italic text-tea/90">
              Learn from those shaping the future of Earth observation.
            </p>
          </div>
          
          <div className="copper-rule w-24 my-2" />

          <p className="text-sm md:text-base text-vanilla/90 leading-relaxed font-sans">
            Meet the <strong className="text-vanilla font-serif">experts, researchers, and practitioners</strong> bringing their experience in <span className="text-tea font-medium">Geoscience, Remote Sensing, Geo-AI, and Precision Agriculture</span> to the event.
          </p>

          <p className="text-sm md:text-base text-tea/90 leading-relaxed font-sans">
            Through expert talks and hands-on sessions, gain insights from those working at the intersection of <strong className="text-vanilla font-serif">technology, data, and our planet. Explore their expertise, discover new perspectives and learn from the people shaping the field.</strong>
          </p>

          <div suppressHydrationWarning className="pt-3 text-xs font-serif italic text-copper border-t border-copper/15">
            Meet the minds behind the journey.
          </div>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 5: BENEFITS & FAQ PLACEHOLDERS                            */}
        {/* ----------------------------------------------------------------- */}
        <section suppressHydrationWarning className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div suppressHydrationWarning className="bg-earth-900/40 backdrop-blur-md p-8 rounded-2xl border border-copper/20 space-y-3 text-left">
            <h3 className="font-serif text-vanilla text-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-olive" />
              Event Benefits
            </h3>
            <p className="text-xs sm:text-sm text-tea/80 font-sans leading-relaxed">
              Hands-on GEE &amp; UAV workflows, IEEE GRSS Certificates of Completion, curated geospatial datasets, and research mentorship.
            </p>
          </div>

          <div suppressHydrationWarning className="bg-earth-900/40 backdrop-blur-md p-8 rounded-2xl border border-copper/20 space-y-3 text-left">
            <h3 className="font-serif text-vanilla text-lg flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-tea" />
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-tea/80 font-sans leading-relaxed">
              Open to engineering students, agronomists, faculty researchers, and industry specialists interested in satellite analytics and Geo-AI.
            </p>
          </div>

        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 6: REGISTRATION (Ground Level Target)                     */}
        {/* ----------------------------------------------------------------- */}
        <section suppressHydrationWarning className="bg-earth-900/70 backdrop-blur-md border border-copper/35 rounded-3xl p-8 sm:p-12 shadow-earth-card space-y-8 text-center">
          
          <div suppressHydrationWarning className="space-y-3">
            <span className="text-xs font-serif text-tea tracking-widest uppercase">
              Final Call for Participation
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-vanilla leading-tight">
              Your view of Earth is about to change.
            </h2>
            <div className="copper-rule w-32 mx-auto pt-2" />
          </div>

          <div suppressHydrationWarning className="max-w-xl mx-auto space-y-2 text-sm md:text-base font-serif text-tea/90">
            <p>You&apos;ve seen the planet from above.</p>
            <p>You&apos;ve followed the data.</p>
            <p>You&apos;ve explored the technology.</p>
            <p className="text-vanilla font-semibold text-lg pt-2 italic">
              Now it&apos;s your turn to step into the field.
            </p>
          </div>

          <p className="text-sm md:text-base text-vanilla/90 font-sans max-w-lg mx-auto leading-relaxed">
            Join us and explore how <strong className="text-vanilla font-serif">satellites, UAVs, geospatial data, and AI</strong> are transforming the way we understand agriculture and our planet.
          </p>

          <div suppressHydrationWarning className="pt-2 text-base sm:text-lg font-serif text-tea tracking-wide">
            Look beyond the horizon and step into the world of Geo-AI.
          </div>

          {/* Elegant Registration CTA Button */}
          <div suppressHydrationWarning className="pt-4 flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-xl bg-olive text-earth-950 font-serif font-bold text-base tracking-wide shadow-earth-card hover:bg-tea hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </section>

        {/* Footer */}
        <footer suppressHydrationWarning className="pt-10 pb-16 text-center text-xs font-serif text-copper space-y-2 border-t border-copper/20">
          <p>© 2026 The National Institute of Engineering (NIE) IEEE Student Branch — GRSS Chapter.</p>
          <p className="text-[11px] text-tea/60">Mysuru, Karnataka, India</p>
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
