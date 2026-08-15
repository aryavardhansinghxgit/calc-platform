"use client";

import React, { useState, useMemo } from "react";
import {
  Apple,
  Activity,
  Sparkles,
  Flame,
  Scale,
  Dumbbell,
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
  Calendar,
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
import { calculateCarbohydrateCalculator } from "@/app/calculators/carbohydrate-calculator/calculator";
import {
  CarbCalculationMode,
  UnitSystem,
  Gender,
  ActivityLevel,
  FitnessGoal,
  BmrFormulaType,
} from "@/app/calculators/carbohydrate-calculator/types";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function CarbohydrateCalculator() {
  // Mode & Unit State
  const [calculationMode, setCalculationMode] = useState<CarbCalculationMode>("daily");
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
  const [dailyFiberGrams, setDailyFiberGrams] = useState<number>(28);
  const [sugarAlcoholsGrams, setSugarAlcoholsGrams] = useState<number>(0);
  const [customCarbPct, setCustomCarbPct] = useState<number>(50);

  // Searchable Food GI Database State
  const [foodQuery, setFoodQuery] = useState<string>("");
  const [foodCategoryTab, setFoodCategoryTab] = useState<string>("All");

  // Active View Tab
  const [activeTab, setActiveTab] = useState<
    | "distribution"
    | "net-carbs"
    | "carb-cycling"
    | "glycemic-gauge"
    | "food-gi-search"
    | "diet-comparison"
    | "body-comp"
  >("distribution");

  // Modal & Copy State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Results Calculation Memo
  const results = useMemo(() => {
    return calculateCarbohydrateCalculator({
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
      dailyFiberGrams,
      sugarAlcoholsGrams,
      customCarbPct,
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
    dailyFiberGrams,
    sugarAlcoholsGrams,
    customCarbPct,
  ]);

  // Modes Configuration
  const modesList: { id: CarbCalculationMode; label: string; icon: any; desc: string }[] = [
    { id: "daily", label: "Daily Carb Target", icon: Apple, desc: "Standard 45-65% AMDR guidelines" },
    { id: "weight-loss", label: "Weight Loss Carbs", icon: Scale, desc: "Moderate 35% carb deficit" },
    { id: "weight-gain", label: "Weight Gain Carbs", icon: Dumbbell, desc: "55% carb surplus for muscle" },
    { id: "maintenance", label: "Maintenance", icon: Activity, desc: "Energy balance equilibrium" },
    { id: "athlete", label: "Athlete Performance", icon: Zap, desc: "6g/kg high fuel allocation" },
    { id: "endurance", label: "Endurance Sports", icon: TrendingUp, desc: "8.5g/kg glycogen replenishment" },
    { id: "low-carb", label: "Low-Carb Mode", icon: Layers, desc: "20% calories (50-100g/day)" },
    { id: "moderate-carb", label: "Moderate-Carb", icon: PieIcon, desc: "Balanced 45% carb split" },
    { id: "high-carb", label: "High-Carb Mode", icon: Flame, desc: "65% high carb fueling" },
    { id: "custom", label: "Custom Target", icon: Sliders, desc: "Custom carbohydrate percentage" },
  ];

  // Pie Chart Data
  const macroPieData = [
    { name: "Carbohydrates", value: results.totalCarbCalories, grams: results.totalCarbGrams, color: "#06b6d4" },
    { name: "Protein", value: results.protein.calories, grams: results.protein.grams, color: "#10b981" },
    { name: "Fat", value: results.fat.calories, grams: results.fat.grams, color: "#8b5cf6" },
  ];

  // Net Carbs Bar Data
  const netCarbBarData = [
    { name: "Carb Breakdown", Total: results.totalCarbGrams, Net: results.netCarbGrams, Fiber: results.fiberGrams },
  ];

  // Filtered Food GI Database Items
  const filteredFoods = useMemo(() => {
    return results.foodGiDatabase.filter((item) => {
      const matchesCategory = foodCategoryTab === "All" || item.category === foodCategoryTab;
      const matchesQuery = item.name.toLowerCase().includes(foodQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [results.foodGiDatabase, foodCategoryTab, foodQuery]);

  // CSV Export Handler
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Parameter,Value\n";
    csvContent += `Mode,${results.mode}\n`;
    csvContent += `BMR Formula,${results.formulaUsed}\n`;
    csvContent += `BMR,${results.bmr} kcal\n`;
    csvContent += `TDEE,${results.tdee} kcal\n`;
    csvContent += `Daily Target Calories,${results.targetCalories} kcal\n`;
    csvContent += `Total Carbohydrates,${results.totalCarbGrams} g (${results.totalCarbCalories} kcal)\n`;
    csvContent += `Dietary Fiber,${results.fiberGrams} g\n`;
    csvContent += `Net Carbohydrates,${results.netCarbGrams} g\n`;
    csvContent += `Glycemic Load,${results.glycemicLoad} (${results.glycemicRating})\n\n`;

    csvContent += "Food Item,Category,Serving Size,Total Carbs (g),Fiber (g),Net Carbs (g),Calories (kcal),Glycemic Index (GI),GI Category,Glycemic Load (GL)\n";
    results.foodGiDatabase.forEach((food) => {
      csvContent += `"${food.name}",${food.category},"${food.servingSize}",${food.totalCarbs},${food.fiber},${food.netCarbs},${food.calories},${food.gi},${food.giCategory},${food.gl}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `carbohydrate_plan_${results.totalCarbGrams}g.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Summary Handler
  const handleCopy = () => {
    const summaryText = `Carbohydrate Calculator Results:\n• Target Daily Carbs: ${results.totalCarbGrams}g (${results.totalCarbCalories} kcal, ${results.carbPercentage}% of calories)\n• Net Carbs: ${results.netCarbGrams}g (after ${results.fiberGrams}g fiber)\n• Glycemic Load: ${results.glycemicLoad} (${results.glycemicRating})\n• Target Calories: ${results.targetCalories} kcal/day | TDEE: ${results.tdee} kcal\nCalculated at Calculator Platform.`;
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
      calculatorName: "Professional Carbohydrate & Glycemic Analytics Suite",
      reportTitle: "Clinical Carbohydrate & Glycemic Assessment Report",
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
        label: "Daily Carbohydrate Target",
        value: `${results.totalCarbGrams} g`,
        subtitle: `${results.totalCarbCalories} kcal (${results.carbPercentage}%)`,
        colorTheme: "cyan",
      },
      {
        label: "Net Carbs Target",
        value: `${results.netCarbGrams} g`,
        subtitle: `Fiber: ${results.fiberGrams} g`,
        colorTheme: "emerald",
      },
      {
        label: "Glycemic Load",
        value: `${results.glycemicLoad}`,
        subtitle: results.glycemicRating,
        colorTheme: "purple",
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
        title: "Personal Metrics & Calorie Expenditure",
        items: [
          { label: "Unit System", value: unitSystem.toUpperCase() },
          { label: "Calculation Mode", value: calculationMode.toUpperCase() },
          { label: "Age & Gender", value: `${age} yrs (${gender.toUpperCase()})` },
          { label: "Activity Level", value: activityLevel.toUpperCase() },
          { label: "BMR Formula Used", value: results.formulaUsed },
          { label: "Basal Metabolic Rate (BMR)", value: `${results.bmr} kcal` },
          { label: "Total Energy Expenditure (TDEE)", value: `${results.tdee} kcal` },
          { label: "Carb Range Target", value: `${results.targetCarbRangeMin}g - ${results.targetCarbRangeMax}g / day` },
        ],
      },
      {
        title: "Body Composition & Glycemic Rating",
        items: [
          { label: "Body Fat Percentage", value: `${results.bodyComposition.bodyFatPct}%` },
          { label: "Lean Body Mass (LBM)", value: `${results.bodyComposition.leanBodyMassLbs} lbs` },
          { label: "Fat-Free Mass Index (FFMI)", value: results.bodyComposition.ffmi },
          { label: "Body Mass Index (BMI)", value: results.bodyComposition.bmi },
          { label: "Health & Nutrition Score", value: `${results.bodyComposition.healthScore}%` },
        ],
      },
    ],
    recommendation: {
      title: "Personalized Glycemic & Carb Strategy",
      text: results.insights[0] || "Maintain consistent daily carbohydrate targets.",
      reasons: results.recommendations,
      score: results.bodyComposition.healthScore,
      rating: results.glycemicRating,
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
        { macro: "Carbohydrates", grams: `${results.totalCarbGrams} g`, calories: `${results.totalCarbCalories} kcal`, percentage: `${results.carbPercentage}%` },
        { macro: "Protein", grams: `${results.protein.grams} g`, calories: `${results.protein.calories} kcal`, percentage: `${results.protein.percentage}%` },
        { macro: "Fat", grams: `${results.fat.grams} g`, calories: `${results.fat.calories} kcal`, percentage: `${results.fat.percentage}%` },
      ],
    },
    notes: [
      "Net Carbs are calculated as Total Carbohydrates minus Dietary Fiber and Sugar Alcohols.",
      "Glycemic Load incorporates serving size to predict blood sugar impact accurately.",
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
                    ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md shadow-cyan-500/20 font-semibold scale-[1.01]"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg ${
                    isSelected ? "bg-white/20 text-white" : "bg-cyan-50 text-cyan-600"
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
                    ? "bg-white text-cyan-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                US (lbs/ft)
              </button>
              <button
                onClick={() => setUnitSystem("metric")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  unitSystem === "metric"
                    ? "bg-white text-cyan-700 shadow-xs"
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
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
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
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
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
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
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
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
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
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
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
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
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
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
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
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
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

          {/* Fiber & Net Carb Inputs */}
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Fiber & Net Carb Adjustments
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Daily Fiber (g)
                </label>
                <input
                  type="number"
                  min={10}
                  max={80}
                  value={dailyFiberGrams}
                  onChange={(e) => setDailyFiberGrams(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Sugar Alcohols (g)
                </label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={sugarAlcoholsGrams}
                  onChange={(e) => setSugarAlcoholsGrams(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Results & Interactive Visualizations */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Highlights Hero Card */}
          <div className="bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-700 p-6 rounded-2xl text-white shadow-xl shadow-cyan-600/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-cyan-100 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  Daily Carbohydrate Target
                </div>
                <div className="text-3xl lg:text-4xl font-extrabold text-white mt-1">
                  {results.totalCarbGrams} <span className="text-lg font-normal text-cyan-100">g/day</span>
                </div>
                <div className="text-xs text-cyan-100 mt-1">
                  {results.totalCarbCalories} kcal ({results.carbPercentage}% of daily calories) | Range: <span className="text-white font-bold">{results.targetCarbRangeMin}g – {results.targetCarbRangeMax}g</span>
                </div>
              </div>

              <div className="text-right">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm"
                >
                  GL: {results.glycemicLoad} ({results.glycemicRating})
                </span>
              </div>
            </div>

            {/* Sub-Metrics Cards Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-cyan-100 font-semibold uppercase">Net Carbs</div>
                <div className="text-xl font-black text-white mt-0.5">{results.netCarbGrams} g</div>
                <div className="text-[10px] text-cyan-100">Excludes {results.fiberGrams}g fiber</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-cyan-100 font-semibold uppercase">Target Calories</div>
                <div className="text-xl font-black text-white mt-0.5">{results.targetCalories} kcal</div>
                <div className="text-[10px] text-cyan-100">TDEE: {results.tdee} kcal</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-cyan-100 font-semibold uppercase">Health Score</div>
                <div className="text-xl font-black text-white mt-0.5">{results.bodyComposition.healthScore}%</div>
                <div className="text-[10px] text-cyan-100">Optimal Nutrition</div>
              </div>
            </div>

            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-4 print:hidden">
              <button
                onClick={() => setIsReportOpen(true)}
                className="flex items-center gap-2 bg-white text-cyan-800 hover:bg-cyan-50 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all"
              >
                <Download className="w-4 h-4 text-cyan-600" />
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
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Carb Energy Split
              </button>

              <button
                onClick={() => setActiveTab("net-carbs")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "net-carbs"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Net Carbs Breakdown
              </button>

              <button
                onClick={() => setActiveTab("carb-cycling")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "carb-cycling"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                7-Day Carb Cycling
              </button>

              <button
                onClick={() => setActiveTab("food-gi-search")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "food-gi-search"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Search Food GI Database
              </button>

              <button
                onClick={() => setActiveTab("diet-comparison")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "diet-comparison"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Carb Level Comparison
              </button>
            </div>

            {/* TAB 1: Carb Energy Split Donut Chart */}
            {activeTab === "distribution" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Macronutrient Energy Share
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Carbs: 4 kcal/g | Protein: 4 kcal/g | Fat: 9 kcal/g</span>
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
                  <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200">
                    <div className="text-xs font-bold text-cyan-900">Carbohydrates</div>
                    <div className="text-lg font-black text-cyan-700">{results.totalCarbGrams} g</div>
                    <div className="text-[10px] text-cyan-600">{results.totalCarbCalories} kcal ({results.carbPercentage}%)</div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="text-xs font-bold text-emerald-900">Protein</div>
                    <div className="text-lg font-black text-emerald-700">{results.protein.grams} g</div>
                    <div className="text-[10px] text-emerald-600">{results.protein.calories} kcal ({results.protein.percentage}%)</div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="text-xs font-bold text-purple-900">Fat</div>
                    <div className="text-lg font-black text-purple-700">{results.fat.grams} g</div>
                    <div className="text-[10px] text-purple-600">{results.fat.calories} kcal ({results.fat.percentage}%)</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Net Carbs Breakdown Bar Chart */}
            {activeTab === "net-carbs" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Total Carbs vs Net Carbs vs Dietary Fiber
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Net Carbs = Total Carbs − Fiber</span>
                </div>

                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={netCarbBarData}>
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
                      <Bar dataKey="Total" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="Net" fill="#10b981" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="Fiber" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* TAB 3: 7-Day Carb Cycling Schedule */}
            {activeTab === "carb-cycling" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">7-Day Carb Cycling Planner Matrix
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">High / Medium / Low Carb Schedule</span>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 uppercase font-bold">
                      <tr>
                        <th className="p-3">Day</th>
                        <th className="p-3">Cycle Level</th>
                        <th className="p-3">Daily Calories</th>
                        <th className="p-3">Carbs (g)</th>
                        <th className="p-3">Protein (g)</th>
                        <th className="p-3">Fat (g)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {results.carbCyclingSchedule.map((day) => (
                        <tr key={day.day} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900">{day.day}</td>
                          <td className="p-3">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                day.level === "High Carb"
                                  ? "bg-cyan-100 text-cyan-800 border border-cyan-300"
                                  : day.level === "Medium Carb"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                  : "bg-purple-100 text-purple-800 border border-purple-300"
                              }`}
                            >
                              {day.level}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-900">{day.calories} kcal</td>
                          <td className="p-3 font-bold text-cyan-700">{day.carbs} g</td>
                          <td className="p-3 font-bold text-emerald-700">{day.protein} g</td>
                          <td className="p-3 font-bold text-purple-700">{day.fat} g</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: Searchable Carb Food GI Database Module */}
            {activeTab === "food-gi-search" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Carbohydrate & Glycemic Food Database (Search & GI Ratings)
                  </h3>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search food or grain..."
                      value={foodQuery}
                      onChange={(e) => setFoodQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
                  {["All", "Fruits", "Vegetables", "Whole Grains", "Legumes", "Snacks & Beverages"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFoodCategoryTab(cat)}
                      className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                        foodCategoryTab === cat
                          ? "bg-cyan-600 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Food GI Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-xl max-h-72">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 uppercase font-bold sticky top-0">
                      <tr>
                        <th className="p-3">Food Item</th>
                        <th className="p-3">Serving Size</th>
                        <th className="p-3">Total Carbs</th>
                        <th className="p-3">Fiber</th>
                        <th className="p-3">Net Carbs</th>
                        <th className="p-3">Glycemic Index (GI)</th>
                        <th className="p-3">Glycemic Load (GL)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredFoods.map((item) => (
                        <tr key={item.id} className="hover:bg-cyan-50/40">
                          <td className="p-3 font-bold text-slate-900">{item.name}</td>
                          <td className="p-3 text-slate-600">{item.servingSize}</td>
                          <td className="p-3 font-bold text-cyan-700">{item.totalCarbs} g</td>
                          <td className="p-3 font-bold text-emerald-700">{item.fiber} g</td>
                          <td className="p-3 font-bold text-blue-700">{item.netCarbs} g</td>
                          <td className="p-3 font-bold">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] ${
                                item.giCategory === "Low"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : item.giCategory === "Medium"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {item.gi} ({item.giCategory})
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-900">{item.gl}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 5: Diet Style Comparison */}
            {activeTab === "diet-comparison" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Carbohydrate Strategy Matrix Comparison
                </h3>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 uppercase font-bold">
                      <tr>
                        <th className="p-3">Carb Strategy</th>
                        <th className="p-3">Carb %</th>
                        <th className="p-3">Carbs (g)</th>
                        <th className="p-3">Protein (g)</th>
                        <th className="p-3">Fat (g)</th>
                        <th className="p-3">Best Fitness Goal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">Standard AMDR (50%)</td>
                        <td className="p-3 font-bold text-cyan-700">50%</td>
                        <td className="p-3 font-bold text-cyan-700">{Math.round((results.targetCalories * 0.5) / 4)}g</td>
                        <td className="p-3 font-bold text-emerald-700">{results.protein.grams}g</td>
                        <td className="p-3 font-bold text-purple-700">{results.fat.grams}g</td>
                        <td className="p-3">General fitness & steady endurance</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">Weight Loss / Cut (35%)</td>
                        <td className="p-3 font-bold text-cyan-700">35%</td>
                        <td className="p-3 font-bold text-cyan-700">{Math.round((results.targetCalories * 0.35) / 4)}g</td>
                        <td className="p-3 font-bold text-emerald-700">{Math.round((results.targetCalories * 0.35) / 4)}g</td>
                        <td className="p-3 font-bold text-purple-700">{Math.round((results.targetCalories * 0.3) / 9)}g</td>
                        <td className="p-3">Fat loss while sparing lean muscle mass</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">Athlete / Endurance (65%)</td>
                        <td className="p-3 font-bold text-cyan-700">65%</td>
                        <td className="p-3 font-bold text-cyan-700">{Math.round((results.targetCalories * 0.65) / 4)}g</td>
                        <td className="p-3 font-bold text-emerald-700">{Math.round((results.targetCalories * 0.20) / 4)}g</td>
                        <td className="p-3 font-bold text-purple-700">{Math.round((results.targetCalories * 0.15) / 9)}g</td>
                        <td className="p-3">Maximal glycogen loading & marathon training</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">Low-Carb (20%)</td>
                        <td className="p-3 font-bold text-cyan-700">20%</td>
                        <td className="p-3 font-bold text-cyan-700">{Math.round((results.targetCalories * 0.20) / 4)}g</td>
                        <td className="p-3 font-bold text-emerald-700">{Math.round((results.targetCalories * 0.35) / 4)}g</td>
                        <td className="p-3 font-bold text-purple-700">{Math.round((results.targetCalories * 0.45) / 9)}g</td>
                        <td className="p-3">Insulin control & appetite management</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Smart Insights & Personalized Recommendations */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 print:hidden">
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Smart Insights & Glycemic Strategy
            </h3>

            <div className="space-y-2.5">
              {results.insights.map((ins, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
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

export default CarbohydrateCalculator;
