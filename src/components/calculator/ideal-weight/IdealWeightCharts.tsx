"use client";

import React from "react";
import { IdealWeightResult } from "@/lib/formulas/idealWeight";

interface IdealWeightChartsProps {
  result: IdealWeightResult;
}

// 1. Ideal Weight Range Arch Gauge
export function IdealWeightArchGauge({ result }: IdealWeightChartsProps) {
  const minLbs = result.whoMinLbs;
  const maxLbs = result.whoMaxLbs;
  const currentLbs = result.currentWeightLbs || result.consensusLbs;

  // Scale range: minLbs * 0.8 to maxLbs * 1.2
  const rangeMin = Math.round(minLbs * 0.8);
  const rangeMax = Math.round(maxLbs * 1.2);
  const clampedLbs = Math.max(rangeMin, Math.min(rangeMax, currentLbs));
  const percent = (clampedLbs - rangeMin) / (rangeMax - rangeMin);
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

          {/* Underweight zone (-120 to -50 deg) */}
          <path d={describeArc(100, 110, 80, -120, -50)} fill="none" stroke="#38bdf8" strokeWidth="16" />
          {/* Optimal Healthy BMI Zone (-50 to 50 deg) */}
          <path d={describeArc(100, 110, 80, -50, 50)} fill="none" stroke="#10b981" strokeWidth="16" />
          {/* Overweight zone (50 to 120 deg) */}
          <path d={describeArc(100, 110, 80, 50, 120)} fill="none" stroke="#f87171" strokeWidth="16" />

          {/* Pivot dot */}
          <circle cx="100" cy="110" r="4" className="fill-zinc-400 dark:fill-zinc-600" />

          {/* Needle Pointer */}
          <g transform={`rotate(${angle}, 100, 110)`} className="transition-transform duration-700 ease-out">
            <line x1="100" y1="72" x2="100" y2="38" className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="3.5" strokeLinecap="round" />
            <polygon points="96,44 100,28 104,44" className="fill-zinc-900 dark:fill-zinc-100" />
          </g>

          {/* Labels */}
          <text x="24" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">{rangeMin} lbs</text>
          <text x="94" y="20" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">{result.consensusLbs} lbs</text>
          <text x="160" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">{rangeMax} lbs</text>
        </svg>

        {/* Center overlay readout */}
        <div className="absolute bottom-0 flex flex-col items-center bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-1.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 shadow-md">
          <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
            {currentLbs} <span className="text-xs font-normal text-zinc-500">lbs</span>
          </span>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mt-0.5">
            {result.currentWeightLbs ? result.statusCategory : "Consensus Target"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full mt-4 text-center text-xs">
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Healthy BMI Range (18.5–25.0)</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{minLbs} – {maxLbs} lbs</div>
        </div>
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Consensus Formula Ideal</div>
          <div className="font-bold text-blue-600 dark:text-blue-400 mt-0.5">{result.consensusLbs} lbs ({result.consensusKg} kg)</div>
        </div>
      </div>
    </div>
  );
}

// 2. Formula Comparison Bar Chart
export function IdealWeightFormulaBarChart({ result }: IdealWeightChartsProps) {
  const formulas = [
    { label: "Hamwi (1964)", lbs: result.hamwi.weightLbs, color: "bg-blue-500" },
    { label: "Devine (1974)", lbs: result.devine.weightLbs, color: "bg-sky-500" },
    { label: "Robinson (1983)", lbs: result.robinson.weightLbs, color: "bg-indigo-500" },
    { label: "Miller (1983)", lbs: result.miller.weightLbs, color: "bg-purple-500" },
    { label: "Lemmens (2005)", lbs: result.lemmens.weightLbs, color: "bg-emerald-500" },
  ];

  const maxVal = Math.max(...formulas.map((f) => f.lbs), result.whoMaxLbs) * 1.1;

  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Formula Comparison Breakdown</h4>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Comparing 5 clinical IBW formulas for height {result.heightCm} cm</p>
        </div>
      </div>

      <div className="space-y-2.5 pt-2 text-xs">
        {formulas.map((row, idx) => {
          const pct = (row.lbs / maxVal) * 100;
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{row.label}</span>
                <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">{row.lbs} lbs</span>
              </div>
              <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-950 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <div
                  className={`h-full ${row.color} hover:opacity-90 transition-all rounded-full`}
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
