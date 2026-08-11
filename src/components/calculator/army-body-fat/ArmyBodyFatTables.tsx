"use client";

import React from "react";
import { ShieldCheck, Table, Flame, Target } from "lucide-react";
import { ArmyBodyFatResult } from "@/lib/formulas/armyBodyFat";

interface ArmyBodyFatTablesProps {
  result: ArmyBodyFatResult;
}

export function ArmyBodyFatTables({ result }: ArmyBodyFatTablesProps) {
  const armyStandardsTable = [
    { ageGroup: "Age 17 – 20", maleMax: "20%", femaleMax: "30%" },
    { ageGroup: "Age 21 – 27", maleMax: "22%", femaleMax: "32%" },
    { ageGroup: "Age 28 – 39", maleMax: "24%", femaleMax: "34%" },
    { ageGroup: "Age 40 and Over", maleMax: "26%", femaleMax: "36%" },
  ];

  const categoryMatrix = [
    { category: "Essential Fat", maleRange: "2% – 5%", femaleRange: "10% – 13%", description: "Minimum physiological fat for cellular survival" },
    { category: "Athletes / Elite", maleRange: "6% – 13%", femaleRange: "14% – 20%", description: "Optimal body composition for high ACFT endurance" },
    { category: "Fitness Standard", maleRange: "14% – 17%", femaleRange: "21% – 24%", description: "Excellent health and military physical readiness" },
    { category: "Average / Compliant", maleRange: "18% – 24%", femaleRange: "25% – 31%", description: "Acceptable active-duty military standard" },
    { category: "ABCP Overweight Flag", maleRange: "> 26%", femaleRange: "> 36%", description: "Exceeds AR 600-9 limits; subject to flagging" },
  ];

  return (
    <div className="space-y-8 mt-8">
      {/* 1. Official AR 600-9 Maximum Allowable Body Fat Standards */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3>Official U.S. Army Body Fat Standards (AR 600-9)</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Age Bracket</th>
                <th className="py-2.5 px-3 font-mono text-blue-700 dark:text-blue-400">Male Max Allowed</th>
                <th className="py-2.5 px-3 font-mono text-purple-700 dark:text-purple-400">Female Max Allowed</th>
                <th className="py-2.5 px-3 text-zinc-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {armyStandardsTable.map((row, idx) => {
                const isCurrentBracket = result.ageBracketLabel.includes(row.ageGroup.replace("Age ", ""));
                return (
                  <tr key={idx} className={isCurrentBracket ? "bg-emerald-50/70 dark:bg-emerald-950/30 font-bold" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/40"}>
                    <td className="py-2.5 px-3 font-bold text-zinc-900 dark:text-zinc-100">{row.ageGroup}</td>
                    <td className="py-2.5 px-3 font-mono text-blue-700 dark:text-blue-400">{row.maleMax}</td>
                    <td className="py-2.5 px-3 font-mono text-purple-700 dark:text-purple-400">{row.femaleMax}</td>
                    <td className="py-2.5 px-3 text-zinc-500">
                      {isCurrentBracket ? <span className="text-emerald-700 dark:text-emerald-400 font-bold">Your Active Age Bracket</span> : "Standard"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Weight Loss & ABCP Compliance Action Plan Table */}
      {!result.isCompliant && (
        <section className="p-5 bg-rose-50/40 dark:bg-rose-950/10 rounded-xl border border-rose-200 dark:border-rose-900/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-rose-900 dark:text-rose-200 font-bold text-base">
            <Target className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h3>ABCP Compliance Weight Loss Target Plan</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <span className="text-zinc-500 text-[10px] font-bold uppercase block">Required Weight Reduction</span>
              <strong className="text-lg font-black text-rose-600 dark:text-rose-400 block mt-1">{result.requiredWeightLossLbs} lbs ({result.requiredWeightLossKg} kg)</strong>
              <span className="text-[10px] text-zinc-400 block">To reach {result.maxAllowableBodyFat}% Body Fat</span>
            </div>

            <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <span className="text-zinc-500 text-[10px] font-bold uppercase block">Timeline (1 lb / week)</span>
              <strong className="text-lg font-black text-blue-600 dark:text-blue-400 block mt-1">{result.estimatedWeeksToPassAt1LbPerWeek} Weeks</strong>
              <span className="text-[10px] text-zinc-400 block">500 kcal daily deficit</span>
            </div>

            <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <span className="text-zinc-500 text-[10px] font-bold uppercase block">Timeline (2 lbs / week)</span>
              <strong className="text-lg font-black text-emerald-600 dark:text-emerald-400 block mt-1">{result.estimatedWeeksToPassAt2LbsPerWeek} Weeks</strong>
              <span className="text-[10px] text-zinc-400 block">1,000 kcal daily deficit</span>
            </div>
          </div>
        </section>
      )}

      {/* 3. General Body Fat Categories Matrix */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Table className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3>Body Fat Categories Reference Matrix</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Classification</th>
                <th className="py-2.5 px-3 font-mono text-blue-700 dark:text-blue-400">Male Range</th>
                <th className="py-2.5 px-3 font-mono text-purple-700 dark:text-purple-400">Female Range</th>
                <th className="py-2.5 px-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {categoryMatrix.map((row, idx) => {
                const isSelected = result.category === row.category;
                return (
                  <tr key={idx} className={isSelected ? "bg-blue-50/70 dark:bg-blue-950/30 font-bold" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/40"}>
                    <td className="py-2 px-3 font-bold text-zinc-900 dark:text-zinc-100">{row.category}</td>
                    <td className="py-2 px-3 font-mono text-blue-700 dark:text-blue-400">{row.maleRange}</td>
                    <td className="py-2 px-3 font-mono text-purple-700 dark:text-purple-400">{row.femaleRange}</td>
                    <td className="py-2 px-3 text-zinc-500">{row.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
