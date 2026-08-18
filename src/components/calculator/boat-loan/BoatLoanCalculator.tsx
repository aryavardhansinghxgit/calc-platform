"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  Check,
} from "lucide-react";
import {
  calculateBoatLoan,
  calculateBoatTco,
  solveMaxBoatPrice,
  calculateMarineRefinance,
} from "@/lib/calculator-engine/formulas/boat-loan";

export interface SavedBoatItem {
  id: string;
  title: string;
  inputs: string;
  result: string;
  resultsList: string[];
  timestamp: string;
}

export function BoatLoanCalculator() {
  // Simple Currency Selector with Dollar ($) as default
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // ==========================================
  // BOX 1: BOAT LOAN CALCULATOR
  // ==========================================
  const [boatPriceInput, setBoatPriceInput] = useState<string>("35000");
  const [downPaymentInput, setDownPaymentInput] = useState<string>("7000");
  const [tradeInInput, setTradeInInput] = useState<string>("0");
  const [loanYearsInput, setLoanYearsInput] = useState<string>("10");
  const [interestRateInput, setInterestRateInput] = useState<string>("7.0");
  const [salesTaxInput, setSalesTaxInput] = useState<string>("3.0");
  const [feesInput, setFeesInput] = useState<string>("2800");
  const [includeFeesInLoan, setIncludeFeesInLoan] = useState<boolean>(false);

  // Table search and pagination
  const [tableSearch, setTableSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 6;

  // Saved state for Box 1
  const [savedCoreItems, setSavedCoreItems] = useState<SavedBoatItem[]>([]);
  const [justSavedCore, setJustSavedCore] = useState<boolean>(false);

  // ==========================================
  // BOX 2: TOTAL COST OF BOAT OWNERSHIP (TCO)
  // ==========================================
  const [tcoLoanPmtInput, setTcoLoanPmtInput] = useState<string>("325.10");
  const [tcoMarinaInput, setTcoMarinaInput] = useState<string>("250");
  const [tcoInsuranceInput, setTcoInsuranceInput] = useState<string>("600");
  const [tcoFuelMaintInput, setTcoFuelMaintInput] = useState<string>("1800");
  const [tcoWinterizeInput, setTcoWinterizeInput] = useState<string>("600");
  const [savedTcoItems, setSavedTcoItems] = useState<SavedBoatItem[]>([]);
  const [justSavedTco, setJustSavedTco] = useState<boolean>(false);

  // ==========================================
  // BOX 3: REVERSE BOAT LOAN AFFORDABILITY
  // ==========================================
  const [affordPmtInput, setAffordPmtInput] = useState<string>("400");
  const [affordDownInput, setAffordDownInput] = useState<string>("5000");
  const [affordRateInput, setAffordRateInput] = useState<string>("7.5");
  const [affordYearsInput, setAffordYearsInput] = useState<string>("10");
  const [affordTaxInput, setAffordTaxInput] = useState<string>("3.0");
  const [savedAffordItems, setSavedAffordItems] = useState<SavedBoatItem[]>([]);
  const [justSavedAfford, setJustSavedAfford] = useState<boolean>(false);

  // ==========================================
  // BOX 4: EXTRA PAYMENT PAYOFF ACCELERATOR
  // ==========================================
  const [extraPriceInput, setExtraPriceInput] = useState<string>("50000");
  const [extraDownInput, setExtraDownInput] = useState<string>("10000");
  const [extraRateInput, setExtraRateInput] = useState<string>("7.0");
  const [extraYearsInput, setExtraYearsInput] = useState<string>("15");
  const [extraMonthlyInput, setExtraMonthlyInput] = useState<string>("100");
  const [savedExtraItems, setSavedExtraItems] = useState<SavedBoatItem[]>([]);
  const [justSavedExtra, setJustSavedExtra] = useState<boolean>(false);

  // ==========================================
  // BOX 5: MARINE LOAN REFINANCE ESTIMATOR
  // ==========================================
  const [refinanceBalInput, setRefinanceBalInput] = useState<string>("30000");
  const [refinanceOldRateInput, setRefinanceOldRateInput] = useState<string>("8.5");
  const [refinanceOldMosInput, setRefinanceOldMosInput] = useState<string>("84");
  const [refinanceNewRateInput, setRefinanceNewRateInput] = useState<string>("6.25");
  const [refinanceNewMosInput, setRefinanceNewMosInput] = useState<string>("84");
  const [refinanceFeeInput, setRefinanceFeeInput] = useState<string>("350");
  const [savedRefinanceItems, setSavedRefinanceItems] = useState<SavedBoatItem[]>([]);
  const [justSavedRefinance, setJustSavedRefinance] = useState<boolean>(false);

  // ==========================================
  // BOX 6: VESSEL RESALE & DEPRECIATION ESTIMATOR
  // ==========================================
  const [deprPriceInput, setDeprPriceInput] = useState<string>("60000");
  const [deprRateInput, setDeprRateInput] = useState<string>("10.0");
  const [deprYearsInput, setDeprYearsInput] = useState<string>("5");
  const [savedDeprItems, setSavedDeprItems] = useState<SavedBoatItem[]>([]);
  const [justSavedDepr, setJustSavedDepr] = useState<boolean>(false);

  // Load saved calculations on mount
  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_boat_core");
      if (s1) setSavedCoreItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_boat_tco");
      if (s2) setSavedTcoItems(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_boat_afford");
      if (s3) setSavedAffordItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_boat_extra");
      if (s4) setSavedExtraItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_boat_refinance");
      if (s5) setSavedRefinanceItems(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_boat_depr");
      if (s6) setSavedDeprItems(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Format currency helper
  const fmt = (num: number) => {
    return `${currencySymbol}${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // ==========================================
  // 1. COMPUTED RESULTS: BOAT LOAN CORE
  // ==========================================
  const coreResult = useMemo(() => {
    return calculateBoatLoan({
      boatPrice: Number(boatPriceInput) || 0,
      downPayment: Number(downPaymentInput) || 0,
      tradeInValue: Number(tradeInInput) || 0,
      loanTermYears: Number(loanYearsInput) || 1,
      interestRatePct: Number(interestRateInput) || 0,
      salesTaxRatePct: Number(salesTaxInput) || 0,
      dealerFees: Number(feesInput) || 0,
      includeFeesInLoan,
    });
  }, [
    boatPriceInput,
    downPaymentInput,
    tradeInInput,
    loanYearsInput,
    interestRateInput,
    salesTaxInput,
    feesInput,
    includeFeesInLoan,
  ]);

  // Amortization schedule filtering & pagination
  const filteredSchedule = useMemo(() => {
    if (!coreResult.schedule) return [];
    if (!tableSearch.trim()) return coreResult.schedule;
    return coreResult.schedule.filter(
      (row) =>
        row.month.toString().includes(tableSearch) ||
        row.endingBalance.toString().includes(tableSearch) ||
        row.interest.toString().includes(tableSearch)
    );
  }, [coreResult.schedule, tableSearch]);

  const totalPages = Math.ceil(filteredSchedule.length / rowsPerPage) || 1;
  const currentSchedulePage = filteredSchedule.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ==========================================
  // 2. COMPUTED RESULTS: BOAT TCO
  // ==========================================
  const tcoResult = useMemo(() => {
    return calculateBoatTco(
      Number(tcoLoanPmtInput) || 0,
      Number(tcoInsuranceInput) || 0,
      Number(tcoMarinaInput) || 0,
      Number(tcoFuelMaintInput) || 0,
      Number(tcoWinterizeInput) || 0
    );
  }, [
    tcoLoanPmtInput,
    tcoInsuranceInput,
    tcoMarinaInput,
    tcoFuelMaintInput,
    tcoWinterizeInput,
  ]);

  // ==========================================
  // 3. COMPUTED RESULTS: AFFORDABILITY
  // ==========================================
  const affordResult = useMemo(() => {
    return solveMaxBoatPrice(
      Number(affordPmtInput) || 0,
      Number(affordRateInput) || 0,
      Number(affordYearsInput) || 1,
      Number(affordDownInput) || 0,
      Number(affordTaxInput) || 0
    );
  }, [affordPmtInput, affordRateInput, affordYearsInput, affordDownInput, affordTaxInput]);

  // ==========================================
  // 4. COMPUTED RESULTS: EXTRA PAYMENT
  // ==========================================
  const extraResult = useMemo(() => {
    return calculateBoatLoan({
      boatPrice: Number(extraPriceInput) || 0,
      downPayment: Number(extraDownInput) || 0,
      loanTermYears: Number(extraYearsInput) || 1,
      interestRatePct: Number(extraRateInput) || 0,
      extraMonthlyPayment: Number(extraMonthlyInput) || 0,
    });
  }, [extraPriceInput, extraDownInput, extraYearsInput, extraRateInput, extraMonthlyInput]);

  // ==========================================
  // 5. COMPUTED RESULTS: REFINANCE
  // ==========================================
  const refinanceResult = useMemo(() => {
    return calculateMarineRefinance(
      Number(refinanceBalInput) || 0,
      Number(refinanceOldRateInput) || 0,
      Number(refinanceOldMosInput) || 1,
      Number(refinanceNewRateInput) || 0,
      Number(refinanceNewMosInput) || 1,
      Number(refinanceFeeInput) || 0
    );
  }, [
    refinanceBalInput,
    refinanceOldRateInput,
    refinanceOldMosInput,
    refinanceNewRateInput,
    refinanceNewMosInput,
    refinanceFeeInput,
  ]);

  // ==========================================
  // 6. COMPUTED RESULTS: DEPRECIATION
  // ==========================================
  const deprResult = useMemo(() => {
    const p = Number(deprPriceInput) || 0;
    const d = (Number(deprRateInput) || 0) / 100;
    const t = Number(deprYearsInput) || 1;

    const estResale = p * Math.pow(1 - d, t);
    const totalDepr = Math.max(0, p - estResale);
    const pct = p > 0 ? (estResale / p) * 100 : 0;

    return {
      estimatedResale: estResale,
      totalDepreciation: totalDepr,
      retainedPct: pct,
    };
  }, [deprPriceInput, deprRateInput, deprYearsInput]);

  // ==========================================
  // SAVE HANDLERS FOR ALL 6 BOXES
  // ==========================================
  const handleSaveCore = () => {
    const inputStr = `Price: ${currencySymbol}${boatPriceInput} | Down: ${currencySymbol}${downPaymentInput} | Term: ${loanYearsInput} Yrs @ ${interestRateInput}%`;
    const resList = [
      `Monthly Payment: ${fmt(coreResult.monthlyPayment)}/mo`,
      `Total Financed: ${fmt(coreResult.totalLoanAmount)}`,
      `Total Interest: ${fmt(coreResult.totalInterestPaid)}`,
      `Total Cost: ${fmt(coreResult.totalCostOfBoat)}`,
    ];

    const newItem: SavedBoatItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Boat Loan Calculation",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedCoreItems].slice(0, 10);
    setSavedCoreItems(updated);
    try {
      localStorage.setItem("saved_boat_core", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedCore(true);
    setTimeout(() => setJustSavedCore(false), 2500);
  };

  const handleSaveTco = () => {
    const inputStr = `Loan: ${currencySymbol}${tcoLoanPmtInput}/mo | Marina: ${currencySymbol}${tcoMarinaInput}/mo | Fuel/Maint: ${currencySymbol}${tcoFuelMaintInput}/yr`;
    const resList = [
      `Total Monthly TCO: ${fmt(tcoResult.totalMonthlyOwnershipCost)}/mo`,
      `Annual Operating Cost: ${fmt(tcoResult.annualOwnershipCost)}/yr`,
      `5-Year Ownership Cost: ${fmt(tcoResult.fiveYearTotalOwnershipCost)}`,
    ];

    const newItem: SavedBoatItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Total Boat Ownership Cost",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedTcoItems].slice(0, 10);
    setSavedTcoItems(updated);
    try {
      localStorage.setItem("saved_boat_tco", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedTco(true);
    setTimeout(() => setJustSavedTco(false), 2500);
  };

  const handleSaveAfford = () => {
    const inputStr = `Budget: ${currencySymbol}${affordPmtInput}/mo | Down: ${currencySymbol}${affordDownInput} | Term: ${affordYearsInput} Yrs @ ${affordRateInput}%`;
    const resList = [
      `Max Affordable Boat: ${fmt(affordResult.maxAffordableBoatPrice)}`,
      `Max Loan Amount: ${fmt(affordResult.maxLoanAmount)}`,
    ];

    const newItem: SavedBoatItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Boat Loan Affordability",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedAffordItems].slice(0, 10);
    setSavedAffordItems(updated);
    try {
      localStorage.setItem("saved_boat_afford", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedAfford(true);
    setTimeout(() => setJustSavedAfford(false), 2500);
  };

  const handleSaveExtra = () => {
    const inputStr = `Price: ${currencySymbol}${extraPriceInput} | Term: ${extraYearsInput} Yrs | Extra: +${currencySymbol}${extraMonthlyInput}/mo`;
    const resList = [
      `Payoff in: ${Math.floor(extraResult.payoffMonths / 12)} Yrs ${extraResult.payoffMonths % 12} Mos`,
      `Interest Saved: ${fmt(extraResult.interestSavedWithExtra)}`,
    ];

    const newItem: SavedBoatItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Early Payoff Accelerator",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedExtraItems].slice(0, 10);
    setSavedExtraItems(updated);
    try {
      localStorage.setItem("saved_boat_extra", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedExtra(true);
    setTimeout(() => setJustSavedExtra(false), 2500);
  };

  const handleSaveRefinance = () => {
    const inputStr = `Balance: ${currencySymbol}${refinanceBalInput} | Rate: ${refinanceOldRateInput}% -> ${refinanceNewRateInput}%`;
    const resList = [
      `Monthly Savings: ${fmt(refinanceResult.monthlySavings)}/mo`,
      `Net Lifetime Savings: ${fmt(refinanceResult.netLifetimeSavings)}`,
      `New Monthly Payment: ${fmt(refinanceResult.newMonthlyPayment)}/mo`,
    ];

    const newItem: SavedBoatItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Marine Loan Refinance",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedRefinanceItems].slice(0, 10);
    setSavedRefinanceItems(updated);
    try {
      localStorage.setItem("saved_boat_refinance", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedRefinance(true);
    setTimeout(() => setJustSavedRefinance(false), 2500);
  };

  const handleSaveDepr = () => {
    const inputStr = `Price: ${currencySymbol}${deprPriceInput} | Decay: ${deprRateInput}%/yr | Term: ${deprYearsInput} Yrs`;
    const resList = [
      `Est. Resale: ${fmt(deprResult.estimatedResale)} (${deprResult.retainedPct.toFixed(1)}%)`,
      `Total Depreciation: ${fmt(deprResult.totalDepreciation)}`,
    ];

    const newItem: SavedBoatItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Vessel Depreciation Estimator",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedDeprItems].slice(0, 10);
    setSavedDeprItems(updated);
    try {
      localStorage.setItem("saved_boat_depr", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedDepr(true);
    setTimeout(() => setJustSavedDepr(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* ========================================================================= */}
      {/* BOX 1: BOAT LOAN CALCULATOR (UNIVERSAL SUITE) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Boat Loan Calculator</span>
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
                Loan Parameters
              </div>

              {/* Boat Price & Down Payment */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Boat Price ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={boatPriceInput}
                    onChange={(e) => setBoatPriceInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Down Payment ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={downPaymentInput}
                    onChange={(e) => setDownPaymentInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Loan Term & Interest Rate */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Loan Term (Years)
                  </label>
                  <input
                    type="number"
                    value={loanYearsInput}
                    onChange={(e) => setLoanYearsInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Interest Rate (% APR)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRateInput}
                    onChange={(e) => setInterestRateInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>

              {/* Trade-In, Sales Tax & Fees */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Trade-In ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={tradeInInput}
                    onChange={(e) => setTradeInInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Sales Tax (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={salesTaxInput}
                    onChange={(e) => setSalesTaxInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Dealer Fees ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={feesInput}
                    onChange={(e) => setFeesInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              {/* Include Fees Checkbox */}
              <div className="pt-1 border-t border-slate-200 dark:border-slate-800">
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeFeesInLoan}
                    onChange={(e) => setIncludeFeesInLoan(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Roll sales tax and fees into loan balance</span>
                </label>
              </div>
            </div>

            {/* RIGHT COLUMN: OUTPUTS */}
            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 dark:text-blue-400 block">
                      Monthly Boat Loan Payment
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
                      {fmt(coreResult.monthlyPayment)}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                      Total Financed Amount
                    </span>
                    <span className="text-sm font-bold font-mono text-blue-600 dark:text-blue-400">
                      {fmt(coreResult.totalLoanAmount)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Total Interest</span>
                    <span className="font-mono text-sm text-amber-600">{fmt(coreResult.totalInterestPaid)}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Total Upfront Cash</span>
                    <span className="font-mono text-sm text-slate-900 dark:text-slate-100">{fmt(coreResult.totalUpfrontPayment)}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Grand Total Cost</span>
                    <span className="font-mono text-sm text-blue-600">{fmt(coreResult.totalCostOfBoat)}</span>
                  </div>
                </div>

                {/* PRINCIPAL VS INTEREST PROGRESS */}
                <div className="space-y-1 pt-1">
                  <div className="w-full h-3 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 flex">
                    <div
                      style={{
                        width: `${
                          coreResult.totalOfPayments > 0
                            ? (coreResult.totalLoanAmount / coreResult.totalOfPayments) * 100
                            : 70
                        }%`,
                      }}
                      className="bg-blue-600"
                    />
                    <div
                      style={{
                        width: `${
                          coreResult.totalOfPayments > 0
                            ? (coreResult.totalInterestPaid / coreResult.totalOfPayments) * 100
                            : 30
                        }%`,
                      }}
                      className="bg-amber-500"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400">
                    <span>Principal Financed: {fmt(coreResult.totalLoanAmount)}</span>
                    <span>Finance Interest: {fmt(coreResult.totalInterestPaid)}</span>
                  </div>
                </div>
              </div>

              {/* ANNUAL AMORTIZATION SCHEDULE */}
              {coreResult.annualSchedule.length > 0 && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                      Annual Amortization Schedule
                    </span>
                    <input
                      type="text"
                      placeholder="Search year..."
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
                          <th className="py-1 px-1.5">Year</th>
                          <th className="py-1 px-1.5">Interest Paid</th>
                          <th className="py-1 px-1.5">Principal Paid</th>
                          <th className="py-1 px-1.5">Ending Loan Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
                        {currentSchedulePage.map((row) => (
                          <tr key={row.month} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            <td className="py-1 px-1.5 font-bold font-sans">M{row.month} (Yr {row.year})</td>
                            <td className="py-1 px-1.5 text-amber-600">{fmt(row.interest)}</td>
                            <td className="py-1 px-1.5 text-blue-600 font-bold">{fmt(row.principal)}</td>
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

          {/* SAVED CALCULATIONS BOX 1 */}
          {savedCoreItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Boat Loans ({savedCoreItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCoreItems([]);
                    localStorage.removeItem("saved_boat_core");
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
                            localStorage.setItem("saved_boat_core", JSON.stringify(updated));
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
      {/* BOX 2: TOTAL COST OF BOAT OWNERSHIP (TCO) SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Total Cost of Boat Ownership Solver (Marina, Insurance, Fuel)</span>
          <button
            type="button"
            onClick={handleSaveTco}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedTco
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedTco ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedTco ? "Saved!" : `Save${savedTcoItems.length > 0 ? ` (${savedTcoItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Operating Cost Inputs
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Monthly Loan ({currencySymbol}/mo)
                  </label>
                  <input
                    type="number"
                    value={tcoLoanPmtInput}
                    onChange={(e) => setTcoLoanPmtInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Marina/Slip ({currencySymbol}/mo)
                  </label>
                  <input
                    type="number"
                    value={tcoMarinaInput}
                    onChange={(e) => setTcoMarinaInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Insurance/Yr
                  </label>
                  <input
                    type="number"
                    value={tcoInsuranceInput}
                    onChange={(e) => setTcoInsuranceInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Fuel & Maint/Yr
                  </label>
                  <input
                    type="number"
                    value={tcoFuelMaintInput}
                    onChange={(e) => setTcoFuelMaintInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Winterize/Yr
                  </label>
                  <input
                    type="number"
                    value={tcoWinterizeInput}
                    onChange={(e) => setTcoWinterizeInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 block">
                      Total Monthly Ownership Cost
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-blue-600">
                      {fmt(tcoResult.totalMonthlyOwnershipCost)}/mo
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Annual Operating Cost</span>
                    <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
                      {fmt(tcoResult.annualOwnershipCost)}/year
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Monthly Marina / Slip</span>
                    <span>{fmt(tcoResult.monthlyMarinaMooring)}/mo</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">5-Year All-In Total</span>
                    <span className="text-amber-600">{fmt(tcoResult.fiveYearTotalOwnershipCost)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED TCO LIST */}
          {savedTcoItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Ownership Estimates ({savedTcoItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedTcoItems([]);
                    localStorage.removeItem("saved_boat_tco");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedTcoItems.map((item) => (
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
      {/* BOX 3: REVERSE BOAT LOAN AFFORDABILITY SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Reverse Boat Loan Affordability Solver</span>
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
                Budget Target Parameters
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Monthly Budget ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={affordPmtInput}
                    onChange={(e) => setAffordPmtInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Down Payment ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={affordDownInput}
                    onChange={(e) => setAffordDownInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Term (Years)
                  </label>
                  <input
                    type="number"
                    value={affordYearsInput}
                    onChange={(e) => setAffordYearsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Interest Rate %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={affordRateInput}
                    onChange={(e) => setAffordRateInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 block">
                      Max Affordable Boat Purchase Price
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-emerald-600">
                      {fmt(affordResult.maxAffordableBoatPrice)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Max Loan Amount</span>
                    <span className="text-sm font-bold font-mono text-blue-600">
                      {fmt(affordResult.maxLoanAmount)}
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border text-xs font-mono font-bold flex justify-between items-center">
                  <span className="text-slate-500 font-sans">Purchasing Power Boost with Down Payment:</span>
                  <span className="text-emerald-600">+{fmt(Number(affordDownInput) || 0)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED AFFORD LIST */}
          {savedAffordItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Affordability Targets ({savedAffordItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedAffordItems([]);
                    localStorage.removeItem("saved_boat_afford");
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
      {/* BOX 4: EXTRA PAYMENT & EARLY PAYOFF ACCELERATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Extra Payment & Early Payoff Accelerator</span>
          <button
            type="button"
            onClick={handleSaveExtra}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedExtra
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedExtra ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedExtra ? "Saved!" : `Save${savedExtraItems.length > 0 ? ` (${savedExtraItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Early Payoff Inputs
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Boat Price ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={extraPriceInput}
                    onChange={(e) => setExtraPriceInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Extra Payment ({currencySymbol}/mo)
                  </label>
                  <input
                    type="number"
                    value={extraMonthlyInput}
                    onChange={(e) => setExtraMonthlyInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Term (Years)
                  </label>
                  <input
                    type="number"
                    value={extraYearsInput}
                    onChange={(e) => setExtraYearsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Rate %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={extraRateInput}
                    onChange={(e) => setExtraRateInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 block">
                      Total Interest Saved
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-emerald-600">
                      {fmt(extraResult.interestSavedWithExtra)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">New Accelerated Payoff</span>
                    <span className="text-sm font-bold font-mono text-blue-600">
                      {Math.floor(extraResult.payoffMonths / 12)} Yrs {extraResult.payoffMonths % 12} Mos
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Total Loan Repayment</span>
                    <span>{fmt(extraResult.totalOfPayments)}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Original Term</span>
                    <span>{Number(extraYearsInput) * 12} Months</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED EXTRA LIST */}
          {savedExtraItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Accelerator Calculations ({savedExtraItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedExtraItems([]);
                    localStorage.removeItem("saved_boat_extra");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedExtraItems.map((item) => (
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
      {/* BOX 5: MARINE LOAN REFINANCE ESTIMATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Marine Loan Refinance Estimator</span>
          <button
            type="button"
            onClick={handleSaveRefinance}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedRefinance
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedRefinance ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedRefinance ? "Saved!" : `Save${savedRefinanceItems.length > 0 ? ` (${savedRefinanceItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Refinance Parameters
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Current Loan Balance ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={refinanceBalInput}
                  onChange={(e) => setRefinanceBalInput(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Current Rate %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={refinanceOldRateInput}
                    onChange={(e) => setRefinanceOldRateInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    New Rate %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={refinanceNewRateInput}
                    onChange={(e) => setRefinanceNewRateInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Remaining Months
                  </label>
                  <input
                    type="number"
                    value={refinanceOldMosInput}
                    onChange={(e) => setRefinanceOldMosInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Refi Closing Fees ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={refinanceFeeInput}
                    onChange={(e) => setRefinanceFeeInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 block">
                      Net Lifetime Savings
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-emerald-600">
                      {fmt(refinanceResult.netLifetimeSavings)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Monthly Payment Drop</span>
                    <span className="text-sm font-bold font-mono text-blue-600">
                      {fmt(refinanceResult.monthlySavings)}/mo
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Current Payment</span>
                    <span>{fmt(refinanceResult.currentMonthlyPayment)}/mo</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">New Refinanced Payment</span>
                    <span className="text-emerald-600">{fmt(refinanceResult.newMonthlyPayment)}/mo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED REFINANCE LIST */}
          {savedRefinanceItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Refinance Calculations ({savedRefinanceItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedRefinanceItems([]);
                    localStorage.removeItem("saved_boat_refinance");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedRefinanceItems.map((item) => (
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
      {/* BOX 6: VESSEL RESALE & DEPRECIATION ESTIMATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Vessel Resale & Depreciation Estimator</span>
          <button
            type="button"
            onClick={handleSaveDepr}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedDepr
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedDepr ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedDepr ? "Saved!" : `Save${savedDeprItems.length > 0 ? ` (${savedDeprItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Marine Depreciation Parameters
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Purchase Price ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={deprPriceInput}
                  onChange={(e) => setDeprPriceInput(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Depreciation %/Yr
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={deprRateInput}
                    onChange={(e) => setDeprRateInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Holding Horizon (Yrs)
                  </label>
                  <input
                    type="number"
                    value={deprYearsInput}
                    onChange={(e) => setDeprYearsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                      Estimated Future Resale Value
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-emerald-600">
                      {fmt(deprResult.estimatedResale)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Retained Value</span>
                    <span className="text-sm font-bold font-mono text-blue-600">
                      {deprResult.retainedPct.toFixed(1)}% of MSRP
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border text-xs font-mono font-bold flex justify-between items-center">
                  <span className="text-slate-500 font-sans">Total Marine Depreciation Lost:</span>
                  <span className="text-amber-600">{fmt(deprResult.totalDepreciation)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED DEPR LIST */}
          {savedDeprItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Resale Estimates ({savedDeprItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedDeprItems([]);
                    localStorage.removeItem("saved_boat_depr");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedDeprItems.map((item) => (
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
