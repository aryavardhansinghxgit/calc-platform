"use client";

import React from "react";
import { Table, Calendar, Award, Scale, Info } from "lucide-react";
import { IdealWeightResult } from "@/lib/formulas/idealWeight";

interface IdealWeightTablesProps {
  result: IdealWeightResult;
}

export function IdealWeightTables({ result }: IdealWeightTablesProps) {
  const formulaTable = [
    { ...result.hamwi, color: "text-blue-600 dark:text-blue-400" },
    { ...result.devine, color: "text-sky-600 dark:text-sky-400" },
    { ...result.robinson, color: "text-indigo-600 dark:text-indigo-400" },
    { ...result.miller, color: "text-purple-600 dark:text-purple-400" },
    { ...result.lemmens, color: "text-emerald-600 dark:text-emerald-400" },
  ];

  const heightReferenceTable = [
    { height: "4'10\" (147 cm)", female: "91 – 115 lbs", male: "98 – 122 lbs", bmiRange: "88 – 119 lbs" },
    { height: "5'0\" (152 cm)", female: "97 – 123 lbs", male: "105 – 131 lbs", bmiRange: "95 – 128 lbs" },
    { height: "5'2\" (157 cm)", female: "104 – 131 lbs", male: "113 – 141 lbs", bmiRange: "101 – 137 lbs" },
    { height: "5'4\" (163 cm)", female: "111 – 139 lbs", male: "121 – 151 lbs", bmiRange: "108 – 146 lbs" },
    { height: "5'6\" (168 cm)", female: "118 – 148 lbs", male: "129 – 161 lbs", bmiRange: "115 – 155 lbs" },
    { height: "5'8\" (173 cm)", female: "125 – 156 lbs", male: "137 – 171 lbs", bmiRange: "122 – 164 lbs" },
    { height: "5'10\" (178 cm)", female: "132 – 165 lbs", male: "145 – 181 lbs", bmiRange: "129 – 174 lbs" },
    { height: "6'0\" (183 cm)", female: "139 – 174 lbs", male: "153 – 191 lbs", bmiRange: "136 – 184 lbs" },
    { height: "6'2\" (188 cm)", female: "146 – 183 lbs", male: "161 – 201 lbs", bmiRange: "144 – 194 lbs" },
    { height: "6'4\" (193 cm)", female: "153 – 192 lbs", male: "169 – 211 lbs", bmiRange: "152 – 205 lbs" },
  ];

  const deltaLbs = Math.abs(result.weightDeltaLbs);

  return (
    <div className="space-y-8 mt-8">
      {/* 1. Clinical Formula Comparison Table */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Table className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3>Clinical Ideal Body Weight (IBW) Formulas Comparison</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-3">Formula Name</th>
                <th className="py-3 px-3 font-mono text-center">Year</th>
                <th className="py-3 px-3 font-mono text-blue-700 dark:text-blue-400">Ideal Weight (lbs)</th>
                <th className="py-3 px-3 font-mono text-emerald-700 dark:text-emerald-400">Ideal Weight (kg)</th>
                <th className="py-3 px-3">Historical / Clinical Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {formulaTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className={`py-2.5 px-3 font-bold ${row.color}`}>{row.name}</td>
                  <td className="py-2.5 px-3 font-mono text-center text-zinc-400">{row.year}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-zinc-900 dark:text-zinc-100">{row.weightLbs} lbs</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-700 dark:text-emerald-400">{row.weightKg} kg</td>
                  <td className="py-2.5 px-3 text-zinc-500">{row.description}</td>
                </tr>
              ))}
              <tr className="bg-blue-50/50 dark:bg-blue-950/20 font-bold">
                <td className="py-3 px-3 text-blue-900 dark:text-blue-200">Consensus Formula Average</td>
                <td className="py-3 px-3 text-center text-blue-500">—</td>
                <td className="py-3 px-3 font-mono text-blue-800 dark:text-blue-300">{result.consensusLbs} lbs</td>
                <td className="py-3 px-3 font-mono text-blue-800 dark:text-blue-300">{result.consensusKg} kg</td>
                <td className="py-3 px-3 text-blue-700 dark:text-blue-300">Equally weighted mean across all 5 clinical equations</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Target Progress Timeline Planner (if current weight provided) */}
      {result.currentWeightLbs && deltaLbs > 0 && (
        <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
            <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3>Target Weight Timeline Estimate (To Reach {result.consensusLbs} lbs IBW)</h3>
          </div>

          <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="py-2.5 px-3">Weekly Change Rate</th>
                  <th className="py-2.5 px-3">Caloric Deficit / Surplus</th>
                  <th className="py-2.5 px-3">Estimated Weeks</th>
                  <th className="py-2.5 px-3">Target Completion Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
                <tr>
                  <td className="py-2 px-3 font-semibold">0.5 lb / week (Conservative)</td>
                  <td className="py-2 px-3 font-mono">±250 kcal/day</td>
                  <td className="py-2 px-3 font-mono font-bold text-sky-600">{result.weeksAtHalfLbPerWk} weeks</td>
                  <td className="py-2 px-3" suppressHydrationWarning>{new Date(Date.now() + result.weeksAtHalfLbPerWk * 7 * 86400000).toLocaleDateString()}</td>
                </tr>
                <tr className="bg-emerald-50/40 dark:bg-emerald-950/20 font-semibold">
                  <td className="py-2 px-3 text-emerald-800 dark:text-emerald-300 font-bold">1.0 lb / week (Standard)</td>
                  <td className="py-2 px-3 font-mono text-emerald-700">±500 kcal/day</td>
                  <td className="py-2 px-3 font-mono font-bold text-emerald-700">{result.weeksAtOneLbPerWk} weeks</td>
                  <td className="py-2 px-3 text-emerald-700" suppressHydrationWarning>{new Date(Date.now() + result.weeksAtOneLbPerWk * 7 * 86400000).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold">1.5 lbs / week (Aggressive)</td>
                  <td className="py-2 px-3 font-mono">±750 kcal/day</td>
                  <td className="py-2 px-3 font-mono font-bold text-purple-600">{result.weeksAtOneAndHalfLbPerWk} weeks</td>
                  <td className="py-2 px-3" suppressHydrationWarning>{new Date(Date.now() + result.weeksAtOneAndHalfLbPerWk * 7 * 86400000).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold">2.0 lbs / week (Maximum)</td>
                  <td className="py-2 px-3 font-mono">±1000 kcal/day</td>
                  <td className="py-2 px-3 font-mono font-bold text-rose-600">{result.weeksAtTwoLbsPerWk} weeks</td>
                  <td className="py-2 px-3" suppressHydrationWarning>{new Date(Date.now() + result.weeksAtTwoLbsPerWk * 7 * 86400000).toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 3. Ideal Weight by Height Reference Table */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3>Ideal Weight Reference Chart by Height &amp; Gender</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Height</th>
                <th className="py-2.5 px-3 font-mono text-purple-700 dark:text-purple-400">Women IBW Range</th>
                <th className="py-2.5 px-3 font-mono text-blue-700 dark:text-blue-400">Men IBW Range</th>
                <th className="py-2.5 px-3 font-mono text-emerald-700 dark:text-emerald-400">WHO Healthy BMI Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {heightReferenceTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2 px-3 font-bold text-zinc-900 dark:text-zinc-100">{row.height}</td>
                  <td className="py-2 px-3 font-mono text-purple-700 dark:text-purple-400">{row.female}</td>
                  <td className="py-2 px-3 font-mono text-blue-700 dark:text-blue-400">{row.male}</td>
                  <td className="py-2 px-3 font-mono text-emerald-700 dark:text-emerald-400">{row.bmiRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
