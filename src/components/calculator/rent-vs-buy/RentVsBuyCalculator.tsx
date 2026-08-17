"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, ChevronDown, ChevronUp, Download, TrendingUp, ShieldCheck, DollarSign } from "lucide-react";
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
  // BOX 1: RENT VS BUY CALCULATOR STATES (EXACT COMPETITOR PARITY)
  // =========================================================================
  const [homePrice, setHomePrice] = useState<string>("500000");
  const [downPaymentPct, setDownPaymentPct] = useState<string>("20");
  const [interestRate, setInterestRate] = useState<string>("6.632");
  const [loanTermYears, setLoanTermYears] = useState<string>("30");
  const [buyingClosingCostsPct, setBuyingClosingCostsPct] = useState<string>("2");
  const [propertyTaxPct, setPropertyTaxPct] = useState<string>("1.5");
  const [propertyTaxGrowthPct, setPropertyTaxGrowthPct] = useState<string>("3");
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<string>("2500");
  const [hoaFeeAnnual, setHoaFeeAnnual] = useState<string>("0");
  const [maintenancePct, setMaintenancePct] = useState<string>("1.5");
  const [homeAppreciationPct, setHomeAppreciationPct] = useState<string>("3");
  const [costInsuranceIncreasePct, setCostInsuranceIncreasePct] = useState<string>("3");
  const [sellingClosingCostsPct, setSellingClosingCostsPct] = useState<string>("7");

  const [monthlyRent, setMonthlyRent] = useState<string>("3000");
  const [annualRentIncreasePct, setAnnualRentIncreasePct] = useState<string>("3");
  const [renterInsuranceMonthly, setRenterInsuranceMonthly] = useState<string>("15");
  const [securityDeposit, setSecurityDeposit] = useState<string>("3000");
  const [upfrontRentalFees, setUpfrontRentalFees] = useState<string>("100");

  const [investmentReturnRatePct, setInvestmentReturnRatePct] = useState<string>("5");
  const [marginalFederalTaxRate, setMarginalFederalTaxRate] = useState<string>("25");
  const [marginalStateTaxRate, setMarginalStateTaxRate] = useState<string>("0");
  const [taxFilingStatus, setTaxFilingStatus] = useState<TaxFilingStatus>("married_joint");

  const [savedBox1Items, setSavedBox1Items] = useState<SavedRentVsBuyItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);
  const [showHistoryBox1, setShowHistoryBox1] = useState<boolean>(false);

  const rvbCalc = useMemo(() => {
    return calculateRentVsBuy({
      homePrice: parseFloat(homePrice) || 0,
      downPaymentPct: parseFloat(downPaymentPct) || 0,
      interestRate: parseFloat(interestRate) || 0,
      loanTermYears: parseFloat(loanTermYears) || 30,
      buyingClosingCostsPct: parseFloat(buyingClosingCostsPct) || 0,
      propertyTaxPct: parseFloat(propertyTaxPct) || 0,
      propertyTaxAnnual: (parseFloat(homePrice) * (parseFloat(propertyTaxPct) || 1.5)) / 100,
      propertyTaxGrowthPct: parseFloat(propertyTaxGrowthPct) || 0,
      homeInsuranceAnnual: parseFloat(homeInsuranceAnnual) || 0,
      hoaFeeAnnual: parseFloat(hoaFeeAnnual) || 0,
      maintenancePct: parseFloat(maintenancePct) || 0,
      homeAppreciationPct: parseFloat(homeAppreciationPct) || 0,
      costInsuranceIncreasePct: parseFloat(costInsuranceIncreasePct) || 0,
      sellingClosingCostsPct: parseFloat(sellingClosingCostsPct) || 0,

      monthlyRent: parseFloat(monthlyRent) || 0,
      annualRentIncreasePct: parseFloat(annualRentIncreasePct) || 0,
      renterInsuranceMonthly: parseFloat(renterInsuranceMonthly) || 0,
      securityDeposit: parseFloat(securityDeposit) || 0,
      upfrontRentalFees: parseFloat(upfrontRentalFees) || 0,

      investmentReturnRatePct: parseFloat(investmentReturnRatePct) || 0,
      marginalFederalTaxRate: parseFloat(marginalFederalTaxRate) || 0,
      marginalStateTaxRate: parseFloat(marginalStateTaxRate) || 0,
      taxFilingStatus,
      currencySymbol,
    });
  }, [
    homePrice,
    downPaymentPct,
    interestRate,
    loanTermYears,
    buyingClosingCostsPct,
    propertyTaxPct,
    propertyTaxGrowthPct,
    homeInsuranceAnnual,
    hoaFeeAnnual,
    maintenancePct,
    homeAppreciationPct,
    costInsuranceIncreasePct,
    sellingClosingCostsPct,
    monthlyRent,
    annualRentIncreasePct,
    renterInsuranceMonthly,
    securityDeposit,
    upfrontRentalFees,
    investmentReturnRatePct,
    marginalFederalTaxRate,
    marginalStateTaxRate,
    taxFilingStatus,
    currencySymbol,
  ]);

  const handleSaveBox1 = () => {
    const newItem: SavedRentVsBuyItem = {
      id: Date.now().toString(),
      title: "Rent vs. Buy Calculation",
      inputsSummary: `Home: ${currencySymbol}${parseFloat(homePrice).toLocaleString()} | Rent: ${currencySymbol}${parseFloat(monthlyRent).toLocaleString()}/mo`,
      primaryResult: rvbCalc.breakevenMessage,
      detailsList: [
        `Price-to-Rent Ratio: ${rvbCalc.priceToRentRatio}`,
        `30-Yr Buying Cost: ${currencySymbol}${rvbCalc.buyingCumulativeNetCost30Yr.toLocaleString()}`,
        `30-Yr Renting Cost: ${currencySymbol}${rvbCalc.rentingCumulativeNetCost30Yr.toLocaleString()}`,
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
    const data = rvbCalc.averageCostTable;
    if (!data || data.length === 0) return;

    const headers = ["Staying Length", "Average Buying Monthly", "Average Buying Annual", "Average Renting Monthly", "Average Renting Annual"];
    const rows = data.map((row) => [
      `"${row.year} Year${row.year > 1 ? "s" : ""}"`,
      `"${currencySymbol}${row.buyingMonthly}"`,
      `"${currencySymbol}${row.buyingAnnual}"`,
      `"${currencySymbol}${row.rentingMonthly}"`,
      `"${currencySymbol}${row.rentingAnnual}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `rent_vs_buy_average_costs.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // High-Quality SVG Average Monthly Cost Chart (Buy vs Rent Lines & Area)
  const svgAverageCostChart = useMemo(() => {
    const data = rvbCalc.averageCostTable;
    if (!data || data.length === 0) return null;

    const maxVal = Math.max(...data.map((d) => Math.max(d.buyingMonthly, d.rentingMonthly)));
    const minVal = Math.min(...data.map((d) => Math.min(d.buyingMonthly, d.rentingMonthly)));
    const range = maxVal - minVal || 1;

    const pointsBuyArray = data.map((d, i) => {
      const x = (i / 29) * 320 + 35;
      const y = 135 - ((d.buyingMonthly - minVal) / range) * 105;
      return { x, y };
    });

    const pointsRentArray = data.map((d, i) => {
      const x = (i / 29) * 320 + 35;
      const y = 135 - ((d.rentingMonthly - minVal) / range) * 105;
      return { x, y };
    });

    const pointsBuy = pointsBuyArray.map((p) => `${p.x},${p.y}`).join(" ");
    const pointsRent = pointsRentArray.map((p) => `${p.x},${p.y}`).join(" ");

    const areaBuy = `35,135 ${pointsBuy} 355,135`;
    const areaRent = `35,135 ${pointsRent} 355,135`;

    return (
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs font-bold px-1">
          <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            Average Monthly Cost Comparison ($/mo)
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-blue-600 font-extrabold"><span className="w-3 h-1 bg-blue-600 rounded-full inline-block"></span> Buying</span>
            <span className="flex items-center gap-1.5 text-emerald-600 font-extrabold"><span className="w-3 h-1 bg-emerald-600 rounded-full inline-block"></span> Renting</span>
          </div>
        </div>

        <svg viewBox="0 0 380 165" className="w-full h-44 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-xs">
          <defs>
            <linearGradient id="buyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="rentGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="35" y1="30" x2="355" y2="30" stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1="35" y1="65" x2="355" y2="65" stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1="35" y1="100" x2="355" y2="100" stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1="35" y1="135" x2="355" y2="135" stroke="#cbd5e1" />

          {/* Y Axis Values */}
          <text x="30" y="33" fontSize="8" fill="#94a3b8" textAnchor="end" fontFamily="sans-serif font-bold">{currencySymbol}{Math.round(maxVal / 1000)}k</text>
          <text x="30" y="138" fontSize="8" fill="#94a3b8" textAnchor="end" fontFamily="sans-serif font-bold">{currencySymbol}{Math.round(minVal / 1000)}k</text>

          {/* Gradient Areas */}
          <polygon fill="url(#buyGrad)" points={areaBuy} />
          <polygon fill="url(#rentGrad)" points={areaRent} />

          {/* Polylines */}
          <polyline fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={pointsBuy} />
          <polyline fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={pointsRent} />

          {/* X Axis Year Labels */}
          <text x="35" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">Yr 1</text>
          <text x="90" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">Yr 5</text>
          <text x="145" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">Yr 10</text>
          <text x="200" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">Yr 15</text>
          <text x="255" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">Yr 20</text>
          <text x="310" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">Yr 25</text>
          <text x="355" y="152" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">Yr 30</text>
        </svg>
      </div>
    );
  }, [rvbCalc, currencySymbol]);

  // =========================================================================
  // OTHER 5 SIMPLE BOXES
  // =========================================================================
  const [savedBox2Items, setSavedBox2Items] = useState<SavedRentVsBuyItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);
  const [showHistoryBox2, setShowHistoryBox2] = useState<boolean>(false);

  const netWorthCalc = useMemo(() => {
    return calculateNetWorthComparison({
      homePrice: parseFloat(homePrice) || 500000,
      downPaymentAmount: (parseFloat(homePrice) * parseFloat(downPaymentPct)) / 100,
      appreciationRate: parseFloat(homeAppreciationPct) || 3.0,
      investmentReturnRate: parseFloat(investmentReturnRatePct) || 5.0,
      years: 10,
    });
  }, [homePrice, downPaymentPct, homeAppreciationPct, investmentReturnRatePct]);

  const handleSaveBox2 = () => {
    const newItem: SavedRentVsBuyItem = {
      id: Date.now().toString(),
      title: "Net Worth Comparison",
      inputsSummary: `Home: ${currencySymbol}${parseFloat(homePrice).toLocaleString()} | Appreciation: ${homeAppreciationPct}% vs Stock: ${investmentReturnRatePct}%`,
      primaryResult: `Advantage: ${netWorthCalc.netWorthAdvantage}`,
      detailsList: [
        `Home Equity: ${currencySymbol}${netWorthCalc.projectedHomeEquity.toLocaleString()}`,
        `Stock Portfolio: ${currencySymbol}${netWorthCalc.renterStockPortfolioValue.toLocaleString()}`,
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
      title: "Price-to-Rent Ratio",
      inputsSummary: `Home: ${currencySymbol}${parseFloat(homePrice).toLocaleString()} | Rent: ${currencySymbol}${parseFloat(monthlyRent).toLocaleString()}/mo`,
      primaryResult: `Ratio: ${ptrCalc.ratio} (${ptrCalc.category})`,
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

  const [savedBox4Items, setSavedBox4Items] = useState<SavedRentVsBuyItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);
  const [showHistoryBox4, setShowHistoryBox4] = useState<boolean>(false);

  const taxCalc = useMemo(() => {
    const mortgageBal = (parseFloat(homePrice) || 500000) * (1 - (parseFloat(downPaymentPct) || 20) / 100);
    return calculateTaxShield({
      homePrice: parseFloat(homePrice) || 500000,
      mortgageBalance: mortgageBal,
      interestRate: parseFloat(interestRate) || 6.632,
      propertyTaxAnnual: (parseFloat(homePrice) * parseFloat(propertyTaxPct)) / 100 || 7500,
      filingStatus: taxFilingStatus,
      marginalFederalTaxRate: parseFloat(marginalFederalTaxRate) || 25.0,
      marginalStateTaxRate: parseFloat(marginalStateTaxRate) || 0.0,
    });
  }, [homePrice, downPaymentPct, interestRate, propertyTaxPct, taxFilingStatus, marginalFederalTaxRate, marginalStateTaxRate]);

  const handleSaveBox4 = () => {
    const newItem: SavedRentVsBuyItem = {
      id: Date.now().toString(),
      title: "Tax Benefit Analysis",
      inputsSummary: `Filing Status: ${taxFilingStatus} | Federal Tax: ${marginalFederalTaxRate}% | State Tax: ${marginalStateTaxRate}%`,
      primaryResult: `Annual Tax Savings: ${currencySymbol}${taxCalc.annualTaxSavings.toLocaleString()}/yr`,
      detailsList: [taxCalc.explanation],
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

  const [savedBox5Items, setSavedBox5Items] = useState<SavedRentVsBuyItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);
  const [showHistoryBox5, setShowHistoryBox5] = useState<boolean>(false);

  const benCalc = useMemo(() => {
    return calculateBenFelix({
      homePrice: parseFloat(homePrice) || 500000,
      interestRate: parseFloat(interestRate) || 6.632,
      propertyTaxPct: parseFloat(propertyTaxPct) || 1.5,
      maintenancePct: parseFloat(maintenancePct) || 1.5,
    });
  }, [homePrice, interestRate, propertyTaxPct, maintenancePct]);

  const handleSaveBox5 = () => {
    const newItem: SavedRentVsBuyItem = {
      id: Date.now().toString(),
      title: "5% Unrecoverable Cost Rule",
      inputsSummary: `Home: ${currencySymbol}${parseFloat(homePrice).toLocaleString()} | Rate: ${interestRate}%`,
      primaryResult: `Unrecoverable Owning Cost: ${currencySymbol}${benCalc.monthlyUnrecoverableCost.toLocaleString()}/mo`,
      detailsList: [benCalc.explanation],
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
      title: "Short-Term Stay Relocation Cost",
      inputsSummary: `Home: ${currencySymbol}${parseFloat(homePrice).toLocaleString()} | Planned Stay: ${plannedStayYears} Years`,
      primaryResult: reloCalc.recommendation,
      detailsList: [
        `Total Closing Fees: ${currencySymbol}${reloCalc.totalFrictionCosts.toLocaleString()}`,
        `Monthly Drag: ${currencySymbol}${reloCalc.monthlyAmortizedDrag.toLocaleString()}/mo`,
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
      {/* Currency Selector Header */}
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
      {/* 1. RENT VS BUY CALCULATOR (EXACT COMPETITOR PARITY) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Rent vs. Buy Calculator</span>
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
            {/* Input Section - 3 Simple Columns like Competitor */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs text-xs">
              {/* Column 1: Home Purchase */}
              <div className="space-y-3">
                <span className="font-extrabold text-blue-600 dark:text-blue-400 block border-b border-slate-200 dark:border-slate-800 pb-1">Home Purchase</span>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Home price</label>
                  <input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Down payment %</label>
                  <input type="number" value={downPaymentPct} onChange={(e) => setDownPaymentPct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Interest rate %</label>
                  <input type="number" step="0.001" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Loan term (years)</label>
                  <input type="number" value={loanTermYears} onChange={(e) => setLoanTermYears(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Buying closing costs %</label>
                  <input type="number" step="0.1" value={buyingClosingCostsPct} onChange={(e) => setBuyingClosingCostsPct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Property tax % / year</label>
                  <input type="number" step="0.1" value={propertyTaxPct} onChange={(e) => setPropertyTaxPct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Property tax increase % / year</label>
                  <input type="number" step="0.1" value={propertyTaxGrowthPct} onChange={(e) => setPropertyTaxGrowthPct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Home insurance $ / year</label>
                  <input type="number" value={homeInsuranceAnnual} onChange={(e) => setHomeInsuranceAnnual(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">HOA fee $ / year</label>
                  <input type="number" value={hoaFeeAnnual} onChange={(e) => setHoaFeeAnnual(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Maintenance cost % / year</label>
                  <input type="number" step="0.1" value={maintenancePct} onChange={(e) => setMaintenancePct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Home value appreciation % / year</label>
                  <input type="number" step="0.1" value={homeAppreciationPct} onChange={(e) => setHomeAppreciationPct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Cost/insurance increase % / year</label>
                  <input type="number" step="0.1" value={costInsuranceIncreasePct} onChange={(e) => setCostInsuranceIncreasePct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Selling closing costs %</label>
                  <input type="number" step="0.1" value={sellingClosingCostsPct} onChange={(e) => setSellingClosingCostsPct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              {/* Column 2: Home Rent */}
              <div className="space-y-3">
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 block border-b border-slate-200 dark:border-slate-800 pb-1">Home Rent</span>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Monthly rental fee</label>
                  <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Rental fee increase % / year</label>
                  <input type="number" step="0.1" value={annualRentIncreasePct} onChange={(e) => setAnnualRentIncreasePct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Renter's insurance $ / month</label>
                  <input type="number" value={renterInsuranceMonthly} onChange={(e) => setRenterInsuranceMonthly(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Security deposit</label>
                  <input type="number" value={securityDeposit} onChange={(e) => setSecurityDeposit(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Upfront cost</label>
                  <input type="number" value={upfrontRentalFees} onChange={(e) => setUpfrontRentalFees(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              {/* Column 3: Your Information */}
              <div className="space-y-3">
                <span className="font-extrabold text-amber-600 dark:text-amber-400 block border-b border-slate-200 dark:border-slate-800 pb-1">Your Information</span>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Average investment return %</label>
                  <input type="number" step="0.1" value={investmentReturnRatePct} onChange={(e) => setInvestmentReturnRatePct(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Marginal federal tax rate %</label>
                  <input type="number" step="0.1" value={marginalFederalTaxRate} onChange={(e) => setMarginalFederalTaxRate(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Marginal state tax rate %</label>
                  <input type="number" step="0.1" value={marginalStateTaxRate} onChange={(e) => setMarginalStateTaxRate(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tax filing status</label>
                  <select value={taxFilingStatus} onChange={(e) => setTaxFilingStatus(e.target.value as any)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">
                    <option value="married_joint">Married filing jointly</option>
                    <option value="single">Single</option>
                    <option value="married_separate">Married filing separately</option>
                    <option value="head_of_household">Head of household</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Elevated Hero Result Output Box */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-gradient-to-br from-blue-50/90 to-indigo-50/70 dark:from-slate-900 dark:to-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-blue-200/60 dark:border-blue-900/40 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    Decision Result
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-extrabold">
                    Ratio: {rvbCalc.priceToRentRatio}
                  </span>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-900/60 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Recommended Stay Horizon</span>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100 leading-snug">
                    {rvbCalc.breakevenMessage}
                  </div>
                </div>

                {/* 3 Key Stats */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase font-sans">30-Yr Buy Cost</span>
                    <span className="text-blue-600 text-sm font-extrabold tabular-nums">{currencySymbol}{rvbCalc.buyingCumulativeNetCost30Yr.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase font-sans">30-Yr Rent Cost</span>
                    <span className="text-emerald-600 text-sm font-extrabold tabular-nums">{currencySymbol}{rvbCalc.rentingCumulativeNetCost30Yr.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-1">
                  {svgAverageCostChart}
                </div>
              </div>
            </div>
          </div>

          {/* Calculator.net Average Cost Table */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200">
                The following is the average cost based on the length you stay for the next 30 years.
              </span>
              <button
                type="button"
                onClick={handleExportCSV}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                title="Export Average Costs to CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto max-h-72 rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs text-center border-collapse font-mono">
                <thead className="sticky top-0 bg-blue-600 text-white font-bold font-sans">
                  <tr>
                    <th className="p-2.5 border-r border-blue-500" rowSpan={2}>Staying Length</th>
                    <th className="p-2 border-b border-blue-500" colSpan={2}>Average Buying Cost</th>
                    <th className="p-2 border-b border-blue-500" colSpan={2}>Average Renting Cost</th>
                  </tr>
                  <tr>
                    <th className="p-2 border-r border-blue-500">Monthly</th>
                    <th className="p-2 border-r border-blue-500">Annual</th>
                    <th className="p-2 border-r border-blue-500">Monthly</th>
                    <th className="p-2">Annual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {rvbCalc.averageCostTable.map((row) => {
                    const isBreakevenRow = row.year === rvbCalc.breakevenYears;
                    return (
                      <tr key={row.year} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 ${isBreakevenRow ? "bg-blue-50/80 dark:bg-blue-950/40 font-bold border-l-4 border-l-blue-600" : ""}`}>
                        <td className="p-2 font-bold font-sans text-blue-600 border-r border-slate-200 dark:border-slate-800">{row.year} Year{row.year > 1 ? "s" : ""}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold text-blue-700 dark:text-blue-400">{currencySymbol}{row.buyingMonthly.toLocaleString()}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800">{currencySymbol}{row.buyingAnnual.toLocaleString()}</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold text-emerald-700 dark:text-emerald-400">{currencySymbol}{row.rentingMonthly.toLocaleString()}</td>
                        <td className="p-2">{currencySymbol}{row.rentingAnnual.toLocaleString()}</td>
                      </tr>
                    );
                  })}
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
      {/* 2. NET WORTH COMPARISON */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Net Worth Comparison</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Home appreciation %</label>
                  <input type="number" step="0.1" value={homeAppreciationPct} onChange={(e) => setHomeAppreciationPct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Average investment return %</label>
                  <input type="number" step="0.1" value={investmentReturnRatePct} onChange={(e) => setInvestmentReturnRatePct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">10-Year Result</span>

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
      {/* 3. PRICE-TO-RENT RATIO */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Price-to-Rent Ratio</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Home price</label>
                  <input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Monthly rental fee</label>
                  <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Market Benchmark</span>

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
      {/* 4. TAX BENEFIT ANALYSIS */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Tax Benefit Analysis</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Marginal federal tax rate %</label>
                  <input type="number" step="0.1" value={marginalFederalTaxRate} onChange={(e) => setMarginalFederalTaxRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Marginal state tax rate %</label>
                  <input type="number" step="0.1" value={marginalStateTaxRate} onChange={(e) => setMarginalStateTaxRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Annual Tax Savings</span>

              <div className="text-3xl font-extrabold text-emerald-600 font-sans tabular-nums mt-1">
                Save {currencySymbol}{taxCalc.annualTaxSavings.toLocaleString()} / year
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200">
                {taxCalc.explanation}
              </div>
            </div>
          </div>

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
      {/* 5. 5% UNRECOVERABLE COST RULE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">5% Unrecoverable Cost Rule</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Interest rate %</label>
                  <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Maintenance cost % / year</label>
                  <input type="number" step="0.1" value={maintenancePct} onChange={(e) => setMaintenancePct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">5% Rule Benchmark</span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                Unrecoverable Owning Cost: {currencySymbol}{benCalc.monthlyUnrecoverableCost.toLocaleString()}/mo
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-emerald-600">
                If Rent &lt; {currencySymbol}{benCalc.maxAdvantageousMonthlyRent.toLocaleString()}/mo, Renting Wins!
              </div>
            </div>
          </div>

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
      {/* 6. SHORT-TERM STAY RELOCATION COST */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Short-Term Stay Relocation Cost</span>
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Planned stay (years)</label>
                  <select value={plannedStayYears} onChange={(e) => setPlannedStayYears(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold">
                    <option value="2">2 Years</option>
                    <option value="3">3 Years</option>
                    <option value="5">5 Years</option>
                    <option value="7">7 Years</option>
                    <option value="10">10 Years</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Selling closing costs %</label>
                  <input type="number" step="0.1" value={sellingClosingCostsPct} onChange={(e) => setSellingClosingCostsPct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Transaction Drag</span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                Friction Costs: {currencySymbol}{reloCalc.totalFrictionCosts.toLocaleString()}
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-red-500">
                Adds +{currencySymbol}{reloCalc.monthlyAmortizedDrag.toLocaleString()}/mo Drag!
              </div>
            </div>
          </div>

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
