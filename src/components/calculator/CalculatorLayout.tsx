"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, BarChart2, Table, BookOpen, HelpCircle, Calculator as CalcIcon, Search, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { CalculatorModuleDefinition, getCalculatorsByCategory, searchCalculators } from "@/calculators";
import { CalculationResult } from "@/lib/calculator-engine/types";
import { CalculatorEngine } from "@/lib/calculator-engine/engine";
import { CalculatorForm } from "./CalculatorForm";
import { CalculatorResult } from "./CalculatorResult";
import { FormulaSection } from "./FormulaSection";
import { FAQSection } from "./FAQSection";
import { RelatedCalculators } from "./RelatedCalculators";
import { AmortizationTable } from "./mortgage/AmortizationTable";
import { MortgageContentSection } from "./mortgage/MortgageContentSection";
import { MortgageCalculator } from "./mortgage/MortgageCalculator";
import { AmortizationCalculator } from "./amortization/AmortizationCalculator";
import { LoanCalculator } from "./loan/LoanCalculator";
import { EmiCalculator } from "./emi/EmiCalculator";
import { HouseAffordabilityCalculator } from "./house-affordability/HouseAffordabilityCalculator";
import { AmortizationRow } from "@/lib/calculator-engine/formulas/mortgage";
import { CalculatorErrorBoundary } from "./CalculatorErrorBoundary";
import { Input } from "@/components/ui/input";

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
  const [sidebarQuery, setSidebarQuery] = useState("");

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

  const categoryCalculators = useMemo(() => {
    return getCalculatorsByCategory(definition.category);
  }, [definition.category]);

  const filteredSidebarCalculators = useMemo(() => {
    if (!sidebarQuery.trim()) return categoryCalculators;
    return searchCalculators(sidebarQuery);
  }, [sidebarQuery, categoryCalculators]);

  const isMortgage = definition.id.toLowerCase().includes("mortgage");
  const isAmortization = definition.id.toLowerCase().includes("amortization");
  const isLoan = definition.id === "loan" || definition.slug === "loan-calculator";
  const isEmi = definition.id === "emi" || definition.slug === "emi-calculator";
  const isHouseAffordability = definition.id === "house-affordability" || definition.slug === "house-affordability-calculator";
  const CustomContent = definition.ContentComponent || (isMortgage ? MortgageContentSection : null);
  const CustomChart = definition.ChartComponent;

  return (
    <div className="space-y-3 max-w-7xl mx-auto py-1">
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

      {/* 2. Page Header & Quick Layout Grid (Col-8 Main | Col-4 Sidebar matching Screen 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Main Interactive Calculator Area (Col 8) */}
        <div className="lg:col-span-8 space-y-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              {definition.title}
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 max-w-2xl leading-normal">
              {definition.description}
            </p>
          </div>

          <CalculatorErrorBoundary fallbackTitle={`${definition.title} Error`}>
            {isHouseAffordability ? (
              <HouseAffordabilityCalculator />
            ) : isEmi ? (
              <EmiCalculator />
            ) : isLoan ? (
              <LoanCalculator />
            ) : isAmortization ? (
              <AmortizationCalculator />
            ) : isMortgage ? (
              <MortgageCalculator />
            ) : (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                  {/* Left: Inputs Panel */}
                  <div className="md:col-span-6 space-y-2 border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-800 pb-4 md:pb-0 md:pr-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center justify-between">
                      <span>Inputs</span>
                      <span className="text-[10px] font-normal text-zinc-400">Real-time</span>
                    </h2>
                    <CalculatorForm
                      definition={definition}
                      values={inputs}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Right: Results Panel */}
                  <div className="md:col-span-6 space-y-3">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Calculated Summary
                    </h2>
                    <CalculatorResult
                      definition={definition}
                      result={calculationResult}
                    />

                    {CustomChart && calculationResult.data && (
                      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <CustomChart data={calculationResult.data} inputs={inputs} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CalculatorErrorBoundary>

          {/* Collapsible Sections Below Main Calculator */}
          <div className="space-y-2 pt-1">

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

        {/* Right Sidebar: Quick Navigation & Search Index (Col 4 matching Screen 2, 3 & 5) */}
        <aside className="lg:col-span-4 space-y-4">
          {/* Quick Search Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Quick Search
            </h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <Input
                type="text"
                placeholder="Find calculator..."
                value={sidebarQuery}
                onChange={(e) => setSidebarQuery(e.target.value)}
                className="pl-8 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 h-8 text-xs rounded-lg"
              />
            </div>
          </div>

          {/* Category Quick Index Box */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                {definition.category} Calculators
              </h3>
              <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded">
                {filteredSidebarCalculators.length}
              </span>
            </div>

            <ul className="space-y-1 text-xs">
              {filteredSidebarCalculators.map((calc, idx) => {
                const isActive = calc.id === definition.id || calc.slug === definition.slug;
                return (
                  <li key={`${calc.id}-${calc.slug}-${idx}`}>
                    <Link
                      href={`/calculators/${calc.slug}`}
                      className={`flex items-center justify-between px-2 py-1.5 rounded-lg transition-colors group ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                      }`}
                    >
                      <span className="truncate">{calc.title}</span>
                      <ArrowRight className={`h-3 w-3 transition-transform ${isActive ? "text-blue-600" : "text-zinc-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"}`} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CalculatorLayout;
