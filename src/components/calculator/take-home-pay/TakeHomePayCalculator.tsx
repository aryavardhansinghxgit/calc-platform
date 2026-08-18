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
  MapPin,
  Clock,
  PiggyBank,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
} from "lucide-react";
import {
  calculateTakeHomePay,
  calculateHourlyOvertime,
  calculateBonusTax,
  calculateRelocationComparison,
  calculateReverseSalary,
  calculate503020Budget,
  FREQUENCY_MULTIPLIERS,
} from "@/app/calculators/take-home-pay-calculator/calculator";
import {
  PaycheckFrequency,
  FilingStatus,
  SavedPaycheckItem,
} from "@/app/calculators/take-home-pay-calculator/types";

export function TakeHomePayCalculator() {
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
  // BOX 1: CORE TAKE-HOME PAYCHECK CALCULATOR
  // =========================================================================
  const [b1GrossPay, setB1GrossPay] = useState<string>("80000");
  const [b1IsGrossAnnual, setB1IsGrossAnnual] = useState<boolean>(true);
  const [b1Frequency, setB1Frequency] = useState<PaycheckFrequency>("biweekly");
  const [b1FilingStatus, setB1FilingStatus] = useState<FilingStatus>("single");
  const [b1StateTaxRate, setB1StateTaxRate] = useState<string>("0");
  const [b1LocalTaxRate, setB1LocalTaxRate] = useState<string>("0");

  // Deductions
  const [b1Retirement401k, setB1Retirement401k] = useState<string>("230.77"); // ~$6k/yr
  const [b1HealthInsurance, setB1HealthInsurance] = useState<string>("0");
  const [b1HsaFsa, setB1HsaFsa] = useState<string>("0");
  const [b1Roth401k, setB1Roth401k] = useState<string>("0");
  const [b1ClaimDependents, setB1ClaimDependents] = useState<string>("0");

  const [savedBox1, setSavedBox1] = useState<SavedPaycheckItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);

  // =========================================================================
  // BOX 2: HOURLY, OVERTIME & TIPS
  // =========================================================================
  const [b2HourlyRate, setB2HourlyRate] = useState<string>("35");
  const [b2RegHours, setB2RegHours] = useState<string>("40");
  const [b2OtHours, setB2OtHours] = useState<string>("10");
  const [b2DtHours, setB2DtHours] = useState<string>("0");
  const [b2Tips, setB2Tips] = useState<string>("0");

  const [savedBox2, setSavedBox2] = useState<SavedPaycheckItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);

  // =========================================================================
  // BOX 3: SUPPLEMENTAL BONUS TAX ESTIMATOR
  // =========================================================================
  const [b3Salary, setB3Salary] = useState<string>("80000");
  const [b3Bonus, setB3Bonus] = useState<string>("10000");
  const [b3StateRate, setB3StateRate] = useState<string>("5.0");

  const [savedBox3, setSavedBox3] = useState<SavedPaycheckItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);

  // =========================================================================
  // BOX 4: RELOCATION MULTI-STATE COMPARATOR
  // =========================================================================
  const [b4Salary, setB4Salary] = useState<string>("100000");
  const [b4OriginRate, setB4OriginRate] = useState<string>("9.3"); // California

  const [savedBox4, setSavedBox4] = useState<SavedPaycheckItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);

  // =========================================================================
  // BOX 5: REVERSE SALARY & TARGET TAKE-HOME SOLVER
  // =========================================================================
  const [b5TargetNet, setB5TargetNet] = useState<string>("5000");
  const [b5Frequency, setB5Frequency] = useState<PaycheckFrequency>("monthly");
  const [b5TaxPercent, setB5TaxPercent] = useState<string>("25");

  const [savedBox5, setSavedBox5] = useState<SavedPaycheckItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);

  // =========================================================================
  // BOX 6: 50/30/20 BUDGET PLANNER
  // =========================================================================
  const [savedBox6, setSavedBox6] = useState<SavedPaycheckItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_chk_box1");
      if (s1) setSavedBox1(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_chk_box2");
      if (s2) setSavedBox2(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_chk_box3");
      if (s3) setSavedBox3(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_chk_box4");
      if (s4) setSavedBox4(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_chk_box5");
      if (s5) setSavedBox5(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_chk_box6");
      if (s6) setSavedBox6(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Box 1 Calculations
  const b1Calc = useMemo(() => {
    return calculateTakeHomePay({
      grossPay: parseFloat(b1GrossPay) || 0,
      isGrossAnnual: b1IsGrossAnnual,
      frequency: b1Frequency,
      filingStatus: b1FilingStatus,
      stateCode: "US",
      stateTaxRatePercent: parseFloat(b1StateTaxRate) || 0,
      localTaxRatePercent: parseFloat(b1LocalTaxRate) || 0,
      isFicaExempt: false,
      preTaxDeductions: {
        retirement401k: parseFloat(b1Retirement401k) || 0,
        healthDentalVision: parseFloat(b1HealthInsurance) || 0,
        hsaFsa: parseFloat(b1HsaFsa) || 0,
        transitCommuter: 0,
        otherPreTax: 0,
      },
      postTaxDeductions: {
        roth401k: parseFloat(b1Roth401k) || 0,
        garnishmentsChildSupport: 0,
        unionDuesCharity: 0,
        otherPostTax: 0,
      },
      w4Adjustments: {
        multipleJobsStep2c: false,
        claimDependentsStep3: parseFloat(b1ClaimDependents) || 0,
        otherIncomeStep4a: 0,
        extraDeductionsStep4b: 0,
        extraWithholdingStep4c: 0,
      },
    });
  }, [
    b1GrossPay,
    b1IsGrossAnnual,
    b1Frequency,
    b1FilingStatus,
    b1StateTaxRate,
    b1LocalTaxRate,
    b1Retirement401k,
    b1HealthInsurance,
    b1HsaFsa,
    b1Roth401k,
    b1ClaimDependents,
  ]);

  const handleExportBox1CSV = () => {
    const headers = ["Paycheck Line Item", "Per Paycheck ($)", "Annual Amount ($)", "% of Gross Pay"];
    const rows = b1Calc.lineItems.map((item) => [
      item.name,
      `$${item.perPeriod.toLocaleString()}`,
      `$${item.annual.toLocaleString()}`,
      `${item.percentageOfGross}%`,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("itemized_paycheck_stub.csv", csv);
  };

  const handleSaveBox1 = () => {
    const inputsStr = `Gross: $${b1Calc.grossPayPerPeriod.toLocaleString()}/${b1Frequency} ($${b1Calc.grossPayAnnual.toLocaleString()}/yr) | Status: ${b1FilingStatus}`;
    const primaryStr = `Net Take-Home Pay: $${b1Calc.netTakeHomePayPerPeriod.toLocaleString()} / paycheck (${b1Calc.takeHomePercentage}%) | Annual: $${b1Calc.netTakeHomePayAnnual.toLocaleString()}`;

    const detailsList = [
      `Gross Earnings: $${b1Calc.grossPayPerPeriod.toLocaleString()} / paycheck ($${b1Calc.grossPayAnnual.toLocaleString()} / yr)`,
      `Pre-Tax Deductions (401k/Ins): -$${b1Calc.totalPreTaxDeductionsPerPeriod.toLocaleString()} / paycheck`,
      `Federal Income Tax: -$${b1Calc.federalIncomeTaxPerPeriod.toLocaleString()} / paycheck`,
      `Social Security (6.2%): -$${b1Calc.socialSecurityTaxPerPeriod.toLocaleString()} / paycheck`,
      `Medicare (1.45%): -$${b1Calc.medicareTaxPerPeriod.toLocaleString()} / paycheck`,
      `Net Take-Home Paycheck: $${b1Calc.netTakeHomePayPerPeriod.toLocaleString()} (${b1Calc.takeHomePercentage}% of Gross)`,
      `Annual Net In-Hand Income: $${b1Calc.netTakeHomePayAnnual.toLocaleString()}`,
    ];

    const newItem: SavedPaycheckItem = {
      id: Date.now().toString(),
      title: "Take-Home Paycheck Calculation",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox1.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_chk_box1", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleDeleteSavedBox1 = (id: string) => {
    const updated = savedBox1.filter((item) => item.id !== id);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_chk_box1", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox1 = () => {
    setSavedBox1([]);
    try {
      localStorage.removeItem("saved_chk_box1");
    } catch (e) {}
  };

  // Box 2 Calculations (Hourly & Overtime)
  const b2Calc = useMemo(() => {
    return calculateHourlyOvertime({
      hourlyRate: parseFloat(b2HourlyRate) || 0,
      regularHoursPerWeek: parseFloat(b2RegHours) || 0,
      overtimeHoursPerWeek: parseFloat(b2OtHours) || 0,
      doubleTimeHoursPerWeek: parseFloat(b2DtHours) || 0,
      tipsAndCommissionsPerPeriod: parseFloat(b2Tips) || 0,
      frequency: "biweekly",
      effectiveTaxRatePercent: 22.0,
    });
  }, [b2HourlyRate, b2RegHours, b2OtHours, b2DtHours, b2Tips]);

  const handleSaveBox2 = () => {
    const inputsStr = `$${b2HourlyRate}/hr | ${b2RegHours} reg hrs + ${b2OtHours} OT hrs (1.5x)`;
    const primaryStr = `Net Bi-Weekly Pay: $${b2Calc.netTakeHomePay.toLocaleString()} | Effective Net Rate: $${b2Calc.effectiveNetHourlyRate.toLocaleString()}/hr`;

    const detailsList = [
      `Regular Pay: $${b2Calc.regularPay.toLocaleString()}`,
      `Overtime Premium Pay (1.5x): $${b2Calc.overtimePay.toLocaleString()}`,
      `Total Bi-Weekly Gross: $${b2Calc.totalGrossPay.toLocaleString()}`,
      `Annual Gross Wages: $${b2Calc.annualGrossPay.toLocaleString()}`,
      `Estimated Net Bi-Weekly Take-Home: $${b2Calc.netTakeHomePay.toLocaleString()}`,
      `Effective Net Hourly Wage: $${b2Calc.effectiveNetHourlyRate.toLocaleString()} / hr`,
    ];

    const newItem: SavedPaycheckItem = {
      id: Date.now().toString(),
      title: "Hourly & Overtime Paycheck",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox2.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_chk_box2", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  const handleDeleteSavedBox2 = (id: string) => {
    const updated = savedBox2.filter((item) => item.id !== id);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_chk_box2", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox2 = () => {
    setSavedBox2([]);
    try {
      localStorage.removeItem("saved_chk_box2");
    } catch (e) {}
  };

  // Box 3 Calculations (Bonus Tax)
  const b3Calc = useMemo(() => {
    return calculateBonusTax({
      regularSalaryAnnual: parseFloat(b3Salary) || 80000,
      bonusAmount: parseFloat(b3Bonus) || 10000,
      filingStatus: "single",
      stateTaxRatePercent: parseFloat(b3StateRate) || 0,
      localTaxRatePercent: 0,
      method: "percentage",
    });
  }, [b3Salary, b3Bonus, b3StateRate]);

  const handleSaveBox3 = () => {
    const inputsStr = `Bonus: $${b3Bonus} | Salary: $${b3Salary} | State: ${b3StateRate}%`;
    const primaryStr = `Net Bonus In-Hand: $${b3Calc.netTakeHomeBonus.toLocaleString()} (${b3Calc.bonusRetentionPercent}% Kept)`;

    const detailsList = [
      `Gross Supplemental Bonus: $${b3Calc.grossBonus.toLocaleString()}`,
      `Federal Flat Withholding (22%): -$${b3Calc.federalWithholding.toLocaleString()}`,
      `Social Security (6.2%): -$${b3Calc.socialSecurityTax.toLocaleString()}`,
      `Medicare (1.45%): -$${b3Calc.medicareTax.toLocaleString()}`,
      `State Tax Withholding: -$${b3Calc.stateTax.toLocaleString()}`,
      `Total Taxes Withheld: -$${b3Calc.totalBonusTaxes.toLocaleString()}`,
      `Net Take-Home Bonus: $${b3Calc.netTakeHomeBonus.toLocaleString()}`,
    ];

    const newItem: SavedPaycheckItem = {
      id: Date.now().toString(),
      title: "Supplemental Bonus Tax Estimator",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox3.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_chk_box3", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  const handleDeleteSavedBox3 = (id: string) => {
    const updated = savedBox3.filter((item) => item.id !== id);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_chk_box3", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox3 = () => {
    setSavedBox3([]);
    try {
      localStorage.removeItem("saved_chk_box3");
    } catch (e) {}
  };

  // Box 4 Calculations (Relocation Multi-State Comparator)
  const b4Destinations = useMemo(
    () => [
      { name: "Texas (TX — 0% Tax)", rate: 0.0 },
      { name: "Florida (FL — 0% Tax)", rate: 0.0 },
      { name: "Washington (WA — 0% Tax)", rate: 0.0 },
      { name: "Nevada (NV — 0% Tax)", rate: 0.0 },
      { name: "North Carolina (NC — 4.5% Flat)", rate: 4.5 },
    ],
    []
  );

  const b4Calc = useMemo(() => {
    const sal = parseFloat(b4Salary) || 100000;
    const origRate = parseFloat(b4OriginRate) || 9.3;
    return calculateRelocationComparison(sal, "Origin State", origRate, b4Destinations);
  }, [b4Salary, b4OriginRate, b4Destinations]);

  const handleSaveBox4 = () => {
    const inputsStr = `Salary: $${b4Salary} | Origin State Tax: ${b4OriginRate}%`;
    const primaryStr = `0% State Move Raise: +$${b4Calc[0]?.differenceVsOrigin.toLocaleString()} / yr (+$${Math.round(b4Calc[0]?.differenceVsOrigin / 12).toLocaleString()} / mo)`;

    const detailsList = [
      `Current Salary: $${parseFloat(b4Salary).toLocaleString()}`,
      `Origin State Tax Rate: ${b4OriginRate}%`,
      `Net Take-Home in 0% Tax State (TX/FL/WA): $${b4Calc[0]?.netTakeHomeAnnual.toLocaleString()} / yr`,
      `Annual Relocation Pay Raise: +$${b4Calc[0]?.differenceVsOrigin.toLocaleString()} / yr`,
    ];

    const newItem: SavedPaycheckItem = {
      id: Date.now().toString(),
      title: "Relocation Multi-State Paycheck",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox4.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_chk_box4", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  const handleDeleteSavedBox4 = (id: string) => {
    const updated = savedBox4.filter((item) => item.id !== id);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_chk_box4", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox4 = () => {
    setSavedBox4([]);
    try {
      localStorage.removeItem("saved_chk_box4");
    } catch (e) {}
  };

  // Box 5 Calculations (Reverse Salary Solver)
  const b5Calc = useMemo(() => {
    return calculateReverseSalary({
      targetNetPerPeriod: parseFloat(b5TargetNet) || 5000,
      frequency: b5Frequency,
      estimatedTaxAndDeductionPercent: parseFloat(b5TaxPercent) || 25,
    });
  }, [b5TargetNet, b5Frequency, b5TaxPercent]);

  const handleSaveBox5 = () => {
    const inputsStr = `Target Net: $${b5TargetNet} / ${b5Frequency} | Estimated Taxes: ${b5TaxPercent}%`;
    const primaryStr = `Required Salary: $${b5Calc.requiredGrossAnnual.toLocaleString()} / yr ($${b5Calc.requiredHourlyRate.toLocaleString()} / hr)`;

    const detailsList = [
      `Target In-Hand Cash: $${parseFloat(b5TargetNet).toLocaleString()} / ${b5Frequency}`,
      `Required Gross per Paycheck: $${b5Calc.requiredGrossPerPeriod.toLocaleString()}`,
      `Required Annual Gross Salary: $${b5Calc.requiredGrossAnnual.toLocaleString()}`,
      `Required Hourly Wage: $${b5Calc.requiredHourlyRate.toLocaleString()} / hr`,
    ];

    const newItem: SavedPaycheckItem = {
      id: Date.now().toString(),
      title: "Reverse Salary Target Solver",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox5.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_chk_box5", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  const handleDeleteSavedBox5 = (id: string) => {
    const updated = savedBox5.filter((item) => item.id !== id);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_chk_box5", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox5 = () => {
    setSavedBox5([]);
    try {
      localStorage.removeItem("saved_chk_box5");
    } catch (e) {}
  };

  // Box 6 Calculations (50/30/20 Budget)
  const b6Calc = useMemo(() => {
    return calculate503020Budget(b1Calc.netTakeHomePayAnnual);
  }, [b1Calc.netTakeHomePayAnnual]);

  const handleSaveBox6 = () => {
    const inputsStr = `Net Annual Income: $${b1Calc.netTakeHomePayAnnual.toLocaleString()} ($${b6Calc.netMonthlyPay.toLocaleString()}/mo)`;
    const primaryStr = `Needs: $${b6Calc.needs50Monthly.toLocaleString()}/mo | Wants: $${b6Calc.wants30Monthly.toLocaleString()}/mo | Savings: $${b6Calc.savings20Monthly.toLocaleString()}/mo`;

    const detailsList = [
      `Net Monthly Take-Home: $${b6Calc.netMonthlyPay.toLocaleString()}`,
      `50% Essential Needs: $${b6Calc.needs50Monthly.toLocaleString()} / mo ($${b6Calc.needs50Annual.toLocaleString()} / yr)`,
      `30% Lifestyle Wants: $${b6Calc.wants30Monthly.toLocaleString()} / mo ($${b6Calc.wants30Annual.toLocaleString()} / yr)`,
      `20% Savings & Debt Payoff: $${b6Calc.savings20Monthly.toLocaleString()} / mo ($${b6Calc.savings20Annual.toLocaleString()} / yr)`,
    ];

    const newItem: SavedPaycheckItem = {
      id: Date.now().toString(),
      title: "50/30/20 Take-Home Budget Planner",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox6.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_chk_box6", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  const handleDeleteSavedBox6 = (id: string) => {
    const updated = savedBox6.filter((item) => item.id !== id);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_chk_box6", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox6 = () => {
    setSavedBox6([]);
    try {
      localStorage.removeItem("saved_chk_box6");
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* =========================================================================
          BOX 1: CORE TAKE-HOME PAYCHECK CALCULATOR
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Take-Home Paycheck &amp; Tax Withholding Engine</span>
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
                Gross Salary &amp; Withholding Settings
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Gross Salary / Wages ($)
                  </label>
                  <input
                    type="number"
                    step={1000}
                    value={b1GrossPay}
                    onChange={(e) => setB1GrossPay(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Pay Frequency
                  </label>
                  <select
                    value={b1Frequency}
                    onChange={(e) => setB1Frequency(e.target.value as any)}
                    className={select3DClass}
                  >
                    <option value="biweekly">Bi-Weekly (26 paychecks/yr)</option>
                    <option value="semimonthly">Semi-Monthly (24 paychecks/yr)</option>
                    <option value="monthly">Monthly (12 paychecks/yr)</option>
                    <option value="weekly">Weekly (52 paychecks/yr)</option>
                    <option value="annually">Annually (1 pay period)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Federal Filing Status
                  </label>
                  <select
                    value={b1FilingStatus}
                    onChange={(e) => setB1FilingStatus(e.target.value as any)}
                    className={select3DClass}
                  >
                    <option value="single">Single</option>
                    <option value="married_joint">Married Filing Jointly</option>
                    <option value="married_separate">Married Filing Separately</option>
                    <option value="head_of_household">Head of Household</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    State Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    value={b1StateTaxRate}
                    onChange={(e) => setB1StateTaxRate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-extrabold uppercase text-slate-700 dark:text-slate-300 block">
                  Pre-Tax Deductions ($/paycheck)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">401(k) / IRA ($)</label>
                    <input
                      type="number"
                      step={50}
                      value={b1Retirement401k}
                      onChange={(e) => setB1Retirement401k(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Health/Dental Ins ($)</label>
                    <input
                      type="number"
                      step={25}
                      value={b1HealthInsurance}
                      onChange={(e) => setB1HealthInsurance(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT HERO & BREAKDOWN */}
            <div className="lg:col-span-6 space-y-3">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Net Take-Home Paycheck
                    </span>
                    <span className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums">
                      ${b1Calc.netTakeHomePayPerPeriod.toLocaleString()} <span className="text-xs font-medium text-slate-400">/ paycheck</span>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Take-Home Ratio</span>
                    <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 inline-block font-sans tabular-nums">
                      {b1Calc.takeHomePercentage}% of Gross
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold font-sans tabular-nums">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Gross Paycheck</span>
                    <span className="text-slate-900 dark:text-slate-100 font-extrabold text-[11px]">
                      ${b1Calc.grossPayPerPeriod.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Pre-Tax Benefits</span>
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold text-[11px]">
                      ${b1Calc.totalPreTaxDeductionsPerPeriod.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Total Taxes</span>
                    <span className="text-amber-600 font-extrabold text-[11px]">
                      ${b1Calc.totalTaxesPerPeriod.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Annual Net Pay</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px]">
                      ${b1Calc.netTakeHomePayAnnual.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleExportBox1CSV}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Export Itemized Paystub (CSV)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FULL ITEMIZED PAYCHECK TABLE */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Itemized Paystub Withholding Breakdown
              </span>
            </div>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-center border-collapse font-sans tabular-nums">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-2 text-left">Withholding Line Item</th>
                    <th className="p-2 text-right">Per Paycheck ($)</th>
                    <th className="p-2 text-right">Annual Total ($)</th>
                    <th className="p-2 text-right">% of Gross Pay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {b1Calc.lineItems.map((item, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 ${
                        idx === b1Calc.lineItems.length - 1 ? "bg-slate-50/80 dark:bg-slate-800/80 font-black" : ""
                      }`}
                    >
                      <td className="p-2 text-left font-bold text-slate-800 dark:text-slate-200">{item.name}</td>
                      <td className="p-2 text-right font-medium">${item.perPeriod.toLocaleString()}</td>
                      <td className="p-2 text-right font-medium">${item.annual.toLocaleString()}</td>
                      <td className="p-2 text-right font-bold text-slate-600 dark:text-slate-400">{item.percentageOfGross}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 1 */}
          {savedBox1.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Paycheck Calculations ({savedBox1.length})</span>
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
          BOX 2: HOURLY WAGE, OVERTIME (1.5x) & TIPS
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Hourly Wage, Overtime ($1.5&times;) &amp; Tips Paycheck Mode</span>
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
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Hourly &amp; Shift Hours
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Base Wage ($/hr)</label>
                  <input
                    type="number"
                    step={1}
                    value={b2HourlyRate}
                    onChange={(e) => setB2HourlyRate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Regular Hours (1.0x)</label>
                  <input
                    type="number"
                    value={b2RegHours}
                    onChange={(e) => setB2RegHours(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">OT Hours (1.5x)</label>
                  <input
                    type="number"
                    value={b2OtHours}
                    onChange={(e) => setB2OtHours(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Double (2.0x)</label>
                  <input
                    type="number"
                    value={b2DtHours}
                    onChange={(e) => setB2DtHours(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Tips ($/period)</label>
                  <input
                    type="number"
                    value={b2Tips}
                    onChange={(e) => setB2Tips(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Estimated Net Bi-Weekly Pay
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums">
                    ${b2Calc.netTakeHomePay.toLocaleString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Effective Hourly Net</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 inline-block font-sans tabular-nums">
                    ${b2Calc.effectiveNetHourlyRate.toLocaleString()} / hr
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Regular Pay</span>
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold">${b2Calc.regularPay.toLocaleString()}</span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Overtime (1.5x)</span>
                  <span className="text-blue-600 font-extrabold">${b2Calc.overtimePay.toLocaleString()}</span>
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
                  <span>Saved Hourly Calculations ({savedBox2.length})</span>
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
          BOX 3: SUPPLEMENTAL BONUS TAX ESTIMATOR
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Supplemental Bonus &amp; Commission Tax Withholding Estimator</span>
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
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Bonus &amp; Base Salary
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Bonus Amount ($)
                  </label>
                  <input
                    type="number"
                    step={1000}
                    value={b3Bonus}
                    onChange={(e) => setB3Bonus(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Regular Salary ($/yr)
                  </label>
                  <input
                    type="number"
                    step={5000}
                    value={b3Salary}
                    onChange={(e) => setB3Salary(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                The IRS mandates a flat 22% federal supplemental rate on bonuses under $1,000,000 (37% on excess), plus standard Social Security (6.2%), Medicare (1.45%), and state withholdings.
              </p>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Net Take-Home Bonus
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums">
                    ${b3Calc.netTakeHomeBonus.toLocaleString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Retention Ratio</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 inline-block font-sans tabular-nums">
                    {b3Calc.bonusRetentionPercent}% Kept
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Federal (22%)</span>
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold">${b3Calc.federalWithholding.toLocaleString()}</span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">FICA (7.65%)</span>
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold">${(b3Calc.socialSecurityTax + b3Calc.medicareTax).toLocaleString()}</span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">State Tax</span>
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold">${b3Calc.stateTax.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 3 */}
          {savedBox3.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Bonus Calculations ({savedBox3.length})</span>
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
          BOX 4: RELOCATION MULTI-STATE COMPARATOR
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Relocation Multi-State Take-Home Paycheck Comparator</span>
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
            <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Relocation Benchmark
              </span>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Gross Annual Salary ($)
                </label>
                <input
                  type="number"
                  step={5000}
                  value={b4Salary}
                  onChange={(e) => setB4Salary(e.target.value)}
                  className={input3DClass}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Origin State Tax Rate (%)
                </label>
                <input
                  type="number"
                  step={0.5}
                  value={b4OriginRate}
                  onChange={(e) => setB4OriginRate(e.target.value)}
                  className={input3DClass}
                />
              </div>
            </div>

            <div className="lg:col-span-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              <table className="w-full text-center border-collapse font-sans tabular-nums">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-2 text-left">Destination State</th>
                    <th className="p-2">State Tax ($)</th>
                    <th className="p-2">Net Annual Pay</th>
                    <th className="p-2 font-black text-emerald-600">Take-Home Pay Raise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {b4Calc.map((st, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-2 text-left font-bold text-slate-800 dark:text-slate-200">{st.stateName}</td>
                      <td className="p-2 text-slate-600">${st.stateTaxAnnual.toLocaleString()}</td>
                      <td className="p-2 font-extrabold text-blue-600 dark:text-blue-400">${st.netTakeHomeAnnual.toLocaleString()}</td>
                      <td className="p-2 font-extrabold text-emerald-600">
                        +${st.differenceVsOrigin.toLocaleString()} / yr
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 4 */}
          {savedBox4.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Relocation Comparisons ({savedBox4.length})</span>
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
          BOX 5: REVERSE SALARY & TARGET TAKE-HOME SOLVER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Reverse Salary &amp; Target Take-Home Solver</span>
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
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Desired In-Hand Cash Target
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Target Net Cash ($)
                  </label>
                  <input
                    type="number"
                    step={250}
                    value={b5TargetNet}
                    onChange={(e) => setB5TargetNet(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Frequency
                  </label>
                  <select
                    value={b5Frequency}
                    onChange={(e) => setB5Frequency(e.target.value as any)}
                    className={select3DClass}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="biweekly">Bi-Weekly</option>
                    <option value="weekly">Weekly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Required Annual Gross Salary
                  </span>
                  <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                    ${b5Calc.requiredGrossAnnual.toLocaleString()} <span className="text-xs font-medium text-slate-400">/ yr</span>
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Required Wage</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 inline-block font-sans tabular-nums">
                    ${b5Calc.requiredHourlyRate.toLocaleString()} / hr
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-sans tabular-nums flex justify-between items-center">
                <span>Required Gross per Paycheck:</span>
                <span className="font-extrabold text-slate-900 dark:text-slate-100">${b5Calc.requiredGrossPerPeriod.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 5 */}
          {savedBox5.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Reverse Salary Solvers ({savedBox5.length})</span>
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
          BOX 6: 50/30/20 POST-TAX PERSONAL BUDGET PLANNER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>50/30/20 Post-Tax Personal Budget Planner</span>
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
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400 block">
                Net Monthly Take-Home Pay
              </span>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                ${b6Calc.netMonthlyPay.toLocaleString()} <span className="text-xs font-medium text-slate-400">/ month</span>
              </span>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-400 max-w-md font-sans">
              The 50/30/20 rule automatically segments your in-hand net cash into 50% Essential Needs, 30% Lifestyle Wants, and 20% Savings &amp; Debt Payoff.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans tabular-nums">
            <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/50 space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300 block">
                50% Essential Needs
              </span>
              <span className="text-xl font-extrabold text-blue-900 dark:text-blue-100 block">
                ${b6Calc.needs50Monthly.toLocaleString()} <span className="text-xs font-normal">/ mo</span>
              </span>
              <span className="text-[11px] text-slate-500 block">${b6Calc.needs50Annual.toLocaleString()} / year (Housing, Groceries, Utilities)</span>
            </div>

            <div className="p-3.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-900/50 space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 dark:text-purple-300 block">
                30% Lifestyle Wants
              </span>
              <span className="text-xl font-extrabold text-purple-900 dark:text-purple-100 block">
                ${b6Calc.wants30Monthly.toLocaleString()} <span className="text-xs font-normal">/ mo</span>
              </span>
              <span className="text-[11px] text-slate-500 block">${b6Calc.wants30Annual.toLocaleString()} / year (Dining, Hobbies, Travel)</span>
            </div>

            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900/50 space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
                20% Savings &amp; Debt
              </span>
              <span className="text-xl font-extrabold text-emerald-900 dark:text-emerald-100 block">
                ${b6Calc.savings20Monthly.toLocaleString()} <span className="text-xs font-normal">/ mo</span>
              </span>
              <span className="text-[11px] text-slate-500 block">${b6Calc.savings20Annual.toLocaleString()} / year (Emergency Fund, Extra Principal)</span>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 6 */}
          {savedBox6.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Budget Allocations ({savedBox6.length})</span>
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

export default TakeHomePayCalculator;
