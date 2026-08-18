"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  CreditCard as CardIcon,
  DollarSign,
  PieChart as PieIcon,
  Clock,
  Sparkles,
  Printer,
  Share2,
  Bookmark,
  Award,
  AlertTriangle,
  Info,
  CheckCircle2,
  Sliders,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  BarChart3,
  Layers,
  Search,
  Download,
  FileSpreadsheet,
  Target,
  Zap,
  ShieldCheck,
  Percent,
  Plus,
  Trash2,
  Calendar,
  TrendingDown,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import {
  calculateCreditCardPayoff,
  calculateMultiCardPayoff,
  calculateBalanceTransfer,
  calculateBiWeeklyPayoff,
  calculateCreditUtilization,
  calculateCashAdvance,
  CreditCardPayoffInput,
  MultiCardItem,
} from "@/lib/calculator-engine/formulas/credit-card";
import { CreditCardContent } from "./CreditCardContent";

export interface SavedPayoffItem {
  id: string;
  title: string;
  inputs: string;
  result: string;
  resultsList?: string[];
  timestamp: string;
}

export function CreditCardCalculator() {
  // Currency selector
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // ==========================================
  // BOX 1: SINGLE CARD PAYOFF ENGINE
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
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // ==========================================
  // BOX 2: MULTI-CARD AVALANCHE VS SNOWBALL
  // ==========================================
  const [cards, setCards] = useState<MultiCardItem[]>([
    { id: "1", name: "Sapphire Rewards", balance: 5000, apr: 24.99, minPayment: 130 },
    { id: "2", name: "Freedom Unlimited", balance: 2800, apr: 19.24, minPayment: 75 },
    { id: "3", name: "Store Retail Card", balance: 1200, apr: 28.99, minPayment: 45 },
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
  // BOX 4: BI-WEEKLY & 15-3 HACK ACCELERATOR
  // ==========================================
  const [biWeeklyBalanceInput, setBiWeeklyBalanceInput] = useState<string>("5000");
  const [biWeeklyAprInput, setBiWeeklyAprInput] = useState<string>("20");
  const [biWeeklyMonthlyPmtInput, setBiWeeklyMonthlyPmtInput] = useState<string>("200");
  const [savedBiWeeklyItems, setSavedBiWeeklyItems] = useState<SavedPayoffItem[]>([]);
  const [justSavedBiWeekly, setJustSavedBiWeekly] = useState<boolean>(false);

  // ==========================================
  // BOX 5: CREDIT UTILIZATION & SCORE IMPACT
  // ==========================================
  const [utilTotalLimitInput, setUtilTotalLimitInput] = useState<string>("15000");
  const [utilTotalBalanceInput, setUtilTotalBalanceInput] = useState<string>("6800");
  const [utilPaydownMonthlyInput, setUtilPaydownMonthlyInput] = useState<string>("400");
  const [savedUtilItems, setSavedUtilItems] = useState<SavedPayoffItem[]>([]);
  const [justSavedUtil, setJustSavedUtil] = useState<boolean>(false);

  // ==========================================
  // BOX 6: CASH ADVANCE & EMERGENCY FEE SOLVER
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

  const fmtInt = (num: number) => {
    return `${currencySymbol}${Math.round(num).toLocaleString("en-US")}`;
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
  // SAVE HANDLERS FOR EACH BOX
  // ==========================================
  const handleSavePayoff = () => {
    const inputStr = `Balance: ${currencySymbol}${balanceInput} @ ${aprInput}% APR | Mode: ${payoffMode === "A" ? `Fixed ${currencySymbol}${monthlyPaymentInput}/mo` : payoffMode === "B" ? `Target ${targetYearsInput}y ${targetMonthsInput}m` : `Minimum (${minPaymentRule})`}`;
    const resList = [
      `Time to Debt-Free: ${Math.floor(payoffResult.monthsToPayoff / 12)} yrs ${payoffResult.monthsToPayoff % 12} mos (${payoffResult.monthsToPayoff} total mos)`,
      `Required Monthly Payment: ${fmt(payoffResult.monthlyPayment)}`,
      `Total Interest Paid: ${fmt(payoffResult.totalInterestPaid)}`,
      `Total Amount Paid: ${fmt(payoffResult.totalAmountPaid)}`,
      `Debt-Free Date: ${payoffResult.payoffDate}`,
    ];
    if (payoffResult.minPaymentTrapComparison) {
      resList.push(`Vs Minimums: Saves ${fmt(payoffResult.minPaymentTrapComparison.interestSaved)} & ${payoffResult.minPaymentTrapComparison.monthsSaved} months!`);
    }

    const newItem: SavedPayoffItem = {
      id: Date.now().toString(),
      title: "Credit Card Payoff Plan",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedPayoffItems.filter((i) => i.inputs !== inputStr)].slice(0, 10);
    setSavedPayoffItems(updated);
    try {
      localStorage.setItem("saved_cc_payoff", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedPayoff(true);
    setTimeout(() => setJustSavedPayoff(false), 2000);
  };

  const handleSaveMultiCard = () => {
    const totalBal = cards.reduce((s, c) => s + c.balance, 0);
    const inputStr = `${cards.length} Cards (Total ${currencySymbol}${totalBal}) | Budget: ${currencySymbol}${totalBudgetInput}/mo`;
    const resList = [
      `Avalanche (Lowest Interest): ${multiCardResult.avalanche.monthsToDebtFree} mos | Interest: ${fmt(multiCardResult.avalanche.totalInterestPaid)}`,
      `Snowball (Quick Wins): ${multiCardResult.snowball.monthsToDebtFree} mos | Interest: ${fmt(multiCardResult.snowball.totalInterestPaid)}`,
      `Avalanche Savings vs Snowball: ${fmt(multiCardResult.avalancheInterestSavedVsSnowball)} & ${multiCardResult.avalancheMonthsSavedVsSnowball} mos saved`,
      `Avalanche Savings vs Minimums: ${fmt(multiCardResult.avalancheInterestSavedVsMin)} & ${multiCardResult.avalancheMonthsSavedVsMin} mos saved`,
      `Unified Debt-Free Date: ${multiCardResult.avalanche.debtFreeDate}`,
    ];

    const newItem: SavedPayoffItem = {
      id: Date.now().toString(),
      title: "Multi-Card Avalanche vs Snowball",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedMultiCardItems.filter((i) => i.inputs !== inputStr)].slice(0, 10);
    setSavedMultiCardItems(updated);
    try {
      localStorage.setItem("saved_cc_multicard", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedMultiCard(true);
    setTimeout(() => setJustSavedMultiCard(false), 2000);
  };

  const handleSaveTransfer = () => {
    const inputStr = `Transfer: ${currencySymbol}${transferBalanceInput} from ${transferCurrentAprInput}% to 0% for ${transferPromoMonthsInput} mos (Fee: ${transferFeePctInput}%)`;
    const resList = [
      `Net Interest Saved: ${fmt(transferResult.netSavings)}`,
      `Transfer Fee: ${fmt(transferResult.transferFeeAmount)}`,
      `Monthly to Clear in Promo: ${fmt(transferResult.requiredMonthlyToClearInPromo)}/mo`,
      `Break-Even Month: Month ${transferResult.breakEvenMonth}`,
      `Current Payoff Interest: ${fmt(transferResult.currentTotalInterest)}`,
      `Recommendation: ${transferResult.recommendation}`,
    ];

    const newItem: SavedPayoffItem = {
      id: Date.now().toString(),
      title: "0% APR Balance Transfer",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedTransferItems.filter((i) => i.inputs !== inputStr)].slice(0, 10);
    setSavedTransferItems(updated);
    try {
      localStorage.setItem("saved_cc_transfer", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedTransfer(true);
    setTimeout(() => setJustSavedTransfer(false), 2000);
  };

  const handleSaveBiWeekly = () => {
    const inputStr = `Balance: ${currencySymbol}${biWeeklyBalanceInput} @ ${biWeeklyAprInput}% APR | Standard: ${currencySymbol}${biWeeklyMonthlyPmtInput}/mo`;
    const resList = [
      `Bi-Weekly Payment: ${fmt(biWeeklyResult.biWeeklyPayment)} every 2 weeks`,
      `Bi-Weekly Interest Saved: ${fmt(biWeeklyResult.biWeeklyInterestSaved)}`,
      `Bi-Weekly Months Saved: ${biWeeklyResult.biWeeklyMonthsSaved} months`,
      `15-3 Hack Interest Saved: ${fmt(biWeeklyResult.hack153InterestSaved)}`,
      `15-3 Hack Months Saved: ${biWeeklyResult.hack153MonthsSaved} months`,
    ];

    const newItem: SavedPayoffItem = {
      id: Date.now().toString(),
      title: "Bi-Weekly & 15-3 Hack Payoff",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBiWeeklyItems.filter((i) => i.inputs !== inputStr)].slice(0, 10);
    setSavedBiWeeklyItems(updated);
    try {
      localStorage.setItem("saved_cc_biweekly", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBiWeekly(true);
    setTimeout(() => setJustSavedBiWeekly(false), 2000);
  };

  const handleSaveUtil = () => {
    const inputStr = `Credit Limit: ${currencySymbol}${utilTotalLimitInput} | Balance: ${currencySymbol}${utilTotalBalanceInput} | Paydown: ${currencySymbol}${utilPaydownMonthlyInput}/mo`;
    const resList = [
      `Current Utilization: ${utilResult.currentUtilizationPct}% (${utilResult.currentStatus})`,
      `FICO Score Impact: ${utilResult.scoreImpact}`,
      `Months to Reach <30% Utilization: ${utilResult.monthsToUnder30Pct} mos`,
      `Months to Reach <10% Utilization: ${utilResult.monthsToUnder10Pct} mos`,
      `Months to 0% Balance: ${utilResult.monthsToZero} mos`,
    ];

    const newItem: SavedPayoffItem = {
      id: Date.now().toString(),
      title: "Credit Utilization Estimator",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedUtilItems.filter((i) => i.inputs !== inputStr)].slice(0, 10);
    setSavedUtilItems(updated);
    try {
      localStorage.setItem("saved_cc_utilization", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedUtil(true);
    setTimeout(() => setJustSavedUtil(false), 2000);
  };

  const handleSaveCash = () => {
    const inputStr = `Advance: ${currencySymbol}${cashAmountInput} @ ${cashAprInput}% APR | Days: ${cashDaysInput} | Upfront Fee: ${cashFeePctInput}% + ${currencySymbol}${cashAtmFeeInput} ATM`;
    const resList = [
      `Total Cost of Advance: ${fmt(cashResult.totalRepaymentCost)}`,
      `Upfront Fees: ${fmt(cashResult.totalUpfrontCharges)}`,
      `Accrued Interest (${cashDaysInput} days): ${fmt(cashResult.accruedInterest)}`,
      `Effective Annualized APR: ${cashResult.effectiveAnnualizedCostPct}%`,
    ];

    const newItem: SavedPayoffItem = {
      id: Date.now().toString(),
      title: "Cash Advance Fee Analysis",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedCashItems.filter((i) => i.inputs !== inputStr)].slice(0, 10);
    setSavedCashItems(updated);
    try {
      localStorage.setItem("saved_cc_cashadvance", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedCash(true);
    setTimeout(() => setJustSavedCash(false), 2000);
  };

  // Copy Summary Handler
  const handleCopySummary = () => {
    const text = `Credit Card Payoff Plan Summary:
• Balance: ${currencySymbol}${balanceInput} @ ${aprInput}% APR
• Strategy: ${payoffMode === "A" ? `Fixed ${currencySymbol}${monthlyPaymentInput}/month` : payoffMode === "B" ? `Target Payoff in ${targetYearsInput} yrs ${targetMonthsInput} mos` : `Minimum Payment Rule (${minPaymentRule})`}
• Time to Debt-Free: ${Math.floor(payoffResult.monthsToPayoff / 12)} Years, ${payoffResult.monthsToPayoff % 12} Months (${payoffResult.monthsToPayoff} Months)
• Required Monthly Payment: ${fmt(payoffResult.monthlyPayment)}
• Total Interest Paid: ${fmt(payoffResult.totalInterestPaid)}
• Total Overall Amount Paid: ${fmt(payoffResult.totalAmountPaid)}
• Estimated Payoff Date: ${payoffResult.payoffDate}
${payoffResult.minPaymentTrapComparison ? `• Accelerated Savings vs Minimums: ${fmt(payoffResult.minPaymentTrapComparison.interestSaved)} in interest & ${payoffResult.minPaymentTrapComparison.monthsSaved} months saved!` : ""}`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // CSV Export Handler
  const handleExportCSV = () => {
    if (!payoffResult.schedule || payoffResult.schedule.length === 0) return;
    const headers = "Month,Starting Balance,Monthly Payment,Principal Paid,Interest Paid,Ending Balance,Cumulative Interest\n";
    const rows = payoffResult.schedule
      .map(
        (r) =>
          `${r.month},${r.startingBalance},${r.monthlyPayment},${r.principalPaid},${r.interestPaid},${r.endingBalance},${r.cumulativeInterest}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Credit_Card_Amortization_Schedule_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Multi-Card helpers
  const handleAddCard = () => {
    const newId = (cards.length + 1).toString();
    setCards([...cards, { id: newId, name: `Card #${newId}`, balance: 2000, apr: 22.99, minPayment: 50 }]);
  };

  const handleRemoveCard = (id: string) => {
    if (cards.length <= 1) return;
    setCards(cards.filter((c) => c.id !== id));
  };

  const handleUpdateCard = (id: string, field: keyof MultiCardItem, value: any) => {
    setCards(cards.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  // Quick Preset Handlers
  const handlePreset1 = () => {
    setBalanceInput("5000");
    setAprInput("22");
    setPayoffMode("B");
    setTargetYearsInput("2");
    setTargetMonthsInput("0");
    setExtraMonthlyInput("0");
    setLumpSumInput("0");
  };

  const handlePreset2 = () => {
    setBalanceInput("10000");
    setAprInput("24");
    setPayoffMode("C");
    setMinPaymentRule("1_plus_interest");
    setMinPaymentFloor("25");
  };

  const handlePreset3 = () => {
    setBalanceInput("8000");
    setAprInput("18");
    setPayoffMode("A");
    setMonthlyPaymentInput("250");
    setExtraMonthlyInput("50");
    setLumpSumInput("500");
  };

  return (
    <div className="space-y-6">
      {/* GLOBAL CONTROLS BAR: Currency Selector, Presets & Quick Actions */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5" /> Calculation Controls & Presets
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-blue-100 font-medium">Currency:</span>
            {["$", "€", "£", "¥", "₹"].map((cur) => (
              <button
                key={cur}
                type="button"
                onClick={() => setCurrencySymbol(cur)}
                className={`px-2 py-0.5 rounded font-mono font-bold text-xs transition-colors cursor-pointer ${
                  currencySymbol === cur
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-blue-100 hover:bg-blue-700"
                }`}
              >
                {cur}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px]">Quick Profiles:</span>
            <button
              type="button"
              onClick={handlePreset1}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:border-blue-400 cursor-pointer transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
            >
              $5k @ 22% (Pay in 2 Yrs)
            </button>
            <button
              type="button"
              onClick={handlePreset2}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:border-blue-400 cursor-pointer transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
            >
              $10k Minimum Payment Trap
            </button>
            <button
              type="button"
              onClick={handlePreset3}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:border-blue-400 cursor-pointer transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
            >
              $8k @ 18% + Extra $50/mo
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-100 cursor-pointer transition-all flex items-center gap-1.5"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? "Copied!" : "Copy Summary"}</span>
            </button>
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 cursor-pointer transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> CSV Schedule
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 cursor-pointer transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 1: SINGLE CARD PAYOFF & MINIMUM PAYMENT ANALYZER (CORE ENGINE) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CardIcon className="w-4 h-4" /> Credit Card Calculator
          </span>
          <button
            type="button"
            onClick={handleSavePayoff}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedPayoff ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT COLUMN: INPUT CONTROLS */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Card Balance & Rate Inputs
                </h2>

                {/* Balance & APR */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Current Balance ({currencySymbol})
                    </label>
                    <input
                      type="number"
                      value={balanceInput}
                      onChange={(e) => setBalanceInput(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* PAYOFF STRATEGY SELECTOR */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Payoff Strategy / Goal
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setPayoffMode("A")}
                      className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                        payoffMode === "A"
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-300/50"
                      }`}
                    >
                      Fixed Amount
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayoffMode("B")}
                      className={`py-1.5 rounded-lg cursor-pointer transition-all ${
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
                      className={`py-1.5 rounded-lg cursor-pointer transition-all ${
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
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                )}

                {payoffMode === "B" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Target Years
                      </label>
                      <input
                        type="number"
                        value={targetYearsInput}
                        onChange={(e) => setTargetYearsInput(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                )}

                {payoffMode === "C" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Minimum Payment Formula
                      </label>
                      <select
                        value={minPaymentRule}
                        onChange={(e: any) => setMinPaymentRule(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold text-xs shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="1_plus_interest">Monthly Interest + 1% of Balance (Standard)</option>
                        <option value="2_percent">2.0% of Outstanding Balance</option>
                        <option value="2.5_percent">2.5% of Outstanding Balance</option>
                        <option value="3_percent">3.0% of Outstanding Balance</option>
                        <option value="4_percent">4.0% of Outstanding Balance</option>
                        <option value="5_percent">5.0% of Outstanding Balance</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Minimum Payment Floor Dollar Amount ({currencySymbol})
                      </label>
                      <input
                        type="number"
                        value={minPaymentFloor}
                        onChange={(e) => setMinPaymentFloor(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                )}

                {/* ACCELERATORS: EXTRA MONTHLY & LUMP SUM */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <span className="text-[11px] font-extrabold uppercase text-slate-400 block">
                    Payoff Acceleration Boosters (Optional)
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Extra Monthly ({currencySymbol}/mo)
                      </label>
                      <input
                        type="number"
                        value={extraMonthlyInput}
                        onChange={(e) => setExtraMonthlyInput(e.target.value)}
                        placeholder="0"
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: OUTPUT CARDS & CHARTS */}
            <div className="lg:col-span-7 space-y-4">
              {/* HERO RESULT DISPLAY */}
              <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl border border-blue-200 dark:border-blue-900/60 shadow-xs space-y-4">
                {payoffResult.isNeverEnding ? (
                  <div className="p-3 bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-xs font-bold">
                    <AlertTriangle className="w-4 h-4 inline mr-1 text-red-600" />
                    {payoffResult.warningMessage}
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-200/60 dark:border-slate-700 pb-3">
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                          Estimated Debt-Free Timeline
                        </span>
                        <div className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
                          {Math.floor(payoffResult.monthsToPayoff / 12) > 0 && `${Math.floor(payoffResult.monthsToPayoff / 12)} Yrs `}
                          {payoffResult.monthsToPayoff % 12} Mos
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-sans ml-2">
                            ({payoffResult.monthsToPayoff} months)
                          </span>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                          Debt-Free Date
                        </span>
                        <span className="text-base font-bold text-blue-600 dark:text-blue-400">
                          {payoffResult.payoffDate}
                        </span>
                      </div>
                    </div>

                    {/* METRICS GRID */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-bold">
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                        <span className="text-[10px] text-slate-400 uppercase block">Monthly Payment</span>
                        <span className="font-mono text-base text-slate-900 dark:text-slate-100">
                          {fmt(payoffResult.monthlyPayment)}
                        </span>
                      </div>

                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                        <span className="text-[10px] text-slate-400 uppercase block">Total Interest Paid</span>
                        <span className="font-mono text-base text-amber-600 dark:text-amber-400">
                          {fmt(payoffResult.totalInterestPaid)}
                        </span>
                      </div>

                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs col-span-2 sm:col-span-1">
                        <span className="text-[10px] text-slate-400 uppercase block">Total Amount Repaid</span>
                        <span className="font-mono text-base text-blue-600 dark:text-blue-400">
                          {fmt(payoffResult.totalAmountPaid)}
                        </span>
                      </div>
                    </div>

                    {/* MINIMUM PAYMENT TRAP COMPARISON BANNER */}
                    {payoffResult.minPaymentTrapComparison && (
                      <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl flex items-start gap-2.5 text-xs font-medium text-emerald-900 dark:text-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block text-emerald-800 dark:text-emerald-300">
                            Minimum Payment Trap Avoided!
                          </span>
                          By following this accelerated plan, you save{" "}
                          <strong className="font-mono">{fmt(payoffResult.minPaymentTrapComparison.interestSaved)}</strong> in
                          compounding interest and finish{" "}
                          <strong>{payoffResult.minPaymentTrapComparison.monthsSaved} months ({Math.floor(payoffResult.minPaymentTrapComparison.monthsSaved / 12)} years)</strong> earlier
                          than making minimum payments only ({payoffResult.minPaymentTrapComparison.minYears} years total).
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* VISUAL CHARTS: PRINCIPAL VS INTEREST BREAKDOWN */}
              {!payoffResult.isNeverEnding && payoffResult.schedule.length > 0 && (
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <PieIcon className="w-3.5 h-3.5" /> Principal vs. Lifetime Interest Split
                  </h3>

                  {/* VISUAL PROGRESS BAR */}
                  <div className="space-y-1.5">
                    <div className="w-full h-5 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 flex shadow-inner">
                      <div
                        style={{ width: `${100 - payoffResult.interestRatio}%` }}
                        className="bg-blue-600 transition-all duration-500"
                        title={`Original Principal: ${fmt(Number(balanceInput) || 0)}`}
                      />
                      <div
                        style={{ width: `${payoffResult.interestRatio}%` }}
                        className="bg-amber-500 transition-all duration-500"
                        title={`Finance Charges: ${fmt(payoffResult.totalInterestPaid)}`}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono font-bold pt-0.5">
                      <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                        Principal: {fmt(Number(balanceInput) || 0)} ({(100 - payoffResult.interestRatio).toFixed(1)}%)
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                        Interest: {fmt(payoffResult.totalInterestPaid)} ({payoffResult.interestRatio}%)
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* MONTH-BY-MONTH AMORTIZATION SCHEDULE TABLE */}
          {!payoffResult.isNeverEnding && payoffResult.schedule.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4" /> Month-by-Month Amortization Schedule
                </h3>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search month..."
                      value={tableSearch}
                      onChange={(e) => {
                        setTableSearch(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="h-8 pl-8 pr-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="h-8 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 cursor-pointer flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> CSV
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 font-sans font-bold uppercase text-[10px]">
                      <th className="py-2 px-2">Month</th>
                      <th className="py-2 px-2">Starting Balance</th>
                      <th className="py-2 px-2">Payment</th>
                      <th className="py-2 px-2">Principal Paid</th>
                      <th className="py-2 px-2">Interest Paid</th>
                      <th className="py-2 px-2">Ending Balance</th>
                      <th className="py-2 px-2">Total Interest</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {currentSchedulePage.map((row) => (
                      <tr key={row.month} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="py-2 px-2 font-bold font-sans">Month {row.month}</td>
                        <td className="py-2 px-2 text-slate-600 dark:text-slate-400">{fmt(row.startingBalance)}</td>
                        <td className="py-2 px-2 font-bold text-slate-900 dark:text-slate-100">{fmt(row.monthlyPayment)}</td>
                        <td className="py-2 px-2 text-blue-600 dark:text-blue-400 font-bold">{fmt(row.principalPaid)}</td>
                        <td className="py-2 px-2 text-amber-600 dark:text-amber-400">{fmt(row.interestPaid)}</td>
                        <td className="py-2 px-2 font-bold text-slate-900 dark:text-slate-100">{fmt(row.endingBalance)}</td>
                        <td className="py-2 px-2 text-slate-500">{fmt(row.cumulativeInterest)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION CONTROLS */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold">
                  <span className="text-slate-500 text-[11px]">
                    Page {currentPage} of {totalPages} ({filteredSchedule.length} Months Total)
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 disabled:opacity-40 cursor-pointer"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 disabled:opacity-40 cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SAVED CALCULATIONS INSIDE BOX 1 */}
          {savedPayoffItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Single Card Calculations ({savedPayoffItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPayoffItems([]);
                    localStorage.removeItem("saved_cc_payoff");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedPayoffItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedPayoffItems.filter((i) => i.id !== item.id);
                            setSavedPayoffItems(updated);
                            localStorage.setItem("saved_cc_payoff", JSON.stringify(updated));
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 text-slate-700 dark:text-slate-300">
                      <div>
                        <span className="font-bold text-slate-500">Inputs: </span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs}</span>
                      </div>
                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                        <span className="font-extrabold text-slate-500 block text-[10px] uppercase">Results:</span>
                        <div className="space-y-1 font-mono text-[11px] max-h-36 overflow-y-auto">
                          {item.resultsList?.map((line, idx) => (
                            <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-700">
                              {line}
                            </div>
                          ))}
                        </div>
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
      {/* BOX 2: MULTI-CARD DEBT AVALANCHE VS DEBT SNOWBALL OPTIMIZER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4" /> Multi-Card Debt Avalanche vs. Debt Snowball Optimizer
          </span>
          <button
            type="button"
            onClick={handleSaveMultiCard}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedMultiCard ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT: DYNAMIC CARDS LIST & BUDGET */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Your Credit Cards ({cards.length})
                  </h2>
                  <button
                    type="button"
                    onClick={handleAddCard}
                    className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Card
                  </button>
                </div>

                {/* DYNAMIC CARD ROWS */}
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {cards.map((card, idx) => (
                    <div
                      key={card.id}
                      className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 shadow-xs space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={card.name}
                          onChange={(e) => handleUpdateCard(card.id, "name", e.target.value)}
                          className="font-bold text-slate-900 dark:text-slate-100 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-none w-36"
                        />
                        {cards.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCard(card.id)}
                            className="text-slate-400 hover:text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold">Balance ({currencySymbol})</span>
                          <input
                            type="number"
                            value={card.balance}
                            onChange={(e) => handleUpdateCard(card.id, "balance", Number(e.target.value))}
                            className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold">APR (%)</span>
                          <input
                            type="number"
                            step="0.1"
                            value={card.apr}
                            onChange={(e) => handleUpdateCard(card.id, "apr", Number(e.target.value))}
                            className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold">Min Pmt ({currencySymbol})</span>
                          <input
                            type="number"
                            value={card.minPayment}
                            onChange={(e) => handleUpdateCard(card.id, "minPayment", Number(e.target.value))}
                            className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* TOTAL MONTHLY BUDGET */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Total Monthly Debt Elimination Budget ({currencySymbol}/mo)
                  </label>
                  <input
                    type="number"
                    value={totalBudgetInput}
                    onChange={(e) => setTotalBudgetInput(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="text-[11px] text-slate-500 block mt-1 font-medium">
                    Total Minimum Required: {fmt(cards.reduce((s, c) => s + c.minPayment, 0))}/mo
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: COMPARISON TABLE & INSIGHTS */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl border border-blue-200 dark:border-blue-900/60 shadow-xs space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Side-by-Side Strategy Showdown
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* AVALANCHE CARD */}
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border-2 border-blue-600 dark:border-blue-500 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase">
                        Debt Avalanche (Optimal)
                      </span>
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold rounded-full">
                        Highest APR 1st
                      </span>
                    </div>

                    <div className="space-y-1 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-sans">Debt-Free In:</span>
                        <strong className="text-slate-900 dark:text-slate-100">{multiCardResult.avalanche.monthsToDebtFree} Months</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-sans">Total Interest:</span>
                        <strong className="text-emerald-600">{fmt(multiCardResult.avalanche.totalInterestPaid)}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-sans">Debt-Free Date:</span>
                        <span className="text-slate-700 dark:text-slate-300">{multiCardResult.avalanche.debtFreeDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* SNOWBALL CARD */}
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase">
                        Debt Snowball (Behavioral)
                      </span>
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded-full">
                        Smallest Balance 1st
                      </span>
                    </div>

                    <div className="space-y-1 font-mono text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-sans">Debt-Free In:</span>
                        <strong className="text-slate-900 dark:text-slate-100">{multiCardResult.snowball.monthsToDebtFree} Months</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-sans">Total Interest:</span>
                        <strong className="text-slate-700 dark:text-slate-300">{fmt(multiCardResult.snowball.totalInterestPaid)}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-sans">Debt-Free Date:</span>
                        <span className="text-slate-700 dark:text-slate-300">{multiCardResult.snowball.debtFreeDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AVALANCHE SAVINGS HIGHLIGHT */}
                <div className="p-3 bg-blue-100/70 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-xl text-xs text-blue-900 dark:text-blue-200 font-medium">
                  <Sparkles className="w-3.5 h-3.5 inline mr-1 text-blue-600" />
                  <strong>Debt Avalanche Advantage:</strong> Saves you{" "}
                  <strong className="font-mono">{fmt(multiCardResult.avalancheInterestSavedVsSnowball)}</strong> in interest
                  compared to the Snowball method, and{" "}
                  <strong className="font-mono">{fmt(multiCardResult.avalancheInterestSavedVsMin)}</strong> compared to
                  paying only minimums.
                </div>
              </div>
            </div>
          </div>

          {/* SAVED MULTI-CARD CALCULATIONS */}
          {savedMultiCardItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Multi-Card Scenarios ({savedMultiCardItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedMultiCardItems([]);
                    localStorage.removeItem("saved_cc_multicard");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedMultiCardItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                    </div>
                    <div className="space-y-1 font-mono text-[11px]">
                      {item.resultsList?.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-700">
                          {line}
                        </div>
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
      {/* BOX 3: 0% APR BALANCE TRANSFER & CONSOLIDATION SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4" /> 0% APR Balance Transfer & Consolidation Solver
          </span>
          <button
            type="button"
            onClick={handleSaveTransfer}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedTransfer ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT: TRANSFER INPUTS */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Transfer Parameters
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Transfer Balance ({currencySymbol})
                    </label>
                    <input
                      type="number"
                      value={transferBalanceInput}
                      onChange={(e) => setTransferBalanceInput(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Current APR (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={transferCurrentAprInput}
                      onChange={(e) => setTransferCurrentAprInput(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Promo (Mos)
                    </label>
                    <input
                      type="number"
                      value={transferPromoMonthsInput}
                      onChange={(e) => setTransferPromoMonthsInput(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Fee (%)
                    </label>
                    <input
                      type="number"
                      value={transferFeePctInput}
                      onChange={(e) => setTransferFeePctInput(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: TRANSFER OUTPUTS */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl border border-blue-200 dark:border-blue-900/60 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-blue-200/60 dark:border-slate-700 pb-3">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                      Net Interest Savings
                    </span>
                    <div className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                      {fmt(transferResult.netSavings)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-slate-400 uppercase block">Break-Even</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 font-mono">
                      Month {transferResult.breakEvenMonth}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-bold">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="text-[10px] text-slate-400 uppercase block">Transfer Fee Paid</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">
                      {fmt(transferResult.transferFeeAmount)}
                    </span>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="text-[10px] text-slate-400 uppercase block">Monthly to Clear in 0%</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">
                      {fmt(transferResult.requiredMonthlyToClearInPromo)}/mo
                    </span>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-400 uppercase block">Old Card Total Interest</span>
                    <span className="font-mono text-amber-600">
                      {fmt(transferResult.currentTotalInterest)}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-blue-600">Recommendation: </span>
                  {transferResult.recommendation}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 4: BI-WEEKLY & "15-3 HACK" PAYOFF BOOSTER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Bi-Weekly Payment & "15-3 Hack" Payoff Booster
          </span>
          <button
            type="button"
            onClick={handleSaveBiWeekly}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBiWeekly ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Payment Acceleration Inputs
                </h2>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Card Balance ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={biWeeklyBalanceInput}
                    onChange={(e) => setBiWeeklyBalanceInput(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      APR (%)
                    </label>
                    <input
                      type="number"
                      value={biWeeklyAprInput}
                      onChange={(e) => setBiWeeklyAprInput(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Standard Monthly ({currencySymbol})
                    </label>
                    <input
                      type="number"
                      value={biWeeklyMonthlyPmtInput}
                      onChange={(e) => setBiWeeklyMonthlyPmtInput(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 rounded-2xl border border-blue-200 dark:border-blue-900 shadow-xs space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Acceleration Method Comparison
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* BI-WEEKLY CARD */}
                  <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 space-y-2">
                    <span className="font-extrabold text-blue-600 dark:text-blue-400 block uppercase">
                      Bi-Weekly Schedule (26 Half-Pmts)
                    </span>
                    <div className="space-y-1 font-mono text-slate-700 dark:text-slate-300">
                      <div>Payment: <strong>{fmt(biWeeklyResult.biWeeklyPayment)}</strong> every 2 wks</div>
                      <div>Payoff In: <strong>{biWeeklyResult.biWeeklyMonths} Months</strong></div>
                      <div className="text-emerald-600 font-bold">Interest Saved: {fmt(biWeeklyResult.biWeeklyInterestSaved)}</div>
                      <div className="text-blue-600 font-bold">Months Saved: {biWeeklyResult.biWeeklyMonthsSaved} Months</div>
                    </div>
                  </div>

                  {/* 15-3 HACK CARD */}
                  <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 space-y-2">
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400 block uppercase">
                      "15-3 Hack" (ADB Compression)
                    </span>
                    <div className="space-y-1 font-mono text-slate-700 dark:text-slate-300">
                      <div>Strategy: Pay 15d & 3d before closing</div>
                      <div>Payoff In: <strong>{biWeeklyResult.hack153Months} Months</strong></div>
                      <div className="text-emerald-600 font-bold">Interest Saved: {fmt(biWeeklyResult.hack153InterestSaved)}</div>
                      <div className="text-indigo-600 font-bold">Months Saved: {biWeeklyResult.hack153MonthsSaved} Months</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 5: CREDIT UTILIZATION RATIO & SCORE IMPACT ESTIMATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Percent className="w-4 h-4" /> Credit Utilization Ratio & Credit Score Impact Estimator
          </span>
          <button
            type="button"
            onClick={handleSaveUtil}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedUtil ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Utilization Inputs
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Total Credit Limit ({currencySymbol})
                    </label>
                    <input
                      type="number"
                      value={utilTotalLimitInput}
                      onChange={(e) => setUtilTotalLimitInput(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Total Balances ({currencySymbol})
                    </label>
                    <input
                      type="number"
                      value={utilTotalBalanceInput}
                      onChange={(e) => setUtilTotalBalanceInput(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Monthly Debt Paydown ({currencySymbol}/mo)
                  </label>
                  <input
                    type="number"
                    value={utilPaydownMonthlyInput}
                    onChange={(e) => setUtilPaydownMonthlyInput(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 rounded-2xl border border-blue-200 dark:border-blue-900 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-blue-200/60 dark:border-slate-700 pb-3">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
                      Current Utilization Ratio
                    </span>
                    <div className="text-3xl font-mono font-extrabold text-blue-600 dark:text-blue-400">
                      {utilResult.currentUtilizationPct}%
                      <span className={`text-xs font-bold font-sans ml-2 px-2 py-0.5 rounded-full ${
                        utilResult.currentUtilizationPct < 10
                          ? "bg-emerald-100 text-emerald-700"
                          : utilResult.currentUtilizationPct < 30
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {utilResult.currentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold font-mono">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="text-[10px] text-slate-400 font-sans uppercase block">&lt;30% Safe Zone</span>
                    <span className="text-slate-900 dark:text-slate-100">{utilResult.monthsToUnder30Pct} Months</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="text-[10px] text-slate-400 font-sans uppercase block">&lt;10% Ideal Score</span>
                    <span className="text-slate-900 dark:text-slate-100">{utilResult.monthsToUnder10Pct} Months</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="text-[10px] text-slate-400 font-sans uppercase block">0% Debt-Free</span>
                    <span className="text-blue-600">{utilResult.monthsToZero} Months</span>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-blue-600">Credit Score Impact: </span>
                  {utilResult.scoreImpact}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 6: CASH ADVANCE & EMERGENCY FEE CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Credit Card Cash Advance & Emergency Fee Calculator
          </span>
          <button
            type="button"
            onClick={handleSaveCash}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedCash ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Cash Advance Details
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Withdrawal Amount ({currencySymbol})
                    </label>
                    <input
                      type="number"
                      value={cashAmountInput}
                      onChange={(e) => setCashAmountInput(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Cash APR (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={cashAprInput}
                      onChange={(e) => setCashAprInput(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Fee (%)
                    </label>
                    <input
                      type="number"
                      value={cashFeePctInput}
                      onChange={(e) => setCashFeePctInput(e.target.value)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      ATM Fee ({currencySymbol})
                    </label>
                    <input
                      type="number"
                      value={cashAtmFeeInput}
                      onChange={(e) => setCashAtmFeeInput(e.target.value)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Payoff (Days)
                    </label>
                    <input
                      type="number"
                      value={cashDaysInput}
                      onChange={(e) => setCashDaysInput(e.target.value)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 bg-gradient-to-br from-red-50 to-amber-50 dark:from-slate-800 rounded-2xl border border-red-200 dark:border-red-900 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-red-200/60 dark:border-slate-700 pb-3">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-600 dark:text-red-400 block">
                      Total Cost of Cash Advance
                    </span>
                    <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
                      {fmt(cashResult.totalRepaymentCost)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-slate-400 uppercase block">Effective Cost</span>
                    <span className="text-sm font-bold text-red-600 font-mono">
                      {cashResult.effectiveAnnualizedCostPct}% Annualized
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold font-mono">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="text-[10px] text-slate-400 font-sans uppercase block">Upfront Surcharges</span>
                    <span className="text-slate-900 dark:text-slate-100">{fmt(cashResult.totalUpfrontCharges)}</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="text-[10px] text-slate-400 font-sans uppercase block">Immediate Daily Interest</span>
                    <span className="text-red-600">{fmt(cashResult.accruedInterest)}</span>
                  </div>
                </div>

                <div className="p-3 bg-red-100/70 dark:bg-red-950/60 border border-red-300 dark:border-red-800 rounded-xl text-xs text-red-900 dark:text-red-200 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 inline mr-1 text-red-600" />
                  <strong>Zero Grace Period Warning:</strong> Credit card cash advances incur interest immediately from day 1 without any 21-day grace period. Always pay cash advances off immediately!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* EDUCATIONAL GUIDE & 12 SIMPLE MOST SEARCHED FAQS (STRICTLY IN BLACK) */}
      {/* ========================================================================= */}
      <CreditCardContent />
    </div>
  );
}
