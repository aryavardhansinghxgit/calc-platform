"use client";

import React, { useState, useMemo } from "react";
import {
  Shield,
  DollarSign,
  Calendar,
  Sparkles,
  Printer,
  Share2,
  AlertTriangle,
  Info,
  CheckCircle2,
  BarChart3,
  FileSpreadsheet,
  Download,
  Plus,
  Trash2,
  Percent,
  Landmark,
  Heart,
  Clock,
  Briefcase,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ComposedChart,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  calculateSocialSecuritySuite,
  getBenefitAdjustmentFactor,
} from "@/lib/calculator-engine/formulas/social-security";

export function SocialSecurityCalculator() {
  // Navigation Tabs: 'idealAge' | 'compareAges' | 'fraScale' | 'spousalTax' | 'charts'
  const [activeTab, setActiveTab] = useState<
    "idealAge" | "compareAges" | "fraScale" | "spousalTax" | "charts"
  >("idealAge");

  // Module 1 State: Ideal Claiming Age
  const [birthYearInput, setBirthYearInput] = useState<string>("1970");
  const [lifeExpInput, setLifeExpInput] = useState<string>("83");
  const [fraBenefitInput, setFraBenefitInput] = useState<string>("2200");
  const [returnRateInput, setReturnRateInput] = useState<string>("5.0");
  const [colaInput, setColaInput] = useState<string>("3.0");

  // Module 2 State: Compare Two Application Ages
  const [optAAgeInput, setOptAAgeInput] = useState<string>("62");
  const [optAMonthlyInput, setOptAMonthlyInput] = useState<string>("1600");
  const [optBAgeInput, setOptBAgeInput] = useState<string>("70");
  const [optBMonthlyInput, setOptBMonthlyInput] = useState<string>("2810");
  const [compareReturnInput, setCompareReturnInput] = useState<string>("5.0");
  const [compareColaInput, setCompareColaInput] = useState<string>("3.0");

  // Spousal & Taxability State
  const [workerFraInput, setWorkerFraInput] = useState<string>("2500");
  const [spouseAgeInput, setSpouseAgeInput] = useState<string>("67");
  const [filingStatus, setFilingStatus] = useState<"single" | "married_joint">("married_joint");
  const [otherIncomeInput, setOtherIncomeInput] = useState<string>("35000");

  // Modal & Notification State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Compute Social Security Suite Results
  const results = useMemo(() => {
    return calculateSocialSecuritySuite(
      {
        birthYear: Number(birthYearInput) || 1970,
        lifeExpectancy: Number(lifeExpInput) || 83,
        estimatedFraMonthlyBenefit: Number(fraBenefitInput) || 2200,
        investmentReturnPercent: Number(returnRateInput) || 5.0,
        colaPercent: Number(colaInput) || 3.0,
      },
      {
        optionAAge: Number(optAAgeInput) || 62,
        optionAMonthly: Number(optAMonthlyInput) || 1600,
        optionBAge: Number(optBAgeInput) || 70,
        optionBMonthly: Number(optBMonthlyInput) || 2810,
        investmentReturnPercent: Number(compareReturnInput) || 5.0,
        colaPercent: Number(compareColaInput) || 3.0,
        lifeExpectancy: Number(lifeExpInput) || 83,
      },
      {
        workerFraBenefit: Number(workerFraInput) || 2500,
        spouseClaimingAge: Number(spouseAgeInput) || 67,
        filingStatus,
        otherIncomeAnnual: Number(otherIncomeInput) || 35000,
      }
    );
  }, [
    birthYearInput,
    lifeExpInput,
    fraBenefitInput,
    returnRateInput,
    colaInput,
    optAAgeInput,
    optAMonthlyInput,
    optBAgeInput,
    optBMonthlyInput,
    compareReturnInput,
    compareColaInput,
    workerFraInput,
    spouseAgeInput,
    filingStatus,
    otherIncomeInput,
  ]);

  const fmt = (val: number) =>
    `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Reset Defaults
  const resetDefaults = () => {
    setBirthYearInput("1970");
    setLifeExpInput("83");
    setFraBenefitInput("2200");
    setReturnRateInput("5.0");
    setColaInput("3.0");
    setOptAAgeInput("62");
    setOptAMonthlyInput("1600");
    setOptBAgeInput("70");
    setOptBMonthlyInput("2810");
    setCompareReturnInput("5.0");
    setCompareColaInput("3.0");
    setWorkerFraInput("2500");
    setSpouseAgeInput("67");
    setFilingStatus("married_joint");
    setOtherIncomeInput("35000");
  };

  // Quick Presets
  const applyPreset = (bYear: number, fraBen: number, lifeE: number) => {
    setBirthYearInput(bYear.toString());
    setFraBenefitInput(fraBen.toString());
    setLifeExpInput(lifeE.toString());
  };

  // Copy Summary
  const copySummary = () => {
    const text = `Social Security Benefits Summary:
------------------------------------------------
Birth Year: ${birthYearInput} (FRA: ${results.fraDetails.fraDisplay})
Primary Insurance Amount (FRA Benefit): ${fmt(Number(fraBenefitInput) || 2200)}/mo
Recommended Ideal Claiming Age: Age ${results.idealClaimAge.recommendedAge} (${fmt(results.idealClaimAge.recommendedMonthlyBenefit)}/mo)
Lifetime Total at Recommended Age: ${fmt(results.idealClaimAge.lifetimeBenefitRecommended)}
Breakeven Crossover Age (vs Age 62): Age ${results.idealClaimAge.breakevenAgeVs62}
------------------------------------------------
Claim Age Comparison:
Option A (Age ${results.compareTwoAges.optionAAge}): ${fmt(results.compareTwoAges.optionAMonthly)}/mo (Lifetime: ${fmt(results.compareTwoAges.optionALifetimeTotal)})
Option B (Age ${results.compareTwoAges.optionBAge}): ${fmt(results.compareTwoAges.optionBMonthly)}/mo (Lifetime: ${fmt(results.compareTwoAges.optionBLifetimeTotal)})
Recommended Plan: ${results.compareTwoAges.recommendedOption} (Advantage: ${fmt(results.compareTwoAges.financialAdvantage)})`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "Year",
      "Age",
      "Option A Monthly ($)",
      "Option A Annual ($)",
      "Option A Cumulative ($)",
      "Option B Monthly ($)",
      "Option B Annual ($)",
      "Option B Cumulative ($)",
    ];

    const rows = results.projectionSchedule.map((r) => [
      r.year,
      r.age,
      r.monthlyBenefitA,
      r.annualBenefitA,
      r.cumulativeBenefitA,
      r.monthlyBenefitB || "",
      r.annualBenefitB || "",
      r.cumulativeBenefitB || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        `# Social Security Projection Schedule`,
        `# Birth Year: ${birthYearInput} | FRA: ${results.fraDetails.fraDisplay} | PIA: $${fraBenefitInput}/mo`,
        `# COLA: ${colaInput}% | Investment Return: ${returnRateInput}% | Life Expectancy: ${lifeExpInput}`,
        headers.join(","),
        ...rows.map((e) => e.join(",")),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `social_security_projection_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Report Modal Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Social Security Benefits & Claiming Strategy Suite",
      reportTitle: "Social Security Claiming Strategy & Lifetime Benefit Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      {
        label: "Recommended Claim Age",
        value: `Age ${results.idealClaimAge.recommendedAge}`,
        subtitle: `Monthly check: ${fmt(results.idealClaimAge.recommendedMonthlyBenefit)}/mo`,
        colorTheme: "emerald",
      },
      {
        label: "Full Retirement Age (FRA)",
        value: results.fraDetails.fraDisplay,
        subtitle: `Birth Year: ${results.fraDetails.birthYear}`,
        colorTheme: "blue",
      },
      {
        label: "Delayed Claiming Advantage",
        value: fmt(results.idealClaimAge.delayedClaimingAdvantage),
        subtitle: `Breakeven Age: Age ${results.idealClaimAge.breakevenAgeVs62}`,
        colorTheme: "purple",
      },
    ],
    sections: [
      {
        title: "Ideal Claiming Age Optimizer",
        items: [
          { label: "Birth Year", value: birthYearInput },
          { label: "Full Retirement Age (FRA)", value: results.fraDetails.fraDisplay },
          { label: "Estimated FRA Monthly Benefit", value: fmt(Number(fraBenefitInput) || 2200) },
          { label: "Life Expectancy", value: lifeExpInput },
          { label: "Recommended Claim Age", value: `Age ${results.idealClaimAge.recommendedAge}`, highlight: true },
          { label: "Recommended Monthly Benefit", value: fmt(results.idealClaimAge.recommendedMonthlyBenefit), highlight: true },
          { label: "Lifetime Benefit at Age 62", value: fmt(results.idealClaimAge.lifetimeBenefit62) },
          { label: "Lifetime Benefit at FRA", value: fmt(results.idealClaimAge.lifetimeBenefitFra) },
          { label: "Lifetime Benefit at Age 70", value: fmt(results.idealClaimAge.lifetimeBenefit70) },
        ],
      },
      {
        title: "Claim Age Option Comparison",
        items: [
          { label: `Option A (Age ${results.compareTwoAges.optionAAge})`, value: `${fmt(results.compareTwoAges.optionAMonthly)}/mo` },
          { label: `Option B (Age ${results.compareTwoAges.optionBAge})`, value: `${fmt(results.compareTwoAges.optionBMonthly)}/mo` },
          { label: "Crossover Breakeven Age", value: `Age ${results.compareTwoAges.breakevenAge}` },
          { label: "Recommended Strategy", value: results.compareTwoAges.recommendedOption, highlight: true },
        ],
      },
    ],
  };

  const factor62 = getBenefitAdjustmentFactor(62, results.fraDetails.fullRetirementAgeYears);
  const factor65 = getBenefitAdjustmentFactor(65, results.fraDetails.fullRetirementAgeYears);
  const factor70 = getBenefitAdjustmentFactor(70, results.fraDetails.fullRetirementAgeYears);

  return (
    <div className="space-y-6">
      {/* Top Quick Presets Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 gap-1 text-xs"
          >
            <Shield className="h-3.5 w-3.5" /> SSA Rules Compliant
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(1970, 2200, 83)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            Born 1970 / $2.2k FRA / Age 83
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(1960, 3000, 88)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            Born 1960 / $3k FRA / Age 88
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(1955, 1800, 78)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            Born 1955 / $1.8k FRA / Age 78
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={resetDefaults}
            className="h-6 text-[10px] px-2 text-zinc-500 hover:text-rose-600 cursor-pointer"
          >
            Reset
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>Your Full Retirement Age:</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-sans tabular-nums text-sm">
            {results.fraDetails.fraDisplay}
          </span>
        </div>
      </div>

      {/* Navigation Tabs for both Reference Modules + FRA Scale + Spousal/Tax + Charts */}
      <div className="flex flex-wrap border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("idealAge")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "idealAge"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Award className="h-4 w-4" /> 1. Ideal Application Age
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("compareAges")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "compareAges"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Landmark className="h-4 w-4 text-purple-500" /> 2. Compare Two Ages
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("fraScale")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "fraScale"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Clock className="h-4 w-4 text-emerald-500" /> 3. FRA &amp; Benefit Scale
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("spousalTax")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "spousalTax"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Users className="h-4 w-4 text-rose-500" /> 4. Spousal &amp; Taxability
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("charts")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "charts"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <BarChart3 className="h-4 w-4 text-blue-500" /> Visual Dashboard &amp; Schedule
        </button>
      </div>

      {/* TAB 1: IDEAL APPLICATION AGE OPTIMIZER */}
      {activeTab === "idealAge" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Ideal Claiming Age Parameters
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Your Birth Year</label>
                  <Input
                    type="number"
                    min="1930"
                    max="2010"
                    value={birthYearInput}
                    onChange={(e) => setBirthYearInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                  <span className="text-[10px] text-zinc-400">FRA: {results.fraDetails.fraDisplay}</span>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Your Life Expectancy</label>
                  <Input
                    type="number"
                    min="65"
                    max="105"
                    value={lifeExpInput}
                    onChange={(e) => setLifeExpInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                  Est. Monthly Benefit at Full Retirement Age (FRA) ($)
                </label>
                <Input
                  type="number"
                  min="500"
                  max="4873"
                  step="50"
                  value={fraBenefitInput}
                  onChange={(e) => setFraBenefitInput(e.target.value)}
                  className="text-xs font-sans tabular-nums h-9 px-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs border-t border-zinc-100 dark:border-zinc-800 pt-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Investment Return (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    step="0.25"
                    value={returnRateInput}
                    onChange={(e) => setReturnRateInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">COLA Adjustment (%/yr)</label>
                  <Input
                    type="number"
                    min="0"
                    max="15"
                    step="0.25"
                    value={colaInput}
                    onChange={(e) => setColaInput(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  RECOMMENDED CLAIMING AGE
                </span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setIsReportOpen(true)}
                    className="h-7 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-semibold cursor-pointer"
                  >
                    <Printer className="h-3 w-3 mr-1" /> PDF Report
                  </Button>
                </div>
              </div>

              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-emerald-400 mb-2">
                Age {results.idealClaimAge.recommendedAge}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 font-medium mb-3">
                <span>
                  Monthly Check: <span className="font-bold text-emerald-300">{fmt(results.idealClaimAge.recommendedMonthlyBenefit)}/mo</span>
                </span>
                <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-indigo-200">
                  Breakeven: Age {results.idealClaimAge.breakevenAgeVs62}
                </span>
              </div>

              <div className="bg-white/10 p-3 rounded-xl text-xs backdrop-blur-sm border border-white/10 font-sans tabular-nums">
                💡 <strong>Delayed Claiming Advantage:</strong> +{fmt(results.idealClaimAge.delayedClaimingAdvantage)} total lifetime income by waiting from 62 to 70.
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
                <div>
                  <div className="text-zinc-400 text-[11px]">Lifetime at Age 62</div>
                  <div className="font-bold font-sans tabular-nums text-rose-300 text-sm">{fmt(results.idealClaimAge.lifetimeBenefit62)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Lifetime at FRA ({results.fraDetails.fraDisplay})</div>
                  <div className="font-bold font-sans tabular-nums text-blue-300 text-sm">{fmt(results.idealClaimAge.lifetimeBenefitFra)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Lifetime at Age 70</div>
                  <div className="font-bold font-sans tabular-nums text-emerald-300 text-sm">{fmt(results.idealClaimAge.lifetimeBenefit70)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMPARE TWO APPLICATION AGES */}
      {activeTab === "compareAges" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Compare Two Application Ages
            </h3>

            {/* Option A */}
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 space-y-2 text-xs">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Social Security Option 1 (Early Claim)</span>
              <div className="grid grid-cols-2 gap-2">
                <Input type="number" placeholder="Retirement Age (e.g. 62)" value={optAAgeInput} onChange={(e) => setOptAAgeInput(e.target.value)} className="text-xs h-8 px-2" />
                <Input type="number" placeholder="Monthly Check ($)" value={optAMonthlyInput} onChange={(e) => setOptAMonthlyInput(e.target.value)} className="text-xs h-8 px-2" />
              </div>
            </div>

            {/* Option B */}
            <div className="bg-purple-50/50 dark:bg-purple-950/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800 space-y-2 text-xs">
              <span className="font-bold text-purple-900 dark:text-purple-200 block">Social Security Option 2 (Work Longer / Delayed)</span>
              <div className="grid grid-cols-2 gap-2">
                <Input type="number" placeholder="Retirement Age (e.g. 70)" value={optBAgeInput} onChange={(e) => setOptBAgeInput(e.target.value)} className="text-xs h-8 px-2" />
                <Input type="number" placeholder="Monthly Check ($)" value={optBMonthlyInput} onChange={(e) => setOptBMonthlyInput(e.target.value)} className="text-xs h-8 px-2" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-purple-900 dark:text-purple-200 text-sm block border-b pb-1">
                Claim Age Winner Recommendation
              </span>
              <div className="text-2xl font-extrabold text-purple-600 font-sans">
                {results.compareTwoAges.recommendedOption}
              </div>
              <div className="font-sans text-zinc-600 dark:text-zinc-400">
                Lifetime Financial Advantage: <span className="font-bold text-emerald-600 font-sans tabular-nums">{fmt(results.compareTwoAges.financialAdvantage)}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border">
                <span className="text-[10px] text-zinc-400 block font-sans">Option 1 Lifetime Total</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{fmt(results.compareTwoAges.optionALifetimeTotal)}</span>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border">
                <span className="text-[10px] text-zinc-400 block font-sans">Option 2 Lifetime Total</span>
                <span className="font-bold text-purple-600">{fmt(results.compareTwoAges.optionBLifetimeTotal)}</span>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border">
                <span className="text-[10px] text-zinc-400 block font-sans">Breakeven Age</span>
                <span className="font-bold text-indigo-600">Age {results.compareTwoAges.breakevenAge}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FRA & BENEFIT SCALE ESTIMATOR */}
      {activeTab === "fraScale" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-5">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              Full Retirement Age (FRA) &amp; Monthly Benefit Scale
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Your exact FRA is <strong>{results.fraDetails.fraDisplay}</strong> based on your birth year {results.fraDetails.birthYear}.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4 text-xs font-sans tabular-nums">
            <div className="bg-rose-50 dark:bg-rose-950/30 p-4 rounded-xl border border-rose-200 dark:border-rose-800">
              <span className="font-sans font-bold text-rose-900 dark:text-rose-200 block text-xs">Age 62 (Early)</span>
              <span className="text-xl font-extrabold text-rose-600">{fmt((Number(fraBenefitInput) || 2200) * factor62)}</span>
              <span className="font-sans text-[10px] text-zinc-500 block mt-1">{(factor62 * 100).toFixed(1)}% of FRA Benefit</span>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
              <span className="font-sans font-bold text-amber-900 dark:text-amber-200 block text-xs">Age 65</span>
              <span className="text-xl font-extrabold text-amber-600">{fmt((Number(fraBenefitInput) || 2200) * factor65)}</span>
              <span className="font-sans text-[10px] text-zinc-500 block mt-1">{(factor65 * 100).toFixed(1)}% of FRA Benefit</span>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800">
              <span className="font-sans font-bold text-indigo-900 dark:text-indigo-200 block text-xs">FRA (Baseline)</span>
              <span className="text-xl font-extrabold text-indigo-600">{fmt(Number(fraBenefitInput) || 2200)}</span>
              <span className="font-sans text-[10px] text-zinc-500 block mt-1">100.0% of FRA Benefit</span>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <span className="font-sans font-bold text-emerald-900 dark:text-emerald-200 block text-xs">Age 70 (Delayed)</span>
              <span className="text-xl font-extrabold text-emerald-600">{fmt((Number(fraBenefitInput) || 2200) * factor70)}</span>
              <span className="font-sans text-[10px] text-zinc-500 block mt-1">{(factor70 * 100).toFixed(1)}% of FRA Benefit</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SPOUSAL, SURVIVOR & BENEFIT TAXABILITY */}
      {activeTab === "spousalTax" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              Spousal, Survivor &amp; Benefit Taxability Suite
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Worker FRA Monthly Benefit ($)</label>
                <Input type="number" value={workerFraInput} onChange={(e) => setWorkerFraInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Spouse Claim Age</label>
                  <Input type="number" min="62" max="70" value={spouseAgeInput} onChange={(e) => setSpouseAgeInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Filing Status</label>
                  <select
                    value={filingStatus}
                    onChange={(e) => setFilingStatus(e.target.value as any)}
                    className="w-full h-8 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-xs"
                  >
                    <option value="single">Single Filer</option>
                    <option value="married_joint">Married Filing Jointly</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Other Annual Income ($) (AGI + Interest)</label>
                <Input type="number" value={otherIncomeInput} onChange={(e) => setOtherIncomeInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-3 font-sans tabular-nums">
              <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 text-sm block border-b pb-1">
                Spousal &amp; Taxability Breakdown
              </span>
              <div className="flex justify-between">
                <span>Max Spousal Benefit (50% of PIA):</span>
                <span className="font-bold">{fmt(results.spousalAndTax.maxSpousalMonthly)}/mo</span>
              </div>
              <div className="flex justify-between">
                <span>Actual Spousal Check (Age {spouseAgeInput}):</span>
                <span className="font-bold text-indigo-600">{fmt(results.spousalAndTax.actualSpousalMonthly)}/mo</span>
              </div>
              <div className="flex justify-between border-t pt-1">
                <span>Survivor Benefit (100% Baseline Estimate):</span>
                <span className="font-bold text-rose-600">{fmt(results.spousalAndTax.survivorMonthlyEstimate)}/mo</span>
              </div>
              <div className="border-t pt-2 space-y-1">
                <div className="flex justify-between font-bold text-emerald-600 text-sm">
                  <span>Taxable Benefit Bracket / Cap:</span>
                  <span>{results.spousalAndTax.taxablePercentage}% Taxable</span>
                </div>
                <p className="text-[10px] text-zinc-500 leading-tight">
                  Based on IRS combined income of {fmt(results.spousalAndTax.combinedIncome)}. Up to {results.spousalAndTax.taxablePercentage}% of your Social Security benefits may be included in taxable income (subject to ordinary income tax rates, not an {results.spousalAndTax.taxablePercentage}% tax rate).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: VISUAL DASHBOARD & SCHEDULE */}
      {activeTab === "charts" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Cumulative Lifetime Benefits Comparison Chart
            </h3>

            <Button type="button" size="sm" variant="outline" onClick={exportCSV} className="h-8 text-xs cursor-pointer">
              <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
            </Button>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={results.projectionSchedule}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="age" tick={{ fontSize: 11 }} label={{ value: "Your Age", position: "insideBottom", offset: -5 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v / 1000}k`} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]} />
                <Legend />
                <Line type="monotone" dataKey="cumulativeBenefitA" stroke="#ef4444" strokeWidth={2.5} name={`Option 1 (Age ${optAAgeInput}) ($)`} />
                <Line type="monotone" dataKey="cumulativeBenefitB" stroke="#10b981" strokeWidth={2.5} name={`Option 2 (Age ${optBAgeInput}) ($)`} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />

      {/* Educational Content & 20 FAQs */}
    </div>
  );
}
