"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Flame,
  Activity,
  Sparkles,
  Heart,
  Scale,
  Apple,
  Search,
  Download,
  Copy,
  Info,
  Sliders,
  TrendingUp,
  FileSpreadsheet,
  Zap,
  Award,
  ShieldCheck,
  RotateCcw,
  Share2,
  Check,
} from "lucide-react";
import {
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { calculateFatIntakeCalculator } from "@/app/calculators/fat-intake-calculator/calculator";
import {
  FatCalculationMode,
  UnitSystem,
  Gender,
  ActivityLevel,
  FitnessGoal,
  BmrFormulaType,
  KetoTypeOption,
} from "@/app/calculators/fat-intake-calculator/types";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function FatIntakeCalculator() {
  // Mode & Unit State
  const [calculationMode, setCalculationMode] = useState<FatCalculationMode>("daily");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");

  // Basic Inputs State
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<Gender>("male");
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightLbs, setWeightLbs] = useState<number>(160);
  const [weightKg, setWeightKg] = useState<number>(72.6);

  // Advanced Inputs State
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("light");
  const [goal, setGoal] = useState<FitnessGoal>("maintain");
  const [bmrFormula, setBmrFormula] = useState<BmrFormulaType>("mifflin");
  const [bodyFat, setBodyFat] = useState<number>(20);
  const [ketoType, setKetoType] = useState<KetoTypeOption>("skd");
  const [customFatPercentage, setCustomFatPercentage] = useState<number>(25);

  // Searchable Food Database State
  const [foodQuery, setFoodQuery] = useState<string>("");
  const [foodCategoryTab, setFoodCategoryTab] = useState<string>("All");

  // Active View Tab
  const [activeTab, setActiveTab] = useState<
    | "fat-types"
    | "macros"
    | "sat-fat-limit"
    | "omega-ratio"
    | "food-search"
  >("fat-types");

  // Modal & Copy State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // DEF-09: URL Hydration on Mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (!params.toString()) return;

    const modeParam = params.get("mode");
    if (
      modeParam &&
      [
        "daily",
        "loss",
        "gain",
        "maintenance",
        "athlete",
        "heart-health",
        "keto",
        "low-fat",
        "bodybuilding",
        "custom",
      ].includes(modeParam)
    ) {
      setCalculationMode(modeParam as FatCalculationMode);
    }
    const unitsParam = params.get("units");
    if (unitsParam === "metric" || unitsParam === "us") {
      setUnitSystem(unitsParam);
    }
    const ageParam = Number(params.get("age"));
    if (ageParam && ageParam >= 10 && ageParam <= 120) setAge(ageParam);

    const genderParam = params.get("gender");
    if (genderParam === "male" || genderParam === "female") setGender(genderParam);

    const feetParam = Number(params.get("feet"));
    if (feetParam) setHeightFeet(feetParam);
    const inchesParam = Number(params.get("inches"));
    if (!isNaN(inchesParam)) setHeightInches(inchesParam);
    const lbsParam = Number(params.get("lbs"));
    if (lbsParam) setWeightLbs(lbsParam);

    const cmParam = Number(params.get("cm"));
    if (cmParam) setHeightCm(cmParam);
    const kgParam = Number(params.get("kg"));
    if (kgParam) setWeightKg(kgParam);

    const actParam = params.get("activity");
    if (
      actParam &&
      ["sedentary", "light", "moderate", "active", "very-active"].includes(actParam)
    ) {
      setActivityLevel(actParam as ActivityLevel);
    }
    const goalParam = params.get("goal");
    if (goalParam) setGoal(goalParam as FitnessGoal);

    const formulaParam = params.get("formula");
    if (
      formulaParam &&
      ["mifflin", "katch", "harris", "revised-harris", "cunningham"].includes(formulaParam)
    ) {
      setBmrFormula(formulaParam as BmrFormulaType);
    }
    const fatPctParam = Number(params.get("fatPct"));
    if (!isNaN(fatPctParam)) setCustomFatPercentage(fatPctParam);

    const ketoParam = params.get("keto");
    if (ketoParam && ["skd", "tkd", "ckd", "hpkd"].includes(ketoParam)) {
      setKetoType(ketoParam as KetoTypeOption);
    }
    const bfParam = Number(params.get("bf"));
    if (!isNaN(bfParam)) setBodyFat(bfParam);
  }, []);

  // DEF-06: Bidirectional Unit System Conversion
  const handleSetUnitSystem = (newUnit: UnitSystem) => {
    if (newUnit === unitSystem) return;
    if (newUnit === "metric") {
      const totalInches = heightFeet * 12 + heightInches;
      const convertedCm = Math.round(totalInches * 2.54);
      const convertedKg = Number((weightLbs / 2.2046226218).toFixed(1));
      setHeightCm(convertedCm);
      setWeightKg(convertedKg);
      setUnitSystem("metric");
    } else {
      const totalInches = heightCm / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches - feet * 12);
      const convertedLbs = Math.round(weightKg * 2.2046226218);
      setHeightFeet(feet);
      setHeightInches(inches >= 12 ? 11 : inches);
      setWeightLbs(convertedLbs);
      setUnitSystem("us");
    }
  };

  // DEF-07: Reset to Canonical Baseline
  const handleReset = () => {
    setCalculationMode("daily");
    setUnitSystem("us");
    setAge(25);
    setGender("male");
    setHeightFeet(5);
    setHeightInches(10);
    setHeightCm(178);
    setWeightLbs(160);
    setWeightKg(72.6);
    setActivityLevel("light");
    setGoal("maintain");
    setBmrFormula("mifflin");
    setBodyFat(20);
    setKetoType("skd");
    setCustomFatPercentage(25);
    setFoodQuery("");
    setFoodCategoryTab("All");
    setActiveTab("fat-types");
  };

  // DEF-09: Share URL Handler
  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("mode", calculationMode);
    params.set("units", unitSystem);
    params.set("age", String(age));
    params.set("gender", gender);
    if (unitSystem === "us") {
      params.set("feet", String(heightFeet));
      params.set("inches", String(heightInches));
      params.set("lbs", String(weightLbs));
    } else {
      params.set("cm", String(heightCm));
      params.set("kg", String(weightKg));
    }
    params.set("activity", activityLevel);
    params.set("goal", goal);
    params.set("formula", bmrFormula);
    params.set("fatPct", String(customFatPercentage));
    params.set("keto", ketoType);
    params.set("bf", String(bodyFat));

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  // Results Calculation Memo
  const results = useMemo(() => {
    return calculateFatIntakeCalculator({
      unitSystem,
      calculationMode,
      age,
      gender,
      heightFeet,
      heightInches,
      heightCm,
      weightLbs,
      weightKg,
      activityLevel,
      goal,
      bmrFormula,
      bodyFat,
      ketoType,
      customFatPercentage,
    });
  }, [
    unitSystem,
    calculationMode,
    age,
    gender,
    heightFeet,
    heightInches,
    heightCm,
    weightLbs,
    weightKg,
    activityLevel,
    goal,
    bmrFormula,
    bodyFat,
    ketoType,
    customFatPercentage,
  ]);

  // Modes Configuration (DEF-03: Bodybuilder Target Planning Wording)
  const modesList: { id: FatCalculationMode; label: string; icon: any; desc: string }[] = [
    { id: "daily", label: "Daily Baseline", icon: Flame, desc: "AMDR 25% fat standard" },
    { id: "loss", label: "Weight Loss Fat", icon: Scale, desc: "22% low-fat deficit" },
    { id: "gain", label: "Weight Gain Fat", icon: TrendingUp, desc: "32% energy surplus" },
    { id: "maintenance", label: "Maintenance", icon: Activity, desc: "28% energy balance" },
    { id: "athlete", label: "Athlete Fat Target", icon: Zap, desc: "22% high carb priority" },
    { id: "heart-health", label: "Heart Health Reference", icon: Heart, desc: "Sat fat <6% AHA target" },
    { id: "keto", label: "Keto Fat Calculator", icon: Sparkles, desc: "75% fat for ketosis" },
    { id: "low-fat", label: "Low Fat Diet", icon: ShieldCheck, desc: "18% strict low fat" },
    { id: "bodybuilding", label: "Bodybuilder Target", icon: Award, desc: "0.35g/lb planning target" },
    { id: "custom", label: "Custom Ratio", icon: Sliders, desc: "Custom fat ratio builder" },
  ];

  // DEF-02: Independent Target Allocation Data for Tab 1 (Bar Chart)
  const fatSubTypesBarData = [
    { name: "Daily Fat Target", value: results.fatTargetGrams, fill: "#e11d48", note: "Total Target" },
    { name: "MUFA Target", value: results.fattyAcids.mufaGrams, fill: "#10b981", note: "~55% Fat" },
    { name: "PUFA Target", value: results.fattyAcids.pufaGrams, fill: "#06b6d4", note: "~25% Fat" },
    { name: "Sat Fat Ceiling", value: results.fattyAcids.saturatedGrams, fill: "#f59e0b", note: `<${results.fattyAcids.saturatedMaxPercent}% Calories` },
  ];

  // Pie Chart Data: Macro Energy Split
  const macroPieData = [
    { name: "Fat", value: results.fatTargetCalories, grams: results.fatTargetGrams, color: "#e11d48" },
    { name: "Carbohydrates", value: results.carbs.calories, grams: results.carbs.grams, color: "#06b6d4" },
    { name: "Protein", value: results.protein.calories, grams: results.protein.grams, color: "#10b981" },
  ];

  const generalSatGrams = Math.round((results.targetCalories * 0.10) / 9);
  const ahaSatGrams = Math.round((results.targetCalories * 0.06) / 9);

  // Saturated Fat Bar Data
  const satFatBarData = [
    {
      name: "Saturated Fat Ceilings",
      "General Reference Limit (<10%)": generalSatGrams,
      "AHA Heart Health Ceiling (<6%)": ahaSatGrams,
    },
  ];

  // Filtered Food Database Items (DEF-04: 36 Items across 7 Categories)
  const filteredFoods = useMemo(() => {
    return results.foodDatabase.filter((item) => {
      const matchesCategory = foodCategoryTab === "All" || item.category === foodCategoryTab;
      const matchesQuery = item.name.toLowerCase().includes(foodQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [results.foodDatabase, foodCategoryTab, foodQuery]);

  // CSV Export Handler (DEF-10: Planning Floor wording)
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Parameter,Value\n";
    csvContent += `Mode,${results.mode}\n`;
    csvContent += `BMR Formula,${results.formulaUsed}\n`;
    csvContent += `Daily Target Calories,${results.targetCalories} kcal\n`;
    csvContent += `Daily Fat Target,${results.fatTargetGrams} g (${results.fatTargetCalories} kcal / ${results.fatPercentage}% of calories)\n`;
    csvContent += `Saturated Fat Ceiling,${results.fattyAcids.saturatedGrams} g max (<${results.fattyAcids.saturatedMaxPercent}% calories)\n`;
    csvContent += `Evidence-Informed Planning Floor,${results.hormoneSafetyMinGrams} g (~0.3g/lb)\n\n`;

    csvContent += "Food Item,Category,Serving Size,Total Fat (g),Saturated Fat (g),MUFA (g),PUFA (g),Omega-3 (g),Calories (kcal)\n";
    results.foodDatabase.forEach((food) => {
      csvContent += `"${food.name}",${food.category},"${food.servingSize}",${food.totalFat},${food.saturatedFat},${food.mufa},${food.pufa},${food.omega3},${food.calories}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fat_intake_plan_${results.fatTargetGrams}g.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Summary Handler (DEF-10: Planning Floor wording)
  const handleCopy = () => {
    const summaryText = `Fat Intake Calculator Results:\n• Daily Fat Target: ${results.fatTargetGrams}g (${results.fatTargetCalories} kcal | ${results.fatPercentage}% of calories)\n• Saturated Fat Ceiling: ${results.fattyAcids.saturatedGrams}g max (<${results.fattyAcids.saturatedMaxPercent}% calories)\n• Omega-3 Target: ${results.fattyAcids.omega3Grams}g/day | Omega-6:Omega-3 Ratio: ${results.fattyAcids.omegaRatio}:1\n• Fat Intake Planning Floor: ${results.hormoneSafetyMinGrams}g/day (~0.3g/lb planning reference)\n• Target Calories: ${results.targetCalories} kcal/day | TDEE: ${results.tdee} kcal\nCalculated at Calculator Platform.`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Report Modal Data Structure (DEF-10: Planning Floor wording)
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Professional Fat Intake Calculator & Cardiovascular Suite",
      reportTitle: "Clinical Fat Intake & Lipid Profiling Report",
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
        label: "Daily Fat Target",
        value: `${results.fatTargetGrams} g`,
        subtitle: `${results.fatTargetCalories} kcal (${results.fatPercentage}% of calories)`,
        colorTheme: "rose",
      },
      {
        label: "Saturated Fat Ceiling",
        value: `${results.fattyAcids.saturatedGrams} g`,
        subtitle: `<${results.fattyAcids.saturatedMaxPercent}% of daily calories`,
        colorTheme: "amber",
      },
      {
        label: "Omega-3 Target",
        value: `${results.fattyAcids.omega3Grams} g`,
        subtitle: `Omega Ratio: ${results.fattyAcids.omegaRatio}:1`,
        colorTheme: "cyan",
      },
      {
        label: "Fat Intake Planning Floor",
        value: `${results.hormoneSafetyMinGrams} g`,
        subtitle: "0.3g fat per lb body weight reference",
        colorTheme: "emerald",
      },
    ],
    sections: [
      {
        title: "Personal Metrics & Calorie Expenditure",
        items: [
          { label: "Unit System", value: unitSystem.toUpperCase() },
          { label: "Calculation Mode", value: calculationMode.toUpperCase() },
          { label: "Age & Gender", value: `${age} yrs (${gender.toUpperCase()})` },
          { label: "Activity Level", value: activityLevel.toUpperCase() },
          { label: "BMR Formula Used", value: results.formulaUsed },
          { label: "Basal Metabolic Rate (BMR)", value: `${results.bmr} kcal` },
          { label: "Total Energy Expenditure (TDEE)", value: `${results.tdee} kcal` },
          { label: "Age Group Guideline", value: `${results.ageGuideline.ageGroup} (${results.ageGuideline.recommendedPercentage})` },
        ],
      },
      {
        title: "Fatty Acid Sub-Type Breakdown & Lipid Targets",
        items: [
          { label: "Monounsaturated Fat (MUFA)", value: `${results.fattyAcids.mufaGrams} g` },
          { label: "Polyunsaturated Fat (PUFA)", value: `${results.fattyAcids.pufaGrams} g` },
          { label: "Omega-3 Fatty Acids (EPA/DHA)", value: `${results.fattyAcids.omega3Grams} g` },
          { label: "Omega-6 Fatty Acids", value: `${results.fattyAcids.omega6Grams} g` },
          { label: "Trans Fat Safe Limit", value: `${results.fattyAcids.transFatLimitGrams} g (Zero)` },
          { label: "Dietary Cholesterol Reference", value: `< ${results.fattyAcids.cholesterolLimitMg} mg/day` },
        ],
      },
    ],
    recommendation: {
      title: "Personalized Cardiovascular & Lipid Strategy",
      text: results.insights[0] || "Maintain a balanced fat intake.",
      reasons: results.recommendations,
      score: results.bodyComposition.healthScore,
      rating: "Optimal Lipid Balance",
    },
    table: {
      title: "Macronutrient Energy Share Breakdown",
      headers: [
        { key: "macro", label: "Macronutrient", align: "left" },
        { key: "grams", label: "Grams (g)", align: "right" },
        { key: "calories", label: "Calories (kcal)", align: "right" },
        { key: "percentage", label: "Energy Share (%)", align: "right" },
      ],
      rows: [
        { macro: "Fat", grams: `${results.fatTargetGrams} g`, calories: `${results.fatTargetCalories} kcal`, percentage: `${results.fatPercentage}%` },
        { macro: "Carbohydrates", grams: `${results.carbs.grams} g`, calories: `${results.carbs.calories} kcal`, percentage: `${results.carbs.percentage}%` },
        { macro: "Protein", grams: `${results.protein.grams} g`, calories: `${results.protein.calories} kcal`, percentage: `${results.protein.percentage}%` },
      ],
    },
    notes: [
      "General reference guidelines recommend limiting saturated fats to <10% of total calories.",
      "The American Heart Association recommends limiting saturated fat to <6% of calories for cardiovascular health.",
      "Prioritize monounsaturated fats (extra virgin olive oil, avocados) and Omega-3 rich cold-water fish.",
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 print:p-0 font-sans">
      {/* Mode Selector Bar */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {modesList.map((m) => {
            const Icon = m.icon;
            const isSelected = calculationMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setCalculationMode(m.id)}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl transition-all duration-200 text-left cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-md shadow-rose-500/20 font-semibold scale-[1.01]"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg ${
                    isSelected ? "bg-white/20 text-white" : "bg-rose-50 text-rose-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-semibold truncate">{m.label}</div>
                  <div className="text-[10px] opacity-80 truncate hidden lg:block">
                    {m.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Calculation & Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs Form */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm print:hidden">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">
              Personal Parameters
            </h2>

            {/* DEF-06: Bidirectional Unit System Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => handleSetUnitSystem("us")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  unitSystem === "us"
                    ? "bg-white text-rose-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                US (lbs/ft)
              </button>
              <button
                type="button"
                onClick={() => handleSetUnitSystem("metric")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  unitSystem === "metric"
                    ? "bg-white text-rose-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Metric (kg/cm)
              </button>
            </div>
          </div>

          {/* Basic Input Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Age (Years)
              </label>
              <input
                type="number"
                min={15}
                max={100}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Height & Weight Inputs */}
          {unitSystem === "us" ? (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Height (Feet)
                </label>
                <input
                  type="number"
                  min={4}
                  max={7}
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Height (Inches)
                </label>
                <input
                  type="number"
                  min={0}
                  max={11}
                  value={heightInches}
                  onChange={(e) => setHeightInches(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  min={70}
                  max={450}
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min={120}
                  max={230}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min={35}
                  max={220}
                  step={0.5}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                />
              </div>
            </div>
          )}

          {/* Activity Level & Goal Selectors */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Activity Level
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              >
                <option value="sedentary">Sedentary (office work, minimal movement)</option>
                <option value="light">Light Active (exercise 1-3 times/week)</option>
                <option value="moderate">Moderate Active (exercise 4-5 times/week)</option>
                <option value="active">Active (daily intense training / sports)</option>
                <option value="very-active">Very Active (endurance athlete / hard physical labor)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Fitness Goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as FitnessGoal)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              >
                <option value="maintain">Maintain Weight (Calorie Balance)</option>
                <option value="mild-loss">Mild Fat Loss (-250 kcal/day)</option>
                <option value="loss">Standard Fat Loss (-500 kcal/day)</option>
                <option value="extreme-loss">Rapid Fat Loss (-1000 kcal/day)</option>
                <option value="mild-gain">Lean Muscle Surplus (+250 kcal/day)</option>
                <option value="gain">Standard Bulking Surplus (+500 kcal/day)</option>
                <option value="recomp">Body Recomposition (-200 kcal/day)</option>
              </select>
            </div>
          </div>

          {/* BMR Formula Selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              BMR Formula Method
            </label>
            <select
              value={bmrFormula}
              onChange={(e) => setBmrFormula(e.target.value as BmrFormulaType)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
            >
              <option value="mifflin">Mifflin-St Jeor (Standard Clinical Baseline)</option>
              <option value="katch">Katch-McArdle (Body Fat % / Lean Mass Adjusted)</option>
              <option value="harris">Original Harris-Benedict</option>
              <option value="revised-harris">Revised Harris-Benedict</option>
              <option value="cunningham">Cunningham (Athletic LBM)</option>
            </select>
          </div>

          {/* Conditional Input: Body Fat % */}
          {(bmrFormula === "katch" || bmrFormula === "cunningham") && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Body Fat Percentage (%)
              </label>
              <input
                type="number"
                min={5}
                max={50}
                value={bodyFat}
                onChange={(e) => setBodyFat(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              />
            </div>
          )}

          {/* Conditional Input: Keto Variant */}
          {calculationMode === "keto" && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Keto Protocol Variant
              </label>
              <select
                value={ketoType}
                onChange={(e) => setKetoType(e.target.value as KetoTypeOption)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              >
                <option value="skd">Standard Keto (75% Fat, 20% Protein, 5% Carbs)</option>
                <option value="hpkd">High-Protein Keto (60% Fat, 35% Protein, 5% Carbs)</option>
                <option value="tkd">Targeted Keto (Workout Carbs Timing)</option>
                <option value="ckd">Cyclical Keto (Carb Refeed Phase)</option>
              </select>
            </div>
          )}

          {/* Conditional Input: Custom Fat Ratio */}
          {calculationMode === "custom" && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Custom Fat Allocation (% of Total Calories)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={10}
                  max={85}
                  value={customFatPercentage}
                  onChange={(e) => setCustomFatPercentage(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
                <span className="text-sm font-bold text-rose-700 w-12 text-right">
                  {customFatPercentage}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Hero Result Display & Analytics */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Hero Card */}
          <div className="bg-gradient-to-br from-rose-600 via-rose-700 to-rose-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg space-y-6 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-200 flex items-center gap-1.5">
                  <Flame className="w-4 h-4" /> Daily Dietary Fat Target
                </span>
                <div className="text-4xl sm:text-5xl font-black mt-1 tracking-tight">
                  {results.fatTargetGrams} <span className="text-2xl font-bold opacity-90">g/day</span>
                </div>
                <div className="text-xs text-rose-100 mt-1">
                  Energy Share: <span className="text-white font-bold">{results.fatTargetCalories} kcal</span> ({results.fatPercentage}% of total {results.targetCalories} kcal)
                </div>
              </div>

              <div className="text-right">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm"
                >
                  Sat Fat Limit: &lt;{results.fattyAcids.saturatedGrams}g/day
                </span>
              </div>
            </div>

            {/* Sub-Metrics Cards Grid (DEF-10: Planning Floor wording) */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-rose-100 font-semibold uppercase">Omega-3 Target</div>
                <div className="text-xl font-black text-white mt-0.5">{results.fattyAcids.omega3Grams} g</div>
                <div className="text-[10px] text-rose-100">EPA & DHA Reference</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-rose-100 font-semibold uppercase">MUFA Target</div>
                <div className="text-xl font-black text-white mt-0.5">{results.fattyAcids.mufaGrams} g</div>
                <div className="text-[10px] text-rose-100">Olive Oil / Avocado</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-rose-100 font-semibold uppercase">Planning Floor</div>
                <div className="text-xl font-black text-white mt-0.5">{results.hormoneSafetyMinGrams} g</div>
                <div className="text-[10px] text-rose-100">~0.3g/lb Planning Target</div>
              </div>
            </div>

            {/* Action Toolbar (DEF-07: Reset, DEF-09: Share) */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-4 print:hidden">
              <button
                type="button"
                onClick={() => setIsReportOpen(true)}
                className="flex items-center gap-2 bg-white text-rose-800 hover:bg-rose-50 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-rose-600" />
                Generate PDF Report
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all cursor-pointer"
                  title="Export CSV Data"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  CSV
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all cursor-pointer"
                  title="Copy Summary"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy"}
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all cursor-pointer"
                  title="Share Personalized Link"
                >
                  {shareCopied ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
                  {shareCopied ? "Link Copied!" : "Share"}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all cursor-pointer"
                  title="Reset to Canonical Baseline"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Visualizations Container */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 print:hidden">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl overflow-x-auto text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("fat-types")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "fat-types"
                    ? "bg-white text-rose-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Fatty Acid Targets
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("macros")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "macros"
                    ? "bg-white text-rose-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Macronutrient Split
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("sat-fat-limit")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "sat-fat-limit"
                    ? "bg-white text-rose-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Saturated Fat Safety Limit
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("omega-ratio")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "omega-ratio"
                    ? "bg-white text-rose-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Omega-6 to Omega-3 Ratio
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("food-search")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "food-search"
                    ? "bg-white text-rose-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Healthy Fats Database (36)
              </button>
            </div>

            {/* DEF-02: TAB 1: Independent Targets Comparative Bar Chart & Target Cards */}
            {activeTab === "fat-types" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                    Dietary Fatty Acid Target Allocation & Ceilings
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Total Fat: {results.fatTargetGrams} g/day
                  </span>
                </div>

                {/* Comparative Bar Chart */}
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fatSubTypesBarData} margin={{ top: 10, right: 20, left: -10, bottom: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis
                        dataKey="name"
                        stroke="#64748b"
                        tick={{ fill: "#475569", fontSize: 11 }}
                        interval={0}
                      />
                      <YAxis stroke="#64748b" tick={{ fill: "#475569", fontSize: 11 }} unit="g" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          borderColor: "#cbd5e1",
                          borderRadius: "12px",
                          color: "#0f172a",
                        }}
                        formatter={(val: any, name: any, item: any) => [
                          `${val} g (${item.payload.note})`,
                          item.payload.name,
                        ]}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {fatSubTypesBarData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* 4 Independent Target Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                    <div className="text-[11px] font-bold text-rose-900">Total Fat Target</div>
                    <div className="text-lg font-black text-rose-700">{results.fatTargetGrams} g</div>
                    <div className="text-[10px] text-rose-600">{results.fatPercentage}% of calories</div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="text-[11px] font-bold text-emerald-900">MUFA Target</div>
                    <div className="text-lg font-black text-emerald-700">{results.fattyAcids.mufaGrams} g</div>
                    <div className="text-[10px] text-emerald-600">~55% of dietary fat</div>
                  </div>

                  <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200">
                    <div className="text-[11px] font-bold text-cyan-900">PUFA Target</div>
                    <div className="text-lg font-black text-cyan-700">{results.fattyAcids.pufaGrams} g</div>
                    <div className="text-[10px] text-cyan-600">~25% of dietary fat</div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <div className="text-[11px] font-bold text-amber-900">Sat Fat Ceiling</div>
                    <div className="text-lg font-black text-amber-700">&lt;{results.fattyAcids.saturatedGrams} g</div>
                    <div className="text-[10px] text-amber-600">&lt;{results.fattyAcids.saturatedMaxPercent}% Total Calories</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <strong>Methodological note:</strong> MUFA and PUFA represent evidence-based dietary emphasis targets within your daily fat allocation, while the Saturated Fat Limit represents an independent upper safety ceiling based on total caloric intake. They are evaluated independently and not treated as a rigid mathematical partition.
                </div>
              </div>
            )}

            {/* TAB 2: Macronutrient Split Donut Chart */}
            {activeTab === "macros" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                    Macronutrient Energy Distribution
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Fat: 9 kcal/g | Carbs: 4 kcal/g | Protein: 4 kcal/g
                  </span>
                </div>

                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={macroPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={95}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {macroPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          borderColor: "#cbd5e1",
                          borderRadius: "12px",
                          color: "#0f172a",
                        }}
                        formatter={(val: any, name: any, item: any) => [
                          `${val} kcal (${item.payload.grams} g)`,
                          name,
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                    <div className="text-xs font-bold text-rose-900">Dietary Fat</div>
                    <div className="text-lg font-black text-rose-700">{results.fatTargetGrams} g</div>
                    <div className="text-[10px] text-rose-600">{results.fatTargetCalories} kcal ({results.fatPercentage}%)</div>
                  </div>

                  <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200">
                    <div className="text-xs font-bold text-cyan-900">Carbohydrates</div>
                    <div className="text-lg font-black text-cyan-700">{results.carbs.grams} g</div>
                    <div className="text-[10px] text-cyan-600">{results.carbs.calories} kcal ({results.carbs.percentage}%)</div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="text-xs font-bold text-emerald-900">Protein</div>
                    <div className="text-lg font-black text-emerald-700">{results.protein.grams} g</div>
                    <div className="text-[10px] text-emerald-600">{results.protein.calories} kcal ({results.protein.percentage}%)</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Saturated Fat Safety Limit Bar Chart */}
            {activeTab === "sat-fat-limit" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                    Saturated Fat Safety Threshold vs AHA Recommendation
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Calories: {results.targetCalories} kcal
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={satFatBarData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" tick={{ fill: "#475569", fontSize: 11 }} />
                      <YAxis stroke="#64748b" tick={{ fill: "#475569", fontSize: 11 }} unit="g" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          borderColor: "#cbd5e1",
                          borderRadius: "12px",
                          color: "#0f172a",
                        }}
                      />
                      <Bar dataKey="General Reference Limit (<10%)" fill="#e11d48" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="AHA Heart Health Ceiling (<6%)" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
                  <div className="font-bold text-slate-900">Clinical Guidelines Summary:</div>
                  <p>
                    • <strong>Dietary Guidelines for Americans / WHO:</strong> General planning reference recommends limiting saturated fat intake to less than 10% of total calories (<span className="font-bold">{generalSatGrams}g</span> for {results.targetCalories} kcal).
                  </p>
                  <p>
                    • <strong>American Heart Association (AHA):</strong> Recommends limiting saturated fat to less than 6% of total calories (<span className="font-bold">{ahaSatGrams}g</span> for {results.targetCalories} kcal), particularly within a heart-healthy dietary pattern to support optimal LDL cholesterol and cardiovascular health.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: Omega-6 to Omega-3 Ratio */}
            {activeTab === "omega-ratio" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                    Omega-6 to Omega-3 Balance
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Optimal: 1:1 to 4:1</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <div className="text-xs font-bold text-amber-900">Typical Western Diet Ratio</div>
                    <div className="text-3xl font-black text-amber-700 mt-1">16:1</div>
                    <div className="text-[11px] text-amber-600 mt-1">Excessive high-heat seed oils</div>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="text-xs font-bold text-emerald-900">Target Anti-Inflammatory Ratio</div>
                    <div className="text-3xl font-black text-emerald-700 mt-1">4:1 or lower</div>
                    <div className="text-[11px] text-emerald-600 mt-1">Wild salmon, sardines, flaxseeds</div>
                  </div>
                </div>

                <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 text-xs text-slate-700 leading-relaxed">
                  Your daily Omega-3 adequate intake baseline is <strong>{results.fattyAcids.omega3Grams}g</strong> (IOM adult reference). Aim to incorporate cold-water fatty fish (salmon, mackerel, sardines) or algae/fish oil supplements to balance high Omega-6 intake from vegetable seed oils.
                </div>
              </div>
            )}

            {/* DEF-04: TAB 5: Searchable Healthy Fats Database (36 Items, All 7 Categories) */}
            {activeTab === "food-search" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search 36 healthy fat foods (e.g. olive oil, salmon, ribeye)..."
                      value={foodQuery}
                      onChange={(e) => setFoodQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                    />
                  </div>

                  {foodQuery && (
                    <button
                      type="button"
                      onClick={() => setFoodQuery("")}
                      className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer px-2"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* 7 Category Selector Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                  {[
                    "All",
                    "Oils & Fats",
                    "Nuts & Seeds",
                    "Seafood & Fish",
                    "Dairy & Eggs",
                    "Avocados & Fruits",
                    "Meat & Poultry",
                    "Processed & Snacks",
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFoodCategoryTab(cat)}
                      className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                        foodCategoryTab === cat
                          ? "bg-rose-600 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Food Table */}
                <div className="overflow-x-auto max-h-72 border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 font-bold sticky top-0 uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5">Food Item</th>
                        <th className="p-2.5">Category</th>
                        <th className="p-2.5">Serving</th>
                        <th className="p-2.5">Total Fat</th>
                        <th className="p-2.5">Sat Fat</th>
                        <th className="p-2.5">MUFA</th>
                        <th className="p-2.5">Calories</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredFoods.length > 0 ? (
                        filteredFoods.map((food) => (
                          <tr key={food.id} className="hover:bg-slate-50">
                            <td className="p-2.5 font-bold text-slate-900">{food.name}</td>
                            <td className="p-2.5 text-slate-500">{food.category}</td>
                            <td className="p-2.5">{food.servingSize}</td>
                            <td className="p-2.5 font-bold text-rose-600">{food.totalFat} g</td>
                            <td className="p-2.5 text-slate-600">{food.saturatedFat} g</td>
                            <td className="p-2.5 text-emerald-700 font-medium">{food.mufa} g</td>
                            <td className="p-2.5 font-medium">{food.calories} kcal</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="p-4 text-center text-slate-500">
                            No foods found matching &ldquo;{foodQuery}&rdquo; in category {foodCategoryTab}.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Smart Insights & Lipid Strategy */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 print:hidden">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600" /> Smart Insights &amp; Lipid Strategy
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {results.insights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* PDF Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        reportData={reportData}
      />
    </div>
  );
}

export default FatIntakeCalculator;
