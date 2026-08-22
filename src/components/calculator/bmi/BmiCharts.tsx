"use client";

import React from "react";
import { BmiResult } from "@/lib/formulas/bmi";

interface BmiChartsProps {
  result: BmiResult;
}

// 1. Arch Gauge Component (Supports Adult WHO Scale & Pediatric CDC Percentile Scale)
export function BmiArchGauge({ result }: BmiChartsProps) {
  const isChild = result.isChild;
  const percentile = result.childPercentileEstimate || 50;
  const bmi = result.bmi;

  // Pediatric Percentile Gauge (0 to 100) vs Adult BMI Gauge (12 to 42)
  const minVal = isChild ? 0 : 12;
  const maxVal = isChild ? 100 : 42;
  const currentVal = isChild ? percentile : bmi;

  const clampedVal = Math.max(minVal, Math.min(maxVal, currentVal));
  const percent = (clampedVal - minVal) / (maxVal - minVal);
  const angle = -120 + percent * 240;

  // Arc segments
  const adultSegments = [
    { start: 12, end: 18.5, color: "#0284c7", label: "Underweight" },
    { start: 18.5, end: 25, color: "#10b981", label: "Normal" },
    { start: 25, end: 30, color: "#eab308", label: "Overweight" },
    { start: 30, end: 35, color: "#f97316", label: "Obese I" },
    { start: 35, end: 40, color: "#ef4444", label: "Obese II" },
    { start: 40, end: 42, color: "#be123c", label: "Obese III" },
  ];

  const childSegments = [
    { start: 0, end: 5, color: "#0284c7", label: "<5%" },
    { start: 5, end: 85, color: "#10b981", label: "5-85%" },
    { start: 85, end: 95, color: "#eab308", label: "85-95%" },
    { start: 95, end: 100, color: "#ef4444", label: ">95%" },
  ];

  const segments = isChild ? childSegments : adultSegments;

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

          {/* Color Arc Segments */}
          {segments.map((seg, i) => {
            const startAng = -120 + ((seg.start - minVal) / (maxVal - minVal)) * 240;
            const endAng = -120 + ((seg.end - minVal) / (maxVal - minVal)) * 240;
            return (
              <path
                key={i}
                d={describeArc(100, 110, 80, startAng, endAng)}
                fill="none"
                stroke={seg.color}
                strokeWidth="16"
              />
            );
          })}

          {/* Center needle pivot */}
          <circle cx="100" cy="110" r="4" className="fill-zinc-400 dark:fill-zinc-600" />

          {/* Needle Pointer */}
          <g transform={`rotate(${angle}, 100, 110)`} className="transition-transform duration-700 ease-out">
            <line x1="100" y1="72" x2="100" y2="38" className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="3.5" strokeLinecap="round" />
            <polygon points="96,44 100,28 104,44" className="fill-zinc-900 dark:fill-zinc-100" />
          </g>

          {/* Major labels */}
          {isChild ? (
            <>
              <text x="24" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="9" fontWeight="bold">0%</text>
              <text x="48" y="48" className="fill-zinc-500 dark:fill-zinc-400" fontSize="9" fontWeight="bold">5%</text>
              <text x="144" y="58" className="fill-zinc-500 dark:fill-zinc-400" fontSize="9" fontWeight="bold">85%</text>
              <text x="160" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="9" fontWeight="bold">100%</text>
            </>
          ) : (
            <>
              <text x="24" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="10" fontWeight="bold">18.5</text>
              <text x="88" y="20" className="fill-zinc-500 dark:fill-zinc-400" fontSize="10" fontWeight="bold">25</text>
              <text x="138" y="42" className="fill-zinc-500 dark:fill-zinc-400" fontSize="10" fontWeight="bold">30</text>
              <text x="164" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="10" fontWeight="bold">40</text>
            </>
          )}
        </svg>

        {/* Center overlay readout */}
        <div className="absolute bottom-0 flex flex-col items-center bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-1 rounded-xl border border-zinc-200/90 dark:border-zinc-800 shadow-md">
          <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
            {isChild ? `${percentile}th %` : result.bmi}
          </span>
          <span
            className="text-[11px] font-bold px-2 py-0.5 rounded-full mt-1 border"
            style={{
              backgroundColor: `${result.categoryColor}15`,
              color: result.categoryColor,
              borderColor: `${result.categoryColor}40`,
            }}
          >
            {result.category}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full mt-4 text-center text-xs">
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">
            {isChild ? "CDC Assessment" : "Healthy Range"}
          </div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
            {isChild ? "5th - 85th %" : `${result.healthyWeightRangeLbs[0]} - ${result.healthyWeightRangeLbs[1]} lbs`}
          </div>
        </div>
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">
            {isChild ? "Measured BMI" : "BMI Prime"}
          </div>
          <div className="font-bold text-sky-600 dark:text-sky-400 mt-0.5">
            {isChild ? `${result.bmi} kg/m²` : result.bmiPrime}
          </div>
        </div>
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Ponderal Index</div>
          <div className="font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">{result.ponderalIndexMetric} kg/m³</div>
        </div>
      </div>
    </div>
  );
}

// 2. Linear Scale Meter
export function BmiScaleMeter({ result }: BmiChartsProps) {
  const isChild = result.isChild;
  const percentile = result.childPercentileEstimate || 50;
  const bmi = result.bmi;

  const posPercent = isChild
    ? Math.max(0, Math.min(100, percentile))
    : Math.max(0, Math.min(100, ((bmi - 12) / (42 - 12)) * 100));

  return (
    <div className="w-full space-y-2 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex justify-between items-center text-xs font-semibold text-zinc-700 dark:text-zinc-300">
        <span>{isChild ? "CDC Pediatric Percentile Scale (Ages 2–19)" : "Adult BMI Category Scale"}</span>
        <span style={{ color: result.categoryColor }}>
          {isChild ? `Percentile: ~${percentile}th %` : `Current BMI: ${result.bmi}`}
        </span>
      </div>

      {isChild ? (
        <div className="relative h-6 w-full rounded-lg overflow-hidden flex text-[10px] font-bold text-white shadow-inner">
          <div className="h-full bg-sky-500 flex items-center justify-center" style={{ width: "5%" }}>
            <span>&lt;5%</span>
          </div>
          <div className="h-full bg-emerald-500 flex items-center justify-center" style={{ width: "80%" }}>
            <span>5% – 85% Healthy Percentile Range</span>
          </div>
          <div className="h-full bg-yellow-500 flex items-center justify-center text-zinc-900" style={{ width: "10%" }}>
            <span>85-95%</span>
          </div>
          <div className="h-full bg-rose-500 flex items-center justify-center" style={{ width: "5%" }}>
            <span>&gt;95%</span>
          </div>

          {/* Current position marker */}
          <div
            className="absolute top-0 bottom-0 w-1.5 bg-zinc-900 dark:bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)] transition-all duration-500 -translate-x-1/2"
            style={{ left: `${posPercent}%` }}
          >
            <div className="w-3 h-3 bg-zinc-900 dark:bg-white border-2 border-white dark:border-zinc-900 rounded-full -translate-x-[3px] -translate-y-1 shadow-md" />
          </div>
        </div>
      ) : (
        <div className="relative h-6 w-full rounded-lg overflow-hidden flex text-[10px] font-bold text-white shadow-inner">
          <div className="h-full bg-sky-500 flex items-center justify-center" style={{ width: "21.6%" }}>
            <span className="hidden sm:inline">Under</span>
          </div>
          <div className="h-full bg-emerald-500 flex items-center justify-center" style={{ width: "21.6%" }}>
            <span>Normal</span>
          </div>
          <div className="h-full bg-yellow-500 flex items-center justify-center text-zinc-900" style={{ width: "16.6%" }}>
            <span>Over</span>
          </div>
          <div className="h-full bg-orange-500 flex items-center justify-center" style={{ width: "16.6%" }}>
            <span>Obese I</span>
          </div>
          <div className="h-full bg-rose-500 flex items-center justify-center" style={{ width: "16.6%" }}>
            <span>Obese II</span>
          </div>
          <div className="h-full bg-rose-800 flex items-center justify-center text-rose-100" style={{ width: "7%" }}>
            <span>III</span>
          </div>

          {/* Current position marker */}
          <div
            className="absolute top-0 bottom-0 w-1.5 bg-zinc-900 dark:bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)] transition-all duration-500 -translate-x-1/2"
            style={{ left: `${posPercent}%` }}
          >
            <div className="w-3 h-3 bg-zinc-900 dark:bg-white border-2 border-white dark:border-zinc-900 rounded-full -translate-x-[3px] -translate-y-1 shadow-md" />
          </div>
        </div>
      )}

      <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400 font-sans tabular-nums px-0.5">
        {isChild ? (
          <>
            <span>0%</span>
            <span>5% (Underweight)</span>
            <span>50% (Median)</span>
            <span>85% (Overweight)</span>
            <span>95% (Obesity)</span>
            <span>100%</span>
          </>
        ) : (
          <>
            <span>12</span>
            <span>18.5</span>
            <span>25.0</span>
            <span>30.0</span>
            <span>35.0</span>
            <span>40.0</span>
          </>
        )}
      </div>
    </div>
  );
}

// 3. Weight Position Indicator Slider
export function WeightPositionIndicator({ result }: BmiChartsProps) {
  const weight = result.weightLbs;
  const minW = result.healthyWeightRangeLbs[0];
  const maxW = result.healthyWeightRangeLbs[1];

  const startSpan = Math.max(50, minW * 0.75);
  const endSpan = maxW * 1.25;

  const currentPos = Math.max(0, Math.min(100, ((weight - startSpan) / (endSpan - startSpan)) * 100));
  const minPos = Math.max(0, Math.min(100, ((minW - startSpan) / (endSpan - startSpan)) * 100));
  const maxPos = Math.max(0, Math.min(100, ((maxW - startSpan) / (endSpan - startSpan)) * 100));

  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex justify-between items-center text-xs">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">Weight vs Healthy Target</span>
        <span className="text-zinc-500 dark:text-zinc-400">
          Target: <strong className="text-emerald-600 dark:text-emerald-400">{minW} - {maxW} lbs</strong>
        </span>
      </div>

      <div className="relative h-4 bg-zinc-100 dark:bg-zinc-950 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
        {/* Healthy weight range zone */}
        <div
          className="absolute top-0 bottom-0 bg-emerald-500/20 dark:bg-emerald-500/30 border-x border-emerald-500/60"
          style={{ left: `${minPos}%`, width: `${maxPos - minPos}%` }}
        />

        {/* Current weight marker */}
        <div
          className="absolute top-0 bottom-0 w-2.5 rounded-full transition-all duration-500 -translate-x-1/2 shadow-sm"
          style={{ left: `${currentPos}%`, backgroundColor: result.categoryColor }}
        />
      </div>

      <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
        <div>
          Current: <strong className="text-zinc-900 dark:text-zinc-100">{weight} lbs</strong> ({result.weightKg} kg)
        </div>
        <div>
          {result.weightDifferenceLbs > 0 ? (
            <span className="text-amber-600 dark:text-amber-400 font-semibold">+{result.weightDifferenceLbs} lbs above range</span>
          ) : result.weightDifferenceLbs < 0 ? (
            <span className="text-sky-600 dark:text-sky-400 font-semibold">{Math.abs(result.weightDifferenceLbs)} lbs below range</span>
          ) : (
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Ideal weight range!</span>
          )}
        </div>
      </div>
    </div>
  );
}

// 4. Interactive 2D Height-Weight Adult BMI Matrix Heatmap Chart
export function AdultBmiHeightWeightChart({ result }: BmiChartsProps) {
  if (result.isChild) return null;

  const userHeightIn = result.heightInches;
  const userWeightLb = result.weightLbs;

  // Chart domain limits
  const minH = 57; // 4'9"
  const maxH = 78; // 6'6"
  const minW = 80;  // 80 lbs
  const maxW = 260; // 260 lbs

  // SVG viewport bounds: X from 40 to 385 (width 345), Y from 15 to 165 (height 150)
  const normX = Math.max(0, Math.min(1, (userWeightLb - minW) / (maxW - minW)));
  const normY = Math.max(0, Math.min(1, (maxH - userHeightIn) / (maxH - minH)));

  // Clamped SVG coordinates inside chart area [48, 375] and [25, 155]
  const svgX = Math.max(48, Math.min(375, 40 + normX * 345));
  const svgY = Math.max(25, Math.min(155, 15 + normY * 150));

  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Adult BMI Category Matrix</h4>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Height vs Weight WHO classification chart</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-zinc-600 dark:text-zinc-400">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block"/>Under</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"/>Normal</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"/>Over</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"/>Obese</span>
        </div>
      </div>

      <div className="relative w-full h-64 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 p-2 overflow-hidden">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* Outer Chart Frame */}
          <rect x="40" y="15" width="345" height="150" fill="none" className="stroke-zinc-300 dark:stroke-zinc-800" strokeWidth="1" />

          {/* Underweight zone (<18.5) */}
          <polygon points="40,15 110,15 150,165 40,165" fill="#38bdf8" fillOpacity="0.45" stroke="#0284c7" strokeWidth="0.75" />
          {/* Normal weight zone (18.5 - 25) */}
          <polygon points="110,15 185,15 245,165 150,165" fill="#34d399" fillOpacity="0.50" stroke="#10b981" strokeWidth="0.75" />
          {/* Overweight zone (25 - 30) */}
          <polygon points="185,15 240,15 310,165 245,165" fill="#facc15" fillOpacity="0.55" stroke="#eab308" strokeWidth="0.75" />
          {/* Obese Class I (30 - 35) */}
          <polygon points="240,15 295,15 365,165 310,165" fill="#fb923c" fillOpacity="0.60" stroke="#f97316" strokeWidth="0.75" />
          {/* Obese Class II & III (35+) */}
          <polygon points="295,15 385,15 385,165 365,165" fill="#f87171" fillOpacity="0.65" stroke="#ef4444" strokeWidth="0.75" />

          {/* Horizontal Grid lines */}
          <line x1="40" y1="52.5" x2="385" y2="52.5" className="stroke-zinc-300 dark:stroke-zinc-800" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="40" y1="90" x2="385" y2="90" className="stroke-zinc-300 dark:stroke-zinc-800" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="40" y1="127.5" x2="385" y2="127.5" className="stroke-zinc-300 dark:stroke-zinc-800" strokeWidth="0.5" strokeDasharray="3,3" />

          {/* Vertical Grid lines */}
          <line x1="126" y1="15" x2="126" y2="165" className="stroke-zinc-300 dark:stroke-zinc-800" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="212" y1="15" x2="212" y2="165" className="stroke-zinc-300 dark:stroke-zinc-800" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="298" y1="15" x2="298" y2="165" className="stroke-zinc-300 dark:stroke-zinc-800" strokeWidth="0.5" strokeDasharray="3,3" />

          {/* Y-Axis Height Labels */}
          <text x="35" y="18" textAnchor="end" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">6&apos;6&quot;</text>
          <text x="35" y="55.5" textAnchor="end" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">6&apos;0&quot;</text>
          <text x="35" y="93" textAnchor="end" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">5&apos;6&quot;</text>
          <text x="35" y="130.5" textAnchor="end" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">5&apos;0&quot;</text>
          <text x="35" y="168" textAnchor="end" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">4&apos;9&quot;</text>

          {/* X-Axis Weight Labels */}
          <text x="40" y="182" textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">80 lbs</text>
          <text x="126" y="182" textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">125 lbs</text>
          <text x="212" y="182" textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">170 lbs</text>
          <text x="298" y="182" textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">215 lbs</text>
          <text x="385" y="182" textAnchor="middle" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">260 lbs</text>

          {/* Contour BMI Labels */}
          <text x="120" y="156" className="fill-zinc-600 dark:fill-zinc-400" fontSize="8" fontWeight="bold">BMI 18.5</text>
          <text x="180" y="156" className="fill-zinc-600 dark:fill-zinc-400" fontSize="8" fontWeight="bold">BMI 25</text>
          <text x="255" y="156" className="fill-zinc-600 dark:fill-zinc-400" fontSize="8" fontWeight="bold">BMI 30</text>
          <text x="315" y="156" className="fill-zinc-600 dark:fill-zinc-400" fontSize="8" fontWeight="bold">BMI 35</text>

          {/* User Marker */}
          <g transform={`translate(${svgX}, ${svgY})`}>
            <circle r="12" fill={result.categoryColor} fillOpacity="0.25" />
            <circle r="8" fill={result.categoryColor} stroke="#ffffff" strokeWidth="1.5" />
            <text y="3" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="black">YOU</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

// 5. Children & Teen Percentile Chart (CDC)
export function ChildBmiPercentileChart({ result }: BmiChartsProps) {
  if (!result.isChild) return null;

  const percentile = result.childPercentileEstimate || 50;

  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-sky-200 dark:border-sky-900/40 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider">CDC Child &amp; Teen Growth Assessment</h4>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">BMI-for-age percentile based on CDC growth standards</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/40">
          ~{percentile}th Percentile
        </span>
      </div>

      <div className="relative h-6 bg-zinc-100 dark:bg-zinc-950 rounded-lg overflow-hidden flex text-[10px] font-bold text-white shadow-inner">
        <div className="h-full bg-sky-500 flex items-center justify-center" style={{ width: "5%" }}>
          <span>&lt;5%</span>
        </div>
        <div className="h-full bg-emerald-500 flex items-center justify-center" style={{ width: "80%" }}>
          <span>5% - 85% Healthy Percentile Range</span>
        </div>
        <div className="h-full bg-yellow-500 flex items-center justify-center text-zinc-900" style={{ width: "10%" }}>
          <span>85-95%</span>
        </div>
        <div className="h-full bg-rose-500 flex items-center justify-center" style={{ width: "5%" }}>
          <span>&gt;95%</span>
        </div>

        <div
          className="absolute top-0 bottom-0 w-1.5 bg-zinc-900 dark:bg-white shadow-lg transition-all duration-500 -translate-x-1/2"
          style={{ left: `${Math.max(2, Math.min(98, percentile))}%` }}
        />
      </div>

      <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
        For children and teens aged 2–19, BMI is evaluated using age- and sex-specific growth charts from the CDC. A percentile between 5% and 85% indicates an optimal pediatric development trajectory.
      </p>
    </div>
  );
}
