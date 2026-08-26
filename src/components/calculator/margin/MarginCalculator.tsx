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
  PieChart as PieIcon,
  Sliders,
  Target,
  Layers,
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
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Line,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  calculateProfitMargin,
  calculateStockMargin,
  calculateForexMargin,
  generateMarginSensitivityMatrix,
} from "@/lib/calculator-engine/formulas/margin";

export function MarginCalculator() {
  // Navigation Tabs: 'profitMargin' | 'stockMargin' | 'forexMargin' | 'marginCall' | 'sensitivity'
  const [activeTab, setActiveTab] = useState<
    "profitMargin" | "stockMargin" | "forexMargin" | "marginCall" | "sensitivity"
  >("profitMargin");

  // Tab 1 Inputs: Profit Margin Baseline ($120 cost + $160 rev)
  const [costInput, setCostInput] = useState<string>("120");
  const [revenueInput, setRevenueInput] = useState<string>("160");
  const [marginPctInput, setMarginPctInput] = useState<string>("");
  const [profitInput, setProfitInput] = useState<string>("");

  // Tab 2 Inputs: Stock Trading Margin ($18.30, 100 shares, 30% margin req)
  const [stockPriceInput, setStockPriceInput] = useState<string>("18.30");
  const [sharesInput, setSharesInput] = useState<string>("100");
  const [initMarginInput, setInitMarginInput] = useState<string>("30");
  const [maintMarginInput, setMaintMarginInput] = useState<string>("25");

  // Tab 3 Inputs: Forex Margin (Rate 1.30, Ratio 20:1, 100 units)
  const [forexRateInput, setForexRateInput] = useState<string>("1.30");
  const [forexLeverageInput, setForexLeverageInput] = useState<string>("20");
  const [forexUnitsInput, setForexUnitsInput] = useState<string>("100");

  // Modal & Notification State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Compute Profit Margin Results
  const profitResults = useMemo(() => {
    return calculateProfitMargin({
      cost: costInput !== "" ? Number(costInput) : undefined,
      revenue: revenueInput !== "" ? Number(revenueInput) : undefined,
      marginPercent: marginPctInput !== "" ? Number(marginPctInput) : undefined,
      profit: profitInput !== "" ? Number(profitInput) : undefined,
    });
  }, [costInput, revenueInput, marginPctInput, profitInput]);

  // Compute Stock Margin Results
  const stockResults = useMemo(() => {
    return calculateStockMargin({
      stockPrice: Number(stockPriceInput) || 18.30,
      numberOfShares: Number(sharesInput) || 100,
      initialMarginPercent: Number(initMarginInput) || 30,
      maintenanceMarginPercent: Number(maintMarginInput) || 25,
    });
  }, [stockPriceInput, sharesInput, initMarginInput, maintMarginInput]);

  // Compute Forex Margin Results
  const forexResults = useMemo(() => {
    return calculateForexMargin({
      exchangeRate: Number(forexRateInput) || 1.30,
      leverageRatio: Number(forexLeverageInput) || 20,
      units: Number(forexUnitsInput) || 100,
    });
  }, [forexRateInput, forexLeverageInput, forexUnitsInput]);

  // Compute Sensitivity Matrix
  const sensitivityMatrix = useMemo(() => {
    return generateMarginSensitivityMatrix(
      profitResults.cost,
      profitResults.revenue
    );
  }, [profitResults.cost, profitResults.revenue]);

  const fmt = (val: number) =>
    `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Quick Presets
  const applyPreset = (c: number, r: number) => {
    setCostInput(c.toString());
    setRevenueInput(r.toString());
    setMarginPctInput("");
    setProfitInput("");
  };

  // Copy Summary
  const copySummary = () => {
    const text = `Financial Margin Analysis:
------------------------------------------------
Item Cost: ${fmt(profitResults.cost)}
Selling Price (Revenue): ${fmt(profitResults.revenue)}
Dollar Profit: ${fmt(profitResults.profit)}
------------------------------------------------
Gross Profit Margin: ${profitResults.marginPercent}%
Markup Percentage: ${profitResults.markupPercent}%
Stock Deposit Required (100 shares @ $18.30 @ 30% margin): ${fmt(stockResults.requiredDeposit)}`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "Scenario",
      "Cost ($)",
      "Revenue ($)",
      "Dollar Profit ($)",
      "Profit Margin (%)",
      "Markup (%)",
    ];

    const rows = sensitivityMatrix.map((r) => [
      r.scenarioLabel,
      r.cost,
      r.revenue,
      r.profit,
      r.marginPercent,
      r.markupPercent,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `margin_sensitivity_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Donut Chart Data
  const donutData = [
    { name: "Cost", value: profitResults.cost, color: "#3b82f6" },
    { name: "Profit Margin", value: profitResults.profit, color: "#10b981" },
  ];

  // Report Modal Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Margin Calculator Suite",
      reportTitle: "Margin & Leverage Analysis Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      {
        label: "Gross Profit Margin",
        value: `${profitResults.marginPercent}%`,
        subtitle: `Dollar Profit: ${fmt(profitResults.profit)}`,
        colorTheme: "emerald",
      },
      {
        label: "Markup Percentage",
        value: `${profitResults.markupPercent}%`,
        subtitle: `Cost: ${fmt(profitResults.cost)}`,
        colorTheme: "blue",
      },
      {
        label: "Stock Deposit Required",
        value: fmt(stockResults.requiredDeposit),
        subtitle: `Margin Call Price: ${fmt(stockResults.marginCallPrice)}`,
        colorTheme: "purple",
      },
    ],
    sections: [
      {
        title: "Profit Margin & Markup Summary",
        items: [
          { label: "Item Cost", value: fmt(profitResults.cost) },
          { label: "Revenue / Selling Price", value: fmt(profitResults.revenue) },
          { label: "Dollar Profit", value: fmt(profitResults.profit), highlight: true },
          { label: "Gross Profit Margin", value: `${profitResults.marginPercent}%`, highlight: true },
          { label: "Markup Percentage", value: `${profitResults.markupPercent}%` },
        ],
      },
      {
        title: "Stock Margin & Risk Summary",
        items: [
          { label: "Total Position Value", value: fmt(stockResults.totalPositionValue) },
          { label: "Required Cash Deposit", value: fmt(stockResults.requiredDeposit), highlight: true },
          { label: "Borrowed Loan Amount", value: fmt(stockResults.borrowedAmount) },
          { label: "Margin Call Trigger Price", value: fmt(stockResults.marginCallPrice), highlight: true },
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
            <Shield className="h-3.5 w-3.5" /> Margin Solver Suite
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(120, 160)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            Calculator.net Baseline ($120 Cost / $160 Rev)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(50, 100)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            50% Margin ($50 Cost / $100 Rev)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(75, 120)}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            37.5% Margin ($75 Cost / $120 Rev)
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>Gross Margin:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-sans tabular-nums text-sm">
            {profitResults.marginPercent}%
          </span>
        </div>
      </div>

      {/* Navigation Tabs for all 3 reference sub-calculators + Margin Call & Sensitivity */}
      <div className="flex flex-wrap border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("profitMargin")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "profitMargin"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <PieIcon className="h-4 w-4 text-emerald-500" /> 1. Profit Margin &amp; Markup
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("stockMargin")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "stockMargin"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <TrendingUp className="h-4 w-4 text-indigo-500" /> 2. Stock Trading Margin
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("forexMargin")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "forexMargin"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Landmark className="h-4 w-4 text-purple-500" /> 3. Forex Exchange Margin
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("marginCall")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "marginCall"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <AlertTriangle className="h-4 w-4 text-rose-500" /> 4. Margin Call Trigger Solver
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("sensitivity")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "sensitivity"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <BarChart3 className="h-4 w-4 text-blue-500" /> Sensitivity &amp; Dashboards
        </button>
      </div>

      {/* TAB 1: PROFIT MARGIN & MARKUP SOLVER (Calculator.net Sub-Calc 1) */}
      {activeTab === "profitMargin" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <div className="border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Profit Margin Calculator
                </h3>
                <span className="text-[10px] text-zinc-400">Provide any TWO values to calculate the remaining fields:</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Cost ($)</label>
                  <Input
                    type="number"
                    value={costInput}
                    onChange={(e) => setCostInput(e.target.value)}
                    placeholder="e.g. 120"
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Revenue ($)</label>
                  <Input
                    type="number"
                    value={revenueInput}
                    onChange={(e) => setRevenueInput(e.target.value)}
                    placeholder="e.g. 160"
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Margin (%)</label>
                  <Input
                    type="number"
                    value={marginPctInput}
                    onChange={(e) => setMarginPctInput(e.target.value)}
                    placeholder="e.g. 25"
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Profit ($)</label>
                  <Input
                    type="number"
                    value={profitInput}
                    onChange={(e) => setProfitInput(e.target.value)}
                    placeholder="e.g. 40"
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl p-6 shadow-md text-white relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  GROSS PROFIT MARGIN
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

              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-emerald-400 font-sans tabular-nums mb-2">
                {profitResults.marginPercent}%
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 font-medium mb-3">
                <span>
                  Dollar Profit: <span className="font-bold text-white">{fmt(profitResults.profit)}</span>
                </span>
                <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-indigo-200">
                  Markup: {profitResults.markupPercent}%
                </span>
              </div>
            </div>

            {/* Donut Chart matching Calculator.net Cost vs Margin Pie Chart */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Cost vs. Profit Margin Breakdown
              </h4>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
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

      {/* TAB 2: STOCK TRADING MARGIN CALCULATOR (Calculator.net Sub-Calc 2) */}
      {activeTab === "stockMargin" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Stock Trading Margin Calculator
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Stock Price ($)</label>
                <Input type="number" value={stockPriceInput} onChange={(e) => setStockPriceInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Number of Shares</label>
                <Input type="number" value={sharesInput} onChange={(e) => setSharesInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Margin Requirement (%)</label>
                <Input type="number" value={initMarginInput} onChange={(e) => setInitMarginInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Maintenance Margin (%)</label>
                <Input type="number" value={maintMarginInput} onChange={(e) => setMaintMarginInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-indigo-900 dark:text-indigo-200 text-sm block border-b pb-1">
                Stock Margin Requirements
              </span>
              <div className="flex justify-between text-base">
                <span>Amount Required (Deposit):</span>
                <span className="font-extrabold text-indigo-600">{fmt(stockResults.requiredDeposit)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Position Value:</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{fmt(stockResults.totalPositionValue)}</span>
              </div>
              <div className="flex justify-between">
                <span>Borrowed Margin Loan:</span>
                <span className="font-bold text-amber-600">{fmt(stockResults.borrowedAmount)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-rose-600 font-bold">
                <span>Margin Call Price Trigger:</span>
                <span>{fmt(stockResults.marginCallPrice)} (-{stockResults.marginCallLossPercent}%)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CURRENCY EXCHANGE / FOREX MARGIN (Calculator.net Sub-Calc 3) */}
      {activeTab === "forexMargin" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Currency Exchange Margin Calculator
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Exchange Rate</label>
                <Input type="number" step="0.01" value={forexRateInput} onChange={(e) => setForexRateInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Margin Ratio</label>
                <select
                  value={forexLeverageInput}
                  onChange={(e) => setForexLeverageInput(e.target.value)}
                  className="w-full h-8 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-xs"
                >
                  <option value="10">10:1 (10% Margin)</option>
                  <option value="20">20:1 (5% Margin)</option>
                  <option value="50">50:1 (2% Margin)</option>
                  <option value="100">100:1 (1% Margin)</option>
                  <option value="200">200:1 (0.5% Margin)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Units</label>
              <Input type="number" value={forexUnitsInput} onChange={(e) => setForexUnitsInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-purple-900 dark:text-purple-200 text-sm block border-b pb-1">
                Forex Deposit Requirements
              </span>
              <div className="flex justify-between text-base">
                <span>Amount Required:</span>
                <span className="font-extrabold text-purple-600">{forexResults.requiredMarginDeposit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Notional Trade Value:</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">${forexResults.totalNotionalValue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MARGIN CALL TRIGGER SOLVER */}
      {activeTab === "marginCall" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Margin Call Price Trigger &amp; Risk Solver
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Stock Purchase Price ($)</label>
                  <Input type="number" value={stockPriceInput} onChange={(e) => setStockPriceInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Shares Purchased</label>
                  <Input type="number" value={sharesInput} onChange={(e) => setSharesInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
                </div>
              </div>
            </div>

            <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 p-5 rounded-xl space-y-3 font-sans tabular-nums">
              <span className="font-sans font-bold text-rose-900 dark:text-rose-200 text-sm block border-b pb-1">
                Margin Call Price Risk Threshold
              </span>
              <div className="flex justify-between text-base">
                <span>Margin Call Price:</span>
                <span className="font-extrabold text-rose-600">{fmt(stockResults.marginCallPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Max Allowed Decline:</span>
                <span className="font-bold text-amber-600">-{stockResults.marginCallLossPercent}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SENSITIVITY & DASHBOARDS */}
      {activeTab === "sensitivity" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Revenue Price Sensitivity Matrix
            </h3>

            <Button type="button" size="sm" variant="outline" onClick={exportCSV} className="h-8 text-xs cursor-pointer">
              <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <th className="p-2.5">Scenario</th>
                  <th className="p-2.5 text-right">Cost ($)</th>
                  <th className="p-2.5 text-right">Revenue ($)</th>
                  <th className="p-2.5 text-right text-emerald-600">Dollar Profit ($)</th>
                  <th className="p-2.5 text-right text-indigo-600">Profit Margin (%)</th>
                  <th className="p-2.5 text-right text-purple-600">Markup (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px] font-sans tabular-nums">
                {sensitivityMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2.5 font-bold font-sans text-zinc-800 dark:text-zinc-200">{row.scenarioLabel}</td>
                    <td className="p-2.5 text-right">{fmt(row.cost)}</td>
                    <td className="p-2.5 text-right">{fmt(row.revenue)}</td>
                    <td className="p-2.5 text-right text-emerald-600">{fmt(row.profit)}</td>
                    <td className="p-2.5 text-right font-bold text-indigo-600">{row.marginPercent}%</td>
                    <td className="p-2.5 text-right text-purple-600">{row.markupPercent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />
    </div>
  );
}
