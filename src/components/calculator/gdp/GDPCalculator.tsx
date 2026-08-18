"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  Check,
} from "lucide-react";
import {
  calculateExpenditureGdp,
  calculateIncomeGdp,
  calculateRealGdp,
  calculateGdpGrowth,
  calculateProductionGdp,
  COUNTRY_MACRO_PRESETS,
} from "@/lib/calculator-engine/formulas/gdp";

export interface SavedGdpItem {
  id: string;
  title: string;
  inputs: string;
  result: string;
  resultsList: string[];
  timestamp: string;
}

export function GDPCalculator() {
  // Simple Currency Selector with Dollar ($) as default
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // ==========================================
  // BOX 1: EXPENDITURE APPROACH GDP
  // ==========================================
  const [consumptionInput, setConsumptionInput] = useState<string>("19100");
  const [investmentInput, setInvestmentInput] = useState<string>("5100");
  const [governmentInput, setGovernmentInput] = useState<string>("4850");
  const [exportsInput, setExportsInput] = useState<string>("3150");
  const [importsInput, setImportsInput] = useState<string>("3820");
  const [populationInput, setPopulationInput] = useState<string>("335"); // Millions

  // Saved state for Box 1
  const [savedCoreItems, setSavedCoreItems] = useState<SavedGdpItem[]>([]);
  const [justSavedCore, setJustSavedCore] = useState<boolean>(false);

  // ==========================================
  // BOX 2: RESOURCE COST - INCOME APPROACH
  // ==========================================
  const [compWagesInput, setCompWagesInput] = useState<string>("14500");
  const [propIncomeInput, setPropIncomeInput] = useState<string>("2100");
  const [rentIncomeInput, setRentIncomeInput] = useState<string>("950");
  const [corpProfitsInput, setCorpProfitsInput] = useState<string>("3400");
  const [interestIncomeInput, setInterestIncomeInput] = useState<string>("1100");
  const [indirectTaxesInput, setIndirectTaxesInput] = useState<string>("1850");
  const [depreciationInput, setDepreciationInput] = useState<string>("4200");
  const [foreignIncomeInput, setForeignIncomeInput] = useState<string>("-120");
  const [savedIncomeItems, setSavedIncomeItems] = useState<SavedGdpItem[]>([]);
  const [justSavedIncome, setJustSavedIncome] = useState<boolean>(false);

  // ==========================================
  // BOX 3: REAL GDP & GDP DEFLATOR
  // ==========================================
  const [nomGdpInput, setNomGdpInput] = useState<string>("28380");
  const [deflatorInput, setDeflatorInput] = useState<string>("124.5");
  const [savedRealItems, setSavedRealItems] = useState<SavedGdpItem[]>([]);
  const [justSavedReal, setJustSavedReal] = useState<boolean>(false);

  // ==========================================
  // BOX 4: GDP GROWTH RATE
  // ==========================================
  const [priorGdpInput, setPriorGdpInput] = useState<string>("27360");
  const [currGdpInput, setCurrGdpInput] = useState<string>("28380");
  const [growthYearsInput, setGrowthYearsInput] = useState<string>("1");
  const [savedGrowthItems, setSavedGrowthItems] = useState<SavedGdpItem[]>([]);
  const [justSavedGrowth, setJustSavedGrowth] = useState<boolean>(false);

  // ==========================================
  // BOX 5: PRODUCTION (VALUE-ADDED) APPROACH
  // ==========================================
  const [grossOutputInput, setGrossOutputInput] = useState<string>("52000");
  const [intermediateInputs, setIntermediateInputs] = useState<string>("26000");
  const [netProductTaxes, setNetProductTaxes] = useState<string>("2380");
  const [savedProdItems, setSavedProdItems] = useState<SavedGdpItem[]>([]);
  const [justSavedProd, setJustSavedProd] = useState<boolean>(false);

  // ==========================================
  // BOX 6: GDP PER CAPITA & PROSPERITY TIER
  // ==========================================
  const [tierGdpInput, setTierGdpInput] = useState<string>("28380000000000");
  const [tierPopInput, setTierPopInput] = useState<string>("335000000");
  const [savedTierItems, setSavedTierItems] = useState<SavedGdpItem[]>([]);
  const [justSavedTier, setJustSavedTier] = useState<boolean>(false);

  // Load saved calculations on mount
  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_gdp_core");
      if (s1) setSavedCoreItems(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_gdp_income");
      if (s2) setSavedIncomeItems(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_gdp_real");
      if (s3) setSavedRealItems(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_gdp_growth");
      if (s4) setSavedGrowthItems(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_gdp_prod");
      if (s5) setSavedProdItems(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_gdp_tier");
      if (s6) setSavedTierItems(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Format currency helper
  const fmt = (num: number) => {
    return `${currencySymbol}${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Country preset apply
  const applyPreset = (code: string) => {
    const p = COUNTRY_MACRO_PRESETS[code];
    if (!p) return;
    setConsumptionInput(p.C.toString());
    setInvestmentInput(p.I.toString());
    setGovernmentInput(p.G.toString());
    setExportsInput(p.X.toString());
    setImportsInput(p.M.toString());
    setPopulationInput(p.pop.toString());
  };

  // ==========================================
  // 1. COMPUTED RESULTS: EXPENDITURE GDP
  // ==========================================
  const coreResult = useMemo(() => {
    const popTotal = (Number(populationInput) || 335) * 1000000;
    return calculateExpenditureGdp({
      personalConsumption: Number(consumptionInput) || 0,
      grossInvestment: Number(investmentInput) || 0,
      governmentSpending: Number(governmentInput) || 0,
      exports: Number(exportsInput) || 0,
      imports: Number(importsInput) || 0,
      population: popTotal,
    });
  }, [
    consumptionInput,
    investmentInput,
    governmentInput,
    exportsInput,
    importsInput,
    populationInput,
  ]);

  // ==========================================
  // 2. COMPUTED RESULTS: INCOME GDP
  // ==========================================
  const incomeResult = useMemo(() => {
    return calculateIncomeGdp({
      employeeCompensation: Number(compWagesInput) || 0,
      proprietorsIncome: Number(propIncomeInput) || 0,
      rentalIncome: Number(rentIncomeInput) || 0,
      corporateProfits: Number(corpProfitsInput) || 0,
      netInterestIncome: Number(interestIncomeInput) || 0,
      indirectTaxes: Number(indirectTaxesInput) || 0,
      depreciation: Number(depreciationInput) || 0,
      netForeignIncome: Number(foreignIncomeInput) || 0,
    });
  }, [
    compWagesInput,
    propIncomeInput,
    rentIncomeInput,
    corpProfitsInput,
    interestIncomeInput,
    indirectTaxesInput,
    depreciationInput,
    foreignIncomeInput,
  ]);

  // ==========================================
  // 3. COMPUTED RESULTS: REAL GDP
  // ==========================================
  const realResult = useMemo(() => {
    return calculateRealGdp(
      Number(nomGdpInput) || 0,
      Number(deflatorInput) || 100
    );
  }, [nomGdpInput, deflatorInput]);

  // ==========================================
  // 4. COMPUTED RESULTS: GDP GROWTH
  // ==========================================
  const growthResult = useMemo(() => {
    return calculateGdpGrowth(
      Number(priorGdpInput) || 0,
      Number(currGdpInput) || 0,
      Number(growthYearsInput) || 1
    );
  }, [priorGdpInput, currGdpInput, growthYearsInput]);

  // ==========================================
  // 5. COMPUTED RESULTS: PRODUCTION GVA
  // ==========================================
  const prodResult = useMemo(() => {
    return calculateProductionGdp(
      Number(grossOutputInput) || 0,
      Number(intermediateInputs) || 0,
      Number(netProductTaxes) || 0
    );
  }, [grossOutputInput, intermediateInputs, netProductTaxes]);

  // ==========================================
  // 6. COMPUTED RESULTS: PER CAPITA TIER
  // ==========================================
  const tierResult = useMemo(() => {
    const gdp = Number(tierGdpInput) || 0;
    const pop = Number(tierPopInput) || 1;
    const perCapita = gdp / pop;

    let tier = "High Income";
    let badgeColor = "text-emerald-600";
    if (perCapita >= 14005) {
      tier = "High Income Economy (World Bank Tier 1)";
      badgeColor = "text-emerald-600";
    } else if (perCapita >= 4466) {
      tier = "Upper-Middle Income Economy (World Bank Tier 2)";
      badgeColor = "text-blue-600";
    } else if (perCapita >= 1136) {
      tier = "Lower-Middle Income Economy (World Bank Tier 3)";
      badgeColor = "text-amber-600";
    } else {
      tier = "Low Income Economy (World Bank Tier 4)";
      badgeColor = "text-red-600";
    }

    return {
      perCapita,
      tier,
      badgeColor,
    };
  }, [tierGdpInput, tierPopInput]);

  // ==========================================
  // SAVE HANDLERS FOR ALL 6 BOXES
  // ==========================================
  const handleSaveCore = () => {
    const inputStr = `C: ${currencySymbol}${consumptionInput}B | I: ${currencySymbol}${investmentInput}B | G: ${currencySymbol}${governmentInput}B | NX: ${currencySymbol}${coreResult.netExports}B`;
    const resList = [
      `Total GDP: ${fmt(coreResult.totalGdp)} Billion`,
      `GDP Per Capita: ${currencySymbol}${Math.round(coreResult.gdpPerCapita * 1000000000).toLocaleString()}/person`,
      `Sector Split: C ${coreResult.consumptionPct.toFixed(1)}% | I ${coreResult.investmentPct.toFixed(1)}% | G ${coreResult.governmentPct.toFixed(1)}% | NX ${coreResult.netExportsPct.toFixed(1)}%`,
    ];

    const newItem: SavedGdpItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Expenditure GDP",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedCoreItems].slice(0, 10);
    setSavedCoreItems(updated);
    try {
      localStorage.setItem("saved_gdp_core", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedCore(true);
    setTimeout(() => setJustSavedCore(false), 2500);
  };

  const handleSaveIncome = () => {
    const inputStr = `Wages: ${currencySymbol}${compWagesInput}B | Profits: ${currencySymbol}${corpProfitsInput}B | Taxes: ${currencySymbol}${indirectTaxesInput}B`;
    const resList = [
      `Total GDP (Income): ${fmt(incomeResult.totalGdp)} Billion`,
      `Gross National Product (GNP): ${fmt(incomeResult.gnp)} Billion`,
      `Depreciation Share: ${incomeResult.capitalConsumptionShare.toFixed(1)}% of GDP`,
    ];

    const newItem: SavedGdpItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Income Approach GDP",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedIncomeItems].slice(0, 10);
    setSavedIncomeItems(updated);
    try {
      localStorage.setItem("saved_gdp_income", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedIncome(true);
    setTimeout(() => setJustSavedIncome(false), 2500);
  };

  const handleSaveReal = () => {
    const inputStr = `Nominal GDP: ${currencySymbol}${nomGdpInput}B | Deflator: ${deflatorInput}`;
    const resList = [
      `Real GDP: ${fmt(realResult.realGdp)} Billion`,
      `Inflation Drag: ${fmt(realResult.inflationDragAmount)} Billion`,
    ];

    const newItem: SavedGdpItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Real vs. Nominal GDP",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedRealItems].slice(0, 10);
    setSavedRealItems(updated);
    try {
      localStorage.setItem("saved_gdp_real", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedReal(true);
    setTimeout(() => setJustSavedReal(false), 2500);
  };

  const handleSaveGrowth = () => {
    const inputStr = `Prior: ${currencySymbol}${priorGdpInput}B -> Current: ${currencySymbol}${currGdpInput}B (${growthYearsInput} Yrs)`;
    const resList = [
      `Annualized CAGR: ${growthResult.annualizedGrowthCagr.toFixed(2)}%/yr`,
      `Total Growth: ${growthResult.nominalGrowthPct.toFixed(2)}%`,
      `Dollar Expansion: +${fmt(growthResult.dollarExpansion)} Billion`,
    ];

    const newItem: SavedGdpItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "GDP Growth Rate",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedGrowthItems].slice(0, 10);
    setSavedGrowthItems(updated);
    try {
      localStorage.setItem("saved_gdp_growth", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedGrowth(true);
    setTimeout(() => setJustSavedGrowth(false), 2500);
  };

  const handleSaveProd = () => {
    const inputStr = `Gross Output: ${currencySymbol}${grossOutputInput}B | Intermediate: ${currencySymbol}${intermediateInputs}B`;
    const resList = [
      `Gross Value Added (GVA): ${fmt(prodResult.grossValueAdded)} Billion`,
      `GDP Contribution: ${fmt(prodResult.totalGdpContribution)} Billion`,
      `Value-Added Margin: ${prodResult.valueAddedMarginPct.toFixed(1)}%`,
    ];

    const newItem: SavedGdpItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Production GVA",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedProdItems].slice(0, 10);
    setSavedProdItems(updated);
    try {
      localStorage.setItem("saved_gdp_prod", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedProd(true);
    setTimeout(() => setJustSavedProd(false), 2500);
  };

  const handleSaveTier = () => {
    const inputStr = `GDP: ${currencySymbol}${(Number(tierGdpInput) / 1000000000000).toFixed(2)}T | Pop: ${(Number(tierPopInput) / 1000000).toFixed(1)}M`;
    const resList = [
      `GDP Per Capita: ${fmt(tierResult.perCapita)}/person`,
      `Prosperity Tier: ${tierResult.tier}`,
    ];

    const newItem: SavedGdpItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7),
      title: "Per Capita Prosperity Tier",
      inputs: inputStr,
      result: resList.join(" | "),
      resultsList: resList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };

    const updated = [newItem, ...savedTierItems].slice(0, 10);
    setSavedTierItems(updated);
    try {
      localStorage.setItem("saved_gdp_tier", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedTier(true);
    setTimeout(() => setJustSavedTier(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* ========================================================================= */}
      {/* BOX 1: EXPENDITURE APPROACH GDP CALCULATOR (UNIVERSAL SUITE) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Expenditure Approach GDP Calculator [GDP = C + I + G + (X - M)]</span>
          <div className="flex items-center gap-2">
            {/* Simple Currency Selector with Dollar ($) as default */}
            <div className="flex items-center gap-1 bg-blue-700 p-0.5 rounded border border-blue-500 text-[11px] font-bold">
              {["$", "€", "£", "₹"].map((cur) => (
                <button
                  key={cur}
                  type="button"
                  onClick={() => setCurrencySymbol(cur)}
                  className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                    currencySymbol === cur
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-blue-100 hover:text-white"
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleSaveCore}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
                justSavedCore
                  ? "bg-emerald-500 text-white font-bold"
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
            >
              {justSavedCore ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
              <span>{justSavedCore ? "Saved!" : `Save${savedCoreItems.length > 0 ? ` (${savedCoreItems.length})` : ""}`}</span>
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4 space-y-3">
          {/* Quick Country Benchmark Presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-bold text-slate-500 text-[11px]">Quick Benchmarks:</span>
            {Object.entries(COUNTRY_MACRO_PRESETS).map(([code, data]) => (
              <button
                key={code}
                type="button"
                onClick={() => applyPreset(code)}
                className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 border border-slate-200 dark:border-slate-700 text-[11px] font-bold transition-colors cursor-pointer"
              >
                {data.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
            {/* LEFT COLUMN: EXPENDITURE INPUTS */}
            <div className="lg:col-span-5 space-y-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Expenditure Components (in Billions {currencySymbol})
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Personal Consumption (C)
                </label>
                <input
                  type="number"
                  value={consumptionInput}
                  onChange={(e) => setConsumptionInput(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Gross Investment (I)
                  </label>
                  <input
                    type="number"
                    value={investmentInput}
                    onChange={(e) => setInvestmentInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Govt Spending (G)
                  </label>
                  <input
                    type="number"
                    value={governmentInput}
                    onChange={(e) => setGovernmentInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Exports (X)
                  </label>
                  <input
                    type="number"
                    value={exportsInput}
                    onChange={(e) => setExportsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Imports (M)
                  </label>
                  <input
                    type="number"
                    value={importsInput}
                    onChange={(e) => setImportsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  National Population (Millions)
                </label>
                <input
                  type="number"
                  value={populationInput}
                  onChange={(e) => setPopulationInput(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: OUTPUTS */}
            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 dark:text-blue-400 block">
                      Total Gross Domestic Product (GDP)
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
                      {fmt(coreResult.totalGdp)} Billion
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                      GDP Per Capita
                    </span>
                    <span className="text-sm font-bold font-mono text-emerald-600">
                      {currencySymbol}{Math.round((coreResult.totalGdp * 1000000000) / ((Number(populationInput) || 335) * 1000000)).toLocaleString()}/person
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 text-xs font-bold text-center">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[9px] text-slate-400 uppercase block">Consumption (C)</span>
                    <span className="font-mono text-xs text-blue-600">{coreResult.consumptionPct.toFixed(1)}%</span>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[9px] text-slate-400 uppercase block">Investment (I)</span>
                    <span className="font-mono text-xs text-amber-600">{coreResult.investmentPct.toFixed(1)}%</span>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[9px] text-slate-400 uppercase block">Government (G)</span>
                    <span className="font-mono text-xs text-slate-900 dark:text-slate-100">{coreResult.governmentPct.toFixed(1)}%</span>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[9px] text-slate-400 uppercase block">Net Exports (NX)</span>
                    <span className="font-mono text-xs text-emerald-600">{coreResult.netExportsPct.toFixed(1)}%</span>
                  </div>
                </div>

                {/* SECTOR STACKED PROGRESS */}
                <div className="space-y-1 pt-1">
                  <div className="w-full h-3 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 flex">
                    <div style={{ width: `${Math.max(0, Math.min(100, coreResult.consumptionPct))}%` }} className="bg-blue-600" />
                    <div style={{ width: `${Math.max(0, Math.min(100, coreResult.investmentPct))}%` }} className="bg-amber-500" />
                    <div style={{ width: `${Math.max(0, Math.min(100, coreResult.governmentPct))}%` }} className="bg-purple-600" />
                    <div style={{ width: `${Math.max(0, Math.min(100, coreResult.netExportsPct))}%` }} className="bg-emerald-500" />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400">
                    <span>Net Trade: {coreResult.netExports >= 0 ? `+${fmt(coreResult.netExports)}B Surplus` : `${fmt(coreResult.netExports)}B Deficit`}</span>
                    <span>Total Trillion: {(coreResult.totalGdp / 1000).toFixed(2)}T</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS BOX 1 */}
          {savedCoreItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Expenditure Scenarios ({savedCoreItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedCoreItems([]);
                    localStorage.removeItem("saved_gdp_core");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedCoreItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 flex flex-col justify-between shadow-xs"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-bold text-blue-600 text-[11px]">{item.title}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedCoreItems.filter((i) => i.id !== item.id);
                            setSavedCoreItems(updated);
                            localStorage.setItem("saved_gdp_core", JSON.stringify(updated));
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                      <div><strong className="text-slate-500">Inputs:</strong> {item.inputs}</div>
                      <div className="space-y-0.5 font-mono text-[10px]">
                        {item.resultsList?.map((line, idx) => (
                          <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-700">
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 2: RESOURCE COST - INCOME APPROACH GDP SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Resource Cost - Income Approach GDP Solver [GDP = GNP + Taxes + Depr + NFIFA]</span>
          <button
            type="button"
            onClick={handleSaveIncome}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedIncome
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedIncome ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedIncome ? "Saved!" : `Save${savedIncomeItems.length > 0 ? ` (${savedIncomeItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-6 space-y-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Factor Incomes & Non-Factor Costs (in Billions {currencySymbol})
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Employee Compensation
                  </label>
                  <input
                    type="number"
                    value={compWagesInput}
                    onChange={(e) => setCompWagesInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Proprietors&apos; Income
                  </label>
                  <input
                    type="number"
                    value={propIncomeInput}
                    onChange={(e) => setPropIncomeInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Rental Income
                  </label>
                  <input
                    type="number"
                    value={rentIncomeInput}
                    onChange={(e) => setRentIncomeInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Corporate Profits
                  </label>
                  <input
                    type="number"
                    value={corpProfitsInput}
                    onChange={(e) => setCorpProfitsInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Interest Income
                  </label>
                  <input
                    type="number"
                    value={interestIncomeInput}
                    onChange={(e) => setInterestIncomeInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Indirect Taxes
                  </label>
                  <input
                    type="number"
                    value={indirectTaxesInput}
                    onChange={(e) => setIndirectTaxesInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Depreciation
                  </label>
                  <input
                    type="number"
                    value={depreciationInput}
                    onChange={(e) => setDepreciationInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Net Foreign Inc*
                  </label>
                  <input
                    type="number"
                    value={foreignIncomeInput}
                    onChange={(e) => setForeignIncomeInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 block">
                      Total GDP (Income Approach)
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-blue-600">
                      {fmt(incomeResult.totalGdp)} Billion
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Gross National Product (GNP)</span>
                    <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
                      {fmt(incomeResult.gnp)} Billion
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">National Factor Income</span>
                    <span>{fmt(incomeResult.nationalIncome)} Billion</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border">
                    <span className="text-[9px] text-slate-400 font-sans block">Capital Depreciation Share</span>
                    <span className="text-amber-600">{incomeResult.capitalConsumptionShare.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED INCOME LIST */}
          {savedIncomeItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Income Scenarios ({savedIncomeItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedIncomeItems([]);
                    localStorage.removeItem("saved_gdp_income");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedIncomeItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                    </div>
                    <div className="space-y-0.5 font-mono text-[10px]">
                      {item.resultsList?.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 3: REAL GDP & GDP DEFLATOR SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Real GDP & GDP Deflator Inflation Adjustment [Real = (Nominal ÷ Deflator) × 100]</span>
          <button
            type="button"
            onClick={handleSaveReal}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedReal
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedReal ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedReal ? "Saved!" : `Save${savedRealItems.length > 0 ? ` (${savedRealItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Inflation Deflator Parameters
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Nominal Raw GDP (Billions {currencySymbol})
                </label>
                <input
                  type="number"
                  value={nomGdpInput}
                  onChange={(e) => setNomGdpInput(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  GDP Deflator Index (Base Year = 100)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={deflatorInput}
                  onChange={(e) => setDeflatorInput(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 block">
                      Real Constant-Dollar GDP
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-emerald-600">
                      {fmt(realResult.realGdp)} Billion
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Inflation Drag</span>
                    <span className="text-sm font-bold font-mono text-amber-600">
                      -{fmt(realResult.inflationDragAmount)} Billion
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border text-xs font-mono font-bold flex justify-between items-center">
                  <span className="text-slate-500 font-sans">Cumulative Price Level Increase:</span>
                  <span className="text-blue-600">+{(Number(deflatorInput) - 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED REAL LIST */}
          {savedRealItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Real GDP Calculations ({savedRealItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedRealItems([]);
                    localStorage.removeItem("saved_gdp_real");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedRealItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                    </div>
                    <div className="space-y-0.5 font-mono text-[10px]">
                      {item.resultsList?.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 4: GDP GROWTH RATE & COMPOUNDED ANNUAL EXPANSION */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>GDP Growth Rate & Compounded Annual Expansion</span>
          <button
            type="button"
            onClick={handleSaveGrowth}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedGrowth
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedGrowth ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedGrowth ? "Saved!" : `Save${savedGrowthItems.length > 0 ? ` (${savedGrowthItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Growth Parameters
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Prior Period GDP (B)
                  </label>
                  <input
                    type="number"
                    value={priorGdpInput}
                    onChange={(e) => setPriorGdpInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Current GDP (B)
                  </label>
                  <input
                    type="number"
                    value={currGdpInput}
                    onChange={(e) => setCurrGdpInput(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Time Horizon (Years)
                </label>
                <input
                  type="number"
                  value={growthYearsInput}
                  onChange={(e) => setGrowthYearsInput(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 block">
                      Annualized Growth Rate (CAGR)
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-emerald-600">
                      {growthResult.annualizedGrowthCagr.toFixed(2)}% / year
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Total Nominal Growth</span>
                    <span className="text-sm font-bold font-mono text-blue-600">
                      {growthResult.nominalGrowthPct.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border text-xs font-mono font-bold flex justify-between items-center">
                  <span className="text-slate-500 font-sans">Net Economic Expansion:</span>
                  <span className="text-emerald-600">+{fmt(growthResult.dollarExpansion)} Billion</span>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED GROWTH LIST */}
          {savedGrowthItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Growth Calculations ({savedGrowthItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedGrowthItems([]);
                    localStorage.removeItem("saved_gdp_growth");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedGrowthItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                    </div>
                    <div className="space-y-0.5 font-mono text-[10px]">
                      {item.resultsList?.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 5: PRODUCTION (VALUE-ADDED) APPROACH GDP SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>Production (Value-Added) Approach GDP Solver [GVA = Output - Inputs + Taxes]</span>
          <button
            type="button"
            onClick={handleSaveProd}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedProd
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedProd ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedProd ? "Saved!" : `Save${savedProdItems.length > 0 ? ` (${savedProdItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Industry Output Parameters
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Gross Output Value (B {currencySymbol})
                </label>
                <input
                  type="number"
                  value={grossOutputInput}
                  onChange={(e) => setGrossOutputInput(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Intermediate Inputs (B)
                  </label>
                  <input
                    type="number"
                    value={intermediateInputs}
                    onChange={(e) => setIntermediateInputs(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Net Product Taxes (B)
                  </label>
                  <input
                    type="number"
                    value={netProductTaxes}
                    onChange={(e) => setNetProductTaxes(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-blue-600 block">
                      Total GDP Contribution
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-blue-600">
                      {fmt(prodResult.totalGdpContribution)} Billion
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Gross Value Added (GVA)</span>
                    <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
                      {fmt(prodResult.grossValueAdded)} Billion
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border text-xs font-mono font-bold flex justify-between items-center">
                  <span className="text-slate-500 font-sans">Value-Added Margin:</span>
                  <span className="text-emerald-600">{prodResult.valueAddedMarginPct.toFixed(1)}% of Output</span>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED PROD LIST */}
          {savedProdItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Production Calculations ({savedProdItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedProdItems([]);
                    localStorage.removeItem("saved_gdp_prod");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedProdItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                    </div>
                    <div className="space-y-0.5 font-mono text-[10px]">
                      {item.resultsList?.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 6: GDP PER CAPITA & PROSPERITY TIER PREDICTOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-3 py-2 flex items-center justify-between">
          <span>GDP Per Capita & Global Living Standard Tier Predictor</span>
          <button
            type="button"
            onClick={handleSaveTier}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              justSavedTier
                ? "bg-emerald-500 text-white font-bold"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {justSavedTier ? <Check className="w-3 h-3 text-white" /> : <Bookmark className="w-3 h-3 text-white" />}
            <span>{justSavedTier ? "Saved!" : `Save${savedTierItems.length > 0 ? ` (${savedTierItems.length})` : ""}`}</span>
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-5 space-y-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                Demographic Inputs
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  National GDP (Raw Units {currencySymbol})
                </label>
                <input
                  type="number"
                  value={tierGdpInput}
                  onChange={(e) => setTierGdpInput(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Total Resident Population
                </label>
                <input
                  type="number"
                  value={tierPopInput}
                  onChange={(e) => setTierPopInput(e.target.value)}
                  className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white font-mono font-bold text-xs"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                      Nominal GDP Per Capita
                    </span>
                    <div className="text-2xl font-mono font-extrabold text-emerald-600">
                      {fmt(tierResult.perCapita)} / person
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Classification</span>
                    <span className={`text-xs font-extrabold ${tierResult.badgeColor}`}>
                      {tierResult.tier}
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border text-xs font-mono font-bold flex justify-between items-center">
                  <span className="text-slate-500 font-sans">Monthly Output Per Citizen:</span>
                  <span className="text-blue-600">{fmt(tierResult.perCapita / 12)} / month</span>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED TIER LIST */}
          {savedTierItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-blue-600 dark:text-blue-400">
                  Saved Prosperity Classifications ({savedTierItems.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedTierItems([]);
                    localStorage.removeItem("saved_gdp_tier");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedTierItems.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between border-b pb-1 text-[11px]">
                      <span className="font-bold text-blue-600">{item.title}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{item.timestamp}</span>
                    </div>
                    <div className="space-y-0.5 font-mono text-[10px]">
                      {item.resultsList?.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">{line}</div>
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
