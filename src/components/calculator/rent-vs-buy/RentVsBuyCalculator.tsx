"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, ChevronDown, ChevronUp, Check, Plus, Download } from "lucide-react";
import {
  calculateRentVsBuy,
  calculateNetWorthComparison,
  calculatePriceToRent,
  calculateTaxShield,
  calculateBenFelix,
  calculateRelocationPenalty,
} from "@/app/calculators/rent-vs-buy-calculator/calculator";
import {
  TaxFilingStatus,
  SavedRentVsBuyItem,
} from "@/app/calculators/rent-vs-buy-calculator/types";

export function RentVsBuyCalculator() {
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // =========================================================================
  // BOX 1: CORE RENT VS BUY BREAKEVEN ENGINE STATES
  // =========================================================================
  const [homePrice, setHomePrice] = useState<string>("500000");
  const [downPaymentPct, setDownPaymentPct] = useState<string>("20");
  const [loanTermYears, setLoanTermYears] = useState<string>("30");
  const [interestRate, setInterestRate] = useState<string>("6.632");
  const [buyingClosingCostsPct, setBuyingClosingCostsPct] = useState<string>("2.0");
  const [sellingClosingCostsPct, setSellingClosingCostsPct] = useState<string>("7.0");
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<string>("7500");
  const [propertyTaxGrowthPct, setPropertyTaxGrowthPct] = useState<string>("3.0");
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<string>("2500");
  const [hoaDuesMonthly, setHoaDuesMonthly] = useState<string>("0");
  const [maintenancePct, setMaintenancePct] = useState<string>("1.5");
  const [homeAppreciationPct, setHomeAppreciationPct] = useState<string>("3.0");

  const [monthlyRent, setMonthlyRent] = useState<string>("3000");
  const [annualRentIncreasePct, setAnnualRentIncreasePct] = useState<string>("3.0");
  const [renterInsuranceMonthly, setRenterInsuranceMonthly] = useState<string>("15");
  const [securityDeposit, setSecurityDeposit] = useState<string>("3000");
  const [upfrontRentalFees, setUpfrontRentalFees] = useState<string>("100");

  const [inflationRatePct, setInflationRatePct] = useState<string>("3.0");
  const [investmentReturnRatePct, setInvestmentReturnRatePct] = useState<string>("5.0");
  const [taxFilingStatus, setTaxFilingStatus] = useState<TaxFilingStatus>("married_joint");
  const [marginalTaxRatePct, setMarginalTaxRatePct] = useState<string>("25.0");
  const [itemizeDeductions, setItemizeDeductions] = useState<boolean>(true);

  const [savedBox1Items, setSavedBox1Items] = useState<SavedRentVsBuyItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);
  const [showHistoryBox1, setShowHistoryBox1] = useState<boolean>(false);

  const applyPreset = (presetName: string) => {
    if (presetName === "young_pro") {
      setHomePrice("400000");
      setMonthlyRent("2500");
      setDownPaymentPct("10");
      setInvestmentReturnRatePct("8.0");
    } else if (presetName === "suburban_family") {
      setHomePrice("600000");
      setMonthlyRent("3200");
      setDownPaymentPct("20");
      setHomeAppreciationPct("4.0");
    } else if (presetName === "hcol_metro") {
      setHomePrice("900000");
      setMonthlyRent("3100");
      setDownPaymentPct("20");
      setHomeAppreciationPct("3.5");
    }
  };

  const rvbCalc = useMemo(() => {
    return calculateRentVsBuy({
      homePrice: parseFloat(homePrice) || 0,
      downPaymentPct: parseFloat(downPaymentPct) || 0,
      loanTermYears: parseFloat(loanTermYears) || 30,
      interestRate: parseFloat(interestRate) || 0,
      buyingClosingCostsPct: parseFloat(buyingClosingCostsPct) || 0,
      sellingClosingCostsPct: parseFloat(sellingClosingCostsPct) || 0,
      propertyTaxAnnual: parseFloat(propertyTaxAnnual) || 0,
      propertyTaxGrowthPct: parseFloat(propertyTaxGrowthPct) || 0,
      homeInsuranceAnnual: parseFloat(homeInsuranceAnnual) || 0,
      hoaDuesMonthly: parseFloat(hoaDuesMonthly) || 0,
      maintenancePct: parseFloat(maintenancePct) || 0,
      homeAppreciationPct: parseFloat(homeAppreciationPct) || 0,

      monthlyRent: parseFloat(monthlyRent) || 0,
      annualRentIncreasePct: parseFloat(annualRentIncreasePct) || 0,
      renterInsuranceMonthly: parseFloat(renterInsuranceMonthly) || 0,
      securityDeposit: parseFloat(securityDeposit) || 0,
      upfrontRentalFees: parseFloat(upfrontRentalFees) || 0,

      inflationRatePct: parseFloat(inflationRatePct) || 0,
      investmentReturnRatePct: parseFloat(investmentReturnRatePct) || 0,
      taxFilingStatus,
      marginalTaxRatePct: parseFloat(marginalTaxRatePct) || 0,
      itemizeDeductions,
      currencySymbol,
    });
  }, [
    homePrice,
    downPaymentPct,
    loanTermYears,
    interestRate,
    buyingClosingCostsPct,
    sellingClosingCostsPct,
    propertyTaxAnnual,
    propertyTaxGrowthPct,
    homeInsuranceAnnual,
    hoaDuesMonthly,
    maintenancePct,
    homeAppreciationPct,
    monthlyRent,
    annualRentIncreasePct,
    renterInsuranceMonthly,
    securityDeposit,
    upfrontRentalFees,
    inflationRatePct,
    investmentReturnRatePct,
    taxFilingStatus,
    marginalTaxRatePct,
    itemizeDeductions,
    currencySymbol,
  ]);

  const handleSaveBox1 = () => {
    const newItem: SavedRentVsBuyItem = {
      id: Date.now().toString(),
      title: "Core Rent vs. Buy Breakeven Engine",
      inputsSummary: `Home: ${currencySymbol}${parseFloat(homePrice).toLocaleString()} vs Rent: ${currencySymbol}${parseFloat(monthlyRent).toLocaleString()}/mo (${downPaymentPct}% Down @ ${interestRate}%)`,
      primaryResult: rvbCalc.breakevenMessage,
      detailsList: [
        `Price-to-Rent Ratio: ${rvbCalc.priceToRentRatio}`,
        `30-Yr Buying Cumulative Net Cost: ${currencySymbol}${rvbCalc.buyingCumulativeNetCost30Yr.toLocaleString()}`,
        `30-Yr Renting Cumulative Net Cost: ${currencySymbol}${rvbCalc.rentingCumulativeNetCost30Yr.toLocaleString()}`,
        `30-Yr Net Wealth Difference: ${currencySymbol}${rvbCalc.netWealthDifference30Yr.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox1Items];
    setSavedBox1Items(updated);
    try {
      localStorage.setItem("saved_rvb_box1", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleExportCSV = () => {
    const data = rvbCalc.yearlySchedule;
    if (!data || data.length === 0) return;

    const headers = [
      "Year",
      "Home Value",
      "Remaining Mortgage",
      "Home Equity",
      "Buying Annual Outlay",
      "Buying Net Cost (If Sold)",
      "Renting Annual Outlay",
      "Renting Net Cost",
      "Renter Portfolio Value",
      "Cheaper Option",
    ];
    const rows = data.map((row) => [
      `"Year ${row.year}"`,
      `"${row.homeValue}"`,
      `"${row.remainingMortgageBalance}"`,
      `"${row.homeEquity}"`,
      `"${row.buyingAnnualOutlay}"`,
      `"${row.buyingCumulativeNetCost}"`,
      `"${row.rentingAnnualOutlay}"`,
      `"${row.rentingCumulativeNetCost}"`,
      `"${row.renterPortfolioValue}"`,
      `"${row.cheaperOption}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `rent_vs_buy_30yr_proforma.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // SVG Cumulative Cost & Wealth Crossing Timeline Graph
  const svgTimelineChart = useMemo(() => {
    const data = rvbCalc.yearlySchedule;
    if (!data || data.length === 0) return null;

    const maxVal = Math.max(
      ...data.map((d) => Math.max(d.buyingCumulativeNetCost, d.rentingCumulativeNetCost))
    );
    const minVal = Math.min(
      ...data.map((d) => Math.min(d.buyingCumulativeNetCost, d.rentingCumulativeNetCost))
    );
    const range = maxVal - minVal || 1;

    const pointsBuy = data
      .map((d, i) => {
        const x = (i / 29) * 300 + 30;
        const y = 140 - ((d.buyingCumulativeNetCost - minVal) / range) * 110;
        return `${x},${y}`;
      })
      .join(" ");

    const pointsRent = data
      .map((d, i) => {
        const x = (i / 29) * 300 + 30;
        const y = 140 - ((d.rentingCumulativeNetCost - minVal) / range) * 110;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold">
          <span className="text-slate-600 dark:text-slate-400">Cumulative Net Cost Timeline ($)</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-blue-600"><span className="w-2.5 h-0.5 bg-blue-600 inline-block"></span> Buying</span>
            <span className="flex items-center gap-1 text-emerald-600"><span className="w-2.5 h-0.5 bg-emerald-600 inline-block"></span> Renting</span>
          </div>
        </div>
        <svg viewBox="0 0 360 160" className="w-full h-36 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-2">
          {/* Grid lines */}
          <line x1="30" y1="30" x2="330" y2="30" stroke="#e2e8f0" strokeDasharray="2" />
          <line x1="30" y1="85" x2="330" y2="85" stroke="#e2e8f0" strokeDasharray="2" />
          <line x1="30" y1="140" x2="330" y2="140" stroke="#cbd5e1" />

          {/* Polyline Buying */}
          <polyline fill="none" stroke="#2563eb" strokeWidth="2.5" points={pointsBuy} />
          {/* Polyline Renting */}
          <polyline fill="none" stroke="#10b981" strokeWidth="2.5" points={pointsRent} />

          {/* X Axis Labels */}
          <text x="30" y="155" fontSize="8" fill="#94a3b8" textAnchor="middle">Yr 1</text>
          <text x="105" y="155" fontSize="8" fill="#94a3b8" textAnchor="middle">Yr 8</text>
          <text x="180" y="155" fontSize="8" fill="#94a3b8" textAnchor="middle">Yr 15</text>
          <text x="255" y="155" fontSize="8" fill="#94a3b8" textAnchor="middle">Yr 23</text>
          <text x="330" y="155" fontSize="8" fill="#94a3b8" textAnchor="middle">Yr 30</text>
        </svg>
      </div>
    );
  }, [rvbCalc]);

  // =========================================================================
  // BOX 2: NET WORTH & INVESTMENT CAPITAL GROWTH COMPARATOR STATES
  // =========================================================================
  const [savedBox2Items, setSavedBox2Items] = useState<SavedRentVsBuyItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);
  const [showHistoryBox2, setShowHistoryBox2] = useState<boolean>(false);

  const netWorthCalc = useMemo(() => {
    return calculateNetWorthComparison({
      homePrice: parseFloat(homePrice) || 500000,
      downPaymentAmount: (parseFloat(homePrice) * parseFloat(downPaymentPct)) / 100,
      appreciationRate: parseFloat(homeAppreciationPct) || 3.0,
      investmentReturnRate: parseFloat(investmentReturnRatePct) || 7.0,
      years: 10,
    });
  }, [homePrice, downPaymentPct, homeAppreciationPct, investmentReturnRatePct]);

  const handleSaveBox2 = () => {
    const newItem: SavedRentVsBuyItem = {
      id: Date.now().toString(),
      title: "Net Worth & Investment Capital Growth Comparator",
      inputsSummary: `Home: ${currencySymbol}${parseFloat(homePrice).toLocaleString()} | Down: ${downPaymentPct}% | Appreciation: ${homeAppreciationPct}% vs Stock Return: ${investmentReturnRatePct}% (10 Yrs)`,
      primaryResult: `10-Yr Winner: ${netWorthCalc.netWorthAdvantage}`,
      detailsList: [
        `Projected Home Equity: ${currencySymbol}${netWorthCalc.projectedHomeEquity.toLocaleString()}`,
        `Renter Stock Portfolio Value: ${currencySymbol}${netWorthCalc.renterStockPortfolioValue.toLocaleString()}`,
        `Net Wealth Delta: ${currencySymbol}${netWorthCalc.netWorthDelta.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox2Items];
    setSavedBox2Items(updated);
    try {
      localStorage.setItem("saved_rvb_box2", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  // =========================================================================
  // BOX 3: PRICE-TO-RENT RATIO BENCHMARKING STATES
  // =========================================================================
  const [savedBox3Items, setSavedBox3Items] = useState<SavedRentVsBuyItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);
  const [showHistoryBox3, setShowHistoryBox3] = useState<boolean>(false);

  const ptrCalc = useMemo(() => {
    return calculatePriceToRent({
      homePrice: parseFloat(homePrice) || 500000,
      monthlyRent: parseFloat(monthlyRent) || 3000,
    });
  }, [homePrice, monthlyRent]);

  const handleSaveBox3 = () => {
    const newItem: SavedRentVsBuyItem = {
      id: Date.now().toString(),
      title: "Price-to-Rent Ratio City & Regional Benchmarking",
      inputsSummary: `Home: ${currencySymbol}${parseFloat(homePrice).toLocaleString()} | Rent: ${currencySymbol}${parseFloat(monthlyRent).toLocaleString()}/mo`,
      primaryResult: `Price-to-Rent Ratio: ${ptrCalc.ratio} (${ptrCalc.category})`,
      detailsList: [ptrCalc.explanation],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox3Items];
    setSavedBox3Items(updated);
    try {
      localStorage.setItem("saved_rvb_box3", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  // =========================================================================
  // BOX 4: ITEMIZED TAX BENEFIT & SALT CAP SIMULATOR STATES
  // =========================================================================
  const [savedBox4Items, setSavedBox4Items] = useState<SavedRentVsBuyItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);
  const [showHistoryBox4, setShowHistoryBox4] = useState<boolean>(false);

  const taxCalc = useMemo(() => {
    const mortgageBal = (parseFloat(homePrice) || 500000) * (1 - (parseFloat(downPaymentPct) || 20) / 100);
    return calculateTaxShield({
      homePrice: parseFloat(homePrice) || 500000,
      mortgageBalance: mortgageBal,
      interestRate: parseFloat(interestRate) || 6.632,
      propertyTaxAnnual: parseFloat(propertyTaxAnnual) || 7500,
      filingStatus: taxFilingStatus,
      marginalTaxRatePct: parseFloat(marginalTaxRatePct) || 25.0,
    });
  }, [homePrice, downPaymentPct, interestRate, propertyTaxAnnual, taxFilingStatus, marginalTaxRatePct]);

  const handleSaveBox4 = () => {
    const newItem: SavedRentVsBuyItem = {
      id: Date.now().toString(),
      title: "Itemized Tax Benefit & SALT Cap Simulator (TCJA Impact)",
      inputsSummary: `Filing: ${taxFilingStatus} | Bracket: ${marginalTaxRatePct}% | Prop Tax: ${currencySymbol}${parseFloat(propertyTaxAnnual).toLocaleString()}`,
      primaryResult: `Annual Tax Shield Savings: ${currencySymbol}${taxCalc.annualTaxSavings.toLocaleString()}/yr`,
      detailsList: [
        `Annual Mortgage Interest: ${currencySymbol}${taxCalc.annualMortgageInterest.toLocaleString()}`,
        `Capped Property Tax (SALT $10k Cap): ${currencySymbol}${taxCalc.cappedPropertyTax.toLocaleString()}`,
        `Total Itemized Deductions: ${currencySymbol}${taxCalc.totalItemizedDeductions.toLocaleString()} vs Standard: ${currencySymbol}${taxCalc.standardDeduction.toLocaleString()}`,
        taxCalc.explanation,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox4Items];
    setSavedBox4Items(updated);
    try {
      localStorage.setItem("saved_rvb_box4", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  // =========================================================================
  // BOX 5: BEN FELIX 5% RULE & UNRECOVERABLE COST CALCULATOR STATES
  // =========================================================================
  const [savedBox5Items, setSavedBox5Items] = useState<SavedRentVsBuyItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);
  const [showHistoryBox5, setShowHistoryBox5] = useState<boolean>(false);

  const benCalc = useMemo(() => {
    return calculateBenFelix({
      homePrice: parseFloat(homePrice) || 500000,
      interestRate: parseFloat(interestRate) || 6.5,
      propertyTaxPct: (parseFloat(propertyTaxAnnual) / (parseFloat(homePrice) || 500000)) * 100 || 1.5,
      maintenancePct: parseFloat(maintenancePct) || 1.0,
    });
  }, [homePrice, interestRate, propertyTaxAnnual, maintenancePct]);

  const handleSaveBox5 = () => {
    const newItem: SavedRentVsBuyItem = {
      id: Date.now().toString(),
      title: "Ben Felix 5% Rule & Unrecoverable Housing Cost Calculator",
      inputsSummary: `Home: ${currencySymbol}${parseFloat(homePrice).toLocaleString()} | Rate: ${interestRate}%`,
      primaryResult: `Unrecoverable Owning Cost: ${currencySymbol}${benCalc.monthlyUnrecoverableCost.toLocaleString()}/mo`,
      detailsList: [
        `Annual Unrecoverable Cost: ${currencySymbol}${benCalc.annualUnrecoverableCost.toLocaleString()}/yr`,
        `Max Advantageous Monthly Rent: ${currencySymbol}${benCalc.maxAdvantageousMonthlyRent.toLocaleString()}/mo`,
        benCalc.explanation,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox5Items];
    setSavedBox5Items(updated);
    try {
      localStorage.setItem("saved_rvb_box5", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  // =========================================================================
  // BOX 6: MOBILITY & RELOCATION PENALTY CALCULATOR STATES
  // =========================================================================
  const [plannedStayYears, setPlannedStayYears] = useState<string>("3");

  const [savedBox6Items, setSavedBox6Items] = useState<SavedRentVsBuyItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);
  const [showHistoryBox6, setShowHistoryBox6] = useState<boolean>(false);

  const reloCalc = useMemo(() => {
    return calculateRelocationPenalty({
      homePrice: parseFloat(homePrice) || 500000,
      plannedStayYears: parseFloat(plannedStayYears) || 3,
      buyingCostsPct: parseFloat(buyingClosingCostsPct) || 2.0,
      sellingCostsPct: parseFloat(sellingClosingCostsPct) || 7.0,
    });
  }, [homePrice, plannedStayYears, buyingClosingCostsPct, sellingClosingCostsPct]);

  const handleSaveBox6 = () => {
    const newItem: SavedRentVsBuyItem = {
      id: Date.now().toString(),
      title: "Mobility & Relocation Penalty Calculator",
      inputsSummary: `Home: ${currencySymbol}${parseFloat(homePrice).toLocaleString()} | Stay: ${plannedStayYears} Years | Closing: ${buyingClosingCostsPct}% Buy / ${sellingClosingCostsPct}% Sell`,
      primaryResult: reloCalc.recommendation,
      detailsList: [
        `Total Friction Transaction Fees: ${currencySymbol}${reloCalc.totalFrictionCosts.toLocaleString()}`,
        `Monthly Amortized Relocation Drag: ${currencySymbol}${reloCalc.monthlyAmortizedDrag.toLocaleString()}/mo`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox6Items];
    setSavedBox6Items(updated);
    try {
      localStorage.setItem("saved_rvb_box6", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  // Load local storage
  useEffect(() => {
    try {
      const b1 = localStorage.getItem("saved_rvb_box1");
      if (b1) setSavedBox1Items(JSON.parse(b1));
      const b2 = localStorage.getItem("saved_rvb_box2");
      if (b2) setSavedBox2Items(JSON.parse(b2));
      const b3 = localStorage.getItem("saved_rvb_box3");
      if (b3) setSavedBox3Items(JSON.parse(b3));
      const b4 = localStorage.getItem("saved_rvb_box4");
      if (b4) setSavedBox4Items(JSON.parse(b4));
      const b5 = localStorage.getItem("saved_rvb_box5");
      if (b5) setSavedBox5Items(JSON.parse(b5));
      const b6 = localStorage.getItem("saved_rvb_box6");
      if (b6) setSavedBox6Items(JSON.parse(b6));
    } catch (e) {}
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Simple Currency Selector Header */}
      <div className="flex items-center justify-end gap-2 text-xs font-bold">
        <label htmlFor="rvb-currency-select" className="text-slate-500 font-medium">Currency:</label>
        <select
          id="rvb-currency-select"
          value={currencySymbol}
          onChange={(e) => setCurrencySymbol(e.target.value)}
          className="h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans font-bold cursor-pointer"
        >
          <option value="$">USD ($)</option>
          <option value="€">EUR (€)</option>
          <option value="£">GBP (£)</option>
          <option value="C$">CAD (C$)</option>
          <option value="A$">AUD (A$)</option>
          <option value="₹">INR (₹)</option>
        </select>
      </div>

      {/* ========================================================================= */}
      {/* 1. CORE RENT VS BUY BREAKEVEN ENGINE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Comprehensive Rent vs. Buy Breakeven Engine</span>
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
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs font-bold">
            <span className="text-slate-600 dark:text-slate-400">Housing Profile Presets:</span>
            <div className="flex items-center gap-2">
              <button onClick={() => applyPreset("young_pro")} className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100 cursor-pointer">Young Pro (5-Yr Stay)</button>
              <button onClick={() => applyPreset("suburban_family")} className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100 cursor-pointer">Suburban Family (15-Yr Stay)</button>
              <button onClick={() => applyPreset("hcol_metro")} className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 cursor-pointer">HCOL Metro (Price-to-Rent &gt; 25)</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs text-xs">
              <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">Home Purchase & Financing Assumptions</span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Home Price</label>
                  <input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Down Payment %</label>
                  <input type="number" value={downPaymentPct} onChange={(e) => setDownPaymentPct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Interest Rate %</label>
                  <input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Property Tax ($/yr)</label>
                  <input type="number" value={propertyTaxAnnual} onChange={(e) => setPropertyTaxAnnual(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Insurance ($/yr)</label>
                  <input type="number" value={homeInsuranceAnnual} onChange={(e) => setHomeInsuranceAnnual(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Maintenance %</label>
                  <input type="number" step="0.1" value={maintenancePct} onChange={(e) => setMaintenancePct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Appreciation %</label>
                  <input type="number" step="0.1" value={homeAppreciationPct} onChange={(e) => setHomeAppreciationPct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              <span className="font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block pt-2 border-t border-slate-200 dark:border-slate-800">Rental & Opportunity Cost Assumptions</span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Comparable Rent</label>
                  <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Rent Inflation %</label>
                  <input type="number" step="0.1" value={annualRentIncreasePct} onChange={(e) => setAnnualRentIncreasePct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Stock Return %</label>
                  <input type="number" step="0.1" value={investmentReturnRatePct} onChange={(e) => setInvestmentReturnRatePct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Filing Status</label>
                  <select value={taxFilingStatus} onChange={(e) => setTaxFilingStatus(e.target.value as any)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">
                    <option value="single">Single</option>
                    <option value="married_joint">Married Joint</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-blue-50/60 dark:bg-slate-900/80 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-5 shadow-xs space-y-4 text-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  Breakeven Decision Result
                </span>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-900/50 text-xs font-extrabold text-blue-600 dark:text-blue-400">
                  {rvbCalc.breakevenMessage}
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">30-Yr Buying Cost</span>
                    <span className="text-blue-600 text-sm font-extrabold">{currencySymbol}{rvbCalc.buyingCumulativeNetCost30Yr.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">30-Yr Renting Cost</span>
                    <span className="text-emerald-600 text-sm font-extrabold">{currencySymbol}{rvbCalc.rentingCumulativeNetCost30Yr.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900/60 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  Price-to-Rent Ratio: <span className="text-blue-600">{rvbCalc.priceToRentRatio}</span> (30-Yr Net Wealth Difference: {currencySymbol}{rvbCalc.netWealthDifference30Yr.toLocaleString()})
                </div>

                <div className="pt-2">
                  {svgTimelineChart}
                </div>
              </div>
            </div>
          </div>

          {/* Derivation Box */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs space-y-2 font-mono">
            <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans">Underwriting & Housing Opportunity Formulas:</span>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 text-slate-700 dark:text-slate-300">
              <div>{"Price-to-Rent Ratio = Home Price (" + currencySymbol + parseFloat(homePrice).toLocaleString() + ") / Annual Rent (" + currencySymbol + (parseFloat(monthlyRent) * 12).toLocaleString() + ") = " + rvbCalc.priceToRentRatio}</div>
              <div>{"Ben Felix 5% Unrecoverable Owning Cost = Home Price × (" + interestRate + "% + " + ((parseFloat(propertyTaxAnnual) / parseFloat(homePrice)) * 100).toFixed(1) + "% tax + " + maintenancePct + "% maint) = " + currencySymbol + Math.round(parseFloat(homePrice) * (parseFloat(interestRate) + 1.5 + parseFloat(maintenancePct)) / 100 / 12).toLocaleString() + "/mo"}</div>
              <div>{"Initial Capital Invested by Renter = Down Payment + Buying Closing Costs = " + currencySymbol + rvbCalc.initialBuyingOutlay.toLocaleString()}</div>
            </div>
          </div>

          {/* Interactive Pro-Forma Comparison Table */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200">
                30-Year Pro-Forma Buying vs. Renting Comparison
              </span>
              <button
                type="button"
                onClick={handleExportCSV}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                title="Export 30-Year Comparison to CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto max-h-64 rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs text-left border-collapse font-mono">
                <thead className="sticky top-0 bg-blue-600 text-white font-bold font-sans">
                  <tr>
                    <th className="p-2.5">Year</th>
                    <th className="p-2.5">Home Value</th>
                    <th className="p-2.5">Home Equity</th>
                    <th className="p-2.5">Buying Net Cost (If Sold)</th>
                    <th className="p-2.5">Renting Net Cost</th>
                    <th className="p-2.5">Renter Portfolio Value</th>
                    <th className="p-2.5">Cheaper Option</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {rvbCalc.yearlySchedule.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-2.5 font-bold font-sans text-blue-600">Year {row.year}</td>
                      <td className="p-2.5">{currencySymbol}{row.homeValue.toLocaleString()}</td>
                      <td className="p-2.5 text-emerald-600 font-bold">{currencySymbol}{row.homeEquity.toLocaleString()}</td>
                      <td className="p-2.5 font-bold text-blue-600">{currencySymbol}{row.buyingCumulativeNetCost.toLocaleString()}</td>
                      <td className="p-2.5 font-bold text-slate-800 dark:text-slate-200">{currencySymbol}{row.rentingCumulativeNetCost.toLocaleString()}</td>
                      <td className="p-2.5 text-amber-500">{currencySymbol}{row.renterPortfolioValue.toLocaleString()}</td>
                      <td className="p-2.5 font-bold font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${row.cheaperOption === "Buy" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}>
                          {row.cheaperOption}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
      {/* 2. NET WORTH & INVESTMENT CAPITAL GROWTH COMPARATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Net Worth & Investment Capital Growth Comparator (10-Year Horizon)</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Home Appreciation %</label>
                  <input type="number" step="0.1" value={homeAppreciationPct} onChange={(e) => setHomeAppreciationPct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Stock Market Return %</label>
                  <input type="number" step="0.1" value={investmentReturnRatePct} onChange={(e) => setInvestmentReturnRatePct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">10-Year Asset Wealth Comparison</span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                Advantage: {netWorthCalc.netWorthAdvantage}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Home Equity</span>
                  <span className="text-blue-600 text-sm font-extrabold">{currencySymbol}{netWorthCalc.projectedHomeEquity.toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block uppercase">Stock Portfolio</span>
                  <span className="text-emerald-600 text-sm font-extrabold">{currencySymbol}{netWorthCalc.renterStockPortfolioValue.toLocaleString()}</span>
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
      {/* 3. PRICE-TO-RENT RATIO BENCHMARKING */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Price-to-Rent Ratio City & Regional Benchmarking</span>
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Home Price</label>
                  <input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Monthly Target Rent</label>
                  <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Market Evaluation</span>

              <div className="text-3xl font-extrabold font-sans tabular-nums mt-1 text-blue-600">
                Price-to-Rent Ratio: {ptrCalc.ratio}
              </div>

              <div className={`p-2.5 rounded-xl text-xs font-bold ${ptrCalc.badgeColor}`}>
                {ptrCalc.category}
              </div>

              <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                {ptrCalc.explanation}
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
      {/* 4. ITEMIZED TAX BENEFIT & SALT CAP SIMULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Itemized Tax Benefit & SALT Cap Simulator (TCJA Impact)</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Marginal Tax Rate %</label>
                  <input type="number" step="0.1" value={marginalTaxRatePct} onChange={(e) => setMarginalTaxRatePct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Filing Status</label>
                  <select value={taxFilingStatus} onChange={(e) => setTaxFilingStatus(e.target.value as any)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">
                    <option value="single">Single ($15k Std Ded)</option>
                    <option value="married_joint">Married Joint ($30k Std Ded)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Annual Tax Savings Result</span>

              <div className="text-3xl font-extrabold text-emerald-600 font-sans tabular-nums mt-1">
                Save {currencySymbol}{taxCalc.annualTaxSavings.toLocaleString()} / year
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200">
                {taxCalc.explanation}
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
      {/* 5. BEN FELIX 5% RULE & UNRECOVERABLE COST CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Ben Felix 5% Rule & Unrecoverable Housing Cost Calculator</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Mortgage Rate %</label>
                  <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Maintenance %</label>
                  <input type="number" step="0.1" value={maintenancePct} onChange={(e) => setMaintenancePct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">5% Rule Benchmark Result</span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                Unrecoverable Owning Cost: {currencySymbol}{benCalc.monthlyUnrecoverableCost.toLocaleString()}/mo
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-emerald-600">
                If Rent &lt; {currencySymbol}{benCalc.maxAdvantageousMonthlyRent.toLocaleString()}/mo, Renting Wins!
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
      {/* 6. MOBILITY & RELOCATION PENALTY CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Mobility & Relocation Penalty Calculator</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Planned Stay Horizon (Yrs)</label>
                  <select value={plannedStayYears} onChange={(e) => setPlannedStayYears(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">
                    <option value="2">2 Years (Very Short)</option>
                    <option value="3">3 Years (Short)</option>
                    <option value="5">5 Years (Standard)</option>
                    <option value="7">7 Years (Medium)</option>
                    <option value="10">10 Years (Long)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Selling Costs %</label>
                  <input type="number" step="0.1" value={sellingClosingCostsPct} onChange={(e) => setSellingClosingCostsPct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-6 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Transaction Relocation Friction</span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                Friction Costs: {currencySymbol}{reloCalc.totalFrictionCosts.toLocaleString()}
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-red-500">
                Adds +{currencySymbol}{reloCalc.monthlyAmortizedDrag.toLocaleString()}/mo Drag on Short Stay!
              </div>

              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {reloCalc.recommendation}
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
