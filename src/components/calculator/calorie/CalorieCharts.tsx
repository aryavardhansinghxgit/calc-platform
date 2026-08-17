"use client";

import React from "react";
import { CalorieResult } from "@/lib/formulas/calorie";

interface CalorieChartsProps {
  result: CalorieResult;
  selectedGoalCals?: number;
}

// 1. Calorie Target Radial Arch Gauge
export function CalorieArchGauge({ result }: CalorieChartsProps) {
  const tdee = result.tdee;
  const bmr = result.bmr;
  const target = result.tiers.weightLoss.caloriesPerDay;

  // Arc range from BMR*0.8 (min) to TDEE*1.3 (max)
  const minCal = Math.round(bmr * 0.75);
  const maxCal = Math.round(tdee * 1.35);

  const clampedTarget = Math.max(minCal, Math.min(maxCal, target));
  const percent = (clampedTarget - minCal) / (maxCal - minCal);
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

          {/* Calorie Arc Zones */}
          {/* Deficit Zone: -120 to -20 deg */}
          <path d={describeArc(100, 110, 80, -120, -20)} fill="none" stroke="#0284c7" strokeWidth="16" />
          {/* Maintenance Zone: -20 to +40 deg */}
          <path d={describeArc(100, 110, 80, -20, 40)} fill="none" stroke="#10b981" strokeWidth="16" />
          {/* Surplus Zone: +40 to +120 deg */}
          <path d={describeArc(100, 110, 80, 40, 120)} fill="none" stroke="#f97316" strokeWidth="16" />

          {/* Pivot dot */}
          <circle cx="100" cy="110" r="4" className="fill-zinc-400 dark:fill-zinc-600" />

          {/* Needle Pointer */}
          <g transform={`rotate(${angle}, 100, 110)`} className="transition-transform duration-700 ease-out">
            <line x1="100" y1="72" x2="100" y2="38" className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="3.5" strokeLinecap="round" />
            <polygon points="96,44 100,28 104,44" className="fill-zinc-900 dark:fill-zinc-100" />
          </g>

          {/* Labels */}
          <text x="24" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">Loss</text>
          <text x="88" y="20" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">Maintain</text>
          <text x="160" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">Gain</text>
        </svg>

        {/* Center overlay readout */}
        <div className="absolute bottom-0 flex flex-col items-center bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-1.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 shadow-md">
          <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
            {tdee}
          </span>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mt-0.5">
            Maintenance kcal/day
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full mt-4 text-center text-xs">
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">BMR (Resting)</div>
          <div className="font-bold text-sky-600 dark:text-sky-400 mt-0.5">{result.bmr} kcal</div>
        </div>
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Weight Loss (1lb)</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{result.tiers.weightLoss.caloriesPerDay} kcal</div>
        </div>
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Extreme (-2lb)</div>
          <div className="font-bold text-orange-600 dark:text-orange-400 mt-0.5">{result.tiers.extremeLoss.caloriesPerDay} kcal</div>
        </div>
      </div>
    </div>
  );
}

// 2. 7-Day Zigzag Calorie Cycling Bar Chart
export function ZigzagBarChart({ result }: CalorieChartsProps) {
  const days = result.zigzagSchedule;
  const maxCals = Math.max(...days.map((d) => Math.max(d.schedule1Calories, d.schedule2Calories))) * 1.15;

  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">7-Day Zigzag Calorie Schedule</h4>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Alternating high &amp; low calorie days to prevent metabolic adaptation</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-zinc-600 dark:text-zinc-400 font-semibold">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500 inline-block"/>Schedule 1 (3 High/4 Low)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-purple-500 inline-block"/>Schedule 2 (Wave)</span>
        </div>
      </div>

      <div className="h-56 w-full pt-4 pb-2">
        <div className="h-full w-full flex items-end justify-between gap-2 px-2 border-b border-zinc-200 dark:border-zinc-800">
          {days.map((day, idx) => {
            const h1 = (day.schedule1Calories / maxCals) * 100;
            const h2 = (day.schedule2Calories / maxCals) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1 h-44">
                  {/* Schedule 1 Bar */}
                  <div
                    className="w-1/2 bg-blue-500 hover:bg-blue-600 rounded-t-md transition-all relative group"
                    style={{ height: `${h1}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 text-[9px] font-bold px-1.5 py-0.5 rounded shadow pointer-events-none z-10 whitespace-nowrap">
                      {day.schedule1Calories} kcal
                    </div>
                  </div>
                  {/* Schedule 2 Bar */}
                  <div
                    className="w-1/2 bg-purple-500 hover:bg-purple-600 rounded-t-md transition-all relative group"
                    style={{ height: `${h2}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 text-[9px] font-bold px-1.5 py-0.5 rounded shadow pointer-events-none z-10 whitespace-nowrap">
                      {day.schedule2Calories} kcal
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                  {day.dayName.substring(0, 3)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 3. Macronutrient Donut Chart
export function MacroDonutChart({ result }: CalorieChartsProps) {
  const m = result.macros.balanced;

  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Macronutrient Split (Balanced)</h4>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Carbohydrates, Protein, and Fat ratios</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
        <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/40 text-center">
          <span className="text-amber-700 dark:text-amber-400 font-bold block text-[10px]">Carbohydrates (50%)</span>
          <strong className="text-xl font-black text-amber-900 dark:text-amber-200 block mt-0.5">{m.carbsGrams} g</strong>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 block mt-0.5">{m.carbsCalories} kcal</span>
        </div>

        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/40 text-center">
          <span className="text-emerald-700 dark:text-emerald-400 font-bold block text-[10px]">Protein (20%)</span>
          <strong className="text-xl font-black text-emerald-900 dark:text-emerald-200 block mt-0.5">{m.proteinGrams} g</strong>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">{m.proteinCalories} kcal</span>
        </div>

        <div className="p-3 bg-rose-50 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-900/40 text-center">
          <span className="text-rose-700 dark:text-rose-400 font-bold block text-[10px]">Dietary Fat (30%)</span>
          <strong className="text-xl font-black text-rose-900 dark:text-rose-200 block mt-0.5">{m.fatGrams} g</strong>
          <span className="text-[10px] text-rose-600 dark:text-rose-400 block mt-0.5">{m.fatCalories} kcal</span>
        </div>
      </div>
    </div>
  );
}
