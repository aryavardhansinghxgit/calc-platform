"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, ChevronDown, ChevronUp, Download, PieChart, TrendingUp, ShieldAlert, ArrowRight } from "lucide-react";
import {
  calculateStandardMutualFund,
  calculateActiveVsIndex,
  calculateSipStepUp,
  calculateCdscSchedule,
  calculateInflationAndTax,
  calculateTargetGoal,
} from "@/app/calculators/mutual-fund-calculator/calculator";
import { SavedMutualFundItem } from "@/app/calculators/mutual-fund-calculator/types";

export function MutualFundCalculator() {
  // 3D effect strictly on input filling boxes, tight zero-filler padding
  const input3DClass =
    "w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none transition-all text-xs";
  const select3DClass =
    "w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none cursor-pointer text-xs";
  const outerBox3DClass =
    "border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs";

  // Helper download trigger
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

  // =========================================================================
  // BOX 1: COMPREHENSIVE MUTUAL FUND FEE & GROWTH ANALYZER (CORE ENGINE)
  // =========================================================================
  const [b1Initial, setB1Initial] = useState<string>("20000");
  const [b1Monthly, setB1Monthly] = useState<string>("1000");
  const [b1Annual, setB1Annual] = useState<string>("0");
  const [b1Return, setB1Return] = useState<string>("5.0");
  const [b1Years, setB1Years] = useState<string>("5");
  const [b1Months, setB1Months] = useState<string>("0");
  const [b1FrontLoad, setB1FrontLoad] = useState<string>("2.0");
  const [b1DeferredLoad, setB1DeferredLoad] = useState<string>("0.0");
  const [b1ExpRatio, setB1ExpRatio] = useState<string>("0.5");
  const [b1RedemptionFee, setB1RedemptionFee] = useState<string>("0");
  const [b1ShowSchedule, setB1ShowSchedule] = useState<boolean>(false);

  const [savedBox1, setSavedBox1] = useState<SavedMutualFundItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);

  // Box 2: Active vs Index
  const [b2Initial, setB2Initial] = useState<string>("25000");
  const [b2Monthly, setB2Monthly] = useState<string>("500");
  const [b2GrossReturn, setB2GrossReturn] = useState<string>("8.0");
  const [b2ActiveExp, setB2ActiveExp] = useState<string>("1.25");
  const [b2ActiveLoad, setB2ActiveLoad] = useState<string>("2.5");
  const [b2IndexExp, setB2IndexExp] = useState<string>("0.04");
  const [b2IndexLoad, setB2IndexLoad] = useState<string>("0.0");

  const [savedBox2, setSavedBox2] = useState<SavedMutualFundItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);

  // Box 3: SIP Step-Up Booster
  const [b3Initial, setB3Initial] = useState<string>("5000");
  const [b3MonthlySIP, setB3MonthlySIP] = useState<string>("500");
  const [b3StepUp, setB3StepUp] = useState<string>("10");
  const [b3Return, setB3Return] = useState<string>("10.0");
  const [b3ExpRatio, setB3ExpRatio] = useState<string>("0.75");
  const [b3Years, setB3Years] = useState<string>("15");
  const [b3ShowSchedule, setB3ShowSchedule] = useState<boolean>(false);

  const [savedBox3, setSavedBox3] = useState<SavedMutualFundItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);

  // Box 4: CDSC Taper
  const [b4Initial, setB4Initial] = useState<string>("50000");
  const [b4YearsHeld, setB4YearsHeld] = useState<string>("3");
  const [b4Return, setB4Return] = useState<string>("7.0");
  const [b4ExpRatio, setB4ExpRatio] = useState<string>("1.0");

  const [savedBox4, setSavedBox4] = useState<SavedMutualFundItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);

  // Box 5: Inflation & Tax
  const [b5Initial, setB5Initial] = useState<string>("30000");
  const [b5Monthly, setB5Monthly] = useState<string>("800");
  const [b5Return, setB5Return] = useState<string>("8.5");
  const [b5ExpRatio, setB5ExpRatio] = useState<string>("0.60");
  const [b5Years, setB5Years] = useState<string>("10");
  const [b5Inflation, setB5Inflation] = useState<string>("3.0");
  const [b5TaxRate, setB5TaxRate] = useState<string>("15");

  const [savedBox5, setSavedBox5] = useState<SavedMutualFundItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);

  // Box 6: Target Wealth Solver
  const [b6Target, setB6Target] = useState<string>("1000000");
  const [b6Years, setB6Years] = useState<string>("20");
  const [b6Return, setB6Return] = useState<string>("8.0");
  const [b6ExpRatio, setB6ExpRatio] = useState<string>("0.50");
  const [b6FrontLoad, setB6FrontLoad] = useState<string>("0.0");
  const [b6SolveFor, setB6SolveFor] = useState<"monthly" | "lumpSum">("monthly");

  const [savedBox6, setSavedBox6] = useState<SavedMutualFundItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_mf_box1");
      if (s1) setSavedBox1(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_mf_box2");
      if (s2) setSavedBox2(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_mf_box3");
      if (s3) setSavedBox3(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_mf_box4");
      if (s4) setSavedBox4(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_mf_box5");
      if (s5) setSavedBox5(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_mf_box6");
      if (s6) setSavedBox6(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Box 1 Calculations
  const b1Calc = useMemo(() => {
    return calculateStandardMutualFund({
      initialInvestment: parseFloat(b1Initial) || 0,
      monthlyContribution: parseFloat(b1Monthly) || 0,
      annualContribution: parseFloat(b1Annual) || 0,
      expectedAnnualReturn: parseFloat(b1Return) || 0,
      holdingYears: parseFloat(b1Years) || 0,
      holdingMonths: parseFloat(b1Months) || 0,
      frontEndLoad: parseFloat(b1FrontLoad) || 0,
      deferredBackEndLoad: parseFloat(b1DeferredLoad) || 0,
      expenseRatio: parseFloat(b1ExpRatio) || 0,
      redemptionFee: parseFloat(b1RedemptionFee) || 0,
    });
  }, [b1Initial, b1Monthly, b1Annual, b1Return, b1Years, b1Months, b1FrontLoad, b1DeferredLoad, b1ExpRatio, b1RedemptionFee]);

  const handleExportBox1CSV = () => {
    if (!b1Calc.schedule || b1Calc.schedule.length === 0) return;
    const headers = [
      "Year",
      "Month",
      "Starting Balance ($)",
      "Annual Contributions ($)",
      "Interest Earned ($)",
      "Operating Expenses ($)",
      "Ending Balance ($)",
      "Cumulative Principal ($)",
      "Cumulative Fees Paid ($)",
    ];
    const rows = b1Calc.schedule.map((r) => [
      r.year,
      r.month,
      r.startingBalance,
      r.contributions,
      r.grossInterestEarned,
      r.operatingExpenses,
      r.endingBalance,
      r.cumulativePrincipal,
      r.cumulativeFees,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload(`mutual_fund_fee_growth_schedule_${b1Years}yr.csv`, csv);
  };

  const handleSaveBox1 = () => {
    const inputsStr = `Initial: $${b1Initial} | Monthly: $${b1Monthly} | Return: ${b1Return}% | Horizon: ${b1Years}y ${b1Months}m | Load: ${b1FrontLoad}% | Exp: ${b1ExpRatio}%`;
    const primaryStr = `Ending Value: $${b1Calc.endingValue.toLocaleString()} | Net Return: $${b1Calc.netReturn.toLocaleString()} (Net IRR: ${b1Calc.netIrrPercent}%)`;

    const detailsList = [
      `Ending Portfolio Value: $${b1Calc.endingValue.toLocaleString()}`,
      `Total Principal Invested: $${b1Calc.totalPrincipal.toLocaleString()}`,
      `Net Profit / Return: $${b1Calc.netReturn.toLocaleString()}`,
      `Net Internal Rate of Return (Net IRR): ${b1Calc.netIrrPercent}% / year`,
      `Front-End Sales Charge: $${b1Calc.salesCharge.toLocaleString()}`,
      `Operating Expenses Drag: $${b1Calc.operatingExpenses.toLocaleString()}`,
      `Total Fees & Charges: $${b1Calc.totalChargesAndFees.toLocaleString()}`,
      `Gross Zero-Fee Value: $${b1Calc.grossEndingValueNoFees.toLocaleString()} (Fee Erosion: $${b1Calc.totalChargesAndFees.toLocaleString()})`,
    ];

    const newItem: SavedMutualFundItem = {
      id: Date.now().toString(),
      title: "Mutual Fund Fee & Growth Calculation",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox1.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_mf_box1", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleDeleteSavedBox1 = (id: string) => {
    const updated = savedBox1.filter((item) => item.id !== id);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_mf_box1", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox1 = () => {
    setSavedBox1([]);
    try {
      localStorage.removeItem("saved_mf_box1");
    } catch (e) {}
  };

  // Box 2 Calculations
  const b2Calc = useMemo(() => {
    return calculateActiveVsIndex({
      initialInvestment: parseFloat(b2Initial) || 0,
      monthlyContribution: parseFloat(b2Monthly) || 0,
      expectedGrossReturn: parseFloat(b2GrossReturn) || 0,
      activeExpenseRatio: parseFloat(b2ActiveExp) || 0,
      activeFrontLoad: parseFloat(b2ActiveLoad) || 0,
      indexExpenseRatio: parseFloat(b2IndexExp) || 0,
      indexFrontLoad: parseFloat(b2IndexLoad) || 0,
    });
  }, [b2Initial, b2Monthly, b2GrossReturn, b2ActiveExp, b2ActiveLoad, b2IndexExp, b2IndexLoad]);

  const handleExportBox2CSV = () => {
    const headers = [
      "Time Horizon",
      "Total Invested ($)",
      "Active Fund Balance ($)",
      "Active Fund Total Fees ($)",
      "Index Fund Balance ($)",
      "Index Fund Total Fees ($)",
      "Index Wealth Advantage ($)",
      "Fee Savings ($)",
    ];
    const rows = b2Calc.comparisons.map((c) => [
      `${c.years} Years`,
      c.totalInvested,
      c.activeEndingValue,
      c.activeTotalFees,
      c.indexEndingValue,
      c.indexTotalFees,
      c.wealthAdvantage,
      c.feeSavings,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("active_vs_index_fee_drag_comparison.csv", csv);
  };

  const handleSaveBox2 = () => {
    const inputsStr = `Initial: $${b2Initial} | Monthly: $${b2Monthly} | Return: ${b2GrossReturn}% | Active (${b2ActiveExp}% Exp, ${b2ActiveLoad}% Load) vs Index (${b2IndexExp}% Exp, ${b2IndexLoad}% Load)`;
    const primaryStr = `30-Yr Passive Wealth Advantage: +$${b2Calc.summary30YrLoss.toLocaleString()}`;

    const detailsList = b2Calc.comparisons.map(
      (c) =>
        `${c.years}-Year Horizon: Index $${c.indexEndingValue.toLocaleString()} vs Active $${c.activeEndingValue.toLocaleString()} (Advantage: +$${c.wealthAdvantage.toLocaleString()})`
    );

    const newItem: SavedMutualFundItem = {
      id: Date.now().toString(),
      title: "Active vs Index Fund Comparison",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox2.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_mf_box2", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  const handleDeleteSavedBox2 = (id: string) => {
    const updated = savedBox2.filter((item) => item.id !== id);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_mf_box2", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox2 = () => {
    setSavedBox2([]);
    try {
      localStorage.removeItem("saved_mf_box2");
    } catch (e) {}
  };

  // Box 3 Calculations
  const b3Calc = useMemo(() => {
    return calculateSipStepUp({
      initialInvestment: parseFloat(b3Initial) || 0,
      startingMonthlySIP: parseFloat(b3MonthlySIP) || 0,
      annualStepUpPercent: parseFloat(b3StepUp) || 0,
      expectedReturn: parseFloat(b3Return) || 0,
      expenseRatio: parseFloat(b3ExpRatio) || 0,
      timeHorizonYears: parseFloat(b3Years) || 0,
    });
  }, [b3Initial, b3MonthlySIP, b3StepUp, b3Return, b3ExpRatio, b3Years]);

  const handleExportBox3CSV = () => {
    const headers = ["Year", "Monthly SIP ($)", "Annual Contribution ($)", "Cumulative Invested ($)", "Ending Balance ($)", "Total Fees Paid ($)"];
    const rows = b3Calc.schedule.map((r) => [
      r.year,
      r.monthlyDeposit,
      r.annualContributions,
      r.cumulativeInvested,
      r.endingBalance,
      r.totalFees,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("sip_step_up_schedule.csv", csv);
  };

  const handleSaveBox3 = () => {
    const inputsStr = `Initial: $${b3Initial} | Monthly SIP: $${b3MonthlySIP} | Step-Up: ${b3StepUp}%/yr | Return: ${b3Return}% | ${b3Years} Yrs`;
    const primaryStr = `Ending Portfolio: $${b3Calc.endingBalance.toLocaleString()} (Net Profit: $${b3Calc.totalProfit.toLocaleString()})`;

    const detailsList = [
      `Final Portfolio Balance: $${b3Calc.endingBalance.toLocaleString()}`,
      `Total Principal Invested: $${b3Calc.totalInvested.toLocaleString()}`,
      `Net Profit Earned: $${b3Calc.totalProfit.toLocaleString()}`,
      `Net Annualized IRR: ${b3Calc.netIrr}%`,
      `Final Year Monthly Deposit: $${b3Calc.schedule[b3Calc.schedule.length - 1]?.monthlyDeposit.toLocaleString()}`,
      `Total Cumulative Fees Paid: $${b3Calc.totalFees.toLocaleString()}`,
    ];

    const newItem: SavedMutualFundItem = {
      id: Date.now().toString(),
      title: "SIP Step-Up Booster Calculation",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox3.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_mf_box3", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  const handleDeleteSavedBox3 = (id: string) => {
    const updated = savedBox3.filter((item) => item.id !== id);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_mf_box3", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox3 = () => {
    setSavedBox3([]);
    try {
      localStorage.removeItem("saved_mf_box3");
    } catch (e) {}
  };

  // Box 4 Calculations
  const b4Calc = useMemo(() => {
    return calculateCdscSchedule({
      initialInvestment: parseFloat(b4Initial) || 0,
      yearsHeld: parseFloat(b4YearsHeld) || 0,
      expectedAnnualReturn: parseFloat(b4Return) || 0,
      expenseRatio: parseFloat(b4ExpRatio) || 0,
      taperSchedule: [],
    });
  }, [b4Initial, b4YearsHeld, b4Return, b4ExpRatio]);

  const handleExportBox4CSV = () => {
    const headers = ["Year Held", "CDSC Penalty Rate (%)", "Gross Portfolio Value ($)", "Exit Penalty Fee ($)", "Net Cash Payout ($)"];
    const rows = b4Calc.schedule.map((r) => [
      `Year ${r.year}`,
      `${r.cdscRate}%`,
      r.projectedGrossValue,
      r.exitPenaltyDollar,
      r.netPayoutToInvestor,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("cdsc_taper_redemption_schedule.csv", csv);
  };

  const handleSaveBox4 = () => {
    const inputsStr = `Initial: $${b4Initial} | Held: ${b4YearsHeld} Yrs | Return: ${b4Return}% | Exp: ${b4ExpRatio}%`;
    const primaryStr = `Net Cash Payout: $${b4Calc.netCashReceived.toLocaleString()} (CDSC Penalty: $${b4Calc.redemptionPenalty.toLocaleString()})`;

    const detailsList = [
      `Holding Period: ${b4Calc.holdingYearSelected} Years`,
      `Applicable CDSC Penalty Rate: ${b4Calc.applicableCdscPercent}%`,
      `Estimated Gross Value: $${b4Calc.estimatedGrossValue.toLocaleString()}`,
      `Redemption Penalty Deducted: $${b4Calc.redemptionPenalty.toLocaleString()}`,
      `Net Cash Received by Investor: $${b4Calc.netCashReceived.toLocaleString()}`,
    ];

    const newItem: SavedMutualFundItem = {
      id: Date.now().toString(),
      title: "CDSC Taper Redemption Calculation",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox4.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_mf_box4", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  const handleDeleteSavedBox4 = (id: string) => {
    const updated = savedBox4.filter((item) => item.id !== id);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_mf_box4", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox4 = () => {
    setSavedBox4([]);
    try {
      localStorage.removeItem("saved_mf_box4");
    } catch (e) {}
  };

  // Box 5 Calculations
  const b5Calc = useMemo(() => {
    return calculateInflationAndTax({
      initialInvestment: parseFloat(b5Initial) || 0,
      monthlyContribution: parseFloat(b5Monthly) || 0,
      expectedGrossReturn: parseFloat(b5Return) || 0,
      expenseRatio: parseFloat(b5ExpRatio) || 0,
      holdingYears: parseFloat(b5Years) || 0,
      annualInflationRate: parseFloat(b5Inflation) || 0,
      capitalGainsTaxRate: parseFloat(b5TaxRate) || 0,
    });
  }, [b5Initial, b5Monthly, b5Return, b5ExpRatio, b5Years, b5Inflation, b5TaxRate]);

  const handleSaveBox5 = () => {
    const inputsStr = `Initial: $${b5Initial} | Monthly: $${b5Monthly} | ${b5Years} Yrs | Infl: ${b5Inflation}% | Tax: ${b5TaxRate}%`;
    const primaryStr = `Real Purchasing Power: $${b5Calc.realPurchasingPowerBalance.toLocaleString()} (After-Tax: $${b5Calc.afterTaxEndingBalance.toLocaleString()})`;

    const detailsList = [
      `Nominal Ending Value: $${b5Calc.nominalEndingValue.toLocaleString()}`,
      `Total Principal Invested: $${b5Calc.totalPrincipal.toLocaleString()}`,
      `Nominal Profit Earned: $${b5Calc.nominalProfit.toLocaleString()}`,
      `Estimated Capital Gains Tax: $${b5Calc.estimatedTaxAmount.toLocaleString()}`,
      `After-Tax Ending Balance: $${b5Calc.afterTaxEndingBalance.toLocaleString()}`,
      `Real Purchasing Power Balance: $${b5Calc.realPurchasingPowerBalance.toLocaleString()}`,
      `Purchasing Power Lost to Inflation: $${b5Calc.inflationPurchasingPowerLoss.toLocaleString()}`,
    ];

    const newItem: SavedMutualFundItem = {
      id: Date.now().toString(),
      title: "Inflation & Capital Gains Tax Calculation",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox5.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_mf_box5", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  const handleDeleteSavedBox5 = (id: string) => {
    const updated = savedBox5.filter((item) => item.id !== id);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_mf_box5", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox5 = () => {
    setSavedBox5([]);
    try {
      localStorage.removeItem("saved_mf_box5");
    } catch (e) {}
  };

  // Box 6 Calculations
  const b6Calc = useMemo(() => {
    return calculateTargetGoal({
      targetWealth: parseFloat(b6Target) || 0,
      timeHorizonYears: parseFloat(b6Years) || 0,
      expectedGrossReturn: parseFloat(b6Return) || 0,
      expenseRatio: parseFloat(b6ExpRatio) || 0,
      frontEndLoad: parseFloat(b6FrontLoad) || 0,
      solveFor: b6SolveFor,
    });
  }, [b6Target, b6Years, b6Return, b6ExpRatio, b6FrontLoad, b6SolveFor]);

  const handleSaveBox6 = () => {
    const inputsStr = `Target: $${b6Target} | ${b6Years} Yrs | Return: ${b6Return}% | Exp: ${b6ExpRatio}% | Solve: ${b6SolveFor}`;
    const primaryStr = `Required ${b6SolveFor === "monthly" ? "Monthly Deposit" : "Lump-Sum"}: $${b6Calc.requiredAmount.toLocaleString()}`;

    const detailsList = [
      `Target Wealth Goal: $${b6Calc.targetWealth.toLocaleString()}`,
      `Required ${b6SolveFor === "monthly" ? "Monthly Deposit" : "Initial Lump-Sum"}: $${b6Calc.requiredAmount.toLocaleString()}`,
      `Total Principal to Invest: $${b6Calc.totalInvested.toLocaleString()}`,
      `Total Compound Earnings: $${b6Calc.totalProfit.toLocaleString()}`,
      `Total Estimated Fee Erosion: $${b6Calc.totalEstimatedFees.toLocaleString()}`,
    ];

    const newItem: SavedMutualFundItem = {
      id: Date.now().toString(),
      title: "Target Wealth & Retirement Goal Calculation",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox6.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_mf_box6", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  const handleDeleteSavedBox6 = (id: string) => {
    const updated = savedBox6.filter((item) => item.id !== id);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_mf_box6", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox6 = () => {
    setSavedBox6([]);
    try {
      localStorage.removeItem("saved_mf_box6");
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* =========================================================================
          BOX 1: COMPREHENSIVE MUTUAL FUND FEE & GROWTH ANALYZER (CORE ENGINE)
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Comprehensive Mutual Fund Fee &amp; Growth Analyzer</span>
          <button
            type="button"
            onClick={handleSaveBox1}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox1 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT: INPUT CONTROLS */}
            <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Investment &amp; Fee Parameters
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Initial Investment ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={b1Initial}
                    onChange={(e) => setB1Initial(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Monthly Contribution ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={50}
                    value={b1Monthly}
                    onChange={(e) => setB1Monthly(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Annual Contribution ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={b1Annual}
                    onChange={(e) => setB1Annual(e.target.value)}
                    placeholder="0"
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Expected Return (%/yr)
                  </label>
                  <input
                    type="number"
                    min={-50}
                    max={100}
                    step={0.1}
                    value={b1Return}
                    onChange={(e) => setB1Return(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Holding Time (Years)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={b1Years}
                    onChange={(e) => setB1Years(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Holding Time (Months)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={11}
                    step={1}
                    value={b1Months}
                    onChange={(e) => setB1Months(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Front-End Load (%)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    step={0.25}
                    value={b1FrontLoad}
                    onChange={(e) => setB1FrontLoad(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Annual Expense Ratio (%)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={5}
                    step={0.05}
                    value={b1ExpRatio}
                    onChange={(e) => setB1ExpRatio(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Deferred Back-End Load (%)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    step={0.25}
                    value={b1DeferredLoad}
                    onChange={(e) => setB1DeferredLoad(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Flat Redemption Fee ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={10}
                    value={b1RedemptionFee}
                    onChange={(e) => setB1RedemptionFee(e.target.value)}
                    placeholder="0"
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: HERO OUTPUT RESULTS & PORTFOLIO BREAKDOWN */}
            <div className="lg:col-span-7 space-y-3">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Final Ending Balance
                    </span>
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                      ${b1Calc.endingValue.toLocaleString()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Net Annual Yield</span>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300 inline-block font-sans tabular-nums">
                      Net IRR: {b1Calc.netIrrPercent}% / yr
                    </span>
                  </div>
                </div>

                {/* PRIMARY METRICS GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Total Principal</span>
                    <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100 font-extrabold">
                      ${b1Calc.totalPrincipal.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Net Profit Earned</span>
                    <span className="font-sans tabular-nums text-emerald-600 dark:text-emerald-400 font-extrabold">
                      ${b1Calc.netReturn.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Sales Charges (Loads)</span>
                    <span className="font-sans tabular-nums text-amber-600 dark:text-amber-400 font-extrabold">
                      ${b1Calc.salesCharge.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Total Fees &amp; Drag</span>
                    <span className="font-sans tabular-nums text-red-600 dark:text-red-400 font-extrabold">
                      ${b1Calc.totalChargesAndFees.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* ITEMIZED FEE DEDUCTION BREAKDOWN */}
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium space-y-1">
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Front-End Load Commission ({b1FrontLoad}%):</span>
                    <span className="font-bold font-sans tabular-nums text-slate-900 dark:text-slate-100">
                      ${b1Calc.salesCharge.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Cumulative Operating Expenses ({b1ExpRatio}%/yr):</span>
                    <span className="font-bold font-sans tabular-nums text-slate-900 dark:text-slate-100">
                      ${b1Calc.operatingExpenses.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Zero-Fee Benchmark Wealth (Gross Value):</span>
                    <span className="font-bold font-sans tabular-nums text-blue-600 dark:text-blue-400">
                      ${b1Calc.grossEndingValueNoFees.toLocaleString()} (Lost to Fees: ${b1Calc.totalChargesAndFees.toLocaleString()})
                    </span>
                  </div>
                </div>
              </div>

              {/* DYNAMIC SVG PORTFOLIO SHARE DONUT CHART */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <PieChart className="w-3.5 h-3.5" /> Total Portfolio Asset Allocation Share
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold font-sans">
                    Initial ${b1Calc.initialInvestment.toLocaleString()} + Deposits ${b1Calc.totalContributions.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-1">
                  {/* SVG DONUT */}
                  <div className="sm:col-span-5 flex justify-center">
                    <svg className="w-32 h-32" viewBox="0 0 100 100">
                      {(() => {
                        let cumulativePercent = 0;
                        const data = b1Calc.shareData.filter((d) => d.percent > 0);
                        return data.map((slice, idx) => {
                          const startAngle = (cumulativePercent / 100) * 360;
                          cumulativePercent += slice.percent;
                          const endAngle = (cumulativePercent / 100) * 360;

                          const startRad = ((startAngle - 90) * Math.PI) / 180;
                          const endRad = ((endAngle - 90) * Math.PI) / 180;

                          const x1 = 50 + 40 * Math.cos(startRad);
                          const y1 = 50 + 40 * Math.sin(startRad);
                          const x2 = 50 + 40 * Math.cos(endRad);
                          const y2 = 50 + 40 * Math.sin(endRad);

                          const largeArcFlag = slice.percent > 50 ? 1 : 0;
                          const pathD = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                          return <path key={idx} d={pathD} fill={slice.color} stroke="#ffffff" strokeWidth="1.5" />;
                        });
                      })()}
                      {/* Inner Donut Hole */}
                      <circle cx="50" cy="50" r="24" fill="#ffffff" className="dark:fill-slate-900" />
                      <text x="50" y="53" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#2563eb" fontFamily="sans-serif">
                        {b1Calc.netIrrPercent}%
                      </text>
                    </svg>
                  </div>

                  {/* LEGEND */}
                  <div className="sm:col-span-7 space-y-1.5 text-xs font-sans">
                    {b1Calc.shareData.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: item.color }} />
                          <span className="text-slate-700 dark:text-slate-300 font-medium">{item.label}</span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                          ${item.value.toLocaleString()} ({item.percent.toFixed(1)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SCHEDULE TOGGLE & CSV EXPORT */}
          <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setB1ShowSchedule(!b1ShowSchedule)}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {b1ShowSchedule ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{b1ShowSchedule ? "Hide Annual Growth Schedule" : "View Annual Asset Growth & Fee Amortization Schedule"}</span>
            </button>

            <button
              type="button"
              onClick={handleExportBox1CSV}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Export Schedule (CSV)</span>
            </button>
          </div>

          {b1ShowSchedule && (
            <div className="mt-2 overflow-x-auto max-h-56 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
              <table className="w-full text-center border-collapse font-sans tabular-nums">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold sticky top-0">
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="p-2">Year</th>
                    <th className="p-2">Starting Balance</th>
                    <th className="p-2">Contributions</th>
                    <th className="p-2">Interest Earned</th>
                    <th className="p-2">Operating Expenses</th>
                    <th className="p-2">Ending Balance</th>
                    <th className="p-2">Total Principal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {b1Calc.schedule.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-1.5 font-bold text-slate-600 dark:text-slate-400">Year {row.year}</td>
                      <td className="p-1.5">${row.startingBalance.toLocaleString()}</td>
                      <td className="p-1.5">${row.contributions.toLocaleString()}</td>
                      <td className="p-1.5 text-emerald-600 font-bold">${row.grossInterestEarned.toLocaleString()}</td>
                      <td className="p-1.5 text-amber-600 font-bold">${row.operatingExpenses.toLocaleString()}</td>
                      <td className="p-1.5 font-extrabold text-blue-600">${row.endingBalance.toLocaleString()}</td>
                      <td className="p-1.5 text-slate-500">${row.cumulativePrincipal.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* SAVED CALCULATIONS INSIDE BOX 1 */}
          {savedBox1.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Mutual Fund Valuations ({savedBox1.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox1}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox1.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox1(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
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

      {/* =========================================================================
          BOX 2: ACTIVE MUTUAL FUND VS. LOW-COST INDEX FUND FEE DRAG COMPARATOR
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Active Mutual Fund vs. Low-Cost Index Fund / ETF Fee Drag Comparator</span>
          <button
            type="button"
            onClick={handleSaveBox2}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox2 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* INPUTS */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Fee Comparison Inputs
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Initial Investment ($)
                  </label>
                  <input
                    type="number"
                    value={b2Initial}
                    onChange={(e) => setB2Initial(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Monthly Contribution ($)
                  </label>
                  <input
                    type="number"
                    value={b2Monthly}
                    onChange={(e) => setB2Monthly(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Expected Gross Benchmark Return (%/yr)
                </label>
                <input
                  type="number"
                  step={0.1}
                  value={b2GrossReturn}
                  onChange={(e) => setB2GrossReturn(e.target.value)}
                  className={input3DClass}
                />
              </div>

              {/* ACTIVE FUND SPECS */}
              <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900/50 space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase text-amber-800 dark:text-amber-300 block">
                  Active Mutual Fund Fees
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Expense Ratio (%)</label>
                    <input
                      type="number"
                      step={0.05}
                      value={b2ActiveExp}
                      onChange={(e) => setB2ActiveExp(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Front-End Load (%)</label>
                    <input
                      type="number"
                      step={0.25}
                      value={b2ActiveLoad}
                      onChange={(e) => setB2ActiveLoad(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                </div>
              </div>

              {/* INDEX FUND SPECS */}
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900/50 space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase text-emerald-800 dark:text-emerald-300 block">
                  Passive Index Fund / ETF Fees
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Expense Ratio (%)</label>
                    <input
                      type="number"
                      step={0.01}
                      value={b2IndexExp}
                      onChange={(e) => setB2IndexExp(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Front-End Load (%)</label>
                    <input
                      type="number"
                      step={0.1}
                      value={b2IndexLoad}
                      onChange={(e) => setB2IndexLoad(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-100 dark:border-slate-800">
                Fee Erosion &amp; Wealth Advantage Over Time
              </span>

              <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase font-bold">
                    30-Year Index Fund Wealth Advantage
                  </span>
                  <span className="text-2xl font-extrabold font-sans tabular-nums text-emerald-600 dark:text-emerald-400">
                    +${b2Calc.summary30YrLoss.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">30-Yr Total Invested</span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums text-sm">
                    ${b2Calc.comparisons.find((c) => c.years === 30)?.totalInvested.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
                <table className="w-full text-center border-collapse font-sans tabular-nums">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="p-2">Horizon</th>
                      <th className="p-2">Active Fund Value</th>
                      <th className="p-2">Index Fund Value</th>
                      <th className="p-2">Index Wealth Boost</th>
                      <th className="p-2">Fee Savings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {b2Calc.comparisons.map((row) => (
                      <tr key={row.years} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-1.5 font-bold text-slate-600 dark:text-slate-400">{row.years} Years</td>
                        <td className="p-1.5 text-amber-700 dark:text-amber-400 font-bold">${row.activeEndingValue.toLocaleString()}</td>
                        <td className="p-1.5 text-blue-700 dark:text-blue-400 font-extrabold">${row.indexEndingValue.toLocaleString()}</td>
                        <td className="p-1.5 text-emerald-600 dark:text-emerald-400 font-extrabold">+${row.wealthAdvantage.toLocaleString()}</td>
                        <td className="p-1.5 text-slate-700 dark:text-slate-300 font-bold">${row.feeSavings.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleExportBox2CSV}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Export Comparison (CSV)</span>
                </button>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 2 */}
          {savedBox2.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Active vs Index Comparisons ({savedBox2.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox2}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox2.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox2(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
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

      {/* =========================================================================
          BOX 3: SYSTEMATIC INVESTMENT PLAN (SIP) WITH STEP-UP BOOSTER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Systematic Investment Plan (SIP) with Annual Step-Up Booster</span>
          <button
            type="button"
            onClick={handleSaveBox3}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox3 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* INPUTS */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                SIP Step-Up Configuration
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Initial Deposit ($)
                  </label>
                  <input
                    type="number"
                    value={b3Initial}
                    onChange={(e) => setB3Initial(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Monthly Starting SIP ($)
                  </label>
                  <input
                    type="number"
                    value={b3MonthlySIP}
                    onChange={(e) => setB3MonthlySIP(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Annual Step-Up (%)
                  </label>
                  <input
                    type="number"
                    step={1}
                    value={b3StepUp}
                    onChange={(e) => setB3StepUp(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Expected Return (%)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={b3Return}
                    onChange={(e) => setB3Return(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Expense Ratio (%)
                  </label>
                  <input
                    type="number"
                    step={0.05}
                    value={b3ExpRatio}
                    onChange={(e) => setB3ExpRatio(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Time Horizon (Years)
                  </label>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={b3Years}
                    onChange={(e) => setB3Years(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-100 dark:border-slate-800">
                Step-Up Wealth Accumulation
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/50">
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase">Ending Portfolio</span>
                  <span className="text-2xl font-extrabold font-sans tabular-nums text-blue-700 dark:text-blue-300">
                    ${b3Calc.endingBalance.toLocaleString()}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 block uppercase">Net Profit Earned</span>
                  <span className="text-2xl font-extrabold font-sans tabular-nums text-emerald-600 dark:text-emerald-400">
                    ${b3Calc.totalProfit.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-medium pt-1">
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Total Principal Invested:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    ${b3Calc.totalInvested.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Net Internal Rate of Return (Net IRR):</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                    {b3Calc.netIrr}% / year
                  </span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Cumulative Operating Expense Drag:</span>
                  <span className="font-bold text-red-600 dark:text-red-400 font-sans tabular-nums">
                    ${b3Calc.totalFees.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SCHEDULE TOGGLE & CSV EXPORT */}
          <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setB3ShowSchedule(!b3ShowSchedule)}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {b3ShowSchedule ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{b3ShowSchedule ? "Hide Step-Up Schedule" : "View Annual SIP Step-Up Schedule Table"}</span>
            </button>

            <button
              type="button"
              onClick={handleExportBox3CSV}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Export SIP Schedule (CSV)</span>
            </button>
          </div>

          {b3ShowSchedule && (
            <div className="mt-2 overflow-x-auto max-h-56 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
              <table className="w-full text-center border-collapse font-sans tabular-nums">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold sticky top-0">
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="p-2">Year</th>
                    <th className="p-2">Monthly SIP</th>
                    <th className="p-2">Annual Deposits</th>
                    <th className="p-2">Cumulative Invested</th>
                    <th className="p-2">Ending Balance</th>
                    <th className="p-2">Estimated Fees</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {b3Calc.schedule.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-1.5 font-bold text-slate-600 dark:text-slate-400">Year {row.year}</td>
                      <td className="p-1.5 text-blue-600 font-bold">${row.monthlyDeposit.toLocaleString()}</td>
                      <td className="p-1.5">${row.annualContributions.toLocaleString()}</td>
                      <td className="p-1.5 text-slate-500">${row.cumulativeInvested.toLocaleString()}</td>
                      <td className="p-1.5 font-extrabold text-slate-900 dark:text-slate-100">${row.endingBalance.toLocaleString()}</td>
                      <td className="p-1.5 text-red-600 font-bold">${row.totalFees.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* SAVED CALCULATIONS INSIDE BOX 3 */}
          {savedBox3.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved SIP Step-Up Calculations ({savedBox3.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox3}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox3.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox3(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
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

      {/* =========================================================================
          BOX 4: CONTINGENT DEFERRED SALES CHARGE (CDSC) TAPER SCHEDULE
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Contingent Deferred Sales Charge (CDSC) Class B Taper Schedule</span>
          <button
            type="button"
            onClick={handleSaveBox4}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox4 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* INPUTS */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                CDSC Parameters
              </span>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Initial Investment Amount ($)
                </label>
                <input
                  type="number"
                  value={b4Initial}
                  onChange={(e) => setB4Initial(e.target.value)}
                  className={input3DClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Planned Years Held
                  </label>
                  <select
                    value={b4YearsHeld}
                    onChange={(e) => setB4YearsHeld(e.target.value)}
                    className={select3DClass}
                  >
                    <option value="1">Year 1 (5% CDSC)</option>
                    <option value="2">Year 2 (4% CDSC)</option>
                    <option value="3">Year 3 (3% CDSC)</option>
                    <option value="4">Year 4 (2% CDSC)</option>
                    <option value="5">Year 5 (1% CDSC)</option>
                    <option value="6">Year 6+ (0% CDSC)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Annual Return (%)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={b4Return}
                    onChange={(e) => setB4Return(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Annual Expense Ratio (%)
                </label>
                <input
                  type="number"
                  step={0.05}
                  value={b4ExpRatio}
                  onChange={(e) => setB4ExpRatio(e.target.value)}
                  className={input3DClass}
                />
              </div>
            </div>

            {/* RESULTS */}
            <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-100 dark:border-slate-800">
                Redemption Penalty &amp; Net Cash Payout
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/50">
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase">Net Cash Payout</span>
                  <span className="text-2xl font-extrabold font-sans tabular-nums text-blue-700 dark:text-blue-300">
                    ${b4Calc.netCashReceived.toLocaleString()}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 block uppercase">CDSC Penalty Fee</span>
                  <span className="text-2xl font-extrabold font-sans tabular-nums text-amber-600 dark:text-amber-400">
                    ${b4Calc.redemptionPenalty.toLocaleString()} ({b4Calc.applicableCdscPercent}%)
                  </span>
                </div>
              </div>

              {/* TAPER TABLE */}
              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
                <table className="w-full text-center border-collapse font-sans tabular-nums">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="p-1.5">Holding Year</th>
                      <th className="p-1.5">CDSC Rate</th>
                      <th className="p-1.5">Gross Value</th>
                      <th className="p-1.5">Exit Penalty</th>
                      <th className="p-1.5">Net Payout</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {b4Calc.schedule.map((row) => (
                      <tr
                        key={row.year}
                        className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 ${
                          row.year === b4Calc.holdingYearSelected ? "bg-blue-50 dark:bg-blue-950/60 font-bold" : ""
                        }`}
                      >
                        <td className="p-1.5 font-bold">Year {row.year}</td>
                        <td className="p-1.5 text-amber-600">{row.cdscRate}%</td>
                        <td className="p-1.5">${row.projectedGrossValue.toLocaleString()}</td>
                        <td className="p-1.5 text-red-600 font-bold">${row.exitPenaltyDollar.toLocaleString()}</td>
                        <td className="p-1.5 text-blue-600 font-extrabold">${row.netPayoutToInvestor.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleExportBox4CSV}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Export CDSC Schedule (CSV)</span>
                </button>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 4 */}
          {savedBox4.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved CDSC Calculations ({savedBox4.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox4}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox4.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox4(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
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

      {/* =========================================================================
          BOX 5: REAL INFLATION-ADJUSTED & CAPITAL GAINS TAX ESTIMATOR
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Real Inflation-Adjusted &amp; Capital Gains Tax Estimator</span>
          <button
            type="button"
            onClick={handleSaveBox5}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox5 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* INPUTS */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Tax &amp; Inflation Parameters
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Initial Deposit ($)
                  </label>
                  <input
                    type="number"
                    value={b5Initial}
                    onChange={(e) => setB5Initial(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Monthly Deposit ($)
                  </label>
                  <input
                    type="number"
                    value={b5Monthly}
                    onChange={(e) => setB5Monthly(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Nominal Return (%)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={b5Return}
                    onChange={(e) => setB5Return(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Expense Ratio (%)
                  </label>
                  <input
                    type="number"
                    step={0.05}
                    value={b5ExpRatio}
                    onChange={(e) => setB5ExpRatio(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Years Held
                  </label>
                  <input
                    type="number"
                    value={b5Years}
                    onChange={(e) => setB5Years(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Inflation Rate (%)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={b5Inflation}
                    onChange={(e) => setB5Inflation(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Cap Gains Tax (%)
                  </label>
                  <input
                    type="number"
                    step={1}
                    value={b5TaxRate}
                    onChange={(e) => setB5TaxRate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-100 dark:border-slate-800">
                Real Purchasing Power Breakdown
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/50">
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase">Real Purchasing Power</span>
                  <span className="text-2xl font-extrabold font-sans tabular-nums text-blue-700 dark:text-blue-300">
                    ${b5Calc.realPurchasingPowerBalance.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 block">Adjusted for {b5Inflation}% inflation</span>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 block uppercase">After-Tax Ending Balance</span>
                  <span className="text-2xl font-extrabold font-sans tabular-nums text-slate-900 dark:text-slate-100">
                    ${b5Calc.afterTaxEndingBalance.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 block">After {b5TaxRate}% capital gains tax</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-medium pt-1">
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Nominal Ending Portfolio Balance:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    ${b5Calc.nominalEndingValue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Estimated Capital Gains Tax:</span>
                  <span className="font-bold text-red-600 dark:text-red-400 font-sans tabular-nums">
                    -${b5Calc.estimatedTaxAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Purchasing Power Lost to Inflation:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400 font-sans tabular-nums">
                    -${b5Calc.inflationPurchasingPowerLoss.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 5 */}
          {savedBox5.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Inflation &amp; Tax Calculations ({savedBox5.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox5}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox5.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox5(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
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

      {/* =========================================================================
          BOX 6: TARGET WEALTH & RETIREMENT GOAL SOLVER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Target Wealth &amp; Retirement Goal Solver (Reverse Calculator)</span>
          <button
            type="button"
            onClick={handleSaveBox6}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox6 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* INPUTS */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200/80 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Target Wealth Goal
                </span>
                <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-800 p-0.5 rounded-lg text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setB6SolveFor("monthly")}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                      b6SolveFor === "monthly" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Solve Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setB6SolveFor("lumpSum")}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                      b6SolveFor === "lumpSum" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Solve Lump-Sum
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Target Future Nest Egg ($)
                </label>
                <input
                  type="number"
                  step={10000}
                  value={b6Target}
                  onChange={(e) => setB6Target(e.target.value)}
                  className={input3DClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Time Horizon (Years)
                  </label>
                  <input
                    type="number"
                    step={1}
                    value={b6Years}
                    onChange={(e) => setB6Years(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Expected Return (%)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={b6Return}
                    onChange={(e) => setB6Return(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Expense Ratio (%)
                  </label>
                  <input
                    type="number"
                    step={0.05}
                    value={b6ExpRatio}
                    onChange={(e) => setB6ExpRatio(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Front-End Load (%)
                  </label>
                  <input
                    type="number"
                    step={0.25}
                    value={b6FrontLoad}
                    onChange={(e) => setB6FrontLoad(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-100 dark:border-slate-800">
                Required Investment Contribution
              </span>

              <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase font-bold">
                    Required {b6SolveFor === "monthly" ? "Monthly Contribution" : "Initial Lump-Sum"}
                  </span>
                  <span className="text-2xl font-extrabold font-sans tabular-nums text-blue-700 dark:text-blue-300">
                    ${b6Calc.requiredAmount.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Target Nest Egg</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums text-base">
                    ${b6Calc.targetWealth.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-medium pt-1">
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Total Principal to Deposit:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    ${b6Calc.totalInvested.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Total Compound Growth Profit:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums">
                    ${b6Calc.totalProfit.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Estimated Fee Drag Incurred:</span>
                  <span className="font-bold text-red-600 dark:text-red-400 font-sans tabular-nums">
                    ${b6Calc.totalEstimatedFees.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 6 */}
          {savedBox6.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Target Goal Calculations ({savedBox6.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox6}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox6.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox6(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
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
    </div>
  );
}

export default MutualFundCalculator;
