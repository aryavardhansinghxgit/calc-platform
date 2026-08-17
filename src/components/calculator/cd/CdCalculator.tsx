"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, ChevronDown, ChevronUp, Download, ShieldCheck, AlertTriangle } from "lucide-react";
import {
  calculateStandardCd,
  calculateCdLadder,
  calculateCdVsHysa,
  calculateEarlyWithdrawalPenalty,
  calculateCdGoalSolver,
  calculateSpecialtyCd,
} from "@/app/calculators/cd-calculator/calculator";
import {
  CompoundingFrequency,
  SavedCdItem,
} from "@/app/calculators/cd-calculator/types";

export function CdCalculator() {
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // Common 3D styling classes with physical 3D extruded borders
  const input3DClass =
    "w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none transition-all text-xs";
  const select3DClass =
    "w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none cursor-pointer text-xs";
  const outerBox3DClass =
    "rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 shadow-[0_5px_0_0_#1d4ed8,0_10px_20px_rgba(0,0,0,0.12),inset_0_2px_0_rgba(255,255,255,0.4)] transition-all";
  const innerCard3DClass =
    "grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/90 dark:bg-slate-900/60 border-2 border-slate-300 dark:border-slate-700 rounded-xl p-3.5 shadow-[0_3px_0_0_#cbd5e1,0_6px_12px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] text-xs";
  const resultCard3DClass =
    "bg-gradient-to-br from-blue-50/90 to-indigo-50/70 dark:from-slate-900 dark:to-blue-950/40 border-2 border-blue-300 dark:border-blue-800 rounded-xl p-3.5 shadow-[0_4px_0_0_#93c5fd,0_8px_16px_rgba(37,99,235,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] space-y-3";

  // =========================================================================
  // BOX 1: STANDARD FIXED-RATE CD GROWTH ENGINE
  // =========================================================================
  const [stdDeposit, setStdDeposit] = useState<string>("10000");
  const [stdTermMonths, setStdTermMonths] = useState<string>("12");
  const [stdRateValue, setStdRateValue] = useState<string>("5.0");
  const [stdRateType, setStdRateType] = useState<"apy" | "apr">("apy");
  const [stdCompFreq, setStdCompFreq] = useState<CompoundingFrequency>("daily");
  const [stdTaxRate, setStdTaxRate] = useState<string>("24");
  const [stdInflationRate, setStdInflationRate] = useState<string>("2.5");

  const [savedBox1Items, setSavedBox1Items] = useState<SavedCdItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);
  const [showHistoryBox1, setShowHistoryBox1] = useState<boolean>(false);

  const stdCalc = useMemo(() => {
    return calculateStandardCd({
      startingDeposit: parseFloat(stdDeposit) || 0,
      termMonths: parseFloat(stdTermMonths) || 0,
      rateValue: parseFloat(stdRateValue) || 0,
      rateType: stdRateType,
      compoundingFrequency: stdCompFreq,
      marginalTaxRate: parseFloat(stdTaxRate) || 0,
      inflationRate: parseFloat(stdInflationRate) || 0,
    });
  }, [stdDeposit, stdTermMonths, stdRateValue, stdRateType, stdCompFreq, stdTaxRate, stdInflationRate]);

  const handleSaveBox1 = () => {
    const newItem: SavedCdItem = {
      id: Date.now().toString(),
      title: "Standard Fixed CD Growth Calculation",
      inputsSummary: `Deposit: ${currencySymbol}${parseFloat(stdDeposit || "0").toLocaleString()} | Term: ${stdTermMonths}m | Rate: ${stdRateValue}% ${stdRateType.toUpperCase()} | Freq: ${stdCompFreq}`,
      primaryResult: `Maturity Balance: ${currencySymbol}${stdCalc.finalBalance.toLocaleString()} (Pre-Tax Interest: ${currencySymbol}${stdCalc.totalInterestPreTax.toLocaleString()})`,
      detailsList: [
        `Starting Principal: ${currencySymbol}${stdCalc.startingDeposit.toLocaleString()}`,
        `Pre-Tax Interest: ${currencySymbol}${stdCalc.totalInterestPreTax.toLocaleString()}`,
        `Tax Drag (${stdTaxRate}%): -${currencySymbol}${stdCalc.taxDragAmount.toLocaleString()}`,
        `Net After-Tax Interest: ${currencySymbol}${stdCalc.totalInterestAfterTax.toLocaleString()}`,
        `Effective APY: ${stdCalc.effectiveApy}% | Nominal APR: ${stdCalc.nominalApr}%`,
        `Real Inflation-Adjusted Balance: ${currencySymbol}${stdCalc.realBalance.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox1Items];
    setSavedBox1Items(updated);
    setShowHistoryBox1(true);
    try {
      localStorage.setItem("saved_cd_box1", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleExportBox1CSV = () => {
    const data = stdCalc.schedule;
    if (!data || data.length === 0) return;

    const headers = ["Month", "Deposit", "Interest Earned", "Cumulative Interest", "Ending Balance", "After Tax Balance", "Real Purchasing Power"];
    const rows = data.map((r) => [
      `"Month ${r.month}"`,
      `"${currencySymbol}${r.deposit}"`,
      `"${currencySymbol}${r.interestEarned}"`,
      `"${currencySymbol}${r.cumulativeInterest}"`,
      `"${currencySymbol}${r.endingBalance}"`,
      `"${currencySymbol}${r.afterTaxBalance}"`,
      `"${currencySymbol}${r.realPurchasingPowerBalance}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `cd_compounding_schedule.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Box 1 SVG Charts (Donut + Growth Curve)
  const box1Charts = useMemo(() => {
    const pVal = stdCalc.startingDeposit || 1;
    const iVal = stdCalc.totalInterestAfterTax || 0;
    const tVal = stdCalc.taxDragAmount || 0;
    const total = pVal + iVal + tVal;

    const pPct = Math.round((pVal / total) * 100) || 90;
    const iPct = Math.round((iVal / total) * 100) || 8;
    const tPct = 100 - (pPct + iPct);

    const C = 251.327;
    const pDash = (pPct / 100) * C;
    const iDash = (iPct / 100) * C;
    const tDash = C - (pDash + iDash);

    return (
      <div className="space-y-3 text-xs">
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 space-y-2">
          <span className="font-extrabold text-[11px] text-slate-700 dark:text-slate-300 block">
            CD Capital & Interest Breakdown
          </span>
          <div className="flex items-center justify-around">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#2563eb" strokeWidth="16" fill="transparent" strokeDasharray={`${pDash} ${C}`} />
                <circle cx="50" cy="50" r="40" stroke="#059669" strokeWidth="16" fill="transparent" strokeDasharray={`${iDash} ${C}`} strokeDashoffset={-pDash} />
                <circle cx="50" cy="50" r="40" stroke="#dc2626" strokeWidth="16" fill="transparent" strokeDasharray={`${tDash} ${C}`} strokeDashoffset={-(pDash + iDash)} />
              </svg>
              <div className="absolute text-center">
                <span className="text-[10px] font-bold text-slate-500 block">After Tax</span>
                <span className="text-xs font-black text-emerald-600">+{iPct}%</span>
              </div>
            </div>
            <div className="space-y-1 text-xs font-bold font-mono">
              <div className="flex items-center gap-1.5 text-blue-600">
                <span className="w-2.5 h-2.5 bg-blue-600 rounded-xs" />
                <span>Principal: {pPct}%</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-2.5 h-2.5 bg-emerald-600 rounded-xs" />
                <span>Net Interest: {iPct}%</span>
              </div>
              <div className="flex items-center gap-1.5 text-red-600">
                <span className="w-2.5 h-2.5 bg-red-600 rounded-xs" />
                <span>Tax Drag: {tPct}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Curve SVG */}
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 space-y-1">
          <span className="font-extrabold text-[11px] text-slate-700 dark:text-slate-300 block">
            CD Compounding Balance Growth Timeline
          </span>
          <div className="w-full h-28">
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <line x1="30" y1="105" x2="300" y2="105" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="30" y1="10" x2="30" y2="105" stroke="#cbd5e1" strokeWidth="1" />
              {stdCalc.schedule.length > 0 && (
                <polyline
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  points={stdCalc.schedule
                    .map((d, idx) => {
                      const x = (idx / (stdCalc.schedule.length - 1 || 1)) * 260 + 30;
                      const y = 105 - ((d.endingBalance - pVal) / (stdCalc.totalInterestPreTax || 1)) * 90;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                />
              )}
            </svg>
          </div>
        </div>
      </div>
    );
  }, [stdCalc]);

  // =========================================================================
  // BOX 2: MULTI-TIER CD LADDER STRATEGY BUILDER
  // =========================================================================
  const [ladderCap, setLadderCap] = useState<string>("25000");
  const [ladderStages, setLadderStages] = useState<string>("5");
  const [ladderBaseRate, setLadderBaseRate] = useState<string>("4.25");
  const [ladderTopRate, setLadderTopRate] = useState<string>("5.25");

  const [savedBox2Items, setSavedBox2Items] = useState<SavedCdItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);
  const [showHistoryBox2, setShowHistoryBox2] = useState<boolean>(false);

  const ladderCalc = useMemo(() => {
    return calculateCdLadder({
      totalCapital: parseFloat(ladderCap) || 0,
      stagesCount: parseFloat(ladderStages) || 5,
      baseShortRate: parseFloat(ladderBaseRate) || 0,
      topLongRate: parseFloat(ladderTopRate) || 0,
    });
  }, [ladderCap, ladderStages, ladderBaseRate, ladderTopRate]);

  const handleSaveBox2 = () => {
    const newItem: SavedCdItem = {
      id: Date.now().toString(),
      title: "Multi-Tier CD Ladder Strategy",
      inputsSummary: `Capital: ${currencySymbol}${parseFloat(ladderCap || "0").toLocaleString()} | Stages: ${ladderStages} | Short Rate: ${ladderBaseRate}% | Top Rate: ${ladderTopRate}%`,
      primaryResult: `Blended APY: ${ladderCalc.blendedApy}% | Annual Cash Liquidity: ${currencySymbol}${ladderCalc.annualLiquidityCash.toLocaleString()}`,
      detailsList: [
        `Total Ladder Capital: ${currencySymbol}${ladderCalc.totalCapital.toLocaleString()}`,
        `Blended Average APY: ${ladderCalc.blendedApy}%`,
        `Annual Liquidity Cash Event: ${currencySymbol}${ladderCalc.annualLiquidityCash.toLocaleString()}`,
        `Compounded 5-Year Ladder Value: ${currencySymbol}${ladderCalc.total5YearLadderValue.toLocaleString()}`,
        `Single CD 5-Year Value: ${currencySymbol}${ladderCalc.singleCd5YearValue.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox2Items];
    setSavedBox2Items(updated);
    setShowHistoryBox2(true);
    try {
      localStorage.setItem("saved_cd_box2", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  // =========================================================================
  // BOX 3: CD VS. HYSA YIELD COMPARATOR
  // =========================================================================
  const [vsDeposit, setVsDeposit] = useState<string>("20000");
  const [vsCdRate, setVsCdRate] = useState<string>("5.25");
  const [vsCdTerm, setVsCdTerm] = useState<string>("24");
  const [vsHysaRate, setVsHysaRate] = useState<string>("4.50");
  const [vsRateDrop, setVsRateDrop] = useState<string>("1.0");

  const [savedBox3Items, setSavedBox3Items] = useState<SavedCdItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);
  const [showHistoryBox3, setShowHistoryBox3] = useState<boolean>(false);

  const vsCalc = useMemo(() => {
    return calculateCdVsHysa({
      depositAmount: parseFloat(vsDeposit) || 0,
      cdRateApy: parseFloat(vsCdRate) || 0,
      cdTermMonths: parseFloat(vsCdTerm) || 0,
      currentHysaRateApy: parseFloat(vsHysaRate) || 0,
      expectedAnnualHysaRateDrop: parseFloat(vsRateDrop) || 0,
    });
  }, [vsDeposit, vsCdRate, vsCdTerm, vsHysaRate, vsRateDrop]);

  const handleSaveBox3 = () => {
    const newItem: SavedCdItem = {
      id: Date.now().toString(),
      title: "CD vs. High-Yield Savings (HYSA) Comparison",
      inputsSummary: `Deposit: ${currencySymbol}${parseFloat(vsDeposit || "0").toLocaleString()} | CD Rate: ${vsCdRate}% (${vsCdTerm}m) | HYSA: ${vsHysaRate}% (Drop: ${vsRateDrop}%/yr)`,
      primaryResult: `CD Rate Lock Advantage: +${currencySymbol}${vsCalc.rateLockBenefit.toLocaleString()}`,
      detailsList: [
        `Total CD Return at Maturity: ${currencySymbol}${vsCalc.totalCdReturn.toLocaleString()}`,
        `Total Variable HYSA Return: ${currencySymbol}${vsCalc.totalHysaReturn.toLocaleString()}`,
        `CD Rate Lock Advantage: +${currencySymbol}${vsCalc.rateLockBenefit.toLocaleString()}`,
        `Advantage Percentage: +${vsCalc.cdAdvantagePercentage}%`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox3Items];
    setSavedBox3Items(updated);
    setShowHistoryBox3(true);
    try {
      localStorage.setItem("saved_cd_box3", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  // =========================================================================
  // BOX 4: EARLY WITHDRAWAL PENALTY & BREAK-EVEN CALCULATOR
  // =========================================================================
  const [exitPrincipal, setExitPrincipal] = useState<string>("15000");
  const [exitCdRate, setExitCdRate] = useState<string>("4.8");
  const [exitTermMonths, setExitTermMonths] = useState<string>("24");
  const [exitPenaltyDays, setExitPenaltyDays] = useState<string>("180");
  const [exitElapsedMonths, setExitElapsedMonths] = useState<string>("6");
  const [exitNewRate, setExitNewRate] = useState<string>("5.8");

  const [savedBox4Items, setSavedBox4Items] = useState<SavedCdItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);
  const [showHistoryBox4, setShowHistoryBox4] = useState<boolean>(false);

  const exitCalc = useMemo(() => {
    return calculateEarlyWithdrawalPenalty({
      originalPrincipal: parseFloat(exitPrincipal) || 0,
      cdRateApy: parseFloat(exitCdRate) || 0,
      cdTermMonths: parseFloat(exitTermMonths) || 0,
      penaltyDays: parseFloat(exitPenaltyDays) || 180,
      monthsElapsedBeforeExit: parseFloat(exitElapsedMonths) || 0,
      newReinvestmentRateApy: parseFloat(exitNewRate) || 0,
    });
  }, [exitPrincipal, exitCdRate, exitTermMonths, exitPenaltyDays, exitElapsedMonths, exitNewRate]);

  const handleSaveBox4 = () => {
    const newItem: SavedCdItem = {
      id: Date.now().toString(),
      title: "Early Withdrawal Penalty & Break-Even Solver",
      inputsSummary: `Principal: ${currencySymbol}${parseFloat(exitPrincipal || "0").toLocaleString()} | CD Rate: ${exitCdRate}% | Penalty: ${exitPenaltyDays} days | Exit: Month ${exitElapsedMonths}`,
      primaryResult: `Net Payout: ${currencySymbol}${exitCalc.netPayoutAmount.toLocaleString()} (Penalty Fee: -${currencySymbol}${exitCalc.penaltyAmount.toLocaleString()})`,
      detailsList: [
        `Gross Interest Earned: ${currencySymbol}${exitCalc.grossInterestEarned.toLocaleString()}`,
        `Penalty Fee (${exitPenaltyDays} Days): -${currencySymbol}${exitCalc.penaltyAmount.toLocaleString()}`,
        `Net Interest Received: ${currencySymbol}${exitCalc.netInterestReceived.toLocaleString()}`,
        `Net Payout Received: ${currencySymbol}${exitCalc.netPayoutAmount.toLocaleString()}`,
        `Break-Even Period for New Rate (${exitNewRate}%): ${exitCalc.breakEvenMonthsForNewRate} months`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox4Items];
    setSavedBox4Items(updated);
    setShowHistoryBox4(true);
    try {
      localStorage.setItem("saved_cd_box4", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  // =========================================================================
  // BOX 5: TARGET SAVINGS & MATURITY GOAL SOLVER
  // =========================================================================
  const [goalTarget, setGoalTarget] = useState<string>("50000");
  const [goalRate, setGoalRate] = useState<string>("5.0");
  const [goalYears, setGoalYears] = useState<string>("3");
  const [goalMonths, setGoalMonths] = useState<string>("0");
  const [goalFreq, setGoalFreq] = useState<CompoundingFrequency>("daily");

  const [savedBox5Items, setSavedBox5Items] = useState<SavedCdItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);
  const [showHistoryBox5, setShowHistoryBox5] = useState<boolean>(false);

  const goalCalc = useMemo(() => {
    return calculateCdGoalSolver({
      targetBalance: parseFloat(goalTarget) || 0,
      rateApy: parseFloat(goalRate) || 0,
      years: parseFloat(goalYears) || 0,
      months: parseFloat(goalMonths) || 0,
      compoundingFrequency: goalFreq,
    });
  }, [goalTarget, goalRate, goalYears, goalMonths, goalFreq]);

  const handleSaveBox5 = () => {
    const newItem: SavedCdItem = {
      id: Date.now().toString(),
      title: "Target Savings & CD Maturity Goal Solver",
      inputsSummary: `Target: ${currencySymbol}${parseFloat(goalTarget || "0").toLocaleString()} | Rate: ${goalRate}% APY | Time: ${goalYears}y ${goalMonths}m`,
      primaryResult: `Required Initial Deposit: ${currencySymbol}${goalCalc.requiredInitialDeposit.toLocaleString()}`,
      detailsList: [
        `Required Deposit Today: ${currencySymbol}${goalCalc.requiredInitialDeposit.toLocaleString()}`,
        `Total Interest to be Earned: ${currencySymbol}${goalCalc.totalInterestToEarn.toLocaleString()}`,
        `Percentage Yield Growth: +${goalCalc.percentageYieldGrowth}%`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox5Items];
    setSavedBox5Items(updated);
    setShowHistoryBox5(true);
    try {
      localStorage.setItem("saved_cd_box5", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  // =========================================================================
  // BOX 6: SPECIALTY CD SIMULATOR (NO-PENALTY & BUMP-UP)
  // =========================================================================
  const [specDeposit, setSpecDeposit] = useState<string>("10000");
  const [specRate, setSpecRate] = useState<string>("4.75");
  const [specTerm, setSpecTerm] = useState<string>("12");
  const [specType, setSpecType] = useState<"no_penalty" | "bump_up">("no_penalty");
  const [specBump, setSpecBump] = useState<string>("0.75");

  const [savedBox6Items, setSavedBox6Items] = useState<SavedCdItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);
  const [showHistoryBox6, setShowHistoryBox6] = useState<boolean>(false);

  const specCalc = useMemo(() => {
    return calculateSpecialtyCd({
      deposit: parseFloat(specDeposit) || 0,
      initialApy: parseFloat(specRate) || 0,
      termMonths: parseFloat(specTerm) || 0,
      cdType: specType,
      bumpUpRateIncrease: parseFloat(specBump) || 0,
    });
  }, [specDeposit, specRate, specTerm, specType, specBump]);

  const handleSaveBox6 = () => {
    const newItem: SavedCdItem = {
      id: Date.now().toString(),
      title: "Specialty CD Simulator (No-Penalty vs Bump-Up)",
      inputsSummary: `Deposit: ${currencySymbol}${parseFloat(specDeposit || "0").toLocaleString()} | Type: ${specType} | Initial Rate: ${specRate}%`,
      primaryResult: `Specialty CD Payout: ${currencySymbol}${specCalc.specialtyCdBalance.toLocaleString()}`,
      detailsList: [
        `Standard Fixed CD Payout: ${currencySymbol}${specCalc.standardCdBalance.toLocaleString()}`,
        `Specialty CD Payout: ${currencySymbol}${specCalc.specialtyCdBalance.toLocaleString()}`,
        `Yield Variance: ${currencySymbol}${specCalc.difference.toLocaleString()}`,
        specCalc.description,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox6Items];
    setSavedBox6Items(updated);
    setShowHistoryBox6(true);
    try {
      localStorage.setItem("saved_cd_box6", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  useEffect(() => {
    try {
      const b1 = localStorage.getItem("saved_cd_box1");
      if (b1) setSavedBox1Items(JSON.parse(b1));
      const b2 = localStorage.getItem("saved_cd_box2");
      if (b2) setSavedBox2Items(JSON.parse(b2));
      const b3 = localStorage.getItem("saved_cd_box3");
      if (b3) setSavedBox3Items(JSON.parse(b3));
      const b4 = localStorage.getItem("saved_cd_box4");
      if (b4) setSavedBox4Items(JSON.parse(b4));
      const b5 = localStorage.getItem("saved_cd_box5");
      if (b5) setSavedBox5Items(JSON.parse(b5));
      const b6 = localStorage.getItem("saved_cd_box6");
      if (b6) setSavedBox6Items(JSON.parse(b6));
    } catch (e) {}
  }, []);

  return (
    <div className="space-y-5 max-w-7xl mx-auto font-sans">
      {/* Currency Selector Header */}
      <div className="flex items-center justify-end gap-2 text-xs font-bold">
        <label htmlFor="cd-currency-select" className="text-slate-500 font-medium">Currency:</label>
        <select
          id="cd-currency-select"
          value={currencySymbol}
          onChange={(e) => setCurrencySymbol(e.target.value)}
          className="h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] cursor-pointer focus:border-blue-600 focus:outline-none"
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
      {/* 1. STANDARD FIXED-RATE CD GROWTH ENGINE */}
      {/* ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-3.5 py-2 flex items-center justify-between">
          <span className="font-extrabold text-sm">Standard Fixed-Rate CD Growth Engine</span>
          <button
            type="button"
            onClick={handleSaveBox1}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox1 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-3.5 space-y-4">
          <div className={innerCard3DClass}>
            <div className="space-y-3">
              <span className="font-extrabold text-blue-600 dark:text-blue-400 block border-b border-slate-200 dark:border-slate-800 pb-1 uppercase tracking-wider text-[11px]">
                Deposit & Term Specifications
              </span>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Starting Deposit ($)</label>
                <input type="number" value={stdDeposit} onChange={(e) => setStdDeposit(e.target.value)} className={input3DClass} />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">CD Term Length (Months)</label>
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  {["3", "6", "9", "12", "18", "24", "36", "60"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setStdTermMonths(m)}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold border ${stdTermMonths === m ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-blue-500"}`}
                    >
                      {m} Mo
                    </button>
                  ))}
                </div>
                <input type="number" value={stdTermMonths} onChange={(e) => setStdTermMonths(e.target.value)} className={input3DClass} />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Interest Rate / APY (%)</label>
                <div className="flex items-center gap-2 mb-1.5">
                  <input type="number" step="0.05" value={stdRateValue} onChange={(e) => setStdRateValue(e.target.value)} className={input3DClass} />
                  <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-800 text-[11px] font-bold">
                    <button type="button" onClick={() => setStdRateType("apy")} className={`px-2 py-0.5 rounded ${stdRateType === "apy" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-400"}`}>APY</button>
                    <button type="button" onClick={() => setStdRateType("apr")} className={`px-2 py-0.5 rounded ${stdRateType === "apr" ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-400"}`}>APR</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 block border-b border-slate-200 dark:border-slate-800 pb-1 uppercase tracking-wider text-[11px]">
                Compounding & Tax Drag
              </span>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Compounding Frequency</label>
                <select value={stdCompFreq} onChange={(e) => setStdCompFreq(e.target.value as CompoundingFrequency)} className={select3DClass}>
                  <option value="daily">Daily (365/yr)</option>
                  <option value="monthly">Monthly (12/yr)</option>
                  <option value="quarterly">Quarterly (4/yr)</option>
                  <option value="semiannually">Semi-Annually (2/yr)</option>
                  <option value="annually">Annually (1/yr)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Marginal Tax Rate (%)</label>
                <input type="number" step="1" value={stdTaxRate} onChange={(e) => setStdTaxRate(e.target.value)} className={input3DClass} />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Expected Inflation Rate (%)</label>
                <input type="number" step="0.1" value={stdInflationRate} onChange={(e) => setStdInflationRate(e.target.value)} className={input3DClass} />
              </div>
            </div>
          </div>

          <div className={resultCard3DClass}>
            <div className="flex items-center justify-between border-b border-blue-200/60 dark:border-blue-900/40 pb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  FDIC Guaranteed Maturity Payout
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-600 text-white text-xs font-extrabold">
                Effective APY: {stdCalc.effectiveApy}%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <div className="space-y-3">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border-2 border-blue-200 dark:border-blue-900/60 text-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Final Balance at Maturity</span>
                  <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                    {currencySymbol}{stdCalc.finalBalance.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium block">
                    Pre-Tax Interest: +{currencySymbol}{stdCalc.totalInterestPreTax.toLocaleString()}
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <table className="w-full text-xs text-left border-collapse font-sans">
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
                      <tr>
                        <td className="p-2 font-sans font-bold text-slate-700 dark:text-slate-300">Initial Deposit</td>
                        <td className="p-2 font-bold">{currencySymbol}{stdCalc.startingDeposit.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-sans font-bold text-slate-700 dark:text-slate-300">Pre-Tax Total Interest</td>
                        <td className="p-2 font-bold text-blue-600">+{currencySymbol}{stdCalc.totalInterestPreTax.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-sans font-bold text-slate-700 dark:text-slate-300">Tax Drag ({stdTaxRate}%)</td>
                        <td className="p-2 font-bold text-red-500">-{currencySymbol}{stdCalc.taxDragAmount.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-blue-50/60 dark:bg-blue-950/40">
                        <td className="p-2 font-sans font-extrabold text-slate-900 dark:text-slate-100">Net After-Tax Interest</td>
                        <td className="p-2 font-extrabold text-emerald-600">+{currencySymbol}{stdCalc.totalInterestAfterTax.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-sans font-bold text-slate-700 dark:text-slate-300">Real Inflation Balance</td>
                        <td className="p-2 font-bold text-slate-800 dark:text-slate-200">{currencySymbol}{stdCalc.realBalance.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-3">
                {box1Charts}
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200">
                Month-by-Month CD Compounding Schedule
              </span>
              <button
                type="button"
                onClick={handleExportBox1CSV}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto max-h-64 rounded-xl border-2 border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs text-center border-collapse font-mono">
                <thead className="sticky top-0 bg-blue-600 text-white font-bold font-sans">
                  <tr>
                    <th className="p-2 border-r border-blue-500">Month</th>
                    <th className="p-2 border-r border-blue-500">Interest Earned</th>
                    <th className="p-2 border-r border-blue-500">Ending Balance</th>
                    <th className="p-2 border-r border-blue-500">After Tax Balance</th>
                    <th className="p-2">Real Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {stdCalc.schedule.map((r) => (
                    <tr key={r.month} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-1.5 font-bold font-sans text-blue-600 border-r border-slate-200 dark:border-slate-800">Mo {r.month}</td>
                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800 text-blue-600 font-bold">+{currencySymbol}{r.interestEarned.toLocaleString()}</td>
                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800 font-bold">{currencySymbol}{r.endingBalance.toLocaleString()}</td>
                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800 text-emerald-600">{currencySymbol}{r.afterTaxBalance.toLocaleString()}</td>
                      <td className="p-1.5 text-slate-700 dark:text-slate-300">{currencySymbol}{r.realPurchasingPowerBalance.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {savedBox1Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
              <button onClick={() => setShowHistoryBox1(!showHistoryBox1)} className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
                <span>Saved Calculations ({savedBox1Items.length})</span>
                {showHistoryBox1 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox1 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox1Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <button onClick={() => setSavedBox1Items(savedBox1Items.filter((i) => i.id !== item.id))} className="text-red-500 hover:text-red-700 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300"><strong>Inputs:</strong> {item.inputsSummary}</div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, idx) => (<div key={idx}>• {d}</div>))}
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
      {/* 2. MULTI-TIER CD LADDER STRATEGY BUILDER */}
      {/* ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-3.5 py-2 flex items-center justify-between">
          <span className="font-extrabold text-sm">Interactive Multi-Tier CD Ladder Strategy Builder</span>
          <button
            type="button"
            onClick={handleSaveBox2}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox2 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-3.5 space-y-4">
          <div className={innerCard3DClass}>
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Total Ladder Capital ($)</label>
                <input type="number" value={ladderCap} onChange={(e) => setLadderCap(e.target.value)} className={input3DClass} />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Ladder Stages / Tranches (Count)</label>
                <input type="number" value={ladderStages} onChange={(e) => setLadderStages(e.target.value)} className={input3DClass} />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Short-Term Base APY (%)</label>
                <input type="number" step="0.1" value={ladderBaseRate} onChange={(e) => setLadderBaseRate(e.target.value)} className={input3DClass} />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Top Long-Term APY (%)</label>
                <input type="number" step="0.1" value={ladderTopRate} onChange={(e) => setLadderTopRate(e.target.value)} className={input3DClass} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start text-xs">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-900/60 text-center">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Blended Ladder Average APY</span>
                <span className="text-3xl font-extrabold text-blue-600 font-sans tabular-nums">{ladderCalc.blendedApy}%</span>
              </div>

              <table className="w-full text-xs font-sans">
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  <tr>
                    <td className="p-2 font-bold font-sans">Annual Cash Liquidity Event</td>
                    <td className="p-2 font-bold text-emerald-600">{currencySymbol}{ladderCalc.annualLiquidityCash.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Compounded 5-Year Ladder Value</td>
                    <td className="p-2 font-bold text-blue-600">{currencySymbol}{ladderCalc.total5YearLadderValue.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Single CD 5-Year Value</td>
                    <td className="p-2 font-bold">{currencySymbol}{ladderCalc.singleCd5YearValue.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Ladder Maturity Timeline Map */}
            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-extrabold text-[11px] text-slate-700 dark:text-slate-300 block">
                Rolling Tranche Maturity Map
              </span>
              <div className="space-y-1.5 font-mono text-[11px]">
                {ladderCalc.stages.map((st) => (
                  <div key={st.stage} className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold font-sans text-blue-600">Tranche {st.stage} ({st.termYears} Yr):</span> {currencySymbol}{st.allocationAmount.toLocaleString()} @ {st.apy}% APY
                    </div>
                    <span className="font-bold text-emerald-600">{currencySymbol}{st.maturityBalance.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {savedBox2Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
              <button onClick={() => setShowHistoryBox2(!showHistoryBox2)} className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
                <span>Saved Calculations ({savedBox2Items.length})</span>
                {showHistoryBox2 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox2 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox2Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <button onClick={() => setSavedBox2Items(savedBox2Items.filter((i) => i.id !== item.id))} className="text-red-500 hover:text-red-700 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300"><strong>Inputs:</strong> {item.inputsSummary}</div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, idx) => (<div key={idx}>• {d}</div>))}
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
      {/* 3. CD VS. HIGH-YIELD SAVINGS ACCOUNT (HYSA) COMPARATOR */}
      {/* ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-3.5 py-2 flex items-center justify-between">
          <span className="font-extrabold text-sm">CD vs. High-Yield Savings Account (HYSA) Yield Comparator</span>
          <button
            type="button"
            onClick={handleSaveBox3}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox3 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-3.5 space-y-4">
          <div className={innerCard3DClass}>
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Deposit Amount ($)</label>
                <input type="number" value={vsDeposit} onChange={(e) => setVsDeposit(e.target.value)} className={input3DClass} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Fixed CD APY (%)</label>
                  <input type="number" step="0.1" value={vsCdRate} onChange={(e) => setVsCdRate(e.target.value)} className={input3DClass} />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">CD Term (Mo)</label>
                  <input type="number" value={vsCdTerm} onChange={(e) => setVsCdTerm(e.target.value)} className={input3DClass} />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Current HYSA Rate (% APY)</label>
                <input type="number" step="0.1" value={vsHysaRate} onChange={(e) => setVsHysaRate(e.target.value)} className={input3DClass} />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Expected Annual HYSA Rate Cut (%/yr)</label>
                <input type="number" step="0.1" value={vsRateDrop} onChange={(e) => setVsRateDrop(e.target.value)} className={input3DClass} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start text-xs">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 space-y-3">
              <div className="p-3 bg-indigo-50 dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-indigo-900/60 text-center">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 block">CD Rate Lock Advantage</span>
                <span className="text-3xl font-extrabold text-emerald-600 font-sans tabular-nums">+{currencySymbol}{vsCalc.rateLockBenefit.toLocaleString()}</span>
              </div>

              <table className="w-full text-xs font-sans">
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  <tr>
                    <td className="p-2 font-bold font-sans">Total CD Return ({vsCdRate}%)</td>
                    <td className="p-2 font-bold text-blue-600">{currencySymbol}{vsCalc.totalCdReturn.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Total HYSA Return (Decaying)</td>
                    <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{currencySymbol}{vsCalc.totalHysaReturn.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Rate Lock Benefit</td>
                    <td className="p-2 font-bold text-emerald-600">+{vsCalc.cdAdvantagePercentage}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-extrabold text-[11px] text-slate-700 dark:text-slate-300 block">
                Rate-Lock Value Analysis
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
                Locking in a fixed CD at {vsCdRate}% APY protects your capital against expected market rate cuts, yielding an extra +{currencySymbol}{vsCalc.rateLockBenefit.toLocaleString()} compared to a variable HYSA.
              </p>
            </div>
          </div>

          {savedBox3Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
              <button onClick={() => setShowHistoryBox3(!showHistoryBox3)} className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
                <span>Saved Calculations ({savedBox3Items.length})</span>
                {showHistoryBox3 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox3 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox3Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <button onClick={() => setSavedBox3Items(savedBox3Items.filter((i) => i.id !== item.id))} className="text-red-500 hover:text-red-700 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300"><strong>Inputs:</strong> {item.inputsSummary}</div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, idx) => (<div key={idx}>• {d}</div>))}
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
      {/* 4. EARLY WITHDRAWAL PENALTY & BREAK-EVEN CALCULATOR */}
      {/* ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-3.5 py-2 flex items-center justify-between">
          <span className="font-extrabold text-sm">Early Withdrawal Penalty & Break-Even Calculator</span>
          <button
            type="button"
            onClick={handleSaveBox4}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox4 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-3.5 space-y-4">
          <div className={innerCard3DClass}>
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Original Principal ($)</label>
                <input type="number" value={exitPrincipal} onChange={(e) => setExitPrincipal(e.target.value)} className={input3DClass} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">CD Rate (% APY)</label>
                  <input type="number" step="0.1" value={exitCdRate} onChange={(e) => setExitCdRate(e.target.value)} className={input3DClass} />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Term (Mo)</label>
                  <input type="number" value={exitTermMonths} onChange={(e) => setExitTermMonths(e.target.value)} className={input3DClass} />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Penalty Terms (Days of Interest)</label>
                <select value={exitPenaltyDays} onChange={(e) => setExitPenaltyDays(e.target.value)} className={select3DClass}>
                  <option value="30">30 Days Simple Interest</option>
                  <option value="90">90 Days Simple Interest</option>
                  <option value="180">180 Days Simple Interest</option>
                  <option value="270">270 Days Simple Interest</option>
                  <option value="360">360 Days Simple Interest</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Elapsed Months</label>
                  <input type="number" value={exitElapsedMonths} onChange={(e) => setExitElapsedMonths(e.target.value)} className={input3DClass} />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">New Available APY (%)</label>
                  <input type="number" step="0.1" value={exitNewRate} onChange={(e) => setExitNewRate(e.target.value)} className={input3DClass} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start text-xs">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 space-y-3">
              <div className="p-3 bg-amber-50 dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-amber-900/60 text-center">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Net Early Payout Received</span>
                <span className="text-3xl font-extrabold text-blue-600 font-sans tabular-nums">{currencySymbol}{exitCalc.netPayoutAmount.toLocaleString()}</span>
              </div>

              <table className="w-full text-xs font-sans">
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  <tr>
                    <td className="p-2 font-bold font-sans">Gross Interest Earned</td>
                    <td className="p-2 font-bold text-emerald-600">+{currencySymbol}{exitCalc.grossInterestEarned.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Penalty Fee ({exitPenaltyDays} Days)</td>
                    <td className="p-2 font-bold text-red-500">-{currencySymbol}{exitCalc.penaltyAmount.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Net Interest Received</td>
                    <td className="p-2 font-bold text-blue-600">{currencySymbol}{exitCalc.netInterestReceived.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Break-Even Period for New Rate</td>
                    <td className="p-2 font-bold text-purple-600">{exitCalc.breakEvenMonthsForNewRate} months</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-extrabold text-[11px] text-slate-700 dark:text-slate-300 block">
                Early Withdrawal Risk Notice
              </span>
              {exitCalc.principalEroded ? (
                <div className="p-2.5 bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 flex items-start gap-2 font-bold">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Warning: Cashing out now erodes {currencySymbol}{Math.abs(exitCalc.netInterestReceived).toLocaleString()} of initial principal because the early exit penalty exceeds earned interest.</span>
                </div>
              ) : (
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
                  Gross interest accrued so far exceeds penalty charges. Cashing out to move to {exitNewRate}% APY will recover the penalty fee within {exitCalc.breakEvenMonthsForNewRate} months.
                </p>
              )}
            </div>
          </div>

          {savedBox4Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
              <button onClick={() => setShowHistoryBox4(!showHistoryBox4)} className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
                <span>Saved Calculations ({savedBox4Items.length})</span>
                {showHistoryBox4 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox4 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox4Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <button onClick={() => setSavedBox4Items(savedBox4Items.filter((i) => i.id !== item.id))} className="text-red-500 hover:text-red-700 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300"><strong>Inputs:</strong> {item.inputsSummary}</div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, idx) => (<div key={idx}>• {d}</div>))}
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
      {/* 5. TARGET SAVINGS & MATURITY GOAL SOLVER */}
      {/* ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-3.5 py-2 flex items-center justify-between">
          <span className="font-extrabold text-sm">Target Savings & CD Maturity Goal Solver</span>
          <button
            type="button"
            onClick={handleSaveBox5}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox5 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-3.5 space-y-4">
          <div className={innerCard3DClass}>
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Final Balance ($)</label>
                <input type="number" value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} className={input3DClass} />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">CD Rate (% APY)</label>
                <input type="number" step="0.1" value={goalRate} onChange={(e) => setGoalRate(e.target.value)} className={input3DClass} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Years</label>
                  <input type="number" value={goalYears} onChange={(e) => setGoalYears(e.target.value)} className={input3DClass} />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Months</label>
                  <input type="number" value={goalMonths} onChange={(e) => setGoalMonths(e.target.value)} className={input3DClass} />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Compounding Frequency</label>
                <select value={goalFreq} onChange={(e) => setGoalFreq(e.target.value as CompoundingFrequency)} className={select3DClass}>
                  <option value="daily">Daily</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start text-xs">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 space-y-3">
              <div className="p-3 bg-emerald-50 dark:bg-slate-800 rounded-xl border border-emerald-200 dark:border-emerald-900/60 text-center">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Required Principal Deposit Today</span>
                <span className="text-3xl font-extrabold text-emerald-600 font-sans tabular-nums">{currencySymbol}{goalCalc.requiredInitialDeposit.toLocaleString()}</span>
              </div>

              <table className="w-full text-xs font-sans">
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  <tr>
                    <td className="p-2 font-bold font-sans">Target Final Balance</td>
                    <td className="p-2 font-bold">{currencySymbol}{parseFloat(goalTarget || "0").toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Total Interest to be Earned</td>
                    <td className="p-2 font-bold text-blue-600">+{currencySymbol}{goalCalc.totalInterestToEarn.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Percentage Yield Growth</td>
                    <td className="p-2 font-bold text-emerald-600">+{goalCalc.percentageYieldGrowth}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-extrabold text-[11px] text-slate-700 dark:text-slate-300 block">
                Maturity Target Summary
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
                Depositing {currencySymbol}{goalCalc.requiredInitialDeposit.toLocaleString()} today into a {goalRate}% APY CD will grow to your goal of {currencySymbol}{parseFloat(goalTarget || "0").toLocaleString()} over {goalYears} years.
              </p>
            </div>
          </div>

          {savedBox5Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
              <button onClick={() => setShowHistoryBox5(!showHistoryBox5)} className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
                <span>Saved Calculations ({savedBox5Items.length})</span>
                {showHistoryBox5 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox5 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox5Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <button onClick={() => setSavedBox5Items(savedBox5Items.filter((i) => i.id !== item.id))} className="text-red-500 hover:text-red-700 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300"><strong>Inputs:</strong> {item.inputsSummary}</div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, idx) => (<div key={idx}>• {d}</div>))}
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
      {/* 6. SPECIALTY CD SIMULATOR (NO-PENALTY & BUMP-UP) */}
      {/* ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-3.5 py-2 flex items-center justify-between">
          <span className="font-extrabold text-sm">Specialty CD Simulator (No-Penalty Liquid CD vs. Bump-Up CD)</span>
          <button
            type="button"
            onClick={handleSaveBox6}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox6 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-3.5 space-y-4">
          <div className={innerCard3DClass}>
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Deposit Amount ($)</label>
                <input type="number" value={specDeposit} onChange={(e) => setSpecDeposit(e.target.value)} className={input3DClass} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Initial APY (%)</label>
                  <input type="number" step="0.1" value={specRate} onChange={(e) => setSpecRate(e.target.value)} className={input3DClass} />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Term (Mo)</label>
                  <input type="number" value={specTerm} onChange={(e) => setSpecTerm(e.target.value)} className={input3DClass} />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Specialty CD Type</label>
                <select value={specType} onChange={(e) => setSpecType(e.target.value as "no_penalty" | "bump_up")} className={select3DClass}>
                  <option value="no_penalty">No-Penalty (Liquid) CD</option>
                  <option value="bump_up">Bump-Up CD (One-Time Rate Increase)</option>
                </select>
              </div>

              {specType === "bump_up" && (
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Rate Increase Bump-Up (% APY)</label>
                  <input type="number" step="0.1" value={specBump} onChange={(e) => setSpecBump(e.target.value)} className={input3DClass} />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start text-xs">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-900/60 text-center">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Specialty CD Maturity Balance</span>
                <span className="text-3xl font-extrabold text-blue-600 font-sans tabular-nums">{currencySymbol}{specCalc.specialtyCdBalance.toLocaleString()}</span>
              </div>

              <table className="w-full text-xs font-sans">
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  <tr>
                    <td className="p-2 font-bold font-sans">Standard Fixed CD Balance</td>
                    <td className="p-2 font-bold">{currencySymbol}{specCalc.standardCdBalance.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Specialty CD Balance</td>
                    <td className="p-2 font-bold text-blue-600">{currencySymbol}{specCalc.specialtyCdBalance.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold font-sans">Variance</td>
                    <td className="p-2 font-bold text-emerald-600">{currencySymbol}{specCalc.difference.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-extrabold text-[11px] text-slate-700 dark:text-slate-300 block">
                Specialty Feature Analysis
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
                {specCalc.description}
              </p>
            </div>
          </div>

          {savedBox6Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
              <button onClick={() => setShowHistoryBox6(!showHistoryBox6)} className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
                <span>Saved Calculations ({savedBox6Items.length})</span>
                {showHistoryBox6 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox6 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox6Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <button onClick={() => setSavedBox6Items(savedBox6Items.filter((i) => i.id !== item.id))} className="text-red-500 hover:text-red-700 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300"><strong>Inputs:</strong> {item.inputsSummary}</div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, idx) => (<div key={idx}>• {d}</div>))}
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
