"use client";

import React from "react";
import { BmrResult } from "@/lib/formulas/bmr";

interface BmrChartsProps {
  result: BmrResult;
}

// 1. BMR vs TDEE Arch Gauge
export function BmrArchGauge({ result }: BmrChartsProps) {
  const bmr = result.selectedBmr;
  const tdee = result.tdee;

  // Arc range: 1000 kcal (min) to 4000 kcal (max)
  const minCal = 1000;
  const maxCal = 4000;
  const clampedCal = Math.max(minCal, Math.min(maxCal, bmr));
  const percent = (clampedCal - minCal) / (maxCal - minCal);
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

          {/* BMR Arc Zone (-120 to 10 deg) */}
          <path d={describeArc(100, 110, 80, -120, 10)} fill="none" stroke="#0284c7" strokeWidth="16" />
          {/* Active TDEE Zone (10 to 120 deg) */}
          <path d={describeArc(100, 110, 80, 10, 120)} fill="none" stroke="#10b981" strokeWidth="16" />

          {/* Pivot dot */}
          <circle cx="100" cy="110" r="4" className="fill-zinc-400 dark:fill-zinc-600" />

          {/* Needle Pointer */}
          <g transform={`rotate(${angle}, 100, 110)`} className="transition-transform duration-700 ease-out">
            <line x1="100" y1="72" x2="100" y2="38" className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="3.5" strokeLinecap="round" />
            <polygon points="96,44 100,28 104,44" className="fill-zinc-900 dark:fill-zinc-100" />
          </g>

          {/* Labels */}
          <text x="24" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">1000</text>
          <text x="94" y="20" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">2500</text>
          <text x="160" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">4000</text>
        </svg>

        {/* Center overlay readout */}
        <div className="absolute bottom-0 flex flex-col items-center bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-1.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 shadow-md">
          <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
            {bmr}
          </span>
          <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mt-0.5">
            BMR kcal/day
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full mt-4 text-center text-xs">
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Resting Energy (BMR)</div>
          <div className="font-bold text-sky-600 dark:text-sky-400 mt-0.5">{bmr} kcal</div>
        </div>
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Total Daily Burn (TDEE)</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{tdee} kcal</div>
        </div>
      </div>
    </div>
  );
}

// 2. Activity Level Comparison Bar Chart
export function BmrActivityBarChart({ result }: BmrChartsProps) {
  const tiers = result.activityTiers;
  const maxCals = Math.max(...tiers.map((t) => t.weightGainCals)) * 1.1;

  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Activity Level Caloric Comparison</h4>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Maintenance TDEE across physical activity multipliers</p>
        </div>
      </div>

      <div className="space-y-2.5 pt-2 text-xs">
        {tiers.map((row, idx) => {
          const pct = (row.tdee / maxCals) * 100;
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{row.label} ({row.multiplier}×)</span>
                <span className="font-sans tabular-nums font-bold text-emerald-600 dark:text-emerald-400">{row.tdee} kcal</span>
              </div>
              <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-950 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <div
                  className="h-full bg-emerald-500 hover:bg-emerald-600 transition-all rounded-full"
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

// 3. Smart Goal Macro Donut Chart
export function SmartGoalMacroChart({ result }: BmrChartsProps) {
  const g = result.smartGoalInfo;

  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Smart Goal Macronutrient Split ({g.label})</h4>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Daily Calorie Target: {g.targetCalories} kcal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/40 text-center">
          <span className="text-emerald-700 dark:text-emerald-400 font-bold block text-[10px]">Protein Target</span>
          <strong className="text-xl font-black text-emerald-900 dark:text-emerald-200 block mt-0.5">{g.proteinGrams} g</strong>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">{g.proteinCalories} kcal</span>
        </div>

        <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/40 text-center">
          <span className="text-amber-700 dark:text-amber-400 font-bold block text-[10px]">Carbohydrate Target</span>
          <strong className="text-xl font-black text-amber-900 dark:text-amber-200 block mt-0.5">{g.carbsGrams} g</strong>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 block mt-0.5">{g.carbsCalories} kcal</span>
        </div>

        <div className="p-3 bg-rose-50 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-900/40 text-center">
          <span className="text-rose-700 dark:text-rose-400 font-bold block text-[10px]">Dietary Fat Target</span>
          <strong className="text-xl font-black text-rose-900 dark:text-rose-200 block mt-0.5">{g.fatGrams} g</strong>
          <span className="text-[10px] text-rose-600 dark:text-rose-400 block mt-0.5">{g.fatCalories} kcal</span>
        </div>
      </div>
    </div>
  );
}
