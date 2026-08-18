"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  Check,
  Download,
} from "lucide-react";
import {
  calculateCollegeCost,
  calculate529TaxBenefits,
  calculateMajorRoi,
  COLLEGE_COST_PRESETS,
} from "@/lib/calculator-engine/formulas/college-cost";

export interface SavedCollegeItem {
  id: string;
  title: string;
  inputs: string;
  result: string;
  resultsList: string[];
  timestamp: string;
}

export function CollegeCostCalculator() {
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
  // BOX 1: COLLEGE COST & SAVINGS PLAN SUITE
  // ==========================================
  const [annualCostInput, setAnnualCostInput] = useState<string>("30990");
  const [costInflationInput, setCostInflationInput] = useState<string>("5.0");
  const [durationYearsInput, setDurationYearsInput] = useState<string>("4");
  const [percentFromSavingsInput, setPercentFromSavingsInput] = useState<string>("35");
  const [currentSavingsInput, setCurrentSavingsInput] = useState<string>("0");
  const [monthlySavingsInput, setMonthlySavingsInput] = useState<string>("250");
  const [investmentReturnInput, setInvestmentReturnInput] = useState<string>("5.0");
  const [taxRateInput, setTaxRateInput] = useState<string>("25");
  const [yearsUntilCollegeInput, setYearsUntilCollegeInput] = useState<string>("3");
  const [annualAidInput, setAnnualAidInput] = useState<string>("0");

  // Table search and pagination
  const [tableSearch, setTableSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 6;

  // Saved state for Box 1
  const [savedCoreItems, setSavedCoreItems] = useState<SavedCollegeItem[]>([]);
  const [justSavedCore, setJustSavedCore] = useState<boolean>(false);

  // ==========================================
  // BOX 2: 529 PLAN TAX BENEFIT SOLVER
  // ==========================================
  const [tax529AnnualContribInput, setTax529AnnualContribInput] = useState<string>("6000");
  const [tax529YearsInput, setTax529YearsInput] = useState<string>("15");
  const [tax529ReturnInput, setTax529ReturnInput] = useState<string>("7.0");
  const [tax529BracketInput, setTax529BracketInput] = useState<string>("24");
  const [tax529StateRateInput, setTax529StateRateInput] = useState<string>("5.0");
  const [savedTax529Items, setSavedTax529Items] = useState<SavedCollegeItem[]>([]);
  const [justSavedTax529, setJustSavedTax529] = useState<boolean>(false);

  // ==========================================
  // BOX 3: SAVINGS MONTHLY CONTRIBUTION PLANNER
  // ==========================================
  const [planGoalInput, setPlanGoalInput] = useState<string>("150000");
  const [planCurrentSavingsInput, setPlanCurrentSavingsInput] = useState<string>("10000");
  const [planYearsInput, setPlanYearsInput] = useState<string>("12");
  const [planReturnInput, setPlanReturnInput] = useState<string>("6.5");
  const [savedPlanItems, setSavedPlanItems] = useState<SavedCollegeItem[]>([]);
  const [justSavedPlan, setJustSavedPlan] = useState<boolean>(false);

  // ==========================================
  // BOX 4: STUDENT LOAN REPAYMENT SOLVER
  // ==========================================
  const [loanDebtInput, setLoanDebtInput] = useState<string>("40000");
  const [loanRateInput, setLoanRateInput] = useState<string>("6.5");
  const [loanTermYearsInput, setLoanTermYearsInput] = useState<string>("10");
  const [loanSalaryInput, setLoanSalaryInput] = useState<string>("60000");
  const [savedLoanItems, setSavedLoanItems] = useState<SavedCollegeItem[]>([]);
  const [justSavedLoan, setJustSavedLoan] = useState<boolean>(false);

  // ==========================================
  // BOX 5: DEGREE MAJOR ROI & SALARY ANALYZER
  // ==========================================
  const [roiDebtInput, setRoiDebtInput] = useState<string>("45000");
  const [roiSalaryInput, setRoiSalaryInput] = useState<string>("75000");
  const [savedRoiItems, setSavedRoiItems] = useState<SavedCollegeItem[]>([]);
  const [justSavedRoi, setJustSavedRoi] = useState<boolean>(false);

  // ==========================================
  // BOX 6: IN-STATE VS OUT-OF-STATE COMPARATOR
  // ==========================================
  const [compInStateInput, setCompInStateInput] = useState<string>("30990");
  const [compOutStateInput, setCompOutStateInput] = useState<string>("50920");
  const [compPrivateInput, setCompPrivateInput] = useState<string>("65470");
  const [compCommunityInput, setCompCommunityInput] = useState<string>("21320");
  const [compInflationInput, setCompInflationInput] = useState<string>("5.0");
  const [compYearsInput, setCompYearsInput] = useState<string>("3");
  const [savedCompItems, setSavedCompItems] = useState<SavedCollegeItem[]>([]);
  const [justSavedComp, setJustSavedComp] = useState<boolean>(false);

  // Load saved calculations on mount
  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_college_core");
      if (s1) setSavedCoreItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_college_529");
      if (s2) setSavedTax529Items(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_college_plan");
      if (s3) setSavedPlanItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_college_loan");
      if (s4) setSavedLoanItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_college_roi");
      if (s5) setSavedRoiItems(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_college_comp");
      if (s6) setSavedCompItems(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Format currency helper
  const fmt = (num: number) => {
    return `${currencySymbol}${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // ==========================================
  // 1. COMPUTED RESULTS: COLLEGE COST & SAVINGS
  // ==========================================
  const coreResult = useMemo(() => {
    return calculateCollegeCost({
      currentAnnualCost: Number(annualCostInput) || 0,
      annualCostInflationPct: Number(costInflationInput) || 0,
      collegeDurationYears: Number(durationYearsInput) || 4,
      yearsUntilCollege: Number(yearsUntilCollegeInput) || 0,
      percentCostsFromSavings: Number(percentFromSavingsInput) || 0,
      currentSavings: Number(currentSavingsInput) || 0,
      monthlySavings: Number(monthlySavingsInput) || 0,
      investmentReturnPct: Number(investmentReturnInput) || 0,
      taxRateOnReturnPct: Number(taxRateInput) || 0,
      annualFinancialAid: Number(annualAidInput) || 0,
    });
  }, [
    annualCostInput,
    costInflationInput,
    durationYearsInput,
    yearsUntilCollegeInput,
    percentFromSavingsInput,
    currentSavingsInput,
    monthlySavingsInput,
    investmentReturnInput,
    taxRateInput,
    annualAidInput,
  ]);

  // Schedule filtering & pagination
  const filteredSchedule = useMemo(() => {
    if (!coreResult.schedule) return [];
    if (!tableSearch.trim()) return coreResult.schedule;
    return coreResult.schedule.filter(
      (row) =>
        row.yearNumber.toString().includes(tableSearch) ||
        row.projectedAnnualCost.toString().includes(tableSearch) ||
        row.remainingShortfall.toString().includes(tableSearch)
    );
  }, [coreResult.schedule, tableSearch]);

  const totalPages = Math.ceil(filteredSchedule.length / rowsPerPage) || 1;
  const currentSchedulePage = filteredSchedule.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ==========================================
  // 2. COMPUTED RESULTS: 529 TAX BENEFITS
  // ==========================================
  const tax529Result = useMemo(() => {
    return calculate529TaxBenefits(
      Number(tax529AnnualContribInput) || 0,
      Number(tax529YearsInput) || 1,
      Number(tax529ReturnInput) || 0,
      Number(tax529BracketInput) || 0,
      5000,
      Number(tax529StateRateInput) || 0
    );
  }, [
    tax529AnnualContribInput,
    tax529YearsInput,
    tax529ReturnInput,
    tax529BracketInput,
    tax529StateRateInput,
  ]);

  // ==========================================
  // 3. COMPUTED RESULTS: MONTHLY PLANNER
  // ==========================================
  const planResult = useMemo(() => {
    const goal = Number(planGoalInput) || 0;
    const current = Number(planCurrentSavingsInput) || 0;
    const years = Number(planYearsInput) || 1;
    const r = (Number(planReturnInput) || 0) / 100;
    const months = years * 12;
    const monthlyR = r / 12;

    const fvCurrent = current * Math.pow(1 + r, years);
    const needed = Math.max(0, goal - fvCurrent);

    let monthlyDeposit = 0;
    if (months > 0 && needed > 0) {
      if (monthlyR === 0) {
        monthlyDeposit = needed / months;
      } else {
        const factor = (Math.pow(1 + monthlyR, months) - 1) / monthlyR;
        monthlyDeposit = needed / factor;
      }
    }

    const totalParentDeposits = current + monthlyDeposit * months;
    const totalGrowth = Math.max(0, goal - totalParentDeposits);

    return {
      requiredMonthlyDeposit: monthlyDeposit,
      fvOfCurrentSavings: fvCurrent,
      totalParentDeposits,
      totalGrowth,
      growthPct: goal > 0 ? (totalGrowth / goal) * 100 : 0,
    };
  }, [planGoalInput, planCurrentSavingsInput, planYearsInput, planReturnInput]);

  // ==========================================
  // 4. COMPUTED RESULTS: STUDENT LOAN REPAYMENT
  // ==========================================
  const loanResult = useMemo(() => {
    const debt = Number(loanDebtInput) || 0;
    const annualRate = (Number(loanRateInput) || 0) / 100;
    const monthlyRate = annualRate / 12;
    const termYears = Number(loanTermYearsInput) || 10;
    const months = termYears * 12;
    const salary = Number(loanSalaryInput) || 0;

    let pmt = 0;
    if (debt > 0 && months > 0) {
      if (monthlyRate === 0) {
        pmt = debt / months;
      } else {
        const f = Math.pow(1 + monthlyRate, months);
        pmt = (debt * (monthlyRate * f)) / (f - 1);
      }
    }

    const totalCost = pmt * months;
    const totalInterest = Math.max(0, totalCost - debt);
    const dti = salary > 0 ? (debt / salary) * 100 : 0;
    const monthlyTakeHome = (salary * 0.75) / 12;
    const pmtToIncomeRatio = monthlyTakeHome > 0 ? (pmt / monthlyTakeHome) * 100 : 0;

    return {
      monthlyPayment: pmt,
      totalCost,
      totalInterest,
      dti,
      pmtToIncomeRatio,
    };
  }, [loanDebtInput, loanRateInput, loanTermYearsInput, loanSalaryInput]);

  // ==========================================
  // 5. COMPUTED RESULTS: DEGREE MAJOR ROI
  // ==========================================
  const roiResult = useMemo(() => {
    return calculateMajorRoi(
      Number(roiDebtInput) || 0,
      Number(roiSalaryInput) || 50000
    );
  }, [roiDebtInput, roiSalaryInput]);

  // ==========================================
  // 6. COMPUTED RESULTS: IN-STATE VS OUT-OF-STATE
  // ==========================================
  const compResult = useMemo(() => {
    const infl = (Number(compInflationInput) || 0) / 100;
    const yrs = Number(compYearsInput) || 0;

    const calc4Yr = (base: number) => {
      let total = 0;
      for (let i = 1; i <= 4; i++) {
        total += base * Math.pow(1 + infl, yrs + i - 1);
      }
      return total;
    };

    const inStateTotal = calc4Yr(Number(compInStateInput) || 30990);
    const outStateTotal = calc4Yr(Number(compOutStateInput) || 50920);
    const privateTotal = calc4Yr(Number(compPrivateInput) || 65470);

    // 2+2 Pathway = 2 yrs Community + 2 yrs In-State
    const commBase = Number(compCommunityInput) || 21320;
    const inStateBase = Number(compInStateInput) || 30990;
    let pathwayTotal = 0;
    for (let i = 1; i <= 2; i++) pathwayTotal += commBase * Math.pow(1 + infl, yrs + i - 1);
    for (let i = 3; i <= 4; i++) pathwayTotal += inStateBase * Math.pow(1 + infl, yrs + i - 1);

    return {
      inStateTotal,
      outStateTotal,
      privateTotal,
      pathwayTotal,
      outStateDifference: outStateTotal - inStateTotal,
      privateDifference: privateTotal - inStateTotal,
      pathwaySavings: inStateTotal - pathwayTotal,
    };
  }, [
    compInStateInput,
    compOutStateInput,
    compPrivateInput,
    compCommunityInput,
    compInflationInput,
    compYearsInput,
  ]);

  // ==========================================
  // SAVE HANDLERS FOR ALL 6 BOXES
  // ==========================================
  const handleSaveCore = () => {
    const inputStr = `Annual: ${currencySymbol}${annualCostInput} | Infl: ${costInflationInput}% | Start: in ${yearsUntilCollegeInput} yrs | Duration: ${durationYearsInput} yrs`;
    const resList = [
      `Total College Cost: ${fmt(coreResult.totalProjectedCollegeCost)}`,
      `Accumulated Savings: ${fmt(coreResult.projectedSavingsAtCollegeStart)}`,
      `Required Monthly: ${fmt(coreResult.requiredMonthlySavingsToMeetGoal)}/mo`,
      `Unfunded Shortfall: ${fmt(coreResult.totalOutOfPocketShortfall)}`,
    ];

    const newItem: SavedCollegeItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "College Cost & Savings",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedCoreItems].slice(0, 10);
    setSavedCoreItems(updated);
    try {
      localStorage.setItem("saved_college_core", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedCore(true);
    setTimeout(() => setJustSavedCore(false), 2500);
  };

  const handleSaveTax529 = () => {
    const inputStr = `Contrib: ${currencySymbol}${tax529AnnualContribInput}/yr | Years: ${tax529YearsInput} @ ${tax529ReturnInput}% | Tax: ${tax529BracketInput}%`;
    const resList = [
      `529 Plan Ending: ${fmt(tax529Result.plan529EndingBalance)}`,
      `Taxable Ending: ${fmt(tax529Result.taxableEndingBalance)}`,
      `Total Tax Savings: ${fmt(tax529Result.totalTaxSavings)}`,
    ];

    const newItem: SavedCollegeItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "529 Plan Tax Solver",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedTax529Items].slice(0, 10);
    setSavedTax529Items(updated);
    try {
      localStorage.setItem("saved_college_529", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedTax529(true);
    setTimeout(() => setJustSavedTax529(false), 2500);
  };

  const handleSavePlan = () => {
    const inputStr = `Goal: ${currencySymbol}${planGoalInput} | Current: ${currencySymbol}${planCurrentSavingsInput} | Horizon: ${planYearsInput} yrs @ ${planReturnInput}%`;
    const resList = [
      `Required Monthly: ${fmt(planResult.requiredMonthlyDeposit)}/mo`,
      `Parent Deposits: ${fmt(planResult.totalParentDeposits)}`,
      `Compound Growth: ${fmt(planResult.totalGrowth)} (${planResult.growthPct.toFixed(1)}%)`,
    ];

    const newItem: SavedCollegeItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Savings Monthly Planner",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedPlanItems].slice(0, 10);
    setSavedPlanItems(updated);
    try {
      localStorage.setItem("saved_college_plan", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedPlan(true);
    setTimeout(() => setJustSavedPlan(false), 2500);
  };

  const handleSaveLoan = () => {
    const inputStr = `Debt: ${currencySymbol}${loanDebtInput} | Rate: ${loanRateInput}% | Term: ${loanTermYearsInput} yrs | Salary: ${currencySymbol}${loanSalaryInput}`;
    const resList = [
      `Monthly Payment: ${fmt(loanResult.monthlyPayment)}/mo`,
      `Total Cost: ${fmt(loanResult.totalCost)}`,
      `Total Interest: ${fmt(loanResult.totalInterest)}`,
      `DTI: ${loanResult.dti.toFixed(1)}%`,
    ];

    const newItem: SavedCollegeItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Student Loan Repayment",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedLoanItems].slice(0, 10);
    setSavedLoanItems(updated);
    try {
      localStorage.setItem("saved_college_loan", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedLoan(true);
    setTimeout(() => setJustSavedLoan(false), 2500);
  };

  const handleSaveRoi = () => {
    const inputStr = `Debt: ${currencySymbol}${roiDebtInput} | Salary: ${currencySymbol}${roiSalaryInput}`;
    const resList = [
      `Debt Burden: ${roiResult.debtBurdenRating}`,
      `Monthly Payment: ${fmt(roiResult.monthlyLoanPayment)}/mo`,
      `Max Recommended Debt: ${fmt(roiResult.recommendedMaxDebt)}`,
    ];

    const newItem: SavedCollegeItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Major ROI Analyzer",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedRoiItems].slice(0, 10);
    setSavedRoiItems(updated);
    try {
      localStorage.setItem("saved_college_roi", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedRoi(true);
    setTimeout(() => setJustSavedRoi(false), 2500);
  };

  const handleSaveComp = () => {
    const inputStr = `In-State: ${currencySymbol}${compInStateInput} | Out-State: ${currencySymbol}${compOutStateInput} | Private: ${currencySymbol}${compPrivateInput}`;
    const resList = [
      `4-Yr In-State: ${fmt(compResult.inStateTotal)}`,
      `4-Yr Out-State: ${fmt(compResult.outStateTotal)} (+${fmt(compResult.outStateDifference)})`,
      `4-Yr Private: ${fmt(compResult.privateTotal)} (+${fmt(compResult.privateDifference)})`,
      `2+2 Transfer: ${fmt(compResult.pathwayTotal)} (Saves ${fmt(compResult.pathwaySavings)})`,
    ];

    const newItem: SavedCollegeItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "College Pathway Comparator",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedCompItems].slice(0, 10);
    setSavedCompItems(updated);
    try {
      localStorage.setItem("saved_college_comp", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedComp(true);
    setTimeout(() => setJustSavedComp(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* ========================================================================= */}
      {/* BOX 1: COLLEGE COST & SAVINGS PLAN CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>College Cost & Savings Plan Calculator</span>
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
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  College Parameters
                </span>
                <span className="text-[10px] text-slate-400 font-bold">Quick Presets</span>
              </div>

              {/* Cost Presets Buttons */}
              <div className="grid grid-cols-2 gap-1.5">
                {COLLEGE_COST_PRESETS.slice(0, 4).map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setAnnualCostInput(preset.value.toString())}
                    className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors text-left truncate cursor-pointer ${
                      annualCostInput === preset.value.toString()
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400"
                    }`}
                  >
                    {preset.label}: {currencySymbol}{preset.value.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Annual Cost & Inflation */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Today&apos;s Annual Cost ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={annualCostInput}
                    onChange={(e) => setAnnualCostInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Cost Inflation (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={costInflationInput}
                    onChange={(e) => setCostInflationInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>

              {/* Duration & Start Year */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Duration (Years)
                  </label>
                  <input
                    type="number"
                    value={durationYearsInput}
                    onChange={(e) => setDurationYearsInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Starts In (Years)
                  </label>
                  <input
                    type="number"
                    value={yearsUntilCollegeInput}
                    onChange={(e) => setYearsUntilCollegeInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>

              {/* Current Savings & Percent From Savings */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Current Savings ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={currentSavingsInput}
                    onChange={(e) => setCurrentSavingsInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Target % from Savings
                  </label>
                  <input
                    type="number"
                    value={percentFromSavingsInput}
                    onChange={(e) => setPercentFromSavingsInput(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>

              {/* Monthly Savings & Return Rate */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Monthly ($/mo)
                  </label>
                  <input
                    type="number"
                    value={monthlySavingsInput}
                    onChange={(e) => setMonthlySavingsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Return Rate %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={investmentReturnInput}
                    onChange={(e) => setInvestmentReturnInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Tax Rate % (0 for 529)
                  </label>
                  <input
                    type="number"
                    value={taxRateInput}
                    onChange={(e) => setTaxRateInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: OUTPUTS */}
            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 dark:text-blue-400 block">
                      Total Projected College Cost ({durationYearsInput} Yrs)
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
                      {fmt(coreResult.totalProjectedCollegeCost)}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                      Required Monthly Deposit
                    </span>
                    <span className="text-sm font-bold font-mono text-blue-600 dark:text-blue-400">
                      {fmt(coreResult.requiredMonthlySavingsToMeetGoal)}/mo
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Accumulated Savings</span>
                    <span className="font-mono text-sm text-emerald-600">{fmt(coreResult.projectedSavingsAtCollegeStart)}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Unfunded Shortfall</span>
                    <span className="font-mono text-sm text-amber-600">{fmt(coreResult.totalOutOfPocketShortfall)}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Est. Loan Payment</span>
                    <span className="font-mono text-sm text-slate-900 dark:text-slate-100">{fmt(coreResult.estimatedMonthlyLoanPayment)}/mo</span>
                  </div>
                </div>

                {/* SAVINGS VS SHORTFALL PROGRESS */}
                <div className="space-y-1 pt-1">
                  <div className="w-full h-3 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 flex">
                    <div
                      style={{
                        width: `${
                          coreResult.totalProjectedCollegeCost > 0
                            ? (coreResult.projectedSavingsAtCollegeStart / coreResult.totalProjectedCollegeCost) * 100
                            : 50
                        }%`,
                      }}
                      className="bg-emerald-500"
                    />
                    <div
                      style={{
                        width: `${
                          coreResult.totalProjectedCollegeCost > 0
                            ? (coreResult.totalOutOfPocketShortfall / coreResult.totalProjectedCollegeCost) * 100
                            : 50
                        }%`,
                      }}
                      className="bg-amber-500"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400">
                    <span>Covered by Savings: {fmt(coreResult.projectedSavingsAtCollegeStart)}</span>
                    <span>Loan Shortfall: {fmt(coreResult.totalOutOfPocketShortfall)}</span>
                  </div>
                </div>
              </div>

              {/* YEAR BY YEAR SCHEDULE */}
              {coreResult.schedule.length > 0 && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                      College Year-by-Year Cost & Withdrawal Schedule
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const headers = ["Year", "Child Age", "Annual Cost", "Starting Savings", "Annual Withdrawal", "Shortfall / Loan"];
                          const rows = coreResult.schedule.map((r) => [
                            `Year ${r.yearNumber}`,
                            r.childAge,
                            r.projectedAnnualCost.toFixed(2),
                            r.startingSavings.toFixed(2),
                            r.annualWithdrawal.toFixed(2),
                            r.remainingShortfall.toFixed(2),
                          ]);
                          const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
                          triggerCsvDownload(`college_cost_schedule.csv`, csv);
                        }}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 rounded-lg text-[11px] font-bold flex items-center gap-1 border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors"
                      >
                        <Download className="w-3 h-3" /> Export CSV
                      </button>
                      <input
                        type="text"
                        placeholder="Search year..."
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
                          <th className="py-1 px-1.5">Year</th>
                          <th className="py-1 px-1.5">Child Age</th>
                          <th className="py-1 px-1.5">Annual Cost</th>
                          <th className="py-1 px-1.5">Savings Start</th>
                          <th className="py-1 px-1.5">Withdrawal</th>
                          <th className="py-1 px-1.5">Shortfall / Loan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
                        {currentSchedulePage.map((row) => (
                          <tr key={row.yearNumber} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            <td className="py-1 px-1.5 font-bold font-sans">College Yr {row.yearNumber}</td>
                            <td className="py-1 px-1.5 text-slate-500">Age {row.childAge}</td>
                            <td className="py-1 px-1.5 font-bold text-slate-900 dark:text-slate-100">{fmt(row.projectedAnnualCost)}</td>
                            <td className="py-1 px-1.5 text-emerald-600">{fmt(row.startingSavings)}</td>
                            <td className="py-1 px-1.5 text-blue-600 font-bold">{fmt(row.annualWithdrawal)}</td>
                            <td className="py-1 px-1.5 text-amber-600 font-bold">{fmt(row.remainingShortfall)}</td>
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
                  Saved College Calculations ({savedCoreItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCoreItems([]);
                    localStorage.removeItem("saved_college_core");
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
                            localStorage.setItem("saved_college_core", JSON.stringify(updated));
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
      {/* BOX 2: 529 PLAN TAX BENEFIT SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>529 Plan & Tax Benefit Solver</span>
          <button
            type="button"
            onClick={handleSaveTax529}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedTax529
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedTax529 ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedTax529 ? "Saved!" : `Save${savedTax529Items.length > 0 ? ` (${savedTax529Items.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                529 Investment Parameters
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Annual Deposit ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={tax529AnnualContribInput}
                    onChange={(e) => setTax529AnnualContribInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Years to Invest
                  </label>
                  <input
                    type="number"
                    value={tax529YearsInput}
                    onChange={(e) => setTax529YearsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Return %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={tax529ReturnInput}
                    onChange={(e) => setTax529ReturnInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Fed Tax %
                  </label>
                  <input
                    type="number"
                    value={tax529BracketInput}
                    onChange={(e) => setTax529BracketInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    State Tax %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={tax529StateRateInput}
                    onChange={(e) => setTax529StateRateInput(e.target.value)}
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
                      529 Plan Ending Balance (Tax-Free)
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-emerald-600">
                      {fmt(tax529Result.plan529EndingBalance)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Total Tax Savings</span>
                    <span className="text-sm font-bold font-mono text-blue-600">
                      {fmt(tax529Result.totalTaxSavings)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Taxable Brokerage Balance</span>
                    <span>{fmt(tax529Result.taxableEndingBalance)}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">State Tax Deduction Benefit</span>
                    <span className="text-emerald-600">{fmt(tax529Result.stateTaxDeductionValue)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED 529 LIST */}
          {savedTax529Items.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved 529 Plans ({savedTax529Items.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedTax529Items([]);
                    localStorage.removeItem("saved_college_529");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedTax529Items.map((item) => (
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
      {/* BOX 3: COLLEGE SAVINGS MONTHLY CONTRIBUTION PLANNER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>College Savings Monthly Contribution Planner</span>
          <button
            type="button"
            onClick={handleSavePlan}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedPlan
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedPlan ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedPlan ? "Saved!" : `Save${savedPlanItems.length > 0 ? ` (${savedPlanItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Target Fund Parameters
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Target Fund Goal ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={planGoalInput}
                    onChange={(e) => setPlanGoalInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Current Balance ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={planCurrentSavingsInput}
                    onChange={(e) => setPlanCurrentSavingsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Years to College
                  </label>
                  <input
                    type="number"
                    value={planYearsInput}
                    onChange={(e) => setPlanYearsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Annual Return %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={planReturnInput}
                    onChange={(e) => setPlanReturnInput(e.target.value)}
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
                      Required Monthly Deposit
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-blue-600">
                      {fmt(planResult.requiredMonthlyDeposit)}/mo
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Compound Growth Share</span>
                    <span className="text-sm font-bold font-mono text-emerald-600">
                      {planResult.growthPct.toFixed(1)}% ({fmt(planResult.totalGrowth)})
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Total Parent Deposits</span>
                    <span>{fmt(planResult.totalParentDeposits)}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Total Interest Growth</span>
                    <span className="text-emerald-600">{fmt(planResult.totalGrowth)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED PLAN LIST */}
          {savedPlanItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Monthly Plans ({savedPlanItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPlanItems([]);
                    localStorage.removeItem("saved_college_plan");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedPlanItems.map((item) => (
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
      {/* BOX 4: STUDENT LOAN REPAYMENT SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Student Loan Repayment & Post-Grad Payment Solver</span>
          <button
            type="button"
            onClick={handleSaveLoan}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedLoan
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedLoan ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedLoan ? "Saved!" : `Save${savedLoanItems.length > 0 ? ` (${savedLoanItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Loan Debt Parameters
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Total Borrowed ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={loanDebtInput}
                    onChange={(e) => setLoanDebtInput(e.target.value)}
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
                    value={loanRateInput}
                    onChange={(e) => setLoanRateInput(e.target.value)}
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
                    value={loanTermYearsInput}
                    onChange={(e) => setLoanTermYearsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Starting Salary ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={loanSalaryInput}
                    onChange={(e) => setLoanSalaryInput(e.target.value)}
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
                      Monthly Payment
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-blue-600">
                      {fmt(loanResult.monthlyPayment)}/mo
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Total Interest Paid</span>
                    <span className="text-sm font-bold font-mono text-amber-600">
                      {fmt(loanResult.totalInterest)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Total Loan Repayment</span>
                    <span>{fmt(loanResult.totalCost)}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">% of Take-Home Pay</span>
                    <span className={loanResult.pmtToIncomeRatio > 15 ? "text-red-500" : "text-emerald-600"}>
                      {loanResult.pmtToIncomeRatio.toFixed(1)}% of Net
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED LOAN LIST */}
          {savedLoanItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Loan Repayments ({savedLoanItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedLoanItems([]);
                    localStorage.removeItem("saved_college_loan");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedLoanItems.map((item) => (
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
      {/* BOX 5: DEGREE MAJOR ROI & SALARY ANALYZER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Degree Major ROI & Salary vs Debt Analyzer</span>
          <button
            type="button"
            onClick={handleSaveRoi}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedRoi
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedRoi ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedRoi ? "Saved!" : `Save${savedRoiItems.length > 0 ? ` (${savedRoiItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Major & Salary Benchmarks
              </div>

              {/* Major Presets */}
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { name: "Computer Sci", sal: 85000 },
                  { name: "Engineering", sal: 78000 },
                  { name: "Nursing / Health", sal: 75000 },
                  { name: "Business/Finance", sal: 68000 },
                  { name: "Education/Teaching", sal: 48000 },
                  { name: "Liberal Arts", sal: 45000 },
                ].map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => setRoiSalaryInput(m.sal.toString())}
                    className="px-2 py-1 rounded text-[10px] font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-500 text-left truncate cursor-pointer"
                  >
                    {m.name}: {currencySymbol}{m.sal.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Total Student Debt ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={roiDebtInput}
                    onChange={(e) => setRoiDebtInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Starting Salary ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={roiSalaryInput}
                    onChange={(e) => setRoiSalaryInput(e.target.value)}
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
                      Debt Burden Evaluation
                    </span>
                    <span className={`text-base font-bold uppercase ${
                      roiResult.debtBurdenRating === "Low Risk"
                        ? "text-emerald-600"
                        : roiResult.debtBurdenRating === "Moderate Burden"
                        ? "text-blue-600"
                        : "text-red-500"
                    }`}>
                      {roiResult.debtBurdenRating}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Max Recommended Debt</span>
                    <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
                      {fmt(roiResult.recommendedMaxDebt)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Monthly Take-Home</span>
                    <span>{fmt(roiResult.monthlyTakeHomePay)}/mo</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Debt-to-Income</span>
                    <span>{roiResult.projectedDebtToIncomePct.toFixed(1)}% of Salary</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED ROI LIST */}
          {savedRoiItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Major ROI Analyses ({savedRoiItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedRoiItems([]);
                    localStorage.removeItem("saved_college_roi");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedRoiItems.map((item) => (
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
      {/* BOX 6: IN-STATE VS OUT-OF-STATE COMPARATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>In-State vs. Out-of-State & 2+2 Pathway Comparator</span>
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
                Annual Cost Rates
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    In-State Public ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={compInStateInput}
                    onChange={(e) => setCompInStateInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Out-of-State Public ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={compOutStateInput}
                    onChange={(e) => setCompOutStateInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Private 4-Year ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={compPrivateInput}
                    onChange={(e) => setCompPrivateInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Community 2-Year ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={compCommunityInput}
                    onChange={(e) => setCompCommunityInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 text-xs font-mono">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-xs font-extrabold uppercase text-slate-500 font-sans">
                    Total 4-Year Cost Projection
                  </span>
                  <span className="text-xs font-bold text-blue-600 font-sans">
                    2+2 Pathway Saves {fmt(compResult.pathwaySavings)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border space-y-1">
                    <span className="font-bold text-blue-600 font-sans block text-xs">In-State Public</span>
                    <div className="font-bold text-sm">{fmt(compResult.inStateTotal)}</div>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border space-y-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300 font-sans block text-xs">Out-of-State Public</span>
                    <div className="font-bold text-sm">{fmt(compResult.outStateTotal)}</div>
                    <span className="text-[10px] text-red-500 font-sans block">+ {fmt(compResult.outStateDifference)}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border space-y-1">
                    <span className="font-bold text-amber-600 font-sans block text-xs">Private 4-Year</span>
                    <div className="font-bold text-sm">{fmt(compResult.privateTotal)}</div>
                    <span className="text-[10px] text-red-500 font-sans block">+ {fmt(compResult.privateDifference)}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border space-y-1">
                    <span className="font-bold text-emerald-600 font-sans block text-xs">2+2 Transfer Pathway</span>
                    <div className="font-bold text-sm">{fmt(compResult.pathwayTotal)}</div>
                    <span className="text-[10px] text-emerald-600 font-sans block">Saves {fmt(compResult.pathwaySavings)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED COMP LIST */}
          {savedCompItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Pathway Comparisons ({savedCompItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCompItems([]);
                    localStorage.removeItem("saved_college_comp");
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
    </div>
  );
}
