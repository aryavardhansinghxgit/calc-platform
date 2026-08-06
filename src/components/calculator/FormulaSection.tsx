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
    <div className="space-y-3">
      {explanation && <p className="text-xs text-zinc-500 dark:text-zinc-400">{explanation}</p>}

      <div className="px-3 py-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-sm text-blue-600 dark:text-blue-400 font-semibold overflow-x-auto">
        {formula}
      </div>

      {variables.length > 0 && (
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          {variables.map((v, i) => (
            <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">{v.symbol}</span>
              <span className="text-zinc-600 dark:text-zinc-400">= {v.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FormulaSection;
