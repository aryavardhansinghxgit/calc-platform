"use client";

import React, { useMemo } from "react";
import { Table, Dumbbell, Layers } from "lucide-react";
import {
  LeanBodyMassResult,
  calculateLeanBodyMass,
  Gender,
  UnitSystem,
} from "@/lib/formulas/leanBodyMass";

interface LeanBodyMassTablesProps {
  result: LeanBodyMassResult;
  gender: Gender;
  unitSystem: UnitSystem;
}

export function LeanBodyMassTables({ result, gender, unitSystem }: LeanBodyMassTablesProps) {
  // Dynamically compute the Height vs Weight Benchmark Matrix from the engine
  const benchmarkMatrix = useMemo(() => {
    const heights = [
      { label: "5'2\" (157 cm)", in: 62, cm: 157.5 },
      { label: "5'6\" (168 cm)", in: 66, cm: 167.6 },
      { label: "5'10\" (178 cm)", in: 70, cm: 177.8 },
      { label: "6'2\" (188 cm)", in: 74, cm: 188.0 },
    ];

    const weights = [120, 150, 180, 210];

    return heights.map((h) => {
      const cells = weights.map((wLbs) => {
        const res = calculateLeanBodyMass({
          unitSystem: "imperial",
          gender,
          isChild: false,
          age: 30,
          weightLbs: wLbs,
          heightInches: h.in,
        });
        return {
          weightLbs: wLbs,
          lbmLbs: res.consensusLbmLbs,
          lbmPct: res.consensusLbmPercentage,
        };
      });

      return {
        heightLabel: h.label,
        cells,
      };
    });
  }, [gender]);

  return (
    <div className="space-y-8 mt-8">
      {/* 1. Clinical Multi-Formula Comparison Table */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            {result.isChild ? "Peters Pediatric Model Breakdown" : "Clinical Formula Comparison Table (Adult Equations)"}
          </h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Formula Model</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">Lean Mass (lbs / kg)</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-emerald-700 dark:text-emerald-400">Lean Mass %</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-rose-700 dark:text-rose-400">Body Fat %</th>
                <th className="py-2.5 px-3 text-zinc-500">Clinical Focus &amp; Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {result.formulaResults.map((f, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2.5 px-3 font-bold text-zinc-900 dark:text-zinc-100">{f.formulaName}</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums font-bold text-blue-700 dark:text-blue-400">
                    {f.lbmLbs} lbs ({f.lbmKg} kg)
                  </td>
                  <td className="py-2.5 px-3 font-sans tabular-nums text-emerald-700 dark:text-emerald-400 font-semibold">
                    {f.lbmPercentage}%
                  </td>
                  <td className="py-2.5 px-3 font-sans tabular-nums text-rose-700 dark:text-rose-400 font-semibold">
                    {f.bodyFatPercentage}%
                  </td>
                  <td className="py-2.5 px-3 text-zinc-500 dark:text-zinc-400">{f.description}</td>
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
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Muscle Mass Hypertrophy Goal Planner
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {result.hypertrophyTargets.map((t, idx) => (
            <div key={idx} className="p-3.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                +{t.addedMuscleLbs} lbs Lean Muscle Target
              </span>
              <strong className="text-xl font-black text-zinc-900 dark:text-zinc-100 block font-sans tabular-nums">
                {t.targetTotalWeightLbs} lbs ({t.targetTotalWeightKg} kg)
              </strong>
              <div className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                New Lean Mass: <strong className="text-blue-600 dark:text-blue-400 font-sans tabular-nums">{t.newLeanMassPercentage}%</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Lean Mass by Height & Weight Reference Chart (Dynamically Computed) */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Table className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Height vs Weight Lean Mass Benchmark Matrix ({gender === "male" ? "Adult Male" : "Adult Female"})
          </h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Height</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">120 lbs (54 kg)</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">150 lbs (68 kg)</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">180 lbs (82 kg)</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">210 lbs (95 kg)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {benchmarkMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2 px-3 font-bold text-zinc-900 dark:text-zinc-100">{row.heightLabel}</td>
                  {row.cells.map((c, cIdx) => (
                    <td key={cIdx} className="py-2 px-3 font-sans tabular-nums text-zinc-700 dark:text-zinc-300 font-medium">
                      {c.lbmLbs} lbs ({c.lbmPct}%)
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
