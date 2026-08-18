"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  Download,
  DollarSign,
  ShieldCheck,
  TrendingUp,
  Landmark,
  Building,
  Users,
  Percent,
  CheckCircle2,
  AlertTriangle,
  Gift,
  FileSpreadsheet,
} from "lucide-react";
import {
  calculateFederalEstateTax,
  calculateStateDeathTax,
  forecastSunsetScenarios,
  calculateTrustAndGifting,
  calculateStepUpInBasis,
  calculateGstTax,
  STATE_DEATH_TAX_SCHEDULES,
} from "@/app/calculators/estate-tax-calculator/calculator";
import {
  EstateFilingStatus,
  SavedEstateTaxItem,
} from "@/app/calculators/estate-tax-calculator/types";

export function EstateTaxCalculator() {
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
  // BOX 1: CORE FEDERAL ESTATE TAX CALCULATOR
  // =========================================================================
  const [b1TaxYear, setB1TaxYear] = useState<"2026" | "2025" | "2024">("2026");
  const [b1FilingStatus, setB1FilingStatus] = useState<EstateFilingStatus>("single");

  // Assets
  const [b1RealEstate, setB1RealEstate] = useState<string>("8000000");
  const [b1Stocks, setB1Stocks] = useState<string>("5000000");
  const [b1Cash, setB1Cash] = useState<string>("1000000");
  const [b1Retirement, setB1Retirement] = useState<string>("1000000");
  const [b1Business, setB1Business] = useState<string>("0");
  const [b1LifeInsurance, setB1LifeInsurance] = useState<string>("1000000");
  const [b1Personal, setB1Personal] = useState<string>("0");

  // Deductions & Liabilities
  const [b1Debts, setB1Debts] = useState<string>("400000");
  const [b1Admin, setB1Admin] = useState<string>("100000");
  const [b1Marital, setB1Marital] = useState<string>("0");
  const [b1Charity, setB1Charity] = useState<string>("500000");
  const [b1PriorGifts, setB1PriorGifts] = useState<string>("0");

  const [savedBox1, setSavedBox1] = useState<SavedEstateTaxItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);

  // =========================================================================
  // BOX 2: STATE ESTATE & INHERITANCE TAX
  // =========================================================================
  const [b2StateCode, setB2StateCode] = useState<string>("WA");
  const [b2TaxableEstate, setB2TaxableEstate] = useState<string>("15000000");
  const [b2HeirClass, setB2HeirClass] = useState<"classA" | "classB" | "classC">("classA");

  const [savedBox2, setSavedBox2] = useState<SavedEstateTaxItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);

  // =========================================================================
  // BOX 3: SUNSET & POLICY SHIFT FORECASTER
  // =========================================================================
  const [b3TaxableEstate, setB3TaxableEstate] = useState<string>("15000000");
  const [savedBox3, setSavedBox3] = useState<SavedEstateTaxItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);

  // =========================================================================
  // BOX 4: TRUST & ANNUAL GIFTING STRATEGIES (ILIT)
  // =========================================================================
  const [b4LifeInsurance, setB4LifeInsurance] = useState<string>("3000000");
  const [b4Beneficiaries, setB4Beneficiaries] = useState<string>("4");
  const [b4Years, setB4Years] = useState<string>("10");
  const [b4GiftPerPerson, setB4GiftPerPerson] = useState<string>("19000");

  const [savedBox4, setSavedBox4] = useState<SavedEstateTaxItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);

  // =========================================================================
  // BOX 5: STEP-UP IN BASIS VS LIFETIME GIFTING
  // =========================================================================
  const [b5Fmv, setB5Fmv] = useState<string>("2000000");
  const [b5Basis, setB5Basis] = useState<string>("400000");
  const [b5GainRate, setB5GainRate] = useState<string>("23.8");

  const [savedBox5, setSavedBox5] = useState<SavedEstateTaxItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);

  // =========================================================================
  // BOX 6: GENERATION-SKIPPING TRANSFER (GST) TAX
  // =========================================================================
  const [b6Transfer, setB6Transfer] = useState<string>("18000000");
  const [b6GstExemption, setB6GstExemption] = useState<string>("15000000");

  const [savedBox6, setSavedBox6] = useState<SavedEstateTaxItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_est_box1");
      if (s1) setSavedBox1(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_est_box2");
      if (s2) setSavedBox2(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_est_box3");
      if (s3) setSavedBox3(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_est_box4");
      if (s4) setSavedBox4(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_est_box5");
      if (s5) setSavedBox5(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_est_box6");
      if (s6) setSavedBox6(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Box 1 Calculations
  const b1Calc = useMemo(() => {
    return calculateFederalEstateTax({
      taxYear: b1TaxYear,
      filingStatus: b1FilingStatus,
      assets: {
        realEstate: parseFloat(b1RealEstate) || 0,
        stocksAndInvestments: parseFloat(b1Stocks) || 0,
        cashAndBankAccounts: parseFloat(b1Cash) || 0,
        retirementAccounts: parseFloat(b1Retirement) || 0,
        businessEquity: parseFloat(b1Business) || 0,
        lifeInsuranceBenefit: parseFloat(b1LifeInsurance) || 0,
        vehiclesAndPersonalProperty: parseFloat(b1Personal) || 0,
      },
      deductions: {
        debtsAndMortgages: parseFloat(b1Debts) || 0,
        funeralAndAdminExpenses: parseFloat(b1Admin) || 0,
        maritalDeduction: parseFloat(b1Marital) || 0,
        charitableBequests: parseFloat(b1Charity) || 0,
        priorTaxableGifts: parseFloat(b1PriorGifts) || 0,
        deceasedSpousalUnusedExemption: 0,
      },
    });
  }, [
    b1TaxYear,
    b1FilingStatus,
    b1RealEstate,
    b1Stocks,
    b1Cash,
    b1Retirement,
    b1Business,
    b1LifeInsurance,
    b1Personal,
    b1Debts,
    b1Admin,
    b1Marital,
    b1Charity,
    b1PriorGifts,
  ]);

  const handleExportBox1CSV = () => {
    const headers = ["Estate Pro-Forma Line Item", "Amount ($)", "Description"];
    const rows = [
      ["Total Gross Estate", `$${b1Calc.totalGrossEstate.toLocaleString()}`, "Gross Fair Market Value of All Assets"],
      ["Total Debts & Administrative Costs", `-$${b1Calc.totalDebtsAndAdmin.toLocaleString()}`, "Mortgages, liabilities & probate fees"],
      ["Adjusted Gross Estate (AGE)", `$${b1Calc.adjustedGrossEstate.toLocaleString()}`, "Gross Assets minus Debts/Admin"],
      ["Marital & Charitable Deductions", `-$${b1Calc.totalMaritalAndCharity.toLocaleString()}`, "100% tax-free transfers to spouse & 501(c)(3)"],
      ["Net Taxable Estate", `$${b1Calc.netTaxableEstate.toLocaleString()}`, "Estate base subject to taxation"],
      ["Effective Lifetime Exemption", `$${b1Calc.effectiveExemption.toLocaleString()}`, `${b1FilingStatus === "married_portability" ? "Portability Doubled" : "Single Threshold"}`],
      ["Net Federal Estate Tax Liability", `$${b1Calc.netFederalEstateTax.toLocaleString()}`, `Effective Rate: ${b1Calc.effectiveTaxRatePercent}%`],
      ["Net Wealth Transferred to Heirs", `$${b1Calc.netWealthTransferredToHeirs.toLocaleString()}`, "Net distributed to beneficiaries"],
    ];
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("federal_estate_tax_proforma.csv", csv);
  };

  const handleSaveBox1 = () => {
    const inputsStr = `Gross: $${b1Calc.totalGrossEstate.toLocaleString()} | Taxable: $${b1Calc.netTaxableEstate.toLocaleString()} | ${b1FilingStatus} (${b1TaxYear})`;
    const primaryStr = `Federal Estate Tax: $${b1Calc.netFederalEstateTax.toLocaleString()} (Rate: ${b1Calc.effectiveTaxRatePercent}%) | Net to Heirs: $${b1Calc.netWealthTransferredToHeirs.toLocaleString()}`;

    const detailsList = [
      `Total Gross Estate: $${b1Calc.totalGrossEstate.toLocaleString()}`,
      `Total Debts & Admin Costs: $${b1Calc.totalDebtsAndAdmin.toLocaleString()}`,
      `Net Taxable Estate: $${b1Calc.netTaxableEstate.toLocaleString()}`,
      `Effective Lifetime Exemption: $${b1Calc.effectiveExemption.toLocaleString()}`,
      `Net Federal Estate Tax (40% Bracket): $${b1Calc.netFederalEstateTax.toLocaleString()}`,
      `Remaining Unused Exemption: $${b1Calc.remainingUnusedExemption.toLocaleString()}`,
      `Net Wealth Transferred to Heirs: $${b1Calc.netWealthTransferredToHeirs.toLocaleString()}`,
    ];

    const newItem: SavedEstateTaxItem = {
      id: Date.now().toString(),
      title: "Federal Estate Tax Pro-Forma",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox1.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_est_box1", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleDeleteSavedBox1 = (id: string) => {
    const updated = savedBox1.filter((item) => item.id !== id);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_est_box1", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox1 = () => {
    setSavedBox1([]);
    try {
      localStorage.removeItem("saved_est_box1");
    } catch (e) {}
  };

  // Box 2 Calculations (State Death Tax)
  const b2Calc = useMemo(() => {
    const taxable = parseFloat(b2TaxableEstate) || b1Calc.netTaxableEstate || 15000000;
    return calculateStateDeathTax(
      {
        taxableEstate: taxable,
        stateCode: b2StateCode,
        heirRelationshipClass: b2HeirClass,
      },
      b1Calc.netFederalEstateTax
    );
  }, [b2StateCode, b2TaxableEstate, b2HeirClass, b1Calc.netFederalEstateTax, b1Calc.netTaxableEstate]);

  const handleSaveBox2 = () => {
    const inputsStr = `State: ${b2StateCode} | Taxable Estate: $${b2TaxableEstate} | Heir: ${b2HeirClass}`;
    const primaryStr = `State Death Tax: $${b2Calc.totalStateDeathTax.toLocaleString()} | Combined Tax: $${b2Calc.combinedFederalAndStateTax.toLocaleString()}`;

    const detailsList = [
      `State Jurisdiction: ${b2Calc.stateName}`,
      `State Estate Tax: $${b2Calc.stateEstateTaxAmount.toLocaleString()}`,
      `State Inheritance Tax: $${b2Calc.stateInheritanceTaxAmount.toLocaleString()}`,
      `Total State Death Tax: $${b2Calc.totalStateDeathTax.toLocaleString()}`,
      `Combined Federal & State Death Tax: $${b2Calc.combinedFederalAndStateTax.toLocaleString()}`,
      `Combined Effective Rate: ${b2Calc.combinedEffectiveRatePercent}%`,
    ];

    const newItem: SavedEstateTaxItem = {
      id: Date.now().toString(),
      title: "State Estate & Inheritance Tax Estimator",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox2.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_est_box2", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  const handleDeleteSavedBox2 = (id: string) => {
    const updated = savedBox2.filter((item) => item.id !== id);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_est_box2", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox2 = () => {
    setSavedBox2([]);
    try {
      localStorage.removeItem("saved_est_box2");
    } catch (e) {}
  };

  // Box 3 Calculations (Sunset Forecaster)
  const b3Calc = useMemo(() => {
    const taxable = parseFloat(b3TaxableEstate) || b1Calc.netTaxableEstate || 15000000;
    return forecastSunsetScenarios(taxable);
  }, [b3TaxableEstate, b1Calc.netTaxableEstate]);

  const handleSaveBox3 = () => {
    const inputsStr = `Taxable Estate: $${b3TaxableEstate}`;
    const primaryStr = `Current: $${b3Calc[0]?.federalTaxLiability.toLocaleString()} vs Post-Sunset: $${b3Calc[1]?.federalTaxLiability.toLocaleString()} (+$${b3Calc[1]?.additionalTaxVsCurrent.toLocaleString()})`;

    const detailsList = [
      `Current 2026 Law ($15M Exemption): $${b3Calc[0]?.federalTaxLiability.toLocaleString()}`,
      `Post-Sunset ($7.0M Exemption): $${b3Calc[1]?.federalTaxLiability.toLocaleString()} (+$${b3Calc[1]?.additionalTaxVsCurrent.toLocaleString()} Tax Spike)`,
      `Progressive Reform ($3.5M Exemption): $${b3Calc[2]?.federalTaxLiability.toLocaleString()} (+$${b3Calc[2]?.additionalTaxVsCurrent.toLocaleString()})`,
    ];

    const newItem: SavedEstateTaxItem = {
      id: Date.now().toString(),
      title: "Exemption Sunset & Policy Shift Forecaster",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox3.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_est_box3", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  const handleDeleteSavedBox3 = (id: string) => {
    const updated = savedBox3.filter((item) => item.id !== id);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_est_box3", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox3 = () => {
    setSavedBox3([]);
    try {
      localStorage.removeItem("saved_est_box3");
    } catch (e) {}
  };

  // Box 4 Calculations (Trust & Gifting)
  const b4Calc = useMemo(() => {
    return calculateTrustAndGifting({
      lifeInsuranceBenefit: parseFloat(b4LifeInsurance) || 0,
      numGiftingBeneficiaries: parseFloat(b4Beneficiaries) || 0,
      giftingYears: parseFloat(b4Years) || 1,
      annualGiftPerBeneficiary: parseFloat(b4GiftPerPerson) || 19000,
      taxableEstateValue: b1Calc.netTaxableEstate,
    });
  }, [b4LifeInsurance, b4Beneficiaries, b4Years, b4GiftPerPerson, b1Calc.netTaxableEstate]);

  const handleSaveBox4 = () => {
    const inputsStr = `ILIT Insurance: $${b4LifeInsurance} | Gifting: ${b4Beneficiaries} heirs x ${b4Years} yrs x $${b4GiftPerPerson}`;
    const primaryStr = `Total Wealth Sheltered: $${b4Calc.totalWealthSheltered.toLocaleString()} | Total Taxes Saved: $${b4Calc.totalTaxesSaved.toLocaleString()}`;

    const detailsList = [
      `ILIT Life Insurance Sheltered: $${parseFloat(b4LifeInsurance).toLocaleString()} (Tax Saved: $${b4Calc.ilitTaxSavings.toLocaleString()})`,
      `Annual Gifting Wealth Removed: $${b4Calc.totalWealthGiftedTaxFree.toLocaleString()} (Tax Saved: $${b4Calc.giftingEstateTaxSavings.toLocaleString()})`,
      `Total Estate Tax Preserved for Heirs: $${b4Calc.totalTaxesSaved.toLocaleString()}`,
    ];

    const newItem: SavedEstateTaxItem = {
      id: Date.now().toString(),
      title: "ILIT & Annual Gifting Strategy Optimizer",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox4.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_est_box4", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  const handleDeleteSavedBox4 = (id: string) => {
    const updated = savedBox4.filter((item) => item.id !== id);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_est_box4", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox4 = () => {
    setSavedBox4([]);
    try {
      localStorage.removeItem("saved_est_box4");
    } catch (e) {}
  };

  // Box 5 Calculations (Step-Up in Basis)
  const b5Calc = useMemo(() => {
    return calculateStepUpInBasis({
      assetFairMarketValue: parseFloat(b5Fmv) || 0,
      originalCostBasis: parseFloat(b5Basis) || 0,
      capitalGainsTaxRatePercent: parseFloat(b5GainRate) || 23.8,
    });
  }, [b5Fmv, b5Basis, b5GainRate]);

  const handleSaveBox5 = () => {
    const inputsStr = `Asset FMV: $${b5Fmv} | Basis: $${b5Basis} | Cap Gains: ${b5GainRate}%`;
    const primaryStr = `Step-Up Tax Savings: $${b5Calc.stepUpTaxBenefitSavings.toLocaleString()} (New Basis: $${b5Calc.bequestAtDeathNewBasis.toLocaleString()})`;

    const detailsList = [
      `Unrealized Appreciation: $${b5Calc.unrealizedAppreciation.toLocaleString()}`,
      `Bequest at Death (New Stepped-Up Basis): $${b5Calc.bequestAtDeathNewBasis.toLocaleString()} (Capital Gains Tax = $0)`,
      `Lifetime Gift (Carryover Basis): $${b5Calc.lifetimeGiftCarryoverBasis.toLocaleString()} (Potential Tax: $${b5Calc.lifetimeGiftPotentialCapitalGainsTax.toLocaleString()})`,
      `Tax Elimination Advantage via Step-Up: $${b5Calc.stepUpTaxBenefitSavings.toLocaleString()}`,
    ];

    const newItem: SavedEstateTaxItem = {
      id: Date.now().toString(),
      title: "Step-Up in Basis vs. Lifetime Gifting",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox5.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_est_box5", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  const handleDeleteSavedBox5 = (id: string) => {
    const updated = savedBox5.filter((item) => item.id !== id);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_est_box5", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox5 = () => {
    setSavedBox5([]);
    try {
      localStorage.removeItem("saved_est_box5");
    } catch (e) {}
  };

  // Box 6 Calculations (GST Tax)
  const b6Calc = useMemo(() => {
    return calculateGstTax({
      transferToGrandchildren: parseFloat(b6Transfer) || 0,
      availableGstExemption: parseFloat(b6GstExemption) || 15000000,
    });
  }, [b6Transfer, b6GstExemption]);

  const handleSaveBox6 = () => {
    const inputsStr = `Transfer: $${b6Transfer} | GST Exemption: $${b6GstExemption}`;
    const primaryStr = `GST Tax (40%): $${b6Calc.gstTaxLiability.toLocaleString()} | Net to Grandchildren: $${b6Calc.netTransferToGrandchildren.toLocaleString()}`;

    const detailsList = [
      `Total Direct Skip Transfer: $${parseFloat(b6Transfer).toLocaleString()}`,
      `Available GST Exemption: $${parseFloat(b6GstExemption).toLocaleString()}`,
      `Taxable GST Overhang: $${b6Calc.taxableSkipOverhang.toLocaleString()}`,
      `Flat 40% GST Tax Liability: $${b6Calc.gstTaxLiability.toLocaleString()}`,
      `Net Wealth Transferred to Skip Generation: $${b6Calc.netTransferToGrandchildren.toLocaleString()}`,
    ];

    const newItem: SavedEstateTaxItem = {
      id: Date.now().toString(),
      title: "Generation-Skipping Transfer (GST) Tax",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox6.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_est_box6", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  const handleDeleteSavedBox6 = (id: string) => {
    const updated = savedBox6.filter((item) => item.id !== id);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_est_box6", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox6 = () => {
    setSavedBox6([]);
    try {
      localStorage.removeItem("saved_est_box6");
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* =========================================================================
          BOX 1: COMPREHENSIVE FEDERAL ESTATE TAX CALCULATOR (CORE)
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Comprehensive Federal Estate Tax &amp; Asset Inventory Suite</span>
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
                Filing Status &amp; Gross Asset Inventory
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Tax Year / Baseline
                  </label>
                  <select
                    value={b1TaxYear}
                    onChange={(e) => setB1TaxYear(e.target.value as any)}
                    className={select3DClass}
                  >
                    <option value="2026">2026 ($15.00M Baseline)</option>
                    <option value="2025">2025 ($13.99M Baseline)</option>
                    <option value="2024">2024 ($13.61M Baseline)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Filing &amp; Marital Status
                  </label>
                  <select
                    value={b1FilingStatus}
                    onChange={(e) => setB1FilingStatus(e.target.value as any)}
                    className={select3DClass}
                  >
                    <option value="single">Single / Individual ($15M)</option>
                    <option value="married_portability">Married with Portability ($30M)</option>
                    <option value="surviving_spouse">Surviving Spouse with DSUE</option>
                  </select>
                </div>
              </div>

              {/* ASSET INVENTORY */}
              <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-extrabold uppercase text-slate-700 dark:text-slate-300 block">
                  Asset Breakdown ($)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Real Estate ($)</label>
                    <input
                      type="number"
                      step={500000}
                      value={b1RealEstate}
                      onChange={(e) => setB1RealEstate(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Stocks &amp; Brokerage ($)</label>
                    <input
                      type="number"
                      step={500000}
                      value={b1Stocks}
                      onChange={(e) => setB1Stocks(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Cash &amp; Bank CDs ($)</label>
                    <input
                      type="number"
                      step={100000}
                      value={b1Cash}
                      onChange={(e) => setB1Cash(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Retirement 401k/IRA ($)</label>
                    <input
                      type="number"
                      step={100000}
                      value={b1Retirement}
                      onChange={(e) => setB1Retirement(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Life Insurance (Owned) ($)</label>
                    <input
                      type="number"
                      step={250000}
                      value={b1LifeInsurance}
                      onChange={(e) => setB1LifeInsurance(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Business Equity ($)</label>
                    <input
                      type="number"
                      step={500000}
                      value={b1Business}
                      onChange={(e) => setB1Business(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                </div>
              </div>

              {/* DEDUCTIONS & LIABILITIES */}
              <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-extrabold uppercase text-slate-700 dark:text-slate-300 block">
                  Liabilities &amp; Deductions ($)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Mortgages &amp; Debts ($)</label>
                    <input
                      type="number"
                      step={100000}
                      value={b1Debts}
                      onChange={(e) => setB1Debts(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Admin &amp; Probate Fees ($)</label>
                    <input
                      type="number"
                      step={50000}
                      value={b1Admin}
                      onChange={(e) => setB1Admin(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Charitable Bequests ($)</label>
                    <input
                      type="number"
                      step={100000}
                      value={b1Charity}
                      onChange={(e) => setB1Charity(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Prior Lifetime Gifts ($)</label>
                    <input
                      type="number"
                      step={250000}
                      value={b1PriorGifts}
                      onChange={(e) => setB1PriorGifts(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT RESULTS */}
            <div className="lg:col-span-6 space-y-3">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Net Federal Estate Tax Due
                    </span>
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                      ${b1Calc.netFederalEstateTax.toLocaleString()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Effective Tax Rate</span>
                    <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 inline-block font-sans tabular-nums">
                      {b1Calc.effectiveTaxRatePercent}% Total
                    </span>
                  </div>
                </div>

                {/* PRIMARY METRICS */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold font-sans tabular-nums">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Gross Estate</span>
                    <span className="text-slate-900 dark:text-slate-100 font-extrabold text-[11px]">
                      ${b1Calc.totalGrossEstate.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Taxable Estate</span>
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold text-[11px]">
                      ${b1Calc.netTaxableEstate.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Lifetime Exemption</span>
                    <span className="text-slate-900 dark:text-slate-100 font-extrabold text-[11px]">
                      ${b1Calc.effectiveExemption.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Net to Heirs</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px]">
                      ${b1Calc.netWealthTransferredToHeirs.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* SUMMARY DETAILS */}
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-sans tabular-nums space-y-1">
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Gross Tentative Estate Tax:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">${b1Calc.grossTentativeTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Unified Lifetime Tax Credit Offset:</span>
                    <span className="font-bold text-emerald-600">-${b1Calc.unifiedCredit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                    <span>Remaining Unused Lifetime Exemption:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">${b1Calc.remainingUnusedExemption.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleExportBox1CSV}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Export Estate Pro-Forma (CSV)</span>
                  </button>
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
                  <span>Saved Federal Estate Tax Pro-Formas ({savedBox1.length})</span>
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
          BOX 2: STATE-LEVEL ESTATE & INHERITANCE TAX ESTIMATOR
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>State-Level Estate &amp; Inheritance Tax Estimator</span>
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
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                State Jurisdiction Profile
              </span>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  State of Residence
                </label>
                <select
                  value={b2StateCode}
                  onChange={(e) => setB2StateCode(e.target.value)}
                  className={select3DClass}
                >
                  {Object.entries(STATE_DEATH_TAX_SCHEDULES).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Taxable Estate ($)
                  </label>
                  <input
                    type="number"
                    step={500000}
                    value={b2TaxableEstate}
                    onChange={(e) => setB2TaxableEstate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Heir Relationship Tier
                  </label>
                  <select
                    value={b2HeirClass}
                    onChange={(e) => setB2HeirClass(e.target.value as any)}
                    className={select3DClass}
                  >
                    <option value="classA">Class A (Spouse &amp; Children)</option>
                    <option value="classB">Class B (Siblings)</option>
                    <option value="classC">Class C (Non-relatives / Friends)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Total State Death Tax
                  </span>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    ${b2Calc.totalStateDeathTax.toLocaleString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">State Exemption</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 inline-block font-sans tabular-nums">
                    {b2Calc.stateEstateTaxExemption > 0 ? `$${b2Calc.stateEstateTaxExemption.toLocaleString()}` : "N/A"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">State Estate Tax</span>
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold">${b2Calc.stateEstateTaxAmount.toLocaleString()}</span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">State Inheritance Tax</span>
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold">${b2Calc.stateInheritanceTaxAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900/50 text-xs font-sans tabular-nums flex justify-between items-center">
                <span className="font-bold text-blue-800 dark:text-blue-300">Combined Federal + State Tax:</span>
                <span className="text-sm font-extrabold text-blue-700 dark:text-blue-300">${b2Calc.combinedFederalAndStateTax.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 2 */}
          {savedBox2.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved State Death Tax Calculations ({savedBox2.length})</span>
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
          BOX 3: EXEMPTION SUNSET & POLICY SHIFT FORECASTER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Exemption Sunset &amp; Policy Shift Forecaster (Current vs. $7M vs. $3.5M)</span>
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
            <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Taxable Estate Forecast Base
              </span>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Taxable Estate ($)
                </label>
                <input
                  type="number"
                  step={500000}
                  value={b3TaxableEstate}
                  onChange={(e) => setB3TaxableEstate(e.target.value)}
                  className={input3DClass}
                />
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                If the TCJA exemptions sunset or reform legislation passes, the federal lifetime exemption drops significantly, exposing millions in wealth to the 40% federal bracket.
              </p>
            </div>

            <div className="lg:col-span-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              <table className="w-full text-center border-collapse font-sans tabular-nums">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-2 text-left">Legislative Scenario</th>
                    <th className="p-2">Single Exemption</th>
                    <th className="p-2">Federal Estate Tax</th>
                    <th className="p-2 font-black text-amber-600">Increased Tax Exposure</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {b3Calc.map((sc, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-2 text-left font-bold text-slate-800 dark:text-slate-200">{sc.scenarioName}</td>
                      <td className="p-2 text-slate-600">${sc.individualExemption.toLocaleString()}</td>
                      <td className="p-2 font-extrabold text-blue-600 dark:text-blue-400">${sc.federalTaxLiability.toLocaleString()}</td>
                      <td className={`p-2 font-extrabold ${sc.additionalTaxVsCurrent > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                        {sc.additionalTaxVsCurrent > 0 ? `+$${sc.additionalTaxVsCurrent.toLocaleString()}` : "Base Case ($0)"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 3 */}
          {savedBox3.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Sunset Forecasts ({savedBox3.length})</span>
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
          BOX 4: TRUST & ANNUAL GIFTING STRATEGY SIMULATOR (ILIT)
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Trust &amp; Annual Gifting Optimizer (ILIT &amp; $19,000 Exclusions)</span>
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
                Wealth Removal Parameters
              </span>

              <div>
                <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Life Insurance in ILIT ($)</label>
                <input
                  type="number"
                  step={500000}
                  value={b4LifeInsurance}
                  onChange={(e) => setB4LifeInsurance(e.target.value)}
                  className={input3DClass}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Beneficiaries</label>
                  <input
                    type="number"
                    min={1}
                    value={b4Beneficiaries}
                    onChange={(e) => setB4Beneficiaries(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Gifting Years</label>
                  <input
                    type="number"
                    min={1}
                    value={b4Years}
                    onChange={(e) => setB4Years(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Gift / Person ($)</label>
                  <input
                    type="number"
                    step={1000}
                    value={b4GiftPerPerson}
                    onChange={(e) => setB4GiftPerPerson(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Total Estate Taxes Preserved
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums">
                    +${b4Calc.totalTaxesSaved.toLocaleString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Wealth Sheltered</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 inline-block font-sans tabular-nums">
                    ${b4Calc.totalWealthSheltered.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">ILIT Tax Savings</span>
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold">${b4Calc.ilitTaxSavings.toLocaleString()}</span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Gifting Tax Savings</span>
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold">${b4Calc.giftingEstateTaxSavings.toLocaleString()}</span>
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
                  <span>Saved Trust &amp; Gifting Optimizations ({savedBox4.length})</span>
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
          BOX 5: STEP-UP IN BASIS VS LIFETIME GIFTING
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Step-Up in Basis vs. Lifetime Gifting Capital Gains Comparator</span>
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
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Appreciated Property Inputs
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Fair Market Value ($)</label>
                  <input
                    type="number"
                    step={100000}
                    value={b5Fmv}
                    onChange={(e) => setB5Fmv(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Original Cost Basis ($)</label>
                  <input
                    type="number"
                    step={50000}
                    value={b5Basis}
                    onChange={(e) => setB5Basis(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Cap Gains Tax Rate (%)</label>
                <input
                  type="number"
                  step={0.5}
                  value={b5GainRate}
                  onChange={(e) => setB5GainRate(e.target.value)}
                  className={input3DClass}
                />
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Step-Up Tax Elimination Benefit
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums">
                    +${b5Calc.stepUpTaxBenefitSavings.toLocaleString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Unrealized Gain</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 inline-block font-sans tabular-nums">
                    ${b5Calc.unrealizedAppreciation.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-900/50">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block uppercase">Bequest at Death</span>
                  <div>New Basis: ${b5Calc.bequestAtDeathNewBasis.toLocaleString()}</div>
                  <div className="text-emerald-600">Cap Gains Tax: $0</div>
                </div>

                <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900/50">
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 block uppercase">Lifetime Gift</span>
                  <div>Carryover: ${b5Calc.lifetimeGiftCarryoverBasis.toLocaleString()}</div>
                  <div className="text-amber-600">Tax: ${b5Calc.lifetimeGiftPotentialCapitalGainsTax.toLocaleString()}</div>
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
                  <span>Saved Basis Comparisons ({savedBox5.length})</span>
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
          BOX 6: GENERATION-SKIPPING TRANSFER (GST) TAX MODULE
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Generation-Skipping Transfer (GST) Tax Module</span>
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
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Skip Person Transfer Parameters
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Direct Skip Transfer ($)
                  </label>
                  <input
                    type="number"
                    step={1000000}
                    value={b6Transfer}
                    onChange={(e) => setB6Transfer(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    GST Lifetime Exemption ($)
                  </label>
                  <input
                    type="number"
                    step={1000000}
                    value={b6GstExemption}
                    onChange={(e) => setB6GstExemption(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Transfers made to grandchildren or unrelated beneficiaries more than 37.5 years younger trigger a flat 40% GST tax on amounts exceeding your lifetime GST exemption.
              </p>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    GST Tax Liability (Flat 40%)
                  </span>
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                    ${b6Calc.gstTaxLiability.toLocaleString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Taxable Overhang</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 inline-block font-sans tabular-nums">
                    ${b6Calc.taxableSkipOverhang.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs space-y-1 font-sans tabular-nums">
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span>Net Wealth to Skip Generation:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">${b6Calc.netTransferToGrandchildren.toLocaleString()}</span>
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
                  <span>Saved GST Tax Calculations ({savedBox6.length})</span>
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

export default EstateTaxCalculator;
