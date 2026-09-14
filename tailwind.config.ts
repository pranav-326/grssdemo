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
        white: "#FFFFFF",
        sage: "#A6B3A0",
        "sky-blue": "#4FC3F7",
        "canopy-green": "#10B981",
        amber: {
          DEFAULT: "#F59E0B",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
        space: {
          950: "#07090b",
          900: "#0b0f13",
          glass: "rgba(11, 15, 19, 0.70)",
        },
        // Semantic aliases for seamless consistency
        vanilla: "#FFFFFF",
        tea: "#A6B3A0",
        olive: "#adc178",
        copper: "#A6B3A0",
        earth: {
          950: "#07090b",
          900: "#0b0f13",
          850: "#14181c",
          800: "#1c2228",
          700: "#2d353e",
          600: "#434e5a",
        },
      },
      fontFamily: {
        sans: ["'Helvetica Neue'", "Helvetica", "Arial", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "'Times New Roman'", "serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
        heading: ["'Playfair Display'", "Georgia", "serif"],
        subheading: ["'Helvetica Neue'", "Helvetica", "Arial", "sans-serif"],
        quote: ["'Playfair Display'", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "SFMono-Regular", "Menlo", "Courier New", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.035em",
        tighter: "-0.025em",
        tight: "-0.015em",
        normal: "-0.01em",
        wide: "-0.01em",
        wider: "-0.015em",
        widest: "-0.02em",
      },
      keyframes: {
        narrationIn: {
          "0%": { opacity: "0", transform: "translateX(-16px)", filter: "blur(2px)" },
          "100%": { opacity: "1", transform: "translateX(0)", filter: "blur(0)" },
        },
      },
      animation: {
        "narration-in": "narrationIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 24s linear infinite",
      },
      boxShadow: {
        "earth-card": "0 12px 36px -12px rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(169, 132, 103, 0.18)",
        "earth-subtle": "0 8px 24px -8px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
