"use client";

import React from "react";

interface PercentageVisualizerProps {
  part: number;
  total: number;
  mode?: "part-of-whole" | "change" | "difference";
  v1?: number;
  v2?: number;
}

export function PercentageVisualizer({ part, total, mode = "part-of-whole", v1 = 100, v2 = 150 }: PercentageVisualizerProps) {
  const safeTotal = Math.max(0.0001, Math.abs(total || 100));
  const safePart = Math.max(0, Math.abs(part || 0));
  const pct = Math.min(100, Math.max(0, (safePart / safeTotal) * 100));

  // Pie / Doughnut SVG calculations
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  // Change Visualizer
  const changePct = v1 !== 0 ? ((v2 - v1) / v1) * 100 : 0;
  const maxVal = Math.max(1, Math.abs(v1), Math.abs(v2));
  const height1 = (Math.abs(v1) / maxVal) * 80;
  const height2 = (Math.abs(v2) / maxVal) * 80;

  return (
    <div className="space-y-4 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
          <span>📊</span> Live Interactive Percentage Visualizer
        </h4>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full">
          {pct.toFixed(2)}%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* 1. DOUGHNUT / PROPORTION RING */}
        <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <span className="text-[11px] font-bold text-zinc-500 mb-1">Proportion Ring</span>
          <svg width="130" height="130" viewBox="0 0 130 130" className="drop-shadow-xs">
            <circle
              cx="65"
              cy="65"
              r={radius}
              className="stroke-zinc-200 dark:stroke-zinc-800 fill-none stroke-[12]"
            />
            <circle
              cx="65"
              cy="65"
              r={radius}
              className="stroke-blue-600 dark:stroke-blue-500 fill-none stroke-[12] transition-all duration-500 ease-out"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 65 65)"
            />
            <text x="65" y="62" textAnchor="middle" fontSize="16" fontWeight="bold" className="fill-zinc-900 dark:fill-zinc-100 font-mono">
              {pct.toFixed(1)}%
            </text>
            <text x="65" y="78" textAnchor="middle" fontSize="9" className="fill-zinc-500 font-sans uppercase font-bold">
              Proportion
            </text>
          </svg>
        </div>

        {/* 2. PERCENTAGE PROGRESS BAR */}
        <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2">
          <span className="text-[11px] font-bold text-zinc-500">Percentage Bar</span>
          <div className="w-full h-7 border-2 border-zinc-300 dark:border-zinc-700 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 p-0.5 flex">
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-md transition-all duration-500 ease-out flex items-center justify-end pr-1 text-[9px] font-mono font-bold text-white"
              style={{ width: `${Math.max(4, pct)}%` }}
            >
              {pct > 15 ? `${pct.toFixed(1)}%` : ""}
            </div>
          </div>
          <div className="flex justify-between w-full text-[10px] font-mono font-bold text-zinc-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* 3. COMPARISON BAR CHART (BEFORE VS AFTER) */}
        <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-zinc-500">Value Comparison</span>
          <div className="h-24 w-full flex items-end justify-center gap-6 pt-2 pb-1 border-b border-zinc-200 dark:border-zinc-800">
            {/* Bar 1 */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-mono font-bold text-zinc-600 dark:text-zinc-400">{v1}</span>
              <div
                className="w-8 bg-zinc-400 dark:bg-zinc-600 rounded-t-md transition-all duration-500"
                style={{ height: `${Math.max(6, height1)}px` }}
              />
              <span className="text-[9px] font-bold text-zinc-500">V1</span>
            </div>

            {/* Bar 2 */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400">{v2}</span>
              <div
                className="w-8 bg-emerald-500 dark:bg-emerald-400 rounded-t-md transition-all duration-500"
                style={{ height: `${Math.max(6, height2)}px` }}
              />
              <span className="text-[9px] font-bold text-zinc-500">V2</span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
            Change: {changePct >= 0 ? "+" : ""}{changePct.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}
