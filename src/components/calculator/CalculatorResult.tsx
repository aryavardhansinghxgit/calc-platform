"use client";

import React from "react";
import { CalculatorDefinition, CalculationResult } from "@/lib/calculator-engine/types";
import { ResultCard } from "./ResultCard";
import { Sparkles, PieChart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export interface CalculatorResultProps {
  definition: Omit<CalculatorDefinition, "calculate">;
  result: CalculationResult;
}


export function CalculatorResult({ definition, result }: CalculatorResultProps) {
  if (!result.success) {
    return (
      <Card className="bg-rose-950/20 border-rose-900/40 p-6">
        <p className="text-xs text-rose-400 font-mono">Calculation Error: {result.error}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/90 border-slate-800/80 rounded-[12px] p-6 space-y-6">
        <CardHeader className="p-0 pb-2 border-b border-slate-800 flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-sky-400" /> Calculation Summary
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Live calculated outputs for {definition.title}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {definition.outputs.map((outDef) => {
            const formattedVal = result.formatted[outDef.name] || "0";
            return (
              <ResultCard
                key={outDef.name}
                label={outDef.label}
                value={formattedVal}
                description={outDef.description}
                highlight={outDef.highlight}
                unit={outDef.unit}
                className={outDef.highlight ? "sm:col-span-2" : ""}
              />
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

export default CalculatorResult;
