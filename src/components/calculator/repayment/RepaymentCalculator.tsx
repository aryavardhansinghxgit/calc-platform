"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  Plus,
  Check,
} from "lucide-react";
import {
  calculateRepayment,
  calculateAcceleratedBiWeeklyRepayment,
  calculateMultiDebtConsolidation,
  calculateInflationAdjustedCost,
  calculateLoanAffordability,
  calculateDebtPayoffVelocity,
  CompoundingFrequency,
  RepaymentFrequency,
  DebtItem,
} from "@/lib/calculator-engine/formulas/repayment";

export interface SavedRepaymentItem {
  id: string;
  title: string;
  inputs: string;
  result: string;
  resultsList: string[];
  timestamp: string;
}

export function RepaymentCalculator() {
  // Simple Currency Selector with Dollar ($) as default
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // ==========================================
  // BOX 1: UNIVERSAL REPAYMENT CALCULATOR
  // ==========================================
  const [loanBalanceInput, setLoanBalanceInput] = useState<string>("10000");
  const [interestRateInput, setInterestRateInput] = useState<string>("10");
  const [compoundingFreq, setCompoundingFreq] = useState<CompoundingFrequency>("monthly");
  const [paymentFreq, setPaymentFreq] = useState<RepaymentFrequency>("monthly");
  const [calcMode, setCalcMode] = useState<"term" | "installment">("term");
  const [targetYearsInput, setTargetYearsInput] = useState<string>("5");
  const [targetMonthsInput, setTargetMonthsInput] = useState<string>("0");
  const [fixedInstallmentInput, setFixedInstallmentInput] = useState<string>("212.47");
  const [extraPaymentInput, setExtraPaymentInput] = useState<string>("0");
  const [annualLumpSumInput, setAnnualLumpSumInput] = useState<string>("0");
  const [oneTimeLumpSumInput, setOneTimeLumpSumInput] = useState<string>("0");
  const [oneTimePeriodInput, setOneTimePeriodInput] = useState<string>("12");

  // Amortization Table search and pagination
  const [tableSearch, setTableSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 12;

  // Saved calculations state for all 6 boxes
  const [savedCoreItems, setSavedCoreItems] = useState<SavedRepaymentItem[]>([]);
  const [justSavedCore, setJustSavedCore] = useState<boolean>(false);

  // ==========================================
  // BOX 2: ACCELERATED BI-WEEKLY CALCULATOR
  // ==========================================
  const [biWeeklyBalanceInput, setBiWeeklyBalanceInput] = useState<string>("300000");
  const [biWeeklyRateInput, setBiWeeklyRateInput] = useState<string>("6.5");
  const [biWeeklyTermYearsInput, setBiWeeklyTermYearsInput] = useState<string>("30");
  const [savedBiWeeklyItems, setSavedBiWeeklyItems] = useState<SavedRepaymentItem[]>([]);
  const [justSavedBiWeekly, setJustSavedBiWeekly] = useState<boolean>(false);

  // ==========================================
  // BOX 3: MULTI-DEBT CONSOLIDATION CALCULATOR
  // ==========================================
  const [debts, setDebts] = useState<DebtItem[]>([
    { id: "1", name: "Credit Card A", balance: 8000, interestRatePct: 24.99, monthlyPayment: 220 },
    { id: "2", name: "Credit Card B", balance: 4500, interestRatePct: 19.99, monthlyPayment: 130 },
    { id: "3", name: "Auto Loan", balance: 12000, interestRatePct: 7.5, monthlyPayment: 290 },
  ]);
  const [consolidationAprInput, setConsolidationAprInput] = useState<string>("9.5");
  const [consolidationYearsInput, setConsolidationYearsInput] = useState<string>("4");
  const [savedConsolidationItems, setSavedConsolidationItems] = useState<SavedRepaymentItem[]>([]);
  const [justSavedConsolidation, setJustSavedConsolidation] = useState<boolean>(false);

  // ==========================================
  // BOX 4: INFLATION-ADJUSTED DEBT CALCULATOR
  // ==========================================
  const [inflationBalanceInput, setInflationBalanceInput] = useState<string>("250000");
  const [inflationRateInput, setInflationRateInput] = useState<string>("6.0");
  const [inflationTermYearsInput, setInflationTermYearsInput] = useState<string>("30");
  const [expectedInflationInput, setExpectedInflationInput] = useState<string>("3.0");
  const [savedInflationItems, setSavedInflationItems] = useState<SavedRepaymentItem[]>([]);
  const [justSavedInflation, setJustSavedInflation] = useState<boolean>(false);

  // ==========================================
  // BOX 5: LOAN AFFORDABILITY CALCULATOR
  // ==========================================
  const [budgetMonthlyInput, setBudgetMonthlyInput] = useState<string>("800");
  const [affordRateInput, setAffordRateInput] = useState<string>("7.0");
  const [affordTermYearsInput, setAffordTermYearsInput] = useState<string>("5");
  const [savedAffordItems, setSavedAffordItems] = useState<SavedRepaymentItem[]>([]);
  const [justSavedAfford, setJustSavedAfford] = useState<boolean>(false);

  // ==========================================
  // BOX 6: DEBT PAYOFF VELOCITY CALCULATOR
  // ==========================================
  const [velocityDebts, setVelocityDebts] = useState<DebtItem[]>([
    { id: "1", name: "Debt 1", balance: 5000, interestRatePct: 22.5, monthlyPayment: 150 },
    { id: "2", name: "Debt 2", balance: 1500, interestRatePct: 16.0, monthlyPayment: 50 },
    { id: "3", name: "Debt 3", balance: 10000, interestRatePct: 26.0, monthlyPayment: 250 },
  ]);
  const [extraVelocityBudgetInput, setExtraVelocityBudgetInput] = useState<string>("200");
  const [savedVelocityItems, setSavedVelocityItems] = useState<SavedRepaymentItem[]>([]);
  const [justSavedVelocity, setJustSavedVelocity] = useState<boolean>(false);

  // Load saved calculations on mount
  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_repay_core");
      if (s1) setSavedCoreItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_repay_biweekly");
      if (s2) setSavedBiWeeklyItems(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_repay_consolidation");
      if (s3) setSavedConsolidationItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_repay_inflation");
      if (s4) setSavedInflationItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_repay_afford");
      if (s5) setSavedAffordItems(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_repay_velocity");
      if (s6) setSavedVelocityItems(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Format currency helper
  const fmt = (num: number) => {
    return `${currencySymbol}${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // ==========================================
  // 1. COMPUTED RESULTS: UNIVERSAL REPAYMENT
  // ==========================================
  const coreResult = useMemo(() => {
    return calculateRepayment({
      loanBalance: Number(loanBalanceInput) || 0,
      interestRatePct: Number(interestRateInput) || 0,
      compoundingFrequency: compoundingFreq,
      paymentFrequency: paymentFreq,
      mode: calcMode,
      targetYears: Number(targetYearsInput) || 0,
      targetMonths: Number(targetMonthsInput) || 0,
      fixedInstallmentAmount: Number(fixedInstallmentInput) || 0,
      extraPaymentPerPeriod: Number(extraPaymentInput) || 0,
      annualLumpSum: Number(annualLumpSumInput) || 0,
      oneTimeLumpSum: Number(oneTimeLumpSumInput) || 0,
      oneTimeLumpSumPeriod: Number(oneTimePeriodInput) || 1,
    });
  }, [
    loanBalanceInput,
    interestRateInput,
    compoundingFreq,
    paymentFreq,
    calcMode,
    targetYearsInput,
    targetMonthsInput,
    fixedInstallmentInput,
    extraPaymentInput,
    annualLumpSumInput,
    oneTimeLumpSumInput,
    oneTimePeriodInput,
  ]);

  // Amortization table filtering & pagination
  const filteredSchedule = useMemo(() => {
    if (!coreResult.schedule) return [];
    if (!tableSearch.trim()) return coreResult.schedule;
    return coreResult.schedule.filter(
      (row) =>
        row.period.toString().includes(tableSearch) ||
        row.endingBalance.toString().includes(tableSearch) ||
        row.interestPaid.toString().includes(tableSearch)
    );
  }, [coreResult.schedule, tableSearch]);

  const totalPages = Math.ceil(filteredSchedule.length / rowsPerPage) || 1;
  const currentSchedulePage = filteredSchedule.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ==========================================
  // 2. COMPUTED RESULTS: BI-WEEKLY
  // ==========================================
  const biWeeklyResult = useMemo(() => {
    return calculateAcceleratedBiWeeklyRepayment(
      Number(biWeeklyBalanceInput) || 0,
      Number(biWeeklyRateInput) || 0,
      Number(biWeeklyTermYearsInput) || 1
    );
  }, [biWeeklyBalanceInput, biWeeklyRateInput, biWeeklyTermYearsInput]);

  // ==========================================
  // 3. COMPUTED RESULTS: CONSOLIDATION
  // ==========================================
  const consolidationResult = useMemo(() => {
    return calculateMultiDebtConsolidation(
      debts,
      Number(consolidationAprInput) || 1,
      Number(consolidationYearsInput) || 1
    );
  }, [debts, consolidationAprInput, consolidationYearsInput]);

  // ==========================================
  // 4. COMPUTED RESULTS: INFLATION
  // ==========================================
  const inflationResult = useMemo(() => {
    return calculateInflationAdjustedCost(
      Number(inflationBalanceInput) || 0,
      Number(inflationRateInput) || 0,
      Number(inflationTermYearsInput) || 1,
      Number(expectedInflationInput) || 0
    );
  }, [inflationBalanceInput, inflationRateInput, inflationTermYearsInput, expectedInflationInput]);

  // ==========================================
  // 5. COMPUTED RESULTS: AFFORDABILITY
  // ==========================================
  const affordResult = useMemo(() => {
    return calculateLoanAffordability(
      Number(budgetMonthlyInput) || 0,
      Number(affordRateInput) || 0,
      Number(affordTermYearsInput) || 1
    );
  }, [budgetMonthlyInput, affordRateInput, affordTermYearsInput]);

  // ==========================================
  // 6. COMPUTED RESULTS: VELOCITY
  // ==========================================
  const velocityResult = useMemo(() => {
    return calculateDebtPayoffVelocity(velocityDebts, Number(extraVelocityBudgetInput) || 0);
  }, [velocityDebts, extraVelocityBudgetInput]);

  // ==========================================
  // SAVE HANDLERS FOR ALL 6 BOXES
  // ==========================================
  const handleSaveCore = () => {
    const inputStr = `Balance: ${currencySymbol}${loanBalanceInput} @ ${interestRateInput}% | Compound: ${compoundingFreq} | Pay: ${paymentFreq} | Mode: ${calcMode === "term" ? `${targetYearsInput}y ${targetMonthsInput}m` : `Fixed ${currencySymbol}${fixedInstallmentInput}`}`;
    const resList = [
      `Payment: ${fmt(coreResult.installmentPayment)}`,
      `Total Interest: ${fmt(coreResult.totalInterestPaid)}`,
      `Total Repaid: ${fmt(coreResult.totalAmountRepaid)}`,
      `Payoff: ${coreResult.totalYears}y ${coreResult.totalMonths % 12}m (${coreResult.totalPeriods} periods)`,
      `Payoff Date: ${coreResult.payoffDate}`,
    ];

    const newItem: SavedRepaymentItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Repayment Calculation",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedCoreItems].slice(0, 10);
    setSavedCoreItems(updated);
    try {
      localStorage.setItem("saved_repay_core", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedCore(true);
    setTimeout(() => setJustSavedCore(false), 2500);
  };

  const handleSaveBiWeekly = () => {
    const inputStr = `Balance: ${currencySymbol}${biWeeklyBalanceInput} @ ${biWeeklyRateInput}% | Term: ${biWeeklyTermYearsInput} Yrs`;
    const resList = [
      `Monthly Payment: ${fmt(biWeeklyResult.monthlyPayment)}/mo`,
      `Accelerated Bi-Weekly: ${fmt(biWeeklyResult.biWeeklyPayment)}/2wks`,
      `Interest Saved: ${fmt(biWeeklyResult.interestSaved)}`,
      `Time Saved: ${biWeeklyResult.yearsSaved} Years (${biWeeklyResult.monthsSaved} Mos)`,
    ];

    const newItem: SavedRepaymentItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Accelerated Bi-Weekly Plan",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedBiWeeklyItems].slice(0, 10);
    setSavedBiWeeklyItems(updated);
    try {
      localStorage.setItem("saved_repay_biweekly", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBiWeekly(true);
    setTimeout(() => setJustSavedBiWeekly(false), 2500);
  };

  const handleSaveConsolidation = () => {
    const inputStr = `${debts.length} Debts (Total ${currencySymbol}${consolidationResult.totalCurrentBalance}) -> Consolidate @ ${consolidationAprInput}% for ${consolidationYearsInput} Yrs`;
    const resList = [
      `New Monthly: ${fmt(consolidationResult.consolidatedMonthlyPayment)}/mo (Saves ${fmt(consolidationResult.monthlyPaymentSavings)}/mo)`,
      `Total Interest Saved: ${fmt(consolidationResult.totalInterestSavings)}`,
      `Payoff: ${consolidationResult.consolidatedPayoffMonths} Months (Saves ${consolidationResult.monthsSaved} Mos)`,
    ];

    const newItem: SavedRepaymentItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Multi-Debt Consolidation",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedConsolidationItems].slice(0, 10);
    setSavedConsolidationItems(updated);
    try {
      localStorage.setItem("saved_repay_consolidation", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedConsolidation(true);
    setTimeout(() => setJustSavedConsolidation(false), 2500);
  };

  const handleSaveInflation = () => {
    const inputStr = `Loan: ${currencySymbol}${inflationBalanceInput} @ ${inflationRateInput}% for ${inflationTermYearsInput} Yrs | Inflation: ${expectedInflationInput}%`;
    const resList = [
      `Nominal Total Paid: ${fmt(inflationResult.nominalTotalPaid)}`,
      `Real Present Value Cost: ${fmt(inflationResult.realPresentValuePaid)}`,
      `Inflation Purchasing Power Savings: ${fmt(inflationResult.inflationSavingsAmount)} (${inflationResult.inflationDiscountPct.toFixed(1)}%)`,
    ];

    const newItem: SavedRepaymentItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Inflation-Adjusted Repayment",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedInflationItems].slice(0, 10);
    setSavedInflationItems(updated);
    try {
      localStorage.setItem("saved_repay_inflation", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedInflation(true);
    setTimeout(() => setJustSavedInflation(false), 2500);
  };

  const handleSaveAfford = () => {
    const inputStr = `Budget: ${currencySymbol}${budgetMonthlyInput}/mo @ ${affordRateInput}% over ${affordTermYearsInput} Yrs`;
    const resList = [
      `Max Borrowable Principal: ${fmt(affordResult.maxBorrowablePrincipal)}`,
      `Total Repaid: ${fmt(affordResult.totalRepaid)}`,
      `Total Interest Charges: ${fmt(affordResult.totalInterestPaid)}`,
    ];

    const newItem: SavedRepaymentItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Loan Affordability Calculation",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedAffordItems].slice(0, 10);
    setSavedAffordItems(updated);
    try {
      localStorage.setItem("saved_repay_afford", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedAfford(true);
    setTimeout(() => setJustSavedAfford(false), 2500);
  };

  const handleSaveVelocity = () => {
    const inputStr = `${velocityDebts.length} Debts + Extra ${currencySymbol}${extraVelocityBudgetInput}/mo Budget`;
    const resList = [
      `Avalanche: ${velocityResult.avalancheMonths} Mos | Total Interest: ${fmt(velocityResult.avalancheInterest)}`,
      `Snowball: ${velocityResult.snowballMonths} Mos | Total Interest: ${fmt(velocityResult.snowballInterest)}`,
      `Avalanche Savings: ${fmt(velocityResult.avalancheInterestSaved)} & ${velocityResult.avalancheMonthsSaved} Mos saved`,
    ];

    const newItem: SavedRepaymentItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Debt Payoff Velocity",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedVelocityItems].slice(0, 10);
    setSavedVelocityItems(updated);
    try {
      localStorage.setItem("saved_repay_velocity", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedVelocity(true);
    setTimeout(() => setJustSavedVelocity(false), 2500);
  };

  // Debt item management
  const handleAddDebt = () => {
    const newId = (debts.length + 1).toString();
    setDebts([...debts, { id: newId, name: `Debt ${newId}`, balance: 3000, interestRatePct: 18.0, monthlyPayment: 100 }]);
  };

  const handleRemoveDebt = (id: string) => {
    if (debts.length <= 1) return;
    setDebts(debts.filter((d) => d.id !== id));
  };

  const handleUpdateDebt = (id: string, field: keyof DebtItem, value: any) => {
    setDebts(debts.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  return (
    <div className="space-y-4">
      {/* ========================================================================= */}
      {/* BOX 1: UNIVERSAL DUAL-MODE REPAYMENT CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Repayment Calculator</span>
          <div className="flex items-center gap-2">
            {/* Simple Currency Selector with Dollar ($) as default */}
            <div className="flex items-center gap-1 bg-blue-700 p-0.5 rounded border border-blue-500 text-[11px] font-bold">
              {["$", "€", "£", "₹"].map((cur) => (
                <button
                  key={cur}
                  type="button"
                  onClick={() => setCurrencySymbol(cur)}
                  className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                    currencySymbol === cur
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-blue-100 hover:text-white"
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleSaveCore}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
                justSavedCore
                  ? "bg-emerald-500 text-white font-bold"
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
            >
              {justSavedCore ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
              <span>{justSavedCore ? "Saved!" : `Save${savedCoreItems.length > 0 ? ` (${savedCoreItems.length})` : ""}`}</span>
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4 space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
            {/* LEFT COLUMN: INPUTS */}
            <div className="lg:col-span-5 space-y-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Loan & Repayment Inputs
              </div>

              {/* Balance & Rate */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Loan Balance ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={loanBalanceInput}
                    onChange={(e) => setLoanBalanceInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={interestRateInput}
                    onChange={(e) => setInterestRateInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Compounding & Repayment Frequencies */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Compound Interval
                  </label>
                  <select
                    value={compoundingFreq}
                    onChange={(e: any) => setCompoundingFreq(e.target.value)}
                    className="w-full h-9 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold text-xs shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="annually">Annually (APY)</option>
                    <option value="semiannually">Semi-annually</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly (APR)</option>
                    <option value="semimonthly">Semi-monthly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="weekly">Weekly</option>
                    <option value="daily">Daily</option>
                    <option value="continuously">Continuously</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Pay Back Schedule
                  </label>
                  <select
                    value={paymentFreq}
                    onChange={(e: any) => setPaymentFreq(e.target.value)}
                    className="w-full h-9 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold text-xs shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="daily">Every Day</option>
                    <option value="weekly">Every Week</option>
                    <option value="biweekly">Every 2 Weeks</option>
                    <option value="semimonthly">Every Half Month</option>
                    <option value="monthly">Every Month</option>
                    <option value="quarterly">Every Quarter</option>
                    <option value="semiannually">Every 6 Months</option>
                    <option value="annually">Every Year</option>
                  </select>
                </div>
              </div>

              {/* CALCULATION MODE SWITCHER */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Repayment Goal Mode
                </label>
                <div className="grid grid-cols-2 gap-1 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setCalcMode("term")}
                    className={`py-1 rounded-lg cursor-pointer transition-all ${
                      calcMode === "term"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-300/50"
                    }`}
                  >
                    Repay within Fixed Time
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcMode("installment")}
                    className={`py-1 rounded-lg cursor-pointer transition-all ${
                      calcMode === "installment"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-300/50"
                    }`}
                  >
                    Repay with Fixed Installment
                  </button>
                </div>
              </div>

              {/* MODE SPECIFIC INPUTS */}
              {calcMode === "term" ? (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Years
                    </label>
                    <input
                      type="number"
                      value={targetYearsInput}
                      onChange={(e) => setTargetYearsInput(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Months
                    </label>
                    <input
                      type="number"
                      value={targetMonthsInput}
                      onChange={(e) => setTargetMonthsInput(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Payment Amount ({currencySymbol} per period)
                  </label>
                  <input
                    type="number"
                    value={fixedInstallmentInput}
                    onChange={(e) => setFixedInstallmentInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              )}

              {/* EXTRA ACCELERATORS */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Extra / Period ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={extraPaymentInput}
                    onChange={(e) => setExtraPaymentInput(e.target.value)}
                    placeholder="0"
                    className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Annual Lump Sum ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={annualLumpSumInput}
                    onChange={(e) => setAnnualLumpSumInput(e.target.value)}
                    placeholder="0"
                    className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: OUTPUTS */}
            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                {coreResult.isNeverEnding ? (
                  <div className="p-2.5 bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-xs font-bold">
                    {coreResult.warningMessage}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-blue-600 dark:text-blue-400 block">
                          {calcMode === "term" ? "Periodic Payment" : "Total Payoff Time"}
                        </span>
                        <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
                          {calcMode === "term" ? (
                            fmt(coreResult.installmentPayment)
                          ) : (
                            <>
                              {coreResult.totalYears > 0 && `${coreResult.totalYears} Yrs `}
                              {coreResult.totalMonths % 12} Mos
                            </>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                          Debt-Free Date
                        </span>
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          {coreResult.payoffDate}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                      <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase block">Total Payments</span>
                        <span className="font-mono text-sm text-slate-900 dark:text-slate-100">{coreResult.totalPeriods}</span>
                      </div>

                      <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase block">Total Interest</span>
                        <span className="font-mono text-sm text-amber-600">{fmt(coreResult.totalInterestPaid)}</span>
                      </div>

                      <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase block">Total Amount Repaid</span>
                        <span className="font-mono text-sm text-blue-600">{fmt(coreResult.totalAmountRepaid)}</span>
                      </div>
                    </div>

                    {/* PRINCIPAL VS INTEREST RATIO */}
                    <div className="space-y-1 pt-1">
                      <div className="w-full h-3 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 flex">
                        <div
                          style={{ width: `${Math.max(0, 100 - coreResult.interestToPrincipalRatio)}%` }}
                          className="bg-blue-600"
                        />
                        <div
                          style={{ width: `${Math.min(100, coreResult.interestToPrincipalRatio)}%` }}
                          className="bg-amber-500"
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400">
                        <span>Principal: {fmt(Number(loanBalanceInput) || 0)}</span>
                        <span>Interest: {fmt(coreResult.totalInterestPaid)} ({coreResult.interestToPrincipalRatio.toFixed(1)}%)</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* AMORTIZATION SCHEDULE */}
              {!coreResult.isNeverEnding && coreResult.schedule.length > 0 && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                      Amortization Schedule
                    </span>
                    <input
                      type="text"
                      placeholder="Search period..."
                      value={tableSearch}
                      onChange={(e) => {
                        setTableSearch(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="h-6 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold focus:outline-none w-32"
                    />
                  </div>

                  <div className="overflow-x-auto max-h-44 overflow-y-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 font-sans font-bold uppercase text-[9px]">
                          <th className="py-1 px-1.5">Period</th>
                          <th className="py-1 px-1.5">Starting</th>
                          <th className="py-1 px-1.5">Payment</th>
                          <th className="py-1 px-1.5">Principal</th>
                          <th className="py-1 px-1.5">Interest</th>
                          <th className="py-1 px-1.5">Ending</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
                        {currentSchedulePage.map((row) => (
                          <tr key={row.period} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            <td className="py-1 px-1.5 font-bold font-sans">P{row.period}</td>
                            <td className="py-1 px-1.5 text-slate-600 dark:text-slate-400">{fmt(row.startingBalance)}</td>
                            <td className="py-1 px-1.5 font-bold text-slate-900 dark:text-slate-100">{fmt(row.payment)}</td>
                            <td className="py-1 px-1.5 text-blue-600 font-bold">{fmt(row.principalPaid)}</td>
                            <td className="py-1 px-1.5 text-amber-600">{fmt(row.interestPaid)}</td>
                            <td className="py-1 px-1.5 font-bold text-slate-900 dark:text-slate-100">{fmt(row.endingBalance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[10px] font-bold">
                      <span className="text-slate-500">Page {currentPage} of {totalPages}</span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          disabled={currentPage <= 1}
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 disabled:opacity-40 cursor-pointer"
                        >
                          Prev
                        </button>
                        <button
                          type="button"
                          disabled={currentPage >= totalPages}
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 disabled:opacity-40 cursor-pointer"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 1 */}
          {savedCoreItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Calculations ({savedCoreItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCoreItems([]);
                    localStorage.removeItem("saved_repay_core");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedCoreItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 flex flex-col justify-between shadow-xs"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-bold text-blue-600 text-[11px]">{item.title}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedCoreItems.filter((i) => i.id !== item.id);
                            setSavedCoreItems(updated);
                            localStorage.setItem("saved_repay_core", JSON.stringify(updated));
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                      <div><strong className="text-slate-500">Inputs:</strong> {item.inputs}</div>
                      <div className="space-y-0.5 font-mono text-[10px]">
                        {item.resultsList?.map((line, idx) => (
                          <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-700">
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 2: ACCELERATED BI-WEEKLY CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Accelerated Bi-Weekly Calculator</span>
          <button
            type="button"
            onClick={handleSaveBiWeekly}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedBiWeekly
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedBiWeekly ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedBiWeekly ? "Saved!" : `Save${savedBiWeeklyItems.length > 0 ? ` (${savedBiWeeklyItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Loan Parameters
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Loan Amount ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={biWeeklyBalanceInput}
                  onChange={(e) => setBiWeeklyBalanceInput(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={biWeeklyRateInput}
                    onChange={(e) => setBiWeeklyRateInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Term (Years)
                  </label>
                  <input
                    type="number"
                    value={biWeeklyTermYearsInput}
                    onChange={(e) => setBiWeeklyTermYearsInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5 text-xs font-mono">
                <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400 font-sans">
                  Monthly vs. Accelerated Bi-Weekly Comparison
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border space-y-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300 font-sans block text-xs">Standard Monthly</span>
                    <div>Payment: {fmt(biWeeklyResult.monthlyPayment)}/mo</div>
                    <div>Payoff: {biWeeklyResult.monthlyPayoffMonths} Months</div>
                    <div>Total Interest: {fmt(biWeeklyResult.monthlyTotalInterest)}</div>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border-2 border-blue-600 space-y-1">
                    <span className="font-bold text-blue-600 font-sans block text-xs">Accelerated Bi-Weekly</span>
                    <div>Payment: {fmt(biWeeklyResult.biWeeklyPayment)}/2wks</div>
                    <div>Payoff: {biWeeklyResult.biWeeklyPayoffMonths} Months</div>
                    <div className="text-emerald-600 font-bold">Saved: {fmt(biWeeklyResult.interestSaved)}</div>
                  </div>
                </div>

                <div className="p-2.5 bg-blue-100/70 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-medium text-blue-900 dark:text-blue-200 font-sans">
                  Accelerated bi-weekly saves you <strong>{fmt(biWeeklyResult.interestSaved)}</strong> in interest and cuts <strong>{biWeeklyResult.yearsSaved} years</strong> off the loan.
                </div>
              </div>
            </div>
          </div>

          {/* SAVED BI-WEEKLY */}
          {savedBiWeeklyItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Bi-Weekly Plans ({savedBiWeeklyItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedBiWeeklyItems([]);
                    localStorage.removeItem("saved_repay_biweekly");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBiWeeklyItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                    </div>
                    <div className="space-y-0.5 font-mono text-[10px]">
                      {item.resultsList?.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 3: MULTI-DEBT CONSOLIDATION CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Multi-Debt Consolidation Calculator</span>
          <button
            type="button"
            onClick={handleSaveConsolidation}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedConsolidation
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedConsolidation ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedConsolidation ? "Saved!" : `Save${savedConsolidationItems.length > 0 ? ` (${savedConsolidationItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Current Debts ({debts.length})
                </span>
                <button
                  type="button"
                  onClick={handleAddDebt}
                  className="px-2 py-0.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Debt
                </button>
              </div>

              <div className="space-y-2 max-h-52 overflow-y-auto pr-0.5">
                {debts.map((d) => (
                  <div
                    key={d.id}
                    className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 space-y-1 text-xs"
                  >
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        value={d.name}
                        onChange={(e) => handleUpdateDebt(d.id, "name", e.target.value)}
                        className="font-bold text-slate-900 dark:text-slate-100 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-none w-28 text-xs"
                      />
                      {debts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveDebt(d.id)}
                          className="text-slate-400 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold">Balance</span>
                        <input
                          type="number"
                          value={d.balance}
                          onChange={(e) => handleUpdateDebt(d.id, "balance", Number(e.target.value))}
                          className="w-full h-7 px-1 rounded border border-slate-300 dark:border-slate-700 font-mono text-xs"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold">Rate %</span>
                        <input
                          type="number"
                          step="0.1"
                          value={d.interestRatePct}
                          onChange={(e) => handleUpdateDebt(d.id, "interestRatePct", Number(e.target.value))}
                          className="w-full h-7 px-1 rounded border border-slate-300 dark:border-slate-700 font-mono text-xs"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold">Monthly</span>
                        <input
                          type="number"
                          value={d.monthlyPayment}
                          onChange={(e) => handleUpdateDebt(d.id, "monthlyPayment", Number(e.target.value))}
                          className="w-full h-7 px-1 rounded border border-slate-300 dark:border-slate-700 font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    New Loan APR (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={consolidationAprInput}
                    onChange={(e) => setConsolidationAprInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    New Term (Years)
                  </label>
                  <input
                    type="number"
                    value={consolidationYearsInput}
                    onChange={(e) => setConsolidationYearsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-emerald-600 block">Total Interest Savings</span>
                    <div className="text-2xl font-mono font-extrabold text-emerald-600">{fmt(consolidationResult.totalInterestSavings)}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Monthly Cash Flow Savings</span>
                    <span className="text-sm font-bold font-mono text-blue-600">{fmt(consolidationResult.monthlyPaymentSavings)}/mo</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">New Monthly Payment</span>
                    <span>{fmt(consolidationResult.consolidatedMonthlyPayment)}/mo</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Consolidated Payoff</span>
                    <span>{consolidationResult.consolidatedPayoffMonths} Months</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED CONSOLIDATION */}
          {savedConsolidationItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Consolidations ({savedConsolidationItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedConsolidationItems([]);
                    localStorage.removeItem("saved_repay_consolidation");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedConsolidationItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                    </div>
                    <div className="space-y-0.5 font-mono text-[10px]">
                      {item.resultsList?.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 4: INFLATION-ADJUSTED DEBT CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Inflation-Adjusted Debt Calculator</span>
          <button
            type="button"
            onClick={handleSaveInflation}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedInflation
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedInflation ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedInflation ? "Saved!" : `Save${savedInflationItems.length > 0 ? ` (${savedInflationItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Inflation & Loan Inputs
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Loan Amount ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={inflationBalanceInput}
                  onChange={(e) => setInflationBalanceInput(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={inflationRateInput}
                    onChange={(e) => setInflationRateInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Years
                  </label>
                  <input
                    type="number"
                    value={inflationTermYearsInput}
                    onChange={(e) => setInflationTermYearsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Inflation %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={expectedInflationInput}
                    onChange={(e) => setExpectedInflationInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-xs font-extrabold uppercase text-slate-500">Real Economic Present Cost</span>
                  <span className="text-xl font-mono font-extrabold text-blue-600">{fmt(inflationResult.realPresentValuePaid)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Nominal Out-of-Pocket</span>
                    <span>{fmt(inflationResult.nominalTotalPaid)}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Inflation Debt Erosion</span>
                    <span className="text-emerald-600">-{fmt(inflationResult.inflationSavingsAmount)} ({inflationResult.inflationDiscountPct.toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED INFLATION LIST */}
          {savedInflationItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Inflation Calculations ({savedInflationItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedInflationItems([]);
                    localStorage.removeItem("saved_repay_inflation");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedInflationItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                    </div>
                    <div className="space-y-0.5 font-mono text-[10px]">
                      {item.resultsList?.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 5: LOAN AFFORDABILITY CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Loan Affordability Calculator</span>
          <button
            type="button"
            onClick={handleSaveAfford}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedAfford
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedAfford ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedAfford ? "Saved!" : `Save${savedAffordItems.length > 0 ? ` (${savedAffordItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Budget Inputs
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Monthly Budget ({currencySymbol}/mo)
                </label>
                <input
                  type="number"
                  value={budgetMonthlyInput}
                  onChange={(e) => setBudgetMonthlyInput(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={affordRateInput}
                    onChange={(e) => setAffordRateInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Term (Years)
                  </label>
                  <input
                    type="number"
                    value={affordTermYearsInput}
                    onChange={(e) => setAffordTermYearsInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-xs font-extrabold uppercase text-slate-500">Max Borrowable Principal</span>
                  <span className="text-2xl font-mono font-extrabold text-blue-600">{fmt(affordResult.maxBorrowablePrincipal)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Total Amount Repaid</span>
                    <span>{fmt(affordResult.totalRepaid)}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Total Interest Charges</span>
                    <span className="text-amber-600">{fmt(affordResult.totalInterestPaid)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED AFFORDABILITY LIST */}
          {savedAffordItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Affordability Calculations ({savedAffordItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedAffordItems([]);
                    localStorage.removeItem("saved_repay_afford");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedAffordItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                    </div>
                    <div className="space-y-0.5 font-mono text-[10px]">
                      {item.resultsList?.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 6: DEBT PAYOFF VELOCITY CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Debt Payoff Velocity Calculator</span>
          <button
            type="button"
            onClick={handleSaveVelocity}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedVelocity
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedVelocity ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedVelocity ? "Saved!" : `Save${savedVelocityItems.length > 0 ? ` (${savedVelocityItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Debts & Acceleration Budget
              </div>

              <div className="space-y-1.5 max-h-44 overflow-y-auto">
                {velocityDebts.map((vd) => (
                  <div key={vd.id} className="p-2 bg-white dark:bg-slate-900 rounded-lg border text-xs flex justify-between items-center font-mono">
                    <span className="font-sans font-bold">{vd.name}</span>
                    <span>{fmt(vd.balance)} @ {vd.interestRatePct}%</span>
                    <span className="text-slate-500">{fmt(vd.monthlyPayment)}/mo</span>
                  </div>
                ))}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Extra Monthly Velocity Budget ({currencySymbol}/mo)
                </label>
                <input
                  type="number"
                  value={extraVelocityBudgetInput}
                  onChange={(e) => setExtraVelocityBudgetInput(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5 text-xs font-mono">
                <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400 font-sans">
                  Avalanche vs. Snowball Comparison
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border-2 border-blue-600 space-y-1">
                    <span className="font-bold text-blue-600 font-sans block text-xs">Avalanche (Highest APR)</span>
                    <div>Payoff: {velocityResult.avalancheMonths} Months</div>
                    <div className="text-emerald-600 font-bold">Interest: {fmt(velocityResult.avalancheInterest)}</div>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border space-y-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300 font-sans block text-xs">Snowball (Smallest Bal)</span>
                    <div>Payoff: {velocityResult.snowballMonths} Months</div>
                    <div>Interest: {fmt(velocityResult.snowballInterest)}</div>
                  </div>
                </div>

                <div className="p-2 bg-blue-100/70 dark:bg-blue-950/60 rounded-lg text-xs font-sans text-blue-900 dark:text-blue-200">
                  Avalanche saves you <strong>{fmt(velocityResult.avalancheInterestSaved)}</strong> in interest compared to Snowball.
                </div>
              </div>
            </div>
          </div>

          {/* SAVED VELOCITY LIST */}
          {savedVelocityItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Velocity Plans ({savedVelocityItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedVelocityItems([]);
                    localStorage.removeItem("saved_repay_velocity");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedVelocityItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                    </div>
                    <div className="space-y-0.5 font-mono text-[10px]">
                      {item.resultsList?.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{line}</div>
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
