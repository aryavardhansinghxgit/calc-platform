"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, ChevronDown, ChevronUp, Download, TrendingUp } from "lucide-react";
import {
  calculateStandardBond,
  calculateDayCountPricing,
  calculateZeroCouponBond,
  calculateCallableBond,
  calculateDurationConvexity,
  calculateTaxEquivalentYield,
} from "@/app/calculators/bond-calculator/calculator";
import {
  CouponFrequency,
  DayCountConvention,
  CalculationGoal,
  SavedBondItem,
} from "@/app/calculators/bond-calculator/types";

export function BondCalculator() {
  const currencySymbol = "$";

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
  // BOX 1: UNIVERSAL BOND VALUATION & YIELD TO MATURITY (YTM) SOLVER
  // =========================================================================
  const [b1Goal, setB1Goal] = useState<CalculationGoal>("price");
  const [b1Face, setB1Face] = useState<string>("1000");
  const [b1CouponRate, setB1CouponRate] = useState<string>("6.0");
  const [b1Years, setB1Years] = useState<string>("10");
  const [b1Ytm, setB1Ytm] = useState<string>("5.0");
  const [b1Price, setB1Price] = useState<string>("1077.94");
  const [b1Freq, setB1Freq] = useState<CouponFrequency>("semiannual");
  const [b1DayCount, setB1DayCount] = useState<DayCountConvention>("30/360");
  const [b1DaysAccrued, setB1DaysAccrued] = useState<string>("0");
  const [b1ShowSchedule, setB1ShowSchedule] = useState<boolean>(false);

  const [savedBox1, setSavedBox1] = useState<SavedBondItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);

  // Box 2 State
  const [b2Face, setB2Face] = useState<string>("1000");
  const [b2Coupon, setB2Coupon] = useState<string>("5.0");
  const [b2Yield, setB2Yield] = useState<string>("6.0");
  const [b2Freq, setB2Freq] = useState<CouponFrequency>("annual");
  const [b2Settlement, setB2Settlement] = useState<string>("2026-08-17");
  const [b2Maturity, setB2Maturity] = useState<string>("2029-08-13");
  const [b2DayCount, setB2DayCount] = useState<DayCountConvention>("30/360");

  const [savedBox2, setSavedBox2] = useState<SavedBondItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);

  // Box 3 State
  const [b3SolveFor, setB3SolveFor] = useState<"price" | "ytm" | "maturity">("price");
  const [b3Face, setB3Face] = useState<string>("1000");
  const [b3Price, setB3Price] = useState<string>("675.56");
  const [b3Ytm, setB3Ytm] = useState<string>("4.0");
  const [b3Years, setB3Years] = useState<string>("10");
  const [b3CompFreq, setB3CompFreq] = useState<"annual" | "semiannual">("semiannual");
  const [b3ShowSchedule, setB3ShowSchedule] = useState<boolean>(false);

  const [savedBox3, setSavedBox3] = useState<SavedBondItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);

  // Box 4 State
  const [b4Face, setB4Face] = useState<string>("1000");
  const [b4Coupon, setB4Coupon] = useState<string>("6.5");
  const [b4Price, setB4Price] = useState<string>("1045.00");
  const [b4YearsMaturity, setB4YearsMaturity] = useState<string>("10");
  const [b4YearsCall, setB4YearsCall] = useState<string>("3");
  const [b4CallPricePct, setB4CallPricePct] = useState<string>("102");
  const [b4Freq, setB4Freq] = useState<CouponFrequency>("semiannual");

  const [savedBox4, setSavedBox4] = useState<SavedBondItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);

  // Box 5 State
  const [b5Face, setB5Face] = useState<string>("1000");
  const [b5Coupon, setB5Coupon] = useState<string>("5.0");
  const [b5Yield, setB5Yield] = useState<string>("5.0");
  const [b5Years, setB5Years] = useState<string>("10");
  const [b5Freq, setB5Freq] = useState<CouponFrequency>("semiannual");

  const [savedBox5, setSavedBox5] = useState<SavedBondItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);

  // Box 6 State
  const [b6MuniYield, setB6MuniYield] = useState<string>("3.5");
  const [b6FedTax, setB6FedTax] = useState<string>("32");
  const [b6StateTax, setB6StateTax] = useState<string>("5");
  const [b6CorpYield, setB6CorpYield] = useState<string>("5.2");

  const [savedBox6, setSavedBox6] = useState<SavedBondItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_bond_box1");
      if (s1) setSavedBox1(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_bond_box2");
      if (s2) setSavedBox2(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_bond_box3");
      if (s3) setSavedBox3(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_bond_box4");
      if (s4) setSavedBox4(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_bond_box5");
      if (s5) setSavedBox5(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_bond_box6");
      if (s6) setSavedBox6(JSON.parse(s6));
    } catch (e) {}
  }, []);

  const b1Calc = useMemo(() => {
    return calculateStandardBond({
      goal: b1Goal,
      faceValue: parseFloat(b1Face) || 1000,
      couponRate: parseFloat(b1CouponRate) || 0,
      yearsToMaturity: parseFloat(b1Years) || 1,
      ytm: parseFloat(b1Ytm) || 0,
      marketPrice: parseFloat(b1Price) || 1000,
      couponFrequency: b1Freq,
      dayCount: b1DayCount,
      daysSinceLastCoupon: parseFloat(b1DaysAccrued) || 0,
    });
  }, [b1Goal, b1Face, b1CouponRate, b1Years, b1Ytm, b1Price, b1Freq, b1DayCount, b1DaysAccrued]);

  const handleExportCashFlowCSV = () => {
    if (!b1Calc.cashFlowSchedule || b1Calc.cashFlowSchedule.length === 0) return;
    const headers = ["Period", "Year", "Coupon Payment ($)", "Principal Payment ($)", "Total Cash Flow ($)", "Present Value ($)", "Remaining Principal ($)"];
    const rows = b1Calc.cashFlowSchedule.map((r) => [
      r.period,
      r.year,
      r.couponPayment,
      r.principalPayment,
      r.totalCashFlow,
      r.presentValue,
      r.remainingPrincipal,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload(`bond_cash_flow_schedule_${b1Years}yr.csv`, csv);
  };

  const handleSaveBox1 = () => {
    const inputsStr = `Goal: ${b1Goal === "price" ? "Solve Price" : "Solve YTM"} | Par: $${b1Face} | Coupon: ${b1CouponRate}% | ${b1Years} Yrs | Freq: ${b1Freq}`;
    const primaryStr = b1Goal === "price"
      ? `Clean Price: $${b1Calc.cleanPrice.toLocaleString()} (Dirty: $${b1Calc.dirtyPrice.toLocaleString()})`
      : `Yield to Maturity: ${b1Calc.ytmPercent}% (Clean Price: $${b1Calc.cleanPrice.toLocaleString()})`;

    const detailsList = [
      `Clean Quoted Price: $${b1Calc.cleanPrice.toLocaleString()}`,
      `Dirty Invoice Price: $${b1Calc.dirtyPrice.toLocaleString()} (Accrued: $${b1Calc.accruedInterest.toLocaleString()})`,
      `Yield to Maturity (YTM): ${b1Calc.ytmPercent}%`,
      `Effective Annual Yield (EAY): ${b1Calc.effectiveAnnualYield}%`,
      `Current Yield: ${b1Calc.currentYieldPercent}%`,
      `Bond Status: Trading at ${b1Calc.status}`,
      `Macaulay Duration: ${b1Calc.macaulayDurationYears} yrs | Modified Duration: ${b1Calc.modifiedDuration}%`,
      `Convexity: ${b1Calc.convexity}`,
      `Total Coupon Income: $${b1Calc.totalCouponPayments.toLocaleString()} | Net Profit: $${b1Calc.netProfit.toLocaleString()}`,
    ];

    const newItem: SavedBondItem = {
      id: Date.now().toString(),
      title: "Universal Bond Valuation Calculation",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox1.filter(i => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_bond_box1", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleDeleteSavedBox1 = (id: string) => {
    const updated = savedBox1.filter(item => item.id !== id);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_bond_box1", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox1 = () => {
    setSavedBox1([]);
    try {
      localStorage.removeItem("saved_bond_box1");
    } catch (e) {}
  };

  // Box 2 Memo
  const b2Calc = useMemo(() => {
    return calculateDayCountPricing({
      faceValue: parseFloat(b2Face) || 1000,
      couponRate: parseFloat(b2Coupon) || 0,
      ytm: parseFloat(b2Yield) || 0,
      couponFrequency: b2Freq,
      dayCount: b2DayCount,
      settlementDate: b2Settlement,
      maturityDate: b2Maturity,
    });
  }, [b2Face, b2Coupon, b2Yield, b2Freq, b2DayCount, b2Settlement, b2Maturity]);

  const handleSaveBox2 = () => {
    const inputsStr = `Par: $${b2Face} | Coupon: ${b2Coupon}% | Yield: ${b2Yield}% | Conv: ${b2DayCount} | Settle: ${b2Settlement}`;
    const primaryStr = `Dirty Price: $${b2Calc.dirtyPrice.toLocaleString()} | Clean Price: $${b2Calc.cleanPrice.toLocaleString()} | Accrued: $${b2Calc.accruedInterest.toLocaleString()}`;

    const detailsList = [
      `Dirty / Invoice Price: $${b2Calc.dirtyPrice.toLocaleString()}`,
      `Clean Quoted Price: $${b2Calc.cleanPrice.toLocaleString()}`,
      `Accrued Interest: $${b2Calc.accruedInterest.toLocaleString()}`,
      `Days Accrued: ${b2Calc.daysAccrued} days (in ${b2Calc.daysInPeriod}-day period)`,
      `Fraction Elapsed: ${(b2Calc.fractionElapsed * 100).toFixed(2)}%`,
      `Estimated Next Coupon Date: ${b2Calc.nextCouponDate}`,
      `Time to Maturity: ${b2Calc.yearsRemaining} years`,
    ];

    const newItem: SavedBondItem = {
      id: Date.now().toString(),
      title: "Day-Count & Accrued Interest Calculation",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox2.filter(i => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_bond_box2", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  const handleDeleteSavedBox2 = (id: string) => {
    const updated = savedBox2.filter(item => item.id !== id);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_bond_box2", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox2 = () => {
    setSavedBox2([]);
    try {
      localStorage.removeItem("saved_bond_box2");
    } catch (e) {}
  };

  // Box 3 Memo
  const b3Calc = useMemo(() => {
    return calculateZeroCouponBond({
      solveFor: b3SolveFor,
      faceValue: parseFloat(b3Face) || 1000,
      price: parseFloat(b3Price) || 675.56,
      ytm: parseFloat(b3Ytm) || 4.0,
      yearsToMaturity: parseFloat(b3Years) || 10,
      compoundingFrequency: b3CompFreq,
    });
  }, [b3SolveFor, b3Face, b3Price, b3Ytm, b3Years, b3CompFreq]);

  const handleExportAccretionCSV = () => {
    if (!b3Calc.accretionSchedule || b3Calc.accretionSchedule.length === 0) return;
    const headers = ["Year", "Beginning Book Value ($)", "Imputed Annual Interest ($)", "Ending Book Value ($)", "Cumulative Accretion ($)"];
    const rows = b3Calc.accretionSchedule.map((r) => [
      r.year,
      r.beginningValue,
      r.imputedInterest,
      r.endingValue,
      r.cumulativeAccretion,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload(`zero_coupon_accretion_schedule.csv`, csv);
  };

  const handleSaveBox3 = () => {
    const inputsStr = `Solve: ${b3SolveFor.toUpperCase()} | Par: $${b3Face} | Compounding: ${b3CompFreq}`;
    const primaryStr = b3SolveFor === "price"
      ? `Price: $${b3Calc.price.toLocaleString()} (Yield: ${b3Calc.ytm}%)`
      : b3SolveFor === "ytm"
      ? `Yield: ${b3Calc.ytm}% (Price: $${b3Calc.price.toLocaleString()})`
      : `Maturity: ${b3Calc.yearsToMaturity} Years`;

    const detailsList = [
      `Zero-Coupon Purchase Price: $${b3Calc.price.toLocaleString()}`,
      `Yield to Maturity (YTM): ${b3Calc.ytm}%`,
      `Effective Annual Rate (EAR): ${b3Calc.effectiveAnnualRate}%`,
      `Time to Maturity: ${b3Calc.yearsToMaturity} years`,
      `Total Discount / Capital Gain: $${b3Calc.totalProfit.toLocaleString()}`,
      `Accretion Compounding Basis: ${b3Calc.compoundingFrequency}`,
    ];

    const newItem: SavedBondItem = {
      id: Date.now().toString(),
      title: "Zero-Coupon Bond Calculation",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox3.filter(i => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_bond_box3", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  const handleDeleteSavedBox3 = (id: string) => {
    const updated = savedBox3.filter(item => item.id !== id);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_bond_box3", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox3 = () => {
    setSavedBox3([]);
    try {
      localStorage.removeItem("saved_bond_box3");
    } catch (e) {}
  };

  // Box 4 Memo
  const b4Calc = useMemo(() => {
    return calculateCallableBond({
      faceValue: parseFloat(b4Face) || 1000,
      couponRate: parseFloat(b4Coupon) || 0,
      marketPrice: parseFloat(b4Price) || 1000,
      yearsToMaturity: parseFloat(b4YearsMaturity) || 10,
      yearsToCall: parseFloat(b4YearsCall) || 3,
      callPricePercent: parseFloat(b4CallPricePct) || 100,
      couponFrequency: b4Freq,
    });
  }, [b4Face, b4Coupon, b4Price, b4YearsMaturity, b4YearsCall, b4CallPricePct, b4Freq]);

  const handleSaveBox4 = () => {
    const inputsStr = `Price: $${b4Price} | Coupon: ${b4Coupon}% | 10y Mat | 3y Call @ ${b4CallPricePct}%`;
    const primaryStr = `Yield to Worst (YTW): ${b4Calc.ytwPercent}% (Scenario: ${b4Calc.worstScenario})`;

    const detailsList = [
      `Yield to Worst (YTW): ${b4Calc.ytwPercent}%`,
      `Governing Scenario: ${b4Calc.worstScenario}`,
      `Yield to Maturity (YTM): ${b4Calc.ytmPercent}%`,
      `Yield to Call (YTC): ${b4Calc.ytcPercent}%`,
      `Call Redemption Price: $${b4Calc.callPriceDollar.toLocaleString()} (${b4CallPricePct}% of Par)`,
      `Years to Call Date: ${b4Calc.yearsToCall} yrs | Years to Maturity: ${b4Calc.yearsToMaturity} yrs`,
    ];

    const newItem: SavedBondItem = {
      id: Date.now().toString(),
      title: "Callable Bond & YTW Calculation",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox4.filter(i => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_bond_box4", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  const handleDeleteSavedBox4 = (id: string) => {
    const updated = savedBox4.filter(item => item.id !== id);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_bond_box4", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox4 = () => {
    setSavedBox4([]);
    try {
      localStorage.removeItem("saved_bond_box4");
    } catch (e) {}
  };

  // Box 5 Memo
  const b5Calc = useMemo(() => {
    return calculateDurationConvexity({
      faceValue: parseFloat(b5Face) || 1000,
      couponRate: parseFloat(b5Coupon) || 0,
      ytm: parseFloat(b5Yield) || 5.0,
      yearsToMaturity: parseFloat(b5Years) || 10,
      couponFrequency: b5Freq,
    });
  }, [b5Face, b5Coupon, b5Yield, b5Years, b5Freq]);

  const handleExportRateShockCSV = () => {
    if (!b5Calc.rateShifts || b5Calc.rateShifts.length === 0) return;
    const headers = ["Rate Shift (bps)", "New Yield (%)", "Exact Bond Price ($)", "Exact Change (%)", "Duration-Only Est ($)", "Duration+Convexity Est ($)", "Dollar Impact ($)"];
    const rows = b5Calc.rateShifts.map((r) => [
      r.shiftBps,
      r.newYield,
      r.exactPrice,
      r.exactChangePercent,
      r.durationEstPrice,
      r.durationConvexityEstPrice,
      r.dollarChange,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload(`interest_rate_shock_matrix.csv`, csv);
  };

  const handleSaveBox5 = () => {
    const inputsStr = `Par: $${b5Face} | Coupon: ${b5Coupon}% | YTM: ${b5Yield}% | ${b5Years} Yrs`;
    const primaryStr = `Modified Duration: ${b5Calc.modifiedDuration}% | Convexity: ${b5Calc.convexity}`;

    const detailsList = [
      `Macaulay Duration: ${b5Calc.macaulayDuration} Years`,
      `Modified Duration: ${b5Calc.modifiedDuration}%`,
      `Convexity Measure: ${b5Calc.convexity}`,
      `DV01 (Dollar Value of 1 bp): $${b5Calc.dv01}`,
      `Price Change for +100 bps: ${b5Calc.rateShifts.find(s => s.shiftBps === 100)?.exactChangePercent}%`,
      `Price Change for -100 bps: +${b5Calc.rateShifts.find(s => s.shiftBps === -100)?.exactChangePercent}%`,
    ];

    const newItem: SavedBondItem = {
      id: Date.now().toString(),
      title: "Duration & Convexity Calculation",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox5.filter(i => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_bond_box5", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  const handleDeleteSavedBox5 = (id: string) => {
    const updated = savedBox5.filter(item => item.id !== id);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_bond_box5", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox5 = () => {
    setSavedBox5([]);
    try {
      localStorage.removeItem("saved_bond_box5");
    } catch (e) {}
  };

  // Box 6 Memo
  const b6Calc = useMemo(() => {
    return calculateTaxEquivalentYield({
      municipalYield: parseFloat(b6MuniYield) || 0,
      federalTaxRate: parseFloat(b6FedTax) || 0,
      stateTaxRate: parseFloat(b6StateTax) || 0,
      corporateBondYield: parseFloat(b6CorpYield) || 0,
    });
  }, [b6MuniYield, b6FedTax, b6StateTax, b6CorpYield]);

  const handleSaveBox6 = () => {
    const inputsStr = `Muni: ${b6MuniYield}% | Fed Tax: ${b6FedTax}% | State Tax: ${b6StateTax}% | Corp: ${b6CorpYield}%`;
    const primaryStr = `Tax-Equivalent Yield (TEY): ${b6Calc.taxEquivalentYield}% (Advantage: ${b6Calc.recommendedOption})`;

    const detailsList = [
      `Tax-Equivalent Yield (TEY): ${b6Calc.taxEquivalentYield}%`,
      `Combined Marginal Tax Rate: ${b6Calc.combinedTaxRate}%`,
      `Tax-Free Municipal Yield: ${b6Calc.municipalYield}%`,
      `Taxable Corporate Yield: ${b6CorpYield}% (After-Tax: ${b6Calc.afterTaxCorporateYield}%)`,
      `Recommendation: ${b6Calc.recommendedOption} Bond Advantage`,
      `Annual Tax Savings per $10k: $${b6Calc.taxSavingsPer10k.toLocaleString()}`,
    ];

    const newItem: SavedBondItem = {
      id: Date.now().toString(),
      title: "Tax-Equivalent Municipal Yield Calculation",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox6.filter(i => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_bond_box6", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  const handleDeleteSavedBox6 = (id: string) => {
    const updated = savedBox6.filter(item => item.id !== id);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_bond_box6", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox6 = () => {
    setSavedBox6([]);
    try {
      localStorage.removeItem("saved_bond_box6");
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* =========================================================================
          BOX 1: UNIVERSAL BOND VALUATION & YIELD TO MATURITY (YTM) SOLVER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Universal Bond Valuation &amp; Yield to Maturity Solver</span>
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
              <div className="flex items-center justify-between pb-1 border-b border-slate-200/80 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Bond Parameters
                </span>
                {/* CALCULATION GOAL TOGGLE */}
                <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-800 p-0.5 rounded-lg text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setB1Goal("price")}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                      b1Goal === "price" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Solve Price
                  </button>
                  <button
                    type="button"
                    onClick={() => setB1Goal("ytm")}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                      b1Goal === "ytm" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Solve YTM
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Face / Par Value ($)
                  </label>
                  <input
                    type="number"
                    min={1}
                    step={100}
                    value={b1Face}
                    onChange={(e) => setB1Face(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Annual Coupon Rate (%)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={0.1}
                    value={b1CouponRate}
                    onChange={(e) => setB1CouponRate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Years to Maturity
                  </label>
                  <input
                    type="number"
                    min={0.1}
                    step={0.5}
                    value={b1Years}
                    onChange={(e) => setB1Years(e.target.value)}
                    className={input3DClass}
                  />
                </div>

                <div>
                  {b1Goal === "price" ? (
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                        Yield to Maturity (YTM %)
                      </label>
                      <input
                        type="number"
                        min={0}
                        step={0.05}
                        value={b1Ytm}
                        onChange={(e) => setB1Ytm(e.target.value)}
                        className={input3DClass}
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                        Market Clean Price ($)
                      </label>
                      <input
                        type="number"
                        min={1}
                        step={10}
                        value={b1Price}
                        onChange={(e) => setB1Price(e.target.value)}
                        className={input3DClass}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Coupon Frequency
                  </label>
                  <select
                    value={b1Freq}
                    onChange={(e) => setB1Freq(e.target.value as CouponFrequency)}
                    className={select3DClass}
                  >
                    <option value="semiannual">Semi-Annual (US Std)</option>
                    <option value="annual">Annual (Eurobond)</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Day-Count Convention
                  </label>
                  <select
                    value={b1DayCount}
                    onChange={(e) => setB1DayCount(e.target.value as DayCountConvention)}
                    className={select3DClass}
                  >
                    <option value="30/360">30/360 (Corporate/Muni)</option>
                    <option value="actual/actual">Actual/Actual (US Treasury)</option>
                    <option value="actual/360">Actual/360 (Money Market)</option>
                    <option value="actual/365">Actual/365</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Days Accrued Since Last Coupon (Optional)
                </label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={b1DaysAccrued}
                  onChange={(e) => setB1DaysAccrued(e.target.value)}
                  placeholder="0"
                  className={input3DClass}
                />
              </div>
            </div>

            {/* RIGHT: HERO OUTPUT RESULTS & PRICE-YIELD GRAPH */}
            <div className="lg:col-span-7 space-y-3">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Valuation Summary
                    </span>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                      ${b1Calc.cleanPrice.toLocaleString()}
                      <span className="text-xs text-slate-500 font-semibold ml-1.5 font-sans">
                        (Clean Quoted Price)
                      </span>
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                      b1Calc.status === "Premium"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300"
                        : b1Calc.status === "Discount"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300"
                    }`}
                  >
                    Trading at {b1Calc.status}
                  </span>
                </div>

                {/* PRIMARY METRICS GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Dirty / Invoice Price</span>
                    <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100 font-extrabold">
                      ${b1Calc.dirtyPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Yield to Maturity (YTM)</span>
                    <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400 font-extrabold">
                      {b1Calc.ytmPercent}%
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Current Yield</span>
                    <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100 font-extrabold">
                      {b1Calc.currentYieldPercent}%
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Effective Annual Yield</span>
                    <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100 font-extrabold">
                      {b1Calc.effectiveAnnualYield}%
                    </span>
                  </div>
                </div>

                {/* DURATION & RISK SENSITIVITY STRIP */}
                <div className="grid grid-cols-3 gap-2 text-xs font-bold pt-1">
                  <div className="p-2 bg-blue-50/70 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900/50">
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase">Macaulay Duration</span>
                    <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100 font-bold">
                      {b1Calc.macaulayDurationYears} yrs
                    </span>
                  </div>
                  <div className="p-2 bg-blue-50/70 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900/50">
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase">Modified Duration</span>
                    <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100 font-bold">
                      {b1Calc.modifiedDuration}%
                    </span>
                  </div>
                  <div className="p-2 bg-blue-50/70 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900/50">
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase">Convexity Measure</span>
                    <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100 font-bold">
                      {b1Calc.convexity}
                    </span>
                  </div>
                </div>

                {/* ACCRUED INTEREST & LIFETIME CASH FLOWS */}
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium space-y-1">
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Accrued Interest (between coupons):</span>
                    <span className="font-bold font-sans tabular-nums text-slate-900 dark:text-slate-100">
                      ${b1Calc.accruedInterest.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Periodic Coupon Payout ({b1Freq}):</span>
                    <span className="font-bold font-sans tabular-nums text-slate-900 dark:text-slate-100">
                      ${b1Calc.periodicCoupon.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Total Lifetime Cash Flow (Coupons + Par):</span>
                    <span className="font-bold font-sans tabular-nums text-blue-600 dark:text-blue-400">
                      ${b1Calc.totalCashFlow.toLocaleString()} (Net Profit: ${b1Calc.netProfit.toLocaleString()})
                    </span>
                  </div>
                </div>
              </div>

              {/* DYNAMIC INTERACTIVE SVG PRICE-YIELD CONVEXITY CURVE */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> Dynamic Price-Yield Convexity Curve
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold font-sans">
                    Current Point: YTM {b1Calc.ytmPercent}% @ ${b1Calc.cleanPrice.toLocaleString()}
                  </span>
                </div>

                {/* SVG PLOT */}
                <div className="relative h-44 w-full bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200/60 dark:border-slate-800 p-2 flex items-center justify-center">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                    {/* Grid lines */}
                    <line x1="40" y1="20" x2="480" y2="20" stroke="#94a3b8" strokeDasharray="3 3" strokeOpacity="0.3" />
                    <line x1="40" y1="75" x2="480" y2="75" stroke="#94a3b8" strokeDasharray="3 3" strokeOpacity="0.3" />
                    <line x1="40" y1="130" x2="480" y2="130" stroke="#94a3b8" strokeDasharray="3 3" strokeOpacity="0.4" />
                    <line x1="40" y1="20" x2="40" y2="130" stroke="#64748b" strokeWidth="1.5" />
                    <line x1="40" y1="130" x2="480" y2="130" stroke="#64748b" strokeWidth="1.5" />

                    {/* Generate SVG Path from priceYieldCurve points */}
                    {(() => {
                      const points = b1Calc.priceYieldCurve;
                      if (points.length < 2) return null;
                      const minP = Math.min(...points.map((p) => p.price));
                      const maxP = Math.max(...points.map((p) => p.price));
                      const minY = Math.min(...points.map((p) => p.yieldRate));
                      const maxY = Math.max(...points.map((p) => p.yieldRate));

                      const toX = (yVal: number) => 40 + ((yVal - minY) / (maxY - minY || 1)) * 440;
                      const toY = (pVal: number) => 130 - ((pVal - minP) / (maxP - minP || 1)) * 110;

                      const pathD = points
                        .map((pt, i) => `${i === 0 ? "M" : "L"} ${toX(pt.yieldRate).toFixed(1)} ${toY(pt.price).toFixed(1)}`)
                        .join(" ");

                      const currentX = toX(b1Calc.ytmPercent);
                      const currentY = toY(b1Calc.cleanPrice);

                      return (
                        <>
                          <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
                          <circle cx={currentX} cy={currentY} r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                          <circle cx={currentX} cy={currentY} r="9" fill="none" stroke="#2563eb" strokeOpacity="0.4" strokeWidth="2" />
                          <text
                            x={Math.min(420, Math.max(50, currentX + 8))}
                            y={Math.max(25, currentY - 8)}
                            fill="#1e40af"
                            fontSize="10"
                            fontWeight="bold"
                            fontFamily="monospace"
                          >
                            ${b1Calc.cleanPrice.toFixed(0)} ({b1Calc.ytmPercent.toFixed(1)}%)
                          </text>
                        </>
                      );
                    })()}
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* CASH FLOW SCHEDULE TOGGLE & CSV EXPORT */}
          <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setB1ShowSchedule(!b1ShowSchedule)}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {b1ShowSchedule ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{b1ShowSchedule ? "Hide Cash Flow Schedule Table" : "View Complete Coupon & Principal Payout Schedule"}</span>
            </button>

            <button
              type="button"
              onClick={handleExportCashFlowCSV}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Export Cash Flow Schedule (CSV)</span>
            </button>
          </div>

          {b1ShowSchedule && (
            <div className="mt-2 overflow-x-auto max-h-56 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
              <table className="w-full text-center border-collapse font-sans tabular-nums">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold sticky top-0">
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="p-2">Period</th>
                    <th className="p-2">Year</th>
                    <th className="p-2">Coupon ($)</th>
                    <th className="p-2">Principal ($)</th>
                    <th className="p-2">Total Cash Flow</th>
                    <th className="p-2">Present Value (PV)</th>
                    <th className="p-2">Remaining Par</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {b1Calc.cashFlowSchedule.map((row) => (
                    <tr key={row.period} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-1.5 font-bold text-slate-600 dark:text-slate-400">{row.period}</td>
                      <td className="p-1.5">{row.year}</td>
                      <td className="p-1.5 text-emerald-600 font-bold">${row.couponPayment.toLocaleString()}</td>
                      <td className="p-1.5 font-bold">{row.principalPayment > 0 ? `$${row.principalPayment.toLocaleString()}` : "$0.00"}</td>
                      <td className="p-1.5 font-extrabold text-blue-600">${row.totalCashFlow.toLocaleString()}</td>
                      <td className="p-1.5 text-slate-700 dark:text-slate-300">${row.presentValue.toLocaleString()}</td>
                      <td className="p-1.5 text-slate-500">${row.remainingPrincipal.toLocaleString()}</td>
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
                  <span>Saved Universal Bond Valuations ({savedBox1.length})</span>
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
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteSavedBox1(item.id)}
                          className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
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
          BOX 2: BOND PRICING WITH ACCRUED INTEREST & SETTLEMENT DATES (DAY COUNTS)
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Bond Pricing with Settlement Dates &amp; Day-Count Accrued Interest</span>
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
                Settlement &amp; Convention Details
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Face Value ($)
                  </label>
                  <input
                    type="number"
                    value={b2Face}
                    onChange={(e) => setB2Face(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Annual Coupon Rate (%)
                  </label>
                  <input
                    type="number"
                    value={b2Coupon}
                    onChange={(e) => setB2Coupon(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Yield to Maturity (YTM %)
                  </label>
                  <input
                    type="number"
                    value={b2Yield}
                    onChange={(e) => setB2Yield(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Coupon Frequency
                  </label>
                  <select
                    value={b2Freq}
                    onChange={(e) => setB2Freq(e.target.value as CouponFrequency)}
                    className={select3DClass}
                  >
                    <option value="annual">Annual</option>
                    <option value="semiannual">Semi-Annual</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Settlement Date
                  </label>
                  <input
                    type="date"
                    value={b2Settlement}
                    onChange={(e) => setB2Settlement(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Maturity Date
                  </label>
                  <input
                    type="date"
                    value={b2Maturity}
                    onChange={(e) => setB2Maturity(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Day-Count Convention
                </label>
                <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
                  {(["30/360", "actual/actual", "actual/360", "actual/365"] as DayCountConvention[]).map((conv) => (
                    <button
                      key={conv}
                      type="button"
                      onClick={() => setB2DayCount(conv)}
                      className={`p-1.5 rounded-lg border text-left cursor-pointer transition-all ${
                        b2DayCount === conv
                          ? "bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-600 dark:text-blue-400 font-bold"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {conv.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-100 dark:border-slate-800">
                Invoice &amp; Accrued Breakdown
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/50">
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase">Dirty / Invoice Price</span>
                  <span className="text-xl font-extrabold font-sans tabular-nums text-blue-700 dark:text-blue-300">
                    ${b2Calc.dirtyPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Total cash paid by buyer</span>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 block uppercase">Clean Quoted Price</span>
                  <span className="text-xl font-extrabold font-sans tabular-nums text-slate-900 dark:text-slate-100">
                    ${b2Calc.cleanPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Market published price</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-medium pt-1">
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Accrued Interest (Earned by seller):</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums">
                    ${b2Calc.accruedInterest.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Days Accrued in Current Coupon Cycle:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    {b2Calc.daysAccrued} days (out of {b2Calc.daysInPeriod} days)
                  </span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Coupon Period Fraction Elapsed:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    {(b2Calc.fractionElapsed * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Time Remaining to Maturity:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    {b2Calc.yearsRemaining} years
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 2 */}
          {savedBox2.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Day-Count Calculations ({savedBox2.length})</span>
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
          BOX 3: ZERO-COUPON BOND PRICING & ACCRETION SOLVER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Zero-Coupon Bond Pricing &amp; Phantom Tax Accretion</span>
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
              <div className="flex items-center justify-between pb-1 border-b border-slate-200/80 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Zero-Coupon Inputs
                </span>
                <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-800 p-0.5 rounded-lg text-[10px] font-bold">
                  {(["price", "ytm", "maturity"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setB3SolveFor(mode)}
                      className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                        b3SolveFor === mode ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {mode.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Face Value at Maturity ($)
                </label>
                <input
                  type="number"
                  value={b3Face}
                  onChange={(e) => setB3Face(e.target.value)}
                  className={input3DClass}
                />
              </div>

              {b3SolveFor !== "price" && (
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Purchase Market Price ($)
                  </label>
                  <input
                    type="number"
                    value={b3Price}
                    onChange={(e) => setB3Price(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              )}

              {b3SolveFor !== "ytm" && (
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Yield to Maturity (YTM %)
                  </label>
                  <input
                    type="number"
                    value={b3Ytm}
                    onChange={(e) => setB3Ytm(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              )}

              {b3SolveFor !== "maturity" && (
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Years to Maturity
                  </label>
                  <input
                    type="number"
                    value={b3Years}
                    onChange={(e) => setB3Years(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Compounding Frequency
                </label>
                <select
                  value={b3CompFreq}
                  onChange={(e) => setB3CompFreq(e.target.value as "annual" | "semiannual")}
                  className={select3DClass}
                >
                  <option value="semiannual">Semi-Annual (US Treasury STRIPS)</option>
                  <option value="annual">Annual</option>
                </select>
              </div>
            </div>

            {/* RESULTS */}
            <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-100 dark:border-slate-800">
                Zero-Coupon Results
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold">
                <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/50">
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase">Calculated Price</span>
                  <span className="text-xl font-extrabold font-sans tabular-nums text-blue-700 dark:text-blue-300">
                    ${b3Calc.price.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 block uppercase">Yield to Maturity (YTM)</span>
                  <span className="text-xl font-extrabold font-sans tabular-nums text-slate-900 dark:text-slate-100">
                    {b3Calc.ytm}%
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 block uppercase">Total Capital Gain</span>
                  <span className="text-xl font-extrabold font-sans tabular-nums text-emerald-600 dark:text-emerald-400">
                    ${b3Calc.totalProfit.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-medium pt-1">
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Effective Annual Rate (EAR):</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">{b3Calc.effectiveAnnualRate}%</span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Time Remaining to Maturity:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">{b3Calc.yearsToMaturity} Years</span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Issue Discount Rate:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                    {((b3Calc.totalDiscount / (parseFloat(b3Face) || 1000)) * 100).toFixed(2)}% Discount to Par
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ACCRETION SCHEDULE TOGGLE & CSV EXPORT */}
          <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setB3ShowSchedule(!b3ShowSchedule)}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {b3ShowSchedule ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{b3ShowSchedule ? "Hide Annual Accretion Schedule" : "View Annual Constant-Yield Accretion (Phantom Tax Schedule)"}</span>
            </button>

            <button
              type="button"
              onClick={handleExportAccretionCSV}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Export Accretion Schedule (CSV)</span>
            </button>
          </div>

          {b3ShowSchedule && (
            <div className="mt-2 overflow-x-auto max-h-56 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
              <table className="w-full text-center border-collapse font-sans tabular-nums">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold sticky top-0">
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="p-2">Year</th>
                    <th className="p-2">Beginning Book Value</th>
                    <th className="p-2">Imputed Annual Interest</th>
                    <th className="p-2">Ending Book Value</th>
                    <th className="p-2">Cumulative Accretion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {b3Calc.accretionSchedule.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-1.5 font-bold text-slate-600 dark:text-slate-400">Year {row.year}</td>
                      <td className="p-1.5">${row.beginningValue.toLocaleString()}</td>
                      <td className="p-1.5 text-blue-600 font-bold">${row.imputedInterest.toLocaleString()}</td>
                      <td className="p-1.5 font-bold">${row.endingValue.toLocaleString()}</td>
                      <td className="p-1.5 text-emerald-600 font-bold">${row.cumulativeAccretion.toLocaleString()}</td>
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
                  <span>Saved Zero-Coupon Calculations ({savedBox3.length})</span>
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
          BOX 4: CALLABLE & PUTTABLE BOND YIELD SUITE (YTC, YTP & YTW)
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Callable &amp; Puttable Bond Suite (Yield to Call &amp; Yield to Worst)</span>
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
                Call &amp; Bond Specifications
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Face Value ($)
                  </label>
                  <input
                    type="number"
                    value={b4Face}
                    onChange={(e) => setB4Face(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Coupon Rate (%)
                  </label>
                  <input
                    type="number"
                    value={b4Coupon}
                    onChange={(e) => setB4Coupon(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Market Price ($)
                  </label>
                  <input
                    type="number"
                    value={b4Price}
                    onChange={(e) => setB4Price(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Years to Maturity
                  </label>
                  <input
                    type="number"
                    value={b4YearsMaturity}
                    onChange={(e) => setB4YearsMaturity(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Years to First Call Date
                  </label>
                  <input
                    type="number"
                    value={b4YearsCall}
                    onChange={(e) => setB4YearsCall(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Call Price (% of Par)
                  </label>
                  <input
                    type="number"
                    value={b4CallPricePct}
                    onChange={(e) => setB4CallPricePct(e.target.value)}
                    placeholder="102"
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-100 dark:border-slate-800">
                Yield to Worst (YTW) Analysis
              </span>

              <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase font-bold">
                    Yield to Worst (YTW)
                  </span>
                  <span className="text-2xl font-extrabold font-sans tabular-nums text-blue-700 dark:text-blue-300">
                    {b4Calc.ytwPercent}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Worst Scenario</span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-extrabold bg-blue-600 text-white shadow-xs inline-block mt-0.5">
                    Governed by {b4Calc.worstScenario}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block uppercase">Yield to Maturity (YTM)</span>
                  <span className="text-base font-extrabold font-sans tabular-nums text-slate-900 dark:text-slate-100">
                    {b4Calc.ytmPercent}%
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Held 10 years to par</span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block uppercase">Yield to Call (YTC)</span>
                  <span className="text-base font-extrabold font-sans tabular-nums text-slate-900 dark:text-slate-100">
                    {b4Calc.ytcPercent}%
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Called in {b4Calc.yearsToCall} yrs @ ${b4Calc.callPriceDollar.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 4 */}
          {savedBox4.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Callable Bond Calculations ({savedBox4.length})</span>
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
          BOX 5: INTEREST RATE RISK, DURATION & CONVEXITY MATRIX
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Interest Rate Risk, Duration &amp; Convexity Sensitivity Matrix</span>
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
                Risk Model Inputs
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Face Value ($)
                  </label>
                  <input
                    type="number"
                    value={b5Face}
                    onChange={(e) => setB5Face(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Coupon Rate (%)
                  </label>
                  <input
                    type="number"
                    value={b5Coupon}
                    onChange={(e) => setB5Coupon(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Market Yield (YTM %)
                  </label>
                  <input
                    type="number"
                    value={b5Yield}
                    onChange={(e) => setB5Yield(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Years to Maturity
                  </label>
                  <input
                    type="number"
                    value={b5Years}
                    onChange={(e) => setB5Years(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Coupon Frequency
                </label>
                <select
                  value={b5Freq}
                  onChange={(e) => setB5Freq(e.target.value as CouponFrequency)}
                  className={select3DClass}
                >
                  <option value="semiannual">Semi-Annual</option>
                  <option value="annual">Annual</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            {/* RESULTS */}
            <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-100 dark:border-slate-800">
                Duration &amp; Volatility Metrics
              </span>

              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                <div className="p-2.5 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/50">
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase">Macaulay Duration</span>
                  <span className="text-lg font-extrabold font-sans tabular-nums text-slate-900 dark:text-slate-100">
                    {b5Calc.macaulayDuration} yrs
                  </span>
                  <span className="text-[10px] text-slate-500 block">Weighted average cash flow time</span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 block uppercase">Modified Duration</span>
                  <span className="text-lg font-extrabold font-sans tabular-nums text-blue-600 dark:text-blue-400">
                    {b5Calc.modifiedDuration}%
                  </span>
                  <span className="text-[10px] text-slate-500 block">Price change per 1% yield shift</span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 block uppercase">Convexity Measure</span>
                  <span className="text-lg font-extrabold font-sans tabular-nums text-slate-900 dark:text-slate-100">
                    {b5Calc.convexity}
                  </span>
                  <span className="text-[10px] text-slate-500 block">2nd order curvature boost</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
                <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <span className="text-slate-500">Dollar Duration ($):</span>
                  <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">${b5Calc.dollarDuration}</span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <span className="text-slate-500">DV01 (Value of 1 bp):</span>
                  <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">${b5Calc.dv01}</span>
                </div>
              </div>
            </div>
          </div>

          {/* INTEREST RATE SHOCK MATRIX TABLE & CSV EXPORT */}
          <div className="pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Interest Rate Shift Shock Matrix (Duration vs. Convexity Adjustment)
              </span>
              <button
                type="button"
                onClick={handleExportRateShockCSV}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Export Shock Matrix (CSV)</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
              <table className="w-full text-center border-collapse font-sans tabular-nums">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="p-2">Rate Shift</th>
                    <th className="p-2">New Yield</th>
                    <th className="p-2">Exact Bond Price</th>
                    <th className="p-2">Exact % Change</th>
                    <th className="p-2">Duration Only Est.</th>
                    <th className="p-2">Duration + Convexity Est.</th>
                    <th className="p-2">Dollar Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {b5Calc.rateShifts.map((row) => (
                    <tr key={row.shiftBps} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className={`p-1.5 font-bold ${row.shiftBps < 0 ? "text-emerald-600" : "text-amber-600"}`}>
                        {row.shiftBps > 0 ? `+${row.shiftBps} bps` : `${row.shiftBps} bps`}
                      </td>
                      <td className="p-1.5">{row.newYield}%</td>
                      <td className="p-1.5 font-bold">${row.exactPrice.toLocaleString()}</td>
                      <td className={`p-1.5 font-extrabold ${row.exactChangePercent >= 0 ? "text-emerald-600" : "text-amber-600"}`}>
                        {row.exactChangePercent >= 0 ? `+${row.exactChangePercent}%` : `${row.exactChangePercent}%`}
                      </td>
                      <td className="p-1.5 text-slate-500">${row.durationEstPrice.toLocaleString()}</td>
                      <td className="p-1.5 font-bold text-blue-600">${row.durationConvexityEstPrice.toLocaleString()}</td>
                      <td className={`p-1.5 font-bold ${row.dollarChange >= 0 ? "text-emerald-600" : "text-amber-600"}`}>
                        {row.dollarChange >= 0 ? `+$${row.dollarChange.toFixed(2)}` : `-$${Math.abs(row.dollarChange).toFixed(2)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 5 */}
          {savedBox5.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Duration &amp; Convexity Calculations ({savedBox5.length})</span>
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
          BOX 6: TAX-EQUIVALENT MUNICIPAL YIELD (TEY) COMPARATOR
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Tax-Equivalent Municipal Yield (TEY) &amp; Taxable Bond Comparator</span>
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
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Tax Brackets &amp; Yields
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Municipal Yield (Tax-Free %)
                  </label>
                  <input
                    type="number"
                    step={0.05}
                    value={b6MuniYield}
                    onChange={(e) => setB6MuniYield(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Corporate Bond Yield (%)
                  </label>
                  <input
                    type="number"
                    step={0.05}
                    value={b6CorpYield}
                    onChange={(e) => setB6CorpYield(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Marginal Federal Tax (%)
                  </label>
                  <input
                    type="number"
                    step={1}
                    value={b6FedTax}
                    onChange={(e) => setB6FedTax(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    State / Local Tax (%)
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    value={b6StateTax}
                    onChange={(e) => setB6StateTax(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-100 dark:border-slate-800">
                Tax-Equivalent Comparison
              </span>

              <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 block uppercase font-bold">
                    Tax-Equivalent Yield (TEY)
                  </span>
                  <span className="text-2xl font-extrabold font-sans tabular-nums text-blue-700 dark:text-blue-300">
                    {b6Calc.taxEquivalentYield}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Optimal Decision</span>
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-extrabold inline-block mt-0.5 ${
                      b6Calc.recommendedOption === "Municipal"
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-blue-600 text-white shadow-xs"
                    }`}
                  >
                    {b6Calc.recommendedOption} Advantage
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-medium pt-1">
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Combined Effective Marginal Tax Rate:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">{b6Calc.combinedTaxRate}%</span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">After-Tax Return on {b6CorpYield}% Corporate Bond:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-sans tabular-nums">{b6Calc.afterTaxCorporateYield}%</span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Annual Tax Savings per $10,000 Invested:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums">
                    ${b6Calc.taxSavingsPer10k.toLocaleString()}
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
                  <span>Saved Tax-Equivalent Calculations ({savedBox6.length})</span>
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

export default BondCalculator;
