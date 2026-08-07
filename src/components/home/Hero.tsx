"use client";

import React from "react";
import { Sparkles, Zap, ShieldCheck, FileSpreadsheet, BarChart3 } from "lucide-react";

export interface HeroProps {
  title?: string;
  subtitle?: string;
}

export function Hero({
  title = "Instant Precision Calculators",
  subtitle = "High-speed, zero-friction tools for finance, mortgage, health, and math.",
}: HeroProps) {
  return (
    <section className="text-center space-y-2.5 max-w-3xl mx-auto pt-3 pb-1">
      {/* Top Pill */}
      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-[11px] font-semibold">
        <Sparkles className="h-3 w-3 text-blue-600 dark:text-blue-400" />
        <span>Instant Computation Engine</span>
      </div>

      {/* Main Compact Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-normal">
        {subtitle}
      </p>
    </section>
  );
}

export default Hero;
