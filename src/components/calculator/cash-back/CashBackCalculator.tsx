"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, ChevronDown, ChevronUp, Download, ShieldCheck, TrendingUp, BarChart2 } from "lucide-react";
import {
  calculateCashBackVsLowInterest,
  calculateBreakevenRate,
  calculateReinvestment,
  calculateMultiOffer,
  calculateEarlyPayoff,
  calculateNegativeEquity,
} from "@/app/calculators/cash-back-or-low-interest-calculator/calculator";
import { SavedCashBackItem } from "@/app/calculators/cash-back-or-low-interest-calculator/types";

export function CashBackCalculator() {
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // =========================================================================
  // BOX 1: CASH BACK OR LOW INTEREST CALCULATOR (EXACT COMPETITOR PARITY)
  // =========================================================================
  const [cashBackAmount, setCashBackAmount] = useState<string>("1000");
  const [highInterestRate, setHighInterestRate] = useState<string>("5");
  const [lowInterestRate, setLowInterestRate] = useState<string>("2");

  const [autoPrice, setAutoPrice] = useState<string>("50000");
  const [loanTermMonths, setLoanTermMonths] = useState<string>("60");
  const [downPayment, setDownPayment] = useState<string>("10000");
  const [tradeInValue, setTradeInValue] = useState<string>("0");
  const [selectedState, setSelectedState] = useState<string>("CA");
  const [salesTaxRate, setSalesTaxRate] = useState<string>("7");
  const [fees, setFees] = useState<string>("2000");
  const [includeFeesInLoan, setIncludeFeesInLoan] = useState<boolean>(false);
  const [taxAfterRebate, setTaxAfterRebate] = useState<boolean>(false);
  const [reinvestmentRate, setReinvestmentRate] = useState<string>("5");

  const [savedBox1Items, setSavedBox1Items] = useState<SavedCashBackItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);
  const [showHistoryBox1, setShowHistoryBox1] = useState<boolean>(false);

  const cbCalc = useMemo(() => {
    return calculateCashBackVsLowInterest({
      cashBackAmount: parseFloat(cashBackAmount) || 0,
      highInterestRate: parseFloat(highInterestRate) || 0,
      lowInterestRate: parseFloat(lowInterestRate) || 0,
      autoPrice: parseFloat(autoPrice) || 0,
      loanTermMonths: parseFloat(loanTermMonths) || 60,
      downPayment: parseFloat(downPayment) || 0,
      tradeInValue: parseFloat(tradeInValue) || 0,
      salesTaxRate: parseFloat(salesTaxRate) || 0,
      fees: parseFloat(fees) || 0,
      includeFeesInLoan,
      taxAfterRebate,
      reinvestmentRate: parseFloat(reinvestmentRate) || 0,
      currencySymbol,
    });
  }, [
    cashBackAmount,
    highInterestRate,
    lowInterestRate,
    autoPrice,
    loanTermMonths,
    downPayment,
    tradeInValue,
    salesTaxRate,
    fees,
    includeFeesInLoan,
    taxAfterRebate,
    reinvestmentRate,
    currencySymbol,
  ]);

  const handleSaveBox1 = () => {
    const newItem: SavedCashBackItem = {
      id: Date.now().toString(),
      title: "Cash Back vs. Low Interest Calculation",
      inputsSummary: `Price: ${currencySymbol}${parseFloat(autoPrice || "0").toLocaleString()} | Rebate: ${currencySymbol}${parseFloat(cashBackAmount || "0").toLocaleString()} | High Rate: ${highInterestRate}% | Low Rate: ${lowInterestRate}% | Term: ${loanTermMonths} Mos | Down: ${currencySymbol}${parseFloat(downPayment || "0").toLocaleString()} | Trade: ${currencySymbol}${parseFloat(tradeInValue || "0").toLocaleString()} | Tax: ${salesTaxRate}% | Fees: ${currencySymbol}${parseFloat(fees || "0").toLocaleString()}`,
      primaryResult: cbCalc.winningMessage,
      detailsList: [
        `Net Dollar Savings: ${currencySymbol}${cbCalc.savingsAmount.toLocaleString()}`,
        `Breakeven Outside Rate: ${cbCalc.breakevenRate}%`,
        `Cash Back Offer: Pay = ${currencySymbol}${cbCalc.cashBackOffer.monthlyPayment}/mo | Upfront = ${currencySymbol}${cbCalc.cashBackOffer.upfrontPayment.toLocaleString()} | Interest = ${currencySymbol}${cbCalc.cashBackOffer.totalInterest.toLocaleString()} | Total = ${currencySymbol}${cbCalc.cashBackOffer.totalCost.toLocaleString()}`,
        `Low Interest Offer: Pay = ${currencySymbol}${cbCalc.lowInterestOffer.monthlyPayment}/mo | Upfront = ${currencySymbol}${cbCalc.lowInterestOffer.upfrontPayment.toLocaleString()} | Interest = ${currencySymbol}${cbCalc.lowInterestOffer.totalInterest.toLocaleString()} | Total = ${currencySymbol}${cbCalc.lowInterestOffer.totalCost.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox1Items];
    setSavedBox1Items(updated);
    setShowHistoryBox1(true);
    try {
      localStorage.setItem("saved_cb_box1", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleExportCSV = () => {
    const data = cbCalc.amortizationSchedule;
    if (!data || data.length === 0) return;

    const headers = ["Month", "Cash Back Balance", "Cash Back Payment", "Cash Back Interest", "Low Interest Balance", "Low Interest Payment", "Low Interest Interest"];
    const rows = data.map((row) => [
      `"Month ${row.month}"`,
      `"${currencySymbol}${row.cashBackBalance}"`,
      `"${currencySymbol}${row.cashBackPayment}"`,
      `"${currencySymbol}${row.cashBackInterest}"`,
      `"${currencySymbol}${row.lowInterestBalance}"`,
      `"${currencySymbol}${row.lowInterestPayment}"`,
      `"${currencySymbol}${row.lowInterestInterest}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `cash_back_vs_low_interest_schedule.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // High-Quality SVG Payoff & Cost Comparison Chart
  const svgCharts = useMemo(() => {
    const data = cbCalc.amortizationSchedule;
    if (!data || data.length === 0) return null;

    const maxVal = Math.max(cbCalc.cashBackOffer.totalLoanAmount, cbCalc.lowInterestOffer.totalLoanAmount) || 1;

    const pointsCash = data
      .map((d, i) => {
        const x = (i / (data.length - 1)) * 320 + 35;
        const y = 135 - (d.cashBackBalance / maxVal) * 105;
        return `${x},${y}`;
      })
      .join(" ");

    const pointsLow = data
      .map((d, i) => {
        const x = (i / (data.length - 1)) * 320 + 35;
        const y = 135 - (d.lowInterestBalance / maxVal) * 105;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <div className="space-y-4">
        {/* Stacked Cost Bar Chart Component */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold px-1">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-blue-600" />
              Total Cost Breakdown ($)
            </span>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1 text-blue-600 font-bold"><span className="w-2.5 h-2.5 bg-blue-600 rounded"></span> Principal</span>
              <span className="flex items-center gap-1 text-red-500 font-bold"><span className="w-2.5 h-2.5 bg-red-500 rounded"></span> Interest</span>
              <span className="flex items-center gap-1 text-amber-500 font-bold"><span className="w-2.5 h-2.5 bg-amber-500 rounded"></span> Tax & Fees</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs shadow-xs">
            {/* Cash Back Offer Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-bold">
                <span className="text-blue-600">Cash Back</span>
                <span className="font-extrabold">{currencySymbol}{cbCalc.cashBackOffer.totalCost.toLocaleString()}</span>
              </div>
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex">
                <div className="bg-blue-600 h-full" style={{ width: `${(cbCalc.cashBackOffer.totalLoanAmount / cbCalc.cashBackOffer.totalCost) * 100}%` }}></div>
                <div className="bg-red-500 h-full" style={{ width: `${(cbCalc.cashBackOffer.totalInterest / cbCalc.cashBackOffer.totalCost) * 100}%` }}></div>
                <div className="bg-amber-500 h-full" style={{ width: `${((cbCalc.cashBackOffer.salesTax + (parseFloat(fees) || 0)) / cbCalc.cashBackOffer.totalCost) * 100}%` }}></div>
              </div>
            </div>

            {/* Low Interest Offer Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-bold">
                <span className="text-emerald-600">Low Rate</span>
                <span className="font-extrabold">{currencySymbol}{cbCalc.lowInterestOffer.totalCost.toLocaleString()}</span>
              </div>
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex">
                <div className="bg-blue-600 h-full" style={{ width: `${(cbCalc.lowInterestOffer.totalLoanAmount / cbCalc.lowInterestOffer.totalCost) * 100}%` }}></div>
                <div className="bg-red-500 h-full" style={{ width: `${(cbCalc.lowInterestOffer.totalInterest / cbCalc.lowInterestOffer.totalCost) * 100}%` }}></div>
                <div className="bg-amber-500 h-full" style={{ width: `${((cbCalc.lowInterestOffer.salesTax + (parseFloat(fees) || 0)) / cbCalc.lowInterestOffer.totalCost) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Balance Payoff Line Graph */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold px-1">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Loan Principal Payoff Balance Curve ($)
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-blue-600 font-extrabold"><span className="w-3 h-1 bg-blue-600 rounded-full inline-block"></span> Cash Back</span>
              <span className="flex items-center gap-1.5 text-emerald-600 font-extrabold"><span className="w-3 h-1 bg-emerald-600 rounded-full inline-block"></span> Low APR</span>
            </div>
          </div>

          <svg viewBox="0 0 380 165" className="w-full h-40 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-xs">
            <line x1="35" y1="30" x2="355" y2="30" stroke="#f1f5f9" strokeDasharray="3 3" />
            <line x1="35" y1="82" x2="355" y2="82" stroke="#f1f5f9" strokeDasharray="3 3" />
            <line x1="35" y1="135" x2="355" y2="135" stroke="#cbd5e1" />

            <polyline fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" points={pointsCash} />
            <polyline fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" points={pointsLow} />

            <text x="30" y="33" fontSize="8" fill="#94a3b8" textAnchor="end" fontWeight="bold">{currencySymbol}{Math.round(maxVal / 1000)}k</text>
            <text x="30" y="138" fontSize="8" fill="#94a3b8" textAnchor="end" fontWeight="bold">{currencySymbol}0</text>

            <text x="35" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">Mo 1</text>
            <text x="115" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">Mo 15</text>
            <text x="195" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">Mo 30</text>
            <text x="275" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">Mo 45</text>
            <text x="355" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">Mo 60</text>
          </svg>
        </div>
      </div>
    );
  }, [cbCalc, currencySymbol, fees]);

  // =========================================================================
  // BOX 2 TO 6 STATES
  // =========================================================================
  const [savedBox2Items, setSavedBox2Items] = useState<SavedCashBackItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);
  const [showHistoryBox2, setShowHistoryBox2] = useState<boolean>(false);

  const bSolve = useMemo(() => {
    return calculateBreakevenRate({
      autoPrice: parseFloat(autoPrice) || 50000,
      cashBackAmount: parseFloat(cashBackAmount) || 1000,
      lowInterestRate: parseFloat(lowInterestRate) || 2.0,
      loanTermMonths: parseFloat(loanTermMonths) || 60,
    });
  }, [autoPrice, cashBackAmount, lowInterestRate, loanTermMonths]);

  const handleSaveBox2 = () => {
    const newItem: SavedCashBackItem = {
      id: Date.now().toString(),
      title: "Breakeven Interest Rate Solver",
      inputsSummary: `Price: ${currencySymbol}${parseFloat(autoPrice || "0").toLocaleString()} | Rebate: ${currencySymbol}${parseFloat(cashBackAmount || "0").toLocaleString()} | Low Rate: ${lowInterestRate}%`,
      primaryResult: `Breakeven Outside Rate: ${bSolve.breakevenRate}%`,
      detailsList: [bSolve.explanation],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox2Items];
    setSavedBox2Items(updated);
    setShowHistoryBox2(true);
    try {
      localStorage.setItem("saved_cb_box2", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  const [savedBox3Items, setSavedBox3Items] = useState<SavedCashBackItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);
  const [showHistoryBox3, setShowHistoryBox3] = useState<boolean>(false);

  const reinvCalc = useMemo(() => {
    const mSavings = Math.abs(cbCalc.cashBackOffer.monthlyPayment - cbCalc.lowInterestOffer.monthlyPayment);
    return calculateReinvestment({
      cashBackAmount: parseFloat(cashBackAmount) || 1000,
      reinvestmentRate: parseFloat(reinvestmentRate) || 5.0,
      monthlySavings: mSavings,
      loanTermMonths: parseFloat(loanTermMonths) || 60,
    });
  }, [cashBackAmount, reinvestmentRate, cbCalc, loanTermMonths]);

  const handleSaveBox3 = () => {
    const newItem: SavedCashBackItem = {
      id: Date.now().toString(),
      title: "Rebate Reinvestment & Opportunity Cost",
      inputsSummary: `Rebate: ${currencySymbol}${parseFloat(cashBackAmount || "0").toLocaleString()} @ ${reinvestmentRate}% Return Rate (${loanTermMonths} Mos)`,
      primaryResult: `Winner: ${reinvCalc.winner}`,
      detailsList: [
        `Reinvested Rebate Value: ${currencySymbol}${reinvCalc.futureReinvestedRebate.toLocaleString()}`,
        `Monthly Savings Investment Value: ${currencySymbol}${reinvCalc.futureMonthlySavings.toLocaleString()}`,
        reinvCalc.explanation,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox3Items];
    setSavedBox3Items(updated);
    setShowHistoryBox3(true);
    try {
      localStorage.setItem("saved_cb_box3", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  const [savedBox4Items, setSavedBox4Items] = useState<SavedCashBackItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);
  const [showHistoryBox4, setShowHistoryBox4] = useState<boolean>(false);

  const multiCalc = useMemo(() => {
    return calculateMultiOffer({
      autoPrice: parseFloat(autoPrice) || 50000,
      loanTermMonths: parseFloat(loanTermMonths) || 60,
      offer1Rebate: 0,
      offer1Rate: 0.0,
      offer2Rebate: 1500,
      offer2Rate: 2.9,
      offer3Rebate: 3500,
      offer3Rate: 6.9,
    });
  }, [autoPrice, loanTermMonths]);

  const handleSaveBox4 = () => {
    const newItem: SavedCashBackItem = {
      id: Date.now().toString(),
      title: "Multi-Offer Financing Comparison",
      inputsSummary: `Vehicle Price: ${currencySymbol}${parseFloat(autoPrice || "0").toLocaleString()} (${loanTermMonths} Mos)`,
      primaryResult: `Best Choice: ${multiCalc.bestOfferName}`,
      detailsList: [
        `Offer 1 (0% APR + $0 Rebate): ${currencySymbol}${multiCalc.offer1TotalCost.toLocaleString()}`,
        `Offer 2 (2.9% APR + $1,500 Rebate): ${currencySymbol}${multiCalc.offer2TotalCost.toLocaleString()}`,
        `Offer 3 (6.9% Bank Loan + $3,500 Rebate): ${currencySymbol}${multiCalc.offer3TotalCost.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox4Items];
    setSavedBox4Items(updated);
    setShowHistoryBox4(true);
    try {
      localStorage.setItem("saved_cb_box4", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  const [payoffMonth, setPayoffMonth] = useState<string>("24");
  const [savedBox5Items, setSavedBox5Items] = useState<SavedCashBackItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);
  const [showHistoryBox5, setShowHistoryBox5] = useState<boolean>(false);

  const earlyCalc = useMemo(() => {
    return calculateEarlyPayoff({
      autoPrice: parseFloat(autoPrice) || 50000,
      cashBackAmount: parseFloat(cashBackAmount) || 1000,
      highRate: parseFloat(highInterestRate) || 5.0,
      lowRate: parseFloat(lowInterestRate) || 2.0,
      payoffMonth: parseFloat(payoffMonth) || 24,
      loanTermMonths: parseFloat(loanTermMonths) || 60,
    });
  }, [autoPrice, cashBackAmount, highInterestRate, lowInterestRate, payoffMonth, loanTermMonths]);

  const handleSaveBox5 = () => {
    const newItem: SavedCashBackItem = {
      id: Date.now().toString(),
      title: "Early Loan Payoff Impact",
      inputsSummary: `Paid Off Early at Month ${payoffMonth} of ${loanTermMonths}`,
      primaryResult: `Early Payoff Winner: ${earlyCalc.earlyWinner}`,
      detailsList: [
        `Cash Back Early Cost: ${currencySymbol}${earlyCalc.cashBackEarlyCost.toLocaleString()}`,
        `Low Interest Early Cost: ${currencySymbol}${earlyCalc.lowInterestEarlyCost.toLocaleString()}`,
        `Unaccrued Interest Saved: ${currencySymbol}${earlyCalc.interestSaved.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox5Items];
    setSavedBox5Items(updated);
    setShowHistoryBox5(true);
    try {
      localStorage.setItem("saved_cb_box5", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  const [existingLoanBalance, setExistingLoanBalance] = useState<string>("15000");
  const [savedBox6Items, setSavedBox6Items] = useState<SavedCashBackItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);
  const [showHistoryBox6, setShowHistoryBox6] = useState<boolean>(false);

  const negCalc = useMemo(() => {
    return calculateNegativeEquity({
      tradeInValue: parseFloat(tradeInValue) || 12000,
      existingLoanBalance: parseFloat(existingLoanBalance) || 15000,
      autoPrice: parseFloat(autoPrice) || 50000,
      cashBackAmount: parseFloat(cashBackAmount) || 1000,
      highRate: parseFloat(highInterestRate) || 5.0,
      lowRate: parseFloat(lowInterestRate) || 2.0,
      loanTermMonths: parseFloat(loanTermMonths) || 60,
    });
  }, [tradeInValue, existingLoanBalance, autoPrice, cashBackAmount, highInterestRate, lowInterestRate, loanTermMonths]);

  const handleSaveBox6 = () => {
    const newItem: SavedCashBackItem = {
      id: Date.now().toString(),
      title: "Negative Equity Trade-In Roll-In",
      inputsSummary: `Trade Allowance: ${currencySymbol}${parseFloat(tradeInValue || "0").toLocaleString()} | Owed: ${currencySymbol}${parseFloat(existingLoanBalance || "0").toLocaleString()} (Rolled In: ${currencySymbol}${negCalc.rolledInAmount.toLocaleString()})`,
      primaryResult: `Low Rate Monthly: ${currencySymbol}${negCalc.lowInterestMonthly}/mo vs Cash Back: ${currencySymbol}${negCalc.cashBackMonthly}/mo`,
      detailsList: [negCalc.recommendation],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox6Items];
    setSavedBox6Items(updated);
    setShowHistoryBox6(true);
    try {
      localStorage.setItem("saved_cb_box6", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  useEffect(() => {
    try {
      const b1 = localStorage.getItem("saved_cb_box1");
      if (b1) setSavedBox1Items(JSON.parse(b1));
      const b2 = localStorage.getItem("saved_cb_box2");
      if (b2) setSavedBox2Items(JSON.parse(b2));
      const b3 = localStorage.getItem("saved_cb_box3");
      if (b3) setSavedBox3Items(JSON.parse(b3));
      const b4 = localStorage.getItem("saved_cb_box4");
      if (b4) setSavedBox4Items(JSON.parse(b4));
      const b5 = localStorage.getItem("saved_cb_box5");
      if (b5) setSavedBox5Items(JSON.parse(b5));
      const b6 = localStorage.getItem("saved_cb_box6");
      if (b6) setSavedBox6Items(JSON.parse(b6));
    } catch (e) {}
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Currency Selector Header */}
      <div className="flex items-center justify-end gap-2 text-xs font-bold">
        <label htmlFor="cb-currency-select" className="text-slate-500 font-medium">Currency:</label>
        <select
          id="cb-currency-select"
          value={currencySymbol}
          onChange={(e) => setCurrencySymbol(e.target.value)}
          className="h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans font-bold cursor-pointer"
        >
          <option value="$">USD ($)</option>
          <option value="€">EUR (€)</option>
          <option value="£">GBP (£)</option>
          <option value="C$">CAD (C$)</option>
          <option value="A$">AUD (A$)</option>
          <option value="₹">INR (₹)</option>
        </select>
      </div>

      {/* ========================================================================= */}
      {/* 1. CASH BACK OR LOW INTEREST CALCULATOR (TWO COLUMNS INPUTS & TWO COLUMNS RESULTS) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Cash Back or Low Interest Calculator</span>
          <button
            type="button"
            onClick={handleSaveBox1}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox1 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* TWO COLUMNS INPUT SECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs text-xs">
            {/* Column 1: Vehicle Purchase & Rebate Offer Inputs */}
            <div className="space-y-3">
              <span className="font-extrabold text-blue-600 dark:text-blue-400 block border-b border-slate-200 dark:border-slate-800 pb-1 uppercase tracking-wider text-[11px]">
                Vehicle Purchase & Rebate Parameters
              </span>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Auto Price ($)</label>
                <input type="number" value={autoPrice} onChange={(e) => setAutoPrice(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Cash Back Amount ($)</label>
                <input type="number" value={cashBackAmount} onChange={(e) => setCashBackAmount(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Down Payment ($)</label>
                <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Trade-in Value ($)</label>
                <input type="number" value={tradeInValue} onChange={(e) => setTradeInValue(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Title, Registration & Fees ($)</label>
                <input type="number" value={fees} onChange={(e) => setFees(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
              </div>
            </div>

            {/* Column 2: Rates, Term & Tax Parameters */}
            <div className="space-y-3">
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 block border-b border-slate-200 dark:border-slate-800 pb-1 uppercase tracking-wider text-[11px]">
                Financing Rates & Tax Settings
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Interest Rate (High) %</label>
                  <input type="number" step="0.1" value={highInterestRate} onChange={(e) => setHighInterestRate(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Interest Rate (Low) %</label>
                  <input type="number" step="0.1" value={lowInterestRate} onChange={(e) => setLowInterestRate(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Loan Term (months)</label>
                  <input type="number" value={loanTermMonths} onChange={(e) => setLoanTermMonths(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Sales Tax %</label>
                  <input type="number" step="0.1" value={salesTaxRate} onChange={(e) => setSalesTaxRate(e.target.value)} className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Your State</label>
                <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">
                  <option value="CA">California</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                  <option value="NY">New York</option>
                  <option value="IL">Illinois</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="OH">Ohio</option>
                  <option value="GA">Georgia</option>
                </select>
              </div>

              <div className="pt-2 space-y-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={includeFeesInLoan} onChange={(e) => setIncludeFeesInLoan(e.target.checked)} className="rounded border-slate-300 text-blue-600 h-4 w-4" />
                  <span>Include All Fees & Taxes in Loan Balance</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={taxAfterRebate} onChange={(e) => setTaxAfterRebate(e.target.checked)} className="rounded border-slate-300 text-blue-600 h-4 w-4" />
                  <span>Sales Tax Applied After Rebate Deduction</span>
                </label>
              </div>
            </div>
          </div>

          {/* TWO COLUMNS PROFESSIONAL RESULT SECTION */}
          <div className="bg-gradient-to-br from-blue-50/90 to-indigo-50/70 dark:from-slate-900 dark:to-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-blue-200/60 dark:border-blue-900/40 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  Decision Recommendation & Offer Analysis
                </span>
              </div>
              <span className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-extrabold">
                Breakeven Rate: {cbCalc.breakevenRate}%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Result Column 1: Decision Summary & Offer Comparison Table */}
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-blue-200 dark:border-blue-900/60 shadow-xs space-y-1">
                  <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 leading-snug">
                    {cbCalc.winningMessage}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {cbCalc.subMessage}
                  </p>
                </div>

                {/* Side-by-Side Offer Summary Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                  <table className="w-full text-xs text-left border-collapse font-sans">
                    <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-[11px] uppercase text-slate-600 dark:text-slate-300">
                      <tr>
                        <th className="p-2.5">Financing Metric</th>
                        <th className="p-2.5 text-blue-600 font-extrabold">Cash Back</th>
                        <th className="p-2.5 text-emerald-600 font-extrabold">Low Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-700 dark:text-slate-300">Total Loan Amount</td>
                        <td className="p-2.5">{currencySymbol}{cbCalc.cashBackOffer.totalLoanAmount.toLocaleString()}</td>
                        <td className="p-2.5">{currencySymbol}{cbCalc.lowInterestOffer.totalLoanAmount.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-700 dark:text-slate-300">Sales Tax</td>
                        <td className="p-2.5">{currencySymbol}{cbCalc.cashBackOffer.salesTax.toLocaleString()}</td>
                        <td className="p-2.5">{currencySymbol}{cbCalc.lowInterestOffer.salesTax.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-700 dark:text-slate-300">Upfront Payment</td>
                        <td className="p-2.5">{currencySymbol}{cbCalc.cashBackOffer.upfrontPayment.toLocaleString()}</td>
                        <td className="p-2.5">{currencySymbol}{cbCalc.lowInterestOffer.upfrontPayment.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-blue-50/60 dark:bg-blue-950/40">
                        <td className="p-2.5 font-sans font-extrabold text-slate-900 dark:text-slate-100">Monthly Payment</td>
                        <td className="p-2.5 font-extrabold text-blue-600 text-sm">{currencySymbol}{cbCalc.cashBackOffer.monthlyPayment}</td>
                        <td className="p-2.5 font-extrabold text-emerald-600 text-sm">{currencySymbol}{cbCalc.lowInterestOffer.monthlyPayment}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-bold text-slate-700 dark:text-slate-300">Total Loan Interest</td>
                        <td className="p-2.5 text-red-500 font-bold">{currencySymbol}{cbCalc.cashBackOffer.totalInterest.toLocaleString()}</td>
                        <td className="p-2.5 text-emerald-600 font-bold">{currencySymbol}{cbCalc.lowInterestOffer.totalInterest.toLocaleString()}</td>
                      </tr>
                      <tr className="font-extrabold bg-slate-100 dark:bg-slate-800/80">
                        <td className="p-2.5 font-sans text-slate-900 dark:text-slate-100">Total Overall Cost</td>
                        <td className="p-2.5 text-blue-600 text-sm">{currencySymbol}{cbCalc.cashBackOffer.totalCost.toLocaleString()}</td>
                        <td className="p-2.5 text-emerald-600 text-sm">{currencySymbol}{cbCalc.lowInterestOffer.totalCost.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Result Column 2: Dual Professional Charts */}
              <div className="space-y-4">
                {svgCharts}
              </div>
            </div>
          </div>

          {/* Month-by-Month Amortization Schedule Table */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200">
                Monthly Loan Balance Amortization Schedule ({loanTermMonths} Months)
              </span>
              <button
                type="button"
                onClick={handleExportCSV}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                title="Export Schedule to CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto max-h-72 rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs text-center border-collapse font-mono">
                <thead className="sticky top-0 bg-blue-600 text-white font-bold font-sans">
                  <tr>
                    <th className="p-2.5 border-r border-blue-500" rowSpan={2}>Month</th>
                    <th className="p-2 border-b border-blue-500" colSpan={3}>Cash Back Offer</th>
                    <th className="p-2 border-b border-blue-500" colSpan={3}>Low Interest Rate Offer</th>
                  </tr>
                  <tr>
                    <th className="p-2 border-r border-blue-500">Balance</th>
                    <th className="p-2 border-r border-blue-500">Payment</th>
                    <th className="p-2 border-r border-blue-500">Interest</th>
                    <th className="p-2 border-r border-blue-500">Balance</th>
                    <th className="p-2 border-r border-blue-500">Payment</th>
                    <th className="p-2">Interest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {cbCalc.amortizationSchedule.map((row) => (
                    <tr key={row.month} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-2 font-bold font-sans text-blue-600 border-r border-slate-200 dark:border-slate-800">Month {row.month}</td>
                      <td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">{currencySymbol}{row.cashBackBalance.toLocaleString()}</td>
                      <td className="p-2 border-r border-slate-200 dark:border-slate-800">{currencySymbol}{row.cashBackPayment}</td>
                      <td className="p-2 border-r border-slate-200 dark:border-slate-800 text-red-500">{currencySymbol}{row.cashBackInterest}</td>
                      <td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold text-emerald-600">{currencySymbol}{row.lowInterestBalance.toLocaleString()}</td>
                      <td className="p-2 border-r border-slate-200 dark:border-slate-800">{currencySymbol}{row.lowInterestPayment}</td>
                      <td className="p-2 text-emerald-600">{currencySymbol}{row.lowInterestInterest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* History Drawer for Box 1 */}
          {savedBox1Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox1(!showHistoryBox1)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox1Items.length})</span>
                {showHistoryBox1 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox1 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox1Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            onClick={() => setSavedBox1Items(savedBox1Items.filter((i) => i.id !== item.id))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BREAKEVEN INTEREST RATE SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Breakeven Interest Rate Solver</span>
          <button
            type="button"
            onClick={handleSaveBox2}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox2 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Cash Back Amount ($)</label>
                  <input type="number" value={cashBackAmount} onChange={(e) => setCashBackAmount(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Low Interest Rate %</label>
                  <input type="number" step="0.1" value={lowInterestRate} onChange={(e) => setLowInterestRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Maximum Outside Loan Rate</span>

              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                Breakeven Rate: {bSolve.breakevenRate}%
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                {bSolve.explanation}
              </div>
            </div>
          </div>

          {savedBox2Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox2(!showHistoryBox2)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox2Items.length})</span>
                {showHistoryBox2 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox2 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox2Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            onClick={() => setSavedBox2Items(savedBox2Items.filter((i) => i.id !== item.id))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. REBATE REINVESTMENT & OPPORTUNITY COST */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Rebate Reinvestment & Opportunity Cost</span>
          <button
            type="button"
            onClick={handleSaveBox3}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox3 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Annual Reinvestment Return % (HYSA / S&P 500)</label>
                <input type="number" step="0.1" value={reinvestmentRate} onChange={(e) => setReinvestmentRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Wealth Building Strategy</span>

              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums mt-1">
                Winner: {reinvCalc.winner}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Reinvested Rebate</span>
                  <span className="text-blue-600 text-sm font-extrabold">{currencySymbol}{reinvCalc.futureReinvestedRebate.toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Monthly Savings</span>
                  <span className="text-emerald-600 text-sm font-extrabold">{currencySymbol}{reinvCalc.futureMonthlySavings.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {savedBox3Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox3(!showHistoryBox3)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox3Items.length})</span>
                {showHistoryBox3 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox3 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox3Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            onClick={() => setSavedBox3Items(savedBox3Items.filter((i) => i.id !== item.id))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MULTI-OFFER FINANCING COMPARISON */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Multi-Offer Financing Comparison</span>
          <button
            type="button"
            onClick={handleSaveBox4}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox4 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-12 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">3-Way Offer Evaluation</span>

              <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums mt-1">
                Lowest Cost: {multiCalc.bestOfferName}
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-bold pt-2">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Offer 1 (0% / $0 Rebate)</span>
                  <span className="text-blue-600 text-sm font-extrabold">{currencySymbol}{multiCalc.offer1TotalCost.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Offer 2 (2.9% / $1,500 Rebate)</span>
                  <span className="text-emerald-600 text-sm font-extrabold">{currencySymbol}{multiCalc.offer2TotalCost.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Offer 3 (6.9% / $3,500 Rebate)</span>
                  <span className="text-amber-600 text-sm font-extrabold">{currencySymbol}{multiCalc.offer3TotalCost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {savedBox4Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox4(!showHistoryBox4)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox4Items.length})</span>
                {showHistoryBox4 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox4 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox4Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            onClick={() => setSavedBox4Items(savedBox4Items.filter((i) => i.id !== item.id))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. EARLY LOAN PAYOFF IMPACT */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Early Loan Payoff Impact</span>
          <button
            type="button"
            onClick={handleSaveBox5}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox5 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Pay Off Loan Early at Month</label>
                <select value={payoffMonth} onChange={(e) => setPayoffMonth(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">
                  <option value="12">12 Months (1 Year)</option>
                  <option value="24">24 Months (2 Years)</option>
                  <option value="36">36 Months (3 Years)</option>
                  <option value="48">48 Months (4 Years)</option>
                </select>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Accelerated Payoff Winner</span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                Early Payoff Winner: {earlyCalc.earlyWinner}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Cash Back Early Cost</span>
                  <span className="text-blue-600 text-sm font-extrabold">{currencySymbol}{earlyCalc.cashBackEarlyCost.toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Low Interest Early Cost</span>
                  <span className="text-emerald-600 text-sm font-extrabold">{currencySymbol}{earlyCalc.lowInterestEarlyCost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {savedBox5Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox5(!showHistoryBox5)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox5Items.length})</span>
                {showHistoryBox5 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox5 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox5Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            onClick={() => setSavedBox5Items(savedBox5Items.filter((i) => i.id !== item.id))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. NEGATIVE EQUITY TRADE-IN ROLL-IN */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Negative Equity Trade-In Roll-In</span>
          <button
            type="button"
            onClick={handleSaveBox6}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox6 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Trade-In Allowance ($)</label>
                  <input type="number" value={tradeInValue} onChange={(e) => setTradeInValue(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Amount Owed on Trade-In ($)</label>
                  <input type="number" value={existingLoanBalance} onChange={(e) => setExistingLoanBalance(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Underwater Equity Analysis</span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                Rolled In: {currencySymbol}{negCalc.rolledInAmount.toLocaleString()}
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                {negCalc.recommendation}
              </div>
            </div>
          </div>

          {savedBox6Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox6(!showHistoryBox6)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox6Items.length})</span>
                {showHistoryBox6 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox6 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox6Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            onClick={() => setSavedBox6Items(savedBox6Items.filter((i) => i.id !== item.id))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
