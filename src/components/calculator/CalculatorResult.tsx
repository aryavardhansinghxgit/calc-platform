"use client";

import React from "react";
import { CalculatorDefinition, CalculationResult } from "@/lib/calculator-engine/types";
import { ResultCard } from "./ResultCard";

export interface CalculatorResultProps {
  definition: Omit<CalculatorDefinition, "calculate">;
  result: CalculationResult;
}

export function CalculatorResult({ definition, result }: CalculatorResultProps) {
  if (!result.success) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 px-4 py-3">
        <p className="text-xs text-red-600 dark:text-red-400 font-mono">Calculation Error: {result.error}</p>
      </div>
    );
  }

  // Separate highlight (primary) outputs from secondary ones
  const highlightOutputs = definition.outputs.filter((o) => o.highlight);
  const secondaryOutputs = definition.outputs.filter((o) => !o.highlight);

  return (
    <div className="space-y-2">
      {/* Primary highlighted metrics — full width */}
      {highlightOutputs.map((outDef) => (
        <ResultCard
          key={outDef.name}
          label={outDef.label}
          value={result.formatted[outDef.name] || "0"}
          description={outDef.description}
          highlight
          unit={outDef.unit}
        />
      ))}

      {/* Secondary metrics — compact grid */}
      {secondaryOutputs.length > 0 && (
        <div className="grid min-w-0 grid-cols-1 sm:grid-cols-2 gap-2">
          {secondaryOutputs.map((outDef) => (
            <ResultCard
              key={outDef.name}
              label={outDef.label}
              value={result.formatted[outDef.name] || "0"}
              description={outDef.description}
              unit={outDef.unit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CalculatorResult;
