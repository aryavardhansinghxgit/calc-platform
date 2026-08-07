"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, BarChart2, Table, BookOpen, HelpCircle, Calculator as CalcIcon } from "lucide-react";
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

// Lazy load heavy chart components
const MortgagePieChart = dynamic(() => import("./charts/MortgagePieChart").then((m) => m.MortgagePieChart), {
  ssr: false,
  loading: () => <div className="h-40 flex items-center justify-center text-xs text-zinc-400 font-mono">Loading chart...</div>,
});
const BalanceLineChart = dynamic(() => import("./charts/BalanceLineChart").then((m) => m.BalanceLineChart), {
  ssr: false,
  loading: () => <div className="h-40 flex items-center justify-center text-xs text-zinc-400 font-mono">Loading line chart...</div>,
});
const AmortizationAreaChart = dynamic(() => import("./charts/AmortizationAreaChart").then((m) => m.AmortizationAreaChart), {
  ssr: false,
  loading: () => <div className="h-40 flex items-center justify-center text-xs text-zinc-400 font-mono">Loading area chart...</div>,
});

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
    <div className="space-y-3 max-w-5xl mx-auto py-1">
      {/* 1. Accessible Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
        <Link
          href="/"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 rounded px-1"
        >
          Home
        </Link>
        <ChevronRight className="h-3 w-3 text-zinc-300 dark:text-zinc-600" />
        <Link
          href={`/category/${definition.category.toLowerCase()}`}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 rounded px-1"
        >
          {definition.category}
        </Link>
        <ChevronRight className="h-3 w-3 text-zinc-300 dark:text-zinc-600" />
        <span className="font-medium text-zinc-800 dark:text-zinc-200 truncate">{definition.title}</span>
      </nav>

      {/* 2. Compact Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            {definition.title}
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 max-w-2xl leading-normal">
            {definition.description}
          </p>
        </div>
      </div>

      {/* 3. Main Desktop 2-Column Grid: Inputs (5) | Results & Summary Cards (7) */}
      <CalculatorErrorBoundary fallbackTitle={`${definition.title} Error`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left: Inputs Container */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Calculator Inputs
            </h2>
            <CalculatorForm
              definition={definition}
              values={inputs}
              onChange={handleInputChange}
            />
          </div>

          {/* Right: Primary Result + Key Metrics Summary */}
          <div className="lg:col-span-7 space-y-3">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Calculation Summary
              </h2>
              <CalculatorResult
                definition={definition}
                result={calculationResult}
              />
            </div>

            {/* Collapsible Compact Visualizer Chart */}
            {(CustomChart || (isMortgage && calculationResult.data)) && (
              <details className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden group">
                <summary className="px-3.5 py-2 text-xs font-bold text-zinc-800 dark:text-zinc-200 select-none cursor-pointer flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors">
                  <span className="flex items-center gap-1.5">
                    <BarChart2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> Payment Visualizer & Chart
                  </span>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 group-open:hidden font-mono">Expand +</span>
                  <span className="text-[10px] text-zinc-400 hidden group-open:inline font-mono">Collapse -</span>
                </summary>
                <div className="px-3.5 pb-3 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                  {CustomChart && calculationResult.data ? (
                    <CustomChart data={calculationResult.data} inputs={inputs} />
                  ) : (
                    <MortgagePieChart
                      principalAndInterest={Number(calculationResult.data.monthlyPrincipalAndInterest || 0)}
                      propertyTax={Number(calculationResult.data.monthlyPropertyTax || 0)}
                      insurance={Number(calculationResult.data.monthlyInsurance || 0)}
                      hoa={Number(calculationResult.data.hoaFeeMonthly || 0)}
                      extraPayment={Number(inputs.extraMonthlyPayment || 0)}
                    />
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      </CalculatorErrorBoundary>

      {/* 4. Collapsible Accordions (Closed by default to minimize scrolling) */}
      <div className="space-y-2 pt-1">
        {/* Charts: Balance over time */}
        {isMortgage && amortizationSchedule.length > 0 && (
          <details className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden group">
            <summary className="px-4 py-2.5 text-xs font-bold text-zinc-900 dark:text-zinc-200 select-none cursor-pointer flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors">
              <span className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Amortization Charts (Balance & Interest)
              </span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 group-open:hidden font-mono">Expand +</span>
              <span className="text-[10px] text-zinc-400 hidden group-open:inline font-mono">Collapse -</span>
            </summary>
            <div className="px-4 pb-4 pt-2 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-4">
              <BalanceLineChart schedule={amortizationSchedule} />
              <AmortizationAreaChart schedule={amortizationSchedule} />
            </div>
          </details>
        )}

        {/* Amortization Table */}
        {isMortgage && amortizationSchedule.length > 0 && (
          <details className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden group">
            <summary className="px-4 py-2.5 text-xs font-bold text-zinc-900 dark:text-zinc-200 select-none cursor-pointer flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors">
              <span className="flex items-center gap-2">
                <Table className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Amortization Schedule ({amortizationSchedule.length} payments)
              </span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 group-open:hidden font-mono">Expand +</span>
              <span className="text-[10px] text-zinc-400 hidden group-open:inline font-mono">Collapse -</span>
            </summary>
            <div className="px-4 pb-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <AmortizationTable schedule={amortizationSchedule} />
            </div>
          </details>
        )}

        {/* Formula */}
        {definition.formulaDescription && (
          <details className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden group">
            <summary className="px-4 py-2.5 text-xs font-bold text-zinc-900 dark:text-zinc-200 select-none cursor-pointer flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors">
              <span className="flex items-center gap-2">
                <CalcIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Formula & Calculation Method
              </span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 group-open:hidden font-mono">Expand +</span>
              <span className="text-[10px] text-zinc-400 hidden group-open:inline font-mono">Collapse -</span>
            </summary>
            <div className="px-4 pb-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <FormulaSection
                formula={definition.formulaDescription}
                explanation={`How ${definition.title} calculations work.`}
              />
            </div>
          </details>
        )}

        {/* Educational Content */}
        {CustomContent && (
          <details className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden group">
            <summary className="px-4 py-2.5 text-xs font-bold text-zinc-900 dark:text-zinc-200 select-none cursor-pointer flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors">
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" /> How {definition.title} Works — Guide & Examples
              </span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 group-open:hidden font-mono">Expand +</span>
              <span className="text-[10px] text-zinc-400 hidden group-open:inline font-mono">Collapse -</span>
            </summary>
            <div className="px-4 pb-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <CustomContent />
            </div>
          </details>
        )}

        {/* FAQs */}
        {definition.faqs && definition.faqs.length > 0 && (
          <details className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden group">
            <summary className="px-4 py-2.5 text-xs font-bold text-zinc-900 dark:text-zinc-200 select-none cursor-pointer flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors">
              <span className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Frequently Asked Questions (FAQ)
              </span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 group-open:hidden font-mono">Expand +</span>
              <span className="text-[10px] text-zinc-400 hidden group-open:inline font-mono">Collapse -</span>
            </summary>
            <div className="px-4 pb-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <FAQSection faqs={definition.faqs} />
            </div>
          </details>
        )}

        {/* Related Calculators */}
        <details className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden group">
          <summary className="px-4 py-2.5 text-xs font-bold text-zinc-900 dark:text-zinc-200 select-none cursor-pointer flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors">
            <span className="flex items-center gap-2">
              <CalcIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Related Calculators
            </span>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 group-open:hidden font-mono">Expand +</span>
            <span className="text-[10px] text-zinc-400 hidden group-open:inline font-mono">Collapse -</span>
          </summary>
          <div className="px-4 pb-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <RelatedCalculators currentId={definition.id} category={definition.category} />
          </div>
        </details>
      </div>
    </div>
  );
}

export default CalculatorLayout;
