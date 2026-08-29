"use client";

import React from "react";
import { BodyFatResult } from "@/lib/formulas/bodyFat";

interface BodyFatChartsProps {
  result: BodyFatResult;
}

// 1. Body Fat Arch Gauge
export function BodyFatArchGauge({ result }: BodyFatChartsProps) {
  const isValid = result.isValid;
  const bfp = isValid ? result.navyBfp : 0;
  const cat = result.categoryInfo;

  // Arc range: 2% (min) to 40% (max)
  const minBfp = 2;
  const maxBfp = 40;
  const clampedBfp = Math.max(minBfp, Math.min(maxBfp, bfp));
  const percent = isValid ? (clampedBfp - minBfp) / (maxBfp - minBfp) : 0;
  const angle = isValid ? -120 + percent * 240 : -120;

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

          {/* Category Color Bands */}
          {/* Essential: -120 to -70 deg */}
          <path d={describeArc(100, 110, 80, -120, -70)} fill="none" stroke="#38bdf8" strokeWidth="16" />
          {/* Athletes: -70 to -20 deg */}
          <path d={describeArc(100, 110, 80, -70, -20)} fill="none" stroke="#34d399" strokeWidth="16" />
          {/* Fitness: -20 to 20 deg */}
          <path d={describeArc(100, 110, 80, -20, 20)} fill="none" stroke="#10b981" strokeWidth="16" />
          {/* Average: 20 to 70 deg */}
          <path d={describeArc(100, 110, 80, 20, 70)} fill="none" stroke="#facc15" strokeWidth="16" />
          {/* Obese: 70 to 120 deg */}
          <path d={describeArc(100, 110, 80, 70, 120)} fill="none" stroke="#f87171" strokeWidth="16" />

          {/* Pivot dot */}
          <circle cx="100" cy="110" r="4" className="fill-zinc-400 dark:fill-zinc-600" />

          {/* Needle Pointer */}
          <g transform={`rotate(${angle}, 100, 110)`} className="transition-transform duration-700 ease-out">
            <line x1="100" y1="72" x2="100" y2="38" className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="3.5" strokeLinecap="round" />
            <polygon points="96,44 100,28 104,44" className="fill-zinc-900 dark:fill-zinc-100" />
          </g>

          {/* Labels */}
          <text x="24" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">2%</text>
          <text x="94" y="20" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">20%</text>
          <text x="160" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">40%+</text>
        </svg>

        {/* Center overlay readout */}
        <div className="absolute bottom-0 flex flex-col items-center bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-1.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 shadow-md">
          <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
            {isValid ? `${bfp}%` : "--"}
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-wider mt-0.5 px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
          >
            {isValid ? cat.category : "Awaiting Input"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full mt-4 text-center text-xs">
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Fat Mass</div>
          <div className="font-bold text-rose-600 dark:text-rose-400 mt-0.5">
            {isValid ? `${result.fatMassLbs} lbs (${result.fatMassKg} kg)` : "--"}
          </div>
        </div>
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Lean Body Mass</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
            {isValid ? `${result.leanMassLbs} lbs (${result.leanMassKg} kg)` : "--"}
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Body Composition Stacked Mass Bar
export function BodyCompositionBar({ result }: BodyFatChartsProps) {
  const isValid = result.isValid;
  const fatPct = isValid ? result.navyBfp : 0;
  const leanPct = isValid ? Math.max(0, 100 - fatPct) : 0;

  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Body Mass Distribution</h4>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Total Body Weight: {isValid ? `${result.weightLbs} lbs (${result.weightKg} kg)` : "--"}
          </p>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-zinc-600 dark:text-zinc-400 font-semibold">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500 inline-block"/>Lean Mass ({isValid ? `${leanPct.toFixed(1)}%` : "--"})</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-500 inline-block"/>Fat Mass ({isValid ? `${fatPct}%` : "--"})</span>
        </div>
      </div>

      <div className="relative h-6 w-full bg-zinc-100 dark:bg-zinc-950 rounded-full overflow-hidden flex border border-zinc-200 dark:border-zinc-800">
        {isValid && (
          <>
            <div
              className="h-full bg-emerald-500 hover:bg-emerald-600 transition-all flex items-center justify-center text-[10px] font-bold text-white"
              style={{ width: `${leanPct}%` }}
            >
              {leanPct > 20 && `${result.leanMassLbs} lbs`}
            </div>
            <div
              className="h-full bg-rose-500 hover:bg-rose-600 transition-all flex items-center justify-center text-[10px] font-bold text-white"
              style={{ width: `${fatPct}%` }}
            >
              {fatPct > 15 && `${result.fatMassLbs} lbs`}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
