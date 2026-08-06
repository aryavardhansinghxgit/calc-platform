"use client";

import React from "react";
import { Sparkles, ShieldCheck, BarChart3, FileSpreadsheet, Zap } from "lucide-react";

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
    <section className="text-center space-y-5 max-w-4xl mx-auto pt-6 pb-2">
      {/* Top Feature Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium">
        <Sparkles className="h-3.5 w-3.5 text-blue-600" />
        <span>Next-Generation Calculation Platform</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight">
        {title.includes("Calculator") ? (
          <>
            {title.split("Calculator")[0]}
            <span className="text-blue-600">
              Calculator
            </span>
            {title.split("Calculator")[1]}
          </>
        ) : (
          title
        )}
      </h1>

      {/* Subtitle */}
      <p className="text-zinc-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>

      {/* Highlight Features Row */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {highlights.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 text-xs font-medium shadow-sm"
            >
              <Icon className="h-3.5 w-3.5 text-blue-600" />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Hero;
