"use client";

import React from "react";
import { CaloriesBurnedResult } from "@/lib/formulas/caloriesBurned";

interface CaloriesBurnedChartsProps {
  result: CaloriesBurnedResult;
}

// 1. Calories Burned Radial Arch Gauge
export function CaloriesBurnedGauge({ result }: CaloriesBurnedChartsProps) {
  const calories = result.caloriesBurned;

  // Gauge range: 0 to 1200 kcal
  const minCal = 0;
  const maxCal = 1200;
  const clampedCal = Math.max(minCal, Math.min(maxCal, calories));
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

          {/* Light Burn Zone (-120 to -40 deg) */}
          <path d={describeArc(100, 110, 80, -120, -40)} fill="none" stroke="#38bdf8" strokeWidth="16" />
          {/* Moderate Burn Zone (-40 to 40 deg) */}
          <path d={describeArc(100, 110, 80, -40, 40)} fill="none" stroke="#f59e0b" strokeWidth="16" />
          {/* Intense Burn Zone (40 to 120 deg) */}
          <path d={describeArc(100, 110, 80, 40, 120)} fill="none" stroke="#ef4444" strokeWidth="16" />

          {/* Pivot dot */}
          <circle cx="100" cy="110" r="4" className="fill-zinc-400 dark:fill-zinc-600" />

          {/* Needle Pointer */}
          <g transform={`rotate(${angle}, 100, 110)`} className="transition-transform duration-700 ease-out">
            <line x1="100" y1="72" x2="100" y2="38" className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="3.5" strokeLinecap="round" />
            <polygon points="96,44 100,28 104,44" className="fill-zinc-900 dark:fill-zinc-100" />
          </g>

          {/* Labels */}
          <text x="24" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">0 kcal</text>
          <text x="94" y="20" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">600</text>
          <text x="160" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">1200 kcal</text>
        </svg>

        {/* Center overlay readout */}
        <div className="absolute bottom-0 flex flex-col items-center bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-1.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 shadow-md">
          <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 tracking-tight leading-none">
            {result.caloriesBurned} KCAL
          </span>
          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">
            MET {result.met} ({result.durationMinutes} MINS)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full mt-4 text-center text-xs">
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Burn Rate</div>
          <div className="font-bold text-amber-600 dark:text-amber-400 mt-0.5">{result.caloriesPerMinute} kcal / min</div>
        </div>
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Fat Mass Burned</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{result.fatMassLossLbs} lbs ({result.fatMassLossGrams} g)</div>
        </div>
      </div>
    </div>
  );
}

// 2. Activity Comparison Bar Chart
export function CaloriesBurnedActivityBarChart({ result }: CaloriesBurnedChartsProps) {
  if (!result.comparisonMatrix || result.comparisonMatrix.length === 0) return null;

  const maxCal = Math.max(...result.comparisonMatrix.map((c) => c.caloriesBurned)) * 1.15;

  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex justify-between items-center text-xs">
        <div>
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Activity Calorie Burn Comparison</h4>
          <p className="text-[11px] text-zinc-500">For {result.durationMinutes} mins at {result.weightLbs} lbs ({result.weightKg} kg)</p>
        </div>
        <span className="font-sans tabular-nums font-bold text-amber-600 dark:text-amber-400">Active MET: {result.met}</span>
      </div>

      <div className="space-y-2 pt-1 text-xs">
        {result.comparisonMatrix.map((item, idx) => {
          const pct = (item.caloriesBurned / maxCal) * 100;
          const isCurrent = item.activityName === result.activityName;
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className={`font-semibold ${isCurrent ? "text-amber-600 dark:text-amber-400 font-bold" : "text-zinc-800 dark:text-zinc-200"}`}>
                  {item.activityName} {isCurrent && "★"}
                </span>
                <span className="font-sans tabular-nums font-bold text-amber-600 dark:text-amber-400">{item.caloriesBurned} kcal</span>
              </div>
              <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-950 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <div
                  className={`h-full transition-all rounded-full ${isCurrent ? "bg-amber-500 hover:bg-amber-600" : "bg-blue-500 hover:bg-blue-600"}`}
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
