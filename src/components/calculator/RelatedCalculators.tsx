"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { getRelatedCalculators } from "@/lib/calculator-engine/registry";
import { getCalculatorDisplayTitle } from "@/lib/calculator-title";

export interface RelatedCalculatorsProps {
  currentId?: string;
  category?: string;
}

export function RelatedCalculators({ currentId = "", category = "Finance" }: RelatedCalculatorsProps) {
  const relatedList = useMemo(() => {
    return getRelatedCalculators(currentId, category, 6);
  }, [currentId, category]);

  if (relatedList.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {relatedList.map((calc) => (
        <Link
          key={calc.id}
          href={`/calculators/${calc.slug}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-blue-500 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors group shadow-2xs"
        >
          <Calculator className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 font-sans">
            {getCalculatorDisplayTitle(calc.title)}
          </span>
          <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-blue-600 ml-0.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ))}
    </div>
  );
}

export default RelatedCalculators;
