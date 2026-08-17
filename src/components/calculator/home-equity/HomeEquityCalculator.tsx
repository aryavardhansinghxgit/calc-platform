"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, ChevronDown, ChevronUp, Check, Plus, AlertTriangle, ShieldCheck, DollarSign, Download } from "lucide-react";
import {
  calculateHomeEquityLoan,
  calculateCLTVSolver,
  calculateLoanVsHelocVsRefi,
  calculateDebtConsolidation,
  calculateImprovementROI,
  calculatePrepayment,
  calculateEquityDTI,
  calculateTaxDeduction,
} from "@/app/calculators/home-equity-loan-calculator/calculator";
import {
  ClosingCostTreatment,
  EquityCalcMode,
  SavedHomeEquityItem,
} from "@/app/calculators/home-equity-loan-calculator/types";

export function HomeEquityCalculator() {
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // =========================================================================
  // BOX 1: HOME EQUITY LOAN ENGINE STATES (MODE A & B)
  // =========================================================================
  const [calcMode, setCalcMode] = useState<EquityCalcMode>("amount");
  const [homeValue, setHomeValue] = useState<string>("500000");
  const [currentBalance, setCurrentBalance] = useState<string>("275000");
  const [cltvLimitPct, setCltvLimitPct] = useState<string>("80");
  const [loanAmount, setLoanAmount] = useState<string>("125000");
  const [loanTermYears, setLoanTermYears] = useState<string>("15");
  const [interestRate, setInterestRate] = useState<string>("8.0");
  const [closingCostsAmount, setClosingCostsAmount] = useState<string>("2500");
  const [closingCostTreatment, setClosingCostTreatment] = useState<ClosingCostTreatment>("upfront");

  const [amortizationView, setAmortizationView] = useState<"annual" | "monthly">("annual");

  const [savedBox1Items, setSavedBox1Items] = useState<SavedHomeEquityItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);
  const [showHistoryBox1, setShowHistoryBox1] = useState<boolean>(false);

  const homeEqCalc = useMemo(() => {
    return calculateHomeEquityLoan({
      calcMode,
      homeValue: parseFloat(homeValue) || 0,
      currentMortgageBalance: parseFloat(currentBalance) || 0,
      cltvLimitPct: parseFloat(cltvLimitPct) || 80,
      loanAmount: parseFloat(loanAmount) || 0,
      loanTermYears: parseFloat(loanTermYears) || 15,
      interestRate: parseFloat(interestRate) || 0,
      closingCostsAmount: parseFloat(closingCostsAmount) || 0,
      closingCostTreatment,
      currencySymbol,
    });
  }, [
    calcMode,
    homeValue,
    currentBalance,
    cltvLimitPct,
    loanAmount,
    loanTermYears,
    interestRate,
    closingCostsAmount,
    closingCostTreatment,
    currencySymbol,
  ]);

  const handleSaveBox1 = () => {
    const newItem: SavedHomeEquityItem = {
      id: Date.now().toString(),
      title: `Home Equity Payment (${calcMode === "amount" ? "Specified Loan" : "Max LTV Capacity"})`,
      inputsSummary: `Value: ${currencySymbol}${parseFloat(homeValue).toLocaleString()} | 1st Mort: ${currencySymbol}${parseFloat(currentBalance).toLocaleString()} | Loan: ${currencySymbol}${homeEqCalc.actualLoanAmount.toLocaleString()} @ ${interestRate}%`,
      primaryResult: `Monthly Payment: ${currencySymbol}${homeEqCalc.monthlyPayment.toLocaleString()}/mo | Post-Loan CLTV: ${homeEqCalc.newCltvPct}%`,
      detailsList: [
        `Max Borrowable Equity (${cltvLimitPct}% Cap): ${currencySymbol}${homeEqCalc.maxBorrowableEquity.toLocaleString()}`,
        `Total Financed Loan: ${currencySymbol}${homeEqCalc.totalFinancedLoanAmount.toLocaleString()}`,
        `Total Cost of Loan: ${currencySymbol}${homeEqCalc.totalCostOfLoan.toLocaleString()}`,
        `Net Disbursed Cash: ${currencySymbol}${homeEqCalc.netProceedsDisbursed.toLocaleString()}`,
        `Total Interest Paid: ${currencySymbol}${homeEqCalc.totalInterestPaid.toLocaleString()}`,
        `True APR: ${homeEqCalc.trueApr}%`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox1Items];
    setSavedBox1Items(updated);
    try {
      localStorage.setItem("saved_homeeq_box1", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleExportCSV = () => {
    const data = amortizationView === "annual" ? homeEqCalc.annualAmortization : homeEqCalc.monthlyAmortization;
    if (!data || data.length === 0) return;

    const headers = ["Period", "Beginning Balance", "Payment", "Principal", "Interest", "Ending Balance"];
    const rows = data.map((row) => [
      `"${row.dateLabel}"`,
      `"${row.beginningBalance}"`,
      `"${row.payment}"`,
      `"${row.principal}"`,
      `"${row.interest}"`,
      `"${row.endingBalance}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `home_equity_amortization_${amortizationView}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // SVG Equity Slice Donut Chart
  const svgEquityDonut = useMemo(() => {
    const hv = parseFloat(homeValue) || 500000;
    const debt1 = parseFloat(currentBalance) || 0;
    const loan2 = homeEqCalc.totalFinancedLoanAmount || 0;
    const unenc = Math.max(0, hv - (debt1 + loan2));

    if (hv <= 0) return null;

    const debt1Pct = (debt1 / hv) * 100;
    const loan2Pct = (loan2 / hv) * 100;
    const unencPct = (unenc / hv) * 100;

    const r = 40;
    const cx = 50;
    const cy = 50;
    const circ = 2 * Math.PI * r;

    const stroke1 = (debt1Pct / 100) * circ;
    const stroke2 = (loan2Pct / 100) * circ;
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
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span> <span>2nd Loan: {loan2Pct.toFixed(1)}%</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> <span>Protected Equity: {unencPct.toFixed(1)}%</span></div>
        </div>
      </div>
    );
  }, [homeValue, currentBalance, homeEqCalc]);

  // =========================================================================
  // BOX 2: HOME EQUITY VS HELOC VS REFI STATES
  // =========================================================================
  const [current1stRate, setCurrent1stRate] = useState<string>("3.5");
  const [cashNeeded, setCashNeeded] = useState<string>("75000");
  const [helocRate, setHelocRate] = useState<string>("9.25");
  const [refiRate, setRefiRate] = useState<string>("6.75");

  const [savedBox2Items, setSavedBox2Items] = useState<SavedHomeEquityItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);
  const [showHistoryBox2, setShowHistoryBox2] = useState<boolean>(false);

  const vsMatrixCalc = useMemo(() => {
    return calculateLoanVsHelocVsRefi({
      homeValue: parseFloat(homeValue) || 500000,
      currentBalance: parseFloat(currentBalance) || 275000,
      currentRate: parseFloat(current1stRate) || 3.5,
      cashNeeded: parseFloat(cashNeeded) || 75000,
      fixedEquityRate: parseFloat(interestRate) || 8.0,
      helocRate: parseFloat(helocRate) || 9.25,
      refiRate: parseFloat(refiRate) || 6.75,
    });
  }, [homeValue, currentBalance, current1stRate, cashNeeded, interestRate, helocRate, refiRate]);

  const handleSaveBox2 = () => {
    const newItem: SavedHomeEquityItem = {
      id: Date.now().toString(),
      title: "Home Equity Loan vs. HELOC vs. Cash-Out Refi",
      inputsSummary: `Cash Needed: ${currencySymbol}${parseFloat(cashNeeded).toLocaleString()} | 1st Rate: ${current1stRate}% vs Equity Rate: ${interestRate}% vs Refi: ${refiRate}%`,
      primaryResult: vsMatrixCalc.recommendation,
      detailsList: [
        `Fixed Equity Loan: ${currencySymbol}${vsMatrixCalc.equityLoanMonthly.toLocaleString()}/mo (Total 5-Yr Cost: ${currencySymbol}${vsMatrixCalc.equityLoan5YrCost.toLocaleString()})`,
        `HELOC (Interest-Only Draw): ${currencySymbol}${vsMatrixCalc.helocDrawMonthly.toLocaleString()}/mo (5-Yr Cost: ${currencySymbol}${vsMatrixCalc.heloc5YrCost.toLocaleString()})`,
        `Cash-Out Refi (New Total 1st): ${currencySymbol}${vsMatrixCalc.refiNewMonthly.toLocaleString()}/mo (5-Yr Cost: ${currencySymbol}${vsMatrixCalc.refi5YrCost.toLocaleString()})`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox2Items];
    setSavedBox2Items(updated);
    try {
      localStorage.setItem("saved_homeeq_box2", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  // =========================================================================
  // BOX 3: EXTRA PAYMENTS FORECASTER STATES
  // =========================================================================
  const [extraPayment, setExtraPayment] = useState<string>("150");
  const [extraLumpSum, setExtraLumpSum] = useState<string>("0");

  const [savedBox3Items, setSavedBox3Items] = useState<SavedHomeEquityItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);
  const [showHistoryBox3, setShowHistoryBox3] = useState<boolean>(false);

  const prepayCalc = useMemo(() => {
    return calculatePrepayment({
      loanAmount: homeEqCalc.totalFinancedLoanAmount,
      interestRate: parseFloat(interestRate) || 8.0,
      loanTermYears: parseFloat(loanTermYears) || 15,
      extraMonthlyPayment: parseFloat(extraPayment) || 0,
      extraAnnualLumpSum: parseFloat(extraLumpSum) || 0,
    });
  }, [homeEqCalc.totalFinancedLoanAmount, interestRate, loanTermYears, extraPayment, extraLumpSum]);

  const handleSaveBox3 = () => {
    const newItem: SavedHomeEquityItem = {
      id: Date.now().toString(),
      title: "Extra Payments & Accelerated Payoff",
      inputsSummary: `Loan: ${currencySymbol}${homeEqCalc.totalFinancedLoanAmount.toLocaleString()} | Extra Monthly: ${currencySymbol}${parseFloat(extraPayment).toLocaleString()}`,
      primaryResult: `Save ${currencySymbol}${prepayCalc.interestSaved.toLocaleString()} Interest | ${prepayCalc.yearsSaved} Years Saved`,
      detailsList: [
        `Original Term: ${prepayCalc.originalMonths} Months → New Term: ${prepayCalc.newMonths} Months`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox3Items];
    setSavedBox3Items(updated);
    try {
      localStorage.setItem("saved_homeeq_box3", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  // =========================================================================
  // BOX 4: DTI QUALIFICATION CHECKER STATES
  // =========================================================================
  const [grossIncome, setGrossIncome] = useState<string>("8500");
  const [otherDebt, setOtherDebt] = useState<string>("800");

  const [savedBox4Items, setSavedBox4Items] = useState<SavedHomeEquityItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);
  const [showHistoryBox4, setShowHistoryBox4] = useState<boolean>(false);

  const dtiCalc = useMemo(() => {
    return calculateEquityDTI({
      grossMonthlyIncome: parseFloat(grossIncome) || 0,
      proposedHousingPayment: homeEqCalc.monthlyPayment,
      existingMonthlyDebt: parseFloat(otherDebt) || 0,
    });
  }, [grossIncome, homeEqCalc.monthlyPayment, otherDebt]);

  const handleSaveBox4 = () => {
    const newItem: SavedHomeEquityItem = {
      id: Date.now().toString(),
      title: "Debt-to-Income (DTI) Qualification Check",
      inputsSummary: `Income: ${currencySymbol}${parseFloat(grossIncome).toLocaleString()}/mo | Housing P&I: ${currencySymbol}${homeEqCalc.monthlyPayment.toLocaleString()}/mo | Other Debt: ${currencySymbol}${parseFloat(otherDebt).toLocaleString()}/mo`,
      primaryResult: `Back-End DTI: ${dtiCalc.backEndDTI}% (${dtiCalc.statusText})`,
      detailsList: [
        `Front-End DTI: ${dtiCalc.frontEndDTI}%`,
        `Qualifies under standard 43% cap: ${dtiCalc.backEndDTI <= 43 ? "Yes" : "No"}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox4Items];
    setSavedBox4Items(updated);
    try {
      localStorage.setItem("saved_homeeq_box4", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  // =========================================================================
  // BOX 5: TAX DEDUCTIBILITY ESTIMATOR STATES (IRS 2026 GUIDELINES)
  // =========================================================================
  const [isHomeImprovement, setIsHomeImprovement] = useState<boolean>(true);
  const [taxBracketPct, setTaxBracketPct] = useState<string>("24");

  const [savedBox5Items, setSavedBox5Items] = useState<SavedHomeEquityItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);
  const [showHistoryBox5, setShowHistoryBox5] = useState<boolean>(false);

  const taxCalc = useMemo(() => {
    const approxAnnualInterest = homeEqCalc.totalInterestPaid / parseFloat(loanTermYears);
    return calculateTaxDeduction({
      annualInterestPaid: approxAnnualInterest,
      isUsedForHomeImprovement: isHomeImprovement,
      marginalTaxBracketPct: parseFloat(taxBracketPct) || 24,
    });
  }, [homeEqCalc.totalInterestPaid, loanTermYears, isHomeImprovement, taxBracketPct]);

  const handleSaveBox5 = () => {
    const newItem: SavedHomeEquityItem = {
      id: Date.now().toString(),
      title: "IRS Tax Deductibility Estimate",
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
    const updated = [newItem, ...savedBox5Items];
    setSavedBox5Items(updated);
    try {
      localStorage.setItem("saved_homeeq_box5", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  // =========================================================================
  // BOX 6: HOME RENOVATION & VALUE-ADD EQUITY FORECASTER
  // =========================================================================
  const [projectCost, setProjectCost] = useState<string>("50000");
  const [roiPct, setRoiPct] = useState<string>("70");

  const [savedBox6Items, setSavedBox6Items] = useState<SavedHomeEquityItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);
  const [showHistoryBox6, setShowHistoryBox6] = useState<boolean>(false);

  const roiCalc = useMemo(() => {
    return calculateImprovementROI({
      currentHomeValue: parseFloat(homeValue) || 450000,
      existingMortgage: parseFloat(currentBalance) || 250000,
      projectCost: parseFloat(projectCost) || 50000,
      expectedAppreciationPct: parseFloat(roiPct) || 70,
      loanRate: parseFloat(interestRate) || 8.0,
      loanTermYears: parseFloat(loanTermYears) || 10,
    });
  }, [homeValue, currentBalance, projectCost, roiPct, interestRate, loanTermYears]);

  const handleSaveBox6 = () => {
    const newItem: SavedHomeEquityItem = {
      id: Date.now().toString(),
      title: "Home Improvement ROI & Value-Add Forecaster",
      inputsSummary: `Project Cost: ${currencySymbol}${parseFloat(projectCost).toLocaleString()} | Expected ROI: ${roiPct}%`,
      primaryResult: `Projected Home Value: ${currencySymbol}${roiCalc.projectedPostRenovationHomeValue.toLocaleString()} | Net Equity Gain: ${currencySymbol}${roiCalc.netEquityGain.toLocaleString()}`,
      detailsList: [
        `Value Added to Home: ${currencySymbol}${roiCalc.valueAddedToHome.toLocaleString()}`,
        `Renovation Loan Payment: ${currencySymbol}${roiCalc.monthlyPayment.toLocaleString()}/mo`,
        `New Net Home Equity: ${currencySymbol}${roiCalc.newNetHomeEquity.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox6Items];
    setSavedBox6Items(updated);
    try {
      localStorage.setItem("saved_homeeq_box6", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  // Load local storage
  useEffect(() => {
    try {
      const b1 = localStorage.getItem("saved_homeeq_box1");
      if (b1) setSavedBox1Items(JSON.parse(b1));
      const b2 = localStorage.getItem("saved_homeeq_box2");
      if (b2) setSavedBox2Items(JSON.parse(b2));
      const b3 = localStorage.getItem("saved_homeeq_box3");
      if (b3) setSavedBox3Items(JSON.parse(b3));
      const b4 = localStorage.getItem("saved_homeeq_box4");
      if (b4) setSavedBox4Items(JSON.parse(b4));
      const b5 = localStorage.getItem("saved_homeeq_box5");
      if (b5) setSavedBox5Items(JSON.parse(b5));
      const b6 = localStorage.getItem("saved_homeeq_box6");
      if (b6) setSavedBox6Items(JSON.parse(b6));
    } catch (e) {}
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Simple Currency Selector Header */}
      <div className="flex items-center justify-end gap-2 text-xs font-bold">
        <label htmlFor="homeeq-currency-select" className="text-slate-500 font-medium">Currency:</label>
        <select
          id="homeeq-currency-select"
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
      {/* 1. HOME EQUITY LOAN MONTHLY PAYMENT & AMORTIZATION ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Home Equity Loan Monthly Payment & Amortization Engine</span>
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
          {/* Mode Switcher Tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit text-xs font-bold">
            <button
              onClick={() => setCalcMode("amount")}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                calcMode === "amount" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Mode A: Specified Loan Amount
            </button>
            <button
              onClick={() => setCalcMode("max_ltv")}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                calcMode === "max_ltv" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Mode B: Max LTV Capacity
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs text-xs">
              <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">Property Equity & Loan Options</span>

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

              <div className="grid grid-cols-3 gap-3">
                {calcMode === "amount" && (
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Desired 2nd Loan</label>
                    <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                  </div>
                )}
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Interest Rate %</label>
                  <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Term (Years)</label>
                  <input type="number" value={loanTermYears} onChange={(e) => setLoanTermYears(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Upfront Closing Fees</label>
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
                    <option value="deducted">Deduct from Loan Proceeds</option>
                    <option value="financed">Finance into 2nd Mortgage</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-blue-50/60 dark:bg-slate-900/80 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-5 shadow-xs space-y-4 text-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  Fixed Monthly Payment
                </span>

                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900/40">
                  <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                    {currencySymbol}{homeEqCalc.monthlyPayment.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 block mt-0.5">/ month</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Max Borrowable</span>
                    <span className="font-extrabold text-blue-600">{currencySymbol}{homeEqCalc.maxBorrowableEquity.toLocaleString()}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">New CLTV</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{homeEqCalc.newCltvPct}%</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">True APR</span>
                    <span className="font-extrabold text-emerald-600">{homeEqCalc.trueApr}%</span>
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
            <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans">CLTV & Equity Underwriting Derivation:</span>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 text-slate-700 dark:text-slate-300">
              <div>{"Max Allowable Debt (" + cltvLimitPct + "% Cap) = " + currencySymbol + parseFloat(homeValue).toLocaleString() + " × " + cltvLimitPct + "% = " + currencySymbol + Math.round((parseFloat(homeValue) * parseFloat(cltvLimitPct)) / 100).toLocaleString()}</div>
              <div>{"Max Borrowable Equity = " + currencySymbol + Math.round((parseFloat(homeValue) * parseFloat(cltvLimitPct)) / 100).toLocaleString() + " - 1st Mortgage (" + currencySymbol + parseFloat(currentBalance).toLocaleString() + ") = " + currencySymbol + homeEqCalc.maxBorrowableEquity.toLocaleString()}</div>
              <div>{"Post-Loan CLTV = (" + currencySymbol + parseFloat(currentBalance).toLocaleString() + " + " + currencySymbol + homeEqCalc.totalFinancedLoanAmount.toLocaleString() + ") / " + currencySymbol + parseFloat(homeValue).toLocaleString() + " = " + homeEqCalc.newCltvPct + "%"}</div>
            </div>
          </div>

          {/* Interactive Amortization Table */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200">
                Second Mortgage Amortization Schedule
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
                    <th className="p-2.5">Beginning Balance</th>
                    <th className="p-2.5">Payment</th>
                    <th className="p-2.5">Principal</th>
                    <th className="p-2.5">Interest</th>
                    <th className="p-2.5">Ending Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {(amortizationView === "annual" ? homeEqCalc.annualAmortization : homeEqCalc.monthlyAmortization).map((row) => (
                    <tr key={row.period} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-2.5 font-bold font-sans text-blue-600">{row.dateLabel}</td>
                      <td className="p-2.5">{currencySymbol}{row.beginningBalance.toLocaleString()}</td>
                      <td className="p-2.5 font-bold">{currencySymbol}{row.payment.toLocaleString()}</td>
                      <td className="p-2.5 text-emerald-600">{currencySymbol}{row.principal.toLocaleString()}</td>
                      <td className="p-2.5 text-red-500">{currencySymbol}{row.interest.toLocaleString()}</td>
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
      {/* 2. SIDE-BY-SIDE COMPARISON ENGINE (LOAN VS HELOC VS REFI) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Side-by-Side Comparison Engine (Loan vs. HELOC vs. Refi)</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Cash Amount Needed</label>
                  <input type="number" value={cashNeeded} onChange={(e) => setCashNeeded(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">1st Mortgage Rate %</label>
                  <input type="number" value={current1stRate} onChange={(e) => setCurrent1stRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">3-Way Program Comparison</span>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-900/50">
                  <span className="text-[10px] text-blue-600 block uppercase">Fixed 2nd Loan</span>
                  <span className="text-blue-600 text-sm font-extrabold">{currencySymbol}{vsMatrixCalc.equityLoanMonthly.toLocaleString()}/mo</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">HELOC (IO Draw)</span>
                  <span className="text-slate-800 dark:text-slate-200 text-sm font-extrabold">{currencySymbol}{vsMatrixCalc.helocDrawMonthly.toLocaleString()}/mo</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Cash-Out Refi</span>
                  <span className="text-slate-800 dark:text-slate-200 text-sm font-extrabold">{currencySymbol}{vsMatrixCalc.refiNewMonthly.toLocaleString()}/mo</span>
                </div>
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-emerald-600">
                {vsMatrixCalc.recommendation}
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
      {/* 3. EXTRA PAYMENTS & ACCELERATED PAYOFF FORECASTER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Extra Payments & Accelerated Payoff Forecaster</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Extra Monthly Payment</label>
                  <input type="number" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Extra Annual Lump Sum</label>
                  <input type="number" value={extraLumpSum} onChange={(e) => setExtraLumpSum(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Total Prepayment Savings</span>

              <div className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums mt-1">
                Save {currencySymbol}{prepayCalc.interestSaved.toLocaleString()} Interest
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-blue-600">
                Shave {prepayCalc.yearsSaved} Years Off 2nd Mortgage Term!
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
      {/* 4. DEBT-TO-INCOME (DTI) QUALIFICATION CHECKER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Debt-to-Income (DTI) Qualification Checker</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Gross Monthly Income</label>
                  <input type="number" value={grossIncome} onChange={(e) => setGrossIncome(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Other Monthly Debts</label>
                  <input type="number" value={otherDebt} onChange={(e) => setOtherDebt(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">DTI Underwriting Readiness</span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                Back-End DTI: {dtiCalc.backEndDTI}%
              </div>

              <div className={`p-2.5 rounded-xl border text-xs font-bold ${
                dtiCalc.statusColor === "green"
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-400"
                  : dtiCalc.statusColor === "yellow"
                  ? "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-400"
                  : "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400"
              }`}>
                {dtiCalc.statusText}
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
      {/* 5. TAX DEDUCTIBILITY ESTIMATOR (IRS 2026 GUIDELINES) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Tax Deductibility Estimator (IRS 2026 Guidelines)</span>
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
      {/* 6. HOME RENOVATION & VALUE-ADD EQUITY FORECASTER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Home Renovation & Value-Add Equity Forecaster</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Project Cost</label>
                  <input type="number" value={projectCost} onChange={(e) => setProjectCost(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Expected Value ROI %</label>
                  <input type="number" value={roiPct} onChange={(e) => setRoiPct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Post-Renovation Home Equity</span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                Post-Remodel Value: {currencySymbol}{roiCalc.projectedPostRenovationHomeValue.toLocaleString()}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Renovation Loan Payment</span>
                  <span className="font-extrabold text-blue-600">{currencySymbol}{roiCalc.monthlyPayment.toLocaleString()}/mo</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Net Home Equity</span>
                  <span className="font-extrabold text-emerald-600">{currencySymbol}{roiCalc.newNetHomeEquity.toLocaleString()}</span>
                </div>
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
