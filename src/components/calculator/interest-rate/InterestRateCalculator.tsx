"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, ChevronDown, ChevronUp, Download, ShieldCheck } from "lucide-react";
import {
  calculateAmortizationLoanRate,
  calculateLumpSumYield,
  calculatePeriodicContributionRate,
  calculateRateConverter,
  calculateFisherTaxReturn,
} from "@/app/calculators/interest-rate-calculator/calculator";
import {
  CompoundingFrequency,
  ContributionFrequency,
  DepositTiming,
  SavedInterestRateItem,
} from "@/app/calculators/interest-rate-calculator/types";

export function InterestRateCalculator() {
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // Common 3D styling classes
  const input3DClass =
    "w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none transition-all text-xs";
  const select3DClass =
    "w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none cursor-pointer text-xs";

  // =========================================================================
  // BOX 1: LOAN / MORTGAGE INTEREST RATE SOLVER
  // =========================================================================
  const [loanAmount, setLoanAmount] = useState<string>("32000");
  const [loanYears, setLoanYears] = useState<string>("3");
  const [loanMonths, setLoanMonths] = useState<string>("0");
  const [monthlyPayment, setMonthlyPayment] = useState<string>("960");
  const [upfrontFees, setUpfrontFees] = useState<string>("0");
  const [balloonPayment, setBalloonPayment] = useState<string>("0");

  const [savedBox1Items, setSavedBox1Items] = useState<SavedInterestRateItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);
  const [showHistoryBox1, setShowHistoryBox1] = useState<boolean>(false);

  const loanCalc = useMemo(() => {
    return calculateAmortizationLoanRate({
      loanAmount: parseFloat(loanAmount) || 0,
      years: parseFloat(loanYears) || 0,
      months: parseFloat(loanMonths) || 0,
      monthlyPayment: parseFloat(monthlyPayment) || 0,
      upfrontFees: parseFloat(upfrontFees) || 0,
      balloonPayment: parseFloat(balloonPayment) || 0,
    });
  }, [loanAmount, loanYears, loanMonths, monthlyPayment, upfrontFees, balloonPayment]);

  const handleSaveBox1 = () => {
    const newItem: SavedInterestRateItem = {
      id: Date.now().toString(),
      title: "Loan Interest Rate Calculation",
      inputsSummary: `Loan: ${currencySymbol}${parseFloat(loanAmount || "0").toLocaleString()} | Term: ${loanYears}y ${loanMonths}m | Monthly: ${currencySymbol}${parseFloat(monthlyPayment || "0").toLocaleString()} | Fees: ${currencySymbol}${parseFloat(upfrontFees || "0").toLocaleString()}`,
      primaryResult: `Interest Rate: ${loanCalc.statedInterestRate}% (True APR: ${loanCalc.trueApr}%)`,
      detailsList: [
        `Stated Nominal Rate: ${loanCalc.statedInterestRate}% / year`,
        `True APR (with Fees): ${loanCalc.trueApr}% / year`,
        `Total Interest Paid: ${currencySymbol}${loanCalc.totalInterest.toLocaleString()}`,
        `Total Repayment: ${currencySymbol}${loanCalc.totalRepayment.toLocaleString()}`,
        `Interest-to-Principal Ratio: ${loanCalc.interestToPrincipalRatio}%`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox1Items];
    setSavedBox1Items(updated);
    setShowHistoryBox1(true);
    try {
      localStorage.setItem("saved_ir_box1", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleExportBox1CSV = () => {
    const data = loanCalc.schedule;
    if (!data || data.length === 0) return;

    const headers = ["Period", "Balance", "Payment", "Principal", "Interest"];
    const rows = data.map((r) => [
      `"Period ${r.period}"`,
      `"${currencySymbol}${r.balance}"`,
      `"${currencySymbol}${r.payment}"`,
      `"${currencySymbol}${r.principal}"`,
      `"${currencySymbol}${r.interest}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `loan_amortization_schedule.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Box 1 SVG Charts (Donut + Payoff Line)
  const box1Charts = useMemo(() => {
    const pVal = parseFloat(loanAmount) || 1;
    const iVal = loanCalc.totalInterest || 0;
    const total = pVal + iVal;

    const pPct = Math.round((pVal / total) * 100) || 100;
    const iPct = 100 - pPct;

    // SVG Donut dash offset calculation (Circumference = 2 * PI * 40 = 251.327)
    const C = 251.327;
    const pDash = (pPct / 100) * C;
    const iDash = C - pDash;

    return (
      <div className="space-y-3 text-xs">
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="font-extrabold text-[11px] text-slate-700 dark:text-slate-300 block">
            Payment Breakdown (Principal vs. Interest)
          </span>
          <div className="flex items-center justify-around">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#059669" strokeWidth="16" fill="transparent" strokeDasharray={`${pDash} ${C}`} />
                <circle cx="50" cy="50" r="40" stroke="#dc2626" strokeWidth="16" fill="transparent" strokeDasharray={`${iDash} ${C}`} strokeDashoffset={-pDash} />
              </svg>
              <div className="absolute text-center">
                <span className="text-[10px] font-bold text-slate-500 block">Interest</span>
                <span className="text-xs font-black text-red-600">{iPct}%</span>
              </div>
            </div>
            <div className="space-y-1 text-xs font-bold font-mono">
              <div className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-2.5 h-2.5 bg-emerald-600 rounded-xs" />
                <span>Principal: {pPct}%</span>
              </div>
              <div className="flex items-center gap-1.5 text-red-600">
                <span className="w-2.5 h-2.5 bg-red-600 rounded-xs" />
                <span>Interest: {iPct}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Amortization Payoff SVG Curve */}
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="font-extrabold text-[11px] text-slate-700 dark:text-slate-300 block">
            Loan Balance Amortization Payoff Curve
          </span>
          <div className="w-full h-28">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <line x1="30" y1="105" x2="300" y2="105" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="30" y1="10" x2="30" y2="105" stroke="#cbd5e1" strokeWidth="1" />
              <text x="5" y="15" fill="#94a3b8" fontSize="8" className="font-mono">{currencySymbol}{(pVal / 1000).toFixed(0)}k</text>
              <text x="10" y="108" fill="#94a3b8" fontSize="8" className="font-mono">0</text>

              {loanCalc.schedule.length > 0 && (
                <polyline
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  points={loanCalc.schedule
                    .map((d, idx) => {
                      const x = (idx / (loanCalc.schedule.length - 1 || 1)) * 260 + 30;
                      const y = 105 - (d.balance / pVal) * 90;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                />
              )}
            </svg>
          </div>
        </div>
      </div>
    );
  }, [loanAmount, loanCalc, currencySymbol]);

  // =========================================================================
  // BOX 2: LUMP-SUM INVESTMENT YIELD SOLVER
  // =========================================================================
  const [lumpPrincipal, setLumpPrincipal] = useState<string>("5000");
  const [lumpEnding, setLumpEnding] = useState<string>("8000");
  const [lumpYears, setLumpYears] = useState<string>("5");
  const [lumpMonths, setLumpMonths] = useState<string>("0");
  const [lumpDays, setLumpDays] = useState<string>("0");
  const [lumpFreq, setLumpFreq] = useState<CompoundingFrequency>("monthly");

  const [savedBox2Items, setSavedBox2Items] = useState<SavedInterestRateItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);
  const [showHistoryBox2, setShowHistoryBox2] = useState<boolean>(false);

  const lumpCalc = useMemo(() => {
    return calculateLumpSumYield({
      startingPrincipal: parseFloat(lumpPrincipal) || 0,
      endingBalance: parseFloat(lumpEnding) || 0,
      years: parseFloat(lumpYears) || 0,
      months: parseFloat(lumpMonths) || 0,
      days: parseFloat(lumpDays) || 0,
      compoundingFrequency: lumpFreq,
    });
  }, [lumpPrincipal, lumpEnding, lumpYears, lumpMonths, lumpDays, lumpFreq]);

  const handleSaveBox2 = () => {
    const newItem: SavedInterestRateItem = {
      id: Date.now().toString(),
      title: "Lump-Sum Investment Return Calculation",
      inputsSummary: `Principal: ${currencySymbol}${parseFloat(lumpPrincipal || "0").toLocaleString()} -> Ending: ${currencySymbol}${parseFloat(lumpEnding || "0").toLocaleString()} (${lumpYears}y ${lumpMonths}m, ${lumpFreq})`,
      primaryResult: `Annual Rate: ${lumpCalc.annualNominalRate}% (APY: ${lumpCalc.effectiveAnnualRate}%)`,
      detailsList: [
        `Annual Nominal Rate: ${lumpCalc.annualNominalRate}%`,
        `Effective Annual Rate (APY): ${lumpCalc.effectiveAnnualRate}%`,
        `Total Capital Gain: ${currencySymbol}${lumpCalc.totalEarnings.toLocaleString()}`,
        `Total Percentage ROI: ${lumpCalc.percentageRoi}%`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox2Items];
    setSavedBox2Items(updated);
    setShowHistoryBox2(true);
    try {
      localStorage.setItem("saved_ir_box2", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  // =========================================================================
  // BOX 3: PERIODIC CONTRIBUTION INVESTMENT RATE SOLVER
  // =========================================================================
  const [annStartBal, setAnnStartBal] = useState<string>("5000");
  const [annContrib, setAnnContrib] = useState<string>("300");
  const [annFreq, setAnnFreq] = useState<ContributionFrequency>("monthly");
  const [annTiming, setAnnTiming] = useState<DepositTiming>("end");
  const [annTarget, setAnnTarget] = useState<string>("50000");
  const [annYears, setAnnYears] = useState<string>("8");
  const [annMonths, setAnnMonths] = useState<string>("0");

  const [savedBox3Items, setSavedBox3Items] = useState<SavedInterestRateItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);
  const [showHistoryBox3, setShowHistoryBox3] = useState<boolean>(false);

  const annCalc = useMemo(() => {
    return calculatePeriodicContributionRate({
      startingBalance: parseFloat(annStartBal) || 0,
      periodicContribution: parseFloat(annContrib) || 0,
      contributionFrequency: annFreq,
      depositTiming: annTiming,
      targetBalance: parseFloat(annTarget) || 0,
      years: parseFloat(annYears) || 0,
      months: parseFloat(annMonths) || 0,
    });
  }, [annStartBal, annContrib, annFreq, annTiming, annTarget, annYears, annMonths]);

  const handleSaveBox3 = () => {
    const newItem: SavedInterestRateItem = {
      id: Date.now().toString(),
      title: "Periodic Contribution Growth Rate Solver",
      inputsSummary: `Start: ${currencySymbol}${parseFloat(annStartBal || "0").toLocaleString()} | PMT: ${currencySymbol}${parseFloat(annContrib || "0").toLocaleString()}/${annFreq} | Target: ${currencySymbol}${parseFloat(annTarget || "0").toLocaleString()} (${annYears}y)`,
      primaryResult: `Required Rate: ${annCalc.requiredAnnualRate}% (APY: ${annCalc.effectiveApy}%)`,
      detailsList: [
        `Required Growth Rate: ${annCalc.requiredAnnualRate}% / year`,
        `Effective APY: ${annCalc.effectiveApy}%`,
        `Total Contributed: ${currencySymbol}${annCalc.totalContributed.toLocaleString()}`,
        `Total Interest Earned: ${currencySymbol}${annCalc.totalInterestEarned.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox3Items];
    setSavedBox3Items(updated);
    setShowHistoryBox3(true);
    try {
      localStorage.setItem("saved_ir_box3", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  const handleExportBox3CSV = () => {
    const data = annCalc.schedule;
    if (!data || data.length === 0) return;

    const headers = ["Period", "Balance", "Contribution", "Interest"];
    const rows = data.map((r) => [
      `"Period ${r.period}"`,
      `"${currencySymbol}${r.balance}"`,
      `"${currencySymbol}${r.contribution}"`,
      `"${currencySymbol}${r.interest}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `periodic_contribution_growth_schedule.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // =========================================================================
  // BOX 4: RATE CONVERTER & YIELD MATRIX (APR vs APY)
  // =========================================================================
  const [convRate, setConvRate] = useState<string>("6.0");
  const [convFreq, setConvFreq] = useState<CompoundingFrequency>("monthly");

  const [savedBox4Items, setSavedBox4Items] = useState<SavedInterestRateItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);
  const [showHistoryBox4, setShowHistoryBox4] = useState<boolean>(false);

  const convCalc = useMemo(() => {
    return calculateRateConverter({
      nominalRate: parseFloat(convRate) || 0,
      compoundingFrequency: convFreq,
    });
  }, [convRate, convFreq]);

  const handleSaveBox4 = () => {
    const newItem: SavedInterestRateItem = {
      id: Date.now().toString(),
      title: "Rate Converter & Equivalent Yield Matrix",
      inputsSummary: `Stated Nominal: ${convRate}% (${convFreq})`,
      primaryResult: `Effective APY: ${convCalc.effectiveAnnualRate}%`,
      detailsList: [
        `Nominal Rate: ${convCalc.nominalRate}%`,
        `Effective Annual Rate (APY): ${convCalc.effectiveAnnualRate}%`,
        `Monthly Compounded APR: ${convCalc.monthlyCompoundedApr}%`,
        `Daily Compounded APR: ${convCalc.dailyCompoundedApr}%`,
        `Continuous Compounded Rate: ${convCalc.continuousRate}%`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox4Items];
    setSavedBox4Items(updated);
    setShowHistoryBox4(true);
    try {
      localStorage.setItem("saved_ir_box4", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  // =========================================================================
  // BOX 5: REAL AFTER-TAX & INFLATION-ADJUSTED RETURN (Fisher Equation)
  // =========================================================================
  const [fishNominal, setFishNominal] = useState<string>("8.0");
  const [fishInflation, setFishInflation] = useState<string>("3.0");
  const [fishTax, setFishTax] = useState<string>("25.0");

  const [savedBox5Items, setSavedBox5Items] = useState<SavedInterestRateItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);
  const [showHistoryBox5, setShowHistoryBox5] = useState<boolean>(false);

  const fishCalc = useMemo(() => {
    return calculateFisherTaxReturn({
      nominalRate: parseFloat(fishNominal) || 0,
      inflationRate: parseFloat(fishInflation) || 0,
      taxRate: parseFloat(fishTax) || 0,
    });
  }, [fishNominal, fishInflation, fishTax]);

  const handleSaveBox5 = () => {
    const newItem: SavedInterestRateItem = {
      id: Date.now().toString(),
      title: "Real After-Tax & Inflation Return Solver",
      inputsSummary: `Nominal: ${fishNominal}% | Inflation: ${fishInflation}% | Tax: ${fishTax}%`,
      primaryResult: `Real Purchasing Power Yield: ${fishCalc.realPurchasingPowerYield}%`,
      detailsList: [
        `Nominal Yield: ${fishCalc.nominalRate}%`,
        `After-Tax Yield: ${fishCalc.afterTaxNominalYield}%`,
        `Real Inflation-Adjusted Yield: ${fishCalc.realPurchasingPowerYield}%`,
        fishCalc.explanation,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox5Items];
    setSavedBox5Items(updated);
    setShowHistoryBox5(true);
    try {
      localStorage.setItem("saved_ir_box5", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  useEffect(() => {
    try {
      const b1 = localStorage.getItem("saved_ir_box1");
      if (b1) setSavedBox1Items(JSON.parse(b1));
      const b2 = localStorage.getItem("saved_ir_box2");
      if (b2) setSavedBox2Items(JSON.parse(b2));
      const b3 = localStorage.getItem("saved_ir_box3");
      if (b3) setSavedBox3Items(JSON.parse(b3));
      const b4 = localStorage.getItem("saved_ir_box4");
      if (b4) setSavedBox4Items(JSON.parse(b4));
      const b5 = localStorage.getItem("saved_ir_box5");
      if (b5) setSavedBox5Items(JSON.parse(b5));
    } catch (e) {}
  }, []);

  return (
    <div className="space-y-5 max-w-7xl mx-auto font-sans">
      {/* Currency Selector Header */}
      <div className="flex items-center justify-end gap-2 text-xs font-bold">
        <label htmlFor="ir-currency-select" className="text-slate-500 font-medium">Currency:</label>
        <select
          id="ir-currency-select"
          value={currencySymbol}
          onChange={(e) => setCurrencySymbol(e.target.value)}
          className="h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] cursor-pointer focus:border-blue-600 focus:outline-none"
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
      {/* 1. LOAN / MORTGAGE INTEREST RATE SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3.5 py-2 flex items-center justify-between">
          <span className="font-extrabold text-sm">Loan / Mortgage Interest Rate Solver</span>
          <button
            type="button"
            onClick={handleSaveBox1}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox1 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-3.5 space-y-4">
          {/* TWO COLUMNS INPUT SECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs text-xs">
            {/* Column 1: Principal & Term Inputs */}
            <div className="space-y-3">
              <span className="font-extrabold text-blue-600 dark:text-blue-400 block border-b border-slate-200 dark:border-slate-800 pb-1 uppercase tracking-wider text-[11px]">
                Debt Amount & Installments
              </span>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Loan Amount ($)</label>
                <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className={input3DClass} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Term (Years)</label>
                  <input type="number" value={loanYears} onChange={(e) => setLoanYears(e.target.value)} className={input3DClass} />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Term (Months)</label>
                  <input type="number" value={loanMonths} onChange={(e) => setLoanMonths(e.target.value)} className={input3DClass} />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Monthly Payment ($)</label>
                <input type="number" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} className={input3DClass} />
              </div>
            </div>

            {/* Column 2: Fees & Balloon Settings */}
            <div className="space-y-3">
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 block border-b border-slate-200 dark:border-slate-800 pb-1 uppercase tracking-wider text-[11px]">
                Fees & Balloon Balance
              </span>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Upfront Fees / Closing Costs ($)</label>
                <input type="number" value={upfrontFees} onChange={(e) => setUpfrontFees(e.target.value)} className={input3DClass} />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Balloon Payment at Maturity ($)</label>
                <input type="number" value={balloonPayment} onChange={(e) => setBalloonPayment(e.target.value)} className={input3DClass} />
              </div>
            </div>
          </div>

          {/* TWO COLUMNS RESULT SECTION */}
          <div className="bg-gradient-to-br from-blue-50/90 to-indigo-50/70 dark:from-slate-900 dark:to-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-xl p-3.5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-blue-200/60 dark:border-blue-900/40 pb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  Solved Interest Rate & APR Analysis
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-600 text-white text-xs font-extrabold">
                True APR: {loanCalc.trueApr}%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              {/* Result Column 1: Solved Hero Metric & Summary Table */}
              <div className="space-y-3">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-900/60 shadow-xs space-y-0.5 text-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Calculated Interest Rate</span>
                  <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                    {loanCalc.statedInterestRate}%
                  </div>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium block">
                    Stated Nominal Annual Rate
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                  <table className="w-full text-xs text-left border-collapse font-sans">
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
                      <tr>
                        <td className="p-2 font-sans font-bold text-slate-700 dark:text-slate-300">Stated Interest Rate</td>
                        <td className="p-2 font-bold text-blue-600">{loanCalc.statedInterestRate}%</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-sans font-bold text-slate-700 dark:text-slate-300">True APR (incl. Fees)</td>
                        <td className="p-2 font-bold text-emerald-600">{loanCalc.trueApr}%</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-sans font-bold text-slate-700 dark:text-slate-300">Total Interest Paid</td>
                        <td className="p-2 text-red-500 font-bold">{currencySymbol}{loanCalc.totalInterest.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-blue-50/60 dark:bg-blue-950/40">
                        <td className="p-2 font-sans font-extrabold text-slate-900 dark:text-slate-100">Total Repayment Amount</td>
                        <td className="p-2 font-extrabold text-blue-600 text-xs">{currencySymbol}{loanCalc.totalRepayment.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-sans font-bold text-slate-700 dark:text-slate-300">Interest-to-Principal Ratio</td>
                        <td className="p-2 font-bold text-slate-800 dark:text-slate-200">{loanCalc.interestToPrincipalRatio}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Result Column 2: Donut Chart & Payoff Curve */}
              <div className="space-y-3">
                {box1Charts}
              </div>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="space-y-2 pt-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200">
                Period-by-Period Amortization Schedule
              </span>
              <button
                type="button"
                onClick={handleExportBox1CSV}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto max-h-64 rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs text-center border-collapse font-mono">
                <thead className="sticky top-0 bg-blue-600 text-white font-bold font-sans">
                  <tr>
                    <th className="p-2 border-r border-blue-500">Period</th>
                    <th className="p-2 border-r border-blue-500">Balance</th>
                    <th className="p-2 border-r border-blue-500">Payment</th>
                    <th className="p-2 border-r border-blue-500">Principal</th>
                    <th className="p-2">Interest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {loanCalc.schedule.map((r) => (
                    <tr key={r.period} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-1.5 font-bold font-sans text-blue-600 border-r border-slate-200 dark:border-slate-800">Month {r.period}</td>
                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800 font-bold">{currencySymbol}{r.balance.toLocaleString()}</td>
                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800">{currencySymbol}{r.payment.toLocaleString()}</td>
                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800 text-emerald-600">{currencySymbol}{r.principal.toLocaleString()}</td>
                      <td className="p-1.5 text-red-500">{currencySymbol}{r.interest.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Saved Calculations Drawer */}
          {savedBox1Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
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
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button onClick={() => setSavedBox1Items(savedBox1Items.filter((i) => i.id !== item.id))} className="text-red-500 hover:text-red-700 cursor-pointer">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300"><strong>Inputs:</strong> {item.inputsSummary}</div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, idx) => (<div key={idx}>• {d}</div>))}
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
      {/* 2. LUMP-SUM INVESTMENT YIELD SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3.5 py-2 flex items-center justify-between">
          <span className="font-extrabold text-sm">Lump-Sum Investment Return Solver</span>
          <button
            type="button"
            onClick={handleSaveBox2}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox2 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-3.5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs text-xs">
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Starting Principal ($)</label>
                <input type="number" value={lumpPrincipal} onChange={(e) => setLumpPrincipal(e.target.value)} className={input3DClass} />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Final Ending Balance ($)</label>
                <input type="number" value={lumpEnding} onChange={(e) => setLumpEnding(e.target.value)} className={input3DClass} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Years</label>
                  <input type="number" value={lumpYears} onChange={(e) => setLumpYears(e.target.value)} className={input3DClass} />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Months</label>
                  <input type="number" value={lumpMonths} onChange={(e) => setLumpMonths(e.target.value)} className={input3DClass} />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Days</label>
                  <input type="number" value={lumpDays} onChange={(e) => setLumpDays(e.target.value)} className={input3DClass} />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Compounding Frequency</label>
                <select value={lumpFreq} onChange={(e) => setLumpFreq(e.target.value as CompoundingFrequency)} className={select3DClass}>
                  <option value="annual">Annually (1/yr)</option>
                  <option value="semiannual">Semi-annually (2/yr)</option>
                  <option value="quarterly">Quarterly (4/yr)</option>
                  <option value="monthly">Monthly (12/yr)</option>
                  <option value="biweekly">Bi-weekly (26/yr)</option>
                  <option value="weekly">Weekly (52/yr)</option>
                  <option value="daily">Daily (365/yr)</option>
                  <option value="continuous">Continuously (e^rt)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-900/60 text-center">
                <span className="text-[10px] font-extrabold uppercase text-slate-500">Annual Nominal Growth Rate</span>
                <div className="text-3xl font-extrabold text-blue-600 font-sans tabular-nums">{lumpCalc.annualNominalRate}%</div>
              </div>

              <table className="w-full text-xs font-sans">
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                  <tr>
                    <td className="p-2 font-bold font-sans">Effective Annual Rate (APY)</td>
                    <td className="p-2 font-bold text-emerald-600">{lumpCalc.effectiveAnnualRate}%</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Total Capital Gain</td>
                    <td className="p-2 font-bold text-blue-600">{currencySymbol}{lumpCalc.totalEarnings.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Total Percentage ROI</td>
                    <td className="p-2 font-bold text-emerald-600">{lumpCalc.percentageRoi}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Compounding Frequency Comparison Bar Chart */}
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <span className="font-extrabold text-[11px] text-slate-700 dark:text-slate-300 block">
                Compounding Frequency Comparison (Nominal Rate vs. APY)
              </span>
              <div className="space-y-1.5 font-mono">
                {lumpCalc.compoundingComparison.map((item) => (
                  <div key={item.frequencyLabel} className="space-y-0.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-sans font-bold">{item.frequencyLabel}:</span>
                      <span>Nominal {item.nominalRate}% | <strong className="text-emerald-600">APY {item.apy}%</strong></span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div style={{ width: `${Math.min(100, (item.apy / (lumpCalc.effectiveAnnualRate || 1)) * 100)}%` }} className="bg-blue-600 h-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {savedBox2Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
              <button onClick={() => setShowHistoryBox2(!showHistoryBox2)} className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
                <span>Saved Calculations ({savedBox2Items.length})</span>
                {showHistoryBox2 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox2 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox2Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <button onClick={() => setSavedBox2Items(savedBox2Items.filter((i) => i.id !== item.id))} className="text-red-500 hover:text-red-700 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300"><strong>Inputs:</strong> {item.inputsSummary}</div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, idx) => (<div key={idx}>• {d}</div>))}
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
      {/* 3. PERIODIC CONTRIBUTION INVESTMENT RATE SOLVER (Annuity Mode) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3.5 py-2 flex items-center justify-between">
          <span className="font-extrabold text-sm">Periodic Contribution Investment Rate Solver</span>
          <button
            type="button"
            onClick={handleSaveBox3}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox3 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-3.5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs text-xs">
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Starting Balance ($)</label>
                <input type="number" value={annStartBal} onChange={(e) => setAnnStartBal(e.target.value)} className={input3DClass} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Periodic Deposit ($)</label>
                  <input type="number" value={annContrib} onChange={(e) => setAnnContrib(e.target.value)} className={input3DClass} />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Frequency</label>
                  <select value={annFreq} onChange={(e) => setAnnFreq(e.target.value as ContributionFrequency)} className={select3DClass}>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Final Balance ($)</label>
                <input type="number" value={annTarget} onChange={(e) => setAnnTarget(e.target.value)} className={input3DClass} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Years</label>
                  <input type="number" value={annYears} onChange={(e) => setAnnYears(e.target.value)} className={input3DClass} />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Months</label>
                  <input type="number" value={annMonths} onChange={(e) => setAnnMonths(e.target.value)} className={input3DClass} />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Deposit Timing</label>
                <div className="flex items-center gap-4 pt-1 font-bold">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="annTiming" value="end" checked={annTiming === "end"} onChange={() => setAnnTiming("end")} className="text-blue-600" />
                    <span>End of Period (Ordinary)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="annTiming" value="beginning" checked={annTiming === "beginning"} onChange={() => setAnnTiming("beginning")} className="text-blue-600" />
                    <span>Beginning (Due)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-900/60 text-center">
                <span className="text-[10px] font-extrabold uppercase text-slate-500">Required Annual Growth Rate</span>
                <div className="text-3xl font-extrabold text-blue-600 font-sans tabular-nums">{annCalc.requiredAnnualRate}%</div>
              </div>

              <table className="w-full text-xs font-sans">
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                  <tr>
                    <td className="p-2 font-bold font-sans">Effective APY</td>
                    <td className="p-2 font-bold text-emerald-600">{annCalc.effectiveApy}%</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Total Contributed</td>
                    <td className="p-2 font-bold text-slate-800 dark:text-slate-200">{currencySymbol}{annCalc.totalContributed.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Total Interest Earned</td>
                    <td className="p-2 font-bold text-emerald-600">{currencySymbol}{annCalc.totalInterestEarned.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Growth Schedule Curve SVG */}
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
              <span className="font-extrabold text-[11px] text-slate-700 dark:text-slate-300 block">
                Cumulative Balance Growth Curve
              </span>
              <div className="w-full h-32">
                <svg viewBox="0 0 320 120" className="w-full h-full">
                  <line x1="30" y1="105" x2="300" y2="105" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="30" y1="10" x2="30" y2="105" stroke="#cbd5e1" strokeWidth="1" />
                  {annCalc.schedule.length > 0 && (
                    <polyline
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.5"
                      points={annCalc.schedule
                        .map((d, idx) => {
                          const x = (idx / (annCalc.schedule.length - 1 || 1)) * 260 + 30;
                          const y = 105 - (d.balance / (parseFloat(annTarget) || 1)) * 90;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                    />
                  )}
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200">
              Annuity Growth Schedule
            </span>
            <button
              type="button"
              onClick={handleExportBox3CSV}
              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          {savedBox3Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
              <button onClick={() => setShowHistoryBox3(!showHistoryBox3)} className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
                <span>Saved Calculations ({savedBox3Items.length})</span>
                {showHistoryBox3 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox3 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox3Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <button onClick={() => setSavedBox3Items(savedBox3Items.filter((i) => i.id !== item.id))} className="text-red-500 hover:text-red-700 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300"><strong>Inputs:</strong> {item.inputsSummary}</div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, idx) => (<div key={idx}>• {d}</div>))}
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
      {/* 4. COMPREHENSIVE RATE CONVERTER (APR vs APY vs EAR) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3.5 py-2 flex items-center justify-between">
          <span className="font-extrabold text-sm">Comprehensive Rate Converter (APR vs. APY vs. EAR)</span>
          <button
            type="button"
            onClick={handleSaveBox4}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox4 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-3.5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Stated Nominal Interest Rate (%)</label>
              <input type="number" step="0.1" value={convRate} onChange={(e) => setConvRate(e.target.value)} className={input3DClass} />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Stated Compounding Frequency</label>
              <select value={convFreq} onChange={(e) => setConvFreq(e.target.value as CompoundingFrequency)} className={select3DClass}>
                <option value="annual">Annually</option>
                <option value="semiannual">Semi-annually</option>
                <option value="quarterly">Quarterly</option>
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
                <option value="continuous">Continuously</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start text-xs">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-900/60 text-center">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Effective Annual Rate (APY)</span>
                <span className="text-3xl font-extrabold text-blue-600 font-sans tabular-nums">{convCalc.effectiveAnnualRate}%</span>
              </div>

              <table className="w-full text-xs font-sans">
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  <tr>
                    <td className="p-2 font-bold font-sans">Stated Nominal Rate</td>
                    <td className="p-2 font-bold">{convCalc.nominalRate}%</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Monthly Compounded APR</td>
                    <td className="p-2 font-bold text-blue-600">{convCalc.monthlyCompoundedApr}%</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Daily Compounded APR</td>
                    <td className="p-2 font-bold text-emerald-600">{convCalc.dailyCompoundedApr}%</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Continuous Rate Equivalent</td>
                    <td className="p-2 font-bold text-purple-600">{convCalc.continuousRate}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-extrabold text-[11px] text-slate-700 dark:text-slate-300 block">
                Compounding Yield Boost Analysis
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Compounding accelerates returns above the nominal rate. For a stated nominal rate of {convRate}%, shifting compounding from Annual to {convFreq.toUpperCase()} increases effective annual yield to <strong>{convCalc.effectiveAnnualRate}% APY</strong>.
              </p>
            </div>
          </div>

          {savedBox4Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
              <button onClick={() => setShowHistoryBox4(!showHistoryBox4)} className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
                <span>Saved Calculations ({savedBox4Items.length})</span>
                {showHistoryBox4 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox4 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox4Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <button onClick={() => setSavedBox4Items(savedBox4Items.filter((i) => i.id !== item.id))} className="text-red-500 hover:text-red-700 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300"><strong>Inputs:</strong> {item.inputsSummary}</div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, idx) => (<div key={idx}>• {d}</div>))}
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
      {/* 5. REAL AFTER-TAX & INFLATION-ADJUSTED RETURN (Fisher Equation) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3.5 py-2 flex items-center justify-between">
          <span className="font-extrabold text-sm">Real After-Tax & Inflation-Adjusted Return Solver</span>
          <button
            type="button"
            onClick={handleSaveBox5}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox5 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-3.5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs text-xs">
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nominal Interest Rate (%)</label>
                <input type="number" step="0.1" value={fishNominal} onChange={(e) => setFishNominal(e.target.value)} className={input3DClass} />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Annual Inflation Rate (%)</label>
                <input type="number" step="0.1" value={fishInflation} onChange={(e) => setFishInflation(e.target.value)} className={input3DClass} />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Marginal Income Tax Rate (%)</label>
                <input type="number" step="0.1" value={fishTax} onChange={(e) => setFishTax(e.target.value)} className={input3DClass} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start text-xs">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="p-3 bg-indigo-50 dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-indigo-900/60 text-center">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Real Purchasing Power Yield</span>
                <span className={`text-3xl font-extrabold font-sans tabular-nums ${fishCalc.realPurchasingPowerYield >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {fishCalc.realPurchasingPowerYield}%
                </span>
              </div>

              <table className="w-full text-xs font-sans">
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  <tr>
                    <td className="p-2 font-bold font-sans">Nominal Yield</td>
                    <td className="p-2 font-bold">{fishCalc.nominalRate}%</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Tax Drag Lost</td>
                    <td className="p-2 font-bold text-red-500">-{fishCalc.taxDragAmount}%</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">After-Tax Nominal Yield</td>
                    <td className="p-2 font-bold text-blue-600">{fishCalc.afterTaxNominalYield}%</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Real Inflation-Adjusted Yield</td>
                    <td className={`p-2 font-bold ${fishCalc.realPurchasingPowerYield >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {fishCalc.realPurchasingPowerYield}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-extrabold text-[11px] text-slate-700 dark:text-slate-300 block">
                Purchasing Power Analysis
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
                {fishCalc.explanation}
              </p>
            </div>
          </div>

          {savedBox5Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
              <button onClick={() => setShowHistoryBox5(!showHistoryBox5)} className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
                <span>Saved Calculations ({savedBox5Items.length})</span>
                {showHistoryBox5 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox5 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox5Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <button onClick={() => setSavedBox5Items(savedBox5Items.filter((i) => i.id !== item.id))} className="text-red-500 hover:text-red-700 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300"><strong>Inputs:</strong> {item.inputsSummary}</div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, idx) => (<div key={idx}>• {d}</div>))}
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
