"use client";

import React from "react";

interface FractionVisualizerProps {
  num: number;
  den: number;
}

export function FractionVisualizer({ num, den }: FractionVisualizerProps) {
  const safeDen = Math.max(1, Math.abs(Math.round(den || 1)));
  const safeNum = Math.abs(Math.round(num || 0));

  // Pie slices coordinates
  const radius = 60;
  const centerX = 80;
  const centerY = 80;

  const createPieSlices = () => {
    if (safeDen === 1) {
      return (
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          className={safeNum >= 1 ? "fill-blue-600 dark:fill-blue-500 stroke-white" : "fill-zinc-200 dark:fill-zinc-800 stroke-white"}
        />
      );
    }

    const slices = [];
    const angleStep = (2 * Math.PI) / safeDen;

    for (let i = 0; i < safeDen; i++) {
      const startAngle = i * angleStep - Math.PI / 2;
      const endAngle = (i + 1) * angleStep - Math.PI / 2;

      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);

      const largeArc = angleStep > Math.PI ? 1 : 0;
      const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

      const isFilled = i < safeNum % (safeDen + 1);

      slices.push(
        <path
          key={i}
          d={pathData}
          className={`stroke-white dark:stroke-zinc-900 stroke-2 transition-all duration-300 ${
            isFilled
              ? "fill-blue-600 dark:fill-blue-500 hover:fill-blue-700"
              : "fill-zinc-200 dark:fill-zinc-800 hover:fill-zinc-300"
          }`}
        />
      );
    }
    return slices;
  };

  // Fraction bar blocks
  const maxBlocks = Math.min(20, safeDen);
  const filledBlocks = Math.min(maxBlocks, safeNum);

  // Number Line Position (0 to 2)
  const ratio = Math.min(2, safeNum / safeDen);
  const numberLineX = 30 + ratio * 200; // SVG width 260

  return (
    <div className="space-y-4 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
          <span>📐</span> Live Interactive Visualizer ({safeNum}/{safeDen})
        </h4>
        <span className="text-[10px] font-sans tabular-nums font-semibold px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full">
          {((safeNum / safeDen) * 100).toFixed(1)}%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* 1. FRACTION CIRCLE / PIE CHART */}
        <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <span className="text-[11px] font-bold text-zinc-500 mb-1">Fraction Circle</span>
          <svg width="160" height="160" viewBox="0 0 160 160" className="drop-shadow-xs">
            {createPieSlices()}
          </svg>
          <span className="text-xs font-sans tabular-nums font-bold text-zinc-700 dark:text-zinc-300 mt-1">
            {safeNum} of {safeDen} Slices
          </span>
        </div>

        {/* 2. FRACTION RECTANGULAR BAR */}
        <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2">
          <span className="text-[11px] font-bold text-zinc-500">Fraction Bar</span>
          <div className="w-full h-8 flex border-2 border-zinc-300 dark:border-zinc-700 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            {Array.from({ length: maxBlocks }).map((_, idx) => (
              <div
                key={idx}
                className={`flex-1 border-r border-zinc-300 dark:border-zinc-700 last:border-r-0 transition-colors duration-300 ${
                  idx < filledBlocks ? "bg-blue-600 dark:bg-blue-500" : "bg-transparent"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-sans tabular-nums font-bold text-zinc-700 dark:text-zinc-300">
            {filledBlocks} / {maxBlocks} Segment Blocks
          </span>
        </div>

        {/* 3. NUMBER LINE VISUALIZER */}
        <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2">
          <span className="text-[11px] font-bold text-zinc-500">Number Line</span>
          <svg width="260" height="60" viewBox="0 0 260 60" className="w-full">
            {/* Axis Line */}
            <line x1="30" y1="30" x2="230" y2="30" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
            
            {/* Ticks 0, 1, 2 */}
            <line x1="30" y1="20" x2="30" y2="40" stroke="#4b5563" strokeWidth="2" />
            <text x="30" y="55" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="bold">0</text>

            <line x1="130" y1="20" x2="130" y2="40" stroke="#4b5563" strokeWidth="2" />
            <text x="130" y="55" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="bold">1</text>

            <line x1="230" y1="20" x2="230" y2="40" stroke="#4b5563" strokeWidth="2" />
            <text x="230" y="55" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="bold">2</text>

            {/* Fraction Marker Dot */}
            <circle cx={numberLineX} cy="30" r="6" className="fill-blue-600 dark:fill-blue-400 stroke-white stroke-2 animate-pulse" />
            <text x={numberLineX} y="15" textAnchor="middle" fontSize="10" fontWeight="bold" className="fill-blue-600 dark:fill-blue-400">
              {safeNum}/{safeDen}
            </text>
          </svg>
          <span className="text-xs font-sans tabular-nums font-bold text-zinc-700 dark:text-zinc-300">
            Position: {(safeNum / safeDen).toFixed(3)}
          </span>
        </div>
      </div>
    </div>
  );
}
