"use client";

import React from "react";

export interface FormulaSectionProps {
  title?: string;
  formula: string;
  explanation?: string;
  variables?: Array<{ symbol: string; label: string }>;
}

export function FormulaSection({
  title = "Formula & Calculation Method",
  formula,
  explanation,
  variables = [],
}: FormulaSectionProps) {
  return (
    <div className="space-y-4">
      {explanation && <p className="text-sm text-slate-900 dark:text-slate-100 font-medium leading-relaxed">{explanation}</p>}

      <div className="px-4 py-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 font-sans tabular-nums text-base text-blue-700 dark:text-blue-400 font-bold overflow-x-auto">
        {formula}
      </div>

      {variables.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {variables.map((v, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-sans tabular-nums font-extrabold text-blue-600 dark:text-blue-400">{v.symbol}</span>
              <span className="text-slate-900 dark:text-slate-100 font-medium">= {v.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FormulaSection;
