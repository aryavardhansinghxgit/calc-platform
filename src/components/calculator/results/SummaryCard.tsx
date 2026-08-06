"use client";

import React from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";

export interface SummaryMetric {
  label: string;
  value: string | number;
  highlight?: boolean;
}

export interface SummaryCardProps {
  title?: string;
  metrics: SummaryMetric[];
}

export function SummaryCard({ title = "Summary", metrics }: SummaryCardProps) {
  return (
    <Card className="bg-slate-900/90 border-slate-800 rounded-[12px] p-5 space-y-4">
      {title && <CardTitle className="text-sm font-bold text-slate-200">{title}</CardTitle>}
      <CardContent className="p-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border ${
              m.highlight
                ? "bg-sky-950/40 border-sky-500/30 text-sky-400"
                : "bg-slate-950/60 border-slate-800 text-slate-100"
            }`}
          >
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              {m.label}
            </span>
            <span className="text-xl font-extrabold font-mono mt-1 block">
              {m.value}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default SummaryCard;
