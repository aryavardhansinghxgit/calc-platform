"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Activity,
  Sparkles,
  Flame,
  Scale,
  TrendingUp,
  Download,
  Printer,
  Copy,
  Check,
  Info,
  CheckCircle2,
  Sliders,
  FileSpreadsheet,
  Zap,
  Award,
  Layers,
  Share2,
  Bookmark,
  Trash2,
  RefreshCw,
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
  LineChart,
  Line,
} from "recharts";
import { calculateTdeeCalculator } from "@/app/calculators/tdee-calculator/calculator";
import {
  TdeeCalculationMode,
  UnitSystem,
  EnergyUnit,
  Gender,
  ActivityLevel,
  FitnessGoal,
  BmrFormulaType,
} from "@/app/calculators/tdee-calculator/types";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

interface SavedTdeeScenario {
  id: string;
  timestamp: string;
  mode: TdeeCalculationMode;
  unitSystem: UnitSystem;
  energyUnit: EnergyUnit;
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
  dailySteps: number;
  workoutFrequency: number;
  tdee: number;
  bmr: number;
  targetCalories: number;
}

export function TdeeCalculator() {
  // Mode & Unit State
  const [calculationMode, setCalculationMode] = useState<TdeeCalculationMode>("tdee");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");
  const [energyUnit, setEnergyUnit] = useState<EnergyUnit>("kcal");

  // Basic Inputs State (Canonical Reference Baseline: 25M, 5ft 10in, 165 lbs)
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
  const [bodyFat, setBodyFat] = useState<number>(18);
  const [dailySteps, setDailySteps] = useState<number>(7500);
  const [workoutFrequency, setWorkoutFrequency] = useState<number>(4);
  const [workoutDuration, setWorkoutDuration] = useState<number>(45);
  const [customDelta, setCustomDelta] = useState<number>(0);

  // Active View Tab
  const [activeTab, setActiveTab] = useState<
    | "components"
    | "goal-plan"
    | "projections"
    | "bmr-formulas"
    | "activity-burn"
  >("components");

  // Modal, Copy, Share & Persistence State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [savedScenarios, setSavedScenarios] = useState<SavedTdeeScenario[]>([]);

  // Client hydration from localStorage
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem("tdee_saved_scenarios");
      if (stored) {
        setSavedScenarios(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load saved scenarios from localStorage", e);
    }
  }, []);

  // Client hydration from URL query parameters
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);

    if (params.has("unit")) {
      const u = params.get("unit");
      if (u === "us" || u === "metric") setUnitSystem(u);
    }
    if (params.has("energy")) {
      const e = params.get("energy");
      if (e === "kcal" || e === "kj") setEnergyUnit(e);
    }
    if (params.has("mode")) {
      const m = params.get("mode") as TdeeCalculationMode;
      if (m) setCalculationMode(m);
    }
    if (params.has("age")) {
      const a = Number(params.get("age"));
      if (!isNaN(a) && a >= 2 && a <= 120) setAge(a);
    }
    if (params.has("gender")) {
      const g = params.get("gender");
      if (g === "male" || g === "female") setGender(g);
    }
    if (params.has("hFt")) {
      const v = Number(params.get("hFt"));
      if (!isNaN(v) && v >= 0) setHeightFeet(v);
    }
    if (params.has("hIn")) {
      const v = Number(params.get("hIn"));
      if (!isNaN(v) && v >= 0) setHeightInches(v);
    }
    if (params.has("hCm")) {
      const v = Number(params.get("hCm"));
      if (!isNaN(v) && v > 0) setHeightCm(v);
    }
    if (params.has("wLbs")) {
      const v = Number(params.get("wLbs"));
      if (!isNaN(v) && v > 0) setWeightLbs(v);
    }
    if (params.has("wKg")) {
      const v = Number(params.get("wKg"));
      if (!isNaN(v) && v > 0) setWeightKg(v);
    }
    if (params.has("act")) {
      const act = params.get("act") as ActivityLevel;
      if (act) setActivityLevel(act);
    }
    if (params.has("goal")) {
      const g = params.get("goal") as FitnessGoal;
      if (g) setGoal(g);
    }
    if (params.has("formula")) {
      const f = params.get("formula") as BmrFormulaType;
      if (f) setBmrFormula(f);
    }
    if (params.has("steps")) {
      const s = Number(params.get("steps"));
      if (!isNaN(s) && s >= 0) setDailySteps(s);
    }
    if (params.has("wf")) {
      const w = Number(params.get("wf"));
      if (!isNaN(w) && w >= 0) setWorkoutFrequency(w);
    }
  }, []);

  // Sync unit changes
  const handleUnitSystemChange = (newUnit: UnitSystem) => {
    setUnitSystem(newUnit);
    if (newUnit === "metric") {
      const totalInches = heightFeet * 12 + heightInches;
      setHeightCm(Math.round(totalInches * 2.54));
      setWeightKg(Math.round(weightLbs / 2.20462));
    } else {
      const totalInches = heightCm / 2.54;
      setHeightFeet(Math.floor(totalInches / 12));
      setHeightInches(Math.round(totalInches % 12));
      setWeightLbs(Math.round(weightKg * 2.20462));
    }
  };

  // Reset to canonical baseline defaults
  const handleReset = () => {
    setCalculationMode("tdee");
    setUnitSystem("us");
    setEnergyUnit("kcal");
    setAge(25);
    setGender("male");
    setHeightFeet(5);
    setHeightInches(10);
    setHeightCm(178);
    setWeightLbs(165);
    setWeightKg(75);
    setActivityLevel("moderate");
    setGoal("maintain");
    setBmrFormula("mifflin");
    setBodyFat(18);
    setDailySteps(7500);
    setWorkoutFrequency(4);
    setWorkoutDuration(45);
    setCustomDelta(0);
  };

  // Results Calculation Memo
  const results = useMemo(() => {
    return calculateTdeeCalculator({
      unitSystem,
      energyUnit,
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
      dailySteps,
      workoutFrequency,
      workoutDuration,
      customDelta,
    });
  }, [
    unitSystem,
    energyUnit,
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
    dailySteps,
    workoutFrequency,
    workoutDuration,
    customDelta,
  ]);

  const unitLabel = energyUnit === "kj" ? "kJ" : "kcal";

  // Modes Configuration
  const modesList: { id: TdeeCalculationMode; label: string; icon: any; desc: string }[] = [
    { id: "tdee", label: "TDEE Calculator", icon: Activity, desc: "Total daily expenditure" },
    { id: "maintenance", label: "Maintenance", icon: Scale, desc: "Equilibrium calorie target" },
    { id: "loss", label: "Weight Loss", icon: Flame, desc: "Fat loss deficit (-500 kcal)" },
    { id: "gain", label: "Weight Gain", icon: TrendingUp, desc: "Calorie surplus (+500 kcal)" },
    { id: "lean-bulk", label: "Lean Bulk", icon: Zap, desc: "Muscle hypertrophy (+250 kcal)" },
    { id: "cutting", label: "Cutting Protocol", icon: Flame, desc: "Fat loss deficit (-500 kcal)" },
    { id: "recomp", label: "Body Recomposition", icon: Sparkles, desc: "Mild deficit (-200 kcal)" },
    { id: "athlete", label: "Athlete TDEE", icon: Award, desc: "High performance expenditure" },
    { id: "metabolism", label: "Metabolism Breakdown", icon: Layers, desc: "BMR + NEAT + EAT + TEF" },
    { id: "custom", label: "Custom Target", icon: Sliders, desc: "Custom deficit/surplus" },
  ];

  // Component Breakdown Donut Chart Data
  const componentPieData = [
    { name: "BMR (Basal Rate)", value: results.components.bmrCalories, color: "#06b6d4" },
    { name: "NEAT (Daily Movement)", value: results.components.neatCalories, color: "#10b981" },
    { name: "EAT (Exercise)", value: results.components.eatCalories, color: "#f59e0b" },
    { name: "TEF (Digestion)", value: results.components.tefCalories, color: "#8b5cf6" },
  ];

  // Goal Strategy Bar Data
  const goalPlanBarData = [
    { name: "Extreme Loss", Target: results.goalPlan.extremeLoss },
    { name: "Loss (-500)", Target: results.goalPlan.moderateLoss },
    { name: "Mild Loss", Target: results.goalPlan.mildLoss },
    { name: "Maintenance", Target: results.goalPlan.maintenance },
    { name: "Lean Bulk (+250)", Target: results.goalPlan.leanBulk },
    { name: "Gain (+500)", Target: results.goalPlan.moderateGain },
  ];

  // CSV Export Handler
  const handleExportCSV = () => {
    let csv = "Category,Parameter,Value\n";
    csv += `Metadata,Exported At,"${new Date().toISOString()}"\n`;
    csv += `Metadata,Calculation Mode,"${results.mode}"\n`;
    csv += `Profile,Age,${age}\n`;
    csv += `Profile,Gender,"${gender}"\n`;
    csv += `Profile,Unit System,"${unitSystem}"\n`;
    csv += `Profile,Energy Unit,"${energyUnit}"\n`;
    if (unitSystem === "us") {
      csv += `Profile,Height,"${heightFeet} ft ${heightInches} in"\n`;
      csv += `Profile,Weight,"${weightLbs} lbs"\n`;
    } else {
      csv += `Profile,Height,"${heightCm} cm"\n`;
      csv += `Profile,Weight,"${weightKg} kg"\n`;
    }
    csv += `Profile,Activity Level,"${activityLevel}"\n`;
    csv += `Profile,Daily Steps,${dailySteps}\n`;
    csv += `Profile,Workouts,"${workoutFrequency} sessions/wk"\n`;
    csv += `Results,BMR Formula,"${results.formulaUsed}"\n`;
    csv += `Results,Basal Metabolic Rate (BMR),${results.bmr} ${unitLabel}\n`;
    csv += `Results,Total Daily Energy Expenditure (TDEE),${results.tdee} ${unitLabel}\n`;
    csv += `Results,Target Calorie Goal,${results.targetCalories} ${unitLabel}\n`;
    csv += `Results,NEAT Movement,${results.components.neatCalories} ${unitLabel}\n`;
    csv += `Results,EAT Exercise,${results.components.eatCalories} ${unitLabel}\n`;
    csv += `Results,TEF Digestion,${results.components.tefCalories} ${unitLabel}\n\n`;

    csv += "12-Week Weight Projection\nWeek,Projected Weight (lbs),Projected Weight (kg)\n";
    results.weightProjections.forEach((p) => {
      csv += `${p.week},${p.weightLbs},${p.weightKg}\n`;
    });
    csv += "\n";

    csv += "7 Clinical BMR Formulas Comparison\nFormula,BMR Value,Estimated TDEE,Variance vs Current\n";
    results.formulaComparisons.forEach((fc) => {
      csv += `"${fc.formulaName}",${fc.bmrValue},${fc.tdeeValue},${fc.difference}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tdee_assessment_${results.targetCalories}${unitLabel}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy Summary Handler
  const handleCopy = () => {
    const summaryText = `TDEE Assessment Summary:
• Total Daily Energy Expenditure (TDEE): ${results.tdee} ${unitLabel}/day
• Target Calorie Goal: ${results.targetCalories} ${unitLabel}/day
• Basal Metabolic Rate (BMR): ${results.bmr} ${unitLabel}/day (${results.formulaUsed})
• Energy Components:
  - BMR: ${results.components.bmrCalories} ${unitLabel}
  - NEAT: ${results.components.neatCalories} ${unitLabel} (${dailySteps.toLocaleString()} steps)
  - EAT: ${results.components.eatCalories} ${unitLabel} (${workoutFrequency} workouts/wk)
  - TEF: ${results.components.tefCalories} ${unitLabel} (~10% of TDEE)
Calculated with Calculator Platform TDEE Suite.`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Share URL Handler
  const handleShare = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set("unit", unitSystem);
    url.searchParams.set("energy", energyUnit);
    url.searchParams.set("mode", calculationMode);
    url.searchParams.set("age", age.toString());
    url.searchParams.set("gender", gender);
    if (unitSystem === "us") {
      url.searchParams.set("hFt", heightFeet.toString());
      url.searchParams.set("hIn", heightInches.toString());
      url.searchParams.set("wLbs", weightLbs.toString());
    } else {
      url.searchParams.set("hCm", heightCm.toString());
      url.searchParams.set("wKg", weightKg.toString());
    }
    url.searchParams.set("act", activityLevel);
    url.searchParams.set("goal", goal);
    url.searchParams.set("formula", bmrFormula);
    url.searchParams.set("steps", dailySteps.toString());
    url.searchParams.set("wf", workoutFrequency.toString());

    window.history.replaceState({}, "", url.toString());
    navigator.clipboard.writeText(url.toString());
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  };

  // Save Scenario to localStorage
  const handleSaveScenario = () => {
    const scenario: SavedTdeeScenario = {
      id: "tdee-" + Date.now(),
      timestamp: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      mode: calculationMode,
      unitSystem,
      energyUnit,
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
      dailySteps,
      workoutFrequency,
      tdee: results.tdee,
      bmr: results.bmr,
      targetCalories: results.targetCalories,
    };

    const updated = [scenario, ...savedScenarios.slice(0, 9)];
    setSavedScenarios(updated);
    try {
      localStorage.setItem("tdee_saved_scenarios", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save scenario to localStorage", e);
    }
  };

  // Restore Scenario
  const handleRestoreScenario = (sc: SavedTdeeScenario) => {
    setCalculationMode(sc.mode);
    setUnitSystem(sc.unitSystem);
    setEnergyUnit(sc.energyUnit);
    setAge(sc.age);
    setGender(sc.gender);
    setHeightFeet(sc.heightFeet);
    setHeightInches(sc.heightInches);
    setHeightCm(sc.heightCm);
    setWeightLbs(sc.weightLbs);
    setWeightKg(sc.weightKg);
    setActivityLevel(sc.activityLevel);
    setGoal(sc.goal);
    setBmrFormula(sc.bmrFormula);
    setDailySteps(sc.dailySteps);
    setWorkoutFrequency(sc.workoutFrequency);
  };

  // Delete Scenario
  const handleDeleteScenario = (id: string) => {
    const filtered = savedScenarios.filter((s) => s.id !== id);
    setSavedScenarios(filtered);
    try {
      localStorage.setItem("tdee_saved_scenarios", JSON.stringify(filtered));
    } catch (e) {
      console.error("Failed to delete scenario from localStorage", e);
    }
  };

  // Print Handler
  const handlePrint = () => {
    setIsReportOpen(true);
  };

  // Report Modal Data Structure
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Professional TDEE Calculator & Metabolism Suite",
      reportTitle: "Clinical Energy Expenditure & Metabolic Assessment Report",
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
        label: "Total Expenditure (TDEE)",
        value: `${results.tdee} ${unitLabel}`,
        subtitle: "Total daily energy burned",
        colorTheme: "cyan",
      },
      {
        label: "Target Calorie Goal",
        value: `${results.targetCalories} ${unitLabel}`,
        subtitle: `Weekly: ${results.timeframeTotals.weekly.toLocaleString()} ${unitLabel}`,
        colorTheme: "emerald",
      },
      {
        label: "Basal Rate (BMR)",
        value: `${results.bmr} ${unitLabel}`,
        subtitle: results.formulaUsed,
        colorTheme: "purple",
      },
      {
        label: "NEAT Movement",
        value: `${results.components.neatCalories} ${unitLabel}`,
        subtitle: `${dailySteps.toLocaleString()} steps/day`,
        colorTheme: "amber",
      },
    ],
    sections: [
      {
        title: "Personal Metrics & Energy Expenditure",
        items: [
          { label: "Unit System", value: unitSystem.toUpperCase() },
          { label: "Energy Unit", value: energyUnit.toUpperCase() },
          { label: "Calculation Mode", value: calculationMode.toUpperCase() },
          { label: "Age & Gender", value: `${age} yrs (${gender.toUpperCase()})` },
          { label: "Activity Level", value: activityLevel.toUpperCase() },
          { label: "BMR Formula Used", value: results.formulaUsed },
          { label: "Basal Metabolic Rate (BMR)", value: `${results.bmr} ${unitLabel}` },
          { label: "Total Energy Expenditure (TDEE)", value: `${results.tdee} ${unitLabel}` },
        ],
      },
      {
        title: "TDEE Metabolic Component Breakdown",
        items: [
          { label: "Basal Metabolic Rate (BMR)", value: `${results.components.bmrCalories} ${unitLabel}` },
          { label: "Non-Exercise Activity (NEAT)", value: `${results.components.neatCalories} ${unitLabel}` },
          { label: "Exercise Activity (EAT)", value: `${results.components.eatCalories} ${unitLabel}` },
          { label: "Thermic Effect of Food (TEF)", value: `${results.components.tefCalories} ${unitLabel}` },
          { label: "Daily Step Count", value: `${dailySteps.toLocaleString()} steps` },
          { label: "Workout Frequency", value: `${workoutFrequency} sessions / week (${workoutDuration} mins)` },
        ],
      },
    ],
    recommendation: {
      title: "Personalized Calorie & Metabolic Strategy",
      text: results.insights[0] || "Maintain energy balance.",
      reasons: results.recommendations,
      score: results.bodyComposition.healthScore,
      rating: "Optimal Metabolic Alignment",
    },
    table: {
      title: "Goal Calorie Strategy Options",
      headers: [
        { key: "strategy", label: "Strategy Option", align: "left" },
        { key: "dailyTarget", label: `Daily (${unitLabel})`, align: "right" },
        { key: "weeklyTarget", label: `Weekly (${unitLabel})`, align: "right" },
        { key: "rate", label: "Weekly Rate", align: "right" },
      ],
      rows: [
        { strategy: "Maintenance Calories", dailyTarget: `${results.goalPlan.maintenance} ${unitLabel}`, weeklyTarget: `${(results.goalPlan.maintenance * 7).toLocaleString()} ${unitLabel}`, rate: "0.0 lbs/week" },
        { strategy: "Mild Fat Loss (-250)", dailyTarget: `${results.goalPlan.mildLoss} ${unitLabel}`, weeklyTarget: `${(results.goalPlan.mildLoss * 7).toLocaleString()} ${unitLabel}`, rate: "-0.5 lbs/week" },
        { strategy: "Moderate Fat Loss (-500)", dailyTarget: `${results.goalPlan.moderateLoss} ${unitLabel}`, weeklyTarget: `${(results.goalPlan.moderateLoss * 7).toLocaleString()} ${unitLabel}`, rate: "-1.0 lbs/week" },
        { strategy: "Lean Bulk (+250)", dailyTarget: `${results.goalPlan.leanBulk} ${unitLabel}`, weeklyTarget: `${(results.goalPlan.leanBulk * 7).toLocaleString()} ${unitLabel}`, rate: "+0.5 lbs/week" },
      ],
    },
    notes: [
      "1 pound of body fat contains approximately 3,500 calories.",
      "Track food intake consistently using a digital scale to ensure compliance.",
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
                type="button"
                onClick={() => setCalculationMode(m.id)}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl transition-all duration-200 text-left cursor-pointer ${
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

      {/* Main Calculation & Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs Form */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm print:hidden">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">
              Personal Parameters
            </h2>
            
            {/* Unit System & Energy Unit Toggles */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => handleUnitSystemChange("us")}
                  className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    unitSystem === "us"
                      ? "bg-white text-cyan-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  US
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitSystemChange("metric")}
                  className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    unitSystem === "metric"
                      ? "bg-white text-cyan-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Metric
                </button>
              </div>

              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setEnergyUnit("kcal")}
                  className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    energyUnit === "kcal"
                      ? "bg-white text-emerald-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  kcal
                </button>
                <button
                  type="button"
                  onClick={() => setEnergyUnit("kj")}
                  className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    energyUnit === "kj"
                      ? "bg-white text-emerald-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  kJ
                </button>
              </div>

              <button
                type="button"
                onClick={handleReset}
                title="Reset Defaults"
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Validation Warning */}
          {!results.isValid && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{results.errorMessage}</span>
            </div>
          )}

          {/* Basic Input Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="tdee-age" className="block text-sm font-semibold text-slate-700 mb-1">
                Age (Years)
              </label>
              <input
                id="tdee-age"
                type="number"
                min={2}
                max={120}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="tdee-gender" className="block text-sm font-semibold text-slate-700 mb-1">
                Gender
              </label>
              <select
                id="tdee-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white cursor-pointer"
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
                <label htmlFor="tdee-height-ft" className="block text-xs font-semibold text-slate-700 mb-1">
                  Height (Feet)
                </label>
                <input
                  id="tdee-height-ft"
                  type="number"
                  min={1}
                  max={8}
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="tdee-height-in" className="block text-xs font-semibold text-slate-700 mb-1">
                  Height (Inches)
                </label>
                <input
                  id="tdee-height-in"
                  type="number"
                  min={0}
                  max={11}
                  value={heightInches}
                  onChange={(e) => setHeightInches(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="tdee-weight-lbs" className="block text-xs font-semibold text-slate-700 mb-1">
                  Weight (lbs)
                </label>
                <input
                  id="tdee-weight-lbs"
                  type="number"
                  min={30}
                  max={800}
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="tdee-height-cm" className="block text-sm font-semibold text-slate-700 mb-1">
                  Height (cm)
                </label>
                <input
                  id="tdee-height-cm"
                  type="number"
                  min={50}
                  max={250}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="tdee-weight-kg" className="block text-sm font-semibold text-slate-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  id="tdee-weight-kg"
                  type="number"
                  min={15}
                  max={350}
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
              <label htmlFor="tdee-activity" className="block text-xs font-semibold text-slate-700 mb-1">
                Activity Level
              </label>
              <select
                id="tdee-activity"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white cursor-pointer"
              >
                <option value="sedentary">Sedentary (desk job, &lt;5k steps/day) — 1.20</option>
                <option value="light">Light Active (exercise 1-3 times/week) — 1.375</option>
                <option value="moderate">Moderate Active (exercise 4-5 times/week) — 1.55</option>
                <option value="active">Active (exercise 6-7 times/week) — 1.725</option>
                <option value="very-active">Very Active (2+ hrs intense daily) — 1.90</option>
                <option value="athlete">Competitive Athlete (2+ sessions/day) — 2.10</option>
              </select>
            </div>

            <div>
              <label htmlFor="tdee-goal" className="block text-xs font-semibold text-slate-700 mb-1">
                Fitness Goal
              </label>
              <select
                id="tdee-goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value as FitnessGoal)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white cursor-pointer"
              >
                <option value="maintain">Maintain Weight (Equilibrium)</option>
                <option value="mild-loss">Mild Weight Loss (-0.5 lb/week, -250 kcal)</option>
                <option value="loss">Weight Loss (-1.0 lb/week, -500 kcal)</option>
                <option value="extreme-loss">Extreme Weight Loss (-2.0 lb/week, -1000 kcal)</option>
                <option value="mild-gain">Mild Lean Bulk (+0.5 lb/week, +250 kcal)</option>
                <option value="gain">Weight Gain (+1.0 lb/week, +500 kcal)</option>
                <option value="extreme-gain">Fast Muscle Gain (+2.0 lb/week, +1000 kcal)</option>
                <option value="recomp">Body Recomposition (-200 kcal)</option>
              </select>
            </div>

            <div>
              <label htmlFor="tdee-bmr-formula" className="block text-xs font-semibold text-slate-700 mb-1">
                Clinical BMR Formula (7 Equations)
              </label>
              <select
                id="tdee-bmr-formula"
                value={bmrFormula}
                onChange={(e) => setBmrFormula(e.target.value as BmrFormulaType)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white cursor-pointer"
              >
                <option value="mifflin">Mifflin-St Jeor (Standard Clinical Default)</option>
                <option value="katch">Katch-McArdle (Requires Body Fat %)</option>
                <option value="harris">Original Harris-Benedict (1919)</option>
                <option value="revised-harris">Revised Harris-Benedict (1984)</option>
                <option value="cunningham">Cunningham (Athletic LBM)</option>
                <option value="schofield">Schofield (WHO Equation)</option>
                <option value="owen">Owen Equation</option>
              </select>
            </div>

            {(bmrFormula === "katch" || bmrFormula === "cunningham") && (
              <div>
                <label htmlFor="tdee-body-fat" className="block text-xs font-semibold text-slate-700 mb-1">
                  Body Fat Percentage (%)
                </label>
                <input
                  id="tdee-body-fat"
                  type="number"
                  min={2}
                  max={65}
                  value={bodyFat}
                  onChange={(e) => setBodyFat(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                />
              </div>
            )}

            {calculationMode === "custom" && (
              <div>
                <label htmlFor="tdee-custom-delta" className="block text-xs font-semibold text-slate-700 mb-1">
                  Custom Deficit / Surplus ({unitLabel})
                </label>
                <input
                  id="tdee-custom-delta"
                  type="number"
                  step={50}
                  value={customDelta}
                  onChange={(e) => setCustomDelta(Number(e.target.value))}
                  placeholder="-500 for loss, +300 for surplus"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                />
              </div>
            )}
          </div>

          {/* Daily Steps & Workout Frequency Sliders */}
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
              Step Count &amp; Workout Frequency
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="tdee-daily-steps" className="block text-xs font-medium text-slate-600 mb-1">
                  Daily Steps: <span className="text-cyan-700 font-bold">{dailySteps.toLocaleString()}</span>
                </label>
                <input
                  id="tdee-daily-steps"
                  type="range"
                  min={0}
                  max={25000}
                  step={500}
                  value={dailySteps}
                  onChange={(e) => setDailySteps(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="tdee-workout-freq" className="block text-xs font-medium text-slate-600 mb-1">
                  Workouts: <span className="text-cyan-700 font-bold">{workoutFrequency}x / wk</span>
                </label>
                <input
                  id="tdee-workout-freq"
                  type="range"
                  min={0}
                  max={7}
                  value={workoutFrequency}
                  onChange={(e) => setWorkoutFrequency(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Complete Responsive Action Bar */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Summary"}
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
              >
                {shared ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                {shared ? "Link Copied!" : "Share"}
              </button>

              <button
                type="button"
                onClick={handleSaveScenario}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5" />
                Save Scenario
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                Print
              </button>

              <button
                type="button"
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                CSV
              </button>
            </div>
          </div>

          {/* Saved Scenarios History Drawer */}
          {savedScenarios.length > 0 && (
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Saved Calculations ({savedScenarios.length})</span>
                <span className="text-[10px] text-slate-400 font-normal">Click to restore</span>
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {savedScenarios.map((sc) => (
                  <div
                    key={sc.id}
                    className="flex items-center justify-between p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => handleRestoreScenario(sc)}
                      className="text-left flex-1 cursor-pointer"
                    >
                      <div className="font-bold text-slate-800">
                        {sc.tdee} {sc.energyUnit} — {sc.age}y {sc.gender.toUpperCase()} ({sc.activityLevel})
                      </div>
                      <div className="text-[10px] text-slate-500">{sc.timestamp} • Target: {sc.targetCalories} {sc.energyUnit}</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteScenario(sc.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                      title="Delete Scenario"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Results & Interactive Visualizations */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Highlights Hero Card */}
          <div className="bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-700 p-6 rounded-2xl text-white shadow-xl shadow-cyan-600/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-cyan-100 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  Estimated Total Daily Energy Expenditure (TDEE)
                </div>
                <div className="text-3xl lg:text-4xl font-extrabold text-white mt-1">
                  {results.tdee} <span className="text-lg font-normal text-cyan-100">{unitLabel}/day</span>
                </div>
                <div className="text-xs text-cyan-100 mt-1">
                  Estimated Basal Rate (BMR): <span className="text-white font-bold">{results.bmr} {unitLabel}</span> | Formula: {results.formulaUsed}
                </div>
              </div>

              <div className="text-right">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm"
                >
                  Goal Target: {results.targetCalories} {unitLabel}
                </span>
              </div>
            </div>

            {/* Sub-Metrics Cards Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-cyan-100 font-semibold uppercase">Modeled NEAT</div>
                <div className="text-xl font-black text-white mt-0.5">{results.components.neatCalories} {unitLabel}</div>
                <div className="text-[10px] text-cyan-100">{dailySteps.toLocaleString()} steps</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-cyan-100 font-semibold uppercase">Modeled EAT</div>
                <div className="text-xl font-black text-white mt-0.5">{results.components.eatCalories} {unitLabel}</div>
                <div className="text-[10px] text-cyan-100">{workoutFrequency} sessions/wk</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-cyan-100 font-semibold uppercase">Modeled TEF</div>
                <div className="text-xl font-black text-white mt-0.5">{results.components.tefCalories} {unitLabel}</div>
                <div className="text-[10px] text-cyan-100">~10% modeled</div>
              </div>
            </div>

            {/* Methodology Transparency Notice */}
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-[11px] text-cyan-50 flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0 text-amber-200" />
              <span>
                This calculator provides an estimate based on predictive equations and activity assumptions. Actual energy expenditure varies between individuals.
              </span>
            </div>

            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-4 print:hidden">
              <button
                type="button"
                onClick={() => setIsReportOpen(true)}
                className="flex items-center gap-2 bg-white text-cyan-800 hover:bg-cyan-50 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-600" />
                Generate PDF Report
              </button>

              <div className="flex items-center gap-2">
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
              </div>
            </div>
          </div>

          {/* Interactive Visualizations Container */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 print:hidden">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl overflow-x-auto text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("components")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "components"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                TDEE Components
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("goal-plan")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "goal-plan"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Goal Calorie Options
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("projections")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "projections"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                12-Week Weight Projection
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("bmr-formulas")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "bmr-formulas"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                7 BMR Clinical Equations
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("activity-burn")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "activity-burn"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Calorie Burn by Activity
              </button>
            </div>

            {/* TAB 1: TDEE Components Donut Chart */}
            {activeTab === "components" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                    TDEE Metabolic Energy Component Breakdown
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Total: {results.tdee} {unitLabel}</span>
                </div>

                <div className="h-64 w-full flex items-center justify-center">
                  {isMounted && results.isValid ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={componentPieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={95}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {componentPieData.map((entry, index) => (
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
                          formatter={(val: any, name: any) => [`${val} ${unitLabel}`, name]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-64 w-full bg-slate-50/50 rounded-xl flex items-center justify-center text-xs text-slate-400">
                      {results.isValid ? "Loading visualization..." : "Please enter valid measurements to view breakdown."}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-cyan-50 rounded-xl border border-cyan-200">
                    <div className="font-bold text-cyan-900">BMR Rate</div>
                    <div className="text-base font-black text-cyan-700">{results.components.bmrCalories}</div>
                  </div>

                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="font-bold text-emerald-900">NEAT Steps</div>
                    <div className="text-base font-black text-emerald-700">{results.components.neatCalories}</div>
                  </div>

                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200">
                    <div className="font-bold text-amber-900">EAT Workouts</div>
                    <div className="text-base font-black text-amber-700">{results.components.eatCalories}</div>
                  </div>

                  <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="font-bold text-purple-900">TEF Digestion</div>
                    <div className="text-base font-black text-purple-700">{results.components.tefCalories}</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Goal Calorie Options Bar Chart */}
            {activeTab === "goal-plan" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                    Goal Strategy Comparison ({unitLabel}/day)
                  </h3>
                </div>

                <div className="h-64 w-full">
                  {isMounted && results.isValid ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={goalPlanBarData}>
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
                        <Bar dataKey="Target" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-64 w-full bg-slate-50/50 rounded-xl flex items-center justify-center text-xs text-slate-400">
                      {results.isValid ? "Loading strategy chart..." : "Please enter valid measurements to view strategies."}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: 12-Week Weight Projection Line Chart */}
            {activeTab === "projections" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                    12-Week Projected Weight Trajectory
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Target: {results.targetCalories} {unitLabel}/day • Simplified model assuming static expenditure</span>
                </div>

                <div className="h-64 w-full">
                  {isMounted && results.isValid ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.weightProjections}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="week" stroke="#64748b" fontSize={11} label={{ value: "Weeks", position: "insideBottom", offset: -5 }} />
                        <YAxis stroke="#64748b" fontSize={11} domain={["auto", "auto"]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderColor: "#cbd5e1",
                            borderRadius: "12px",
                            color: "#0f172a",
                          }}
                          formatter={(val: any) => [`${val} lbs`, "Weight"]}
                        />
                        <Line type="monotone" dataKey="weightLbs" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-64 w-full bg-slate-50/50 rounded-xl flex items-center justify-center text-xs text-slate-400">
                      {results.isValid ? "Loading projection chart..." : "Please enter valid measurements to view trajectory."}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: 7 BMR Clinical Equations Table */}
            {activeTab === "bmr-formulas" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                  7 Clinical BMR Formulas Comparison
                </h3>

                <div className="overflow-x-auto border border-slate-200 rounded-xl max-h-64">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 uppercase font-bold sticky top-0">
                      <tr>
                        <th className="p-3">Formula Name</th>
                        <th className="p-3">BMR ({unitLabel})</th>
                        <th className="p-3">Estimated TDEE ({unitLabel})</th>
                        <th className="p-3">Variance vs Mifflin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {results.formulaComparisons.map((fc) => (
                        <tr key={fc.formulaName} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900">{fc.formulaName}</td>
                          <td className="p-3 font-bold text-cyan-700">{fc.bmrValue}</td>
                          <td className="p-3 font-bold text-emerald-700">{fc.tdeeValue}</td>
                          <td className="p-3 text-slate-600">{fc.difference > 0 ? `+${fc.difference}` : fc.difference}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 5: Exercise Calorie Burn Table */}
            {activeTab === "activity-burn" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                  Calorie Burn Reference Table (per 30 mins)
                </h3>

                <div className="overflow-x-auto border border-slate-200 rounded-xl max-h-64">
                  <table className="w-full text-xs text-left text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 uppercase font-bold sticky top-0">
                      <tr>
                        <th className="p-3">Physical Activity</th>
                        <th className="p-3">Burned per 30 Mins</th>
                        <th className="p-3">Activity Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {results.activityBurnTable.map((act) => (
                        <tr key={act.activity} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900">{act.activity}</td>
                          <td className="p-3 font-bold text-amber-700">{act.caloriesBurned30Min} {unitLabel}</td>
                          <td className="p-3 text-slate-600">{act.desc}</td>
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
            <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
              Smart Insights &amp; Metabolic Strategy
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
          reportData={reportData}
        />
      )}
    </div>
  );
}

export default TdeeCalculator;
