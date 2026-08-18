"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  Download,
  DollarSign,
  Briefcase,
  TrendingUp,
  Percent,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import {
  calculateUniversalSalary,
  calculateTakeHomeTax,
  calculateOvertimeBooster,
  calculateCostOfLiving,
  calculateReverseSalary,
  CITY_COLI_INDEX,
} from "@/app/calculators/salary-calculator/calculator";
import {
  PayFrequencyUnit,
  SavedSalaryItem,
} from "@/app/calculators/salary-calculator/types";

export function SalaryCalculator() {
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
  // BOX 1: UNIVERSAL SALARY & WAGE CONVERTER (CORE)
  // =========================================================================
  const [b1Salary, setB1Salary] = useState<string>("50");
  const [b1Freq, setB1Freq] = useState<PayFrequencyUnit>("hourly");
  const [b1HoursPerWeek, setB1HoursPerWeek] = useState<string>("40");
  const [b1DaysPerWeek, setB1DaysPerWeek] = useState<string>("5");
  const [b1Holidays, setB1Holidays] = useState<string>("10");
  const [b1Vacation, setB1Vacation] = useState<string>("15");

  const [savedBox1, setSavedBox1] = useState<SavedSalaryItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);

  // =========================================================================
  // BOX 2: NET TAKE-HOME PAY & TAX DEDUCTIONS
  // =========================================================================
  const [b2GrossSalary, setB2GrossSalary] = useState<string>("104000");
  const [b2FilingStatus, setB2FilingStatus] = useState<"single" | "married" | "headOfHousehold">("single");
  const [b2StateCode, setB2StateCode] = useState<string>("TX");
  const [b2PreTaxDeductions, setB2PreTaxDeductions] = useState<string>("500");

  const [savedBox2, setSavedBox2] = useState<SavedSalaryItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);

  // =========================================================================
  // BOX 3: OVERTIME & BONUS BOOSTER
  // =========================================================================
  const [b3BaseRate, setB3BaseRate] = useState<string>("35");
  const [b3RegHours, setB3RegHours] = useState<string>("40");
  const [b3OtHours, setB3OtHours] = useState<string>("5");
  const [b3DtHours, setB3DtHours] = useState<string>("2");
  const [b3Bonus, setB3Bonus] = useState<string>("5000");

  const [savedBox3, setSavedBox3] = useState<SavedSalaryItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);

  // =========================================================================
  // BOX 4: BI-WEEKLY VS SEMI-MONTHLY EXPLAINER
  // =========================================================================
  const [b4AnnualSalary, setB4AnnualSalary] = useState<string>("104000");

  const [savedBox4, setSavedBox4] = useState<SavedSalaryItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);

  // =========================================================================
  // BOX 5: COST-OF-LIVING & RELOCATION CONVERTER
  // =========================================================================
  const [b5Salary, setB5Salary] = useState<string>("85000");
  const [b5SourceCity, setB5SourceCity] = useState<string>("austin");
  const [b5TargetCity, setB5TargetCity] = useState<string>("nyc");

  const [savedBox5, setSavedBox5] = useState<SavedSalaryItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);

  // =========================================================================
  // BOX 6: REVERSE SALARY & TARGET TAKE-HOME SOLVER
  // =========================================================================
  const [b6NetMonthly, setB6NetMonthly] = useState<string>("6000");
  const [b6TaxRate, setB6TaxRate] = useState<string>("25.0");
  const [b6HoursPerWeek, setB6HoursPerWeek] = useState<string>("40");

  const [savedBox6, setSavedBox6] = useState<SavedSalaryItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_sal_box1");
      if (s1) setSavedBox1(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_sal_box2");
      if (s2) setSavedBox2(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_sal_box3");
      if (s3) setSavedBox3(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_sal_box4");
      if (s4) setSavedBox4(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_sal_box5");
      if (s5) setSavedBox5(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_sal_box6");
      if (s6) setSavedBox6(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Box 1 Calculations
  const b1Calc = useMemo(() => {
    return calculateUniversalSalary({
      salaryAmount: parseFloat(b1Salary) || 0,
      frequency: b1Freq,
      hoursPerWeek: parseFloat(b1HoursPerWeek) || 40,
      daysPerWeek: parseFloat(b1DaysPerWeek) || 5,
      holidaysPerYear: parseFloat(b1Holidays) || 0,
      vacationDaysPerYear: parseFloat(b1Vacation) || 0,
    });
  }, [b1Salary, b1Freq, b1HoursPerWeek, b1DaysPerWeek, b1Holidays, b1Vacation]);

  const handleExportBox1CSV = () => {
    const headers = ["Pay Period", "Unadjusted (52 Wks)", "Adjusted (PTO & Holidays)", "Basis Description"];
    const rows = b1Calc.conversionMatrix.map((r) => [
      r.period,
      `$${r.unadjustedAmount.toLocaleString()}`,
      `$${r.adjustedAmount.toLocaleString()}`,
      r.frequencyDescription,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("salary_conversion_matrix.csv", csv);
  };

  const handleSaveBox1 = () => {
    const inputsStr = `$${b1Salary} / ${b1Freq} | ${b1HoursPerWeek} hrs/wk (${b1DaysPerWeek} d/wk) | ${b1Holidays} Holidays, ${b1Vacation} PTO`;
    const primaryStr = `Annual: $${b1Calc.unadjustedAnnual.toLocaleString()} (Adj: $${b1Calc.adjustedAnnual.toLocaleString()}) | Hourly: $${b1Calc.unadjustedHourly.toFixed(2)}/hr`;

    const detailsList = [
      `Unadjusted Annual Salary: $${b1Calc.unadjustedAnnual.toLocaleString()}`,
      `Adjusted Annual Salary (PTO/Holidays): $${b1Calc.adjustedAnnual.toLocaleString()}`,
      `Monthly Pay: $${b1Calc.unadjustedMonthly.toLocaleString()} (Adj: $${b1Calc.adjustedMonthly.toLocaleString()})`,
      `Bi-Weekly Pay (26 checks): $${b1Calc.unadjustedBiWeekly.toLocaleString()}`,
      `Hourly Wage: $${b1Calc.unadjustedHourly.toFixed(2)} / hr (Adj: $${b1Calc.adjustedHourly.toFixed(2)} / hr)`,
      `Working Days: ${b1Calc.adjustedWorkingDays} working days / ${b1Calc.totalWorkingDays} total weekdays`,
    ];

    const newItem: SavedSalaryItem = {
      id: Date.now().toString(),
      title: "Universal Salary Conversion",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox1.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_sal_box1", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleDeleteSavedBox1 = (id: string) => {
    const updated = savedBox1.filter((item) => item.id !== id);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_sal_box1", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox1 = () => {
    setSavedBox1([]);
    try {
      localStorage.removeItem("saved_sal_box1");
    } catch (e) {}
  };

  // Box 2 Calculations
  const b2Calc = useMemo(() => {
    return calculateTakeHomeTax({
      grossAnnualSalary: parseFloat(b2GrossSalary) || 0,
      filingStatus: b2FilingStatus,
      stateCode: b2StateCode,
      monthlyPreTaxDeductions: parseFloat(b2PreTaxDeductions) || 0,
    });
  }, [b2GrossSalary, b2FilingStatus, b2StateCode, b2PreTaxDeductions]);

  const handleSaveBox2 = () => {
    const inputsStr = `Gross: $${b2GrossSalary} | ${b2FilingStatus} | State: ${b2StateCode} | Pre-Tax: $${b2PreTaxDeductions}/mo`;
    const primaryStr = `Net Annual: $${b2Calc.netTakeHomeAnnual.toLocaleString()} | Net Monthly: $${b2Calc.netTakeHomeMonthly.toLocaleString()} (Tax Rate: ${b2Calc.effectiveTaxRatePercent}%)`;

    const detailsList = [
      `Net Take-Home Annual: $${b2Calc.netTakeHomeAnnual.toLocaleString()}`,
      `Net Take-Home Monthly: $${b2Calc.netTakeHomeMonthly.toLocaleString()}`,
      `Net Bi-Weekly Paycheck: $${b2Calc.netTakeHomeBiWeekly.toLocaleString()}`,
      `Federal Income Tax: $${b2Calc.federalIncomeTax.toLocaleString()}`,
      `State Income Tax (${b2StateCode}): $${b2Calc.stateIncomeTax.toLocaleString()}`,
      `FICA (Social Security & Medicare): $${b2Calc.totalFicaTax.toLocaleString()}`,
      `Effective Total Tax Rate: ${b2Calc.effectiveTaxRatePercent}%`,
    ];

    const newItem: SavedSalaryItem = {
      id: Date.now().toString(),
      title: "Take-Home Paycheck & Tax Deduction",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox2.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_sal_box2", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  const handleDeleteSavedBox2 = (id: string) => {
    const updated = savedBox2.filter((item) => item.id !== id);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_sal_box2", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox2 = () => {
    setSavedBox2([]);
    try {
      localStorage.removeItem("saved_sal_box2");
    } catch (e) {}
  };

  // Box 3 Calculations (Overtime Booster)
  const b3Calc = useMemo(() => {
    return calculateOvertimeBooster({
      baseHourlyRate: parseFloat(b3BaseRate) || 0,
      regularHoursPerWeek: parseFloat(b3RegHours) || 0,
      overtimeHoursPerWeek: parseFloat(b3OtHours) || 0,
      doubleTimeHoursPerWeek: parseFloat(b3DtHours) || 0,
      annualBonusCommissions: parseFloat(b3Bonus) || 0,
    });
  }, [b3BaseRate, b3RegHours, b3OtHours, b3DtHours, b3Bonus]);

  const handleExportBox3CSV = () => {
    const headers = ["Compensation Component", "Rate Multiplier", "Weekly Pay ($)", "Annualized Pay ($)"];
    const rows = [
      ["Regular Base Pay", "1.0x", `$${b3Calc.baseWeeklyPay.toLocaleString()}`, `$${(b3Calc.baseWeeklyPay * 52).toLocaleString()}`],
      ["Overtime Pay (1.5x)", "1.5x", `$${b3Calc.overtimeWeeklyPay.toLocaleString()}`, `$${(b3Calc.overtimeWeeklyPay * 52).toLocaleString()}`],
      ["Double-Time Pay (2.0x)", "2.0x", `$${b3Calc.doubleTimeWeeklyPay.toLocaleString()}`, `$${(b3Calc.doubleTimeWeeklyPay * 52).toLocaleString()}`],
      ["Annual Bonuses & Tips", "-", "-", `$${parseFloat(b3Bonus).toLocaleString()}`],
      ["Total Gross Compensation", "-", `$${b3Calc.totalWeeklyGross.toLocaleString()}`, `$${b3Calc.totalAnnualGross.toLocaleString()}`],
    ];
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("overtime_compensation_schedule.csv", csv);
  };

  const handleSaveBox3 = () => {
    const inputsStr = `Base: $${b3BaseRate}/hr | ${b3RegHours}h Reg, ${b3OtHours}h OT, ${b3DtHours}h DT | Bonus: $${b3Bonus}`;
    const primaryStr = `Total Annual Gross: $${b3Calc.totalAnnualGross.toLocaleString()} | Effective Rate: $${b3Calc.effectiveHourlyRate.toFixed(2)}/hr`;

    const detailsList = [
      `Total Annual Gross Compensation: $${b3Calc.totalAnnualGross.toLocaleString()}`,
      `Total Weekly Gross Pay: $${b3Calc.totalWeeklyGross.toLocaleString()}`,
      `Base Weekly Pay: $${b3Calc.baseWeeklyPay.toLocaleString()}`,
      `Overtime Weekly Pay (1.5x): $${b3Calc.overtimeWeeklyPay.toLocaleString()}`,
      `Double-Time Weekly Pay (2.0x): $${b3Calc.doubleTimeWeeklyPay.toLocaleString()}`,
      `Effective Hourly Rate: $${b3Calc.effectiveHourlyRate.toFixed(2)} / hr`,
    ];

    const newItem: SavedSalaryItem = {
      id: Date.now().toString(),
      title: "Overtime & Bonus Booster",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox3.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_sal_box3", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  const handleDeleteSavedBox3 = (id: string) => {
    const updated = savedBox3.filter((item) => item.id !== id);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_sal_box3", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox3 = () => {
    setSavedBox3([]);
    try {
      localStorage.removeItem("saved_sal_box3");
    } catch (e) {}
  };

  // Box 4 Calculations (Bi-Weekly vs Semi-Monthly)
  const b4Annual = parseFloat(b4AnnualSalary) || 0;
  const b4BiWeekly = Math.round((b4Annual / 26) * 100) / 100;
  const b4SemiMonthly = Math.round((b4Annual / 24) * 100) / 100;
  const b4CheckDelta = Math.round((b4SemiMonthly - b4BiWeekly) * 100) / 100;

  const handleSaveBox4 = () => {
    const inputsStr = `Annual Salary: $${b4AnnualSalary}`;
    const primaryStr = `Bi-Weekly: $${b4BiWeekly.toLocaleString()} (26 checks) vs Semi-Monthly: $${b4SemiMonthly.toLocaleString()} (24 checks)`;

    const detailsList = [
      `Bi-Weekly Paycheck (26/yr): $${b4BiWeekly.toLocaleString()}`,
      `Semi-Monthly Paycheck (24/yr): $${b4SemiMonthly.toLocaleString()}`,
      `Per-Paycheck Difference: $${b4CheckDelta.toLocaleString()} more per semi-monthly check`,
      `Annual Cash Flow: Bi-weekly provides two 3-paycheck 'bonus' months per year`,
    ];

    const newItem: SavedSalaryItem = {
      id: Date.now().toString(),
      title: "Bi-Weekly vs. Semi-Monthly Explainer",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox4.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_sal_box4", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  const handleDeleteSavedBox4 = (id: string) => {
    const updated = savedBox4.filter((item) => item.id !== id);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_sal_box4", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox4 = () => {
    setSavedBox4([]);
    try {
      localStorage.removeItem("saved_sal_box4");
    } catch (e) {}
  };

  // Box 5 Calculations (Cost of Living)
  const b5Calc = useMemo(() => {
    return calculateCostOfLiving({
      currentSalary: parseFloat(b5Salary) || 0,
      sourceCityKey: b5SourceCity,
      targetCityKey: b5TargetCity,
    });
  }, [b5Salary, b5SourceCity, b5TargetCity]);

  const handleSaveBox5 = () => {
    const inputsStr = `$${b5Salary} in ${b5Calc.sourceCityName} -> ${b5Calc.targetCityName}`;
    const primaryStr = `Equivalent Salary: $${b5Calc.equivalentSalary.toLocaleString()} (${b5Calc.percentageDifference > 0 ? "+" : ""}${b5Calc.percentageDifference}%)`;

    const detailsList = [
      `Source City: ${b5Calc.sourceCityName} ($${parseFloat(b5Salary).toLocaleString()})`,
      `Target City: ${b5Calc.targetCityName}`,
      `Equivalent Salary Needed: $${b5Calc.equivalentSalary.toLocaleString()}`,
      `Overall Cost of Living Delta: ${b5Calc.percentageDifference > 0 ? "+" : ""}${b5Calc.percentageDifference}%`,
      `Housing Cost Delta: ${b5Calc.housingDeltaPercent > 0 ? "+" : ""}${b5Calc.housingDeltaPercent}%`,
    ];

    const newItem: SavedSalaryItem = {
      id: Date.now().toString(),
      title: "Cost of Living Salary Converter",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox5.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_sal_box5", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  const handleDeleteSavedBox5 = (id: string) => {
    const updated = savedBox5.filter((item) => item.id !== id);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_sal_box5", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox5 = () => {
    setSavedBox5([]);
    try {
      localStorage.removeItem("saved_sal_box5");
    } catch (e) {}
  };

  // Box 6 Calculations (Reverse Salary Solver)
  const b6Calc = useMemo(() => {
    return calculateReverseSalary({
      desiredNetMonthly: parseFloat(b6NetMonthly) || 0,
      estimatedTaxRatePercent: parseFloat(b6TaxRate) || 25,
      hoursPerWeek: parseFloat(b6HoursPerWeek) || 40,
      daysPerWeek: 5,
    });
  }, [b6NetMonthly, b6TaxRate, b6HoursPerWeek]);

  const handleSaveBox6 = () => {
    const inputsStr = `Target Net: $${b6NetMonthly}/mo | Tax Rate: ${b6TaxRate}% | ${b6HoursPerWeek} hrs/wk`;
    const primaryStr = `Req Gross Annual: $${b6Calc.requiredGrossAnnual.toLocaleString()} | Req Hourly: $${b6Calc.requiredGrossHourly.toFixed(2)}/hr`;

    const detailsList = [
      `Desired Net Take-Home: $${parseFloat(b6NetMonthly).toLocaleString()} / month`,
      `Required Gross Annual Salary: $${b6Calc.requiredGrossAnnual.toLocaleString()}`,
      `Required Gross Monthly Salary: $${b6Calc.requiredGrossMonthly.toLocaleString()}`,
      `Required Gross Hourly Wage: $${b6Calc.requiredGrossHourly.toFixed(2)} / hr`,
      `Estimated Withholdings (@ ${b6TaxRate}%): $${Math.round(b6Calc.requiredGrossAnnual * (parseFloat(b6TaxRate) / 100)).toLocaleString()} / yr`,
    ];

    const newItem: SavedSalaryItem = {
      id: Date.now().toString(),
      title: "Reverse Salary & Target Wage Solver",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox6.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_sal_box6", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  const handleDeleteSavedBox6 = (id: string) => {
    const updated = savedBox6.filter((item) => item.id !== id);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_sal_box6", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox6 = () => {
    setSavedBox6([]);
    try {
      localStorage.removeItem("saved_sal_box6");
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* =========================================================================
          BOX 1: UNIVERSAL SALARY & WAGE CONVERTER (CORE MATRIX)
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Salary Calculator &amp; Universal Wage Conversion Matrix</span>
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
            {/* INPUTS */}
            <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Salary &amp; Working Schedule
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Salary Amount ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={b1Salary}
                    onChange={(e) => setB1Salary(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Pay Frequency
                  </label>
                  <select
                    value={b1Freq}
                    onChange={(e) => setB1Freq(e.target.value as PayFrequencyUnit)}
                    className={select3DClass}
                  >
                    <option value="hourly">Hour</option>
                    <option value="daily">Day</option>
                    <option value="weekly">Week</option>
                    <option value="biWeekly">Bi-Weekly (2 Wks)</option>
                    <option value="semiMonthly">Semi-Monthly (2x/Mo)</option>
                    <option value="monthly">Month</option>
                    <option value="quarterly">Quarter</option>
                    <option value="annually">Year</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Hours per Week
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={168}
                    value={b1HoursPerWeek}
                    onChange={(e) => setB1HoursPerWeek(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Days per Week
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={7}
                    value={b1DaysPerWeek}
                    onChange={(e) => setB1DaysPerWeek(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Holidays / Year
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={b1Holidays}
                    onChange={(e) => setB1Holidays(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Vacation / PTO Days
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={b1Vacation}
                    onChange={(e) => setB1Vacation(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            {/* HERO RESULTS & CONVERSION MATRIX TABLE */}
            <div className="lg:col-span-7 space-y-3">
              {/* HERO HIGHLIGHT CARDS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/60 rounded-xl border border-blue-200 dark:border-blue-800 space-y-0.5">
                  <span className="text-[10px] text-blue-600 block uppercase">Annual Salary</span>
                  <div className="text-base font-extrabold text-blue-700 dark:text-blue-300">
                    ${b1Calc.unadjustedAnnual.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Adj: ${b1Calc.adjustedAnnual.toLocaleString()}</div>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-0.5">
                  <span className="text-[10px] text-slate-400 block uppercase">Monthly Pay</span>
                  <div className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                    ${b1Calc.unadjustedMonthly.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Adj: ${b1Calc.adjustedMonthly.toLocaleString()}</div>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-0.5">
                  <span className="text-[10px] text-slate-400 block uppercase">Bi-Weekly Pay</span>
                  <div className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                    ${b1Calc.unadjustedBiWeekly.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Adj: ${b1Calc.adjustedBiWeekly.toLocaleString()}</div>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-0.5">
                  <span className="text-[10px] text-slate-400 block uppercase">Hourly Wage</span>
                  <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                    ${b1Calc.unadjustedHourly.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Adj: ${b1Calc.adjustedHourly.toFixed(2)}/hr</div>
                </div>
              </div>

              {/* FULL CONVERSION MATRIX TABLE */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
                <div className="p-2.5 bg-slate-100 dark:bg-slate-800 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Complete Salary Conversion Table (All Frequencies)
                  </span>
                  <button
                    type="button"
                    onClick={handleExportBox1CSV}
                    className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-[11px] font-bold flex items-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer border border-slate-300 dark:border-slate-700 transition-colors"
                  >
                    <Download className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    <span>Export CSV</span>
                  </button>
                </div>

                <div className="overflow-x-auto max-h-56 text-xs">
                  <table className="w-full text-center border-collapse font-sans tabular-nums">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="p-2 text-left">Pay Period</th>
                        <th className="p-2 text-right">Unadjusted</th>
                        <th className="p-2 text-right">Holidays &amp; PTO Adjusted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {b1Calc.conversionMatrix.map((row) => (
                        <tr key={row.period} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="p-1.5 text-left font-bold text-slate-800 dark:text-slate-200">
                            {row.period}
                          </td>
                          <td className="p-1.5 text-right font-extrabold text-blue-600 dark:text-blue-400">
                            ${row.unadjustedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="p-1.5 text-right font-bold text-slate-700 dark:text-slate-300">
                            ${row.adjustedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 1 */}
          {savedBox1.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Salary Conversions ({savedBox1.length})</span>
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
          BOX 2: NET TAKE-HOME PAY & TAX DEDUCTION ESTIMATOR
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Net Take-Home Pay &amp; Tax Deduction Estimator (FICA, Federal &amp; State)</span>
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
            <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Tax Withholding Profile
              </span>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Gross Annual Salary ($)
                </label>
                <input
                  type="number"
                  step={1000}
                  value={b2GrossSalary}
                  onChange={(e) => setB2GrossSalary(e.target.value)}
                  className={input3DClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Filing Status
                  </label>
                  <select
                    value={b2FilingStatus}
                    onChange={(e) => setB2FilingStatus(e.target.value as any)}
                    className={select3DClass}
                  >
                    <option value="single">Single</option>
                    <option value="married">Married Joint</option>
                    <option value="headOfHousehold">Head of Household</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    State of Residence
                  </label>
                  <select
                    value={b2StateCode}
                    onChange={(e) => setB2StateCode(e.target.value)}
                    className={select3DClass}
                  >
                    <option value="TX">Texas (0% State Tax)</option>
                    <option value="FL">Florida (0% State Tax)</option>
                    <option value="WA">Washington (0% State Tax)</option>
                    <option value="NV">Nevada (0% State Tax)</option>
                    <option value="TN">Tennessee (0% State Tax)</option>
                    <option value="WY">Wyoming (0% State Tax)</option>
                    <option value="CA">California (~6.5%)</option>
                    <option value="NY">New York (~5.5%)</option>
                    <option value="IL">Illinois (4.95% Flat)</option>
                    <option value="PA">Pennsylvania (3.07% Flat)</option>
                    <option value="NC">North Carolina (4.75%)</option>
                    <option value="GA">Georgia (5.49%)</option>
                    <option value="OH">Ohio (3.5%)</option>
                    <option value="CO">Colorado (4.4%)</option>
                    <option value="MA">Massachusetts (5.0%)</option>
                    <option value="NJ">New Jersey (5.5%)</option>
                    <option value="VA">Virginia (5.75%)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Monthly Pre-Tax Deductions ($/mo)
                </label>
                <input
                  type="number"
                  step={50}
                  placeholder="401k, HSA, Health Insurance"
                  value={b2PreTaxDeductions}
                  onChange={(e) => setB2PreTaxDeductions(e.target.value)}
                  className={input3DClass}
                />
                <span className="text-[10px] text-slate-400 block mt-0.5">401(k), HSA/FSA, Health Premiums</span>
              </div>
            </div>

            {/* RESULTS & DONUT ALLOCATION CHART */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Estimated Net Take-Home Pay
                  </span>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    ${b2Calc.netTakeHomeAnnual.toLocaleString()} <span className="text-xs font-medium text-slate-400">/ yr</span>
                  </span>
                </div>

                <div className="text-right font-sans tabular-nums">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Effective Tax Rate</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 inline-block">
                    {b2Calc.effectiveTaxRatePercent}% Total
                  </span>
                </div>
              </div>

              {/* PAYCHECK INTERVALS GRID */}
              <div className="grid grid-cols-3 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Net Monthly</span>
                  <span className="text-blue-600 dark:text-blue-400 font-extrabold text-sm">
                    ${b2Calc.netTakeHomeMonthly.toLocaleString()}
                  </span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Net Bi-Weekly</span>
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold text-sm">
                    ${b2Calc.netTakeHomeBiWeekly.toLocaleString()}
                  </span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Net Hourly</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
                    ${b2Calc.netTakeHomeHourly.toFixed(2)}/hr
                  </span>
                </div>
              </div>

              {/* TAX DEDUCTION BREAKDOWN LIST */}
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs space-y-1 font-sans tabular-nums">
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>Federal Income Tax Withholding:</span>
                  <span className="font-bold text-red-600">-${b2Calc.federalIncomeTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>State Income Tax ({b2StateCode}):</span>
                  <span className="font-bold text-amber-600">-${b2Calc.stateIncomeTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>FICA Taxes (Social Security + Medicare):</span>
                  <span className="font-bold text-purple-600">-${b2Calc.totalFicaTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>Pre-Tax Benefits Deductions:</span>
                  <span className="font-bold text-slate-600 dark:text-slate-400">-${b2Calc.preTaxDeductionsAnnual.toLocaleString()}</span>
                </div>
              </div>

              {/* 50/30/20 BUDGET RULE BAR */}
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">50/30/20 Take-Home Budget Guide</span>
                  <span className="text-slate-500 font-sans tabular-nums">${b2Calc.netTakeHomeMonthly.toLocaleString()} / mo</span>
                </div>
                <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-700">
                  <div style={{ width: "50%" }} className="bg-blue-600" title="Needs (50%)"></div>
                  <div style={{ width: "30%" }} className="bg-amber-500" title="Wants (30%)"></div>
                  <div style={{ width: "20%" }} className="bg-emerald-500" title="Savings (20%)"></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-600 dark:text-slate-400 font-sans tabular-nums">
                  <span>Needs (50%): ${Math.round(b2Calc.netTakeHomeMonthly * 0.5).toLocaleString()}</span>
                  <span>Wants (30%): ${Math.round(b2Calc.netTakeHomeMonthly * 0.3).toLocaleString()}</span>
                  <span>Savings (20%): ${Math.round(b2Calc.netTakeHomeMonthly * 0.2).toLocaleString()}</span>
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
                  <span>Saved Take-Home Tax Calculations ({savedBox2.length})</span>
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
          BOX 3: OVERTIME, DOUBLE-TIME & TIP/BONUS BOOSTER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Overtime, Double-Time &amp; Bonus Pay Booster</span>
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
                Hourly Wage &amp; Premium Hours
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Base Hourly Rate ($/hr)
                  </label>
                  <input
                    type="number"
                    step={1}
                    value={b3BaseRate}
                    onChange={(e) => setB3BaseRate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Regular Hours / Wk
                  </label>
                  <input
                    type="number"
                    value={b3RegHours}
                    onChange={(e) => setB3RegHours(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Overtime (1.5x) h/wk
                  </label>
                  <input
                    type="number"
                    value={b3OtHours}
                    onChange={(e) => setB3OtHours(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Double (2.0x) h/wk
                  </label>
                  <input
                    type="number"
                    value={b3DtHours}
                    onChange={(e) => setB3DtHours(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Annual Bonus ($)
                  </label>
                  <input
                    type="number"
                    step={500}
                    value={b3Bonus}
                    onChange={(e) => setB3Bonus(e.target.value)}
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
                    Total Gross Compensation
                  </span>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    ${b3Calc.totalAnnualGross.toLocaleString()} <span className="text-xs font-medium text-slate-400">/ yr</span>
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Effective Rate</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 inline-block font-sans tabular-nums">
                    ${b3Calc.effectiveHourlyRate.toFixed(2)} / hr
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Base Weekly</span>
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold">
                    ${b3Calc.baseWeeklyPay.toLocaleString()}
                  </span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Overtime Pay</span>
                  <span className="text-blue-600 dark:text-blue-400 font-extrabold">
                    +${b3Calc.overtimeWeeklyPay.toLocaleString()}/wk
                  </span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Double-Time Pay</span>
                  <span className="text-purple-600 font-extrabold">
                    +${b3Calc.doubleTimeWeeklyPay.toLocaleString()}/wk
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
                  <span>Saved Overtime Calculations ({savedBox3.length})</span>
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
          BOX 4: BI-WEEKLY VS SEMI-MONTHLY EXPLAINER & 3-PAYCHECK FINDER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Bi-Weekly vs. Semi-Monthly Explainer &amp; &quot;3-Paycheck Month&quot; Finder</span>
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
            <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Annual Compensation Input
              </span>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Annual Salary ($)
                </label>
                <input
                  type="number"
                  step={5000}
                  value={b4AnnualSalary}
                  onChange={(e) => setB4AnnualSalary(e.target.value)}
                  className={input3DClass}
                />
              </div>

              <div className="p-2.5 bg-blue-50/60 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <span className="font-bold block text-blue-700 dark:text-blue-300">Why Paychecks Differ:</span>
                <p className="text-[11px] leading-relaxed">
                  <strong>Bi-Weekly</strong> divides your salary across 26 pay periods (every 2 weeks). <strong>Semi-Monthly</strong> divides your salary across exactly 24 pay periods (twice per month).
                </p>
              </div>
            </div>

            {/* RESULTS */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs font-bold font-sans tabular-nums">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/60 rounded-xl border border-blue-200 dark:border-blue-800 space-y-1">
                  <span className="text-[10px] text-blue-600 block uppercase">Bi-Weekly Paycheck</span>
                  <div className="text-xl font-extrabold text-blue-700 dark:text-blue-300">
                    ${b4BiWeekly.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">26 paychecks per year (every 2 wks)</div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase">Semi-Monthly Paycheck</span>
                  <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                    ${b4SemiMonthly.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">24 paychecks per year (1st &amp; 15th)</div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900 text-xs space-y-1 font-sans">
                <span className="font-extrabold text-emerald-800 dark:text-emerald-300 block">
                  The &quot;3-Paycheck Magic Month&quot; Advantage:
                </span>
                <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                  Because bi-weekly employees receive 26 paychecks in 12 months, exactly <strong>2 months per year contain 3 paychecks</strong> instead of 2. For budgeters budgeting on 2 checks per month, those 2 extra checks function as a 100% discretionary bonus for savings or debt repayment.
                </p>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 4 */}
          {savedBox4.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Frequency Comparisons ({savedBox4.length})</span>
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
          BOX 5: COST-OF-LIVING & RELOCATION CONVERTER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Cost-of-Living &amp; Relocation Equivalent Salary Converter</span>
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
                Relocation Benchmark
              </span>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Current Base Salary ($)
                </label>
                <input
                  type="number"
                  step={5000}
                  value={b5Salary}
                  onChange={(e) => setB5Salary(e.target.value)}
                  className={input3DClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Current City / Metro
                  </label>
                  <select
                    value={b5SourceCity}
                    onChange={(e) => setB5SourceCity(e.target.value)}
                    className={select3DClass}
                  >
                    {Object.entries(CITY_COLI_INDEX).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Target Destination City
                  </label>
                  <select
                    value={b5TargetCity}
                    onChange={(e) => setB5TargetCity(e.target.value)}
                    className={select3DClass}
                  >
                    {Object.entries(CITY_COLI_INDEX).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Equivalent Required Salary
                  </span>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    ${b5Calc.equivalentSalary.toLocaleString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Cost Delta</span>
                  <span
                    className={`px-2 py-0.5 rounded-lg text-xs font-extrabold font-sans tabular-nums inline-block ${
                      b5Calc.percentageDifference > 0
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300"
                        : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300"
                    }`}
                  >
                    {b5Calc.percentageDifference > 0 ? `+${b5Calc.percentageDifference}%` : `${b5Calc.percentageDifference}%`}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs space-y-1.5 font-sans">
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>Destination Living Cost:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                    {b5Calc.percentageDifference > 0 ? `+${b5Calc.percentageDifference}% higher` : `${b5Calc.percentageDifference}% lower`}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>Housing &amp; Rent Cost Difference:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                    {b5Calc.housingDeltaPercent > 0 ? `+${b5Calc.housingDeltaPercent}%` : `${b5Calc.housingDeltaPercent}%`}
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
                  <span>Saved Cost-of-Living Comparisons ({savedBox5.length})</span>
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
          BOX 6: REVERSE SALARY & TARGET TAKE-HOME WAGE SOLVER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Reverse Salary Solver (Target Net Budget &rarr; Required Gross Wage)</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* INPUTS */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Target Net Budget Requirements
              </span>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Desired Net Take-Home ($/Month)
                </label>
                <input
                  type="number"
                  step={250}
                  value={b6NetMonthly}
                  onChange={(e) => setB6NetMonthly(e.target.value)}
                  className={input3DClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Estimated Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    step={1}
                    value={b6TaxRate}
                    onChange={(e) => setB6TaxRate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Hours per Week
                  </label>
                  <input
                    type="number"
                    value={b6HoursPerWeek}
                    onChange={(e) => setB6HoursPerWeek(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            {/* RESULTS */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-100 dark:border-slate-800">
                Required Pre-Tax Compensation Needed
              </span>

              <div className="grid grid-cols-2 gap-3 text-xs font-bold font-sans tabular-nums">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/60 rounded-xl border border-blue-200 dark:border-blue-800 space-y-1">
                  <span className="text-[10px] text-blue-600 block uppercase">Required Gross Annual</span>
                  <div className="text-xl font-extrabold text-blue-700 dark:text-blue-300">
                    ${b6Calc.requiredGrossAnnual.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Gross: ${b6Calc.requiredGrossMonthly.toLocaleString()} / mo</div>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1">
                  <span className="text-[10px] text-emerald-600 block uppercase">Required Hourly Wage</span>
                  <div className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300">
                    ${b6Calc.requiredGrossHourly.toFixed(2)} <span className="text-xs font-medium">/ hr</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Based on {b6HoursPerWeek} hrs/week</div>
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
                  <span>Saved Reverse Salary Solvers ({savedBox6.length})</span>
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

export default SalaryCalculator;
