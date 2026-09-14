"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Activity,
  Sparkles,
  ShieldAlert,
  Scale,
  TrendingUp,
  Download,
  Printer,
  Copy,
  CheckCircle2,
  Sliders,
  FileSpreadsheet,
  Award,
  Layers,
  Heart,
  User,
  Plus,
  Trash2,
  Clock,
  Wine,
  Beer as BeerIcon,
  Zap,
  LineChart as LineIcon,
  BarChart2,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { calculateBacCalculator } from "@/app/calculators/bac-calculator/calculator";
import {
  BacMode,
  Gender,
  UnitSystem,
  DrinkEntry,
} from "@/app/calculators/bac-calculator/types";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function BacCalculator() {
  // Mode & Unit State
  const [mode, setMode] = useState<BacMode>("widmark-standard");
  const [gender, setGender] = useState<Gender>("male");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");
  const [ageYears, setAgeYears] = useState<number>(30);

  // Body Weight & Height State
  const [weightLbs, setWeightLbs] = useState<number>(165);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(178);

  // Drinking Session Time State
  const [timeSinceFirstDrinkHours, setTimeSinceFirstDrinkHours] = useState<number>(2);
  const [timeSinceFirstDrinkMinutes, setTimeSinceFirstDrinkMinutes] = useState<number>(0);
  const [stomachState, setStomachState] = useState<"empty" | "full" | "light">("light");
  const [eliminationRateBeta, setEliminationRateBeta] = useState<number>(0.015);

  // Drinks Log State
  const [drinks, setDrinks] = useState<DrinkEntry[]>([
    {
      id: "1",
      name: "Standard Beer (5% ABV)",
      category: "beer",
      count: 2,
      volumeMl: 355, // 12 oz
      abvPercent: 5.0,
    },
  ]);

  // Hydration Mounted & Active Tab State
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "elimination-chart" | "impairment-spectrum" | "legal-limits" | "drink-breakdown" | "action-plan"
  >("elimination-chart");

  // Modal & Copy State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update Unit System Handler
  const handleUnitSystemChange = (u: UnitSystem) => {
    if (u === "metric" && unitSystem === "us") {
      const totalInches = heightFeet * 12 + heightInches;
      setHeightCm(Math.round(totalInches * 2.54));
      setWeightKg(Math.round(weightLbs * 0.45359237 * 10) / 10);
    } else if (u === "us" && unitSystem === "metric") {
      const totalInches = heightCm / 2.54;
      setHeightFeet(Math.floor(totalInches / 12));
      setHeightInches(Math.round(totalInches % 12));
      setWeightLbs(Math.round(weightKg * 2.20462));
    }
    setUnitSystem(u);
  };

  // Synchronized Mode Selection Handler
  const handleModeSelect = (selectedMode: BacMode) => {
    setMode(selectedMode);
    if (selectedMode === "driving-sobriety") {
      setActiveTab("legal-limits");
    } else if (selectedMode === "elimination-timeline") {
      setActiveTab("elimination-chart");
    } else if (selectedMode === "gender-weight-matrix") {
      setActiveTab("impairment-spectrum");
    } else if (selectedMode === "drink-counter" || selectedMode === "drink-comparison") {
      setActiveTab("drink-breakdown");
    } else if (selectedMode === "custom-toxicology") {
      setActiveTab("action-plan");
    } else {
      setActiveTab("elimination-chart");
    }
  };

  // Add Drink Quick Preset
  const addPresetDrink = (type: "beer" | "wine" | "liquor" | "cocktail") => {
    const newId = Date.now().toString();
    if (type === "beer") {
      setDrinks([
        ...drinks,
        { id: newId, name: "Beer (12 oz, 5% ABV)", category: "beer", count: 1, volumeMl: 355, abvPercent: 5.0 },
      ]);
    } else if (type === "wine") {
      setDrinks([
        ...drinks,
        { id: newId, name: "Glass of Wine (5 oz, 12% ABV)", category: "wine", count: 1, volumeMl: 148, abvPercent: 12.0 },
      ]);
    } else if (type === "liquor") {
      setDrinks([
        ...drinks,
        { id: newId, name: "Shot of Liquor (1.5 oz, 40% ABV)", category: "liquor", count: 1, volumeMl: 44, abvPercent: 40.0 },
      ]);
    } else if (type === "cocktail") {
      setDrinks([
        ...drinks,
        { id: newId, name: "Craft Cocktail (8 oz, 10% ABV)", category: "cocktail", count: 1, volumeMl: 236, abvPercent: 10.0 },
      ]);
    }
  };

  // Remove Drink Handler
  const removeDrink = (id: string) => {
    setDrinks(drinks.filter((d) => d.id !== id));
  };

  // Update Drink Quantity
  const updateDrinkCount = (id: string, delta: number) => {
    setDrinks(
      drinks.map((d) => {
        if (d.id === id) {
          const newCount = Math.max(1, d.count + delta);
          return { ...d, count: newCount };
        }
        return d;
      })
    );
  };

  // Calculation Results Memo
  const results = useMemo(() => {
    return calculateBacCalculator({
      mode,
      gender,
      unitSystem,
      ageYears,
      weightLbs,
      heightFeet,
      heightInches,
      weightKg,
      heightCm,
      timeSinceFirstDrinkHours,
      timeSinceFirstDrinkMinutes,
      stomachState,
      eliminationRateBeta,
      drinks,
    });
  }, [
    mode,
    gender,
    unitSystem,
    ageYears,
    weightLbs,
    heightFeet,
    heightInches,
    weightKg,
    heightCm,
    timeSinceFirstDrinkHours,
    timeSinceFirstDrinkMinutes,
    stomachState,
    eliminationRateBeta,
    drinks,
  ]);

  // Reset Defaults Handler
  const handleResetDefaults = () => {
    setMode("widmark-standard");
    setGender("male");
    setUnitSystem("us");
    setAgeYears(30);
    setWeightLbs(165);
    setHeightFeet(5);
    setHeightInches(10);
    setWeightKg(75);
    setHeightCm(178);
    setTimeSinceFirstDrinkHours(2);
    setTimeSinceFirstDrinkMinutes(0);
    setStomachState("light");
    setEliminationRateBeta(0.015);
    setDrinks([
      {
        id: "1",
        name: "Standard Beer (5% ABV)",
        category: "beer",
        count: 2,
        volumeMl: 355, // 12 oz
        abvPercent: 5.0,
      },
    ]);
    setActiveTab("elimination-chart");
  };

  // Dynamic Hero Card Content based on Selected Mode
  const heroContent = useMemo(() => {
    switch (mode) {
      case "driving-sobriety":
        return {
          badge: "REFERENCE DRIVING THRESHOLDS",
          title: `${results.currentBacPercent}% Modeled BAC`,
          subtitle: `0.08% Standard Adult Ref: ${results.hoursUntilLegalLimit008 > 0 ? `Estimated ${results.hoursUntilLegalLimit008} hrs until below limit` : "Currently below reference threshold"}. 0.05% Threshold: ${results.hoursUntilLegalLimit005 > 0 ? `${results.hoursUntilLegalLimit005} hrs` : "Below"}. Limits vary by jurisdiction.`,
          tag: "REFERENCE LIMITS",
        };
      case "elimination-timeline":
        return {
          badge: "HOUR-BY-HOUR ALCOHOL ELIMINATION PROJECTION",
          title: `${results.hoursUntilSober000} Hours to 0.00%`,
          subtitle: `Estimated time until modeled zero BAC. Peak modeled BAC: ${results.peakBacPercent}% (~${results.peakTimeMinutes} min peak). Assumed clearance rate: ${eliminationRateBeta}%/hr.`,
          tag: "ELIMINATION TIMELINE",
        };
      case "drink-counter":
      case "drink-comparison":
        return {
          badge: "ALCOHOL INTAKE & DRINK COUNTER",
          title: `${results.totalStandardDrinks} Standard Drinks`,
          subtitle: `Total pure alcohol: ${results.totalPureAlcoholGrams} grams | Caloric impact: ${results.totalAlcoholCalories} kcal (${results.totalPureAlcoholGrams}g × 7 kcal).`,
          tag: "DRINK COUNTER",
        };
      case "gender-weight-matrix":
        return {
          badge: "GENDER & BODY WEIGHT DILUTION MATRIX",
          title: `${results.currentBacPercent}% BAC (${results.currentBacGramsPerLiter} g/L)`,
          subtitle: `${gender.toUpperCase()} baseline (${results.weightKg} kg). Distribution factor r = ${gender === "male" ? 0.68 : 0.55}.`,
          tag: "WEIGHT SENSITIVITY",
        };
      case "seidl-anthropometric":
        return {
          badge: "SEIDL ANTHROPOMETRIC WATER DISTRIBUTION (1990)",
          title: `${results.currentBacPercent}% BAC`,
          subtitle: `Height (${results.heightCm} cm) and weight (${results.weightKg} kg) adjusted body water distribution factor.`,
          tag: "SEIDL EQUATION",
        };
      case "watson-tbw":
        return {
          badge: "WATSON TOTAL BODY WATER (TBW) CLINICAL EQUATION",
          title: `${results.currentBacPercent}% BAC`,
          subtitle: `Total body water distribution scaled for age (${ageYears} yrs), height (${results.heightCm} cm), and weight (${results.weightKg} kg).`,
          tag: "WATSON TBW",
        };
      case "calories-metabolism":
        return {
          badge: "ALCOHOL CALORIES & METABOLISM COUNTER",
          title: `${results.totalAlcoholCalories} Alcohol Calories`,
          subtitle: `Pure alcohol mass: ${results.totalPureAlcoholGrams} grams (${results.totalStandardDrinks} standard drinks). Alcohol density: 0.789 g/mL.`,
          tag: "ALCOHOL CALORIES",
        };
      case "custom-toxicology":
        return {
          badge: "CUSTOM TOXICOLOGY & METABOLISM EVALUATION",
          title: `${results.currentBacPercent}% BAC`,
          subtitle: `Metabolism rate beta: ${eliminationRateBeta}%/hr | Stomach state: ${stomachState.toUpperCase()}.`,
          tag: "CUSTOM EVALUATION",
        };
      case "widmark-standard":
      default:
        return {
          badge: "ESTIMATED BLOOD ALCOHOL CONCENTRATION (BAC)",
          title: `${results.currentBacPercent}% BAC`,
          subtitle: `${results.currentBacGramsPerLiter} g/L | ${results.impairmentStage.stageName}. Peak BAC reached ${results.peakBacPercent}%.`,
          tag: "WIDMARK STANDARD",
        };
    }
  }, [mode, results, gender, eliminationRateBeta, stomachState, ageYears]);

  // Modes Configuration List
  const modesList: { id: BacMode; label: string; icon: any; desc: string }[] = [
    { id: "widmark-standard", label: "Widmark Standard", icon: Activity, desc: "Classic BAC calculation" },
    { id: "driving-sobriety", label: "Driving Sobriety", icon: ShieldAlert, desc: "Legal DUI limits & time to 0.08%" },
    { id: "drink-counter", label: "Drink Counter", icon: Wine, desc: "Pure alcohol mass & drinks" },
    { id: "elimination-timeline", label: "Elimination Curve", icon: LineIcon, desc: "Hour-by-hour schedule" },
    { id: "gender-weight-matrix", label: "Weight Matrix", icon: User, desc: "Gender & body dilution" },
    { id: "seidl-anthropometric", label: "Seidl Formula", icon: Layers, desc: "Height & weight distribution" },
    { id: "watson-tbw", label: "Watson TBW", icon: Scale, desc: "Total body water equation" },
    { id: "calories-metabolism", label: "Alcohol Calories", icon: Zap, desc: "Alcohol calorie counter" },
    { id: "drink-comparison", label: "Drink Comparison", icon: BeerIcon, desc: "Compare beer, wine, & shots" },
    { id: "custom-toxicology", label: "Custom Eval", icon: Sliders, desc: "Custom metabolism rate" },
  ];

  // Bar Data for Drink Category Breakdown
  const drinkBreakdownData = useMemo(() => {
    const map: Record<string, number> = { beer: 0, wine: 0, liquor: 0, cocktail: 0, custom: 0 };
    drinks.forEach((d) => {
      const pureGrams = d.count * d.volumeMl * (d.abvPercent / 100) * 0.7891;
      map[d.category] = (map[d.category] || 0) + pureGrams;
    });
    return [
      { name: "Beer", grams: Number((map.beer || 0).toFixed(1)), fill: "#f59e0b" },
      { name: "Wine", grams: Number((map.wine || 0).toFixed(1)), fill: "#e11d48" },
      { name: "Liquor", grams: Number((map.liquor || 0).toFixed(1)), fill: "#8b5cf6" },
      { name: "Cocktail", grams: Number((map.cocktail || 0).toFixed(1)), fill: "#06b6d4" },
    ];
  }, [drinks]);

  // CSV Export Handler
  const handleExportCSV = () => {
    if (!results.isValid) return;
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Parameter,Value\n";
    csvContent += `Calculation Mode,${results.mode}\n`;
    csvContent += `Gender,${results.gender.toUpperCase()}\n`;
    csvContent += `Current Modeled BAC (%),${results.currentBacPercent}%\n`;
    csvContent += `Current BAC (g/L),${results.currentBacGramsPerLiter} g/L\n`;
    csvContent += `Peak Modeled BAC (%),${results.peakBacPercent}%\n`;
    csvContent += `Impairment Stage,${results.impairmentStage.stageName}\n`;
    csvContent += `Hours to 0.08% Reference Threshold,${results.hoursUntilLegalLimit008} hours\n`;
    csvContent += `Hours to 0.00% Modeled BAC,${results.hoursUntilSober000} hours\n`;
    csvContent += `Total Pure Alcohol,${results.totalPureAlcoholGrams} grams (${results.totalStandardDrinks} US drinks)\n`;
    csvContent += `Total Alcohol Calories,${results.totalAlcoholCalories} kcal\n\n`;

    csvContent += "Hour,Timeline Label,BAC (%),BAC (g/L),Reference Status\n";
    results.eliminationCurve.forEach((ep) => {
      csvContent += `${ep.hour},"${ep.timeLabel}",${ep.bacPercent},${ep.bacGramsPerLiter},"${ep.status}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bac_estimation_report_${results.currentBacPercent}percent.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Summary Handler
  const handleCopy = () => {
    if (!results.isValid) return;
    const summaryText = `Blood Alcohol Concentration (BAC) Mathematical Estimate:\n• Current Modeled BAC: ${results.currentBacPercent}% (${results.currentBacGramsPerLiter} g/L)\n• Peak Modeled BAC: ${results.peakBacPercent}% (~${results.peakTimeMinutes} min peak)\n• Stage: ${results.impairmentStage.stageName}\n• Hours to < 0.08% Reference Threshold: ${results.hoursUntilLegalLimit008} hrs\n• Hours to 0.00% Modeled BAC: ${results.hoursUntilSober000} hrs\n• Total Pure Alcohol: ${results.totalPureAlcoholGrams}g (${results.totalStandardDrinks} standard drinks, ~${results.totalAlcoholCalories} kcal)\n• Safety Notice: Theoretical mathematical estimate only. Never use to assess sobriety or fitness to drive.\nCalculated at Calculator Platform.`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Report Modal Data Structure
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Professional Blood Alcohol Concentration (BAC) Suite",
      reportTitle: "Blood Alcohol Concentration (BAC) Mathematical Estimate Report",
      generatedDate: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      generatedTime: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    keyMetrics: [
      {
        label: "Current Modeled BAC (%)",
        value: `${results.currentBacPercent}%`,
        subtitle: `${results.currentBacGramsPerLiter} g/L (${results.impairmentStage.stageName})`,
        colorTheme: results.currentBacPercent >= 0.08 ? "rose" : "cyan",
      },
      {
        label: "Peak Modeled BAC",
        value: `${results.peakBacPercent}%`,
        subtitle: `~${results.peakTimeMinutes} mins post drinking`,
        colorTheme: "amber",
      },
      {
        label: "Time to < 0.08% Reference Threshold",
        value: `${results.hoursUntilLegalLimit008} Hours`,
        subtitle: "Example standard adult reference threshold",
        colorTheme: "purple",
      },
      {
        label: "Time to 0.00% Modeled BAC",
        value: `${results.hoursUntilSober000} Hours`,
        subtitle: "Estimated time until modeled zero alcohol",
        colorTheme: "emerald",
      },
    ],
    sections: [
      {
        title: "User Parameters & Session Details",
        items: [
          { label: "Gender", value: results.gender.toUpperCase() },
          { label: "Age", value: `${ageYears} Years` },
          { label: "Body Weight", value: `${results.weightKg} kg (${results.weightLbs} lbs)` },
          { label: "Height", value: `${results.heightCm} cm` },
          { label: "Time Since First Drink", value: `${timeSinceFirstDrinkHours}h ${timeSinceFirstDrinkMinutes}m` },
          { label: "Stomach Absorption State", value: stomachState.toUpperCase() },
          { label: "Metabolism Clearance Rate (Beta)", value: `${eliminationRateBeta}% / hour` },
          { label: "Total Pure Alcohol Consumed", value: `${results.totalPureAlcoholGrams} grams` },
          { label: "US Standard Drinks Equivalent", value: `${results.totalStandardDrinks} drinks` },
          { label: "Total Alcohol Calories", value: `${results.totalAlcoholCalories} kcal` },
        ],
      },
      {
        title: "Behavioral Stage & Impairment",
        items: [
          { label: "Impairment Stage", value: results.impairmentStage.stageName },
          { label: "Behavioral State", value: results.impairmentStage.behavior },
          { label: "Physical Impairment", value: results.impairmentStage.impairment },
        ],
      },
    ],
    recommendation: {
      title: "Public Safety Advisory",
      text: results.safetyWarnings[0] || results.recommendations[0] || "Never operate a motor vehicle or machinery after consuming alcohol.",
      reasons: results.recommendations,
      score: Math.round(results.currentBacPercent * 1000),
      rating: results.impairmentStage.stageName,
    },
    table: {
      title: "Hour-by-Hour Elimination Projection (From Now)",
      headers: [
        { key: "hour", label: "Timeline", align: "left" },
        { key: "bac", label: "Modeled BAC (%)", align: "right" },
        { key: "gL", label: "BAC (g/L)", align: "right" },
        { key: "status", label: "Reference Status", align: "left" },
      ],
      rows: results.eliminationCurve.slice(0, 10).map((ep) => ({
        hour: ep.timeLabel,
        bac: `${ep.bacPercent}%`,
        gL: `${ep.bacGramsPerLiter} g/L`,
        status: ep.status,
      })),
    },
    notes: [
      "BAC calculations are theoretical mathematical estimates based on average metabolism rates (~0.015%/hr).",
      "Individual alcohol absorption and clearance vary widely based on genetic liver enzymes, hydration, health, and medications.",
      "A modeled BAC of 0.00% is not proof of physical sobriety or lack of impairment.",
      "NEVER operate a motor vehicle, watercraft, or machinery after consuming alcohol.",
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 print:p-0 font-sans">
      {/* Light Theme Mode Selector Bar (Responsive & Non-Clipping) */}
      <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {modesList.map((m) => {
            const Icon = m.icon;
            const isSelected = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleModeSelect(m.id)}
                className={`flex items-center gap-2 p-2.5 rounded-xl transition-all duration-200 text-left ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md shadow-cyan-500/20 font-semibold scale-[1.01]"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg shrink-0 ${
                    isSelected ? "bg-white/20 text-white" : "bg-cyan-50 text-cyan-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold leading-tight truncate" style={{ color: isSelected ? "#ffffff" : undefined }}>
                    {m.label}
                  </div>
                  <div className="text-[10px] opacity-80 leading-tight truncate hidden sm:block">
                    {m.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Calculation & Inputs Grid (Light Theme) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs Form */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm print:hidden">
          {/* Card Header with Clean Sub-Row Toggles */}
          <div className="border-b border-slate-100 pb-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">Personal Parameters
              </h2>
              <button
                type="button"
                onClick={handleResetDefaults}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-blue-300 bg-slate-50 hover:bg-white transition-all shadow-2xs"
                title="Reset all inputs to default benchmark values"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
            </div>

            {/* Sub-row for Gender & Unit System Toggles */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-1/2">
                <button
                  onClick={() => setGender("male")}
                  className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all ${
                    gender === "male"
                      ? "bg-white text-cyan-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all ${
                    gender === "female"
                      ? "bg-white text-cyan-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Female
                </button>
              </div>

              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-1/2">
                <button
                  onClick={() => handleUnitSystemChange("us")}
                  className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all ${
                    unitSystem === "us"
                      ? "bg-white text-emerald-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Inches / lbs
                </button>
                <button
                  onClick={() => handleUnitSystemChange("metric")}
                  className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all ${
                    unitSystem === "metric"
                      ? "bg-white text-emerald-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  cm / kg
                </button>
              </div>
            </div>
          </div>

          {/* Body Weight & Session Time */}
          {unitSystem === "us" ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Body Weight (lbs)
                </label>
                <input
                  type="number"
                  min={50}
                  max={500}
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Height (ft & in)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={1}
                    max={7}
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-2 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                  <input
                    type="number"
                    min={0}
                    max={11}
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-2 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Body Weight (kg)
                </label>
                <input
                  type="number"
                  min={20}
                  max={250}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min={50}
                  max={230}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                />
              </div>
            </div>
          )}

          {/* Time Elapsed Since First Drink */}
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Drinking Session Duration & Stomach State
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hours Since First Drink
                </label>
                <input
                  type="number"
                  step="0.5"
                  min={0}
                  max={48}
                  value={timeSinceFirstDrinkHours}
                  onChange={(e) => setTimeSinceFirstDrinkHours(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Stomach State
                </label>
                <select
                  value={stomachState}
                  onChange={(e) => setStomachState(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                >
                  <option value="light">Light Meal (Normal Absorption)</option>
                  <option value="full">Full Meal (Slow Absorption)</option>
                  <option value="empty">Empty Stomach (Fast Absorption)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Drinks Logger Grid Section */}
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">Drinks Consumed Log ({drinks.length})
              </h3>

              {/* Quick Add Presets */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => addPresetDrink("beer")}
                  className="px-2 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 rounded-lg text-[10px] font-bold"
                >
                  + Beer
                </button>
                <button
                  onClick={() => addPresetDrink("wine")}
                  className="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg text-[10px] font-bold"
                >
                  + Wine
                </button>
                <button
                  onClick={() => addPresetDrink("liquor")}
                  className="px-2 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 rounded-lg text-[10px] font-bold"
                >
                  + Shot
                </button>
              </div>
            </div>

            {/* List of Drink Items */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {drinks.map((drink) => (
                <div
                  key={drink.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-slate-900 truncate">{drink.name}</div>
                    <div className="text-[10px] text-slate-500">
                      {drink.volumeMl} mL ({Math.round(drink.volumeMl / 29.5734)} oz) | {drink.abvPercent}% ABV
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-white rounded-lg border border-slate-200 text-xs">
                    <button
                      onClick={() => updateDrinkCount(drink.id, -1)}
                      className="px-2 py-1 text-slate-600 hover:text-slate-900 font-bold"
                    >
                      -
                    </button>
                    <span className="px-2.5 py-1 font-bold text-cyan-700">{drink.count}</span>
                    <button
                      onClick={() => updateDrinkCount(drink.id, 1)}
                      className="px-2 py-1 text-slate-600 hover:text-slate-900 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeDrink(drink.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove drink"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Results & Interactive Visualizations */}
        <div className="lg:col-span-7 space-y-6">
          {/* Validation Error Alert Banner if Inputs are Invalid */}
          {!results.isValid && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-rose-800 text-xs space-y-2 shadow-xs">
              <div className="font-bold flex items-center gap-2 text-sm text-rose-900">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                Input Validation Notice
              </div>
              <p className="text-rose-700">Please correct the following input issues to calculate BAC:</p>
              <ul className="list-disc list-inside space-y-1 text-rose-700 font-medium pl-1">
                {results.errorMessages.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Dynamic Key Metric Highlights Hero Card */}
          <div
            className={`p-6 rounded-2xl text-white shadow-xl transition-all space-y-5 ${
              results.currentBacPercent >= 0.08
                ? "bg-gradient-to-br from-rose-600 via-red-600 to-purple-800 shadow-rose-600/10"
                : results.currentBacPercent >= 0.05
                ? "bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 shadow-amber-600/10"
                : "bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-700 shadow-cyan-600/10"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-white/90 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  {heroContent.badge}
                </div>
                <div className="text-3xl lg:text-4xl font-extrabold text-white mt-1">
                  {heroContent.title}
                </div>
                <div className="text-xs text-white/90 mt-1 max-w-lg leading-relaxed">
                  {heroContent.subtitle}
                </div>
              </div>

              <div className="text-right">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm"
                >
                  {heroContent.tag}
                </span>
              </div>
            </div>

            {/* Prominent Mandatory Public Safety Notice */}
            <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-3 text-white text-xs leading-relaxed flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-200">SAFETY NOTICE:</span> This calculator provides a theoretical mathematical estimate based on the inputs and assumptions selected. It cannot determine whether a person is sober, unimpaired, or legally permitted to drive. Alcohol absorption and metabolism vary substantially between individuals. Never use this calculator to decide whether to drive or perform a safety-sensitive activity.
              </div>
            </div>

            {/* Sub-Metrics Cards Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-white/90 font-semibold uppercase">Peak BAC</div>
                <div className="text-xl font-black text-white mt-0.5">{results.peakBacPercent}%</div>
                <div className="text-[10px] text-white/80 truncate">~{results.peakTimeMinutes} min peak</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-white/90 font-semibold uppercase">Time to &lt; 0.08% Ref</div>
                <div className="text-xl font-black text-white mt-0.5">{results.hoursUntilLegalLimit008} hrs</div>
                <div className="text-[10px] text-white/80 truncate">{results.hoursUntilLegalLimit008 === 0 ? "Below 0.08% Ref" : "Estimated Time Above"}</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-white/90 font-semibold uppercase">Time to 0.00% Modeled</div>
                <div className="text-lg font-black text-white mt-0.5">{results.hoursUntilSober000} hrs</div>
                <div className="text-[10px] text-white/80">Modeled 0.000% BAC</div>
              </div>
            </div>

            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-4 print:hidden">
              <button
                disabled={!results.isValid}
                onClick={() => setIsReportOpen(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all ${
                  results.isValid
                    ? "bg-white text-slate-900 hover:bg-slate-50 cursor-pointer"
                    : "bg-white/40 text-slate-500 cursor-not-allowed"
                }`}
              >
                <Download className="w-4 h-4 text-cyan-600" />
                Generate PDF Report
              </button>

              <div className="flex items-center gap-2">
                <button
                  disabled={!results.isValid}
                  onClick={handleExportCSV}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all ${
                    results.isValid
                      ? "bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                      : "bg-white/10 text-white/40 cursor-not-allowed"
                  }`}
                  title="Export CSV Data"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  CSV
                </button>

                <button
                  disabled={!results.isValid}
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all ${
                    results.isValid
                      ? "bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                      : "bg-white/10 text-white/40 cursor-not-allowed"
                  }`}
                  title="Copy Summary"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy"}
                </button>

                
              </div>
            </div>
          </div>

          {/* Interactive Visualizations Container (Light Theme) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 print:hidden">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl overflow-x-auto text-xs">
              <button
                onClick={() => setActiveTab("elimination-chart")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "elimination-chart"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Elimination Curve
              </button>

              <button
                onClick={() => setActiveTab("impairment-spectrum")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "impairment-spectrum"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Behavioral Stage
              </button>

              <button
                onClick={() => setActiveTab("legal-limits")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "legal-limits"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Reference Thresholds
              </button>

              <button
                onClick={() => setActiveTab("drink-breakdown")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "drink-breakdown"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Drink Mass Breakdown
              </button>

              <button
                onClick={() => setActiveTab("action-plan")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "action-plan"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Safety Protocol
              </button>
            </div>

            {/* TAB 1: Hour-by-Hour Elimination Line Chart */}
            {activeTab === "elimination-chart" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                      Hour-by-Hour BAC Elimination Schedule (Future Projection From Now)
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Starting at current modeled BAC ({results.currentBacPercent}%) &bull; Peak modeled BAC reached {results.peakBacPercent}%
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Rate: {eliminationRateBeta}% / hr</span>
                </div>

                <div className="h-64 w-full">
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.eliminationCurve}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="timeLabel" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} domain={[0, "auto"]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderColor: "#cbd5e1",
                            borderRadius: "12px",
                            color: "#0f172a",
                          }}
                          formatter={(val: any) => [`${val}% BAC`, "Concentration"]}
                        />
                        <Line type="monotone" dataKey="bacPercent" stroke="#06b6d4" strokeWidth={3} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-64 w-full bg-slate-50/50 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">Loading elimination chart...</div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: Behavioral Impairment Stage */}
            {activeTab === "impairment-spectrum" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Clinical Impairment Stage Evaluation
                </h3>

                <div className="p-4 rounded-2xl border text-xs space-y-3 bg-slate-50 border-slate-200">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="font-bold text-slate-900 text-sm" style={{ color: results.impairmentStage.colorHex }}>
                      {results.impairmentStage.stageName} ({results.impairmentStage.bacRangeText})
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: results.impairmentStage.colorHex }}>
                      {results.currentBacPercent}% BAC
                    </span>
                  </div>

                  <div>
                    <strong className="text-slate-900">Behavioral Effects:</strong>
                    <p className="text-slate-600 mt-0.5">{results.impairmentStage.behavior}</p>
                  </div>

                  <div className="border-t border-slate-200 pt-2.5">
                    <strong className="text-slate-900">Physical & Motor Impairment:</strong>
                    <p className="text-slate-600 mt-0.5">{results.impairmentStage.impairment}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: International Driving Legal Limits */}
            {activeTab === "legal-limits" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                  International Reference Driving Thresholds &amp; Estimated Clearance
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {results.legalThresholds.map((lt, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="font-bold text-slate-900">{lt.countryRegion}</div>
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          lt.status === "Below Reference Limit"
                            ? "bg-emerald-100 text-emerald-800"
                            : lt.status === "Approaching Limit"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-rose-100 text-rose-800"
                        }`}>
                          {lt.status}
                        </span>
                        <span className="text-slate-500 font-semibold">
                          {lt.hoursUntilLegal > 0 ? `~${lt.hoursUntilLegal} hrs above threshold` : "Currently below reference limit"}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200/60">
                        {lt.jurisdictionNote}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Drink Category Breakdown Bar Chart */}
            {activeTab === "drink-breakdown" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Pure Alcohol Mass by Beverage Category (Grams)
                </h3>

                <div className="h-64 w-full">
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={drinkBreakdownData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderColor: "#cbd5e1",
                            borderRadius: "12px",
                            color: "#0f172a",
                          }}
                          formatter={(val: any) => [`${val} grams`, "Pure Alcohol"]}
                        />
                        <Bar dataKey="grams" radius={[6, 6, 0, 0]}>
                          {drinkBreakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-64 w-full bg-slate-50/50 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">Loading drink breakdown...</div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: Sobriety Action Plan & Safety Warnings */}
            {activeTab === "action-plan" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Safety Guidance & Sobriety Protocol
                </h3>

                {results.safetyWarnings.length > 0 && (
                  <div className="space-y-2">
                    {results.safetyWarnings.map((warn, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-rose-800 bg-rose-50 p-3.5 rounded-xl border border-rose-200 font-semibold">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{warn}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2.5">
                  {results.recommendations.map((plan, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{plan}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PDF Report Modal */}
      {isReportOpen && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          reportData={reportData}
        />
      )}

      {/* Dedicated Print-Only Report Container (#bac-print-report) */}
      <div id="bac-print-report" className="hidden print:block p-8 font-sans space-y-6 text-slate-900 bg-white">
        <div className="border-b border-slate-300 pb-4">
          <h2 className="text-2xl font-bold text-slate-900">Blood Alcohol Concentration (BAC) Estimation Report</h2>
          <p className="text-xs text-slate-500 mt-1">
            Generated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} | Model: {results.mode.toUpperCase()}
          </p>
        </div>

        {/* Mandatory Public Safety Notice in Print */}
        <div className="bg-amber-50 border border-amber-300 p-3 rounded text-xs text-amber-900">
          <strong>PUBLIC SAFETY NOTICE:</strong> This document provides theoretical mathematical estimates of Blood Alcohol Concentration based on user-entered values. Individual alcohol absorption, metabolism, and impairment vary significantly due to biological, medical, and environmental factors. Modeled estimates must NEVER be used to assess fitness to operate a motor vehicle, watercraft, or machinery.
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded text-center">
          <div>
            <div className="text-xs text-slate-500">Current Modeled BAC</div>
            <div className="text-xl font-bold">{results.currentBacPercent}%</div>
            <div className="text-[10px] text-slate-400">{results.currentBacGramsPerLiter} g/L</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Peak Modeled BAC</div>
            <div className="text-xl font-bold">{results.peakBacPercent}%</div>
            <div className="text-[10px] text-slate-400">~{results.peakTimeMinutes} min peak</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Time Until &lt; 0.08% Ref</div>
            <div className="text-xl font-bold">{results.hoursUntilLegalLimit008} hrs</div>
            <div className="text-[10px] text-slate-400">{results.hoursUntilLegalLimit008 === 0 ? "Below Ref" : "Above Ref"}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Time to 0.00% Modeled BAC</div>
            <div className="text-xl font-bold">{results.hoursUntilSober000} hrs</div>
            <div className="text-[10px] text-slate-400">Modeled zero alcohol</div>
          </div>
        </div>

        {/* Input Parameters Table */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold border-b border-slate-200 pb-1">Session &amp; Subject Parameters</h2>
          <table className="w-full text-xs border-collapse">
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-1 text-slate-500 font-medium">Gender &amp; Age</td>
                <td className="py-1 font-semibold">{gender.toUpperCase()}, {ageYears} years</td>
                <td className="py-1 text-slate-500 font-medium">Body Weight &amp; Height</td>
                <td className="py-1 font-semibold">{results.weightKg} kg ({results.weightLbs} lbs), {results.heightCm} cm</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-1 text-slate-500 font-medium">Elapsed Session Duration</td>
                <td className="py-1 font-semibold">{timeSinceFirstDrinkHours}h {timeSinceFirstDrinkMinutes}m since first drink</td>
                <td className="py-1 text-slate-500 font-medium">Stomach State</td>
                <td className="py-1 font-semibold">{stomachState.toUpperCase()}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-1 text-slate-500 font-medium">Metabolic Clearance Rate (Beta)</td>
                <td className="py-1 font-semibold">{eliminationRateBeta}% BAC / hour</td>
                <td className="py-1 text-slate-500 font-medium">Total Pure Alcohol Consumed</td>
                <td className="py-1 font-semibold">{results.totalPureAlcoholGrams}g ({results.totalStandardDrinks} std drinks, {results.totalAlcoholCalories} kcal)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Drinks Log */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold border-b border-slate-200 pb-1">Drinks Consumed Log</h2>
          <table className="w-full text-xs border border-slate-200">
            <thead className="bg-slate-100 font-bold">
              <tr>
                <th className="p-1.5 text-left">Beverage</th>
                <th className="p-1.5 text-center">Quantity</th>
                <th className="p-1.5 text-right">Volume</th>
                <th className="p-1.5 text-right">ABV</th>
                <th className="p-1.5 text-right">Pure Ethanol</th>
              </tr>
            </thead>
            <tbody>
              {drinks.map((d, idx) => (
                <tr key={idx} className="border-t border-slate-200">
                  <td className="p-1.5">{d.name}</td>
                  <td className="p-1.5 text-center">{d.count}</td>
                  <td className="p-1.5 text-right">{d.volumeMl} mL</td>
                  <td className="p-1.5 text-right">{d.abvPercent}%</td>
                  <td className="p-1.5 text-right">{(d.count * d.volumeMl * (d.abvPercent / 100) * 0.7891).toFixed(1)} g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Elimination Schedule (First 8 Hours) */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold border-b border-slate-200 pb-1">Hour-by-Hour Elimination Projection</h2>
          <table className="w-full text-xs border border-slate-200">
            <thead className="bg-slate-100 font-bold">
              <tr>
                <th className="p-1.5 text-left">Time</th>
                <th className="p-1.5 text-right">Modeled BAC (%)</th>
                <th className="p-1.5 text-right">Concentration (g/L)</th>
                <th className="p-1.5 text-left">Reference Status</th>
              </tr>
            </thead>
            <tbody>
              {results.eliminationCurve.slice(0, 9).map((ep, idx) => (
                <tr key={idx} className="border-t border-slate-200">
                  <td className="p-1.5">{ep.timeLabel}</td>
                  <td className="p-1.5 text-right font-semibold">{ep.bacPercent}%</td>
                  <td className="p-1.5 text-right">{ep.bacGramsPerLiter} g/L</td>
                  <td className="p-1.5">{ep.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-[10px] text-slate-400 pt-4 border-t border-slate-200 text-center">
          Blood Alcohol Concentration Calculator &bull; Educational and Informational Reference &bull; Do not use for legal or medical determinations.
        </div>
      </div>
    </div>
  );
}

export default BacCalculator;
