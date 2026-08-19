"use client";

import React from "react";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";
import QuickCalculator from "./QuickCalculator";
import SearchBar from "./SearchBar";

export interface HeroProps {
  title?: string;
  subtitle?: string;
}

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br from-white via-slate-50/70 to-blue-50/40 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-blue-950/20 p-5 sm:p-6 lg:p-8 shadow-[0_20px_50px_-15px_rgba(37,99,235,0.12),0_10px_25px_-5px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all">
      {/* 3D Ambient Glowing Light Cones in Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-indigo-500/10 dark:bg-indigo-500/10 blur-3xl"
      />

      <div className="relative z-10 grid min-w-0 grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column (Col 7 - Primary Content Area) */}
        <div className="min-w-0 lg:col-span-7 space-y-5">
          <div className="space-y-2">
            {/* 3D Elevated Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/80 dark:to-indigo-950/80 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/80 text-[11px] font-bold uppercase tracking-wider shadow-[0_2px_8px_rgba(37,99,235,0.15)]">
              <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
              <span>Free 200+ Precision Calculators</span>
            </div>

            {/* Hero Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight font-heading">
              <span className="text-blue-600 dark:text-blue-500">CALCULATE</span> ANYTHING IN SECONDS
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
              Professional, verified calculation engines for Finance, Health, Mathematics, and Everyday decisions.
            </p>
          </div>

          {/* Integrated Search Bar & Quick Launch Chips */}
          <div className="pt-1">
            <SearchBar />
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 pt-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>100% Client-Side Privacy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Instant Real-Time Math</span>
            </div>
          </div>
        </div>

        {/* Right Column (Col 5 - 3D Elevated Quick Calculator on Desktop) */}
        <div className="min-w-0 lg:col-span-5 flex justify-center w-full relative">
          <div className="relative group w-full max-w-[340px] transition-transform duration-300 hover:-translate-y-1">
            {/* 3D Drop Shadow Aura */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-blue-500/20 to-indigo-500/20 dark:from-blue-500/30 dark:to-indigo-500/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="relative rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.1),0_5px_15px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.7)]">
              <QuickCalculator />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
