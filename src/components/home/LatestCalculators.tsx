"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
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
  subtitle = "Explore newly added precision tools across finance, business, engineering, and everyday conversion.",
  items,
}: LatestCalculatorsProps = {}) {
  const latestList = items || CALCULATORS.filter((c) => !c.featured).slice(0, 6);

  return (
    <section className="space-y-6 pt-8 border-t border-zinc-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" /> {title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {latestList.map((calc) => {
          const Icon = calc.icon;
          return (
            <Link key={calc.id} href={`/calculators/${calc.slug}`} className="min-w-0">
              <Card className="h-full bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-sm transition-all cursor-pointer group rounded-xl">
                <CardHeader className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 text-blue-600 group-hover:text-blue-700 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
                      {calc.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <CardTitle className="min-w-0 text-base font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors flex items-center justify-between gap-2">
                      <span className="min-w-0 truncate">{getCalculatorDisplayTitle(calc.title)}</span>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-600" />
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
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
