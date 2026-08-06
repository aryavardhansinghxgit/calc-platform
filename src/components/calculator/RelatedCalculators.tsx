"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CALCULATORS, CalculatorItem } from "@/data/calculators";

export interface RelatedCalculatorsProps {
  currentId?: string;
  category?: string;
}

export function RelatedCalculators({ currentId, category = "Finance" }: RelatedCalculatorsProps) {
  const relatedList = CALCULATORS.filter(
    (c) => c.id !== currentId && (c.category.toLowerCase() === category.toLowerCase() || c.featured)
  ).slice(0, 3);

  return (
    <section className="space-y-4 pt-4 border-t border-slate-800/80">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="h-4 w-4 text-sky-400" /> Related Calculators
        </h3>
        <Link href="/" className="text-xs font-semibold text-sky-400 hover:text-sky-300">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {relatedList.map((calc) => {
          const Icon = calc.icon;
          return (
            <Link key={calc.id} href={`/calculators/${calc.slug}`}>
              <Card className="h-full bg-slate-900/60 border-slate-800/80 hover:border-sky-500/40 hover:bg-slate-900 transition-all cursor-pointer group">
                <CardHeader className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sky-400 group-hover:text-sky-300 transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700">
                      {calc.category}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <CardTitle className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors flex items-center justify-between">
                      <span>{calc.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-sky-400" />
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

export default RelatedCalculators;
