"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, Trash2, CheckCircle2 } from "lucide-react";
import { SavedRefinanceCalculation } from "@/modules/refinance/types";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

export interface RefinanceScenarioComparerProps {
  scenarios: SavedRefinanceCalculation[];
  onDelete: (id: string) => void;
}

export function RefinanceScenarioComparer({ scenarios, onDelete }: RefinanceScenarioComparerProps) {
  if (!scenarios || scenarios.length === 0) return null;

  return (
    <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
      <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <div>
              <CardTitle className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Refinance Option Comparison Matrix
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500">
                Side-by-side comparison of your saved refinance scenarios
              </CardDescription>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
            {scenarios.length} Saved Scenarios
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {scenarios.map((sc, idx) => (
            <div
              key={sc.id}
              className="w-64 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-3 relative"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 pb-2">
                <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 truncate max-w-[150px]">
                  Option {idx + 1}: {sc.name}
                </span>
                <button
                  type="button"
                  onClick={() => onDelete(sc.id)}
                  className="text-zinc-400 hover:text-red-500"
                  title="Delete scenario"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-zinc-500 text-[11px]">Score:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {sc.refinanceScore ?? 80}/100 ({sc.refinanceRating ?? "Good"})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 text-[11px]">Monthly Savings:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(sc.monthlySavings)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 text-[11px]">Net Savings:</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">
                    {formatCurrency(sc.netSavings)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 text-[11px]">Break-Even:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">
                    {sc.breakEvenMonths} mos
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 text-[10px] text-zinc-400">
                Saved on {sc.dateSaved}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RefinanceScenarioComparer;
