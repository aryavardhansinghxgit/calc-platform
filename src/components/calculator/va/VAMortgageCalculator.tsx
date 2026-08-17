"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, ChevronDown, ChevronUp, Check, Plus } from "lucide-react";
import {
  calculateVAMortgage,
  calculateVAVsConvVsFHA,
  calculateEntitlement,
  calculateBiWeekly,
  calculateExtraPayments,
  calculateIRRRL,
} from "@/app/calculators/va-mortgage-calculator/calculator";
import {
  MilitaryStatus,
  SavedVAItem,
} from "@/app/calculators/va-mortgage-calculator/types";

export function VAMortgageCalculator() {
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // =========================================================================
  // BOX 1: COMPREHENSIVE VA PITI ENGINE STATES
  // =========================================================================
  const [homePrice, setHomePrice] = useState<string>("500000");
  const [downPaymentPct, setDownPaymentPct] = useState<string>("0");
  const [loanTermYears, setLoanTermYears] = useState<string>("30");
  const [interestRate, setInterestRate] = useState<string>("6.5");
  const [militaryStatus, setMilitaryStatus] = useState<MilitaryStatus>("Active/Veteran");
  const [usedVALoanBefore, setUsedVALoanBefore] = useState<boolean>(false);
  const [isDisabilityExempt, setIsDisabilityExempt] = useState<boolean>(false);
  const [financeFundingFee, setFinanceFundingFee] = useState<boolean>(true);
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<string>("6000");
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<string>("2500");
  const [hoaDuesMonthly, setHoaDuesMonthly] = useState<string>("0");

  const [savedBox1Items, setSavedBox1Items] = useState<SavedVAItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);
  const [showHistoryBox1, setShowHistoryBox1] = useState<boolean>(false);

  const vaCalc = useMemo(() => {
    return calculateVAMortgage({
      homePrice: parseFloat(homePrice) || 0,
      downPaymentPct: parseFloat(downPaymentPct) || 0,
      loanTermYears: parseFloat(loanTermYears) || 30,
      interestRate: parseFloat(interestRate) || 0,
      militaryStatus,
      usedVALoanBefore,
      isDisabilityExempt,
      financeFundingFee,
      propertyTaxAnnual: parseFloat(propertyTaxAnnual) || 0,
      homeInsuranceAnnual: parseFloat(homeInsuranceAnnual) || 0,
      hoaDuesMonthly: parseFloat(hoaDuesMonthly) || 0,
      estimatedClosingCostsPct: 2.5,
      currencySymbol,
    });
  }, [
    homePrice,
    downPaymentPct,
    loanTermYears,
    interestRate,
    militaryStatus,
    usedVALoanBefore,
    isDisabilityExempt,
    financeFundingFee,
    propertyTaxAnnual,
    homeInsuranceAnnual,
    hoaDuesMonthly,
    currencySymbol,
  ]);

  const handleSaveBox1 = () => {
    const newItem: SavedVAItem = {
      id: Date.now().toString(),
      title: "VA Monthly PITI Payment Analysis",
      inputsSummary: `Price: ${currencySymbol}${parseFloat(homePrice).toLocaleString()} | Down: ${downPaymentPct}% | Rate: ${interestRate}% | Status: ${militaryStatus}`,
      primaryResult: `PITI Payment: ${currencySymbol}${vaCalc.totalMonthlyPiti.toLocaleString()}/mo | Funding Fee: ${currencySymbol}${vaCalc.fundingFeeAmount.toLocaleString()} (${vaCalc.fundingFeeRatePct}%)`,
      detailsList: [
        `Base Loan Amount: ${currencySymbol}${vaCalc.baseLoanAmount.toLocaleString()}`,
        `Financed Loan Amount: ${currencySymbol}${vaCalc.totalFinancedLoanAmount.toLocaleString()}`,
        `Monthly P&I Payment: ${currencySymbol}${vaCalc.monthlyPrincipalAndInterest.toLocaleString()}/mo`,
        `Monthly Mortgage Insurance: ${currencySymbol}0 (VA No-PMI Benefit!)`,
        `Total Upfront Cash Required: ${currencySymbol}${vaCalc.totalUpfrontCashRequired.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox1Items];
    setSavedBox1Items(updated);
    try {
      localStorage.setItem("saved_va_box1", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  // SVG PITI Donut Chart
  const svgPitiDonut = useMemo(() => {
    const pi = vaCalc.monthlyPrincipalAndInterest || 0;
    const tax = vaCalc.monthlyPropertyTax || 0;
    const ins = vaCalc.monthlyHomeInsurance || 0;
    const hoa = vaCalc.monthlyHoa || 0;

    const total = pi + tax + ins + hoa;
    if (total <= 0) return null;

    const piPct = (pi / total) * 100;
    const taxPct = (tax / total) * 100;
    const insPct = (ins / total) * 100;
    const hoaPct = (hoa / total) * 100;

    const r = 40;
    const cx = 50;
    const cy = 50;
    const circ = 2 * Math.PI * r;

    const piStroke = (piPct / 100) * circ;
    const taxStroke = (taxPct / 100) * circ;
    const insStroke = (insPct / 100) * circ;
    const hoaStroke = (hoaPct / 100) * circ;

    return (
      <div className="flex items-center justify-center gap-4">
        <svg viewBox="0 0 100 100" className="w-24 h-24 transform -rotate-90">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2563eb" strokeWidth="16" strokeDasharray={`${piStroke} ${circ}`} strokeDashoffset={0} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#10b981" strokeWidth="16" strokeDasharray={`${taxStroke} ${circ}`} strokeDashoffset={-piStroke} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f59e0b" strokeWidth="16" strokeDasharray={`${insStroke} ${circ}`} strokeDashoffset={-(piStroke + taxStroke)} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#8b5cf6" strokeWidth="16" strokeDasharray={`${hoaStroke} ${circ}`} strokeDashoffset={-(piStroke + taxStroke + insStroke)} />
        </svg>
        <div className="text-[11px] space-y-1 font-bold">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span> <span>P&I: {piPct.toFixed(1)}%</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> <span>Taxes: {taxPct.toFixed(1)}%</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> <span>Insurance: {insPct.toFixed(1)}%</span></div>
          <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold"><Check className="w-3.5 h-3.5" /> <span>$0 Monthly PMI!</span></div>
        </div>
      </div>
    );
  }, [vaCalc]);

  // =========================================================================
  // BOX 2: VA VS CONVENTIONAL VS FHA 3-WAY COMPARISON STATES
  // =========================================================================
  const [compScore, setCompScore] = useState<string>("720");

  const [savedBox2Items, setSavedBox2Items] = useState<SavedVAItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);
  const [showHistoryBox2, setShowHistoryBox2] = useState<boolean>(false);

  const vsMatrixCalc = useMemo(() => {
    return calculateVAVsConvVsFHA({
      homePrice: parseFloat(homePrice) || 500000,
      downPaymentPct: parseFloat(downPaymentPct) || 0,
      creditScore: parseInt(compScore) || 720,
      interestRate: parseFloat(interestRate) || 6.5,
    });
  }, [homePrice, downPaymentPct, compScore, interestRate]);

  const handleSaveBox2 = () => {
    const newItem: SavedVAItem = {
      id: Date.now().toString(),
      title: "VA vs. Conventional vs. FHA 3-Way Comparison",
      inputsSummary: `Price: ${currencySymbol}${parseFloat(homePrice).toLocaleString()} | Credit Score: ${compScore} | Rate: ${interestRate}%`,
      primaryResult: `VA Savings over Conventional: ${currencySymbol}${vsMatrixCalc.vaSavingsOverConv.toLocaleString()} | Over FHA: ${currencySymbol}${vsMatrixCalc.vaSavingsOverFHA.toLocaleString()}`,
      detailsList: [
        `VA PITI: ${currencySymbol}${vsMatrixCalc.vaMonthlyPiti.toLocaleString()}/mo ($0 PMI, Upfront: ${currencySymbol}${vsMatrixCalc.vaUpfrontCash.toLocaleString()})`,
        `FHA PITI: ${currencySymbol}${vsMatrixCalc.fhaMonthlyPiti.toLocaleString()}/mo (Upfront: ${currencySymbol}${vsMatrixCalc.fhaUpfrontCash.toLocaleString()})`,
        `Conventional PITI: ${currencySymbol}${vsMatrixCalc.convMonthlyPiti.toLocaleString()}/mo (Upfront: ${currencySymbol}${vsMatrixCalc.convUpfrontCash.toLocaleString()})`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox2Items];
    setSavedBox2Items(updated);
    try {
      localStorage.setItem("saved_va_box2", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  // =========================================================================
  // BOX 3: VA ENTITLEMENT CALCULATOR STATES
  // =========================================================================
  const [targetPrice, setTargetPrice] = useState<string>("600000");
  const [priorEntitlement, setPriorEntitlement] = useState<string>("0");
  const [countyLimit, setCountyLimit] = useState<string>("766550");

  const [savedBox3Items, setSavedBox3Items] = useState<SavedVAItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);
  const [showHistoryBox3, setShowHistoryBox3] = useState<boolean>(false);

  const entitlementCalc = useMemo(() => {
    return calculateEntitlement({
      targetHomePrice: parseFloat(targetPrice) || 0,
      priorUsedEntitlement: parseFloat(priorEntitlement) || 0,
      countyLoanLimit: parseFloat(countyLimit) || 766550,
    });
  }, [targetPrice, priorEntitlement, countyLimit]);

  const handleSaveBox3 = () => {
    const newItem: SavedVAItem = {
      id: Date.now().toString(),
      title: "VA Entitlement Purchasing Power",
      inputsSummary: `Target Price: ${currencySymbol}${parseFloat(targetPrice).toLocaleString()} | Prior Used Entitlement: ${currencySymbol}${parseFloat(priorEntitlement).toLocaleString()}`,
      primaryResult: entitlementCalc.fullEntitlementAvailable
        ? "Full Entitlement: 100% 0%-Down Purchasing Power!"
        : `Max 0%-Down Price: ${currencySymbol}${entitlementCalc.maxZeroDownPurchasePrice.toLocaleString()}`,
      detailsList: [
        `Required Down Payment for Target: ${currencySymbol}${entitlementCalc.requiredDownPaymentForTarget.toLocaleString()}`,
        `Remaining Guaranty Entitlement: ${currencySymbol}${entitlementCalc.remainingEntitlement.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox3Items];
    setSavedBox3Items(updated);
    try {
      localStorage.setItem("saved_va_box3", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  // =========================================================================
  // BOX 4: BI-WEEKLY VS MONTHLY PAYBACK SIMULATOR STATES
  // =========================================================================
  const [savedBox4Items, setSavedBox4Items] = useState<SavedVAItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);
  const [showHistoryBox4, setShowHistoryBox4] = useState<boolean>(false);

  const biWeeklyCalc = useMemo(() => {
    return calculateBiWeekly({
      loanAmount: vaCalc.totalFinancedLoanAmount,
      interestRate: parseFloat(interestRate) || 6.5,
      loanTermYears: parseFloat(loanTermYears) || 30,
    });
  }, [vaCalc.totalFinancedLoanAmount, interestRate, loanTermYears]);

  const handleSaveBox4 = () => {
    const newItem: SavedVAItem = {
      id: Date.now().toString(),
      title: "Bi-Weekly Payback Simulator",
      inputsSummary: `Financed Loan: ${currencySymbol}${vaCalc.totalFinancedLoanAmount.toLocaleString()} | Rate: ${interestRate}%`,
      primaryResult: `Save ${currencySymbol}${biWeeklyCalc.interestSaved.toLocaleString()} Interest | ${biWeeklyCalc.yearsSaved} Years Off Term`,
      detailsList: [
        `Monthly Payment: ${currencySymbol}${biWeeklyCalc.monthlyPayment.toLocaleString()}/mo vs Bi-Weekly: ${currencySymbol}${biWeeklyCalc.biWeeklyPayment.toLocaleString()}/2-weeks`,
        `Bi-Weekly Interest Paid: ${currencySymbol}${biWeeklyCalc.biWeeklyTotalInterest.toLocaleString()} vs Monthly: ${currencySymbol}${biWeeklyCalc.monthlyTotalInterest.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox4Items];
    setSavedBox4Items(updated);
    try {
      localStorage.setItem("saved_va_box4", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  // =========================================================================
  // BOX 5: EXTRA PAYMENTS FORECASTER STATES
  // =========================================================================
  const [extraPayment, setExtraPayment] = useState<string>("200");

  const [savedBox5Items, setSavedBox5Items] = useState<SavedVAItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);
  const [showHistoryBox5, setShowHistoryBox5] = useState<boolean>(false);

  const extraCalc = useMemo(() => {
    return calculateExtraPayments({
      loanAmount: vaCalc.totalFinancedLoanAmount,
      interestRate: parseFloat(interestRate) || 6.5,
      loanTermYears: parseFloat(loanTermYears) || 30,
      extraMonthlyPayment: parseFloat(extraPayment) || 0,
    });
  }, [vaCalc.totalFinancedLoanAmount, interestRate, loanTermYears, extraPayment]);

  const handleSaveBox5 = () => {
    const newItem: SavedVAItem = {
      id: Date.now().toString(),
      title: "Extra Payments & Accelerated Payoff",
      inputsSummary: `Financed Loan: ${currencySymbol}${vaCalc.totalFinancedLoanAmount.toLocaleString()} | Extra Payment: ${currencySymbol}${parseFloat(extraPayment).toLocaleString()}/mo`,
      primaryResult: `Save ${currencySymbol}${extraCalc.interestSaved.toLocaleString()} Interest | ${extraCalc.monthsSaved} Months Saved`,
      detailsList: [
        `Original Term: ${extraCalc.originalMonths} Months → New Term: ${extraCalc.newMonths} Months`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox5Items];
    setSavedBox5Items(updated);
    try {
      localStorage.setItem("saved_va_box5", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  // =========================================================================
  // BOX 6: VA IRRRL STREAMLINE REFINANCE STATES
  // =========================================================================
  const [irrrlBalance, setIrrrlBalance] = useState<string>("350000");
  const [irrrlCurrentRate, setIrrrlCurrentRate] = useState<string>("7.25");
  const [irrrlNewRate, setIrrrlNewRate] = useState<string>("6.0");
  const [irrrlCosts, setIrrrlCosts] = useState<string>("3000");

  const [savedBox6Items, setSavedBox6Items] = useState<SavedVAItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);
  const [showHistoryBox6, setShowHistoryBox6] = useState<boolean>(false);

  const irrrlCalc = useMemo(() => {
    return calculateIRRRL({
      existingBalance: parseFloat(irrrlBalance) || 0,
      currentRate: parseFloat(irrrlCurrentRate) || 0,
      newRate: parseFloat(irrrlNewRate) || 0,
      closingCosts: parseFloat(irrrlCosts) || 0,
    });
  }, [irrrlBalance, irrrlCurrentRate, irrrlNewRate, irrrlCosts]);

  const handleSaveBox6 = () => {
    const newItem: SavedVAItem = {
      id: Date.now().toString(),
      title: "VA IRRRL Streamline Refinance Analysis",
      inputsSummary: `Balance: ${currencySymbol}${parseFloat(irrrlBalance).toLocaleString()} | ${irrrlCurrentRate}% → ${irrrlNewRate}%`,
      primaryResult: `Monthly Savings: ${currencySymbol}${irrrlCalc.monthlySavings.toLocaleString()}/mo | Break-Even: ${irrrlCalc.breakEvenMonths} Months`,
      detailsList: [
        `Current Payment: ${currencySymbol}${irrrlCalc.currentMonthlyPmt.toLocaleString()}/mo → New Payment: ${currencySymbol}${irrrlCalc.newMonthlyPmt.toLocaleString()}/mo`,
        `0.5% IRRRL Fee: ${currencySymbol}${irrrlCalc.irrrlFundingFee.toLocaleString()}`,
        `5-Year Lifetime Savings: ${currencySymbol}${irrrlCalc.lifetimeSavings5Yr.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox6Items];
    setSavedBox6Items(updated);
    try {
      localStorage.setItem("saved_va_box6", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  // Initial load from local storage
  useEffect(() => {
    try {
      const b1 = localStorage.getItem("saved_va_box1");
      if (b1) setSavedBox1Items(JSON.parse(b1));
      const b2 = localStorage.getItem("saved_va_box2");
      if (b2) setSavedBox2Items(JSON.parse(b2));
      const b3 = localStorage.getItem("saved_va_box3");
      if (b3) setSavedBox3Items(JSON.parse(b3));
      const b4 = localStorage.getItem("saved_va_box4");
      if (b4) setSavedBox4Items(JSON.parse(b4));
      const b5 = localStorage.getItem("saved_va_box5");
      if (b5) setSavedBox5Items(JSON.parse(b5));
      const b6 = localStorage.getItem("saved_va_box6");
      if (b6) setSavedBox6Items(JSON.parse(b6));
    } catch (e) {}
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Simple Currency Selector Header */}
      <div className="flex items-center justify-end gap-2 text-xs font-bold">
        <label htmlFor="va-currency" className="text-slate-500 font-medium">Currency:</label>
        <select
          id="va-currency"
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

      {/* ========================================================================= */}
      {/* 1. COMPREHENSIVE VA MONTHLY PAYMENT & PITI ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Comprehensive VA Monthly Payment & PITI Engine</span>
          <button
            type="button"
            onClick={handleSaveBox1}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox1 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs text-xs">
              <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">Purchase, Military & Fee Options</span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Home Purchase Price</label>
                  <input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Down Payment %</label>
                  <input type="number" value={downPaymentPct} onChange={(e) => setDownPaymentPct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Military Category</label>
                  <select
                    value={militaryStatus}
                    onChange={(e) => setMilitaryStatus(e.target.value as any)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  >
                    <option value="Active/Veteran">Active Duty / Veteran</option>
                    <option value="Reserve/Guard">National Guard / Reserve</option>
                    <option value="Surviving Spouse">Surviving Spouse (Exempt)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Interest Rate %</label>
                  <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Term (Years)</label>
                  <input type="number" value={loanTermYears} onChange={(e) => setLoanTermYears(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Used VA Loan Before?</label>
                  <div className="flex w-full h-8 bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg font-bold">
                    <button
                      type="button"
                      onClick={() => setUsedVALoanBefore(false)}
                      className={`flex-1 h-full rounded-md text-[11px] font-extrabold transition-colors cursor-pointer flex items-center justify-center ${
                        !usedVALoanBefore ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      1st Use
                    </button>
                    <button
                      type="button"
                      onClick={() => setUsedVALoanBefore(true)}
                      className={`flex-1 h-full rounded-md text-[11px] font-extrabold transition-colors cursor-pointer flex items-center justify-center ${
                        usedVALoanBefore ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      Subsequent
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">VA Disability Rating Exemption</label>
                  <button
                    type="button"
                    onClick={() => setIsDisabilityExempt(!isDisabilityExempt)}
                    className={`w-full h-8 px-3 rounded-lg font-extrabold text-xs flex items-center justify-between border cursor-pointer ${
                      isDisabilityExempt
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                    }`}
                  >
                    <span>{isDisabilityExempt ? "Exempt (0% Fee)" : "Standard Fee"}</span>
                    {isDisabilityExempt && <Check className="w-4 h-4" />}
                  </button>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Finance Funding Fee</label>
                  <div className="flex w-full h-8 bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg font-bold">
                    <button
                      type="button"
                      onClick={() => setFinanceFundingFee(true)}
                      className={`flex-1 h-full rounded-md text-[11px] font-extrabold transition-colors cursor-pointer flex items-center justify-center ${
                        financeFundingFee ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      Yes (Loan)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFinanceFundingFee(false)}
                      className={`flex-1 h-full rounded-md text-[11px] font-extrabold transition-colors cursor-pointer flex items-center justify-center ${
                        !financeFundingFee ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      No (Cash)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-blue-50/60 dark:bg-slate-900/80 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-5 shadow-xs space-y-4 text-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  Total Monthly PITI Payment
                </span>

                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900/40">
                  <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                    {currencySymbol}{vaCalc.totalMonthlyPiti.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 block mt-0.5">/ month</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">P&I Payment</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{currencySymbol}{vaCalc.monthlyPrincipalAndInterest.toLocaleString()}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Funding Fee</span>
                    <span className="font-extrabold text-blue-600">{currencySymbol}{vaCalc.fundingFeeAmount.toLocaleString()} ({vaCalc.fundingFeeRatePct}%)</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Upfront Cash</span>
                    <span className="font-extrabold text-emerald-600">{currencySymbol}{vaCalc.totalUpfrontCashRequired.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2">
                  {svgPitiDonut}
                </div>
              </div>
            </div>
          </div>

          {/* Derivation Box */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs space-y-2 font-mono">
            <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans">VA Underwriting Formulas:</span>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 text-slate-700 dark:text-slate-300">
              <div>{"Base Loan = Home Price - Down Payment = " + currencySymbol + parseFloat(homePrice).toLocaleString() + " - " + currencySymbol + vaCalc.downPaymentAmount.toLocaleString() + " = " + currencySymbol + vaCalc.baseLoanAmount.toLocaleString()}</div>
              <div>{"VA Funding Fee (" + vaCalc.fundingFeeRatePct + "%) = " + currencySymbol + vaCalc.baseLoanAmount.toLocaleString() + " × " + vaCalc.fundingFeeRatePct + "% = " + currencySymbol + vaCalc.fundingFeeAmount.toLocaleString() + " (" + (financeFundingFee ? "Financed into loan = " + currencySymbol + vaCalc.totalFinancedLoanAmount.toLocaleString() : "Paid cash at closing") + ")"}</div>
              <div>{"Monthly Mortgage Insurance (PMI) = " + currencySymbol + "0 (VA Veteran Benefit!)"}</div>
            </div>
          </div>

          {/* History Drawer for Box 1 */}
          {savedBox1Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
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
                            onClick={() => setSavedBox1Items(savedBox1Items.filter((i) => i.id !== item.id))}
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
      {/* 2. VA VS CONVENTIONAL VS FHA 3-WAY COMPARISON */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">VA vs. Conventional vs. FHA 3-Way Comparison Matrix</span>
          <button
            type="button"
            onClick={handleSaveBox2}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox2 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Credit Score</label>
                  <input type="number" value={compScore} onChange={(e) => setCompScore(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Base Interest Rate %</label>
                  <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">30-Year Loan Program Comparison</span>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-900/50">
                  <span className="text-[10px] text-emerald-600 block uppercase">VA Loan ($0 Down)</span>
                  <span className="text-emerald-600 text-sm font-extrabold">{currencySymbol}{vsMatrixCalc.vaMonthlyPiti.toLocaleString()}/mo</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">FHA (3.5% Down)</span>
                  <span className="text-slate-800 dark:text-slate-200 text-sm font-extrabold">{currencySymbol}{vsMatrixCalc.fhaMonthlyPiti.toLocaleString()}/mo</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Conventional (5%)</span>
                  <span className="text-slate-800 dark:text-slate-200 text-sm font-extrabold">{currencySymbol}{vsMatrixCalc.convMonthlyPiti.toLocaleString()}/mo</span>
                </div>
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-emerald-600">
                VA saves {currencySymbol}{vsMatrixCalc.vaSavingsOverConv.toLocaleString()} vs. Conventional & {currencySymbol}{vsMatrixCalc.vaSavingsOverFHA.toLocaleString()} vs. FHA over 30 years!
              </div>
            </div>
          </div>

          {/* History Drawer for Box 2 */}
          {savedBox2Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
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
                            onClick={() => setSavedBox2Items(savedBox2Items.filter((i) => i.id !== item.id))}
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
      {/* 3. VA ENTITLEMENT & PURCHASING POWER CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">VA Entitlement & Purchasing Power Calculator</span>
          <button
            type="button"
            onClick={handleSaveBox3}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox3 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Home Price</label>
                  <input type="number" value={targetPrice} onChange={(e) => setTargetPrice(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Prior Used Entitlement</label>
                  <input type="number" value={priorEntitlement} onChange={(e) => setPriorEntitlement(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">County Loan Limit</label>
                  <input type="number" value={countyLimit} onChange={(e) => setCountyLimit(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Entitlement Status</span>

              <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                {entitlementCalc.fullEntitlementAvailable
                  ? "Full Entitlement (100% $0-Down Capable)"
                  : `Max $0-Down Price: ${currencySymbol}${entitlementCalc.maxZeroDownPurchasePrice.toLocaleString()}`}
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200">
                Required Down Payment for Target: {currencySymbol}{entitlementCalc.requiredDownPaymentForTarget.toLocaleString()}
              </div>
            </div>
          </div>

          {/* History Drawer for Box 3 */}
          {savedBox3Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
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
                            onClick={() => setSavedBox3Items(savedBox3Items.filter((i) => i.id !== item.id))}
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
      {/* 4. BI-WEEKLY VS MONTHLY PAYBACK SIMULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Bi-Weekly Payment Schedule Simulator</span>
          <button
            type="button"
            onClick={handleSaveBox4}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox4 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Evaluating Financed Loan: {currencySymbol}{vaCalc.totalFinancedLoanAmount.toLocaleString()} @ {interestRate}% Rate
              </span>
              <p className="text-slate-500 text-[11px]">
                Paying half your monthly mortgage payment every 2 weeks creates 1 extra full payment per year, shortening your loan term dramatically.
              </p>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Bi-Weekly Payoff Savings</span>

              <div className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums mt-1">
                Save {currencySymbol}{biWeeklyCalc.interestSaved.toLocaleString()} Interest
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Bi-Weekly Payment</span>
                  <span className="font-extrabold text-blue-600">{currencySymbol}{biWeeklyCalc.biWeeklyPayment.toLocaleString()}/2-wks</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Time Shaved Off</span>
                  <span className="font-extrabold text-emerald-600">{biWeeklyCalc.yearsSaved} Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* History Drawer for Box 4 */}
          {savedBox4Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
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
                            onClick={() => setSavedBox4Items(savedBox4Items.filter((i) => i.id !== item.id))}
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
      {/* 5. EXTRA PAYMENTS FORECASTER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Extra Payments & Accelerated Payoff Forecaster</span>
          <button
            type="button"
            onClick={handleSaveBox5}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox5 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Extra Monthly Payment ({currencySymbol})</label>
                <input type="number" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Accelerated Payoff Forecast</span>

              <div className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums mt-1">
                Save {currencySymbol}{extraCalc.interestSaved.toLocaleString()} Interest
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-blue-600">
                Loan Duration Reduced by {extraCalc.monthsSaved} Months
              </div>
            </div>
          </div>

          {/* History Drawer for Box 5 */}
          {savedBox5Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
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
                            onClick={() => setSavedBox5Items(savedBox5Items.filter((i) => i.id !== item.id))}
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
      {/* 6. VA IRRRL STREAMLINE REFINANCE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">VA IRRRL Streamline Refinance Simulator</span>
          <button
            type="button"
            onClick={handleSaveBox6}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox6 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Current Balance</label>
                  <input type="number" value={irrrlBalance} onChange={(e) => setIrrrlBalance(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Current Rate %</label>
                  <input type="number" value={irrrlCurrentRate} onChange={(e) => setIrrrlCurrentRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">New Rate %</label>
                  <input type="number" value={irrrlNewRate} onChange={(e) => setIrrrlNewRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Closing Costs</label>
                  <input type="number" value={irrrlCosts} onChange={(e) => setIrrrlCosts(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-5 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">IRRRL Refinance Savings</span>

              <div className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums mt-1">
                Save {currencySymbol}{irrrlCalc.monthlySavings.toLocaleString()} / month
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Break-Even Period</span>
                  <span className="font-extrabold text-blue-600">{irrrlCalc.breakEvenMonths} Months</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">5-Yr Net Savings</span>
                  <span className="font-extrabold text-emerald-600">{currencySymbol}{irrrlCalc.lifetimeSavings5Yr.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* History Drawer for Box 6 */}
          {savedBox6Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
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
                            onClick={() => setSavedBox6Items(savedBox6Items.filter((i) => i.id !== item.id))}
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
