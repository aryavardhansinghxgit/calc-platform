"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ResultCardProps {
  label: string;
  value: string | number;
  description?: string;
  highlight?: boolean;
  unit?: string;
  className?: string;
}

export function ResultCard({
  label,
  value,
  description,
  highlight = false,
  unit,
  className,
}: ResultCardProps) {
  return (
    <div
      className={cn(
        "min-w-0 p-3.5 rounded-xl border transition-all",
        highlight
          ? "bg-gradient-to-br from-blue-50/80 to-indigo-50/40 dark:from-slate-900 dark:to-blue-950/40 border-blue-200 dark:border-slate-800 shadow-sm"
          : "bg-white/90 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/60 shadow-2xs",
        className
      )}
      title={description}
    >
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
        {label}
      </p>
      <div className="flex min-w-0 items-baseline gap-1">
        <span
          className={cn(
            "min-w-0 break-all font-extrabold tracking-tight font-sans tabular-nums",
            highlight ? "text-2xl sm:text-3xl text-blue-700 dark:text-blue-400" : "text-xl text-slate-900 dark:text-slate-100"
          )}
        >
          {value}
        </span>
        {unit && <span className="shrink-0 text-xs text-slate-400 font-medium">{unit}</span>}
      </div>
    </div>
  );
}

export default ResultCard;
