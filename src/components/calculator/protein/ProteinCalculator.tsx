"use client";

import React, { useState, useMemo } from "react";
import {
  Dumbbell,
  Activity,
  Sparkles,
  Flame,
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
  Baby,
  Utensils,
  ChevronRight,
  PieChart as PieIcon,
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
import { calculateProteinCalculator } from "@/app/calculators/protein-calculator/calculator";
import {
  ProteinCalculationMode,
  UnitSystem,
  Gender,
  ActivityLevel,
  FitnessGoal,
  BmrFormulaType,
  PregnancyStatusType,
} from "@/app/calculators/protein-calculator/types";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function ProteinCalculator() {
  // Mode & Unit State
  const [calculationMode, setCalculationMode] = useState<ProteinCalculationMode>("daily");
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
  const [pregnancyStatus, setPregnancyStatus] = useState<PregnancyStatusType>("none");
  const [mealFrequency, setMealFrequency] = useState<number>(4);

  // Searchable Food Database State
  const [foodQuery, setFoodQuery] = useState<string>("");
  const [foodCategoryTab, setFoodCategoryTab] = useState<string>("All");

  // Active View Tab
  const [activeTab, setActiveTab] = useState<
    | "distribution"
    | "per-meal"
    | "rda-comparison"
    | "eaa-profile"
    | "pregnancy-matrix"
    | "food-search"
    | "diet-comparison"
    | "body-comp"
  >("distribution");

  // Modal & Copy State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Results Calculation Memo
  const results = useMemo(() => {
    return calculateProteinCalculator({
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
      pregnancyStatus,
      mealFrequency,
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
    pregnancyStatus,
    mealFrequency,
  ]);

  // Modes Configuration
  const modesList: { id: ProteinCalculationMode; label: string; icon: any; desc: string }[] = [
    { id: "daily", label: "Daily Baseline", icon: Dumbbell, desc: "RDA & fitness baseline (1.4g/kg)" },
    { id: "hypertrophy", label: "Muscle Building", icon: Zap, desc: "Optimal hypertrophy (2.0g/kg)" },
    { id: "cutting", label: "Fat Loss / Cutting", icon: Scale, desc: "Preserve lean mass (2.4g/kg)" },
    { id: "maintenance", label: "Maintenance", icon: Activity, desc: "Equilibrium (1.4g/kg)" },
    { id: "pregnancy", label: "Pregnancy & Lactation", icon: Baby, desc: "Trimester protein additions" },
    { id: "senior", label: "Senior Sarcopenia", icon: Award, desc: "Healthy aging protection (1.4g/kg)" },
    { id: "endurance", label: "Endurance Athlete", icon: TrendingUp, desc: "Aerobic tissue repair (1.6g/kg)" },
    { id: "strength", label: "Strength Athlete", icon: Flame, desc: "Powerlifting target (2.2g/kg)" },
    { id: "vegan", label: "Plant-Based / Vegan", icon: Apple, desc: "+10% digestibility buffer (1.8g/kg)" },
    { id: "custom", label: "Custom Builder", icon: Sliders, desc: "Custom g/kg target builder" },
  ];

  // Pie Chart Data
  const macroPieData = [
    { name: "Protein", value: results.proteinCalories, grams: results.proteinTargetGrams, color: "#10b981" },
    { name: "Carbohydrates", value: results.carbs.calories, grams: results.carbs.grams, color: "#06b6d4" },
    { name: "Fat", value: results.fat.calories, grams: results.fat.grams, color: "#8b5cf6" },
  ];

  // RDA vs Target Bar Data
  const rdaBarData = [
    { name: "Daily Target", "RDA Minimum (0.8g/kg)": results.rdaMinimumGrams, "Optimal Fitness Target": results.proteinTargetGrams },
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
    csvContent += `Daily Protein Target,${results.proteinTargetGrams} g (${results.proteinGramsPerLb} g/lb / ${results.proteinGramsPerKg} g/kg)\n`;
    csvContent += `Per Meal Protein Target,${results.perMealProteinGrams} g/meal (${results.leucineTargetPerMeal}g Leucine)\n`;
    csvContent += `RDA Minimum,${results.rdaMinimumGrams} g\n\n`;

    csvContent += "Food Item,Category,Serving Size,Protein (g),Calories (kcal),Protein Quality,Leucine Content (g)\n";
    results.foodDatabase.forEach((food) => {
      csvContent += `"${food.name}",${food.category},"${food.servingSize}",${food.protein},${food.calories},${food.qualityType},${food.leucineContent}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `protein_plan_${results.proteinTargetGrams}g.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Summary Handler
  const handleCopy = () => {
    const summaryText = `Protein Calculator Results:\n• Daily Protein Target: ${results.proteinTargetGrams}g (${results.proteinGramsPerLb}g/lb | ${results.proteinGramsPerKg}g/kg)\n• Per-Meal Target: ${results.perMealProteinGrams}g/meal across ${mealFrequency} meals (~${results.leucineTargetPerMeal}g Leucine)\n• RDA Minimum: ${results.rdaMinimumGrams}g/day\n• Target Calories: ${results.targetCalories} kcal/day | TDEE: ${results.tdee} kcal\nCalculated at Calculator Platform.`;
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
      calculatorName: "Professional Protein Calculator & Muscle Suite",
      reportTitle: "Clinical Protein & Amino Acid Assessment Report",
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
        label: "Daily Protein Target",
        value: `${results.proteinTargetGrams} g`,
        subtitle: `${results.proteinGramsPerLb} g/lb (${results.proteinGramsPerKg} g/kg)`,
        colorTheme: "emerald",
      },
      {
        label: "Per-Meal Target",
        value: `${results.perMealProteinGrams} g`,
        subtitle: `${results.leucineTargetPerMeal}g Leucine per meal`,
        colorTheme: "cyan",
      },
      {
        label: "RDA Minimum Baseline",
        value: `${results.rdaMinimumGrams} g`,
        subtitle: "0.8 g/kg body weight",
        colorTheme: "amber",
      },
      {
        label: "Target Calories",
        value: `${results.targetCalories} kcal`,
        subtitle: `TDEE: ${results.tdee} kcal`,
        colorTheme: "rose",
      },
    ],
    sections: [
      {
        title: "Personal Metrics & Energy Expenditure",
        items: [
          { label: "Unit System", value: unitSystem.toUpperCase() },
          { label: "Calculation Mode", value: calculationMode.toUpperCase() },
          { label: "Age & Gender", value: `${age} yrs (${gender.toUpperCase()})` },
          { label: "Activity Level", value: activityLevel.toUpperCase() },
          { label: "BMR Formula Used", value: results.formulaUsed },
          { label: "Basal Metabolic Rate (BMR)", value: `${results.bmr} kcal` },
          { label: "Total Energy Expenditure (TDEE)", value: `${results.tdee} kcal` },
          { label: "Pregnancy / Lactation Addition", value: results.pregnancyAdjustment.label },
        ],
      },
      {
        title: "Body Composition & Amino Acid Metrics",
        items: [
          { label: "Body Fat Percentage", value: `${results.bodyComposition.bodyFatPct}%` },
          { label: "Lean Body Mass (LBM)", value: `${results.bodyComposition.leanBodyMassLbs} lbs` },
          { label: "Fat-Free Mass Index (FFMI)", value: results.bodyComposition.ffmi },
          { label: "Body Mass Index (BMI)", value: results.bodyComposition.bmi },
          { label: "Meal Frequency Spacing", value: `${mealFrequency} meals / day` },
          { label: "Health & Muscle Score", value: `${results.bodyComposition.healthScore}%` },
        ],
      },
    ],
    recommendation: {
      title: "Personalized Anabolic & Muscle Strategy",
      text: results.insights[0] || "Maintain consistent protein distribution.",
      reasons: results.recommendations,
      score: results.bodyComposition.healthScore,
      rating: "Optimal Anabolic Threshold",
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
        { macro: "Protein", grams: `${results.proteinTargetGrams} g`, calories: `${results.proteinCalories} kcal`, percentage: `${results.proteinPercentage}%` },
        { macro: "Carbohydrates", grams: `${results.carbs.grams} g`, calories: `${results.carbs.calories} kcal`, percentage: `${results.carbs.percentage}%` },
        { macro: "Fat", grams: `${results.fat.grams} g`, calories: `${results.fat.calories} kcal`, percentage: `${results.fat.percentage}%` },
      ],
    },
    notes: [
      "Leucine trigger (~2.5g–3.5g per meal) activates Muscle Protein Synthesis (MPS) via the mTORC1 pathway.",
      "Distribute daily protein evenly across 3 to 5 meals separated by 3 to 4 hours.",
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
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20 font-semibold scale-[1.01]"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg ${
                    isSelected ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-600"
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
                    ? "bg-white text-emerald-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                US (lbs/ft)
              </button>
              <button
                onClick={() => setUnitSystem("metric")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  unitSystem === "metric"
                    ? "bg-white text-emerald-700 shadow-xs"
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
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
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
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
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
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
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
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
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
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
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
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
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
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
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
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                <option value="maintain">Maintain Weight</option>
                <option value="mild-loss">Mild Weight Loss (-0.5 lb/week)</option>
                <option value="loss">Weight Loss (-1.0 lb/week)</option>
                <option value="extreme-loss">Extreme Weight Loss (-2.0 lb/week)</option>
                <option value="mild-gain">Mild Lean Bulk (+0.5 lb/week)</option>
                <option value="gain">Weight Gain (+1.0 lb/week)</option>
                <option value="extreme-gain">Fast Muscle Gain (+2.0 lb/week)</option>
                <option value="recomp">Body Recomposition (-200 kcal)</option>
              </select>
            </div>
          </div>

          {/* Pregnancy & Meal Spacing Inputs */}
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Special Additions & Meal Frequency
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Pregnancy / Lactation
                </label>
                <select
                  value={pregnancyStatus}
                  onChange={(e) => setPregnancyStatus(e.target.value as PregnancyStatusType)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                >
                  <option value="none">Not Applicable</option>
                  <option value="t1">Trimester 1 (+1g/day)</option>
                  <option value="t2">Trimester 2 (+10g/day)</option>
                  <option value="t3">Trimester 3 (+31g/day)</option>
                  <option value="lactation-1">Lactation 0-6m (+19g/day)</option>
                  <option value="lactation-2">Lactation 6m+ (+13g/day)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Meal Frequency: <span className="text-emerald-700 font-bold">{mealFrequency} meals</span>
                </label>
                <input
                  type="range"
                  min={3}
                  max={6}
                  value={mealFrequency}
                  onChange={(e) => setMealFrequency(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Results & Interactive Visualizations */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Highlights Hero Card */}
          <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-6 rounded-2xl text-white shadow-xl shadow-emerald-600/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-emerald-100 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  Daily Protein Target
                </div>
                <div className="text-3xl lg:text-4xl font-extrabold text-white mt-1">
                  {results.proteinTargetGrams} <span className="text-lg font-normal text-emerald-100">g/day</span>
                </div>
                <div className="text-xs text-emerald-100 mt-1">
                  Ratio: <span className="text-white font-bold">{results.proteinGramsPerLb} g/lb</span> ({results.proteinGramsPerKg} g/kg) | {results.proteinCalories} kcal ({results.proteinPercentage}%)
                </div>
              </div>

              <div className="text-right">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm"
                >
                  RDA Min: {results.rdaMinimumGrams}g/day
                </span>
              </div>
            </div>

            {/* Sub-Metrics Cards Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-emerald-100 font-semibold uppercase">Per-Meal Target</div>
                <div className="text-xl font-black text-white mt-0.5">{results.perMealProteinGrams} g</div>
                <div className="text-[10px] text-emerald-100">{mealFrequency} meals / day</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-emerald-100 font-semibold uppercase">Leucine Target</div>
                <div className="text-xl font-black text-white mt-0.5">{results.leucineTargetPerMeal} g</div>
                <div className="text-[10px] text-emerald-100">MPS Anabolic Trigger</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-emerald-100 font-semibold uppercase">Target Calories</div>
                <div className="text-xl font-black text-white mt-0.5">{results.targetCalories} kcal</div>
                <div className="text-[10px] text-emerald-100">TDEE: {results.tdee} kcal</div>
              </div>
            </div>

            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-4 print:hidden">
              <button
                onClick={() => setIsReportOpen(true)}
                className="flex items-center gap-2 bg-white text-emerald-800 hover:bg-emerald-50 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all"
              >
                <Download className="w-4 h-4 text-emerald-600" />
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
                onClick={() => setActiveTab("distribution")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "distribution"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Protein Energy Split
              </button>

              <button
                onClick={() => setActiveTab("per-meal")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "per-meal"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Per-Meal Timeline & Leucine
              </button>

              <button
                onClick={() => setActiveTab("rda-comparison")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "rda-comparison"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                RDA vs Fitness Target
              </button>

              <button
                onClick={() => setActiveTab("eaa-profile")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "eaa-profile"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                9 Essential Amino Acids
              </button>

              <button
                onClick={() => setActiveTab("food-search")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "food-search"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Search Protein Food Database
              </button>
            </div>

            {/* TAB 1: Protein Energy Split Donut Chart */}
            {activeTab === "distribution" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Macronutrient Energy Distribution
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Protein: 4 kcal/g | Carbs: 4 kcal/g | Fat: 9 kcal/g</span>
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
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="text-xs font-bold text-emerald-900">Protein</div>
                    <div className="text-lg font-black text-emerald-700">{results.proteinTargetGrams} g</div>
                    <div className="text-[10px] text-emerald-600">{results.proteinCalories} kcal ({results.proteinPercentage}%)</div>
                  </div>

                  <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200">
                    <div className="text-xs font-bold text-cyan-900">Carbohydrates</div>
                    <div className="text-lg font-black text-cyan-700">{results.carbs.grams} g</div>
                    <div className="text-[10px] text-cyan-600">{results.carbs.calories} kcal ({results.carbs.percentage}%)</div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="text-xs font-bold text-purple-900">Fat</div>
                    <div className="text-lg font-black text-purple-700">{results.fat.grams} g</div>
                    <div className="text-[10px] text-purple-600">{results.fat.calories} kcal ({results.fat.percentage}%)</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Per Meal Timeline & Leucine Trigger */}
            {activeTab === "per-meal" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Per-Meal Protein & Leucine Anabolic Spacing
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Target: {mealFrequency} meals spaced 3-4 hrs apart</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Array.from({ length: mealFrequency }).map((_, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="text-xs font-bold text-slate-900">Meal {idx + 1}</div>
                      <div className="text-xl font-extrabold text-emerald-700">{results.perMealProteinGrams} g</div>
                      <div className="text-[10px] text-slate-500 font-semibold">
                        Leucine: <span className="text-emerald-700">{results.leucineTargetPerMeal}g</span>
                      </div>
                      <div className="text-[9px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        ✓ Triggers MPS Anabolism
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: RDA Minimum vs Fitness Target */}
            {activeTab === "rda-comparison" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">RDA Minimum (0.8g/kg) vs Fitness Target Comparison
                  </h3>
                </div>

                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rdaBarData}>
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
                      <Bar dataKey="RDA Minimum (0.8g/kg)" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="Optimal Fitness Target" fill="#10b981" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* TAB 4: 9 Essential Amino Acids */}
            {activeTab === "eaa-profile" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">9 Essential Amino Acids (EAAs) Daily Profile
                </h3>

                <div className="overflow-x-auto border border-slate-200 rounded-xl max-h-64">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 uppercase font-bold sticky top-0">
                      <tr>
                        <th className="p-3">Amino Acid</th>
                        <th className="p-3">Estimated Target (g)</th>
                        <th className="p-3">Biological Function</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {results.eaaProfile.map((eaa) => (
                        <tr key={eaa.aminoAcid} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900">{eaa.aminoAcid}</td>
                          <td className="p-3 font-bold text-emerald-700">{eaa.targetGrams} g</td>
                          <td className="p-3 text-slate-600">{eaa.functionDesc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 5: Searchable High-Protein Food Database Module */}
            {activeTab === "food-search" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">High-Protein Food Database (Search & Quality Type)
                  </h3>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search food item..."
                      value={foodQuery}
                      onChange={(e) => setFoodQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
                  {["All", "Meat & Poultry", "Seafood", "Dairy & Eggs", "Vegan Complete", "Plant Incomplete"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFoodCategoryTab(cat)}
                      className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                        foodCategoryTab === cat
                          ? "bg-emerald-600 text-white shadow-xs"
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
                        <th className="p-3">Protein</th>
                        <th className="p-3">Calories</th>
                        <th className="p-3">Protein Quality</th>
                        <th className="p-3">Leucine</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredFoods.map((item) => (
                        <tr key={item.id} className="hover:bg-emerald-50/40">
                          <td className="p-3 font-bold text-slate-900">{item.name}</td>
                          <td className="p-3 text-slate-600">{item.servingSize}</td>
                          <td className="p-3 font-bold text-emerald-700">{item.protein} g</td>
                          <td className="p-3 text-slate-900">{item.calories} kcal</td>
                          <td className="p-3 font-bold">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] ${
                                item.qualityType === "Complete Protein"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                  : "bg-amber-100 text-amber-800 border border-amber-300"
                              }`}
                            >
                              {item.qualityType}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-900">{item.leucineContent} g</td>
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
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Smart Insights & Protein Strategy
            </h3>

            <div className="space-y-2.5">
              {results.insights.map((ins, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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

export default ProteinCalculator;
