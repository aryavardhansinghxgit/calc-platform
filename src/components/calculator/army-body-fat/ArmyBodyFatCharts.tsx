"use client";

import React from "react";
import { ArmyWHtRResult, ArmyBodyFatResult } from "@/lib/formulas/armyBodyFat";

interface ArmyWHtRGaugeProps {
  result: ArmyWHtRResult;
}

interface ArmyBodyFatChartsProps {
  result: ArmyBodyFatResult;
}

// --------------------------------------------------------------------
// 1. Current 2026 Army WHtR Gauge (< 0.55 Threshold) with full ARIA semantics
// --------------------------------------------------------------------
export function ArmyWHtRGauge({ result }: ArmyWHtRGaugeProps) {
  const isValid = result.isValid;
  const rawWhtr = isValid ? result.whtr : 0.485;

  // Arc range: 0.35 to 0.70
  const minWHtR = 0.35;
  const maxWHtR = 0.7;
  const threshold = 0.55;

  const clampedVal = Math.max(minWHtR, Math.min(maxWHtR, rawWhtr || minWHtR));
  const percent = (clampedVal - minWHtR) / (maxWHtR - minWHtR);
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

  const isPass = result.isCompliant;
  const thresholdAngle = -120 + ((threshold - minWHtR) / (maxWHtR - minWHtR)) * 240;

  const ariaValueText = isValid
    ? `Army waist-to-height ratio ${result.whtrDisplay}. ${
        result.isCompliant
          ? "Below the 0.55 compliance threshold (Compliant)."
          : "At or above the 0.55 compliance threshold (Non-Compliant)."
      }`
    : "Invalid input measurements.";

  return (
    <div
      role="meter"
      aria-valuenow={isValid ? result.whtrDisplay : 0}
      aria-valuemin={minWHtR}
      aria-valuemax={maxWHtR}
      aria-label="U.S. Army Waist-to-Height Ratio (WHtR)"
      aria-valuetext={ariaValueText}
      tabIndex={0}
      className="flex flex-col items-center justify-center p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
    >
      <div className="relative w-64 h-40 flex items-center justify-center" aria-hidden="true">
        <svg viewBox="0 0 200 140" className="w-full h-full">
          {/* Background track */}
          <path
            d={describeArc(100, 110, 80, -120, 120)}
            fill="none"
            className="stroke-zinc-200 dark:stroke-zinc-800"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Compliant Zone (-120 to thresholdAngle: < 0.55) */}
          <path
            d={describeArc(100, 110, 80, -120, thresholdAngle)}
            fill="none"
            stroke="#10b981"
            strokeWidth="16"
          />

          {/* Non-Compliant Zone (thresholdAngle to 120: >= 0.55) */}
          <path
            d={describeArc(100, 110, 80, thresholdAngle, 120)}
            fill="none"
            stroke="#f43f5e"
            strokeWidth="16"
          />

          {/* Threshold marker needle/line at 0.55 */}
          {(() => {
            const p1 = polarToCartesian(100, 110, 70, thresholdAngle);
            const p2 = polarToCartesian(100, 110, 92, thresholdAngle);
            return (
              <line
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                className="stroke-zinc-900 dark:stroke-zinc-100"
                strokeWidth="2.5"
              />
            );
          })()}

          {/* Pivot dot */}
          <circle cx="100" cy="110" r="4" className="fill-zinc-400 dark:fill-zinc-600" />

          {/* Needle Pointer */}
          <g transform={`rotate(${angle}, 100, 110)`} className="transition-transform duration-700 ease-out">
            <line
              x1="100"
              y1="72"
              x2="100"
              y2="38"
              className="stroke-zinc-900 dark:stroke-zinc-100"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <polygon points="96,44 100,28 104,44" className="fill-zinc-900 dark:fill-zinc-100" />
          </g>

          {/* Labels */}
          <text x="22" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">
            0.35
          </text>
          <text x="96" y="20" className="fill-zinc-900 dark:fill-zinc-100 font-bold" fontSize="8">
            Max &lt;0.55
          </text>
          <text x="162" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">
            0.70
          </text>
        </svg>

        {/* Center overlay readout */}
        <div className="absolute bottom-0 flex flex-col items-center bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-1.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 shadow-md">
          <span
            className={`text-2xl sm:text-3xl font-black tracking-tight leading-none ${
              !isValid
                ? "text-zinc-400 dark:text-zinc-600"
                : isPass
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {isValid ? result.whtrDisplay : "—"}
          </span>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${
              !isValid
                ? "text-zinc-500"
                : isPass
                ? "text-emerald-700 dark:text-emerald-400"
                : "text-rose-700 dark:text-rose-400"
            }`}
          >
            {!isValid ? "INVALID INPUT" : isPass ? "COMPLIANT (WHtR < 0.55)" : "NON-COMPLIANT (WHtR ≥ 0.55)"}
          </span>
        </div>
      </div>

      {/* Metric Cards Below Gauge */}
      <div className="grid grid-cols-2 gap-2 w-full mt-4 text-center text-xs">
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Max Compliant Waist</div>
          <div className="font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
            {isValid ? `${result.maxCompliantWaist} ${result.unitLabel}` : "—"}
          </div>
        </div>
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Waist vs Standard</div>
          <div
            className={`font-bold mt-0.5 ${
              !isValid ? "text-zinc-400" : isPass ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {!isValid
              ? "—"
              : isPass
              ? `${(result.maxCompliantWaist - result.waist).toFixed(1)} ${result.unitLabel} Under Limit`
              : `${result.requiredWaistReduction} ${result.unitLabel} Over Limit`}
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------
// 2. Historical 2023 Body Fat Radial Gauge
// --------------------------------------------------------------------
export function HistoricalArmyComplianceGauge({ result }: ArmyBodyFatChartsProps) {
  const isValid = result.isValid;
  const bfPct = isValid ? result.bodyFatPercentage : 0;
  const maxAllowed = result.maxAllowableBodyFat;

  const minBF = 5;
  const maxBF = 45;
  const clampedBF = Math.max(minBF, Math.min(maxBF, bfPct || minBF));
  const percent = (clampedBF - minBF) / (maxBF - minBF);
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

  const isPass = result.isCompliant;
  const maxPercentAngle = -120 + ((maxAllowed - minBF) / (maxBF - minBF)) * 240;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm opacity-90">
      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
        Historical 2023 Reference Only
      </div>
      <div className="relative w-64 h-40 flex items-center justify-center" aria-hidden="true">
        <svg viewBox="0 0 200 140" className="w-full h-full">
          <path
            d={describeArc(100, 110, 80, -120, 120)}
            fill="none"
            className="stroke-zinc-200 dark:stroke-zinc-800"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path d={describeArc(100, 110, 80, -120, maxPercentAngle)} fill="none" stroke="#10b981" strokeWidth="16" />
          <path d={describeArc(100, 110, 80, maxPercentAngle, 120)} fill="none" stroke="#f43f5e" strokeWidth="16" />
          <circle cx="100" cy="110" r="4" className="fill-zinc-400 dark:fill-zinc-600" />
          <g transform={`rotate(${angle}, 100, 110)`} className="transition-transform duration-700 ease-out">
            <line x1="100" y1="72" x2="100" y2="38" className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="3.5" strokeLinecap="round" />
            <polygon points="96,44 100,28 104,44" className="fill-zinc-900 dark:fill-zinc-100" />
          </g>
          <text x="24" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">5%</text>
          <text x="92" y="20" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">Max {maxAllowed}%</text>
          <text x="165" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">45%</text>
        </svg>
        <div className="absolute bottom-0 flex flex-col items-center bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-1.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 shadow-md">
          <span className="text-2xl sm:text-3xl font-black tracking-tight leading-none text-zinc-800 dark:text-zinc-200">
            {isValid ? `${result.bodyFatPercentage}%` : "—"}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5 text-zinc-500">
            {result.statusLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------
// 3. Body Mass Breakdown Bar Chart (Optional Educational Display)
// --------------------------------------------------------------------
export function BodyCompositionBarChart({ result }: ArmyBodyFatChartsProps) {
  const isValid = result.isValid;
  const fatPct = isValid ? result.bodyFatPercentage : 0;
  const leanPct = isValid ? Math.max(0, parseFloat((100 - fatPct).toFixed(1))) : 0;

  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex justify-between items-center text-xs">
        <div>
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
            Optional Body Mass Estimation
          </h4>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
            Educational estimate (does not determine 2026 Army compliance)
          </span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          {isValid ? result.category : "Invalid"}
        </span>
      </div>

      <div className="w-full h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
        {isValid && (
          <>
            <div style={{ width: `${leanPct}%` }} className="h-full bg-blue-600 transition-all duration-500 rounded-l-full" />
            <div style={{ width: `${fatPct}%` }} className="h-full bg-rose-500 transition-all duration-500 rounded-r-full" />
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1">
        <div className="p-2 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">
            LEAN MASS {isValid ? `(${leanPct}%)` : ""}
          </span>
          <strong className="text-zinc-900 dark:text-zinc-100 block font-bold text-xs mt-0.5">
            {isValid ? `${result.leanMassLbs} lbs (${result.leanMassKg} kg)` : "—"}
          </strong>
        </div>

        <div className="p-2 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">
            FAT MASS {isValid ? `(${fatPct}%)` : ""}
          </span>
          <strong className="text-zinc-900 dark:text-zinc-100 block font-bold text-xs mt-0.5">
            {isValid ? `${result.fatMassLbs} lbs (${result.fatMassKg} kg)` : "—"}
          </strong>
        </div>
      </div>
    </div>
  );
}
