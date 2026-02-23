/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        // Mac-inspired
        mac: {
          bg: "#1e1e2e",
          surface: "#2a2a3e",
          border: "#3a3a5c",
          accent: "#5e81f4",
          red: "#ff5f57",
          yellow: "#ffbc2e",
          green: "#28c840",
        },
        // Android Material You
        material: {
          primary: "#6750a4",
          secondary: "#625b71",
          tertiary: "#7d5260",
          surface: "#1c1b1f",
          container: "#2d2c31",
        },
        // Windows Fluent
        fluent: {
          bg: "#202020",
          surface: "#2d2d2d",
          accent: "#0078d4",
          border: "rgba(255,255,255,0.08)",
        },
        // Glass
        glass: {
          bg: "rgba(255,255,255,0.05)",
          border: "rgba(255,255,255,0.12)",
          highlight: "rgba(255,255,255,0.08)",
        },
      },
      backgroundImage: {
        "gradient-os": "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        "gradient-mac": "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
        "gradient-android": "linear-gradient(135deg, #1a0533, #2d0b5e, #1a0533)",
        "gradient-win": "linear-gradient(135deg, #001830, #003060, #001830)",
      },
      backdropBlur: {
        xs: "2px",
        "2xl": "40px",
        "3xl": "64px",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "boot-text": "bootText 0.1s ease-out forwards",
        "scanline": "scanline 8s linear infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(94, 129, 244, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(94, 129, 244, 0.8), 0 0 40px rgba(94, 129, 244, 0.4)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "os-window": "0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)",
        "os-dock": "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
        "os-tooltip": "0 4px 16px rgba(0,0,0,0.4)",
        "glow-accent": "0 0 20px rgba(94,129,244,0.5)",
        "glow-green": "0 0 20px rgba(40,200,64,0.5)",
        "neon": "0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor",
      },
    },
  },
  plugins: [],
};
