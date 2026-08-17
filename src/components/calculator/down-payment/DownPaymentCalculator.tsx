"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, ChevronDown, ChevronUp, Check, Plus, Download } from "lucide-react";
import {
  calculateDownPayment,
  calculateDownPaymentComparison,
  calculateOpportunityCost,
  calculateCashToClose,
  calculateLoanPrograms,
  calculateSavingsGoal,
} from "@/app/calculators/down-payment-calculator/calculator";
import {
  CalculationMode,
  SavedDownPaymentItem,
} from "@/app/calculators/down-payment-calculator/types";

export function DownPaymentCalculator() {
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // =========================================================================
  // BOX 1: CORE MORTGAGE DOWN PAYMENT & PITI ENGINE STATES
  // =========================================================================
  const [calculationMode, setCalculationMode] = useState<CalculationMode>("home_price");
  const [homePrice, setHomePrice] = useState<string>("500000");
  const [downPaymentPct, setDownPaymentPct] = useState<string>("20");
  const [upfrontCashAvailable, setUpfrontCashAvailable] = useState<string>("115000");
  const [loanTermYears, setLoanTermYears] = useState<string>("30");
  const [interestRate, setInterestRate] = useState<string>("6.5");
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<string>("6000");
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<string>("1800");
  const [pmiRatePct, setPmiRatePct] = useState<string>("0.5");
  const [hoaDuesMonthly, setHoaDuesMonthly] = useState<string>("0");
  const [closingCostsPct, setClosingCostsPct] = useState<string>("3.0");

  const [amortizationView, setAmortizationView] = useState<"annual" | "monthly">("annual");

  const [savedBox1Items, setSavedBox1Items] = useState<SavedDownPaymentItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);
  const [showHistoryBox1, setShowHistoryBox1] = useState<boolean>(false);

  // Sync down payment amount vs %
  const currentDownAmount = useMemo(() => {
    const hp = parseFloat(homePrice) || 0;
    const pct = parseFloat(downPaymentPct) || 0;
    return Math.round((hp * pct) / 100);
  }, [homePrice, downPaymentPct]);

  const handleDownAmountChange = (valStr: string) => {
    const amt = parseFloat(valStr) || 0;
    const hp = parseFloat(homePrice) || 0;
    if (hp > 0) {
      setDownPaymentPct(Math.min(100, Math.max(0, (amt / hp) * 100)).toFixed(1));
    }
  };

  const dpCalc = useMemo(() => {
    return calculateDownPayment({
      calculationMode,
      homePrice: parseFloat(homePrice) || 0,
      downPaymentPct: parseFloat(downPaymentPct) || 0,
      upfrontCashAvailable: parseFloat(upfrontCashAvailable) || 0,
      loanTermYears: parseFloat(loanTermYears) || 30,
      interestRate: parseFloat(interestRate) || 0,
      propertyTaxAnnual: parseFloat(propertyTaxAnnual) || 0,
      homeInsuranceAnnual: parseFloat(homeInsuranceAnnual) || 0,
      pmiRatePct: parseFloat(pmiRatePct) || 0,
      hoaDuesMonthly: parseFloat(hoaDuesMonthly) || 0,
      closingCostsPct: parseFloat(closingCostsPct) || 0,
      currencySymbol,
    });
  }, [
    calculationMode,
    homePrice,
    downPaymentPct,
    upfrontCashAvailable,
    loanTermYears,
    interestRate,
    propertyTaxAnnual,
    homeInsuranceAnnual,
    pmiRatePct,
    hoaDuesMonthly,
    closingCostsPct,
    currencySymbol,
  ]);

  const handleSaveBox1 = () => {
    const newItem: SavedDownPaymentItem = {
      id: Date.now().toString(),
      title: "Core Mortgage Down Payment & PITI Amortization",
      inputsSummary: `Home: ${currencySymbol}${dpCalc.homePrice.toLocaleString()} | Down: ${currencySymbol}${dpCalc.downPaymentAmount.toLocaleString()} (${dpCalc.downPaymentPct}%) @ ${interestRate}%`,
      primaryResult: `Monthly PITI: ${currencySymbol}${dpCalc.totalMonthlyPayment.toLocaleString()}/mo | Cash to Close: ${currencySymbol}${dpCalc.totalCashToClose.toLocaleString()}`,
      detailsList: [
        `Loan Amount Financed: ${currencySymbol}${dpCalc.loanAmount.toLocaleString()}`,
        `Monthly P&I: ${currencySymbol}${dpCalc.monthlyPrincipalAndInterest.toLocaleString()}/mo`,
        `Monthly PMI: ${currencySymbol}${dpCalc.monthlyPmi.toLocaleString()}/mo (Milestone: ${dpCalc.pmiCancellationDateLabel})`,
        `Total Interest Paid: ${currencySymbol}${dpCalc.totalInterestOverTerm.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox1Items];
    setSavedBox1Items(updated);
    try {
      localStorage.setItem("saved_dp_box1", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleExportCSV = () => {
    const data = amortizationView === "annual" ? dpCalc.annualAmortization : dpCalc.monthlyAmortization;
    if (!data || data.length === 0) return;

    const headers = ["Period", "Beginning Balance", "Payment", "Principal", "Interest", "PMI", "Ending Balance"];
    const rows = data.map((row) => [
      `"${row.dateLabel}"`,
      `"${row.beginningBalance}"`,
      `"${row.payment}"`,
      `"${row.principal}"`,
      `"${row.interest}"`,
      `"${row.pmi}"`,
      `"${row.endingBalance}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `down_payment_amortization_${amortizationView}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // SVG PITI Donut Chart
  const svgPitiDonut = useMemo(() => {
    const pi = dpCalc.monthlyPrincipalAndInterest || 0;
    const tax = dpCalc.monthlyPropertyTax || 0;
    const ins = dpCalc.monthlyHomeInsurance || 0;
    const pmi = dpCalc.monthlyPmi || 0;
    const hoa = dpCalc.monthlyHoa || 0;

    const total = pi + tax + ins + pmi + hoa;
    if (total <= 0) return null;

    const piPct = (pi / total) * 100;
    const taxPct = (tax / total) * 100;
    const insPct = (ins / total) * 100;
    const pmiPct = (pmi / total) * 100;
    const hoaPct = (hoa / total) * 100;

    const r = 40;
    const cx = 50;
    const cy = 50;
    const circ = 2 * Math.PI * r;

    const strokePI = (piPct / 100) * circ;
    const strokeTax = (taxPct / 100) * circ;
    const strokeIns = (insPct / 100) * circ;
    const strokePmi = (pmiPct / 100) * circ;
    const strokeHoa = (hoaPct / 100) * circ;

    return (
      <div className="flex items-center justify-center gap-4">
        <svg viewBox="0 0 100 100" className="w-24 h-24 transform -rotate-90">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2563eb" strokeWidth="16" strokeDasharray={`${strokePI} ${circ}`} strokeDashoffset={0} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#059669" strokeWidth="16" strokeDasharray={`${strokeTax} ${circ}`} strokeDashoffset={-strokePI} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#d97706" strokeWidth="16" strokeDasharray={`${strokeIns} ${circ}`} strokeDashoffset={-(strokePI + strokeTax)} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#dc2626" strokeWidth="16" strokeDasharray={`${strokePmi} ${circ}`} strokeDashoffset={-(strokePI + strokeTax + strokeIns)} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#8b5cf6" strokeWidth="16" strokeDasharray={`${strokeHoa} ${circ}`} strokeDashoffset={-(strokePI + strokeTax + strokeIns + strokePmi)} />
        </svg>
        <div className="text-[11px] space-y-1 font-bold">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span> <span>P&I: {piPct.toFixed(1)}%</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span> <span>Tax: {taxPct.toFixed(1)}%</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block"></span> <span>Ins: {insPct.toFixed(1)}%</span></div>
          {pmi > 0 && <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span> <span>PMI: {pmiPct.toFixed(1)}%</span></div>}
        </div>
      </div>
    );
  }, [dpCalc]);

  // =========================================================================
  // BOX 2: DOWN PAYMENT COMPARISON MATRIX STATES
  // =========================================================================
  const [savedBox2Items, setSavedBox2Items] = useState<SavedDownPaymentItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);
  const [showHistoryBox2, setShowHistoryBox2] = useState<boolean>(false);

  const tierMatrix = useMemo(() => {
    return calculateDownPaymentComparison(
      dpCalc.homePrice,
      parseFloat(interestRate) || 6.5,
      parseFloat(loanTermYears) || 30
    );
  }, [dpCalc.homePrice, interestRate, loanTermYears]);

  const handleSaveBox2 = () => {
    const newItem: SavedDownPaymentItem = {
      id: Date.now().toString(),
      title: "Interactive Down Payment Comparison Matrix",
      inputsSummary: `Home Price: ${currencySymbol}${dpCalc.homePrice.toLocaleString()} @ ${interestRate}%`,
      primaryResult: `5% Down: ${currencySymbol}${tierMatrix.tiers[2].monthlyPayment.toLocaleString()}/mo vs 20% Down: ${currencySymbol}${tierMatrix.tiers[4].monthlyPayment.toLocaleString()}/mo`,
      detailsList: tierMatrix.tiers.map(
        (t) => `${t.pct}% Down (${currencySymbol}${t.downPaymentAmount.toLocaleString()}): ${currencySymbol}${t.monthlyPayment.toLocaleString()}/mo (PMI: ${currencySymbol}${t.monthlyPmi.toLocaleString()}/mo)`
      ),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox2Items];
    setSavedBox2Items(updated);
    try {
      localStorage.setItem("saved_dp_box2", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  // =========================================================================
  // BOX 3: OPPORTUNITY COST INDEX FUND SIMULATOR STATES
  // =========================================================================
  const [baseDownPct, setBaseDownPct] = useState<string>("5");
  const [largerDownPct, setLargerDownPct] = useState<string>("20");
  const [investmentReturnRate, setInvestmentReturnRate] = useState<string>("8.5");
  const [horizonYears, setHorizonYears] = useState<string>("10");

  const [savedBox3Items, setSavedBox3Items] = useState<SavedDownPaymentItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);
  const [showHistoryBox3, setShowHistoryBox3] = useState<boolean>(false);

  const oppCalc = useMemo(() => {
    return calculateOpportunityCost({
      homePrice: dpCalc.homePrice,
      baseDownPct: parseFloat(baseDownPct) || 5,
      largerDownPct: parseFloat(largerDownPct) || 20,
      interestRate: parseFloat(interestRate) || 6.5,
      investmentReturnRate: parseFloat(investmentReturnRate) || 8.5,
      years: parseFloat(horizonYears) || 10,
    });
  }, [dpCalc.homePrice, baseDownPct, largerDownPct, interestRate, investmentReturnRate, horizonYears]);

  const handleSaveBox3 = () => {
    const newItem: SavedDownPaymentItem = {
      id: Date.now().toString(),
      title: "Down Payment vs. Index Fund Investment Opportunity Cost",
      inputsSummary: `Extra Cash: ${currencySymbol}${oppCalc.extraDownAmount.toLocaleString()} | Mortgage: ${interestRate}% vs Index Return: ${investmentReturnRate}% (${horizonYears} Yrs)`,
      primaryResult: oppCalc.recommendation,
      detailsList: [
        `Mortgage Interest Saved: ${currencySymbol}${oppCalc.mortgageInterestSaved.toLocaleString()}`,
        `Index Fund Future Value: ${currencySymbol}${oppCalc.investmentFutureValue.toLocaleString()}`,
        `Net Investment Advantage: +${currencySymbol}${oppCalc.netInvestmentAdvantage.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox3Items];
    setSavedBox3Items(updated);
    try {
      localStorage.setItem("saved_dp_box3", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  // =========================================================================
  // BOX 4: CASH TO CLOSE ESTIMATOR STATES
  // =========================================================================
  const [originationFeePct, setOriginationFeePct] = useState<string>("1.0");
  const [appraisalFee, setAppraisalFee] = useState<string>("600");
  const [titleInsuranceFee, setTitleInsuranceFee] = useState<string>("1500");
  const [escrowPrepaidMonths, setEscrowPrepaidMonths] = useState<string>("3");

  const [savedBox4Items, setSavedBox4Items] = useState<SavedDownPaymentItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);
  const [showHistoryBox4, setShowHistoryBox4] = useState<boolean>(false);

  const cashToCloseCalc = useMemo(() => {
    return calculateCashToClose({
      homePrice: dpCalc.homePrice,
      downPaymentAmount: dpCalc.downPaymentAmount,
      originationFeePct: parseFloat(originationFeePct) || 1.0,
      appraisalFee: parseFloat(appraisalFee) || 600,
      titleInsuranceFee: parseFloat(titleInsuranceFee) || 1500,
      escrowPrepaidMonths: parseFloat(escrowPrepaidMonths) || 3,
      propertyTaxAnnual: dpCalc.monthlyPropertyTax * 12,
      homeInsuranceAnnual: dpCalc.monthlyHomeInsurance * 12,
    });
  }, [dpCalc, originationFeePct, appraisalFee, titleInsuranceFee, escrowPrepaidMonths]);

  const handleSaveBox4 = () => {
    const newItem: SavedDownPaymentItem = {
      id: Date.now().toString(),
      title: "Upfront Cash-to-Close & Closing Fee Estimator",
      inputsSummary: `Home: ${currencySymbol}${dpCalc.homePrice.toLocaleString()} | Down Payment: ${currencySymbol}${dpCalc.downPaymentAmount.toLocaleString()}`,
      primaryResult: `Total Cash Needed: ${currencySymbol}${cashToCloseCalc.totalCashToClose.toLocaleString()}`,
      detailsList: [
        `Origination Fee (${originationFeePct}%): ${currencySymbol}${cashToCloseCalc.originationFee.toLocaleString()}`,
        `Appraisal & Title Fees: ${currencySymbol}${(cashToCloseCalc.appraisalFee + cashToCloseCalc.titleInsuranceFee).toLocaleString()}`,
        `Prepaid Escrows (${escrowPrepaidMonths} mos): ${currencySymbol}${cashToCloseCalc.escrowPrepaids.toLocaleString()}`,
        `Total Closing Fees: ${currencySymbol}${cashToCloseCalc.totalClosingCosts.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox4Items];
    setSavedBox4Items(updated);
    try {
      localStorage.setItem("saved_dp_box4", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  // =========================================================================
  // BOX 5: LOAN PROGRAM COMPARISON ENGINE STATES
  // =========================================================================
  const [savedBox5Items, setSavedBox5Items] = useState<SavedDownPaymentItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);
  const [showHistoryBox5, setShowHistoryBox5] = useState<boolean>(false);

  const progCalc = useMemo(() => {
    return calculateLoanPrograms(dpCalc.homePrice, parseFloat(interestRate) || 6.5);
  }, [dpCalc.homePrice, interestRate]);

  const handleSaveBox5 = () => {
    const newItem: SavedDownPaymentItem = {
      id: Date.now().toString(),
      title: "Government & Loan Program Comparison Matrix",
      inputsSummary: `Home Price: ${currencySymbol}${dpCalc.homePrice.toLocaleString()} @ ${interestRate}%`,
      primaryResult: `Conventional 97: ${currencySymbol}${progCalc.programs[0].totalMonthlyPayment.toLocaleString()}/mo vs FHA: ${currencySymbol}${progCalc.programs[1].totalMonthlyPayment.toLocaleString()}/mo`,
      detailsList: progCalc.programs.map(
        (p) => `${p.programName} (${p.minDownPct}% Down = ${currencySymbol}${p.minDownAmount.toLocaleString()}): ${currencySymbol}${p.totalMonthlyPayment.toLocaleString()}/mo (Upfront Fee: ${currencySymbol}${p.upfrontFeeAmount.toLocaleString()})`
      ),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox5Items];
    setSavedBox5Items(updated);
    try {
      localStorage.setItem("saved_dp_box5", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  // =========================================================================
  // BOX 6: FIRST-TIME HOMEBUYER SAVINGS GOAL PLANNER STATES
  // =========================================================================
  const [targetCashGoal, setTargetCashGoal] = useState<string>("115000");
  const [currentSavings, setCurrentSavings] = useState<string>("25000");
  const [monthlySavings, setMonthlySavings] = useState<string>("2500");
  const [savingsInterestRate, setSavingsInterestRate] = useState<string>("4.5");

  const [savedBox6Items, setSavedBox6Items] = useState<SavedDownPaymentItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);
  const [showHistoryBox6, setShowHistoryBox6] = useState<boolean>(false);

  const savingsCalc = useMemo(() => {
    return calculateSavingsGoal({
      targetCashGoal: parseFloat(targetCashGoal) || 115000,
      currentSavings: parseFloat(currentSavings) || 0,
      monthlySavings: parseFloat(monthlySavings) || 0,
      savingsInterestRate: parseFloat(savingsInterestRate) || 4.5,
    });
  }, [targetCashGoal, currentSavings, monthlySavings, savingsInterestRate]);

  const handleSaveBox6 = () => {
    const newItem: SavedDownPaymentItem = {
      id: Date.now().toString(),
      title: "First-Time Homebuyer Savings Goal & Timeline Planner",
      inputsSummary: `Goal: ${currencySymbol}${parseFloat(targetCashGoal).toLocaleString()} | Save: ${currencySymbol}${parseFloat(monthlySavings).toLocaleString()}/mo @ ${savingsInterestRate}% High-Yield Rate`,
      primaryResult: `Goal Reached in ${savingsCalc.monthsToGoal} Months (${savingsCalc.yearsToGoal} Yrs) by ${savingsCalc.projectedDateLabel}`,
      detailsList: [
        `Current Capital: ${currencySymbol}${parseFloat(currentSavings).toLocaleString()}`,
        `Total Interest Earned in Savings Account: ${currencySymbol}${savingsCalc.totalInterestEarned.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox6Items];
    setSavedBox6Items(updated);
    try {
      localStorage.setItem("saved_dp_box6", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  // Load local storage
  useEffect(() => {
    try {
      const b1 = localStorage.getItem("saved_dp_box1");
      if (b1) setSavedBox1Items(JSON.parse(b1));
      const b2 = localStorage.getItem("saved_dp_box2");
      if (b2) setSavedBox2Items(JSON.parse(b2));
      const b3 = localStorage.getItem("saved_dp_box3");
      if (b3) setSavedBox3Items(JSON.parse(b3));
      const b4 = localStorage.getItem("saved_dp_box4");
      if (b4) setSavedBox4Items(JSON.parse(b4));
      const b5 = localStorage.getItem("saved_dp_box5");
      if (b5) setSavedBox5Items(JSON.parse(b5));
      const b6 = localStorage.getItem("saved_dp_box6");
      if (b6) setSavedBox6Items(JSON.parse(b6));
    } catch (e) {}
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Simple Currency Selector Header */}
      <div className="flex items-center justify-end gap-2 text-xs font-bold">
        <label htmlFor="dp-currency-select" className="text-slate-500 font-medium">Currency:</label>
        <select
          id="dp-currency-select"
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
      {/* 1. CORE MORTGAGE DOWN PAYMENT & PITI AMORTIZATION ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Mortgage Down Payment & PITI Amortization Engine</span>
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
          {/* Dual Calculation Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setCalculationMode("home_price")}
                className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                  calculationMode === "home_price" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Calculate by Home Price & Down Payment
              </button>
              <button
                onClick={() => setCalculationMode("upfront_cash")}
                className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                  calculationMode === "upfront_cash" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Calculate Max Home Price by Upfront Cash
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs text-xs">
              <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">Purchase & Loan Input Parameters</span>

              {calculationMode === "home_price" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Home Purchase Price</label>
                    <input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Down Payment (%)</label>
                    <input type="number" step="0.1" value={downPaymentPct} onChange={(e) => setDownPaymentPct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Down Payment ($)</label>
                    <input type="number" value={currentDownAmount} onChange={(e) => handleDownAmountChange(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Upfront Cash Available</label>
                    <input type="number" value={upfrontCashAvailable} onChange={(e) => setUpfrontCashAvailable(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Down Payment %</label>
                    <input type="number" step="0.1" value={downPaymentPct} onChange={(e) => setDownPaymentPct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Estimated Closing Fees %</label>
                    <input type="number" step="0.1" value={closingCostsPct} onChange={(e) => setClosingCostsPct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Interest Rate %</label>
                  <input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Loan Term (Yrs)</label>
                  <select value={loanTermYears} onChange={(e) => setLoanTermYears(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">
                    <option value="10">10 Years</option>
                    <option value="15">15 Years</option>
                    <option value="20">20 Years</option>
                    <option value="30">30 Years</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Property Tax ($/yr)</label>
                  <input type="number" value={propertyTaxAnnual} onChange={(e) => setPropertyTaxAnnual(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Home Insurance ($/yr)</label>
                  <input type="number" value={homeInsuranceAnnual} onChange={(e) => setHomeInsuranceAnnual(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-1 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">PMI Rate % (&lt;20% Down)</label>
                  <input type="number" step="0.05" value={pmiRatePct} onChange={(e) => setPmiRatePct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">HOA Dues ($/mo)</label>
                  <input type="number" value={hoaDuesMonthly} onChange={(e) => setHoaDuesMonthly(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Closing Costs %</label>
                  <input type="number" step="0.1" value={closingCostsPct} onChange={(e) => setClosingCostsPct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-blue-50/60 dark:bg-slate-900/80 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-5 shadow-xs space-y-4 text-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  {calculationMode === "home_price" ? "Total Monthly Payment & Cash Needed" : "Max Affordable Home Price Result"}
                </span>

                <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                  {calculationMode === "home_price"
                    ? `${currencySymbol}${dpCalc.totalMonthlyPayment.toLocaleString()}/mo`
                    : `${currencySymbol}${dpCalc.homePrice.toLocaleString()}`}
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Down Payment</span>
                    <span className="font-extrabold text-blue-600">{currencySymbol}{dpCalc.downPaymentAmount.toLocaleString()} ({dpCalc.downPaymentPct}%)</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Loan Financed</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{currencySymbol}{dpCalc.loanAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900/60 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  Total Cash Required at Closing: {currencySymbol}{dpCalc.totalCashToClose.toLocaleString()}
                </div>

                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                  PMI Removal Milestone (78% LTV): <span className="text-blue-600">{dpCalc.pmiCancellationDateLabel}</span>
                </div>

                <div className="pt-2">
                  {svgPitiDonut}
                </div>
              </div>
            </div>
          </div>

          {/* Derivation Box */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs space-y-2 font-mono">
            <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans">Underwriting & Amortization Formulas:</span>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 text-slate-700 dark:text-slate-300">
              <div>{"Down Payment = Home Price (" + currencySymbol + dpCalc.homePrice.toLocaleString() + ") × " + dpCalc.downPaymentPct + "% = " + currencySymbol + dpCalc.downPaymentAmount.toLocaleString()}</div>
              <div>{"Loan Principal = Home Price - Down Payment = " + currencySymbol + dpCalc.loanAmount.toLocaleString()}</div>
              <div>{"Monthly P&I Payment = Loan Amount × [r(1+r)^n / ((1+r)^n - 1)] = " + currencySymbol + dpCalc.monthlyPrincipalAndInterest.toLocaleString() + "/mo"}</div>
              <div>{"Monthly PMI (" + (dpCalc.downPaymentPct < 20 ? pmiRatePct + "%" : "0% No-PMI") + ") = " + currencySymbol + dpCalc.monthlyPmi.toLocaleString() + "/mo"}</div>
            </div>
          </div>

          {/* Interactive Amortization Table */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200">
                Mortgage Amortization & Equity Schedule
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
                    <th className="p-2.5">Payment (PITI)</th>
                    <th className="p-2.5">Principal</th>
                    <th className="p-2.5">Interest</th>
                    <th className="p-2.5">PMI</th>
                    <th className="p-2.5">Ending Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {(amortizationView === "annual" ? dpCalc.annualAmortization : dpCalc.monthlyAmortization).map((row) => (
                    <tr key={row.period} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-2.5 font-bold font-sans text-blue-600">{row.dateLabel}</td>
                      <td className="p-2.5">{currencySymbol}{row.beginningBalance.toLocaleString()}</td>
                      <td className="p-2.5 font-bold">{currencySymbol}{row.payment.toLocaleString()}</td>
                      <td className="p-2.5 text-emerald-600">{currencySymbol}{row.principal.toLocaleString()}</td>
                      <td className="p-2.5 text-red-500">{currencySymbol}{row.interest.toLocaleString()}</td>
                      <td className="p-2.5 text-amber-500">{currencySymbol}{row.pmi.toLocaleString()}</td>
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
      {/* 2. INTERACTIVE DOWN PAYMENT COMPARISON MATRIX (0% to 30%) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Interactive Down Payment Tier Comparison (0% vs 3.5% vs 5% vs 10% vs 20% vs 30%)</span>
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
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs text-left border-collapse font-sans">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
                <tr>
                  <th className="p-3">Down Tier</th>
                  <th className="p-3">Down Amount ($)</th>
                  <th className="p-3">Loan Amount ($)</th>
                  <th className="p-3">Monthly Payment ($/mo)</th>
                  <th className="p-3">Monthly PMI ($/mo)</th>
                  <th className="p-3">Lifetime Interest ($)</th>
                  <th className="p-3">Cash to Close ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-mono">
                {tierMatrix.tiers.map((t) => (
                  <tr key={t.pct} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 ${t.pct === 20 ? "bg-blue-50/50 dark:bg-blue-950/30 font-bold" : ""}`}>
                    <td className="p-3 font-sans text-blue-600 font-bold">{t.pct}% {t.pct === 20 ? "(Standard No-PMI)" : ""}</td>
                    <td className="p-3">{currencySymbol}{t.downPaymentAmount.toLocaleString()}</td>
                    <td className="p-3">{currencySymbol}{t.loanAmount.toLocaleString()}</td>
                    <td className="p-3 font-extrabold">{currencySymbol}{t.monthlyPayment.toLocaleString()}/mo</td>
                    <td className="p-3 text-red-500">{t.monthlyPmi > 0 ? `${currencySymbol}${t.monthlyPmi.toLocaleString()}/mo` : "$0"}</td>
                    <td className="p-3 text-emerald-600">{currencySymbol}{t.lifetimeInterest.toLocaleString()}</td>
                    <td className="p-3">{currencySymbol}{t.totalCashToClose.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      {/* 3. OPPORTUNITY COST INDEX FUND SIMULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Down Payment vs. Index Fund Investment Opportunity Cost</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Base Down %</label>
                  <input type="number" value={baseDownPct} onChange={(e) => setBaseDownPct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Larger Down %</label>
                  <input type="number" value={largerDownPct} onChange={(e) => setLargerDownPct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Index Fund Return % (CAGR)</label>
                  <input type="number" step="0.1" value={investmentReturnRate} onChange={(e) => setInvestmentReturnRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Horizon (Years)</label>
                  <input type="number" value={horizonYears} onChange={(e) => setHorizonYears(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Opportunity Cost Advantage</span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                Extra Down Cash: {currencySymbol}{oppCalc.extraDownAmount.toLocaleString()}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Mortgage Interest Saved</span>
                  <span className="text-emerald-600 text-sm font-extrabold">{currencySymbol}{oppCalc.mortgageInterestSaved.toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Index Fund Future Value</span>
                  <span className="text-blue-600 text-sm font-extrabold">{currencySymbol}{oppCalc.investmentFutureValue.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-emerald-600">
                {oppCalc.recommendation}
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
      {/* 4. TRUE "CASH-TO-CLOSE" & UPFRONT CLOSING FEE ESTIMATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Upfront Cash-to-Close & Closing Fee Estimator</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Origination Fee %</label>
                  <input type="number" step="0.1" value={originationFeePct} onChange={(e) => setOriginationFeePct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Appraisal & Credit ($)</label>
                  <input type="number" value={appraisalFee} onChange={(e) => setAppraisalFee(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Title & Escrow Fees ($)</label>
                  <input type="number" value={titleInsuranceFee} onChange={(e) => setTitleInsuranceFee(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Prepaid Escrow (Mos)</label>
                  <input type="number" value={escrowPrepaidMonths} onChange={(e) => setEscrowPrepaidMonths(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Total Cash Required at Closing</span>

              <div className="text-3xl font-extrabold text-emerald-600 font-sans tabular-nums mt-1">
                {currencySymbol}{cashToCloseCalc.totalCashToClose.toLocaleString()}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Down Payment</span>
                  <span className="text-blue-600 text-sm font-extrabold">{currencySymbol}{cashToCloseCalc.downPaymentAmount.toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Total Closing Fees</span>
                  <span className="text-amber-600 text-sm font-extrabold">{currencySymbol}{cashToCloseCalc.totalClosingCosts.toLocaleString()}</span>
                </div>
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
      {/* 5. GOVERNMENT & LOAN PROGRAM COMPARISON ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Government & Loan Program Comparison Matrix (Conventional vs FHA vs VA vs USDA)</span>
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
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs text-left border-collapse font-sans">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
                <tr>
                  <th className="p-3">Program</th>
                  <th className="p-3">Min Down %</th>
                  <th className="p-3">Down Amount ($)</th>
                  <th className="p-3">Upfront Fee ($)</th>
                  <th className="p-3">Monthly Ins ($/mo)</th>
                  <th className="p-3">Total Monthly PITI ($/mo)</th>
                  <th className="p-3">PMI Cancellation Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-mono">
                {progCalc.programs.map((p) => (
                  <tr key={p.programName} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-sans text-blue-600 font-bold">{p.programName}</td>
                    <td className="p-3 font-bold">{p.minDownPct}%</td>
                    <td className="p-3">{currencySymbol}{p.minDownAmount.toLocaleString()}</td>
                    <td className="p-3 text-amber-600">{currencySymbol}{p.upfrontFeeAmount.toLocaleString()} ({p.upfrontFeePct}%)</td>
                    <td className="p-3 text-red-500">{currencySymbol}{p.monthlyMortgageInsurance.toLocaleString()}/mo</td>
                    <td className="p-3 font-extrabold">{currencySymbol}{p.totalMonthlyPayment.toLocaleString()}/mo</td>
                    <td className="p-3 font-sans text-slate-600 dark:text-slate-400 font-medium">{p.pmiRules}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      {/* 6. FIRST-TIME HOMEBUYER SAVINGS GOAL & TIMELINE PLANNER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">First-Time Homebuyer Savings Goal & Timeline Planner</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Cash Goal ($)</label>
                  <input type="number" value={targetCashGoal} onChange={(e) => setTargetCashGoal(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Current Savings ($)</label>
                  <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Monthly Contribution ($/mo)</label>
                  <input type="number" value={monthlySavings} onChange={(e) => setMonthlySavings(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">High-Yield Interest Rate %</label>
                  <input type="number" step="0.1" value={savingsInterestRate} onChange={(e) => setSavingsInterestRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Savings Timeline Goal Result</span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                Goal Reached in {savingsCalc.monthsToGoal} Months ({savingsCalc.yearsToGoal} Yrs)
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-emerald-600">
                Projected Completion Date: {savingsCalc.projectedDateLabel} (Earn {currencySymbol}{savingsCalc.totalInterestEarned.toLocaleString()} Interest)
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
