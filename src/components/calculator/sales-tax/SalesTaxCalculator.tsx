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
  MapPin,
  Building2,
  ShoppingCart,
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
import { SalesTaxContent } from "./SalesTaxContent";
import {
  solveSalesTax,
  calculateReceipt,
  calculateBusinessCollection,
  US_STATE_TAX_DATABASE,
  StateTaxInfo,
  ReceiptItem,
} from "@/lib/calculator-engine/formulas/sales-tax";

export function SalesTaxCalculator() {
  // Tabs: 'solver' | 'receipt' | 'business' | 'states' | 'compare'
  const [activeTab, setActiveTab] = useState<"solver" | "receipt" | "business" | "states" | "compare">("solver");

  // 1. Solver Inputs & Modes
  const [solverMode, setSolverMode] = useState<"A" | "B" | "C" | "D" | "E">("A");
  const [preTaxInput, setPreTaxInput] = useState<string>("100");
  const [taxRateInput, setTaxRateInput] = useState<string>("8.25");
  const [afterTaxInput, setAfterTaxInput] = useState<string>("");
  const [taxAmountInput, setTaxAmountInput] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("Texas");

  // 2. Receipt Builder Inputs
  const [receiptItems, setReceiptItems] = useState<ReceiptItem[]>([
    { id: "1", name: "Laptop Computer", quantity: 1, unitPrice: 899, isTaxable: true },
    { id: "2", name: "Wireless Mouse", quantity: 2, unitPrice: 25, isTaxable: true },
    { id: "3", name: "Prescription Glasses", quantity: 1, unitPrice: 150, isTaxable: false },
  ]);

  // 3. Business Collection Inputs
  const [grossSalesInput, setGrossSalesInput] = useState<string>("10000");

  // 4. What-If Jurisdiction Inputs
  const [stateA, setStateA] = useState<string>("Texas");
  const [stateB, setStateB] = useState<string>("Oregon");
  const [comparePriceInput, setComparePriceInput] = useState<string>("1000");

  // Search & Modal States
  const [stateSearch, setStateSearch] = useState<string>("");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // 1. Solve 5-Way Sales Tax
  const results = useMemo(() => {
    const preTax = preTaxInput !== "" ? Number(preTaxInput) : 0;
    const rate = taxRateInput !== "" ? Number(taxRateInput) : 0;
    const afterTax = afterTaxInput !== "" ? Number(afterTaxInput) : 0;
    const taxAmt = taxAmountInput !== "" ? Number(taxAmountInput) : 0;

    return solveSalesTax({
      preTaxPrice: preTax,
      taxRate: rate,
      afterTaxPrice: afterTax,
      taxAmount: taxAmt,
      mode: solverMode,
    });
  }, [preTaxInput, taxRateInput, afterTaxInput, taxAmountInput, solverMode]);

  // 2. Compute Receipt Totals
  const receiptResults = useMemo(
    () => calculateReceipt(receiptItems, results.taxRate),
    [receiptItems, results.taxRate]
  );

  // 3. Compute Business Collection
  const businessResults = useMemo(
    () => calculateBusinessCollection(Number(grossSalesInput) || 0, results.taxRate),
    [grossSalesInput, results.taxRate]
  );

  // 4. Compute What-If Comparison
  const whatIfResults = useMemo(() => {
    const price = Number(comparePriceInput) || 0;
    const infoA = US_STATE_TAX_DATABASE.find((s) => s.state === stateA) || US_STATE_TAX_DATABASE[44]; // TX
    const infoB = US_STATE_TAX_DATABASE.find((s) => s.state === stateB) || US_STATE_TAX_DATABASE[37]; // OR

    const taxA = price * (infoA.stateRate / 100);
    const totalA = price + taxA;

    const taxB = price * (infoB.stateRate / 100);
    const totalB = price + taxB;

    const savings = Math.abs(totalA - totalB);

    return {
      infoA,
      infoB,
      price,
      taxA: Number(taxA.toFixed(2)),
      totalA: Number(totalA.toFixed(2)),
      taxB: Number(taxB.toFixed(2)),
      totalB: Number(totalB.toFixed(2)),
      savings: Number(savings.toFixed(2)),
      cheaperState: totalA <= totalB ? infoA.state : infoB.state,
    };
  }, [stateA, stateB, comparePriceInput]);

  const fmt = (val: number) => `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Apply State Selection
  const handleStateSelect = (stateName: string) => {
    setSelectedState(stateName);
    const match = US_STATE_TAX_DATABASE.find((s) => s.state === stateName);
    if (match) {
      setTaxRateInput(String(match.stateRate));
    }
  };

  // Receipt Helpers
  const addReceiptItem = () => {
    setReceiptItems([
      ...receiptItems,
      { id: Date.now().toString(), name: `Item ${receiptItems.length + 1}`, quantity: 1, unitPrice: 50, isTaxable: true },
    ]);
  };

  const removeReceiptItem = (id: string) => {
    setReceiptItems(receiptItems.filter((i) => i.id !== id));
  };

  const updateReceiptItem = (id: string, field: keyof ReceiptItem, value: any) => {
    setReceiptItems(receiptItems.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  // Reset
  const handleReset = () => {
    setSolverMode("A");
    setPreTaxInput("100");
    setTaxRateInput("8.25");
    setAfterTaxInput("");
    setTaxAmountInput("");
    setSelectedState("Texas");
  };

  // Filtered States Table
  const filteredStates = useMemo(() => {
    if (!stateSearch.trim()) return US_STATE_TAX_DATABASE;
    return US_STATE_TAX_DATABASE.filter(
      (s) =>
        s.state.toLowerCase().includes(stateSearch.toLowerCase()) ||
        s.code.toLowerCase().includes(stateSearch.toLowerCase())
    );
  }, [stateSearch]);

  // Copy Summary
  const copySummary = () => {
    const text = `Sales Tax Calculation Summary:
------------------------------------------------
Pre-Tax Base Price: ${fmt(results.preTaxPrice)}
Sales Tax Rate: ${results.taxRate}% (${selectedState})
Sales Tax Amount: ${fmt(results.taxAmount)}
Final Total Price: ${fmt(results.afterTaxPrice)}`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Export Receipt CSV
  const exportReceiptCSV = () => {
    const headers = ["Item Name", "Qty", "Unit Price", "Taxable", "Line Subtotal", "Line Tax", "Line Total"];
    const rows = receiptResults.items.map((i) => [
      `"${i.name}"`,
      i.quantity,
      i.unitPrice,
      i.isTaxable ? "Yes" : "No",
      i.lineSubtotal,
      i.lineTax,
      i.lineTotal,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ...rows.map((r) => r.join(",")),
        ["Subtotal", "", "", "", receiptResults.subtotal, "", ""].join(","),
        ["Sales Tax", "", "", "", receiptResults.totalTax, "", ""].join(","),
        ["Grand Total", "", "", "", receiptResults.grandTotal, "", ""].join(","),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `receipt_sales_tax_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Donut Chart Data
  const pieData = [
    { name: "Pre-Tax Base Price", value: results.preTaxPrice, color: "#3b82f6" },
    { name: "Sales Tax Amount", value: results.taxAmount, color: "#10b981" },
  ];

  // Bar Chart Data (Top 8 States vs Selected)
  const topStatesBarData = US_STATE_TAX_DATABASE.slice(0, 8).map((s) => ({
    name: s.code,
    stateRate: s.stateRate,
    avgLocalRate: s.avgLocalRate,
  }));

  // Report Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Sales Tax Calculator Suite",
      reportTitle: "U.S. Sales Tax Computation Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      { label: "Final Total Price", value: fmt(results.afterTaxPrice), subtitle: "Includes Sales Tax", colorTheme: "emerald" },
      { label: "Pre-Tax Base Price", value: fmt(results.preTaxPrice), subtitle: "Retail Price Before Tax", colorTheme: "blue" },
      { label: "Sales Tax Amount", value: fmt(results.taxAmount), subtitle: `Tax Rate: ${results.taxRate}%`, colorTheme: "purple" },
    ],
    sections: [
      {
        title: "Sales Tax Computation Summary",
        items: [
          { label: "Selected State Jurisdiction", value: selectedState },
          { label: "Tax Rate Applied", value: `${results.taxRate}%` },
          { label: "Pre-Tax Price (Base)", value: fmt(results.preTaxPrice), highlight: true },
          { label: "Sales Tax Amount", value: fmt(results.taxAmount), highlight: true },
          { label: "Final Price (After Tax)", value: fmt(results.afterTaxPrice), highlight: true },
          { label: "Active Calculation Mode", value: `Mode ${results.activeMode}` },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Top State Presets Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 gap-1 text-xs">
            <Sparkles className="h-3 w-3" /> 5-Way Solver (Modes A &ndash; E)
          </Badge>

          {/* State Quick Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <label className="font-semibold text-zinc-600 dark:text-zinc-400">Select State Rate:</label>
            <select
              value={selectedState}
              onChange={(e) => handleStateSelect(e.target.value)}
              className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-md px-2 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              {US_STATE_TAX_DATABASE.map((s) => (
                <option key={s.code} value={s.state}>
                  {s.state} ({s.stateRate}%)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Popular States Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-zinc-500 font-medium mr-1">Popular:</span>
          {["California", "Texas", "Florida", "New York", "Washington", "Oregon"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => handleStateSelect(st)}
              className={`px-2.5 py-1 rounded-md transition-colors font-medium cursor-pointer ${
                selectedState === st
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {st}
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
          <Receipt className="h-4 w-4" /> 5-Way Sales Tax Solver
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("receipt")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "receipt"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <ShoppingCart className="h-4 w-4 text-emerald-500" /> Multi-Item Receipt Builder
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("business")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "business"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Building2 className="h-4 w-4 text-indigo-500" /> Business Tax Collection
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("states")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "states"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <MapPin className="h-4 w-4 text-purple-500" /> 50 US States Tax Directory
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
          <BarChart3 className="h-4 w-4 text-amber-500" /> What-If State Comparison
        </button>
      </div>

      {/* TAB 1: 5-WAY SALES TAX SOLVER */}
      {activeTab === "solver" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Inputs & Mode Buttons (5 Cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                Choose Calculation Mode &amp; Fill Known Fields
              </h3>
            </div>

            {/* Mode Pills */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-zinc-500 uppercase">Solver Directions:</label>
              <div className="grid grid-cols-5 gap-1 text-[10px] font-bold">
                {[
                  { id: "A", label: "Mode A", desc: "Pre-Tax + Rate" },
                  { id: "B", label: "Mode B", desc: "Final + Rate" },
                  { id: "C", label: "Mode C", desc: "Pre-Tax + Final" },
                  { id: "D", label: "Mode D", desc: "Tax + Rate" },
                  { id: "E", label: "Mode E", desc: "Tax + Pre-Tax" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSolverMode(m.id as any)}
                    className={`py-1.5 rounded text-center transition-all cursor-pointer ${
                      solverMode === m.id
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pre-Tax Price Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Pre-Tax Price ($)</span>
                <span className="font-mono text-blue-600">{fmt(results.preTaxPrice)}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">$</span>
                <Input
                  type="number"
                  min="0"
                  step="10"
                  placeholder="e.g. 100"
                  value={preTaxInput}
                  onChange={(e) => setPreTaxInput(e.target.value)}
                  className="pl-7 text-xs font-mono"
                />
              </div>
            </div>

            {/* Sales Tax Rate Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Sales Tax Rate (%)</span>
                <span className="font-mono text-purple-600">{results.taxRate}%</span>
              </label>
              <Input
                type="number"
                min="0"
                max="100"
                step="0.125"
                placeholder="e.g. 8.25"
                value={taxRateInput}
                onChange={(e) => setTaxRateInput(e.target.value)}
                className="text-xs font-mono"
              />
            </div>

            {/* Final Price Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Final Price (After Tax)</span>
                <span className="font-mono text-emerald-600">{fmt(results.afterTaxPrice)}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">$</span>
                <Input
                  type="number"
                  min="0"
                  step="10"
                  placeholder="e.g. 108.25"
                  value={afterTaxInput}
                  onChange={(e) => setAfterTaxInput(e.target.value)}
                  className="pl-7 text-xs font-mono"
                />
              </div>
            </div>

            {/* Tax Amount Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Sales Tax Amount ($)</span>
                <span className="font-mono text-emerald-600">{fmt(results.taxAmount)}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">$</span>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g. 8.25"
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
                  const el = document.getElementById("sales-tax-results-dashboard");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                Calculate Tax
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
          <div id="sales-tax-results-dashboard" className="lg:col-span-7 space-y-4">
            {/* Primary Result Card */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 shadow-md text-white relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  FINAL TOTAL PRICE (AFTER TAX)
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
                {fmt(results.afterTaxPrice)}
              </div>

              <div className="text-xs text-white/90 font-medium">
                Solved {results.solvedField1} &amp; {results.solvedField2} under Mode {results.activeMode}.
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/10 text-xs">
                <div>
                  <div className="text-zinc-400 text-[11px]">Pre-Tax Base Price</div>
                  <div className="font-bold font-mono text-white text-sm">{fmt(results.preTaxPrice)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Sales Tax Amount</div>
                  <div className="font-bold font-mono text-emerald-300 text-sm">{fmt(results.taxAmount)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Applied Tax Rate</div>
                  <div className="font-bold font-mono text-purple-300 text-sm">{results.taxRate}%</div>
                </div>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                <span>Base Price vs. Sales Tax Breakdown</span>
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
                    <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, "Amount"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MULTI-ITEM RECEIPT BUILDER */}
      {activeTab === "receipt" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-emerald-500" /> Multi-Item Sales Receipt &amp; Invoice Builder
              </h3>
              <p className="text-xs text-zinc-500">
                Add multiple product items, toggle taxable/exempt status, and calculate subtotal, sales tax, and grand total.
              </p>
            </div>
            <div className="flex gap-2">
              <Button type="button" size="sm" onClick={addReceiptItem} className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Line Item
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={exportReceiptCSV} className="h-8 text-xs cursor-pointer">
                <Download className="h-3.5 w-3.5 mr-1" /> Export CSV
              </Button>
            </div>
          </div>

          {/* Receipt Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <th className="p-2.5">Item Description</th>
                  <th className="p-2.5 w-20">Qty</th>
                  <th className="p-2.5 w-28">Unit Price ($)</th>
                  <th className="p-2.5 w-28">Taxable?</th>
                  <th className="p-2.5 text-right">Line Subtotal</th>
                  <th className="p-2.5 text-right">Line Tax</th>
                  <th className="p-2.5 text-right">Line Total</th>
                  <th className="p-2.5 w-10 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-mono text-[11px]">
                {receiptResults.items.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2">
                      <Input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateReceiptItem(item.id, "name", e.target.value)}
                        className="text-xs h-7 font-sans"
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateReceiptItem(item.id, "quantity", Number(e.target.value))}
                        className="text-xs h-7 font-mono"
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        min="0"
                        value={item.unitPrice}
                        onChange={(e) => updateReceiptItem(item.id, "unitPrice", Number(e.target.value))}
                        className="text-xs h-7 font-mono"
                      />
                    </td>
                    <td className="p-2">
                      <button
                        type="button"
                        onClick={() => updateReceiptItem(item.id, "isTaxable", !item.isTaxable)}
                        className={`w-full py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${
                          item.isTaxable ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}
                      >
                        {item.isTaxable ? "Taxable" : "Exempt"}
                      </button>
                    </td>
                    <td className="p-2 text-right">{fmt(item.lineSubtotal)}</td>
                    <td className="p-2 text-right text-purple-600">{fmt(item.lineTax)}</td>
                    <td className="p-2 text-right font-bold text-zinc-900 dark:text-zinc-100">{fmt(item.lineTotal)}</td>
                    <td className="p-2 text-center">
                      <button type="button" onClick={() => removeReceiptItem(item.id)} className="text-red-500 hover:text-red-700 p-1 cursor-pointer">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Receipt Totals Summary Box */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 flex flex-wrap justify-between items-center gap-4 text-xs font-mono">
            <div className="space-y-1">
              <div><span className="text-zinc-400">Subtotal:</span> <span className="font-bold">{fmt(receiptResults.subtotal)}</span></div>
              <div><span className="text-zinc-400">Taxable Subtotal:</span> <span className="font-bold text-blue-600">{fmt(receiptResults.taxableSubtotal)}</span></div>
              <div><span className="text-zinc-400">Exempt Subtotal:</span> <span className="font-bold text-zinc-500">{fmt(receiptResults.exemptSubtotal)}</span></div>
            </div>
            <div className="bg-blue-600 text-white px-5 py-3 rounded-xl text-right">
              <span className="text-blue-100 block text-[10px] uppercase font-semibold">Total Sales Tax ({results.taxRate}%)</span>
              <span className="text-sm font-bold block">{fmt(receiptResults.totalTax)}</span>
              <span className="text-blue-100 block text-[10px] uppercase font-semibold mt-1">Receipt Grand Total</span>
              <span className="text-xl font-extrabold">{fmt(receiptResults.grandTotal)}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BUSINESS TAX COLLECTION SOLVER */}
      {activeTab === "business" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-indigo-500" /> Business Sales Tax Revenue &amp; Collection Solver
              </h3>
              <p className="text-xs text-zinc-500">
                Extract net sales revenue and tax collected payable to state authorities from gross cash receipts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Gross Sales Revenue Collected ($)
                </label>
                <Input
                  type="number"
                  min="0"
                  step="500"
                  value={grossSalesInput}
                  onChange={(e) => setGrossSalesInput(e.target.value)}
                  className="text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Sales Tax Rate Applied (%)
                </label>
                <Input
                  type="number"
                  value={results.taxRate}
                  onChange={(e) => setTaxRateInput(e.target.value)}
                  className="text-xs font-mono"
                />
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 p-5 rounded-xl space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Gross Collected Revenue:</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{fmt(businessResults.grossSalesRevenue)}</span>
              </div>
              <div className="flex justify-between text-blue-600 dark:text-blue-400">
                <span>Net Sales Revenue (Business Retained):</span>
                <span className="font-bold">{fmt(businessResults.netSalesRevenue)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 border-t border-indigo-200 dark:border-indigo-800 pt-2 font-bold text-sm">
                <span>Sales Tax Payable to State:</span>
                <span>{fmt(businessResults.taxCollected)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: US 50 STATES TAX DIRECTORY */}
      {activeTab === "states" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-500" /> Searchable 50 U.S. States Sales Tax Directory
            </h3>

            <div className="relative">
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search state..."
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                className="pl-8 pr-3 py-1 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <th className="p-2.5">State</th>
                  <th className="p-2.5">Code</th>
                  <th className="p-2.5">State Rate %</th>
                  <th className="p-2.5">Avg Local Rate %</th>
                  <th className="p-2.5">Max Combined %</th>
                  <th className="p-2.5">Groceries Exempt?</th>
                  <th className="p-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px]">
                {filteredStates.map((s) => (
                  <tr key={s.code} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2.5 font-bold text-zinc-800 dark:text-zinc-200">{s.state}</td>
                    <td className="p-2.5 font-mono text-zinc-500">{s.code}</td>
                    <td className="p-2.5 font-mono font-bold text-blue-600">{s.stateRate}%</td>
                    <td className="p-2.5 font-mono text-zinc-500">{s.avgLocalRate}%</td>
                    <td className="p-2.5 font-mono text-purple-600">{s.maxCombinedRate}%</td>
                    <td className="p-2.5">
                      {s.groceryExempt ? (
                        <span className="text-emerald-600 font-bold">Yes</span>
                      ) : (
                        <span className="text-zinc-400">No</span>
                      )}
                    </td>
                    <td className="p-2.5 text-right">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          handleStateSelect(s.state);
                          setActiveTab("solver");
                        }}
                        className="h-6 text-[10px] px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 cursor-pointer"
                      >
                        Select
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: WHAT-IF STATE COMPARISON */}
      {activeTab === "compare" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-amber-500" /> What-If State Sales Tax Savings Comparison
              </h3>
              <p className="text-xs text-zinc-500">
                Compare total tax costs between two different state jurisdictions for major purchases.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Purchase Price ($)</label>
              <Input type="number" value={comparePriceInput} onChange={(e) => setComparePriceInput(e.target.value)} className="text-xs font-mono" />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">State A Jurisdiction</label>
              <select
                value={stateA}
                onChange={(e) => setStateA(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md p-2 text-xs font-medium cursor-pointer"
              >
                {US_STATE_TAX_DATABASE.map((s) => (
                  <option key={s.code} value={s.state}>
                    {s.state} ({s.stateRate}%)
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">State B Jurisdiction</label>
              <select
                value={stateB}
                onChange={(e) => setStateB(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md p-2 text-xs font-medium cursor-pointer"
              >
                {US_STATE_TAX_DATABASE.map((s) => (
                  <option key={s.code} value={s.state}>
                    {s.state} ({s.stateRate}%)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-5 rounded-xl space-y-2">
              <span className="font-bold font-sans text-blue-900 dark:text-blue-200 text-sm block">
                {whatIfResults.infoA.state} ({whatIfResults.infoA.stateRate}%)
              </span>
              <div>Pre-Tax Price: {fmt(whatIfResults.price)}</div>
              <div className="text-purple-600">Sales Tax: {fmt(whatIfResults.taxA)}</div>
              <div className="text-blue-700 font-bold text-sm pt-1 border-t border-blue-200">Total: {fmt(whatIfResults.totalA)}</div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-5 rounded-xl space-y-2">
              <span className="font-bold font-sans text-emerald-900 dark:text-emerald-200 text-sm block">
                {whatIfResults.infoB.state} ({whatIfResults.infoB.stateRate}%)
              </span>
              <div>Pre-Tax Price: {fmt(whatIfResults.price)}</div>
              <div className="text-purple-600">Sales Tax: {fmt(whatIfResults.taxB)}</div>
              <div className="text-emerald-700 font-bold text-sm pt-1 border-t border-emerald-200">Total: {fmt(whatIfResults.totalB)}</div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-xl text-xs flex justify-between items-center font-mono">
            <span>Potential Tax Savings in {whatIfResults.cheaperState}:</span>
            <span className="font-extrabold text-amber-700 dark:text-amber-300 text-base">{fmt(whatIfResults.savings)}</span>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />

      {/* Educational Content & 20 FAQs */}
      <SalesTaxContent />
    </div>
  );
}
