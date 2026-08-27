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
  Plus,
  Trash2,
  Building,
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
import {
  calculateSingleGst,
  calculateMultiItemInvoice,
  calculateCompositionScheme,
  GstCalculationType,
  SupplyType,
  GstInvoiceItem,
} from "@/lib/calculator-engine/formulas/gst";

export function GstCalculator() {
  // Tabs: 'single' | 'multi' | 'supply' | 'composition'
  const [activeTab, setActiveTab] = useState<"single" | "multi" | "supply" | "composition">("single");

  // Single Item State (3-way sync)
  const [amountInput, setAmountInput] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [calculationType, setCalculationType] = useState<GstCalculationType>("exclusive");
  const [supplyType, setSupplyType] = useState<SupplyType>("intra_state");
  const [cessRate, setCessRate] = useState<number>(0);

  // Multi-Item Invoice State
  const [invoiceItems, setInvoiceItems] = useState<GstInvoiceItem[]>([
    { id: "1", name: "IT Services / Consulting", quantity: 1, unitPrice: 25000, gstRate: 18, cessRate: 0 },
    { id: "2", name: "Office Hardware / PC", quantity: 2, unitPrice: 15000, gstRate: 12, cessRate: 0 },
    { id: "3", name: "Executive Leather Goods", quantity: 1, unitPrice: 5000, gstRate: 28, cessRate: 12 },
  ]);

  // Composition Scheme State
  const [annualTurnover, setAnnualTurnover] = useState<number>(5000000); // ₹50 Lakhs
  const [businessType, setBusinessType] = useState<"trader" | "manufacturer" | "restaurant" | "service">("trader");
  const [totalPurchases, setTotalPurchases] = useState<number>(3000000); // ₹30 Lakhs

  // Modal & Copy State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Quick Preset GST Slabs
  const presetRates = [
    { label: "0% (NIL)", value: 0 },
    { label: "0.25% (Diamonds)", value: 0.25 },
    { label: "3% (Gold)", value: 3 },
    { label: "5% (Basic)", value: 5 },
    { label: "12% (Electronics)", value: 12 },
    { label: "18% (Standard)", value: 18 },
    { label: "28% (Luxury)", value: 28 },
  ];

  // 1. Single Item Calculation
  const singleResults = useMemo(
    () =>
      calculateSingleGst({
        amount: amountInput,
        gstRate,
        calculationType,
        supplyType,
        cessRate,
      }),
    [amountInput, gstRate, calculationType, supplyType, cessRate]
  );

  // 2. Multi-Item Invoice Calculation
  const multiInvoiceResults = useMemo(
    () => calculateMultiItemInvoice(invoiceItems, supplyType),
    [invoiceItems, supplyType]
  );

  // 3. Composition Scheme Calculation
  const compositionResults = useMemo(
    () =>
      calculateCompositionScheme({
        annualTurnover,
        businessType,
        totalPurchases,
        averageInputGstRate: 18,
      }),
    [annualTurnover, businessType, totalPurchases]
  );

  const fmt = (val: number) => {
    return `₹${val.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Add Item to Multi-Item Invoice
  const addInvoiceItem = () => {
    const newItem: GstInvoiceItem = {
      id: String(Date.now()),
      name: `Line Item ${invoiceItems.length + 1}`,
      quantity: 1,
      unitPrice: 1000,
      gstRate: 18,
      cessRate: 0,
    };
    setInvoiceItems([...invoiceItems, newItem]);
  };

  // Remove Item from Invoice
  const removeInvoiceItem = (id: string) => {
    if (invoiceItems.length === 1) return;
    setInvoiceItems(invoiceItems.filter((i) => i.id !== id));
  };

  // Update Item in Invoice
  const updateInvoiceItem = (id: string, field: keyof GstInvoiceItem, val: any) => {
    setInvoiceItems(
      invoiceItems.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: val };
        }
        return item;
      })
    );
  };

  // Reset Single Item Inputs
  const handleReset = () => {
    setAmountInput(10000);
    setGstRate(18);
    setCalculationType("exclusive");
    setSupplyType("intra_state");
    setCessRate(0);
  };

  // Copy Summary
  const copySummary = () => {
    const text = `GST Tax Breakdown:
------------------------------------------------
GST Calculation Mode: ${calculationType.toUpperCase()}
Supply Location: ${supplyType === "intra_state" ? "Intra-State (CGST + SGST)" : "Inter-State (IGST)"}
Net Base Amount: ${fmt(singleResults.netAmount)}
GST Tax Amount (${singleResults.effectiveGstRate}%): ${fmt(singleResults.gstAmount)}
${supplyType === "intra_state" ? `CGST (50%): ${fmt(singleResults.cgstAmount)}\nSGST (50%): ${fmt(singleResults.sgstAmount)}` : `IGST (100%): ${fmt(singleResults.igstAmount)}`}
${singleResults.cessAmount > 0 ? `Compensation Cess (${singleResults.cessRate}%): ${fmt(singleResults.cessAmount)}\n` : ""}Final Invoice Total: ${fmt(singleResults.grandTotalWithCess)}`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Export Invoice CSV
  const exportInvoiceCSV = () => {
    const headers = ["Item Name", "Qty", "Unit Price (₹)", "GST Rate (%)", "Net Total (₹)", "GST Total (₹)", "Grand Total (₹)"];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ...multiInvoiceResults.items.map((i) =>
          [`"${i.name}"`, i.quantity, i.unitPrice, `${i.gstRate}%`, i.netTotal, i.gstTotal, i.grandTotal].join(",")
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gst_tax_invoice_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Donut Chart Data
  const pieData = [
    { name: "Net Base Value", value: singleResults.netAmount, color: "#3b82f6" },
    { name: "GST Tax Amount", value: singleResults.gstAmount, color: "#10b981" },
    ...(singleResults.cessAmount > 0 ? [{ name: "Compensation Cess", value: singleResults.cessAmount, color: "#f59e0b" }] : []),
  ];

  // Bar Chart Data (Tax Split)
  const barData =
    supplyType === "intra_state"
      ? [
          { name: "CGST (Central)", amount: singleResults.cgstAmount, fill: "#8b5cf6" },
          { name: "SGST (State)", amount: singleResults.sgstAmount, fill: "#ec4899" },
        ]
      : [{ name: "IGST (Integrated)", amount: singleResults.igstAmount, fill: "#3b82f6" }];

  // Report Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "GST Tax Calculator",
      reportTitle: "Goods & Services Tax (GST) Invoice Analysis",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "₹",
    },
    keyMetrics: [
      { label: "Final Invoice Amount", value: fmt(singleResults.grandTotalWithCess), subtitle: "Tax Inclusive Total", colorTheme: "emerald" },
      { label: "Net Taxable Base", value: fmt(singleResults.netAmount), subtitle: "Base Price Before Tax", colorTheme: "blue" },
      { label: "Total GST Amount", value: fmt(singleResults.gstAmount), subtitle: `Effective GST Rate: ${singleResults.effectiveGstRate}%`, colorTheme: "purple" },
    ],
    sections: [
      {
        title: "GST Tax Breakdown & Supply Details",
        items: [
          { label: "Calculation Mode", value: calculationType.toUpperCase() },
          { label: "Supply Type", value: supplyType === "intra_state" ? "Intra-State (CGST + SGST)" : "Inter-State (IGST)" },
          { label: "Net Base Amount", value: fmt(singleResults.netAmount), highlight: true },
          { label: "GST Rate Applied", value: `${singleResults.effectiveGstRate}%` },
          { label: "CGST (Central Tax)", value: fmt(singleResults.cgstAmount) },
          { label: "SGST (State Tax)", value: fmt(singleResults.sgstAmount) },
          { label: "IGST (Integrated Tax)", value: fmt(singleResults.igstAmount) },
          { label: "Grand Total Invoice Value", value: fmt(singleResults.grandTotalWithCess), highlight: true },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Quick GST Rate Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 gap-1 text-xs">
            <Sparkles className="h-3 w-3" /> Indian GST Engine 2026
          </Badge>
          <span className="text-xs text-zinc-500 font-semibold">Select GST Rate Slab:</span>
        </div>

        {/* GST Rate Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {presetRates.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => setGstRate(preset.value)}
              className={`px-2.5 py-1 rounded-md transition-all font-semibold cursor-pointer ${
                gstRate === preset.value
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("single")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "single"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Receipt className="h-4 w-4" /> Single Item GST Calculator
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("multi")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "multi"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Layers className="h-4 w-4 text-emerald-500" /> Multi-Item Tax Invoice Builder
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("supply")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "supply"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <BarChart3 className="h-4 w-4 text-purple-500" /> CGST, SGST & IGST Split
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("composition")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "composition"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Building className="h-4 w-4 text-amber-500" /> Composition Scheme Solver
        </button>
      </div>

      {/* TAB 1: SINGLE ITEM GST CALCULATOR */}
      {activeTab === "single" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Input Controls (5 Cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              GST Calculation Parameters
            </h3>

            {/* Calculation Mode Selector */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">GST Tax Calculation Mode</label>
              <div className="grid grid-cols-3 gap-1.5 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setCalculationType("exclusive")}
                  className={`py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                    calculationType === "exclusive"
                      ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Exclusive
                </button>
                <button
                  type="button"
                  onClick={() => setCalculationType("inclusive")}
                  className={`py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                    calculationType === "inclusive"
                      ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Inclusive
                </button>
                <button
                  type="button"
                  onClick={() => setCalculationType("reverse_tax")}
                  className={`py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                    calculationType === "reverse_tax"
                      ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Reverse
                </button>
              </div>
            </div>

            {/* Transaction Amount Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>
                  {calculationType === "inclusive"
                    ? "Amount with GST (Gross Total)"
                    : calculationType === "reverse_tax"
                    ? "GST Tax Amount Paid"
                    : "Amount without GST (Net Base)"}
                </span>
                <span className="font-sans tabular-nums text-blue-600">{fmt(amountInput)}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">₹</span>
                <Input
                  type="number"
                  min="0"
                  step="500"
                  value={amountInput}
                  onChange={(e) => setAmountInput(Math.max(0, Number(e.target.value)))}
                  className="pl-7 text-xs font-sans tabular-nums"
                />
              </div>
            </div>

            {/* Custom GST Rate Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <span>GST Tax Rate (%)</span>
                <span className="font-sans tabular-nums text-emerald-600">{gstRate}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="28"
                step="0.25"
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <Input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={gstRate}
                onChange={(e) => setGstRate(Math.max(0, Number(e.target.value)))}
                className="text-xs font-sans tabular-nums mt-1"
              />
            </div>

            {/* Supply Location Type */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Supply Location</label>
              <select
                value={supplyType}
                onChange={(e) => setSupplyType(e.target.value as SupplyType)}
                className="w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md p-2.5 font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value="intra_state">Intra-State (Same State: CGST 50% + SGST 50%)</option>
                <option value="inter_state">Inter-State (Different State: IGST 100%)</option>
              </select>
            </div>

            {/* Compensation Cess */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Compensation Cess Rate (%)</label>
              <Input
                type="number"
                min="0"
                max="100"
                step="1"
                value={cessRate}
                onChange={(e) => setCessRate(Math.max(0, Number(e.target.value)))}
                className="text-xs font-sans tabular-nums"
                placeholder="0% (For sin/luxury goods)"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <Button
                type="button"
                onClick={() => {
                  const el = document.getElementById("gst-results-dashboard");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                Calculate GST
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
          <div id="gst-results-dashboard" className="lg:col-span-7 space-y-4">
            {/* Primary Highlight Card */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 shadow-md text-white relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-white/80">
                  FINAL INVOICE TOTAL (TAX INCLUSIVE)
                </span>
                <div className="flex gap-2">
                  
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

              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight font-sans tabular-nums text-white mb-2">
                {fmt(singleResults.grandTotalWithCess)}
              </div>

              <div className="text-xs text-white/90 font-medium">
                Includes Net Taxable Base of {fmt(singleResults.netAmount)} + GST Tax of {fmt(singleResults.gstAmount)} ({singleResults.effectiveGstRate}%)
              </div>

              {/* Tax Head Secondary Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-white/10 text-xs">
                <div>
                  <div className="text-zinc-400 text-[11px]">Net Taxable Base</div>
                  <div className="font-bold font-sans tabular-nums text-white text-sm">{fmt(singleResults.netAmount)}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-[11px]">Total GST Tax</div>
                  <div className="font-bold font-sans tabular-nums text-emerald-300 text-sm">{fmt(singleResults.gstAmount)}</div>
                </div>
                {supplyType === "intra_state" ? (
                  <>
                    <div>
                      <div className="text-zinc-400 text-[11px]">CGST ({singleResults.cgstRate}%)</div>
                      <div className="font-bold font-sans tabular-nums text-purple-300 text-sm">{fmt(singleResults.cgstAmount)}</div>
                    </div>
                    <div>
                      <div className="text-zinc-400 text-[11px]">SGST ({singleResults.sgstRate}%)</div>
                      <div className="font-bold font-sans tabular-nums text-amber-300 text-sm">{fmt(singleResults.sgstAmount)}</div>
                    </div>
                  </>
                ) : (
                  <div className="col-span-2">
                    <div className="text-zinc-400 text-[11px]">IGST ({singleResults.igstRate}%)</div>
                    <div className="font-bold font-sans tabular-nums text-blue-300 text-sm">{fmt(singleResults.igstAmount)}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Recharts Visualizations (Donut & Bar) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Donut Chart: Base vs Tax */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm space-y-2">
                <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Base Price vs. GST Split</h4>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4}>
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: any) => [`₹${Number(v).toLocaleString()}`, "Amount"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart: Tax Head Breakdown */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm space-y-2">
                <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Tax Head Share</h4>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10 }} />
                      <Tooltip formatter={(v: any) => [`₹${Number(v).toLocaleString()}`, "Tax Amount"]} />
                      <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                        {barData.map((entry, index) => (
                          <Cell key={`bar-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MULTI-ITEM GST INVOICE BUILDER */}
      {activeTab === "multi" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Multi-Item Tax Invoice Builder
              </h3>
              <p className="text-xs text-zinc-500">
                Add multiple items with mixed GST rates (5%, 12%, 18%, 28%) and generate a B2B/B2C itemized tax invoice.
              </p>
            </div>

            
          </div>

          {/* Line Items Table Inputs */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                  <th className="p-2.5">Item Description</th>
                  <th className="p-2.5 w-20">Qty</th>
                  <th className="p-2.5 w-28">Unit Price (₹)</th>
                  <th className="p-2.5 w-24">GST Rate</th>
                  <th className="p-2.5 w-24">Net Base (₹)</th>
                  <th className="p-2.5 w-24">GST Tax (₹)</th>
                  <th className="p-2.5 w-28">Total (₹)</th>
                  <th className="p-2.5 w-12 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-sans tabular-nums text-[11px]">
                {multiInvoiceResults.items.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2">
                      <Input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateInvoiceItem(item.id, "name", e.target.value)}
                        className="text-xs font-sans"
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateInvoiceItem(item.id, "quantity", Math.max(1, Number(e.target.value)))}
                        className="text-xs font-sans tabular-nums"
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        min="0"
                        value={item.unitPrice}
                        onChange={(e) => updateInvoiceItem(item.id, "unitPrice", Math.max(0, Number(e.target.value)))}
                        className="text-xs font-sans tabular-nums"
                      />
                    </td>
                    <td className="p-2 font-sans">
                      <select
                        value={item.gstRate}
                        onChange={(e) => updateInvoiceItem(item.id, "gstRate", Number(e.target.value))}
                        className="w-full text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-1 font-semibold"
                      >
                        <option value="0">0%</option>
                        <option value="0.25">0.25%</option>
                        <option value="3">3%</option>
                        <option value="5">5%</option>
                        <option value="12">12%</option>
                        <option value="18">18%</option>
                        <option value="28">28%</option>
                      </select>
                    </td>
                    <td className="p-2 font-bold text-zinc-900 dark:text-zinc-100">{fmt(item.netTotal)}</td>
                    <td className="p-2 font-bold text-emerald-600">{fmt(item.gstTotal)}</td>
                    <td className="p-2 font-bold text-blue-600">{fmt(item.grandTotal)}</td>
                    <td className="p-2 text-center">
                      <button
                        type="button"
                        onClick={() => removeInvoiceItem(item.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Invoice Summary Totals */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 flex flex-wrap justify-between items-center gap-4 text-xs font-sans tabular-nums">
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Subtotal Base Amount</span>
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{fmt(multiInvoiceResults.totalNetBase)}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Total GST Amount</span>
              <span className="text-sm font-bold text-emerald-600">{fmt(multiInvoiceResults.totalGst)}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-semibold">CGST (50%)</span>
              <span className="text-sm font-bold text-purple-600">{fmt(multiInvoiceResults.totalCgst)}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-semibold">SGST (50%)</span>
              <span className="text-sm font-bold text-amber-600">{fmt(multiInvoiceResults.totalSgst)}</span>
            </div>
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-right">
              <span className="text-blue-100 block text-[10px] uppercase font-semibold">Grand Total Invoice</span>
              <span className="text-base font-extrabold">{fmt(multiInvoiceResults.grandTotal)}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CGST, SGST & IGST SPLIT */}
      {activeTab === "supply" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <BarChart3 className="h-6 w-6 text-purple-500" />
            <div>
              <h3 className="text-base font-bold text-blue-600 dark:text-blue-400">
                Inter-State vs. Intra-State Supply Tax Split
              </h3>
              <p className="text-xs text-zinc-500">
                Compare CGST + SGST intra-state split vs. IGST inter-state single tax collection.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Intra-State Card */}
            <div className="bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-xl p-5 space-y-3">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase block">
                Intra-State Supply (Within Same State)
              </span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Tax is divided equally into Central GST (CGST) and State GST (SGST):
              </p>
              <div className="space-y-2 pt-2 border-t font-sans tabular-nums text-xs">
                <div className="flex justify-between">
                  <span>CGST ({singleResults.cgstRate}%):</span>
                  <span className="font-bold text-purple-600">{fmt(singleResults.cgstAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>SGST ({singleResults.sgstRate}%):</span>
                  <span className="font-bold text-amber-600">{fmt(singleResults.sgstAmount)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Combined Tax:</span>
                  <span className="text-emerald-600">{fmt(singleResults.gstAmount)}</span>
                </div>
              </div>
            </div>

            {/* Inter-State Card */}
            <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5 space-y-3">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase block">
                Inter-State Supply (Between Different States)
              </span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Full tax is collected as Integrated GST (IGST) by Central Government:
              </p>
              <div className="space-y-2 pt-2 border-t font-sans tabular-nums text-xs">
                <div className="flex justify-between">
                  <span>IGST ({singleResults.effectiveGstRate}%):</span>
                  <span className="font-bold text-blue-600">{fmt(singleResults.gstAmount)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Combined Tax:</span>
                  <span className="text-emerald-600">{fmt(singleResults.gstAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMPOSITION SCHEME SOLVER */}
      {activeTab === "composition" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <Building className="h-6 w-6 text-amber-500" />
            <div>
              <h3 className="text-base font-bold text-blue-600 dark:text-blue-400">
                Composition Scheme vs. Regular GST Scheme Comparison
              </h3>
              <p className="text-xs text-zinc-500">
                Determine whether your small business saves more under the flat Composition Scheme or Regular Scheme with Input Tax Credit (ITC).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Input Controls */}
            <div className="space-y-4 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Annual Business Turnover (₹)</label>
                <Input
                  type="number"
                  min="0"
                  step="100000"
                  value={annualTurnover}
                  onChange={(e) => setAnnualTurnover(Math.max(0, Number(e.target.value)))}
                  className="font-sans tabular-nums text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Business Category</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value as any)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md p-2.5 font-medium cursor-pointer"
                >
                  <option value="trader">Trader / Retailer (1% Tax)</option>
                  <option value="manufacturer">Manufacturer (1% Tax)</option>
                  <option value="restaurant">Restaurant (Non-Alcohol 5% Tax)</option>
                  <option value="service">Service Provider (6% Tax)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Annual Input Purchases with GST (₹)</label>
                <Input
                  type="number"
                  min="0"
                  step="100000"
                  value={totalPurchases}
                  onChange={(e) => setTotalPurchases(Math.max(0, Number(e.target.value)))}
                  className="font-sans tabular-nums text-xs"
                />
              </div>
            </div>

            {/* Results Comparison Card */}
            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-4">
              <Badge className="bg-amber-600 text-white text-xs">
                Recommended: {compositionResults.recommendedScheme.toUpperCase()} SCHEME
              </Badge>

              <div className="space-y-2 font-sans tabular-nums text-xs border-b pb-3">
                <div className="flex justify-between">
                  <span>Composition Flat Tax ({compositionResults.compositionTaxRate}%):</span>
                  <span className="font-bold text-amber-600">{fmt(compositionResults.compositionTaxPayable)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Regular Net Tax Payable (Output - ITC):</span>
                  <span className="font-bold text-blue-600">{fmt(compositionResults.regularNetGstPayable)}</span>
                </div>
              </div>

              <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex justify-between">
                <span>Tax Savings Under Composition:</span>
                <span className="text-emerald-600 font-sans tabular-nums">{fmt(compositionResults.taxSavingsUnderComposition)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />

      {/* Educational Content & 20 FAQs */}
    </div>
  );
}
