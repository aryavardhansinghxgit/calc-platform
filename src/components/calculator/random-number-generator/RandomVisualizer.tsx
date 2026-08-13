"use client";

import React from "react";

interface RandomVisualizerProps {
  numbers: number[];
  histogramBins: { binLabel: string; count: number }[];
  mean: number;
  stdDev: number;
  min: number;
  max: number;
}

export function RandomVisualizer({ numbers, histogramBins, mean, stdDev, min, max }: RandomVisualizerProps) {
  const maxBinCount = Math.max(1, ...histogramBins.map((b) => b.count));
  const samplePoints = numbers.slice(0, 100);

  return (
    <div className="space-y-4 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
          <span>📊</span> Random Frequency Distribution ({numbers.length} Samples)
        </h4>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full">
          Mean: {mean} | σ: {stdDev}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* 1. FREQUENCY HISTOGRAM BINS */}
        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2">
          <span className="text-[11px] font-bold text-zinc-500">Frequency Histogram</span>
          <div className="h-28 w-full flex items-end justify-around gap-2 pt-4 pb-1 border-b border-zinc-200 dark:border-zinc-800">
            {histogramBins.map((bin, idx) => {
              const heightPct = (bin.count / maxBinCount) * 80;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                  <span className="text-[9px] font-mono font-bold text-blue-600 dark:text-blue-400 opacity-80">
                    {bin.count}
                  </span>
                  <div
                    className="w-full bg-blue-600 dark:bg-blue-500 rounded-t-md transition-all duration-300 group-hover:bg-blue-700"
                    style={{ height: `${Math.max(4, heightPct)}px` }}
                  />
                  <span className="text-[8px] font-mono text-zinc-500 truncate w-full text-center">
                    {bin.binLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. DISPERSION SCATTER DOT CLOUD */}
        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-2">
          <span className="text-[11px] font-bold text-zinc-500">Random Dispersion Plot (First 100)</span>
          <svg width="220" height="95" viewBox="0 0 220 95" className="w-full bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 p-1">
            {/* Axis Lines */}
            <line x1="20" y1="80" x2="210" y2="80" stroke="#9ca3af" strokeWidth="1" />
            <line x1="20" y1="10" x2="20" y2="80" stroke="#9ca3af" strokeWidth="1" />

            {/* Scatter Dots */}
            {samplePoints.map((val, idx) => {
              const xPos = 25 + (idx / Math.max(1, samplePoints.length - 1)) * 180;
              const range = max - min || 1;
              const yPos = 75 - ((val - min) / range) * 60;
              return (
                <circle
                  key={idx}
                  cx={xPos}
                  cy={yPos}
                  r="2.5"
                  className="fill-blue-600 dark:fill-blue-400 opacity-80 hover:opacity-100 hover:r-4 transition-all"
                />
              );
            })}
          </svg>
          <div className="flex justify-between text-[9px] font-mono text-zinc-500">
            <span>Min: {min}</span>
            <span>Max: {max}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
