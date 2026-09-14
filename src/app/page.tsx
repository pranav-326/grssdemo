"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { TargetReticle } from "@/components/TargetReticle";
import { 
  NarrationTyping, 
  NarrationWords, 
  NarrationLine 
} from "@/components/NarrationText";
import { 
  ChevronDown, 
  Globe, 
  Award, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Calendar,
  Menu,
  X
} from "lucide-react";

// Registration link destination (Google Form / Portal)
const REGISTRATION_URL = "https://forms.gle/nie-grss-registration";

// Institutional Logos in the navbar
const INSTITUTIONAL_LOGOS = [
  { src: "/logos/logo-4.png", alt: "The National Institute of Engineering, Mysuru" },
  { src: "/logos/logo-3.png", alt: "IEEE" },
  { src: "/logos/logo-2.png", alt: "IEEE GRSS" },
  { src: "/logos/logo-5.png", alt: "NISB Student Branch" },
  { src: "/logos/logo-1.png", alt: "NISB GRSS Chapter" },
];

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
  const [isPastHero, setIsPastHero] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isInteractive = false;
  const spectralMode = "rgb";

  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress smoothly across the scroll track & detect when hero leaves view
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const current = window.scrollY;
      const progress = Math.min(1, Math.max(0, current / totalScroll));
      setScrollProgress(progress);
      setIsPastHero(current > window.innerHeight * 0.65);
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
      {/* ================= TOP NAVIGATION BAR (Hides after Hero) ================= */}
      <header
        suppressHydrationWarning
        className={`fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-copper/30 shadow-2xl transition-all duration-500 ease-in-out ${
          isPastHero
            ? "-translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100 pointer-events-auto"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Event Brand: GRSS School (Bigger) & Subheading */}
          <div className="flex flex-col text-center md:text-left">
            <span className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-vanilla tracking-tight leading-none">
              GRSS School
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm font-serif text-tea tracking-wide leading-tight pt-1 max-w-lg">
              on GeoIntelligence for Sustainable Precision Agriculture
            </span>
          </div>

          {/* Institutional Logos (Bigger, High Visibility, Transparent without boxes) */}
          <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-4 md:gap-6">
            {INSTITUTIONAL_LOGOS.map((logo, idx) => (
              <div
                key={idx}
                className="h-10 sm:h-12 md:h-14 flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-full w-auto object-contain max-h-9 sm:max-h-11 md:max-h-12 drop-shadow-sm"
                />
              </div>
            ))}

            {/* Quick Register CTA Button in Navbar */}
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2.5 rounded-lg bg-olive text-earth-950 font-serif font-bold text-xs sm:text-sm tracking-wide shadow-earth-card hover:bg-tea transition-all flex items-center gap-1.5 no-underline"
            >
              <span>Register</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </header>

      {/* ================= TINY CORNER MENU (Appears after Hero disappears) ================= */}
      <div
        suppressHydrationWarning
        className={`fixed top-5 right-5 sm:top-6 sm:right-8 z-50 transition-all duration-500 ease-out ${
          isPastHero
            ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
            : "-translate-y-4 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-black/90 border border-copper/40 backdrop-blur-md text-tea hover:text-vanilla shadow-2xl hover:border-olive/60 transition-all duration-300 group"
        >
          {isMenuOpen ? (
            <X className="w-4 h-4 text-tea group-hover:text-vanilla" />
          ) : (
            <Menu className="w-4 h-4 text-tea group-hover:text-vanilla" />
          )}
          <span className="text-xs font-serif font-medium tracking-wider uppercase text-tea group-hover:text-vanilla">
            Menu
          </span>
        </button>

        {/* Dropdown Floating Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-3 w-72 sm:w-80 rounded-2xl bg-black/95 border border-copper/35 backdrop-blur-xl p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between border-b border-copper/25 pb-3">
              <div>
                <div className="font-serif font-bold text-sm text-vanilla">GRSS School</div>
                <div className="text-[10px] font-serif text-tea">GeoIntelligence in Agriculture</div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1 rounded-md text-tea/70 hover:text-vanilla hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Section Links */}
            <nav className="flex flex-col space-y-1 text-left font-serif text-sm">
              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-tea hover:text-vanilla hover:bg-white/5 transition-colors flex items-center gap-2.5"
              >
                <Globe className="w-3.5 h-3.5 text-olive" />
                <span>About NIE &amp; NISB–GRSS</span>
              </a>
              <a
                href="#schedule"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-tea hover:text-vanilla hover:bg-white/5 transition-colors flex items-center gap-2.5"
              >
                <Calendar className="w-3.5 h-3.5 text-olive" />
                <span>The Schedule (3 Days)</span>
              </a>
              <a
                href="#speakers"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-tea hover:text-vanilla hover:bg-white/5 transition-colors flex items-center gap-2.5"
              >
                <Award className="w-3.5 h-3.5 text-olive" />
                <span>The Speakers</span>
              </a>
              <a
                href="#register"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-tea hover:text-vanilla hover:bg-white/5 transition-colors flex items-center gap-2.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-olive" />
                <span>Registration</span>
              </a>
            </nav>

            {/* Direct Register Action in Menu */}
            <div className="pt-2 border-t border-copper/20">
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-olive text-earth-950 font-serif font-bold text-xs tracking-wide shadow-earth-card hover:bg-tea transition-all flex items-center justify-center gap-2 no-underline"
              >
                <span>Register Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Miniature Logos Row inside Menu */}
            <div className="pt-2 flex items-center justify-center gap-3 border-t border-copper/15">
              {INSTITUTIONAL_LOGOS.map((logo, idx) => (
                <div key={idx} className="h-6 w-8 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity">
                  <img src={logo.src} alt={logo.alt} className="max-h-full max-w-full object-contain drop-shadow-sm" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

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
        <section suppressHydrationWarning className="min-h-screen flex flex-col justify-center items-center text-center space-y-6 pt-28 sm:pt-36 md:pt-40">

          {/* Hero Presentation Card with Black Semi-Transparent Background for High Contrast */}
          <div suppressHydrationWarning className="w-full max-w-3xl bg-black/85 backdrop-blur-md border border-copper/30 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl space-y-7 text-center">
            
            {/* Institutional Presentation Line */}
            <div suppressHydrationWarning className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-earth-900/80 border border-copper/30 shadow-earth-subtle">
              <span className="h-2 w-2 rounded-full bg-olive animate-pulse" />
              <span className="text-xs font-serif font-medium text-tea tracking-widest uppercase">
                NISB–GRSS Chapter Presents
              </span>
            </div>

            {/* Event Name in Hero: GRSS School (Bigger) & Subheading */}
            <div className="space-y-1.5 pt-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold text-vanilla tracking-tight">
                GRSS School
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-serif text-tea italic tracking-wide max-w-xl mx-auto">
                on GeoIntelligence for Sustainable Precision Agriculture
              </p>
            </div>

            <div className="copper-rule w-32 md:w-48 mx-auto" />

            {/* Narrative Theme Hook with Left-to-Right Narration Typing */}
            <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-vanilla leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              <NarrationTyping text="From the world above us," delay={200} speed={36} />
              <br />
              <span className="italic text-tea font-light">
                <NarrationTyping text="to the fields beneath us." delay={1200} speed={36} />
              </span>
            </div>

            <div className="copper-rule w-24 md:w-36 mx-auto opacity-60" />

            {/* Narrative Paragraphs */}
            <div suppressHydrationWarning className="max-w-2xl mx-auto text-center space-y-5 text-vanilla/95 text-base md:text-lg leading-relaxed font-sans">
              <NarrationLine delay={200}>
                <p>
                  <strong className="text-vanilla font-serif font-semibold text-xl block mb-2">
                    The Earth has always been telling us a story.
                  </strong>
                  Every crop that grows, every drop of water that moves, every change in the soil leaves a trace across the planet, but what if we could see those changes from above?
                </p>
              </NarrationLine>

              <NarrationLine delay={350}>
                <p className="text-sm md:text-base text-tea/95 leading-relaxed">
                  From acquiring data about the Earth to understanding crops and soil and finally using intelligence to manage water and irrigation, this event takes you from <span className="text-vanilla font-medium underline decoration-copper/50 underline-offset-4">observation to insight</span> and from <span className="text-vanilla font-medium underline decoration-olive/60 underline-offset-4">insight to action</span>.
                </p>
              </NarrationLine>
              
              <NarrationLine delay={500}>
                <div suppressHydrationWarning className="pt-4 text-sm md:text-base font-serif font-medium text-tea border-t border-copper/20 tracking-wide">
                  Three days. One planet. A world of data waiting to be explored.
                </div>
              </NarrationLine>
            </div>

            <p className="text-xs md:text-sm font-sans text-copper italic max-w-lg mx-auto pt-2">
              <NarrationWords
                text="Our journey begins at the place where engineers learn to turn possibilities into reality."
                delay={600}
                staggerMs={30}
              />
            </p>

          </div>

          <div suppressHydrationWarning className="pt-4 flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/75 border border-copper/25 backdrop-blur-sm shadow-sm">
              <span className="text-[11px] font-serif text-tea tracking-widest uppercase">
                Scroll to Descend
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-copper animate-bounce" />
            </div>
          </div>

        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 2: ABOUT NIE & ABOUT NISB-GRSS                             */}
        {/* ----------------------------------------------------------------- */}
        <section id="about" suppressHydrationWarning className="space-y-12 scroll-mt-24">
          
          {/* About NIE */}
          <div suppressHydrationWarning className="bg-earth-900/60 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-copper/25 shadow-earth-card space-y-4 text-left">
            <div suppressHydrationWarning className="flex items-center gap-2 text-xs font-serif text-tea uppercase tracking-wider">
              <Globe className="w-4 h-4 text-olive" />
              <span>About NIE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-vanilla">
              <NarrationTyping text="The National Institute of Engineering" delay={150} speed={25} />
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
              <NarrationTyping text="NIE IEEE Student Branch — GRSS" delay={200} speed={25} />
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
        <section id="schedule" suppressHydrationWarning className="space-y-10 scroll-mt-24">
          
          <div suppressHydrationWarning className="text-center space-y-3">
            <span className="text-xs font-serif text-tea tracking-widest uppercase">
              Event Itinerary
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-vanilla">
              <NarrationTyping text="The Schedule" delay={100} speed={35} />
            </h2>
            <p className="text-base font-serif italic text-tea/90">
              <NarrationWords text="Three Days. Three Perspectives. Three Leaps." staggerMs={28} delay={200} />
            </p>
            <p className="text-xs sm:text-sm text-copper font-sans max-w-lg mx-auto">
              <NarrationWords
                text="The journey unfolds in three stages — from seeing the Earth, to understanding it, to making smarter decisions for it."
                staggerMs={20}
                delay={350}
              />
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
                <NarrationTyping text="See the Earth Differently" delay={100} speed={25} />
              </h3>
              <div suppressHydrationWarning className="text-xs font-serif text-tea italic">
                <NarrationWords text="Geospatial Data Acquisition & Earth Observation" delay={200} staggerMs={20} />
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
                <NarrationTyping text="Read What the Land Reveals" delay={100} speed={25} />
              </h3>
              <div suppressHydrationWarning className="text-xs font-serif text-tea italic">
                <NarrationWords text="Geo-AI for Crop & Soil Assessment" delay={200} staggerMs={20} />
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
                <NarrationTyping text="Turn Intelligence into Action" delay={100} speed={25} />
              </h3>
              <div suppressHydrationWarning className="text-xs font-serif text-tea italic">
                <NarrationWords text="Geo-AI for Water Management & Precision Irrigation" delay={200} staggerMs={20} />
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
        <section id="speakers" suppressHydrationWarning className="bg-earth-900/60 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-copper/25 shadow-earth-card space-y-5 text-left scroll-mt-24">
          <div suppressHydrationWarning className="space-y-2">
            <span className="text-xs font-serif text-tea tracking-widest uppercase">
              Academic Faculty &amp; Practitioners
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-vanilla">
              <NarrationTyping text="The Speakers" delay={100} speed={35} />
            </h2>
            <p className="text-sm font-serif italic text-tea/90">
              <NarrationWords text="Learn from those shaping the future of Earth observation." delay={200} staggerMs={25} />
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
            <NarrationWords 
              text="Meet the minds behind the journey." 
              delay={300} 
              staggerMs={25} 
            />
          </div>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 5: BENEFITS & FAQ PLACEHOLDERS                            */}
        {/* ----------------------------------------------------------------- */}
        <section suppressHydrationWarning className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div suppressHydrationWarning className="bg-earth-900/40 backdrop-blur-md p-8 rounded-2xl border border-copper/20 space-y-3 text-left h-full">
            <h3 className="font-serif text-vanilla text-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-olive" />
              Event Benefits
            </h3>
            <p className="text-xs sm:text-sm text-tea/80 font-sans leading-relaxed">
              Hands-on GEE &amp; UAV workflows, IEEE GRSS Certificates of Completion, curated geospatial datasets, and research mentorship.
            </p>
          </div>

          <div suppressHydrationWarning className="bg-earth-900/40 backdrop-blur-md p-8 rounded-2xl border border-copper/20 space-y-3 text-left h-full">
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
        <section id="register" suppressHydrationWarning className="bg-earth-900/70 backdrop-blur-md border border-copper/35 rounded-3xl p-8 sm:p-12 shadow-earth-card space-y-8 text-center scroll-mt-24">
          
          <div suppressHydrationWarning className="space-y-3">
            <span className="text-xs font-serif text-tea tracking-widest uppercase">
              Final Call for Participation
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-vanilla leading-tight">
              <NarrationTyping text="Your view of Earth is about to change." delay={100} speed={30} />
            </h2>
            <div className="copper-rule w-32 mx-auto pt-2" />
          </div>

          <div suppressHydrationWarning className="max-w-xl mx-auto space-y-2 text-sm md:text-base font-serif text-tea/90">
            <p>You&apos;ve seen the planet from above.</p>
            <p>You&apos;ve followed the data.</p>
            <p>You&apos;ve explored the technology.</p>
            <div className="pt-2">
              <p className="text-vanilla font-semibold text-lg italic">
                <NarrationWords 
                  text="Now it's your turn to step into the field." 
                  delay={350} 
                  staggerMs={28} 
                />
              </p>
            </div>
          </div>

          <p className="text-sm md:text-base text-vanilla/90 font-sans max-w-lg mx-auto leading-relaxed">
            Join us and explore how <strong className="text-vanilla font-serif">satellites, UAVs, geospatial data, and AI</strong> are transforming the way we understand agriculture and our planet.
          </p>

          <div suppressHydrationWarning className="pt-2 text-base sm:text-lg font-serif text-tea tracking-wide">
            Look beyond the horizon and step into the world of Geo-AI.
          </div>

          {/* Elegant Registration CTA Link */}
          <div suppressHydrationWarning className="pt-4 flex justify-center">
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-olive text-earth-950 font-serif font-bold text-base tracking-wide shadow-earth-card hover:bg-tea hover:scale-105 active:scale-95 transition-all flex items-center gap-3 no-underline group"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

        </section>

        {/* Footer */}
        <footer suppressHydrationWarning className="pt-10 pb-16 text-center text-xs font-serif text-copper space-y-2 border-t border-copper/20">
          <p>© 2026 The National Institute of Engineering (NIE) IEEE Student Branch — GRSS Chapter.</p>
          <p className="text-[11px] text-tea/60">Mysuru, Karnataka, India</p>
        </footer>

      </div>

    </main>
  );
}
