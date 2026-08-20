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
  RotateCcw,
  Sliders,
  CheckCircle2,
  ChevronRight,
  Sparkles,
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
  const [activeTab, setActiveTab] = useState<
    "universal" | "take-home" | "overtime" | "pay-schedule" | "cost-of-living" | "target-salary"
  >("universal");

  const inputClass =
    "w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-900 dark:text-slate-100 focus:border-blue-600 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all text-xs";
  const selectClass =
    "w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-900 dark:text-slate-100 focus:border-blue-600 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none cursor-pointer transition-all text-xs";
  const cardClass =
    "border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs";

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
  // TAB 1: UNIVERSAL SALARY & WAGE CONVERTER (CORE)
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
  // TAB 2: NET TAKE-HOME PAY & TAX DEDUCTIONS
  // =========================================================================
  const [b2TaxYear, setB2TaxYear] = useState<"2026" | "2025">("2026");
  const [b2GrossSalary, setB2GrossSalary] = useState<string>("104000");
  const [b2FilingStatus, setB2FilingStatus] = useState<"single" | "married" | "headOfHousehold">("single");
  const [b2StateCode, setB2StateCode] = useState<string>("TX");
  const [b2PreTaxDeductions, setB2PreTaxDeductions] = useState<string>("500");

  const [savedBox2, setSavedBox2] = useState<SavedSalaryItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);

  // =========================================================================
  // TAB 3: OVERTIME & BONUS BOOSTER
  // =========================================================================
  const [b3BaseRate, setB3BaseRate] = useState<string>("35");
  const [b3RegHours, setB3RegHours] = useState<string>("40");
  const [b3OtHours, setB3OtHours] = useState<string>("5");
  const [b3DtHours, setB3DtHours] = useState<string>("2");
  const [b3Bonus, setB3Bonus] = useState<string>("5000");

  const [savedBox3, setSavedBox3] = useState<SavedSalaryItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);

  // =========================================================================
  // TAB 4: BI-WEEKLY VS SEMI-MONTHLY EXPLAINER
  // =========================================================================
  const [b4AnnualSalary, setB4AnnualSalary] = useState<string>("104000");

  const [savedBox4, setSavedBox4] = useState<SavedSalaryItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);

  // =========================================================================
  // TAB 5: COST-OF-LIVING & RELOCATION CONVERTER
  // =========================================================================
  const [b5Salary, setB5Salary] = useState<string>("85000");
  const [b5SourceCity, setB5SourceCity] = useState<string>("austin");
  const [b5TargetCity, setB5TargetCity] = useState<string>("nyc");

  const [savedBox5, setSavedBox5] = useState<SavedSalaryItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);

  // =========================================================================
  // TAB 6: REVERSE SALARY & TARGET TAKE-HOME SOLVER
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

  // Box 2 Calculations
  const b2Calc = useMemo(() => {
    return calculateTakeHomeTax({
      grossAnnualSalary: parseFloat(b2GrossSalary) || 0,
      filingStatus: b2FilingStatus,
      stateCode: b2StateCode,
      monthlyPreTaxDeductions: parseFloat(b2PreTaxDeductions) || 0,
      taxYear: b2TaxYear,
    });
  }, [b2GrossSalary, b2FilingStatus, b2StateCode, b2PreTaxDeductions, b2TaxYear]);

  const handleSaveBox2 = () => {
    const inputsStr = `Tax Year: ${b2TaxYear} | Gross: $${b2GrossSalary} | ${b2FilingStatus} | State: ${b2StateCode} | Pre-Tax: $${b2PreTaxDeductions}/mo`;
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

  const tabs = [
    { id: "universal", label: "Wage Converter", icon: DollarSign, desc: "Hourly to Annual Matrix" },
    { id: "take-home", label: "Take-Home & Taxes", icon: Briefcase, desc: "Net Paycheck Estimator" },
    { id: "overtime", label: "Overtime & Bonus", icon: TrendingUp, desc: "1.5x & 2.0x Boosted Pay" },
    { id: "pay-schedule", label: "Bi-Weekly vs Semi-Monthly", icon: Calendar, desc: "26 vs 24 Paychecks" },
    { id: "cost-of-living", label: "Cost of Living", icon: MapPin, desc: "Relocation & Purchasing Power" },
    { id: "target-salary", label: "Target Salary Solver", icon: Percent, desc: "Reverse Net-to-Gross" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. TOP INTERACTIVE MODE SWITCHER (RESHUFFLED FOR MAXIMUM CONVENIENCE) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 sm:p-2.5 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-2.5 sm:p-3 rounded-xl text-left transition-all flex flex-col justify-between cursor-pointer border min-h-[72px] sm:min-h-[80px] ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/80 shadow-xs"
                    : "bg-slate-50/70 dark:bg-slate-800/40 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                <div className="flex items-start gap-2 mb-1.5">
                  <div
                    className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span
                    className={`text-xs font-bold leading-snug whitespace-normal break-words ${
                      isActive
                        ? "text-blue-900 dark:text-blue-200"
                        : "text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {tab.label}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight block whitespace-normal">
                  {tab.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          TAB 1: UNIVERSAL SALARY & WAGE CONVERTER (CORE MATRIX)
          ========================================================================= */}
      {activeTab === "universal" && (
        <div className={cardClass}>
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                <DollarSign className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Universal Salary & Wage Conversion Matrix
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Convert wages across Hourly, Weekly, Bi-Weekly, Semi-Monthly, Monthly, and Annual pay intervals.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSaveBox1}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Bookmark className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{justSavedBox1 ? "Saved!" : "Save"}</span>
            </button>
          </div>

          <div className="p-4 sm:p-5 space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* INPUTS */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200 dark:border-slate-700">
                  Salary & Working Schedule
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Salary Amount ($)
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={1}
                      value={b1Salary}
                      onChange={(e) => setB1Salary(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Pay Frequency
                    </label>
                    <select
                      value={b1Freq}
                      onChange={(e) => setB1Freq(e.target.value as PayFrequencyUnit)}
                      className={selectClass}
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
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Hours per Week
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={168}
                      value={b1HoursPerWeek}
                      onChange={(e) => setB1HoursPerWeek(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Days per Week
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={7}
                      value={b1DaysPerWeek}
                      onChange={(e) => setB1DaysPerWeek(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-1 border-t border-slate-200 dark:border-slate-700">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Holidays / Year
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={b1Holidays}
                      onChange={(e) => setB1Holidays(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Vacation / PTO Days
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={b1Vacation}
                      onChange={(e) => setB1Vacation(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* OUTPUT HERO & SCHEDULE SUMMARY */}
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Unadjusted (52 Wks / 260 Days)
                    </span>
                    <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                      ${b1Calc.unadjustedAnnual.toLocaleString()}
                      <span className="text-xs font-normal text-slate-500 block mt-0.5">Annual Gross</span>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700 flex justify-between text-xs font-sans tabular-nums">
                      <span>Monthly: <strong>${b1Calc.unadjustedMonthly.toLocaleString()}</strong></span>
                      <span>Hourly: <strong>${b1Calc.unadjustedHourly.toFixed(2)}/hr</strong></span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                      Paid PTO & Holidays ({b1Calc.adjustedWorkingDays} Active Days)
                    </span>
                    <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums mt-1">
                      ${b1Calc.adjustedAnnual.toLocaleString()}
                      <span className="text-xs font-normal text-slate-500 block mt-0.5">Contractual Annual Salary</span>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-emerald-200/60 dark:border-emerald-800/40 flex justify-between text-xs font-sans tabular-nums text-slate-700 dark:text-slate-300">
                      <span>Active Hours: <strong>{Math.round(b1Calc.adjustedWorkingDays * (parseFloat(b1HoursPerWeek || "40") / parseFloat(b1DaysPerWeek || "5")))} hrs</strong></span>
                      <span>Effective: <strong>${b1Calc.adjustedHourly.toFixed(2)}/hr</strong></span>
                    </div>
                  </div>
                </div>

                {/* Conversion Matrix Table */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                  <div className="bg-slate-100 dark:bg-slate-800 px-3.5 py-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Complete Pay Period Conversion Matrix
                    </span>
                    <button
                      type="button"
                      onClick={handleExportBox1CSV}
                      className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3" /> Export CSV
                    </button>
                  </div>
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="p-2.5">Period</th>
                        <th className="p-2.5">Unadjusted (52 Wks)</th>
                        <th className="p-2.5">Adjusted (PTO)</th>
                        <th className="p-2.5">Interval Basis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-sans tabular-nums text-slate-700 dark:text-slate-300">
                      {b1Calc.conversionMatrix.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                          <td className="p-2.5 font-sans font-semibold text-slate-900 dark:text-slate-100">{row.period}</td>
                          <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">${row.unadjustedAmount.toLocaleString()}</td>
                          <td className="p-2.5 font-semibold text-emerald-600 dark:text-emerald-400">${row.adjustedAmount.toLocaleString()}</td>
                          <td className="p-2.5 text-[11px] text-slate-500">{row.frequencyDescription}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Saved Items */}
            {savedBox1.length > 0 && (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Saved Wage Conversions ({savedBox1.length})</span>
                  <button type="button" onClick={() => setSavedBox1([])} className="text-rose-500 text-[11px] hover:underline cursor-pointer">Clear All</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {savedBox1.map((item) => (
                    <div key={item.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200">{item.primaryResult}</div>
                        <div className="text-[10px] text-slate-500">{item.inputsSummary}</div>
                      </div>
                      <button type="button" onClick={() => handleDeleteSavedBox1(item.id)} className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: NET TAKE-HOME PAY & TAX DEDUCTIONS
          ========================================================================= */}
      {activeTab === "take-home" && (
        <div className={cardClass}>
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                <Briefcase className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Take-Home Paycheck & Tax Deduction Estimator
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Estimated Payroll Take-Home Model after federal taxes, state taxes, and FICA withholdings.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSaveBox2}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Bookmark className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{justSavedBox2 ? "Saved!" : "Save"}</span>
            </button>
          </div>

          <div className="p-4 sm:p-5 space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* INPUTS */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200 dark:border-slate-700">
                  Salary & Tax Profile
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Tax Year
                    </label>
                    <select
                      value={b2TaxYear}
                      onChange={(e) => setB2TaxYear(e.target.value as "2026" | "2025")}
                      className={selectClass}
                    >
                      <option value="2026">2026 (Current)</option>
                      <option value="2025">2025</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Gross Annual Salary ($)
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={1000}
                      value={b2GrossSalary}
                      onChange={(e) => setB2GrossSalary(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Filing Status
                    </label>
                    <select
                      value={b2FilingStatus}
                      onChange={(e) => setB2FilingStatus(e.target.value as any)}
                      className={selectClass}
                    >
                      <option value="single">Single</option>
                      <option value="married">Married (Joint)</option>
                      <option value="headOfHousehold">Head of Household</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      State
                    </label>
                    <select
                      value={b2StateCode}
                      onChange={(e) => setB2StateCode(e.target.value)}
                      className={selectClass}
                    >
                      <option value="TX">Texas (0% Tax)</option>
                      <option value="FL">Florida (0% Tax)</option>
                      <option value="WA">Washington (0% Tax)</option>
                      <option value="NV">Nevada (0% Tax)</option>
                      <option value="TN">Tennessee (0% Tax)</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="IL">Illinois</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="MA">Massachusetts</option>
                      <option value="NJ">New Jersey</option>
                      <option value="CO">Colorado</option>
                      <option value="NC">North Carolina</option>
                      <option value="GA">Georgia</option>
                      <option value="VA">Virginia</option>
                      <option value="OH">Ohio</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Monthly Pre-Tax Deductions ($401k, HSA, Medical)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={50}
                    value={b2PreTaxDeductions}
                    onChange={(e) => setB2PreTaxDeductions(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* OUTPUT RESULTS */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                      Estimated Annual Net Take-Home Pay
                    </span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md font-sans">
                      {parseFloat(b2GrossSalary) > 0 ? ((b2Calc.netTakeHomeAnnual / parseFloat(b2GrossSalary)) * 100).toFixed(1) : "0.0"}% Net Retained
                    </span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums my-1">
                    ${b2Calc.netTakeHomeAnnual.toLocaleString()}
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/40 text-xs font-sans tabular-nums text-slate-700 dark:text-slate-300">
                    <div>Monthly: <strong>${b2Calc.netTakeHomeMonthly.toLocaleString()}</strong></div>
                    <div>Bi-Weekly: <strong>${b2Calc.netTakeHomeBiWeekly.toLocaleString()}</strong></div>
                    <div>Weekly: <strong>${Math.round(b2Calc.netTakeHomeAnnual / 52).toLocaleString()}</strong></div>
                  </div>
                </div>

                {/* Tax Breakdown Table */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="p-2.5">Component</th>
                        <th className="p-2.5">Annual Amount</th>
                        <th className="p-2.5">Monthly Share</th>
                        <th className="p-2.5">Effective Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 font-sans tabular-nums text-slate-700 dark:text-slate-300">
                      <tr>
                        <td className="p-2.5 font-sans font-semibold">Federal Income Tax</td>
                        <td className="p-2.5 text-purple-600 dark:text-purple-400 font-bold">${b2Calc.federalIncomeTax.toLocaleString()}</td>
                        <td className="p-2.5">${Math.round(b2Calc.federalIncomeTax / 12).toLocaleString()}</td>
                        <td className="p-2.5 font-semibold">{(parseFloat(b2GrossSalary) > 0 ? (b2Calc.federalIncomeTax / parseFloat(b2GrossSalary) * 100).toFixed(1) : "0.0")}%</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-semibold">FICA Payroll Taxes (SS & Medicare)</td>
                        <td className="p-2.5 text-amber-600 dark:text-amber-400 font-bold">${b2Calc.totalFicaTax.toLocaleString()}</td>
                        <td className="p-2.5">${Math.round(b2Calc.totalFicaTax / 12).toLocaleString()}</td>
                        <td className="p-2.5 font-semibold">7.65%</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-semibold">State Income Tax ({b2StateCode})</td>
                        <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">${b2Calc.stateIncomeTax.toLocaleString()}</td>
                        <td className="p-2.5">${Math.round(b2Calc.stateIncomeTax / 12).toLocaleString()}</td>
                        <td className="p-2.5 font-semibold">{(parseFloat(b2GrossSalary) > 0 ? (b2Calc.stateIncomeTax / parseFloat(b2GrossSalary) * 100).toFixed(1) : "0.0")}%</td>
                      </tr>
                      <tr className="bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-slate-100">
                        <td className="p-2.5">Total Annual Taxes Withheld</td>
                        <td className="p-2.5 text-rose-600 dark:text-rose-400">${b2Calc.totalTaxes.toLocaleString()}</td>
                        <td className="p-2.5">${Math.round(b2Calc.totalTaxes / 12).toLocaleString()}</td>
                        <td className="p-2.5">{b2Calc.effectiveTaxRatePercent}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: OVERTIME & BONUS BOOSTER
          ========================================================================= */}
      {activeTab === "overtime" && (
        <div className={cardClass}>
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Overtime (1.5x & 2.0x) & Bonus Compensation Booster
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Calculate premium overtime rates, double-time, performance bonuses, and effective hourly wage.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSaveBox3}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Bookmark className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{justSavedBox3 ? "Saved!" : "Save"}</span>
            </button>
          </div>

          <div className="p-4 sm:p-5 space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* INPUTS */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200 dark:border-slate-700">
                  Hourly Wage & Extra Hours
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Base Hourly Rate ($)
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={0.5}
                      value={b3BaseRate}
                      onChange={(e) => setB3BaseRate(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Regular Hours / Wk
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={80}
                      value={b3RegHours}
                      onChange={(e) => setB3RegHours(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Overtime Hrs / Wk (1.5x)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={80}
                      value={b3OtHours}
                      onChange={(e) => setB3OtHours(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Double-Time Hrs / Wk (2x)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={80}
                      value={b3DtHours}
                      onChange={(e) => setB3DtHours(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Annual Bonus & Commissions ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={b3Bonus}
                    onChange={(e) => setB3Bonus(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* OUTPUT RESULTS */}
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 block">
                      Total Annual Compensation
                    </span>
                    <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                      ${b3Calc.totalAnnualGross.toLocaleString()}
                    </div>
                    <span className="text-xs text-slate-500 block mt-1">Base + OT + Double Time + Bonus</span>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                      Effective Blended Hourly Rate
                    </span>
                    <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums mt-1">
                      ${b3Calc.effectiveHourlyRate.toFixed(2)}/hr
                    </div>
                    <span className="text-xs text-slate-500 block mt-1">Base rate was ${parseFloat(b3BaseRate || "0").toFixed(2)}/hr</span>
                  </div>
                </div>

                {/* Breakdown Table */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="p-2.5">Component</th>
                        <th className="p-2.5">Rate</th>
                        <th className="p-2.5">Weekly Pay</th>
                        <th className="p-2.5">Annualized</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900 font-sans tabular-nums text-slate-700 dark:text-slate-300">
                      <tr>
                        <td className="p-2.5 font-sans font-semibold">Regular Base Pay</td>
                        <td className="p-2.5">1.0x (${parseFloat(b3BaseRate || "0").toFixed(2)})</td>
                        <td className="p-2.5 font-semibold">${b3Calc.baseWeeklyPay.toLocaleString()}</td>
                        <td className="p-2.5 font-bold">${(b3Calc.baseWeeklyPay * 52).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-semibold">1.5x Overtime Pay</td>
                        <td className="p-2.5 text-blue-600">1.5x (${(parseFloat(b3BaseRate || "0") * 1.5).toFixed(2)})</td>
                        <td className="p-2.5 font-semibold text-blue-600">${b3Calc.overtimeWeeklyPay.toLocaleString()}</td>
                        <td className="p-2.5 font-bold text-blue-600">${(b3Calc.overtimeWeeklyPay * 52).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-semibold">2.0x Double-Time Pay</td>
                        <td className="p-2.5 text-purple-600">2.0x (${(parseFloat(b3BaseRate || "0") * 2.0).toFixed(2)})</td>
                        <td className="p-2.5 font-semibold text-purple-600">${b3Calc.doubleTimeWeeklyPay.toLocaleString()}</td>
                        <td className="p-2.5 font-bold text-purple-600">${(b3Calc.doubleTimeWeeklyPay * 52).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-semibold">Annual Bonuses & Commissions</td>
                        <td className="p-2.5">-</td>
                        <td className="p-2.5">${Math.round(parseFloat(b3Bonus || "0") / 52).toLocaleString()}</td>
                        <td className="p-2.5 font-bold text-emerald-600">${parseFloat(b3Bonus || "0").toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: BI-WEEKLY VS SEMI-MONTHLY EXPLAINER
          ========================================================================= */}
      {activeTab === "pay-schedule" && (
        <div className={cardClass}>
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Bi-Weekly (26 Checks) vs. Semi-Monthly (24 Checks) Explainer
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Understand why semi-monthly paychecks are larger, but bi-weekly provides two 3-paycheck magic months each year.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSaveBox4}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Bookmark className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{justSavedBox4 ? "Saved!" : "Save"}</span>
            </button>
          </div>

          <div className="p-4 sm:p-5 space-y-5">
            <div className="max-w-md">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Annual Salary ($)
              </label>
              <input
                type="number"
                min={0}
                step={1000}
                value={b4AnnualSalary}
                onChange={(e) => setB4AnnualSalary(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Bi-Weekly Schedule (Every 2 Weeks)
                  </span>
                  <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md font-sans">
                    26 Paychecks / Year
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                  ${b4BiWeekly.toLocaleString()}
                  <span className="text-xs font-normal text-slate-500 block mt-0.5">Gross Pay per Check</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-200 dark:border-slate-700">
                  Paid every other Friday (or designated weekday). In 10 months of the year, you receive 2 paychecks. In <strong>2 magic months</strong>, you receive 3 paychecks.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Semi-Monthly Schedule (2x per Month)
                  </span>
                  <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md font-sans">
                    24 Paychecks / Year
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                  ${b4SemiMonthly.toLocaleString()}
                  <span className="text-xs font-normal text-slate-500 block mt-0.5">Gross Pay per Check</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-200 dark:border-slate-700">
                  Paid on fixed calendar dates (typically the 1st and 15th, or 15th and last day). Each paycheck is <strong>${b4CheckDelta.toLocaleString()} larger</strong>, but you always receive exactly 2 checks every month.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: COST OF LIVING & RELOCATION CONVERTER
          ========================================================================= */}
      {activeTab === "cost-of-living" && (
        <div className={cardClass}>
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Cost-of-Living & Relocation Equivalent Salary Converter
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Compare city purchasing power and determine what salary is needed to maintain your standard of living.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSaveBox5}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Bookmark className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{justSavedBox5 ? "Saved!" : "Save"}</span>
            </button>
          </div>

          <div className="p-4 sm:p-5 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Current Annual Salary ($)
                </label>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={b5Salary}
                  onChange={(e) => setB5Salary(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Current City
                </label>
                <select
                  value={b5SourceCity}
                  onChange={(e) => setB5SourceCity(e.target.value)}
                  className={selectClass}
                >
                  {Object.entries(CITY_COLI_INDEX).map(([key, data]) => (
                    <option key={key} value={key}>{data.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Destination City
                </label>
                <select
                  value={b5TargetCity}
                  onChange={(e) => setB5TargetCity(e.target.value)}
                  className={selectClass}
                >
                  {Object.entries(CITY_COLI_INDEX).map(([key, data]) => (
                    <option key={key} value={key}>{data.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Equivalent Salary Needed in {b5Calc.targetCityName}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md font-sans ${
                  b5Calc.percentageDifference > 0 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300"
                }`}>
                  {b5Calc.percentageDifference > 0 ? `+${b5Calc.percentageDifference}% Cost of Living` : `${b5Calc.percentageDifference}% Cost of Living`}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                ${b5Calc.equivalentSalary.toLocaleString()}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
                <div>Housing Index Differential: <strong className="text-slate-900 dark:text-slate-100 font-sans">{b5Calc.housingDeltaPercent > 0 ? `+${b5Calc.housingDeltaPercent}%` : `${b5Calc.housingDeltaPercent}%`}</strong></div>
                <div>Purchasing Power: <strong className="text-slate-900 dark:text-slate-100 font-sans">{b5Calc.targetCityName} is {Math.abs(b5Calc.percentageDifference)}% {b5Calc.percentageDifference > 0 ? "more expensive" : "cheaper"}</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: REVERSE SALARY & TARGET TAKE-HOME SOLVER
          ========================================================================= */}
      {activeTab === "target-salary" && (
        <div className={cardClass}>
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                <Percent className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Reverse Salary & Target Take-Home Solver
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Input your target monthly net take-home pay to calculate the required gross salary and hourly wage.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSaveBox6}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Bookmark className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{justSavedBox6 ? "Saved!" : "Save"}</span>
            </button>
          </div>

          <div className="p-4 sm:p-5 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Desired Monthly Net Pay ($)
                </label>
                <input
                  type="number"
                  min={0}
                  step={250}
                  value={b6NetMonthly}
                  onChange={(e) => setB6NetMonthly(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Estimated Total Tax Rate (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={60}
                  step={0.5}
                  value={b6TaxRate}
                  onChange={(e) => setB6TaxRate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Hours per Week
                </label>
                <input
                  type="number"
                  min={1}
                  max={80}
                  value={b6HoursPerWeek}
                  onChange={(e) => setB6HoursPerWeek(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Required Gross Annual Salary
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                ${b6Calc.requiredGrossAnnual.toLocaleString()}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs font-sans tabular-nums text-slate-700 dark:text-slate-300">
                <div>Required Hourly: <strong>${b6Calc.requiredGrossHourly.toFixed(2)}/hr</strong></div>
                <div>Gross Monthly: <strong>${b6Calc.requiredGrossMonthly.toLocaleString()}/mo</strong></div>
                <div>Est. Taxes: <strong>${Math.round(b6Calc.requiredGrossAnnual * (parseFloat(b6TaxRate) / 100)).toLocaleString()}/yr</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
