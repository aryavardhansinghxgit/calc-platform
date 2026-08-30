"use client";

import React from "react";
import { HealthyWeightResult } from "@/lib/formulas/healthyWeight";

interface HealthyWeightChartsProps {
  result: HealthyWeightResult;
}

// 1. Healthy Weight Radial Arch Gauge
export function HealthyWeightGauge({ result }: HealthyWeightChartsProps) {
  const currentLbs = result.currentWeightLbs;
  const minLbs = result.minHealthyWeightLbs;
  const maxLbs = result.maxHealthyWeightLbs;

  // Arc range: minLbs * 0.7 to maxLbs * 1.3
  const gaugeMin = Math.max(50, Math.round(minLbs * 0.7));
  const gaugeMax = Math.round(maxLbs * 1.3);
  const clampedLbs = Math.max(gaugeMin, Math.min(gaugeMax, currentLbs));
  const percent = (clampedLbs - gaugeMin) / (gaugeMax - gaugeMin);
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

  const minPercentAngle = -120 + ((minLbs - gaugeMin) / (gaugeMax - gaugeMin)) * 240;
  const maxPercentAngle = -120 + ((maxLbs - gaugeMin) / (gaugeMax - gaugeMin)) * 240;
  const isHealthy = currentLbs >= minLbs && currentLbs <= maxLbs;

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

          {/* Underweight Zone (-120 to minPercentAngle) */}
          <path d={describeArc(100, 110, 80, -120, minPercentAngle)} fill="none" stroke="#38bdf8" strokeWidth="16" />
          {/* Healthy Range Zone (minPercentAngle to maxPercentAngle) */}
          <path d={describeArc(100, 110, 80, minPercentAngle, maxPercentAngle)} fill="none" stroke="#10b981" strokeWidth="16" />
          {/* Overweight Zone (maxPercentAngle to 120) */}
          <path d={describeArc(100, 110, 80, maxPercentAngle, 120)} fill="none" stroke="#f43f5e" strokeWidth="16" />

          {/* Pivot dot */}
          <circle cx="100" cy="110" r="4" className="fill-zinc-400 dark:fill-zinc-600" />

          {/* Needle Pointer */}
          <g transform={`rotate(${angle}, 100, 110)`} className="transition-transform duration-700 ease-out">
            <line x1="100" y1="72" x2="100" y2="38" className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="3.5" strokeLinecap="round" />
            <polygon points="96,44 100,28 104,44" className="fill-zinc-900 dark:fill-zinc-100" />
          </g>

          {/* Labels */}
          <text x="24" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">{minLbs.toFixed(1)} lbs</text>
          <text x="94" y="20" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">Healthy</text>
          <text x="165" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">{maxLbs.toFixed(1)} lbs</text>
        </svg>

        {/* Center overlay readout */}
        <div className="absolute bottom-0 flex flex-col items-center bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-1.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 shadow-md">
          <span className={`text-2xl sm:text-3xl font-black tracking-tight leading-none ${isHealthy ? "text-emerald-600 dark:text-emerald-400" : currentLbs > maxLbs ? "text-rose-600 dark:text-rose-400" : "text-sky-600 dark:text-sky-400"}`}>
            {result.currentWeightLbs.toFixed(1)} LBS
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${isHealthy ? "text-emerald-700 dark:text-emerald-400" : currentLbs > maxLbs ? "text-rose-700 dark:text-rose-400" : "text-sky-700 dark:text-sky-400"}`}>
            BMI {result.bmi} ({result.bmiCategory})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full mt-4 text-center text-xs">
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Healthy Range</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{result.minHealthyWeightLbs.toFixed(1)} – {result.maxHealthyWeightLbs.toFixed(1)} lbs</div>
        </div>
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Prime Target Weight</div>
          <div className="font-bold text-blue-600 dark:text-blue-400 mt-0.5">{result.targetHealthyWeightLbs.toFixed(1)} lbs ({result.targetHealthyWeightKg.toFixed(1)} kg)</div>
        </div>
      </div>
    </div>
  );
}

// 2. Method Comparison Bar Chart
export function HealthyWeightMethodBarChart({ result }: HealthyWeightChartsProps) {
  if (!result.methods || result.methods.length === 0) return null;

  const maxWeight = Math.max(...result.methods.map((m) => m.idealWeightLbs)) * 1.15;

  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex justify-between items-center text-xs">
        <div>
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Multi-Formula Reference Comparison</h4>
          <p className="text-[11px] text-zinc-500">Hamwi, Devine, Robinson, Miller, Peterson (BMI 22) &amp; WHO Target</p>
        </div>
        <span className="font-sans tabular-nums font-bold text-emerald-600 dark:text-emerald-400">Reference Average: {result.consensusIdealWeightLbs.toFixed(1)} lbs</span>
      </div>

      <div className="space-y-2 pt-1 text-xs">
        {result.methods.map((m, idx) => {
          const pct = (m.idealWeightLbs / maxWeight) * 100;
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{m.methodName}</span>
                <span className="font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400">{m.idealWeightLbs.toFixed(1)} lbs ({m.idealWeightKg.toFixed(1)} kg)</span>
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
