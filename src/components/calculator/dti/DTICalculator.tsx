"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import {
  calculateStandardDTI,
  evaluateMortgageEligibility,
  calculateReverseTargetIncome,
  calculateReverseMaxHousing,
  calculateDebtPayoffImpact,
  calculateSelfEmployedIncome,
} from "@/app/calculators/dti-calculator/calculator";
import {
  IncomeFrequency,
  DebtSimItem,
  SavedDTIItem,
} from "@/app/calculators/dti-calculator/types";

export function DTICalculator() {
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // =========================================================================
  // BOX 1: STANDARD & ITEMIZED DTI CALCULATOR STATES
  // =========================================================================
  const [incomeFreq, setIncomeFreq] = useState<IncomeFrequency>("annual");
  const [primarySalary, setPrimarySalary] = useState<string>("75000");
  const [coBorrowerIncome, setCoBorrowerIncome] = useState<string>("0");
  const [bonusesCommissions, setBonusesCommissions] = useState<string>("0");
  const [dividendsAlimonyOther, setDividendsAlimonyOther] = useState<string>("0");

  const [mortgageRentPI, setMortgageRentPI] = useState<string>("1800");
  const [propertyTaxes, setPropertyTaxes] = useState<string>("200");
  const [hazardInsurance, setHazardInsurance] = useState<string>("100");
  const [pmiMip, setPmiMip] = useState<string>("0");
  const [hoaFees, setHoaFees] = useState<string>("0");

  const [autoLoansLeases, setAutoLoansLeases] = useState<string>("350");
  const [studentLoans, setStudentLoans] = useState<string>("250");
  const [creditCardMinimums, setCreditCardMinimums] = useState<string>("150");
  const [personalLoans, setPersonalLoans] = useState<string>("0");
  const [alimonyChildSupportPaid, setAlimonyChildSupportPaid] = useState<string>("0");
  const [otherDebts, setOtherDebts] = useState<string>("0");

  const [savedBox1Items, setSavedBox1Items] = useState<SavedDTIItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);
  const [showHistoryBox1, setShowHistoryBox1] = useState<boolean>(false);

  // Frequency toggle handler with intelligent numerical synchronization
  const handleFreqChange = (newFreq: IncomeFrequency) => {
    if (newFreq === incomeFreq) return;
    if (newFreq === "monthly") {
      setPrimarySalary((prev) => {
        const v = parseFloat(prev);
        return !isNaN(v) && v > 0 ? (v % 12 === 0 ? (v / 12).toFixed(0) : (v / 12).toFixed(2)) : prev;
      });
      setCoBorrowerIncome((prev) => {
        const v = parseFloat(prev);
        return !isNaN(v) && v > 0 ? (v % 12 === 0 ? (v / 12).toFixed(0) : (v / 12).toFixed(2)) : prev;
      });
      setBonusesCommissions((prev) => {
        const v = parseFloat(prev);
        return !isNaN(v) && v > 0 ? (v % 12 === 0 ? (v / 12).toFixed(0) : (v / 12).toFixed(2)) : prev;
      });
      setDividendsAlimonyOther((prev) => {
        const v = parseFloat(prev);
        return !isNaN(v) && v > 0 ? (v % 12 === 0 ? (v / 12).toFixed(0) : (v / 12).toFixed(2)) : prev;
      });
    } else {
      setPrimarySalary((prev) => {
        const v = parseFloat(prev);
        return !isNaN(v) && v > 0 ? (v * 12).toFixed(0) : prev;
      });
      setCoBorrowerIncome((prev) => {
        const v = parseFloat(prev);
        return !isNaN(v) && v > 0 ? (v * 12).toFixed(0) : prev;
      });
      setBonusesCommissions((prev) => {
        const v = parseFloat(prev);
        return !isNaN(v) && v > 0 ? (v * 12).toFixed(0) : prev;
      });
      setDividendsAlimonyOther((prev) => {
        const v = parseFloat(prev);
        return !isNaN(v) && v > 0 ? (v * 12).toFixed(0) : prev;
      });
    }
    setIncomeFreq(newFreq);
  };

  const handleResetBox1 = () => {
    setIncomeFreq("annual");
    setPrimarySalary("75000");
    setCoBorrowerIncome("0");
    setBonusesCommissions("0");
    setDividendsAlimonyOther("0");
    setMortgageRentPI("1800");
    setPropertyTaxes("200");
    setHazardInsurance("100");
    setPmiMip("0");
    setHoaFees("0");
    setAutoLoansLeases("350");
    setStudentLoans("250");
    setCreditCardMinimums("150");
    setPersonalLoans("0");
    setAlimonyChildSupportPaid("0");
    setOtherDebts("0");
  };

  const standardCalc = useMemo(() => {
    return calculateStandardDTI({
      incomeFreq,
      income: {
        primarySalary: parseFloat(primarySalary) || 0,
        coBorrowerIncome: parseFloat(coBorrowerIncome) || 0,
        bonusesCommissions: parseFloat(bonusesCommissions) || 0,
        dividendsAlimonyOther: parseFloat(dividendsAlimonyOther) || 0,
      },
      housing: {
        mortgageRentPI: parseFloat(mortgageRentPI) || 0,
        propertyTaxes: parseFloat(propertyTaxes) || 0,
        hazardInsurance: parseFloat(hazardInsurance) || 0,
        pmiMip: parseFloat(pmiMip) || 0,
        hoaFees: parseFloat(hoaFees) || 0,
      },
      debts: {
        autoLoansLeases: parseFloat(autoLoansLeases) || 0,
        studentLoans: parseFloat(studentLoans) || 0,
        creditCardMinimums: parseFloat(creditCardMinimums) || 0,
        personalLoans: parseFloat(personalLoans) || 0,
        alimonyChildSupportPaid: parseFloat(alimonyChildSupportPaid) || 0,
        otherDebts: parseFloat(otherDebts) || 0,
      },
      currencySymbol,
    });
  }, [
    incomeFreq,
    primarySalary,
    coBorrowerIncome,
    bonusesCommissions,
    dividendsAlimonyOther,
    mortgageRentPI,
    propertyTaxes,
    hazardInsurance,
    pmiMip,
    hoaFees,
    autoLoansLeases,
    studentLoans,
    creditCardMinimums,
    personalLoans,
    alimonyChildSupportPaid,
    otherDebts,
    currencySymbol,
  ]);

  const handleSaveBox1 = () => {
    const newItem: SavedDTIItem = {
      id: Date.now().toString(),
      title: "Standard DTI Calculation",
      inputsSummary: `Gross Income: ${currencySymbol}${standardCalc.grossMonthlyIncome.toLocaleString()}/mo (${incomeFreq}) | Housing: ${currencySymbol}${standardCalc.totalMonthlyHousing.toLocaleString()} | Debts: ${currencySymbol}${standardCalc.totalMonthlyDebt.toLocaleString()}`,
      primaryResult: `Front-End: ${standardCalc.frontEndRatio}% | Back-End: ${standardCalc.backEndRatio}%`,
      detailsList: [
        `Risk Rating: ${standardCalc.riskTier}`,
        `Monthly Housing Costs: ${currencySymbol}${standardCalc.totalMonthlyHousing.toLocaleString()}`,
        `Monthly Debt Obligations: ${currencySymbol}${standardCalc.totalMonthlyDebt.toLocaleString()}`,
        `Remaining Disposable Buffer: ${currencySymbol}${standardCalc.disposableIncome.toLocaleString()}/mo`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox1Items];
    setSavedBox1Items(updated);
    try {
      localStorage.setItem("saved_dti_box1", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  // =========================================================================
  // BOX 2: MORTGAGE PROGRAM ELIGIBILITY MATRIX STATES
  // =========================================================================
  const [creditScoreBand, setCreditScoreBand] = useState<string>("740+");
  const [savedBox2Items, setSavedBox2Items] = useState<SavedDTIItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);
  const [showHistoryBox2, setShowHistoryBox2] = useState<boolean>(false);

  const matrixCalc = useMemo(() => {
    return evaluateMortgageEligibility(standardCalc.frontEndRatio, standardCalc.backEndRatio, creditScoreBand);
  }, [standardCalc.frontEndRatio, standardCalc.backEndRatio, creditScoreBand]);

  const handleSaveBox2 = () => {
    const newItem: SavedDTIItem = {
      id: Date.now().toString(),
      title: "Mortgage Program Eligibility Matrix",
      inputsSummary: `DTI Evaluated: ${standardCalc.frontEndRatio}% Front-End / ${standardCalc.backEndRatio}% Back-End | Credit Score: ${creditScoreBand}`,
      primaryResult: `Eligibility: ${matrixCalc.map((m) => `${m.programName.split(" ")[0]}: ${m.status}`).join(" | ")}`,
      detailsList: matrixCalc.map(
        (m) => `${m.programName}: ${m.status} (Benchmark ${m.benchmarkFrontEnd}/${m.benchmarkBackEnd}, Max ${m.maxBackEndWithAUS})`
      ),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox2Items];
    setSavedBox2Items(updated);
    try {
      localStorage.setItem("saved_dti_box2", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  // =========================================================================
  // BOX 3: REVERSE TARGET INCOME SOLVER STATES
  // =========================================================================
  const [targetHousingCost, setTargetHousingCost] = useState<string>("1800");
  const [targetExistingDebt, setTargetExistingDebt] = useState<string>("600");
  const [targetDTIPct, setTargetDTIPct] = useState<number>(36);

  const [savedBox3Items, setSavedBox3Items] = useState<SavedDTIItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);
  const [showHistoryBox3, setShowHistoryBox3] = useState<boolean>(false);

  const targetIncomeCalc = useMemo(() => {
    return calculateReverseTargetIncome({
      desiredHousingCost: parseFloat(targetHousingCost) || 0,
      existingMonthlyDebt: parseFloat(targetExistingDebt) || 0,
      targetBackEndPct: targetDTIPct,
    });
  }, [targetHousingCost, targetExistingDebt, targetDTIPct]);

  const handleSaveBox3 = () => {
    const newItem: SavedDTIItem = {
      id: Date.now().toString(),
      title: "Reverse Target Income Solver",
      inputsSummary: `Housing: ${currencySymbol}${parseFloat(targetHousingCost || "0").toLocaleString()}/mo | Debt: ${currencySymbol}${parseFloat(targetExistingDebt || "0").toLocaleString()}/mo | Target DTI: ${targetDTIPct}%`,
      primaryResult: `Required Salary: ${currencySymbol}${targetIncomeCalc.requiredAnnualGross.toLocaleString()}/yr`,
      detailsList: [
        `Required Gross Monthly Income: ${currencySymbol}${targetIncomeCalc.requiredMonthlyGross.toLocaleString()}/mo`,
        `Required Gross Annual Salary: ${currencySymbol}${targetIncomeCalc.requiredAnnualGross.toLocaleString()}/yr`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox3Items];
    setSavedBox3Items(updated);
    try {
      localStorage.setItem("saved_dti_box3", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  // =========================================================================
  // BOX 4: REVERSE MAXIMUM HOUSING BUDGET SOLVER STATES
  // =========================================================================
  const [maxGrossIncome, setMaxGrossIncome] = useState<string>("6500");
  const [maxExistingDebt, setMaxExistingDebt] = useState<string>("500");
  const [maxTargetDTIPct, setMaxTargetDTIPct] = useState<number>(43);

  const [savedBox4Items, setSavedBox4Items] = useState<SavedDTIItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);
  const [showHistoryBox4, setShowHistoryBox4] = useState<boolean>(false);

  const maxHousingCalc = useMemo(() => {
    return calculateReverseMaxHousing({
      grossMonthlyIncome: parseFloat(maxGrossIncome) || 0,
      existingMonthlyDebt: parseFloat(maxExistingDebt) || 0,
      targetMaxDTIPct: maxTargetDTIPct,
    });
  }, [maxGrossIncome, maxExistingDebt, maxTargetDTIPct]);

  const handleSaveBox4 = () => {
    const newItem: SavedDTIItem = {
      id: Date.now().toString(),
      title: "Maximum Housing Budget Solver",
      inputsSummary: `Monthly Gross: ${currencySymbol}${parseFloat(maxGrossIncome || "0").toLocaleString()} | Debt: ${currencySymbol}${parseFloat(maxExistingDebt || "0").toLocaleString()} | DTI Cap: ${maxTargetDTIPct}%`,
      primaryResult: `Max Housing Payment: ${currencySymbol}${maxHousingCalc.maxAllowableHousingPayment.toLocaleString()}/mo`,
      detailsList: [
        `Max Allowable Monthly Payment: ${currencySymbol}${maxHousingCalc.maxAllowableHousingPayment.toLocaleString()}/mo`,
        `Estimated Purchase Price: ~${currencySymbol}${maxHousingCalc.estimatedHomePrice.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox4Items];
    setSavedBox4Items(updated);
    try {
      localStorage.setItem("saved_dti_box4", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  // =========================================================================
  // BOX 5: DEBT PAYOFF & DTI SIMULATOR STATES
  // =========================================================================
  const [simIncome, setSimIncome] = useState<string>("6500");
  const [simHousing, setSimHousing] = useState<string>("1800");
  const [debtItems, setDebtItems] = useState<DebtSimItem[]>([
    { id: "1", label: "Auto Loan", monthlyAmount: 350, paidOff: false },
    { id: "2", label: "Student Loans", monthlyAmount: 250, paidOff: false },
    { id: "3", label: "Credit Card Minimums", monthlyAmount: 150, paidOff: true },
  ]);

  const [savedBox5Items, setSavedBox5Items] = useState<SavedDTIItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);
  const [showHistoryBox5, setShowHistoryBox5] = useState<boolean>(false);

  const debtSimCalc = useMemo(() => {
    return calculateDebtPayoffImpact(
      parseFloat(simIncome) || 0,
      parseFloat(simHousing) || 0,
      debtItems
    );
  }, [simIncome, simHousing, debtItems]);

  const toggleDebtItem = (id: string) => {
    setDebtItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, paidOff: !item.paidOff } : item))
    );
  };

  const handleSaveBox5 = () => {
    const newItem: SavedDTIItem = {
      id: Date.now().toString(),
      title: "Debt Payoff Impact Simulation",
      inputsSummary: `Income: ${currencySymbol}${parseFloat(simIncome || "0").toLocaleString()} | Housing: ${currencySymbol}${parseFloat(simHousing || "0").toLocaleString()} | Payoffs: ${debtItems.filter((d) => d.paidOff).map((d) => d.label).join(", ") || "None"}`,
      primaryResult: `DTI Reduced: ${debtSimCalc.currentBackEndDTI}% → ${debtSimCalc.simulatedBackEndDTI}% (-${debtSimCalc.dtiReduction}%)`,
      detailsList: [
        `Monthly Debt Saved: ${currencySymbol}${debtSimCalc.monthlyDebtSaved.toLocaleString()}/mo`,
        `Extra Housing Capacity: +${currencySymbol}${debtSimCalc.increasedHousingCapacity.toLocaleString()}/mo`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox5Items];
    setSavedBox5Items(updated);
    try {
      localStorage.setItem("saved_dti_box5", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  // =========================================================================
  // BOX 6: SELF-EMPLOYED 2-YEAR INCOME AVERAGING STATES
  // =========================================================================
  const [y1Net, setY1Net] = useState<string>("85000");
  const [y2Net, setY2Net] = useState<string>("92000");
  const [y1Dep, setY1Dep] = useState<string>("5000");
  const [y2Dep, setY2Dep] = useState<string>("6000");

  const [savedBox6Items, setSavedBox6Items] = useState<SavedDTIItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);
  const [showHistoryBox6, setShowHistoryBox6] = useState<boolean>(false);

  const selfEmployedCalc = useMemo(() => {
    return calculateSelfEmployedIncome({
      year1ScheduleCNet: parseFloat(y1Net) || 0,
      year2ScheduleCNet: parseFloat(y2Net) || 0,
      year1DepreciationAddback: parseFloat(y1Dep) || 0,
      year2DepreciationAddback: parseFloat(y2Dep) || 0,
    });
  }, [y1Net, y2Net, y1Dep, y2Dep]);

  const handleSaveBox6 = () => {
    const newItem: SavedDTIItem = {
      id: Date.now().toString(),
      title: "Self-Employed Income Averaging",
      inputsSummary: `Year 1 Total: ${currencySymbol}${selfEmployedCalc.year1Total.toLocaleString()} | Year 2 Total: ${currencySymbol}${selfEmployedCalc.year2Total.toLocaleString()}`,
      primaryResult: `Qualifying Monthly: ${currencySymbol}${selfEmployedCalc.qualifyingMonthlyIncome.toLocaleString()}/mo`,
      detailsList: [
        `Qualifying Annual Income: ${currencySymbol}${selfEmployedCalc.qualifyingAnnualIncome.toLocaleString()}/yr`,
        `Income Trend Evaluation: ${selfEmployedCalc.trendStatus}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox6Items];
    setSavedBox6Items(updated);
    try {
      localStorage.setItem("saved_dti_box6", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  // Initial local storage load
  useEffect(() => {
    try {
      const b1 = localStorage.getItem("saved_dti_box1");
      if (b1) setSavedBox1Items(JSON.parse(b1));
      const b2 = localStorage.getItem("saved_dti_box2");
      if (b2) setSavedBox2Items(JSON.parse(b2));
      const b3 = localStorage.getItem("saved_dti_box3");
      if (b3) setSavedBox3Items(JSON.parse(b3));
      const b4 = localStorage.getItem("saved_dti_box4");
      if (b4) setSavedBox4Items(JSON.parse(b4));
      const b5 = localStorage.getItem("saved_dti_box5");
      if (b5) setSavedBox5Items(JSON.parse(b5));
      const b6 = localStorage.getItem("saved_dti_box6");
      if (b6) setSavedBox6Items(JSON.parse(b6));
    } catch (e) {}
  }, []);

  // SVG Speedometer / Risk Gauge
  const svgRiskGauge = useMemo(() => {
    const ratio = Math.min(65, Math.max(0, standardCalc.backEndRatio));
    const pctNorm = Math.min(1, Math.max(0, ratio / 65));
    const angleRad = Math.PI - pctNorm * Math.PI;
    const radius = 65;
    const cx = 90;
    const cy = 75;
    const needleX = cx + radius * 0.8 * Math.cos(angleRad);
    const needleY = cy - radius * 0.8 * Math.sin(angleRad);

    return (
      <svg viewBox="0 0 180 95" className="w-full max-w-[200px] mx-auto h-auto">
        <path d="M 20 75 A 70 70 0 0 1 65 15" fill="none" stroke="#10b981" strokeWidth="14" strokeLinecap="round" />
        <path d="M 68 14 A 70 70 0 0 1 112 14" fill="none" stroke="#84cc16" strokeWidth="14" />
        <path d="M 115 15 A 70 70 0 0 1 160 75" fill="none" stroke="#ef4444" strokeWidth="14" strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={needleX} y2={needleY} stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="6" fill="#1e293b" />
        <text x={cx} y={cy - 18} textAnchor="middle" className="text-[12px] font-extrabold fill-slate-800 dark:fill-slate-100 font-sans tabular-nums">
          {standardCalc.backEndRatio}%
        </text>
      </svg>
    );
  }, [standardCalc.backEndRatio]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Currency Selector & Quick Controls */}
      <div className="flex items-center justify-between gap-2 text-xs font-bold">
        <button
          type="button"
          onClick={handleResetBox1}
          className="flex items-center gap-1 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
        <div className="flex items-center gap-2">
          <label htmlFor="dti-currency" className="text-slate-500 font-medium">Currency:</label>
          <select
            id="dti-currency"
            value={currencySymbol}
            onChange={(e) => setCurrencySymbol(e.target.value)}
            className="h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans font-bold cursor-pointer"
          >
            <option value="$">USD ($)</option>
            <option value="€">EUR (€)</option>
            <option value="£">GBP (£)</option>
            <option value="₹">INR (₹)</option>
            <option value="¥">JPY (¥)</option>
          </select>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. STANDARD & ITEMIZED DTI CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Standard &amp; Itemized DTI Calculator</span>
          <button
            type="button"
            onClick={handleSaveBox1}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox1 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Col Inputs */}
            <div className="lg:col-span-7 space-y-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Income &amp; Expense Details
                </span>
                <div className="flex bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg font-bold">
                  <button
                    type="button"
                    onClick={() => handleFreqChange("annual")}
                    className={`px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
                      incomeFreq === "annual" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    Annual
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFreqChange("monthly")}
                    className={`px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
                      incomeFreq === "monthly" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Income Streams */}
              <div className="space-y-2">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">
                  Gross Income Streams ({currencySymbol} / {incomeFreq === "annual" ? "year" : "month"})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-500 block">
                      Primary Salary ({incomeFreq === "annual" ? "Annual" : "Monthly"})
                    </label>
                    <input
                      type="number"
                      value={primarySalary}
                      onChange={(e) => setPrimarySalary(e.target.value)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block">
                      Co-Borrower Income ({incomeFreq === "annual" ? "Annual" : "Monthly"})
                    </label>
                    <input
                      type="number"
                      value={coBorrowerIncome}
                      onChange={(e) => setCoBorrowerIncome(e.target.value)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block">
                      Bonuses / Commissions ({incomeFreq === "annual" ? "Annual" : "Monthly"})
                    </label>
                    <input
                      type="number"
                      value={bonusesCommissions}
                      onChange={(e) => setBonusesCommissions(e.target.value)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block">
                      Dividends / Alimony ({incomeFreq === "annual" ? "Annual" : "Monthly"})
                    </label>
                    <input
                      type="number"
                      value={dividendsAlimonyOther}
                      onChange={(e) => setDividendsAlimonyOther(e.target.value)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Housing Costs */}
              <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">
                  Monthly Housing Costs ({currencySymbol} / mo)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-500 block">Mortgage / Rent P&amp;I</label>
                    <input
                      type="number"
                      value={mortgageRentPI}
                      onChange={(e) => setMortgageRentPI(e.target.value)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block">Property Taxes</label>
                    <input
                      type="number"
                      value={propertyTaxes}
                      onChange={(e) => setPropertyTaxes(e.target.value)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block">Hazard Insurance</label>
                    <input
                      type="number"
                      value={hazardInsurance}
                      onChange={(e) => setHazardInsurance(e.target.value)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Recurring Debts */}
              <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">
                  Recurring Monthly Debts ({currencySymbol} / mo)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-500 block">Auto Loans</label>
                    <input
                      type="number"
                      value={autoLoansLeases}
                      onChange={(e) => setAutoLoansLeases(e.target.value)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block">Student Loans</label>
                    <input
                      type="number"
                      value={studentLoans}
                      onChange={(e) => setStudentLoans(e.target.value)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block">Credit Cards (Min)</label>
                    <input
                      type="number"
                      value={creditCardMinimums}
                      onChange={(e) => setCreditCardMinimums(e.target.value)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Result Summary Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-blue-50/60 dark:bg-slate-900/80 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                    Debt-to-Income Summary
                  </span>
                  <span
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold text-white"
                    style={{ backgroundColor: standardCalc.riskColor }}
                  >
                    {standardCalc.riskTier}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900/40">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Front-End (Housing)</span>
                    <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                      {standardCalc.frontEndRatio}%
                    </span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900/40">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Back-End (Total DTI)</span>
                    <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                      {standardCalc.backEndRatio}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Monthly Gross</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">
                      {currencySymbol}{standardCalc.grossMonthlyIncome.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Debt</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">
                      {currencySymbol}{standardCalc.totalMonthlyDebt.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Leftover Buffer</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                      {currencySymbol}{standardCalc.disposableIncome.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="pt-1">
                  {svgRiskGauge}
                </div>
              </div>
            </div>
          </div>

          {/* Derivation Box */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs space-y-2 font-mono">
            <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans">Underwriting Ratio Formulas:</span>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 text-slate-700 dark:text-slate-300 break-all sm:break-normal">
              <div>
                {"Front-End DTI = (Housing Costs / Gross Monthly Income) × 100% = (" +
                  currencySymbol +
                  standardCalc.totalMonthlyHousing.toLocaleString() +
                  " / " +
                  currencySymbol +
                  standardCalc.grossMonthlyIncome.toLocaleString() +
                  ") × 100% = " +
                  standardCalc.frontEndRatio +
                  "%"}
              </div>
              <div>
                {"Back-End DTI = ((Housing + Debt) / Gross Monthly Income) × 100% = (" +
                  currencySymbol +
                  standardCalc.totalMonthlyOutflow.toLocaleString() +
                  " / " +
                  currencySymbol +
                  standardCalc.grossMonthlyIncome.toLocaleString() +
                  ") × 100% = " +
                  standardCalc.backEndRatio +
                  "%"}
              </div>
            </div>
          </div>

          {/* History Drawer for Box 1 */}
          {savedBox1Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                type="button"
                onClick={() => setShowHistoryBox1(!showHistoryBox1)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox1Items.length})</span>
                {showHistoryBox1 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox1 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox1Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const filtered = savedBox1Items.filter((i) => i.id !== item.id);
                              setSavedBox1Items(filtered);
                              try {
                                localStorage.setItem("saved_dti_box1", JSON.stringify(filtered));
                              } catch (e) {}
                            }}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
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
      {/* 2. MORTGAGE PROGRAM ELIGIBILITY MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Mortgage Program Eligibility Matrix</span>
          <button
            type="button"
            onClick={handleSaveBox2}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox2 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300 mr-2">Evaluated DTI:</span>
              <strong className="text-blue-600">{standardCalc.frontEndRatio}% Front-End</strong> / <strong className="text-blue-600">{standardCalc.backEndRatio}% Back-End</strong>
            </div>
            <div className="flex items-center gap-2 font-bold">
              <span>Credit Score:</span>
              <select
                value={creditScoreBand}
                onChange={(e) => setCreditScoreBand(e.target.value)}
                className="h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer"
              >
                <option value="740+">740+ (Excellent)</option>
                <option value="680-739">680 - 739 (Good)</option>
                <option value="620-679">620 - 679 (Fair)</option>
                <option value="<620">&lt;620 (Low)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-sans min-w-[550px]">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3">Loan Program</th>
                  <th className="p-3">Benchmark (Front/Back)</th>
                  <th className="p-3">Max Cap with AUS</th>
                  <th className="p-3">Live Approval Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {matrixCalc.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100">
                      <div>{m.programName}</div>
                      <div className="text-[10px] font-normal text-slate-500 mt-0.5">{m.notes}</div>
                    </td>
                    <td className="p-3 font-mono">{m.benchmarkFrontEnd} / {m.benchmarkBackEnd}</td>
                    <td className="p-3 font-mono">{m.maxBackEndWithAUS}</td>
                    <td className="p-3">
                      <span
                        className="px-2.5 py-1 rounded-md text-[11px] font-extrabold text-white inline-block whitespace-nowrap"
                        style={{ backgroundColor: m.statusColor }}
                      >
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* History Drawer for Box 2 */}
          {savedBox2Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                type="button"
                onClick={() => setShowHistoryBox2(!showHistoryBox2)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox2Items.length})</span>
                {showHistoryBox2 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox2 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox2Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const filtered = savedBox2Items.filter((i) => i.id !== item.id);
                              setSavedBox2Items(filtered);
                              try {
                                localStorage.setItem("saved_dti_box2", JSON.stringify(filtered));
                              } catch (e) {}
                            }}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
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
      {/* 3. REVERSE TARGET INCOME SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Reverse Target Income Solver</span>
          <button
            type="button"
            onClick={handleSaveBox3}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox3 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Desired Monthly Housing Cost ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={targetHousingCost}
                  onChange={(e) => setTargetHousingCost(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Existing Monthly Debt ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={targetExistingDebt}
                  onChange={(e) => setTargetExistingDebt(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Target DTI Benchmark
                </label>
                <div className="grid grid-cols-4 gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl font-bold">
                  {[28, 36, 43, 50].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setTargetDTIPct(pct)}
                      className={`py-1 rounded-lg cursor-pointer transition-colors ${
                        targetDTIPct === pct ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Required Gross Salary to Qualify
              </span>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                {currencySymbol}{targetIncomeCalc.requiredAnnualGross.toLocaleString()}
                <span className="text-xs font-normal text-slate-500"> / year</span>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  Required Monthly Gross Income
                </span>
                <span className="font-extrabold text-base text-slate-800 dark:text-slate-200">
                  {currencySymbol}{targetIncomeCalc.requiredMonthlyGross.toLocaleString()}/mo
                </span>
              </div>
            </div>
          </div>

          {/* History Drawer for Box 3 */}
          {savedBox3Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                type="button"
                onClick={() => setShowHistoryBox3(!showHistoryBox3)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox3Items.length})</span>
                {showHistoryBox3 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox3 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox3Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const filtered = savedBox3Items.filter((i) => i.id !== item.id);
                              setSavedBox3Items(filtered);
                              try {
                                localStorage.setItem("saved_dti_box3", JSON.stringify(filtered));
                              } catch (e) {}
                            }}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
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
      {/* 4. REVERSE MAXIMUM HOUSING BUDGET SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Maximum Housing Budget Solver</span>
          <button
            type="button"
            onClick={handleSaveBox4}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox4 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Gross Monthly Income ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={maxGrossIncome}
                  onChange={(e) => setMaxGrossIncome(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Existing Monthly Debt ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={maxExistingDebt}
                  onChange={(e) => setMaxExistingDebt(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Target DTI Cap
                </label>
                <div className="grid grid-cols-3 gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl font-bold">
                  {[36, 43, 50].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setMaxTargetDTIPct(pct)}
                      className={`py-1 rounded-lg cursor-pointer transition-colors ${
                        maxTargetDTIPct === pct ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Maximum Allowable Housing Payment
              </span>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                {currencySymbol}{maxHousingCalc.maxAllowableHousingPayment.toLocaleString()}
                <span className="text-xs font-normal text-slate-500"> / month</span>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  Estimated Purchase Price Ceiling
                </span>
                <span className="font-extrabold text-base text-slate-800 dark:text-slate-200">
                  ~{currencySymbol}{maxHousingCalc.estimatedHomePrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* History Drawer for Box 4 */}
          {savedBox4Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                type="button"
                onClick={() => setShowHistoryBox4(!showHistoryBox4)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox4Items.length})</span>
                {showHistoryBox4 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox4 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox4Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const filtered = savedBox4Items.filter((i) => i.id !== item.id);
                              setSavedBox4Items(filtered);
                              try {
                                localStorage.setItem("saved_dti_box4", JSON.stringify(filtered));
                              } catch (e) {}
                            }}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
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
      {/* 5. DEBT PAYOFF & DTI REDUCTION SIMULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Debt Payoff &amp; DTI Reduction Impact Simulator</span>
          <button
            type="button"
            onClick={handleSaveBox5}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox5 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Monthly Gross ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={simIncome}
                    onChange={(e) => setSimIncome(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Proposed Housing ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={simHousing}
                    onChange={(e) => setSimHousing(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">Check Debts to Pay Off:</span>
                <div className="space-y-1.5">
                  {debtItems.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer font-bold"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.paidOff}
                          onChange={() => toggleDebtItem(item.id)}
                          className="rounded text-blue-600 cursor-pointer"
                        />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-slate-600 dark:text-slate-400 font-mono">
                        {currencySymbol}{item.monthlyAmount}/mo
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Simulated DTI Reduction
              </span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                {debtSimCalc.currentBackEndDTI}% → {debtSimCalc.simulatedBackEndDTI}%
                <span className="text-xs font-normal text-emerald-600 block mt-0.5">
                  (-{debtSimCalc.dtiReduction}% DTI Reduction)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Monthly Debt Saved</span>
                  <span className="font-extrabold text-emerald-600">
                    {currencySymbol}{debtSimCalc.monthlyDebtSaved.toLocaleString()}/mo
                  </span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Extra Housing Capacity</span>
                  <span className="font-extrabold text-blue-600">
                    +{currencySymbol}{debtSimCalc.increasedHousingCapacity.toLocaleString()}/mo
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* History Drawer for Box 5 */}
          {savedBox5Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                type="button"
                onClick={() => setShowHistoryBox5(!showHistoryBox5)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox5Items.length})</span>
                {showHistoryBox5 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox5 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox5Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const filtered = savedBox5Items.filter((i) => i.id !== item.id);
                              setSavedBox5Items(filtered);
                              try {
                                localStorage.setItem("saved_dti_box5", JSON.stringify(filtered));
                              } catch (e) {}
                            }}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
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
      {/* 6. SELF-EMPLOYED 2-YEAR INCOME AVERAGING */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Self-Employed 2-Year Income Averaging Tool</span>
          <button
            type="button"
            onClick={handleSaveBox6}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox6 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Year 1 Net Schedule C ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={y1Net}
                    onChange={(e) => setY1Net(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Year 2 Net Schedule C ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={y2Net}
                    onChange={(e) => setY2Net(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Year 1 Depreciation Add-back ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={y1Dep}
                    onChange={(e) => setY1Dep(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Year 2 Depreciation Add-back ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={y2Dep}
                    onChange={(e) => setY2Dep(e.target.value)}
                    className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Qualifying Monthly Income
              </span>

              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                {currencySymbol}{selfEmployedCalc.qualifyingMonthlyIncome.toLocaleString()}
                <span className="text-xs font-normal text-slate-500"> / month</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Qualifying Annual</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">
                    {currencySymbol}{selfEmployedCalc.qualifyingAnnualIncome.toLocaleString()}/yr
                  </span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Trend Status</span>
                  <span className={`font-extrabold ${selfEmployedCalc.trendStatus === "Stable / Growing" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                    {selfEmployedCalc.trendStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* History Drawer for Box 6 */}
          {savedBox6Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                type="button"
                onClick={() => setShowHistoryBox6(!showHistoryBox6)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox6Items.length})</span>
                {showHistoryBox6 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox6 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox6Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const filtered = savedBox6Items.filter((i) => i.id !== item.id);
                              setSavedBox6Items(filtered);
                              try {
                                localStorage.setItem("saved_dti_box6", JSON.stringify(filtered));
                              } catch (e) {}
                            }}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
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
