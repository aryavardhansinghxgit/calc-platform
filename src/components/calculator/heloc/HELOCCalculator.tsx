"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, ChevronDown, ChevronUp, Check, Plus, Download } from "lucide-react";
import {
  calculateHELOC,
  calculateStressTest,
  calculateMultiDraw,
  calculateHelocVsLoanVsRefi,
  calculateHelocDebtConsolidation,
  calculateHelocTax,
} from "@/app/calculators/heloc-calculator/calculator";
import {
  ClosingCostTreatment,
  DrawPaymentStructure,
  SavedHELOCItem,
} from "@/app/calculators/heloc-calculator/types";

export function HELOCCalculator() {
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // =========================================================================
  // BOX 1: STANDARD TWO-PHASE HELOC PAYMENT ENGINE STATES
  // =========================================================================
  const [homeValue, setHomeValue] = useState<string>("500000");
  const [currentBalance, setCurrentBalance] = useState<string>("260000");
  const [cltvLimitPct, setCltvLimitPct] = useState<string>("80");
  const [creditLineAmount, setCreditLineAmount] = useState<string>("50000");
  const [drawPeriodYears, setDrawPeriodYears] = useState<string>("10");
  const [drawPaymentStructure, setDrawPaymentStructure] = useState<DrawPaymentStructure>("interest_only");
  const [repaymentPeriodYears, setRepaymentPeriodYears] = useState<string>("20");
  const [interestRate, setInterestRate] = useState<string>("8.0");
  const [closingCostsAmount, setClosingCostsAmount] = useState<string>("2000");
  const [closingCostTreatment, setClosingCostTreatment] = useState<ClosingCostTreatment>("upfront");
  const [annualMaintenanceFee, setAnnualMaintenanceFee] = useState<string>("50");

  const [amortizationView, setAmortizationView] = useState<"annual" | "monthly">("annual");

  const [savedBox1Items, setSavedBox1Items] = useState<SavedHELOCItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);
  const [showHistoryBox1, setShowHistoryBox1] = useState<boolean>(false);

  const helocCalc = useMemo(() => {
    return calculateHELOC({
      homeValue: parseFloat(homeValue) || 0,
      currentMortgageBalance: parseFloat(currentBalance) || 0,
      cltvLimitPct: parseFloat(cltvLimitPct) || 80,
      creditLineAmount: parseFloat(creditLineAmount) || 0,
      drawPeriodYears: parseFloat(drawPeriodYears) || 10,
      drawPaymentStructure,
      repaymentPeriodYears: parseFloat(repaymentPeriodYears) || 20,
      interestRate: parseFloat(interestRate) || 0,
      closingCostsAmount: parseFloat(closingCostsAmount) || 0,
      closingCostTreatment,
      annualMaintenanceFee: parseFloat(annualMaintenanceFee) || 0,
      currencySymbol,
    });
  }, [
    homeValue,
    currentBalance,
    cltvLimitPct,
    creditLineAmount,
    drawPeriodYears,
    drawPaymentStructure,
    repaymentPeriodYears,
    interestRate,
    closingCostsAmount,
    closingCostTreatment,
    annualMaintenanceFee,
    currencySymbol,
  ]);

  const handleSaveBox1 = () => {
    const newItem: SavedHELOCItem = {
      id: Date.now().toString(),
      title: "Standard Two-Phase HELOC Payment & Amortization",
      inputsSummary: `Value: ${currencySymbol}${parseFloat(homeValue).toLocaleString()} | Line: ${currencySymbol}${helocCalc.actualCreditLine.toLocaleString()} @ ${interestRate}% (${drawPeriodYears}yr Draw / ${repaymentPeriodYears}yr Repay)`,
      primaryResult: `Draw: ${currencySymbol}${helocCalc.drawPeriodMonthlyPayment.toLocaleString()}/mo → Repay: ${currencySymbol}${helocCalc.repaymentPeriodMonthlyPayment.toLocaleString()}/mo (+${helocCalc.paymentShockPctIncrease}%)`,
      detailsList: [
        `Max Borrowable Line (${cltvLimitPct}% Cap): ${currencySymbol}${helocCalc.maxBorrowableCreditLine.toLocaleString()}`,
        `Payment Shock Dollar Increase: +${currencySymbol}${helocCalc.paymentShockDollarIncrease.toLocaleString()}/mo`,
        `Fully Drawn CLTV: ${helocCalc.fullyDrawnCltvPct}%`,
        `Total Interest Paid: ${currencySymbol}${helocCalc.totalInterestPaid.toLocaleString()}`,
        `Total Annual Fees: ${currencySymbol}${helocCalc.totalAnnualFeesPaid.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox1Items];
    setSavedBox1Items(updated);
    try {
      localStorage.setItem("saved_heloc_box1", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleExportCSV = () => {
    const data = amortizationView === "annual" ? helocCalc.annualAmortization : helocCalc.monthlyAmortization;
    if (!data || data.length === 0) return;

    const headers = ["Period", "Phase", "Beginning Balance", "Payment", "Principal", "Interest", "Annual Fee", "Ending Balance"];
    const rows = data.map((row) => [
      `"${row.dateLabel}"`,
      `"${row.phase}"`,
      `"${row.beginningBalance}"`,
      `"${row.payment}"`,
      `"${row.principal}"`,
      `"${row.interest}"`,
      `"${row.annualFee}"`,
      `"${row.endingBalance}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `heloc_amortization_${amortizationView}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // SVG Equity Slice Donut Chart
  const svgEquityDonut = useMemo(() => {
    const hv = parseFloat(homeValue) || 500000;
    const debt1 = parseFloat(currentBalance) || 0;
    const line2 = helocCalc.actualCreditLine || 0;
    const unenc = Math.max(0, hv - (debt1 + line2));

    if (hv <= 0) return null;

    const debt1Pct = (debt1 / hv) * 100;
    const line2Pct = (line2 / hv) * 100;
    const unencPct = (unenc / hv) * 100;

    const r = 40;
    const cx = 50;
    const cy = 50;
    const circ = 2 * Math.PI * r;

    const stroke1 = (debt1Pct / 100) * circ;
    const stroke2 = (line2Pct / 100) * circ;
    const strokeUnenc = (unencPct / 100) * circ;

    return (
      <div className="flex items-center justify-center gap-4">
        <svg viewBox="0 0 100 100" className="w-24 h-24 transform -rotate-90">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748b" strokeWidth="16" strokeDasharray={`${stroke1} ${circ}`} strokeDashoffset={0} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2563eb" strokeWidth="16" strokeDasharray={`${stroke2} ${circ}`} strokeDashoffset={-stroke1} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#10b981" strokeWidth="16" strokeDasharray={`${strokeUnenc} ${circ}`} strokeDashoffset={-(stroke1 + stroke2)} />
        </svg>
        <div className="text-[11px] space-y-1 font-bold">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-500 inline-block"></span> <span>1st Mortgage: {debt1Pct.toFixed(1)}%</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span> <span>HELOC Line: {line2Pct.toFixed(1)}%</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> <span>Protected Equity: {unencPct.toFixed(1)}%</span></div>
        </div>
      </div>
    );
  }, [homeValue, currentBalance, helocCalc]);

  // =========================================================================
  // BOX 2: VARIABLE RATE STRESS-TESTER STATES
  // =========================================================================
  const [wsjPrimeRate, setWsjPrimeRate] = useState<string>("8.5");
  const [lenderMargin, setLenderMargin] = useState<string>("1.0");
  const [rateScenario, setRateScenario] = useState<"+1" | "+2" | "+3" | "cap">("+2");
  const [lifetimeCapPct, setLifetimeCapPct] = useState<string>("18.0");

  const [savedBox2Items, setSavedBox2Items] = useState<SavedHELOCItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);
  const [showHistoryBox2, setShowHistoryBox2] = useState<boolean>(false);

  const stressCalc = useMemo(() => {
    return calculateStressTest({
      drawnBalance: helocCalc.actualCreditLine,
      wsjPrimeRate: parseFloat(wsjPrimeRate) || 8.5,
      lenderMargin: parseFloat(lenderMargin) || 1.0,
      rateScenario,
      lifetimeCapPct: parseFloat(lifetimeCapPct) || 18.0,
      repayYears: parseFloat(repaymentPeriodYears) || 20,
    });
  }, [helocCalc.actualCreditLine, wsjPrimeRate, lenderMargin, rateScenario, lifetimeCapPct, repaymentPeriodYears]);

  const handleSaveBox2 = () => {
    const newItem: SavedHELOCItem = {
      id: Date.now().toString(),
      title: "Variable Rate Stress-Tester & Shock Simulator",
      inputsSummary: `Balance: ${currencySymbol}${helocCalc.actualCreditLine.toLocaleString()} | Current Rate: ${stressCalc.currentRate}% → Stressed Rate (${rateScenario}): ${stressCalc.stressedRate}%`,
      primaryResult: `Repay Payment Jump: ${currencySymbol}${stressCalc.currentRepayPayment.toLocaleString()}/mo → ${currencySymbol}${stressCalc.stressedRepayPayment.toLocaleString()}/mo (+${stressCalc.pctIncrease}%)`,
      detailsList: [
        `Draw Payment Increase: ${currencySymbol}${stressCalc.currentDrawPayment.toLocaleString()}/mo → ${currencySymbol}${stressCalc.stressedDrawPayment.toLocaleString()}/mo`,
        `Monthly Payment Dollar Hike: +${currencySymbol}${stressCalc.monthlyIncrease.toLocaleString()}/mo`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox2Items];
    setSavedBox2Items(updated);
    try {
      localStorage.setItem("saved_heloc_box2", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  // =========================================================================
  // BOX 3: CUSTOM DRAW & PAYOFF LIFECYCLE SIMULATOR STATES
  // =========================================================================
  const [initialDraw, setInitialDraw] = useState<string>("20000");
  const [futureDrawAmount, setFutureDrawAmount] = useState<string>("15000");
  const [futureDrawYear, setFutureDrawYear] = useState<string>("3");
  const [extraMonthlyPrincipal, setExtraMonthlyPrincipal] = useState<string>("100");

  const [savedBox3Items, setSavedBox3Items] = useState<SavedHELOCItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);
  const [showHistoryBox3, setShowHistoryBox3] = useState<boolean>(false);

  const multiDrawCalc = useMemo(() => {
    return calculateMultiDraw({
      creditLine: helocCalc.actualCreditLine,
      initialDraw: parseFloat(initialDraw) || 0,
      futureDrawAmount: parseFloat(futureDrawAmount) || 0,
      futureDrawYear: parseFloat(futureDrawYear) || 3,
      extraMonthlyPrincipal: parseFloat(extraMonthlyPrincipal) || 0,
      interestRate: parseFloat(interestRate) || 8.0,
      drawYears: parseFloat(drawPeriodYears) || 10,
      repayYears: parseFloat(repaymentPeriodYears) || 20,
    });
  }, [helocCalc.actualCreditLine, initialDraw, futureDrawAmount, futureDrawYear, extraMonthlyPrincipal, interestRate, drawPeriodYears, repaymentPeriodYears]);

  const handleSaveBox3 = () => {
    const newItem: SavedHELOCItem = {
      id: Date.now().toString(),
      title: "Custom Draw & Payoff Lifecycle Simulator",
      inputsSummary: `Initial Draw: ${currencySymbol}${parseFloat(initialDraw).toLocaleString()} | Year ${futureDrawYear} Draw: ${currencySymbol}${parseFloat(futureDrawAmount).toLocaleString()} | Extra Principal: ${currencySymbol}${parseFloat(extraMonthlyPrincipal).toLocaleString()}/mo`,
      primaryResult: `Draw End Balance: ${currencySymbol}${multiDrawCalc.balanceAtDrawEnd.toLocaleString()} | Repay Payment: ${currencySymbol}${multiDrawCalc.repaymentPhaseMonthlyPayment.toLocaleString()}/mo`,
      detailsList: [
        `Total Drawn Capital: ${currencySymbol}${multiDrawCalc.totalDrawnCapital.toLocaleString()}`,
        `Total Interest Saved: ${currencySymbol}${multiDrawCalc.interestSaved.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox3Items];
    setSavedBox3Items(updated);
    try {
      localStorage.setItem("saved_heloc_box3", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  // =========================================================================
  // BOX 4: HELOC VS FIXED LOAN VS REFI 3-WAY MATRIX STATES
  // =========================================================================
  const [current1stRate, setCurrent1stRate] = useState<string>("3.5");
  const [cashNeeded, setCashNeeded] = useState<string>("50000");
  const [fixedLoanRate, setFixedLoanRate] = useState<string>("8.5");
  const [refiRate, setRefiRate] = useState<string>("6.75");

  const [savedBox4Items, setSavedBox4Items] = useState<SavedHELOCItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);
  const [showHistoryBox4, setShowHistoryBox4] = useState<boolean>(false);

  const matrixCalc = useMemo(() => {
    return calculateHelocVsLoanVsRefi({
      homeValue: parseFloat(homeValue) || 500000,
      currentBalance: parseFloat(currentBalance) || 260000,
      currentRate: parseFloat(current1stRate) || 3.5,
      cashNeeded: parseFloat(cashNeeded) || 50000,
      helocRate: parseFloat(interestRate) || 8.0,
      fixedLoanRate: parseFloat(fixedLoanRate) || 8.5,
      refiRate: parseFloat(refiRate) || 6.75,
    });
  }, [homeValue, currentBalance, current1stRate, cashNeeded, interestRate, fixedLoanRate, refiRate]);

  const handleSaveBox4 = () => {
    const newItem: SavedHELOCItem = {
      id: Date.now().toString(),
      title: "HELOC vs. Fixed Home Equity Loan vs. Cash-Out Refi",
      inputsSummary: `Cash Needed: ${currencySymbol}${parseFloat(cashNeeded).toLocaleString()} | HELOC: ${interestRate}% vs Fixed Loan: ${fixedLoanRate}% vs Refi: ${refiRate}%`,
      primaryResult: matrixCalc.recommendation,
      detailsList: [
        `HELOC Payment: ${currencySymbol}${matrixCalc.helocDrawMonthly.toLocaleString()}/mo Draw → ${currencySymbol}${matrixCalc.helocRepayMonthly.toLocaleString()}/mo Repay`,
        `Fixed Home Equity Loan Payment: ${currencySymbol}${matrixCalc.fixedLoanMonthly.toLocaleString()}/mo (15-Yr Fixed)`,
        `Cash-Out Refinance Payment: ${currencySymbol}${matrixCalc.refiNewMonthly.toLocaleString()}/mo (New 30-Yr Total 1st)`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox4Items];
    setSavedBox4Items(updated);
    try {
      localStorage.setItem("saved_heloc_box4", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  // =========================================================================
  // BOX 5: DEBT CONSOLIDATION & INTEREST ARBITRAGE STATES
  // =========================================================================
  const [creditCardBalance, setCreditCardBalance] = useState<string>("30000");
  const [creditCardRate, setCreditCardRate] = useState<string>("24.0");

  const [savedBox5Items, setSavedBox5Items] = useState<SavedHELOCItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);
  const [showHistoryBox5, setShowHistoryBox5] = useState<boolean>(false);

  const consolCalc = useMemo(() => {
    return calculateHelocDebtConsolidation({
      creditCardBalance: parseFloat(creditCardBalance) || 0,
      creditCardRate: parseFloat(creditCardRate) || 24.0,
      helocRate: parseFloat(interestRate) || 8.0,
      drawYears: parseFloat(drawPeriodYears) || 10,
      repayYears: parseFloat(repaymentPeriodYears) || 20,
    });
  }, [creditCardBalance, creditCardRate, interestRate, drawPeriodYears, repaymentPeriodYears]);

  const handleSaveBox5 = () => {
    const newItem: SavedHELOCItem = {
      id: Date.now().toString(),
      title: "Debt Consolidation Payoff & Interest Arbitrage",
      inputsSummary: `Credit Debt: ${currencySymbol}${parseFloat(creditCardBalance).toLocaleString()} @ ${creditCardRate}% → HELOC @ ${interestRate}%`,
      primaryResult: `Save ${currencySymbol}${consolCalc.monthlyCashFlowSavingsDrawPhase.toLocaleString()}/mo Cash Flow | Save ${currencySymbol}${consolCalc.lifetimeInterestSaved.toLocaleString()} Lifetime Interest`,
      detailsList: [
        `High-Interest Monthly Debt: ${currencySymbol}${consolCalc.currentCombinedMonthlyPayment.toLocaleString()}/mo`,
        `HELOC Draw Payment: ${currencySymbol}${consolCalc.helocDrawPayment.toLocaleString()}/mo`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox5Items];
    setSavedBox5Items(updated);
    try {
      localStorage.setItem("saved_heloc_box5", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  // =========================================================================
  // BOX 6: IRS TAX DEDUCTIBILITY ESTIMATOR STATES
  // =========================================================================
  const [isHomeImprovement, setIsHomeImprovement] = useState<boolean>(true);
  const [taxBracketPct, setTaxBracketPct] = useState<string>("24");

  const [savedBox6Items, setSavedBox6Items] = useState<SavedHELOCItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);
  const [showHistoryBox6, setShowHistoryBox6] = useState<boolean>(false);

  const taxCalc = useMemo(() => {
    const approxAnnualInterest = helocCalc.totalInterestPaid / (parseFloat(drawPeriodYears) + parseFloat(repaymentPeriodYears));
    return calculateHelocTax({
      annualInterestPaid: approxAnnualInterest,
      isUsedForHomeImprovement: isHomeImprovement,
      marginalTaxBracketPct: parseFloat(taxBracketPct) || 24,
      helocRate: parseFloat(interestRate) || 8.0,
    });
  }, [helocCalc.totalInterestPaid, drawPeriodYears, repaymentPeriodYears, isHomeImprovement, taxBracketPct, interestRate]);

  const handleSaveBox6 = () => {
    const newItem: SavedHELOCItem = {
      id: Date.now().toString(),
      title: "IRS Tax Deductibility & Net Cost Estimate",
      inputsSummary: `Home Improvement: ${isHomeImprovement ? "Yes" : "No"} | Tax Bracket: ${taxBracketPct}%`,
      primaryResult: taxCalc.isDeductible
        ? `Projected Tax Savings: ${currencySymbol}${taxCalc.projectedAnnualTaxSavings.toLocaleString()}/yr`
        : "Not Tax-Deductible",
      detailsList: [
        `Status: ${taxCalc.statusExplanation}`,
        `Effective After-Tax Interest Rate: ${taxCalc.effectiveInterestRate}%`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox6Items];
    setSavedBox6Items(updated);
    try {
      localStorage.setItem("saved_heloc_box6", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  // Load local storage
  useEffect(() => {
    try {
      const b1 = localStorage.getItem("saved_heloc_box1");
      if (b1) setSavedBox1Items(JSON.parse(b1));
      const b2 = localStorage.getItem("saved_heloc_box2");
      if (b2) setSavedBox2Items(JSON.parse(b2));
      const b3 = localStorage.getItem("saved_heloc_box3");
      if (b3) setSavedBox3Items(JSON.parse(b3));
      const b4 = localStorage.getItem("saved_heloc_box4");
      if (b4) setSavedBox4Items(JSON.parse(b4));
      const b5 = localStorage.getItem("saved_heloc_box5");
      if (b5) setSavedBox5Items(JSON.parse(b5));
      const b6 = localStorage.getItem("saved_heloc_box6");
      if (b6) setSavedBox6Items(JSON.parse(b6));
    } catch (e) {}
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Simple Currency Selector Header */}
      <div className="flex items-center justify-end gap-2 text-xs font-bold">
        <label htmlFor="heloc-currency-select" className="text-slate-500 font-medium">Currency:</label>
        <select
          id="heloc-currency-select"
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
      {/* 1. STANDARD TWO-PHASE HELOC PAYMENT & AMORTIZATION ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Standard Two-Phase HELOC Payment & Amortization Engine</span>
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
          {/* Payment Structure Toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit text-xs font-bold">
            <button
              onClick={() => setDrawPaymentStructure("interest_only")}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                drawPaymentStructure === "interest_only" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Interest-Only Draw Phase (Standard)
            </button>
            <button
              onClick={() => setDrawPaymentStructure("principal_and_interest")}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                drawPaymentStructure === "principal_and_interest" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Principal + Interest Draw Phase
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs text-xs">
              <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">Property Equity & Credit Line Options</span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Home Market Value</label>
                  <input type="number" value={homeValue} onChange={(e) => setHomeValue(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">1st Mortgage Balance</label>
                  <input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Max CLTV Limit %</label>
                  <select
                    value={cltvLimitPct}
                    onChange={(e) => setCltvLimitPct(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  >
                    <option value="75">75% Conservative</option>
                    <option value="80">80% Standard</option>
                    <option value="85">85% High Borrowing</option>
                    <option value="90">90% Credit Union Max</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Credit Line Amount</label>
                  <input type="number" value={creditLineAmount} onChange={(e) => setCreditLineAmount(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Interest Rate %</label>
                  <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Draw Term (Yrs)</label>
                  <select value={drawPeriodYears} onChange={(e) => setDrawPeriodYears(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">
                    <option value="5">5 Years</option>
                    <option value="10">10 Years (Standard)</option>
                    <option value="15">15 Years</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Repay Term (Yrs)</label>
                  <select value={repaymentPeriodYears} onChange={(e) => setRepaymentPeriodYears(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">
                    <option value="10">10 Years</option>
                    <option value="15">15 Years</option>
                    <option value="20">20 Years (Standard)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-1 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Closing Fees</label>
                  <input type="number" value={closingCostsAmount} onChange={(e) => setClosingCostsAmount(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Closing Cost Treatment</label>
                  <select
                    value={closingCostTreatment}
                    onChange={(e) => setClosingCostTreatment(e.target.value as any)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  >
                    <option value="upfront">Pay Upfront in Cash</option>
                    <option value="deducted">Deduct from Line</option>
                    <option value="financed">Finance into Line</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Annual Fee ($/yr)</label>
                  <input type="number" value={annualMaintenanceFee} onChange={(e) => setAnnualMaintenanceFee(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-blue-50/60 dark:bg-slate-900/80 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-5 shadow-xs space-y-4 text-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  Two-Phase Monthly Payments
                </span>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-900/50">
                    <span className="text-[10px] text-blue-600 font-bold uppercase block">Draw Phase ({drawPeriodYears} Yrs)</span>
                    <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                      {currencySymbol}{helocCalc.drawPeriodMonthlyPayment.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-medium">/ month (IO)</span>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-900/50">
                    <span className="text-[10px] text-amber-600 font-bold uppercase block">Repay Phase ({repaymentPeriodYears} Yrs)</span>
                    <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400 font-sans tabular-nums">
                      {currencySymbol}{helocCalc.repaymentPeriodMonthlyPayment.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-medium">/ month (P&I)</span>
                  </div>
                </div>

                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/60 text-xs font-bold text-amber-700 dark:text-amber-400">
                  Payment Shock Jump: +{currencySymbol}{helocCalc.paymentShockDollarIncrease.toLocaleString()}/mo (+{helocCalc.paymentShockPctIncrease}% Increase)
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Max Borrowable</span>
                    <span className="font-extrabold text-blue-600">{currencySymbol}{helocCalc.maxBorrowableCreditLine.toLocaleString()}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Drawn CLTV</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{helocCalc.fullyDrawnCltvPct}%</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Interest</span>
                    <span className="font-extrabold text-emerald-600">{currencySymbol}{helocCalc.totalInterestPaid.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2">
                  {svgEquityDonut}
                </div>
              </div>
            </div>
          </div>

          {/* Derivation Box */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs space-y-2 font-mono">
            <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans">HELOC Underwriting & Payment Formulas:</span>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 text-slate-700 dark:text-slate-300">
              <div>{"Max Allowable Debt (" + cltvLimitPct + "% Cap) = " + currencySymbol + parseFloat(homeValue).toLocaleString() + " × " + cltvLimitPct + "% = " + currencySymbol + Math.round((parseFloat(homeValue) * parseFloat(cltvLimitPct)) / 100).toLocaleString()}</div>
              <div>{"Max HELOC Credit Line = " + currencySymbol + Math.round((parseFloat(homeValue) * parseFloat(cltvLimitPct)) / 100).toLocaleString() + " - 1st Mortgage (" + currencySymbol + parseFloat(currentBalance).toLocaleString() + ") = " + currencySymbol + helocCalc.maxBorrowableCreditLine.toLocaleString()}</div>
              <div>{"Draw Phase IO Monthly Payment = " + currencySymbol + helocCalc.actualCreditLine.toLocaleString() + " × (" + interestRate + "% / 12) = " + currencySymbol + helocCalc.drawPeriodMonthlyPayment.toLocaleString() + "/mo"}</div>
              <div>{"Repay Phase P&I Monthly Payment (" + repaymentPeriodYears + " Yrs) = " + currencySymbol + helocCalc.repaymentPeriodMonthlyPayment.toLocaleString() + "/mo"}</div>
            </div>
          </div>

          {/* Interactive Amortization Table */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200">
                HELOC Two-Phase Amortization Schedule
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  title="Export Amortization Schedule to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-bold">
                  <button
                    onClick={() => setAmortizationView("annual")}
                    className={`px-2.5 py-1 rounded-md cursor-pointer ${amortizationView === "annual" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-400"}`}
                  >
                    Annual Summary
                  </button>
                  <button
                    onClick={() => setAmortizationView("monthly")}
                    className={`px-2.5 py-1 rounded-md cursor-pointer ${amortizationView === "monthly" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-400"}`}
                  >
                    Monthly Breakdown
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto max-h-64 rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs text-left border-collapse font-mono">
                <thead className="sticky top-0 bg-blue-600 text-white font-bold font-sans">
                  <tr>
                    <th className="p-2.5">Period</th>
                    <th className="p-2.5">Phase</th>
                    <th className="p-2.5">Beginning Balance</th>
                    <th className="p-2.5">Payment</th>
                    <th className="p-2.5">Principal</th>
                    <th className="p-2.5">Interest</th>
                    <th className="p-2.5">Annual Fee</th>
                    <th className="p-2.5">Ending Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {(amortizationView === "annual" ? helocCalc.annualAmortization : helocCalc.monthlyAmortization).map((row) => (
                    <tr key={row.period} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-2.5 font-bold font-sans text-blue-600">{row.dateLabel}</td>
                      <td className="p-2.5 font-bold font-sans text-slate-500">{row.phase}</td>
                      <td className="p-2.5">{currencySymbol}{row.beginningBalance.toLocaleString()}</td>
                      <td className="p-2.5 font-bold">{currencySymbol}{row.payment.toLocaleString()}</td>
                      <td className="p-2.5 text-emerald-600">{currencySymbol}{row.principal.toLocaleString()}</td>
                      <td className="p-2.5 text-red-500">{currencySymbol}{row.interest.toLocaleString()}</td>
                      <td className="p-2.5 text-amber-500">{currencySymbol}{row.annualFee.toLocaleString()}</td>
                      <td className="p-2.5">{currencySymbol}{row.endingBalance.toLocaleString()}</td>
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
      {/* 2. VARIABLE RATE STRESS-TESTER & SHOCK SIMULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Variable Rate Stress-Tester & Shock Simulator</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">WSJ Prime Rate %</label>
                  <input type="number" value={wsjPrimeRate} onChange={(e) => setWsjPrimeRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Lender Margin %</label>
                  <input type="number" value={lenderMargin} onChange={(e) => setLenderMargin(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Rate Rise Scenario</label>
                  <select value={rateScenario} onChange={(e) => setRateScenario(e.target.value as any)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">
                    <option value="+1">+1.0% Mild Rise</option>
                    <option value="+2">+2.0% Moderate Rise</option>
                    <option value="+3">+3.0% Severe Rise</option>
                    <option value="cap">Max Lifetime Cap (18.0%)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Lifetime Rate Cap %</label>
                  <input type="number" value={lifetimeCapPct} onChange={(e) => setLifetimeCapPct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Rate Hike Impact</span>

              <div className="text-2xl font-extrabold text-red-500 font-sans tabular-nums mt-1">
                Stressed Rate: {stressCalc.stressedRate}% (Current: {stressCalc.currentRate}%)
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Stressed Draw Pmt</span>
                  <span className="text-blue-600 text-sm font-extrabold">{currencySymbol}{stressCalc.stressedDrawPayment.toLocaleString()}/mo</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Stressed Repay Pmt</span>
                  <span className="text-amber-600 text-sm font-extrabold">{currencySymbol}{stressCalc.stressedRepayPayment.toLocaleString()}/mo</span>
                </div>
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-red-500">
                Payment Increases by +{currencySymbol}{stressCalc.monthlyIncrease.toLocaleString()}/mo (+{stressCalc.pctIncrease}%)
              </div>
            </div>
          </div>

          {/* History Drawer for Box 2 */}
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
      {/* 3. CUSTOM DRAW & PAYOFF LIFECYCLE SIMULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Custom Draw & Payoff Lifecycle Simulator</span>
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Initial Draw Amount</label>
                  <input type="number" value={initialDraw} onChange={(e) => setInitialDraw(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Future Draw Amount</label>
                  <input type="number" value={futureDrawAmount} onChange={(e) => setFutureDrawAmount(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Future Draw Timing</label>
                  <select value={futureDrawYear} onChange={(e) => setFutureDrawYear(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">
                    <option value="2">Year 2</option>
                    <option value="3">Year 3 (Standard)</option>
                    <option value="5">Year 5</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Extra Monthly Principal</label>
                  <input type="number" value={extraMonthlyPrincipal} onChange={(e) => setExtraMonthlyPrincipal(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Custom Lifecycle Results</span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                Draw End Balance: {currencySymbol}{multiDrawCalc.balanceAtDrawEnd.toLocaleString()}
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-emerald-600">
                Save {currencySymbol}{multiDrawCalc.interestSaved.toLocaleString()} Interest via Extra Principal Paydowns!
              </div>
            </div>
          </div>

          {/* History Drawer for Box 3 */}
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
      {/* 4. HELOC VS FIXED HOME EQUITY LOAN VS CASH-OUT REFI MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">HELOC vs. Fixed Home Equity Loan vs. Cash-Out Refinance</span>
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
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Cash Needed</label>
                  <input type="number" value={cashNeeded} onChange={(e) => setCashNeeded(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">1st Mortgage Rate %</label>
                  <input type="number" value={current1stRate} onChange={(e) => setCurrent1stRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Fixed Loan Rate %</label>
                  <input type="number" value={fixedLoanRate} onChange={(e) => setFixedLoanRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Refinance Rate %</label>
                  <input type="number" value={refiRate} onChange={(e) => setRefiRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">3-Way Program Comparison</span>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-900/50">
                  <span className="text-[10px] text-blue-600 block uppercase">HELOC (IO Draw)</span>
                  <span className="text-blue-600 text-sm font-extrabold">{currencySymbol}{matrixCalc.helocDrawMonthly.toLocaleString()}/mo</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Fixed Loan</span>
                  <span className="text-slate-800 dark:text-slate-200 text-sm font-extrabold">{currencySymbol}{matrixCalc.fixedLoanMonthly.toLocaleString()}/mo</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Cash-Out Refi</span>
                  <span className="text-slate-800 dark:text-slate-200 text-sm font-extrabold">{currencySymbol}{matrixCalc.refiNewMonthly.toLocaleString()}/mo</span>
                </div>
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-emerald-600">
                {matrixCalc.recommendation}
              </div>
            </div>
          </div>

          {/* History Drawer for Box 4 */}
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
      {/* 5. DEBT CONSOLIDATION & INTEREST ARBITRAGE MODE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Debt Consolidation & Interest Arbitrage Mode</span>
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Credit Card / High Debt</label>
                  <input type="number" value={creditCardBalance} onChange={(e) => setCreditCardBalance(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Avg Credit Card Rate %</label>
                  <input type="number" value={creditCardRate} onChange={(e) => setCreditCardRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Consolidation Arbitrage Savings</span>

              <div className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums mt-1">
                Save {currencySymbol}{consolCalc.monthlyCashFlowSavingsDrawPhase.toLocaleString()} / month (Draw Phase)
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-emerald-600">
                Save {currencySymbol}{consolCalc.lifetimeInterestSaved.toLocaleString()} Total Lifetime Interest!
              </div>
            </div>
          </div>

          {/* History Drawer for Box 5 */}
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
      {/* 6. IRS TAX DEDUCTIBILITY ESTIMATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">IRS Tax Deductibility Estimator (IRS 2026 Guidelines)</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Marginal Tax Bracket</label>
                  <select
                    value={taxBracketPct}
                    onChange={(e) => setTaxBracketPct(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  >
                    <option value="12">12% Federal</option>
                    <option value="22">22% Federal</option>
                    <option value="24">24% Federal</option>
                    <option value="32">32% Federal</option>
                    <option value="35">35% Federal</option>
                    <option value="37">37% Federal</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Substantial Home Improvements?</label>
                  <button
                    type="button"
                    onClick={() => setIsHomeImprovement(!isHomeImprovement)}
                    className={`w-full h-9 px-3 rounded-lg font-extrabold text-xs flex items-center justify-between border cursor-pointer ${
                      isHomeImprovement
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                    }`}
                  >
                    <span>{isHomeImprovement ? "Yes (Home Remodel)" : "No (Other Use)"}</span>
                    {isHomeImprovement && <Check className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">IRS Tax Savings Projection</span>

              <div className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums mt-1">
                {taxCalc.isDeductible
                  ? `Save ${currencySymbol}${taxCalc.projectedAnnualTaxSavings.toLocaleString()} / year`
                  : "$0 Tax Write-Off"}
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200">
                {taxCalc.statusExplanation}
              </div>
            </div>
          </div>

          {/* History Drawer for Box 6 */}
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
