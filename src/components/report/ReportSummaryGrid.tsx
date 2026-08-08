"use client";

import React from "react";
import { ReportMetricCardData, ReportSectionData } from "./types";

export interface ReportSummaryGridProps {
  metrics: ReportMetricCardData[];
  sections: ReportSectionData[];
}

export function ReportSummaryGrid({ metrics, sections }: ReportSummaryGridProps) {
  return (
    <div className="space-y-6">
      {/* Top Metric Cards Bar */}
      {metrics && metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {metrics.map((m, idx) => (
            <div
              key={`metric-${idx}`}
              className="p-3 rounded-lg border border-zinc-300 bg-zinc-50/80 space-y-1"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                {m.label}
              </span>
              <div className="text-base font-extrabold font-mono text-zinc-900">
                {m.value}
              </div>
              {m.subtitle && (
                <span className="text-[10px] text-zinc-500 font-medium block">
                  {m.subtitle}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Inputs & Results Grid Sections */}
      {sections && sections.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map((sec, idx) => (
            <div
              key={`section-${idx}`}
              className="border border-zinc-300 rounded-lg p-4 space-y-3 bg-white"
            >
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1.5">
                {sec.title}
              </h3>
              <div className="space-y-1.5 text-xs">
                {sec.items.map((item, itemIdx) => (
                  <div
                    key={`item-${idx}-${itemIdx}`}
                    className={`flex justify-between items-center py-0.5 ${
                      item.highlight ? "font-bold text-zinc-900" : "text-zinc-700"
                    }`}
                  >
                    <span className="text-zinc-600 font-medium">{item.label}:</span>
                    <span className="font-mono text-zinc-900 font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportSummaryGrid;
