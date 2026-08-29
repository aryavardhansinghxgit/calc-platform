"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Dumbbell,
  Activity,
  Sparkles,
  Flame,
  Scale,
  Apple,
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
  Baby,
  Share2,
  Bookmark,
  RefreshCw,
  Trash2,
  X,
  PieChart as PieIcon,
  HelpCircle,
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

interface SavedProteinScenario {
  id: string;
  name: string;
  date: string;
  unitSystem: UnitSystem;
  calculationMode: ProteinCalculationMode;
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
  pregnancyStatus: PregnancyStatusType;
  mealFrequency: number;
  customProteinGramsPerKg: number;
  proteinTargetGrams: number;
  proteinCalories: number;
  targetCalories: number;
}

export function ProteinCalculator() {
  const [mounted, setMounted] = useState(false);

  // Mode & Unit State (Canonical baseline default: Age 25, Male, 5'10", 160 lbs, Light Active, Maintain)
  const [calculationMode, setCalculationMode] = useState<ProteinCalculationMode>("daily");
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
  const [pregnancyStatus, setPregnancyStatus] = useState<PregnancyStatusType>("none");
  const [mealFrequency, setMealFrequency] = useState<number>(4);
  const [customProteinGramsPerKg, setCustomProteinGramsPerKg] = useState<number>(1.8);

  // Searchable Food Database State
  const [foodQuery, setFoodQuery] = useState<string>("");
  const [foodCategoryTab, setFoodCategoryTab] = useState<string>("All");

  // Active View Tab
  const [activeTab, setActiveTab] = useState<
    | "distribution"
    | "per-meal"
    | "rda-comparison"
    | "eaa-profile"
    | "food-search"
    | "body-comp"
  >("distribution");

  // Modal & Notification State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // Saved Scenarios Drawer State
  const [savedScenarios, setSavedScenarios] = useState<SavedProteinScenario[]>([]);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Load URL params & localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("protein_saved_scenarios");
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
      const urlPreg = params.get("preg");
      const urlMeals = params.get("meals");
      const urlCustom = params.get("customGkg");

      if (urlUnit === "us" || urlUnit === "metric") setUnitSystem(urlUnit);
      if (urlMode && [
        "daily", "hypertrophy", "cutting", "maintenance", "pregnancy",
        "senior", "endurance", "strength", "vegan", "custom"
      ].includes(urlMode)) {
        setCalculationMode(urlMode as ProteinCalculationMode);
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
      if (urlPreg && ["none", "t1", "t2", "t3", "lactation-1", "lactation-2"].includes(urlPreg)) {
        setPregnancyStatus(urlPreg as PregnancyStatusType);
      }
      if (urlMeals && !isNaN(Number(urlMeals))) setMealFrequency(Number(urlMeals));
      if (urlCustom && !isNaN(Number(urlCustom))) setCustomProteinGramsPerKg(Number(urlCustom));

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

  const persistScenarios = (list: SavedProteinScenario[]) => {
    setSavedScenarios(list);
    try {
      localStorage.setItem("protein_saved_scenarios", JSON.stringify(list));
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

  // Reset Defaults Handler (Canonical Baseline)
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
    setPregnancyStatus("none");
    setMealFrequency(4);
    setCustomProteinGramsPerKg(1.8);
  };

  // Calculation Engine Memo
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
      customProteinGramsPerKg,
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
    customProteinGramsPerKg,
  ]);

  // Modes Configuration
  const modesList: { id: ProteinCalculationMode; label: string; icon: any; desc: string }[] = [
    { id: "daily", label: "Daily Baseline", icon: Dumbbell, desc: "Evidence-based baseline (1.6g/kg)" },
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

  // Save Current Scenario
  const handleSaveScenario = () => {
    const newScenario: SavedProteinScenario = {
      id: Date.now().toString(),
      name: `${age}y ${gender.toUpperCase()} • ${results.proteinTargetGrams}g Protein (${calculationMode})`,
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
      pregnancyStatus,
      mealFrequency,
      customProteinGramsPerKg,
      proteinTargetGrams: results.proteinTargetGrams,
      proteinCalories: results.proteinCalories,
      targetCalories: results.targetCalories,
    };
    persistScenarios([newScenario, ...savedScenarios]);
    setIsSavedDrawerOpen(true);
  };

  const handleRestoreScenario = (s: SavedProteinScenario) => {
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
    setPregnancyStatus(s.pregnancyStatus);
    setMealFrequency(s.mealFrequency);
    if (s.customProteinGramsPerKg) setCustomProteinGramsPerKg(s.customProteinGramsPerKg);
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
    url.searchParams.set("preg", pregnancyStatus);
    url.searchParams.set("meals", mealFrequency.toString());

    if (calculationMode === "custom") {
      url.searchParams.set("customGkg", customProteinGramsPerKg.toString());
    }

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
          title: "Daily Protein Intake Plan",
          text: `Daily Target: ${results.proteinTargetGrams}g Protein (${results.proteinGramsPerLb} g/lb) across ${results.targetCalories} kcal.`,
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
      ["Target", "Daily Calorie Target", `${results.targetCalories} kcal`, ""],
      ["Protein Target", "Daily Protein Target", `${results.proteinTargetGrams} g`, `${results.proteinCalories} kcal (${results.proteinPercentage}%)`],
      ["Protein Target", "Protein per Pound", `${results.proteinGramsPerLb} g/lb`, ""],
      ["Protein Target", "Protein per Kilogram", `${results.proteinGramsPerKg} g/kg`, ""],
      ["Protein Target", "Adult RDA Minimum (0.8 g/kg)", `${results.rdaMinimumGrams} g`, ""],
      ["Meal Distribution", "Meal Frequency", `${mealFrequency} meals/day`, ""],
      ["Meal Distribution", "Per-Meal Protein Target", `${results.perMealProteinGrams} g/meal`, ""],
      ["Meal Distribution", "Per-Meal Leucine Trigger Target", `${results.leucineTargetPerMeal} g`, "~9% leucine share"],
      ["Gestational Adjustment", "Status", results.pregnancyAdjustment.label, `+${results.pregnancyAdjustment.extraProteinGrams} g/day`],
      ["", "", "", ""],
      ["9 ESSENTIAL AMINO ACIDS (EAA) PROFILE", "", "", ""],
      ["Amino Acid", "Daily Target (g)", "Biological Function", ""],
      ...results.eaaProfile.map((eaa) => [eaa.aminoAcid, eaa.targetGrams.toString(), eaa.functionDesc, ""]),
      ["", "", "", ""],
      ["HIGH-PROTEIN FOOD DATABASE", "", "", ""],
      ["Food Item", "Category", "Serving Size", "Protein (g)", "Calories (kcal)", "Protein Quality", "Leucine (g)"],
      ...results.foodDatabase.map((f) => [f.name, f.category, f.servingSize, f.protein.toString(), f.calories.toString(), f.qualityType, f.leucineContent.toString()]),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((r) => r.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
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
    const summaryText = `Protein Calculator Results:
• Daily Protein Target: ${results.proteinTargetGrams} g/day (${results.proteinGramsPerLb} g/lb | ${results.proteinGramsPerKg} g/kg)
• Energy Contribution: ${results.proteinCalories} kcal (${results.proteinPercentage}% of daily ${results.targetCalories} kcal)
• Adult RDA Minimum: ${results.rdaMinimumGrams} g/day (Baseline: +${results.proteinTargetGrams - results.rdaMinimumGrams}g)
• Per-Meal Target (${mealFrequency} meals): ${results.perMealProteinGrams} g/meal
• Leucine Trigger: ${results.leucineTargetPerMeal} g Leucine/meal
• BMR: ${results.bmr} kcal | TDEE: ${results.tdee} kcal (${results.formulaUsed})
Calculated via CalcPlatform Precision Nutrition Engine`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // PDF Report Modal Data
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Professional Protein Calculator & Nutrition Suite",
      reportTitle: "Clinical Protein Requirements & Amino Acid Analysis",
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
        label: "Daily Protein Target",
        value: `${results.proteinTargetGrams} g`,
        subtitle: `${results.proteinGramsPerLb} g/lb (${results.proteinGramsPerKg} g/kg)`,
        colorTheme: "emerald",
      },
      {
        label: "Protein Calories",
        value: `${results.proteinCalories} kcal`,
        subtitle: `${results.proteinPercentage}% of daily energy`,
        colorTheme: "rose",
      },
      {
        label: "Per-Meal Protein",
        value: `${results.perMealProteinGrams} g`,
        subtitle: `${mealFrequency} meals per day`,
        colorTheme: "purple",
      },
      {
        label: "Leucine Trigger",
        value: `${results.leucineTargetPerMeal} g`,
        subtitle: "MPS Anabolic Trigger / meal",
        colorTheme: "amber",
      },
    ],
    sections: [
      {
        title: "Personal Demographics & Energy Expenditure",
        items: [
          { label: "Unit System", value: unitSystem.toUpperCase() },
          { label: "Calculation Mode", value: calculationMode.toUpperCase() },
          { label: "Age & Biological Gender", value: `${age} yrs (${gender.toUpperCase()})` },
          { label: "Physical Activity Level", value: activityLevel.toUpperCase() },
          { label: "BMR Formula Used", value: results.formulaUsed },
          { label: "Basal Metabolic Rate (BMR)", value: `${results.bmr} kcal` },
          { label: "Total Energy Expenditure (TDEE)", value: `${results.tdee} kcal` },
          { label: "Daily Calorie Target", value: `${results.targetCalories} kcal` },
        ],
      },
      {
        title: "Protein Thresholds & Guidelines",
        items: [
          { label: "Adult RDA Minimum (0.8 g/kg)", value: `${results.rdaMinimumGrams} g/day` },
          { label: "Optimal Fitness Target Range", value: `${results.proteinRangeMin} – ${results.proteinRangeMax} g/day` },
          { label: "Gestational Addition", value: results.pregnancyAdjustment.label },
          { label: "Body Mass Index (BMI)", value: results.bodyComposition.bmi.toString() },
          { label: "Fat-Free Mass Index (FFMI)", value: results.bodyComposition.ffmi.toString() },
          { label: "Health & Fitness Score", value: `${results.bodyComposition.healthScore}%` },
        ],
      },
    ],
    recommendation: {
      title: "Personalized Protein Strategy",
      text: results.insights[0] || "Consume adequate high-quality protein evenly distributed across meals.",
      reasons: results.recommendations,
      score: results.bodyComposition.healthScore,
      rating: "Evidence-Based Guidance",
    },
    table: {
      title: "Macronutrient Energy Distribution",
      headers: [
        { key: "macro", label: "Macronutrient", align: "left" },
        { key: "grams", label: "Grams (g)", align: "right" },
        { key: "calories", label: "Calories (kcal)", align: "right" },
        { key: "percentage", label: "Energy Share (%)", align: "right" },
      ],
      rows: [
        { macro: "Protein", grams: `${results.proteinTargetGrams} g`, calories: `${results.proteinCalories} kcal`, percentage: `${results.proteinPercentage}%` },
        { macro: "Carbohydrates", grams: `${results.carbs.grams} g`, calories: `${results.carbs.calories} kcal`, percentage: `${results.carbs.percentage}%` },
        { macro: "Dietary Fat", grams: `${results.fat.grams} g`, calories: `${results.fat.calories} kcal`, percentage: `${results.fat.percentage}%` },
      ],
    },
    notes: [
      "Protein values are calculated under the standard Atwater general-factor system (4 kcal/g).",
      "Re-evaluate protein targets as your body weight, workout training volume, or dietary goals change.",
    ],
  };

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
                onClick={() => setCalculationMode(m.id)}
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
                id="protein-unit-us"
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
                id="protein-unit-metric"
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

          {/* Age & Gender Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="protein-age" className="block text-xs font-semibold text-slate-700 mb-1">
                Age (Years)
              </label>
              <input
                id="protein-age"
                type="number"
                min={15}
                max={100}
                value={age}
                onChange={(e) => setAge(Math.max(15, Math.min(100, Number(e.target.value) || 25)))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="protein-gender" className="block text-xs font-semibold text-slate-700 mb-1">
                Biological Gender
              </label>
              <select
                id="protein-gender"
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
                <label htmlFor="protein-height-ft" className="block text-xs font-semibold text-slate-700 mb-1">
                  Height (Feet)
                </label>
                <input
                  id="protein-height-ft"
                  type="number"
                  min={3}
                  max={8}
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="protein-height-in" className="block text-xs font-semibold text-slate-700 mb-1">
                  Height (Inches)
                </label>
                <input
                  id="protein-height-in"
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
                <label htmlFor="protein-weight-lbs" className="block text-xs font-semibold text-slate-700 mb-1">
                  Weight (lbs)
                </label>
                <input
                  id="protein-weight-lbs"
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
                <label htmlFor="protein-height-cm" className="block text-xs font-semibold text-slate-700 mb-1">
                  Height (cm)
                </label>
                <input
                  id="protein-height-cm"
                  type="number"
                  min={90}
                  max={250}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="protein-weight-kg" className="block text-xs font-semibold text-slate-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  id="protein-weight-kg"
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
              <label htmlFor="protein-activity" className="block text-xs font-semibold text-slate-700 mb-1">
                Activity Level
              </label>
              <select
                id="protein-activity"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
              >
                <option value="sedentary">Sedentary (1.20× — desk job, little exercise)</option>
                <option value="light">Light Active (1.375× — exercise 1-3 times/week)</option>
                <option value="moderate">Moderate Active (1.55× — exercise 4-5 times/week)</option>
                <option value="active">Active (1.725× — exercise 6-7 times/week)</option>
                <option value="very-active">Very Active (1.90× — daily intense sports training)</option>
                <option value="extra-active">Extra Active (2.00× — physical labor + intense training)</option>
              </select>
            </div>

            <div>
              <label htmlFor="protein-goal" className="block text-xs font-semibold text-slate-700 mb-1">
                Fitness Goal
              </label>
              <select
                id="protein-goal"
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

          {/* Special Additions & Meal Frequency */}
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Special Additions &amp; Meal Frequency
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="protein-pregnancy" className="block text-xs font-semibold text-slate-700 mb-1">
                  Pregnancy / Lactation
                </label>
                <select
                  id="protein-pregnancy"
                  value={pregnancyStatus}
                  onChange={(e) => setPregnancyStatus(e.target.value as PregnancyStatusType)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
                >
                  <option value="none">Not Applicable</option>
                  <option value="t1">Trimester 1 (+1g/day)</option>
                  <option value="t2">Trimester 2 (+10g/day)</option>
                  <option value="t3">Trimester 3 (+31g/day)</option>
                  <option value="lactation-1">Lactation 0–6 Mo (+19g/day)</option>
                  <option value="lactation-2">Lactation &gt;6 Mo (+13g/day)</option>
                </select>
              </div>

              <div>
                <label htmlFor="protein-meals" className="block text-xs font-semibold text-slate-700 mb-1">
                  Meal Frequency: <span className="text-emerald-700 font-bold">{mealFrequency} meals</span>
                </label>
                <input
                  id="protein-meals"
                  type="range"
                  min={1}
                  max={6}
                  value={mealFrequency}
                  onChange={(e) => setMealFrequency(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer mt-1"
                />
              </div>
            </div>

            {/* Custom Builder Slider */}
            {calculationMode === "custom" && (
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="protein-custom-gkg" className="font-bold text-emerald-900">
                    Custom Protein Ratio: {customProteinGramsPerKg} g/kg
                  </label>
                  <span className="text-emerald-700 font-bold">
                    ({(customProteinGramsPerKg / 2.20462).toFixed(2)} g/lb)
                  </span>
                </div>
                <input
                  id="protein-custom-gkg"
                  type="range"
                  step={0.1}
                  min={0.8}
                  max={3.5}
                  value={customProteinGramsPerKg}
                  onChange={(e) => setCustomProteinGramsPerKg(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
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
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm">
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
                  Saved Protein Scenarios ({savedScenarios.length})
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
                        Saved: {item.date} • {item.mealFrequency} meals
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className="font-mono text-emerald-600 font-bold">
                          {item.proteinTargetGrams}g Protein ({item.targetCalories} kcal)
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
                Protein Energy Split
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "per-meal"}
                onClick={() => setActiveTab("per-meal")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "per-meal"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Per-Meal &amp; Leucine
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "rda-comparison"}
                onClick={() => setActiveTab("rda-comparison")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "rda-comparison"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                RDA vs Fitness Target
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "eaa-profile"}
                onClick={() => setActiveTab("eaa-profile")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "eaa-profile"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                9 Essential Amino Acids
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
                High-Protein Food Database
              </button>
            </div>

            {/* TAB 1: Protein Energy Split */}
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

            {/* TAB 2: Per-Meal Distribution & Leucine Trigger */}
            {activeTab === "per-meal" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-slate-900">
                    Per-Meal Protein Distribution &amp; Leucine Threshold
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Frequency: {mealFrequency} meals / day</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                    <span className="text-xs font-bold text-emerald-900 block">Per-Meal Protein Allotment</span>
                    <div className="text-2xl font-extrabold text-emerald-700">{results.perMealProteinGrams} g / meal</div>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Dividing {results.proteinTargetGrams}g evenly across {mealFrequency} meals provides continuous amino acid availability.
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
                    <span className="text-xs font-bold text-amber-900 block">Leucine Anabolic Trigger</span>
                    <div className="text-2xl font-extrabold text-amber-700">{results.leucineTargetPerMeal} g / meal</div>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      High-quality proteins provide ~9% leucine, fulfilling the ~2.5–3.5g threshold needed to stimulate mTORC1.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: RDA vs Optimal Fitness Target */}
            {activeTab === "rda-comparison" && (
              <div className="space-y-4">
                <div className="text-sm font-bold text-slate-900">
                  RDA Baseline (0.8 g/kg) vs. Optimal Fitness Target
                </div>

                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rdaBarData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                        formatter={(val: any) => [`${val} g/day`, ""]}
                      />
                      <Bar dataKey="RDA Minimum (0.8g/kg)" fill="#94a3b8" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="Optimal Fitness Target" fill="#10b981" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* TAB 4: 9 Essential Amino Acids */}
            {activeTab === "eaa-profile" && (
              <div className="space-y-4">
                <div className="text-sm font-bold text-slate-900">
                  9 Essential Amino Acid (EAA) Requirements Breakdown
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 uppercase font-bold">
                      <tr>
                        <th className="p-3">Essential Amino Acid</th>
                        <th className="p-3">Daily Target (g)</th>
                        <th className="p-3">Biological Function</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {results.eaaProfile.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900">{item.aminoAcid}</td>
                          <td className="p-3 font-bold text-emerald-700">{item.targetGrams} g</td>
                          <td className="p-3 text-slate-600">{item.functionDesc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 5: High-Protein Food Database */}
            {activeTab === "food-search" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-sm font-bold text-slate-900">
                    High-Protein Food Database (Search &amp; Filter)
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      id="protein-food-search"
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
                          <td className="p-3 font-bold text-slate-900">{item.calories} kcal</td>
                          <td className="p-3 text-slate-600">{item.qualityType}</td>
                          <td className="p-3 font-bold text-amber-700">{item.leucineContent} g</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Smart Insights & Evidence-Based Guidelines */}
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

export default ProteinCalculator;
