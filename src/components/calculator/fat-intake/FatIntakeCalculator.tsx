"use client";

import React, { useState, useMemo } from "react";
import {
  Flame,
  Activity,
  Sparkles,
  Heart,
  Scale,
  Apple,
  Search,
  Download,
  Printer,
  Copy,
  Info,
  CheckCircle2,
  Sliders,
  TrendingUp,
  FileSpreadsheet,
  Zap,
  Award,
  Layers,
  Utensils,
  ChevronRight,
  PieChart as PieIcon,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
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
  const [weightKg, setWeightKg] = useState<number>(72);

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
    | "omega-ratio"
    | "sat-fat-limit"
    | "fat-range"
    | "food-search"
    | "age-matrix"
    | "diet-comparison"
  >("fat-types");

  // Modal & Copy State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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

  // Modes Configuration
  const modesList: { id: FatCalculationMode; label: string; icon: any; desc: string }[] = [
    { id: "daily", label: "Daily Baseline", icon: Flame, desc: "AMDR 25% fat standard" },
    { id: "loss", label: "Weight Loss Fat", icon: Scale, desc: "22% low-fat deficit" },
    { id: "gain", label: "Weight Gain Fat", icon: TrendingUp, desc: "32% energy surplus" },
    { id: "maintenance", label: "Maintenance", icon: Activity, desc: "28% energy balance" },
    { id: "athlete", label: "Athlete Fat Target", icon: Zap, desc: "22% high carb priority" },
    { id: "heart-health", label: "Heart Health Mode", icon: Heart, desc: "Sat fat <7% AHA limit" },
    { id: "keto", label: "Keto Fat Calculator", icon: Sparkles, desc: "75% fat for ketosis" },
    { id: "low-fat", label: "Low Fat Diet", icon: ShieldCheck, desc: "18% strict low fat" },
    { id: "bodybuilding", label: "Bodybuilder Minimum", icon: Award, desc: "0.35g/lb hormone minimum" },
    { id: "custom", label: "Custom Ratio", icon: Sliders, desc: "Custom fat ratio builder" },
  ];

  // Pie Chart Data: Fat Sub-Types
  const fatSubTypesPieData = [
    { name: "Monounsaturated (MUFA)", value: results.fattyAcids.mufaGrams, color: "#10b981" },
    { name: "Polyunsaturated (PUFA)", value: results.fattyAcids.pufaGrams, color: "#06b6d4" },
    { name: "Saturated Fat", value: results.fattyAcids.saturatedGrams, color: "#e11d48" },
  ];

  // Pie Chart Data: Macro Energy Split
  const macroPieData = [
    { name: "Fat", value: results.fatTargetCalories, grams: results.fatTargetGrams, color: "#e11d48" },
    { name: "Carbohydrates", value: results.carbs.calories, grams: results.carbs.grams, color: "#06b6d4" },
    { name: "Protein", value: results.protein.calories, grams: results.protein.grams, color: "#10b981" },
  ];

  // Saturated Fat Bar Data
  const satFatBarData = [
    { name: "Saturated Fat (g)", "Actual Target": results.fattyAcids.saturatedGrams, "AHA Max Limit": Math.round((results.targetCalories * 0.07) / 9) },
  ];

  // Filtered Food Database Items
  const filteredFoods = useMemo(() => {
    return results.foodDatabase.filter((item) => {
      const matchesCategory = foodCategoryTab === "All" || item.category === foodCategoryTab;
      const matchesQuery = item.name.toLowerCase().includes(foodQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [results.foodDatabase, foodCategoryTab, foodQuery]);

  // CSV Export Handler
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Parameter,Value\n";
    csvContent += `Mode,${results.mode}\n`;
    csvContent += `BMR Formula,${results.formulaUsed}\n`;
    csvContent += `Daily Target Calories,${results.targetCalories} kcal\n`;
    csvContent += `Daily Fat Target,${results.fatTargetGrams} g (${results.fatTargetCalories} kcal / ${results.fatPercentage}% of calories)\n`;
    csvContent += `Saturated Fat Limit,${results.fattyAcids.saturatedGrams} g max (<${results.fattyAcids.saturatedMaxPercent}% calories)\n`;
    csvContent += `Hormone Safety Minimum,${results.hormoneSafetyMinGrams} g\n\n`;

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

  // Copy Summary Handler
  const handleCopy = () => {
    const summaryText = `Fat Intake Calculator Results:\n• Daily Fat Target: ${results.fatTargetGrams}g (${results.fatTargetCalories} kcal | ${results.fatPercentage}% of calories)\n• Saturated Fat Limit: ${results.fattyAcids.saturatedGrams}g max (<${results.fattyAcids.saturatedMaxPercent}% calories)\n• Omega-3 Target: ${results.fattyAcids.omega3Grams}g/day | Omega-6:Omega-3 Ratio: ${results.fattyAcids.omegaRatio}:1\n• Hormone Safety Minimum: ${results.hormoneSafetyMinGrams}g/day\n• Target Calories: ${results.targetCalories} kcal/day | TDEE: ${results.tdee} kcal\nCalculated at Calculator Platform.`;
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
        label: "Saturated Fat Limit",
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
        label: "Hormone Safety Minimum",
        value: `${results.hormoneSafetyMinGrams} g`,
        subtitle: "0.3g fat per lb body weight",
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
        title: "Fatty Acid Sub-Type Breakdown & Lipid Safety",
        items: [
          { label: "Monounsaturated Fat (MUFA)", value: `${results.fattyAcids.mufaGrams} g` },
          { label: "Polyunsaturated Fat (PUFA)", value: `${results.fattyAcids.pufaGrams} g` },
          { label: "Omega-3 Fatty Acids (EPA/DHA)", value: `${results.fattyAcids.omega3Grams} g` },
          { label: "Omega-6 Fatty Acids", value: `${results.fattyAcids.omega6Grams} g` },
          { label: "Trans Fat Safe Limit", value: `${results.fattyAcids.transFatLimitGrams} g (Zero)` },
          { label: "Dietary Cholesterol Limit", value: `< ${results.fattyAcids.cholesterolLimitMg} mg/day` },
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
      "Limit saturated fats to <10% of total calories (<7% for heart risk reduction).",
      "Prioritize monounsaturated fats (extra virgin olive oil, avocados) and Omega-3 rich wild fish.",
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 print:p-0 font-sans">
      {/* Light Theme Mode Selector Bar */}
      <div className="bg-white/90 backdrop-blur-md p-2.5 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {modesList.map((m) => {
            const Icon = m.icon;
            const isSelected = calculationMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setCalculationMode(m.id)}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl transition-all duration-200 text-left ${
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

      {/* Main Calculation & Inputs Grid (Light Theme) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs Form */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm print:hidden">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">Personal Parameters
            </h2>
            
            {/* Unit System Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setUnitSystem("us")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  unitSystem === "us"
                    ? "bg-white text-rose-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                US (lbs/ft)
              </button>
              <button
                onClick={() => setUnitSystem("metric")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
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
                max={80}
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
                  max={400}
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
                  max={220}
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
                  max={200}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                />
              </div>
            </div>
          )}

          {/* Activity & Goal Selection */}
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Activity Level
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              >
                <option value="sedentary">Sedentary (desk job, little exercise)</option>
                <option value="light">Light Active (exercise 1-3 times/week)</option>
                <option value="moderate">Moderate Active (exercise 4-5 times/week)</option>
                <option value="active">Active (exercise 6-7 times/week)</option>
                <option value="very-active">Very Active (2+ hrs intense exercise daily)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fitness Goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as FitnessGoal)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
              >
                <option value="maintain">Maintain Weight</option>
                <option value="mild-loss">Mild Weight Loss (-0.5 lb/week)</option>
                <option value="loss">Weight Loss (-1.0 lb/week)</option>
                <option value="extreme-loss">Extreme Weight Loss (-2.0 lb/week)</option>
                <option value="mild-gain">Mild Weight Gain (+0.5 lb/week)</option>
                <option value="gain">Weight Gain (+1.0 lb/week)</option>
                <option value="extreme-gain">Fast Muscle Gain (+2.0 lb/week)</option>
                <option value="recomp">Body Recomposition (-200 kcal)</option>
              </select>
            </div>
          </div>

          {/* Conditional Keto & Custom Options */}
          {calculationMode === "keto" && (
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <label className="block text-xs font-bold text-slate-800">
                Keto Protocol Variant
              </label>
              <select
                value={ketoType}
                onChange={(e) => setKetoType(e.target.value as KetoTypeOption)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="skd">Standard Keto (75% Fat, 20% Protein, 5% Carbs)</option>
                <option value="hpkd">High-Protein Keto (60% Fat, 35% Protein, 5% Carbs)</option>
                <option value="tkd">Targeted Keto (TKD - Pre-workout carb allocation)</option>
                <option value="ckd">Cyclical Keto (CKD - 5 days keto / 2 days carb refeed)</option>
              </select>
            </div>
          )}

          {calculationMode === "custom" && (
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <label className="block text-xs font-bold text-slate-800">
                Custom Fat Percentage (% of Daily Calories): <span className="text-rose-600 font-extrabold">{customFatPercentage}%</span>
              </label>
              <input
                type="range"
                min={15}
                max={80}
                value={customFatPercentage}
                onChange={(e) => setCustomFatPercentage(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Right Column: Sticky Results & Interactive Visualizations */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Highlights Hero Card */}
          <div className="bg-gradient-to-br from-rose-600 via-rose-700 to-pink-800 p-6 rounded-2xl text-white shadow-xl shadow-rose-600/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-rose-100 font-bold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
                  Daily Dietary Fat Target
                </div>
                <div className="text-3xl lg:text-4xl font-extrabold text-white mt-1">
                  {results.fatTargetGrams} <span className="text-lg font-normal text-rose-100">g/day</span>
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

            {/* Sub-Metrics Cards Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-rose-100 font-semibold uppercase">Omega-3 Target</div>
                <div className="text-xl font-black text-white mt-0.5">{results.fattyAcids.omega3Grams} g</div>
                <div className="text-[10px] text-rose-100">EPA & DHA Fish Oil</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-rose-100 font-semibold uppercase">MUFA Target</div>
                <div className="text-xl font-black text-white mt-0.5">{results.fattyAcids.mufaGrams} g</div>
                <div className="text-[10px] text-rose-100">Olive Oil / Avocado</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-rose-100 font-semibold uppercase">Hormone Minimum</div>
                <div className="text-xl font-black text-white mt-0.5">{results.hormoneSafetyMinGrams} g</div>
                <div className="text-[10px] text-rose-100">0.3g/lb Body Weight</div>
              </div>
            </div>

            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-4 print:hidden">
              <button
                onClick={() => setIsReportOpen(true)}
                className="flex items-center gap-2 bg-white text-rose-800 hover:bg-rose-50 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all"
              >
                <Download className="w-4 h-4 text-rose-600" />
                Generate PDF Report
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all"
                  title="Export CSV Data"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  CSV
                </button>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all"
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
                onClick={() => setActiveTab("fat-types")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "fat-types"
                    ? "bg-white text-rose-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Fat Sub-Types Breakdown
              </button>

              <button
                onClick={() => setActiveTab("macros")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "macros"
                    ? "bg-white text-rose-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Macronutrient Split
              </button>

              <button
                onClick={() => setActiveTab("sat-fat-limit")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "sat-fat-limit"
                    ? "bg-white text-rose-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Saturated Fat Safety Limit
              </button>

              <button
                onClick={() => setActiveTab("omega-ratio")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "omega-ratio"
                    ? "bg-white text-rose-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Omega-6 to Omega-3 Ratio
              </button>

              <button
                onClick={() => setActiveTab("food-search")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "food-search"
                    ? "bg-white text-rose-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Search Healthy Fats Database
              </button>
            </div>

            {/* TAB 1: Fat Sub-Types Breakdown Donut Chart */}
            {activeTab === "fat-types" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Fatty Acid Sub-Type Target Allocation
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Total: {results.fatTargetGrams} g/day</span>
                </div>

                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={fatSubTypesPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={95}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {fatSubTypesPieData.map((entry, index) => (
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
                        formatter={(val: any, name: any) => [`${val} g`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="text-xs font-bold text-emerald-900">Monounsaturated (MUFA)</div>
                    <div className="text-lg font-black text-emerald-700">{results.fattyAcids.mufaGrams} g</div>
                    <div className="text-[10px] text-emerald-600">Olive oil & Avocados</div>
                  </div>

                  <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200">
                    <div className="text-xs font-bold text-cyan-900">Polyunsaturated (PUFA)</div>
                    <div className="text-lg font-black text-cyan-700">{results.fattyAcids.pufaGrams} g</div>
                    <div className="text-[10px] text-cyan-600">Omega-3 & Omega-6</div>
                  </div>

                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                    <div className="text-xs font-bold text-rose-900">Saturated Fat Limit</div>
                    <div className="text-lg font-black text-rose-700">{results.fattyAcids.saturatedGrams} g</div>
                    <div className="text-[10px] text-rose-600">&lt;{results.fattyAcids.saturatedMaxPercent}% Calories</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Macronutrient Split Donut Chart */}
            {activeTab === "macros" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Macronutrient Energy Distribution
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Fat: 9 kcal/g | Carbs: 4 kcal/g | Protein: 4 kcal/g</span>
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
                        formatter={(val: any, name: any) => [`${val} kcal`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                    <div className="text-xs font-bold text-rose-900">Fat Target</div>
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

            {/* TAB 3: Saturated Fat Safety Limit */}
            {activeTab === "sat-fat-limit" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Saturated Fat Safety Threshold vs AHA Recommendation
                  </h3>
                </div>

                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={satFatBarData}>
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
                      />
                      <Bar dataKey="Actual Target" fill="#e11d48" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="AHA Max Limit" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* TAB 4: Omega-6 to Omega-3 Ratio Scale */}
            {activeTab === "omega-ratio" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Omega-6 to Omega-3 Dietary Ratio Analysis
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Optimal: 1:1 to 4:1</span>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-emerald-700">Target Ratio: {results.fattyAcids.omegaRatio} : 1</span>
                    <span className="text-slate-500 text-xs">Standard Western Diet: 16 : 1</span>
                  </div>

                  <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-500 h-full w-[25%]" title="Optimal (1:1 - 4:1)"></div>
                    <div className="bg-amber-400 h-full w-[35%]" title="Moderate (5:1 - 10:1)"></div>
                    <div className="bg-rose-500 h-full w-[40%]" title="High Inflammation (> 10:1)"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <div className="font-bold text-slate-900">Daily Omega-3 Target</div>
                      <div className="text-lg font-black text-cyan-700">{results.fattyAcids.omega3Grams} g</div>
                      <div className="text-[10px] text-slate-500">EPA / DHA from wild salmon & fish oil</div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <div className="font-bold text-slate-900">Daily Omega-6 Target</div>
                      <div className="text-lg font-black text-purple-700">{results.fattyAcids.omega6Grams} g</div>
                      <div className="text-[10px] text-slate-500">Linoleic acid from seeds & nuts</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: Searchable Healthy Fats Food Database Module */}
            {activeTab === "food-search" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Healthy Fats Food Database (Search & Fatty Acid Breakdown)
                  </h3>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search healthy fat food..."
                      value={foodQuery}
                      onChange={(e) => setFoodQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
                  {["All", "Oils & Fats", "Nuts & Seeds", "Seafood & Fish", "Avocados & Fruits", "Dairy & Eggs", "Processed & Snacks"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFoodCategoryTab(cat)}
                      className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                        foodCategoryTab === cat
                          ? "bg-rose-600 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Food Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-xl max-h-72">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 uppercase font-bold sticky top-0">
                      <tr>
                        <th className="p-3">Food Item</th>
                        <th className="p-3">Serving Size</th>
                        <th className="p-3">Total Fat</th>
                        <th className="p-3">Saturated Fat</th>
                        <th className="p-3">MUFA</th>
                        <th className="p-3">PUFA</th>
                        <th className="p-3">Omega-3</th>
                        <th className="p-3">Calories</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredFoods.map((item) => (
                        <tr key={item.id} className="hover:bg-rose-50/40">
                          <td className="p-3 font-bold text-slate-900">{item.name}</td>
                          <td className="p-3 text-slate-600">{item.servingSize}</td>
                          <td className="p-3 font-bold text-rose-700">{item.totalFat} g</td>
                          <td className="p-3 font-bold text-amber-700">{item.saturatedFat} g</td>
                          <td className="p-3 text-emerald-700 font-bold">{item.mufa} g</td>
                          <td className="p-3 text-cyan-700 font-bold">{item.pufa} g</td>
                          <td className="p-3 text-purple-700 font-bold">{item.omega3} g</td>
                          <td className="p-3 text-slate-900">{item.calories} kcal</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Smart Insights & Personalized Recommendations */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 print:hidden">
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Smart Insights & Lipid Optimization Strategy
            </h3>

            <div className="space-y-2.5">
              {results.insights.map((ins, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{ins}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PDF Report Modal */}
      {isReportOpen && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          data={reportData}
        />
      )}
    </div>
  );
}

export default FatIntakeCalculator;
