"use client";

import React, { useMemo } from "react";
import { BmiResult } from "@/lib/formulas/bmi";

interface BmiChartsProps {
  result: BmiResult;
}

// 1. Arch Gauge Component
export function BmiArchGauge({ result }: BmiChartsProps) {
  const bmi = result.bmi;
  
  // Angle range: -120 deg to +120 deg (total 240 deg)
  // BMI scale: 12 to 42
  const minBmi = 12;
  const maxBmi = 42;
  const clampedBmi = Math.max(minBmi, Math.min(maxBmi, bmi));
  const percent = (clampedBmi - minBmi) / (maxBmi - minBmi);
  const angle = -120 + percent * 240;

  // Arc segments definition: [startBmi, endBmi, color, label]
  const segments = [
    { start: 12, end: 18.5, color: "#38bdf8", label: "Underweight" },
    { start: 18.5, end: 25, color: "#10b981", label: "Normal" },
    { start: 25, end: 30, color: "#eab308", label: "Overweight" },
    { start: 30, end: 35, color: "#f97316", label: "Obese I" },
    { start: 35, end: 40, color: "#ef4444", label: "Obese II" },
    { start: 40, end: 42, color: "#be123c", label: "Obese III" },
  ];

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
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-2xl border border-slate-800 backdrop-blur">
      <div className="relative w-64 h-40 flex items-center justify-center">
        <svg viewBox="0 0 200 140" className="w-full h-full">
          {/* Background track */}
          <path
            d={describeArc(100, 110, 80, -120, 120)}
            fill="none"
            stroke="#1e293b"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Color Arc Segments */}
          {segments.map((seg, i) => {
            const startAng = -120 + ((seg.start - minBmi) / (maxBmi - minBmi)) * 240;
            const endAng = -120 + ((seg.end - minBmi) / (maxBmi - minBmi)) * 240;
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
          <circle cx="100" cy="110" r="8" fill="#f8fafc" stroke="#0f172a" strokeWidth="3" />

          {/* Needle */}
          <g transform={`rotate(${angle}, 100, 110)`} className="transition-transform duration-700 ease-out">
            <line x1="100" y1="110" x2="100" y2="40" stroke="#f8fafc" strokeWidth="4" strokeLinecap="round" />
            <polygon points="96,50 100,32 104,50" fill="#f8fafc" />
          </g>

          {/* Major labels */}
          <text x="30" y="128" fill="#94a3b8" fontSize="10" fontWeight="bold">18.5</text>
          <text x="88" y="24" fill="#94a3b8" fontSize="10" fontWeight="bold">25</text>
          <text x="135" y="45" fill="#94a3b8" fontSize="10" fontWeight="bold">30</text>
          <text x="160" y="128" fill="#94a3b8" fontSize="10" fontWeight="bold">40</text>
        </svg>

        {/* Center overlay readout */}
        <div className="absolute bottom-1 flex flex-col items-center">
          <span className="text-3xl font-black text-slate-100 tracking-tight">{result.bmi}</span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full mt-0.5" style={{ backgroundColor: `${result.categoryColor}25`, color: result.categoryColor }}>
            {result.category}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full mt-4 text-center text-xs">
        <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800">
          <div className="text-slate-400 text-[10px]">Healthy Range</div>
          <div className="font-bold text-emerald-400 mt-0.5">{result.healthyWeightRangeLbs[0]} - {result.healthyWeightRangeLbs[1]} lbs</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800">
          <div className="text-slate-400 text-[10px]">BMI Prime</div>
          <div className="font-bold text-sky-400 mt-0.5">{result.bmiPrime}</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800">
          <div className="text-slate-400 text-[10px]">Ponderal Index</div>
          <div className="font-bold text-indigo-400 mt-0.5">{result.ponderalIndexMetric} kg/m³</div>
        </div>
      </div>
    </div>
  );
}

// 2. Linear Scale Meter
export function BmiScaleMeter({ result }: BmiChartsProps) {
  const bmi = result.bmi;
  const posPercent = Math.max(0, Math.min(100, ((bmi - 12) / (42 - 12)) * 100));

  return (
    <div className="w-full space-y-2 p-4 bg-slate-900/60 rounded-xl border border-slate-800">
      <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
        <span>BMI Category Scale</span>
        <span style={{ color: result.categoryColor }}>Current: {result.bmi}</span>
      </div>

      <div className="relative h-6 w-full rounded-lg overflow-hidden flex text-[10px] font-bold text-slate-950">
        <div className="h-full bg-sky-400 flex items-center justify-center" style={{ width: "21.6%" }}>
          <span className="hidden sm:inline">Under</span>
        </div>
        <div className="h-full bg-emerald-400 flex items-center justify-center" style={{ width: "21.6%" }}>
          <span>Normal</span>
        </div>
        <div className="h-full bg-yellow-400 flex items-center justify-center" style={{ width: "16.6%" }}>
          <span>Over</span>
        </div>
        <div className="h-full bg-orange-500 flex items-center justify-center" style={{ width: "16.6%" }}>
          <span>Obese I</span>
        </div>
        <div className="h-full bg-rose-500 flex items-center justify-center" style={{ width: "16.6%" }}>
          <span>Obese II</span>
        </div>
        <div className="h-full bg-rose-900 flex items-center justify-center text-rose-100" style={{ width: "7%" }}>
          <span>III</span>
        </div>

        {/* Current position marker */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] transition-all duration-500"
          style={{ left: `${posPercent}%` }}
        >
          <div className="w-3 h-3 bg-white border-2 border-slate-950 rounded-full -translate-x-1 -translate-y-1 shadow-md" />
        </div>
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 font-mono px-0.5">
        <span>12</span>
        <span>18.5</span>
        <span>25.0</span>
        <span>30.0</span>
        <span>35.0</span>
        <span>40.0</span>
      </div>
    </div>
  );
}

// 3. Weight Position Indicator Slider
export function WeightPositionIndicator({ result }: BmiChartsProps) {
  const weight = result.weightLbs;
  const minW = result.healthyWeightRangeLbs[0];
  const maxW = result.healthyWeightRangeLbs[1];

  // Visual span from 70% of minW to 130% of maxW
  const startSpan = Math.max(50, minW * 0.75);
  const endSpan = maxW * 1.25;

  const currentPos = Math.max(0, Math.min(100, ((weight - startSpan) / (endSpan - startSpan)) * 100));
  const minPos = Math.max(0, Math.min(100, ((minW - startSpan) / (endSpan - startSpan)) * 100));
  const maxPos = Math.max(0, Math.min(100, ((maxW - startSpan) / (endSpan - startSpan)) * 100));

  return (
    <div className="w-full space-y-3 p-4 bg-slate-900/60 rounded-xl border border-slate-800">
      <div className="flex justify-between items-center text-xs">
        <span className="font-semibold text-slate-300">Weight vs Healthy Target</span>
        <span className="text-slate-400">
          Target: <strong className="text-emerald-400">{minW} - {maxW} lbs</strong>
        </span>
      </div>

      <div className="relative h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
        {/* Healthy weight range zone */}
        <div
          className="absolute top-0 bottom-0 bg-emerald-500/30 border-x border-emerald-500/60"
          style={{ left: `${minPos}%`, width: `${maxPos - minPos}%` }}
        />

        {/* Current weight marker */}
        <div
          className="absolute top-0 bottom-0 w-2 rounded-full transition-all duration-500 -translate-x-1/2"
          style={{ left: `${currentPos}%`, backgroundColor: result.categoryColor }}
        />
      </div>

      <div className="flex justify-between text-xs text-slate-400">
        <div>
          Current: <strong className="text-slate-100">{weight} lbs</strong> ({result.weightKg} kg)
        </div>
        <div>
          {result.weightDifferenceLbs > 0 ? (
            <span className="text-amber-400">+{result.weightDifferenceLbs} lbs above range</span>
          ) : result.weightDifferenceLbs < 0 ? (
            <span className="text-sky-400">{Math.abs(result.weightDifferenceLbs)} lbs below range</span>
          ) : (
            <span className="text-emerald-400">Ideal weight range!</span>
          )}
        </div>
      </div>
    </div>
  );
}

// 4. Interactive 2D Height-Weight Adult BMI Contour Heatmap Chart
export function AdultBmiHeightWeightChart({ result }: BmiChartsProps) {
  // Height range: 4'9" (57 in) to 6'6" (78 in) -> 1.45m to 1.98m
  // Weight range: 80 lb to 260 lb -> 36kg to 118kg
  const userHeightIn = result.heightInches;
  const userWeightLb = result.weightLbs;

  // Chart normalization
  const minH = 57;
  const maxH = 78;
  const minW = 80;
  const maxW = 260;

  const pointX = Math.max(0, Math.min(100, ((userWeightLb - minW) / (maxW - minW)) * 100));
  const pointY = Math.max(0, Math.min(100, ((maxH - userHeightIn) / (maxH - minH)) * 100));

  return (
    <div className="w-full space-y-3 p-4 bg-slate-900/60 rounded-xl border border-slate-800">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Adult BMI Category Matrix</h4>
          <p className="text-[11px] text-slate-400">Height vs Weight WHO classification chart</p>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block"/>Under</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"/>Normal</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block"/>Over</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"/>Obese</span>
        </div>
      </div>

      <div className="relative w-full h-56 bg-slate-950 rounded-lg border border-slate-800 p-2 overflow-hidden">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* Contour Bands representing BMI = 18.5, 25, 30, 35, 40 */}
          {/* We plot SVG paths across weight (X: 0 to 400) and height (Y: 0 to 200) */}
          <defs>
            <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>

          {/* Underweight zone (<18.5) */}
          <polygon points="0,0 80,0 120,200 0,200" fill="#38bdf8" fillOpacity="0.25" />
          {/* Normal weight zone (18.5 - 25) */}
          <polygon points="80,0 160,0 230,200 120,200" fill="#10b981" fillOpacity="0.3" />
          {/* Overweight zone (25 - 30) */}
          <polygon points="160,0 220,0 300,200 230,200" fill="#eab308" fillOpacity="0.3" />
          {/* Obese Class I (30 - 35) */}
          <polygon points="220,0 280,0 360,200 300,200" fill="#f97316" fillOpacity="0.35" />
          {/* Obese Class II & III (35+) */}
          <polygon points="280,0 400,0 400,200 360,200" fill="#ef4444" fillOpacity="0.35" />

          {/* Grid lines */}
          <line x1="0" y1="50" x2="400" y2="50" stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="0" y1="100" x2="400" y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="0" y1="150" x2="400" y2="150" stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3" />

          <line x1="100" y1="0" x2="100" y2="200" stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="200" y1="0" x2="200" y2="200" stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="300" y1="0" x2="300" y2="200" stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3" />

          {/* Contour Lines Labels */}
          <text x="95" y="190" fill="#94a3b8" fontSize="9" fontWeight="bold">BMI 18.5</text>
          <text x="180" y="190" fill="#94a3b8" fontSize="9" fontWeight="bold">BMI 25</text>
          <text x="250" y="190" fill="#94a3b8" fontSize="9" fontWeight="bold">BMI 30</text>
          <text x="320" y="190" fill="#94a3b8" fontSize="9" fontWeight="bold">BMI 35</text>
        </svg>

        {/* User position marker */}
        <div
          className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 pointer-events-none"
          style={{ left: `${pointX}%`, top: `${pointY}%` }}
        >
          <span className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ backgroundColor: result.categoryColor }} />
          <span className="relative flex items-center justify-center w-5 h-5 rounded-full border-2 border-white text-[9px] font-bold text-slate-950 shadow-lg" style={{ backgroundColor: result.categoryColor }}>
            YOU
          </span>
        </div>
      </div>
    </div>
  );
}

// 5. Children & Teen Percentile Chart (CDC)
export function ChildBmiPercentileChart({ result }: BmiChartsProps) {
  if (!result.isChild) return null;

  const percentile = result.childPercentileEstimate || 50;

  return (
    <div className="w-full space-y-3 p-4 bg-slate-900/60 rounded-xl border border-sky-900/40">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider">CDC Child & Teen Percentile Indicator</h4>
          <p className="text-[11px] text-slate-400">BMI-for-age percentile relative to CDC growth charts</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
          ~{percentile}th Percentile
        </span>
      </div>

      <div className="relative h-6 bg-slate-950 rounded-lg overflow-hidden flex text-[10px] font-bold text-slate-950">
        <div className="h-full bg-sky-400 flex items-center justify-center" style={{ width: "5%" }}>
          <span>&lt;5%</span>
        </div>
        <div className="h-full bg-emerald-400 flex items-center justify-center" style={{ width: "80%" }}>
          <span>5% - 85% Healthy Percentile Range</span>
        </div>
        <div className="h-full bg-yellow-400 flex items-center justify-center" style={{ width: "10%" }}>
          <span>85-95%</span>
        </div>
        <div className="h-full bg-rose-500 flex items-center justify-center" style={{ width: "5%" }}>
          <span>&gt;95%</span>
        </div>

        <div
          className="absolute top-0 bottom-0 w-1.5 bg-white shadow-lg transition-all duration-500 -translate-x-1/2"
          style={{ left: `${Math.max(2, Math.min(98, percentile))}%` }}
        />
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        For children aged 2–19, BMI is evaluated using age- and gender-specific percentiles from the CDC. A percentile between 5% and 85% indicates normal growth and healthy body weight.
      </p>
    </div>
  );
}
