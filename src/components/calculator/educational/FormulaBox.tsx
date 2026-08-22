"use client";

import React from "react";

export interface FormulaVariable {
  symbol: string;
  name: string;
  description?: string;
}

export interface FormulaBoxProps {
  title?: string;
  badge?: string;
  formula: string | React.ReactNode;
  variables?: FormulaVariable[];
  notes?: string | React.ReactNode;
  className?: string;
}

export function FormulaBox({
  title = "Standard Formula:",
  badge,
  formula,
  variables = [],
  notes,
  className = "",
}: FormulaBoxProps) {
  return (
    <div
      className={`p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2.5 ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
          {title}
        </span>
        {badge && (
          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>

      <div className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-slate-100 py-1 overflow-x-auto bg-white/80 dark:bg-slate-900/80 px-3 py-2 rounded-lg border border-slate-200/80 dark:border-slate-700/80">
        {formula}
      </div>

      {variables && variables.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
          {variables.map((v, i) => (
            <div key={i} className="p-1.5 rounded-md bg-white/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80">
              <strong className="text-slate-900 dark:text-slate-100">{v.symbol}:</strong>{" "}
              <span>{v.name}</span>
              {v.description && <span className="text-[11px] text-slate-500 block">({v.description})</span>}
            </div>
          ))}
        </div>
      )}

      {notes && (
        <div className="text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
          {notes}
        </div>
      )}
    </div>
  );
}

export default FormulaBox;
