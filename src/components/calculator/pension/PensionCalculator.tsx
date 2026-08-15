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
  ArrowRight,
  RotateCcw,
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
import { PensionContent } from "./PensionContent";
import { calculatePensionSuite } from "@/lib/calculator-engine/formulas/pension";

export function PensionCalculator() {
  // Navigation Tabs: 'lumpSum' | 'singleVsJoint' | 'workLonger' | 'dbFormula' | 'charts'
  const [activeTab, setActiveTab] = useState<
    "lumpSum" | "singleVsJoint" | "workLonger" | "dbFormula" | "charts"
  >("lumpSum");

  // Sub-Calc #1 State: Lump Sum vs Monthly Pension
  const [retAge1, setRetAge1] = useState<string>("65");
  const [lifeExp1, setLifeExp1] = useState<string>("85");
  const [lumpSumAmtInput, setLumpSumAmtInput] = useState<string>("800000");
  const [returnRate1Input, setReturnRate1Input] = useState<string>("5.0");
  const [monthlyPension1Input, setMonthlyPension1Input] = useState<string>("5000");
  const [cola1Input, setCola1Input] = useState<string>("3.5");

  // Sub-Calc #2 State: Single Life vs Joint Survivor
  const [retAge2, setRetAge2] = useState<string>("65");
  const [retLifeExp2, setRetLifeExp2] = useState<string>("77");
  const [spouseAge2, setSpouseAge2] = useState<string>("62");
  const [spouseLifeExp2, setSpouseLifeExp2] = useState<string>("82");
  const [singleMonthly2Input, setSingleMonthly2Input] = useState<string>("5000");
  const [jointMonthly2Input, setJointMonthly2Input] = useState<string>("3000");
  const [survivorPct2Input, setSurvivorPct2Input] = useState<string>("100");
  const [returnRate2Input, setReturnRate2Input] = useState<string>("5.0");
  const [cola2Input, setCola2Input] = useState<string>("3.5");

  // Sub-Calc #3 State: Work Longer vs Retire Early
  const [optAAgeInput, setOptAAgeInput] = useState<string>("60");
  const [optAMonthlyInput, setOptAMonthlyInput] = useState<string>("2500");
  const [optBAgeInput, setOptBAgeInput] = useState<string>("65");
  const [optBMonthlyInput, setOptBMonthlyInput] = useState<string>("3800");
  const [returnRate3Input, setReturnRate3Input] = useState<string>("5.0");
  const [cola3Input, setCola3Input] = useState<string>("3.5");

  // Sub-Calc #4 State: DB Multiplier Helper
  const [fasInput, setFasInput] = useState<string>("80000");
  const [serviceYearsInput, setServiceYearsInput] = useState<string>("25");
  const [multiplierInput, setMultiplierInput] = useState<string>("2.0");

  // Modal & Notification State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Compute Pension Suite Results
  const results = useMemo(() => {
    return calculatePensionSuite(
      {
        retirementAge: Number(retAge1) || 65,
        lifeExpectancy: Number(lifeExp1) || 85,
        lumpSumAmount: Number(lumpSumAmtInput) || 800000,
        investmentReturnPercent: Number(returnRate1Input) || 5.0,
        monthlyPension: Number(monthlyPension1Input) || 5000,
        colaPercent: Number(cola1Input) || 3.5,
      },
      {
        retirementAge: Number(retAge2) || 65,
        retireeLifeExpectancy: Number(retLifeExp2) || 77,
        spouseAgeAtRetirement: Number(spouseAge2) || 62,
        spouseLifeExpectancy: Number(spouseLifeExp2) || 82,
        singleLifeMonthly: Number(singleMonthly2Input) || 5000,
        jointSurvivorMonthly: Number(jointMonthly2Input) || 3000,
        survivorBenefitPercent: Number(survivorPct2Input) || 100,
        investmentReturnPercent: Number(returnRate2Input) || 5.0,
        colaPercent: Number(cola2Input) || 3.5,
      },
      {
        optionAAge: Number(optAAgeInput) || 60,
        optionAMonthly: Number(optAMonthlyInput) || 2500,
        optionBAge: Number(optBAgeInput) || 65,
        optionBMonthly: Number(optBMonthlyInput) || 3800,
        investmentReturnPercent: Number(returnRate3Input) || 5.0,
        colaPercent: Number(cola3Input) || 3.5,
      },
      {
        finalSalary: Number(fasInput) || 80000,
        yearsOfService: Number(serviceYearsInput) || 25,
        multiplierPercent: Number(multiplierInput) || 2.0,
      }
    );
  }, [
    retAge1,
    lifeExp1,
    lumpSumAmtInput,
    returnRate1Input,
    monthlyPension1Input,
    cola1Input,
    retAge2,
    retLifeExp2,
    spouseAge2,
    spouseLifeExp2,
    singleMonthly2Input,
    jointMonthly2Input,
    survivorPct2Input,
    returnRate2Input,
    cola2Input,
    optAAgeInput,
    optAMonthlyInput,
    optBAgeInput,
    optBMonthlyInput,
    returnRate3Input,
    cola3Input,
    fasInput,
    serviceYearsInput,
    multiplierInput,
  ]);

  const fmt = (val: number) =>
    `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Quick Preset Handlers
  const applyPreset1 = (lump: number, monthly: number, cola: number) => {
    setLumpSumAmtInput(lump.toString());
    setMonthlyPension1Input(monthly.toString());
    setCola1Input(cola.toString());
  };

  // Copy Summary
  const copySummary = () => {
    const text = `Pension Evaluation Summary:
------------------------------------------------
1. Lump Sum vs. Monthly Pension:
   Lump Sum Payout: ${fmt(results.lumpSumVsPension.lumpSumAmount)}
   Monthly Pension Payout: ${fmt(results.lumpSumVsPension.monthlyPension)}/mo
   Present Value of Pension: ${fmt(results.lumpSumVsPension.presentValueOfPension)}
   Total Lifetime Pension Income: ${fmt(results.lumpSumVsPension.totalLifetimePensionIncome)}
   Breakeven Age: Age ${results.lumpSumVsPension.breakevenAge}
   Recommended: ${results.lumpSumVsPension.recommendedOption} (Advantage: ${fmt(results.lumpSumVsPension.financialAdvantage)})
------------------------------------------------
2. Single Life vs. Joint Survivor:
   Single Life Lifetime Income: ${fmt(results.singleVsJoint.singleLifeTotalIncome)}
   Joint Survivor Lifetime Income: ${fmt(results.singleVsJoint.jointSurvivorTotalIncome)}
   Recommended: ${results.singleVsJoint.recommendedOption}
------------------------------------------------
3. Work Longer vs. Retire Earlier:
   Foregone Early Pension Income: ${fmt(results.workLonger.foregoneEarlyPensionIncome)}
   Crossover Age: Age ${results.workLonger.crossoverAge}
   Recommended: ${results.workLonger.recommendedOption}`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "Year",
      "Retiree Age",
      "Spouse Age",
      "Annual Pension Income ($)",
      "Cumulative Pension Income ($)",
      "Invested Lump Sum Balance ($)",
    ];

    const rows = results.projectionSchedule.map((r) => [
      r.year,
      r.age,
      r.spouseAge || "",
      r.pensionAnnualIncome,
      r.cumulativePensionIncome,
      r.lumpSumBalance || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pension_projection_schedule_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Report Modal Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Advanced Pension Payout & Actuarial Suite",
      reportTitle: "Pension Evaluation & Retirement Strategy Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      {
        label: "Lump Sum vs Monthly Winner",
        value: results.lumpSumVsPension.recommendedOption,
        subtitle: `Advantage: ${fmt(results.lumpSumVsPension.financialAdvantage)}`,
        colorTheme: "emerald",
      },
      {
        label: "Present Value of Pension",
        value: fmt(results.lumpSumVsPension.presentValueOfPension),
        subtitle: `Monthly check: ${fmt(results.lumpSumVsPension.monthlyPension)}/mo`,
        colorTheme: "blue",
      },
      {
        label: "Breakeven Crossover Age",
        value: `Age ${results.lumpSumVsPension.breakevenAge}`,
        subtitle: `COLA rate: ${cola1Input}%`,
        colorTheme: "purple",
      },
    ],
    sections: [
      {
        title: "Lump Sum vs. Monthly Pension Analysis",
        items: [
          { label: "Retirement Age", value: retAge1 },
          { label: "Lump Sum Payout Amount", value: fmt(results.lumpSumVsPension.lumpSumAmount) },
          { label: "Monthly Pension Payout", value: fmt(results.lumpSumVsPension.monthlyPension) },
          { label: "COLA Annual Adjustment", value: `${cola1Input}%` },
          { label: "Present Value (PV) of Pension", value: fmt(results.lumpSumVsPension.presentValueOfPension), highlight: true },
          { label: "Total Lifetime Pension Income", value: fmt(results.lumpSumVsPension.totalLifetimePensionIncome) },
          { label: "Breakeven Age", value: `Age ${results.lumpSumVsPension.breakevenAge}` },
        ],
      },
      {
        title: "Single Life vs. Joint Survivor Payout",
        items: [
          { label: "Single Life Total Income", value: fmt(results.singleVsJoint.singleLifeTotalIncome) },
          { label: "Joint Survivor Total Income", value: fmt(results.singleVsJoint.jointSurvivorTotalIncome) },
          { label: "Survivor Protection Rating", value: `${results.singleVsJoint.survivorProtectionScore}%` },
          { label: "Recommended Plan", value: results.singleVsJoint.recommendedOption, highlight: true },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Top Presets Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 gap-1 text-xs"
          >
            <Shield className="h-3.5 w-3.5" /> Actuarial Decision Engine
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset1(800000, 5000, 3.5)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            $800k vs $5k/mo (3.5% COLA)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset1(500000, 3200, 2.5)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            $500k vs $3.2k/mo (2.5% COLA)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset1(1200000, 7500, 0.0)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            $1.2M vs $7.5k/mo (No COLA)
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>PV of Pension:</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-sans tabular-nums text-sm">
            {fmt(results.lumpSumVsPension.presentValueOfPension)}
          </span>
        </div>
      </div>

      {/* Navigation Tabs for the 3 Reference Sub-Calculators + DB Helper */}
      <div className="flex flex-wrap border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("lumpSum")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "lumpSum"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Landmark className="h-4 w-4" /> 1. Lump Sum vs. Monthly
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("singleVsJoint")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "singleVsJoint"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Heart className="h-4 w-4 text-rose-500" /> 2. Single vs. Joint Survivor
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("workLonger")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "workLonger"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Briefcase className="h-4 w-4 text-amber-500" /> 3. Work Longer vs. Retire Early
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("dbFormula")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "dbFormula"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Percent className="h-4 w-4 text-purple-500" /> DB Formula Helper
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

      {/* TAB 1: LUMP SUM VS MONTHLY PENSION */}
      {activeTab === "lumpSum" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Lump Sum vs. Monthly Pension Parameters
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Your Retirement Age</label>
                  <Input
                    type="number"
                    min="50"
                    max="80"
                    value={retAge1}
                    onChange={(e) => setRetAge1(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Your Life Expectancy</label>
                  <Input
                    type="number"
                    min="65"
                    max="105"
                    value={lifeExp1}
                    onChange={(e) => setLifeExp1(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
              </div>

              {/* Option 1: Lump Sum */}
              <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-200/70 dark:border-zinc-700 space-y-2 text-xs">
                <span className="font-bold text-zinc-800 dark:text-zinc-200 block text-xs">
                  Option 1: Lump Sum Payment
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">Lump Sum Amount ($)</label>
                    <Input
                      type="number"
                      min="0"
                      step="10000"
                      value={lumpSumAmtInput}
                      onChange={(e) => setLumpSumAmtInput(e.target.value)}
                      className="text-xs font-sans tabular-nums h-8 px-2 bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">Investment Return (%/yr)</label>
                    <Input
                      type="number"
                      min="0"
                      max="20"
                      step="0.25"
                      value={returnRate1Input}
                      onChange={(e) => setReturnRate1Input(e.target.value)}
                      className="text-xs font-sans tabular-nums h-8 px-2 bg-white dark:bg-zinc-800"
                    />
                  </div>
                </div>
              </div>

              {/* Option 2: Monthly Pension */}
              <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-3 rounded-lg border border-indigo-200 dark:border-indigo-800 space-y-2 text-xs">
                <span className="font-bold text-indigo-900 dark:text-indigo-200 block text-xs">
                  Option 2: Monthly Pension Payment
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">Monthly Pension ($/mo)</label>
                    <Input
                      type="number"
                      min="0"
                      step="100"
                      value={monthlyPension1Input}
                      onChange={(e) => setMonthlyPension1Input(e.target.value)}
                      className="text-xs font-sans tabular-nums h-8 px-2 bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">COLA Adjustment (%/yr)</label>
                    <Input
                      type="number"
                      min="0"
                      max="15"
                      step="0.25"
                      value={cola1Input}
                      onChange={(e) => setCola1Input(e.target.value)}
                      className="text-xs font-sans tabular-nums h-8 px-2 bg-white dark:bg-zinc-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  RECOMMENDED PENSION OPTION
                </span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copySummary}
                    className="h-7 text-xs bg-white/10 hover:bg-white/20 border-white/20 text-white cursor-pointer"
                  >
                    <Share2 className="h-3 w-3 mr-1" /> {copyNotification ? "Copied!" : "Copy"}
                  </Button>
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

              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-emerald-400 mb-2">
                {results.lumpSumVsPension.recommendedOption}
              </div>

              <div className="text-xs text-white/90 font-medium mb-3">
                Financial Advantage: <span className="font-bold text-emerald-300">{fmt(results.lumpSumVsPension.financialAdvantage)}</span> over your lifetime
              </div>

              <div className="bg-white/10 p-3 rounded-xl text-xs backdrop-blur-sm border border-white/10 font-sans tabular-nums">
                💡 <strong>Breakeven Crossover Age:</strong> Age {results.lumpSumVsPension.breakevenAge}
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
                <div>
                  <div className="text-zinc-400 text-[11px]">Present Value (PV)</div>
                  <div className="font-bold font-sans tabular-nums text-white text-sm">{fmt(results.lumpSumVsPension.presentValueOfPension)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Lifetime Pension Total</div>
                  <div className="font-bold font-sans tabular-nums text-emerald-300 text-sm">{fmt(results.lumpSumVsPension.totalLifetimePensionIncome)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Lump Sum Value</div>
                  <div className="font-bold font-sans tabular-nums text-blue-300 text-sm">{fmt(results.lumpSumVsPension.lumpSumAmount)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SINGLE LIFE VS JOINT SURVIVOR */}
      {activeTab === "singleVsJoint" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Single-Life vs. Joint-and-Survivor Inputs
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Your Retirement Age</label>
                <Input type="number" value={retAge2} onChange={(e) => setRetAge2(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Your Life Expectancy</label>
                <Input type="number" value={retLifeExp2} onChange={(e) => setRetLifeExp2(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Spouse Age at Retirement</label>
                <Input type="number" value={spouseAge2} onChange={(e) => setSpouseAge2(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Spouse Life Expectancy</label>
                <Input type="number" value={spouseLifeExp2} onChange={(e) => setSpouseLifeExp2(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs border-t border-zinc-100 dark:border-zinc-800 pt-3">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Single Life Pension ($/mo)</label>
                <Input type="number" value={singleMonthly2Input} onChange={(e) => setSingleMonthly2Input(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Joint Survivor Pension ($/mo)</label>
                <Input type="number" value={jointMonthly2Input} onChange={(e) => setJointMonthly2Input(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Survivor Benefit Ratio (%)</label>
              <select
                value={survivorPct2Input}
                onChange={(e) => setSurvivorPct2Input(e.target.value)}
                className="w-full h-8 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-xs"
              >
                <option value="50">50% Survivor Payout</option>
                <option value="66">66% Survivor Payout</option>
                <option value="75">75% Survivor Payout</option>
                <option value="100">100% Full Survivor Payout</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-rose-900 dark:text-rose-200 text-sm block border-b pb-1">
                Survivor Plan Recommendation
              </span>
              <div className="text-2xl font-extrabold text-rose-600 font-sans">
                {results.singleVsJoint.recommendedOption}
              </div>
              <div className="font-sans text-zinc-600 dark:text-zinc-400">
                Survivor Protection Score: <span className="font-bold text-rose-600 font-sans tabular-nums">{results.singleVsJoint.survivorProtectionScore}%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1">
                <span className="font-sans text-zinc-500 text-[11px] block">Single Life Total Income</span>
                <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">{fmt(results.singleVsJoint.singleLifeTotalIncome)}</span>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-1">
                <span className="font-sans text-zinc-500 text-[11px] block">Joint Survivor Total Income</span>
                <span className="text-base font-bold text-indigo-600">{fmt(results.singleVsJoint.jointSurvivorTotalIncome)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WORK LONGER VS RETIRE EARLY */}
      {activeTab === "workLonger" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Work Longer vs. Retire Earlier Comparison
            </h3>

            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 space-y-2 text-xs">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Option A: Retire Earlier</span>
              <div className="grid grid-cols-2 gap-2">
                <Input type="number" placeholder="Retire Age (e.g. 60)" value={optAAgeInput} onChange={(e) => setOptAAgeInput(e.target.value)} className="text-xs h-8 px-2" />
                <Input type="number" placeholder="Pension ($/mo)" value={optAMonthlyInput} onChange={(e) => setOptAMonthlyInput(e.target.value)} className="text-xs h-8 px-2" />
              </div>
            </div>

            <div className="bg-amber-50/50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800 space-y-2 text-xs">
              <span className="font-bold text-amber-900 dark:text-amber-200 block">Option B: Work Longer</span>
              <div className="grid grid-cols-2 gap-2">
                <Input type="number" placeholder="Retire Age (e.g. 65)" value={optBAgeInput} onChange={(e) => setOptBAgeInput(e.target.value)} className="text-xs h-8 px-2" />
                <Input type="number" placeholder="Pension ($/mo)" value={optBMonthlyInput} onChange={(e) => setOptBMonthlyInput(e.target.value)} className="text-xs h-8 px-2" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-amber-900 dark:text-amber-200 text-sm block border-b pb-1">
                Optimal Retirement Age Recommendation
              </span>
              <div className="text-2xl font-extrabold text-amber-600 font-sans">
                {results.workLonger.recommendedOption}
              </div>
              <div className="font-sans text-zinc-600 dark:text-zinc-400">
                Lifetime Net Financial Advantage: <span className="font-bold text-emerald-600 font-sans tabular-nums">{fmt(results.workLonger.netFinancialBenefit)}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border">
                <span className="text-[10px] text-zinc-400 block font-sans">Additional Pension</span>
                <span className="font-bold text-amber-600">+{fmt(results.workLonger.additionalMonthlyPension)}/mo</span>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border">
                <span className="text-[10px] text-zinc-400 block font-sans">Foregone Pension</span>
                <span className="font-bold text-rose-500">{fmt(results.workLonger.foregoneEarlyPensionIncome)}</span>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border">
                <span className="text-[10px] text-zinc-400 block font-sans">Crossover Age</span>
                <span className="font-bold text-indigo-600">Age {results.workLonger.crossoverAge}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DB FORMULA HELPER */}
      {activeTab === "dbFormula" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-5">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Defined Benefit Pension Multiplier Formula Helper
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Calculate your estimated monthly pension check directly using your final average salary, years of service, and multiplier %.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Final Average Salary ($)</label>
              <Input type="number" value={fasInput} onChange={(e) => setFasInput(e.target.value)} className="text-xs font-sans tabular-nums h-9 px-3" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Years of Service</label>
              <Input type="number" value={serviceYearsInput} onChange={(e) => setServiceYearsInput(e.target.value)} className="text-xs font-sans tabular-nums h-9 px-3" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Benefit Multiplier (%/yr)</label>
              <Input type="number" value={multiplierInput} onChange={(e) => setMultiplierInput(e.target.value)} className="text-xs font-sans tabular-nums h-9 px-3" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs font-sans tabular-nums">
            <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
              <span className="font-sans text-[11px] text-zinc-500 block">Calculated Monthly Pension</span>
              <span className="text-2xl font-extrabold text-purple-600">{fmt(results.dbFormula.calculatedMonthlyPension)}</span>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800">
              <span className="font-sans text-[11px] text-zinc-500 block">Calculated Annual Pension</span>
              <span className="text-2xl font-extrabold text-indigo-600">{fmt(results.dbFormula.calculatedAnnualPension)}</span>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <span className="font-sans text-[11px] text-zinc-500 block">Income Replacement Ratio</span>
              <span className="text-2xl font-extrabold text-emerald-600">{results.dbFormula.incomeReplacementRatio}%</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: VISUAL DASHBOARD & SCHEDULE */}
      {activeTab === "charts" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Lifetime Pension &amp; Wealth Projection Chart
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
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v / 1000}k`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v / 1000}k`} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]} />
                <Legend />
                <Bar yAxisId="left" dataKey="cumulativePensionIncome" fill="#3b82f6" name="Cumulative Pension Income ($)" />
                <Line yAxisId="right" type="monotone" dataKey="lumpSumBalance" stroke="#10b981" strokeWidth={2.5} name="Invested Lump Sum Balance ($)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />

      {/* Educational Content & 15 FAQs */}
      <PensionContent />
    </div>
  );
}
