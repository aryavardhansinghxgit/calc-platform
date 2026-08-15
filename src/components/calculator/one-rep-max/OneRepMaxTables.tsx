"use client";

import React from "react";
import { Table, Dumbbell, Activity, Layers, ShieldCheck } from "lucide-react";
import { OneRepMaxResult } from "@/lib/formulas/oneRepMax";

interface OneRepMaxTablesProps {
  result: OneRepMaxResult;
}

export function OneRepMaxTables({ result }: OneRepMaxTablesProps) {
  return (
    <div className="space-y-8 mt-8">
      {/* 1. Interactive 1RM to 12RM Repetition Weight Table */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Dumbbell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3>Repetition Maximum (1RM – 12RM) Weight Matrix</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Rep Max</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-purple-700 dark:text-purple-400">% 1RM</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">Target Weight ({result.unitLabel})</th>
                <th className="py-2.5 px-3 font-semibold text-emerald-700 dark:text-emerald-400">Training Zone</th>
                <th className="py-2.5 px-3 text-zinc-500">Recommended Prescription</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {result.repBreakdown.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2 px-3 font-bold text-zinc-900 dark:text-zinc-100">{row.reps} RM</td>
                  <td className="py-2 px-3 font-sans tabular-nums font-bold text-purple-700 dark:text-purple-400">{row.percentage}%</td>
                  <td className="py-2 px-3 font-sans tabular-nums font-bold text-blue-700 dark:text-blue-400">{row.weight} {result.unitLabel}</td>
                  <td className="py-2 px-3 font-semibold text-emerald-700 dark:text-emerald-400">{row.intensityZone}</td>
                  <td className="py-2 px-3 text-zinc-500">{row.recommendedUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. 7 Clinical Formula Comparison Table */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3>7 Clinical Formula 1RM Comparison Table</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Formula Model</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-purple-700 dark:text-purple-400">Estimated 1RM ({result.unitLabel})</th>
                <th className="py-2.5 px-3 text-zinc-500">Clinical &amp; Exercise Science Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {result.formulaResults.map((f, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2.5 px-3 font-bold text-zinc-900 dark:text-zinc-100">{f.formulaName}</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums font-bold text-purple-700 dark:text-purple-400">{f.oneRepMax} {result.unitLabel}</td>
                  <td className="py-2.5 px-3 text-zinc-500">{f.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Training Intensity & Goal Matrix */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3>Strength &amp; Conditioning Training Intensity Zones</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {result.trainingZones.map((zone, idx) => (
            <div key={idx} className="p-3.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{zone.zoneName}</span>
                <span className="font-sans tabular-nums text-[10px] font-bold text-purple-600 dark:text-purple-400">{zone.percentageRange}</span>
              </div>
              <strong className="text-base font-black text-blue-600 dark:text-blue-400 block">{zone.weightRange}</strong>
              <div className="text-[11px] text-zinc-500 flex justify-between pt-1 border-t border-zinc-200 dark:border-zinc-800">
                <span>Reps: {zone.repRange}</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{zone.focus}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
