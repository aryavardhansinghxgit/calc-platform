"use client";

import React, { useState, useMemo } from "react";
import {
  DollarSign,
  Users,
  Percent,
  Sparkles,
  Copy,
  Check,
  Globe,
  Plus,
  Trash2,
  Share2,
  Printer,
  Info,
  HelpCircle,
  Calculator,
  ListOrdered,
  ArrowRightLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TaxMode,
  RoundingMode,
  ItemizedDiner,
  TipCalculationResult,
} from "@/app/calculators/tip-calculator/types";
import {
  calculateTip,
  calculateItemizedTip,
  COUNTRY_TIPPING_DATABASE,
} from "@/app/calculators/tip-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function TipCalculator() {
  // Mode selection
  const [activeTab, setActiveTab] = useState<"quick" | "itemized">("quick");

  // Inputs
  const [countryCode, setCountryCode] = useState<string>("US");
  const [subtotal, setSubtotal] = useState<number>(50);
  const [taxRatePct, setTaxRatePct] = useState<number>(8.5);
  const [tipPct, setTipPct] = useState<number>(18);
  const [partySize, setPartySize] = useState<number>(2);
  const [taxMode, setTaxMode] = useState<TaxMode>("pre-tax");
  const [roundingMode, setRoundingMode] = useState<RoundingMode>("none");

  // Itemized State
  const [sharedAppetizers, setSharedAppetizers] = useState<number>(12);
  const [diners, setDiners] = useState<ItemizedDiner[]>([
    {
      id: "1",
      name: "Alex",
      items: [
        { id: "i1", name: "Burger", price: 18 },
        { id: "i2", name: "Soda", price: 4 },
      ],
    },
    {
      id: "2",
      name: "Sam",
      items: [
        { id: "i3", name: "Pasta", price: 22 },
        { id: "i4", name: "Wine", price: 10 },
      ],
    },
  ]);

  // Modals & Copy
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Selected Country Info
  const selectedCountry = useMemo(() => {
    return COUNTRY_TIPPING_DATABASE.find((c) => c.code === countryCode) || COUNTRY_TIPPING_DATABASE[0];
  }, [countryCode]);

  // Handle Country Selection
  const handleCountryChange = (code: string) => {
    setCountryCode(code);
    const country = COUNTRY_TIPPING_DATABASE.find((c) => c.code === code);
    if (country && country.defaultTipPct > 0) {
      setTipPct(country.defaultTipPct);
    }
  };

  // Perform Quick Calculation
  const quickResult: TipCalculationResult = useMemo(() => {
    return calculateTip(subtotal, taxRatePct, tipPct, partySize, taxMode, roundingMode, countryCode);
  }, [subtotal, taxRatePct, tipPct, partySize, taxMode, roundingMode, countryCode]);

  // Perform Itemized Calculation
  const itemizedResult = useMemo(() => {
    return calculateItemizedTip(diners, sharedAppetizers, taxRatePct, tipPct, taxMode);
  }, [diners, sharedAppetizers, taxRatePct, tipPct, taxMode]);

  // Active Display Result
  const currentResult = activeTab === "quick" ? quickResult : itemizedResult.overall;
  const sym = selectedCountry.currencySymbol;

  // Add Itemized Diner
  const handleAddDiner = () => {
    const newId = String(diners.length + 1);
    setDiners([
      ...diners,
      {
        id: newId,
        name: `Guest ${newId}`,
        items: [{ id: `item-${Date.now()}`, name: "Entree", price: 15 }],
      },
    ]);
  };

  // Remove Diner
  const handleRemoveDiner = (id: string) => {
    if (diners.length <= 1) return;
    setDiners(diners.filter((d) => d.id !== id));
  };

  // Add Item to Diner
  const handleAddItemToDiner = (dinerId: string) => {
    setDiners(
      diners.map((diner) => {
        if (diner.id === dinerId) {
          return {
            ...diner,
            items: [...diner.items, { id: `item-${Date.now()}`, name: "Item", price: 10 }],
          };
        }
        return diner;
      })
    );
  };

  // Update Diner Item
  const handleUpdateItem = (dinerId: string, itemId: string, field: "name" | "price", val: any) => {
    setDiners(
      diners.map((diner) => {
        if (diner.id === dinerId) {
          return {
            ...diner,
            items: diner.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, [field]: field === "price" ? Number(val) || 0 : val };
              }
              return item;
            }),
          };
        }
        return diner;
      })
    );
  };

  // Copy SMS / WhatsApp Summary
  const handleCopySummary = () => {
    let text = `🍽️ Tip & Bill Split Summary (${selectedCountry.name}):\n`;
    text += `Bill Subtotal: ${sym}${currentResult.subtotal.toFixed(2)}\n`;
    text += `Tax (${currentResult.taxRatePct}%): ${sym}${currentResult.taxAmount.toFixed(2)}\n`;
    text += `Tip (${currentResult.tipPct}%): ${sym}${currentResult.tipAmount.toFixed(2)}\n`;
    text += `Grand Total: ${sym}${currentResult.totalAmount.toFixed(2)}\n\n`;

    if (activeTab === "quick") {
      text += `👥 Split per person (${currentResult.partySize} people):\n`;
      text += `• Tip per person: ${sym}${currentResult.tipPerPerson.toFixed(2)}\n`;
      text += `• Total per person: ${sym}${currentResult.totalPerPerson.toFixed(2)}\n`;
    } else {
      text += `👥 Itemized Individual Breakdown:\n`;
      itemizedResult.diners.forEach((d) => {
        text += `• ${d.name}: ${sym}${d.total.toFixed(2)} (Subtotal ${sym}${d.subtotal.toFixed(2)} + Tip ${sym}${d.tipShare.toFixed(2)})\n`;
      });
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Build Report Data
  const reportData: CalculatorReportData = useMemo(() => {
    return {
      meta: {
        reportTitle: "Receipt & Gratuity Calculation Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Tip Calculator",
      },
      keyMetrics: [
        { label: "Grand Total Bill", value: `${sym}${currentResult.totalAmount.toFixed(2)}`, highlight: true },
        { label: "Total Tip Amount", value: `${sym}${currentResult.tipAmount.toFixed(2)}` },
        { label: `Total Per Person (${currentResult.partySize})`, value: `${sym}${currentResult.totalPerPerson.toFixed(2)}` },
        { label: "Tip Rate", value: `${currentResult.tipPct}% (${currentResult.taxMode})` },
      ],
      sections: [
        {
          title: "Tipping Norms & Etiquette Notes",
          items: [
            { label: "Country", value: selectedCountry.name },
            { label: "Expectation Level", value: selectedCountry.tipExpected },
            { label: "Etiquette Guide", value: selectedCountry.etiquetteNotes },
          ],
        },
        {
          title: "Bill Summary Breakdown",
          items: [
            { label: "Food/Drink Subtotal", value: `${sym}${currentResult.subtotal.toFixed(2)}` },
            { label: `Sales Tax (${currentResult.taxRatePct}%)`, value: `${sym}${currentResult.taxAmount.toFixed(2)}` },
            { label: `Tip Amount (${currentResult.tipPct}%)`, value: `${sym}${currentResult.tipAmount.toFixed(2)}` },
            { label: "Rounding Adjustment", value: `${sym}${currentResult.roundingAdjustment.toFixed(2)}` },
          ],
        },
      ],
      table: {
        title: "Per Person Payment Summary",
        headers: [
          { key: "person", label: "Diner" },
          { key: "subtotal", label: "Food Subtotal" },
          { key: "tip", label: "Tip Share" },
          { key: "total", label: "Total Share" },
        ],
        rows:
          activeTab === "itemized"
            ? itemizedResult.diners.map((d) => ({
                person: d.name,
                subtotal: `${sym}${d.subtotal.toFixed(2)}`,
                tip: `${sym}${d.tipShare.toFixed(2)}`,
                total: `${sym}${d.total.toFixed(2)}`,
              }))
            : Array.from({ length: currentResult.partySize }).map((_, i) => ({
                person: `Diner ${i + 1}`,
                subtotal: `${sym}${(currentResult.subtotal / currentResult.partySize).toFixed(2)}`,
                tip: `${sym}${currentResult.tipPerPerson.toFixed(2)}`,
                total: `${sym}${currentResult.totalPerPerson.toFixed(2)}`,
              })),
      },
    };
  }, [currentResult, selectedCountry, sym, activeTab, itemizedResult]);

  return (
    <div className="space-y-6">
      {/* 1. TOP TAB & GLOBAL COUNTRY TIPPING MATRIX BAR */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* TAB MODE SWITCHER */}
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200/70 dark:border-zinc-700">
            <button
              onClick={() => setActiveTab("quick")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "quick"
                  ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                  : "text-zinc-500"
              }`}
            >
              <Calculator className="h-3.5 w-3.5" /> Quick Equal Split
            </button>
            <button
              onClick={() => setActiveTab("itemized")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "itemized"
                  ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                  : "text-zinc-500"
              }`}
            >
              <ListOrdered className="h-3.5 w-3.5" /> Itemized Group Splitter
            </button>
          </div>

          {/* GLOBAL COUNTRY MATRIX SELECTOR */}
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-emerald-600" />
            <select
              value={countryCode}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="h-9 text-xs font-bold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl cursor-pointer"
            >
              {COUNTRY_TIPPING_DATABASE.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.currencySymbol.trim()}) — {c.tipExpected}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* COUNTRY ETIQUETTE BANNER */}
        <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/60 rounded-xl flex items-start gap-2 text-xs">
          <Info className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-emerald-900 dark:text-emerald-200">
              {selectedCountry.name} Tipping Etiquette:
            </span>
            <p className="text-emerald-800 dark:text-emerald-300 leading-tight">
              {selectedCountry.etiquetteNotes}
            </p>
          </div>
        </div>
      </div>

      {/* 2. MAIN SPLIT-PANE WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT INPUT PANE (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          {activeTab === "quick" ? (
            /* QUICK EQUAL SPLIT INPUT CARD */
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">Bill & Service Details
              </h3>

              {/* Subtotal & Tax Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Bill Subtotal ({sym.trim()})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-sans tabular-nums font-bold text-zinc-400">
                      {sym.trim()}
                    </span>
                    <Input
                      type="number"
                      value={subtotal}
                      onChange={(e) => setSubtotal(Number(e.target.value))}
                      step={0.5}
                      min={0}
                      className="pl-8 h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Sales Tax Rate (%)
                  </label>
                  <Input
                    type="number"
                    value={taxRatePct}
                    onChange={(e) => setTaxRatePct(Number(e.target.value))}
                    step={0.1}
                    min={0}
                    className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                  />
                </div>
              </div>

              {/* PRE-TAX VS POST-TAX TOGGLE */}
              <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700 text-xs">
                <span className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <ArrowRightLeft className="h-3.5 w-3.5 text-emerald-600" /> Tip Base Mode
                </span>
                <div className="flex bg-zinc-200 dark:bg-zinc-700 p-0.5 rounded-lg">
                  <button
                    onClick={() => setTaxMode("pre-tax")}
                    className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                      taxMode === "pre-tax"
                        ? "bg-white dark:bg-zinc-900 text-emerald-600 shadow-xs"
                        : "text-zinc-600 dark:text-zinc-300"
                    }`}
                  >
                    Pre-Tax Subtotal
                  </button>
                  <button
                    onClick={() => setTaxMode("post-tax")}
                    className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                      taxMode === "post-tax"
                        ? "bg-white dark:bg-zinc-900 text-emerald-600 shadow-xs"
                        : "text-zinc-600 dark:text-zinc-300"
                    }`}
                  >
                    Post-Tax Total
                  </button>
                </div>
              </div>

              {/* SERVICE QUALITY CHIPS */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Tip Percentage ({tipPct}%)
                  </label>
                  <span className="text-[11px] font-bold text-emerald-600">
                    {tipPct >= 25
                      ? "Exceptional Service"
                      : tipPct >= 20
                      ? "Great Service"
                      : tipPct >= 18
                      ? "Good Service"
                      : tipPct >= 15
                      ? "Standard Service"
                      : "Poor Service"}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { label: "10%", pct: 10 },
                    { label: "15%", pct: 15 },
                    { label: "18%", pct: 18 },
                    { label: "20%", pct: 20 },
                    { label: "25%", pct: 25 },
                  ].map((chip) => (
                    <button
                      key={chip.pct}
                      onClick={() => setTipPct(chip.pct)}
                      className={`py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        tipPct === chip.pct
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                          : "bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-emerald-300"
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* PARTY SIZE & SMART ROUNDING */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Party Size Stepper */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-blue-600" /> Split Party Size
                  </label>
                  <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/80 p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
                    <button
                      onClick={() => setPartySize(Math.max(1, partySize - 1))}
                      className="w-8 h-8 bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-lg flex items-center justify-center font-bold text-zinc-700 dark:text-zinc-200 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-sans tabular-nums font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {partySize} {partySize === 1 ? "Person" : "People"}
                    </span>
                    <button
                      onClick={() => setPartySize(partySize + 1)}
                      className="w-8 h-8 bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-lg flex items-center justify-center font-bold text-zinc-700 dark:text-zinc-200 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Smart Rounding Modes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Smart Rounding Rule
                  </label>
                  <select
                    value={roundingMode}
                    onChange={(e) => setRoundingMode(e.target.value as RoundingMode)}
                    className="w-full h-11 text-xs font-bold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl cursor-pointer"
                  >
                    <option value="none">No Rounding (Exact Cents)</option>
                    <option value="tip">Round Up Tip Amount</option>
                    <option value="total">Round Total Bill to Whole $</option>
                    <option value="person">Round Total Per Person</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            /* ITEMIZED GROUP SPLITTER CARD */
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">Itemized Diner Line Items
                </h3>
                <Button
                  onClick={handleAddDiner}
                  size="sm"
                  className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer gap-1"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Diner
                </Button>
              </div>

              {/* Shared Appetizers Input */}
              <div className="p-3 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/60 rounded-xl space-y-1.5">
                <label className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center justify-between">
                  <span>Shared Appetizers / Drinks ({sym.trim()})</span>
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 font-normal">
                    Split equally among all diners
                  </span>
                </label>
                <Input
                  type="number"
                  value={sharedAppetizers}
                  onChange={(e) => setSharedAppetizers(Number(e.target.value))}
                  step={0.5}
                  min={0}
                  className="h-9 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900 border-amber-300"
                />
              </div>

              {/* Diners List */}
              <div className="space-y-3">
                {diners.map((diner) => (
                  <div
                    key={diner.id}
                    className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <Input
                        type="text"
                        value={diner.name}
                        onChange={(e) =>
                          setDiners(
                            diners.map((d) => (d.id === diner.id ? { ...d, name: e.target.value } : d))
                          )
                        }
                        className="h-8 text-xs font-bold w-36 bg-white dark:bg-zinc-900"
                      />
                      <button
                        onClick={() => handleRemoveDiner(diner.id)}
                        disabled={diners.length <= 1}
                        className="text-zinc-400 hover:text-rose-500 disabled:opacity-30 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Diner Items */}
                    <div className="space-y-1.5">
                      {diner.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                          <Input
                            type="text"
                            placeholder="Item Name"
                            value={item.name}
                            onChange={(e) => handleUpdateItem(diner.id, item.id, "name", e.target.value)}
                            className="h-7 text-xs flex-1 bg-white dark:bg-zinc-900"
                          />
                          <div className="relative w-24">
                            <span className="absolute left-2 top-1.5 text-[10px] font-sans tabular-nums text-zinc-400">
                              {sym.trim()}
                            </span>
                            <Input
                              type="number"
                              placeholder="Price"
                              value={item.price}
                              onChange={(e) => handleUpdateItem(diner.id, item.id, "price", e.target.value)}
                              className="pl-5 h-7 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleAddItemToDiner(diner.id)}
                      className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="h-3 w-3" /> Add item for {diner.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT INSTANT RESULTS CARD (Col 5) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-100 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 fill-white" /> Receipt Calculation Summary
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                {selectedCountry.code}
              </span>
            </div>

            {/* HIGHLIGHTED TOTAL TIP & GRAND TOTAL */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-emerald-100 font-bold">
                  Total Tip ({currentResult.tipPct}%)
                </span>
                <div className="text-3xl font-black font-sans tabular-nums tracking-tight">
                  {sym}{currentResult.tipAmount.toFixed(2)}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-emerald-100 font-bold">
                  Grand Total Bill
                </span>
                <div className="text-3xl font-black font-sans tabular-nums tracking-tight text-amber-200">
                  {sym}{currentResult.totalAmount.toFixed(2)}
                </div>
              </div>
            </div>

            {/* SPLIT PER PERSON METRICS */}
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/20 space-y-2">
              <div className="flex items-center justify-between border-b border-white/15 pb-2 text-xs">
                <span className="text-emerald-100 font-medium">Tip Per Person ({currentResult.partySize} guests)</span>
                <span className="font-sans tabular-nums font-bold text-sm text-white">
                  {sym}{currentResult.tipPerPerson.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-100 font-bold">Total Per Person</span>
                <span className="font-sans tabular-nums font-black text-base text-amber-200">
                  {sym}{currentResult.totalPerPerson.toFixed(2)}
                </span>
              </div>
            </div>

            {/* ITEMIZATION TABLE SUMMARY IF ACTIVE */}
            {activeTab === "itemized" && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 block">
                  Individual Shares Breakdown
                </span>
                <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                  {itemizedResult.diners.map((d) => (
                    <div
                      key={d.dinerId}
                      className="flex items-center justify-between text-xs bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/10"
                    >
                      <span className="font-bold text-white">{d.name}</span>
                      <span className="font-sans tabular-nums font-bold text-amber-200">
                        {sym}{d.total.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center justify-between pt-4 border-t border-white/20 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopySummary}
              className="flex-1 h-9 text-xs bg-white text-emerald-800 hover:bg-emerald-50 border-0 cursor-pointer font-bold gap-1.5 shadow-xs"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
              {copied ? "Copied to Clipboard" : "Copy SMS / WhatsApp"}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowReportModal(true)}
              className="h-9 text-xs bg-white/20 text-white hover:bg-white/30 border-white/30 cursor-pointer font-bold gap-1.5"
            >
              <Printer className="h-3.5 w-3.5" /> PDF Receipt
            </Button>
          </div>
        </div>
      </div>

      {/* REPORT MODAL */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={reportData}
      />
    </div>
  );
}
