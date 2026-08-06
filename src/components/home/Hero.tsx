"use client";

import React from "react";
import { Sparkles, ShieldCheck, BarChart3, FileSpreadsheet, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface HeroProps {
  title?: string;
  subtitle?: string;
}

export function Hero({
  title = "Find the Right Calculator",
  subtitle = "Accurate, instant, easy-to-use tools for personal finance, mortgage schedules, health tracking, and mathematical analysis.",
}: HeroProps) {
  const highlights = [
    { icon: Zap, text: "Instant Calculations" },
    { icon: BarChart3, text: "Interactive Charts" },
    { icon: FileSpreadsheet, text: "Export PDF & CSV" },
    { icon: ShieldCheck, text: "100% Private & Free" },
  ];

  return (
    <section className="relative text-center space-y-6 max-w-4xl mx-auto pt-6 pb-2">
      {/* Background ambient lighting glow */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Feature Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-sky-500/30 text-sky-400 text-xs font-semibold shadow-lg shadow-sky-500/10">
        <Sparkles className="h-3.5 w-3.5 animate-pulse text-sky-400" />
        <span>Next-Generation Calculation Platform</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
        {title.includes("Calculator") ? (
          <>
            {title.split("Calculator")[0]}
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Calculator
            </span>
            {title.split("Calculator")[1]}
          </>
        ) : (
          title
        )}
      </h1>

      {/* Subtitle */}
      <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>

      {/* Highlight Features Row */}
      <div className="pt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        {highlights.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-300 text-xs font-medium backdrop-blur-sm"
            >
              <Icon className="h-3.5 w-3.5 text-sky-400" />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Hero;

