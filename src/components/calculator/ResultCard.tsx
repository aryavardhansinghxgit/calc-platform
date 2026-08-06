"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
    <Card
      className={cn(
        "transition-all border rounded-[12px] p-5 space-y-2",
        highlight
          ? "bg-gradient-to-br from-sky-950/80 to-blue-900/40 border-sky-500/40 shadow-lg shadow-sky-500/10"
          : "bg-slate-900/80 border-slate-800",
        className
      )}
    >
      <div className="space-y-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
        <div className="flex items-baseline gap-1">
          <span
            className={cn(
              "text-2xl sm:text-3xl font-extrabold tracking-tight font-mono",
              highlight ? "text-sky-400" : "text-white"
            )}
          >
            {value}
          </span>
          {unit && <span className="text-xs text-slate-400 font-mono">{unit}</span>}
        </div>
      </div>
      {description && <p className="text-xs text-slate-400 leading-relaxed">{description}</p>}
    </Card>
  );
}

export default ResultCard;
