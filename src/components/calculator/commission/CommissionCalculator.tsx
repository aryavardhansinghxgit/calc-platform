"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Briefcase,
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
  TrendingUp,
  PieChart as PieIcon,
  Sliders,
  Target,
  Layers,
  Building,
  Users,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  calculateSimpleCommission,
  calculateTieredCommission,
  calculateRealEstateSplit,
  calculateCommissionGoal,
  TierBracket,
} from "@/lib/calculator-engine/formulas/commission";

export interface SavedCommissionScenario {
  id: string;
  name: string;
  date: string;
  activeTab: "simple" | "tiered" | "realestate" | "goal" | "charts";
  salesPrice: string;
  commRate: string;
  commAmount: string;
  tieredSales: string;
  tieredBase: string;
  tiers: TierBracket[];
  rePrice: string;
  reTotalComm: string;
  reListingShare: string;
  reBuyerShare: string;
  reBrokerSplit: string;
  goalTarget: string;
  goalBase: string;
  goalRate: string;
}

function parseNum(val: string, fallback: number): number {
  if (val !== "" && !isNaN(Number(val))) {
    return Number(val);
  }
  return fallback;
}

export function CommissionCalculator() {
  // Navigation Tabs: 'simple' | 'tiered' | 'realestate' | 'goal' | 'charts'
  const [activeTab, setActiveTab] = useState<
    "simple" | "tiered" | "realestate" | "goal" | "charts"
  >("simple");

  // Tab 1 Inputs: Simple 3-Way Commission Solver ($200,000 @ 3%)
  const [salesPriceInput, setSalesPriceInput] = useState<string>("200000");
  const [commRateInput, setCommRateInput] = useState<string>("3.0");
  const [commAmountInput, setCommAmountInput] = useState<string>("");

  // Tab 2 Inputs: Tiered Brackets Baseline ($27,000 sales)
  const [tieredSalesInput, setTieredSalesInput] = useState<string>("27000");
  const [tieredBaseInput, setTieredBaseInput] = useState<string>("500");
  const [tiers, setTiers] = useState<TierBracket[]>([
    { fromAmount: 0, toAmount: 20000, ratePercent: 3.0 },
    { fromAmount: 20000, toAmount: 25000, ratePercent: 5.0 },
    { fromAmount: 25000, toAmount: null, ratePercent: 10.0 },
  ]);

  // Tab 3 Inputs: Real Estate Split ($500,000 property @ 6%)
  const [rePriceInput, setRePriceInput] = useState<string>("500000");
  const [reTotalCommInput, setReTotalCommInput] = useState<string>("6.0");
  const [reListingShareInput, setReListingShareInput] = useState<string>("50");
  const [reBuyerShareInput, setReBuyerShareInput] = useState<string>("50");
  const [reBrokerSplitInput, setReBrokerSplitInput] = useState<string>("80");

  // Tab 4 Inputs: Target Goal Seek ($10,000 goal @ 5%)
  const [goalTargetInput, setGoalTargetInput] = useState<string>("10000");
  const [goalBaseInput, setGoalBaseInput] = useState<string>("2000");
  const [goalRateInput, setGoalRateInput] = useState<string>("5.0");

  // State Management: Saved Scenarios & Notifications
  const [savedScenarios, setSavedScenarios] = useState<SavedCommissionScenario[]>([]);
  const [scenarioNameInput, setScenarioNameInput] = useState<string>("");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);
  const [shareNotification, setShareNotification] = useState(false);

  // Load Saved Scenarios & URL Query Parameters on Mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_commission_scenarios");
      if (stored) {
        setSavedScenarios(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.has("p")) setSalesPriceInput(params.get("p")!);
      if (params.has("r")) setCommRateInput(params.get("r")!);
      if (params.has("c")) setCommAmountInput(params.get("c")!);
      if (params.has("ts")) setTieredSalesInput(params.get("ts")!);
      if (params.has("tb")) setTieredBaseInput(params.get("tb")!);
      if (params.has("rep")) setRePriceInput(params.get("rep")!);
      if (params.has("rec")) setReTotalCommInput(params.get("rec")!);
      if (params.has("res")) setReBrokerSplitInput(params.get("res")!);
      if (params.has("gt")) setGoalTargetInput(params.get("gt")!);
      if (params.has("gb")) setGoalBaseInput(params.get("gb")!);
      if (params.has("gr")) setGoalRateInput(params.get("gr")!);
      if (params.has("tab")) {
        const t = params.get("tab");
        if (t === "simple" || t === "tiered" || t === "realestate" || t === "goal" || t === "charts") {
          setActiveTab(t);
        }
      }
    }
  }, []);

  // Compute Simple Solver
  const simpleResults = useMemo(() => {
    return calculateSimpleCommission({
      salesPrice: salesPriceInput !== "" ? Number(salesPriceInput) : undefined,
      commissionRate: commRateInput !== "" ? Number(commRateInput) : undefined,
      commissionAmount: commAmountInput !== "" ? Number(commAmountInput) : undefined,
    });
  }, [salesPriceInput, commRateInput, commAmountInput]);

  // Compute Tiered Results
  const tieredResults = useMemo(() => {
    return calculateTieredCommission({
      salesPrice: parseNum(tieredSalesInput, 27000),
      baseSalary: parseNum(tieredBaseInput, 500),
      tiers,
    });
  }, [tieredSalesInput, tieredBaseInput, tiers]);

  // Compute Real Estate Split
  const reResults = useMemo(() => {
    return calculateRealEstateSplit({
      propertyPrice: parseNum(rePriceInput, 500000),
      totalCommissionPercent: parseNum(reTotalCommInput, 6.0),
      listingAgentSharePercent: parseNum(reListingShareInput, 50),
      buyerAgentSharePercent: parseNum(reBuyerShareInput, 50),
      brokerageSplitPercent: parseNum(reBrokerSplitInput, 80),
    });
  }, [rePriceInput, reTotalCommInput, reListingShareInput, reBuyerShareInput, reBrokerSplitInput]);

  // Compute Goal Seek
  const goalResults = useMemo(() => {
    return calculateCommissionGoal({
      targetCommissionGoal: parseNum(goalTargetInput, 10000),
      baseSalary: parseNum(goalBaseInput, 2000),
      commissionRatePercent: parseNum(goalRateInput, 5.0),
    });
  }, [goalTargetInput, goalBaseInput, goalRateInput]);

  const fmt = (val: number) =>
    `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Quick Presets
  const applyPreset = (sales: number, rate: number, type: "simple" | "realestate" | "auto" = "simple") => {
    if (type === "realestate") {
      setRePriceInput(sales.toString());
      setReTotalCommInput(rate.toString());
      setReBrokerSplitInput("80");
      setActiveTab("realestate");
    } else {
      setSalesPriceInput(sales.toString());
      setCommRateInput(rate.toString());
      setCommAmountInput("");
      setActiveTab("simple");
    }
  };

  // Reset to Defaults
  const resetToDefaults = () => {
    setSalesPriceInput("200000");
    setCommRateInput("3.0");
    setCommAmountInput("");
    setTieredSalesInput("27000");
    setTieredBaseInput("500");
    setTiers([
      { fromAmount: 0, toAmount: 20000, ratePercent: 3.0 },
      { fromAmount: 20000, toAmount: 25000, ratePercent: 5.0 },
      { fromAmount: 25000, toAmount: null, ratePercent: 10.0 },
    ]);
    setRePriceInput("500000");
    setReTotalCommInput("6.0");
    setReListingShareInput("50");
    setReBuyerShareInput("50");
    setReBrokerSplitInput("80");
    setGoalTargetInput("10000");
    setGoalBaseInput("2000");
    setGoalRateInput("5.0");
    setActiveTab("simple");
  };

  // Add / Remove Tiers
  const addTier = () => {
    const lastTier = tiers[tiers.length - 1];
    const newFrom = lastTier && lastTier.toAmount !== null ? lastTier.toAmount : 30000;
    setTiers([...tiers, { fromAmount: newFrom, toAmount: null, ratePercent: 12.0 }]);
  };

  const removeTier = (index: number) => {
    if (tiers.length > 1) {
      setTiers(tiers.filter((_, i) => i !== index));
    }
  };

  const updateTier = (index: number, field: keyof TierBracket, value: any) => {
    const updated = [...tiers];
    updated[index] = { ...updated[index], [field]: value };
    setTiers(updated);
  };

  // Save Scenario
  const saveScenario = () => {
    const name = scenarioNameInput.trim() || `Commission Plan #${savedScenarios.length + 1}`;
    const newScenario: SavedCommissionScenario = {
      id: Date.now().toString(),
      name,
      date: new Date().toLocaleDateString(),
      activeTab,
      salesPrice: salesPriceInput,
      commRate: commRateInput,
      commAmount: commAmountInput,
      tieredSales: tieredSalesInput,
      tieredBase: tieredBaseInput,
      tiers: JSON.parse(JSON.stringify(tiers)),
      rePrice: rePriceInput,
      reTotalComm: reTotalCommInput,
      reListingShare: reListingShareInput,
      reBuyerShare: reBuyerShareInput,
      reBrokerSplit: reBrokerSplitInput,
      goalTarget: goalTargetInput,
      goalBase: goalBaseInput,
      goalRate: goalRateInput,
    };

    const updated = [newScenario, ...savedScenarios.slice(0, 7)];
    setSavedScenarios(updated);
    setScenarioNameInput("");
    try {
      localStorage.setItem("saved_commission_scenarios", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Restore Scenario
  const restoreScenario = (sc: SavedCommissionScenario) => {
    setSalesPriceInput(sc.salesPrice);
    setCommRateInput(sc.commRate);
    setCommAmountInput(sc.commAmount);
    setTieredSalesInput(sc.tieredSales);
    setTieredBaseInput(sc.tieredBase);
    if (sc.tiers && sc.tiers.length > 0) setTiers(sc.tiers);
    setRePriceInput(sc.rePrice);
    setReTotalCommInput(sc.reTotalComm);
    setReListingShareInput(sc.reListingShare);
    setReBuyerShareInput(sc.reBuyerShare);
    setReBrokerSplitInput(sc.reBrokerSplit);
    setGoalTargetInput(sc.goalTarget);
    setGoalBaseInput(sc.goalBase);
    setGoalRateInput(sc.goalRate);
    setActiveTab(sc.activeTab);
  };

  // Delete Scenario
  const deleteScenario = (id: string) => {
    const updated = savedScenarios.filter((s) => s.id !== id);
    setSavedScenarios(updated);
    try {
      localStorage.setItem("saved_commission_scenarios", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Copy Summary
  const copySummary = () => {
    const text = `Commission & Sales Compensation Analysis:
------------------------------------------------
1. Simple 3-Way Commission:
   Sales Price: ${fmt(simpleResults.salesPrice)}
   Commission Rate: ${simpleResults.commissionRate}%
   Commission Earned: ${fmt(simpleResults.commissionAmount)}
   Company Net Revenue: ${fmt(simpleResults.companyNetRevenue)}
------------------------------------------------
2. Tiered Compensation ($${tieredSalesInput} Sales):
   Base Salary: ${fmt(tieredResults.baseSalary)}
   Tiered Commission: ${fmt(tieredResults.totalCommission)}
   Total Compensation: ${fmt(tieredResults.totalCompensation)}
   Effective Rate: ${tieredResults.effectiveCommissionRate}%
------------------------------------------------
3. Real Estate Split ($${rePriceInput} Property @ ${reTotalCommInput}%):
   Total Gross Commission: ${fmt(reResults.totalGrossCommission)}
   Listing Agent Net (80%): ${fmt(reResults.listingAgentNet)}
   Buyer Agent Net (80%): ${fmt(reResults.buyerAgentNet)}
   Brokerage Retained: ${fmt(reResults.brokerageTotal)}
------------------------------------------------
4. Target Goal Planner ($${goalTargetInput} Goal):
   Base Salary: ${fmt(goalResults.baseSalary)}
   Commission Needed: ${fmt(goalResults.requiredCommissionEarnings)}
   Required Gross Sales: ${fmt(goalResults.requiredSalesVolume)} @ ${goalRateInput}%
Disclaimer: Educational sales compensation planning model.`;

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
        p: salesPriceInput,
        r: commRateInput,
        c: commAmountInput,
        ts: tieredSalesInput,
        tb: tieredBaseInput,
        rep: rePriceInput,
        rec: reTotalCommInput,
        res: reBrokerSplitInput,
        gt: goalTargetInput,
        gb: goalBaseInput,
        gr: goalRateInput,
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

  // Export CSV Tiered Breakdown
  const exportTieredCSV = () => {
    const headers = [
      "Tier Number",
      "From Amount ($)",
      "To Amount ($)",
      "Tier Rate (%)",
      "Sales In Tier ($)",
      "Commission In Tier ($)",
    ];

    const rows = tieredResults.breakdown.map((r) => [
      r.tierNumber,
      r.fromAmount.toFixed(2),
      r.toAmount !== null ? r.toAmount.toFixed(2) : "Unlimited",
      r.ratePercent.toFixed(2),
      r.tierSales.toFixed(2),
      r.tierCommission.toFixed(2),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `commission_tiered_breakdown_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Donut Data
  const donutData = [
    { name: "Commission Earned", value: simpleResults.commissionAmount, color: "#10b981" },
    { name: "Company Net Revenue", value: simpleResults.companyNetRevenue, color: "#3b82f6" },
  ];

  // Report Modal Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Commission Calculator – Tiered & Sales Compensation Suite",
      reportTitle: "Sales Commission & Compensation Analysis Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      {
        label: "Commission Earned",
        value: fmt(simpleResults.commissionAmount),
        subtitle: `Effective Rate: ${simpleResults.commissionRate}%`,
        colorTheme: "emerald",
      },
      {
        label: "Company Net Revenue",
        value: fmt(simpleResults.companyNetRevenue),
        subtitle: `Gross Sales Price: ${fmt(simpleResults.salesPrice)}`,
        colorTheme: "blue",
      },
      {
        label: "Tiered Total Compensation",
        value: fmt(tieredResults.totalCompensation),
        subtitle: `Base: ${fmt(tieredResults.baseSalary)} + Comm: ${fmt(tieredResults.totalCommission)}`,
        colorTheme: "purple",
      },
    ],
    sections: [
      {
        title: "1. Simple Commission Summary",
        items: [
          { label: "Gross Sales Price", value: fmt(simpleResults.salesPrice) },
          { label: "Commission Rate", value: `${simpleResults.commissionRate}%` },
          { label: "Commission Earned", value: fmt(simpleResults.commissionAmount), highlight: true },
          { label: "Company Net Revenue", value: fmt(simpleResults.companyNetRevenue), highlight: true },
        ],
      },
      {
        title: "2. Tiered Commission Breakdown",
        items: [
          { label: "Sales Volume", value: fmt(tieredResults.salesPrice) },
          { label: "Base Salary", value: fmt(tieredResults.baseSalary) },
          { label: "Tiered Commission", value: fmt(tieredResults.totalCommission), highlight: true },
          { label: "Total Compensation", value: fmt(tieredResults.totalCompensation), highlight: true },
          { label: "Effective Commission Rate", value: `${tieredResults.effectiveCommissionRate}%` },
        ],
      },
      {
        title: "3. Real Estate Split Summary",
        items: [
          { label: "Property Price", value: fmt(reResults.propertyPrice) },
          { label: "Total Gross Commission (6%)", value: fmt(reResults.totalGrossCommission) },
          { label: "Listing Agent Net (80%)", value: fmt(reResults.listingAgentNet), highlight: true },
          { label: "Buyer Agent Net (80%)", value: fmt(reResults.buyerAgentNet), highlight: true },
          { label: "Brokerage Retained Share", value: fmt(reResults.brokerageTotal) },
        ],
      },
      {
        title: "4. Target Goal Seek Summary",
        items: [
          { label: "Target Total Earnings", value: fmt(goalResults.targetCommissionGoal) },
          { label: "Base Salary Offset", value: fmt(goalResults.baseSalary) },
          { label: "Commission Needed", value: fmt(goalResults.requiredCommissionEarnings) },
          { label: "Required Gross Sales Volume", value: fmt(goalResults.requiredSalesVolume), highlight: true },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6" id="commission-calculator-app">
      {/* Top Presets Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 gap-1 text-xs"
          >
            <Briefcase className="h-3.5 w-3.5" /> Commission Engine
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(200000, 3.0, "simple")}
            className="h-6 text-[10px] px-2 cursor-pointer hover:border-indigo-400"
          >
            Calculator.net Baseline ($200k @ 3%)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(500000, 6.0, "realestate")}
            className="h-6 text-[10px] px-2 cursor-pointer hover:border-indigo-400"
          >
            Real Estate Baseline ($500k @ 6%)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(25000, 1.5, "simple")}
            className="h-6 text-[10px] px-2 cursor-pointer hover:border-indigo-400"
          >
            Auto Sales ($25k @ 1.5%)
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>Commission Earned:</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-sans tabular-nums text-sm font-extrabold">
            {fmt(simpleResults.commissionAmount)}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        className="flex flex-wrap border-b border-zinc-200 dark:border-zinc-800 gap-1"
        role="tablist"
        aria-label="Commission Calculator Modes"
      >
        <button
          type="button"
          role="tab"
          id="tab-simple"
          aria-selected={activeTab === "simple"}
          aria-controls="panel-simple"
          onClick={() => setActiveTab("simple")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "simple"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Briefcase className="h-4 w-4 text-emerald-500" /> 1. Simple 3-Way Solver
        </button>
        <button
          type="button"
          role="tab"
          id="tab-tiered"
          aria-selected={activeTab === "tiered"}
          aria-controls="panel-tiered"
          onClick={() => setActiveTab("tiered")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "tiered"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Layers className="h-4 w-4 text-purple-500" /> 2. Tiered &amp; Base Salary
        </button>
        <button
          type="button"
          role="tab"
          id="tab-realestate"
          aria-selected={activeTab === "realestate"}
          aria-controls="panel-realestate"
          onClick={() => setActiveTab("realestate")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "realestate"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Building className="h-4 w-4 text-amber-500" /> 3. Real Estate Splits
        </button>
        <button
          type="button"
          role="tab"
          id="tab-goal"
          aria-selected={activeTab === "goal"}
          aria-controls="panel-goal"
          onClick={() => setActiveTab("goal")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "goal"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Target className="h-4 w-4 text-indigo-500" /> 4. Target Goal Planner
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
          <BarChart3 className="h-4 w-4 text-blue-500" /> Visual Dashboards
        </button>
      </div>

      {/* TAB 1: SIMPLE 3-WAY SOLVER (Calculator.net Baseline 1) */}
      {activeTab === "simple" && (
        <div id="panel-simple" role="tabpanel" aria-labelledby="tab-simple" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <div className="border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Simple 3-Way Commission Solver
                </h3>
                <span className="text-[10px] text-zinc-400">Provide any TWO values to calculate the remaining field:</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label htmlFor="comm-sales-price" className="font-semibold text-zinc-700 dark:text-zinc-300">Sales Price ($)</label>
                  <Input
                    id="comm-sales-price"
                    type="number"
                    value={salesPriceInput}
                    onChange={(e) => setSalesPriceInput(e.target.value)}
                    placeholder="e.g. 200000"
                    className="text-xs font-sans tabular-nums h-9 px-3"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="comm-rate" className="font-semibold text-zinc-700 dark:text-zinc-300">Commission Rate (%)</label>
                    <Input
                      id="comm-rate"
                      type="number"
                      value={commRateInput}
                      onChange={(e) => setCommRateInput(e.target.value)}
                      placeholder="e.g. 3.0"
                      className="text-xs font-sans tabular-nums h-9 px-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="comm-amount" className="font-semibold text-zinc-700 dark:text-zinc-300">Commission Amount ($)</label>
                    <Input
                      id="comm-amount"
                      type="number"
                      value={commAmountInput}
                      onChange={(e) => setCommAmountInput(e.target.value)}
                      placeholder="e.g. 6000"
                      className="text-xs font-sans tabular-nums h-9 px-3"
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
                    placeholder="Scenario Name (e.g. 3% Baseline)"
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
                        localStorage.removeItem("saved_commission_scenarios");
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

          {/* Results Panel (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  COMMISSION EARNED
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

              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-emerald-400 font-sans tabular-nums mb-2">
                {fmt(simpleResults.commissionAmount)}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 font-medium mb-3">
                <span>
                  Company Net Revenue: <span className="font-bold text-blue-300">{fmt(simpleResults.companyNetRevenue)}</span>
                </span>
                <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-indigo-200">
                  Rate: {simpleResults.commissionRate}%
                </span>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Sales Revenue Breakdown
              </h4>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={donutData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TIERED & BASE SALARY (Calculator.net Baseline 2) */}
      {activeTab === "tiered" && (
        <div id="panel-tiered" role="tabpanel" aria-labelledby="tab-tiered" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Graduated Tiered Commission Brackets
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label htmlFor="comm-tiered-sales" className="font-semibold text-zinc-700 dark:text-zinc-300">Sales Price / Volume ($)</label>
                <Input id="comm-tiered-sales" type="number" value={tieredSalesInput} onChange={(e) => setTieredSalesInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label htmlFor="comm-tiered-base" className="font-semibold text-zinc-700 dark:text-zinc-300">Base Salary ($)</label>
                <Input id="comm-tiered-base" type="number" value={tieredBaseInput} onChange={(e) => setTieredBaseInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>

            {/* Dynamic Tier Brackets Builder */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-800 dark:text-zinc-200">Commission Tier Brackets:</span>
                <Button type="button" size="sm" variant="ghost" onClick={addTier} className="h-6 text-[11px] text-indigo-600 cursor-pointer">
                  <Plus className="h-3 w-3 mr-1" /> Add Tier
                </Button>
              </div>

              {tiers.map((tier, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/40 p-2 rounded-lg border text-[11px]">
                  <span className="font-bold w-12 shrink-0">From ${tier.fromAmount}</span>
                  <span className="text-zinc-400">to</span>
                  <Input
                    type="number"
                    value={tier.toAmount !== null ? tier.toAmount : ""}
                    onChange={(e) => updateTier(idx, "toAmount", e.target.value !== "" ? Number(e.target.value) : null)}
                    placeholder="No max"
                    className="w-20 h-7 text-[11px] font-sans tabular-nums px-1.5"
                  />
                  <Input
                    type="number"
                    value={tier.ratePercent}
                    onChange={(e) => updateTier(idx, "ratePercent", Number(e.target.value))}
                    className="w-16 h-7 text-[11px] font-sans tabular-nums px-1.5"
                  />
                  <span className="font-bold">%</span>
                  {tiers.length > 1 && (
                    <button type="button" onClick={() => removeTier(idx)} className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-purple-900 dark:text-purple-200 text-sm block border-b pb-1">
                Tiered Compensation Breakdown ($27k Baseline Match)
              </span>
              <div className="flex justify-between">
                <span>Base Salary:</span>
                <span className="font-bold">{fmt(tieredResults.baseSalary)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tiered Commission Earned:</span>
                <span className="font-bold text-purple-600">{fmt(tieredResults.totalCommission)}</span>
              </div>
              <div className="flex justify-between text-base border-t pt-1 font-extrabold text-indigo-600">
                <span>Total Compensation:</span>
                <span>{fmt(tieredResults.totalCompensation)}</span>
              </div>
              <div className="flex justify-between font-sans text-zinc-600 dark:text-zinc-400">
                <span>Effective Commission Rate:</span>
                <span className="font-bold font-sans tabular-nums">{tieredResults.effectiveCommissionRate}%</span>
              </div>
            </div>

            {/* Tier Breakdown Table */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">Tier Calculation Breakdown</span>
                <Button type="button" size="sm" variant="outline" onClick={exportTieredCSV} className="h-6 text-[10px] cursor-pointer">
                  <Download className="h-3 w-3 mr-1" /> Export CSV
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead className="bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-700 dark:text-zinc-300">
                    <tr>
                      <th className="p-1.5 border-b">Tier</th>
                      <th className="p-1.5 border-b">Bracket Range</th>
                      <th className="p-1.5 border-b text-right">Rate</th>
                      <th className="p-1.5 border-b text-right">Tier Sales</th>
                      <th className="p-1.5 border-b text-right">Commission</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-sans tabular-nums">
                    {tieredResults.breakdown.map((row) => (
                      <tr key={row.tierNumber}>
                        <td className="p-1.5 font-bold">Tier {row.tierNumber}</td>
                        <td className="p-1.5">${row.fromAmount.toLocaleString()} – {row.toAmount !== null ? `$${row.toAmount.toLocaleString()}` : "Above"}</td>
                        <td className="p-1.5 text-right font-bold">{row.ratePercent}%</td>
                        <td className="p-1.5 text-right">{fmt(row.tierSales)}</td>
                        <td className="p-1.5 text-right font-bold text-purple-600">{fmt(row.tierCommission)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REAL ESTATE SPLITS */}
      {activeTab === "realestate" && (
        <div id="panel-realestate" role="tabpanel" aria-labelledby="tab-realestate" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Real Estate Agent &amp; Brokerage Split Calculator
            </h3>

            <div className="space-y-1 text-xs">
              <label htmlFor="comm-re-price" className="font-semibold text-zinc-700 dark:text-zinc-300">Property Sale Price ($)</label>
              <Input id="comm-re-price" type="number" value={rePriceInput} onChange={(e) => setRePriceInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label htmlFor="comm-re-comm" className="font-semibold text-zinc-700 dark:text-zinc-300">Total Commission (%)</label>
                <Input id="comm-re-comm" type="number" value={reTotalCommInput} onChange={(e) => setReTotalCommInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label htmlFor="comm-re-split" className="font-semibold text-zinc-700 dark:text-zinc-300">Brokerage Split (% to Agent)</label>
                <Input id="comm-re-split" type="number" value={reBrokerSplitInput} onChange={(e) => setReBrokerSplitInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-amber-900 dark:text-amber-200 text-sm block border-b pb-1">
                Real Estate Commission Distribution
              </span>
              <div className="flex justify-between">
                <span>Total Gross Commission:</span>
                <span className="font-bold">{fmt(reResults.totalGrossCommission)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Listing Agent Net (80%):</span>
                <span>{fmt(reResults.listingAgentNet)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Buyer Agent Net (80%):</span>
                <span>{fmt(reResults.buyerAgentNet)}</span>
              </div>
              <div className="flex justify-between text-blue-600 border-t pt-1">
                <span>Brokerage Retained Share:</span>
                <span className="font-bold">{fmt(reResults.brokerageTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TARGET GOAL PLANNER */}
      {activeTab === "goal" && (
        <div id="panel-goal" role="tabpanel" aria-labelledby="tab-goal" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Target Commission Goal Seek Planner
            </h3>

            <div className="space-y-1 text-xs">
              <label htmlFor="comm-goal-target" className="font-semibold text-zinc-700 dark:text-zinc-300">Target Total Earnings Goal ($)</label>
              <Input id="comm-goal-target" type="number" value={goalTargetInput} onChange={(e) => setGoalTargetInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label htmlFor="comm-goal-base" className="font-semibold text-zinc-700 dark:text-zinc-300">Base Salary ($)</label>
                <Input id="comm-goal-base" type="number" value={goalBaseInput} onChange={(e) => setGoalBaseInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label htmlFor="comm-goal-rate" className="font-semibold text-zinc-700 dark:text-zinc-300">Commission Rate (%)</label>
                <Input id="comm-goal-rate" type="number" value={goalRateInput} onChange={(e) => setGoalRateInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-indigo-900 dark:text-indigo-200 text-sm block border-b pb-1">
                Required Sales Volume to Hit Goal
              </span>
              <div className="flex justify-between text-base">
                <span>Required Gross Sales Volume:</span>
                <span className="font-extrabold text-indigo-600">{fmt(goalResults.requiredSalesVolume)}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Commission Needed:</span>
                <span className="font-bold">{fmt(goalResults.requiredCommissionEarnings)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: VISUAL DASHBOARDS */}
      {activeTab === "charts" && (
        <div id="panel-charts" role="tabpanel" aria-labelledby="tab-charts" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            Commission vs. Net Company Revenue Comparison
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: "Gross Sales Price", amount: simpleResults.salesPrice, fill: "#3b82f6" },
                { name: "Company Net Revenue", amount: simpleResults.companyNetRevenue, fill: "#6366f1" },
                { name: "Commission Earned", amount: simpleResults.commissionAmount, fill: "#10b981" },
              ]}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v}`} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]} />
                <Bar dataKey="amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />
    </div>
  );
}

export default CommissionCalculator;
