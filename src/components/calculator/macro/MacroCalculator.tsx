"use client";

import React, { useState, useMemo } from "react";
import {
  PieChart as PieIcon,
  Activity,
  Sparkles,
  Flame,
  Scale,
  Dumbbell,
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
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { calculateMacroCalculator } from "@/app/calculators/macro-calculator/calculator";
import {
  MacroCalculationMode,
  UnitSystem,
  Gender,
  ActivityLevel,
  FitnessGoal,
  BmrFormulaType,
  DietStyleType,
  FoodDatabaseItem,
} from "@/app/calculators/macro-calculator/types";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function MacroCalculator() {
  // Mode & Unit State
  const [calculationMode, setCalculationMode] = useState<MacroCalculationMode>("standard");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");

  // Basic Inputs State
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<Gender>("male");
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightLbs, setWeightLbs] = useState<number>(165);
  const [weightKg, setWeightKg] = useState<number>(75);

  // Advanced Inputs State
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<FitnessGoal>("maintain");
  const [bmrFormula, setBmrFormula] = useState<BmrFormulaType>("mifflin");
  const [bodyFat, setBodyFat] = useState<number>(20);
  const [dietStyle, setDietStyle] = useState<DietStyleType>("balanced");

  // Food Database Filter State
  const [foodQuery, setFoodQuery] = useState<string>("");
  const [foodCategoryTab, setFoodCategoryTab] = useState<string>("All");

  // Active View Tab
  const [activeTab, setActiveTab] = useState<
    | "distribution"
    | "trajectory"
    | "ratio-comparison"
    | "body-comp"
    | "food-search"
    | "insights"
  >("distribution");

  // Modal & Copy State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Results Calculation Memo
  const results = useMemo(() => {
    return calculateMacroCalculator({
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
      dietStyle,
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
    dietStyle,
  ]);

  // Calculation Modes Config
  const modesList: { id: MacroCalculationMode; label: string; icon: any; desc: string }[] = [
    { id: "standard", label: "Standard Macro", icon: PieIcon, desc: "TDEE & balanced macro targets" },
    { id: "calories", label: "Calorie Calculator", icon: Flame, desc: "Energy intake & BMR focus" },
    { id: "cutting", label: "Cutting / Fat Loss", icon: Scale, desc: "Calorie deficit & high protein" },
    { id: "bulking", label: "Bulking / Muscle", icon: Dumbbell, desc: "Calorie surplus for hypertrophy" },
    { id: "maintenance", label: "Maintenance", icon: Activity, desc: "Energy equilibrium" },
    { id: "recomp", label: "Body Recomposition", icon: Zap, desc: "Simultaneous fat loss & muscle gain" },
    { id: "athlete", label: "Athlete Planner", icon: TrendingUp, desc: "High carb performance fueling" },
    { id: "keto", label: "Keto Macro", icon: Layers, desc: "Very low carb (5%) & high fat (70%)" },
    { id: "high-protein", label: "High Protein", icon: Award, desc: "High protein retention (45%)" },
    { id: "custom", label: "Custom Builder", icon: Sliders, desc: "Custom macronutrient ratios" },
  ];

  // Pie Chart Colors
  const macroPieData = [
    { name: "Protein", value: results.protein.calories, grams: results.protein.grams, color: "#10b981" },
    { name: "Carbohydrates", value: results.carbs.calories, grams: results.carbs.grams, color: "#3b82f6" },
    { name: "Fat", value: results.fat.calories, grams: results.fat.grams, color: "#8b5cf6" },
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
    csvContent += `BMR,${results.bmr} kcal\n`;
    csvContent += `TDEE,${results.tdee} kcal\n`;
    csvContent += `Daily Target Calories,${results.targetCalories} kcal\n`;
    csvContent += `Protein Target,${results.protein.grams} g (${results.protein.calories} kcal)\n`;
    csvContent += `Carbohydrate Target,${results.carbs.grams} g (${results.carbs.calories} kcal)\n`;
    csvContent += `Fat Target,${results.fat.grams} g (${results.fat.calories} kcal)\n\n`;

    csvContent += "Food Item,Category,Serving Size,Protein (g),Carbs (g),Fat (g),Calories (kcal)\n";
    results.foodDatabase.forEach((food) => {
      csvContent += `"${food.name}",${food.category},"${food.servingSize}",${food.protein},${food.carbs},${food.fat},${food.calories}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `macro_plan_${results.targetCalories}kcal.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Summary Handler
  const handleCopy = () => {
    const summaryText = `Macro Calculator Results:\n• Target Calories: ${results.targetCalories} kcal/day\n• Protein: ${results.protein.grams}g (${results.protein.percentage}%)\n• Carbs: ${results.carbs.grams}g (${results.carbs.percentage}%)\n• Fat: ${results.fat.grams}g (${results.fat.percentage}%)\n• BMR: ${results.bmr} kcal | TDEE: ${results.tdee} kcal\n• Formula: ${results.formulaUsed}\nCalculated at Calculator Platform.`;
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
      calculatorName: "Professional Macro Calculator & Nutrition Suite",
      reportTitle: "Clinical Macronutrient & Body Composition Report",
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
        label: "Daily Target Calories",
        value: `${results.targetCalories} kcal`,
        subtitle: `TDEE: ${results.tdee} kcal`,
        colorTheme: "rose",
      },
      {
        label: "Protein Target",
        value: `${results.protein.grams} g`,
        subtitle: `${results.protein.percentage}% of calories`,
        colorTheme: "emerald",
      },
      {
        label: "Carbohydrate Target",
        value: `${results.carbs.grams} g`,
        subtitle: `${results.carbs.percentage}% of calories`,
        colorTheme: "purple",
      },
      {
        label: "Fat Target",
        value: `${results.fat.grams} g`,
        subtitle: `${results.fat.percentage}% of calories`,
        colorTheme: "amber",
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
          { label: "Weekly Calorie Target", value: `${results.weeklyCalories} kcal` },
        ],
      },
      {
        title: "Body Composition Analysis",
        items: [
          { label: "Body Fat Percentage", value: `${results.bodyComposition.bodyFatPct}%` },
          { label: "Lean Body Mass (LBM)", value: `${results.bodyComposition.leanBodyMassLbs} lbs` },
          { label: "Fat Mass", value: `${results.bodyComposition.fatMassLbs} lbs` },
          { label: "Fat-Free Mass Index (FFMI)", value: results.bodyComposition.ffmi },
          { label: "Body Mass Index (BMI)", value: results.bodyComposition.bmi },
          { label: "Health & Fitness Score", value: `${results.bodyComposition.healthScore}% (${results.bodyComposition.fitnessRating})` },
        ],
      },
    ],
    recommendation: {
      title: "Personalized Macro Strategy",
      text: results.insights[0] || "Maintain consistent daily calorie targets.",
      reasons: results.recommendations,
      score: results.bodyComposition.healthScore,
      rating: results.bodyComposition.fitnessRating,
    },
    table: {
      title: "Macronutrient Distribution Breakdown",
      headers: [
        { key: "macro", label: "Macronutrient", align: "left" },
        { key: "grams", label: "Grams (g)", align: "right" },
        { key: "calories", label: "Calories (kcal)", align: "right" },
        { key: "percentage", label: "Energy Share (%)", align: "right" },
      ],
      rows: [
        { macro: "Protein", grams: `${results.protein.grams} g`, calories: `${results.protein.calories} kcal`, percentage: `${results.protein.percentage}%` },
        { macro: "Carbohydrates", grams: `${results.carbs.grams} g`, calories: `${results.carbs.calories} kcal`, percentage: `${results.carbs.percentage}%` },
        { macro: "Fat", grams: `${results.fat.grams} g`, calories: `${results.fat.calories} kcal`, percentage: `${results.fat.percentage}%` },
      ],
    },
    notes: [
      "Macronutrient calculations are based on standard clinical energy density values (Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g).",
      "Re-evaluate macro targets after every 5 to 10 lbs of body weight change.",
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
                <option value="light">Light Active (exercise 1-3 days/week)</option>
                <option value="moderate">Moderate Active (exercise 4-5 days/week)</option>
                <option value="active">Active (exercise 6-7 days/week)</option>
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
                <option value="recomp">Body Recomposition (-200 kcal + high protein)</option>
              </select>
            </div>
          </div>

          {/* Advanced BMR Formula & Body Composition */}
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Advanced Formulas & Body Fat
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  BMR Formula
                </label>
                <select
                  value={bmrFormula}
                  onChange={(e) => setBmrFormula(e.target.value as BmrFormulaType)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                >
                  <option value="mifflin">Mifflin-St Jeor (Standard)</option>
                  <option value="katch">Katch-McArdle (Body Fat %)</option>
                  <option value="harris">Original Harris-Benedict</option>
                  <option value="revised-harris">Revised Harris-Benedict</option>
                  <option value="cunningham">Cunningham (Athletic LBM)</option>
                  <option value="schofield">Schofield Equation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Body Fat (%): <span className="text-emerald-700 font-bold">{bodyFat}%</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={45}
                  value={bodyFat}
                  onChange={(e) => setBodyFat(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Dietary Preference / Macro Ratio Split
              </label>
              <select
                value={dietStyle}
                onChange={(e) => setDietStyle(e.target.value as DietStyleType)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                <option value="balanced">Balanced Split (30% P / 40% C / 30% F)</option>
                <option value="low-carb">Low Carb / Cutting (40% P / 20% C / 40% F)</option>
                <option value="high-protein">High Protein (45% P / 35% C / 20% F)</option>
                <option value="keto">Ketogenic (25% P / 5% C / 70% F)</option>
              </select>
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
                  Daily Calorie Target
                </div>
                <div className="text-3xl lg:text-4xl font-extrabold text-white mt-1">
                  {results.targetCalories} <span className="text-lg font-normal text-emerald-100">kcal/day</span>
                </div>
                <div className="text-xs text-emerald-100 mt-1">
                  TDEE: <span className="text-white font-bold">{results.tdee} kcal</span> | BMR: <span className="text-white font-bold">{results.bmr} kcal</span> ({results.formulaUsed})
                </div>
              </div>

              <div className="text-right">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm"
                >
                  Health Score: {results.bodyComposition.healthScore}% ({results.bodyComposition.fitnessRating})
                </span>
              </div>
            </div>

            {/* Sub-Metrics Cards Grid (Frosted White Cards) */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-emerald-100 font-semibold uppercase">Protein</div>
                <div className="text-xl font-black text-white mt-0.5">{results.protein.grams} g</div>
                <div className="text-[10px] text-emerald-100">{results.protein.calories} kcal ({results.protein.percentage}%)</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-emerald-100 font-semibold uppercase">Carbohydrates</div>
                <div className="text-xl font-black text-white mt-0.5">{results.carbs.grams} g</div>
                <div className="text-[10px] text-emerald-100">{results.carbs.calories} kcal ({results.carbs.percentage}%)</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-emerald-100 font-semibold uppercase">Fat</div>
                <div className="text-xl font-black text-white mt-0.5">{results.fat.grams} g</div>
                <div className="text-[10px] text-emerald-100">{results.fat.calories} kcal ({results.fat.percentage}%)</div>
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

                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all"
                  title="Print Report"
                >
                  <Printer className="w-4 h-4" />
                  Print
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
                Macro Split Chart
              </button>

              <button
                onClick={() => setActiveTab("trajectory")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "trajectory"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                12-Week Weight Projection
              </button>

              <button
                onClick={() => setActiveTab("ratio-comparison")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "ratio-comparison"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Diet Ratio Comparison
              </button>

              <button
                onClick={() => setActiveTab("body-comp")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "body-comp"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Body Composition & FFMI
              </button>

              <button
                onClick={() => setActiveTab("food-search")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "food-search"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Search Food Database
              </button>
            </div>

            {/* TAB 1: Macro Split Pie Chart */}
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
                          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                        }}
                        formatter={(value: any, name: any) => [`${value} kcal`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="text-xs font-bold text-emerald-900">Protein</div>
                    <div className="text-lg font-black text-emerald-700">{results.protein.grams} g</div>
                    <div className="text-[10px] text-emerald-600">{results.protein.calories} kcal ({results.protein.percentage}%)</div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-xs font-bold text-blue-900">Carbohydrates</div>
                    <div className="text-lg font-black text-blue-700">{results.carbs.grams} g</div>
                    <div className="text-[10px] text-blue-600">{results.carbs.calories} kcal ({results.carbs.percentage}%)</div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="text-xs font-bold text-purple-900">Fat</div>
                    <div className="text-lg font-black text-purple-700">{results.fat.grams} g</div>
                    <div className="text-[10px] text-purple-600">{results.fat.calories} kcal ({results.fat.percentage}%)</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: 12-Week Weight Projection */}
            {activeTab === "trajectory" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">12-Week Weight Trajectory Forecast
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Goal: {goal.toUpperCase()}</span>
                </div>

                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.weightTrajectory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="weekLabel" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          borderColor: "#cbd5e1",
                          borderRadius: "12px",
                          color: "#0f172a",
                        }}
                        formatter={(val: any) => [`${val} lbs`, "Projected Weight"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="estimatedWeightLbs"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* TAB 3: Macro Ratio Comparison */}
            {activeTab === "ratio-comparison" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Dietary Style Macro Split Comparison
                </h3>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 uppercase font-bold">
                      <tr>
                        <th className="p-3">Diet Style</th>
                        <th className="p-3">Protein (g)</th>
                        <th className="p-3">Carbs (g)</th>
                        <th className="p-3">Fat (g)</th>
                        <th className="p-3">Best Use Case</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">Balanced (30/40/30)</td>
                        <td className="p-3 font-bold text-emerald-700">{Math.round((results.targetCalories * 0.3) / 4)}g</td>
                        <td className="p-3 font-bold text-blue-700">{Math.round((results.targetCalories * 0.4) / 4)}g</td>
                        <td className="p-3 font-bold text-purple-700">{Math.round((results.targetCalories * 0.3) / 9)}g</td>
                        <td className="p-3">General maintenance & steady progress</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">Low Carb (40/20/40)</td>
                        <td className="p-3 font-bold text-emerald-700">{Math.round((results.targetCalories * 0.4) / 4)}g</td>
                        <td className="p-3 font-bold text-blue-700">{Math.round((results.targetCalories * 0.2) / 4)}g</td>
                        <td className="p-3 font-bold text-purple-700">{Math.round((results.targetCalories * 0.4) / 9)}g</td>
                        <td className="p-3">Cutting & insulin sensitivity optimization</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">High Protein (45/35/20)</td>
                        <td className="p-3 font-bold text-emerald-700">{Math.round((results.targetCalories * 0.45) / 4)}g</td>
                        <td className="p-3 font-bold text-blue-700">{Math.round((results.targetCalories * 0.35) / 4)}g</td>
                        <td className="p-3 font-bold text-purple-700">{Math.round((results.targetCalories * 0.20) / 9)}g</td>
                        <td className="p-3">Body recomposition & muscle preservation</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">Ketogenic (25/5/70)</td>
                        <td className="p-3 font-bold text-emerald-700">{Math.round((results.targetCalories * 0.25) / 4)}g</td>
                        <td className="p-3 font-bold text-blue-700">{Math.round((results.targetCalories * 0.05) / 4)}g</td>
                        <td className="p-3 font-bold text-purple-700">{Math.round((results.targetCalories * 0.70) / 9)}g</td>
                        <td className="p-3">Ketosis & appetite suppression</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: Body Composition & FFMI */}
            {activeTab === "body-comp" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Body Composition & Fat-Free Mass Index (FFMI)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                    <div className="text-xs text-emerald-800 font-semibold">Lean Body Mass (LBM)</div>
                    <div className="text-xl font-extrabold text-emerald-900 mt-1">{results.bodyComposition.leanBodyMassLbs} lbs</div>
                    <div className="text-xs text-emerald-700 mt-1">Muscle, organ & bone tissue</div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <div className="text-xs text-purple-800 font-semibold">Fat Mass</div>
                    <div className="text-xl font-extrabold text-purple-900 mt-1">{results.bodyComposition.fatMassLbs} lbs</div>
                    <div className="text-xs text-purple-700 mt-1">Total fat tissue ({results.bodyComposition.bodyFatPct}%)</div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <div className="text-xs text-blue-800 font-semibold">Fat-Free Mass Index (FFMI)</div>
                    <div className="text-xl font-extrabold text-blue-900 mt-1">{results.bodyComposition.ffmi}</div>
                    <div className="text-xs text-blue-700 mt-1">Rating: {results.bodyComposition.fitnessRating}</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: Searchable Food Database Module */}
            {activeTab === "food-search" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Macronutrient Food Database (Search & Filter)
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
                  {["All", "Fruits", "Vegetables", "Proteins", "Meals & Snacks", "Dairy & Beverages"].map((cat) => (
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
                        <th className="p-3">Carbs</th>
                        <th className="p-3">Fat</th>
                        <th className="p-3">Calories</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredFoods.map((item) => (
                        <tr key={item.id} className="hover:bg-emerald-50/40">
                          <td className="p-3 font-bold text-slate-900">{item.name}</td>
                          <td className="p-3 text-slate-600">{item.servingSize}</td>
                          <td className="p-3 font-bold text-emerald-700">{item.protein} g</td>
                          <td className="p-3 font-bold text-blue-700">{item.carbs} g</td>
                          <td className="p-3 font-bold text-purple-700">{item.fat} g</td>
                          <td className="p-3 font-bold text-slate-900">{item.calories} kcal</td>
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
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">Smart Insights & Nutrition Strategy
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

export default MacroCalculator;
