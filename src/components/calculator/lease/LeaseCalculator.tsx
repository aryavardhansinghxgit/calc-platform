"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  Check,
  Download,
} from "lucide-react";
import {
  calculateLeaseFixedRate,
  solveLeaseInterestRate,
  convertMoneyFactorToApr,
  convertAprToMoneyFactor,
  calculateLeaseVsBuy,
  classifyCommercialLease,
  estimateAssetResidual,
} from "@/lib/calculator-engine/formulas/lease";
import { LeaseContent } from "./LeaseContent";

export interface SavedLeaseItem {
  id: string;
  title: string;
  inputs: string;
  result: string;
  resultsList: string[];
  timestamp: string;
}

export function LeaseCalculator() {
  // Simple Currency Selector with Dollar ($) as default
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

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

  // ==========================================
  // BOX 1: FIXED RATE UNIVERSAL LEASE
  // ==========================================
  const [assetValueInput, setAssetValueInput] = useState<string>("20000");
  const [residualValueInput, setResidualValueInput] = useState<string>("8000");
  const [leaseYearsInput, setLeaseYearsInput] = useState<string>("3");
  const [leaseMonthsInput, setLeaseMonthsInput] = useState<string>("0");
  const [interestRateInput, setInterestRateInput] = useState<string>("6.0");
  const [downPaymentInput, setDownPaymentInput] = useState<string>("0");
  const [salesTaxInput, setSalesTaxInput] = useState<string>("0");
  const [paymentTiming, setPaymentTiming] = useState<"end" | "beginning">("end");

  // Table search and pagination
  const [tableSearch, setTableSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 12;

  // Saved state for Box 1
  const [savedCoreItems, setSavedCoreItems] = useState<SavedLeaseItem[]>([]);
  const [justSavedCore, setJustSavedCore] = useState<boolean>(false);

  // ==========================================
  // BOX 2: FIXED PAY LEASE SOLVER
  // ==========================================
  const [solverAssetValInput, setSolverAssetValInput] = useState<string>("20000");
  const [solverResidualInput, setSolverResidualInput] = useState<string>("8000");
  const [solverYearsInput, setSolverYearsInput] = useState<string>("3");
  const [solverMonthsInput, setSolverMonthsInput] = useState<string>("0");
  const [solverMonthlyPayInput, setSolverMonthlyPayInput] = useState<string>("405.06");
  const [savedSolverItems, setSavedSolverItems] = useState<SavedLeaseItem[]>([]);
  const [justSavedSolver, setJustSavedSolver] = useState<boolean>(false);

  // ==========================================
  // BOX 3: AUTO LEASE & MONEY FACTOR SUITE
  // ==========================================
  const [autoMsrpInput, setAutoMsrpInput] = useState<string>("35000");
  const [autoCapCostInput, setAutoCapCostInput] = useState<string>("33000");
  const [autoDownPmtInput, setAutoDownPmtInput] = useState<string>("2000");
  const [autoAcqFeeInput, setAutoAcqFeeInput] = useState<string>("650");
  const [autoDocFeeInput, setAutoDocFeeInput] = useState<string>("350");
  const [autoResidualInput, setAutoResidualInput] = useState<string>("19250"); // 55%
  const [autoMoneyFactorInput, setAutoMoneyFactorInput] = useState<string>("0.00225");
  const [autoTermMonthsInput, setAutoTermMonthsInput] = useState<string>("36");
  const [autoTaxPctInput, setAutoTaxPctInput] = useState<string>("7.0");
  const [savedAutoItems, setSavedAutoItems] = useState<SavedLeaseItem[]>([]);
  const [justSavedAuto, setJustSavedAuto] = useState<boolean>(false);

  // ==========================================
  // BOX 4: LEASE VS. BUY COMPARISON ENGINE
  // ==========================================
  const [compVehiclePriceInput, setCompVehiclePriceInput] = useState<string>("40000");
  const [compDownPmtInput, setCompDownPmtInput] = useState<string>("3000");
  const [compLeaseTermInput, setCompLeaseTermInput] = useState<string>("36");
  const [compLeaseRateInput, setCompLeaseRateInput] = useState<string>("5.5");
  const [compLeaseResidualInput, setCompLeaseResidualInput] = useState<string>("22000");
  const [compLoanTermInput, setCompLoanTermInput] = useState<string>("60");
  const [compLoanRateInput, setCompLoanRateInput] = useState<string>("6.5");
  const [compResaleValueInput, setCompResaleValueInput] = useState<string>("20000");
  const [compTaxInput, setCompTaxInput] = useState<string>("7.0");
  const [savedCompItems, setSavedCompItems] = useState<SavedLeaseItem[]>([]);
  const [justSavedComp, setJustSavedComp] = useState<boolean>(false);

  // ==========================================
  // BOX 5: COMMERCIAL LEASE CLASSIFIER (ASC 842)
  // ==========================================
  const [commFairValueInput, setCommFairValueInput] = useState<string>("100000");
  const [commTermYearsInput, setCommTermYearsInput] = useState<string>("5");
  const [commLifeYearsInput, setCommLifeYearsInput] = useState<string>("6");
  const [commAnnualPayInput, setCommAnnualPayInput] = useState<string>("22000");
  const [commDiscountRateInput, setCommDiscountRateInput] = useState<string>("6.0");
  const [commOwnershipTransfer, setCommOwnershipTransfer] = useState<boolean>(false);
  const [commBargainPurchase, setCommBargainPurchase] = useState<boolean>(false);
  const [savedCommItems, setSavedCommItems] = useState<SavedLeaseItem[]>([]);
  const [justSavedComm, setJustSavedComm] = useState<boolean>(false);

  // ==========================================
  // BOX 6: RESIDUAL VALUE PREDICTOR
  // ==========================================
  const [predAssetValInput, setPredAssetValInput] = useState<string>("30000");
  const [predTermYearsInput, setPredTermYearsInput] = useState<string>("3");
  const [predDeprRateInput, setPredDeprRateInput] = useState<string>("15.0");
  const [savedPredItems, setSavedPredItems] = useState<SavedLeaseItem[]>([]);
  const [justSavedPred, setJustSavedPred] = useState<boolean>(false);

  // Load saved calculations on mount
  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_lease_core");
      if (s1) setSavedCoreItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_lease_solver");
      if (s2) setSavedSolverItems(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_lease_auto");
      if (s3) setSavedAutoItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_lease_comp");
      if (s4) setSavedCompItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_lease_comm");
      if (s5) setSavedCommItems(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_lease_pred");
      if (s6) setSavedPredItems(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Format currency helper
  const fmt = (num: number) => {
    return `${currencySymbol}${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // ==========================================
  // 1. COMPUTED RESULTS: FIXED RATE LEASE
  // ==========================================
  const totalLeaseMonths = (Number(leaseYearsInput) || 0) * 12 + (Number(leaseMonthsInput) || 0);
  const coreResult = useMemo(() => {
    return calculateLeaseFixedRate({
      assetValue: Number(assetValueInput) || 0,
      residualValue: Number(residualValueInput) || 0,
      leaseTermMonths: totalLeaseMonths || 1,
      interestRatePct: Number(interestRateInput) || 0,
      downPayment: Number(downPaymentInput) || 0,
      salesTaxRatePct: Number(salesTaxInput) || 0,
      paymentTiming,
    });
  }, [
    assetValueInput,
    residualValueInput,
    totalLeaseMonths,
    interestRateInput,
    downPaymentInput,
    salesTaxInput,
    paymentTiming,
  ]);

  // Amortization table filtering & pagination
  const filteredSchedule = useMemo(() => {
    if (!coreResult.schedule) return [];
    if (!tableSearch.trim()) return coreResult.schedule;
    return coreResult.schedule.filter(
      (row) =>
        row.month.toString().includes(tableSearch) ||
        row.endingBalance.toString().includes(tableSearch) ||
        row.interestFinanceCharge.toString().includes(tableSearch)
    );
  }, [coreResult.schedule, tableSearch]);

  const totalPages = Math.ceil(filteredSchedule.length / rowsPerPage) || 1;
  const currentSchedulePage = filteredSchedule.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ==========================================
  // 2. COMPUTED RESULTS: FIXED PAY SOLVER
  // ==========================================
  const solverTotalMonths = (Number(solverYearsInput) || 0) * 12 + (Number(solverMonthsInput) || 0);
  const solverResult = useMemo(() => {
    return solveLeaseInterestRate(
      Number(solverAssetValInput) || 0,
      Number(solverResidualInput) || 0,
      solverTotalMonths || 1,
      Number(solverMonthlyPayInput) || 0
    );
  }, [solverAssetValInput, solverResidualInput, solverTotalMonths, solverMonthlyPayInput]);

  // ==========================================
  // 3. COMPUTED RESULTS: AUTO LEASE & MONEY FACTOR
  // ==========================================
  const autoMfNum = Number(autoMoneyFactorInput) || 0;
  const autoEquivalentApr = convertMoneyFactorToApr(autoMfNum);
  const autoResult = useMemo(() => {
    return calculateLeaseFixedRate({
      assetValue: Number(autoCapCostInput) || 0,
      residualValue: Number(autoResidualInput) || 0,
      leaseTermMonths: Number(autoTermMonthsInput) || 1,
      interestRatePct: autoEquivalentApr,
      downPayment: Number(autoDownPmtInput) || 0,
      acquisitionFee: Number(autoAcqFeeInput) || 0,
      dealerDocFee: Number(autoDocFeeInput) || 0,
      salesTaxRatePct: Number(autoTaxPctInput) || 0,
      paymentTiming: "beginning",
    });
  }, [
    autoCapCostInput,
    autoResidualInput,
    autoTermMonthsInput,
    autoEquivalentApr,
    autoDownPmtInput,
    autoAcqFeeInput,
    autoDocFeeInput,
    autoTaxPctInput,
  ]);

  // ==========================================
  // 4. COMPUTED RESULTS: LEASE VS. BUY
  // ==========================================
  const compResult = useMemo(() => {
    return calculateLeaseVsBuy(
      Number(compVehiclePriceInput) || 0,
      Number(compDownPmtInput) || 0,
      Number(compLeaseTermInput) || 1,
      Number(compLeaseRateInput) || 0,
      Number(compLeaseResidualInput) || 0,
      Number(compLoanTermInput) || 1,
      Number(compLoanRateInput) || 0,
      Number(compResaleValueInput) || 0,
      Number(compTaxInput) || 0
    );
  }, [
    compVehiclePriceInput,
    compDownPmtInput,
    compLeaseTermInput,
    compLeaseRateInput,
    compLeaseResidualInput,
    compLoanTermInput,
    compLoanRateInput,
    compResaleValueInput,
    compTaxInput,
  ]);

  // ==========================================
  // 5. COMPUTED RESULTS: COMMERCIAL LEASE (ASC 842)
  // ==========================================
  const commResult = useMemo(() => {
    return classifyCommercialLease(
      Number(commFairValueInput) || 0,
      Number(commTermYearsInput) || 1,
      Number(commLifeYearsInput) || 1,
      Number(commAnnualPayInput) || 0,
      Number(commDiscountRateInput) || 0,
      commOwnershipTransfer,
      commBargainPurchase
    );
  }, [
    commFairValueInput,
    commTermYearsInput,
    commLifeYearsInput,
    commAnnualPayInput,
    commDiscountRateInput,
    commOwnershipTransfer,
    commBargainPurchase,
  ]);

  // ==========================================
  // 6. COMPUTED RESULTS: RESIDUAL VALUE PREDICTOR
  // ==========================================
  const predResult = useMemo(() => {
    return estimateAssetResidual(
      Number(predAssetValInput) || 0,
      Number(predTermYearsInput) || 1,
      Number(predDeprRateInput) || 0
    );
  }, [predAssetValInput, predTermYearsInput, predDeprRateInput]);

  // ==========================================
  // SAVE HANDLERS FOR ALL 6 BOXES
  // ==========================================
  const handleSaveCore = () => {
    const inputStr = `Asset: ${currencySymbol}${assetValueInput} | Residual: ${currencySymbol}${residualValueInput} | Term: ${totalLeaseMonths} Mos @ ${interestRateInput}% APR`;
    const resList = [
      `Monthly Payment: ${fmt(coreResult.monthlyTotalPayment)}/mo`,
      `Total of ${totalLeaseMonths} Payments: ${fmt(coreResult.totalMonthlyPayments)}`,
      `Total Depreciation: ${fmt(coreResult.totalDepreciation)}`,
      `Total Finance Charge: ${fmt(coreResult.totalFinanceCharges)}`,
    ];

    const newItem: SavedLeaseItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Fixed Rate Lease",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedCoreItems].slice(0, 10);
    setSavedCoreItems(updated);
    try {
      localStorage.setItem("saved_lease_core", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedCore(true);
    setTimeout(() => setJustSavedCore(false), 2500);
  };

  const handleSaveSolver = () => {
    const inputStr = `Asset: ${currencySymbol}${solverAssetValInput} | Residual: ${currencySymbol}${solverResidualInput} | Term: ${solverTotalMonths} Mos | Pay: ${currencySymbol}${solverMonthlyPayInput}/mo`;
    const resList = [
      `Solved Annual APR: ${solverResult.solvedAnnualRatePct.toFixed(3)}%`,
      `Equivalent Money Factor: ${solverResult.solvedMoneyFactor.toFixed(5)}`,
      `Total Paid: ${fmt(solverResult.totalPaid)}`,
      `Total Finance Interest: ${fmt(solverResult.totalInterestPaid)}`,
    ];

    const newItem: SavedLeaseItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Fixed Pay Lease Solver",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedSolverItems].slice(0, 10);
    setSavedSolverItems(updated);
    try {
      localStorage.setItem("saved_lease_solver", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedSolver(true);
    setTimeout(() => setJustSavedSolver(false), 2500);
  };

  const handleSaveAuto = () => {
    const inputStr = `Cap Cost: ${currencySymbol}${autoCapCostInput} | Residual: ${currencySymbol}${autoResidualInput} | MF: ${autoMoneyFactorInput} (${autoEquivalentApr.toFixed(2)}% APR)`;
    const resList = [
      `Monthly Payment: ${fmt(autoResult.monthlyTotalPayment)}/mo`,
      `Total Out-of-Pocket Lease: ${fmt(autoResult.totalLeaseCost)}`,
      `Total Finance Charge: ${fmt(autoResult.totalFinanceCharges)}`,
    ];

    const newItem: SavedLeaseItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Auto Lease & Money Factor",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedAutoItems].slice(0, 10);
    setSavedAutoItems(updated);
    try {
      localStorage.setItem("saved_lease_auto", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedAuto(true);
    setTimeout(() => setJustSavedAuto(false), 2500);
  };

  const handleSaveComp = () => {
    const inputStr = `Vehicle: ${currencySymbol}${compVehiclePriceInput} | Lease: ${compLeaseTermInput}m vs Loan: ${compLoanTermInput}m`;
    const resList = [
      `Lease Total Cost: ${fmt(compResult.leaseTotalCost)} (${fmt(compResult.leaseMonthlyPayment)}/mo)`,
      `Loan Net Cost: ${fmt(compResult.loanTotalCost)} (${fmt(compResult.loanMonthlyPayment)}/mo)`,
      `Winner: ${compResult.recommendation.toUpperCase()} (Saves ${fmt(compResult.costDifference)})`,
    ];

    const newItem: SavedLeaseItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Lease vs. Buy Comparison",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedCompItems].slice(0, 10);
    setSavedCompItems(updated);
    try {
      localStorage.setItem("saved_lease_comp", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedComp(true);
    setTimeout(() => setJustSavedComp(false), 2500);
  };

  const handleSaveComm = () => {
    const inputStr = `Fair Value: ${currencySymbol}${commFairValueInput} | Term: ${commTermYearsInput}y | Pay: ${currencySymbol}${commAnnualPayInput}/yr`;
    const resList = [
      `Classification: ${commResult.classificationName}`,
      `PV of Payments: ${fmt(commResult.pvPayments)} (${commResult.pvToFairValueRatio.toFixed(1)}% of Fair Value)`,
      `Term Ratio: ${((Number(commTermYearsInput) / (Number(commLifeYearsInput) || 1)) * 100).toFixed(1)}% of Life`,
    ];

    const newItem: SavedLeaseItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Commercial Lease Classifier",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedCommItems].slice(0, 10);
    setSavedCommItems(updated);
    try {
      localStorage.setItem("saved_lease_comm", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedComm(true);
    setTimeout(() => setJustSavedComm(false), 2500);
  };

  const handleSavePred = () => {
    const inputStr = `Asset: ${currencySymbol}${predAssetValInput} | Term: ${predTermYearsInput} Yrs @ ${predDeprRateInput}%/yr Depreciation`;
    const resList = [
      `Estimated Residual: ${fmt(predResult.estimatedResidualValue)} (${predResult.residualPercentage.toFixed(1)}%)`,
      `Total Depreciation: ${fmt(predResult.totalDepreciation)}`,
    ];

    const newItem: SavedLeaseItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Residual Value Predictor",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedPredItems].slice(0, 10);
    setSavedPredItems(updated);
    try {
      localStorage.setItem("saved_lease_pred", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedPred(true);
    setTimeout(() => setJustSavedPred(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* ========================================================================= */}
      {/* BOX 1: UNIVERSAL FIXED RATE LEASE CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Lease Calculator</span>
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
                Lease Parameters
              </div>

              {/* Asset Value & Residual Value */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Asset Value ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={assetValueInput}
                    onChange={(e) => setAssetValueInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Residual Value ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={residualValueInput}
                    onChange={(e) => setResidualValueInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Lease Term */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Lease Term (Years)
                  </label>
                  <input
                    type="number"
                    value={leaseYearsInput}
                    onChange={(e) => setLeaseYearsInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Months
                  </label>
                  <input
                    type="number"
                    value={leaseMonthsInput}
                    onChange={(e) => setLeaseMonthsInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>

              {/* Rate & Down Payment */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={interestRateInput}
                    onChange={(e) => setInterestRateInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
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
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>

              {/* Tax & Payment Timing */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Sales Tax (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={salesTaxInput}
                    onChange={(e) => setSalesTaxInput(e.target.value)}
                    className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Payment Timing
                  </label>
                  <select
                    value={paymentTiming}
                    onChange={(e: any) => setPaymentTiming(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                  >
                    <option value="end">In Arrears (End)</option>
                    <option value="beginning">In Advance (Start)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: OUTPUTS */}
            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 dark:text-blue-400 block">
                      Monthly Payment
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
                      {fmt(coreResult.monthlyTotalPayment)}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                      Total of {totalLeaseMonths} Payments
                    </span>
                    <span className="text-sm font-bold font-mono text-blue-600 dark:text-blue-400">
                      {fmt(coreResult.totalMonthlyPayments)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Total Depreciation</span>
                    <span className="font-mono text-sm text-blue-600">{fmt(coreResult.totalDepreciation)}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Total Interest / Rent</span>
                    <span className="font-mono text-sm text-amber-600">{fmt(coreResult.totalFinanceCharges)}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Total Out-of-Pocket</span>
                    <span className="font-mono text-sm text-slate-900 dark:text-slate-100">{fmt(coreResult.totalLeaseCost)}</span>
                  </div>
                </div>

                    {/* DEPRECIATION VS INTEREST PROGRESS */}
                    <div className="space-y-1.5 pt-1">
                      <div className="w-full h-3.5 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 flex">
                        <div
                          style={{
                            width: `${
                              coreResult.totalMonthlyPayments > 0
                                ? (coreResult.totalDepreciation / coreResult.totalMonthlyPayments) * 100
                                : 80
                            }%`,
                          }}
                          className="bg-blue-600"
                        />
                        <div
                          style={{
                            width: `${
                              coreResult.totalMonthlyPayments > 0
                                ? (coreResult.totalFinanceCharges / coreResult.totalMonthlyPayments) * 100
                                : 20
                            }%`,
                          }}
                          className="bg-amber-500"
                        />
                      </div>
                      <div className="flex justify-between text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                        <span>Depreciation: {fmt(coreResult.totalDepreciation)}</span>
                        <span>Interest Fee: {fmt(coreResult.totalFinanceCharges)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* LEASE AMORTIZATION SCHEDULE (FULL WIDTH BIGGER BOX) */}
              {coreResult.schedule.length > 0 && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Lease Depreciation &amp; Amortization Schedule ({totalLeaseMonths} Total Months)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const headers = ["Month", "Starting Balance", "Payment", "Principal Depreciation", "Interest Finance Charge", "Ending Balance"];
                          const rows = coreResult.schedule.map((r) => [
                            r.month,
                            r.startingBalance.toFixed(2),
                            r.payment.toFixed(2),
                            r.principalDepreciation.toFixed(2),
                            r.interestFinanceCharge.toFixed(2),
                            r.endingBalance.toFixed(2),
                          ]);
                          const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
                          triggerCsvDownload(`lease_amortization_schedule.csv`, csv);
                        }}
                        className="px-2.5 py-1 bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-300 dark:border-slate-700 cursor-pointer transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-blue-600" /> Export CSV
                      </button>
                      <input
                        type="text"
                        placeholder="Search month..."
                        value={tableSearch}
                        onChange={(e) => {
                          setTableSearch(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="h-8 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold focus:outline-none w-32"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto text-xs max-h-72 overflow-y-auto">
                    <table className="w-full text-left border-collapse font-sans tabular-nums">
                      <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700 backdrop-blur-xs">
                        <tr>
                          <th className="p-2.5">Month</th>
                          <th className="p-2.5">Starting Balance</th>
                          <th className="p-2.5">Total Payment</th>
                          <th className="p-2.5">Principal Depr</th>
                          <th className="p-2.5">Interest Charge</th>
                          <th className="p-2.5">Ending Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {currentSchedulePage.map((row, idx) => (
                          <tr key={`lease-sched-${row.month}-${idx}`} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            <td className="p-2 font-bold text-slate-800 dark:text-slate-200">Month {row.month}</td>
                            <td className="p-2 text-slate-600 dark:text-slate-400">{fmt(row.startingBalance)}</td>
                            <td className="p-2 font-bold text-slate-900 dark:text-slate-100">{fmt(row.payment)}</td>
                            <td className="p-2 text-blue-600 font-bold">{fmt(row.principalDepreciation)}</td>
                            <td className="p-2 text-amber-600">{fmt(row.interestFinanceCharge)}</td>
                            <td className="p-2 font-bold text-slate-900 dark:text-slate-100">{fmt(row.endingBalance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {totalPages > 1 && (
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-500">Page {currentPage} of {totalPages} ({coreResult.schedule.length} months total)</span>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          disabled={currentPage <= 1}
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          className="px-3 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 disabled:opacity-40 cursor-pointer"
                        >
                          Prev
                        </button>
                        <button
                          type="button"
                          disabled={currentPage >= totalPages}
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          className="px-3 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 disabled:opacity-40 cursor-pointer"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

          {/* SAVED CALCULATIONS BOX 1 */}
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
                    localStorage.removeItem("saved_lease_core");
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
                            localStorage.setItem("saved_lease_core", JSON.stringify(updated));
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
      {/* BOX 2: FIXED PAY LEASE SOLVER (REVERSE RATE & MONEY FACTOR SOLVER) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Fixed Pay Lease Solver (Interest Rate / Money Factor)</span>
          <button
            type="button"
            onClick={handleSaveSolver}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedSolver
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedSolver ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedSolver ? "Saved!" : `Save${savedSolverItems.length > 0 ? ` (${savedSolverItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Fixed Payment Inputs
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Asset Value ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={solverAssetValInput}
                    onChange={(e) => setSolverAssetValInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Residual Value ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={solverResidualInput}
                    onChange={(e) => setSolverResidualInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Years
                  </label>
                  <input
                    type="number"
                    value={solverYearsInput}
                    onChange={(e) => setSolverYearsInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Months
                  </label>
                  <input
                    type="number"
                    value={solverMonthsInput}
                    onChange={(e) => setSolverMonthsInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Monthly Payment ({currencySymbol}/mo)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={solverMonthlyPayInput}
                  onChange={(e) => setSolverMonthlyPayInput(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 block">
                      Effective Annual Rate (APR)
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-blue-600">
                      {solverResult.solvedAnnualRatePct.toFixed(2)}%
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Equivalent Money Factor</span>
                    <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
                      {solverResult.solvedMoneyFactor.toFixed(5)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Total Paid Over Term</span>
                    <span>{fmt(solverResult.totalPaid)}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Total Finance Charges</span>
                    <span className="text-amber-600">{fmt(solverResult.totalInterestPaid)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED SOLVER LIST */}
          {savedSolverItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Rate Calculations ({savedSolverItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedSolverItems([]);
                    localStorage.removeItem("saved_lease_solver");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedSolverItems.map((item) => (
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
      {/* BOX 3: AUTO LEASE & MONEY FACTOR CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Auto Lease & Money Factor Calculator</span>
          <button
            type="button"
            onClick={handleSaveAuto}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedAuto
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedAuto ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedAuto ? "Saved!" : `Save${savedAutoItems.length > 0 ? ` (${savedAutoItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Auto Lease Details
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Agreed Price / Cap Cost ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={autoCapCostInput}
                    onChange={(e) => setAutoCapCostInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Residual Value ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={autoResidualInput}
                    onChange={(e) => setAutoResidualInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Down Pmt ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={autoDownPmtInput}
                    onChange={(e) => setAutoDownPmtInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Acq Fee ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={autoAcqFeeInput}
                    onChange={(e) => setAutoAcqFeeInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Doc Fee ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={autoDocFeeInput}
                    onChange={(e) => setAutoDocFeeInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Money Factor
                  </label>
                  <input
                    type="number"
                    step="0.00001"
                    value={autoMoneyFactorInput}
                    onChange={(e) => setAutoMoneyFactorInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Term (Mos)
                  </label>
                  <input
                    type="number"
                    value={autoTermMonthsInput}
                    onChange={(e) => setAutoTermMonthsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Tax (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={autoTaxPctInput}
                    onChange={(e) => setAutoTaxPctInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>
              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">
                • Converted APR: {autoEquivalentApr.toFixed(2)}% (MF × 2,400)
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 block">Total Monthly Payment</span>
                    <div className="text-2xl font-mono font-extrabold text-blue-600">{fmt(autoResult.monthlyTotalPayment)}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Total Out-of-Pocket Lease</span>
                    <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">{fmt(autoResult.totalLeaseCost)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Monthly Depreciation</span>
                    <span>{fmt(autoResult.totalDepreciation / Number(autoTermMonthsInput))}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Monthly Rent Fee</span>
                    <span className="text-amber-600">{fmt(autoResult.totalFinanceCharges / Number(autoTermMonthsInput))}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED AUTO LIST */}
          {savedAutoItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Auto Leases ({savedAutoItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedAutoItems([]);
                    localStorage.removeItem("saved_lease_auto");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedAutoItems.map((item) => (
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
      {/* BOX 4: LEASE VS BUY COMPARISON ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Lease vs. Buy Comparison Engine</span>
          <button
            type="button"
            onClick={handleSaveComp}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedComp
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedComp ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedComp ? "Saved!" : `Save${savedCompItems.length > 0 ? ` (${savedCompItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Comparison Inputs
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Vehicle Price ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={compVehiclePriceInput}
                    onChange={(e) => setCompVehiclePriceInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Down Payment ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={compDownPmtInput}
                    onChange={(e) => setCompDownPmtInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Lease Mos
                  </label>
                  <input
                    type="number"
                    value={compLeaseTermInput}
                    onChange={(e) => setCompLeaseTermInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Lease Rate %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={compLeaseRateInput}
                    onChange={(e) => setCompLeaseRateInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Residual ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={compLeaseResidualInput}
                    onChange={(e) => setCompLeaseResidualInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Loan Mos
                  </label>
                  <input
                    type="number"
                    value={compLoanTermInput}
                    onChange={(e) => setCompLoanTermInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Loan Rate %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={compLoanRateInput}
                    onChange={(e) => setCompLoanRateInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Future Resale
                  </label>
                  <input
                    type="number"
                    value={compResaleValueInput}
                    onChange={(e) => setCompResaleValueInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 text-xs font-mono">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-xs font-extrabold uppercase text-slate-500 font-sans">Side-by-Side Analysis</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold uppercase text-[10px] font-sans">
                    Winner: {compResult.recommendation}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border space-y-1">
                    <span className="font-bold text-blue-600 font-sans block text-xs">Lease Option</span>
                    <div>Payment: {fmt(compResult.leaseMonthlyPayment)}/mo</div>
                    <div className="font-bold">Total Net: {fmt(compResult.leaseTotalCost)}</div>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border space-y-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300 font-sans block text-xs">Loan Buy Option</span>
                    <div>Payment: {fmt(compResult.loanMonthlyPayment)}/mo</div>
                    <div className="font-bold">Total Net: {fmt(compResult.loanTotalCost)}</div>
                  </div>
                </div>

                <div className="p-2 bg-blue-100/70 dark:bg-blue-950/60 rounded-lg text-xs font-sans text-blue-900 dark:text-blue-200">
                  {compResult.summary}
                </div>
              </div>
            </div>
          </div>

          {/* SAVED COMP LIST */}
          {savedCompItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Comparisons ({savedCompItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCompItems([]);
                    localStorage.removeItem("saved_lease_comp");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedCompItems.map((item) => (
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
      {/* BOX 5: COMMERCIAL & EQUIPMENT LEASE CLASSIFIER (ASC 842) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Equipment & Commercial Lease Calculator (ASC 842)</span>
          <button
            type="button"
            onClick={handleSaveComm}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedComm
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedComm ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedComm ? "Saved!" : `Save${savedCommItems.length > 0 ? ` (${savedCommItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Equipment Parameters
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Fair Market Value ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={commFairValueInput}
                    onChange={(e) => setCommFairValueInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Annual Payment ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={commAnnualPayInput}
                    onChange={(e) => setCommAnnualPayInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Term (Yrs)
                  </label>
                  <input
                    type="number"
                    value={commTermYearsInput}
                    onChange={(e) => setCommTermYearsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Life (Yrs)
                  </label>
                  <input
                    type="number"
                    value={commLifeYearsInput}
                    onChange={(e) => setCommLifeYearsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Discount %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={commDiscountRateInput}
                    onChange={(e) => setCommDiscountRateInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-slate-200 dark:border-slate-800 text-xs font-bold">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={commOwnershipTransfer}
                    onChange={(e) => setCommOwnershipTransfer(e.target.checked)}
                    className="rounded"
                  />
                  <span>Transfers ownership at end of lease</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={commBargainPurchase}
                    onChange={(e) => setCommBargainPurchase(e.target.checked)}
                    className="rounded"
                  />
                  <span>Includes bargain purchase option</span>
                </label>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-xs font-extrabold uppercase text-slate-500">Accounting Classification</span>
                  <span className="text-base font-bold text-blue-600">{commResult.classificationName}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">PV of Lease Payments</span>
                    <span>{fmt(commResult.pvPayments)}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">PV to Fair Value Ratio</span>
                    <span>{commResult.pvToFairValueRatio.toFixed(1)}% (90% test)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED COMM LIST */}
          {savedCommItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Equipment Leases ({savedCommItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCommItems([]);
                    localStorage.removeItem("saved_lease_comm");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedCommItems.map((item) => (
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
      {/* BOX 6: ASSET DEPRECIATION & RESIDUAL VALUE PREDICTOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Asset Depreciation & Residual Value Solver</span>
          <button
            type="button"
            onClick={handleSavePred}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedPred
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedPred ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedPred ? "Saved!" : `Save${savedPredItems.length > 0 ? ` (${savedPredItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Asset Depreciation Inputs
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Starting Asset Value ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={predAssetValInput}
                  onChange={(e) => setPredAssetValInput(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Term (Years)
                  </label>
                  <input
                    type="number"
                    value={predTermYearsInput}
                    onChange={(e) => setPredTermYearsInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Depreciation (%/yr)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={predDeprRateInput}
                    onChange={(e) => setPredDeprRateInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-xs font-extrabold uppercase text-slate-500">Projected Residual Value</span>
                  <span className="text-2xl font-mono font-extrabold text-blue-600">{fmt(predResult.estimatedResidualValue)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Residual Percentage</span>
                    <span>{predResult.residualPercentage.toFixed(1)}% of Original</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Total Depreciation</span>
                    <span className="text-amber-600">{fmt(predResult.totalDepreciation)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED PRED LIST */}
          {savedPredItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Residual Estimates ({savedPredItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPredItems([]);
                    localStorage.removeItem("saved_lease_pred");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedPredItems.map((item) => (
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

      {/* Educational Guide & 12 Canonical FAQs */}
      <LeaseContent />
    </div>
  );
}

export default LeaseCalculator;
