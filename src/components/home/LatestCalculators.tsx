"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CALCULATORS, CalculatorItem } from "@/data/calculators";
import { getCalculatorDisplayTitle } from "@/lib/calculator-title";

export interface LatestCalculatorsProps {
  title?: string;
  subtitle?: string;
  items?: CalculatorItem[];
}

export function LatestCalculators({
  title = "Latest Calculators",
  subtitle = "Explore newly added precision tools across finance, health, math, and practical conversions.",
  items,
}: LatestCalculatorsProps = {}) {
  const latestList = items || CALCULATORS.filter((c) => !c.featured).slice(0, 6);

  return (
    <section className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
        <div className="space-y-0.5">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="text-blue-600 dark:text-blue-400">{title}</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800">
              <Sparkles className="h-3 w-3 text-blue-500" /> New Tools
            </span>
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {latestList.map((calc) => {
          const Icon = calc.icon;
          return (
            <Link key={calc.id} href={`/calculators/${calc.slug}`} className="min-w-0 group block h-full">
              <Card className="h-full bg-white dark:bg-zinc-900/90 border-zinc-200/80 dark:border-zinc-800 hover:border-blue-400/70 dark:hover:border-blue-500/60 hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-200 cursor-pointer rounded-xl overflow-hidden">
                <CardHeader className="p-3.5 sm:p-4 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="p-2 rounded-lg bg-blue-50/80 dark:bg-zinc-800 border border-blue-100/80 dark:border-zinc-700 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-zinc-950 transition-colors shadow-2xs">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700 uppercase tracking-wider">
                      {calc.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <CardTitle className="min-w-0 text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between gap-1.5 leading-snug">
                      <span className="min-w-0 truncate">{getCalculatorDisplayTitle(calc.title)}</span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-blue-600 dark:text-blue-400" />
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {calc.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default LatestCalculators;
