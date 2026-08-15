"use client";

import React from "react";
import { Activity, Flame, Droplet, Table, Scale, Info } from "lucide-react";
import { BmrResult } from "@/lib/formulas/bmr";

interface BmrTablesProps {
  result: BmrResult;
}

export function BmrTables({ result }: BmrTablesProps) {
  const organBurnTable = [
    { organ: "Liver", percent: "27%", kcal: Math.round(result.selectedBmr * 0.27), description: "Metabolic synthesis, glycogen storage, and detoxification" },
    { organ: "Brain", percent: "19%", kcal: Math.round(result.selectedBmr * 0.19), description: "Continuous neuronal firing, ion transport, and glucose utilization" },
    { organ: "Skeletal Muscle", percent: "18%", kcal: Math.round(result.selectedBmr * 0.18), description: "Resting tone and cellular ion transport in muscle tissue" },
    { organ: "Kidneys", percent: "10%", kcal: Math.round(result.selectedBmr * 0.10), description: "Continuous blood filtration, fluid balance, and electrolyte transport" },
    { organ: "Heart", percent: "7%", kcal: Math.round(result.selectedBmr * 0.07), description: "Incessant myocardial contractions pumping blood volume" },
    { organ: "Adipose & Other Organs", percent: "19%", kcal: Math.round(result.selectedBmr * 0.19), description: "Endocrine signaling, skin turnover, and gastrointestinal resting repair" },
  ];

  return (
    <div className="space-y-8 mt-8">
      {/* 1. Enhanced Activity Multiplier Table */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3>Daily Calorie Requirements by Activity Level</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Activity Level</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-center">Multiplier</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-emerald-700 dark:text-emerald-400">Maintenance TDEE</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-sky-700 dark:text-sky-400">Weight Loss (-500 kcal)</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-purple-700 dark:text-purple-400">Weight Gain (+500 kcal)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {result.activityTiers.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2.5 px-3 font-semibold text-zinc-900 dark:text-zinc-100">{row.label}</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums text-center font-bold text-zinc-500">{row.multiplier}×</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums font-bold text-emerald-700 dark:text-emerald-400">{row.tdee} kcal</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums font-bold text-sky-700 dark:text-sky-400">{row.weightLossCals} kcal</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums font-bold text-purple-700 dark:text-purple-400">{row.weightGainCals} kcal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Organ Energy Expenditure Breakdown Table */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Flame className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          <h3>Organ Energy Expenditure Breakdown (% of BMR)</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Organ / Tissue Systems</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-rose-700 dark:text-rose-400">Share of BMR</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-emerald-700 dark:text-emerald-400">Estimated Daily Burn</th>
                <th className="py-2.5 px-3">Physiological Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {organBurnTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2 px-3 font-bold text-zinc-900 dark:text-zinc-100">{row.organ}</td>
                  <td className="py-2 px-3 font-sans tabular-nums font-bold text-rose-600 dark:text-rose-400">{row.percent}</td>
                  <td className="py-2 px-3 font-sans tabular-nums font-bold text-emerald-600 dark:text-emerald-400">{row.kcal} kcal/day</td>
                  <td className="py-2 px-3 text-zinc-500">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. BMR Formula Side-by-Side Comparison */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3>BMR Clinical Equations Comparison</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900/40">
            <span className="text-blue-700 dark:text-blue-400 font-bold block text-[10px]">Mifflin-St Jeor</span>
            <strong className="text-xl font-black text-blue-900 dark:text-blue-200 block mt-0.5">{result.mifflinBmr} kcal</strong>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Clinical Standard (±5% accuracy)</span>
          </div>

          <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-xl border border-purple-200 dark:border-purple-900/40">
            <span className="text-purple-700 dark:text-purple-400 font-bold block text-[10px]">Revised Harris-Benedict</span>
            <strong className="text-xl font-black text-purple-900 dark:text-purple-200 block mt-0.5">{result.harrisBmr} kcal</strong>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Roza &amp; Shizgal (1984) update</span>
          </div>

          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/40">
            <span className="text-emerald-700 dark:text-emerald-400 font-bold block text-[10px]">Katch-McArdle</span>
            <strong className="text-xl font-black text-emerald-900 dark:text-emerald-200 block mt-0.5">{result.katchBmr} kcal</strong>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Based on Lean Mass ({result.leanMassLbs} lbs)</span>
          </div>
        </div>
      </section>

      {/* 4. Hydration Recommendation Table */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Droplet className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          <h3>Daily Hydration &amp; Water Requirement</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
          <div className="p-3 bg-sky-50 dark:bg-sky-950/20 rounded-xl border border-sky-200 dark:border-sky-900/40">
            <span className="text-sky-700 dark:text-sky-400 font-bold block text-[10px]">Daily Water (Liters)</span>
            <strong className="text-xl font-black text-sky-900 dark:text-sky-200 block mt-0.5">{result.hydration.waterLiters} L</strong>
          </div>
          <div className="p-3 bg-sky-50 dark:bg-sky-950/20 rounded-xl border border-sky-200 dark:border-sky-900/40">
            <span className="text-sky-700 dark:text-sky-400 font-bold block text-[10px]">Daily Water (Ounces)</span>
            <strong className="text-xl font-black text-sky-900 dark:text-sky-200 block mt-0.5">{result.hydration.waterOunces} oz</strong>
          </div>
          <div className="p-3 bg-sky-50 dark:bg-sky-950/20 rounded-xl border border-sky-200 dark:border-sky-900/40">
            <span className="text-sky-700 dark:text-sky-400 font-bold block text-[10px]">8-oz Glasses / Day</span>
            <strong className="text-xl font-black text-sky-900 dark:text-sky-200 block mt-0.5">{result.hydration.waterCups} cups</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
