"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, HelpCircle } from "lucide-react";
import { CalculatorDefinition, CalculationResult } from "@/lib/calculator-engine/types";
import { CalculatorEngine } from "@/lib/calculator-engine/engine";
import { CalculatorForm } from "./CalculatorForm";
import { CalculatorResult } from "./CalculatorResult";
import { FormulaSection } from "./FormulaSection";
import { FAQSection } from "./FAQSection";
import { RelatedCalculators } from "./RelatedCalculators";
import { ChartCard, ChartSegment } from "./results/ChartCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface CalculatorLayoutProps {
  definition: Omit<CalculatorDefinition, "calculate">;
  children?: React.ReactNode;
}

export function CalculatorLayout({ definition }: CalculatorLayoutProps) {
  // Initialize form state from definition defaultValues
  const initialInputs = useMemo(() => {
    const defaults: Record<string, any> = {};
    definition.inputs.forEach((input) => {
      defaults[input.name] = input.defaultValue;
    });
    return defaults;
  }, [definition]);

  const [inputs, setInputs] = useState<Record<string, any>>(initialInputs);

  const handleInputChange = (key: string, value: any) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Run calculation engine dynamically
  const calculationResult: CalculationResult = useMemo(() => {
    return CalculatorEngine.run(definition.id, inputs);
  }, [definition.id, inputs]);

  // Construct chart segments dynamically from calculationResult
  const chartSegments: ChartSegment[] = useMemo(() => {
    if (!calculationResult.success || !calculationResult.data) return [];

    const data = calculationResult.data;
    const colors = ["#38bdf8", "#34d399", "#f59e0b", "#a855f7", "#f43f5e"];
    const segments: ChartSegment[] = [];

    let colorIdx = 0;
    definition.outputs.forEach((out) => {
      const numVal = Number(data[out.name]);
      if (!out.highlight && !isNaN(numVal) && numVal > 0) {
        segments.push({
          label: out.label,
          value: numVal,
          color: colors[colorIdx % colors.length],
          formattedValue: calculationResult.formatted[out.name],
        });
        colorIdx++;
      }
    });

    return segments;
  }, [calculationResult, definition.outputs]);

  return (
    <div className="space-y-10 max-w-5xl mx-auto py-2">
      {/* 1. Header & Navigation Breadcrumb */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700"
          >
            <ArrowLeft className="h-4 w-4" /> All Calculators
          </Link>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sparkles className="h-3.5 w-3.5" /> {definition.category} Tool
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-2 border-b border-slate-800/80 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {definition.title}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
            {definition.description}
          </p>
        </div>
      </div>

      {/* 2 & 3. Calculator Form & Results Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form */}
        <div className="lg:col-span-6">
          <CalculatorForm
            definition={definition}
            values={inputs}
            onChange={handleInputChange}
          />
        </div>

        {/* Right: Results Display & Visual Chart */}
        <div className="lg:col-span-6 space-y-6">
          <CalculatorResult
            definition={definition}
            result={calculationResult}
          />

          {chartSegments.length > 0 && (
            <ChartCard
              title="Breakdown & Distribution"
              segments={chartSegments}
              centerLabel={definition.title.split(" ")[0]}
            />
          )}
        </div>
      </div>

      {/* 4. How it Works / Formula Explanation */}
      {definition.formulaDescription && (
        <FormulaSection
          formula={definition.formulaDescription}
          explanation={`Detailed mathematical calculation formula applied in ${definition.title}.`}
        />
      )}

      {/* 5. FAQs */}
      <FAQSection faqs={definition.faqs} />

      {/* 6. Related Calculators */}
      <RelatedCalculators currentId={definition.id} category={definition.category} />
    </div>
  );
}

export default CalculatorLayout;
