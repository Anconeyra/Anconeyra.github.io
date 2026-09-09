import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        "primary-dark": "var(--primary-dark)",
        secondary: "var(--secondary-color)",
        accent: "var(--accent-color)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-light": "var(--text-light)",
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-tertiary": "var(--bg-tertiary)",
        "bg-dark": "var(--bg-dark)",
        border: "var(--border-color)",
        "card-bg": "var(--card-bg)",
      },
      borderRadius: {
        DEFAULT: "var(--border-radius)",
        sm: "var(--border-radius-sm)",
        lg: "var(--border-radius-lg)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        colored: "var(--shadow-colored)",
        glass: "var(--glass-shadow)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        floatBadge: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(5deg)" },
        },
        pulse: {
          "0%, 100%": { transform: "scale(1.1)", opacity: "0.2" },
          "50%": { transform: "scale(1.15)", opacity: "0.3" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 0%" },
        },
        gradientFlow: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        gradientShift: {
          "0%, 100%": { opacity: "0.1" },
          "50%": { opacity: "0.2" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        fadeInLeft: {
          from: { opacity: "0", transform: "translateX(-50px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          from: { opacity: "0", transform: "translateX(50px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.8)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        terminalPulse: {
          "0%, 100%": { boxShadow: "0 4px 15px rgba(0, 255, 0, 0.3)" },
          "50%": { boxShadow: "0 4px 25px rgba(0, 255, 0, 0.6)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        floatBadge: "floatBadge 3s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        gradientFlow: "gradientFlow 3s ease infinite",
        gradientShift: "gradientShift 5s ease-in-out infinite",
        blink: "blink 2s ease-in-out infinite",
        fadeInLeft: "fadeInLeft 1s ease",
        fadeInRight: "fadeInRight 1s ease",
        fadeInUp: "fadeInUp 0.6s ease",
        scaleIn: "scaleIn 0.6s ease",
        terminalPulse: "terminalPulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
