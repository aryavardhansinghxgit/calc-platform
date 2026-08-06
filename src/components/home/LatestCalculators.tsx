"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CALCULATORS, CalculatorItem } from "@/data/calculators";

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
    <section className="space-y-6 pt-8 border-t border-slate-800/80">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-400" /> {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {latestList.map((calc) => {
          const Icon = calc.icon;
          return (
            <Link key={calc.id} href={`/calculators/${calc.slug}`}>
              <Card className="h-full bg-slate-900/60 border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-900 transition-all cursor-pointer group">
                <CardHeader className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-blue-400 group-hover:text-blue-300 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {calc.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <CardTitle className="text-base font-bold text-white group-hover:text-blue-300 transition-colors flex items-center justify-between">
                      <span>{calc.title}</span>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-400" />
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
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
