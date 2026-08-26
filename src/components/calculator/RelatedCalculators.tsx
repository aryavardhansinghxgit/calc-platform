"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { getCalculatorDefinition, getRelatedCalculators } from "@/lib/calculator-engine/registry";
import { getCalculatorDisplayTitle } from "@/lib/calculator-title";
import { CalculatorModuleDefinition } from "@/calculators";

export interface RelatedCalculatorsProps {
  currentId?: string;
  category?: string;
  explicitRelated?: (string | CalculatorModuleDefinition)[];
}

export function RelatedCalculators({
  currentId = "",
  category = "Finance",
  explicitRelated,
}: RelatedCalculatorsProps) {
  const relatedList = useMemo(() => {
    if (explicitRelated && explicitRelated.length > 0) {
      const explicitCalcs: CalculatorModuleDefinition[] = [];
      for (const item of explicitRelated) {
        if (typeof item === "object" && item !== null && item.slug) {
          explicitCalcs.push(item as CalculatorModuleDefinition);
        } else if (typeof item === "string") {
          const found = getCalculatorDefinition(item);
          if (found && !explicitCalcs.some((c) => c.id === found.id)) {
            explicitCalcs.push(found);
          } else if (!found) {
            const rawSlug = item.replace(/^\/calculators\//, "").replace(/^\//, "");
            const title = rawSlug
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ");
            explicitCalcs.push({
              id: rawSlug,
              slug: rawSlug,
              title: title,
              category: category,
              description: "",
              iconName: "Calculator",
              inputs: [],
              outputs: [],
              calculate: () => ({}),
            } as unknown as CalculatorModuleDefinition);
          }
        }
      }
      if (explicitCalcs.length > 0) {
        return explicitCalcs.slice(0, 8);
      }
    }
    return getRelatedCalculators(currentId, category, 8);
  }, [currentId, category, explicitRelated]);

  if (relatedList.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
      {relatedList.map((calc, idx) => (
        <React.Fragment key={calc.id || calc.slug}>
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
