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
    return getRelatedCalculators(currentId, category, 4);
  }, [currentId, category]);

  if (relatedList.length === 0) return null;

  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {relatedList.map((calc) => (
        <Link
          key={calc.id}
          href={`/calculators/${calc.slug}`}
          className="flex-shrink-0 w-52 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors group"
        >
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {getCalculatorDisplayTitle(calc.title)}
            </span>
            <ArrowRight className="h-3 w-3 text-zinc-400 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">{calc.description}</p>
        </Link>
      ))}
    </div>
  );
}

export default RelatedCalculators;
