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
        "min-w-0 px-3 py-2 rounded-lg",
        highlight
          ? "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800"
          : "bg-zinc-50 dark:bg-zinc-800/50",
        className
      )}
      title={description}
    >
      <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide leading-none mb-1">
        {label}
      </p>
      <div className="flex min-w-0 items-baseline gap-0.5">
        <span
          className={cn(
            "min-w-0 break-all font-semibold tracking-tight font-sans tabular-nums",
            highlight ? "text-xl text-blue-600 dark:text-blue-400" : "text-lg text-zinc-900 dark:text-zinc-100"
          )}
        >
          {value}
        </span>
        {unit && <span className="shrink-0 text-[10px] text-zinc-400 font-medium">{unit}</span>}
      </div>
    </div>
  );
}

export default ResultCard;
