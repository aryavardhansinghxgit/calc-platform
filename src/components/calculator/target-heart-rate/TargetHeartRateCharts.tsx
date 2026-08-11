"use client";

import React from "react";
import { TargetHeartRateResult } from "@/lib/formulas/targetHeartRate";

interface TargetHeartRateChartsProps {
  result: TargetHeartRateResult;
}

// 1. Heart Rate Zone Radial Arch Gauge
export function TargetHeartRateGauge({ result }: TargetHeartRateChartsProps) {
  const mhr = result.calculatedMhr;
  const rhr = result.rhr;

  // Arc range: rhr to mhr
  const gaugeMin = Math.max(30, rhr);
  const gaugeMax = mhr;
  const activeBpm = result.customBorgThr || Math.round(rhr + 0.65 * result.hrr);

  const clampedBpm = Math.max(gaugeMin, Math.min(gaugeMax, activeBpm));
  const percent = (clampedBpm - gaugeMin) / (gaugeMax - gaugeMin);
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

          {/* Zone 1-2 (-120 to -30 deg) */}
          <path d={describeArc(100, 110, 80, -120, -30)} fill="none" stroke="#10b981" strokeWidth="16" />
          {/* Zone 3 (-30 to 30 deg) */}
          <path d={describeArc(100, 110, 80, -30, 30)} fill="none" stroke="#f59e0b" strokeWidth="16" />
          {/* Zone 4-5 (30 to 120 deg) */}
          <path d={describeArc(100, 110, 80, 30, 120)} fill="none" stroke="#ef4444" strokeWidth="16" />

          {/* Pivot dot */}
          <circle cx="100" cy="110" r="4" className="fill-zinc-400 dark:fill-zinc-600" />

          {/* Needle Pointer */}
          <g transform={`rotate(${angle}, 100, 110)`} className="transition-transform duration-700 ease-out">
            <line x1="100" y1="72" x2="100" y2="38" className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="3.5" strokeLinecap="round" />
            <polygon points="96,44 100,28 104,44" className="fill-zinc-900 dark:fill-zinc-100" />
          </g>

          {/* Labels */}
          <text x="24" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">RHR {rhr}</text>
          <text x="94" y="20" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">Target</text>
          <text x="160" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">MHR {mhr}</text>
        </svg>

        {/* Center overlay readout */}
        <div className="absolute bottom-0 flex flex-col items-center bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-1.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 shadow-md">
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight leading-none">
            {activeBpm} BPM
          </span>
          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">
            TARGET HEART RATE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full mt-4 text-center text-xs">
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Resting HR (RHR)</div>
          <div className="font-bold text-blue-600 dark:text-blue-400 mt-0.5">{result.rhr} BPM</div>
        </div>
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Heart Rate Reserve</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{result.hrr} BPM</div>
        </div>
      </div>
    </div>
  );
}

// 2. Formula Comparison Bar Chart
export function FormulaComparisonBarChart({ result }: TargetHeartRateChartsProps) {
  if (!result.formulaComparison || result.formulaComparison.length === 0) return null;

  const maxVal = Math.max(...result.formulaComparison.map((f) => f.mhrBpm)) * 1.15;

  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex justify-between items-center text-xs">
        <div>
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Clinical MHR Formula Comparison</h4>
          <p className="text-[11px] text-zinc-500">Haskell vs Tanaka vs Nes vs Gellish</p>
        </div>
        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">MHR: {result.calculatedMhr} BPM</span>
      </div>

      <div className="space-y-2 pt-1 text-xs">
        {result.formulaComparison.map((f, idx) => {
          const pct = (f.mhrBpm / maxVal) * 100;
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{f.formulaName}</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{f.mhrBpm} BPM</span>
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

// 3. Heart Rate Training Pyramid
export function TargetHeartRatePyramid({ result }: TargetHeartRateChartsProps) {
  if (!result.zones || result.zones.length === 0) return null;

  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Heart Rate Training Zone Pyramid</h4>
      <div className="space-y-1.5 pt-1 text-xs">
        {[...result.zones].reverse().map((zone) => (
          <div key={zone.zoneNumber} className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-950">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: zone.colorHex }} />
              <div>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{zone.zoneName}</span>
                <span className="text-[10px] text-zinc-400 block">{zone.benefit}</span>
              </div>
            </div>
            <div className="text-right">
              <strong className="font-mono font-bold text-zinc-900 dark:text-zinc-100">{zone.minBpm} – {zone.maxBpm} BPM</strong>
              <span className="text-[10px] font-mono text-zinc-500 block">{zone.percentageRange}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
