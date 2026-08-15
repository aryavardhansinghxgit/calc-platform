"use client";

import React, { useState, useMemo } from "react";
import {
  Tag,
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
  ShoppingBag,
  Receipt,
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
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import { DiscountContent } from "./DiscountContent";
import {
  calculateDiscountSolver,
  calculateStackedDiscounts,
  calculateCouponDiscount,
  calculateTaxDiscount,
} from "@/lib/calculator-engine/formulas/discount";

export function DiscountCalculator() {
  // Navigation Tabs: 'standard' | 'stacked' | 'coupon' | 'tax' | 'charts'
  const [activeTab, setActiveTab] = useState<
    "standard" | "stacked" | "coupon" | "tax" | "charts"
  >("standard");

  // Tab 1 Inputs: Standard 2-Variable Solver Baseline ($59.99 @ 15% off)
  const [origPriceInput, setOrigPriceInput] = useState<string>("59.99");
  const [discountValInput, setDiscountValInput] = useState<string>("15");
  const [discountTypeInput, setDiscountTypeInput] = useState<"percent" | "fixed">("percent");
  const [finalPriceInput, setFinalPriceInput] = useState<string>("");
  const [youSavedInput, setYouSavedInput] = useState<string>("");

  // Tab 2 Inputs: Stacked Discounts ($100 @ 20% + 10%)
  const [stackedOrigInput, setStackedOrigInput] = useState<string>("100");
  const [disc1Input, setDisc1Input] = useState<string>("20");
  const [disc2Input, setDisc2Input] = useState<string>("10");

  // Tab 3 Inputs: Coupon Stack ($100 @ 20% + $10 coupon)
  const [couponOrigInput, setCouponOrigInput] = useState<string>("100");
  const [couponPctInput, setCouponPctInput] = useState<string>("20");
  const [couponFixedInput, setCouponFixedInput] = useState<string>("10");

  // Tab 4 Inputs: Sales Tax + Discount
  const [taxOrigInput, setTaxOrigInput] = useState<string>("100");
  const [taxDiscInput, setTaxDiscInput] = useState<string>("20");
  const [taxRateInput, setTaxRateInput] = useState<string>("8.0");
  const [taxTimingInput, setTaxTimingInput] = useState<"before_tax" | "after_tax">("before_tax");

  // Modal & Notification State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  // Compute Standard Solver Results
  const solverResults = useMemo(() => {
    return calculateDiscountSolver({
      originalPrice: origPriceInput !== "" ? Number(origPriceInput) : undefined,
      discountValue: discountValInput !== "" ? Number(discountValInput) : undefined,
      discountType: discountTypeInput,
      finalPrice: finalPriceInput !== "" ? Number(finalPriceInput) : undefined,
      youSaved: youSavedInput !== "" ? Number(youSavedInput) : undefined,
    });
  }, [origPriceInput, discountValInput, discountTypeInput, finalPriceInput, youSavedInput]);

  // Compute Stacked Results
  const stackedResults = useMemo(() => {
    return calculateStackedDiscounts({
      originalPrice: Number(stackedOrigInput) || 100,
      discount1Percent: Number(disc1Input) || 20,
      discount2Percent: Number(disc2Input) || 10,
    });
  }, [stackedOrigInput, disc1Input, disc2Input]);

  // Compute Coupon Results
  const couponResults = useMemo(() => {
    return calculateCouponDiscount({
      originalPrice: Number(couponOrigInput) || 100,
      percentOff: Number(couponPctInput) || 20,
      fixedCoupon: Number(couponFixedInput) || 10,
    });
  }, [couponOrigInput, couponPctInput, couponFixedInput]);

  // Compute Tax Results
  const taxResults = useMemo(() => {
    return calculateTaxDiscount({
      originalPrice: Number(taxOrigInput) || 100,
      discountPercent: Number(taxDiscInput) || 20,
      taxRatePercent: Number(taxRateInput) || 8.0,
      taxTiming: taxTimingInput,
    });
  }, [taxOrigInput, taxDiscInput, taxRateInput, taxTimingInput]);

  const fmt = (val: number) =>
    `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Quick Presets
  const applyPreset = (orig: number, disc: number, type: "percent" | "fixed" = "percent") => {
    setOrigPriceInput(orig.toString());
    setDiscountValInput(disc.toString());
    setDiscountTypeInput(type);
    setFinalPriceInput("");
    setYouSavedInput("");
  };

  // Copy Summary
  const copySummary = () => {
    const text = `Discount Savings Summary:
------------------------------------------------
Original List Price: ${fmt(solverResults.originalPrice)}
Discount: ${solverResults.discountValue}${solverResults.discountType === "percent" ? "%" : "$"} OFF
------------------------------------------------
Final Sale Price: ${fmt(solverResults.finalPrice)}
You Saved: ${fmt(solverResults.youSaved)} (${solverResults.effectiveDiscountPercent}% Effective Savings)`;

    navigator.clipboard.writeText(text);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Donut Data
  const donutData = [
    { name: "Final Sale Price", value: solverResults.finalPrice, color: "#3b82f6" },
    { name: "You Saved", value: solverResults.youSaved, color: "#10b981" },
  ];

  // Report Modal Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Discount & Shopping Savings Calculator",
      reportTitle: "Discount & Shopping Savings Analysis Report",
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      currencySymbol: "$",
    },
    keyMetrics: [
      {
        label: "Final Sale Price",
        value: fmt(solverResults.finalPrice),
        subtitle: `Original Price: ${fmt(solverResults.originalPrice)}`,
        colorTheme: "emerald",
      },
      {
        label: "Total You Saved",
        value: fmt(solverResults.youSaved),
        subtitle: `${solverResults.effectiveDiscountPercent}% Effective Savings`,
        colorTheme: "amber",
      },
    ],
    sections: [
      {
        title: "Discount Calculation Summary",
        items: [
          { label: "Original List Price", value: fmt(solverResults.originalPrice) },
          { label: "Discount Value", value: `${solverResults.discountValue}${solverResults.discountType === "percent" ? "%" : "$"}` },
          { label: "Final Sale Price", value: fmt(solverResults.finalPrice), highlight: true },
          { label: "Total Amount Saved", value: fmt(solverResults.youSaved), highlight: true },
          { label: "Effective Savings Rate", value: `${solverResults.effectiveDiscountPercent}%` },
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
            <Tag className="h-3.5 w-3.5" /> Discount Engine
          </Badge>
          <span className="text-xs text-zinc-500 font-medium">Quick Presets:</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(59.99, 15, "percent")}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            Calculator.net Baseline ($59.99 @ 15% Off)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(95, 20, "fixed")}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            $95 - $20 Off (Fixed)
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => applyPreset(120, 25, "percent")}
            className="h-6 text-[10px] px-2 cursor-pointer"
          >
            $120 @ 25% Off
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400">
          <span>Final Price:</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-sans tabular-nums text-sm">
            {fmt(solverResults.finalPrice)}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab("standard")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "standard"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Tag className="h-4 w-4 text-emerald-500" /> 1. Standard Discount Solver
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("stacked")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "stacked"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Layers className="h-4 w-4 text-purple-500" /> 2. Stacked Discounts
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("coupon")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "coupon"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <ShoppingBag className="h-4 w-4 text-amber-500" /> 3. Coupon Stack
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("tax")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
            activeTab === "tax"
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Receipt className="h-4 w-4 text-indigo-500" /> 4. Sales Tax + Discount
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
          <BarChart3 className="h-4 w-4 text-blue-500" /> Visual Dashboards
        </button>
      </div>

      {/* TAB 1: STANDARD 2-VARIABLE SOLVER (Calculator.net Baseline) */}
      {activeTab === "standard" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
              <div className="border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Multi-Variable Discount Solver
                </h3>
                <span className="text-[10px] text-zinc-400">Provide any TWO values to calculate the remaining fields:</span>
              </div>

              {/* Discount Type Radio */}
              <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 space-y-2 text-xs">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">Discount Type:</span>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="discType"
                      checked={discountTypeInput === "percent"}
                      onChange={() => setDiscountTypeInput("percent")}
                      className="text-indigo-600"
                    />
                    <span>Percent Off (%)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="discType"
                      checked={discountTypeInput === "fixed"}
                      onChange={() => setDiscountTypeInput("fixed")}
                      className="text-indigo-600"
                    />
                    <span>Fixed Amount Off ($)</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Price Before Discount ($)</label>
                  <Input
                    type="number"
                    value={origPriceInput}
                    onChange={(e) => setOrigPriceInput(e.target.value)}
                    placeholder="e.g. 59.99"
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Discount Value ({discountTypeInput === "percent" ? "%" : "$"})
                  </label>
                  <Input
                    type="number"
                    value={discountValInput}
                    onChange={(e) => setDiscountValInput(e.target.value)}
                    placeholder="e.g. 15"
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">Price After Discount ($)</label>
                  <Input
                    type="number"
                    value={finalPriceInput}
                    onChange={(e) => setFinalPriceInput(e.target.value)}
                    placeholder="e.g. 50.99"
                    className="text-xs font-sans tabular-nums h-8 px-2"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300">You Saved ($)</label>
                  <Input
                    type="number"
                    value={youSavedInput}
                    onChange={(e) => setYouSavedInput(e.target.value)}
                    placeholder="e.g. 9.00"
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
                  FINAL SALE PRICE
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

              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-emerald-400 font-sans tabular-nums mb-2">
                {fmt(solverResults.finalPrice)}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 font-medium mb-3">
                <span>
                  You Saved: <span className="font-bold text-emerald-300">{fmt(solverResults.youSaved)}</span>
                </span>
                <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-indigo-200">
                  Effective Savings: {solverResults.effectiveDiscountPercent}%
                </span>
              </div>
            </div>

            {/* Donut Chart showing Final Price vs You Saved */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Price vs. Savings Breakdown
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

      {/* TAB 2: STACKED DISCOUNTS */}
      {activeTab === "stacked" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Stacked / Multiple Discounts Calculator
            </h3>

            <div className="space-y-1 text-xs">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Original List Price ($)</label>
              <Input type="number" value={stackedOrigInput} onChange={(e) => setStackedOrigInput(e.target.value)} className="text-xs font-sans tabular-nums h-9 px-3" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">First Discount (% Off)</label>
                <Input type="number" value={disc1Input} onChange={(e) => setDisc1Input(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Second Discount (% Off)</label>
                <Input type="number" value={disc2Input} onChange={(e) => setDisc2Input(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-purple-900 dark:text-purple-200 text-sm block border-b pb-1">
                Sequential Stacked Savings Breakdown
              </span>
              <div className="flex justify-between">
                <span>After 1st Discount ({disc1Input}%):</span>
                <span className="font-bold">{fmt(stackedResults.step1Price)}</span>
              </div>
              <div className="flex justify-between text-base border-t pt-1">
                <span>Final Sale Price:</span>
                <span className="font-extrabold text-purple-600">{fmt(stackedResults.finalPrice)}</span>
              </div>
              <div className="flex justify-between font-sans text-zinc-600 dark:text-zinc-400">
                <span>Total Saved:</span>
                <span className="font-bold text-emerald-600 font-sans tabular-nums">{fmt(stackedResults.totalSaved)} ({stackedResults.effectiveCombinedDiscountPercent}% Off)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COUPON STACK */}
      {activeTab === "coupon" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Coupon Stack Calculator (% Off + $ Coupon)
            </h3>

            <div className="space-y-1 text-xs">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Original List Price ($)</label>
              <Input type="number" value={couponOrigInput} onChange={(e) => setCouponOrigInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Percentage Coupon (% Off)</label>
                <Input type="number" value={couponPctInput} onChange={(e) => setCouponPctInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Fixed Coupon ($ Off)</label>
                <Input type="number" value={couponFixedInput} onChange={(e) => setCouponFixedInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-amber-900 dark:text-amber-200 text-sm block border-b pb-1">
                Coupon Stack Breakdown
              </span>
              <div className="flex justify-between text-base">
                <span>Final Checkout Price:</span>
                <span className="font-extrabold text-amber-600">{fmt(couponResults.finalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Percent Coupon Savings:</span>
                <span className="font-bold text-emerald-600">{fmt(couponResults.percentSavings)}</span>
              </div>
              <div className="flex justify-between">
                <span>Fixed Coupon Savings:</span>
                <span className="font-bold text-emerald-600">{fmt(couponResults.couponSavings)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SALES TAX + DISCOUNT */}
      {activeTab === "tax" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              Sales Tax + Discount Calculator
            </h3>

            <div className="space-y-1 text-xs">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Original List Price ($)</label>
              <Input type="number" value={taxOrigInput} onChange={(e) => setTaxOrigInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Discount (% Off)</label>
                <Input type="number" value={taxDiscInput} onChange={(e) => setTaxDiscInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Sales Tax Rate (%)</label>
                <Input type="number" value={taxRateInput} onChange={(e) => setTaxRateInput(e.target.value)} className="text-xs font-sans tabular-nums h-8 px-2" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 font-sans tabular-nums text-xs">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 p-5 rounded-xl space-y-3">
              <span className="font-sans font-bold text-indigo-900 dark:text-indigo-200 text-sm block border-b pb-1">
                Sales Tax Checkout Summary
              </span>
              <div className="flex justify-between text-base">
                <span>Final Checkout Price:</span>
                <span className="font-extrabold text-indigo-600">{fmt(taxResults.finalCheckoutPrice)}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Discount Savings:</span>
                <span className="font-bold">-{fmt(taxResults.discountAmount)}</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>Sales Tax Added:</span>
                <span className="font-bold">+{fmt(taxResults.taxAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: VISUAL DASHBOARDS */}
      {activeTab === "charts" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" /> Original vs. Discounted Price Comparison
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: "Original List Price", price: solverResults.originalPrice, fill: "#3b82f6" },
                { name: "Final Sale Price", price: solverResults.finalPrice, fill: "#10b981" },
                { name: "Amount Saved", price: solverResults.youSaved, fill: "#eab308" },
              ]}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v}`} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]} />
                <Bar dataKey="price" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* PDF REPORT MODAL */}
      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} reportData={reportData} />

      {/* Educational Content & 15 FAQs */}
      <DiscountContent />
    </div>
  );
}
