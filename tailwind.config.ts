import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#020408",
          900: "#050B14",
          850: "#091220",
          800: "#0E1A2D",
          700: "#172844",
        },
        ndvi: {
          neon: "#00FF66",
          bright: "#22E576",
          emerald: "#10B981",
          dark: "#052e16",
          glow: "rgba(0, 255, 102, 0.4)",
        },
        radar: {
          amber: "#FFB020",
          cyan: "#00E5FF",
          red: "#FF3366",
        },
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "Inter", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "SFMono-Regular", "Menlo", "Courier New", "monospace"],
        display: ["'Orbitron'", "'Space Grotesk'", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "scan-line": "scanline 6s linear infinite",
        "radar-sweep": "radarSweep 4s linear infinite",
        "glitch": "glitch 1.5s infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        radarSweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      boxShadow: {
        "neon-green": "0 0 20px -3px rgba(0, 255, 102, 0.5), 0 0 8px -2px rgba(0, 255, 102, 0.3)",
        "neon-cyan": "0 0 20px -3px rgba(0, 229, 255, 0.5), 0 0 8px -2px rgba(0, 229, 255, 0.3)",
        "hud-card": "0 8px 32px 0 rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(0, 255, 102, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
