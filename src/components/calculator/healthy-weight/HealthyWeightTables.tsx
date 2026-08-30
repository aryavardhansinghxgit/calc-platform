"use client";

import React from "react";
import { Table, Target, Activity, Layers, CheckCircle } from "lucide-react";
import { HealthyWeightResult } from "@/lib/formulas/healthyWeight";

interface HealthyWeightTablesProps {
  result: HealthyWeightResult;
}

export function HealthyWeightTables({ result }: HealthyWeightTablesProps) {
  const heightMatrix = [
    { height: "5'0\" (152 cm)", healthyRange: "95 – 128 lbs (43 – 58 kg)", target: "111.4 lbs (50.5 kg)" },
    { height: "5'3\" (160 cm)", healthyRange: "104 – 141 lbs (47 – 64 kg)", target: "122.8 lbs (55.7 kg)" },
    { height: "5'6\" (168 cm)", healthyRange: "115 – 154 lbs (52 – 70 kg)", target: "134.7 lbs (61.1 kg)" },
    { height: "5'9\" (175 cm)", healthyRange: "125 – 169 lbs (57 – 77 kg)", target: "147.2 lbs (66.8 kg)" },
    { height: "6'0\" (183 cm)", healthyRange: "136 – 184 lbs (62 – 83 kg)", target: "160.2 lbs (72.7 kg)" },
    { height: "6'3\" (190 cm)", healthyRange: "148 – 199 lbs (67 – 90 kg)", target: "173.8 lbs (78.8 kg)" },
  ];

  return (
    <div className="space-y-8 mt-8">
      {/* 1. Clinical Method Comparison Table */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3>Clinical Ideal Weight Method Comparison Table</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Method / Formula</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">Ideal Weight (lbs / kg)</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-purple-700 dark:text-purple-400">Difference from Current</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-zinc-500">Method Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {result.methods.map((m, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2.5 px-3 font-bold text-zinc-900 dark:text-zinc-100">{m.methodName}</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums font-bold text-blue-700 dark:text-blue-400">{m.idealWeightLbs.toFixed(1)} lbs ({m.idealWeightKg.toFixed(1)} kg)</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums text-purple-700 dark:text-purple-400">
                    {m.differenceLbs > 0 ? `+${m.differenceLbs.toFixed(1)} lbs` : `${m.differenceLbs.toFixed(1)} lbs`}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${m.status === "Inside Healthy Range" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-zinc-500">{m.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Weight Loss / Gain Timeline Projections */}
      {result.recommendationType !== "maintain" && (
        <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
            <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3>Healthy Weight Goal Progress Timeline</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            {result.timelinePlans.map((plan, idx) => (
              <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1 text-center">
                <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400 block">
                  {plan.ratePerWeekLbs} lb / week pace
                </span>
                <strong className="text-xl font-black text-zinc-900 dark:text-zinc-100 block">
                  {plan.weeksToTarget} Weeks
                </strong>
                <span className="text-[10px] text-zinc-400 block pt-1 border-t border-zinc-200 dark:border-zinc-800">
                  {plan.dailyCaloricAdjustmentKcal} kcal/day adjustment
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Healthy Weight by Height Benchmark Table */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Table className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3>Healthy Weight Range by Height Reference Chart</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Height</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-emerald-700 dark:text-emerald-400">WHO Healthy Weight Range (BMI 18.5–24.9)</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">Prime Target Healthy Weight (BMI 21.7)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {heightMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2.5 px-3 font-bold text-zinc-900 dark:text-zinc-100">{row.height}</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums text-emerald-700 dark:text-emerald-400">{row.healthyRange}</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">{row.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
