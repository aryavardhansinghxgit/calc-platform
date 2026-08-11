"use client";

import React from "react";
import { LeanBodyMassResult } from "@/lib/formulas/leanBodyMass";

interface LeanBodyMassChartsProps {
  result: LeanBodyMassResult;
}

// 1. Lean Mass Radial Arch Gauge
export function LeanMassGauge({ result }: LeanBodyMassChartsProps) {
  const lbmPct = result.consensusLbmPercentage;

  // Arc range: 50% to 95%
  const minPct = 50;
  const maxPct = 95;
  const clampedPct = Math.max(minPct, Math.min(maxPct, lbmPct));
  const percent = (clampedPct - minPct) / (maxPct - minPct);
  const angle = -120 + percent * 240;

  const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="relative w-64 h-40 flex items-center justify-center">
        <svg viewBox="0 0 200 140" className="w-full h-full">
          {/* Background track */}
          <path
            d={describeArc(100, 110, 80, -120, 120)}
            fill="none"
            className="stroke-zinc-200 dark:stroke-zinc-800"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Moderate LBM Zone (-120 to -20 deg) */}
          <path d={describeArc(100, 110, 80, -120, -20)} fill="none" stroke="#facc15" strokeWidth="16" />
          {/* Fitness LBM Zone (-20 to 60 deg) */}
          <path d={describeArc(100, 110, 80, -20, 60)} fill="none" stroke="#3b82f6" strokeWidth="16" />
          {/* Athletic Elite Zone (60 to 120 deg) */}
          <path d={describeArc(100, 110, 80, 60, 120)} fill="none" stroke="#10b981" strokeWidth="16" />

          {/* Pivot dot */}
          <circle cx="100" cy="110" r="4" className="fill-zinc-400 dark:fill-zinc-600" />

          {/* Needle Pointer */}
          <g transform={`rotate(${angle}, 100, 110)`} className="transition-transform duration-700 ease-out">
            <line x1="100" y1="72" x2="100" y2="38" className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="3.5" strokeLinecap="round" />
            <polygon points="96,44 100,28 104,44" className="fill-zinc-900 dark:fill-zinc-100" />
          </g>

          {/* Labels */}
          <text x="24" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">50%</text>
          <text x="94" y="20" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">72%</text>
          <text x="165" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">95%</text>
        </svg>

        {/* Center overlay readout */}
        <div className="absolute bottom-0 flex flex-col items-center bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-1.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 shadow-md">
          <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tight leading-none">
            {result.consensusLbmPercentage}%
          </span>
          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">
            LEAN BODY MASS ({result.consensusLbmLbs} LBS)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full mt-4 text-center text-xs">
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Lean Mass (lbs / kg)</div>
          <div className="font-bold text-blue-600 dark:text-blue-400 mt-0.5">{result.consensusLbmLbs} lbs ({result.consensusLbmKg} kg)</div>
        </div>
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Fat Mass (lbs / kg)</div>
          <div className="font-bold text-rose-600 dark:text-rose-400 mt-0.5">{result.fatMassLbs} lbs ({result.fatMassKg} kg)</div>
        </div>
      </div>
    </div>
  );
}

// 2. Formula Comparison Bar Chart
export function FormulaComparisonBarChart({ result }: LeanBodyMassChartsProps) {
  if (!result.formulaResults || result.formulaResults.length === 0) return null;

  const maxLbm = Math.max(...result.formulaResults.map((f) => f.lbmLbs)) * 1.15;

  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex justify-between items-center text-xs">
        <div>
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Clinical LBM Formula Comparison</h4>
          <p className="text-[11px] text-zinc-500">Boer vs James vs Hume vs Janmahasatian</p>
        </div>
        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">Mean: {result.consensusLbmLbs} lbs</span>
      </div>

      <div className="space-y-2 pt-1 text-xs">
        {result.formulaResults.map((f, idx) => {
          const pct = (f.lbmLbs / maxLbm) * 100;
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{f.formulaName}</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{f.lbmLbs} lbs ({f.lbmPercentage}%)</span>
              </div>
              <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-950 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <div
                  className="h-full bg-blue-500 hover:bg-blue-600 transition-all rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
