"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  Check,
  Plus,
} from "lucide-react";
import {
  calculateMultiCardPayoff,
  calculateFixedPaymentPayoff,
  calculateTargetTimeframePayoff,
  calculateBalanceTransfer,
  calculateDailyFinanceCharge,
  CreditCardItem,
} from "@/lib/calculator-engine/formulas/credit-card-payoff";

export interface SavedPayoffItem {
  id: string;
  title: string;
  inputs: string;
  result: string;
  resultsList: string[];
  timestamp: string;
}

export function CreditCardPayoffCalculator() {
  // Simple Currency Selector with Dollar ($) as default
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // ==========================================
  // BOX 1: MULTI-CARD DEBT AVALANCHE / SNOWBALL
  // ==========================================
  const [cards, setCards] = useState<CreditCardItem[]>([
    { id: "1", name: "Card 1", balance: 4600, minPayment: 100, interestRatePct: 18.99 },
    { id: "2", name: "Card 2", balance: 3900, minPayment: 90, interestRatePct: 19.99 },
    { id: "3", name: "Card 3", balance: 6000, minPayment: 120, interestRatePct: 15.99 },
  ]);
  const [monthlyBudgetInput, setMonthlyBudgetInput] = useState<string>("500");
  const [strategyInput, setStrategyInput] = useState<"avalanche" | "snowball">("avalanche");

  // Table search and pagination
  const [tableSearch, setTableSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 6;

  // Saved state for Box 1
  const [savedCoreItems, setSavedCoreItems] = useState<SavedPayoffItem[]>([]);
  const [justSavedCore, setJustSavedCore] = useState<boolean>(false);

  // ==========================================
  // BOX 2: FIXED MONTHLY PAYMENT PAYOFF SOLVER
  // ==========================================
  const [singleBalInput, setSingleBalInput] = useState<string>("5000");
  const [singleAprInput, setSingleAprInput] = useState<string>("21.99");
  const [singlePmtInput, setSinglePmtInput] = useState<string>("200");
  const [singleSpendInput, setSingleSpendInput] = useState<string>("0");
  const [savedSingleItems, setSavedSingleItems] = useState<SavedPayoffItem[]>([]);
  const [justSavedSingle, setJustSavedSingle] = useState<boolean>(false);

  // ==========================================
  // BOX 3: TARGET PAYOFF DATE / TIMEFRAME
  // ==========================================
  const [targetBalInput, setTargetBalInput] = useState<string>("8000");
  const [targetAprInput, setTargetAprInput] = useState<string>("22.5");
  const [targetMonthsInput, setTargetMonthsInput] = useState<string>("24");
  const [savedTargetItems, setSavedTargetItems] = useState<SavedPayoffItem[]>([]);
  const [justSavedTarget, setJustSavedTarget] = useState<boolean>(false);

  // ==========================================
  // BOX 4: MINIMUM PAYMENT TRAP COMPARER
  // ==========================================
  const [trapBalInput, setTrapBalInput] = useState<string>("6000");
  const [trapAprInput, setTrapAprInput] = useState<string>("24.0");
  const [savedTrapItems, setSavedTrapItems] = useState<SavedPayoffItem[]>([]);
  const [justSavedTrap, setJustSavedTrap] = useState<boolean>(false);

  // ==========================================
  // BOX 5: 0% BALANCE TRANSFER OPTIMIZER
  // ==========================================
  const [btBalInput, setBtBalInput] = useState<string>("7500");
  const [btAprInput, setBtAprInput] = useState<string>("22.0");
  const [btFeeInput, setBtFeeInput] = useState<string>("3.0");
  const [btPromoMonthsInput, setBtPromoMonthsInput] = useState<string>("18");
  const [savedBtItems, setSavedBtItems] = useState<SavedPayoffItem[]>([]);
  const [justSavedBt, setJustSavedBt] = useState<boolean>(false);

  // ==========================================
  // BOX 6: DAILY PERIODIC RATE & FINANCE CHARGES
  // ==========================================
  const [dprBalInput, setDprBalInput] = useState<string>("4000");
  const [dprAprInput, setDprAprInput] = useState<string>("24.99");
  const [dprDaysInput, setDprDaysInput] = useState<string>("30");
  const [savedDprItems, setSavedDprItems] = useState<SavedPayoffItem[]>([]);
  const [justSavedDpr, setJustSavedDpr] = useState<boolean>(false);

  // Load saved calculations on mount
  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_payoff_core");
      if (s1) setSavedCoreItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_payoff_single");
      if (s2) setSavedSingleItems(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_payoff_target");
      if (s3) setSavedTargetItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_payoff_trap");
      if (s4) setSavedTrapItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_payoff_bt");
      if (s5) setSavedBtItems(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_payoff_dpr");
      if (s6) setSavedDprItems(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Format currency helper
  const fmt = (num: number) => {
    return `${currencySymbol}${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Card list modification helpers
  const handleAddCard = () => {
    if (cards.length >= 8) return;
    const newId = (cards.length + 1).toString();
    setCards([...cards, { id: newId, name: `Card ${newId}`, balance: 2000, minPayment: 50, interestRatePct: 20.0 }]);
  };

  const handleRemoveCard = (id: string) => {
    if (cards.length <= 1) return;
    setCards(cards.filter((c) => c.id !== id));
  };

  const handleUpdateCard = (id: string, field: keyof CreditCardItem, val: any) => {
    setCards(
      cards.map((c) => (c.id === id ? { ...c, [field]: field === "name" ? val : Number(val) || 0 } : c))
    );
  };

  // ==========================================
  // 1. COMPUTED RESULTS: MULTI-CARD PAYOFF
  // ==========================================
  const multiResult = useMemo(() => {
    return calculateMultiCardPayoff(cards, Number(monthlyBudgetInput) || 0, strategyInput);
  }, [cards, monthlyBudgetInput, strategyInput]);

  // Schedule filtering & pagination
  const filteredSchedule = useMemo(() => {
    if (!multiResult.schedule) return [];
    if (!tableSearch.trim()) return multiResult.schedule;
    return multiResult.schedule.filter(
      (row) =>
        row.month.toString().includes(tableSearch) ||
        row.totalRemainingBalance.toString().includes(tableSearch) ||
        row.totalInterest.toString().includes(tableSearch)
    );
  }, [multiResult.schedule, tableSearch]);

  const totalPages = Math.ceil(filteredSchedule.length / rowsPerPage) || 1;
  const currentSchedulePage = filteredSchedule.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ==========================================
  // 2. COMPUTED RESULTS: SINGLE CARD FIXED PAYMENT
  // ==========================================
  const singleResult = useMemo(() => {
    return calculateFixedPaymentPayoff(
      Number(singleBalInput) || 0,
      Number(singleAprInput) || 0,
      Number(singlePmtInput) || 0,
      Number(singleSpendInput) || 0
    );
  }, [singleBalInput, singleAprInput, singlePmtInput, singleSpendInput]);

  // ==========================================
  // 3. COMPUTED RESULTS: TARGET TIMEFRAME
  // ==========================================
  const targetResult = useMemo(() => {
    return calculateTargetTimeframePayoff(
      Number(targetBalInput) || 0,
      Number(targetAprInput) || 0,
      Number(targetMonthsInput) || 1
    );
  }, [targetBalInput, targetAprInput, targetMonthsInput]);

  // ==========================================
  // 4. COMPUTED RESULTS: TRAP COMPARISON
  // ==========================================
  const trapResult = useMemo(() => {
    const bal = Number(trapBalInput) || 0;
    const apr = Number(trapAprInput) || 0;

    const minPmt = Math.max(25, bal * 0.02 + (bal * (apr / 100 / 12)));
    const p1 = calculateFixedPaymentPayoff(bal, apr, minPmt);
    const p2 = calculateFixedPaymentPayoff(bal, apr, minPmt + 50);
    const p3 = calculateFixedPaymentPayoff(bal, apr, minPmt + 100);

    return {
      minPayment: minPmt,
      planMin: p1,
      planPlus50: p2,
      planPlus100: p3,
    };
  }, [trapBalInput, trapAprInput]);

  // ==========================================
  // 5. COMPUTED RESULTS: BALANCE TRANSFER
  // ==========================================
  const btResult = useMemo(() => {
    return calculateBalanceTransfer(
      Number(btBalInput) || 0,
      Number(btAprInput) || 0,
      Number(btFeeInput) || 0,
      Number(btPromoMonthsInput) || 1
    );
  }, [btBalInput, btAprInput, btFeeInput, btPromoMonthsInput]);

  // ==========================================
  // 6. COMPUTED RESULTS: DPR & CHARGES
  // ==========================================
  const dprResult = useMemo(() => {
    return calculateDailyFinanceCharge(
      Number(dprBalInput) || 0,
      Number(dprAprInput) || 0,
      Number(dprDaysInput) || 30
    );
  }, [dprBalInput, dprAprInput, dprDaysInput]);

  // ==========================================
  // SAVE HANDLERS FOR ALL 6 BOXES
  // ==========================================
  const handleSaveCore = () => {
    const inputStr = `${cards.length} Cards (Total: ${currencySymbol}${multiResult.totalStartingDebt.toLocaleString()}) | Budget: ${currencySymbol}${monthlyBudgetInput}/mo | ${strategyInput === "avalanche" ? "Avalanche" : "Snowball"}`;
    const resList = [
      `Debt-Free In: ${multiResult.totalMonths} Months (${multiResult.debtFreeDate})`,
      `Total Interest Paid: ${fmt(multiResult.totalInterestPaid)}`,
      `Total Amount Paid: ${fmt(multiResult.totalAmountPaid)}`,
    ];

    const newItem: SavedPayoffItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: `Multi-Card (${strategyInput === "avalanche" ? "Avalanche" : "Snowball"})`,
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedCoreItems].slice(0, 10);
    setSavedCoreItems(updated);
    try {
      localStorage.setItem("saved_payoff_core", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedCore(true);
    setTimeout(() => setJustSavedCore(false), 2500);
  };

  const handleSaveSingle = () => {
    const inputStr = `Balance: ${currencySymbol}${singleBalInput} @ ${singleAprInput}% | Payment: ${currencySymbol}${singlePmtInput}/mo`;
    const resList = [
      `Payoff Time: ${singleResult.isNeverPayoff ? "Never" : `${singleResult.monthsToPayoff} Months`}`,
      `Total Interest: ${singleResult.isNeverPayoff ? "N/A" : fmt(singleResult.totalInterestPaid)}`,
      `Total Paid: ${singleResult.isNeverPayoff ? "N/A" : fmt(singleResult.totalAmountPaid)}`,
    ];

    const newItem: SavedPayoffItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Fixed Payment Payoff",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedSingleItems].slice(0, 10);
    setSavedSingleItems(updated);
    try {
      localStorage.setItem("saved_payoff_single", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedSingle(true);
    setTimeout(() => setJustSavedSingle(false), 2500);
  };

  const handleSaveTarget = () => {
    const inputStr = `Balance: ${currencySymbol}${targetBalInput} @ ${targetAprInput}% | Goal: ${targetMonthsInput} Mos`;
    const resList = [
      `Required Monthly Payment: ${fmt(targetResult.requiredMonthlyPayment)}/mo`,
      `Total Interest: ${fmt(targetResult.totalInterestPaid)}`,
      `Total Paid: ${fmt(targetResult.totalAmountPaid)}`,
    ];

    const newItem: SavedPayoffItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Target Payoff Goal",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedTargetItems].slice(0, 10);
    setSavedTargetItems(updated);
    try {
      localStorage.setItem("saved_payoff_target", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedTarget(true);
    setTimeout(() => setJustSavedTarget(false), 2500);
  };

  const handleSaveTrap = () => {
    const inputStr = `Balance: ${currencySymbol}${trapBalInput} @ ${trapAprInput}% APR`;
    const resList = [
      `Min Payment (${fmt(trapResult.minPayment)}/mo): ${trapResult.planMin.monthsToPayoff} Mos | ${fmt(trapResult.planMin.totalInterestPaid)} Int`,
      `+$50/mo Plan: ${trapResult.planPlus50.monthsToPayoff} Mos | ${fmt(trapResult.planPlus50.totalInterestPaid)} Int`,
      `+$100/mo Plan: ${trapResult.planPlus100.monthsToPayoff} Mos | ${fmt(trapResult.planPlus100.totalInterestPaid)} Int`,
    ];

    const newItem: SavedPayoffItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Minimum Payment Trap",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedTrapItems].slice(0, 10);
    setSavedTrapItems(updated);
    try {
      localStorage.setItem("saved_payoff_trap", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedTrap(true);
    setTimeout(() => setJustSavedTrap(false), 2500);
  };

  const handleSaveBt = () => {
    const inputStr = `Transfer: ${currencySymbol}${btBalInput} @ ${btAprInput}% -> 0% for ${btPromoMonthsInput} Mos (${btFeeInput}% Fee)`;
    const resList = [
      `Net Savings: ${fmt(btResult.netSavingsWithTransfer)}`,
      `Monthly Payment: ${fmt(btResult.monthlyPmtToClearInPromo)}/mo`,
      `Transfer Fee: ${fmt(btResult.transferFeeAmount)}`,
    ];

    const newItem: SavedPayoffItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "0% Balance Transfer",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedBtItems].slice(0, 10);
    setSavedBtItems(updated);
    try {
      localStorage.setItem("saved_payoff_bt", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBt(true);
    setTimeout(() => setJustSavedBt(false), 2500);
  };

  const handleSaveDpr = () => {
    const inputStr = `Balance: ${currencySymbol}${dprBalInput} @ ${dprAprInput}% APR`;
    const resList = [
      `Daily Rate: ${dprResult.dailyPeriodicRatePct.toFixed(4)}%/day`,
      `Monthly Interest Charge: ${fmt(dprResult.monthlyFinanceCharge)}/mo`,
      `Daily Charge: ${fmt(dprResult.dailyFinanceCharge)}/day`,
    ];

    const newItem: SavedPayoffItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Daily Finance Charges",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedDprItems].slice(0, 10);
    setSavedDprItems(updated);
    try {
      localStorage.setItem("saved_payoff_dpr", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedDpr(true);
    setTimeout(() => setJustSavedDpr(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* ========================================================================= */}
      {/* BOX 1: MULTI-CARD DEBT AVALANCHE & SNOWBALL SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Multi-Card Debt Payoff Suite (Avalanche vs. Snowball)</span>
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
            {/* LEFT COLUMN: MULTI-CARD INPUTS */}
            <div className="lg:col-span-6 space-y-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Credit Card Debt Roster ({cards.length} Cards)
                </span>
                <button
                  type="button"
                  onClick={handleAddCard}
                  disabled={cards.length >= 8}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer disabled:opacity-40"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Card
                </button>
              </div>

              {/* Card List Table */}
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-0.5">
                {cards.map((card, idx) => (
                  <div
                    key={card.id}
                    className="grid grid-cols-12 gap-1.5 items-center p-1.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs"
                  >
                    <div className="col-span-3">
                      <input
                        type="text"
                        value={card.name}
                        onChange={(e) => handleUpdateCard(card.id, "name", e.target.value)}
                        className="w-full h-7 px-1.5 rounded border border-slate-200 dark:border-slate-700 font-bold text-[11px]"
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="number"
                        placeholder="Bal ($)"
                        value={card.balance || ""}
                        onChange={(e) => handleUpdateCard(card.id, "balance", e.target.value)}
                        className="w-full h-7 px-1.5 rounded border border-slate-200 dark:border-slate-700 font-mono font-bold text-[11px]"
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="number"
                        placeholder="Min ($)"
                        value={card.minPayment || ""}
                        onChange={(e) => handleUpdateCard(card.id, "minPayment", e.target.value)}
                        className="w-full h-7 px-1.5 rounded border border-slate-200 dark:border-slate-700 font-mono font-bold text-[11px]"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="APR %"
                        value={card.interestRatePct || ""}
                        onChange={(e) => handleUpdateCard(card.id, "interestRatePct", e.target.value)}
                        className="w-full h-7 px-1 rounded border border-slate-200 dark:border-slate-700 font-mono font-bold text-[11px]"
                      />
                    </div>
                    <div className="col-span-1 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveCard(card.id)}
                        disabled={cards.length <= 1}
                        className="text-slate-400 hover:text-red-600 disabled:opacity-30 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Monthly Budget & Strategy Selector */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Total Monthly Budget ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={monthlyBudgetInput}
                    onChange={(e) => setMonthlyBudgetInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Payoff Strategy
                  </label>
                  <select
                    value={strategyInput}
                    onChange={(e: any) => setStrategyInput(e.target.value)}
                    className="w-full h-9 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                  >
                    <option value="avalanche">Debt Avalanche (Highest APR First)</option>
                    <option value="snowball">Debt Snowball (Lowest Bal First)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: OUTPUTS */}
            <div className="lg:col-span-6 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 dark:text-blue-400 block">
                      Months to Total Debt Freedom
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
                      {multiResult.totalMonths} Months
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                      Debt-Free Target Date
                    </span>
                    <span className="text-sm font-bold font-mono text-emerald-600">
                      {multiResult.debtFreeDate}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Starting Debt</span>
                    <span className="font-mono text-sm text-slate-900 dark:text-slate-100">{fmt(multiResult.totalStartingDebt)}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Total Interest</span>
                    <span className="font-mono text-sm text-amber-600">{fmt(multiResult.totalInterestPaid)}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Total Cost</span>
                    <span className="font-mono text-sm text-blue-600">{fmt(multiResult.totalAmountPaid)}</span>
                  </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="space-y-1 pt-1">
                  <div className="w-full h-3 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 flex">
                    <div
                      style={{
                        width: `${
                          multiResult.totalAmountPaid > 0
                            ? (multiResult.totalStartingDebt / multiResult.totalAmountPaid) * 100
                            : 80
                        }%`,
                      }}
                      className="bg-blue-600"
                    />
                    <div
                      style={{
                        width: `${
                          multiResult.totalAmountPaid > 0
                            ? (multiResult.totalInterestPaid / multiResult.totalAmountPaid) * 100
                            : 20
                        }%`,
                      }}
                      className="bg-amber-500"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400">
                    <span>Principal: {fmt(multiResult.totalStartingDebt)}</span>
                    <span>Finance Interest: {fmt(multiResult.totalInterestPaid)}</span>
                  </div>
                </div>
              </div>

              {/* MULTI-CARD SCHEDULE TABLE */}
              {multiResult.schedule.length > 0 && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                      Monthly Debt Roll-Down Schedule
                    </span>
                    <input
                      type="text"
                      placeholder="Search month..."
                      value={tableSearch}
                      onChange={(e) => {
                        setTableSearch(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="h-6 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold focus:outline-none w-32"
                    />
                  </div>

                  <div className="overflow-x-auto max-h-40 overflow-y-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 font-sans font-bold uppercase text-[9px]">
                          <th className="py-1 px-1.5">Month</th>
                          <th className="py-1 px-1.5">Payment</th>
                          <th className="py-1 px-1.5">Interest</th>
                          <th className="py-1 px-1.5">Principal</th>
                          <th className="py-1 px-1.5">Remaining Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
                        {currentSchedulePage.map((row) => (
                          <tr key={row.month} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            <td className="py-1 px-1.5 font-bold font-sans">Month {row.month}</td>
                            <td className="py-1 px-1.5">{fmt(row.totalPayment)}</td>
                            <td className="py-1 px-1.5 text-amber-600">{fmt(row.totalInterest)}</td>
                            <td className="py-1 px-1.5 text-blue-600 font-bold">{fmt(row.totalPrincipal)}</td>
                            <td className="py-1 px-1.5 font-bold text-slate-900 dark:text-slate-100">{fmt(row.totalRemainingBalance)}</td>
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
                  Saved Multi-Card Plans ({savedCoreItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCoreItems([]);
                    localStorage.removeItem("saved_payoff_core");
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
                            localStorage.setItem("saved_payoff_core", JSON.stringify(updated));
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
      {/* BOX 2: FIXED MONTHLY PAYMENT PAYOFF SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Fixed Monthly Payment Payoff Solver (Single Card)</span>
          <button
            type="button"
            onClick={handleSaveSingle}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedSingle
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedSingle ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedSingle ? "Saved!" : `Save${savedSingleItems.length > 0 ? ` (${savedSingleItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Single Card Inputs
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Card Balance ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={singleBalInput}
                    onChange={(e) => setSingleBalInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    APR (% Interest)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={singleAprInput}
                    onChange={(e) => setSingleAprInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Monthly Payment ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={singlePmtInput}
                    onChange={(e) => setSinglePmtInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Monthly Add. Spend ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={singleSpendInput}
                    onChange={(e) => setSingleSpendInput(e.target.value)}
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
                      Payoff Timeline
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-blue-600">
                      {singleResult.isNeverPayoff ? "Never (Payment too low)" : `${singleResult.monthsToPayoff} Months`}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Debt-Free Date</span>
                    <span className="text-sm font-bold font-mono text-emerald-600">
                      {singleResult.debtFreeDate}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Total Interest Paid</span>
                    <span className="text-amber-600">{singleResult.isNeverPayoff ? "∞" : fmt(singleResult.totalInterestPaid)}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Grand Total Paid</span>
                    <span>{singleResult.isNeverPayoff ? "∞" : fmt(singleResult.totalAmountPaid)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED SINGLE LIST */}
          {savedSingleItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Single Card Plans ({savedSingleItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedSingleItems([]);
                    localStorage.removeItem("saved_payoff_single");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedSingleItems.map((item) => (
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
      {/* BOX 3: TARGET PAYOFF DATE / TIMEFRAME SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Target Payoff Date / Timeframe Solver</span>
          <button
            type="button"
            onClick={handleSaveTarget}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedTarget
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedTarget ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedTarget ? "Saved!" : `Save${savedTargetItems.length > 0 ? ` (${savedTargetItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Target Timeline Parameters
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Card Balance ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={targetBalInput}
                  onChange={(e) => setTargetBalInput(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    APR (% Interest)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={targetAprInput}
                    onChange={(e) => setTargetAprInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Target (Months)
                  </label>
                  <input
                    type="number"
                    value={targetMonthsInput}
                    onChange={(e) => setTargetMonthsInput(e.target.value)}
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
                      Required Monthly Payment
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-blue-600">
                      {fmt(targetResult.requiredMonthlyPayment)}/mo
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Total Repayment</span>
                    <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
                      {fmt(targetResult.totalAmountPaid)}
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border text-xs font-mono font-bold flex justify-between items-center">
                  <span className="text-slate-500 font-sans">Total Interest Incurred Over Goal:</span>
                  <span className="text-amber-600">{fmt(targetResult.totalInterestPaid)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED TARGET LIST */}
          {savedTargetItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Goal Calculations ({savedTargetItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedTargetItems([]);
                    localStorage.removeItem("saved_payoff_target");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedTargetItems.map((item) => (
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
      {/* BOX 4: MINIMUM PAYMENT TRAP COMPARER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Minimum Payment Trap vs. Accelerated Payoff Comparer</span>
          <button
            type="button"
            onClick={handleSaveTrap}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedTrap
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedTrap ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedTrap ? "Saved!" : `Save${savedTrapItems.length > 0 ? ` (${savedTrapItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-4 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Card Parameters
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Card Balance ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={trapBalInput}
                  onChange={(e) => setTrapBalInput(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Interest Rate (% APR)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={trapAprInput}
                  onChange={(e) => setTrapAprInput(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400 border-b pb-1.5">
                  Minimum Payment Only vs. Accelerated Boost Plans
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b text-[9px] text-slate-500 font-sans uppercase">
                        <th className="py-1 px-1.5">Payoff Plan</th>
                        <th className="py-1 px-1.5">Payment</th>
                        <th className="py-1 px-1.5">Payoff Time</th>
                        <th className="py-1 px-1.5">Total Interest</th>
                        <th className="py-1 px-1.5">Total Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
                      <tr className="hover:bg-slate-100 dark:hover:bg-slate-800/50 bg-red-50/50 dark:bg-red-950/20">
                        <td className="py-1.5 px-1.5 font-bold text-red-600">Minimum Only</td>
                        <td className="py-1.5 px-1.5 font-bold">{fmt(trapResult.minPayment)}/mo</td>
                        <td className="py-1.5 px-1.5 text-red-600 font-bold">{trapResult.planMin.monthsToPayoff} Mos</td>
                        <td className="py-1.5 px-1.5 text-amber-600">{fmt(trapResult.planMin.totalInterestPaid)}</td>
                        <td className="py-1.5 px-1.5">{fmt(trapResult.planMin.totalAmountPaid)}</td>
                      </tr>
                      <tr className="hover:bg-slate-100 dark:hover:bg-slate-800/50">
                        <td className="py-1.5 px-1.5 font-bold text-blue-600">+$50/Month Plan</td>
                        <td className="py-1.5 px-1.5 font-bold">{fmt(trapResult.minPayment + 50)}/mo</td>
                        <td className="py-1.5 px-1.5 text-blue-600 font-bold">{trapResult.planPlus50.monthsToPayoff} Mos</td>
                        <td className="py-1.5 px-1.5 text-amber-600">{fmt(trapResult.planPlus50.totalInterestPaid)}</td>
                        <td className="py-1.5 px-1.5">{fmt(trapResult.planPlus50.totalAmountPaid)}</td>
                      </tr>
                      <tr className="hover:bg-slate-100 dark:hover:bg-slate-800/50 bg-emerald-50/50 dark:bg-emerald-950/20">
                        <td className="py-1.5 px-1.5 font-bold text-emerald-600">+$100/Month Plan</td>
                        <td className="py-1.5 px-1.5 font-bold">{fmt(trapResult.minPayment + 100)}/mo</td>
                        <td className="py-1.5 px-1.5 text-emerald-600 font-bold">{trapResult.planPlus100.monthsToPayoff} Mos</td>
                        <td className="py-1.5 px-1.5 text-amber-600">{fmt(trapResult.planPlus100.totalInterestPaid)}</td>
                        <td className="py-1.5 px-1.5">{fmt(trapResult.planPlus100.totalAmountPaid)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED TRAP LIST */}
          {savedTrapItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Trap Comparisons ({savedTrapItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedTrapItems([]);
                    localStorage.removeItem("saved_payoff_trap");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedTrapItems.map((item) => (
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
      {/* BOX 5: 0% APR BALANCE TRANSFER OPTIMIZER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>0% APR Balance Transfer Promo Optimizer</span>
          <button
            type="button"
            onClick={handleSaveBt}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedBt
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedBt ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedBt ? "Saved!" : `Save${savedBtItems.length > 0 ? ` (${savedBtItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Balance Transfer Inputs
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Current Bal ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={btBalInput}
                    onChange={(e) => setBtBalInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Current APR %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={btAprInput}
                    onChange={(e) => setBtAprInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Promo Months
                  </label>
                  <input
                    type="number"
                    value={btPromoMonthsInput}
                    onChange={(e) => setBtPromoMonthsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Transfer Fee %
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={btFeeInput}
                    onChange={(e) => setBtFeeInput(e.target.value)}
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
                      Net Interest Saved (After Fee)
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-emerald-600">
                      {fmt(btResult.netSavingsWithTransfer)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Monthly Payment to Clear</span>
                    <span className="text-sm font-bold font-mono text-blue-600">
                      {fmt(btResult.monthlyPmtToClearInPromo)}/mo
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Upfront Transfer Fee</span>
                    <span>{fmt(btResult.transferFeeAmount)}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">New Balance with Fee</span>
                    <span>{fmt(btResult.newTransferredBalance)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED BT LIST */}
          {savedBtItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Transfer Plans ({savedBtItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedBtItems([]);
                    localStorage.removeItem("saved_payoff_bt");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBtItems.map((item) => (
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
      {/* BOX 6: DAILY PERIODIC RATE & FINANCE CHARGES */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Daily Periodic Rate (DPR) & Finance Charge Solver</span>
          <button
            type="button"
            onClick={handleSaveDpr}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedDpr
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedDpr ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedDpr ? "Saved!" : `Save${savedDprItems.length > 0 ? ` (${savedDprItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Interest Accrual Parameters
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Statement Balance ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={dprBalInput}
                  onChange={(e) => setDprBalInput(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    APR (% Rate)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={dprAprInput}
                    onChange={(e) => setDprAprInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Billing Days
                  </label>
                  <input
                    type="number"
                    value={dprDaysInput}
                    onChange={(e) => setDprDaysInput(e.target.value)}
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
                      Monthly Finance Interest Charge
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-amber-600">
                      {fmt(dprResult.monthlyFinanceCharge)}/mo
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Daily Periodic Rate</span>
                    <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
                      {dprResult.dailyPeriodicRatePct.toFixed(4)}% / day
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border text-xs font-mono font-bold flex justify-between items-center">
                  <span className="text-slate-500 font-sans">Interest Accruing Per Day:</span>
                  <span className="text-red-600">{fmt(dprResult.dailyFinanceCharge)}/day</span>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED DPR LIST */}
          {savedDprItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Interest Accruals ({savedDprItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedDprItems([]);
                    localStorage.removeItem("saved_payoff_dpr");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedDprItems.map((item) => (
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
