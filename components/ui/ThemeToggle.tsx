"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, mounted, toggleTheme } = useTheme();

  // Mount guard — prevent hydration mismatch (FOUC script already sets data-theme pre-paint)
  if (!mounted) {
    return (
      <button
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none fixed right-[30px] bottom-[30px] z-[999] flex h-[60px] w-[60px] items-center justify-center rounded-full opacity-0 max-[768px]:right-[20px] max-[768px]:bottom-[20px] max-[768px]:h-[50px] max-[768px]:w-[50px]"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      title={isDark ? "Tema claro" : "Tema oscuro"}
      className="fixed right-[30px] bottom-[30px] z-[999] flex h-[60px] w-[60px] items-center justify-center rounded-full border-none bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] shadow-lg transition-all hover:scale-110 hover:rotate-[15deg] hover:shadow-xl max-[768px]:right-[20px] max-[768px]:bottom-[20px] max-[768px]:h-[50px] max-[768px]:w-[50px]"
    >
      <span
        aria-hidden="true"
        className={`absolute text-[1.5rem] text-white transition-all max-[768px]:text-[1.25rem] ${isDark ? "rotate-[-90deg] opacity-0" : "rotate-0 opacity-100"}`}
      >
        {/* moon */}
        <span className="inline-block">🌙</span>
      </span>
      <span
        aria-hidden="true"
        className={`absolute text-[1.5rem] text-white transition-all max-[768px]:text-[1.25rem] ${isDark ? "rotate-0 opacity-100" : "rotate-90 opacity-0"}`}
      >
        {/* sun */}
        <span className="inline-block">☀️</span>
      </span>
    </button>
  );
}
