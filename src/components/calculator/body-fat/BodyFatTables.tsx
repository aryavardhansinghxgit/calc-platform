"use client";

import React from "react";
import { Award, Table, Calendar, Activity, Info } from "lucide-react";
import { BodyFatResult } from "@/lib/formulas/bodyFat";

interface BodyFatTablesProps {
  result: BodyFatResult;
}

export function BodyFatTables({ result }: BodyFatTablesProps) {
  const aceTable = [
    { description: "Essential Fat", women: "10 – 13%", men: "2 – 5%", color: "text-sky-600 dark:text-sky-400" },
    { description: "Athletes", women: "14 – 20%", men: "6 – 13%", color: "text-emerald-600 dark:text-emerald-400" },
    { description: "Fitness", women: "21 – 24%", men: "14 – 17%", color: "text-emerald-700 dark:text-emerald-300" },
    { description: "Average", women: "25 – 31%", men: "18 – 24%", color: "text-amber-600 dark:text-amber-400" },
    { description: "Obese", women: "32%+", men: "25%+", color: "text-rose-600 dark:text-rose-400" },
  ];

  const jacksonPollockTable = [
    { age: "20", women: "17.7%", men: "8.5%" },
    { age: "25", women: "18.4%", men: "10.5%" },
    { age: "30", women: "19.3%", men: "12.7%" },
    { age: "35", women: "21.5%", men: "13.7%" },
    { age: "40", women: "22.2%", men: "15.3%" },
    { age: "45", women: "22.9%", men: "16.4%" },
    { age: "50", women: "25.2%", men: "18.9%" },
    { age: "55", women: "26.3%", men: "20.9%" },
  ];

  const fatToLose = Math.max(0, result.customFatToLoseLbs);

  return (
    <div className="space-y-8 mt-8">
      {/* 1. Target Body Fat Loss Timeline Planner */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3>Target Fat Loss &amp; Timeline Estimate</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">Current Weight</span>
            <strong className="text-sm font-bold text-zinc-900 dark:text-zinc-100 block mt-0.5">{result.weightLbs} lbs</strong>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-900/40">
            <span className="text-emerald-700 dark:text-emerald-400 block text-[10px]">Goal Target BFP</span>
            <strong className="text-sm font-bold text-emerald-800 dark:text-emerald-300 block mt-0.5">{result.customTargetBfp}%</strong>
          </div>
          <div className="p-3 bg-sky-50 dark:bg-sky-950/20 rounded-lg border border-sky-200 dark:border-sky-900/40">
            <span className="text-sky-700 dark:text-sky-400 block text-[10px]">Target Body Weight</span>
            <strong className="text-sm font-bold text-sky-800 dark:text-sky-300 block mt-0.5">{result.customTargetWeightLbs} lbs</strong>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900/40">
            <span className="text-purple-700 dark:text-purple-400 block text-[10px]">Fat to Lose</span>
            <strong className="text-sm font-bold text-purple-800 dark:text-purple-300 block mt-0.5">{fatToLose} lbs</strong>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Fat Loss Rate</th>
                <th className="py-2.5 px-3">Weekly Deficit Required</th>
                <th className="py-2.5 px-3">Estimated Weeks</th>
                <th className="py-2.5 px-3">Target Completion Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              <tr>
                <td className="py-2 px-3 font-semibold">0.5 lb / week (Conservative)</td>
                <td className="py-2 px-3 font-mono">-250 kcal/day</td>
                <td className="py-2 px-3 font-mono font-bold text-sky-600">{Math.ceil(fatToLose / 0.5)} weeks</td>
                <td className="py-2 px-3" suppressHydrationWarning>{new Date(Date.now() + (fatToLose / 0.5) * 7 * 86400000).toLocaleDateString()}</td>
              </tr>
              <tr className="bg-emerald-50/40 dark:bg-emerald-950/20 font-semibold">
                <td className="py-2 px-3 text-emerald-800 dark:text-emerald-300 font-bold">1.0 lb / week (Standard)</td>
                <td className="py-2 px-3 font-mono text-emerald-700">-500 kcal/day</td>
                <td className="py-2 px-3 font-mono font-bold text-emerald-700">{Math.ceil(fatToLose)} weeks</td>
                <td className="py-2 px-3 text-emerald-700" suppressHydrationWarning>{new Date(Date.now() + fatToLose * 7 * 86400000).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold">1.5 lbs / week (Aggressive)</td>
                <td className="py-2 px-3 font-mono">-750 kcal/day</td>
                <td className="py-2 px-3 font-mono font-bold text-purple-600">{Math.ceil(fatToLose / 1.5)} weeks</td>
                <td className="py-2 px-3" suppressHydrationWarning>{new Date(Date.now() + (fatToLose / 1.5) * 7 * 86400000).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold">2.0 lbs / week (Maximum)</td>
                <td className="py-2 px-3 font-mono">-1000 kcal/day</td>
                <td className="py-2 px-3 font-mono font-bold text-rose-600">{Math.ceil(fatToLose / 2.0)} weeks</td>
                <td className="py-2 px-3" suppressHydrationWarning>{new Date(Date.now() + (fatToLose / 2.0) * 7 * 86400000).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. ACE Categorization Table */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3>American Council on Exercise (ACE) Body Fat Categorization</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-3">Description</th>
                <th className="py-3 px-3 font-mono text-purple-700 dark:text-purple-400">Women (% Fat)</th>
                <th className="py-3 px-3 font-mono text-blue-700 dark:text-blue-400">Men (% Fat)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {aceTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className={`py-2.5 px-3 font-bold ${row.color}`}>{row.description}</td>
                  <td className="py-2.5 px-3 font-mono">{row.women}</td>
                  <td className="py-2.5 px-3 font-mono">{row.men}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Jackson & Pollock Ideal Body Fat Table */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Table className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3>Jackson &amp; Pollock Ideal Body Fat Percentages by Age</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Age Bracket</th>
                <th className="py-2.5 px-3 font-mono text-purple-700 dark:text-purple-400">Women Ideal BFP</th>
                <th className="py-2.5 px-3 font-mono text-blue-700 dark:text-blue-400">Men Ideal BFP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {jacksonPollockTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2 px-3 font-semibold text-zinc-900 dark:text-zinc-100">Age {row.age}</td>
                  <td className="py-2 px-3 font-mono text-purple-700 dark:text-purple-400">{row.women}</td>
                  <td className="py-2 px-3 font-mono text-blue-700 dark:text-blue-400">{row.men}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
