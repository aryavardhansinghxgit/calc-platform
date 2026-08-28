"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Copy,
  Check,
  Bookmark,
  History,
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
  Line,
  ComposedChart,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import { calculatePensionSuite } from "@/lib/calculator-engine/formulas/pension";

export interface SavedPensionScenario {
  id: string;
  name: string;
  date: string;
  retAge1: string;
  lifeExp1: string;
  lumpSumAmt: string;
  returnRate1: string;
  monthlyPen1: string;
  cola1: string;
  retAge2: string;
  retLifeExp2: string;
  spouseAge2: string;
  spouseLifeExp2: string;
  singleMonthly2: string;
  jointMonthly2: string;
  survivorPct2: string;
  optAAge: string;
  optAMonthly: string;
  optBAge: string;
  optBMonthly: string;
  fas: string;
  serviceYears: string;
  multiplier: string;
  activeTab: "lumpSum" | "singleVsJoint" | "workLonger" | "dbFormula" | "charts";
}

function parseNum(val: string, fallback: number): number {
  if (val !== "" && !isNaN(Number(val))) {
    return Number(val);
  }
  return fallback;
}

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

  // State Management: Saved Scenarios & UI Notifications
  const [savedScenarios, setSavedScenarios] = useState<SavedPensionScenario[]>([]);
  const [scenarioNameInput, setScenarioNameInput] = useState<string>("");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);
  const [shareNotification, setShareNotification] = useState(false);

  // Load Saved Scenarios & URL Query Parameters on Mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_pension_scenarios");
      if (stored) {
        setSavedScenarios(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.has("lump")) setLumpSumAmtInput(params.get("lump")!);
      if (params.has("pen")) setMonthlyPension1Input(params.get("pen")!);
      if (params.has("ret")) setReturnRate1Input(params.get("ret")!);
      if (params.has("cola")) setCola1Input(params.get("cola")!);
      if (params.has("age")) setRetAge1(params.get("age")!);
      if (params.has("life")) setLifeExp1(params.get("life")!);
      if (params.has("tab")) {
        const t = params.get("tab");
        if (
          t === "lumpSum" ||
          t === "singleVsJoint" ||
          t === "workLonger" ||
          t === "dbFormula" ||
          t === "charts"
        ) {
          setActiveTab(t);
        }
      }
    }
  }, []);

  // Compute Pension Suite Results with Zero-Safe Inputs
  const results = useMemo(() => {
    return calculatePensionSuite(
      {
        retirementAge: parseNum(retAge1, 65),
        lifeExpectancy: parseNum(lifeExp1, 85),
        lumpSumAmount: parseNum(lumpSumAmtInput, 800000),
        investmentReturnPercent: parseNum(returnRate1Input, 5.0),
        monthlyPension: parseNum(monthlyPension1Input, 5000),
        colaPercent: parseNum(cola1Input, 3.5),
      },
      {
        retirementAge: parseNum(retAge2, 65),
        retireeLifeExpectancy: parseNum(retLifeExp2, 77),
        spouseAgeAtRetirement: parseNum(spouseAge2, 62),
        spouseLifeExpectancy: parseNum(spouseLifeExp2, 82),
        singleLifeMonthly: parseNum(singleMonthly2Input, 5000),
        jointSurvivorMonthly: parseNum(jointMonthly2Input, 3000),
        survivorBenefitPercent: parseNum(survivorPct2Input, 100),
        investmentReturnPercent: parseNum(returnRate2Input, 5.0),
        colaPercent: parseNum(cola2Input, 3.5),
      },
      {
        optionAAge: parseNum(optAAgeInput, 60),
        optionAMonthly: parseNum(optAMonthlyInput, 2500),
        optionBAge: parseNum(optBAgeInput, 65),
        optionBMonthly: parseNum(optBMonthlyInput, 3800),
        investmentReturnPercent: parseNum(returnRate3Input, 5.0),
        colaPercent: parseNum(cola3Input, 3.5),
      },
      {
        finalSalary: parseNum(fasInput, 80000),
        yearsOfService: parseNum(serviceYearsInput, 25),
        multiplierPercent: parseNum(multiplierInput, 2.0),
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
    setActiveTab("lumpSum");
  };

  // Reset to Canonical Defaults
  const resetToDefaults = () => {
    setRetAge1("65");
    setLifeExp1("85");
    setLumpSumAmtInput("800000");
    setReturnRate1Input("5.0");
    setMonthlyPension1Input("5000");
    setCola1Input("3.5");

    setRetAge2("65");
    setRetLifeExp2("77");
    setSpouseAge2("62");
    setSpouseLifeExp2("82");
    setSingleMonthly2Input("5000");
    setJointMonthly2Input("3000");
    setSurvivorPct2Input("100");
    setReturnRate2Input("5.0");
    setCola2Input("3.5");

    setOptAAgeInput("60");
    setOptAMonthlyInput("2500");
    setOptBAgeInput("65");
    setOptBMonthlyInput("3800");
    setReturnRate3Input("5.0");
    setCola3Input("3.5");

    setFasInput("80000");
    setServiceYearsInput("25");
    setMultiplierInput("2.0");

    setActiveTab("lumpSum");
  };

  // Save Scenario to LocalStorage
  const saveScenario = () => {
    const name = scenarioNameInput.trim() || `Pension Plan #${savedScenarios.length + 1}`;
    const newScenario: SavedPensionScenario = {
      id: Date.now().toString(),
      name,
      date: new Date().toLocaleDateString(),
      retAge1,
      lifeExp1,
      lumpSumAmt: lumpSumAmtInput,
      returnRate1: returnRate1Input,
      monthlyPen1: monthlyPension1Input,
      cola1: cola1Input,
      retAge2,
      retLifeExp2,
      spouseAge2,
      spouseLifeExp2,
      singleMonthly2: singleMonthly2Input,
      jointMonthly2: jointMonthly2Input,
      survivorPct2: survivorPct2Input,
      optAAge: optAAgeInput,
      optAMonthly: optAMonthlyInput,
      optBAge: optBAgeInput,
      optBMonthly: optBMonthlyInput,
      fas: fasInput,
      serviceYears: serviceYearsInput,
      multiplier: multiplierInput,
      activeTab,
    };

    const updated = [newScenario, ...savedScenarios.slice(0, 7)];
    setSavedScenarios(updated);
    setScenarioNameInput("");
    try {
      localStorage.setItem("saved_pension_scenarios", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Restore Scenario
  const restoreScenario = (sc: SavedPensionScenario) => {
    setRetAge1(sc.retAge1);
    setLifeExp1(sc.lifeExp1);
    setLumpSumAmtInput(sc.lumpSumAmt);
    setReturnRate1Input(sc.returnRate1);
    setMonthlyPension1Input(sc.monthlyPen1);
    setCola1Input(sc.cola1);

    setRetAge2(sc.retAge2);
    setRetLifeExp2(sc.retLifeExp2);
    setSpouseAge2(sc.spouseAge2);
    setSpouseLifeExp2(sc.spouseLifeExp2);
    setSingleMonthly2Input(sc.singleMonthly2);
    setJointMonthly2Input(sc.jointMonthly2);
    setSurvivorPct2Input(sc.survivorPct2);

    setOptAAgeInput(sc.optAAge);
    setOptAMonthlyInput(sc.optAMonthly);
    setOptBAgeInput(sc.optBAge);
    setOptBMonthlyInput(sc.optBMonthly);

    setFasInput(sc.fas);
    setServiceYearsInput(sc.serviceYears);
    setMultiplierInput(sc.multiplier);

    setActiveTab(sc.activeTab);
  };

  // Delete Scenario
  const deleteScenario = (id: string) => {
    const updated = savedScenarios.filter((s) => s.id !== id);
    setSavedScenarios(updated);
    try {
      localStorage.setItem("saved_pension_scenarios", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Copy Summary
  const copySummary = () => {
    const text = `Pension Decision & Actuarial Summary:
------------------------------------------------
1. Lump Sum vs. Monthly Pension:
   Lump Sum Amount: ${fmt(results.lumpSumVsPension.lumpSumAmount)}
   Monthly Pension Payment: ${fmt(results.lumpSumVsPension.monthlyPension)}/mo (COLA: ${cola1Input}%)
   Present Value (PV) of Pension: ${fmt(results.lumpSumVsPension.presentValueOfPension)}
   Total Lifetime Pension Income: ${fmt(results.lumpSumVsPension.totalLifetimePensionIncome)}
   Breakeven Crossover Age: Age ${results.lumpSumVsPension.breakevenAge}
   Recommended Option: ${results.lumpSumVsPension.recommendedOption} (Financial Advantage: ${fmt(results.lumpSumVsPension.financialAdvantage)})
------------------------------------------------
2. Single Life vs. Joint Survivor:
   Single Life Total Income: ${fmt(results.singleVsJoint.singleLifeTotalIncome)}
   Joint Survivor Total Income: ${fmt(results.singleVsJoint.jointSurvivorTotalIncome)}
   Survivor Protection Score: ${results.singleVsJoint.survivorProtectionScore}%
   Recommended Option: ${results.singleVsJoint.recommendedOption}
------------------------------------------------
3. Work Longer vs. Retire Earlier:
   Additional Monthly Pension: +${fmt(results.workLonger.additionalMonthlyPension)}/mo
   Foregone Early Pension: ${fmt(results.workLonger.foregoneEarlyPensionIncome)}
   Crossover Age: Age ${results.workLonger.crossoverAge}
   Recommended Option: ${results.workLonger.recommendedOption} (Advantage: ${fmt(results.workLonger.netFinancialBenefit)})
------------------------------------------------
4. Defined Benefit Formula:
   Calculated Monthly Pension: ${fmt(results.dbFormula.calculatedMonthlyPension)}
   Calculated Annual Pension: ${fmt(results.dbFormula.calculatedAnnualPension)}
   Income Replacement Ratio: ${results.dbFormula.incomeReplacementRatio}%
Disclaimer: Pension calculations are educational models. Actual pension elections depend on employer plan provisions.`;

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopyNotification(true);
      setTimeout(() => setCopyNotification(false), 2500);
    }
  };

  // Share URL with Query Parameters
  const shareCalculation = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams({
        lump: lumpSumAmtInput,
        pen: monthlyPension1Input,
        ret: returnRate1Input,
        cola: cola1Input,
        age: retAge1,
        life: lifeExp1,
        tab: activeTab,
      });
      const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl);
        setShareNotification(true);
        setTimeout(() => setShareNotification(false), 2500);
      }
    }
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
      r.pensionAnnualIncome.toFixed(2),
      r.cumulativePensionIncome.toFixed(2),
      (r.lumpSumBalance || 0).toFixed(2),
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
      calculatorName: "Pension Calculator – Lump Sum, Joint Survivor & Early Retirement Suite",
      reportTitle: "Pension Evaluation & Actuarial Strategy Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      {
        label: "Lump Sum vs Monthly Winner",
        value: results.lumpSumVsPension.recommendedOption,
        subtitle: `Financial Advantage: ${fmt(results.lumpSumVsPension.financialAdvantage)}`,
        colorTheme: "emerald",
      },
      {
        label: "Present Value (PV) of Pension",
        value: fmt(results.lumpSumVsPension.presentValueOfPension),
        subtitle: `Monthly check: ${fmt(results.lumpSumVsPension.monthlyPension)}/mo`,
        colorTheme: "blue",
      },
      {
        label: "Lifetime Pension Total",
        value: fmt(results.lumpSumVsPension.totalLifetimePensionIncome),
        subtitle: `Lump Sum Value: ${fmt(results.lumpSumVsPension.lumpSumAmount)}`,
        colorTheme: "purple",
      },
      {
        label: "Breakeven Crossover Age",
        value: `Age ${results.lumpSumVsPension.breakevenAge}`,
        subtitle: `COLA rate: ${cola1Input}% | Discount rate: ${returnRate1Input}%`,
        colorTheme: "amber",
      },
    ],
    sections: [
      {
        title: "1. Lump Sum vs. Monthly Pension Analysis",
        items: [
          { label: "Retirement Age", value: retAge1 },
          { label: "Life Expectancy", value: lifeExp1 },
          { label: "Lump Sum Payout Amount", value: fmt(results.lumpSumVsPension.lumpSumAmount) },
          { label: "Monthly Pension Payout", value: fmt(results.lumpSumVsPension.monthlyPension) },
          { label: "Assumed Investment Return", value: `${returnRate1Input}%/yr` },
          { label: "COLA Annual Adjustment", value: `${cola1Input}%/yr` },
          { label: "Present Value (PV) of Pension", value: fmt(results.lumpSumVsPension.presentValueOfPension), highlight: true },
          { label: "Total Lifetime Pension Income", value: fmt(results.lumpSumVsPension.totalLifetimePensionIncome) },
          { label: "Breakeven Crossover Age", value: `Age ${results.lumpSumVsPension.breakevenAge}` },
          { label: "Recommended Choice", value: results.lumpSumVsPension.recommendedOption, highlight: true },
        ],
      },
      {
        title: "2. Single Life vs. Joint-and-Survivor Analysis",
        items: [
          { label: "Single Life Monthly Payout", value: fmt(parseNum(singleMonthly2Input, 5000)) },
          { label: "Joint Survivor Monthly Payout", value: fmt(parseNum(jointMonthly2Input, 3000)) },
          { label: "Survivor Benefit Ratio", value: `${survivorPct2Input}%` },
          { label: "Single Life Cumulative Income", value: fmt(results.singleVsJoint.singleLifeTotalIncome) },
          { label: "Joint Survivor Cumulative Income", value: fmt(results.singleVsJoint.jointSurvivorTotalIncome) },
          { label: "Survivor Protection Score", value: `${results.singleVsJoint.survivorProtectionScore}%` },
          { label: "Recommended Plan", value: results.singleVsJoint.recommendedOption, highlight: true },
        ],
      },
      {
        title: "3. Work Longer vs. Retire Earlier Analysis",
        items: [
          { label: "Option A (Retire Early)", value: `Age ${optAAgeInput} @ ${fmt(parseNum(optAMonthlyInput, 2500))}/mo` },
          { label: "Option B (Work Longer)", value: `Age ${optBAgeInput} @ ${fmt(parseNum(optBMonthlyInput, 3800))}/mo` },
          { label: "Additional Monthly Pension", value: `+${fmt(results.workLonger.additionalMonthlyPension)}/mo` },
          { label: "Foregone Early Pension", value: fmt(results.workLonger.foregoneEarlyPensionIncome) },
          { label: "Crossover Age", value: `Age ${results.workLonger.crossoverAge}` },
          { label: "Optimal Age Recommendation", value: results.workLonger.recommendedOption, highlight: true },
        ],
      },
      {
        title: "4. Defined Benefit Multiplier Helper",
        items: [
          { label: "Final Average Salary", value: fmt(parseNum(fasInput, 80000)) },
          { label: "Years of Service", value: serviceYearsInput },
          { label: "Benefit Multiplier", value: `${multiplierInput}%/yr` },
          { label: "Calculated Annual Pension", value: fmt(results.dbFormula.calculatedAnnualPension) },
          { label: "Calculated Monthly Pension", value: fmt(results.dbFormula.calculatedMonthlyPension), highlight: true },
          { label: "Income Replacement Ratio", value: `${results.dbFormula.incomeReplacementRatio}%` },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6" id="pension-calculator-app">
      {/* Top Quick Presets & Status Bar */}
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
            className="h-6 text-[10px] px-2 cursor-pointer font-medium hover:border-indigo-400"
          >
            $800k vs $5k/mo (3.5% COLA)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset1(500000, 3200, 2.5)}
            className="h-6 text-[10px] px-2 cursor-pointer font-medium hover:border-indigo-400"
          >
            $500k vs $3.2k/mo (2.5% COLA)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset1(1200000, 7500, 0.0)}
            className="h-6 text-[10px] px-2 cursor-pointer font-medium hover:border-indigo-400"
          >
            $1.2M vs $7.5k/mo (No COLA)
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>PV of Pension:</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-sans tabular-nums text-sm font-extrabold">
            {fmt(results.lumpSumVsPension.presentValueOfPension)}
          </span>
        </div>
      </div>

      {/* Navigation Tabs for the 4 Core Modules + Visual Dashboard */}
      <div
        className="flex flex-wrap border-b border-zinc-200 dark:border-zinc-800 gap-1"
        role="tablist"
        aria-label="Pension Calculator Modules"
      >
        <button
          type="button"
          role="tab"
          id="tab-lumpSum"
          aria-selected={activeTab === "lumpSum"}
          aria-controls="panel-lumpSum"
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
          role="tab"
          id="tab-singleVsJoint"
          aria-selected={activeTab === "singleVsJoint"}
          aria-controls="panel-singleVsJoint"
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
          role="tab"
          id="tab-workLonger"
          aria-selected={activeTab === "workLonger"}
          aria-controls="panel-workLonger"
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
          role="tab"
          id="tab-dbFormula"
          aria-selected={activeTab === "dbFormula"}
          aria-controls="panel-dbFormula"
          onClick={() => setActiveTab("dbFormula")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "dbFormula"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Percent className="h-4 w-4 text-purple-500" /> % DB Formula Helper
        </button>
        <button
          type="button"
          role="tab"
          id="tab-charts"
          aria-selected={activeTab === "charts"}
          aria-controls="panel-charts"
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
        <div id="panel-lumpSum" role="tabpanel" aria-labelledby="tab-lumpSum" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Lump Sum vs. Monthly Pension Parameters
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label htmlFor="pension-ret-age-1" className="font-semibold text-zinc-700 dark:text-zinc-300">Your Retirement Age</label>
                  <Input
                    id="pension-ret-age-1"
                    type="number"
                    min="18"
                    max="100"
                    value={retAge1}
                    onChange={(e) => setRetAge1(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="pension-life-exp-1" className="font-semibold text-zinc-700 dark:text-zinc-300">Your Life Expectancy</label>
                  <Input
                    id="pension-life-exp-1"
                    type="number"
                    min="18"
                    max="115"
                    value={lifeExp1}
                    onChange={(e) => setLifeExp1(e.target.value)}
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
              </div>

              {/* Option 1: Lump Sum */}
              <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3.5 rounded-lg border border-zinc-200/70 dark:border-zinc-700 space-y-2 text-xs">
                <span className="font-bold text-zinc-800 dark:text-zinc-200 block text-xs">
                  Option 1: Lump Sum Payment
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="pension-lump-amt" className="font-semibold text-zinc-700 dark:text-zinc-300">Lump Sum Amount ($)</label>
                    <Input
                      id="pension-lump-amt"
                      type="number"
                      min="0"
                      step="10000"
                      value={lumpSumAmtInput}
                      onChange={(e) => setLumpSumAmtInput(e.target.value)}
                      className="text-xs font-sans tabular-nums h-8 px-2 bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="pension-return-1" className="font-semibold text-zinc-700 dark:text-zinc-300">Investment Return (%/yr)</label>
                    <Input
                      id="pension-return-1"
                      type="number"
                      min="0"
                      max="25"
                      step="0.25"
                      value={returnRate1Input}
                      onChange={(e) => setReturnRate1Input(e.target.value)}
                      className="text-xs font-sans tabular-nums h-8 px-2 bg-white dark:bg-zinc-800"
                    />
                  </div>
                </div>
              </div>

              {/* Option 2: Monthly Pension */}
              <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-3.5 rounded-lg border border-indigo-200 dark:border-indigo-800 space-y-2 text-xs">
                <span className="font-bold text-indigo-900 dark:text-indigo-200 block text-xs">
                  Option 2: Monthly Pension Payment
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="pension-monthly-1" className="font-semibold text-zinc-700 dark:text-zinc-300">Monthly Pension ($/mo)</label>
                    <Input
                      id="pension-monthly-1"
                      type="number"
                      min="0"
                      step="100"
                      value={monthlyPension1Input}
                      onChange={(e) => setMonthlyPension1Input(e.target.value)}
                      className="text-xs font-sans tabular-nums h-8 px-2 bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="pension-cola-1" className="font-semibold text-zinc-700 dark:text-zinc-300">COLA Adjustment (%/yr)</label>
                    <Input
                      id="pension-cola-1"
                      type="number"
                      min="0"
                      max="20"
                      step="0.25"
                      value={cola1Input}
                      onChange={(e) => setCola1Input(e.target.value)}
                      className="text-xs font-sans tabular-nums h-8 px-2 bg-white dark:bg-zinc-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar: Reset, Save, Copy, Share */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-1 min-w-[200px]">
                  <Input
                    type="text"
                    placeholder="Scenario Name (e.g. Early Out)"
                    value={scenarioNameInput}
                    onChange={(e) => setScenarioNameInput(e.target.value)}
                    className="text-xs h-8 px-2"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={saveScenario}
                    className="h-8 text-xs gap-1 cursor-pointer"
                  >
                    <Bookmark className="h-3.5 w-3.5 text-blue-600" /> Save
                  </Button>
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={resetToDefaults}
                    className="h-8 text-xs gap-1 cursor-pointer text-zinc-600 dark:text-zinc-400"
                    title="Reset to Defaults"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Reset
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copySummary}
                    className="h-8 text-xs gap-1 cursor-pointer text-zinc-700 dark:text-zinc-300"
                  >
                    {copyNotification ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    {copyNotification ? "Copied!" : "Copy"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={shareCalculation}
                    className="h-8 text-xs gap-1 cursor-pointer text-zinc-700 dark:text-zinc-300"
                  >
                    {shareNotification ? <Check className="h-3.5 w-3.5 text-indigo-500" /> : <Share2 className="h-3.5 w-3.5 text-indigo-500" />}
                    {shareNotification ? "Link Copied!" : "Share"}
                  </Button>
                </div>
              </div>

              {/* Saved Scenarios List */}
              {savedScenarios.length > 0 && (
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                    <span className="flex items-center gap-1">
                      <History className="w-3 h-3 text-indigo-500" /> Saved Scenarios ({savedScenarios.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSavedScenarios([]);
                        localStorage.removeItem("saved_pension_scenarios");
                      }}
                      className="text-[10px] text-zinc-400 hover:text-red-500 font-medium cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {savedScenarios.map((sc) => (
                      <div
                        key={sc.id}
                        className="p-1.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-between text-xs"
                      >
                        <button
                          type="button"
                          onClick={() => restoreScenario(sc)}
                          className="text-left font-bold text-indigo-600 dark:text-indigo-400 hover:underline truncate cursor-pointer"
                        >
                          {sc.name} <span className="text-[10px] text-zinc-400 font-normal">({sc.date})</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteScenario(sc.id)}
                          className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer"
                          title="Delete Scenario"
                          aria-label="Delete Scenario"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Dashboard (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  RECOMMENDED PENSION OPTION
                </span>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setIsReportOpen(true)}
                  className="h-7 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-semibold cursor-pointer"
                >
                  <Printer className="h-3 w-3 mr-1" /> PDF Report
                </Button>
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

            {/* Quick Summary Insight */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-xs leading-relaxed space-y-2">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 text-xs block">
                Actuarial Decision Framework:
              </span>
              <p className="text-zinc-600 dark:text-zinc-400">
                • <strong>Present Value:</strong> Discounted at {returnRate1Input}%/yr, the monthly pension stream is worth {fmt(results.lumpSumVsPension.presentValueOfPension)} today, compared to the ${parseNum(lumpSumAmtInput, 800000).toLocaleString()} lump sum.<br />
                • <strong>Longevity Horizon:</strong> Over {Math.max(0, parseNum(lifeExp1, 85) - parseNum(retAge1, 65))} years with {cola1Input}% annual COLA, cumulative pension checks total {fmt(results.lumpSumVsPension.totalLifetimePensionIncome)}.<br />
                • <strong>Breakeven:</strong> If you live past <strong>Age {results.lumpSumVsPension.breakevenAge}</strong>, electing the monthly pension produces higher cumulative income.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SINGLE LIFE VS JOINT SURVIVOR */}
      {activeTab === "singleVsJoint" && (
        <div id="panel-singleVsJoint" role="tabpanel" aria-labelledby="tab-singleVsJoint" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Single-Life vs. Joint-and-Survivor Inputs
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label htmlFor="pension-ret-age-2" className="font-semibold text-zinc-700 dark:text-zinc-300">Your Retirement Age</label>
                <Input id="pension-ret-age-2" type="number" value={retAge2} onChange={(e) => setRetAge2(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label htmlFor="pension-life-exp-2" className="font-semibold text-zinc-700 dark:text-zinc-300">Your Life Expectancy</label>
                <Input id="pension-life-exp-2" type="number" value={retLifeExp2} onChange={(e) => setRetLifeExp2(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label htmlFor="pension-spouse-age-2" className="font-semibold text-zinc-700 dark:text-zinc-300">Spouse Age at Retirement</label>
                <Input id="pension-spouse-age-2" type="number" value={spouseAge2} onChange={(e) => setSpouseAge2(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label htmlFor="pension-spouse-life-2" className="font-semibold text-zinc-700 dark:text-zinc-300">Spouse Life Expectancy</label>
                <Input id="pension-spouse-life-2" type="number" value={spouseLifeExp2} onChange={(e) => setSpouseLifeExp2(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs border-t border-zinc-100 dark:border-zinc-800 pt-3">
              <div className="space-y-1">
                <label htmlFor="pension-single-monthly-2" className="font-semibold text-zinc-700 dark:text-zinc-300">Single Life Pension ($/mo)</label>
                <Input id="pension-single-monthly-2" type="number" value={singleMonthly2Input} onChange={(e) => setSingleMonthly2Input(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label htmlFor="pension-joint-monthly-2" className="font-semibold text-zinc-700 dark:text-zinc-300">Joint Survivor Pension ($/mo)</label>
                <Input id="pension-joint-monthly-2" type="number" value={jointMonthly2Input} onChange={(e) => setJointMonthly2Input(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label htmlFor="pension-survivor-pct-2" className="font-semibold text-zinc-700 dark:text-zinc-300">Survivor Benefit Ratio (%)</label>
              <select
                id="pension-survivor-pct-2"
                value={survivorPct2Input}
                onChange={(e) => setSurvivorPct2Input(e.target.value)}
                className="w-full h-8 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-xs cursor-pointer"
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
        <div id="panel-workLonger" role="tabpanel" aria-labelledby="tab-workLonger" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Work Longer vs. Retire Earlier Comparison
            </h3>

            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-700 space-y-2 text-xs">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Option A: Retire Earlier</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="pension-optA-age" className="text-[11px] text-zinc-500 block mb-0.5">Retire Age</label>
                  <Input id="pension-optA-age" type="number" placeholder="60" value={optAAgeInput} onChange={(e) => setOptAAgeInput(e.target.value)} className="text-xs h-8 px-2" />
                </div>
                <div>
                  <label htmlFor="pension-optA-monthly" className="text-[11px] text-zinc-500 block mb-0.5">Pension ($/mo)</label>
                  <Input id="pension-optA-monthly" type="number" placeholder="2500" value={optAMonthlyInput} onChange={(e) => setOptAMonthlyInput(e.target.value)} className="text-xs h-8 px-2" />
                </div>
              </div>
            </div>

            <div className="bg-amber-50/50 dark:bg-amber-950/20 p-3.5 rounded-lg border border-amber-200 dark:border-amber-800 space-y-2 text-xs">
              <span className="font-bold text-amber-900 dark:text-amber-200 block">Option B: Work Longer</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="pension-optB-age" className="text-[11px] text-zinc-500 block mb-0.5">Retire Age</label>
                  <Input id="pension-optB-age" type="number" placeholder="65" value={optBAgeInput} onChange={(e) => setOptBAgeInput(e.target.value)} className="text-xs h-8 px-2" />
                </div>
                <div>
                  <label htmlFor="pension-optB-monthly" className="text-[11px] text-zinc-500 block mb-0.5">Pension ($/mo)</label>
                  <Input id="pension-optB-monthly" type="number" placeholder="3800" value={optBMonthlyInput} onChange={(e) => setOptBMonthlyInput(e.target.value)} className="text-xs h-8 px-2" />
                </div>
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
              <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <span className="text-[10px] text-zinc-400 block font-sans">Additional Pension</span>
                <span className="font-bold text-amber-600">+{fmt(results.workLonger.additionalMonthlyPension)}/mo</span>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <span className="text-[10px] text-zinc-400 block font-sans">Foregone Pension</span>
                <span className="font-bold text-rose-500">{fmt(results.workLonger.foregoneEarlyPensionIncome)}</span>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <span className="text-[10px] text-zinc-400 block font-sans">Crossover Age</span>
                <span className="font-bold text-indigo-600">Age {results.workLonger.crossoverAge}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DB FORMULA HELPER */}
      {activeTab === "dbFormula" && (
        <div id="panel-dbFormula" role="tabpanel" aria-labelledby="tab-dbFormula" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-5">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              Defined Benefit Pension Multiplier Formula Helper
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Calculate your estimated monthly pension check directly using your final average salary, years of service, and multiplier %.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label htmlFor="pension-fas" className="font-semibold text-zinc-700 dark:text-zinc-300">Final Average Salary ($)</label>
              <Input id="pension-fas" type="number" value={fasInput} onChange={(e) => setFasInput(e.target.value)} className="text-xs font-sans tabular-nums h-9 px-3" />
            </div>
            <div className="space-y-1">
              <label htmlFor="pension-service-years" className="font-semibold text-zinc-700 dark:text-zinc-300">Years of Service</label>
              <Input id="pension-service-years" type="number" value={serviceYearsInput} onChange={(e) => setServiceYearsInput(e.target.value)} className="text-xs font-sans tabular-nums h-9 px-3" />
            </div>
            <div className="space-y-1">
              <label htmlFor="pension-multiplier" className="font-semibold text-zinc-700 dark:text-zinc-300">Benefit Multiplier (%/yr)</label>
              <Input id="pension-multiplier" type="number" value={multiplierInput} onChange={(e) => setMultiplierInput(e.target.value)} className="text-xs font-sans tabular-nums h-9 px-3" />
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
        <div id="panel-charts" role="tabpanel" aria-labelledby="tab-charts" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                Lifetime Pension &amp; Wealth Projection Chart
              </h3>
              <p className="text-xs text-zinc-500">
                Visualizing cumulative pension income vs. invested lump sum balance over your life expectancy.
              </p>
            </div>

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

          {/* Complete Age-by-Age Table */}
          <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <FileSpreadsheet className="h-3.5 w-3.5 text-blue-600" />
              Age-by-Age Accumulation &amp; Longevity Schedule
            </h4>
            <div className="overflow-x-auto max-h-72 border border-zinc-200 dark:border-zinc-800 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-zinc-100 dark:bg-zinc-800 sticky top-0 font-semibold text-zinc-900 dark:text-zinc-100">
                  <tr>
                    <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Year</th>
                    <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Age</th>
                    <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Annual Pension ($)</th>
                    <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Cumulative Pension ($)</th>
                    <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Invested Lump Sum ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-sans tabular-nums">
                  {results.projectionSchedule.map((row) => (
                    <tr key={row.age} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                      <td className="p-2 text-zinc-600 dark:text-zinc-400">{row.year}</td>
                      <td className="p-2 font-bold text-zinc-900 dark:text-zinc-100">Age {row.age}</td>
                      <td className="p-2 font-semibold text-blue-600 dark:text-blue-400">{fmt(row.pensionAnnualIncome)}</td>
                      <td className="p-2 font-bold text-emerald-600">{fmt(row.cumulativePensionIncome)}</td>
                      <td className="p-2 text-zinc-700 dark:text-zinc-300">{fmt(row.lumpSumBalance || 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />
    </div>
  );
}

export default PensionCalculator;
