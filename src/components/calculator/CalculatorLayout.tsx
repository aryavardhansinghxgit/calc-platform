"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { CalculatorDefinition, CalculationResult } from "@/lib/calculator-engine/types";
import { CalculatorEngine } from "@/lib/calculator-engine/engine";
import { CalculatorForm } from "./CalculatorForm";
import { CalculatorResult } from "./CalculatorResult";
import { FormulaSection } from "./FormulaSection";
import { FAQSection } from "./FAQSection";
import { RelatedCalculators } from "./RelatedCalculators";
import { AmortizationTable } from "./mortgage/AmortizationTable";
import { MortgageContentSection } from "./mortgage/MortgageContentSection";
import { AmortizationRow } from "@/lib/calculator-engine/formulas/mortgage";
import { CalculatorErrorBoundary } from "./CalculatorErrorBoundary";

const MortgagePieChart = dynamic(() => import("./charts/MortgagePieChart").then((m) => m.MortgagePieChart), { ssr: false });
const BalanceLineChart = dynamic(() => import("./charts/BalanceLineChart").then((m) => m.BalanceLineChart), { ssr: false });
const AmortizationAreaChart = dynamic(() => import("./charts/AmortizationAreaChart").then((m) => m.AmortizationAreaChart), { ssr: false });



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

  const amortizationSchedule: AmortizationRow[] = useMemo(() => {
    if (calculationResult.success && calculationResult.data?.amortizationSchedule) {
      return calculationResult.data.amortizationSchedule;
    }
    return [];
  }, [calculationResult]);

  const isMortgage = definition.id.toLowerCase().includes("mortgage");

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
          <Link
            href={`/category/${definition.category.toLowerCase()}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 hover:border-sky-500/40 hover:bg-sky-500/20 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" /> {definition.category} Tool
          </Link>
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

      {/* 3. Grid: Left Inputs, Right Outputs */}
      <CalculatorErrorBoundary fallbackTitle={`${definition.title} Error`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Input Form */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-soft">
            <CalculatorForm
              definition={definition}
              values={inputs}
              onChange={handleInputChange}
            />
          </div>

          {/* Right: Results Display & Pie Chart */}
          <div className="lg:col-span-6 space-y-6">
            <CalculatorResult
              definition={definition}
              result={calculationResult}
            />

            {isMortgage && calculationResult.data && (
              <MortgagePieChart
                principalAndInterest={Number(calculationResult.data.monthlyPrincipalAndInterest || 0)}
                propertyTax={Number(calculationResult.data.monthlyPropertyTax || 0)}
                insurance={Number(calculationResult.data.monthlyInsurance || 0)}
                hoa={Number(calculationResult.data.hoaFeeMonthly || 0)}
                extraPayment={Number(inputs.extraMonthlyPayment || 0)}
              />
            )}
          </div>
        </div>
      </CalculatorErrorBoundary>

      {/* 4. Advanced Recharts Visual Analytics (Line & Area Charts) */}
      {isMortgage && amortizationSchedule.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BalanceLineChart schedule={amortizationSchedule} />
          <AmortizationAreaChart schedule={amortizationSchedule} />
        </div>
      )}

      {/* 5. Month-by-Month Amortization Table */}
      {isMortgage && amortizationSchedule.length > 0 && (
        <AmortizationTable schedule={amortizationSchedule} />
      )}

      {/* 6. Formula Explanation */}
      {definition.formulaDescription && (
        <FormulaSection
          formula={definition.formulaDescription}
          explanation={`Detailed mathematical calculation formula applied in ${definition.title}.`}
        />
      )}

      {/* 7. Educational Content Section */}
      {isMortgage && <MortgageContentSection />}

      {/* 8. FAQs */}
      <FAQSection faqs={definition.faqs} />

      {/* 9. Related Calculators */}
      <RelatedCalculators currentId={definition.id} category={definition.category} />
    </div>
  );
}

export default CalculatorLayout;
