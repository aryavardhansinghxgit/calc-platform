"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  locale?: string;
  className?: string;
}

export function ThemeToggle({ locale = "en", className = "" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSpanish = locale === "es";
  const isDark = mounted && resolvedTheme === "dark";

  const toggleLabel = isDark
    ? isSpanish
      ? "Cambiar a modo claro"
      : "Switch to light mode"
    : isSpanish
    ? "Cambiar a modo oscuro"
    : "Switch to dark mode";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label={isSpanish ? "Tema" : "Theme"}
        className={`h-8 w-8 rounded-lg flex items-center justify-center text-blue-100 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${className}`}
      >
        <span className="h-4 w-4 opacity-0" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={toggleLabel}
      title={toggleLabel}
      className={`h-8 w-8 rounded-lg flex items-center justify-center text-blue-100 hover:text-white hover:bg-white/10 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${className}`}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-300 transition-transform duration-200 rotate-0 scale-100" />
      ) : (
        <Moon className="h-4 w-4 text-blue-100 transition-transform duration-200 rotate-0 scale-100" />
      )}
    </button>
  );
}

export default ThemeToggle;
