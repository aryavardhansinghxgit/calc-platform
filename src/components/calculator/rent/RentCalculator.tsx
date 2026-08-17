"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Share2,
  Plus,
  Sparkles
} from "lucide-react";
import {
  calculateIncomeAffordability,
  calculate503020Budget,
  calculateTrueCostUtilities,
  calculateUpfrontMoveIn,
  calculateRoommateSplit,
  calculateRentVsBuy
} from "@/app/calculators/rent-calculator/calculator";
import {
  IncomeFrequency,
  AffordabilityRule,
  RoommateItem,
  SavedRentItem
} from "@/app/calculators/rent-calculator/types";

export function RentCalculator() {
  // =========================================================================
  // BOX 1: INCOME-BASED RENT AFFORDABILITY STATES
  // =========================================================================
  const [incomeFreq, setIncomeFreq] = useState<IncomeFrequency>("annual");
  const [grossIncome, setGrossIncome] = useState<string>("72000");
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("40");
  const [monthlyDebt, setMonthlyDebt] = useState<string>("300");
  const [rulePreset, setRulePreset] = useState<AffordabilityRule>("30");
  const [customPercent, setCustomPercent] = useState<number>(30);
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  const [savedBox1Items, setSavedBox1Items] = useState<SavedRentItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);
  const [showHistoryBox1, setShowHistoryBox1] = useState<boolean>(false);

  const affCalc = useMemo(() => {
    const incomeVal = parseFloat(grossIncome) || 0;
    const hoursVal = parseFloat(hoursPerWeek) || 40;
    const debtVal = parseFloat(monthlyDebt) || 0;
    return calculateIncomeAffordability({
      incomeFrequency: incomeFreq,
      grossIncome: incomeVal,
      hoursPerWeek: hoursVal,
      monthlyDebt: debtVal,
      rulePreset,
      customPercent,
      currency: currencySymbol,
    });
  }, [incomeFreq, grossIncome, hoursPerWeek, monthlyDebt, rulePreset, customPercent, currencySymbol]);

  const handleSaveBox1 = () => {
    const newItem: SavedRentItem = {
      id: Date.now().toString(),
      title: "Income Affordability",
      inputsSummary: `Income: ${currencySymbol}${parseFloat(grossIncome).toLocaleString()} (${incomeFreq}) | Debt: ${currencySymbol}${parseFloat(monthlyDebt).toLocaleString()}/mo | Rule: ${rulePreset}%`,
      primaryResult: `Max Rent: ${currencySymbol}${affCalc.maxMonthlyRent.toLocaleString()}/mo`,
      detailsList: [
        `Recommended Range: ${currencySymbol}${affCalc.recommendedLow.toLocaleString()} - ${currencySymbol}${affCalc.recommendedHigh.toLocaleString()}/mo`,
        `Front-End DTI: ${affCalc.frontEndRatio}%`,
        `Back-End DTI: ${affCalc.backEndRatio}%`,
        `Leftover Discretionary: ${currencySymbol}${affCalc.remainingDiscretionary.toLocaleString()}/mo`,
        `Status: ${affCalc.dtiStatus}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox1Items];
    setSavedBox1Items(updated);
    try {
      localStorage.setItem("saved_rent_box1", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  // =========================================================================
  // BOX 2: NET TAKE-HOME PAY & 50/30/20 BUDGET STATES
  // =========================================================================
  const [takeHomePay, setTakeHomePay] = useState<string>("4500");
  const [needsPct, setNeedsPct] = useState<number>(50);
  const [wantsPct, setWantsPct] = useState<number>(30);
  const [savingsPct, setSavingsPct] = useState<number>(20);

  const [savedBox2Items, setSavedBox2Items] = useState<SavedRentItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);
  const [showHistoryBox2, setShowHistoryBox2] = useState<boolean>(false);

  const budgetCalc = useMemo(() => {
    const netVal = parseFloat(takeHomePay) || 0;
    return calculate503020Budget({
      monthlyTakeHome: netVal,
      needsPercent: needsPct,
      wantsPercent: wantsPct,
      savingsPercent: savingsPct,
    });
  }, [takeHomePay, needsPct, wantsPct, savingsPct]);

  const handleSaveBox2 = () => {
    const newItem: SavedRentItem = {
      id: Date.now().toString(),
      title: "50/30/20 Budget Allocation",
      inputsSummary: `Take-Home Pay: ${currencySymbol}${parseFloat(takeHomePay).toLocaleString()}/mo | Allocation: ${needsPct}/${wantsPct}/${savingsPct}`,
      primaryResult: `Max Rent: ${currencySymbol}${budgetCalc.maxRentFromNeeds.toLocaleString()}/mo`,
      detailsList: [
        `Needs (${needsPct}%): ${currencySymbol}${budgetCalc.needsAmount.toLocaleString()}/mo`,
        `Wants (${wantsPct}%): ${currencySymbol}${budgetCalc.wantsAmount.toLocaleString()}/mo`,
        `Savings (${savingsPct}%): ${currencySymbol}${budgetCalc.savingsAmount.toLocaleString()}/mo`,
        `Utilities & Groceries: ${currencySymbol}${budgetCalc.utilitiesGroceriesFromNeeds.toLocaleString()}/mo`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox2Items];
    setSavedBox2Items(updated);
    try {
      localStorage.setItem("saved_rent_box2", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  // =========================================================================
  // BOX 3: TRUE COST OF RENTING & UTILITIES STATES
  // =========================================================================
  const [baseRent, setBaseRent] = useState<string>("1800");
  const [electricGas, setElectricGas] = useState<string>("120");
  const [waterSewer, setWaterSewer] = useState<string>("45");
  const [internet, setInternet] = useState<string>("65");
  const [insurance, setInsurance] = useState<string>("20");
  const [parking, setParking] = useState<string>("75");
  const [petRent, setPetRent] = useState<string>("30");
  const [amenityFee, setAmenityFee] = useState<string>("25");

  const [savedBox3Items, setSavedBox3Items] = useState<SavedRentItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);
  const [showHistoryBox3, setShowHistoryBox3] = useState<boolean>(false);

  const trueCostCalc = useMemo(() => {
    return calculateTrueCostUtilities({
      baseRent: parseFloat(baseRent) || 0,
      electricityGas: parseFloat(electricGas) || 0,
      waterSewerTrash: parseFloat(waterSewer) || 0,
      internetCable: parseFloat(internet) || 0,
      rentersInsurance: parseFloat(insurance) || 0,
      parkingFee: parseFloat(parking) || 0,
      petRent: parseFloat(petRent) || 0,
      amenityHoaFee: parseFloat(amenityFee) || 0,
    });
  }, [baseRent, electricGas, waterSewer, internet, insurance, parking, petRent, amenityFee]);

  const handleSaveBox3 = () => {
    const newItem: SavedRentItem = {
      id: Date.now().toString(),
      title: "True All-In Housing Overhead",
      inputsSummary: `Base Rent: ${currencySymbol}${parseFloat(baseRent).toLocaleString()} | Utilities & Fees: ${currencySymbol}${trueCostCalc.additionalOverhead.toLocaleString()}`,
      primaryResult: `All-In Monthly: ${currencySymbol}${trueCostCalc.totalMonthlyOverhead.toLocaleString()}/mo`,
      detailsList: [
        `Extra Utility Premium: +${trueCostCalc.percentOverhead}% over base rent`,
        `Itemized Utilities: Electric/Gas ${currencySymbol}${electricGas}, Water/Trash ${currencySymbol}${waterSewer}, Internet ${currencySymbol}${internet}, Insurance ${currencySymbol}${insurance}, Parking ${currencySymbol}${parking}, Pet ${currencySymbol}${petRent}, HOA ${currencySymbol}${amenityFee}`,
        `Annual Total Overhead: ${currencySymbol}${trueCostCalc.annualOverhead.toLocaleString()}/yr`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox3Items];
    setSavedBox3Items(updated);
    try {
      localStorage.setItem("saved_rent_box3", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  // =========================================================================
  // BOX 4: UPFRONT MOVE-IN COST STATES
  // =========================================================================
  const [upfrontBaseRent, setUpfrontBaseRent] = useState<string>("1800");
  const [depositMonths, setDepositMonths] = useState<number>(1);
  const [incFirstMonth, setIncFirstMonth] = useState<boolean>(true);
  const [incLastMonth, setIncLastMonth] = useState<boolean>(true);
  const [appFees, setAppFees] = useState<string>("75");
  const [movingExp, setMovingExp] = useState<string>("600");
  const [furnitureExp, setFurnitureExp] = useState<string>("1200");
  const [utilityDep, setUtilityDep] = useState<string>("150");

  const [savedBox4Items, setSavedBox4Items] = useState<SavedRentItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);
  const [showHistoryBox4, setShowHistoryBox4] = useState<boolean>(false);

  const upfrontCalc = useMemo(() => {
    return calculateUpfrontMoveIn({
      monthlyBaseRent: parseFloat(upfrontBaseRent) || 0,
      securityDepositMonths: depositMonths,
      includeFirstMonth: incFirstMonth,
      includeLastMonth: incLastMonth,
      applicationFees: parseFloat(appFees) || 0,
      movingExpenses: parseFloat(movingExp) || 0,
      initialFurniture: parseFloat(furnitureExp) || 0,
      utilityDeposits: parseFloat(utilityDep) || 0,
    });
  }, [
    upfrontBaseRent,
    depositMonths,
    incFirstMonth,
    incLastMonth,
    appFees,
    movingExp,
    furnitureExp,
    utilityDep,
  ]);

  const handleSaveBox4 = () => {
    const newItem: SavedRentItem = {
      id: Date.now().toString(),
      title: "Upfront Move-In Cash",
      inputsSummary: `Rent: ${currencySymbol}${parseFloat(upfrontBaseRent).toLocaleString()} | Deposit: ${depositMonths} mo | First: ${incFirstMonth ? "Yes" : "No"} | Last: ${incLastMonth ? "Yes" : "No"}`,
      primaryResult: `Total Upfront Cash: ${currencySymbol}${upfrontCalc.totalUpfrontCash.toLocaleString()}`,
      detailsList: [
        `Lease Prepayments: ${currencySymbol}${upfrontCalc.leasePrepayments.toLocaleString()}`,
        `One-Time Setup & Moving Fees: ${currencySymbol}${upfrontCalc.oneTimeMoveInFees.toLocaleString()} (Apps ${currencySymbol}${appFees}, Movers ${currencySymbol}${movingExp}, Furniture ${currencySymbol}${furnitureExp}, Utilities ${currencySymbol}${utilityDep})`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox4Items];
    setSavedBox4Items(updated);
    try {
      localStorage.setItem("saved_rent_box4", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  // =========================================================================
  // BOX 5: FAIR ROOMMATE RENT SPLITTER STATES
  // =========================================================================
  const [totalLeaseRent, setTotalLeaseRent] = useState<string>("3200");
  const [roommates, setRoommates] = useState<RoommateItem[]>([
    { id: "1", name: "Roommate 1 (Master)", squareFeet: 220, privateBathroom: true, walkInCloset: true, balconyAccess: true, assignedParking: true },
    { id: "2", name: "Roommate 2 (Standard)", squareFeet: 160, privateBathroom: false, walkInCloset: false, balconyAccess: false, assignedParking: false },
    { id: "3", name: "Roommate 3 (Compact)", squareFeet: 130, privateBathroom: false, walkInCloset: false, balconyAccess: false, assignedParking: false },
  ]);

  const [savedBox5Items, setSavedBox5Items] = useState<SavedRentItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);
  const [showHistoryBox5, setShowHistoryBox5] = useState<boolean>(false);

  const roommateCalc = useMemo(() => {
    return calculateRoommateSplit(parseFloat(totalLeaseRent) || 0, roommates);
  }, [totalLeaseRent, roommates]);

  const updateRoommate = (id: string, field: keyof RoommateItem, val: any) => {
    setRoommates((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  const addRoommate = () => {
    if (roommates.length >= 6) return;
    const newId = (roommates.length + 1).toString();
    setRoommates((prev) => [
      ...prev,
      {
        id: newId,
        name: `Roommate ${newId}`,
        squareFeet: 150,
        privateBathroom: false,
        walkInCloset: false,
        balconyAccess: false,
        assignedParking: false,
      },
    ]);
  };

  const removeRoommate = (id: string) => {
    if (roommates.length <= 2) return;
    setRoommates((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSaveBox5 = () => {
    const newItem: SavedRentItem = {
      id: Date.now().toString(),
      title: "Roommate Rent Split",
      inputsSummary: `Total Rent: ${currencySymbol}${parseFloat(totalLeaseRent).toLocaleString()} | ${roommates.length} Roommates`,
      primaryResult: `Split: ${roommateCalc.roommates.map((r) => `${r.name}: ${currencySymbol}${r.calculatedRent}`).join(" | ")}`,
      detailsList: roommateCalc.roommates.map(
        (r) => `${r.name}: ${currencySymbol}${r.calculatedRent}/mo (${r.sharePercent}%) [Equal Split Delta: ${r.deltaFromEqual >= 0 ? "+" : ""}${currencySymbol}${r.deltaFromEqual}]`
      ),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox5Items];
    setSavedBox5Items(updated);
    try {
      localStorage.setItem("saved_rent_box5", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  // =========================================================================
  // BOX 6: RENT VS BUY BREAKEVEN STATES
  // =========================================================================
  const [rvbRent, setRvbRent] = useState<string>("2000");
  const [rvbRentIncrease, setRvbRentIncrease] = useState<string>("3");
  const [rvbHomePrice, setRvbHomePrice] = useState<string>("400000");
  const [rvbDownPaymentPct, setRvbDownPaymentPct] = useState<string>("20");
  const [rvbMortgageRate, setRvbMortgageRate] = useState<string>("6.5");
  const [rvbYears, setRvbYears] = useState<number>(10);
  const [rvbReturnPct, setRvbReturnPct] = useState<string>("7");

  const [savedBox6Items, setSavedBox6Items] = useState<SavedRentItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);
  const [showHistoryBox6, setShowHistoryBox6] = useState<boolean>(false);

  const rentVsBuyCalc = useMemo(() => {
    return calculateRentVsBuy({
      monthlyRent: parseFloat(rvbRent) || 0,
      annualRentIncreasePct: parseFloat(rvbRentIncrease) || 3,
      homePrice: parseFloat(rvbHomePrice) || 0,
      downPaymentPct: parseFloat(rvbDownPaymentPct) || 20,
      mortgageRatePct: parseFloat(rvbMortgageRate) || 6.5,
      loanTermYears: 30,
      propertyTaxRatePct: 1.2,
      annualHomeAppreciationPct: 4,
      investmentReturnPct: parseFloat(rvbReturnPct) || 7,
      analysisYears: rvbYears,
    });
  }, [
    rvbRent,
    rvbRentIncrease,
    rvbHomePrice,
    rvbDownPaymentPct,
    rvbMortgageRate,
    rvbYears,
    rvbReturnPct,
  ]);

  const handleSaveBox6 = () => {
    const newItem: SavedRentItem = {
      id: Date.now().toString(),
      title: "Rent vs. Buy Comparison",
      inputsSummary: `${rvbYears}-Yr Horizon | Rent: ${currencySymbol}${rvbRent}/mo (+${rvbRentIncrease}%) | Home: ${currencySymbol}${parseFloat(rvbHomePrice).toLocaleString()} (${rvbDownPaymentPct}% Down, ${rvbMortgageRate}% Rate)`,
      primaryResult: rentVsBuyCalc.netBenefitToBuying >= 0
        ? `Buying Ahead by ${currencySymbol}${rentVsBuyCalc.netBenefitToBuying.toLocaleString()}`
        : `Renting Ahead by ${currencySymbol}${Math.abs(rentVsBuyCalc.netBenefitToBuying).toLocaleString()}`,
      detailsList: [
        `Renter Net Worth: ${currencySymbol}${rentVsBuyCalc.renterNetWorth.toLocaleString()} (Total Rent Paid: ${currencySymbol}${rentVsBuyCalc.totalRentPaid.toLocaleString()})`,
        `Homebuyer Net Worth: ${currencySymbol}${rentVsBuyCalc.buyerNetWorth.toLocaleString()} (Total Home Equity: ${currencySymbol}${rentVsBuyCalc.totalHomeEquity.toLocaleString()})`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox6Items];
    setSavedBox6Items(updated);
    try {
      localStorage.setItem("saved_rent_box6", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  // Initial local storage load
  useEffect(() => {
    try {
      const b1 = localStorage.getItem("saved_rent_box1");
      if (b1) setSavedBox1Items(JSON.parse(b1));
      const b2 = localStorage.getItem("saved_rent_box2");
      if (b2) setSavedBox2Items(JSON.parse(b2));
      const b3 = localStorage.getItem("saved_rent_box3");
      if (b3) setSavedBox3Items(JSON.parse(b3));
      const b4 = localStorage.getItem("saved_rent_box4");
      if (b4) setSavedBox4Items(JSON.parse(b4));
      const b5 = localStorage.getItem("saved_rent_box5");
      if (b5) setSavedBox5Items(JSON.parse(b5));
      const b6 = localStorage.getItem("saved_rent_box6");
      if (b6) setSavedBox6Items(JSON.parse(b6));
    } catch (e) {}
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Simple Currency Selector */}
      <div className="flex items-center justify-end gap-2 text-xs font-bold">
        <label htmlFor="currency-select" className="text-slate-500 font-medium">Currency:</label>
        <select
          id="currency-select"
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
      {/* 1. INCOME-BASED RENT AFFORDABILITY CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Income-Based Rent Affordability Calculator</span>
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
            <div className="lg:col-span-6 space-y-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Income & Financial Inputs
              </h3>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Income Frequency
                </label>
                <div className="grid grid-cols-3 gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold font-sans tabular-nums">
                  {(["annual", "monthly", "hourly"] as IncomeFrequency[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setIncomeFreq(f)}
                      className={`py-1.5 rounded-lg capitalize cursor-pointer ${
                        incomeFreq === f ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {f === "annual" ? "Annual" : f === "monthly" ? "Monthly" : "Hourly"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {incomeFreq === "annual" ? "Gross Salary" : incomeFreq === "monthly" ? "Monthly Gross" : "Hourly Wage"} ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={grossIncome}
                    onChange={(e) => setGrossIncome(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>

                {incomeFreq === "hourly" ? (
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Hours / Week
                    </label>
                    <input
                      type="number"
                      value={hoursPerWeek}
                      onChange={(e) => setHoursPerWeek(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Monthly Debt ({currencySymbol})
                    </label>
                    <input
                      type="number"
                      value={monthlyDebt}
                      onChange={(e) => setMonthlyDebt(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                )}
              </div>

              {incomeFreq === "hourly" && (
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Monthly Debt ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={monthlyDebt}
                    onChange={(e) => setMonthlyDebt(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Affordability Rule
                </label>
                <div className="grid grid-cols-4 gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                  {[
                    { id: "25", label: "25%" },
                    { id: "30", label: "30%" },
                    { id: "35", label: "35%" },
                    { id: "40x", label: "40x Rule" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRulePreset(r.id as AffordabilityRule)}
                      className={`py-1.5 px-2 rounded-lg text-center cursor-pointer ${
                        rulePreset === r.id ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Simple Theme-Based Result Card */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-blue-50/60 dark:bg-slate-900/80 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                    Maximum Rent Recommendation
                  </span>
                  <span
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold text-white"
                    style={{ backgroundColor: affCalc.statusColor }}
                  >
                    {affCalc.dtiStatus}
                  </span>
                </div>

                <div className="text-center py-4 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900/40">
                  <div className="text-xs text-slate-500 font-bold uppercase">Max Monthly Rent</div>
                  <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                    {currencySymbol}{affCalc.maxMonthlyRent.toLocaleString()}
                    <span className="text-xs font-normal text-slate-500"> / mo</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
                    Target Range: <strong>{currencySymbol}{affCalc.recommendedLow.toLocaleString()} – {currencySymbol}{affCalc.recommendedHigh.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Front-End</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{affCalc.frontEndRatio}%</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Back-End</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{affCalc.backEndRatio}%</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Leftover</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{currencySymbol}{affCalc.remainingDiscretionary.toLocaleString()}</span>
                  </div>
                </div>
              </div>
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
      {/* 2. NET TAKE-HOME PAY & 50/30/20 BUDGET SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Net Take-Home Pay & 50/30/20 Budgeting Suite</span>
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
            <div className="lg:col-span-6 space-y-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Monthly Net Take-Home Input
              </h3>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Monthly After-Tax Take-Home ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={takeHomePay}
                  onChange={(e) => setTakeHomePay(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                />
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-blue-600 dark:text-blue-400">Needs ({needsPct}%)</span>
                    <span>{currencySymbol}{budgetCalc.needsAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="70"
                    value={needsPct}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setNeedsPct(val);
                      const rem = 100 - val;
                      setWantsPct(Math.round(rem * 0.6));
                      setSavingsPct(Math.round(rem * 0.4));
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-amber-600 dark:text-amber-400">Wants ({wantsPct}%)</span>
                    <span>{currencySymbol}{budgetCalc.wantsAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={wantsPct}
                    onChange={(e) => setWantsPct(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-emerald-600 dark:text-emerald-400">Savings & Debt ({savingsPct}%)</span>
                    <span>{currencySymbol}{budgetCalc.savingsAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={savingsPct}
                    onChange={(e) => setSavingsPct(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-blue-50/60 dark:bg-slate-900/80 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  50/30/20 Budget Breakdown
                </div>

                <div className="grid grid-cols-2 gap-3 text-center text-xs">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900/40">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Max Rent (30% Net)</span>
                    <span className="font-extrabold text-lg text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                      {currencySymbol}{budgetCalc.maxRentFromNeeds.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900/40">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Groceries & Utilities</span>
                    <span className="font-extrabold text-lg text-slate-800 dark:text-slate-200 font-sans tabular-nums">
                      {currencySymbol}{budgetCalc.utilitiesGroceriesFromNeeds.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold pt-1">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-blue-600">
                    Needs: {currencySymbol}{budgetCalc.needsAmount.toLocaleString()}
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-amber-600">
                    Wants: {currencySymbol}{budgetCalc.wantsAmount.toLocaleString()}
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-emerald-600">
                    Savings: {currencySymbol}{budgetCalc.savingsAmount.toLocaleString()}
                  </div>
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
      {/* 3. TRUE COST OF RENTING & UTILITIES ESTIMATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">True All-In Cost of Renting & Utilities Estimator</span>
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
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Base Rent</label>
                <input type="number" value={baseRent} onChange={(e) => setBaseRent(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Electric & Gas</label>
                <input type="number" value={electricGas} onChange={(e) => setElectricGas(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Water / Trash</label>
                <input type="number" value={waterSewer} onChange={(e) => setWaterSewer(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Internet / Wi-Fi</label>
                <input type="number" value={internet} onChange={(e) => setInternet(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Renter Insurance</label>
                <input type="number" value={insurance} onChange={(e) => setInsurance(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Parking Fee</label>
                <input type="number" value={parking} onChange={(e) => setParking(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Pet Rent</label>
                <input type="number" value={petRent} onChange={(e) => setPetRent(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Amenity / HOA</label>
                <input type="number" value={amenityFee} onChange={(e) => setAmenityFee(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-5 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Total All-In Monthly Cost</span>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                {currencySymbol}{trueCostCalc.totalMonthlyOverhead.toLocaleString()}
                <span className="text-xs font-normal text-slate-500"> / mo</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Extra Overhead</span>
                  <span className="font-extrabold text-amber-600">+{currencySymbol}{trueCostCalc.additionalOverhead.toLocaleString()} (+{trueCostCalc.percentOverhead}%)</span>
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Annual Overhead</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">{currencySymbol}{trueCostCalc.annualOverhead.toLocaleString()}/yr</span>
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
      {/* 4. UPFRONT MOVE-IN COST & LEASE CLOSING ESTIMATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Upfront Move-In Cash & Lease Closing Estimator</span>
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Monthly Rent ({currencySymbol})</label>
                  <input type="number" value={upfrontBaseRent} onChange={(e) => setUpfrontBaseRent(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Security Deposit</label>
                  <select value={depositMonths} onChange={(e) => setDepositMonths(parseInt(e.target.value))} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">
                    <option value={1}>1 Month Rent</option>
                    <option value={1.5}>1.5 Months Rent</option>
                    <option value={2}>2 Months Rent</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input type="checkbox" checked={incFirstMonth} onChange={(e) => setIncFirstMonth(e.target.checked)} className="rounded text-blue-600" />
                  First Month Rent
                </label>
                <label className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input type="checkbox" checked={incLastMonth} onChange={(e) => setIncLastMonth(e.target.checked)} className="rounded text-blue-600" />
                  Last Month Rent
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">App Fees</label>
                  <input type="number" value={appFees} onChange={(e) => setAppFees(e.target.value)} className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Movers/Truck</label>
                  <input type="number" value={movingExp} onChange={(e) => setMovingExp(e.target.value)} className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Furniture</label>
                  <input type="number" value={furnitureExp} onChange={(e) => setFurnitureExp(e.target.value)} className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Utilities</label>
                  <input type="number" value={utilityDep} onChange={(e) => setUtilityDep(e.target.value)} className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-5 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Total Liquid Cash Required</span>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                {currencySymbol}{upfrontCalc.totalUpfrontCash.toLocaleString()}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Lease Prepayments</span>
                  <span className="font-extrabold text-blue-600">{currencySymbol}{upfrontCalc.leasePrepayments.toLocaleString()}</span>
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Setup Fees</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">{currencySymbol}{upfrontCalc.oneTimeMoveInFees.toLocaleString()}</span>
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
      {/* 5. FAIR ROOMMATE RENT SPLITTER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Fair Roommate Rent Splitter</span>
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
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Total Lease Rent ({currencySymbol})</label>
              <input
                type="number"
                value={totalLeaseRent}
                onChange={(e) => setTotalLeaseRent(e.target.value)}
                className="h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-sm w-48"
              />
            </div>
            <button
              onClick={addRoommate}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Roommate
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {roommateCalc.roommates.map((r) => {
              const item = roommates.find((x) => x.id === r.id);
              if (!item) return null;
              return (
                <div key={r.id} className="p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 relative">
                  <div className="flex items-center justify-between font-bold">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateRoommate(r.id, "name", e.target.value)}
                      className="bg-transparent font-extrabold border-b border-slate-300 dark:border-slate-700 focus:outline-none text-slate-800 dark:text-slate-100"
                    />
                    {roommates.length > 2 && (
                      <button onClick={() => removeRoommate(r.id)} className="text-slate-400 hover:text-red-500 cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Bedroom Sq Ft</label>
                    <input
                      type="number"
                      value={item.squareFeet}
                      onChange={(e) => updateRoommate(r.id, "squareFeet", parseFloat(e.target.value) || 0)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>

                  <div className="space-y-1.5 pt-1 text-[11px]">
                    <label className="flex items-center justify-between font-medium cursor-pointer">
                      <span>Private Bath</span>
                      <input type="checkbox" checked={item.privateBathroom} onChange={(e) => updateRoommate(r.id, "privateBathroom", e.target.checked)} className="rounded text-blue-600" />
                    </label>
                    <label className="flex items-center justify-between font-medium cursor-pointer">
                      <span>Walk-In Closet</span>
                      <input type="checkbox" checked={item.walkInCloset} onChange={(e) => updateRoommate(r.id, "walkInCloset", e.target.checked)} className="rounded text-blue-600" />
                    </label>
                    <label className="flex items-center justify-between font-medium cursor-pointer">
                      <span>Balcony</span>
                      <input type="checkbox" checked={item.balconyAccess} onChange={(e) => updateRoommate(r.id, "balconyAccess", e.target.checked)} className="rounded text-blue-600" />
                    </label>
                    <label className="flex items-center justify-between font-medium cursor-pointer">
                      <span>Parking Space</span>
                      <input type="checkbox" checked={item.assignedParking} onChange={(e) => updateRoommate(r.id, "assignedParking", e.target.checked)} className="rounded text-blue-600" />
                    </label>
                  </div>

                  <div className="p-3 bg-blue-50/60 dark:bg-slate-900 border border-blue-100 dark:border-blue-900/40 rounded-xl text-center">
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase block">Calculated Share</span>
                    <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-0.5">
                      {currencySymbol}{r.calculatedRent}
                      <span className="text-xs font-normal text-slate-500"> ({r.sharePercent}%)</span>
                    </div>
                  </div>
                </div>
              );
            })}
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
      {/* 6. RENT VS. BUY BREAKEVEN COMPARATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Rent vs. Buy Breakeven & Opportunity Cost</span>
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Monthly Rent ({currencySymbol})</label>
                  <input type="number" value={rvbRent} onChange={(e) => setRvbRent(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Rent Increase (%)</label>
                  <input type="number" value={rvbRentIncrease} onChange={(e) => setRvbRentIncrease(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Home Price ({currencySymbol})</label>
                  <input type="number" value={rvbHomePrice} onChange={(e) => setRvbHomePrice(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Down Payment (%)</label>
                  <input type="number" value={rvbDownPaymentPct} onChange={(e) => setRvbDownPaymentPct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Horizon: {rvbYears} Years</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="15"
                  value={rvbYears}
                  onChange={(e) => setRvbYears(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-4 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                {rvbYears}-Year Financial Horizon
              </span>

              <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                {rentVsBuyCalc.netBenefitToBuying >= 0
                  ? `Buying Builds +${currencySymbol}${rentVsBuyCalc.netBenefitToBuying.toLocaleString()} Net Worth`
                  : `Renting Saves +${currencySymbol}${Math.abs(rentVsBuyCalc.netBenefitToBuying).toLocaleString()} Net Worth`}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Renter Net Worth</span>
                  <span className="font-extrabold text-base text-slate-800 dark:text-slate-200 font-sans tabular-nums">
                    {currencySymbol}{rentVsBuyCalc.renterNetWorth.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Buyer Net Worth</span>
                  <span className="font-extrabold text-base text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                    {currencySymbol}{rentVsBuyCalc.buyerNetWorth.toLocaleString()}
                  </span>
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
