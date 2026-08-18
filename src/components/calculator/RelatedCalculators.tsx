"use client";

import React, { useMemo } from "react";
import Link from "next/link";
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
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-semibold">
      {relatedList.map((calc, idx) => (
        <React.Fragment key={calc.id}>
          {idx > 0 && <span className="text-slate-300 dark:text-slate-700">|</span>}
          <Link
            href={`/calculators/${calc.slug}`}
            className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            {getCalculatorDisplayTitle(calc.title)}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}

export default RelatedCalculators;
