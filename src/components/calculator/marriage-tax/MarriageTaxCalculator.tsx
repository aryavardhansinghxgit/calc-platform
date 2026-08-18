"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  Download,
  DollarSign,
  Heart,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Scale,
  Percent,
} from "lucide-react";
import {
  calculateThreeWayComparison,
  simulateIncomeRatios,
} from "@/app/calculators/marriage-tax-calculator/calculator";
import {
  SpouseIncomeInputs,
  MarriageTaxInputs,
  SavedMarriageTaxItem,
} from "@/app/calculators/marriage-tax-calculator/types";

export function MarriageTaxCalculator() {
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
  // BOX 1: CORE THREE-WAY MARRIAGE TAX CALCULATOR
  // =========================================================================
  const [b1TaxYear, setB1TaxYear] = useState<"2025" | "2026">("2025");
  const [b1StateTaxRate, setB1StateTaxRate] = useState<string>("5.0");

  // Spouse 1
  const [b1S1W2, setB1S1W2] = useState<string>("65000");
  const [b1S1SE, setB1S1SE] = useState<string>("0");
  const [b1S1Inv, setB1S1Inv] = useState<string>("0");
  const [b1S1CapGains, setB1S1CapGains] = useState<string>("0");
  const [b1S1Other, setB1S1Other] = useState<string>("0");
  const [b1S1Retirement, setB1S1Retirement] = useState<string>("10000");
  const [b1S1Hsa, setB1S1Hsa] = useState<string>("0");
  const [b1S1StudentLoan, setB1S1StudentLoan] = useState<string>("0");
  const [b1S1UseItemized, setB1S1UseItemized] = useState<boolean>(false);
  const [b1S1Mortgage, setB1S1Mortgage] = useState<string>("0");
  const [b1S1Salt, setB1S1Salt] = useState<string>("0");
  const [b1S1Charity, setB1S1Charity] = useState<string>("0");
  const [b1S1Children, setB1S1Children] = useState<string>("0");

  // Spouse 2
  const [b1S2W2, setB1S2W2] = useState<string>("45000");
  const [b1S2SE, setB1S2SE] = useState<string>("0");
  const [b1S2Inv, setB1S2Inv] = useState<string>("0");
  const [b1S2CapGains, setB1S2CapGains] = useState<string>("0");
  const [b1S2Other, setB1S2Other] = useState<string>("0");
  const [b1S2Retirement, setB1S2Retirement] = useState<string>("6000");
  const [b1S2Hsa, setB1S2Hsa] = useState<string>("0");
  const [b1S2StudentLoan, setB1S2StudentLoan] = useState<string>("0");
  const [b1S2UseItemized, setB1S2UseItemized] = useState<boolean>(false);
  const [b1S2Mortgage, setB1S2Mortgage] = useState<string>("0");
  const [b1S2Salt, setB1S2Salt] = useState<string>("0");
  const [b1S2Charity, setB1S2Charity] = useState<string>("0");
  const [b1S2Children, setB1S2Children] = useState<string>("0");

  const [savedBox1, setSavedBox1] = useState<SavedMarriageTaxItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);

  // =========================================================================
  // BOX 2: INCOME DISPARITY & BONUS SIMULATOR
  // =========================================================================
  const [b2HouseholdIncome, setB2HouseholdIncome] = useState<string>("150000");
  const [savedBox2, setSavedBox2] = useState<SavedMarriageTaxItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);

  // =========================================================================
  // BOX 3: SALT CAP MARRIAGE TRAP
  // =========================================================================
  const [b3S1Salt, setB3S1Salt] = useState<string>("12000");
  const [b3S2Salt, setB3S2Salt] = useState<string>("10000");
  const [savedBox3, setSavedBox3] = useState<SavedMarriageTaxItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);

  // =========================================================================
  // BOX 4: NIIT & MEDICARE SURTAX CLIFF
  // =========================================================================
  const [b4S1Income, setB4S1Income] = useState<string>("140000");
  const [b4S1Inv, setB4S1Inv] = useState<string>("20000");
  const [b4S2Income, setB4S2Income] = useState<string>("130000");
  const [b4S2Inv, setB4S2Inv] = useState<string>("15000");
  const [savedBox4, setSavedBox4] = useState<SavedMarriageTaxItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);

  // =========================================================================
  // BOX 5: PRE-TAX OPTIMIZATION SLIDER
  // =========================================================================
  const [b5PreTaxBoost, setB5PreTaxBoost] = useState<number>(5000);
  const [savedBox5, setSavedBox5] = useState<SavedMarriageTaxItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);

  // =========================================================================
  // BOX 6: MFJ VS MFS STRATEGY DEEP-DIVE
  // =========================================================================
  const [savedBox6, setSavedBox6] = useState<SavedMarriageTaxItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_mrg_box1");
      if (s1) setSavedBox1(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_mrg_box2");
      if (s2) setSavedBox2(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_mrg_box3");
      if (s3) setSavedBox3(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_mrg_box4");
      if (s4) setSavedBox4(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_mrg_box5");
      if (s5) setSavedBox5(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_mrg_box6");
      if (s6) setSavedBox6(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Box 1 Calculations
  const b1Calc = useMemo(() => {
    const s1: SpouseIncomeInputs = {
      salaryW2: parseFloat(b1S1W2) || 0,
      selfEmployment: parseFloat(b1S1SE) || 0,
      investmentIncome: parseFloat(b1S1Inv) || 0,
      longTermCapGains: parseFloat(b1S1CapGains) || 0,
      otherTaxableIncome: parseFloat(b1S1Other) || 0,
      preTaxRetirement: parseFloat(b1S1Retirement) || 0,
      hsaFsa: parseFloat(b1S1Hsa) || 0,
      studentLoanInterest: parseFloat(b1S1StudentLoan) || 0,
      otherAdjustments: 0,
      useItemizedDeduction: b1S1UseItemized,
      mortgageInterest: parseFloat(b1S1Mortgage) || 0,
      saltPaid: parseFloat(b1S1Salt) || 0,
      charitableGifts: parseFloat(b1S1Charity) || 0,
      medicalExpenses: 0,
      numChildrenCTC: parseFloat(b1S1Children) || 0,
      childCareExpenses: 0,
      isSelfEmployed: parseFloat(b1S1SE) > 0,
    };

    const s2: SpouseIncomeInputs = {
      salaryW2: parseFloat(b1S2W2) || 0,
      selfEmployment: parseFloat(b1S2SE) || 0,
      investmentIncome: parseFloat(b1S2Inv) || 0,
      longTermCapGains: parseFloat(b1S2CapGains) || 0,
      otherTaxableIncome: parseFloat(b1S2Other) || 0,
      preTaxRetirement: parseFloat(b1S2Retirement) || 0,
      hsaFsa: parseFloat(b1S2Hsa) || 0,
      studentLoanInterest: parseFloat(b1S2StudentLoan) || 0,
      otherAdjustments: 0,
      useItemizedDeduction: b1S2UseItemized,
      mortgageInterest: parseFloat(b1S2Mortgage) || 0,
      saltPaid: parseFloat(b1S2Salt) || 0,
      charitableGifts: parseFloat(b1S2Charity) || 0,
      medicalExpenses: 0,
      numChildrenCTC: parseFloat(b1S2Children) || 0,
      childCareExpenses: 0,
      isSelfEmployed: parseFloat(b1S2SE) > 0,
    };

    return calculateThreeWayComparison({
      taxYear: b1TaxYear,
      spouse1: s1,
      spouse2: s2,
      stateTaxRatePercent: parseFloat(b1StateTaxRate) || 0,
    });
  }, [
    b1TaxYear,
    b1StateTaxRate,
    b1S1W2,
    b1S1SE,
    b1S1Inv,
    b1S1CapGains,
    b1S1Other,
    b1S1Retirement,
    b1S1Hsa,
    b1S1StudentLoan,
    b1S1UseItemized,
    b1S1Mortgage,
    b1S1Salt,
    b1S1Charity,
    b1S1Children,
    b1S2W2,
    b1S2SE,
    b1S2Inv,
    b1S2CapGains,
    b1S2Other,
    b1S2Retirement,
    b1S2Hsa,
    b1S2StudentLoan,
    b1S2UseItemized,
    b1S2Mortgage,
    b1S2Salt,
    b1S2Charity,
    b1S2Children,
  ]);

  const handleExportBox1CSV = () => {
    const headers = [
      "Tax Metric",
      "Two Singles Combined",
      "Married Filing Jointly (MFJ)",
      "Married Filing Separately (MFS)",
      "Marriage Impact ($)",
    ];
    const rows = [
      ["Gross Income ($)", `$${b1Calc.twoSinglesCombined.grossIncome.toLocaleString()}`, `$${b1Calc.mfj.grossIncome.toLocaleString()}`, `$${b1Calc.mfsCombined.grossIncome.toLocaleString()}`, "$0"],
      ["Adjusted Gross Income (AGI)", `$${b1Calc.twoSinglesCombined.agi.toLocaleString()}`, `$${b1Calc.mfj.agi.toLocaleString()}`, `$${b1Calc.mfsCombined.agi.toLocaleString()}`, "$0"],
      ["Deductions (Std/Itemized)", `$${b1Calc.twoSinglesCombined.deductions.toLocaleString()}`, `$${b1Calc.mfj.deductions.toLocaleString()}`, `$${b1Calc.mfsCombined.deductions.toLocaleString()}`, `$${(b1Calc.mfj.deductions - b1Calc.twoSinglesCombined.deductions).toLocaleString()}`],
      ["Taxable Ordinary Income", `$${b1Calc.twoSinglesCombined.taxableOrdinaryIncome.toLocaleString()}`, `$${b1Calc.mfj.taxableOrdinaryIncome.toLocaleString()}`, `$${b1Calc.mfsCombined.taxableOrdinaryIncome.toLocaleString()}`, "-"],
      ["Federal Income Tax", `$${b1Calc.twoSinglesCombined.federalIncomeTax.toLocaleString()}`, `$${b1Calc.mfj.federalIncomeTax.toLocaleString()}`, `$${b1Calc.mfsCombined.federalIncomeTax.toLocaleString()}`, `$${(b1Calc.mfj.federalIncomeTax - b1Calc.twoSinglesCombined.federalIncomeTax).toLocaleString()}`],
      ["FICA / SE Taxes", `$${b1Calc.twoSinglesCombined.ficaAndSeTax.toLocaleString()}`, `$${b1Calc.mfj.ficaAndSeTax.toLocaleString()}`, `$${b1Calc.mfsCombined.ficaAndSeTax.toLocaleString()}`, "$0"],
      ["Net Investment Income Tax (3.8%)", `$${b1Calc.twoSinglesCombined.niitTax.toLocaleString()}`, `$${b1Calc.mfj.niitTax.toLocaleString()}`, `$${b1Calc.mfsCombined.niitTax.toLocaleString()}`, `+$${b1Calc.niitPenaltyAmount.toLocaleString()}`],
      ["Total Tax Liability", `$${b1Calc.twoSinglesCombined.totalTax.toLocaleString()}`, `$${b1Calc.mfj.totalTax.toLocaleString()}`, `$${b1Calc.mfsCombined.totalTax.toLocaleString()}`, `${b1Calc.differenceMFJvsSingles >= 0 ? "+" : ""}$${b1Calc.differenceMFJvsSingles.toLocaleString()}`],
      ["Effective Tax Rate", `${b1Calc.twoSinglesCombined.effectiveTaxRate}%`, `${b1Calc.mfj.effectiveTaxRate}%`, `${b1Calc.mfsCombined.effectiveTaxRate}%`, "-"],
    ];
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("marriage_tax_three_way_comparison.csv", csv);
  };

  const handleSaveBox1 = () => {
    const inputsStr = `Spouse 1: $${b1S1W2} | Spouse 2: $${b1S2W2} | State: ${b1StateTaxRate}% | Year: ${b1TaxYear}`;
    let primaryStr = "";
    if (b1Calc.isMarriageBonus) {
      primaryStr = `Marriage Bonus: Save $${Math.abs(b1Calc.differenceMFJvsSingles).toLocaleString()} / yr by filing together!`;
    } else if (b1Calc.isMarriagePenalty) {
      primaryStr = `Marriage Penalty: Pay $${b1Calc.differenceMFJvsSingles.toLocaleString()} more by filing together.`;
    } else {
      primaryStr = "Tax Neutral: Getting married results in equal federal tax liability.";
    }

    const detailsList = [
      primaryStr,
      `Two Singles Tax: $${b1Calc.twoSinglesCombined.totalTax.toLocaleString()} (Rate: ${b1Calc.twoSinglesCombined.effectiveTaxRate}%)`,
      `Married Filing Jointly (MFJ): $${b1Calc.mfj.totalTax.toLocaleString()} (Rate: ${b1Calc.mfj.effectiveTaxRate}%)`,
      `Married Filing Separately (MFS): $${b1Calc.mfsCombined.totalTax.toLocaleString()} (Rate: ${b1Calc.mfsCombined.effectiveTaxRate}%)`,
      `Combined Gross Income: $${b1Calc.mfj.grossIncome.toLocaleString()}`,
      `Combined AGI: $${b1Calc.mfj.agi.toLocaleString()}`,
    ];

    const newItem: SavedMarriageTaxItem = {
      id: Date.now().toString(),
      title: "Three-Way Marriage Tax Comparison",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox1.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_mrg_box1", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleDeleteSavedBox1 = (id: string) => {
    const updated = savedBox1.filter((item) => item.id !== id);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_mrg_box1", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox1 = () => {
    setSavedBox1([]);
    try {
      localStorage.removeItem("saved_mrg_box1");
    } catch (e) {}
  };

  // Box 2 Calculations (Income Disparity Simulation)
  const b2Sim = useMemo(() => {
    const total = parseFloat(b2HouseholdIncome) || 150000;
    return simulateIncomeRatios(total);
  }, [b2HouseholdIncome]);

  const handleSaveBox2 = () => {
    const inputsStr = `Household Income: $${b2HouseholdIncome}`;
    const primaryStr = `Single-Earner Bonus: +$${b2Sim[0]?.bonusOrPenalty.toLocaleString()} vs Equal-Earners: ${b2Sim[5]?.bonusOrPenalty >= 0 ? "+" : ""}$${b2Sim[5]?.bonusOrPenalty.toLocaleString()}`;

    const detailsList = [
      `100% / 0% Single-Earner Bonus: +$${b2Sim[0]?.bonusOrPenalty.toLocaleString()}`,
      `80% / 20% Income Split Bonus: +$${b2Sim[2]?.bonusOrPenalty.toLocaleString()}`,
      `50% / 50% Equal-Earners Impact: ${b2Sim[5]?.bonusOrPenalty >= 0 ? "+" : ""}$${b2Sim[5]?.bonusOrPenalty.toLocaleString()}`,
    ];

    const newItem: SavedMarriageTaxItem = {
      id: Date.now().toString(),
      title: "Income Disparity & Marriage Bonus Simulator",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox2.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_mrg_box2", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  const handleDeleteSavedBox2 = (id: string) => {
    const updated = savedBox2.filter((item) => item.id !== id);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_mrg_box2", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox2 = () => {
    setSavedBox2([]);
    try {
      localStorage.removeItem("saved_mrg_box2");
    } catch (e) {}
  };

  // Box 3 Calculations (SALT Cap Marriage Trap)
  const b3S1 = parseFloat(b3S1Salt) || 0;
  const b3S2 = parseFloat(b3S2Salt) || 0;
  const b3TotalSalt = b3S1 + b3S2;
  const b3SinglesAllowed = Math.min(10000, b3S1) + Math.min(10000, b3S2);
  const b3MfjAllowed = Math.min(10000, b3TotalSalt);
  const b3LostDeduction = Math.max(0, b3SinglesAllowed - b3MfjAllowed);
  const b3EstimatedPenalty = Math.round(b3LostDeduction * 0.24); // approx 24% marginal tax

  const handleSaveBox3 = () => {
    const inputsStr = `Spouse 1 SALT: $${b3S1Salt} | Spouse 2 SALT: $${b3S2Salt}`;
    const primaryStr = `Lost Deduction: $${b3LostDeduction.toLocaleString()} (Penalty: ~$${b3EstimatedPenalty.toLocaleString()}/yr)`;

    const detailsList = [
      `Two Singles Deductible SALT: $${b3SinglesAllowed.toLocaleString()} ($10k cap each)`,
      `Married Filing Jointly Deductible SALT: $${b3MfjAllowed.toLocaleString()} ($10k joint cap)`,
      `Lost Itemized Tax Deduction: $${b3LostDeduction.toLocaleString()}`,
      `Estimated Annual Marriage Tax Penalty from SALT Cap: ~$${b3EstimatedPenalty.toLocaleString()}`,
    ];

    const newItem: SavedMarriageTaxItem = {
      id: Date.now().toString(),
      title: "SALT Cap Marriage Trap Analyzer",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox3.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_mrg_box3", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  const handleDeleteSavedBox3 = (id: string) => {
    const updated = savedBox3.filter((item) => item.id !== id);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_mrg_box3", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox3 = () => {
    setSavedBox3([]);
    try {
      localStorage.removeItem("saved_mrg_box3");
    } catch (e) {}
  };

  // Box 4 Calculations (NIIT & Medicare Surtax Cliff)
  const b4S1 = parseFloat(b4S1Income) || 0;
  const b4S1I = parseFloat(b4S1Inv) || 0;
  const b4S2 = parseFloat(b4S2Income) || 0;
  const b4S2I = parseFloat(b4S2Inv) || 0;

  // Single thresholds: $200,000 each.
  const b4S1Niit = Math.min(b4S1I, Math.max(0, b4S1 + b4S1I - 200000)) * 0.038;
  const b4S2Niit = Math.min(b4S2I, Math.max(0, b4S2 + b4S2I - 200000)) * 0.038;
  const b4SinglesNiit = b4S1Niit + b4S2Niit;

  // MFJ threshold: $250,000 combined (Notice: NOT $400,000!)
  const b4CombinedIncome = b4S1 + b4S2;
  const b4CombinedInv = b4S1I + b4S2I;
  const b4CombinedMagi = b4CombinedIncome + b4CombinedInv;
  const b4MfjNiit = Math.min(b4CombinedInv, Math.max(0, b4CombinedMagi - 250000)) * 0.038;
  const b4NiitPenalty = Math.max(0, b4MfjNiit - b4SinglesNiit);

  const handleSaveBox4 = () => {
    const inputsStr = `Spouse 1: $${b4S1Income} (Inv: $${b4S1Inv}) | Spouse 2: $${b4S2Income} (Inv: $${b4S2Inv})`;
    const primaryStr = `NIIT Penalty: $${Math.round(b4NiitPenalty).toLocaleString()} / yr (MFJ Threshold: $250k vs Singles: $400k combined)`;

    const detailsList = [
      `Two Singles Combined NIIT: $${Math.round(b4SinglesNiit).toLocaleString()}`,
      `Married Filing Jointly (MFJ) NIIT: $${Math.round(b4MfjNiit).toLocaleString()}`,
      `Net Investment Income Tax (3.8%) Marriage Penalty: +$${Math.round(b4NiitPenalty).toLocaleString()}`,
    ];

    const newItem: SavedMarriageTaxItem = {
      id: Date.now().toString(),
      title: "NIIT & Medicare Surtax Cliff Analyzer",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox4.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_mrg_box4", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  const handleDeleteSavedBox4 = (id: string) => {
    const updated = savedBox4.filter((item) => item.id !== id);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_mrg_box4", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox4 = () => {
    setSavedBox4([]);
    try {
      localStorage.removeItem("saved_mrg_box4");
    } catch (e) {}
  };

  // Box 5 Calculations (Pre-Tax Optimizer)
  const b5EstimatedSavings = Math.round(b5PreTaxBoost * 0.24);

  const handleSaveBox5 = () => {
    const inputsStr = `Additional Pre-Tax Contribution: $${b5PreTaxBoost.toLocaleString()}`;
    const primaryStr = `Tax Savings: ~$${b5EstimatedSavings.toLocaleString()} / yr`;

    const detailsList = [
      `Additional 401(k) / HSA Pre-Tax Boost: $${b5PreTaxBoost.toLocaleString()}`,
      `Estimated Combined Tax Reduction: ~$${b5EstimatedSavings.toLocaleString()} / yr`,
    ];

    const newItem: SavedMarriageTaxItem = {
      id: Date.now().toString(),
      title: "Pre-Tax Penalty Mitigation Slider",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox5.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_mrg_box5", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  const handleDeleteSavedBox5 = (id: string) => {
    const updated = savedBox5.filter((item) => item.id !== id);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_mrg_box5", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox5 = () => {
    setSavedBox5([]);
    try {
      localStorage.removeItem("saved_mrg_box5");
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* =========================================================================
          BOX 1: CORE THREE-WAY MARRIAGE TAX CALCULATOR
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Marriage Tax Calculator — Penalty vs. Bonus Three-Way Comparison</span>
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
          {/* HERO BONUS / PENALTY STATUS BANNER */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans ${
              b1Calc.isMarriageBonus
                ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                : b1Calc.isMarriagePenalty
                ? "bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200"
                : "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200"
            }`}
          >
            <div className="flex items-center gap-3">
              {b1Calc.isMarriageBonus ? (
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              ) : b1Calc.isMarriagePenalty ? (
                <div className="w-9 h-9 rounded-full bg-amber-600 text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
              )}

              <div>
                <span className="text-sm font-extrabold block">
                  {b1Calc.isMarriageBonus
                    ? `Marriage Bonus: You save $${Math.abs(b1Calc.differenceMFJvsSingles).toLocaleString()} / year by filing jointly!`
                    : b1Calc.isMarriagePenalty
                    ? `Marriage Penalty: You pay $${b1Calc.differenceMFJvsSingles.toLocaleString()} more in taxes by filing jointly.`
                    : "Tax Neutral: Getting married has negligible impact on your federal tax bracket."}
                </span>
                <p className="text-[11px] opacity-90">
                  {b1Calc.isMarriageBonus
                    ? "Your income disparity allows the higher earner's income to be taxed in lower joint brackets."
                    : b1Calc.isMarriagePenalty
                    ? "Dual high incomes, compressed joint brackets, or surtax thresholds increase your combined liability."
                    : "Your proportional incomes keep your effective combined tax rate identical."}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] uppercase font-bold block opacity-75">MFJ vs. Two Singles</span>
              <span className="text-xl font-extrabold tabular-nums">
                {b1Calc.differenceMFJvsSingles < 0
                  ? `-$${Math.abs(b1Calc.differenceMFJvsSingles).toLocaleString()}`
                  : `+$${b1Calc.differenceMFJvsSingles.toLocaleString()}`}
              </span>
            </div>
          </div>

          {/* DUAL SPOUSE INPUTS SIDE BY SIDE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SPOUSE 1 */}
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Spouse 1 Financial Profile
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">W-2 Salary ($)</label>
                  <input
                    type="number"
                    step={1000}
                    value={b1S1W2}
                    onChange={(e) => setB1S1W2(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">401(k) / IRA ($)</label>
                  <input
                    type="number"
                    step={500}
                    value={b1S1Retirement}
                    onChange={(e) => setB1S1Retirement(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Investment Income ($)</label>
                  <input
                    type="number"
                    step={500}
                    value={b1S1Inv}
                    onChange={(e) => setB1S1Inv(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Cap Gains ($)</label>
                  <input
                    type="number"
                    step={500}
                    value={b1S1CapGains}
                    onChange={(e) => setB1S1CapGains(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">SALT Paid ($)</label>
                  <input
                    type="number"
                    step={500}
                    value={b1S1Salt}
                    onChange={(e) => setB1S1Salt(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Children (CTC)</label>
                  <input
                    type="number"
                    min={0}
                    value={b1S1Children}
                    onChange={(e) => setB1S1Children(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            {/* SPOUSE 2 */}
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Spouse 2 Financial Profile
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">W-2 Salary ($)</label>
                  <input
                    type="number"
                    step={1000}
                    value={b1S2W2}
                    onChange={(e) => setB1S2W2(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">401(k) / IRA ($)</label>
                  <input
                    type="number"
                    step={500}
                    value={b1S2Retirement}
                    onChange={(e) => setB1S2Retirement(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Investment Income ($)</label>
                  <input
                    type="number"
                    step={500}
                    value={b1S2Inv}
                    onChange={(e) => setB1S2Inv(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Cap Gains ($)</label>
                  <input
                    type="number"
                    step={500}
                    value={b1S2CapGains}
                    onChange={(e) => setB1S2CapGains(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">SALT Paid ($)</label>
                  <input
                    type="number"
                    step={500}
                    value={b1S2Salt}
                    onChange={(e) => setB1S2Salt(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Children (CTC)</label>
                  <input
                    type="number"
                    min={0}
                    value={b1S2Children}
                    onChange={(e) => setB1S2Children(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* THREE-WAY COMPARISON MATRIX TABLE */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Three-Way Tax Comparison Matrix
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

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-center border-collapse font-sans tabular-nums">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-2 text-left">Tax Parameter</th>
                    <th className="p-2 text-right">Two Singles Combined</th>
                    <th className="p-2 text-right text-blue-600 dark:text-blue-400">Married Filing Jointly (MFJ)</th>
                    <th className="p-2 text-right">Married Filing Separately (MFS)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-1.5 text-left font-bold text-slate-700 dark:text-slate-300">Gross Income</td>
                    <td className="p-1.5 text-right font-medium">${b1Calc.twoSinglesCombined.grossIncome.toLocaleString()}</td>
                    <td className="p-1.5 text-right font-extrabold text-blue-600 dark:text-blue-400">${b1Calc.mfj.grossIncome.toLocaleString()}</td>
                    <td className="p-1.5 text-right font-medium">${b1Calc.mfsCombined.grossIncome.toLocaleString()}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-1.5 text-left font-bold text-slate-700 dark:text-slate-300">Deductions (Std / Itemized)</td>
                    <td className="p-1.5 text-right font-medium">${b1Calc.twoSinglesCombined.deductions.toLocaleString()}</td>
                    <td className="p-1.5 text-right font-extrabold text-blue-600 dark:text-blue-400">${b1Calc.mfj.deductions.toLocaleString()}</td>
                    <td className="p-1.5 text-right font-medium">${b1Calc.mfsCombined.deductions.toLocaleString()}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-1.5 text-left font-bold text-slate-700 dark:text-slate-300">Taxable Ordinary Income</td>
                    <td className="p-1.5 text-right font-medium">${b1Calc.twoSinglesCombined.taxableOrdinaryIncome.toLocaleString()}</td>
                    <td className="p-1.5 text-right font-extrabold text-blue-600 dark:text-blue-400">${b1Calc.mfj.taxableOrdinaryIncome.toLocaleString()}</td>
                    <td className="p-1.5 text-right font-medium">${b1Calc.mfsCombined.taxableOrdinaryIncome.toLocaleString()}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-1.5 text-left font-bold text-slate-700 dark:text-slate-300">Base Federal Income Tax</td>
                    <td className="p-1.5 text-right font-medium">${b1Calc.twoSinglesCombined.federalIncomeTax.toLocaleString()}</td>
                    <td className="p-1.5 text-right font-extrabold text-blue-600 dark:text-blue-400">${b1Calc.mfj.federalIncomeTax.toLocaleString()}</td>
                    <td className="p-1.5 text-right font-medium">${b1Calc.mfsCombined.federalIncomeTax.toLocaleString()}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-1.5 text-left font-bold text-slate-700 dark:text-slate-300">FICA &amp; SE Taxes</td>
                    <td className="p-1.5 text-right font-medium">${b1Calc.twoSinglesCombined.ficaAndSeTax.toLocaleString()}</td>
                    <td className="p-1.5 text-right font-extrabold text-blue-600 dark:text-blue-400">${b1Calc.mfj.ficaAndSeTax.toLocaleString()}</td>
                    <td className="p-1.5 text-right font-medium">${b1Calc.mfsCombined.ficaAndSeTax.toLocaleString()}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 bg-slate-50/70 dark:bg-slate-800/70">
                    <td className="p-2 text-left font-extrabold text-slate-900 dark:text-slate-100">Total Combined Tax Liability</td>
                    <td className="p-2 text-right font-extrabold text-slate-900 dark:text-slate-100">${b1Calc.twoSinglesCombined.totalTax.toLocaleString()}</td>
                    <td className={`p-2 text-right font-black ${b1Calc.isMarriageBonus ? "text-emerald-600 dark:text-emerald-400" : b1Calc.isMarriagePenalty ? "text-amber-600 dark:text-amber-400" : "text-blue-600"}`}>
                      ${b1Calc.mfj.totalTax.toLocaleString()}
                    </td>
                    <td className="p-2 text-right font-extrabold text-slate-900 dark:text-slate-100">${b1Calc.mfsCombined.totalTax.toLocaleString()}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-1.5 text-left font-bold text-slate-700 dark:text-slate-300">Effective Combined Tax Rate</td>
                    <td className="p-1.5 text-right font-medium">{b1Calc.twoSinglesCombined.effectiveTaxRate}%</td>
                    <td className="p-1.5 text-right font-bold text-blue-600 dark:text-blue-400">{b1Calc.mfj.effectiveTaxRate}%</td>
                    <td className="p-1.5 text-right font-medium">{b1Calc.mfsCombined.effectiveTaxRate}%</td>
                  </tr>
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
                  <span>Saved Marriage Tax Calculations ({savedBox1.length})</span>
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
          BOX 2: INCOME DISPARITY & MARRIAGE BONUS SIMULATOR
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Income Disparity &amp; Marriage Bonus Curve Simulator</span>
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
            <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Combined Household Income
              </span>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Total Household Income ($)
                </label>
                <input
                  type="number"
                  step={10000}
                  value={b2HouseholdIncome}
                  onChange={(e) => setB2HouseholdIncome(e.target.value)}
                  className={input3DClass}
                />
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                A marriage bonus occurs when one spouse earns significantly more than the other, shifting high income into the lower married tax brackets. When spouses earn equal incomes, the bonus shrinks to zero.
              </p>
            </div>

            <div className="lg:col-span-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              <table className="w-full text-center border-collapse font-sans tabular-nums">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-2 text-left">Income Split</th>
                    <th className="p-2">Spouse 1 ($)</th>
                    <th className="p-2">Spouse 2 ($)</th>
                    <th className="p-2">Two Singles Tax</th>
                    <th className="p-2">MFJ Tax</th>
                    <th className="p-2 font-black text-blue-600 dark:text-blue-400">Marriage Bonus / Penalty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {b2Sim.map((pt, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-1.5 text-left font-bold text-slate-700 dark:text-slate-300">
                        {pt.spouse1Percent}% / {pt.spouse2Percent}%
                      </td>
                      <td className="p-1.5">${pt.spouse1Income.toLocaleString()}</td>
                      <td className="p-1.5">${pt.spouse2Income.toLocaleString()}</td>
                      <td className="p-1.5 text-slate-600">${pt.twoSinglesTax.toLocaleString()}</td>
                      <td className="p-1.5 text-slate-600">${pt.mfjTax.toLocaleString()}</td>
                      <td className={`p-1.5 font-extrabold ${pt.bonusOrPenalty > 0 ? "text-emerald-600 dark:text-emerald-400" : pt.bonusOrPenalty < 0 ? "text-amber-600 dark:text-amber-400" : "text-slate-600"}`}>
                        {pt.bonusOrPenalty > 0 ? `+$${pt.bonusOrPenalty.toLocaleString()} Bonus` : pt.bonusOrPenalty < 0 ? `-$${Math.abs(pt.bonusOrPenalty).toLocaleString()} Penalty` : "$0 (Neutral)"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 2 */}
          {savedBox2.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Income Ratio Simulations ({savedBox2.length})</span>
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
          BOX 3: SALT CAP MARRIAGE TRAP ANALYZER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>The $10,000 SALT Cap Marriage Trap Analyzer</span>
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
                State &amp; Local Tax (SALT) Inputs
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Spouse 1 SALT Paid ($)
                  </label>
                  <input
                    type="number"
                    step={1000}
                    value={b3S1Salt}
                    onChange={(e) => setB3S1Salt(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Spouse 2 SALT Paid ($)
                  </label>
                  <input
                    type="number"
                    step={1000}
                    value={b3S2Salt}
                    onChange={(e) => setB3S2Salt(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Two single taxpayers can deduct up to $10,000 <em>each</em> ($20,000 combined). When married filing jointly, the IRS limits the combined couple to the same single $10,000 cap, creating an automatic deduction haircut.
              </p>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Lost Itemized Tax Deduction
                  </span>
                  <span className="text-2xl font-extrabold text-amber-600 font-sans tabular-nums">
                    -${b3LostDeduction.toLocaleString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Estimated Penalty</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 inline-block font-sans tabular-nums">
                    +${b3EstimatedPenalty.toLocaleString()} / yr
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Two Singles SALT Limit</span>
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold">${b3SinglesAllowed.toLocaleString()}</span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">MFJ Joint Limit</span>
                  <span className="text-amber-600 font-extrabold">${b3MfjAllowed.toLocaleString()}</span>
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
                  <span>Saved SALT Cap Calculations ({savedBox3.length})</span>
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
          BOX 4: NIIT & MEDICARE SURTAX CLIFF ANALYZER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Net Investment Income Tax (NIIT 3.8%) &amp; Surtax Cliff</span>
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
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                High-Earner &amp; Investment Profiles
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Spouse 1 Earned ($)</label>
                  <input
                    type="number"
                    step={5000}
                    value={b4S1Income}
                    onChange={(e) => setB4S1Income(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Spouse 1 Invest ($)</label>
                  <input
                    type="number"
                    step={1000}
                    value={b4S1Inv}
                    onChange={(e) => setB4S1Inv(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Spouse 2 Earned ($)</label>
                  <input
                    type="number"
                    step={5000}
                    value={b4S2Income}
                    onChange={(e) => setB4S2Income(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Spouse 2 Invest ($)</label>
                  <input
                    type="number"
                    step={1000}
                    value={b4S2Inv}
                    onChange={(e) => setB4S2Inv(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    NIIT 3.8% Surtax Penalty
                  </span>
                  <span className="text-2xl font-extrabold text-amber-600 font-sans tabular-nums">
                    +${Math.round(b4NiitPenalty).toLocaleString()} <span className="text-xs font-medium text-slate-400">/ yr</span>
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">MFJ Threshold</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 inline-block font-sans tabular-nums">
                    $250,000 MFJ (vs $400k singles)
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                The 3.8% Net Investment Income Tax and 0.9% Additional Medicare Tax thresholds are <strong>$200,000 for single filers ($400,000 combined)</strong>, but only <strong>$250,000 for married joint filers</strong>, creating a $150,000 threshold penalty for dual high earners.
              </p>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 4 */}
          {savedBox4.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Surtax Calculations ({savedBox4.length})</span>
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
          BOX 5: PRE-TAX CONTRIBUTION OPTIMIZATION SLIDER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Pre-Tax Penalty Mitigation Slider (401k &amp; HSA Boost)</span>
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
                Adjust Pre-Tax Contributions
              </span>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Additional 401(k) / HSA Contribution:</span>
                  <span className="text-blue-600 font-sans tabular-nums">${b5PreTaxBoost.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={23000}
                  step={500}
                  value={b5PreTaxBoost}
                  onChange={(e) => setB5PreTaxBoost(parseFloat(e.target.value) || 0)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-sans">
                  <span>$0</span>
                  <span>$11,500</span>
                  <span>$23,000 (Max 401k)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Estimated Tax Savings
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums">
                    +${b5EstimatedSavings.toLocaleString()} <span className="text-xs font-medium text-slate-400">/ yr</span>
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">AGI Reduction</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 inline-block font-sans tabular-nums">
                    -${b5PreTaxBoost.toLocaleString()} AGI
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Maxing out pre-tax traditional 401(k), 403(b), and HSA accounts directly reduces your combined Modified Adjusted Gross Income (MAGI), helping eliminate surtax cliffs and phaseouts.
              </p>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 5 */}
          {savedBox5.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Pre-Tax Optimizations ({savedBox5.length})</span>
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
    </div>
  );
}

export default MarriageTaxCalculator;
