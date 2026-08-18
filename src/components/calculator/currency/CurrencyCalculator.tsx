"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  Download,
  ArrowRightLeft,
  DollarSign,
  TrendingUp,
  Plane,
  Building2,
  Globe,
  Coins,
  CheckCircle2,
} from "lucide-react";
import {
  POPULAR_CURRENCIES,
  CURRENCY_MAP,
  convertCurrency,
  generateCheatSheet,
  generateMajorCurrencyMatrix,
  calculateBankMarkup,
  calculateTravelBudget,
} from "@/app/calculators/currency-calculator/calculator";
import { SavedCurrencyItem } from "@/app/calculators/currency-calculator/types";

export function CurrencyCalculator() {
  const input3DClass =
    "w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none transition-all text-xs";
  const select3DClass =
    "w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none cursor-pointer text-xs";
  const outerBox3DClass =
    "border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs";

  const triggerCsvDownload = (filename: string, csvContent: string) => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // =========================================================================
  // BOX 1: LIVE BIDIRECTIONAL CONVERTER (CORE)
  // =========================================================================
  const [b1Amount, setB1Amount] = useState<string>("100");
  const [b1From, setB1From] = useState<string>("USD");
  const [b1To, setB1To] = useState<string>("EUR");

  const [savedBox1, setSavedBox1] = useState<SavedCurrencyItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);

  // =========================================================================
  // BOX 2: CUSTOM / MANUAL EXCHANGE RATE
  // =========================================================================
  const [b2From, setB2From] = useState<string>("USD");
  const [b2To, setB2To] = useState<string>("EUR");
  const [b2CustomRate, setB2CustomRate] = useState<string>("0.92");
  const [b2Amount, setB2Amount] = useState<string>("100");

  const [savedBox2, setSavedBox2] = useState<SavedCurrencyItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);

  // =========================================================================
  // BOX 3: MULTI-CURRENCY SIMULTANEOUS CONVERTER
  // =========================================================================
  const [b3Amount, setB3Amount] = useState<string>("100");
  const [b3Base, setB3Base] = useState<string>("USD");

  const [savedBox3, setSavedBox3] = useState<SavedCurrencyItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);

  // =========================================================================
  // BOX 4: BANK TRANSFER FEE & HIDDEN SPREAD SIMULATOR
  // =========================================================================
  const [b4Amount, setB4Amount] = useState<string>("1000");
  const [b4From, setB4From] = useState<string>("USD");
  const [b4To, setB4To] = useState<string>("EUR");
  const [b4MarkupPercent, setB4MarkupPercent] = useState<string>("3.0"); // 3% typical bank markup
  const [b4FixedFee, setB4FixedFee] = useState<string>("15"); // $15 wire fee

  const [savedBox4, setSavedBox4] = useState<SavedCurrencyItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);

  // =========================================================================
  // BOX 5: TRAVEL CASH & DAILY BUDGET SPLITTER
  // =========================================================================
  const [b5BudgetHome, setB5BudgetHome] = useState<string>("2500");
  const [b5HomeCurr, setB5HomeCurr] = useState<string>("USD");
  const [b5DestCurr, setB5DestCurr] = useState<string>("EUR");
  const [b5TripDays, setB5TripDays] = useState<string>("14");

  const [savedBox5, setSavedBox5] = useState<SavedCurrencyItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);

  // =========================================================================
  // BOX 6: MAJOR CURRENCY CROSS MATRIX
  // =========================================================================
  const [savedBox6, setSavedBox6] = useState<SavedCurrencyItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_cur_box1");
      if (s1) setSavedBox1(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_cur_box2");
      if (s2) setSavedBox2(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_cur_box3");
      if (s3) setSavedBox3(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_cur_box4");
      if (s4) setSavedBox4(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_cur_box5");
      if (s5) setSavedBox5(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_cur_box6");
      if (s6) setSavedBox6(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Box 1 Calculations
  const b1Calc = useMemo(() => {
    return convertCurrency(parseFloat(b1Amount) || 0, b1From, b1To);
  }, [b1Amount, b1From, b1To]);

  const b1CheatSheet = useMemo(() => {
    return generateCheatSheet(b1From, b1To, b1Calc.rate);
  }, [b1From, b1To, b1Calc.rate]);

  const handleSwapB1 = () => {
    const temp = b1From;
    setB1From(b1To);
    setB1To(temp);
  };

  const handleExportBox1CSV = () => {
    const headers = [
      `${b1From} Amount`,
      `${b1To} Converted`,
      `${b1To} Inverse Unit`,
      `${b1From} Converted`,
    ];
    const rows = b1CheatSheet.map((r) => [
      `${r.unit} ${b1From}`,
      `${r.convertedAmount} ${b1To}`,
      `${r.inverseUnit} ${b1To}`,
      `${r.inverseConvertedAmount} ${b1From}`,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload(`currency_cheat_sheet_${b1From}_${b1To}.csv`, csv);
  };

  const handleSaveBox1 = () => {
    const inputsStr = `${b1Amount} ${b1From} ➔ ${b1To}`;
    const primaryStr = `${b1Amount} ${b1From} = ${b1Calc.toAmount.toLocaleString()} ${b1To} (Rate: 1 ${b1From} = ${b1Calc.rate} ${b1To})`;

    const detailsList = [
      `From: ${b1Amount} ${b1From} (${CURRENCY_MAP[b1From]?.name})`,
      `To: ${b1Calc.toAmount.toLocaleString()} ${b1To} (${CURRENCY_MAP[b1To]?.name})`,
      `Exchange Rate: 1 ${b1From} = ${b1Calc.rate} ${b1To}`,
      `Inverse Rate: 1 ${b1To} = ${b1Calc.inverseRate} ${b1From}`,
    ];

    const newItem: SavedCurrencyItem = {
      id: Date.now().toString(),
      title: "Currency Conversion",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox1.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_cur_box1", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleDeleteSavedBox1 = (id: string) => {
    const updated = savedBox1.filter((item) => item.id !== id);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_cur_box1", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox1 = () => {
    setSavedBox1([]);
    try {
      localStorage.removeItem("saved_cur_box1");
    } catch (e) {}
  };

  // Box 2 Calculations (Custom Rate)
  const b2Calc = useMemo(() => {
    return convertCurrency(
      parseFloat(b2Amount) || 0,
      b2From,
      b2To,
      parseFloat(b2CustomRate) || 0.92
    );
  }, [b2Amount, b2From, b2To, b2CustomRate]);

  const handleSaveBox2 = () => {
    const inputsStr = `${b2Amount} ${b2From} @ custom 1 ${b2From} = ${b2CustomRate} ${b2To}`;
    const primaryStr = `Custom Output: ${b2Calc.toAmount.toLocaleString()} ${b2To}`;

    const detailsList = [
      `Exchanged: ${b2Amount} ${b2From}`,
      `Custom Rate Applied: 1 ${b2From} = ${b2CustomRate} ${b2To}`,
      `Converted Result: ${b2Calc.toAmount.toLocaleString()} ${b2To}`,
    ];

    const newItem: SavedCurrencyItem = {
      id: Date.now().toString(),
      title: "Custom Rate Conversion",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox2.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_cur_box2", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  const handleDeleteSavedBox2 = (id: string) => {
    const updated = savedBox2.filter((item) => item.id !== id);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_cur_box2", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox2 = () => {
    setSavedBox2([]);
    try {
      localStorage.removeItem("saved_cur_box2");
    } catch (e) {}
  };

  // Box 3 Calculations (Multi-Currency Converter)
  const b3Targets = useMemo(() => ["EUR", "GBP", "JPY", "CAD", "AUD", "INR"], []);
  const b3Calc = useMemo(() => {
    const amt = parseFloat(b3Amount) || 100;
    return b3Targets.map((code) => {
      const res = convertCurrency(amt, b3Base, code);
      return {
        code,
        name: CURRENCY_MAP[code]?.name || code,
        flag: CURRENCY_MAP[code]?.flag || "🌐",
        amount: res.toAmount,
        rate: res.rate,
      };
    });
  }, [b3Amount, b3Base, b3Targets]);

  const handleSaveBox3 = () => {
    const inputsStr = `${b3Amount} ${b3Base} ➔ Multi-Currency Basket`;
    const primaryStr = `Converted to 6 global currencies (EUR: €${b3Calc[0]?.amount}, GBP: £${b3Calc[1]?.amount}, JPY: ¥${b3Calc[2]?.amount})`;

    const detailsList = b3Calc.map(
      (item) => `${item.flag} ${item.code} (${item.name}): ${item.amount.toLocaleString()} (Rate: ${item.rate})`
    );

    const newItem: SavedCurrencyItem = {
      id: Date.now().toString(),
      title: "Multi-Currency Basket Conversion",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox3.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_cur_box3", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  const handleDeleteSavedBox3 = (id: string) => {
    const updated = savedBox3.filter((item) => item.id !== id);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_cur_box3", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox3 = () => {
    setSavedBox3([]);
    try {
      localStorage.removeItem("saved_cur_box3");
    } catch (e) {}
  };

  // Box 4 Calculations (Bank Markup Simulator)
  const b4Calc = useMemo(() => {
    const amt = parseFloat(b4Amount) || 1000;
    const midRate = convertCurrency(1, b4From, b4To).rate;
    const markup = parseFloat(b4MarkupPercent) || 3.0;
    const fee = parseFloat(b4FixedFee) || 15;

    return calculateBankMarkup(amt, b4From, b4To, midRate, markup, fee, "Bank / Wire Transfer");
  }, [b4Amount, b4From, b4To, b4MarkupPercent, b4FixedFee]);

  const handleSaveBox4 = () => {
    const inputsStr = `${b4Amount} ${b4From} ➔ ${b4To} | Markup: ${b4MarkupPercent}% + $${b4FixedFee} Fee`;
    const primaryStr = `Net Received: ${b4Calc.netTargetAmount.toLocaleString()} ${b4To} | Hidden Markup Loss: -${b4Calc.hiddenLossVsMidMarket.toLocaleString()} ${b4To}`;

    const detailsList = [
      `Gross Mid-Market Value: ${b4Calc.grossTargetAmount.toLocaleString()} ${b4To}`,
      `Fixed Transfer Fee Deducted: -$${b4Calc.fixedFee}`,
      `FX Spread Markup Loss (${b4MarkupPercent}%): -${b4Calc.hiddenLossVsMidMarket.toLocaleString()} ${b4To}`,
      `Net In-Hand Delivered: ${b4Calc.netTargetAmount.toLocaleString()} ${b4To}`,
    ];

    const newItem: SavedCurrencyItem = {
      id: Date.now().toString(),
      title: "Bank Fee & FX Markup Simulator",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox4.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_cur_box4", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  const handleDeleteSavedBox4 = (id: string) => {
    const updated = savedBox4.filter((item) => item.id !== id);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_cur_box4", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox4 = () => {
    setSavedBox4([]);
    try {
      localStorage.removeItem("saved_cur_box4");
    } catch (e) {}
  };

  // Box 5 Calculations (Travel Cash & Daily Splitter)
  const b5Calc = useMemo(() => {
    const budget = parseFloat(b5BudgetHome) || 2500;
    const rate = convertCurrency(1, b5HomeCurr, b5DestCurr).rate;
    const days = parseFloat(b5TripDays) || 14;

    return calculateTravelBudget(budget, b5HomeCurr, b5DestCurr, rate, days);
  }, [b5BudgetHome, b5HomeCurr, b5DestCurr, b5TripDays]);

  const handleSaveBox5 = () => {
    const inputsStr = `Budget: ${b5BudgetHome} ${b5HomeCurr} for ${b5TripDays} Days in ${b5DestCurr}`;
    const primaryStr = `Total Foreign Cash: ${b5Calc.totalBudgetForeign.toLocaleString()} ${b5DestCurr} | Daily Limit: ${b5Calc.dailySpendingLimitForeign.toLocaleString()} ${b5DestCurr} / day`;

    const detailsList = [
      `Total Travel Budget: ${b5Calc.totalBudgetHome.toLocaleString()} ${b5HomeCurr}`,
      `Total Destination Cash: ${b5Calc.totalBudgetForeign.toLocaleString()} ${b5DestCurr}`,
      `Daily Spending Allowance: ${b5Calc.dailySpendingLimitForeign.toLocaleString()} ${b5DestCurr} / day (${b5Calc.dailySpendingLimitHome.toLocaleString()} ${b5HomeCurr} / day)`,
    ];

    const newItem: SavedCurrencyItem = {
      id: Date.now().toString(),
      title: "Travel Budget & Daily Spending Splitter",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox5.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_cur_box5", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  const handleDeleteSavedBox5 = (id: string) => {
    const updated = savedBox5.filter((item) => item.id !== id);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_cur_box5", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox5 = () => {
    setSavedBox5([]);
    try {
      localStorage.removeItem("saved_cur_box5");
    } catch (e) {}
  };

  // Box 6 Calculations (Major Currency Matrix)
  const b6Codes = useMemo(() => ["USD", "EUR", "GBP", "CNY", "JPY", "CAD", "AUD"], []);
  const b6Matrix = useMemo(() => generateMajorCurrencyMatrix(b6Codes), [b6Codes]);

  const handleExportBox6CSV = () => {
    const headers = ["Base Currency", ...b6Codes];
    const rows = b6Matrix.map((r) => [
      r.base,
      ...b6Codes.map((c) => r.rates[c]?.toString() || "1.0"),
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("major_currency_pairs_matrix.csv", csv);
  };

  const handleSaveBox6 = () => {
    const inputsStr = `Major Currency Pairs Matrix (USD, EUR, GBP, CNY, JPY, CAD, AUD)`;
    const primaryStr = `Cross Rates (1 USD = ${b6Matrix[0]?.rates["EUR"]} EUR, 1 EUR = ${b6Matrix[1]?.rates["USD"]} USD, 1 GBP = ${b6Matrix[2]?.rates["USD"]} USD)`;

    const detailsList = b6Matrix.map(
      (r) => `1 ${r.base} = ${r.rates["USD"]} USD | ${r.rates["EUR"]} EUR | ${r.rates["GBP"]} GBP`
    );

    const newItem: SavedCurrencyItem = {
      id: Date.now().toString(),
      title: "Major Currency Pairs Cross Matrix",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox6.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_cur_box6", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  const handleDeleteSavedBox6 = (id: string) => {
    const updated = savedBox6.filter((item) => item.id !== id);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_cur_box6", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox6 = () => {
    setSavedBox6([]);
    try {
      localStorage.removeItem("saved_cur_box6");
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* =========================================================================
          BOX 1: LIVE BIDIRECTIONAL CONVERTER (CORE)
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Live Currency Converter &amp; Exchange Rate Matrix</span>
          <button
            type="button"
            onClick={handleSaveBox1}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox1 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT CONTROLS */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Currency Conversion Amount
              </span>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Amount
                </label>
                <input
                  type="number"
                  step={10}
                  value={b1Amount}
                  onChange={(e) => setB1Amount(e.target.value)}
                  className={input3DClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-11 gap-2 items-center">
                <div className="sm:col-span-5">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    From Currency
                  </label>
                  <select
                    value={b1From}
                    onChange={(e) => setB1From(e.target.value)}
                    className={select3DClass}
                  >
                    {POPULAR_CURRENCIES.map((cur) => (
                      <option key={cur.code} value={cur.code}>
                        {cur.flag} {cur.code} - {cur.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-1 flex justify-center pt-3 sm:pt-4">
                  <button
                    type="button"
                    onClick={handleSwapB1}
                    title="Swap Currencies"
                    className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-900 cursor-pointer transition-transform active:scale-95"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="sm:col-span-5">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    To Currency
                  </label>
                  <select
                    value={b1To}
                    onChange={(e) => setB1To(e.target.value)}
                    className={select3DClass}
                  >
                    {POPULAR_CURRENCIES.map((cur) => (
                      <option key={cur.code} value={cur.code}>
                        {cur.flag} {cur.code} - {cur.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* RIGHT HERO OUTPUT */}
            <div className="lg:col-span-6 space-y-3">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
                <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Converted Currency Result
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums flex items-baseline gap-2">
                    <span>
                      {b1Calc.toAmount.toLocaleString()}{" "}
                      <span className="text-sm font-semibold text-slate-500">{b1To}</span>
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium font-sans">
                    {b1Amount} {b1From} = {b1Calc.toAmount.toLocaleString()} {b1To}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans tabular-nums">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Base Exchange Rate</span>
                    <span className="text-slate-900 dark:text-slate-100 font-extrabold text-xs">
                      1 {b1From} = {b1Calc.rate} {b1To}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Inverse Rate</span>
                    <span className="text-slate-900 dark:text-slate-100 font-extrabold text-xs">
                      1 {b1To} = {b1Calc.inverseRate} {b1From}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CHEAT SHEET TABLE */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {b1From} to {b1To} Quick-Conversion Matrix Cheat Sheet
              </span>
              <button
                type="button"
                onClick={handleExportBox1CSV}
                className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-[11px] font-bold flex items-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer border border-slate-300 dark:border-slate-700 transition-colors"
              >
                <Download className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span>Export Cheat Sheet (CSV)</span>
              </button>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-center border-collapse font-sans tabular-nums">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-2 text-left">{b1From} Amount</th>
                    <th className="p-2 text-right">{b1To} Equivalent</th>
                    <th className="p-2 text-left pl-6 border-l border-slate-200 dark:border-slate-700">{b1To} Unit</th>
                    <th className="p-2 text-right">{b1From} Equivalent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {b1CheatSheet.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-1.5 text-left font-bold text-slate-800 dark:text-slate-200">
                        {row.unit} {b1From}
                      </td>
                      <td className="p-1.5 text-right font-extrabold text-blue-600 dark:text-blue-400">
                        {row.convertedAmount.toLocaleString()} {b1To}
                      </td>
                      <td className="p-1.5 text-left pl-6 font-bold text-slate-800 dark:text-slate-200 border-l border-slate-200 dark:border-slate-700">
                        {row.inverseUnit} {b1To}
                      </td>
                      <td className="p-1.5 text-right font-extrabold text-emerald-600">
                        {row.inverseConvertedAmount.toLocaleString()} {b1From}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 1 */}
          {savedBox1.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Currency Conversions ({savedBox1.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox1}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox1.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox1(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BOX 2: CUSTOM / MANUAL EXCHANGE RATE
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Customized / Street Currency Exchange Rate Calculator</span>
          <button
            type="button"
            onClick={handleSaveBox2}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox2 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Manual Exchange Rate Parameters
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Currency A (Base)</label>
                  <select
                    value={b2From}
                    onChange={(e) => setB2From(e.target.value)}
                    className={select3DClass}
                  >
                    {POPULAR_CURRENCIES.map((cur) => (
                      <option key={cur.code} value={cur.code}>
                        {cur.code} ({cur.symbol})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Currency B (Quote)</label>
                  <select
                    value={b2To}
                    onChange={(e) => setB2To(e.target.value)}
                    className={select3DClass}
                  >
                    {POPULAR_CURRENCIES.map((cur) => (
                      <option key={cur.code} value={cur.code}>
                        {cur.code} ({cur.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">
                    1 {b2From} = Units of {b2To}
                  </label>
                  <input
                    type="number"
                    step={0.01}
                    value={b2CustomRate}
                    onChange={(e) => setB2CustomRate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Amount to Exchange</label>
                  <input
                    type="number"
                    step={10}
                    value={b2Amount}
                    onChange={(e) => setB2Amount(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                  Custom Converted Total
                </span>
                <span className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums">
                  {b2Calc.toAmount.toLocaleString()} {b2To}
                </span>
                <span className="text-xs text-slate-500 font-medium block font-sans">
                  Rate: 1 {b2From} = {b2CustomRate} {b2To}
                </span>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 2 */}
          {savedBox2.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Custom Rate Calculations ({savedBox2.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox2}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox2.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox2(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BOX 3: MULTI-CURRENCY SIMULTANEOUS CONVERTER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Multi-Currency Simultaneous Basket Converter</span>
          <button
            type="button"
            onClick={handleSaveBox3}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox3 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Base Currency Amount
              </span>

              <div>
                <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">Amount</label>
                <input
                  type="number"
                  step={50}
                  value={b3Amount}
                  onChange={(e) => setB3Amount(e.target.value)}
                  className={input3DClass}
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">Base Currency</label>
                <select
                  value={b3Base}
                  onChange={(e) => setB3Base(e.target.value)}
                  className={select3DClass}
                >
                  {POPULAR_CURRENCIES.map((cur) => (
                    <option key={cur.code} value={cur.code}>
                      {cur.flag} {cur.code} - {cur.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-sans tabular-nums">
              {b3Calc.map((item) => (
                <div
                  key={item.code}
                  className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>
                      {item.flag} {item.code}
                    </span>
                    <span className="text-[10px] text-slate-400">1 = {item.rate}</span>
                  </div>
                  <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400 block">
                    {item.amount.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 block truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 3 */}
          {savedBox3.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Multi-Currency Baskets ({savedBox3.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox3}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox3.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox3(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BOX 4: BANK TRANSFER FEE & HIDDEN SPREAD SIMULATOR
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Bank Transfer Fee &amp; Hidden FX Markup Simulator</span>
          <button
            type="button"
            onClick={handleSaveBox4}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox4 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Transfer Fees &amp; Markup Spread
              </span>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Transfer ($)</label>
                  <input
                    type="number"
                    step={100}
                    value={b4Amount}
                    onChange={(e) => setB4Amount(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Markup (%)</label>
                  <input
                    type="number"
                    step={0.5}
                    value={b4MarkupPercent}
                    onChange={(e) => setB4MarkupPercent(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Fixed Fee ($)</label>
                  <input
                    type="number"
                    step={5}
                    value={b4FixedFee}
                    onChange={(e) => setB4FixedFee(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Net Received Amount
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums">
                    {b4Calc.netTargetAmount.toLocaleString()} {b4To}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Hidden Markup Loss</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200 inline-block font-sans tabular-nums">
                    -{b4Calc.hiddenLossVsMidMarket.toLocaleString()} {b4To}
                  </span>
                </div>
              </div>

              <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-sans tabular-nums flex justify-between">
                <span>Mid-Market Value (0% Fee):</span>
                <span className="font-extrabold text-slate-900 dark:text-slate-100">{b4Calc.grossTargetAmount.toLocaleString()} {b4To}</span>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 4 */}
          {savedBox4.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Transfer Fee Calculations ({savedBox4.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox4}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox4.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox4(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BOX 5: TRAVEL CASH & DAILY BUDGET SPLITTER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Travel Cash &amp; Daily Spending Budget Splitter</span>
          <button
            type="button"
            onClick={handleSaveBox5}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox5 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Vacation Trip Budget
              </span>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Total Budget ($)</label>
                  <input
                    type="number"
                    step={100}
                    value={b5BudgetHome}
                    onChange={(e) => setB5BudgetHome(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Destination</label>
                  <select
                    value={b5DestCurr}
                    onChange={(e) => setB5DestCurr(e.target.value)}
                    className={select3DClass}
                  >
                    {POPULAR_CURRENCIES.map((cur) => (
                      <option key={cur.code} value={cur.code}>
                        {cur.flag} {cur.code}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Trip Days</label>
                  <input
                    type="number"
                    step={1}
                    value={b5TripDays}
                    onChange={(e) => setB5TripDays(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Daily Spending Allowance
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums">
                    {b5Calc.dailySpendingLimitForeign.toLocaleString()} {b5DestCurr} <span className="text-xs font-medium text-slate-400">/ day</span>
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Foreign Cash</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 inline-block font-sans tabular-nums">
                    {b5Calc.totalBudgetForeign.toLocaleString()} {b5DestCurr}
                  </span>
                </div>
              </div>

              <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-sans tabular-nums flex justify-between">
                <span>Daily Budget in Home Currency:</span>
                <span className="font-extrabold text-slate-900 dark:text-slate-100">${b5Calc.dailySpendingLimitHome.toLocaleString()} {b5HomeCurr} / day</span>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 5 */}
          {savedBox5.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Travel Budgets ({savedBox5.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox5}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox5.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox5(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BOX 6: MAJOR CURRENCY CROSS MATRIX
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Major Global Currency Cross-Rate Matrix</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportBox6CSV}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3 text-white" />
              <span>Export (CSV)</span>
            </button>
            <button
              type="button"
              onClick={handleSaveBox6}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedBox6 ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <table className="w-full text-center border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-2 text-left">Base (1 Unit)</th>
                  {b6Codes.map((c) => (
                    <th key={c} className="p-2">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {b6Matrix.map((row) => (
                  <tr key={row.base} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-2 text-left font-bold text-slate-900 dark:text-slate-100">
                      1 {row.base}
                    </td>
                    {b6Codes.map((target) => (
                      <td
                        key={target}
                        className={`p-2 ${
                          row.base === target
                            ? "bg-slate-100/70 dark:bg-slate-800/70 font-bold text-slate-400"
                            : "text-slate-700 dark:text-slate-300 font-medium"
                        }`}
                      >
                        {row.rates[target]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 6 */}
          {savedBox6.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Matrix Snapshots ({savedBox6.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox6}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox6.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox6(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrencyCalculator;
