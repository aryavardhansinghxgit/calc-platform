"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  Plus,
  Check,
  Download,
} from "lucide-react";
import {
  calculateCreditCardPayoff,
  calculateMultiCardPayoff,
  calculateBalanceTransfer,
  calculateBiWeeklyPayoff,
  calculateCreditUtilization,
  calculateCashAdvance,
  MultiCardItem,
} from "@/lib/calculator-engine/formulas/credit-card";

export interface SavedPayoffItem {
  id: string;
  title: string;
  inputs: string;
  result: string;
  resultsList: string[];
  timestamp: string;
}

export function CreditCardCalculator() {
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
  // BOX 1: SINGLE CARD PAYOFF
  // ==========================================
  const [balanceInput, setBalanceInput] = useState<string>("8000");
  const [aprInput, setAprInput] = useState<string>("18");
  const [payoffMode, setPayoffMode] = useState<"A" | "B" | "C">("A");
  const [monthlyPaymentInput, setMonthlyPaymentInput] = useState<string>("200");
  const [targetYearsInput, setTargetYearsInput] = useState<string>("2");
  const [targetMonthsInput, setTargetMonthsInput] = useState<string>("0");
  const [minPaymentRule, setMinPaymentRule] = useState<"1_plus_interest" | "2_percent" | "2.5_percent" | "3_percent" | "4_percent" | "5_percent">("1_plus_interest");
  const [minPaymentFloor, setMinPaymentFloor] = useState<string>("25");
  const [annualFeeInput, setAnnualFeeInput] = useState<string>("0");
  const [extraMonthlyInput, setExtraMonthlyInput] = useState<string>("0");
  const [lumpSumInput, setLumpSumInput] = useState<string>("0");

  // Amortization Table search and pagination
  const [tableSearch, setTableSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 12;

  // Saved calculations for Box 1
  const [savedPayoffItems, setSavedPayoffItems] = useState<SavedPayoffItem[]>([]);
  const [justSavedPayoff, setJustSavedPayoff] = useState<boolean>(false);

  // ==========================================
  // BOX 2: MULTI-CARD AVALANCHE VS SNOWBALL
  // ==========================================
  const [cards, setCards] = useState<MultiCardItem[]>([
    { id: "1", name: "Card 1", balance: 5000, apr: 24.99, minPayment: 130 },
    { id: "2", name: "Card 2", balance: 2800, apr: 19.24, minPayment: 75 },
    { id: "3", name: "Card 3", balance: 1200, apr: 28.99, minPayment: 45 },
  ]);
  const [totalBudgetInput, setTotalBudgetInput] = useState<string>("500");
  const [savedMultiCardItems, setSavedMultiCardItems] = useState<SavedPayoffItem[]>([]);
  const [justSavedMultiCard, setJustSavedMultiCard] = useState<boolean>(false);

  // ==========================================
  // BOX 3: 0% BALANCE TRANSFER SOLVER
  // ==========================================
  const [transferBalanceInput, setTransferBalanceInput] = useState<string>("6000");
  const [transferCurrentAprInput, setTransferCurrentAprInput] = useState<string>("22.99");
  const [transferMonthlyPmtInput, setTransferMonthlyPmtInput] = useState<string>("250");
  const [transferPromoMonthsInput, setTransferPromoMonthsInput] = useState<string>("18");
  const [transferFeePctInput, setTransferFeePctInput] = useState<string>("3");
  const [transferPostAprInput, setTransferPostAprInput] = useState<string>("24.99");
  const [savedTransferItems, setSavedTransferItems] = useState<SavedPayoffItem[]>([]);
  const [justSavedTransfer, setJustSavedTransfer] = useState<boolean>(false);

  // ==========================================
  // BOX 4: BI-WEEKLY PAYOFF ACCELERATOR
  // ==========================================
  const [biWeeklyBalanceInput, setBiWeeklyBalanceInput] = useState<string>("5000");
  const [biWeeklyAprInput, setBiWeeklyAprInput] = useState<string>("20");
  const [biWeeklyMonthlyPmtInput, setBiWeeklyMonthlyPmtInput] = useState<string>("200");
  const [savedBiWeeklyItems, setSavedBiWeeklyItems] = useState<SavedPayoffItem[]>([]);
  const [justSavedBiWeekly, setJustSavedBiWeekly] = useState<boolean>(false);

  // ==========================================
  // BOX 5: CREDIT UTILIZATION
  // ==========================================
  const [utilTotalLimitInput, setUtilTotalLimitInput] = useState<string>("15000");
  const [utilTotalBalanceInput, setUtilTotalBalanceInput] = useState<string>("6800");
  const [utilPaydownMonthlyInput, setUtilPaydownMonthlyInput] = useState<string>("400");
  const [savedUtilItems, setSavedUtilItems] = useState<SavedPayoffItem[]>([]);
  const [justSavedUtil, setJustSavedUtil] = useState<boolean>(false);

  // ==========================================
  // BOX 6: CASH ADVANCE SOLVER
  // ==========================================
  const [cashAmountInput, setCashAmountInput] = useState<string>("1000");
  const [cashAprInput, setCashAprInput] = useState<string>("27.99");
  const [cashFeePctInput, setCashFeePctInput] = useState<string>("5");
  const [cashFeeFloorInput, setCashFeeFloorInput] = useState<string>("10");
  const [cashAtmFeeInput, setCashAtmFeeInput] = useState<string>("4");
  const [cashDaysInput, setCashDaysInput] = useState<string>("30");
  const [savedCashItems, setSavedCashItems] = useState<SavedPayoffItem[]>([]);
  const [justSavedCash, setJustSavedCash] = useState<boolean>(false);

  // Load saved calculations on mount
  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_cc_payoff");
      if (s1) setSavedPayoffItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_cc_multicard");
      if (s2) setSavedMultiCardItems(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_cc_transfer");
      if (s3) setSavedTransferItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_cc_biweekly");
      if (s4) setSavedBiWeeklyItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_cc_utilization");
      if (s5) setSavedUtilItems(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_cc_cashadvance");
      if (s6) setSavedCashItems(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Format currency helper
  const fmt = (num: number) => {
    return `${currencySymbol}${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // ==========================================
  // 1. COMPUTED RESULTS: SINGLE CARD PAYOFF
  // ==========================================
  const payoffResult = useMemo(() => {
    return calculateCreditCardPayoff({
      balance: Number(balanceInput) || 0,
      apr: Number(aprInput) || 0,
      monthlyPayment: Number(monthlyPaymentInput) || 0,
      targetYears: Number(targetYearsInput) || 0,
      targetMonths: Number(targetMonthsInput) || 0,
      minPaymentRule,
      minPaymentFloor: Number(minPaymentFloor) || 25,
      annualFee: Number(annualFeeInput) || 0,
      mode: payoffMode,
      extraMonthlyPayment: Number(extraMonthlyInput) || 0,
      lumpSumPayment: Number(lumpSumInput) || 0,
    });
  }, [
    balanceInput,
    aprInput,
    monthlyPaymentInput,
    targetYearsInput,
    targetMonthsInput,
    minPaymentRule,
    minPaymentFloor,
    annualFeeInput,
    payoffMode,
    extraMonthlyInput,
    lumpSumInput,
  ]);

  // Amortization table filtering & pagination
  const filteredSchedule = useMemo(() => {
    if (!payoffResult.schedule) return [];
    if (!tableSearch.trim()) return payoffResult.schedule;
    return payoffResult.schedule.filter(
      (row) =>
        row.month.toString().includes(tableSearch) ||
        row.endingBalance.toString().includes(tableSearch) ||
        row.interestPaid.toString().includes(tableSearch)
    );
  }, [payoffResult.schedule, tableSearch]);

  const totalPages = Math.ceil(filteredSchedule.length / rowsPerPage) || 1;
  const currentSchedulePage = filteredSchedule.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ==========================================
  // 2. COMPUTED RESULTS: MULTI-CARD SOLVER
  // ==========================================
  const multiCardResult = useMemo(() => {
    return calculateMultiCardPayoff(cards, Number(totalBudgetInput) || 400);
  }, [cards, totalBudgetInput]);

  // ==========================================
  // 3. COMPUTED RESULTS: BALANCE TRANSFER
  // ==========================================
  const transferResult = useMemo(() => {
    return calculateBalanceTransfer({
      currentBalance: Number(transferBalanceInput) || 0,
      currentApr: Number(transferCurrentAprInput) || 0,
      monthlyPayment: Number(transferMonthlyPmtInput) || 1,
      transferApr: 0,
      introPeriodMonths: Number(transferPromoMonthsInput) || 15,
      transferFeePct: Number(transferFeePctInput) || 3,
      postIntroApr: Number(transferPostAprInput) || 24.99,
    });
  }, [
    transferBalanceInput,
    transferCurrentAprInput,
    transferMonthlyPmtInput,
    transferPromoMonthsInput,
    transferFeePctInput,
    transferPostAprInput,
  ]);

  // ==========================================
  // 4. COMPUTED RESULTS: BI-WEEKLY ACCELERATOR
  // ==========================================
  const biWeeklyResult = useMemo(() => {
    return calculateBiWeeklyPayoff({
      balance: Number(biWeeklyBalanceInput) || 0,
      apr: Number(biWeeklyAprInput) || 0,
      monthlyPayment: Number(biWeeklyMonthlyPmtInput) || 1,
    });
  }, [biWeeklyBalanceInput, biWeeklyAprInput, biWeeklyMonthlyPmtInput]);

  // ==========================================
  // 5. COMPUTED RESULTS: CREDIT UTILIZATION
  // ==========================================
  const utilResult = useMemo(() => {
    return calculateCreditUtilization({
      totalCreditLimit: Number(utilTotalLimitInput) || 1,
      totalBalance: Number(utilTotalBalanceInput) || 0,
      monthlyPaydown: Number(utilPaydownMonthlyInput) || 1,
    });
  }, [utilTotalLimitInput, utilTotalBalanceInput, utilPaydownMonthlyInput]);

  // ==========================================
  // 6. COMPUTED RESULTS: CASH ADVANCE
  // ==========================================
  const cashResult = useMemo(() => {
    return calculateCashAdvance({
      amount: Number(cashAmountInput) || 0,
      apr: Number(cashAprInput) || 0,
      feePct: Number(cashFeePctInput) || 5,
      feeFloor: Number(cashFeeFloorInput) || 10,
      atmFee: Number(cashAtmFeeInput) || 4,
      repayDays: Number(cashDaysInput) || 30,
    });
  }, [cashAmountInput, cashAprInput, cashFeePctInput, cashFeeFloorInput, cashAtmFeeInput, cashDaysInput]);

  // ==========================================
  // SAVE HANDLERS FOR ALL 6 BOXES
  // ==========================================
  const handleSavePayoff = () => {
    const inputStr = `Balance: ${currencySymbol}${balanceInput} @ ${aprInput}% APR | Mode: ${payoffMode === "A" ? `Fixed ${currencySymbol}${monthlyPaymentInput}/mo` : payoffMode === "B" ? `Target ${targetYearsInput}y ${targetMonthsInput}m` : `Minimum (${minPaymentRule})`}`;
    const resList = [
      `Payoff Time: ${Math.floor(payoffResult.monthsToPayoff / 12)}y ${payoffResult.monthsToPayoff % 12}m (${payoffResult.monthsToPayoff} mos)`,
      `Monthly Payment: ${fmt(payoffResult.monthlyPayment)}`,
      `Total Interest: ${fmt(payoffResult.totalInterestPaid)}`,
      `Total Paid: ${fmt(payoffResult.totalAmountPaid)}`,
      `Payoff Date: ${payoffResult.payoffDate}`,
    ];

    const newItem: SavedPayoffItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
      title: "Single Card Payoff",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedPayoffItems].slice(0, 10);
    setSavedPayoffItems(updated);
    try {
      localStorage.setItem("saved_cc_payoff", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedPayoff(true);
    setTimeout(() => setJustSavedPayoff(false), 2500);
  };

  const handleSaveMultiCard = () => {
    const totalBal = cards.reduce((s, c) => s + c.balance, 0);
    const inputStr = `${cards.length} Cards (Total ${currencySymbol}${totalBal}) | Budget: ${currencySymbol}${totalBudgetInput}/mo`;
    const resList = [
      `Avalanche: ${multiCardResult.avalanche.monthsToDebtFree} mos | Total Interest: ${fmt(multiCardResult.avalanche.totalInterestPaid)}`,
      `Snowball: ${multiCardResult.snowball.monthsToDebtFree} mos | Total Interest: ${fmt(multiCardResult.snowball.totalInterestPaid)}`,
      `Avalanche Savings vs Snowball: ${fmt(multiCardResult.avalancheInterestSavedVsSnowball)} & ${multiCardResult.avalancheMonthsSavedVsSnowball} mos saved`,
      `Debt-Free Date: ${multiCardResult.avalanche.debtFreeDate}`,
    ];

    const newItem: SavedPayoffItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
      title: "Multi-Card Payoff",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedMultiCardItems].slice(0, 10);
    setSavedMultiCardItems(updated);
    try {
      localStorage.setItem("saved_cc_multicard", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedMultiCard(true);
    setTimeout(() => setJustSavedMultiCard(false), 2500);
  };

  const handleSaveTransfer = () => {
    const inputStr = `Transfer: ${currencySymbol}${transferBalanceInput} from ${transferCurrentAprInput}% to 0% for ${transferPromoMonthsInput} mos (Fee: ${transferFeePctInput}%)`;
    const resList = [
      `Net Savings: ${fmt(transferResult.netSavings)}`,
      `Transfer Fee: ${fmt(transferResult.transferFeeAmount)}`,
      `Required Monthly: ${fmt(transferResult.requiredMonthlyToClearInPromo)}/mo`,
      `Break-Even: Month ${transferResult.breakEvenMonth}`,
    ];

    const newItem: SavedPayoffItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
      title: "Balance Transfer",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedTransferItems].slice(0, 10);
    setSavedTransferItems(updated);
    try {
      localStorage.setItem("saved_cc_transfer", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedTransfer(true);
    setTimeout(() => setJustSavedTransfer(false), 2500);
  };

  const handleSaveBiWeekly = () => {
    const inputStr = `Balance: ${currencySymbol}${biWeeklyBalanceInput} @ ${biWeeklyAprInput}% APR | Standard: ${currencySymbol}${biWeeklyMonthlyPmtInput}/mo`;
    const resList = [
      `Bi-Weekly Payment: ${fmt(biWeeklyResult.biWeeklyPayment)} every 2 wks`,
      `Bi-Weekly Interest Saved: ${fmt(biWeeklyResult.biWeeklyInterestSaved)}`,
      `Bi-Weekly Months Saved: ${biWeeklyResult.biWeeklyMonthsSaved} mos`,
      `15-3 Hack Interest Saved: ${fmt(biWeeklyResult.hack153InterestSaved)}`,
    ];

    const newItem: SavedPayoffItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
      title: "Bi-Weekly Payoff",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedBiWeeklyItems].slice(0, 10);
    setSavedBiWeeklyItems(updated);
    try {
      localStorage.setItem("saved_cc_biweekly", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBiWeekly(true);
    setTimeout(() => setJustSavedBiWeekly(false), 2500);
  };

  const handleSaveUtil = () => {
    const inputStr = `Limit: ${currencySymbol}${utilTotalLimitInput} | Balance: ${currencySymbol}${utilTotalBalanceInput} | Paydown: ${currencySymbol}${utilPaydownMonthlyInput}/mo`;
    const resList = [
      `Current Utilization: ${utilResult.currentUtilizationPct}% (${utilResult.currentStatus})`,
      `Months to <30%: ${utilResult.monthsToUnder30Pct} mos`,
      `Months to <10%: ${utilResult.monthsToUnder10Pct} mos`,
      `Months to 0%: ${utilResult.monthsToZero} mos`,
    ];

    const newItem: SavedPayoffItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
      title: "Credit Utilization",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedUtilItems].slice(0, 10);
    setSavedUtilItems(updated);
    try {
      localStorage.setItem("saved_cc_utilization", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedUtil(true);
    setTimeout(() => setJustSavedUtil(false), 2500);
  };

  const handleSaveCash = () => {
    const inputStr = `Advance: ${currencySymbol}${cashAmountInput} @ ${cashAprInput}% APR | Days: ${cashDaysInput} | Fee: ${cashFeePctInput}% + ${currencySymbol}${cashAtmFeeInput}`;
    const resList = [
      `Total Repayment: ${fmt(cashResult.totalRepaymentCost)}`,
      `Upfront Fees: ${fmt(cashResult.totalUpfrontCharges)}`,
      `Accrued Interest: ${fmt(cashResult.accruedInterest)}`,
      `Annualized Cost: ${cashResult.effectiveAnnualizedCostPct}%`,
    ];

    const newItem: SavedPayoffItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
      title: "Cash Advance",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedCashItems].slice(0, 10);
    setSavedCashItems(updated);
    try {
      localStorage.setItem("saved_cc_cashadvance", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedCash(true);
    setTimeout(() => setJustSavedCash(false), 2500);
  };

  // Multi-Card helpers
  const handleAddCard = () => {
    const newId = (cards.length + 1).toString();
    setCards([...cards, { id: newId, name: `Card ${newId}`, balance: 2000, apr: 22.99, minPayment: 50 }]);
  };

  const handleRemoveCard = (id: string) => {
    if (cards.length <= 1) return;
    setCards(cards.filter((c) => c.id !== id));
  };

  const handleUpdateCard = (id: string, field: keyof MultiCardItem, value: any) => {
    setCards(cards.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  return (
    <div className="space-y-4">
      {/* ========================================================================= */}
      {/* BOX 1: CREDIT CARD CALCULATOR (SINGLE CARD PAYOFF) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Credit Card Calculator</span>
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
              onClick={handleSavePayoff}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
                justSavedPayoff
                  ? "bg-emerald-500 text-white font-bold"
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
            >
              {justSavedPayoff ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
              <span>{justSavedPayoff ? "Saved!" : `Save${savedPayoffItems.length > 0 ? ` (${savedPayoffItems.length})` : ""}`}</span>
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4 space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
            {/* LEFT COLUMN: INPUTS */}
            <div className="lg:col-span-5 space-y-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Card Inputs
              </div>

              {/* Balance & APR */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Card Balance ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={balanceInput}
                    onChange={(e) => setBalanceInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Interest Rate / APR (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={aprInput}
                    onChange={(e) => setAprInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* PAYOFF STRATEGY SELECTOR */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Payoff Strategy
                </label>
                <div className="grid grid-cols-3 gap-1 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setPayoffMode("A")}
                    className={`py-1 rounded-lg cursor-pointer transition-all ${
                      payoffMode === "A"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-300/50"
                    }`}
                  >
                    Fixed Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayoffMode("B")}
                    className={`py-1 rounded-lg cursor-pointer transition-all ${
                      payoffMode === "B"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-300/50"
                    }`}
                  >
                    Target Time
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayoffMode("C")}
                    className={`py-1 rounded-lg cursor-pointer transition-all ${
                      payoffMode === "C"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-300/50"
                    }`}
                  >
                    Minimum Only
                  </button>
                </div>
              </div>

              {/* CONDITIONAL STRATEGY INPUTS */}
              {payoffMode === "A" && (
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Monthly Payment Amount ({currencySymbol}/mo)
                  </label>
                  <input
                    type="number"
                    value={monthlyPaymentInput}
                    onChange={(e) => setMonthlyPaymentInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}

              {payoffMode === "B" && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Target Years
                    </label>
                    <input
                      type="number"
                      value={targetYearsInput}
                      onChange={(e) => setTargetYearsInput(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Target Months
                    </label>
                    <input
                      type="number"
                      value={targetMonthsInput}
                      onChange={(e) => setTargetMonthsInput(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              )}

              {payoffMode === "C" && (
                <div className="space-y-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Minimum Payment Rule
                    </label>
                    <select
                      value={minPaymentRule}
                      onChange={(e: any) => setMinPaymentRule(e.target.value)}
                      className="w-full h-9 px-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold text-xs shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="1_plus_interest">Interest + 1% Balance</option>
                      <option value="2_percent">2.0% of Balance</option>
                      <option value="2.5_percent">2.5% of Balance</option>
                      <option value="3_percent">3.0% of Balance</option>
                      <option value="4_percent">4.0% of Balance</option>
                      <option value="5_percent">5.0% of Balance</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Minimum Dollar Floor ({currencySymbol})
                    </label>
                    <input
                      type="number"
                      value={minPaymentFloor}
                      onChange={(e) => setMinPaymentFloor(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              )}

              {/* EXTRA ACCELERATORS */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Extra Monthly ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={extraMonthlyInput}
                    onChange={(e) => setExtraMonthlyInput(e.target.value)}
                    placeholder="0"
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    One-Time Lump Sum ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={lumpSumInput}
                    onChange={(e) => setLumpSumInput(e.target.value)}
                    placeholder="0"
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: OUTPUTS */}
            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                {payoffResult.isNeverEnding ? (
                  <div className="p-2.5 bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-xs font-bold">
                    {payoffResult.warningMessage}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-blue-600 dark:text-blue-400 block">
                          Payoff Timeline
                        </span>
                        <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
                          {Math.floor(payoffResult.monthsToPayoff / 12) > 0 && `${Math.floor(payoffResult.monthsToPayoff / 12)} Yrs `}
                          {payoffResult.monthsToPayoff % 12} Mos
                          <span className="text-xs font-bold text-slate-500 ml-1.5 font-sans">
                            ({payoffResult.monthsToPayoff} months)
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                          Payoff Date
                        </span>
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          {payoffResult.payoffDate}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                      <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase block">Monthly Payment</span>
                        <span className="font-mono text-sm text-slate-900 dark:text-slate-100">{fmt(payoffResult.monthlyPayment)}</span>
                      </div>

                      <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase block">Total Interest</span>
                        <span className="font-mono text-sm text-amber-600">{fmt(payoffResult.totalInterestPaid)}</span>
                      </div>

                      <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase block">Total Paid</span>
                        <span className="font-mono text-sm text-blue-600">{fmt(payoffResult.totalAmountPaid)}</span>
                      </div>
                    </div>

                    {/* PRINCIPAL VS INTEREST SPLIT */}
                    <div className="space-y-1 pt-1">
                      <div className="w-full h-3 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 flex">
                        <div
                          style={{ width: `${100 - payoffResult.interestRatio}%` }}
                          className="bg-blue-600"
                        />
                        <div
                          style={{ width: `${payoffResult.interestRatio}%` }}
                          className="bg-amber-500"
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400">
                        <span>Principal: {fmt(Number(balanceInput) || 0)} ({(100 - payoffResult.interestRatio).toFixed(0)}%)</span>
                        <span>Interest: {fmt(payoffResult.totalInterestPaid)} ({payoffResult.interestRatio.toFixed(0)}%)</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* AMORTIZATION SCHEDULE */}
              {!payoffResult.isNeverEnding && payoffResult.schedule.length > 0 && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                      Amortization Schedule
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const headers = ["Month", "Starting Balance", "Payment", "Principal", "Interest", "Ending Balance"];
                          const rows = payoffResult.schedule.map((r) => [
                            r.month,
                            r.startingBalance.toFixed(2),
                            r.monthlyPayment.toFixed(2),
                            r.principalPaid.toFixed(2),
                            r.interestPaid.toFixed(2),
                            r.endingBalance.toFixed(2),
                          ]);
                          const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
                          triggerCsvDownload(`credit_card_amortization_schedule.csv`, csv);
                        }}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 rounded-lg text-[11px] font-bold flex items-center gap-1 border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors"
                      >
                        <Download className="w-3 h-3" /> Export CSV
                      </button>
                      <input
                        type="text"
                        placeholder="Search month..."
                        value={tableSearch}
                        onChange={(e) => {
                          setTableSearch(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="h-6 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold focus:outline-none w-28"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto max-h-44 overflow-y-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 font-sans font-bold uppercase text-[9px]">
                          <th className="py-1 px-1.5">Month</th>
                          <th className="py-1 px-1.5">Starting</th>
                          <th className="py-1 px-1.5">Payment</th>
                          <th className="py-1 px-1.5">Principal</th>
                          <th className="py-1 px-1.5">Interest</th>
                          <th className="py-1 px-1.5">Ending</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
                        {currentSchedulePage.map((row) => (
                          <tr key={row.month} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            <td className="py-1 px-1.5 font-bold font-sans">M{row.month}</td>
                            <td className="py-1 px-1.5 text-slate-600 dark:text-slate-400">{fmt(row.startingBalance)}</td>
                            <td className="py-1 px-1.5 font-bold text-slate-900 dark:text-slate-100">{fmt(row.monthlyPayment)}</td>
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
          {savedPayoffItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Single Card Calculations ({savedPayoffItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPayoffItems([]);
                    localStorage.removeItem("saved_cc_payoff");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedPayoffItems.map((item) => (
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
                            const updated = savedPayoffItems.filter((i) => i.id !== item.id);
                            setSavedPayoffItems(updated);
                            localStorage.setItem("saved_cc_payoff", JSON.stringify(updated));
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
      {/* BOX 2: MULTI-CARD PAYOFF CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Multi-Card Payoff Calculator</span>
          <button
            type="button"
            onClick={handleSaveMultiCard}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedMultiCard
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedMultiCard ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedMultiCard ? "Saved!" : `Save${savedMultiCardItems.length > 0 ? ` (${savedMultiCardItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Cards List ({cards.length})
                </span>
                <button
                  type="button"
                  onClick={handleAddCard}
                  className="px-2 py-0.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Card
                </button>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-0.5">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={card.name}
                        onChange={(e) => handleUpdateCard(card.id, "name", e.target.value)}
                        className="font-bold text-slate-900 dark:text-slate-100 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-none w-32 text-xs"
                      />
                      {cards.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveCard(card.id)}
                          className="text-slate-400 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold">Balance</span>
                        <input
                          type="number"
                          value={card.balance}
                          onChange={(e) => handleUpdateCard(card.id, "balance", Number(e.target.value))}
                          className="w-full h-7 px-1.5 rounded border border-slate-300 dark:border-slate-700 font-mono font-bold text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold">APR %</span>
                        <input
                          type="number"
                          step="0.1"
                          value={card.apr}
                          onChange={(e) => handleUpdateCard(card.id, "apr", Number(e.target.value))}
                          className="w-full h-7 px-1.5 rounded border border-slate-300 dark:border-slate-700 font-mono font-bold text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold">Min Pmt</span>
                        <input
                          type="number"
                          value={card.minPayment}
                          onChange={(e) => handleUpdateCard(card.id, "minPayment", Number(e.target.value))}
                          className="w-full h-7 px-1.5 rounded border border-slate-300 dark:border-slate-700 font-mono font-bold text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Total Monthly Budget ({currencySymbol}/mo)
                </label>
                <input
                  type="number"
                  value={totalBudgetInput}
                  onChange={(e) => setTotalBudgetInput(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Avalanche vs Snowball Payoff
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border-2 border-blue-600 space-y-1">
                    <span className="font-extrabold text-blue-600 text-xs font-sans block">Avalanche (Highest APR 1st)</span>
                    <div>Payoff: <strong>{multiCardResult.avalanche.monthsToDebtFree} Mos</strong></div>
                    <div>Interest: <strong className="text-emerald-600">{fmt(multiCardResult.avalanche.totalInterestPaid)}</strong></div>
                    <div className="text-[10px] text-slate-500 font-sans">{multiCardResult.avalanche.debtFreeDate}</div>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 space-y-1">
                    <span className="font-extrabold text-slate-700 dark:text-slate-300 text-xs font-sans block">Snowball (Smallest Bal 1st)</span>
                    <div>Payoff: <strong>{multiCardResult.snowball.monthsToDebtFree} Mos</strong></div>
                    <div>Interest: <strong>{fmt(multiCardResult.snowball.totalInterestPaid)}</strong></div>
                    <div className="text-[10px] text-slate-500 font-sans">{multiCardResult.snowball.debtFreeDate}</div>
                  </div>
                </div>

                <div className="p-2.5 bg-blue-100/70 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-medium text-blue-900 dark:text-blue-200">
                  Avalanche saves you <strong>{fmt(multiCardResult.avalancheInterestSavedVsSnowball)}</strong> in interest compared to Snowball.
                </div>
              </div>
            </div>
          </div>

          {/* SAVED MULTI-CARD ITEMS */}
          {savedMultiCardItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Multi-Card Plans ({savedMultiCardItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedMultiCardItems([]);
                    localStorage.removeItem("saved_cc_multicard");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedMultiCardItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedMultiCardItems.filter((i) => i.id !== item.id);
                            setSavedMultiCardItems(updated);
                            localStorage.setItem("saved_cc_multicard", JSON.stringify(updated));
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
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
      {/* BOX 3: BALANCE TRANSFER CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Balance Transfer Calculator</span>
          <button
            type="button"
            onClick={handleSaveTransfer}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedTransfer
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedTransfer ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedTransfer ? "Saved!" : `Save${savedTransferItems.length > 0 ? ` (${savedTransferItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Transfer Inputs
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Balance ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={transferBalanceInput}
                    onChange={(e) => setTransferBalanceInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Current APR %
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={transferCurrentAprInput}
                    onChange={(e) => setTransferCurrentAprInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    0% Promo (Mos)
                  </label>
                  <input
                    type="number"
                    value={transferPromoMonthsInput}
                    onChange={(e) => setTransferPromoMonthsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Fee %
                  </label>
                  <input
                    type="number"
                    value={transferFeePctInput}
                    onChange={(e) => setTransferFeePctInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Monthly ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={transferMonthlyPmtInput}
                    onChange={(e) => setTransferMonthlyPmtInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-emerald-600 block">Net Savings</span>
                    <div className="text-2xl font-mono font-extrabold text-emerald-600">{fmt(transferResult.netSavings)}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Break-Even</span>
                    <span className="text-xs font-bold font-mono">Month {transferResult.breakEvenMonth}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold font-mono">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans uppercase block">Transfer Fee</span>
                    <span>{fmt(transferResult.transferFeeAmount)}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans uppercase block">Monthly to Clear in 0%</span>
                    <span className="text-blue-600">{fmt(transferResult.requiredMonthlyToClearInPromo)}/mo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED BALANCE TRANSFERS */}
          {savedTransferItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Balance Transfers ({savedTransferItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedTransferItems([]);
                    localStorage.removeItem("saved_cc_transfer");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedTransferItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedTransferItems.filter((i) => i.id !== item.id);
                            setSavedTransferItems(updated);
                            localStorage.setItem("saved_cc_transfer", JSON.stringify(updated));
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
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
      {/* BOX 4: BI-WEEKLY PAYOFF CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Bi-Weekly Payoff Calculator</span>
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
                Bi-Weekly Inputs
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Card Balance ({currencySymbol})
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
                    APR %
                  </label>
                  <input
                    type="number"
                    value={biWeeklyAprInput}
                    onChange={(e) => setBiWeeklyAprInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Monthly Payment ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={biWeeklyMonthlyPmtInput}
                    onChange={(e) => setBiWeeklyMonthlyPmtInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 text-xs font-mono">
                <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400 font-sans">
                  Acceleration Results
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border space-y-1">
                    <span className="font-bold text-blue-600 font-sans block text-xs">Bi-Weekly (26 Pmts/Yr)</span>
                    <div>Payment: {fmt(biWeeklyResult.biWeeklyPayment)}/2wks</div>
                    <div>Payoff: {biWeeklyResult.biWeeklyMonths} Mos</div>
                    <div className="text-emerald-600 font-bold">Saved: {fmt(biWeeklyResult.biWeeklyInterestSaved)}</div>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border space-y-1">
                    <span className="font-bold text-indigo-600 font-sans block text-xs">15-3 Hack (ADB Compression)</span>
                    <div>Payoff: {biWeeklyResult.hack153Months} Mos</div>
                    <div className="text-emerald-600 font-bold">Saved: {fmt(biWeeklyResult.hack153InterestSaved)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED BI-WEEKLY CALCULATIONS */}
          {savedBiWeeklyItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Bi-Weekly Calculations ({savedBiWeeklyItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedBiWeeklyItems([]);
                    localStorage.removeItem("saved_cc_biweekly");
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
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedBiWeeklyItems.filter((i) => i.id !== item.id);
                            setSavedBiWeeklyItems(updated);
                            localStorage.setItem("saved_cc_biweekly", JSON.stringify(updated));
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
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
      {/* BOX 5: CREDIT UTILIZATION CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Credit Utilization Calculator</span>
          <button
            type="button"
            onClick={handleSaveUtil}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedUtil
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedUtil ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedUtil ? "Saved!" : `Save${savedUtilItems.length > 0 ? ` (${savedUtilItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Utilization Inputs
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Total Limit ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={utilTotalLimitInput}
                    onChange={(e) => setUtilTotalLimitInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Total Balance ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={utilTotalBalanceInput}
                    onChange={(e) => setUtilTotalBalanceInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Monthly Paydown ({currencySymbol}/mo)
                </label>
                <input
                  type="number"
                  value={utilPaydownMonthlyInput}
                  onChange={(e) => setUtilPaydownMonthlyInput(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-xs font-extrabold uppercase text-slate-500">Utilization Ratio</span>
                  <span className="text-xl font-mono font-extrabold text-blue-600">{utilResult.currentUtilizationPct}%</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border text-center">
                    <span className="text-[9px] text-slate-400 font-sans block">&lt;30% Safe</span>
                    <span>{utilResult.monthsToUnder30Pct} Mos</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border text-center">
                    <span className="text-[9px] text-slate-400 font-sans block">&lt;10% Ideal</span>
                    <span>{utilResult.monthsToUnder10Pct} Mos</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border text-center">
                    <span className="text-[9px] text-slate-400 font-sans block">0% Debt-Free</span>
                    <span className="text-blue-600">{utilResult.monthsToZero} Mos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED UTILIZATION CALCULATIONS */}
          {savedUtilItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Utilization Plans ({savedUtilItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedUtilItems([]);
                    localStorage.removeItem("saved_cc_utilization");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedUtilItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedUtilItems.filter((i) => i.id !== item.id);
                            setSavedUtilItems(updated);
                            localStorage.setItem("saved_cc_utilization", JSON.stringify(updated));
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
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
      {/* BOX 6: CASH ADVANCE CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Cash Advance Calculator</span>
          <button
            type="button"
            onClick={handleSaveCash}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedCash
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedCash ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedCash ? "Saved!" : `Save${savedCashItems.length > 0 ? ` (${savedCashItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Advance Inputs
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Amount ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={cashAmountInput}
                    onChange={(e) => setCashAmountInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    APR %
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={cashAprInput}
                    onChange={(e) => setCashAprInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Fee %
                  </label>
                  <input
                    type="number"
                    value={cashFeePctInput}
                    onChange={(e) => setCashFeePctInput(e.target.value)}
                    className="w-full h-7 px-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    ATM ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={cashAtmFeeInput}
                    onChange={(e) => setCashAtmFeeInput(e.target.value)}
                    className="w-full h-7 px-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Days
                  </label>
                  <input
                    type="number"
                    value={cashDaysInput}
                    onChange={(e) => setCashDaysInput(e.target.value)}
                    className="w-full h-7 px-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-sans font-bold text-slate-500 uppercase text-[10px]">Total Cost</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-slate-100">{fmt(cashResult.totalRepaymentCost)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded border">
                    <span className="text-[9px] text-slate-400 font-sans uppercase block">Upfront Fees</span>
                    <span>{fmt(cashResult.totalUpfrontCharges)}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded border">
                    <span className="text-[9px] text-slate-400 font-sans uppercase block">Accrued Interest</span>
                    <span className="text-red-600">{fmt(cashResult.accruedInterest)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED CASH ADVANCES */}
          {savedCashItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Cash Advances ({savedCashItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCashItems([]);
                    localStorage.removeItem("saved_cc_cashadvance");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedCashItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedCashItems.filter((i) => i.id !== item.id);
                            setSavedCashItems(updated);
                            localStorage.setItem("saved_cc_cashadvance", JSON.stringify(updated));
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
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
