"use client";

import React from "react";
import QuickCalculator from "./QuickCalculator";
import SearchBar from "./SearchBar";

export interface HeroProps {
  title?: string;
  subtitle?: string;
}

export function Hero() {
  return (
    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Embedded Quick Scientific Calculator */}
        <div className="lg:col-span-5 flex justify-center">
          <QuickCalculator />
        </div>

        {/* Right Column: Search & High-Priority Tool Launch */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase tracking-wider">
              Free Online Calculators
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
              Instant Calculations & Precision Solvers
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-lg leading-normal">
              High-speed, zero-friction tools for home mortgage schedules, personal loans, fitness metrics, and mathematical formulas.
            </p>
          </div>

          {/* Integrated Search Bar with Quick Launch */}
          <SearchBar />
        </div>
      </div>
    </section>
  );
}

export default Hero;
