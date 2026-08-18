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
    return getRelatedCalculators(currentId, category, 8);
  }, [currentId, category]);

  if (relatedList.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
      {relatedList.map((calc, idx) => (
        <React.Fragment key={calc.id}>
          <Link
            href={`/calculators/${calc.slug}`}
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition-colors"
          >
            {getCalculatorDisplayTitle(calc.title)}
          </Link>
          {idx < relatedList.length - 1 && (
            <span className="text-slate-400 dark:text-slate-600 select-none">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default RelatedCalculators;
