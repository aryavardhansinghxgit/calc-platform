"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  PieChart as PieIcon,
  Activity,
  Sparkles,
  Flame,
  Scale,
  Dumbbell,
  Search,
  Download,
  Copy,
  Check,
  CheckCircle2,
  Sliders,
  TrendingUp,
  FileSpreadsheet,
  Zap,
  Award,
  Layers,
  Share2,
  Bookmark,
  RefreshCw,
  Trash2,
  X,
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
} from "@/app/calculators/macro-calculator/types";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

interface SavedMacroScenario {
  id: string;
  name: string;
  date: string;
  unitSystem: UnitSystem;
  calculationMode: MacroCalculationMode;
  age: number;
  gender: Gender;
  heightFeet: number;
  heightInches: number;
  heightCm: number;
  weightLbs: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
  bmrFormula: BmrFormulaType;
  bodyFat: number;
  dietStyle: DietStyleType;
  customProteinPct: number;
  customCarbsPct: number;
  customFatPct: number;
  targetCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}

export function MacroCalculator() {
  const [mounted, setMounted] = useState(false);

  // Mode & Unit State
  const [calculationMode, setCalculationMode] = useState<MacroCalculationMode>("standard");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");

  // Basic Inputs State (Canonical baseline default: Age 25, Male, 5'10", 165 lbs)
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<Gender>("male");
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightLbs, setWeightLbs] = useState<number>(165);
  const [weightKg, setWeightKg] = useState<number>(74.8);

  // Advanced Inputs State
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<FitnessGoal>("maintain");
  const [bmrFormula, setBmrFormula] = useState<BmrFormulaType>("mifflin");
  const [bodyFat, setBodyFat] = useState<number>(20);
  const [dietStyle, setDietStyle] = useState<DietStyleType>("balanced");

  // Custom Macro Sliders
  const [customProteinPct, setCustomProteinPct] = useState<number>(30);
  const [customCarbsPct, setCustomCarbsPct] = useState<number>(40);
  const [customFatPct, setCustomFatPct] = useState<number>(30);

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

  // Modal & Notification State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // Saved Scenarios Drawer State
  const [savedScenarios, setSavedScenarios] = useState<SavedMacroScenario[]>([]);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Load URL params & localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("macro_saved_scenarios");
      if (stored) {
        setSavedScenarios(JSON.parse(stored));
      }
    } catch {
      // Ignore storage errors
    }

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlUnit = params.get("unit");
      const urlMode = params.get("mode");
      const urlAge = params.get("age");
      const urlGender = params.get("gender");
      const urlHt = params.get("ht");
      const urlWt = params.get("wt");
      const urlAct = params.get("act");
      const urlGoal = params.get("goal");
      const urlFormula = params.get("formula");
      const urlBf = params.get("bf");
      const urlDiet = params.get("diet");

      if (urlUnit === "us" || urlUnit === "metric") setUnitSystem(urlUnit);
      if (urlMode && [
        "standard", "calories", "cutting", "bulking", "maintenance",
        "recomp", "athlete", "keto", "high-protein", "custom"
      ].includes(urlMode)) {
        setCalculationMode(urlMode as MacroCalculationMode);
      }
      if (urlAge && !isNaN(Number(urlAge))) setAge(Number(urlAge));
      if (urlGender === "male" || urlGender === "female") setGender(urlGender);
      if (urlAct && ["sedentary", "light", "moderate", "active", "very-active", "extra-active"].includes(urlAct)) {
        setActivityLevel(urlAct as ActivityLevel);
      }
      if (urlGoal && [
        "maintain", "mild-loss", "loss", "extreme-loss",
        "mild-gain", "gain", "extreme-gain", "recomp"
      ].includes(urlGoal)) {
        setGoal(urlGoal as FitnessGoal);
      }
      if (urlFormula && ["mifflin", "katch", "harris", "revised-harris", "cunningham", "schofield"].includes(urlFormula)) {
        setBmrFormula(urlFormula as BmrFormulaType);
      }
      if (urlBf && !isNaN(Number(urlBf))) setBodyFat(Number(urlBf));
      if (urlDiet && ["balanced", "low-carb", "high-protein", "keto", "athlete", "custom"].includes(urlDiet)) {
        setDietStyle(urlDiet as DietStyleType);
      }

      if (urlUnit === "metric") {
        if (urlHt && !isNaN(Number(urlHt))) setHeightCm(Number(urlHt));
        if (urlWt && !isNaN(Number(urlWt))) setWeightKg(Number(urlWt));
      } else {
        if (urlHt && !isNaN(Number(urlHt))) {
          const totIn = Number(urlHt);
          setHeightFeet(Math.floor(totIn / 12));
          setHeightInches(totIn % 12);
        }
        if (urlWt && !isNaN(Number(urlWt))) setWeightLbs(Number(urlWt));
      }
    }
  }, []);

  const persistScenarios = (list: SavedMacroScenario[]) => {
    setSavedScenarios(list);
    try {
      localStorage.setItem("macro_saved_scenarios", JSON.stringify(list));
    } catch {
      // Ignore storage errors
    }
  };

  // Unit System Toggle with Bidirectional Conversion
  const handleUnitSystemChange = (newUnit: UnitSystem) => {
    if (newUnit === unitSystem) return;

    if (newUnit === "metric") {
      const cm = Math.round((heightFeet * 12 + heightInches) * 2.54);
      const kg = parseFloat((weightLbs * 0.45359237).toFixed(1));
      setHeightCm(cm);
      setWeightKg(kg);
    } else {
      const totalIn = heightCm / 2.54;
      setHeightFeet(Math.floor(totalIn / 12));
      setHeightInches(parseFloat((totalIn % 12).toFixed(1)));
      setWeightLbs(Math.round(weightKg / 0.45359237));
    }

    setUnitSystem(newUnit);
  };

  // Mode Selection with Auto-Sync for Goal & Diet Style
  const handleModeChange = (newMode: MacroCalculationMode) => {
    setCalculationMode(newMode);

    switch (newMode) {
      case "cutting":
        setGoal("loss");
        setDietStyle("low-carb");
        break;
      case "bulking":
        setGoal("gain");
        setDietStyle("balanced");
        break;
      case "maintenance":
        setGoal("maintain");
        setDietStyle("balanced");
        break;
      case "recomp":
        setGoal("recomp");
        setDietStyle("high-protein");
        break;
      case "athlete":
        setGoal("maintain");
        setDietStyle("athlete");
        break;
      case "keto":
        setDietStyle("keto");
        break;
      case "high-protein":
        setDietStyle("high-protein");
        break;
      case "custom":
        setDietStyle("custom");
        break;
      case "calories":
      case "standard":
      default:
        setGoal("maintain");
        setDietStyle("balanced");
        break;
    }
  };

  // Reset Defaults Handler
  const handleReset = () => {
    setCalculationMode("standard");
    setUnitSystem("us");
    setAge(25);
    setGender("male");
    setHeightFeet(5);
    setHeightInches(10);
    setHeightCm(178);
    setWeightLbs(165);
    setWeightKg(74.8);
    setActivityLevel("moderate");
    setGoal("maintain");
    setBmrFormula("mifflin");
    setBodyFat(20);
    setDietStyle("balanced");
    setCustomProteinPct(30);
    setCustomCarbsPct(40);
    setCustomFatPct(30);
  };

  // Calculation Engine Memo
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
      customProteinPct,
      customCarbsPct,
      customFatPct,
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
    customProteinPct,
    customCarbsPct,
    customFatPct,
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

  // Save Current Scenario
  const handleSaveScenario = () => {
    const newScenario: SavedMacroScenario = {
      id: Date.now().toString(),
      name: `${age}y ${gender.toUpperCase()} • ${results.targetCalories} kcal (${calculationMode})`,
      date: new Date().toLocaleDateString(),
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
      customProteinPct,
      customCarbsPct,
      customFatPct,
      targetCalories: results.targetCalories,
      proteinGrams: results.protein.grams,
      carbsGrams: results.carbs.grams,
      fatGrams: results.fat.grams,
    };
    persistScenarios([newScenario, ...savedScenarios]);
    setIsSavedDrawerOpen(true);
  };

  const handleRestoreScenario = (s: SavedMacroScenario) => {
    setUnitSystem(s.unitSystem);
    setCalculationMode(s.calculationMode);
    setAge(s.age);
    setGender(s.gender);
    setHeightFeet(s.heightFeet);
    setHeightInches(s.heightInches);
    setHeightCm(s.heightCm);
    setWeightLbs(s.weightLbs);
    setWeightKg(s.weightKg);
    setActivityLevel(s.activityLevel);
    setGoal(s.goal);
    setBmrFormula(s.bmrFormula);
    setBodyFat(s.bodyFat);
    setDietStyle(s.dietStyle);
    if (s.customProteinPct) setCustomProteinPct(s.customProteinPct);
    if (s.customCarbsPct) setCustomCarbsPct(s.customCarbsPct);
    if (s.customFatPct) setCustomFatPct(s.customFatPct);
    setIsSavedDrawerOpen(false);
  };

  const handleDeleteScenario = (id: string) => {
    persistScenarios(savedScenarios.filter((s) => s.id !== id));
  };

  // Share URL Handler
  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set("unit", unitSystem);
    url.searchParams.set("mode", calculationMode);
    url.searchParams.set("age", age.toString());
    url.searchParams.set("gender", gender);
    url.searchParams.set("act", activityLevel);
    url.searchParams.set("goal", goal);
    url.searchParams.set("formula", bmrFormula);
    url.searchParams.set("bf", bodyFat.toString());
    url.searchParams.set("diet", dietStyle);

    if (unitSystem === "metric") {
      url.searchParams.set("ht", heightCm.toString());
      url.searchParams.set("wt", weightKg.toString());
    } else {
      url.searchParams.set("ht", (heightFeet * 12 + heightInches).toString());
      url.searchParams.set("wt", weightLbs.toString());
    }

    const shareUrl = url.toString();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Macronutrient Target Plan",
          text: `Daily Target: ${results.targetCalories} kcal (Protein: ${results.protein.grams}g, Carbs: ${results.carbs.grams}g, Fat: ${results.fat.grams}g).`,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(shareUrl);
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  };

  // CSV Export Handler
  const handleExportCSV = () => {
    const rows = [
      ["Category", "Parameter", "Value", "Notes"],
      ["Configuration", "Calculation Mode", calculationMode, ""],
      ["Configuration", "Unit System", unitSystem, ""],
      ["Demographics", "Age", age.toString(), "years"],
      ["Demographics", "Gender", gender, ""],
      ["Demographics", "Height", unitSystem === "us" ? `${heightFeet} ft ${heightInches} in` : `${heightCm} cm`, ""],
      ["Demographics", "Weight", unitSystem === "us" ? `${weightLbs} lbs` : `${weightKg} kg`, ""],
      ["Metabolism", "BMR Formula", results.formulaUsed, ""],
      ["Metabolism", "Basal Metabolic Rate (BMR)", `${results.bmr} kcal`, ""],
      ["Metabolism", "Physical Activity Level", activityLevel, ""],
      ["Metabolism", "Total Daily Energy Expenditure (TDEE)", `${results.tdee} kcal`, ""],
      ["Nutrition Targets", "Daily Calorie Target", `${results.targetCalories} kcal`, ""],
      ["Nutrition Targets", "Weekly Calorie Target", `${results.weeklyCalories} kcal`, ""],
      ["Macronutrients", "Protein Target", `${results.protein.grams} g`, `${results.protein.calories} kcal (${results.protein.percentage}%)`],
      ["Macronutrients", "Carbohydrate Target", `${results.carbs.grams} g`, `${results.carbs.calories} kcal (${results.carbs.percentage}%)`],
      ["Macronutrients", "Dietary Fat Target", `${results.fat.grams} g`, `${results.fat.calories} kcal (${results.fat.percentage}%)`],
      ["Body Composition", "Estimated Body Fat", `${results.bodyComposition.bodyFatPct}%`, ""],
      ["Body Composition", "Lean Body Mass", `${results.bodyComposition.leanBodyMassLbs} lbs`, ""],
      ["Body Composition", "Fat Mass", `${results.bodyComposition.fatMassLbs} lbs`, ""],
      ["Body Composition", "Fat-Free Mass Index (FFMI)", `${results.bodyComposition.ffmi}`, ""],
      ["Body Composition", "Body Mass Index (BMI)", `${results.bodyComposition.bmi}`, ""],
      ["", "", "", ""],
      ["12-WEEK WEIGHT TRAJECTORY", "", "", ""],
      ["Week", "Label", "Weight (lbs)", "Weight (kg)"],
      ...results.weightTrajectory.map((w) => [w.week.toString(), w.weekLabel, w.estimatedWeightLbs.toString(), w.estimatedWeightKg.toString()]),
      ["", "", "", ""],
      ["FOOD DATABASE REFERENCE", "", "", ""],
      ["Food Item", "Category", "Serving Size", "Protein (g)", "Carbs (g)", "Fat (g)", "Calories (kcal)"],
      ...results.foodDatabase.map((f) => [f.name, f.category, f.servingSize, f.protein.toString(), f.carbs.toString(), f.fat.toString(), f.calories.toString()]),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((r) => r.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
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
    const summaryText = `Macro Calculator Results:
• Target Calories: ${results.targetCalories} kcal/day
• Protein: ${results.protein.grams}g (${results.protein.calories} kcal, ${results.protein.percentage}%)
• Carbs: ${results.carbs.grams}g (${results.carbs.calories} kcal, ${results.carbs.percentage}%)
• Fat: ${results.fat.grams}g (${results.fat.calories} kcal, ${results.fat.percentage}%)
• BMR: ${results.bmr} kcal | TDEE: ${results.tdee} kcal
• Formula: ${results.formulaUsed}
• Body Composition: ${results.bodyComposition.bodyFatPct}% Body Fat | LBM: ${results.bodyComposition.leanBodyMassLbs} lbs
Calculated via CalcPlatform Precision Nutrition Engine`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Report Modal Data Structure
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Professional Macro Calculator & Nutrition Suite",
      reportTitle: "Clinical Macronutrient & Body Composition Report",
      generatedDate: mounted ? new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }) : "August 29, 2026",
      generatedTime: mounted ? new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }) : "12:00 PM",
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
        subtitle: `${results.protein.percentage}% of energy`,
        colorTheme: "emerald",
      },
      {
        label: "Carbohydrate Target",
        value: `${results.carbs.grams} g`,
        subtitle: `${results.carbs.percentage}% of energy`,
        colorTheme: "purple",
      },
      {
        label: "Fat Target",
        value: `${results.fat.grams} g`,
        subtitle: `${results.fat.percentage}% of energy`,
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

  const customSum = customProteinPct + customCarbsPct + customFatPct;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 print:p-0 font-sans">
      {/* 10 Mode Selector Bar */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Select Calculation Mode ({modesList.length} Options)
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" role="radiogroup" aria-label="Calculation Mode">
          {modesList.map((m) => {
            const Icon = m.icon;
            const isSelected = calculationMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleModeChange(m.id)}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl transition-all duration-200 text-left cursor-pointer ${
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

      {/* Main Calculation & Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs Form */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm print:hidden">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              Personal Parameters
            </h3>

            {/* Unit System Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs" role="radiogroup" aria-label="Unit System">
              <button
                type="button"
                id="macro-unit-us"
                role="radio"
                aria-checked={unitSystem === "us"}
                onClick={() => handleUnitSystemChange("us")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  unitSystem === "us"
                    ? "bg-white text-emerald-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                US (lbs/ft)
              </button>
              <button
                type="button"
                id="macro-unit-metric"
                role="radio"
                aria-checked={unitSystem === "metric"}
                onClick={() => handleUnitSystemChange("metric")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
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
              <label htmlFor="macro-age" className="block text-xs font-semibold text-slate-700 mb-1">
                Age (Years)
              </label>
              <input
                id="macro-age"
                type="number"
                min={15}
                max={100}
                value={age}
                onChange={(e) => setAge(Math.max(15, Math.min(100, Number(e.target.value) || 25)))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="macro-gender" className="block text-xs font-semibold text-slate-700 mb-1">
                Biological Gender
              </label>
              <select
                id="macro-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
              >
                <option value="male">Male (♂)</option>
                <option value="female">Female (♀)</option>
              </select>
            </div>
          </div>

          {/* Height & Weight Inputs */}
          {unitSystem === "us" ? (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="macro-height-ft" className="block text-xs font-semibold text-slate-700 mb-1">
                  Height (Feet)
                </label>
                <input
                  id="macro-height-ft"
                  type="number"
                  min={3}
                  max={8}
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="macro-height-in" className="block text-xs font-semibold text-slate-700 mb-1">
                  Height (Inches)
                </label>
                <input
                  id="macro-height-in"
                  type="number"
                  step={0.5}
                  min={0}
                  max={11.5}
                  value={heightInches}
                  onChange={(e) => setHeightInches(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="macro-weight-lbs" className="block text-xs font-semibold text-slate-700 mb-1">
                  Weight (lbs)
                </label>
                <input
                  id="macro-weight-lbs"
                  type="number"
                  min={50}
                  max={800}
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="macro-height-cm" className="block text-xs font-semibold text-slate-700 mb-1">
                  Height (cm)
                </label>
                <input
                  id="macro-height-cm"
                  type="number"
                  min={90}
                  max={250}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="macro-weight-kg" className="block text-xs font-semibold text-slate-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  id="macro-weight-kg"
                  type="number"
                  step={0.1}
                  min={25}
                  max={350}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>
            </div>
          )}

          {/* Activity & Goal Selection */}
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <div>
              <label htmlFor="macro-activity" className="block text-xs font-semibold text-slate-700 mb-1">
                Activity Level
              </label>
              <select
                id="macro-activity"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
              >
                <option value="sedentary">Sedentary (1.20× — desk job, little exercise)</option>
                <option value="light">Light Active (1.375× — exercise 1-3 days/week)</option>
                <option value="moderate">Moderate Active (1.55× — exercise 4-5 days/week)</option>
                <option value="active">Active (1.725× — exercise 6-7 days/week)</option>
                <option value="very-active">Very Active (1.90× — daily intense sports training)</option>
                <option value="extra-active">Extra Active (2.00× — physical labor + intense training)</option>
              </select>
            </div>

            <div>
              <label htmlFor="macro-goal" className="block text-xs font-semibold text-slate-700 mb-1">
                Fitness &amp; Weight Goal
              </label>
              <select
                id="macro-goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value as FitnessGoal)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
              >
                <option value="maintain">Maintain Weight (0 kcal adjustment)</option>
                <option value="mild-loss">Mild Weight Loss (-250 kcal/day, -0.5 lb/wk)</option>
                <option value="loss">Weight Loss (-500 kcal/day, -1.0 lb/wk)</option>
                <option value="extreme-loss">Extreme Weight Loss (-1000 kcal/day, -2.0 lb/wk)</option>
                <option value="mild-gain">Mild Lean Bulk (+250 kcal/day, +0.5 lb/wk)</option>
                <option value="gain">Weight Gain (+500 kcal/day, +1.0 lb/wk)</option>
                <option value="extreme-gain">Fast Muscle Gain (+1000 kcal/day, +2.0 lb/wk)</option>
                <option value="recomp">Body Recomposition (-200 kcal/day + high protein)</option>
              </select>
            </div>
          </div>

          {/* Advanced BMR Formula & Body Composition */}
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Advanced BMR Formula &amp; Body Fat
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="macro-formula" className="block text-xs font-medium text-slate-600 mb-1">
                  BMR Formula
                </label>
                <select
                  id="macro-formula"
                  value={bmrFormula}
                  onChange={(e) => setBmrFormula(e.target.value as BmrFormulaType)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
                >
                  <option value="mifflin">Mifflin-St Jeor (Clinical Standard)</option>
                  <option value="katch">Katch-McArdle (LBM Based)</option>
                  <option value="revised-harris">Revised Harris-Benedict (1984)</option>
                  <option value="harris">Original Harris-Benedict (1919)</option>
                  <option value="cunningham">Cunningham (Athletic LBM)</option>
                  <option value="schofield">Schofield Equation</option>
                </select>
              </div>

              <div>
                <label htmlFor="macro-body-fat" className="block text-xs font-medium text-slate-600 mb-1">
                  Body Fat (%): <span className="text-emerald-700 font-bold">{bodyFat}%</span>
                </label>
                <input
                  id="macro-body-fat"
                  type="range"
                  min={3}
                  max={60}
                  value={bodyFat}
                  onChange={(e) => setBodyFat(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label htmlFor="macro-diet-style" className="block text-xs font-medium text-slate-600 mb-1">
                Dietary Preference / Macro Ratio Split
              </label>
              <select
                id="macro-diet-style"
                value={dietStyle}
                onChange={(e) => setDietStyle(e.target.value as DietStyleType)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
              >
                <option value="balanced">Balanced Split (30% P / 40% C / 30% F)</option>
                <option value="low-carb">Low Carb / Cutting (40% P / 20% C / 40% F)</option>
                <option value="high-protein">High Protein (45% P / 35% C / 20% F)</option>
                <option value="athlete">Athlete High-Carb (25% P / 55% C / 20% F)</option>
                <option value="keto">Ketogenic (25% P / 5% C / 70% F)</option>
                <option value="custom">Custom Builder (Enter manual ratios)</option>
              </select>
            </div>

            {/* Custom Ratio Sliders (visible when custom) */}
            {(dietStyle === "custom" || calculationMode === "custom") && (
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-emerald-900">Custom Macro Ratios</span>
                  <span className={`font-bold ${customSum === 100 ? "text-emerald-700" : "text-amber-700"}`}>
                    Total: {customSum}% {customSum === 100 ? "✔" : "(Must equal 100%)"}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-700 mb-0.5">
                      <span>Protein: {customProteinPct}%</span>
                      <span>{Math.round((results.targetCalories * customProteinPct) / 400)}g</span>
                    </div>
                    <input
                      id="macro-custom-p"
                      type="range"
                      min={5}
                      max={70}
                      value={customProteinPct}
                      onChange={(e) => setCustomProteinPct(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-700 mb-0.5">
                      <span>Carbohydrates: {customCarbsPct}%</span>
                      <span>{Math.round((results.targetCalories * customCarbsPct) / 400)}g</span>
                    </div>
                    <input
                      id="macro-custom-c"
                      type="range"
                      min={0}
                      max={85}
                      value={customCarbsPct}
                      onChange={(e) => setCustomCarbsPct(Number(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-700 mb-0.5">
                      <span>Fat: {customFatPct}%</span>
                      <span>{Math.round((results.targetCalories * customFatPct) / 900)}g</span>
                    </div>
                    <input
                      id="macro-custom-f"
                      type="range"
                      min={10}
                      max={80}
                      value={customFatPct}
                      onChange={(e) => setCustomFatPct(Number(e.target.value))}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
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
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm">
                  Health Score: {results.bodyComposition.healthScore}% ({results.bodyComposition.fitnessRating})
                </span>
              </div>
            </div>

            {/* Sub-Metrics Cards Grid */}
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

            {/* Complete Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-4 print:hidden">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-sm transition-all cursor-pointer"
                  title="Copy Summary"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-sm transition-all cursor-pointer"
                  title="Share URL"
                >
                  {shared ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
                  {shared ? "URL Copied!" : "Share"}
                </button>

                <button
                  type="button"
                  onClick={handleSaveScenario}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-sm transition-all cursor-pointer"
                  title="Save Scenario"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  Save ({savedScenarios.length})
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-sm transition-all cursor-pointer"
                  title="Export CSV Data"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  CSV
                </button>

                <button
                  type="button"
                  onClick={() => setIsReportOpen(true)}
                  className="flex items-center gap-2 bg-white text-emerald-800 hover:bg-emerald-50 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  Generate PDF Report
                </button>
              </div>
            </div>
          </div>

          {/* Saved Scenarios Drawer */}
          {isSavedDrawerOpen && (
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-emerald-600" />
                  Saved Macro Scenarios ({savedScenarios.length})
                </span>
                <button
                  type="button"
                  onClick={() => setIsSavedDrawerOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {savedScenarios.length === 0 ? (
                <p className="text-xs text-slate-500">No saved scenarios yet. Click &quot;Save&quot; to bookmark current inputs.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {savedScenarios.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white rounded-lg border border-slate-200 space-y-1.5 text-xs shadow-xs"
                    >
                      <div className="flex justify-between items-start">
                        <strong className="font-bold text-slate-900">{item.name}</strong>
                        <button
                          type="button"
                          onClick={() => handleDeleteScenario(item.id)}
                          className="text-rose-500 hover:text-rose-700 ml-1 cursor-pointer"
                          title="Delete scenario"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        Saved: {item.date} • {item.dietStyle.toUpperCase()}
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className="font-mono text-emerald-600 font-bold">
                          {item.proteinGrams}P / {item.carbsGrams}C / {item.fatGrams}F
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRestoreScenario(item)}
                          className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                        >
                          Restore
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Interactive Visualizations Container */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 print:hidden">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl overflow-x-auto text-xs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "distribution"}
                onClick={() => setActiveTab("distribution")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "distribution"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Macro Split Chart
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "trajectory"}
                onClick={() => setActiveTab("trajectory")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "trajectory"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                12-Week Weight Projection
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "ratio-comparison"}
                onClick={() => setActiveTab("ratio-comparison")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "ratio-comparison"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Diet Ratio Comparison
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "body-comp"}
                onClick={() => setActiveTab("body-comp")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "body-comp"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Body Composition &amp; FFMI
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "food-search"}
                onClick={() => setActiveTab("food-search")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
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
                  <div className="text-sm font-bold text-slate-900">
                    Macronutrient Energy Distribution
                  </div>
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
                  <div className="text-sm font-bold text-slate-900">
                    12-Week Weight Trajectory Forecast
                  </div>
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
                <div className="text-sm font-bold text-slate-900">
                  Dietary Style Macro Split Comparison
                </div>

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
                        <td className="p-3">General maintenance &amp; steady progress</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">Low Carb (40/20/40)</td>
                        <td className="p-3 font-bold text-emerald-700">{Math.round((results.targetCalories * 0.4) / 4)}g</td>
                        <td className="p-3 font-bold text-blue-700">{Math.round((results.targetCalories * 0.2) / 4)}g</td>
                        <td className="p-3 font-bold text-purple-700">{Math.round((results.targetCalories * 0.4) / 9)}g</td>
                        <td className="p-3">Cutting &amp; insulin sensitivity optimization</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">High Protein (45/35/20)</td>
                        <td className="p-3 font-bold text-emerald-700">{Math.round((results.targetCalories * 0.45) / 4)}g</td>
                        <td className="p-3 font-bold text-blue-700">{Math.round((results.targetCalories * 0.35) / 4)}g</td>
                        <td className="p-3 font-bold text-purple-700">{Math.round((results.targetCalories * 0.20) / 9)}g</td>
                        <td className="p-3">Body recomposition &amp; muscle preservation</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">Ketogenic (25/5/70)</td>
                        <td className="p-3 font-bold text-emerald-700">{Math.round((results.targetCalories * 0.25) / 4)}g</td>
                        <td className="p-3 font-bold text-blue-700">{Math.round((results.targetCalories * 0.05) / 4)}g</td>
                        <td className="p-3 font-bold text-purple-700">{Math.round((results.targetCalories * 0.70) / 9)}g</td>
                        <td className="p-3">Ketosis &amp; appetite suppression</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: Body Composition & FFMI */}
            {activeTab === "body-comp" && (
              <div className="space-y-4">
                <div className="text-sm font-bold text-slate-900">
                  Body Composition &amp; Fat-Free Mass Index (FFMI)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                    <div className="text-xs text-emerald-800 font-semibold">Lean Body Mass (LBM)</div>
                    <div className="text-xl font-extrabold text-emerald-900 mt-1">{results.bodyComposition.leanBodyMassLbs} lbs</div>
                    <div className="text-xs text-emerald-700 mt-1">Muscle, organ &amp; bone tissue</div>
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
                  <div className="text-sm font-bold text-slate-900">
                    Macronutrient Food Database (Search &amp; Filter)
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="macro-food-search"
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
                      type="button"
                      onClick={() => setFoodCategoryTab(cat)}
                      className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
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
            <div className="text-sm font-bold text-slate-900">
              Smart Insights &amp; Nutrition Strategy
            </div>

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
