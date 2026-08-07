"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import { CalculatorModuleDefinition } from "@/calculators";
import { CalculationResult } from "@/lib/calculator-engine/types";
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
  definition: Omit<CalculatorModuleDefinition, "calculate">;
  children?: React.ReactNode;
}

export function CalculatorLayout({ definition }: CalculatorLayoutProps) {
  const initialInputs = useMemo(() => {
    const defaults: Record<string, any> = {};
    definition.inputs.forEach((input) => {
      defaults[input.name] = input.defaultValue;
    });
    return defaults;
  }, [definition]);

  const [inputs, setInputs] = useState<Record<string, any>>(initialInputs);

  const handleInputChange = (key: string, value: any) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

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
  const CustomContent = definition.ContentComponent || (isMortgage ? MortgageContentSection : null);
  const CustomChart = definition.ChartComponent;

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* 1. Compact Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
          aria-label="Back to all calculators"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All
        </Link>
        <span className="text-zinc-300 dark:text-zinc-600">/</span>
        <Link
          href={`/category/${definition.category.toLowerCase()}`}
          className="text-xs text-zinc-500 hover:text-blue-600 transition-colors"
        >
          {definition.category}
        </Link>
      </div>

      {/* 2. Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {definition.title}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 max-w-2xl">
          {definition.description}
        </p>
      </div>

      {/* 3. Main Grid: Inputs (5) | Results (7) */}
      <CalculatorErrorBoundary fallbackTitle={`${definition.title} Error`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Inputs */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
            <CalculatorForm
              definition={definition}
              values={inputs}
              onChange={handleInputChange}
            />
          </div>

          {/* Right: Results + Pie Chart */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
              <CalculatorResult
                definition={definition}
                result={calculationResult}
              />
            </div>

            {CustomChart && calculationResult.data && (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3">
                <CustomChart data={calculationResult.data} inputs={inputs} />
              </div>
            )}

            {!CustomChart && isMortgage && calculationResult.data && (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3">
                <MortgagePieChart
                  principalAndInterest={Number(calculationResult.data.monthlyPrincipalAndInterest || 0)}
                  propertyTax={Number(calculationResult.data.monthlyPropertyTax || 0)}
                  insurance={Number(calculationResult.data.monthlyInsurance || 0)}
                  hoa={Number(calculationResult.data.hoaFeeMonthly || 0)}
                  extraPayment={Number(inputs.extraMonthlyPayment || 0)}
                />
              </div>
            )}
          </div>
        </div>
      </CalculatorErrorBoundary>

      {/* 4. Collapsible Sections */}
      <div className="space-y-2">
        {/* Charts */}
        {isMortgage && amortizationSchedule.length > 0 && (
          <details className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <summary className="px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-200 select-none cursor-pointer">
              Charts — Balance Over Time & Principal vs Interest
            </summary>
            <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <BalanceLineChart schedule={amortizationSchedule} />
              <AmortizationAreaChart schedule={amortizationSchedule} />
            </div>
          </details>
        )}

        {/* Amortization Table */}
        {isMortgage && amortizationSchedule.length > 0 && (
          <details className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <summary className="px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-200 select-none cursor-pointer">
              Amortization Schedule ({amortizationSchedule.length} payments)
            </summary>
            <div className="px-4 pb-4">
              <AmortizationTable schedule={amortizationSchedule} />
            </div>
          </details>
        )}

        {/* Formula */}
        {definition.formulaDescription && (
          <details className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <summary className="px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-200 select-none cursor-pointer">
              Formula & Calculation Method
            </summary>
            <div className="px-4 pb-4">
              <FormulaSection
                formula={definition.formulaDescription}
                explanation={`How ${definition.title} calculations work.`}
              />
            </div>
          </details>
        )}

        {/* Educational Content */}
        {CustomContent && (
          <details className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <summary className="px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-200 select-none cursor-pointer">
              How {definition.title} Works — Guide & Examples
            </summary>
            <div className="px-4 pb-4">
              <CustomContent />
            </div>
          </details>
        )}

        {/* FAQs */}
        {definition.faqs && definition.faqs.length > 0 && (
          <details className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <summary className="px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-200 select-none cursor-pointer">
              Frequently Asked Questions
            </summary>
            <div className="px-4 pb-4">
              <FAQSection faqs={definition.faqs} />
            </div>
          </details>
        )}

        {/* Related Calculators */}
        <details className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl" open>
          <summary className="px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-200 select-none cursor-pointer">
            Related Calculators
          </summary>
          <div className="px-4 pb-4">
            <RelatedCalculators currentId={definition.id} category={definition.category} />
          </div>
        </details>
      </div>
    </div>
  );
}

export default CalculatorLayout;
