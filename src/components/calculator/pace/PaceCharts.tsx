"use client";

import React from "react";
import { PaceResult, SplitSegmentResult } from "@/lib/formulas/pace";

interface PaceChartsProps {
  result: PaceResult;
}

// 1. Pace Radial Speedometer / Dial
export function PaceSpeedometerGauge({ result }: PaceChartsProps) {
  const paceSecsMile = result.paceSecondsPerMile;

  // Arc range: 240 secs (4:00 min/mi WR) to 900 secs (15:00 min/mi walk)
  const minPace = 240;
  const maxPace = 900;
  const clampedPace = Math.max(minPace, Math.min(maxPace, paceSecsMile));
  const percent = (clampedPace - minPace) / (maxPace - minPace);
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

          {/* Elite Sprint Zone (-120 to -60 deg) */}
          <path d={describeArc(100, 110, 80, -120, -60)} fill="none" stroke="#38bdf8" strokeWidth="16" />
          {/* Aerobic Endurance Zone (-60 to 40 deg) */}
          <path d={describeArc(100, 110, 80, -60, 40)} fill="none" stroke="#10b981" strokeWidth="16" />
          {/* Recreational Walk Zone (40 to 120 deg) */}
          <path d={describeArc(100, 110, 80, 40, 120)} fill="none" stroke="#facc15" strokeWidth="16" />

          {/* Pivot dot */}
          <circle cx="100" cy="110" r="4" className="fill-zinc-400 dark:fill-zinc-600" />

          {/* Needle Pointer */}
          <g transform={`rotate(${angle}, 100, 110)`} className="transition-transform duration-700 ease-out">
            <line x1="100" y1="72" x2="100" y2="38" className="stroke-zinc-900 dark:stroke-zinc-100" strokeWidth="3.5" strokeLinecap="round" />
            <polygon points="96,44 100,28 104,44" className="fill-zinc-900 dark:fill-zinc-100" />
          </g>

          {/* Labels */}
          <text x="24" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">4:00/mi</text>
          <text x="94" y="20" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">9:30/mi</text>
          <text x="160" y="132" className="fill-zinc-500 dark:fill-zinc-400" fontSize="8" fontWeight="bold">15:00/mi</text>
        </svg>

        {/* Center overlay readout */}
        <div className="absolute bottom-0 flex flex-col items-center bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-1.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 shadow-md">
          <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
            {result.pacePerMileFormatted}
          </span>
          <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mt-0.5">
            / mile ({result.pacePerKmFormatted} / km)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full mt-4 text-center text-xs">
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Speed (mph / km/h)</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{result.speedMph} mph ({result.speedKmh} km/h)</div>
        </div>
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">Track Laps (400m / 100m)</div>
          <div className="font-bold text-blue-600 dark:text-blue-400 mt-0.5">{result.pace400mFormatted} / {result.pace100mFormatted}</div>
        </div>
      </div>
    </div>
  );
}

// 2. Multipoint Segment Splits Bar Chart
export function SegmentSplitsBarChart({ segments }: { segments: SplitSegmentResult[] }) {
  if (!segments || segments.length === 0) return null;
  const maxSecs = Math.max(...segments.map((s) => s.timeTotalSeconds)) * 1.15;

  return (
    <div className="w-full space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Multipoint Segment Split Pace Breakdown</h4>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Pace per individual leg segment</p>
        </div>
      </div>

      <div className="space-y-2 pt-2 text-xs">
        {segments.map((s) => {
          const pct = (s.timeTotalSeconds / maxSecs) * 100;
          return (
            <div key={s.id} className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Leg #{s.segmentNumber} ({s.distanceKm} km / {s.distanceMiles} mi)</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{s.pacePerKmFormatted} /km ({s.pacePerMileFormatted} /mi)</span>
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
