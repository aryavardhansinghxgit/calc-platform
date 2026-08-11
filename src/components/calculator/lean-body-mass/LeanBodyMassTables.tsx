"use client";

import React from "react";
import { Table, Dumbbell, Activity, Layers } from "lucide-react";
import { LeanBodyMassResult } from "@/lib/formulas/leanBodyMass";

interface LeanBodyMassTablesProps {
  result: LeanBodyMassResult;
}

export function LeanBodyMassTables({ result }: LeanBodyMassTablesProps) {
  const heightReferenceMatrix = [
    { height: "5'2\" (157 cm)", w120: "94.2 lbs (78.5%)", w150: "108.5 lbs (72.3%)", w180: "120.1 lbs (66.7%)", w210: "130.4 lbs (62.1%)" },
    { height: "5'6\" (168 cm)", w120: "99.8 lbs (83.2%)", w150: "116.2 lbs (77.5%)", w180: "129.8 lbs (72.1%)", w210: "141.2 lbs (67.2%)" },
    { height: "5'10\" (178 cm)", w120: "105.4 lbs (87.8%)", w150: "124.0 lbs (82.7%)", w180: "139.5 lbs (77.5%)", w210: "152.0 lbs (72.4%)" },
    { height: "6'2\" (188 cm)", w120: "111.0 lbs (92.5%)", w150: "131.8 lbs (87.9%)", w180: "149.2 lbs (82.9%)", w210: "162.8 lbs (77.5%)" },
  ];

  return (
    <div className="space-y-8 mt-8">
      {/* 1. Clinical Multi-Formula Comparison Table */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3>Clinical Formula Comparison Table (Adult &amp; Pediatric)</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Formula Model</th>
                <th className="py-2.5 px-3 font-mono text-blue-700 dark:text-blue-400">Lean Mass (lbs / kg)</th>
                <th className="py-2.5 px-3 font-mono text-emerald-700 dark:text-emerald-400">Lean Mass %</th>
                <th className="py-2.5 px-3 font-mono text-rose-700 dark:text-rose-400">Body Fat %</th>
                <th className="py-2.5 px-3 text-zinc-500">Clinical Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {result.formulaResults.map((f, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2.5 px-3 font-bold text-zinc-900 dark:text-zinc-100">{f.formulaName}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-700 dark:text-blue-400">{f.lbmLbs} lbs ({f.lbmKg} kg)</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-700 dark:text-emerald-400">{f.lbmPercentage}%</td>
                  <td className="py-2.5 px-3 font-mono text-rose-700 dark:text-rose-400">{f.bodyFatPercentage}%</td>
                  <td className="py-2.5 px-3 text-zinc-500">{f.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Hypertrophy & Muscle Gain Target Plan */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Dumbbell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3>Muscle Mass Hypertrophy Goal Planner</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {result.hypertrophyTargets.map((t, idx) => (
            <div key={idx} className="p-3.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                +{t.addedMuscleLbs} lbs Pure Muscle Gain
              </span>
              <strong className="text-xl font-black text-zinc-900 dark:text-zinc-100 block">
                {t.targetTotalWeightLbs} lbs ({t.targetTotalWeightKg} kg)
              </strong>
              <div className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                New Lean Mass: <strong className="text-blue-600 dark:text-blue-400">{t.newLeanMassPercentage}%</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Lean Mass by Height & Weight Reference Chart */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Table className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3>Height vs Weight Lean Mass Benchmark Matrix</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Height</th>
                <th className="py-2.5 px-3 font-mono">120 lbs (54 kg)</th>
                <th className="py-2.5 px-3 font-mono">150 lbs (68 kg)</th>
                <th className="py-2.5 px-3 font-mono">180 lbs (82 kg)</th>
                <th className="py-2.5 px-3 font-mono">210 lbs (95 kg)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {heightReferenceMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2 px-3 font-bold text-zinc-900 dark:text-zinc-100">{row.height}</td>
                  <td className="py-2 px-3 font-mono text-zinc-600 dark:text-zinc-400">{row.w120}</td>
                  <td className="py-2 px-3 font-mono text-zinc-600 dark:text-zinc-400">{row.w150}</td>
                  <td className="py-2 px-3 font-mono text-zinc-600 dark:text-zinc-400">{row.w180}</td>
                  <td className="py-2 px-3 font-mono text-zinc-600 dark:text-zinc-400">{row.w210}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
