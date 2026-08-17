"use client";

import React from "react";
import { ArmyBodyFatResult } from "@/lib/formulas/armyBodyFat";

interface ArmyBodyFatChartsProps {
  result: ArmyBodyFatResult;
}

// 1. Army Compliance Radial Arch Gauge
export function ArmyComplianceGauge({ result }: ArmyBodyFatChartsProps) {
  const bfPct = result.bodyFatPercentage;
  const maxAllowed = result.maxAllowableBodyFat;

  // Arc range: 5% to 45%
  const minBF = 5;
  const maxBF = 45;
  const clampedBF = Math.max(minBF, Math.min(maxBF, bfPct));
  const percent = (clampedBF - minBF) / (maxBF - minBF);
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

  const isPass = result.isCompliant;
  const maxPercentAngle = -120 + ((maxAllowed - minBF) / (maxBF - minBF)) * 240;

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

          {/* Compliant Zone (-120 to maxPercentAngle) */}
          <path
            d={describeArc(100, 110, 80, -120, maxPercentAngle)}
            fill="none"
            stroke="#10b981"
            strokeWidth="16"
          />

          {/* ABCP Overweight Zone (maxPercentAngle to 120) */}
          <path
            d={describeArc(100, 110, 80, maxPercentAngle, 120)}
            fill="none"
            stroke="#f43f5e"
            strokeWidth="16"
          />

          {/* Pivot dot */}
          <circle cx="100" cy="110" r="4" className="fill-zinc-400 dark:fill-zinc-600" />

          {/* Needle Pointer */}
          <g transform={`rotate(${angle}, 100, 110)`} className="transition-transform duration-700 ease-out">
            <line x1="100" y1="72" x2="100" y2="38" className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="3.5" strokeLinecap="round" />
            <polygon points="96,44 100,28 104,44" className="fill-zinc-900 dark:fill-zinc-100" />
          </g>

          {/* Labels */}
          <text x="24" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">5%</text>
          <text x="92" y="20" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">Max {maxAllowed}%</text>
          <text x="165" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">45%</text>
        </svg>

        {/* Center overlay readout */}
        <div className="absolute bottom-0 flex flex-col items-center bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-1.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 shadow-md">
          <span className={`text-2xl sm:text-3xl font-black tracking-tight leading-none ${isPass ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
            {result.bodyFatPercentage}%
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${isPass ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}>
            {result.isAcftExempt ? "EXEMPT (ACFT 540+)" : isPass ? "AR 600-9 PASS" : "ABCP OVERWEIGHT"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full mt-4 text-center text-xs">
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Max Allowed ({result.ageBracketLabel})</div>
          <div className="font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{result.maxAllowableBodyFat}% Body Fat</div>
        </div>
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Standard Margin</div>
          <div className={`font-bold mt-0.5 ${result.differenceFromMaxStandardPct <= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {result.differenceFromMaxStandardPct <= 0 ? `${Math.abs(result.differenceFromMaxStandardPct)}% Below Limit` : `${result.differenceFromMaxStandardPct}% Over Limit`}
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Body Composition Breakdown Bar Chart
export function BodyCompositionBarChart({ result }: ArmyBodyFatChartsProps) {
  const fatPct = result.bodyFatPercentage;
  const leanPct = Math.max(0, parseFloat((100 - fatPct).toFixed(1)));

  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex justify-between items-center text-xs">
        <div>
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Body Mass Breakdown</h4>
          <p className="text-[11px] text-zinc-500">Fat Mass vs Lean Muscle Mass</p>
        </div>
        <span className="font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400">{result.category}</span>
      </div>

      <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-950 rounded-full overflow-hidden flex border border-zinc-200 dark:border-zinc-800">
        <div
          className="h-full bg-blue-600 transition-all"
          style={{ width: `${leanPct}%` }}
          title={`Lean Mass: ${leanPct}%`}
        />
        <div
          className="h-full bg-rose-500 transition-all"
          style={{ width: `${fatPct}%` }}
          title={`Fat Mass: ${fatPct}%`}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1">
        <div className="p-2 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40">
          <span className="text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase block">Lean Mass ({leanPct}%)</span>
          <strong className="text-sm font-black text-zinc-900 dark:text-zinc-100 mt-0.5 block">{result.leanMassLbs} lbs ({result.leanMassKg} kg)</strong>
        </div>
        <div className="p-2 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
          <span className="text-rose-700 dark:text-rose-400 text-[10px] font-bold uppercase block">Fat Mass ({fatPct}%)</span>
          <strong className="text-sm font-black text-zinc-900 dark:text-zinc-100 mt-0.5 block">{result.fatMassLbs} lbs ({result.fatMassKg} kg)</strong>
        </div>
      </div>
    </div>
  );
}
