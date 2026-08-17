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
  Download,
  Info,
  DollarSign,
  User,
  Users,
  Shield,
  Zap,
  Building,
  Plus,
  Minus,
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

  // Calculations for Box 1
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

  // Preset loaders for Box 1
  const applyPresetProfile = (type: "grad" | "couple" | "hcol" | "fire") => {
    if (type === "grad") {
      setIncomeFreq("annual");
      setGrossIncome("55000");
      setMonthlyDebt("350");
      setRulePreset("30");
    } else if (type === "couple") {
      setIncomeFreq("annual");
      setGrossIncome("130000");
      setMonthlyDebt("800");
      setRulePreset("30");
    } else if (type === "hcol") {
      setIncomeFreq("annual");
      setGrossIncome("95000");
      setMonthlyDebt("400");
      setRulePreset("35");
    } else if (type === "fire") {
      setIncomeFreq("annual");
      setGrossIncome("85000");
      setMonthlyDebt("200");
      setRulePreset("25");
    }
  };

  const handleSaveBox1 = () => {
    const newItem: SavedRentItem = {
      id: Date.now().toString(),
      title: "Income Affordability",
      inputsSummary: `${incomeFreq.toUpperCase()} ${currencySymbol}${parseFloat(grossIncome).toLocaleString()} | Debt: ${currencySymbol}${parseFloat(monthlyDebt).toLocaleString()}`,
      primaryResult: `Max Rent: ${currencySymbol}${affCalc.maxMonthlyRent.toLocaleString()}/mo`,
      detailsList: [
        `Target Range: ${currencySymbol}${affCalc.recommendedLow.toLocaleString()} - ${currencySymbol}${affCalc.recommendedHigh.toLocaleString()}`,
        `Front-End Ratio: ${affCalc.frontEndRatio}%`,
        `Back-End Ratio: ${affCalc.backEndRatio}%`,
        `Discretionary: ${currencySymbol}${affCalc.remainingDiscretionary.toLocaleString()}/mo`,
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
      title: "50/30/20 Budget",
      inputsSummary: `Net Take-Home: ${currencySymbol}${parseFloat(takeHomePay).toLocaleString()}/mo`,
      primaryResult: `Needs: ${currencySymbol}${budgetCalc.needsAmount.toLocaleString()} | Max Rent: ${currencySymbol}${budgetCalc.maxRentFromNeeds.toLocaleString()}`,
      detailsList: [
        `Wants (30%): ${currencySymbol}${budgetCalc.wantsAmount.toLocaleString()}/mo`,
        `Savings (20%): ${currencySymbol}${budgetCalc.savingsAmount.toLocaleString()}/mo`,
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

  const applyUtilityPreset = (level: "low" | "avg" | "high") => {
    if (level === "low") {
      setElectricGas("80");
      setWaterSewer("30");
      setInternet("50");
      setInsurance("15");
      setParking("0");
      setPetRent("0");
      setAmenityFee("0");
    } else if (level === "avg") {
      setElectricGas("120");
      setWaterSewer("45");
      setInternet("65");
      setInsurance("20");
      setParking("50");
      setPetRent("25");
      setAmenityFee("20");
    } else if (level === "high") {
      setElectricGas("190");
      setWaterSewer("75");
      setInternet("90");
      setInsurance("30");
      setParking("150");
      setPetRent("50");
      setAmenityFee("60");
    }
  };

  const handleSaveBox3 = () => {
    const newItem: SavedRentItem = {
      id: Date.now().toString(),
      title: "True All-In Rent & Utilities",
      inputsSummary: `Base Rent: ${currencySymbol}${parseFloat(baseRent).toLocaleString()}`,
      primaryResult: `Total All-In: ${currencySymbol}${trueCostCalc.totalMonthlyOverhead.toLocaleString()}/mo`,
      detailsList: [
        `Utilities & Fees Overhead: ${currencySymbol}${trueCostCalc.additionalOverhead.toLocaleString()}/mo (+${trueCostCalc.percentOverhead}%)`,
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
      inputsSummary: `Rent: ${currencySymbol}${parseFloat(upfrontBaseRent).toLocaleString()} | Deposit: ${depositMonths} mo`,
      primaryResult: `Liquid Cash Required: ${currencySymbol}${upfrontCalc.totalUpfrontCash.toLocaleString()}`,
      detailsList: [
        `Lease Prepayments: ${currencySymbol}${upfrontCalc.leasePrepayments.toLocaleString()}`,
        `One-Time Setup & Moving Fees: ${currencySymbol}${upfrontCalc.oneTimeMoveInFees.toLocaleString()}`,
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
      primaryResult: `Split: ${roommateCalc.roommates.map((r) => `${r.name}: ${currencySymbol}${r.calculatedRent}`).join(", ")}`,
      detailsList: roommateCalc.roommates.map(
        (r) => `${r.name}: ${currencySymbol}${r.calculatedRent}/mo (${r.sharePercent}%) [Delta: ${r.deltaFromEqual >= 0 ? "+" : ""}${currencySymbol}${r.deltaFromEqual}]`
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
      title: "Rent vs. Buy Comparator",
      inputsSummary: `${rvbYears}-Year Horizon | Rent: ${currencySymbol}${rvbRent}/mo | Home: ${currencySymbol}${parseFloat(rvbHomePrice).toLocaleString()}`,
      primaryResult: rentVsBuyCalc.netBenefitToBuying >= 0
        ? `Buying is ahead by ${currencySymbol}${rentVsBuyCalc.netBenefitToBuying.toLocaleString()}`
        : `Renting is ahead by ${currencySymbol}${Math.abs(rentVsBuyCalc.netBenefitToBuying).toLocaleString()}`,
      detailsList: [
        `Renter Net Worth: ${currencySymbol}${rentVsBuyCalc.renterNetWorth.toLocaleString()}`,
        `Homebuyer Net Worth: ${currencySymbol}${rentVsBuyCalc.buyerNetWorth.toLocaleString()}`,
        `Total Rent Paid: ${currencySymbol}${rentVsBuyCalc.totalRentPaid.toLocaleString()}`,
        `Total Home Equity Built: ${currencySymbol}${rentVsBuyCalc.totalHomeEquity.toLocaleString()}`,
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

  // Load saved calculations on initial render
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

  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (e) {}
  };

  // SVG Speedometer / Risk Gauge for Box 1
  const svgRiskGauge = useMemo(() => {
    const ratio = Math.min(60, Math.max(10, affCalc.frontEndRatio));
    // map 10% -> 50% to angle 0 -> 180 deg
    const pctNorm = (ratio - 10) / 50;
    const angleRad = Math.PI - pctNorm * Math.PI;
    const radius = 65;
    const cx = 90;
    const cy = 75;
    const needleX = cx + radius * 0.8 * Math.cos(angleRad);
    const needleY = cy - radius * 0.8 * Math.sin(angleRad);

    return (
      <svg viewBox="0 0 180 95" className="w-full max-w-[200px] mx-auto h-auto">
        <path d="M 20 75 A 70 70 0 0 1 65 15" fill="none" stroke="#10b981" strokeWidth="14" strokeLinecap="round" />
        <path d="M 68 14 A 70 70 0 0 1 112 14" fill="none" stroke="#eab308" strokeWidth="14" />
        <path d="M 115 15 A 70 70 0 0 1 160 75" fill="none" stroke="#ef4444" strokeWidth="14" strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={needleX} y2={needleY} stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="6" fill="#1e293b" />
        <text x={cx} y={cy - 18} textAnchor="middle" className="text-[12px] font-extrabold fill-slate-800 dark:fill-slate-100 font-sans tabular-nums">
          {affCalc.frontEndRatio}%
        </text>
      </svg>
    );
  }, [affCalc.frontEndRatio]);

  // SVG 50/30/20 Donut Chart for Box 2
  const svgBudgetDonut = useMemo(() => {
    const n = budgetCalc.needsAmount || 1;
    const w = budgetCalc.wantsAmount || 1;
    const s = budgetCalc.savingsAmount || 1;
    const total = n + w + s;
    const pN = n / total;
    const pW = w / total;

    const r = 50;
    const cx = 70;
    const cy = 70;
    const circ = 2 * Math.PI * r;

    const dashN = pN * circ;
    const dashW = pW * circ;

    return (
      <svg viewBox="0 0 140 140" className="w-full max-w-[150px] mx-auto h-auto">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="20" />
        {/* Needs (Blue) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#2563eb"
          strokeWidth="20"
          strokeDasharray={`${dashN} ${circ - dashN}`}
          strokeDashoffset={circ / 4}
        />
        {/* Wants (Amber) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="20"
          strokeDasharray={`${dashW} ${circ - dashW}`}
          strokeDashoffset={circ / 4 - dashN}
        />
        {/* Savings (Green) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#10b981"
          strokeWidth="20"
          strokeDasharray={`${circ - dashN - dashW} ${dashN + dashW}`}
          strokeDashoffset={circ / 4 - dashN - dashW}
        />
        <text x={cx} y={cy + 4} textAnchor="middle" className="text-[11px] font-extrabold fill-slate-800 dark:fill-slate-100 font-sans tabular-nums">
          50/30/20
        </text>
      </svg>
    );
  }, [budgetCalc]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Global Toolbar Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Currency:</span>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-bold font-sans tabular-nums">
            {["$", "€", "£", "₹", "¥"].map((s) => (
              <button
                key={s}
                onClick={() => setCurrencySymbol(s)}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  currencySymbol === s ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedLink ? "Link Copied!" : "Share Link"}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 1: INCOME-BASED RENT AFFORDABILITY CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded text-[11px]">Box 1</span>
            <span className="font-extrabold text-sm">Income-Based Rent Affordability Calculator</span>
          </div>
          <button
            type="button"
            onClick={handleSaveBox1}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox1 ? "Saved!" : "Save Calculation"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Presets Bar */}
          <div className="flex flex-wrap items-center gap-2 p-3 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/40 text-xs">
            <span className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Quick Profile Presets:
            </span>
            <button onClick={() => applyPresetProfile("grad")} className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 rounded-lg font-medium text-slate-700 dark:text-slate-200 hover:border-blue-500 cursor-pointer">
              College Grad ($55k, $350 Debt)
            </button>
            <button onClick={() => applyPresetProfile("couple")} className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 rounded-lg font-medium text-slate-700 dark:text-slate-200 hover:border-blue-500 cursor-pointer">
              Dual-Income ($130k, $800 Debt)
            </button>
            <button onClick={() => applyPresetProfile("hcol")} className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 rounded-lg font-medium text-slate-700 dark:text-slate-200 hover:border-blue-500 cursor-pointer">
              High-COL City (35% Rule)
            </button>
            <button onClick={() => applyPresetProfile("fire")} className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 rounded-lg font-medium text-slate-700 dark:text-slate-200 hover:border-blue-500 cursor-pointer">
              FIRE Saver (25% Rule)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Input Card (Left Col 6) */}
            <div className="lg:col-span-6 space-y-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Income & Financial Inputs
              </h3>

              {/* Frequency Toggle */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Income Pay Frequency
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
                      {f === "annual" ? "Annual ($/yr)" : f === "monthly" ? "Monthly ($/mo)" : "Hourly ($/hr)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Income Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {incomeFreq === "annual" ? "Gross Annual Salary" : incomeFreq === "monthly" ? "Monthly Gross Income" : "Hourly Wage"} ({currencySymbol})
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
                      Hours Worked / Week
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
                      Monthly Debt Obligations ({currencySymbol})
                    </label>
                    <input
                      type="number"
                      value={monthlyDebt}
                      onChange={(e) => setMonthlyDebt(e.target.value)}
                      placeholder="Student loans, car, credit cards"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                )}
              </div>

              {incomeFreq === "hourly" && (
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Monthly Debt Obligations ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={monthlyDebt}
                    onChange={(e) => setMonthlyDebt(e.target.value)}
                    placeholder="Student loans, car, credit cards"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                  />
                </div>
              )}

              {/* Benchmark Preset Selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Affordability Benchmark Rule
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-200 dark:bg-slate-800 p-1.5 rounded-xl text-xs font-bold">
                  {[
                    { id: "25", label: "25% Conservative" },
                    { id: "30", label: "30% Standard" },
                    { id: "35", label: "35% Aggressive" },
                    { id: "40x", label: "40x Landlord" },
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

            {/* Output Card & Chart (Right Col 6) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                    Maximum Rent Recommendation
                  </span>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold text-white"
                    style={{ backgroundColor: affCalc.statusColor }}
                  >
                    {affCalc.dtiStatus}
                  </span>
                </div>

                <div className="text-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900/50 shadow-xs">
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    Recommended Monthly Rent Cap
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                    {currencySymbol}{affCalc.maxMonthlyRent.toLocaleString()}
                    <span className="text-sm text-slate-500 font-normal"> / mo</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
                    Suggested Price Range: <strong className="text-slate-800 dark:text-slate-200">{currencySymbol}{affCalc.recommendedLow.toLocaleString()} – {currencySymbol}{affCalc.recommendedHigh.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Front-End DTI</span>
                    <span className="font-extrabold text-sm text-slate-800 dark:text-slate-200">{affCalc.frontEndRatio}%</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Back-End DTI</span>
                    <span className="font-extrabold text-sm text-slate-800 dark:text-slate-200">{affCalc.backEndRatio}%</span>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Leftover Cash</span>
                    <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">{currencySymbol}{affCalc.remainingDiscretionary.toLocaleString()}</span>
                  </div>
                </div>

                {/* Speedometer Risk Meter Gauge */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-500 text-center mb-1">
                    Housing Affordability Risk Gauge
                  </div>
                  {svgRiskGauge}
                </div>
              </div>
            </div>
          </div>

          {/* Mathematical Derivation Box */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs space-y-2 font-mono">
            <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans">Step-by-Step Mathematical Derivation:</span>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 text-slate-700 dark:text-slate-300">
              <div>{"1. Gross Monthly Income = Annual Salary / 12 = " + currencySymbol + grossIncome + " / 12 = " + currencySymbol + (parseFloat(grossIncome)/12 || 0).toFixed(2) + "/mo"}</div>
              <div>{"2. 30% Rent Limit = Monthly Gross × 0.30 = " + currencySymbol + (parseFloat(grossIncome)/12 || 0).toFixed(2) + " × 0.30 = " + currencySymbol + affCalc.maxMonthlyRent + "/mo"}</div>
              <div>{"3. 43% DTI Max Cap = (Monthly Gross × 0.43) - Monthly Debt = (" + currencySymbol + (parseFloat(grossIncome)/12 || 0).toFixed(2) + " × 0.43) - " + currencySymbol + monthlyDebt + " = " + currencySymbol + Math.max(0, Math.round((parseFloat(grossIncome)/12 || 0)*0.43 - parseFloat(monthlyDebt))).toLocaleString()}</div>
            </div>
          </div>

          {/* Saved History Drawer for Box 1 */}
          {savedBox1Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox1(!showHistoryBox1)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Box 1 Calculations ({savedBox1Items.length})</span>
                {showHistoryBox1 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox1 && (
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                  {savedBox1Items.map((item) => (
                    <div key={item.id} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">{item.primaryResult}</div>
                        <div className="text-[11px] text-slate-500">{item.inputsSummary} • {item.timestamp}</div>
                      </div>
                      <button
                        onClick={() => setSavedBox1Items(savedBox1Items.filter((i) => i.id !== item.id))}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 2: NET TAKE-HOME PAY & 50/30/20 BUDGET SUITE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded text-[11px]">Box 2</span>
            <span className="font-extrabold text-sm">Net Take-Home Pay & 50/30/20 Budgeting Suite</span>
          </div>
          <button
            type="button"
            onClick={handleSaveBox2}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox2 ? "Saved!" : "Save Calculation"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Col inputs */}
            <div className="lg:col-span-6 space-y-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Monthly Net Take-Home Input
              </h3>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Monthly After-Tax Take-Home Pay ({currencySymbol})
                </label>
                <input
                  type="number"
                  value={takeHomePay}
                  onChange={(e) => setTakeHomePay(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                />
              </div>

              {/* Sliders for Needs/Wants/Savings */}
              <div className="space-y-3 pt-1">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-blue-600 dark:text-blue-400">Essential Needs Cap ({needsPct}%)</span>
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
                    <span className="text-amber-600 dark:text-amber-400">Discretionary Wants ({wantsPct}%)</span>
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
                    <span className="text-emerald-600 dark:text-emerald-400">Savings & Debt Payoff ({savingsPct}%)</span>
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

            {/* Right Col Outputs & Donut Chart */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  50/30/20 Budget Breakdown
                </div>

                <div className="grid grid-cols-2 gap-3 text-center text-xs">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900/50">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Max Rent (Needs)</span>
                    <span className="font-extrabold text-lg text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                      {currencySymbol}{budgetCalc.maxRentFromNeeds.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900/50">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Groceries & Utilities</span>
                    <span className="font-extrabold text-lg text-slate-800 dark:text-slate-200 font-sans tabular-nums">
                      {currencySymbol}{budgetCalc.utilitiesGroceriesFromNeeds.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* SVG Donut Chart */}
                <div className="pt-2 flex flex-col items-center">
                  {svgBudgetDonut}
                  <div className="flex items-center gap-4 text-[11px] font-bold mt-2">
                    <span className="flex items-center gap-1 text-blue-600"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" /> Needs (50%)</span>
                    <span className="flex items-center gap-1 text-amber-600"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Wants (30%)</span>
                    <span className="flex items-center gap-1 text-emerald-600"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Savings (20%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Saved History Drawer for Box 2 */}
          {savedBox2Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox2(!showHistoryBox2)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Box 2 Calculations ({savedBox2Items.length})</span>
                {showHistoryBox2 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox2 && (
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                  {savedBox2Items.map((item) => (
                    <div key={item.id} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">{item.primaryResult}</div>
                        <div className="text-[11px] text-slate-500">{item.inputsSummary} • {item.timestamp}</div>
                      </div>
                      <button
                        onClick={() => setSavedBox2Items(savedBox2Items.filter((i) => i.id !== item.id))}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 3: TRUE COST OF RENTING & UTILITIES ESTIMATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded text-[11px]">Box 3</span>
            <span className="font-extrabold text-sm">True All-In Cost of Renting & Utilities Estimator</span>
          </div>
          <button
            type="button"
            onClick={handleSaveBox3}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox3 ? "Saved!" : "Save Calculation"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Utility Presets */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-600 dark:text-slate-300">City Utility Index Presets:</span>
            <button onClick={() => applyUtilityPreset("low")} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold hover:bg-blue-50 dark:hover:bg-blue-900/40 cursor-pointer">Low Index ($150)</button>
            <button onClick={() => applyUtilityPreset("avg")} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold hover:bg-blue-50 dark:hover:bg-blue-900/40 cursor-pointer">Average ($250)</button>
            <button onClick={() => applyUtilityPreset("high")} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold hover:bg-blue-50 dark:hover:bg-blue-900/40 cursor-pointer">High COL ($400)</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Input grid */}
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

            {/* Output Hero Box */}
            <div className="lg:col-span-5 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Total All-In Housing Overhead</span>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                {currencySymbol}{trueCostCalc.totalMonthlyOverhead.toLocaleString()}
                <span className="text-sm font-normal text-slate-500"> / month</span>
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

          {/* Saved History Drawer for Box 3 */}
          {savedBox3Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox3(!showHistoryBox3)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Box 3 Calculations ({savedBox3Items.length})</span>
                {showHistoryBox3 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox3 && (
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                  {savedBox3Items.map((item) => (
                    <div key={item.id} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">{item.primaryResult}</div>
                        <div className="text-[11px] text-slate-500">{item.inputsSummary} • {item.timestamp}</div>
                      </div>
                      <button
                        onClick={() => setSavedBox3Items(savedBox3Items.filter((i) => i.id !== item.id))}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 4: UPFRONT MOVE-IN CASH & LEASE CLOSING ESTIMATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded text-[11px]">Box 4</span>
            <span className="font-extrabold text-sm">Upfront Move-In Cash & Lease Closing Cost Estimator</span>
          </div>
          <button
            type="button"
            onClick={handleSaveBox4}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox4 ? "Saved!" : "Save Calculation"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Input grid */}
            <div className="lg:col-span-7 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Monthly Base Rent ({currencySymbol})</label>
                  <input type="number" value={upfrontBaseRent} onChange={(e) => setUpfrontBaseRent(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Security Deposit (# of Months)</label>
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
                  First Month Rent Prepayment
                </label>
                <label className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input type="checkbox" checked={incLastMonth} onChange={(e) => setIncLastMonth(e.target.checked)} className="rounded text-blue-600" />
                  Last Month Rent Prepayment
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Application Fees</label>
                  <input type="number" value={appFees} onChange={(e) => setAppFees(e.target.value)} className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Movers / Truck</label>
                  <input type="number" value={movingExp} onChange={(e) => setMovingExp(e.target.value)} className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Furniture Budget</label>
                  <input type="number" value={furnitureExp} onChange={(e) => setFurnitureExp(e.target.value)} className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Utility Deposits</label>
                  <input type="number" value={utilityDep} onChange={(e) => setUtilityDep(e.target.value)} className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Output Hero Box */}
            <div className="lg:col-span-5 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Total Liquid Cash Needed</span>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                {currencySymbol}{upfrontCalc.totalUpfrontCash.toLocaleString()}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Lease Prepayments</span>
                  <span className="font-extrabold text-blue-600">{currencySymbol}{upfrontCalc.leasePrepayments.toLocaleString()}</span>
                </div>
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">One-Time Setup</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">{currencySymbol}{upfrontCalc.oneTimeMoveInFees.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Saved History Drawer for Box 4 */}
          {savedBox4Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox4(!showHistoryBox4)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Box 4 Calculations ({savedBox4Items.length})</span>
                {showHistoryBox4 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox4 && (
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                  {savedBox4Items.map((item) => (
                    <div key={item.id} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">{item.primaryResult}</div>
                        <div className="text-[11px] text-slate-500">{item.inputsSummary} • {item.timestamp}</div>
                      </div>
                      <button
                        onClick={() => setSavedBox4Items(savedBox4Items.filter((i) => i.id !== item.id))}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 5: FAIR ROOMMATE RENT SPLITTER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded text-[11px]">Box 5</span>
            <span className="font-extrabold text-sm">Fair Roommate Rent Splitter (Room-Size & Amenities Engine)</span>
          </div>
          <button
            type="button"
            onClick={handleSaveBox5}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox5 ? "Saved!" : "Save Calculation"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Total Apartment Monthly Lease Rent ({currencySymbol})</label>
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

          {/* Roommates Input Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {roommateCalc.roommates.map((r, idx) => {
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
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Bedroom Size (sq ft)</label>
                    <input
                      type="number"
                      value={item.squareFeet}
                      onChange={(e) => updateRoommate(r.id, "squareFeet", parseFloat(e.target.value) || 0)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                    />
                  </div>

                  <div className="space-y-1.5 pt-1 text-[11px]">
                    <label className="flex items-center justify-between font-medium cursor-pointer">
                      <span>Private Bathroom</span>
                      <input type="checkbox" checked={item.privateBathroom} onChange={(e) => updateRoommate(r.id, "privateBathroom", e.target.checked)} className="rounded text-blue-600" />
                    </label>
                    <label className="flex items-center justify-between font-medium cursor-pointer">
                      <span>Walk-In Closet</span>
                      <input type="checkbox" checked={item.walkInCloset} onChange={(e) => updateRoommate(r.id, "walkInCloset", e.target.checked)} className="rounded text-blue-600" />
                    </label>
                    <label className="flex items-center justify-between font-medium cursor-pointer">
                      <span>Balcony Access</span>
                      <input type="checkbox" checked={item.balconyAccess} onChange={(e) => updateRoommate(r.id, "balconyAccess", e.target.checked)} className="rounded text-blue-600" />
                    </label>
                    <label className="flex items-center justify-between font-medium cursor-pointer">
                      <span>Assigned Parking</span>
                      <input type="checkbox" checked={item.assignedParking} onChange={(e) => updateRoommate(r.id, "assignedParking", e.target.checked)} className="rounded text-blue-600" />
                    </label>
                  </div>

                  <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 rounded-xl text-center">
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

          {/* Saved History Drawer for Box 5 */}
          {savedBox5Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox5(!showHistoryBox5)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Box 5 Calculations ({savedBox5Items.length})</span>
                {showHistoryBox5 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox5 && (
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                  {savedBox5Items.map((item) => (
                    <div key={item.id} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">{item.primaryResult}</div>
                        <div className="text-[11px] text-slate-500">{item.inputsSummary} • {item.timestamp}</div>
                      </div>
                      <button
                        onClick={() => setSavedBox5Items(savedBox5Items.filter((i) => i.id !== item.id))}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOX 6: RENT VS. BUY BREAKEVEN COMPARATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded text-[11px]">Box 6</span>
            <span className="font-extrabold text-sm">Rent vs. Buy Breakeven & Opportunity Cost Comparator</span>
          </div>
          <button
            type="button"
            onClick={handleSaveBox6}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox6 ? "Saved!" : "Save Calculation"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Inputs */}
            <div className="lg:col-span-6 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Monthly Rent ({currencySymbol})</label>
                  <input type="number" value={rvbRent} onChange={(e) => setRvbRent(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Annual Rent Increase (%)</label>
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
                  <span>Analysis Horizon: {rvbYears} Years</span>
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

            {/* Output Hero Box */}
            <div className="lg:col-span-6 space-y-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                {rvbYears}-Year Financial Horizon Outcome
              </span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                {rentVsBuyCalc.netBenefitToBuying >= 0
                  ? `Buying builds ${currencySymbol}${rentVsBuyCalc.netBenefitToBuying.toLocaleString()} more net worth`
                  : `Renting saves ${currencySymbol}${Math.abs(rentVsBuyCalc.netBenefitToBuying).toLocaleString()} more net worth`}
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

          {/* Saved History Drawer for Box 6 */}
          {savedBox6Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox6(!showHistoryBox6)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Box 6 Calculations ({savedBox6Items.length})</span>
                {showHistoryBox6 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox6 && (
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                  {savedBox6Items.map((item) => (
                    <div key={item.id} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">{item.primaryResult}</div>
                        <div className="text-[11px] text-slate-500">{item.inputsSummary} • {item.timestamp}</div>
                      </div>
                      <button
                        onClick={() => setSavedBox6Items(savedBox6Items.filter((i) => i.id !== item.id))}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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
