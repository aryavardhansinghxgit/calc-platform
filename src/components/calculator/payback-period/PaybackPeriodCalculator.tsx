"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, Plus, Download, ChevronDown, ChevronUp, CheckCircle, XCircle, Clock, DollarSign, TrendingUp, BarChart2 } from "lucide-react";
import {
  calculateIrregularPayback,
  calculateFixedPayback,
  calculateMonthlyPayback,
  calculateProjectComparison,
  calculateTargetHurdle,
  generatePaybackSensitivityMatrix,
} from "@/app/calculators/payback-period-calculator/calculator";
import { AnnualPaybackFlowRow, SavedPaybackItem } from "@/app/calculators/payback-period-calculator/types";

export function PaybackPeriodCalculator() {
  const input3DClass =
    "w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none transition-all text-xs";
  const select3DClass =
    "w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none cursor-pointer text-xs";
  const outerBox3DClass =
    "border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs";

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
  // BOX 1: CORE IRREGULAR ANNUAL CASH FLOW PAYBACK & DPP
  // =========================================================================
  const [b1Outlay, setB1Outlay] = useState<string>("100000");
  const [b1Discount, setB1Discount] = useState<string>("10.0");
  const [b1Flows, setB1Flows] = useState<AnnualPaybackFlowRow[]>([
    { year: 1, amount: 5000 },
    { year: 2, amount: 25000 },
    { year: 3, amount: 35000 },
    { year: 4, amount: 40000 },
    { year: 5, amount: 30000 },
    { year: 6, amount: 10000 },
  ]);
  const [b1ShowSchedule, setB1ShowSchedule] = useState<boolean>(false);

  const [savedBox1, setSavedBox1] = useState<SavedPaybackItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);

  // =========================================================================
  // BOX 2: FIXED / ANNUITY CASH FLOW PAYBACK & ESCALATION
  // =========================================================================
  const [b2Outlay, setB2Outlay] = useState<string>("100000");
  const [b2CashFlow, setB2CashFlow] = useState<string>("30000");
  const [b2IncreaseRate, setB2IncreaseRate] = useState<string>("5.0");
  const [b2NumberYears, setB2NumberYears] = useState<string>("5");
  const [b2DiscountRate, setB2DiscountRate] = useState<string>("10.0");
  const [b2ShowSchedule, setB2ShowSchedule] = useState<boolean>(false);

  const [savedBox2, setSavedBox2] = useState<SavedPaybackItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);

  // =========================================================================
  // BOX 3: MONTHLY & PERIODIC PAYBACK SOLVER
  // =========================================================================
  const [b3Outlay, setB3Outlay] = useState<string>("25000");
  const [b3MonthlyFlow, setB3MonthlyFlow] = useState<string>("1200");
  const [b3AnnualDiscount, setB3AnnualDiscount] = useState<string>("8.0");
  const [b3HoldingMonths, setB3HoldingMonths] = useState<string>("36");

  const [savedBox3, setSavedBox3] = useState<SavedPaybackItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);

  // =========================================================================
  // BOX 4: SIDE-BY-SIDE CAPITAL PROJECT COMPARATOR (A VS B)
  // =========================================================================
  const [b4OutlayA, setB4OutlayA] = useState<string>("100000");
  const [b4FlowsA, setB4FlowsA] = useState<string>("40000, 40000, 30000, 10000, 5000");
  const [b4OutlayB, setB4OutlayB] = useState<string>("100000");
  const [b4FlowsB, setB4FlowsB] = useState<string>("10000, 20000, 35000, 50000, 60000");
  const [b4Discount, setB4Discount] = useState<string>("10.0");

  const [savedBox4, setSavedBox4] = useState<SavedPaybackItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);

  // =========================================================================
  // BOX 5: TARGET PAYBACK HURDLE SOLVER (REVERSE SOLVER)
  // =========================================================================
  const [b5Outlay, setB5Outlay] = useState<string>("100000");
  const [b5TargetYears, setB5TargetYears] = useState<string>("3.0");
  const [b5Discount, setB5Discount] = useState<string>("10.0");
  const [b5LifeYears, setB5LifeYears] = useState<string>("5");

  const [savedBox5, setSavedBox5] = useState<SavedPaybackItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);

  // =========================================================================
  // BOX 6: SENSITIVITY MATRIX & DISCOUNT RATE STRESS TEST
  // =========================================================================
  const [savedBox6, setSavedBox6] = useState<SavedPaybackItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_pb_box1");
      if (s1) setSavedBox1(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_pb_box2");
      if (s2) setSavedBox2(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_pb_box3");
      if (s3) setSavedBox3(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_pb_box4");
      if (s4) setSavedBox4(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_pb_box5");
      if (s5) setSavedBox5(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_pb_box6");
      if (s6) setSavedBox6(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Box 1 Calculations
  const b1Calc = useMemo(() => {
    return calculateIrregularPayback({
      initialInvestment: parseFloat(b1Outlay) || 0,
      discountRate: parseFloat(b1Discount) || 0,
      cashFlows: b1Flows,
    });
  }, [b1Outlay, b1Discount, b1Flows]);

  const handleAddFlowRow = () => {
    const nextYr = b1Flows.length + 1;
    setB1Flows([...b1Flows, { year: nextYr, amount: 20000 }]);
  };

  const handleRemoveFlowRow = (year: number) => {
    const updated = b1Flows.filter((f) => f.year !== year).map((f, idx) => ({ ...f, year: idx + 1 }));
    setB1Flows(updated);
  };

  const handleUpdateFlowAmount = (year: number, amount: number) => {
    setB1Flows(b1Flows.map((f) => (f.year === year ? { ...f, amount } : f)));
  };

  const handleExportBox1CSV = () => {
    if (!b1Calc.schedule || b1Calc.schedule.length === 0) return;
    const headers = [
      "Year",
      "Nominal Cash Flow ($)",
      "Discount Factor",
      "Discounted Cash Flow ($)",
      "Cumulative Nominal Inflows ($)",
      "Unrecovered Nominal Balance ($)",
      "Cumulative Discounted Inflows ($)",
      "Unrecovered Discounted Balance ($)",
    ];
    const rows = b1Calc.schedule.map((r) => [
      r.year,
      r.nominalCashFlow,
      r.discountFactor,
      r.discountedCashFlow,
      r.cumulativeNominalCashFlow,
      r.unrecoveredNominalBalance,
      r.cumulativeDiscountedCashFlow,
      r.unrecoveredDiscountedBalance,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("irregular_payback_schedule.csv", csv);
  };

  const handleSaveBox1 = () => {
    const inputsStr = `Outlay: $${b1Outlay} | ${b1Flows.length} Yrs | Discount: ${b1Discount}%`;
    const primaryStr = `Simple Payback: ${b1Calc.simplePaybackFormatted} | DPP: ${b1Calc.discountedPaybackFormatted}`;

    const detailsList = [
      `Simple Payback Period: ${b1Calc.simplePaybackFormatted}`,
      `Discounted Payback Period (DPP): ${b1Calc.discountedPaybackFormatted}`,
      `Net Present Value (NPV @ ${b1Discount}%): $${b1Calc.npv.toLocaleString()}`,
      `Internal Rate of Return (IRR): ${b1Calc.irrPercent}% / year`,
      `Profitability Index (PI): ${b1Calc.profitabilityIndex}`,
      `Total Nominal Inflows: $${b1Calc.totalNominalInflows.toLocaleString()} | Net Profit: $${b1Calc.netNominalProfit.toLocaleString()}`,
      `Breakeven Status: ${b1Calc.discountedBreakevenAchieved ? "Achieved within Life Horizon" : "Never Breaks Even"}`,
    ];

    const newItem: SavedPaybackItem = {
      id: Date.now().toString(),
      title: "Irregular Cash Flow Payback & DPP",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox1.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_pb_box1", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleDeleteSavedBox1 = (id: string) => {
    const updated = savedBox1.filter((item) => item.id !== id);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_pb_box1", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox1 = () => {
    setSavedBox1([]);
    try {
      localStorage.removeItem("saved_pb_box1");
    } catch (e) {}
  };

  // Box 2 Calculations
  const b2Calc = useMemo(() => {
    return calculateFixedPayback({
      initialInvestment: parseFloat(b2Outlay) || 0,
      annualCashFlow: parseFloat(b2CashFlow) || 0,
      annualIncreaseRate: parseFloat(b2IncreaseRate) || 0,
      numberYears: parseFloat(b2NumberYears) || 5,
      discountRate: parseFloat(b2DiscountRate) || 0,
    });
  }, [b2Outlay, b2CashFlow, b2IncreaseRate, b2NumberYears, b2DiscountRate]);

  const handleExportBox2CSV = () => {
    const headers = ["Year", "Nominal Flow ($)", "Discount Factor", "Discounted Flow ($)", "Cumulative Balance ($)"];
    const rows = b2Calc.schedule.map((r) => [r.year, r.nominalCashFlow, r.discountFactor, r.discountedCashFlow, r.unrecoveredDiscountedBalance]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("fixed_payback_schedule.csv", csv);
  };

  const handleSaveBox2 = () => {
    const inputsStr = `Outlay: $${b2Outlay} | Base CF: $${b2CashFlow}/yr (+${b2IncreaseRate}%) | ${b2NumberYears} Yrs | Rate: ${b2DiscountRate}%`;
    const primaryStr = `Simple Payback: ${b2Calc.simplePaybackFormatted} | DPP: ${b2Calc.discountedPaybackFormatted}`;

    const detailsList = [
      `Simple Payback Period: ${b2Calc.simplePaybackFormatted}`,
      `Discounted Payback Period (DPP): ${b2Calc.discountedPaybackFormatted}`,
      `Net Present Value: $${b2Calc.npv.toLocaleString()}`,
      `Total Undiscounted Inflows: $${b2Calc.totalNominalInflows.toLocaleString()}`,
      `Net Nominal Profit: $${b2Calc.netNominalProfit.toLocaleString()}`,
      b2Calc.closedFormDppUniform > 0 ? `Closed-Form Uniform DPP: ${b2Calc.closedFormDppUniform} Years` : "Escalation Mode",
    ];

    const newItem: SavedPaybackItem = {
      id: Date.now().toString(),
      title: "Fixed Annuity Payback & Escalation",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox2.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_pb_box2", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  const handleDeleteSavedBox2 = (id: string) => {
    const updated = savedBox2.filter((item) => item.id !== id);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_pb_box2", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox2 = () => {
    setSavedBox2([]);
    try {
      localStorage.removeItem("saved_pb_box2");
    } catch (e) {}
  };

  // Box 3 Calculations (Monthly Payback)
  const b3Calc = useMemo(() => {
    return calculateMonthlyPayback({
      initialInvestment: parseFloat(b3Outlay) || 0,
      monthlyCashFlow: parseFloat(b3MonthlyFlow) || 0,
      annualDiscountRate: parseFloat(b3AnnualDiscount) || 0,
      holdingMonths: parseFloat(b3HoldingMonths) || 36,
    });
  }, [b3Outlay, b3MonthlyFlow, b3AnnualDiscount, b3HoldingMonths]);

  const handleExportBox3CSV = () => {
    const headers = ["Month", "Nominal Flow ($)", "Discounted Flow ($)", "Cumulative Nominal ($)", "Cumulative Discounted ($)"];
    const rows = b3Calc.schedule.map((r) => [r.month, r.nominalFlow, r.discountedFlow, r.cumulativeNominal, r.cumulativeDiscounted]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("monthly_payback_schedule.csv", csv);
  };

  const handleSaveBox3 = () => {
    const inputsStr = `Outlay: $${b3Outlay} | $${b3MonthlyFlow}/mo | ${b3HoldingMonths} Mos | Discount: ${b3AnnualDiscount}%`;
    const primaryStr = `Simple Payback: ${b3Calc.simplePaybackFormatted} | DPP: ${b3Calc.discountedPaybackFormatted}`;

    const detailsList = [
      `Simple Payback (Months): ${b3Calc.simplePaybackFormatted}`,
      `Discounted Payback (Months): ${b3Calc.discountedPaybackFormatted}`,
      `Net Present Value: $${b3Calc.npv.toLocaleString()}`,
      `Total Cumulative Inflows: $${b3Calc.totalInflows.toLocaleString()}`,
    ];

    const newItem: SavedPaybackItem = {
      id: Date.now().toString(),
      title: "Monthly Payback Period Solver",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox3.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_pb_box3", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  const handleDeleteSavedBox3 = (id: string) => {
    const updated = savedBox3.filter((item) => item.id !== id);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_pb_box3", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox3 = () => {
    setSavedBox3([]);
    try {
      localStorage.removeItem("saved_pb_box3");
    } catch (e) {}
  };

  // Box 4 Calculations (Project Comparison)
  const b4Calc = useMemo(() => {
    const flowsA = b4FlowsA.split(/[,;\s]+/).map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));
    const flowsB = b4FlowsB.split(/[,;\s]+/).map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));

    return calculateProjectComparison({
      outlayA: parseFloat(b4OutlayA) || 0,
      flowsA,
      outlayB: parseFloat(b4OutlayB) || 0,
      flowsB,
      discountRate: parseFloat(b4Discount) || 10,
    });
  }, [b4OutlayA, b4FlowsA, b4OutlayB, b4FlowsB, b4Discount]);

  const handleExportBox4CSV = () => {
    const headers = ["Metric", "Project A", "Project B", "Analysis"];
    const rows = [
      ["Initial Outlay ($)", `$${b4OutlayA}`, `$${b4OutlayB}`, "-"],
      ["Simple Payback Period", `${b4Calc.paybackA} Years`, `${b4Calc.paybackB} Years`, `Delta: ${(b4Calc.paybackA - b4Calc.paybackB).toFixed(2)} yrs`],
      ["Discounted Payback (DPP)", `${b4Calc.dppA} Years`, `${b4Calc.dppB} Years`, "-"],
      ["Net Present Value (NPV)", `$${b4Calc.npvA.toLocaleString()}`, `$${b4Calc.npvB.toLocaleString()}`, `Advantage: $${Math.abs(b4Calc.npvA - b4Calc.npvB).toLocaleString()}`],
      ["Post-Payback Net Profit", `$${b4Calc.postPaybackProfitA.toLocaleString()}`, `$${b4Calc.postPaybackProfitB.toLocaleString()}`, "-"],
      ["Recommendation", b4Calc.recommendation, "-", b4Calc.reasoning],
    ];
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("project_payback_comparison.csv", csv);
  };

  const handleSaveBox4 = () => {
    const inputsStr = `Project A ($${b4OutlayA}) vs Project B ($${b4OutlayB}) | Discount: ${b4Discount}%`;
    const primaryStr = `Winner: ${b4Calc.recommendation} | Proj A PB: ${b4Calc.paybackA}y vs Proj B PB: ${b4Calc.paybackB}y`;

    const detailsList = [
      `Project A: Payback ${b4Calc.paybackA}y | DPP ${b4Calc.dppA}y | NPV $${b4Calc.npvA.toLocaleString()}`,
      `Project B: Payback ${b4Calc.paybackB}y | DPP ${b4Calc.dppB}y | NPV $${b4Calc.npvB.toLocaleString()}`,
      `Post-Payback Profit: Project A $${b4Calc.postPaybackProfitA.toLocaleString()} vs Project B $${b4Calc.postPaybackProfitB.toLocaleString()}`,
      `Strategic Recommendation: ${b4Calc.recommendation}`,
      `Rationale: ${b4Calc.reasoning}`,
    ];

    const newItem: SavedPaybackItem = {
      id: Date.now().toString(),
      title: "Project A vs Project B Payback Comparison",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox4.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_pb_box4", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  const handleDeleteSavedBox4 = (id: string) => {
    const updated = savedBox4.filter((item) => item.id !== id);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_pb_box4", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox4 = () => {
    setSavedBox4([]);
    try {
      localStorage.removeItem("saved_pb_box4");
    } catch (e) {}
  };

  // Box 5 Calculations (Target Hurdle Solver)
  const b5Calc = useMemo(() => {
    return calculateTargetHurdle({
      initialInvestment: parseFloat(b5Outlay) || 100000,
      targetPaybackYears: parseFloat(b5TargetYears) || 3,
      discountRate: parseFloat(b5Discount) || 10,
      projectLifeYears: parseFloat(b5LifeYears) || 5,
    });
  }, [b5Outlay, b5TargetYears, b5Discount, b5LifeYears]);

  const handleSaveBox5 = () => {
    const inputsStr = `Target: ${b5TargetYears} Yrs | Outlay: $${b5Outlay} | Discount: ${b5Discount}%`;
    const primaryStr = `Req Annual Flow: $${b5Calc.requiredAnnualCashFlowSimple.toLocaleString()}/yr (Discounted: $${b5Calc.requiredAnnualCashFlowDiscounted.toLocaleString()}/yr)`;

    const detailsList = [
      `Required Annual Cash Flow (Simple): $${b5Calc.requiredAnnualCashFlowSimple.toLocaleString()} / year`,
      `Required Annual Cash Flow (Discounted @ ${b5Discount}%): $${b5Calc.requiredAnnualCashFlowDiscounted.toLocaleString()} / year`,
      `Max Allowable Investment: $${b5Calc.maxAllowableInvestmentForTarget.toLocaleString()}`,
    ];

    const newItem: SavedPaybackItem = {
      id: Date.now().toString(),
      title: "Target Payback Hurdle Solver",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox5.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_pb_box5", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  const handleDeleteSavedBox5 = (id: string) => {
    const updated = savedBox5.filter((item) => item.id !== id);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_pb_box5", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox5 = () => {
    setSavedBox5([]);
    try {
      localStorage.removeItem("saved_pb_box5");
    } catch (e) {}
  };

  // Box 6 Calculations (Sensitivity Matrix from Box 1 inputs)
  const b6Matrix = useMemo(() => {
    const outlay = parseFloat(b1Outlay) || 100000;
    const flows = b1Flows.map((f) => f.amount);
    return generatePaybackSensitivityMatrix(outlay, flows);
  }, [b1Outlay, b1Flows]);

  const handleExportBox6CSV = () => {
    const headers = ["Discount Rate (%)", "Cash Flow Variance (%)", "Simple Payback (Yrs)", "Discounted Payback (Yrs)", "NPV ($)"];
    const rows = b6Matrix.map((cell) => [
      `${cell.discountRate}%`,
      `${cell.cashFlowVariancePercent > 0 ? "+" : ""}${cell.cashFlowVariancePercent}%`,
      cell.simplePaybackYears,
      cell.discountedPaybackYears,
      cell.npv,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("payback_sensitivity_stress_matrix.csv", csv);
  };

  const handleSaveBox6 = () => {
    const inputsStr = `Outlay: $${b1Outlay} | ${b1Flows.length} Yrs | Base PB: ${b1Calc.simplePaybackYears}y`;
    const primaryStr = `Base Payback: ${b1Calc.simplePaybackYears}y | Base DPP: ${b1Calc.discountedPaybackYears}y | Sensitivity Grid: 35 Scenarios`;

    const detailsList = [
      `Base Case Simple Payback: ${b1Calc.simplePaybackYears} Years`,
      `Base Case DPP (@ ${b1Discount}%): ${b1Calc.discountedPaybackYears} Years`,
      `Stress Test Range: 0% to 20% Discount Rate across -20% to +20% Cash Flow Variances`,
    ];

    const newItem: SavedPaybackItem = {
      id: Date.now().toString(),
      title: "Payback Sensitivity & Stress Matrix",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox6.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_pb_box6", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  const handleDeleteSavedBox6 = (id: string) => {
    const updated = savedBox6.filter((item) => item.id !== id);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_pb_box6", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox6 = () => {
    setSavedBox6([]);
    try {
      localStorage.removeItem("saved_pb_box6");
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* =========================================================================
          BOX 1: CORE IRREGULAR ANNUAL CASH FLOW PAYBACK & DPP SUITE
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Payback Period &amp; Discounted Payback Period (Irregular Annual Cash Flows)</span>
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
            {/* LEFT INPUTS */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Initial Capital Outlay &amp; Hurdle Rate
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Initial Investment ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={5000}
                    value={b1Outlay}
                    onChange={(e) => setB1Outlay(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Discount Rate / WACC (%)
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    value={b1Discount}
                    onChange={(e) => setB1Discount(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              {/* DYNAMIC ANNUAL CASH FLOW ROWS */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase text-slate-700 dark:text-slate-300">
                    Annual Net Cash Inflow Log ($)
                  </span>
                  <button
                    type="button"
                    onClick={handleAddFlowRow}
                    className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 text-[11px] font-bold flex items-center gap-1 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer border border-blue-200 dark:border-blue-800"
                  >
                    <Plus className="w-3 h-3" /> Add Year
                  </button>
                </div>

                <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                  {b1Flows.map((flow) => (
                    <div key={flow.year} className="grid grid-cols-12 gap-1.5 items-center">
                      <div className="col-span-3">
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Year {flow.year}:</span>
                      </div>
                      <div className="col-span-8">
                        <input
                          type="number"
                          step={1000}
                          placeholder={`Year ${flow.year} Cash Flow`}
                          value={flow.amount}
                          onChange={(e) => handleUpdateFlowAmount(flow.year, parseFloat(e.target.value) || 0)}
                          className={input3DClass}
                        />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveFlowRow(flow.year)}
                          className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT RESULTS */}
            <div className="lg:col-span-6 space-y-3">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Simple Payback Period
                    </span>
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                      {b1Calc.simplePaybackFormatted}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Capital Recovery Status</span>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-extrabold inline-flex items-center gap-1 font-sans ${
                        b1Calc.discountedBreakevenAchieved
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300"
                      }`}
                    >
                      {b1Calc.discountedBreakevenAchieved ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      <span>{b1Calc.discountedBreakevenAchieved ? "BREAKEVEN ACHIEVED" : "POST-HORIZON RECOVERY"}</span>
                    </span>
                  </div>
                </div>

                {/* PRIMARY METRICS GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold font-sans tabular-nums">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Discounted Payback (DPP)</span>
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold text-[11px]">
                      {b1Calc.discountedPaybackFormatted}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Net Present Value</span>
                    <span className={`font-extrabold ${b1Calc.npv >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600"}`}>
                      ${b1Calc.npv.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Project IRR</span>
                    <span className="text-slate-900 dark:text-slate-100 font-extrabold">
                      {b1Calc.irrPercent}% / yr
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Profitability Index</span>
                    <span className="text-amber-600 dark:text-amber-400 font-extrabold">
                      {b1Calc.profitabilityIndex}
                    </span>
                  </div>
                </div>

                {/* SUMMARY DETAILS */}
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium space-y-1">
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Total Nominal Cash Inflows:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                      +${b1Calc.totalNominalInflows.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Net Cumulative Profit Created:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums">
                      +${b1Calc.netNominalProfit.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Discounted Cash Value Added (PV):</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                      +${b1Calc.totalDiscountedInflows.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC SVG CUMULATIVE BREAKEVEN STEP CURVE */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Cumulative Unrecovered Investment Balance &amp; Breakeven Points
              </span>
              <div className="flex items-center gap-3 text-[10px] font-bold">
                <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span> Nominal Recovery
                </span>
                <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Discounted Recovery (PV)
                </span>
              </div>
            </div>

            <div className="h-44 w-full flex items-center justify-center relative">
              {(() => {
                const sched = b1Calc.schedule;
                if (!sched || sched.length === 0) return null;

                const maxNom = Math.max(...sched.map((s) => s.cumulativeNominalCashFlow), parseFloat(b1Outlay) || 100000);
                const minNom = -Math.abs(parseFloat(b1Outlay) || 100000);
                const range = maxNom - minNom || 1;

                const zeroY = 15 + ((maxNom - 0) / range) * 115;
                const nYears = sched.length - 1 || 1;

                const nomCoords = sched.map((s) => {
                  const x = 50 + (s.year / nYears) * 430;
                  const y = 15 + ((maxNom - s.cumulativeNominalCashFlow) / range) * 115;
                  return { x, y, ...s };
                });

                const discCoords = sched.map((s) => {
                  const x = 50 + (s.year / nYears) * 430;
                  const y = 15 + ((maxNom - s.cumulativeDiscountedCashFlow) / range) * 115;
                  return { x, y, ...s };
                });

                const nomPathD = nomCoords.reduce((acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), "");
                const discPathD = discCoords.reduce((acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), "");

                // Simple payback marker X
                const simpleX = b1Calc.simpleBreakevenAchieved ? 50 + (b1Calc.simplePaybackYears / nYears) * 430 : 0;
                // Discounted payback marker X
                const discX = b1Calc.discountedBreakevenAchieved ? 50 + (b1Calc.discountedPaybackYears / nYears) * 430 : 0;

                return (
                  <svg className="w-full h-full" viewBox="0 0 500 165">
                    {/* Outlay Baseline */}
                    <line x1="50" y1="130" x2="480" y2="130" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                    <text x="45" y="133" textAnchor="end" fontSize="8" fill="#ef4444" fontFamily="sans-serif">
                      -$0
                    </text>

                    {/* Zero Breakeven Line */}
                    <line x1="50" y1={zeroY} x2="480" y2={zeroY} stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
                    <text x="45" y={zeroY + 3} textAnchor="end" fontSize="9" fontWeight="bold" fill="#10b981" fontFamily="sans-serif">
                      Breakeven
                    </text>

                    {/* Nominal Curve */}
                    <path d={nomPathD} fill="none" stroke="#2563eb" strokeWidth="2.5" />
                    {/* Discounted Curve */}
                    <path d={discPathD} fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />

                    {/* Simple Payback Marker */}
                    {b1Calc.simpleBreakevenAchieved && (
                      <>
                        <line x1={simpleX} y1="10" x2={simpleX} y2="135" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 2" />
                        <circle cx={simpleX} cy={zeroY} r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                      </>
                    )}

                    {/* Discounted Payback Marker */}
                    {b1Calc.discountedBreakevenAchieved && (
                      <>
                        <line x1={discX} y1="10" x2={discX} y2="135" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />
                        <circle cx={discX} cy={zeroY} r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                      </>
                    )}

                    {/* Year X Ticks */}
                    {sched.map((s) => {
                      const x = 50 + (s.year / nYears) * 430;
                      return (
                        <g key={s.year}>
                          <line x1={x} y1="135" x2={x} y2="140" stroke="#64748b" />
                          <text x={x} y="152" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="sans-serif">
                            {s.year === 0 ? "Start" : `Yr ${s.year}`}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                );
              })()}
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
              <span>{b1ShowSchedule ? "Hide Recovery Schedule" : "View Complete Annual Discounted Capital Recovery Schedule"}</span>
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
                    <th className="p-2">Nominal Cash Flow</th>
                    <th className="p-2">Discount Factor ({b1Discount}%)</th>
                    <th className="p-2">Discounted PV</th>
                    <th className="p-2">Cumulative Nominal</th>
                    <th className="p-2">Unrecovered Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {b1Calc.schedule.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-1.5 font-bold text-slate-700 dark:text-slate-300">
                        {row.year === 0 ? "Outlay (Year 0)" : `Year ${row.year}`}
                      </td>
                      <td className={`p-1.5 font-bold ${row.nominalCashFlow < 0 ? "text-red-600" : "text-emerald-600"}`}>
                        ${row.nominalCashFlow.toLocaleString()}
                      </td>
                      <td className="p-1.5 text-slate-500">{row.discountFactor}</td>
                      <td className="p-1.5 text-blue-600 font-bold">${row.discountedCashFlow.toLocaleString()}</td>
                      <td className="p-1.5 text-slate-600 dark:text-slate-400">${row.cumulativeNominalCashFlow.toLocaleString()}</td>
                      <td className={`p-1.5 font-extrabold ${row.unrecoveredNominalBalance >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        ${row.unrecoveredNominalBalance.toLocaleString()}
                      </td>
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
                  <span>Saved Irregular Payback Calculations ({savedBox1.length})</span>
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
          BOX 2: FIXED / ANNUITY CASH FLOW PAYBACK & ESCALATION
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Fixed / Annuity Cash Flow Payback &amp; Escalation Solver</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* INPUTS */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Fixed Cash Flow Parameters
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Initial Investment ($)
                  </label>
                  <input
                    type="number"
                    value={b2Outlay}
                    onChange={(e) => setB2Outlay(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Annual Cash Flow ($/Yr)
                  </label>
                  <input
                    type="number"
                    value={b2CashFlow}
                    onChange={(e) => setB2CashFlow(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Increase (%)
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    value={b2IncreaseRate}
                    onChange={(e) => setB2IncreaseRate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Lifespan (Yrs)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={b2NumberYears}
                    onChange={(e) => setB2NumberYears(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    value={b2DiscountRate}
                    onChange={(e) => setB2DiscountRate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Fixed Simple Payback Period
                  </span>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    {b2Calc.simplePaybackFormatted}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Discounted DPP</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 inline-block font-sans tabular-nums">
                    {b2Calc.discountedPaybackFormatted}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Net Present Value</span>
                  <span className={`font-extrabold ${b2Calc.npv >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600"}`}>
                    ${b2Calc.npv.toLocaleString()}
                  </span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Total Inflows</span>
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold">
                    ${b2Calc.totalNominalInflows.toLocaleString()}
                  </span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Net Profit</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                    +${b2Calc.netNominalProfit.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleExportBox2CSV}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Export Schedule (CSV)</span>
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
                  <span>Saved Fixed Payback Calculations ({savedBox2.length})</span>
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
          BOX 3: MONTHLY & PERIODIC PAYBACK SOLVER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Monthly &amp; Periodic Payback Period Solver</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* INPUTS */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Monthly Inflow Configuration
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Initial Investment ($)
                  </label>
                  <input
                    type="number"
                    value={b3Outlay}
                    onChange={(e) => setB3Outlay(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Monthly Cash Flow ($/Mo)
                  </label>
                  <input
                    type="number"
                    value={b3MonthlyFlow}
                    onChange={(e) => setB3MonthlyFlow(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Annual Discount Rate (%)
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    value={b3AnnualDiscount}
                    onChange={(e) => setB3AnnualDiscount(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Lifespan (Months)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={b3HoldingMonths}
                    onChange={(e) => setB3HoldingMonths(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Monthly Simple Payback
                  </span>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    {b3Calc.simplePaybackFormatted}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Monthly DPP</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 inline-block font-sans tabular-nums">
                    {b3Calc.discountedPaybackFormatted}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Net Present Value</span>
                  <span className={`text-sm font-extrabold ${b3Calc.npv >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600"}`}>
                    ${b3Calc.npv.toLocaleString()}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Total Inflows</span>
                  <span className="text-sm text-slate-900 dark:text-slate-100 font-extrabold">
                    ${b3Calc.totalInflows.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleExportBox3CSV}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Export Schedule (CSV)</span>
                </button>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 3 */}
          {savedBox3.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Monthly Payback Calculations ({savedBox3.length})</span>
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
          BOX 4: SIDE-BY-SIDE CAPITAL PROJECT COMPARATOR (PROJECT A VS B)
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Capital Project Comparator (Fast Payback vs. High Lifetime NPV)</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* INPUTS */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Competing Proposals
              </span>

              {/* PROJECT A */}
              <div className="p-2.5 bg-blue-50/60 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900/50 space-y-1.5">
                <span className="text-[11px] font-extrabold uppercase text-blue-700 dark:text-blue-300 block">
                  Project A (Front-Loaded / Fast Payback)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Outlay ($)</label>
                    <input
                      type="number"
                      value={b4OutlayA}
                      onChange={(e) => setB4OutlayA(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Annual Flows ($)</label>
                    <input
                      type="text"
                      value={b4FlowsA}
                      onChange={(e) => setB4FlowsA(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                </div>
              </div>

              {/* PROJECT B */}
              <div className="p-2.5 bg-amber-50/60 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/50 space-y-1.5">
                <span className="text-[11px] font-extrabold uppercase text-amber-700 dark:text-amber-300 block">
                  Project B (Back-Loaded / High Lifetime Wealth)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Outlay ($)</label>
                    <input
                      type="number"
                      value={b4OutlayB}
                      onChange={(e) => setB4OutlayB(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Annual Flows ($)</label>
                    <input
                      type="text"
                      value={b4FlowsB}
                      onChange={(e) => setB4FlowsB(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Cost of Capital / WACC (%)
                </label>
                <input
                  type="number"
                  step={0.5}
                  value={b4Discount}
                  onChange={(e) => setB4Discount(e.target.value)}
                  className={input3DClass}
                />
              </div>
            </div>

            {/* RESULTS */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-100 dark:border-slate-800">
                Comparative Valuation &amp; Liquidity Tradeoff
              </span>

              <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase font-bold">
                    Optimal Capital Allocation
                  </span>
                  <span className="text-2xl font-extrabold font-sans tabular-nums text-emerald-600 dark:text-emerald-400">
                    Select {b4Calc.recommendation}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2.5 bg-blue-50/70 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900/50 space-y-0.5">
                  <span className="text-[10px] text-blue-600 block uppercase">Project A Metrics</span>
                  <div>Payback: {b4Calc.paybackA} Yrs</div>
                  <div>DPP: {b4Calc.dppA} Yrs</div>
                  <div className="text-blue-700 dark:text-blue-300 font-extrabold">NPV: ${b4Calc.npvA.toLocaleString()}</div>
                  <div className="text-[11px] text-slate-500">Post-PB Profit: ${b4Calc.postPaybackProfitA.toLocaleString()}</div>
                </div>

                <div className="p-2.5 bg-amber-50/70 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/50 space-y-0.5">
                  <span className="text-[10px] text-amber-600 block uppercase">Project B Metrics</span>
                  <div>Payback: {b4Calc.paybackB} Yrs</div>
                  <div>DPP: {b4Calc.dppB} Yrs</div>
                  <div className="text-amber-700 dark:text-amber-300 font-extrabold">NPV: ${b4Calc.npvB.toLocaleString()}</div>
                  <div className="text-[11px] text-slate-500">Post-PB Profit: ${b4Calc.postPaybackProfitB.toLocaleString()}</div>
                </div>
              </div>

              <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-300">
                {b4Calc.reasoning}
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleExportBox4CSV}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Export Comparison (CSV)</span>
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
                  <span>Saved Project Comparisons ({savedBox4.length})</span>
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
          BOX 5: TARGET PAYBACK HURDLE SOLVER (REVERSE CALCULATOR)
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Target Payback Hurdle Solver (Reverse Capital Budgeting)</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* INPUTS */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Target Requirements
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Target Payback (Years)
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    value={b5TargetYears}
                    onChange={(e) => setB5TargetYears(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Initial Outlay ($)
                  </label>
                  <input
                    type="number"
                    step={5000}
                    value={b5Outlay}
                    onChange={(e) => setB5Outlay(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Cost of Capital / WACC (%)
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    value={b5Discount}
                    onChange={(e) => setB5Discount(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Estimated Project Life (Yrs)
                  </label>
                  <input
                    type="number"
                    value={b5LifeYears}
                    onChange={(e) => setB5LifeYears(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-100 dark:border-slate-800">
                Required Annual Net Cash Inflows
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/60 rounded-xl border border-blue-200 dark:border-blue-800 space-y-1">
                  <span className="text-[10px] text-blue-600 block uppercase">Simple Required Flow</span>
                  <div className="text-xl font-extrabold text-blue-700 dark:text-blue-300">
                    ${b5Calc.requiredAnnualCashFlowSimple.toLocaleString()} <span className="text-xs font-medium">/ yr</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">To achieve simple breakeven in {b5TargetYears} yrs</p>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1">
                  <span className="text-[10px] text-emerald-600 block uppercase">Discounted Required Flow</span>
                  <div className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300">
                    ${b5Calc.requiredAnnualCashFlowDiscounted.toLocaleString()} <span className="text-xs font-medium">/ yr</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">To achieve DPP in {b5TargetYears} yrs @ {b5Discount}%</p>
                </div>
              </div>

              <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-300">
                Max allowable capital expenditure for this target: <strong>${b5Calc.maxAllowableInvestmentForTarget.toLocaleString()}</strong>.
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 5 */}
          {savedBox5.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Target Hurdle Calculations ({savedBox5.length})</span>
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
          BOX 6: SENSITIVITY MATRIX & DISCOUNT RATE STRESS TEST
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Payback Sensitivity Matrix &amp; Discount Rate Stress Test</span>
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
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Cross-Scenario Payback &amp; DPP Grid (Based on Box 1 Outlay: ${b1Outlay})
            </span>
            <button
              type="button"
              onClick={handleExportBox6CSV}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Export Matrix (CSV)</span>
            </button>
          </div>

          <div className="overflow-x-auto max-h-56 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
            <table className="w-full text-center border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold sticky top-0">
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="p-2">Discount Rate</th>
                  <th className="p-2">CF Variance</th>
                  <th className="p-2">Simple Payback</th>
                  <th className="p-2">Discounted Payback (DPP)</th>
                  <th className="p-2">NPV ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {b6Matrix.map((cell, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-1.5 font-bold text-slate-700 dark:text-slate-300">{cell.discountRate}%</td>
                    <td className={`p-1.5 font-bold ${cell.cashFlowVariancePercent < 0 ? "text-red-600" : cell.cashFlowVariancePercent > 0 ? "text-emerald-600" : "text-slate-600"}`}>
                      {cell.cashFlowVariancePercent > 0 ? `+${cell.cashFlowVariancePercent}%` : `${cell.cashFlowVariancePercent}%`}
                    </td>
                    <td className="p-1.5 font-bold text-slate-800 dark:text-slate-200">{cell.simplePaybackYears} Yrs</td>
                    <td className="p-1.5 font-bold text-blue-600 dark:text-blue-400">{cell.discountedPaybackYears} Yrs</td>
                    <td className={`p-1.5 font-extrabold ${cell.npv >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      ${cell.npv.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 6 */}
          {savedBox6.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Sensitivity Calculations ({savedBox6.length})</span>
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

export default PaybackPeriodCalculator;
