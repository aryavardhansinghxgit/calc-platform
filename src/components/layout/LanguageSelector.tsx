"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Check, ChevronDown } from "lucide-react";
import { isLocalePublished } from "@/i18n/publishing";

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  isPublished: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", isPublished: true },
  { code: "es", name: "Spanish", nativeName: "Español", isPublished: true },
  { code: "fr", name: "French", nativeName: "Français", isPublished: false },
  { code: "de", name: "German", nativeName: "Deutsch", isPublished: false },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", isPublished: false },
  { code: "pt", name: "Portuguese", nativeName: "Português", isPublished: false },
];

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className = "" }: LanguageSelectorProps) {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect current active language from URL pathname
  const currentLocale = pathname.startsWith("/es") ? "es" : "en";
  const isSpanish = currentLocale === "es";

  // Determine calculator slug if currently on a calculator page
  let currentSlug: string | null = null;
  if (pathname.startsWith("/es/calculators/")) {
    currentSlug = pathname.replace("/es/calculators/", "").split("/")[0].split("?")[0];
  } else if (pathname.startsWith("/calculators/")) {
    currentSlug = pathname.replace("/calculators/", "").split("/")[0].split("?")[0];
  }

  // Calculate target URL for a given language code
  const getTargetHref = (langCode: string): string => {
    if (langCode === "en") {
      if (currentSlug) {
        return `/calculators/${currentSlug}`;
      }
      return pathname.replace(/^\/es(\/|$)/, "/") || "/";
    }

    if (langCode === "es") {
      if (currentSlug) {
        // If mortgage-calculator or other published slug in Spanish, route to /es/calculators/<slug>
        if (isLocalePublished("es", currentSlug)) {
          return `/es/calculators/${currentSlug}`;
        }
        // If calculator is not published in Spanish, route stays on English or goes to /calculators/<slug>
        return `/calculators/${currentSlug}`;
      }
      return `/es`;
    }

    // For any unpublished language, fallback safely to English canonical
    return currentSlug ? `/calculators/${currentSlug}` : "/";
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const activeLangOption = SUPPORTED_LANGUAGES.find((l) => l.code === currentLocale) || SUPPORTED_LANGUAGES[0];

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`} onKeyDown={handleKeyDown}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={isSpanish ? "Selector de idioma" : "Language selector"}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-blue-50 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <Globe className="h-3.5 w-3.5 shrink-0 text-blue-100" />
        <span className="font-medium">{activeLangOption.nativeName}</span>
        <ChevronDown
          className={`h-3 w-3 text-blue-200 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-label={isSpanish ? "Idiomas disponibles" : "Available languages"}
          className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl py-1 z-50 animate-in fade-in-50 zoom-in-95 duration-100 text-xs"
        >
          <div className="px-3 py-1.5 border-b border-slate-100 dark:border-zinc-800/80 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            {isSpanish ? "Seleccionar Idioma" : "Select Language"}
          </div>

          <div className="py-1">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isActive = lang.code === currentLocale;

              // If calculator is active, only allow published language destinations for this calculator
              const isTargetPublished = currentSlug
                ? isLocalePublished(lang.code, currentSlug)
                : lang.isPublished;

              if (!isTargetPublished) {
                return (
                  <div
                    key={lang.code}
                    className="flex items-center justify-between px-3 py-2 text-slate-400 dark:text-zinc-600 cursor-not-allowed select-none opacity-60"
                    title={isSpanish ? "Próximamente disponible" : "Coming soon"}
                  >
                    <span className="font-normal">{lang.nativeName}</span>
                    <span className="text-[9px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500">
                      {isSpanish ? "Pronto" : "Soon"}
                    </span>
                  </div>
                );
              }

              const href = getTargetHref(lang.code);

              return (
                <Link
                  key={lang.code}
                  href={href}
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 transition-colors ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-semibold"
                      : "text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/70 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{lang.nativeName}</span>
                    {lang.code !== "en" && lang.code !== "es" && (
                      <span className="text-[10px] text-slate-400">({lang.name})</span>
                    )}
                  </div>
                  {isActive && <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
