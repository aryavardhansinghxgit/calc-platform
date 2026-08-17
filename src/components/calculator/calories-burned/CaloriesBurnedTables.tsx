"use client";

import React, { useState } from "react";
import { Table, Search, Flame, Utensils, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ACTIVITIES_DATABASE, CaloriesBurnedResult } from "@/lib/formulas/caloriesBurned";

interface CaloriesBurnedTablesProps {
  result: CaloriesBurnedResult;
}

export function CaloriesBurnedTables({ result }: CaloriesBurnedTablesProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredActivities = ACTIVITIES_DATABASE.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const weightMatrix = [
    { activity: "Walking (3.0 mph / 4.8 km/h)", met: 3.5, w125: "199 kcal", w155: "246 kcal", w185: "294 kcal", w215: "342 kcal" },
    { activity: "Running (6.0 mph / 9.6 km/h)", met: 9.8, w125: "556 kcal", w155: "689 kcal", w185: "823 kcal", w215: "956 kcal" },
    { activity: "Cycling: Moderate (13 mph)", met: 8.0, w125: "454 kcal", w155: "562 kcal", w185: "671 kcal", w215: "780 kcal" },
    { activity: "Swimming: Freestyle Moderate", met: 5.8, w125: "329 kcal", w155: "408 kcal", w185: "487 kcal", w215: "566 kcal" },
    { activity: "HIIT / Circuit Training", met: 8.0, w125: "454 kcal", w155: "562 kcal", w185: "671 kcal", w215: "780 kcal" },
    { activity: "Basketball: Game Play", met: 8.0, w125: "454 kcal", w155: "562 kcal", w185: "671 kcal", w215: "780 kcal" },
  ];

  return (
    <div className="space-y-8 mt-8">
      {/* 1. Food Portion Energy Equivalents */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Utensils className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3>Equivalent Food Portion Energy Burned</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
            <span className="text-2xl block">🍕</span>
            <strong className="text-base font-black text-amber-600 dark:text-amber-400 block">
              {result.foodEquivalents.pizzaSlices} Slices
            </strong>
            <span className="text-[10px] text-zinc-400 block">Pepperoni Pizza (~280 kcal/slice)</span>
          </div>

          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
            <span className="text-2xl block">🍌</span>
            <strong className="text-base font-black text-amber-600 dark:text-amber-400 block">
              {result.foodEquivalents.bananas} Bananas
            </strong>
            <span className="text-[10px] text-zinc-400 block">Medium Banana (~105 kcal)</span>
          </div>

          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
            <span className="text-2xl block">🍎</span>
            <strong className="text-base font-black text-amber-600 dark:text-amber-400 block">
              {result.foodEquivalents.apples} Apples
            </strong>
            <span className="text-[10px] text-zinc-400 block">Medium Apple (~95 kcal)</span>
          </div>

          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
            <span className="text-2xl block">🍔</span>
            <strong className="text-base font-black text-amber-600 dark:text-amber-400 block">
              {result.foodEquivalents.cheeseburgers} Burgers
            </strong>
            <span className="text-[10px] text-zinc-400 block">Cheeseburger (~300 kcal)</span>
          </div>
        </div>
      </section>

      {/* 2. Activity Calorie Burn by Body Weight Matrix */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3>1-Hour Calorie Burn Matrix by Body Weight</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Activity</th>
                <th className="py-2.5 px-3 font-sans tabular-nums">MET</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-zinc-600 dark:text-zinc-400">125 lbs (57 kg)</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">155 lbs (70 kg)</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-purple-700 dark:text-purple-400">185 lbs (84 kg)</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-amber-700 dark:text-amber-400">215 lbs (98 kg)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {weightMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2.5 px-3 font-bold text-zinc-900 dark:text-zinc-100">{row.activity}</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums font-bold text-amber-600 dark:text-amber-400">{row.met}</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums text-zinc-600 dark:text-zinc-400">{row.w125}</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">{row.w155}</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums text-purple-700 dark:text-purple-400">{row.w185}</td>
                  <td className="py-2.5 px-3 font-sans tabular-nums text-amber-700 dark:text-amber-400">{row.w215}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Searchable 50+ MET Database Matrix */}
      <section className="p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
            <Table className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3>Complete MET Activity Database (50+ Activities)</h3>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-400" />
            <Input
              type="text"
              placeholder="Search exercise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 text-xs h-9"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800 max-h-96 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800 sticky top-0">
              <tr>
                <th className="py-2.5 px-3">Activity Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-amber-700 dark:text-amber-400">MET Value</th>
                <th className="py-2.5 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">1-Hr Burn (160 lbs / 72.5 kg)</th>
                <th className="py-2.5 px-3 text-zinc-500">Exercise Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {filteredActivities.map((act) => {
                const hrBurn = Math.round((60 * act.met * 72.5) / 200);
                return (
                  <tr key={act.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="py-2 px-3 font-bold text-zinc-900 dark:text-zinc-100">{act.name}</td>
                    <td className="py-2 px-3">{act.category}</td>
                    <td className="py-2 px-3 font-sans tabular-nums font-bold text-amber-600 dark:text-amber-400">{act.met}</td>
                    <td className="py-2 px-3 font-sans tabular-nums text-blue-700 dark:text-blue-400">{hrBurn} kcal</td>
                    <td className="py-2 px-3 text-zinc-500">{act.description}</td>
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
