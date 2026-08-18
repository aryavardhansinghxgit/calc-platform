"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  Download,
  DollarSign,
  TrendingUp,
  Clock,
  Briefcase,
  PiggyBank,
  ShoppingBag,
  Percent,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
} from "lucide-react";
import {
  US_CPI_DATA,
  MONTH_NAMES,
  getCpiForPeriod,
} from "@/app/calculators/inflation-calculator/cpi-data";
import {
  calculateHistoricalInflation,
  calculateForwardInflation,
  calculateBackwardInflation,
  calculateRealWage,
  calculateRealInvestmentReturn,
} from "@/app/calculators/inflation-calculator/calculator";
import { SavedInflationItem } from "@/app/calculators/inflation-calculator/types";

export function InflationCalculator() {
  const input3DClass =
    "w-full h-9 px-3 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none transition-all text-sm";
  const select3DClass =
    "w-full h-9 px-3 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none cursor-pointer text-sm";
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

  const yearsList = useMemo(() => {
    const arr: number[] = [];
    for (let y = 2026; y >= 1913; y--) {
      arr.push(y);
    }
    return arr;
  }, []);

  // =========================================================================
  // BOX 1: HISTORICAL CPI PURCHASING POWER (CORE)
  // =========================================================================
  const [b1Amount, setB1Amount] = useState<string>("100");
  const [b1StartYear, setB1StartYear] = useState<number>(2016);
  const [b1StartMonth, setB1StartMonth] = useState<number>(0); // 0 = Average
  const [b1TargetYear, setB1TargetYear] = useState<number>(2026);
  const [b1TargetMonth, setB1TargetMonth] = useState<number>(7); // July

  const [savedBox1, setSavedBox1] = useState<SavedInflationItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);

  // =========================================================================
  // BOX 2: FORWARD FUTURE INFLATION & PURCHASING POWER DECAY
  // =========================================================================
  const [b2Amount, setB2Amount] = useState<string>("100");
  const [b2Rate, setB2Rate] = useState<string>("3.0");
  const [b2Years, setB2Years] = useState<string>("10");

  const [savedBox2, setSavedBox2] = useState<SavedInflationItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);

  // =========================================================================
  // BOX 3: BACKWARD HISTORICAL FLAT-RATE
  // =========================================================================
  const [b3Amount, setB3Amount] = useState<string>("100");
  const [b3Rate, setB3Rate] = useState<string>("3.0");
  const [b3Years, setB3Years] = useState<string>("10");

  const [savedBox3, setSavedBox3] = useState<SavedInflationItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);

  // =========================================================================
  // BOX 4: REAL WAGE & SALARY GROWTH ADJUSTER
  // =========================================================================
  const [b4PastSalary, setB4PastSalary] = useState<string>("50000");
  const [b4PastYear, setB4PastYear] = useState<number>(2015);
  const [b4CurSalary, setB4CurSalary] = useState<string>("75000");
  const [b4CurYear, setB4CurYear] = useState<number>(2026);

  const [savedBox4, setSavedBox4] = useState<SavedInflationItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);

  // =========================================================================
  // BOX 5: REAL INVESTMENT RETURN (FISHER EQUATION)
  // =========================================================================
  const [b5Principal, setB5Principal] = useState<string>("100000");
  const [b5NominalReturn, setB5NominalReturn] = useState<string>("10.0");
  const [b5InflationRate, setB5InflationRate] = useState<string>("3.5");
  const [b5TaxRate, setB5TaxRate] = useState<string>("15.0");
  const [b5Years, setB5Years] = useState<string>("20");

  const [savedBox5, setSavedBox5] = useState<SavedInflationItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);

  // =========================================================================
  // BOX 6: PERSONAL LIFESTYLE BASKET INFLATION
  // =========================================================================
  const [b6HousingWeight, setB6HousingWeight] = useState<string>("35");
  const [b6FoodWeight, setB6FoodWeight] = useState<string>("20");
  const [b6EnergyWeight, setB6EnergyWeight] = useState<string>("10");
  const [b6TransportWeight, setB6TransportWeight] = useState<string>("15");
  const [b6HealthWeight, setB6HealthWeight] = useState<string>("10");
  const [b6EduWeight, setB6EduWeight] = useState<string>("10");

  const [savedBox6, setSavedBox6] = useState<SavedInflationItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_inf_box1");
      if (s1) setSavedBox1(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_inf_box2");
      if (s2) setSavedBox2(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_inf_box3");
      if (s3) setSavedBox3(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_inf_box4");
      if (s4) setSavedBox4(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_inf_box5");
      if (s5) setSavedBox5(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_inf_box6");
      if (s6) setSavedBox6(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Box 1 Calculations
  const b1Calc = useMemo(() => {
    return calculateHistoricalInflation({
      amount: parseFloat(b1Amount) || 0,
      startYear: b1StartYear,
      startMonth: b1StartMonth,
      targetYear: b1TargetYear,
      targetMonth: b1TargetMonth,
    });
  }, [b1Amount, b1StartYear, b1StartMonth, b1TargetYear, b1TargetMonth]);

  const handleExportBox1CSV = () => {
    const headers = ["Year", "Annual Average CPI-U Index"];
    const rows = Object.keys(US_CPI_DATA)
      .sort((a, b) => Number(b) - Number(a))
      .map((y) => [y, US_CPI_DATA[Number(y)].toString()]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload("us_cpi_historical_dataset_1913_2026.csv", csv);
  };

  const handleSaveBox1 = () => {
    const startStr = `${MONTH_NAMES[b1StartMonth]} ${b1StartYear}`;
    const targetStr = `${MONTH_NAMES[b1TargetMonth]} ${b1TargetYear}`;
    const inputsStr = `$${b1Amount} from ${startStr} to ${targetStr}`;
    const primaryStr = `$${b1Calc.equivalentAmount.toLocaleString()} in ${targetStr} equals $${b1Amount} of buying power in ${startStr} (+${b1Calc.cumulativeInflationPercent}% inflation)`;

    const detailsList = [
      `Equivalent Purchasing Power: $${b1Calc.equivalentAmount.toLocaleString()} in ${targetStr}`,
      `Total Cumulative Inflation: +${b1Calc.cumulativeInflationPercent}%`,
      `Average Annualized Inflation Rate: ${b1Calc.annualizedInflationPercent}% / year`,
      `Start CPI (${startStr}): ${b1Calc.startCpi} | Target CPI (${targetStr}): ${b1Calc.targetCpi}`,
      `Purchasing Power Loss of Nominal Dollar: -${b1Calc.purchasingPowerLossPercent}%`,
    ];

    const newItem: SavedInflationItem = {
      id: Date.now().toString(),
      title: "Historical CPI Inflation",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox1.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_inf_box1", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleDeleteSavedBox1 = (id: string) => {
    const updated = savedBox1.filter((item) => item.id !== id);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_inf_box1", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox1 = () => {
    setSavedBox1([]);
    try {
      localStorage.removeItem("saved_inf_box1");
    } catch (e) {}
  };

  // Box 2 Calculations (Forward Future Inflation)
  const b2Calc = useMemo(() => {
    return calculateForwardInflation({
      currentAmount: parseFloat(b2Amount) || 0,
      expectedAnnualRatePercent: parseFloat(b2Rate) || 0,
      years: parseFloat(b2Years) || 0,
    });
  }, [b2Amount, b2Rate, b2Years]);

  const handleSaveBox2 = () => {
    const inputsStr = `$${b2Amount} @ ${b2Rate}%/yr for ${b2Years} years`;
    const primaryStr = `Future Cost: $${b2Calc.futureCost.toLocaleString()} | Cash Purchasing Power: $${b2Calc.realPurchasingPower.toLocaleString()}`;

    const detailsList = [
      `Future Cost of Same Goods: $${b2Calc.futureCost.toLocaleString()} (+${b2Calc.totalInflationPercent}%)`,
      `Real Purchasing Power of $${b2Amount} Cash: $${b2Calc.realPurchasingPower.toLocaleString()}`,
      `Total Inflation Increase: +$${b2Calc.totalInflationIncrease.toLocaleString()}`,
    ];

    const newItem: SavedInflationItem = {
      id: Date.now().toString(),
      title: "Forward Future Inflation Solver",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox2.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_inf_box2", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  const handleDeleteSavedBox2 = (id: string) => {
    const updated = savedBox2.filter((item) => item.id !== id);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_inf_box2", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox2 = () => {
    setSavedBox2([]);
    try {
      localStorage.removeItem("saved_inf_box2");
    } catch (e) {}
  };

  // Box 3 Calculations (Backward Flat-Rate)
  const b3Calc = useMemo(() => {
    return calculateBackwardInflation({
      currentAmount: parseFloat(b3Amount) || 0,
      averageAnnualRatePercent: parseFloat(b3Rate) || 0,
      yearsInPast: parseFloat(b3Years) || 0,
    });
  }, [b3Amount, b3Rate, b3Years]);

  const handleSaveBox3 = () => {
    const inputsStr = `$${b3Amount} @ ${b3Rate}%/yr, ${b3Years} years ago`;
    const primaryStr = `Past Equivalent Value: $${b3Calc.pastEquivalentValue.toLocaleString()}`;

    const detailsList = [
      `Past Equivalent Value: $${b3Calc.pastEquivalentValue.toLocaleString()}`,
      `Total Price Increase Since Then: +${b3Calc.totalInflationPercent.toFixed(1)}%`,
    ];

    const newItem: SavedInflationItem = {
      id: Date.now().toString(),
      title: "Backward Flat-Rate Solver",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox3.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_inf_box3", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  const handleDeleteSavedBox3 = (id: string) => {
    const updated = savedBox3.filter((item) => item.id !== id);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_inf_box3", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox3 = () => {
    setSavedBox3([]);
    try {
      localStorage.removeItem("saved_inf_box3");
    } catch (e) {}
  };

  // Box 4 Calculations (Real Wage Adjuster)
  const b4Calc = useMemo(() => {
    return calculateRealWage({
      pastSalary: parseFloat(b4PastSalary) || 0,
      pastYear: b4PastYear,
      currentSalary: parseFloat(b4CurSalary) || 0,
      currentYear: b4CurYear,
    });
  }, [b4PastSalary, b4PastYear, b4CurSalary, b4CurYear]);

  const handleSaveBox4 = () => {
    const inputsStr = `$${parseFloat(b4PastSalary).toLocaleString()} (${b4PastYear}) vs $${parseFloat(b4CurSalary).toLocaleString()} (${b4CurYear})`;
    const primaryStr = b4Calc.isRealPayRaise
      ? `Real Pay Raise: +$${b4Calc.realWageChangeDollar.toLocaleString()} (+${b4Calc.realWageChangePercent}%) above inflation!`
      : `Real Pay Cut: -$${Math.abs(b4Calc.realWageChangeDollar).toLocaleString()} (${b4Calc.realWageChangePercent}%) purchasing power loss!`;

    const detailsList = [
      `Past Salary in Today's Dollars: $${b4Calc.pastSalaryAdjusted.toLocaleString()}`,
      `Nominal Raise: +$${b4Calc.nominalWageChangeDollar.toLocaleString()} (+${b4Calc.nominalWageChangePercent}%)`,
      `Real Wage Difference: ${b4Calc.realWageChangeDollar >= 0 ? "+" : ""}$${b4Calc.realWageChangeDollar.toLocaleString()} (${b4Calc.realWageChangePercent}%)`,
    ];

    const newItem: SavedInflationItem = {
      id: Date.now().toString(),
      title: "Real Wage & Salary Adjuster",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox4.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_inf_box4", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  const handleDeleteSavedBox4 = (id: string) => {
    const updated = savedBox4.filter((item) => item.id !== id);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_inf_box4", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox4 = () => {
    setSavedBox4([]);
    try {
      localStorage.removeItem("saved_inf_box4");
    } catch (e) {}
  };

  // Box 5 Calculations (Fisher Real Investment Return)
  const b5Calc = useMemo(() => {
    return calculateRealInvestmentReturn({
      principal: parseFloat(b5Principal) || 100000,
      nominalReturnPercent: parseFloat(b5NominalReturn) || 10.0,
      inflationRatePercent: parseFloat(b5InflationRate) || 3.5,
      taxRatePercent: parseFloat(b5TaxRate) || 15.0,
      years: parseFloat(b5Years) || 20,
    });
  }, [b5Principal, b5NominalReturn, b5InflationRate, b5TaxRate, b5Years]);

  const handleSaveBox5 = () => {
    const inputsStr = `$${parseFloat(b5Principal).toLocaleString()} @ ${b5NominalReturn}% return, ${b5InflationRate}% inflation (${b5Years} yrs)`;
    const primaryStr = `Real Future Wealth: $${b5Calc.realFutureValue.toLocaleString()} (Real Return: ${b5Calc.realAnnualReturnPercent}%/yr)`;

    const detailsList = [
      `Nominal Future Balance: $${b5Calc.nominalFutureValue.toLocaleString()}`,
      `Inflation Drag: -$${b5Calc.inflationDragDollar.toLocaleString()}`,
      `Tax Drag: -$${b5Calc.taxDragDollar.toLocaleString()}`,
      `True Purchasing Power Generated: $${b5Calc.realFutureValue.toLocaleString()} (${b5Calc.realAnnualReturnPercent}% real annualized rate)`,
    ];

    const newItem: SavedInflationItem = {
      id: Date.now().toString(),
      title: "Real Rate of Return (Fisher Equation)",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox5.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_inf_box5", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  const handleDeleteSavedBox5 = (id: string) => {
    const updated = savedBox5.filter((item) => item.id !== id);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_inf_box5", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox5 = () => {
    setSavedBox5([]);
    try {
      localStorage.removeItem("saved_inf_box5");
    } catch (e) {}
  };

  // Box 6 Calculations (Personal Basket Inflation)
  const b6PersonalRate = useMemo(() => {
    const hw = parseFloat(b6HousingWeight) || 0;
    const fw = parseFloat(b6FoodWeight) || 0;
    const ew = parseFloat(b6EnergyWeight) || 0;
    const tw = parseFloat(b6TransportWeight) || 0;
    const healw = parseFloat(b6HealthWeight) || 0;
    const edw = parseFloat(b6EduWeight) || 0;
    const totalW = hw + fw + ew + tw + healw + edw || 100;

    // Typical category inflation benchmarks
    const catRates = {
      housing: 4.8,
      food: 3.2,
      energy: 2.5,
      transport: 3.0,
      health: 4.2,
      edu: 4.5,
    };

    const weighted =
      (hw * catRates.housing +
        fw * catRates.food +
        ew * catRates.energy +
        tw * catRates.transport +
        healw * catRates.health +
        edw * catRates.edu) /
      totalW;

    return Math.round(weighted * 10) / 10;
  }, [b6HousingWeight, b6FoodWeight, b6EnergyWeight, b6TransportWeight, b6HealthWeight, b6EduWeight]);

  const handleSaveBox6 = () => {
    const inputsStr = `Custom Budget Basket Weights (Housing ${b6HousingWeight}%, Food ${b6FoodWeight}%, Energy ${b6EnergyWeight}%)`;
    const primaryStr = `Personalized Inflation Rate: ${b6PersonalRate}% / year (vs Headline CPI: ~3.0%)`;

    const detailsList = [
      `Personalized Lifestyle Inflation: ${b6PersonalRate}% / year`,
      `Official Headline CPI Benchmark: ~3.0% / year`,
      `Difference vs Official CPI: ${(b6PersonalRate - 3.0 >= 0 ? "+" : "") + (b6PersonalRate - 3.0).toFixed(1)}%`,
    ];

    const newItem: SavedInflationItem = {
      id: Date.now().toString(),
      title: "Personal Lifestyle Inflation Estimator",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox6.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_inf_box6", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  const handleDeleteSavedBox6 = (id: string) => {
    const updated = savedBox6.filter((item) => item.id !== id);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_inf_box6", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox6 = () => {
    setSavedBox6([]);
    try {
      localStorage.removeItem("saved_inf_box6");
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* =========================================================================
          BOX 1: HISTORICAL CPI PURCHASING POWER (CORE)
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Historical CPI Purchasing Power Calculator (US BLS CPI-U 1913–2026)</span>
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
                Starting &amp; Target Comparison Periods
              </span>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Dollar Amount ($)
                </label>
                <input
                  type="number"
                  step={10}
                  value={b1Amount}
                  onChange={(e) => setB1Amount(e.target.value)}
                  className={input3DClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Start Month
                  </label>
                  <select
                    value={b1StartMonth}
                    onChange={(e) => setB1StartMonth(Number(e.target.value))}
                    className={select3DClass}
                  >
                    {MONTH_NAMES.map((m, idx) => (
                      <option key={m} value={idx}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Start Year
                  </label>
                  <select
                    value={b1StartYear}
                    onChange={(e) => setB1StartYear(Number(e.target.value))}
                    className={select3DClass}
                  >
                    {yearsList.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Target Month
                  </label>
                  <select
                    value={b1TargetMonth}
                    onChange={(e) => setB1TargetMonth(Number(e.target.value))}
                    className={select3DClass}
                  >
                    {MONTH_NAMES.map((m, idx) => (
                      <option key={m} value={idx}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Target Year
                  </label>
                  <select
                    value={b1TargetYear}
                    onChange={(e) => setB1TargetYear(Number(e.target.value))}
                    className={select3DClass}
                  >
                    {yearsList.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* RIGHT HERO & BREAKDOWN */}
            <div className="lg:col-span-6 space-y-3">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
                <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Equivalent Purchasing Power
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-sans tabular-nums flex items-baseline gap-2">
                    <span>${b1Calc.equivalentAmount.toLocaleString()}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium font-sans">
                    ${b1Amount} in {MONTH_NAMES[b1StartMonth]} {b1StartYear} has the same buying power as ${b1Calc.equivalentAmount.toLocaleString()} in {MONTH_NAMES[b1TargetMonth]} {b1TargetYear}.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans tabular-nums">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Cumulative Inflation</span>
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold text-sm">
                      +{b1Calc.cumulativeInflationPercent}%
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Annualized Inflation Rate</span>
                    <span className="text-amber-600 font-extrabold text-sm">
                      {b1Calc.annualizedInflationPercent}% / yr
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-sans tabular-nums flex justify-between">
                  <span>CPI Index: {b1Calc.startCpi} &rarr; {b1Calc.targetCpi}</span>
                  <span className="text-slate-500 font-medium">Purchasing Power Loss: -{b1Calc.purchasingPowerLossPercent}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* HISTORICAL CPI TABLE */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                US Historical CPI-U Index Reference Series (1913–2026)
              </span>
              <button
                type="button"
                onClick={handleExportBox1CSV}
                className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-[11px] font-bold flex items-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer border border-slate-300 dark:border-slate-700 transition-colors"
              >
                <Download className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span>Export Dataset (CSV)</span>
              </button>
            </div>

            <div className="overflow-x-auto text-xs max-h-56 overflow-y-auto">
              <table className="w-full text-center border-collapse font-sans tabular-nums">
                <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700 backdrop-blur-xs">
                  <tr>
                    <th className="p-2 text-left">Year</th>
                    <th className="p-2 text-right">Annual Average CPI-U</th>
                    <th className="p-2 text-right">Relative Purchasing Power of $1.00</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {Object.keys(US_CPI_DATA)
                    .sort((a, b) => Number(b) - Number(a))
                    .map((y) => {
                      const cpi = US_CPI_DATA[Number(y)];
                      const pwr = (333.918 / cpi).toFixed(2);
                      return (
                        <tr key={y} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="p-1.5 text-left font-bold text-slate-800 dark:text-slate-200">{y}</td>
                          <td className="p-1.5 text-right font-medium text-slate-700 dark:text-slate-300">{cpi}</td>
                          <td className="p-1.5 text-right font-extrabold text-blue-600 dark:text-blue-400">
                            $1.00 in {y} = ${pwr} today
                          </td>
                        </tr>
                      );
                    })}
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
                  <span>Saved Historical Calculations ({savedBox1.length})</span>
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
          BOX 2: FORWARD FUTURE INFLATION SOLVER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Forward Future Inflation &amp; Purchasing Power Decay Solver</span>
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
                Future Projection Assumptions
              </span>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Current Amount ($)</label>
                  <input
                    type="number"
                    step={10}
                    value={b2Amount}
                    onChange={(e) => setB2Amount(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Inflation (% / yr)</label>
                  <input
                    type="number"
                    step={0.1}
                    value={b2Rate}
                    onChange={(e) => setB2Rate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Years Ahead</label>
                  <input
                    type="number"
                    step={1}
                    value={b2Years}
                    onChange={(e) => setB2Years(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Future Cost of Same Basket</span>
                  <span className="text-slate-900 dark:text-slate-100 font-extrabold text-lg">
                    ${b2Calc.futureCost.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-normal">(+{b2Calc.totalInflationPercent.toFixed(1)}% total cost)</span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Cash Purchasing Power</span>
                  <span className="text-amber-600 font-extrabold text-lg">
                    ${b2Calc.realPurchasingPower.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-normal">(Value of un-invested cash)</span>
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
                  <span>Saved Future Projections ({savedBox2.length})</span>
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
          BOX 3: BACKWARD HISTORICAL FLAT-RATE
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Backward Historical Flat-Rate Purchasing Power Solver</span>
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
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Past Horizon Assumptions
              </span>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Current Amount ($)</label>
                  <input
                    type="number"
                    step={10}
                    value={b3Amount}
                    onChange={(e) => setB3Amount(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Avg Inflation (%)</label>
                  <input
                    type="number"
                    step={0.1}
                    value={b3Rate}
                    onChange={(e) => setB3Rate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Years Ago</label>
                  <input
                    type="number"
                    step={1}
                    value={b3Years}
                    onChange={(e) => setB3Years(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                  Past Equivalent Value
                </span>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                  ${b3Calc.pastEquivalentValue.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 font-medium block font-sans">
                  ${b3Amount} today had the buying power of ${b3Calc.pastEquivalentValue.toLocaleString()} {b3Years} years ago.
                </span>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 3 */}
          {savedBox3.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Backward Calculations ({savedBox3.length})</span>
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
          BOX 4: REAL WAGE & SALARY GROWTH ADJUSTER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Real Wage &amp; Salary Growth Adjuster (Beating Inflation)</span>
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
                Salary Comparison
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Past Salary ($/yr)</label>
                  <input
                    type="number"
                    step={1000}
                    value={b4PastSalary}
                    onChange={(e) => setB4PastSalary(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Past Year</label>
                  <select
                    value={b4PastYear}
                    onChange={(e) => setB4PastYear(Number(e.target.value))}
                    className={select3DClass}
                  >
                    {yearsList.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Current Salary ($/yr)</label>
                  <input
                    type="number"
                    step={1000}
                    value={b4CurSalary}
                    onChange={(e) => setB4CurSalary(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Current Year</label>
                  <select
                    value={b4CurYear}
                    onChange={(e) => setB4CurYear(Number(e.target.value))}
                    className={select3DClass}
                  >
                    {yearsList.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Real Purchasing Power Change
                  </span>
                  <span
                    className={`text-2xl font-extrabold font-sans tabular-nums ${
                      b4Calc.isRealPayRaise ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {b4Calc.realWageChangeDollar >= 0 ? "+" : ""}${b4Calc.realWageChangeDollar.toLocaleString()} <span className="text-xs font-medium text-slate-400">/ yr</span>
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Real % Shift</span>
                  <span
                    className={`px-2 py-0.5 rounded-lg text-xs font-extrabold inline-block font-sans tabular-nums ${
                      b4Calc.isRealPayRaise
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-red-100 text-red-800 border border-red-300"
                    }`}
                  >
                    {b4Calc.realWageChangePercent >= 0 ? "+" : ""}{b4Calc.realWageChangePercent}%
                  </span>
                </div>
              </div>

              <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-sans tabular-nums flex justify-between">
                <span>Past Salary in Today&apos;s Dollars:</span>
                <span className="font-extrabold text-slate-900 dark:text-slate-100">${b4Calc.pastSalaryAdjusted.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 4 */}
          {savedBox4.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Real Wage Analyses ({savedBox4.length})</span>
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
          BOX 5: REAL RATE OF RETURN (FISHER EQUATION)
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Real Rate of Return &amp; Investment Inflation Drag (Fisher Equation)</span>
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
                Investment Parameters
              </span>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Principal ($)</label>
                  <input
                    type="number"
                    step={10000}
                    value={b5Principal}
                    onChange={(e) => setB5Principal(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Nominal Return (%)</label>
                  <input
                    type="number"
                    step={0.5}
                    value={b5NominalReturn}
                    onChange={(e) => setB5NominalReturn(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Inflation Rate (%)</label>
                  <input
                    type="number"
                    step={0.1}
                    value={b5InflationRate}
                    onChange={(e) => setB5InflationRate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Real Purchasing Power Wealth
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums">
                    ${b5Calc.realFutureValue.toLocaleString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Real Annual Return</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 inline-block font-sans tabular-nums">
                    {b5Calc.realAnnualReturnPercent}% / yr
                  </span>
                </div>
              </div>

              <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-sans tabular-nums flex justify-between">
                <span>Nominal Balance (Pre-Inflation):</span>
                <span className="font-extrabold text-slate-900 dark:text-slate-100">${b5Calc.nominalFutureValue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 5 */}
          {savedBox5.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Real Return Calculations ({savedBox5.length})</span>
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
          BOX 6: PERSONAL LIFESTYLE BASKET INFLATION
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Personal Lifestyle Basket Inflation Estimator</span>
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
            <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Your Monthly Budget Weights (%)
              </span>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Housing (%)</label>
                  <input
                    type="number"
                    value={b6HousingWeight}
                    onChange={(e) => setB6HousingWeight(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Food &amp; Dining (%)</label>
                  <input
                    type="number"
                    value={b6FoodWeight}
                    onChange={(e) => setB6FoodWeight(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Energy/Gas (%)</label>
                  <input
                    type="number"
                    value={b6EnergyWeight}
                    onChange={(e) => setB6EnergyWeight(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Transport (%)</label>
                  <input
                    type="number"
                    value={b6TransportWeight}
                    onChange={(e) => setB6TransportWeight(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Healthcare (%)</label>
                  <input
                    type="number"
                    value={b6HealthWeight}
                    onChange={(e) => setB6HealthWeight(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Education (%)</label>
                  <input
                    type="number"
                    value={b6EduWeight}
                    onChange={(e) => setB6EduWeight(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                  Your Personal Inflation Rate
                </span>
                <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                  {b6PersonalRate}% <span className="text-xs font-medium text-slate-400">/ year</span>
                </span>
                <span className="text-xs text-slate-500 font-medium block font-sans">
                  Official CPI benchmark is ~3.0% / year.
                </span>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 6 */}
          {savedBox6.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Personal Baskets ({savedBox6.length})</span>
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

export default InflationCalculator;
