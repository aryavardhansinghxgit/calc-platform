"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, ChevronDown, ChevronUp, Check, Plus } from "lucide-react";
import {
  calculateFHALoan,
  calculateFHAVsConv,
  calculateCountyLimit,
  calculateFHADTI,
  calculateFHA203k,
  calculateFHAPrepayment,
} from "@/app/calculators/fha-loan-calculator/calculator";
import { SavedFHAItem } from "@/app/calculators/fha-loan-calculator/types";

export function FHACalculator() {
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // =========================================================================
  // BOX 1: COMPREHENSIVE FHA PITI ENGINE STATES
  // =========================================================================
  const [homePrice, setHomePrice] = useState<string>("350000");
  const [downPaymentPct, setDownPaymentPct] = useState<string>("3.5");
  const [creditScoreBand, setCreditScoreBand] = useState<"580+" | "500-579">("580+");
  const [loanTermYears, setLoanTermYears] = useState<string>("30");
  const [interestRate, setInterestRate] = useState<string>("6.5");
  const [financeUfmip, setFinanceUfmip] = useState<boolean>(true);
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<string>("3600");
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<string>("1400");
  const [hoaDuesMonthly, setHoaDuesMonthly] = useState<string>("0");
  const [closingCostsPct, setClosingCostsPct] = useState<string>("3.0");

  const [savedBox1Items, setSavedBox1Items] = useState<SavedFHAItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);
  const [showHistoryBox1, setShowHistoryBox1] = useState<boolean>(false);

  const fhaCalc = useMemo(() => {
    return calculateFHALoan({
      homePrice: parseFloat(homePrice) || 0,
      downPaymentPct: parseFloat(downPaymentPct) || 3.5,
      creditScoreBand,
      loanTermYears: parseFloat(loanTermYears) || 30,
      interestRate: parseFloat(interestRate) || 0,
      financeUfmip,
      propertyTaxAnnual: parseFloat(propertyTaxAnnual) || 0,
      homeInsuranceAnnual: parseFloat(homeInsuranceAnnual) || 0,
      hoaDuesMonthly: parseFloat(hoaDuesMonthly) || 0,
      estimatedClosingCostsPct: parseFloat(closingCostsPct) || 3.0,
      sellerConcessionsPct: 0,
      currencySymbol,
    });
  }, [
    homePrice,
    downPaymentPct,
    creditScoreBand,
    loanTermYears,
    interestRate,
    financeUfmip,
    propertyTaxAnnual,
    homeInsuranceAnnual,
    hoaDuesMonthly,
    closingCostsPct,
    currencySymbol,
  ]);

  const handleSaveBox1 = () => {
    const newItem: SavedFHAItem = {
      id: Date.now().toString(),
      title: "FHA Monthly PITI Payment Analysis",
      inputsSummary: `Price: ${currencySymbol}${parseFloat(homePrice).toLocaleString()} | Down: ${fhaCalc.effectiveDownPaymentPct}% | Rate: ${interestRate}% | Term: ${loanTermYears}y`,
      primaryResult: `PITI Payment: ${currencySymbol}${fhaCalc.totalMonthlyPiti.toLocaleString()}/mo | Upfront Cash: ${currencySymbol}${fhaCalc.totalUpfrontCashRequired.toLocaleString()}`,
      detailsList: [
        `Base Loan: ${currencySymbol}${fhaCalc.baseLoanAmount.toLocaleString()}`,
        `Upfront MIP (1.75%): ${currencySymbol}${fhaCalc.ufmipAmount.toLocaleString()} (${financeUfmip ? "Financed" : "Paid Cash"})`,
        `Total Loan Amount: ${currencySymbol}${fhaCalc.totalFinancedLoanAmount.toLocaleString()}`,
        `Monthly MIP: ${currencySymbol}${fhaCalc.monthlyMipAmount.toLocaleString()}/mo (Rate: ${fhaCalc.annualMipRate}%)`,
        `MIP Duration: ${fhaCalc.mipDurationYears === "Life of Loan" ? "Life of Loan" : `${fhaCalc.mipDurationYears} Years`}`,
        `P&I Payment: ${currencySymbol}${fhaCalc.monthlyPrincipalAndInterest.toLocaleString()}/mo`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox1Items];
    setSavedBox1Items(updated);
    try {
      localStorage.setItem("saved_fha_box1", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  // SVG PITI Donut Chart
  const svgPitiDonut = useMemo(() => {
    const pi = fhaCalc.monthlyPrincipalAndInterest || 0;
    const tax = fhaCalc.monthlyPropertyTax || 0;
    const ins = fhaCalc.monthlyHomeInsurance || 0;
    const mip = fhaCalc.monthlyMipAmount || 0;
    const hoa = fhaCalc.monthlyHoa || 0;

    const total = pi + tax + ins + mip + hoa;
    if (total <= 0) return null;

    const piPct = (pi / total) * 100;
    const taxPct = (tax / total) * 100;
    const insPct = (ins / total) * 100;
    const mipPct = (mip / total) * 100;
    const hoaPct = (hoa / total) * 100;

    const r = 40;
    const cx = 50;
    const cy = 50;
    const circ = 2 * Math.PI * r;

    const piStroke = (piPct / 100) * circ;
    const taxStroke = (taxPct / 100) * circ;
    const insStroke = (insPct / 100) * circ;
    const mipStroke = (mipPct / 100) * circ;
    const hoaStroke = (hoaPct / 100) * circ;

    return (
      <div className="flex items-center justify-center gap-4">
        <svg viewBox="0 0 100 100" className="w-24 h-24 transform -rotate-90">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2563eb" strokeWidth="16" strokeDasharray={`${piStroke} ${circ}`} strokeDashoffset={0} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#10b981" strokeWidth="16" strokeDasharray={`${taxStroke} ${circ}`} strokeDashoffset={-piStroke} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f59e0b" strokeWidth="16" strokeDasharray={`${insStroke} ${circ}`} strokeDashoffset={-(piStroke + taxStroke)} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ef4444" strokeWidth="16" strokeDasharray={`${mipStroke} ${circ}`} strokeDashoffset={-(piStroke + taxStroke + insStroke)} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#8b5cf6" strokeWidth="16" strokeDasharray={`${hoaStroke} ${circ}`} strokeDashoffset={-(piStroke + taxStroke + insStroke + mipStroke)} />
        </svg>
        <div className="text-[11px] space-y-1 font-bold">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span> <span>P&I: {piPct.toFixed(1)}%</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> <span>Taxes: {taxPct.toFixed(1)}%</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> <span>Insurance: {insPct.toFixed(1)}%</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span> <span>FHA MIP: {mipPct.toFixed(1)}%</span></div>
        </div>
      </div>
    );
  }, [fhaCalc]);

  // =========================================================================
  // BOX 2: FHA VS CONVENTIONAL 97 STATES
  // =========================================================================
  const [convCreditScore, setConvCreditScore] = useState<string>("700");
  const [convRate, setConvRate] = useState<string>("6.75");

  const [savedBox2Items, setSavedBox2Items] = useState<SavedFHAItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);
  const [showHistoryBox2, setShowHistoryBox2] = useState<boolean>(false);

  const vsConvCalc = useMemo(() => {
    return calculateFHAVsConv({
      homePrice: parseFloat(homePrice) || 350000,
      downPaymentPct: parseFloat(downPaymentPct) || 3.5,
      creditScore: parseInt(convCreditScore) || 700,
      interestRateFHA: parseFloat(interestRate) || 6.5,
      interestRateConv: parseFloat(convRate) || 6.75,
    });
  }, [homePrice, downPaymentPct, convCreditScore, interestRate, convRate]);

  const handleSaveBox2 = () => {
    const newItem: SavedFHAItem = {
      id: Date.now().toString(),
      title: "FHA vs. Conventional Cost Comparison",
      inputsSummary: `Price: ${currencySymbol}${parseFloat(homePrice).toLocaleString()} | Credit Score: ${convCreditScore} | FHA Rate: ${interestRate}% vs Conv Rate: ${convRate}%`,
      primaryResult: `Crossover Month: Month ${vsConvCalc.crossoverMonth} (${vsConvCalc.recommendation})`,
      detailsList: [
        `FHA PITI: ${currencySymbol}${vsConvCalc.fhaMonthlyPiti.toLocaleString()}/mo | Conv PITI: ${currencySymbol}${vsConvCalc.convMonthlyPiti.toLocaleString()}/mo`,
        `FHA Upfront Cash: ${currencySymbol}${vsConvCalc.fhaUpfrontCash.toLocaleString()} | Conv Upfront Cash: ${currencySymbol}${vsConvCalc.convUpfrontCash.toLocaleString()}`,
        `FHA 30-Yr Total Cost: ${currencySymbol}${vsConvCalc.fhaTotal30YrCost.toLocaleString()} | Conv 30-Yr Total Cost: ${currencySymbol}${vsConvCalc.convTotal30YrCost.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox2Items];
    setSavedBox2Items(updated);
    try {
      localStorage.setItem("saved_fha_box2", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  // =========================================================================
  // BOX 3: FHA COUNTY LOAN LIMIT VERIFICATION STATES
  // =========================================================================
  const [propType, setPropType] = useState<"Single Family" | "Duplex" | "Triplex" | "Fourplex">("Single Family");
  const [savedBox3Items, setSavedBox3Items] = useState<SavedFHAItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);
  const [showHistoryBox3, setShowHistoryBox3] = useState<boolean>(false);

  const countyCalc = useMemo(() => {
    return calculateCountyLimit({
      propertyType: propType,
      proposedLoanAmount: fhaCalc.baseLoanAmount,
    });
  }, [propType, fhaCalc.baseLoanAmount]);

  const handleSaveBox3 = () => {
    const newItem: SavedFHAItem = {
      id: Date.now().toString(),
      title: "FHA County Loan Limit Check",
      inputsSummary: `Property: ${propType} | Proposed Loan: ${currencySymbol}${fhaCalc.baseLoanAmount.toLocaleString()}`,
      primaryResult: countyCalc.statusMessage,
      detailsList: [
        `2024 Standard Floor Limit: ${currencySymbol}${countyCalc.floorLimit.toLocaleString()}`,
        `2024 High-Cost Ceiling Limit: ${currencySymbol}${countyCalc.ceilingLimit.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox3Items];
    setSavedBox3Items(updated);
    try {
      localStorage.setItem("saved_fha_box3", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  // =========================================================================
  // BOX 4: FHA DTI QUALIFICATION CHECKER STATES
  // =========================================================================
  const [dtiGrossIncome, setDtiGrossIncome] = useState<string>("7500");
  const [dtiOtherDebt, setDtiOtherDebt] = useState<string>("600");

  const [savedBox4Items, setSavedBox4Items] = useState<SavedFHAItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);
  const [showHistoryBox4, setShowHistoryBox4] = useState<boolean>(false);

  const dtiCalc = useMemo(() => {
    return calculateFHADTI({
      grossMonthlyIncome: parseFloat(dtiGrossIncome) || 0,
      proposedHousingPayment: fhaCalc.totalMonthlyPiti,
      existingMonthlyDebt: parseFloat(dtiOtherDebt) || 0,
    });
  }, [dtiGrossIncome, fhaCalc.totalMonthlyPiti, dtiOtherDebt]);

  const handleSaveBox4 = () => {
    const newItem: SavedFHAItem = {
      id: Date.now().toString(),
      title: "FHA Debt-to-Income Qualification",
      inputsSummary: `Income: ${currencySymbol}${parseFloat(dtiGrossIncome).toLocaleString()}/mo | Housing PITI: ${currencySymbol}${fhaCalc.totalMonthlyPiti.toLocaleString()}/mo | Other Debt: ${currencySymbol}${parseFloat(dtiOtherDebt).toLocaleString()}/mo`,
      primaryResult: `Front-End: ${dtiCalc.frontEndDTI}% | Back-End: ${dtiCalc.backEndDTI}% (${dtiCalc.statusBadge})`,
      detailsList: [
        `Meets Standard 31/43 Benchmark: ${dtiCalc.meetsStandard31_43 ? "Yes" : "No"}`,
        `Meets AUS Compensating 46.9/56.9 Limit: ${dtiCalc.meetsAUS_46_56 ? "Yes" : "No"}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox4Items];
    setSavedBox4Items(updated);
    try {
      localStorage.setItem("saved_fha_box4", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  // =========================================================================
  // BOX 5: FHA 203(k) REHABILITATION LOAN STATES
  // =========================================================================
  const [kRepairBudget, setKRepairBudget] = useState<string>("35000");
  const [kContingencyPct, setKContingencyPct] = useState<string>("15");
  const [kArv, setKArv] = useState<string>("420000");

  const [savedBox5Items, setSavedBox5Items] = useState<SavedFHAItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);
  const [showHistoryBox5, setShowHistoryBox5] = useState<boolean>(false);

  const kCalc = useMemo(() => {
    return calculateFHA203k({
      purchasePrice: parseFloat(homePrice) || 350000,
      repairEscrowBudget: parseFloat(kRepairBudget) || 0,
      contingencyPct: parseFloat(kContingencyPct) || 15,
      arv: parseFloat(kArv) || 0,
    });
  }, [homePrice, kRepairBudget, kContingencyPct, kArv]);

  const handleSaveBox5 = () => {
    const newItem: SavedFHAItem = {
      id: Date.now().toString(),
      title: "FHA 203(k) Renovation Loan Analysis",
      inputsSummary: `Purchase: ${currencySymbol}${parseFloat(homePrice).toLocaleString()} | Repairs: ${currencySymbol}${parseFloat(kRepairBudget).toLocaleString()} | ARV: ${currencySymbol}${parseFloat(kArv).toLocaleString()}`,
      primaryResult: `Total 203k Loan: ${currencySymbol}${kCalc.totalFinancedLoanAmount.toLocaleString()} | Payment: ${currencySymbol}${kCalc.estimatedMonthlyPayment.toLocaleString()}/mo`,
      detailsList: [
        `Total Renovation Escrow Budget: ${currencySymbol}${kCalc.totalRenovationBudget.toLocaleString()}`,
        `Base 203k Loan Amount: ${currencySymbol}${kCalc.base203kLoanAmount.toLocaleString()}`,
        `Financed UFMIP: ${currencySymbol}${kCalc.ufmipAmount.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox5Items];
    setSavedBox5Items(updated);
    try {
      localStorage.setItem("saved_fha_box5", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  // =========================================================================
  // BOX 6: EXTRA PAYMENTS & EARLY PAYOFF SIMULATOR STATES
  // =========================================================================
  const [extraPayment, setExtraPayment] = useState<string>("150");

  const [savedBox6Items, setSavedBox6Items] = useState<SavedFHAItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);
  const [showHistoryBox6, setShowHistoryBox6] = useState<boolean>(false);

  const prepayCalc = useMemo(() => {
    return calculateFHAPrepayment({
      baseLoanAmount: fhaCalc.totalFinancedLoanAmount,
      interestRate: parseFloat(interestRate) || 6.5,
      loanTermYears: parseFloat(loanTermYears) || 30,
      extraMonthlyPayment: parseFloat(extraPayment) || 0,
    });
  }, [fhaCalc.totalFinancedLoanAmount, interestRate, loanTermYears, extraPayment]);

  const handleSaveBox6 = () => {
    const newItem: SavedFHAItem = {
      id: Date.now().toString(),
      title: "FHA Extra Payments & Early Payoff",
      inputsSummary: `Loan: ${currencySymbol}${fhaCalc.totalFinancedLoanAmount.toLocaleString()} | Extra Payment: ${currencySymbol}${parseFloat(extraPayment).toLocaleString()}/mo`,
      primaryResult: `Interest Saved: ${currencySymbol}${prepayCalc.interestSaved.toLocaleString()} | ${prepayCalc.monthsSaved} Months Saved`,
      detailsList: [
        `Original Term: ${prepayCalc.originalMonths} Months → New Term: ${prepayCalc.newMonths} Months`,
        `Estimated MIP Saved: ${currencySymbol}${prepayCalc.mipSaved.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox6Items];
    setSavedBox6Items(updated);
    try {
      localStorage.setItem("saved_fha_box6", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  // Load saved calculations on initial render
  useEffect(() => {
    try {
      const b1 = localStorage.getItem("saved_fha_box1");
      if (b1) setSavedBox1Items(JSON.parse(b1));
      const b2 = localStorage.getItem("saved_fha_box2");
      if (b2) setSavedBox2Items(JSON.parse(b2));
      const b3 = localStorage.getItem("saved_fha_box3");
      if (b3) setSavedBox3Items(JSON.parse(b3));
      const b4 = localStorage.getItem("saved_fha_box4");
      if (b4) setSavedBox4Items(JSON.parse(b4));
      const b5 = localStorage.getItem("saved_fha_box5");
      if (b5) setSavedBox5Items(JSON.parse(b5));
      const b6 = localStorage.getItem("saved_fha_box6");
      if (b6) setSavedBox6Items(JSON.parse(b6));
    } catch (e) {}
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Simple Currency Selector Header */}
      <div className="flex items-center justify-end gap-2 text-xs font-bold">
        <label htmlFor="fha-currency" className="text-slate-500 font-medium">Currency:</label>
        <select
          id="fha-currency"
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
      {/* 1. COMPREHENSIVE FHA PITI ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Comprehensive FHA Monthly Payment & PITI Engine</span>
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
              <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">Purchase, Loan & MIP Options</span>

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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Credit Score Band</label>
                  <select
                    value={creditScoreBand}
                    onChange={(e) => setCreditScoreBand(e.target.value as any)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                  >
                    <option value="580+">580+ (3.5% Min Down)</option>
                    <option value="500-579">500 - 579 (10% Min Down)</option>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Finance UFMIP (1.75%)</label>
                  <div className="flex w-full h-8 bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg font-bold">
                    <button
                      type="button"
                      onClick={() => setFinanceUfmip(true)}
                      className={`flex-1 h-full rounded-md text-[11px] font-extrabold transition-colors cursor-pointer flex items-center justify-center ${
                        financeUfmip ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                      }`}
                    >
                      Yes (Loan)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFinanceUfmip(false)}
                      className={`flex-1 h-full rounded-md text-[11px] font-extrabold transition-colors cursor-pointer flex items-center justify-center ${
                        !financeUfmip ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                      }`}
                    >
                      No (Cash)
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-1 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Annual Taxes</label>
                  <input type="number" value={propertyTaxAnnual} onChange={(e) => setPropertyTaxAnnual(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Annual Insurance</label>
                  <input type="number" value={homeInsuranceAnnual} onChange={(e) => setHomeInsuranceAnnual(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Monthly HOA</label>
                  <input type="number" value={hoaDuesMonthly} onChange={(e) => setHoaDuesMonthly(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
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
                    {currencySymbol}{fhaCalc.totalMonthlyPiti.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 block mt-0.5">/ month</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">P&I Payment</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{currencySymbol}{fhaCalc.monthlyPrincipalAndInterest.toLocaleString()}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Monthly MIP</span>
                    <span className="font-extrabold text-red-500">{currencySymbol}{fhaCalc.monthlyMipAmount.toLocaleString()}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Upfront Cash</span>
                    <span className="font-extrabold text-emerald-600">{currencySymbol}{fhaCalc.totalUpfrontCashRequired.toLocaleString()}</span>
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
            <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans">HUD Underwriting Formulas:</span>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 text-slate-700 dark:text-slate-300">
              <div>{"Base Loan = Home Price - Down Payment = " + currencySymbol + parseFloat(homePrice).toLocaleString() + " - " + currencySymbol + fhaCalc.downPaymentAmount.toLocaleString() + " = " + currencySymbol + fhaCalc.baseLoanAmount.toLocaleString()}</div>
              <div>{"Upfront MIP (1.75%) = " + currencySymbol + fhaCalc.baseLoanAmount.toLocaleString() + " × 1.75% = " + currencySymbol + fhaCalc.ufmipAmount.toLocaleString() + " (" + (financeUfmip ? "Financed into loan = " + currencySymbol + fhaCalc.totalFinancedLoanAmount.toLocaleString() : "Paid cash at closing") + ")"}</div>
              <div>{"Annual MIP (Monthly) = (" + currencySymbol + fhaCalc.baseLoanAmount.toLocaleString() + " × " + fhaCalc.annualMipRate + "%) / 12 = " + currencySymbol + fhaCalc.monthlyMipAmount.toLocaleString() + "/mo (Duration: " + (fhaCalc.mipDurationYears === "Life of Loan" ? "Life of Loan" : `${fhaCalc.mipDurationYears} Years`) + ")"}</div>
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
      {/* 2. FHA VS CONVENTIONAL 97 COMPARISON */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">FHA vs. Conventional 97 Cost Comparison</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Borrower Credit Score</label>
                  <input type="number" value={convCreditScore} onChange={(e) => setConvCreditScore(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Conventional Rate %</label>
                  <input type="number" value={convRate} onChange={(e) => setConvRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Side-by-Side Comparison</span>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">FHA PITI</span>
                  <span className="text-blue-600 text-base">{currencySymbol}{vsConvCalc.fhaMonthlyPiti.toLocaleString()}/mo</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Conventional PITI</span>
                  <span className="text-slate-800 dark:text-slate-200 text-base">{currencySymbol}{vsConvCalc.convMonthlyPiti.toLocaleString()}/mo</span>
                </div>
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-emerald-600">
                {vsConvCalc.recommendation} (Crossover: Month {vsConvCalc.crossoverMonth})
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
      {/* 3. FHA COUNTY LOAN LIMIT VERIFICATION */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">FHA County Loan Limit Verification Tool</span>
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
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Property Type</label>
                <select
                  value={propType}
                  onChange={(e) => setPropType(e.target.value as any)}
                  className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                >
                  <option value="Single Family">Single Family Home</option>
                  <option value="Duplex">Duplex (2 Units)</option>
                  <option value="Triplex">Triplex (3 Units)</option>
                  <option value="Fourplex">Fourplex (4 Units)</option>
                </select>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">2024 HUD Limit Status</span>

              <div className="text-[13px] font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                {countyCalc.statusMessage}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Low-Cost Floor</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">{currencySymbol}{countyCalc.floorLimit.toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">High-Cost Ceiling</span>
                  <span className="font-extrabold text-blue-600">{currencySymbol}{countyCalc.ceilingLimit.toLocaleString()}</span>
                </div>
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
      {/* 4. FHA DTI QUALIFICATION CHECKER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">FHA Debt-to-Income (DTI) Qualification Checker</span>
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Gross Monthly Income</label>
                  <input type="number" value={dtiGrossIncome} onChange={(e) => setDtiGrossIncome(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Other Monthly Debt</label>
                  <input type="number" value={dtiOtherDebt} onChange={(e) => setDtiOtherDebt(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">DTI Underwriting Ratios</span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                {dtiCalc.frontEndDTI}% Front / {dtiCalc.backEndDTI}% Back
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-emerald-600">
                {dtiCalc.statusBadge}
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
      {/* 5. FHA 203(k) REHABILITATION LOAN CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">FHA 203(k) Rehabilitation Loan Calculator</span>
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Repair Escrow Budget</label>
                  <input type="number" value={kRepairBudget} onChange={(e) => setKRepairBudget(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Contingency Reserve %</label>
                  <input type="number" value={kContingencyPct} onChange={(e) => setKContingencyPct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Total 203(k) Financed Loan</span>

              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                {currencySymbol}{kCalc.totalFinancedLoanAmount.toLocaleString()}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Renovation Escrow</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">{currencySymbol}{kCalc.totalRenovationBudget.toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Monthly Payment</span>
                  <span className="font-extrabold text-blue-600">{currencySymbol}{kCalc.estimatedMonthlyPayment.toLocaleString()}/mo</span>
                </div>
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
      {/* 6. FHA EXTRA PAYMENTS & EARLY PAYOFF SIMULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">FHA Extra Payments & Early Payoff Simulator</span>
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
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Extra Monthly Payment ({currencySymbol})</label>
                <input type="number" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Total Interest & MIP Savings</span>

              <div className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums mt-1">
                Save {currencySymbol}{prepayCalc.interestSaved.toLocaleString()} Interest
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Time Saved</span>
                  <span className="font-extrabold text-blue-600">{prepayCalc.monthsSaved} Months</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">MIP Saved</span>
                  <span className="font-extrabold text-emerald-600">{currencySymbol}{prepayCalc.mipSaved.toLocaleString()}</span>
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
