"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, ChevronDown, ChevronUp, Check, Plus } from "lucide-react";
import {
  calculateRentalProperty,
  calculateBRRRR,
  calculateMultiUnitRentRoll,
  calculateTaxDepreciation,
  calculateRulesOfThumb,
  calculateSensitivityMatrix,
} from "@/app/calculators/rental-property-calculator/calculator";
import {
  UnitRentRollItem,
  SavedRentalItem,
} from "@/app/calculators/rental-property-calculator/types";

export function RentalPropertyCalculator() {
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // =========================================================================
  // BOX 1: BUY-AND-HOLD RENTAL ANALYZER STATES
  // =========================================================================
  const [purchasePrice, setPurchasePrice] = useState<string>("200000");
  const [useLoan, setUseLoan] = useState<boolean>(true);
  const [downPaymentPct, setDownPaymentPct] = useState<string>("20");
  const [interestRate, setInterestRate] = useState<string>("6.5");
  const [loanTermYears, setLoanTermYears] = useState<string>("30");
  const [closingCosts, setClosingCosts] = useState<string>("5000");
  const [initialRehab, setInitialRehab] = useState<string>("0");
  const [arv, setArv] = useState<string>("200000");

  const [monthlyRent, setMonthlyRent] = useState<string>("2000");
  const [rentGrowthPct, setRentGrowthPct] = useState<string>("3");
  const [otherIncome, setOtherIncome] = useState<string>("0");
  const [vacancyRatePct, setVacancyRatePct] = useState<string>("5");
  const [managementFeePct, setManagementFeePct] = useState<string>("8");

  const [annualPropertyTax, setAnnualPropertyTax] = useState<string>("3000");
  const [annualInsurance, setAnnualInsurance] = useState<string>("1200");
  const [monthlyHoa, setMonthlyHoa] = useState<string>("0");
  const [annualMaintenance, setAnnualMaintenance] = useState<string>("2000");
  const [monthlyUtilities, setMonthlyUtilities] = useState<string>("0");
  const [otherCostsAnnual, setOtherCostsAnnual] = useState<string>("500");

  const [holdingPeriodYears, setHoldingPeriodYears] = useState<number>(20);
  const [appreciationPct, setAppreciationPct] = useState<string>("3");
  const [costToSellPct, setCostToSellPct] = useState<string>("8");

  const [savedBox1Items, setSavedBox1Items] = useState<SavedRentalItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);
  const [showHistoryBox1, setShowHistoryBox1] = useState<boolean>(false);

  const buyHoldCalc = useMemo(() => {
    return calculateRentalProperty({
      purchasePrice: parseFloat(purchasePrice) || 0,
      useLoan,
      downPaymentPct: parseFloat(downPaymentPct) || 20,
      interestRate: parseFloat(interestRate) || 0,
      loanTermYears: parseFloat(loanTermYears) || 30,
      closingCosts: parseFloat(closingCosts) || 0,
      initialRehab: parseFloat(initialRehab) || 0,
      afterRepairValue: parseFloat(arv) || parseFloat(purchasePrice) || 0,
      monthlyRent: parseFloat(monthlyRent) || 0,
      rentGrowthPct: parseFloat(rentGrowthPct) || 0,
      otherIncome: parseFloat(otherIncome) || 0,
      otherIncomeGrowthPct: 0,
      vacancyRatePct: parseFloat(vacancyRatePct) || 0,
      managementFeePct: parseFloat(managementFeePct) || 0,
      annualPropertyTax: parseFloat(annualPropertyTax) || 0,
      propertyTaxGrowthPct: 2,
      annualInsurance: parseFloat(annualInsurance) || 0,
      insuranceGrowthPct: 2,
      monthlyHoa: parseFloat(monthlyHoa) || 0,
      annualMaintenance: parseFloat(annualMaintenance) || 0,
      monthlyUtilities: parseFloat(monthlyUtilities) || 0,
      otherCostsAnnual: parseFloat(otherCostsAnnual) || 0,
      holdingPeriodYears: holdingPeriodYears,
      appreciationPct: parseFloat(appreciationPct) || 0,
      costToSellPct: parseFloat(costToSellPct) || 0,
      currencySymbol,
    });
  }, [
    purchasePrice,
    useLoan,
    downPaymentPct,
    interestRate,
    loanTermYears,
    closingCosts,
    initialRehab,
    arv,
    monthlyRent,
    rentGrowthPct,
    otherIncome,
    vacancyRatePct,
    managementFeePct,
    annualPropertyTax,
    annualInsurance,
    monthlyHoa,
    annualMaintenance,
    monthlyUtilities,
    otherCostsAnnual,
    holdingPeriodYears,
    appreciationPct,
    costToSellPct,
    currencySymbol,
  ]);

  const handleSaveBox1 = () => {
    const newItem: SavedRentalItem = {
      id: Date.now().toString(),
      title: "Buy & Hold Property Analysis",
      inputsSummary: `Price: ${currencySymbol}${parseFloat(purchasePrice).toLocaleString()} | Down: ${downPaymentPct}% | Rent: ${currencySymbol}${parseFloat(monthlyRent).toLocaleString()}/mo | Holding: ${holdingPeriodYears} yrs`,
      primaryResult: `IRR: ${buyHoldCalc.irr}% | Cash-on-Cash: ${buyHoldCalc.cashOnCashReturn}%`,
      detailsList: [
        `Cap Rate: ${buyHoldCalc.capRate}%`,
        `Monthly Net Cash Flow: ${currencySymbol}${buyHoldCalc.monthlyNetCashFlow.toLocaleString()}/mo`,
        `Annual NOI: ${currencySymbol}${buyHoldCalc.annualNOI.toLocaleString()}/yr`,
        `Total Initial Cash Invested: ${currencySymbol}${buyHoldCalc.initialCashInvested.toLocaleString()}`,
        `Total Net Profit at Sale: ${currencySymbol}${buyHoldCalc.totalNetProfitAtSale.toLocaleString()}`,
        `Debt Service Coverage Ratio (DSCR): ${buyHoldCalc.dscr}x`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox1Items];
    setSavedBox1Items(updated);
    try {
      localStorage.setItem("saved_rental_box1", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  // =========================================================================
  // BOX 2: BRRRR STRATEGY EVALUATOR STATES
  // =========================================================================
  const [brrrrPurchase, setBrrrrPurchase] = useState<string>("150000");
  const [brrrrRehab, setBrrrrRehab] = useState<string>("40000");
  const [brrrrArv, setBrrrrArv] = useState<string>("260000");
  const [brrrrRent, setBrrrrRent] = useState<string>("2400");
  const [brrrrLtv, setBrrrrLtv] = useState<string>("75");
  const [brrrrRate, setBrrrrRate] = useState<string>("6.5");

  const [savedBox2Items, setSavedBox2Items] = useState<SavedRentalItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);
  const [showHistoryBox2, setShowHistoryBox2] = useState<boolean>(false);

  const brrrrCalc = useMemo(() => {
    return calculateBRRRR({
      purchasePrice: parseFloat(brrrrPurchase) || 0,
      rehabCost: parseFloat(brrrrRehab) || 0,
      arv: parseFloat(brrrrArv) || 0,
      postRehabMonthlyRent: parseFloat(brrrrRent) || 0,
      refinanceLtvPct: parseFloat(brrrrLtv) || 75,
      refinanceInterestRate: parseFloat(brrrrRate) || 6.5,
      refinanceTermYears: 30,
    });
  }, [brrrrPurchase, brrrrRehab, brrrrArv, brrrrRent, brrrrLtv, brrrrRate]);

  const handleSaveBox2 = () => {
    const newItem: SavedRentalItem = {
      id: Date.now().toString(),
      title: "BRRRR Deal Analysis",
      inputsSummary: `Buy: ${currencySymbol}${parseFloat(brrrrPurchase).toLocaleString()} | Rehab: ${currencySymbol}${parseFloat(brrrrRehab).toLocaleString()} | ARV: ${currencySymbol}${parseFloat(brrrrArv).toLocaleString()} | Refi: ${brrrrLtv}% LTV`,
      primaryResult: brrrrCalc.isInfiniteReturn
        ? `Infinite Return! Recouped ${currencySymbol}${brrrrCalc.cashRecoupedAtRefinance.toLocaleString()}`
        : `Net Trapped Capital: ${currencySymbol}${brrrrCalc.netCapitalTrapped.toLocaleString()}`,
      detailsList: [
        `Total Initial Cash Outlay: ${currencySymbol}${brrrrCalc.totalInitialCashOutlay.toLocaleString()}`,
        `Refinance Loan Amount: ${currencySymbol}${brrrrCalc.refinanceLoanAmount.toLocaleString()}`,
        `Post-Refinance Monthly Cash Flow: ${currencySymbol}${brrrrCalc.postRefinanceMonthlyCashFlow.toLocaleString()}/mo`,
        `Post-Refinance Mortgage: ${currencySymbol}${brrrrCalc.postRefinanceMonthlyMortgage.toLocaleString()}/mo`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox2Items];
    setSavedBox2Items(updated);
    try {
      localStorage.setItem("saved_rental_box2", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  // =========================================================================
  // BOX 3: MULTI-UNIT RENT ROLL ANALYZER STATES
  // =========================================================================
  const [rentRollUnits, setRentRollUnits] = useState<UnitRentRollItem[]>([
    { id: "1", unitName: "Unit 1 (2 Bed)", bedrooms: "2", monthlyRent: 1800, vacancyRatePct: 5 },
    { id: "2", unitName: "Unit 2 (1 Bed)", bedrooms: "1", monthlyRent: 1400, vacancyRatePct: 5 },
    { id: "3", unitName: "Unit 3 (Studio)", bedrooms: "Studio", monthlyRent: 1100, vacancyRatePct: 5 },
  ]);
  const [laundryIncome, setLaundryIncome] = useState<string>("150");

  const [savedBox3Items, setSavedBox3Items] = useState<SavedRentalItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);
  const [showHistoryBox3, setShowHistoryBox3] = useState<boolean>(false);

  const rentRollCalc = useMemo(() => {
    return calculateMultiUnitRentRoll(rentRollUnits, parseFloat(laundryIncome) || 0);
  }, [rentRollUnits, laundryIncome]);

  const updateRentRollUnit = (id: string, field: keyof UnitRentRollItem, val: any) => {
    setRentRollUnits((prev) =>
      prev.map((u) => (u.id === id ? { ...u, [field]: val } : u))
    );
  };

  const addRentRollUnit = () => {
    if (rentRollUnits.length >= 8) return;
    const newId = (rentRollUnits.length + 1).toString();
    setRentRollUnits((prev) => [
      ...prev,
      { id: newId, unitName: `Unit ${newId}`, bedrooms: "2", monthlyRent: 1200, vacancyRatePct: 5 },
    ]);
  };

  const removeRentRollUnit = (id: string) => {
    if (rentRollUnits.length <= 1) return;
    setRentRollUnits((prev) => prev.filter((u) => u.id !== id));
  };

  const handleSaveBox3 = () => {
    const newItem: SavedRentalItem = {
      id: Date.now().toString(),
      title: "Multi-Unit Rent Roll Analysis",
      inputsSummary: `${rentRollCalc.totalUnits} Units | Gross Potential: ${currencySymbol}${rentRollCalc.totalGrossPotentialIncome.toLocaleString()}/mo`,
      primaryResult: `Effective Income: ${currencySymbol}${rentRollCalc.totalEffectiveIncome.toLocaleString()}/mo`,
      detailsList: [
        `Average Rent per Unit: ${currencySymbol}${rentRollCalc.averageRentPerUnit.toLocaleString()}/mo`,
        `Units Itemized: ${rentRollUnits.map((u) => `${u.unitName}: ${currencySymbol}${u.monthlyRent}`).join(" | ")}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox3Items];
    setSavedBox3Items(updated);
    try {
      localStorage.setItem("saved_rental_box3", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  // =========================================================================
  // BOX 4: TAX DEPRECIATION SHIELD SIMULATOR STATES
  // =========================================================================
  const [taxPurchasePrice, setTaxPurchasePrice] = useState<string>("250000");
  const [landValuePct, setLandValuePct] = useState<string>("20");
  const [taxBracketPct, setTaxBracketPct] = useState<string>("24");

  const [savedBox4Items, setSavedBox4Items] = useState<SavedRentalItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);
  const [showHistoryBox4, setShowHistoryBox4] = useState<boolean>(false);

  const taxCalc = useMemo(() => {
    return calculateTaxDepreciation(
      {
        purchasePrice: parseFloat(taxPurchasePrice) || 0,
        landValuePct: parseFloat(landValuePct) || 20,
        taxBracketPct: parseFloat(taxBracketPct) || 24,
      },
      parseFloat(monthlyRent) || 2000
    );
  }, [taxPurchasePrice, landValuePct, taxBracketPct, monthlyRent]);

  const handleSaveBox4 = () => {
    const newItem: SavedRentalItem = {
      id: Date.now().toString(),
      title: "27.5-Year Tax Depreciation Shield",
      inputsSummary: `Price: ${currencySymbol}${parseFloat(taxPurchasePrice).toLocaleString()} | Land: ${landValuePct}% | Tax Bracket: ${taxBracketPct}%`,
      primaryResult: `Monthly Tax Savings: ${currencySymbol}${taxCalc.monthlyTaxShieldSavings.toLocaleString()}/mo`,
      detailsList: [
        `Depreciable Building Value: ${currencySymbol}${taxCalc.depreciableBuildingValue.toLocaleString()}`,
        `Annual MACRS Depreciation: ${currencySymbol}${taxCalc.annualDepreciationDeduction.toLocaleString()}/yr`,
        `Tax Shielded Rent Share: ${taxCalc.taxShieldedPctOfRent}% of gross rent`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox4Items];
    setSavedBox4Items(updated);
    try {
      localStorage.setItem("saved_rental_box4", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  // =========================================================================
  // BOX 5: RULES-OF-THUMB QUICK CHECKER STATES
  // =========================================================================
  const [rotPrice, setRotPrice] = useState<string>("180000");
  const [rotRehab, setRotRehab] = useState<string>("20000");
  const [rotRent, setRotRent] = useState<string>("2000");
  const [rotArv, setRotArv] = useState<string>("240000");

  const [savedBox5Items, setSavedBox5Items] = useState<SavedRentalItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);
  const [showHistoryBox5, setShowHistoryBox5] = useState<boolean>(false);

  const rotCalc = useMemo(() => {
    return calculateRulesOfThumb({
      purchasePrice: parseFloat(rotPrice) || 0,
      rehabCost: parseFloat(rotRehab) || 0,
      grossMonthlyRent: parseFloat(rotRent) || 0,
      arv: parseFloat(rotArv) || 0,
    });
  }, [rotPrice, rotRehab, rotRent, rotArv]);

  const handleSaveBox5 = () => {
    const newItem: SavedRentalItem = {
      id: Date.now().toString(),
      title: "Real Estate Rules-of-Thumb Analysis",
      inputsSummary: `Price: ${currencySymbol}${parseFloat(rotPrice).toLocaleString()} | Rehab: ${currencySymbol}${parseFloat(rotRehab).toLocaleString()} | Rent: ${currencySymbol}${parseFloat(rotRent).toLocaleString()}`,
      primaryResult: `1% Rule Score: ${rotCalc.onePercentRulePct}% (${rotCalc.passesOnePercent ? "PASS" : "FAIL"})`,
      detailsList: [
        `50% Rule Est. OpEx: ${currencySymbol}${rotCalc.estimated50PercentOpEx.toLocaleString()}/mo`,
        `50% Rule Est. Pre-Debt Cash Flow: ${currencySymbol}${rotCalc.estimated50PercentCashFlow.toLocaleString()}/mo`,
        `70% Rule Max Allowable Offer (MAO): ${currencySymbol}${rotCalc.maxAllowableOffer70.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox5Items];
    setSavedBox5Items(updated);
    try {
      localStorage.setItem("saved_rental_box5", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  // =========================================================================
  // BOX 6: SENSITIVITY MATRIX STATES
  // =========================================================================
  const [savedBox6Items, setSavedBox6Items] = useState<SavedRentalItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);
  const [showHistoryBox6, setShowHistoryBox6] = useState<boolean>(false);

  const matrixCalc = useMemo(() => {
    return calculateSensitivityMatrix(
      parseFloat(monthlyRent) || 2000,
      parseFloat(purchasePrice) || 200000,
      parseFloat(interestRate) || 6.5
    );
  }, [monthlyRent, purchasePrice, interestRate]);

  const handleSaveBox6 = () => {
    const newItem: SavedRentalItem = {
      id: Date.now().toString(),
      title: "Sensitivity & Stress-Test Matrix",
      inputsSummary: `Base Rent: ${currencySymbol}${parseFloat(monthlyRent).toLocaleString()} | Price: ${currencySymbol}${parseFloat(purchasePrice).toLocaleString()} | Base Rate: ${interestRate}%`,
      primaryResult: `Stress-Tested Cash Flow Matrix Evaluated`,
      detailsList: matrixCalc.matrix.map(
        (m) => `Vacancy ${m.vacancyPct}%: @${parseFloat(interestRate) - 1}%=${currencySymbol}${m.rateMinus1}/mo, @${interestRate}%=${currencySymbol}${m.rateBase}/mo, @${parseFloat(interestRate) + 1}%=${currencySymbol}${m.ratePlus1}/mo`
      ),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox6Items];
    setSavedBox6Items(updated);
    try {
      localStorage.setItem("saved_rental_box6", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  // Load saved calculations on initial render
  useEffect(() => {
    try {
      const b1 = localStorage.getItem("saved_rental_box1");
      if (b1) setSavedBox1Items(JSON.parse(b1));
      const b2 = localStorage.getItem("saved_rental_box2");
      if (b2) setSavedBox2Items(JSON.parse(b2));
      const b3 = localStorage.getItem("saved_rental_box3");
      if (b3) setSavedBox3Items(JSON.parse(b3));
      const b4 = localStorage.getItem("saved_rental_box4");
      if (b4) setSavedBox4Items(JSON.parse(b4));
      const b5 = localStorage.getItem("saved_rental_box5");
      if (b5) setSavedBox5Items(JSON.parse(b5));
      const b6 = localStorage.getItem("saved_rental_box6");
      if (b6) setSavedBox6Items(JSON.parse(b6));
    } catch (e) {}
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Simple Currency Selector Header */}
      <div className="flex items-center justify-end gap-2 text-xs font-bold">
        <label htmlFor="rental-currency" className="text-slate-500 font-medium">Currency:</label>
        <select
          id="rental-currency"
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
      {/* 1. COMPREHENSIVE BUY-AND-HOLD RENTAL ANALYZER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Comprehensive Buy-and-Hold Rental Property Analyzer</span>
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
            {/* Input Card */}
            <div className="lg:col-span-7 space-y-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs text-xs">
              <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">Purchase, Loan & Cash Flow Inputs</span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Purchase Price</label>
                  <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Down Payment %</label>
                  <input type="number" value={downPaymentPct} onChange={(e) => setDownPaymentPct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Interest Rate %</label>
                  <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Loan Term (yrs)</label>
                  <input type="number" value={loanTermYears} onChange={(e) => setLoanTermYears(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Monthly Rent</label>
                  <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Vacancy Rate %</label>
                  <input type="number" value={vacancyRatePct} onChange={(e) => setVacancyRatePct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Management %</label>
                  <input type="number" value={managementFeePct} onChange={(e) => setManagementFeePct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Closing Costs</label>
                  <input type="number" value={closingCosts} onChange={(e) => setClosingCosts(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Annual Taxes</label>
                  <input type="number" value={annualPropertyTax} onChange={(e) => setAnnualPropertyTax(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Annual Insurance</label>
                  <input type="number" value={annualInsurance} onChange={(e) => setAnnualInsurance(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Annual Maint.</label>
                  <input type="number" value={annualMaintenance} onChange={(e) => setAnnualMaintenance(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Holding (Yrs)</label>
                  <input type="number" value={holdingPeriodYears} onChange={(e) => setHoldingPeriodYears(parseInt(e.target.value) || 20)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-blue-50/60 dark:bg-slate-900/80 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-5 shadow-xs space-y-4 text-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  Investment Returns Summary
                </span>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900/40">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">IRR (20-Yr)</span>
                    <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                      {buyHoldCalc.irr}%
                    </span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900/40">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Cash-on-Cash</span>
                    <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                      {buyHoldCalc.cashOnCashReturn}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Cap Rate</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{buyHoldCalc.capRate}%</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Monthly Cash Flow</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{currencySymbol}{buyHoldCalc.monthlyNetCashFlow.toLocaleString()}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Annual NOI</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{currencySymbol}{buyHoldCalc.annualNOI.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Derivation Box */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs space-y-2 font-mono">
            <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans">Financial Derivation Equations:</span>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 text-slate-700 dark:text-slate-300">
              <div>{"NOI = Effective Rent - OpEx = " + currencySymbol + buyHoldCalc.monthlyEffectiveIncome.toLocaleString() + " - " + currencySymbol + buyHoldCalc.monthlyOperatingExpenses.toLocaleString() + " = " + currencySymbol + buyHoldCalc.monthlyNOI.toLocaleString() + "/mo (" + currencySymbol + buyHoldCalc.annualNOI.toLocaleString() + "/yr)"}</div>
              <div>{"Cap Rate = (Annual NOI / Purchase Price) × 100% = (" + currencySymbol + buyHoldCalc.annualNOI.toLocaleString() + " / " + currencySymbol + parseFloat(purchasePrice).toLocaleString() + ") × 100% = " + buyHoldCalc.capRate + "%"}</div>
              <div>{"Cash-on-Cash = (Annual Net Cash Flow / Total Cash Invested) × 100% = (" + currencySymbol + buyHoldCalc.annualNetCashFlow.toLocaleString() + " / " + currencySymbol + buyHoldCalc.initialCashInvested.toLocaleString() + ") × 100% = " + buyHoldCalc.cashOnCashReturn + "%"}</div>
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
      {/* 2. BRRRR STRATEGY EVALUATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">BRRRR Strategy Evaluator</span>
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
            <div className="lg:col-span-7 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Purchase Price</label>
                  <input type="number" value={brrrrPurchase} onChange={(e) => setBrrrrPurchase(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Rehab Cost</label>
                  <input type="number" value={brrrrRehab} onChange={(e) => setBrrrrRehab(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">After Repair Value (ARV)</label>
                  <input type="number" value={brrrrArv} onChange={(e) => setBrrrrArv(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Post-Rehab Rent</label>
                  <input type="number" value={brrrrRent} onChange={(e) => setBrrrrRent(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Refi LTV %</label>
                  <input type="number" value={brrrrLtv} onChange={(e) => setBrrrrLtv(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Refi Interest Rate %</label>
                  <input type="number" value={brrrrRate} onChange={(e) => setBrrrrRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-5 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">BRRRR Capital Recoup</span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                {brrrrCalc.isInfiniteReturn ? "Infinite Return Velocity" : `Trapped Capital: ${currencySymbol}${brrrrCalc.netCapitalTrapped.toLocaleString()}`}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Refi Cash Out</span>
                  <span className="font-extrabold text-emerald-600">{currencySymbol}{brrrrCalc.cashRecoupedAtRefinance.toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Post-Refi Cash Flow</span>
                  <span className="font-extrabold text-blue-600">{currencySymbol}{brrrrCalc.postRefinanceMonthlyCashFlow.toLocaleString()}/mo</span>
                </div>
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
      {/* 3. MULTI-UNIT RENT ROLL ANALYZER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Multi-Unit / Multifamily Rent Roll Analyzer</span>
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
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Other Income (Laundry / Parking) ({currencySymbol})</label>
              <input type="number" value={laundryIncome} onChange={(e) => setLaundryIncome(e.target.value)} className="h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold w-40" />
            </div>
            <button
              onClick={addRentRollUnit}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Unit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {rentRollUnits.map((u) => (
              <div key={u.id} className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 relative">
                <div className="flex items-center justify-between font-bold">
                  <input
                    type="text"
                    value={u.unitName}
                    onChange={(e) => updateRentRollUnit(u.id, "unitName", e.target.value)}
                    className="bg-transparent border-b border-slate-300 dark:border-slate-700 font-extrabold focus:outline-none"
                  />
                  {rentRollUnits.length > 1 && (
                    <button onClick={() => removeRentRollUnit(u.id)} className="text-slate-400 hover:text-red-500 cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block">Rent ({currencySymbol})</label>
                    <input type="number" value={u.monthlyRent} onChange={(e) => updateRentRollUnit(u.id, "monthlyRent", parseFloat(e.target.value) || 0)} className="w-full h-7 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold block">Vacancy %</label>
                    <input type="number" value={u.vacancyRatePct} onChange={(e) => updateRentRollUnit(u.id, "vacancyRatePct", parseFloat(e.target.value) || 0)} className="w-full h-7 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Simple Result Card */}
          <div className="bg-blue-50/60 dark:bg-slate-900/80 p-4 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center grid grid-cols-3 gap-3 text-xs font-bold">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Gross Potential</span>
              <span className="text-base text-blue-600">{currencySymbol}{rentRollCalc.totalGrossPotentialIncome.toLocaleString()}/mo</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Effective Revenue</span>
              <span className="text-base text-emerald-600">{currencySymbol}{rentRollCalc.totalEffectiveIncome.toLocaleString()}/mo</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Avg Rent / Unit</span>
              <span className="text-base text-slate-800 dark:text-slate-200">{currencySymbol}{rentRollCalc.averageRentPerUnit.toLocaleString()}/mo</span>
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
      {/* 4. TAX DEPRECIATION & SCHEDULE E SHIELD SIMULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">27.5-Year Tax Depreciation Shield Simulator</span>
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
            <div className="lg:col-span-7 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Purchase Price</label>
                  <input type="number" value={taxPurchasePrice} onChange={(e) => setTaxPurchasePrice(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Land Value %</label>
                  <input type="number" value={landValuePct} onChange={(e) => setLandValuePct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tax Bracket %</label>
                  <input type="number" value={taxBracketPct} onChange={(e) => setTaxBracketPct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-5 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Monthly Tax Shield Savings</span>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                {currencySymbol}{taxCalc.monthlyTaxShieldSavings.toLocaleString()}
                <span className="text-xs font-normal text-slate-500"> / month</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Annual MACRS Deduction</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">{currencySymbol}{taxCalc.annualDepreciationDeduction.toLocaleString()}/yr</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Rent Shielded</span>
                  <span className="font-extrabold text-emerald-600">{taxCalc.taxShieldedPctOfRent}%</span>
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
      {/* 5. RULES-OF-THUMB QUICK CHECKER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Rules-of-Thumb Quick Checker (1%, 2%, 50%, 70%)</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Purchase Price</label>
                  <input type="number" value={rotPrice} onChange={(e) => setRotPrice(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Rehab Cost</label>
                  <input type="number" value={rotRehab} onChange={(e) => setRotRehab(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Monthly Rent</label>
                  <input type="number" value={rotRent} onChange={(e) => setRotRent(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">After Repair Value (ARV)</label>
                  <input type="number" value={rotArv} onChange={(e) => setRotArv(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Rules-of-Thumb Audit</span>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold pt-1">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">1% Rule</span>
                  <span className={rotCalc.passesOnePercent ? "text-emerald-600 font-extrabold text-sm" : "text-amber-600 font-extrabold text-sm"}>
                    {rotCalc.onePercentRulePct}% ({rotCalc.passesOnePercent ? "PASS" : "FAIL"})
                  </span>
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">50% Est. OpEx</span>
                  <span className="text-slate-800 dark:text-slate-200 text-sm font-extrabold">{currencySymbol}{rotCalc.estimated50PercentOpEx.toLocaleString()}/mo</span>
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">70% Rule MAO</span>
                  <span className="text-blue-600 text-sm font-extrabold">{currencySymbol}{rotCalc.maxAllowableOffer70.toLocaleString()}</span>
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
      {/* 6. SENSITIVITY MATRIX & STRESS-TEST SCENARIO ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Sensitivity Matrix & Stress-Test Scenario Engine</span>
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
          <div className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">
            Stress-Test Cash Flow Matrix (Vacancy Rate vs. Interest Rate Shifting):
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-sans font-bold">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3">Vacancy Rate</th>
                  <th className="p-3">Rate -1% ({parseFloat(interestRate) - 1}%)</th>
                  <th className="p-3 text-blue-600">Base Rate ({interestRate}%)</th>
                  <th className="p-3">Rate +1% ({parseFloat(interestRate) + 1}%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-mono">
                {matrixCalc.matrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-sans font-bold text-slate-900 dark:text-slate-100">{row.vacancyPct}% Vacancy</td>
                    <td className="p-3 text-emerald-600">{currencySymbol}{row.rateMinus1.toLocaleString()}/mo</td>
                    <td className="p-3 text-blue-600 font-extrabold">{currencySymbol}{row.rateBase.toLocaleString()}/mo</td>
                    <td className="p-3 text-slate-700 dark:text-slate-300">{currencySymbol}{row.ratePlus1.toLocaleString()}/mo</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
