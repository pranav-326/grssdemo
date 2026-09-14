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
      <div className="fixed inset-0 z-0 bg-[#07090b] flex flex-col items-center justify-center pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 60%, rgba(11, 15, 19, 0.75) 0%, rgba(7, 9, 11, 0.95) 70%, #07090b 100%)"
          }}
        />
        <div className="relative z-10 flex flex-col items-center opacity-40">
          <div className="w-36 h-36 rounded-full border border-[#A6B3A0]/30 animate-pulse-slow" />
          <span className="text-[10px] font-mono text-[#A6B3A0] tracking-tight uppercase mt-4">
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
      className="relative bg-[#07090b] text-white overflow-x-clip selection:bg-[#F59E0B] selection:text-black font-sans"
    >
      {/* ================= TOP NAVIGATION BAR (Hides after Hero) ================= */}
      <header
        suppressHydrationWarning
        className={`fixed top-0 left-0 right-0 z-50 bg-[rgba(11,15,19,0.70)] backdrop-blur-[12px] border-b border-[rgba(166,179,160,0.18)] shadow-2xl transition-all duration-500 ease-in-out ${
          isPastHero
            ? "-translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100 pointer-events-auto"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Event Brand: GRSS School (Bigger, Pure White) & Subheading (Muted Sage) */}
          <div className="flex flex-col text-center md:text-left">
            <span className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white tracking-tightest leading-none">
              GRSS School
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm font-subheading font-bold text-[#A6B3A0] tracking-tight leading-tight pt-1 max-w-lg">
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
              className="ml-2 px-5 py-2.5 rounded-2xl bg-[#adc278] text-black font-subheading font-bold text-xs sm:text-sm tracking-tight shadow-md hover:bg-[#c0d48f] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 no-underline"
            >
              <span className="text-black font-bold">Register</span>
              <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
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
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[rgba(11,15,19,0.70)] border border-[rgba(166,179,160,0.25)] backdrop-blur-[12px] text-[#A6B3A0] hover:text-white shadow-2xl hover:border-[#F59E0B]/60 transition-all duration-300 group"
        >
          {isMenuOpen ? (
            <X className="w-4 h-4 text-[#A6B3A0] group-hover:text-white" />
          ) : (
            <Menu className="w-4 h-4 text-[#A6B3A0] group-hover:text-white" />
          )}
          <span className="text-xs font-subheading font-bold tracking-tight uppercase text-[#A6B3A0] group-hover:text-white">
            Menu
          </span>
        </button>

        {/* Dropdown Floating Menu (Adaptive Glass Container) */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-3 w-72 sm:w-80 rounded-2xl bg-[rgba(11,15,19,0.70)] border border-[rgba(166,179,160,0.20)] backdrop-blur-[12px] p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between border-b border-[rgba(166,179,160,0.18)] pb-3">
              <div>
                <div className="font-heading font-bold text-sm text-white tracking-tight">GRSS School</div>
                <div className="text-[10px] font-subheading font-bold text-[#A6B3A0] tracking-tight">GeoIntelligence in Agriculture</div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1 rounded-md text-[#A6B3A0] hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Section Links */}
            <nav className="flex flex-col space-y-1 text-left font-sans font-normal text-sm tracking-tight">
              <a
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-[#A6B3A0] hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2.5"
              >
                <Globe className="w-3.5 h-3.5 text-[#10B981]" />
                <span>About NIE &amp; NISB–GRSS</span>
              </a>
              <a
                href="#schedule"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-[#A6B3A0] hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#4FC3F7]" />
                <span>The Schedule (3 Days)</span>
              </a>
              <a
                href="#speakers"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-[#A6B3A0] hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2.5"
              >
                <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>The Speakers</span>
              </a>
              <a
                href="#register"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-[#A6B3A0] hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Registration</span>
              </a>
            </nav>

            {/* Direct Register Action in Menu */}
            <div className="pt-2 border-t border-[rgba(166,179,160,0.18)]">
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-2xl bg-[#adc278] text-black font-subheading font-bold text-xs tracking-tight shadow-md hover:bg-[#c0d48f] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 no-underline"
              >
                <span className="text-black font-bold">Register</span>
                <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
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
      <div suppressHydrationWarning className="relative z-20 w-full overflow-hidden">
        
        {/* ----------------------------------------------------------------- */}
        {/* SECTION 1: HERO / INTRO (Full-Width Atmospheric Editorial Block)  */}
        {/* ----------------------------------------------------------------- */}
        <section suppressHydrationWarning className="min-h-screen w-full flex flex-col justify-center items-center text-center px-4 sm:px-8 pt-32 sm:pt-40 pb-20 editorial-band-center">
          
          <div suppressHydrationWarning className="w-full max-w-5xl mx-auto space-y-10">
            
            {/* Event Name in Hero: GRSS School (Bigger, Pure White, Deep Shadow) & Subtitle (Italics, Muted Sage) */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold text-white tracking-tightest text-shadow-heading">
                GRSS School
              </h1>
              <p className="text-sm sm:text-base md:text-xl font-quote italic font-normal text-[#A6B3A0] tracking-tight max-w-2xl mx-auto text-shadow-body">
                GeoIntelligence for Sustainable Precision Agriculture
              </p>
            </div>

            <div className="copper-rule w-36 md:w-56 mx-auto opacity-70" />

            {/* Narrative Theme Hook */}
            <div className="text-2xl sm:text-4xl md:text-5xl font-quote italic font-normal text-white leading-tight tracking-tight text-shadow-cinema">
              <NarrationTyping text="From the world above us," delay={200} speed={36} />
              <br />
              <span className="italic text-[#A6B3A0] font-normal">
                <NarrationTyping text="to the fields beneath us." delay={1200} speed={36} />
              </span>
            </div>

            <div className="copper-rule w-24 md:w-36 mx-auto opacity-40" />

            {/* Narrative Story Paragraphs */}
            <div suppressHydrationWarning className="max-w-3xl mx-auto text-center space-y-6 text-white/90 text-base md:text-lg leading-relaxed font-sans font-normal tracking-tight text-shadow-body">
              <NarrationLine delay={200}>
                <p>
                  <strong className="text-[#A6B3A0] font-quote italic text-xl md:text-2xl block mb-2 tracking-tight text-shadow-cinema">
                    &ldquo;The Earth has always been telling us a story.&rdquo;
                  </strong>
                  Every crop that grows, every drop of water that moves, every change in the soil leaves a trace across the planet, but what if we could see those changes from above?
                </p>
              </NarrationLine>

              <NarrationLine delay={350}>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans font-normal tracking-tight">
                  From acquiring data about the Earth to understanding crops and soil and finally using intelligence to manage water and irrigation, this event takes you from <span className="text-white font-subheading font-bold underline decoration-[#A6B3A0]/50 underline-offset-4">observation to insight</span> and from <span className="text-white font-subheading font-bold underline decoration-[#10B981]/60 underline-offset-4">insight to action</span>.
                </p>
              </NarrationLine>
              
              <NarrationLine delay={500}>
                <div suppressHydrationWarning className="pt-4 text-sm md:text-base font-quote italic text-[#A6B3A0] tracking-tight">
                  Three days. One planet. A world of data waiting to be explored.
                </div>
              </NarrationLine>
            </div>

            <p className="text-xs md:text-sm font-quote italic text-[#A6B3A0]/80 max-w-xl mx-auto tracking-tight text-shadow-body">
              <NarrationWords
                text="Our journey begins at the place where engineers learn to turn possibilities into reality."
                delay={600}
                staggerMs={30}
              />
            </p>

            <div suppressHydrationWarning className="pt-6 flex flex-col items-center gap-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#A6B3A0]/25 backdrop-blur-md shadow-lg">
                <span className="text-[11px] font-subheading font-bold text-[#A6B3A0] tracking-tight uppercase">
                  Scroll to Descend
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#F59E0B] animate-bounce" />
              </div>
            </div>

          </div>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 2: ABOUT NIE & ABOUT NISB-GRSS (Alternating Left / Right) */}
        {/* ----------------------------------------------------------------- */}
        <section id="about" suppressHydrationWarning className="w-full space-y-24 sm:space-y-36 scroll-mt-24 py-16">
          
          {/* Part 1: About NIE (Left-Aligned Full-Width Block) */}
          <div suppressHydrationWarning className="w-full editorial-band-left py-16 sm:py-24 px-6 sm:px-12 md:px-20 relative">
            {/* Parallax Floating Watermark Year */}
            <div 
              style={{ transform: `translateY(${(scrollProgress - 0.25) * 60}px)` }}
              className="absolute right-6 sm:right-16 top-1/2 -translate-y-1/2 select-none pointer-events-none text-7xl sm:text-9xl md:text-[11rem] font-heading font-bold text-white/[0.03] transition-transform duration-100 ease-out"
            >
              1946
            </div>

            <div className="max-w-3xl space-y-4 relative z-10 text-left">
              <span className="text-xs font-quote italic text-[#A6B3A0] uppercase tracking-tight block">
                Historical Heritage
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight text-shadow-heading">
                <NarrationTyping text="The National Institute of Engineering" delay={150} speed={25} />
              </h2>
              <p className="text-sm sm:text-base font-quote italic text-[#A6B3A0] tracking-tight text-shadow-body">
                Eight decades of pioneering technical education in Mysuru
              </p>
              
              <div className="copper-rule w-24 my-3" />
              
              <p className="text-sm md:text-base text-white/90 leading-relaxed font-sans font-normal tracking-tight text-shadow-body">
                Established in <strong className="text-[#A6B3A0] font-subheading font-bold">1946</strong>, <strong className="text-white font-subheading font-bold">NIE</strong> has grown into one of India&apos;s leading engineering institutions, building a legacy of education, innovation, and technological excellence.
              </p>
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans font-normal tracking-tight text-shadow-body">
                Today, that journey extends far beyond the campus, beyond the horizon, and beyond the atmosphere into the satellite systems that allow us to observe and nurture our planet itself.
              </p>
            </div>
          </div>

          {/* Part 2: About NISB-GRSS (Right-Aligned Full-Width Block) */}
          <div suppressHydrationWarning className="w-full editorial-band-right py-16 sm:py-24 px-6 sm:px-12 md:px-20 relative">
            {/* Parallax Floating Watermark Logo Text */}
            <div 
              style={{ transform: `translateY(${(scrollProgress - 0.35) * -70}px)` }}
              className="absolute left-6 sm:left-16 top-1/2 -translate-y-1/2 select-none pointer-events-none text-7xl sm:text-9xl md:text-[11rem] font-heading font-bold text-[#A6B3A0]/[0.03] transition-transform duration-100 ease-out"
            >
              GRSS
            </div>

            <div className="max-w-3xl ml-auto space-y-4 relative z-10 text-right">
              <span className="text-xs font-quote italic text-[#A6B3A0] uppercase tracking-tight block">
                Global Network &amp; Student Chapter
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight text-shadow-heading">
                <NarrationTyping text="NIE IEEE Student Branch — GRSS" delay={200} speed={25} />
              </h2>
              <p className="text-sm sm:text-base font-quote italic text-[#A6B3A0] tracking-tight text-shadow-body">
                Bridging academic discovery and space-age remote sensing
              </p>

              <div className="copper-rule w-24 ml-auto my-3" />

              <p className="text-sm md:text-base text-white/90 leading-relaxed font-sans font-normal tracking-tight text-shadow-body">
                At the heart of this journey is the <strong className="text-white font-subheading font-bold">NIE IEEE Student Branch — GRSS</strong>, bringing the world of geoscience and remote sensing closer to students.
              </p>
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans font-normal tracking-tight text-shadow-body">
                Backed by <strong className="text-white font-subheading font-bold">IEEE</strong>, <strong className="text-white font-subheading font-bold">GRSS</strong> brings together a global community exploring Earth through <span className="text-white font-subheading font-bold">remote sensing, geospatial technologies, and Earth observation</span>. That global vision takes shape through hands-on technical learning, expert mentorship, and real-world Earth telemetry.
              </p>
            </div>
          </div>

        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 3: THE SCHEDULE (Alternating Left & Right Days)            */}
        {/* ----------------------------------------------------------------- */}
        <section id="schedule" suppressHydrationWarning className="w-full space-y-20 sm:space-y-28 scroll-mt-24 py-16">
          
          {/* Section Heading Banner (Centered Full Width) */}
          <div suppressHydrationWarning className="text-center space-y-3 px-6 editorial-band-center py-10">
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight text-shadow-heading">
              <NarrationTyping text="The Schedule" delay={100} speed={35} />
            </h2>
            <p className="text-lg sm:text-xl font-quote italic text-[#A6B3A0] tracking-tight text-shadow-body">
              <NarrationWords text="Three Days. Three Perspectives. Three Leaps." staggerMs={28} delay={200} />
            </p>
            <p className="text-xs sm:text-sm text-white/75 font-sans font-normal max-w-lg mx-auto tracking-tight pt-1">
              <NarrationWords
                text="The journey unfolds in three stages — from seeing the Earth, to understanding it, to making smarter decisions for it."
                staggerMs={20}
                delay={350}
              />
            </p>
            <div className="copper-rule w-32 mx-auto pt-4" />
          </div>

          <div suppressHydrationWarning className="space-y-16 sm:space-y-24">
            
            {/* Day 1: Aligned to the LEFT (Stage 1 Observation · Sky Blue) */}
            <div suppressHydrationWarning className="w-full editorial-band-left py-14 sm:py-20 px-6 sm:px-12 md:px-20 relative">
              {/* Parallax Big Number "01" */}
              <div 
                style={{ transform: `translateY(${(scrollProgress - 0.45) * 50}px)` }}
                className="absolute right-8 sm:right-24 top-1/2 -translate-y-1/2 select-none pointer-events-none text-8xl sm:text-9xl md:text-[13rem] font-heading font-bold text-[#4FC3F7]/[0.05] transition-transform duration-100 ease-out"
              >
                01
              </div>

              <div className="max-w-2xl space-y-4 text-left relative z-10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-subheading font-bold text-[#4FC3F7] uppercase tracking-tight flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#4FC3F7]" />
                    Day 01 · November 3
                  </span>
                  <span className="text-[10px] font-subheading font-bold text-[#4FC3F7] border border-[#4FC3F7]/40 bg-[#4FC3F7]/10 px-2.5 py-0.5 rounded-full uppercase tracking-tight">
                    Stage I: Observation
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight text-shadow-heading">
                  <NarrationTyping text="See the Earth Differently" delay={100} speed={25} />
                </h3>
                <p className="text-sm sm:text-base font-quote italic text-[#4FC3F7] tracking-tight text-shadow-body">
                  Geospatial Data Acquisition &amp; Earth Observation
                </p>

                <div className="w-16 h-0.5 bg-[#4FC3F7]/40 my-2" />

                <p className="text-sm md:text-base text-white/90 leading-relaxed font-sans font-normal tracking-tight text-shadow-body">
                  Begin with <strong className="text-white font-subheading font-bold">Geo-AI for Precision Agriculture</strong>, bringing together satellite, UAV, and field-based observations.
                </p>
                <p className="text-sm md:text-base text-white/85 leading-relaxed font-sans font-normal tracking-tight text-shadow-body">
                  Then get hands-on with <strong className="text-white font-subheading font-bold">Google Earth Engine and UAV data</strong> to map agricultural fields and monitor crops.
                </p>

                <div className="pt-2 text-xs font-quote italic text-[#4FC3F7] tracking-tight">
                  From observation to insight →
                </div>
              </div>
            </div>

            {/* Day 2: Aligned to the RIGHT (Stage 2 Insight · Canopy Green) */}
            <div suppressHydrationWarning className="w-full editorial-band-right py-14 sm:py-20 px-6 sm:px-12 md:px-20 relative">
              {/* Parallax Big Number "02" */}
              <div 
                style={{ transform: `translateY(${(scrollProgress - 0.55) * -50}px)` }}
                className="absolute left-8 sm:left-24 top-1/2 -translate-y-1/2 select-none pointer-events-none text-8xl sm:text-9xl md:text-[13rem] font-heading font-bold text-[#10B981]/[0.05] transition-transform duration-100 ease-out"
              >
                02
              </div>

              <div className="max-w-2xl ml-auto space-y-4 text-right relative z-10">
                <div className="flex items-center justify-end gap-3">
                  <span className="text-[10px] font-subheading font-bold text-[#10B981] border border-[#10B981]/40 bg-[#10B981]/10 px-2.5 py-0.5 rounded-full uppercase tracking-tight">
                    Stage II: Insight
                  </span>
                  <span className="text-xs font-subheading font-bold text-[#10B981] uppercase tracking-tight flex items-center gap-2">
                    Day 02 · November 4
                    <Calendar className="w-3.5 h-3.5 text-[#10B981]" />
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight text-shadow-heading">
                  <NarrationTyping text="Read What the Land Reveals" delay={100} speed={25} />
                </h3>
                <p className="text-sm sm:text-base font-quote italic text-[#10B981] tracking-tight text-shadow-body">
                  Geo-AI for Crop &amp; Soil Assessment
                </p>

                <div className="w-16 h-0.5 bg-[#10B981]/40 ml-auto my-2" />

                <p className="text-sm md:text-base text-white/90 leading-relaxed font-sans font-normal tracking-tight text-shadow-body">
                  Go deeper with <strong className="text-white font-subheading font-bold">machine learning and deep learning</strong> for crop classification and agricultural monitoring.
                </p>
                <p className="text-sm md:text-base text-white/85 leading-relaxed font-sans font-normal tracking-tight text-shadow-body">
                  Explore how Geo-AI can reveal <strong className="text-white font-subheading font-bold">crop health, soil moisture, and vegetation stress</strong>—then apply it yourself using satellite and UAV data.
                </p>

                <div className="pt-2 text-xs font-quote italic text-[#10B981] tracking-tight">
                  ← From insight to intelligence
                </div>
              </div>
            </div>

            {/* Day 3: Aligned to the LEFT (Stage 3 Action · Amber) */}
            <div suppressHydrationWarning className="w-full editorial-band-left py-14 sm:py-20 px-6 sm:px-12 md:px-20 relative">
              {/* Parallax Big Number "03" */}
              <div 
                style={{ transform: `translateY(${(scrollProgress - 0.65) * 50}px)` }}
                className="absolute right-8 sm:right-24 top-1/2 -translate-y-1/2 select-none pointer-events-none text-8xl sm:text-9xl md:text-[13rem] font-heading font-bold text-[#F59E0B]/[0.05] transition-transform duration-100 ease-out"
              >
                03
              </div>

              <div className="max-w-2xl space-y-4 text-left relative z-10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-subheading font-bold text-[#F59E0B] uppercase tracking-tight flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#F59E0B]" />
                    Day 03 · November 5
                  </span>
                  <span className="text-[10px] font-subheading font-bold text-[#F59E0B] border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-2.5 py-0.5 rounded-full uppercase tracking-tight">
                    Stage III: Action
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight text-shadow-heading">
                  <NarrationTyping text="Turn Intelligence into Action" delay={100} speed={25} />
                </h3>
                <p className="text-sm sm:text-base font-quote italic text-[#F59E0B] tracking-tight text-shadow-body">
                  Geo-AI for Water Management &amp; Precision Irrigation
                </p>

                <div className="w-16 h-0.5 bg-[#F59E0B]/40 my-2" />

                <p className="text-sm md:text-base text-white/90 leading-relaxed font-sans font-normal tracking-tight text-shadow-body">
                  Explore AI-driven approaches to <strong className="text-white font-subheading font-bold">agricultural drought, crop water stress, and irrigation management.</strong>
                </p>
                <p className="text-sm md:text-base text-white/85 leading-relaxed font-sans font-normal tracking-tight text-shadow-body">
                  Bring it all together by developing a <strong className="text-white font-subheading font-bold">Geo-AI-based Precision Irrigation Decision-Support System.</strong>
                </p>

                <div className="pt-2 text-xs font-quote italic text-[#F59E0B] tracking-tight">
                  From intelligence to action.
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 4: THE SPEAKERS (Full-Width Asymmetric Banner)            */}
        {/* ----------------------------------------------------------------- */}
        <section id="speakers" suppressHydrationWarning className="w-full editorial-band-right py-16 sm:py-24 px-6 sm:px-12 md:px-20 scroll-mt-24 relative">
          <div className="max-w-4xl ml-auto text-right space-y-5">
            <span className="text-xs font-quote italic text-[#A6B3A0] uppercase tracking-tight block">
              Academic Faculty &amp; Industry Practitioners
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight text-shadow-heading">
              <NarrationTyping text="The Speakers" delay={100} speed={35} />
            </h2>
            <p className="text-base sm:text-lg font-quote italic text-[#A6B3A0] tracking-tight text-shadow-body">
              <NarrationWords text="Learn from those shaping the future of Earth observation." delay={200} staggerMs={25} />
            </p>
            
            <div className="copper-rule w-28 ml-auto my-3" />

            <p className="text-sm md:text-base text-white/90 leading-relaxed font-sans font-normal tracking-tight text-shadow-body max-w-2xl ml-auto">
              Meet the <strong className="text-white font-subheading font-bold">experts, researchers, and practitioners</strong> bringing their experience in <span className="text-[#A6B3A0] font-subheading font-bold">Geoscience, Remote Sensing, Geo-AI, and Precision Agriculture</span> to the event.
            </p>

            <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans font-normal tracking-tight text-shadow-body max-w-2xl ml-auto">
              Through expert talks and hands-on sessions, gain insights from those working at the intersection of <strong className="text-white font-subheading font-bold">technology, data, and our planet</strong>. Explore their expertise, discover new perspectives, and learn from the minds driving modern Earth observation.
            </p>

            <div suppressHydrationWarning className="pt-3 text-xs font-quote italic text-[#A6B3A0] tracking-tight">
              <NarrationWords 
                text="Meet the minds behind the journey." 
                delay={300} 
                staggerMs={25} 
              />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 5: BENEFITS & FAQ (Staggered Full-Width Blocks)           */}
        {/* ----------------------------------------------------------------- */}
        <section suppressHydrationWarning className="w-full space-y-16 py-12">
          
          {/* Benefits Block (Left Aligned) */}
          <div suppressHydrationWarning className="w-full editorial-band-left py-12 px-6 sm:px-12 md:px-20 text-left">
            <div className="max-w-2xl space-y-3">
              <h3 className="font-heading font-bold text-white text-2xl tracking-tight flex items-center gap-3 text-shadow-heading">
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                Event Benefits
              </h3>
              <p className="text-sm font-quote italic text-[#10B981] tracking-tight text-shadow-body">
                Certification, practical workflows, and real data access
              </p>
              <p className="text-sm text-white/90 font-sans font-normal tracking-tight leading-relaxed text-shadow-body">
                Hands-on Google Earth Engine &amp; UAV workflows, official IEEE GRSS Certificates of Completion, curated geospatial datasets, and research mentorship with senior practitioners.
              </p>
            </div>
          </div>

          {/* FAQ Block (Right Aligned) */}
          <div suppressHydrationWarning className="w-full editorial-band-right py-12 px-6 sm:px-12 md:px-20 text-right">
            <div className="max-w-2xl ml-auto space-y-3">
              <h3 className="font-heading font-bold text-white text-2xl tracking-tight flex items-center justify-end gap-3 text-shadow-heading">
                Frequently Asked Questions
                <HelpCircle className="w-5 h-5 text-[#4FC3F7]" />
              </h3>
              <p className="text-sm font-quote italic text-[#4FC3F7] tracking-tight text-shadow-body">
                Participation prerequisites and eligibility details
              </p>
              <p className="text-sm text-white/90 font-sans font-normal tracking-tight leading-relaxed text-shadow-body">
                Open to undergraduate and postgraduate engineering students, agronomists, faculty researchers, and industry specialists interested in remote sensing, satellite analytics, and Geo-AI.
              </p>
            </div>
          </div>

        </section>

        {/* ----------------------------------------------------------------- */}
        {/* SECTION 6: REGISTRATION (Full-Width Panoramic Ground Target CTA)   */}
        {/* ----------------------------------------------------------------- */}
        <section id="register" suppressHydrationWarning className="w-full editorial-band-center py-20 sm:py-28 px-6 text-center scroll-mt-24 relative">
          
          <div suppressHydrationWarning className="max-w-3xl mx-auto space-y-8 relative z-10">
            
            <div suppressHydrationWarning className="space-y-3">
              <span className="text-xs font-quote italic text-[#A6B3A0] uppercase tracking-tight block">
                Final Call for Participation
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold text-white tracking-tight leading-tight text-shadow-heading">
                <NarrationTyping text="Your view of Earth is about to change." delay={100} speed={30} />
              </h2>
              <p className="text-base sm:text-lg font-quote italic text-[#A6B3A0] tracking-tight text-shadow-body">
                From satellite vantage to ground resolution
              </p>
              <div className="copper-rule w-32 mx-auto pt-2" />
            </div>

            <div suppressHydrationWarning className="max-w-xl mx-auto space-y-2 text-sm md:text-base font-sans font-normal text-white/90 tracking-tight text-shadow-body">
              <p>You&apos;ve seen the planet from above.</p>
              <p>You&apos;ve followed the data.</p>
              <p>You&apos;ve explored the technology.</p>
              <div className="pt-2">
                <p className="text-white font-quote italic text-xl tracking-tight text-shadow-cinema">
                  <NarrationWords 
                    text="Now it's your turn to step into the field." 
                    delay={350} 
                    staggerMs={28} 
                  />
                </p>
              </div>
            </div>

            <p className="text-sm md:text-base text-white/85 font-sans font-normal max-w-lg mx-auto leading-relaxed tracking-tight text-shadow-body">
              Join us and explore how <strong className="text-white font-subheading font-bold">satellites, UAVs, geospatial data, and AI</strong> are transforming the way we understand agriculture and our planet.
            </p>

            <div suppressHydrationWarning className="pt-2 text-base sm:text-lg font-quote italic text-[#A6B3A0] tracking-tight text-shadow-body">
              Look beyond the horizon and step into the world of Geo-AI.
            </div>

            {/* Elegant Registration CTA Link with exact design requested */}
            <div suppressHydrationWarning className="pt-6 flex justify-center">
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl bg-[#adc278] text-black font-subheading font-bold text-base tracking-tight shadow-2xl hover:bg-[#c0d48f] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 no-underline group"
              >
                <span className="text-black font-bold">Register</span>
                <ArrowRight className="w-5 h-5 text-black stroke-[2.5] transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </div>

        </section>

        {/* Footer */}
        <footer suppressHydrationWarning className="pt-12 pb-16 text-center text-xs font-sans font-normal text-[#A6B3A0]/70 space-y-2 border-t border-[rgba(166,179,160,0.18)] tracking-tight">
          <p>© 2026 The National Institute of Engineering (NIE) IEEE Student Branch — GRSS Chapter.</p>
          <p className="text-[11px] text-[#A6B3A0]/50">Mysuru, Karnataka, India</p>
        </footer>

      </div>

    </main>
  );
}
