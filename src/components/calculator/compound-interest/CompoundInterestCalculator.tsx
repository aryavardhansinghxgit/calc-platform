"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  Calculator as CalcIcon,
  ShieldCheck,
  DollarSign,
  PieChart as PieIcon,
  Clock,
  Sparkles,
  Printer,
  Share2,
  Bookmark,
  Award,
  AlertTriangle,
  Info,
  CheckCircle2,
  Sliders,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  ArrowRightLeft,
  ArrowRight,
  Gauge,
  Percent,
  Zap,
  BookOpen,
  HelpCircle,
  BarChart3,
  Layers,
  Repeat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  Cell,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  CompoundingFrequency,
  convertInterestRate,
  calculateAprVsApy,
  calculateCompoundingFrequencyComparison,
  calculateContinuousCompounding,
  calculateRuleOf72,
  calculateSimpleVsCompoundGrowth,
  generateAdvancedInsights,
  getFrequencyLabel,
} from "@/lib/calculator-engine/formulas/compound-interest";

export function CompoundInterestCalculator() {
  // ==========================================
  // SECTION 1: RATE CONVERSION CALCULATOR STATE
  // ==========================================
  const [inputRate, setInputRate] = useState<string>("6.0");
  const [sourceFrequency, setSourceFrequency] = useState<CompoundingFrequency>("monthly");
  const [targetFrequency, setTargetFrequency] = useState<CompoundingFrequency>("annual");
  const [showFormulaPanel, setShowFormulaPanel] = useState<boolean>(true);

  // ==========================================
  // SECTION 2: APR VS APY ANALYZER STATE
  // ==========================================
  const [aprAnalyzerInput, setAprAnalyzerInput] = useState<string>("6.0");
  const [aprAnalyzerFreq, setAprAnalyzerFreq] = useState<CompoundingFrequency>("monthly");

  // ==========================================
  // SECTION 3: COMPOUNDING FREQUENCY COMPARISON STATE
  // ==========================================
  const [freqCompPrincipal, setFreqCompPrincipal] = useState<number>(10000);
  const [freqCompRate, setFreqCompRate] = useState<number>(7.0);
  const [freqCompYears, setFreqCompYears] = useState<number>(10);

  // ==========================================
  // SECTION 4: CONTINUOUS COMPOUNDING STATE
  // ==========================================
  const [contPrincipal, setContPrincipal] = useState<number>(5000);
  const [contRate, setContRate] = useState<number>(6.5);
  const [contYears, setContYears] = useState<number>(5);

  // ==========================================
  // SECTION 5: RULE OF 72 STATE
  // ==========================================
  const [rule72Rate, setRule72Rate] = useState<number>(8.0);

  // ==========================================
  // SECTION 6: SIMPLE VS COMPOUND STATE
  // ==========================================
  const [simpleCompPrincipal, setSimpleCompPrincipal] = useState<number>(10000);
  const [simpleCompRate, setSimpleCompRate] = useState<number>(8.0);
  const [simpleCompYears, setSimpleCompYears] = useState<number>(20);

  // ==========================================
  // UI & EXPORT STATES
  // ==========================================
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [savedScenarios, setSavedScenarios] = useState<{ name: string; result: string; date: string }[]>([]);
  const [shareToast, setShareToast] = useState<boolean>(false);

  // Parse rate input safely
  const parsedRate = useMemo(() => {
    const num = parseFloat(inputRate);
    return isNaN(num) || num < 0 ? 0 : num;
  }, [inputRate]);

  // Execute primary rate conversion engine
  const conversionResult = useMemo(
    () =>
      convertInterestRate({
        inputRatePercent: parsedRate,
        sourceFrequency,
        targetFrequency,
      }),
    [parsedRate, sourceFrequency, targetFrequency]
  );

  // Execute APR vs APY Analysis
  const aprVsApyResult = useMemo(
    () => calculateAprVsApy(parseFloat(aprAnalyzerInput) || 0, aprAnalyzerFreq),
    [aprAnalyzerInput, aprAnalyzerFreq]
  );

  // Execute Compounding Frequency Comparison
  const freqCompResult = useMemo(
    () =>
      calculateCompoundingFrequencyComparison(freqCompPrincipal, freqCompRate, freqCompYears),
    [freqCompPrincipal, freqCompRate, freqCompYears]
  );

  // Execute Continuous Compounding
  const continuousResult = useMemo(
    () => calculateContinuousCompounding(contPrincipal, contRate, contYears),
    [contPrincipal, contRate, contYears]
  );

  // Execute Rule of 72
  const rule72Result = useMemo(
    () => calculateRuleOf72(rule72Rate),
    [rule72Rate]
  );

  // Execute Simple vs Compound Growth
  const simpleVsCompResult = useMemo(
    () => calculateSimpleVsCompoundGrowth(simpleCompPrincipal, simpleCompRate, simpleCompYears),
    [simpleCompPrincipal, simpleCompRate, simpleCompYears]
  );

  // Execute Advanced Insights
  const advancedInsights = useMemo(
    () => generateAdvancedInsights(freqCompPrincipal, parsedRate),
    [freqCompPrincipal, parsedRate]
  );

  // Build report data for ReportModal
  const reportData: CalculatorReportData = useMemo(
    () => ({
      meta: {
        calculatorName: "Compound Interest Calculator",
        reportTitle: "Compound Interest & Rate Conversion Executive Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
      },
      keyMetrics: [
        { label: "Converted Rate", value: `${conversionResult.convertedRatePercent.toFixed(5)}%`, colorTheme: "blue" },
        { label: "Effective Annual Rate (EAR)", value: `${conversionResult.earPercent.toFixed(4)}%`, colorTheme: "emerald" },
        { label: "Equivalent APY", value: `${conversionResult.equivalentApyPercent.toFixed(4)}%`, colorTheme: "purple" },
        { label: "Continuous Equivalent", value: `${conversionResult.continuousEquivalentPercent.toFixed(4)}%`, colorTheme: "amber" },
      ],
      sections: [
        {
          title: "Conversion Details",
          items: [
            { label: "Input Interest Rate", value: `${parsedRate}%` },
            { label: "Source Frequency", value: getFrequencyLabel(sourceFrequency) },
            { label: "Output Frequency", value: getFrequencyLabel(targetFrequency) },
            { label: "Rate Difference", value: `${conversionResult.rateDifferencePercent > 0 ? "+" : ""}${conversionResult.rateDifferencePercent.toFixed(5)}%` },
          ],
        },
        {
          title: "Rule of 72 & Doubling Analysis",
          items: [
            { label: "Annual Rate of Return", value: `${rule72Rate}%` },
            { label: "Rule of 72 Doubling Time", value: `${rule72Result.ruleOf72Years.toFixed(2)} Years` },
            { label: "Exact Doubling Time", value: `${rule72Result.exactYears.toFixed(2)} Years` },
          ],
        },
      ],
      table: {
        title: "Equivalent Rates Across All Frequencies",
        headers: [
          { key: "frequency", label: "Compounding Frequency" },
          { key: "equivalentRatePercent", label: "Equivalent Rate (%)" },
          { key: "effectiveYieldPercent", label: "Effective Yield (APY %)" },
          { key: "differenceVsAnnualPercent", label: "Diff vs Annual (%)" },
        ],
        rows: conversionResult.equivalentRatesTable as any,
      },
      notes: [
        conversionResult.insight,
        "Daily compounding earns higher yield than annual compounding, while continuous compounding represents the theoretical upper limit.",
      ],
    }),
    [conversionResult, parsedRate, sourceFrequency, targetFrequency, rule72Rate, rule72Result]
  );

  // Handlers
  const handleSwapFrequencies = () => {
    const temp = sourceFrequency;
    setSourceFrequency(targetFrequency);
    setTargetFrequency(temp);
  };

  const handleReset = () => {
    setInputRate("6.0");
    setSourceFrequency("monthly");
    setTargetFrequency("annual");
  };

  const handleSaveScenario = () => {
    const newSaved = [
      ...savedScenarios,
      {
        name: `${inputRate}% ${getFrequencyLabel(sourceFrequency)} → ${getFrequencyLabel(targetFrequency)}`,
        result: `${conversionResult.convertedRatePercent.toFixed(4)}%`,
        date: new Date().toLocaleDateString(),
      },
    ];
    setSavedScenarios(newSaved);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-2">
      {/* ==========================================
          SECTION 1: HERO HEADER & QUICK ACTIONS
         ========================================== */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
              <TrendingUp className="h-3.5 w-3.5" /> Rate Conversion & Compounding Engine
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-medium border border-emerald-400/30">
              <Zap className="h-3 w-3" /> Two-Way EAR Translation
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Compound Interest Calculator
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 mt-1 max-w-3xl leading-relaxed">
              Convert interest rates between different compounding frequencies (Daily, Monthly, Continuous, etc.), derive Effective Annual Rates (EAR/APY), compare simple vs compound growth, evaluate Rule of 72, and model continuous compounding.
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Multi-Frequency Rate Converter
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> APR vs APY Analyzer
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Continuous Compounding (A=Pe^rt)
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Rule of 72 Calculator
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border-white/10 gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Printable PDF Executive Report
            </Badge>
          </div>
        </div>
      </div>

      {/* ==========================================
          ACTION CONTROLS BAR
         ========================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300">
          <Sliders className="h-4 w-4 text-blue-600" /> Rate Conversion Suite
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveScenario}
            className="h-8 text-xs font-semibold gap-1.5"
          >
            <Bookmark className="h-3.5 w-3.5 text-indigo-500" /> Save Calculation
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="h-8 text-xs font-semibold gap-1.5"
          >
            <Share2 className="h-3.5 w-3.5 text-blue-500" /> Share Result
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsReportOpen(true)}
            className="h-8 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white gap-1.5"
          >
            <Printer className="h-3.5 w-3.5" /> Printable PDF Report
          </Button>
        </div>
      </div>

      {shareToast && (
        <div className="p-3 bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Link copied to clipboard!
        </div>
      )}

      {/* ==========================================
          MAIN RATE CONVERSION GRID (COL-8 | COL-4)
         ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: RATE CONVERSION INPUTS & FORMULAS (COL 7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* SECTION 1: RATE CONVERSION CALCULATOR CARD */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h2 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Repeat className="h-4 w-4 text-blue-600" /> 1. Rate Conversion Calculator
              </h2>
              <Badge variant="outline" className="text-[10px] font-mono text-blue-600 border-blue-200">
                Two-Way Conversion
              </Badge>
            </div>

            {/* Inputs Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Input Interest Rate (%)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.01"
                    value={inputRate}
                    onChange={(e) => setInputRate(e.target.value)}
                    className="h-10 text-sm font-mono bg-zinc-50 dark:bg-zinc-950 pr-8 border-zinc-200 dark:border-zinc-800"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-bold">%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Input Compounding Frequency
                  </label>
                  <select
                    value={sourceFrequency}
                    onChange={(e) => setSourceFrequency(e.target.value as CompoundingFrequency)}
                    className="w-full h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs px-3 font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="daily">Daily (365/yr)</option>
                    <option value="weekly">Weekly (52/yr)</option>
                    <option value="biweekly">Bi-Weekly (26/yr)</option>
                    <option value="monthly">Monthly (12/yr)</option>
                    <option value="quarterly">Quarterly (4/yr)</option>
                    <option value="semiannual">Semi-Annual (2/yr)</option>
                    <option value="annual">Annual (1/yr)</option>
                    <option value="continuous">Continuous</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Output Compounding Frequency
                  </label>
                  <select
                    value={targetFrequency}
                    onChange={(e) => setTargetFrequency(e.target.value as CompoundingFrequency)}
                    className="w-full h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs px-3 font-medium text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="daily">Daily (365/yr)</option>
                    <option value="weekly">Weekly (52/yr)</option>
                    <option value="biweekly">Bi-Weekly (26/yr)</option>
                    <option value="monthly">Monthly (12/yr)</option>
                    <option value="quarterly">Quarterly (4/yr)</option>
                    <option value="semiannual">Semi-Annual (2/yr)</option>
                    <option value="annual">Annual (1/yr)</option>
                    <option value="continuous">Continuous</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSwapFrequencies}
                  className="h-9 text-xs font-bold gap-1.5 border-blue-200 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  <ArrowRightLeft className="h-3.5 w-3.5" /> Swap Frequencies
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="h-9 text-xs font-semibold gap-1 text-zinc-600 dark:text-zinc-400"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </Button>
              </div>
            </div>
          </div>

          {/* DYNAMIC FORMULA DERIVATION PANEL */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
            <div
              className="flex items-center justify-between cursor-pointer select-none"
              onClick={() => setShowFormulaPanel(!showFormulaPanel)}
            >
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-600" /> Live Dynamic Derivation Formula Panel
              </h3>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                {showFormulaPanel ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>

            {showFormulaPanel && (
              <div className="space-y-3 pt-2 text-xs font-mono">
                {conversionResult.formulaDerivation.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-[11px]">
                      {step.title}
                    </span>
                    <div className="text-zinc-700 dark:text-zinc-300 font-semibold">{step.formula}</div>
                    <div className="text-zinc-500 dark:text-zinc-400">{step.substitution}</div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold">{step.result}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: PRIMARY RESULT DASHBOARD CARD (COL 5) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-4">
          <div className="bg-gradient-to-br from-zinc-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl border border-zinc-800 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-400">
                Converted Interest Rate Output
              </span>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 text-[10px]">
                Active Yield
              </Badge>
            </div>

            {/* Main Converted Output */}
            <div>
              <span className="text-xs text-zinc-400 block font-medium">
                Equivalent Rate ({getFrequencyLabel(targetFrequency)})
              </span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight font-mono mt-1">
                {conversionResult.convertedRatePercent.toFixed(5)}%
              </div>
              <p className="text-[11px] text-indigo-200/80 mt-1 font-sans">
                Converted from {parsedRate}% {getFrequencyLabel(sourceFrequency)}
              </p>
            </div>

            {/* Metric Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[11px] text-zinc-400 block">Effective Annual Rate (EAR)</span>
                <span className="text-base font-bold text-white font-mono">
                  {conversionResult.earPercent.toFixed(4)}%
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[11px] text-zinc-400 block">Equivalent APY</span>
                <span className="text-base font-bold text-white font-mono">
                  {conversionResult.equivalentApyPercent.toFixed(4)}%
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[11px] text-zinc-400 block">Equivalent Monthly APR</span>
                <span className="text-base font-bold text-white font-mono">
                  {conversionResult.equivalentAprPercent.toFixed(4)}%
                </span>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[11px] text-zinc-400 block">Continuous Equivalent</span>
                <span className="text-base font-bold text-white font-mono">
                  {conversionResult.continuousEquivalentPercent.toFixed(4)}%
                </span>
              </div>
            </div>

            {/* Insight Statement Box */}
            <div className="p-3 rounded-xl bg-indigo-900/40 border border-indigo-500/30 text-xs text-indigo-100 space-y-1">
              <span className="font-bold text-indigo-300 flex items-center gap-1 text-[11px]">
                <Info className="h-3.5 w-3.5 text-indigo-400" /> Conversion Insight
              </span>
              <p className="leading-relaxed text-[11px] opacity-90">{conversionResult.insight}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 2: EQUIVALENT RATE COMPARISON TABLE & CHART
         ========================================== */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div>
            <h2 className="text-base font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" /> Equivalent Rate Comparison Across All Frequencies
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Exact equivalent nominal rates required across 8 compounding frequencies to yield equal effective returns.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-950 font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="p-3">Compounding Frequency</th>
                <th className="p-3">Equivalent Rate (%)</th>
                <th className="p-3">Effective Annual Yield (APY %)</th>
                <th className="p-3">Difference vs Annual (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {conversionResult.equivalentRatesTable.map((row) => (
                <tr
                  key={row.frequencyKey}
                  className={`hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition-colors ${
                    row.frequencyKey === targetFrequency ? "bg-blue-50/60 dark:bg-blue-950/30 font-bold" : ""
                  }`}
                >
                  <td className="p-3 flex items-center gap-2">
                    {row.frequency}
                    {row.frequencyKey === targetFrequency && (
                      <Badge variant="secondary" className="text-[9px] bg-blue-600 text-white">
                        Selected Target
                      </Badge>
                    )}
                  </td>
                  <td className="p-3 font-mono text-zinc-900 dark:text-zinc-100">
                    {row.equivalentRatePercent.toFixed(5)}%
                  </td>
                  <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    {row.effectiveYieldPercent.toFixed(5)}%
                  </td>
                  <td className="p-3 font-mono text-zinc-600 dark:text-zinc-400">
                    {row.differenceVsAnnualPercent > 0 ? "+" : ""}
                    {row.differenceVsAnnualPercent.toFixed(5)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Effective Yield Recharts Bar Chart */}
        <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
            Effective Yield Comparison by Compounding Frequency
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionResult.equivalentRatesTable}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="frequency" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} domain={["dataMin - 0.1", "dataMax + 0.1"]} />
                <Tooltip
                  formatter={(val: any) => [`${Number(val || 0).toFixed(4)}%`, "Effective Yield"]}
                  contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", color: "#fff", fontSize: "12px" }}
                />
                <Bar dataKey="effectiveYieldPercent" radius={[4, 4, 0, 0]}>
                  {conversionResult.equivalentRatesTable.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.frequencyKey === "continuous"
                          ? "#10b981"
                          : entry.frequencyKey === "daily"
                          ? "#3b82f6"
                          : entry.frequencyKey === "annual"
                          ? "#6366f1"
                          : "#8b5cf6"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 3: APR VS APY ANALYZER MODULE
         ========================================== */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <h2 className="text-base font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Percent className="h-5 w-5 text-indigo-600" /> APR vs APY Analyzer Module
          </h2>
          <Badge variant="outline" className="text-[10px] text-indigo-600 border-indigo-200">
            Yield Incremental Gain
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Stated Annual Percentage Rate (APR %)
              </label>
              <Input
                type="number"
                step="0.1"
                value={aprAnalyzerInput}
                onChange={(e) => setAprAnalyzerInput(e.target.value)}
                className="h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Compounding Frequency
              </label>
              <select
                value={aprAnalyzerFreq}
                onChange={(e) => setAprAnalyzerFreq(e.target.value as CompoundingFrequency)}
                className="w-full h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs px-3 font-medium text-zinc-900 dark:text-zinc-100"
              >
                <option value="daily">Daily (365/yr)</option>
                <option value="monthly">Monthly (12/yr)</option>
                <option value="quarterly">Quarterly (4/yr)</option>
                <option value="semiannual">Semi-Annual (2/yr)</option>
                <option value="annual">Annual (1/yr)</option>
                <option value="continuous">Continuous</option>
              </select>
            </div>

            {/* Outputs Card */}
            <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-600 dark:text-zinc-400">Effective APY:</span>
                <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400 text-sm">
                  {aprVsApyResult.apyPercent.toFixed(4)}%
                </span>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-indigo-100 dark:border-indigo-900/40 pt-2">
                <span className="text-zinc-600 dark:text-zinc-400">Annual Gain on $10,000:</span>
                <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400 text-sm">
                  +${aprVsApyResult.interestGainPer10k.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-2">
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Visual Stated APR vs Compounded APY Gap
            </span>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aprVsApyResult.comparisonChart}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} domain={["dataMin - 0.2", "dataMax + 0.2"]} />
                  <Tooltip formatter={(val: any) => [`${Number(val || 0).toFixed(4)}%`, "Rate"]} />
                  <Bar dataKey="apy" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 4: COMPOUNDING FREQUENCY INVESTMENT GROWTH TOOL
         ========================================== */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <h2 className="text-base font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-600" /> Compounding Frequency Investment Growth Tool
          </h2>
          <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-200">
            {"A = P(1 + r/n)^(nt)"}
          </Badge>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Principal Deposit ($)
            </label>
            <Input
              type="number"
              value={freqCompPrincipal}
              onChange={(e) => setFreqCompPrincipal(Math.max(0, Number(e.target.value)))}
              className="h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Annual Interest Rate (%)
            </label>
            <Input
              type="number"
              step="0.1"
              value={freqCompRate}
              onChange={(e) => setFreqCompRate(Math.max(0, Number(e.target.value)))}
              className="h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Investment Horizon (Years)
            </label>
            <Input
              type="number"
              value={freqCompYears}
              onChange={(e) => setFreqCompYears(Math.max(1, Number(e.target.value)))}
              className="h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
            />
          </div>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-950 font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="p-3">Compounding Schedule</th>
                <th className="p-3">Future Value ($)</th>
                <th className="p-3">Total Interest Earned ($)</th>
                <th className="p-3">Effective Yield (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {freqCompResult.frequenciesData.map((row) => (
                <tr
                  key={row.frequencyKey}
                  className={`hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition-colors ${
                    row.frequencyKey === "continuous" ? "bg-emerald-50/60 dark:bg-emerald-950/30 font-bold" : ""
                  }`}
                >
                  <td className="p-3 flex items-center gap-2">
                    {row.frequency}
                    {row.frequencyKey === "continuous" && (
                      <Badge variant="secondary" className="text-[9px] bg-emerald-600 text-white">
                        Maximum Yield
                      </Badge>
                    )}
                  </td>
                  <td className="p-3 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                    ${row.futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    +${row.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 font-mono text-zinc-600 dark:text-zinc-400">
                    {row.effectiveYieldPercent.toFixed(4)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
          SECTION 5: CONTINUOUS COMPOUNDING CALCULATOR (A = Pe^rt)
         ========================================== */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <h2 className="text-base font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" /> Continuous Compounding Calculator {"(A = Pe^{rt})"}
          </h2>
          <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-200">
            Euler Constant e ≈ 2.71828
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-5 space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Principal ($)
                </label>
                <Input
                  type="number"
                  value={contPrincipal}
                  onChange={(e) => setContPrincipal(Math.max(0, Number(e.target.value)))}
                  className="h-8 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Annual Interest Rate (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={contRate}
                  onChange={(e) => setContRate(Math.max(0, Number(e.target.value)))}
                  className="h-8 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Years
                </label>
                <Input
                  type="number"
                  value={contYears}
                  onChange={(e) => setContYears(Math.max(1, Number(e.target.value)))}
                  className="h-8 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
                />
              </div>
            </div>

            {/* Continuous Output Box */}
            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 space-y-2">
              <span className="text-[11px] uppercase font-bold text-amber-800 dark:text-amber-400 tracking-wider">
                Continuous Compounding Output
              </span>
              <div className="text-2xl font-black text-amber-900 dark:text-amber-100 font-mono">
                ${continuousResult.futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-amber-700 dark:text-amber-300 flex justify-between pt-2 border-t border-amber-200/50 font-mono">
                <span>Interest Earned:</span>
                <span className="font-bold">+${continuousResult.totalInterestEarned.toLocaleString()}</span>
              </div>
              <div className="text-xs text-amber-700 dark:text-amber-300 flex justify-between font-mono">
                <span>Growth Multiplier:</span>
                <span className="font-bold">{continuousResult.growthMultiplier.toFixed(4)}x</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-2">
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Discrete Monthly vs Continuous Growth Curve
            </span>
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={continuousResult.growthCurve}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}`, "Value"]} />
                  <Legend />
                  <Line type="monotone" dataKey="discreteMonthlyValue" name="Monthly Discrete" stroke="#6366f1" strokeWidth={2} />
                  <Line type="monotone" dataKey="continuousValue" name="Continuous (Pe^rt)" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 6: RULE OF 72 & SIMPLE VS COMPOUND GRID
         ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* RULE OF 72 CALCULATOR (COL 5) */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h2 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Gauge className="h-4 w-4 text-purple-600" /> Rule of 72 Calculator
            </h2>
            <Badge variant="outline" className="text-[10px] text-purple-600 border-purple-200">
              Doubling Estimator
            </Badge>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Annual Rate of Return (%)
            </label>
            <Input
              type="number"
              step="0.1"
              value={rule72Rate}
              onChange={(e) => setRule72Rate(Math.max(0.1, Number(e.target.value)))}
              className="h-9 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
            />
          </div>

          <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-zinc-600 dark:text-zinc-400">Rule of 72 Estimate:</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400 text-sm">
                {rule72Result.ruleOf72Years.toFixed(2)} Years
              </span>
            </div>

            <div className="flex justify-between items-center border-t border-purple-100 dark:border-purple-900/40 pt-2">
              <span className="text-zinc-600 dark:text-zinc-400">Rule of 69.3 Estimate:</span>
              <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">
                {rule72Result.ruleOf693Years.toFixed(2)} Years
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-zinc-600 dark:text-zinc-400">Exact Doubling Time:</span>
              <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                {rule72Result.exactYears.toFixed(2)} Years
              </span>
            </div>

            <div className="flex justify-between items-center text-[11px] text-zinc-500">
              <span>Approximation Error:</span>
              <span>{rule72Result.errorPercent.toFixed(2)}%</span>
            </div>

            <p className="text-[11px] text-purple-700 dark:text-purple-300 pt-1 leading-relaxed">
              {rule72Result.note}
            </p>
          </div>
        </div>

        {/* SIMPLE VS COMPOUND INTEREST GROWTH (COL 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h2 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" /> Simple vs Compound Interest Growth
            </h2>
            <Badge variant="outline" className="text-[10px] text-blue-600 border-blue-200">
              Multi-Year Comparison
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Principal ($)
              </label>
              <Input
                type="number"
                value={simpleCompPrincipal}
                onChange={(e) => setSimpleCompPrincipal(Math.max(0, Number(e.target.value)))}
                className="h-8 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Rate (%)
              </label>
              <Input
                type="number"
                step="0.1"
                value={simpleCompRate}
                onChange={(e) => setSimpleCompRate(Math.max(0, Number(e.target.value)))}
                className="h-8 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Years
              </label>
              <Input
                type="number"
                value={simpleCompYears}
                onChange={(e) => setSimpleCompYears(Math.max(1, Number(e.target.value)))}
                className="h-8 text-xs font-mono bg-zinc-50 dark:bg-zinc-950"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-950 font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-2">Year</th>
                  <th className="p-2">Simple Value</th>
                  <th className="p-2">Compound Value</th>
                  <th className="p-2">Interest Bonus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-mono">
                {simpleVsCompResult.milestones.map((m) => (
                  <tr key={m.year} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                    <td className="p-2 font-bold">{m.year} Yrs</td>
                    <td className="p-2 text-zinc-600 dark:text-zinc-400">${m.simpleValue.toLocaleString()}</td>
                    <td className="p-2 font-bold text-zinc-900 dark:text-zinc-100">${m.compoundValue.toLocaleString()}</td>
                    <td className="p-2 text-emerald-600 dark:text-emerald-400 font-bold">+${m.interestDifference.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ==========================================
          SECTION 7: ADVANCED INSIGHTS & TAKEAWAYS
         ========================================== */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-indigo-950/30 dark:via-zinc-900 dark:to-blue-950/30 rounded-xl p-5 border border-indigo-100 dark:border-indigo-900/40 shadow-xs space-y-4">
        <h2 className="text-base font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-600" /> Advanced Financial Insights & Key Takeaways
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {advancedInsights.keyTakeaways.map((takeaway, index) => (
            <div key={index} className="p-3.5 rounded-lg bg-white dark:bg-zinc-900 border border-indigo-100 dark:border-indigo-900/50 flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">{takeaway}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          SECTION 8: EDUCATIONAL CONTENT & FAQS
         ========================================== */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-8">
        {/* Educational Content */}
        <div className="space-y-6">
          <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <BookOpen className="h-5 w-5 text-blue-600" /> Educational Guide: Understanding Compound Interest & Rate Conversions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">1. What Is Compound Interest?</h3>
              <p>
                Compound interest is the interest earned not only on the initial principal deposit but also on the accumulated interest of previous periods. Often described as "interest on interest", compounding accelerates asset growth exponentially over time.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">2. Simple Interest vs Compound Interest</h3>
              <p>
                Simple interest is calculated strictly as a percentage of the principal amount. In contrast, compound interest recalculates interest at each interval based on the updated total balance.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">3. Different Compounding Frequencies</h3>
              <p>
                Interest can compound daily, weekly, monthly, quarterly, semi-annually, or annually. The higher the compounding frequency, the greater the effective annual yield for a given nominal rate.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">4. APR vs APY</h3>
              <p>
                Annual Percentage Rate (APR) represents the nominal annual rate without accounting for intra-year compounding. Annual Percentage Yield (APY) reflects the true effective annual interest earned including compounding effects.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">5. Effective Annual Rate (EAR)</h3>
              <p>
                Effective Annual Rate (EAR) is the standard metric used in financial engineering to compare rates with different compounding intervals.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">6. Continuous Compounding Formula</h3>
              <p>
                As compounding frequency approaches infinity, interest compounds continuously using Euler's constant e ≈ 2.71828.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4 border-t border-zinc-100 dark:border-zinc-800 pt-6">
          <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-indigo-600" /> Frequently Asked Questions (FAQ)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
              <h4 className="font-bold text-zinc-800 dark:text-zinc-200">What is compound interest?</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                It is interest calculated on the initial principal along with all accumulated interest from prior periods.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
              <h4 className="font-bold text-zinc-800 dark:text-zinc-200">What is APR?</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Annual Percentage Rate is the annual interest rate expressed without compounding.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
              <h4 className="font-bold text-zinc-800 dark:text-zinc-200">What is APY?</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Annual Percentage Yield is the real annual rate of return taking compounding into account.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
              <h4 className="font-bold text-zinc-800 dark:text-zinc-200">What is the Rule of 72?</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                A rule of thumb to estimate doubling time by dividing 72 by the annual return rate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          EXECUTIVE PRINT / PDF REPORT MODAL
         ========================================== */}
      {isReportOpen && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          reportData={reportData}
        />
      )}
    </div>
  );
}
