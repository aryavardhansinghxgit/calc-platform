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
    <section className="bg-card text-card-foreground border border-border rounded-2xl p-5 shadow-sm transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column (Col 7 - Primary Content Area) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
              Free Online Calculators
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1.5 leading-tight">
              Instant Precision Calculators & Solvers
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl leading-normal">
              High-speed, zero-friction tools for home mortgage schedules, personal loans, fitness metrics, and mathematical formulas.
            </p>
          </div>

          {/* Integrated Search Bar & Quick Launch Chips */}
          <SearchBar />
        </div>

        {/* Right Column (Col 5 - Secondary Quick Calculator Visual Element on Desktop, Below Content on Mobile) */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <QuickCalculator />
        </div>
      </div>
    </section>
  );
}

export default Hero;
