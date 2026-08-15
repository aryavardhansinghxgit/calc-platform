"use client";

import React from "react";
import { Table, HeartPulse, Layers, Activity, ShieldCheck } from "lucide-react";
import { TargetHeartRateResult } from "@/lib/formulas/targetHeartRate";

interface TargetHeartRateTablesProps {
  result: TargetHeartRateResult;
}

export function TargetHeartRateTables({ result }: TargetHeartRateTablesProps) {
  const borg620Matrix = [
    { rating: 6, intensity: "No exertion at all", pct: "40%", bpm: Math.round(result.rhr + 0.0 * result.hrr) },
    { rating: 9, intensity: "Very light (Easy walking)", pct: "55%", bpm: Math.round(result.rhr + 0.21 * result.hrr) },
    { rating: 11, intensity: "Light (Brisk walking)", pct: "65%", bpm: Math.round(result.rhr + 0.35 * result.hrr) },
    { rating: 13, intensity: "Somewhat hard (Moderate jog)", pct: "75%", bpm: Math.round(result.rhr + 0.50 * result.hrr) },
    { rating: 15, intensity: "Hard (Heavy aerobic effort)", pct: "85%", bpm: Math.round(result.rhr + 0.64 * result.hrr) },
    { rating: 17, intensity: "Very hard (Interval sprint)", pct: "92%", bpm: Math.round(result.rhr + 0.78 * result.hrr) },
    { rating: 20, intensity: "Maximal exertion (Exhaustion)", pct: "100%", bpm: result.calculatedMhr },
  ];

  return (
    <div className="space-y-8 mt-8">
      {/* 1. 5 Standard Heart Rate Training Zones Matrix */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <HeartPulse className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3>5 Target Heart Rate Training Zones Breakdown</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Training Zone</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-emerald-700 dark:text-emerald-400">Intensity Range</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">Target BPM Range</th>
                <th className="py-2.5 px-3 font-semibold text-purple-700 dark:text-purple-400">Primary Benefit</th>
                <th className="py-2.5 px-3 text-zinc-500">Physiological Adaptation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {result.zones.map((z) => (
                <tr key={z.zoneNumber} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2.5 px-3 font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: z.colorHex }} />
                    {z.zoneName}
                  </td>
                  <td className="py-2.5 px-3 font-sans tabular-nums font-bold text-emerald-700 dark:text-emerald-400">{z.percentageRange}</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums font-bold text-blue-700 dark:text-blue-400">{z.minBpm} – {z.maxBpm} BPM</td>
                  <td className="py-2.5 px-3 font-semibold text-purple-700 dark:text-purple-400">{z.benefit}</td>
                  <td className="py-2.5 px-3 text-zinc-500">{z.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Borg Rating of Perceived Exertion (RPE 6-20) Table */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3>Borg RPE (6-20 Scale) Target BPM Conversion Table</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3 font-sans tabular-nums text-purple-700 dark:text-purple-400">Borg Rating (6-20)</th>
                <th className="py-2.5 px-3">Subjective Exertion Level</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-emerald-700 dark:text-emerald-400">% HRR Equivalent</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">Calculated Target BPM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {borg620Matrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2 px-3 font-sans tabular-nums font-bold text-purple-700 dark:text-purple-400">Rating {row.rating}</td>
                  <td className="py-2 px-3 font-bold text-zinc-900 dark:text-zinc-100">{row.intensity}</td>
                  <td className="py-2 px-3 font-sans tabular-nums text-emerald-700 dark:text-emerald-400">{row.pct}</td>
                  <td className="py-2 px-3 font-sans tabular-nums font-bold text-blue-700 dark:text-blue-400">{row.bpm} BPM</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Clinical Formula Comparison Table */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3>Clinical MHR Formula Comparison Table</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Formula Model</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-emerald-700 dark:text-emerald-400">Calculated MHR (BPM)</th>
                <th className="py-2.5 px-3 text-zinc-500">Clinical Background &amp; Target Population</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {result.formulaComparison.map((f, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2.5 px-3 font-bold text-zinc-900 dark:text-zinc-100">{f.formulaName}</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums font-bold text-emerald-700 dark:text-emerald-400">{f.mhrBpm} BPM</td>
                  <td className="py-2.5 px-3 text-zinc-500">{f.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
