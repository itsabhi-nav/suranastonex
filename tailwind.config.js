/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#3b82f6",
        background: "#ffffff",
        foreground: "#111827",
        primary: {
          DEFAULT: "#3b82f6",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f3f4f6",
          foreground: "#374151",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f9fafb",
          foreground: "#6b7280",
        },
        accent: {
          DEFAULT: "#f3f4f6",
          foreground: "#374151",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#111827",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#111827",
        },
        // Futuristic theme colors
        neon: {
          cyan: "#00ffff",
          purple: "#bf00ff",
          pink: "#ff00ff",
          blue: "#0080ff",
          green: "#00ff80",
          yellow: "#ffff00",
        },
        glass: {
          50: "rgba(255, 255, 255, 0.05)",
          100: "rgba(255, 255, 255, 0.1)",
          200: "rgba(255, 255, 255, 0.15)",
          300: "rgba(255, 255, 255, 0.2)",
          400: "rgba(255, 255, 255, 0.25)",
          500: "rgba(255, 255, 255, 0.3)",
        },
        cyber: {
          dark: "#0a0a0a",
          darker: "#050505",
          gray: "#1a1a1a",
          light: "#2a2a2a",
          accent: "#00d4ff",
          secondary: "#ff0080",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Futuristic animations
        "glow": {
          "0%, 100%": { 
            boxShadow: "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
            opacity: "0.8"
          },
          "50%": { 
            boxShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
            opacity: "1"
          },
        },
        "glow-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff",
            transform: "scale(1)"
          },
          "50%": { 
            boxShadow: "0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #00ffff",
            transform: "scale(1.05)"
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "tilt": {
          "0%, 100%": { transform: "rotateY(0deg) rotateX(0deg)" },
          "50%": { transform: "rotateY(5deg) rotateX(5deg)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "matrix": {
          "0%": { transform: "translateY(-100vh)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "scan": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "glitch": {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "hologram": {
          "0%, 100%": { 
            opacity: "0.8",
            filter: "hue-rotate(0deg) brightness(1)"
          },
          "50%": { 
            opacity: "1",
            filter: "hue-rotate(180deg) brightness(1.2)"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Futuristic animations
        "glow": "glow 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "float-slow": "float-slow 4s ease-in-out infinite",
        "tilt": "tilt 6s ease-in-out infinite",
        "shimmer": "shimmer 2s ease-in-out infinite",
        "matrix": "matrix 10s linear infinite",
        "scan": "scan 3s ease-in-out infinite",
        "glitch": "glitch 0.3s ease-in-out infinite",
        "hologram": "hologram 3s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)',
        'holographic': 'linear-gradient(45deg, #ff0080, #00d4ff, #bf00ff, #00ff80)',
        'neon-glow': 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'futura': ['Futura', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
