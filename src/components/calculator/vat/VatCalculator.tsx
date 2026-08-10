"use client";

import React, { useState, useMemo } from "react";
import {
  Receipt,
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
  BarChart3,
  Layers,
  Search,
  Download,
  FileSpreadsheet,
  Target,
  Zap,
  ShieldCheck,
  Percent,
  Globe,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import { VatContent } from "./VatContent";
import {
  solveVat,
  calculateSupplyChainVat,
  GLOBAL_VAT_PRESETS,
  VatCountryPreset,
} from "@/lib/calculator-engine/formulas/vat";

export function VatCalculator() {
  // Tabs: 'solver' | 'supply_chain' | 'rates_table' | 'compare'
  const [activeTab, setActiveTab] = useState<"solver" | "supply_chain" | "rates_table" | "compare">("solver");

  // 4-Way Solver Inputs
  const [vatRateInput, setVatRateInput] = useState<string>("20");
  const [netPriceInput, setNetPriceInput] = useState<string>("1200");
  const [grossPriceInput, setGrossPriceInput] = useState<string>("");
  const [taxAmountInput, setTaxAmountInput] = useState<string>("");
  const [currencySymbol, setCurrencySymbol] = useState<string>("£");
  const [countrySearch, setCountrySearch] = useState<string>("");

  // Supply Chain Inputs
  const [baseProducerCost, setBaseProducerCost] = useState<number>(10);
  const [manufacturerValueAdd, setManufacturerValueAdd] = useState<number>(15);
  const [wholesalerValueAdd, setWholesalerValueAdd] = useState<number>(15);
  const [retailerValueAdd, setRetailerValueAdd] = useState<number>(20);

  // Modal & Copy State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // 1. Solve 4-Way Universal VAT
  const results = useMemo(() => {
    const rate = vatRateInput !== "" ? Number(vatRateInput) : 0;
    const net = netPriceInput !== "" ? Number(netPriceInput) : 0;
    const gross = grossPriceInput !== "" ? Number(grossPriceInput) : 0;
    const tax = taxAmountInput !== "" ? Number(taxAmountInput) : 0;

    return solveVat({
      vatRate: rate,
      netPrice: net,
      grossPrice: gross,
      taxAmount: tax,
      currencySymbol,
    });
  }, [vatRateInput, netPriceInput, grossPriceInput, taxAmountInput, currencySymbol]);

  // 2. Supply Chain Calculation
  const supplyChainResults = useMemo(
    () =>
      calculateSupplyChainVat(
        results.vatRate,
        baseProducerCost,
        manufacturerValueAdd,
        wholesalerValueAdd,
        retailerValueAdd
      ),
    [results.vatRate, baseProducerCost, manufacturerValueAdd, wholesalerValueAdd, retailerValueAdd]
  );

  const fmt = (val: number) => {
    return `${currencySymbol}${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Quick Preset Selection
  const applyPreset = (preset: VatCountryPreset) => {
    setVatRateInput(String(preset.standardRate));
    setCurrencySymbol(preset.currencySymbol);
  };

  // Clear / Reset Inputs
  const handleReset = () => {
    setVatRateInput("20");
    setNetPriceInput("100");
    setGrossPriceInput("");
    setTaxAmountInput("");
    setCurrencySymbol("£");
  };

  // Filtered Presets Table
  const filteredPresets = useMemo(() => {
    if (!countrySearch.trim()) return GLOBAL_VAT_PRESETS;
    return GLOBAL_VAT_PRESETS.filter(
      (p) =>
        p.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
        p.code.toLowerCase().includes(countrySearch.toLowerCase())
    );
  }, [countrySearch]);

  // Copy Summary
  const copySummary = () => {
    const text = `Value-Added Tax (VAT) Calculation:
------------------------------------------------
VAT Rate: ${results.vatRate}%
Net Base Price: ${fmt(results.netPrice)}
VAT Tax Amount: ${fmt(results.taxAmount)}
Gross Total Price: ${fmt(results.grossPrice)}`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Export CSV
  const exportCSV = () => {
    const headers = ["Metric", "Value"];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ["VAT Rate (%)", `${results.vatRate}%`].join(","),
        ["Net Price (Exclusive)", results.netPrice].join(","),
        ["VAT Tax Amount", results.taxAmount].join(","),
        ["Gross Price (Inclusive)", results.grossPrice].join(","),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vat_calculation_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Donut Chart Data
  const pieData = [
    { name: "Net Base Price", value: results.netPrice, color: "#3b82f6" },
    { name: "VAT Tax Amount", value: results.taxAmount, color: "#10b981" },
  ];

  // Supply Chain Bar Chart Data
  const barData = supplyChainResults.stages.map((s) => ({
    name: s.stageName.split(" ")[1] || s.stageName,
    taxRemitted: s.netVatRemitted,
    valueAdded: s.valueAdded,
  }));

  // Report Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "VAT Tax Calculator",
      reportTitle: "Value-Added Tax (VAT) Calculation Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol,
    },
    keyMetrics: [
      { label: "Gross Total Price", value: fmt(results.grossPrice), subtitle: "VAT Inclusive Price", colorTheme: "emerald" },
      { label: "Net Base Price", value: fmt(results.netPrice), subtitle: "Price Before Tax", colorTheme: "blue" },
      { label: "VAT Tax Amount", value: fmt(results.taxAmount), subtitle: `Effective Rate: ${results.vatRate}%`, colorTheme: "purple" },
    ],
    sections: [
      {
        title: "VAT Computation Summary",
        items: [
          { label: "VAT Tax Rate Applied", value: `${results.vatRate}%` },
          { label: "Net Base Price (Exclusive)", value: fmt(results.netPrice), highlight: true },
          { label: "VAT Tax Amount", value: fmt(results.taxAmount), highlight: true },
          { label: "Gross Total Price (Inclusive)", value: fmt(results.grossPrice), highlight: true },
          { label: "Solved Parameter 1", value: results.solvedField1 },
          { label: "Solved Parameter 2", value: results.solvedField2 },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Top Presets & Currency Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 gap-1 text-xs">
            <Sparkles className="h-3 w-3" /> Universal 4-Way Solver
          </Badge>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg text-xs font-mono">
            {["£", "€", "$", "¥", "₹", "A$"].map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => setCurrencySymbol(curr)}
                className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                  currencySymbol === curr ? "bg-blue-600 text-white shadow-sm" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        {/* Global Country Rate Presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-zinc-500 font-medium mr-1">Global Presets:</span>
          {GLOBAL_VAT_PRESETS.slice(0, 6).map((preset) => (
            <button
              key={preset.code}
              type="button"
              onClick={() => applyPreset(preset)}
              className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 rounded-md transition-colors font-medium cursor-pointer"
            >
              {preset.flag} {preset.code} ({preset.standardRate}%)
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("solver")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "solver"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Receipt className="h-4 w-4" /> Universal 4-Way VAT Solver
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("supply_chain")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "supply_chain"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Globe className="h-4 w-4 text-emerald-500" /> Supply Chain VAT Map
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("rates_table")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "rates_table"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Layers className="h-4 w-4 text-purple-500" /> Global Country Rate Table
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("compare")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "compare"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <BarChart3 className="h-4 w-4 text-amber-500" /> VAT vs. Sales Tax
        </button>
      </div>

      {/* TAB 1: UNIVERSAL 4-WAY VAT SOLVER */}
      {activeTab === "solver" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Input Controls (5 Cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Provide Any 2 Values (Engine Solves Remaining 2)
              </h3>
              <p className="text-[11px] text-zinc-400 mt-1">
                Enter any 2 parameters among VAT Rate, Net Price, Gross Price, or Tax Amount.
              </p>
            </div>

            {/* VAT Rate Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>VAT Rate (%)</span>
                <span className="font-mono text-blue-600">{results.vatRate}%</span>
              </label>
              <Input
                type="number"
                min="0"
                max="100"
                step="0.5"
                placeholder="e.g. 20"
                value={vatRateInput}
                onChange={(e) => setVatRateInput(e.target.value)}
                className="text-xs font-mono"
              />
            </div>

            {/* Net Price Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Net Price (Exclusive of VAT)</span>
                <span className="font-mono text-blue-600">{fmt(results.netPrice)}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">{currencySymbol}</span>
                <Input
                  type="number"
                  min="0"
                  step="10"
                  placeholder="e.g. 100"
                  value={netPriceInput}
                  onChange={(e) => setNetPriceInput(e.target.value)}
                  className="pl-7 text-xs font-mono"
                />
              </div>
            </div>

            {/* Gross Price Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Gross Price (Inclusive of VAT)</span>
                <span className="font-mono text-emerald-600">{fmt(results.grossPrice)}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">{currencySymbol}</span>
                <Input
                  type="number"
                  min="0"
                  step="10"
                  placeholder="e.g. 120"
                  value={grossPriceInput}
                  onChange={(e) => setGrossPriceInput(e.target.value)}
                  className="pl-7 text-xs font-mono"
                />
              </div>
            </div>

            {/* Tax Amount Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>VAT Tax Amount</span>
                <span className="font-mono text-purple-600">{fmt(results.taxAmount)}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">{currencySymbol}</span>
                <Input
                  type="number"
                  min="0"
                  step="5"
                  placeholder="e.g. 20"
                  value={taxAmountInput}
                  onChange={(e) => setTaxAmountInput(e.target.value)}
                  className="pl-7 text-xs font-mono"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <Button
                type="button"
                onClick={() => {
                  const el = document.getElementById("vat-results-dashboard");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                Calculate VAT
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="text-xs font-medium border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" /> Clear
              </Button>
            </div>
          </div>

          {/* Right Results Dashboard (7 Cols) */}
          <div id="vat-results-dashboard" className="lg:col-span-7 space-y-4">
            {/* Primary Highlight Card */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 shadow-md text-white relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  GROSS TOTAL PRICE (VAT INCLUSIVE)
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
                    className="h-7 text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold cursor-pointer"
                  >
                    <Printer className="h-3 w-3 mr-1" /> PDF Report
                  </Button>
                </div>
              </div>

              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono text-white mb-2">
                {fmt(results.grossPrice)}
              </div>

              <div className="text-xs text-white/90 font-medium">
                Solved {results.solvedField1} &amp; {results.solvedField2} based on your input parameters.
              </div>

              {/* Secondary Breakdown */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/10 text-xs">
                <div>
                  <div className="text-zinc-400 text-[11px]">Net Base Price</div>
                  <div className="font-bold font-mono text-white text-sm">{fmt(results.netPrice)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">VAT Tax Amount</div>
                  <div className="font-bold font-mono text-emerald-300 text-sm">{fmt(results.taxAmount)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Effective VAT Rate</div>
                  <div className="font-bold font-mono text-purple-300 text-sm">{results.vatRate}%</div>
                </div>
              </div>
            </div>

            {/* Donut Chart Visualization */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                <span>Net Price vs. VAT Tax Share</span>
                <span className="text-[10px] text-zinc-400">Recharts Visualization</span>
              </h4>

              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4}>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: any) => [`${currencySymbol}${Number(v).toLocaleString()}`, "Amount"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MULTI-STAGE SUPPLY CHAIN VAT MAP */}
      {activeTab === "supply_chain" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Globe className="h-5 w-5 text-emerald-500" /> Multi-Stage Production Supply Chain Map
              </h3>
              <p className="text-xs text-zinc-500">
                Visualize how VAT is collected incrementally at each production stage (Farmer &rarr; Roaster &rarr; Wholesaler &rarr; Cafe).
              </p>
            </div>
          </div>

          {/* Supply Chain Inputs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Producer Cost ({currencySymbol})</label>
              <Input type="number" value={baseProducerCost} onChange={(e) => setBaseProducerCost(Number(e.target.value))} className="text-xs font-mono" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Processor Value Add</label>
              <Input type="number" value={manufacturerValueAdd} onChange={(e) => setManufacturerValueAdd(Number(e.target.value))} className="text-xs font-mono" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Wholesaler Value Add</label>
              <Input type="number" value={wholesalerValueAdd} onChange={(e) => setWholesalerValueAdd(Number(e.target.value))} className="text-xs font-mono" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Retailer Value Add</label>
              <Input type="number" value={retailerValueAdd} onChange={(e) => setRetailerValueAdd(Number(e.target.value))} className="text-xs font-mono" />
            </div>
          </div>

          {/* Stages Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <th className="p-2.5">Supply Chain Stage</th>
                  <th className="p-2.5 text-right">Value Added</th>
                  <th className="p-2.5 text-right">Sale Price (Net)</th>
                  <th className="p-2.5 text-right">Output VAT</th>
                  <th className="p-2.5 text-right">Input Tax Credit</th>
                  <th className="p-2.5 text-right">Net Tax Remitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-mono text-[11px]">
                {supplyChainResults.stages.map((stage, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2.5 font-sans font-bold text-zinc-800 dark:text-zinc-200">{stage.stageName}</td>
                    <td className="p-2.5 text-right">{fmt(stage.valueAdded)}</td>
                    <td className="p-2.5 text-right text-blue-600 font-bold">{fmt(stage.saleNetPrice)}</td>
                    <td className="p-2.5 text-right text-purple-600">{fmt(stage.outputVat)}</td>
                    <td className="p-2.5 text-right text-zinc-400">-{fmt(stage.inputVatCredit)}</td>
                    <td className="p-2.5 text-right text-emerald-600 font-bold">{fmt(stage.netVatRemitted)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Supply Chain Summary & Bar Chart */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 flex flex-wrap justify-between items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Total Value Added</span>
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{fmt(supplyChainResults.totalValueAdded)}</span>
            </div>
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-right">
              <span className="text-blue-100 block text-[10px] uppercase font-semibold">Total Tax Remitted to Govt</span>
              <span className="text-base font-extrabold">{fmt(supplyChainResults.totalVatCollectedByGovt)}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GLOBAL COUNTRY RATE TABLE */}
      {activeTab === "rates_table" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Layers className="h-5 w-5 text-purple-500" /> Searchable Global VAT / GST Rate Directory
            </h3>

            <div className="relative">
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search country..."
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                className="pl-8 pr-3 py-1 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <th className="p-2.5">Country</th>
                  <th className="p-2.5">Code</th>
                  <th className="p-2.5">Standard Rate %</th>
                  <th className="p-2.5">Reduced Rate %</th>
                  <th className="p-2.5">Currency</th>
                  <th className="p-2.5 text-right">Apply Preset</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px]">
                {filteredPresets.map((preset) => (
                  <tr key={preset.code} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2.5 font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                      <span>{preset.flag}</span> <span>{preset.country}</span>
                    </td>
                    <td className="p-2.5 font-mono text-zinc-500">{preset.code}</td>
                    <td className="p-2.5 font-mono font-bold text-blue-600">{preset.standardRate}%</td>
                    <td className="p-2.5 font-mono text-zinc-500">{preset.reducedRate ? `${preset.reducedRate}%` : "—"}</td>
                    <td className="p-2.5 font-mono">{preset.currencySymbol}</td>
                    <td className="p-2.5 text-right">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          applyPreset(preset);
                          setActiveTab("solver");
                        }}
                        className="h-6 text-[10px] px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 cursor-pointer"
                      >
                        Select Rate
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: VAT vs. SALES TAX COMPARISON TOOL */}
      {activeTab === "compare" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-amber-500" /> Interactive VAT vs. Sales Tax Side-by-Side Comparison
              </h3>
              <p className="text-xs text-zinc-500">
                Compare multi-stage Value-Added Tax (with Input Tax Credit) against single-stage Retail Sales Tax across supply chain tiers.
              </p>
            </div>
          </div>

          {/* Side-by-Side Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* VAT Card */}
            <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-blue-900 dark:text-blue-200">Value-Added Tax (VAT)</span>
                <Badge className="bg-blue-600 text-white text-[10px]">Multi-Stage</Badge>
              </div>
              <ul className="text-xs space-y-2 text-zinc-600 dark:text-zinc-300">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Collected incrementally:</strong> Tax paid at every production &amp; distribution stage.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Input Tax Credit (ITC):</strong> Businesses deduct tax paid on purchases, preventing double taxation.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Global Adoption:</strong> Used in over 160 countries including UK, EU, Australia, Japan, UAE.</span>
                </li>
              </ul>
              <div className="pt-3 border-t border-blue-200/60 dark:border-blue-800/60 flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-500">Effective Tax Burden on Consumer</span>
                <span className="font-bold text-blue-700 dark:text-blue-300 text-sm">{results.vatRate}%</span>
              </div>
            </div>

            {/* Sales Tax Card */}
            <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-amber-900 dark:text-amber-200">Retail Sales Tax</span>
                <Badge className="bg-amber-600 text-white text-[10px]">Single-Stage</Badge>
              </div>
              <ul className="text-xs space-y-2 text-zinc-600 dark:text-zinc-300">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Collected at Retail:</strong> Tax is charged only at the final point of purchase by end consumers.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Resale Certificates:</strong> B2B purchases are tax-exempt using reseller exemption certificates.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Primary Adoption:</strong> Standard system used across United States (state/city level).</span>
                </li>
              </ul>
              <div className="pt-3 border-t border-amber-200/60 dark:border-amber-800/60 flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-500">Typical US Sales Tax Range</span>
                <span className="font-bold text-amber-700 dark:text-amber-300 text-sm">4.00% &ndash; 9.50%</span>
              </div>
            </div>
          </div>

          {/* Key Feature Differences Matrix */}
          <div className="overflow-x-auto">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Feature Comparison Matrix</h4>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <th className="p-2.5">Feature / Mechanism</th>
                  <th className="p-2.5">Value-Added Tax (VAT)</th>
                  <th className="p-2.5">Retail Sales Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px]">
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="p-2.5 font-bold text-zinc-800 dark:text-zinc-200">Point of Collection</td>
                  <td className="p-2.5 text-blue-600 font-semibold">All stages (Raw material &rarr; Retail)</td>
                  <td className="p-2.5 text-amber-600 font-semibold">Final retail sale to end consumer only</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="p-2.5 font-bold text-zinc-800 dark:text-zinc-200">Input Tax Offset Mechanism</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">Yes (Input Tax Credit / Reclaim)</td>
                  <td className="p-2.5 text-zinc-400">No (Uses Resale Exemption Certificate)</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="p-2.5 font-bold text-zinc-800 dark:text-zinc-200">Double Taxation Risk</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">None (Prevented by ITC offset)</td>
                  <td className="p-2.5 text-amber-600 font-semibold">High if exemption certificate missing</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="p-2.5 font-bold text-zinc-800 dark:text-zinc-200">Audit &amp; Compliance Trail</td>
                  <td className="p-2.5 text-blue-600 font-semibold">Self-enforcing cross-matching invoices</td>
                  <td className="p-2.5 text-zinc-500">Relies on retail store reporting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />

      {/* Educational Content & 20 FAQs */}
      <VatContent />
    </div>
  );
}
