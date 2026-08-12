"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  User,
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
  Shirt,
  BarChart2,
  PieChart as PieIcon,
  Activity,
  Maximize2,
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
} from "recharts";
import { calculateBodyTypeCalculator } from "@/app/calculators/body-type-calculator/calculator";
import {
  BodyTypeMode,
  Gender,
  UnitSystem,
} from "@/app/calculators/body-type-calculator/types";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function BodyTypeCalculator() {
  // Mode & Unit State
  const [mode, setMode] = useState<BodyTypeMode>("female-fashion");
  const [gender, setGender] = useState<Gender>("female");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");
  const [age, setAge] = useState<number>(30);

  // Measurements State (US Imperial default: Inches)
  const [bustChestInches, setBustChestInches] = useState<number>(36);
  const [waistInches, setWaistInches] = useState<number>(26);
  const [highHipInches, setHighHipInches] = useState<number>(32);
  const [hipInches, setHipInches] = useState<number>(36);
  const [heightInches, setHeightInches] = useState<number>(66); // 5'6"
  const [weightLbs, setWeightLbs] = useState<number>(140);

  // Metric State (cm / kg)
  const [bustChestCm, setBustChestCm] = useState<number>(91);
  const [waistCm, setWaistCm] = useState<number>(66);
  const [highHipCm, setHighHipCm] = useState<number>(81);
  const [hipCm, setHipCm] = useState<number>(91);
  const [heightCm, setHeightCm] = useState<number>(168);
  const [weightKg, setWeightKg] = useState<number>(63.5);

  // Hydration Mounted & Active Tab State
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "shape-ratios" | "somatotype-radar" | "whr-spectrum" | "wardrobe-grid" | "action-plan"
  >("shape-ratios");

  // Modal & Copy State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update gender handler
  const handleGenderChange = (g: Gender) => {
    setGender(g);
    if (g === "female" && mode === "male-structure") {
      setMode("female-fashion");
    } else if (g === "male" && mode === "female-fashion") {
      setMode("male-structure");
    }
  };

  // Sync Unit System Conversion
  const handleUnitSystemChange = (u: UnitSystem) => {
    if (u === "metric" && unitSystem === "us") {
      setBustChestCm(Math.round(bustChestInches * 2.54));
      setWaistCm(Math.round(waistInches * 2.54));
      setHighHipCm(Math.round(highHipInches * 2.54));
      setHipCm(Math.round(hipInches * 2.54));
      setHeightCm(Math.round(heightInches * 2.54));
      setWeightKg(Math.round(weightLbs * 0.453592 * 10) / 10);
    } else if (u === "us" && unitSystem === "metric") {
      setBustChestInches(Math.round((bustChestCm / 2.54) * 10) / 10);
      setWaistInches(Math.round((waistCm / 2.54) * 10) / 10);
      setHighHipInches(Math.round((highHipCm / 2.54) * 10) / 10);
      setHipInches(Math.round((hipCm / 2.54) * 10) / 10);
      setHeightInches(Math.round((heightCm / 2.54) * 10) / 10);
      setWeightLbs(Math.round(weightKg * 2.20462));
    }
    setUnitSystem(u);
  };

  // Synchronized Mode Selection Handler
  const handleModeSelect = (selectedMode: BodyTypeMode) => {
    setMode(selectedMode);
    if (selectedMode === "female-fashion") {
      setGender("female");
      setActiveTab("shape-ratios");
    } else if (selectedMode === "male-structure") {
      setGender("male");
      setActiveTab("shape-ratios");
    } else if (selectedMode === "somatotype") {
      setActiveTab("somatotype-radar");
    } else if (selectedMode === "whr-health" || selectedMode === "whtr-metabolic") {
      setActiveTab("whr-spectrum");
    } else if (selectedMode === "wardrobe-style") {
      setActiveTab("wardrobe-grid");
    } else if (selectedMode === "fitness-shaping") {
      setActiveTab("action-plan");
    } else if (selectedMode === "comparison" || selectedMode === "body-volume") {
      setActiveTab("shape-ratios");
    }
  };

  // Results Calculation Memo
  const results = useMemo(() => {
    return calculateBodyTypeCalculator({
      mode,
      gender,
      unitSystem,
      age,
      bustChestInches,
      waistInches,
      highHipInches,
      hipInches,
      heightInches,
      weightLbs,
      bustChestCm,
      waistCm,
      highHipCm,
      hipCm,
      heightCm,
      weightKg,
    });
  }, [
    mode,
    gender,
    unitSystem,
    age,
    bustChestInches,
    waistInches,
    highHipInches,
    hipInches,
    heightInches,
    weightLbs,
    bustChestCm,
    waistCm,
    highHipCm,
    hipCm,
    heightCm,
    weightKg,
  ]);

  // Dynamic Hero Card Content based on Selected Mode
  const heroContent = useMemo(() => {
    switch (mode) {
      case "somatotype":
        return {
          badge: "HEATH-CARTER SOMATOTYPE ANALYSIS",
          title: `${results.somatotype.dominantType} Physique`,
          subtitle: `Endomorphy: ${results.somatotype.endomorphy}/7 | Mesomorphy: ${results.somatotype.mesomorphy}/7 | Ectomorphy: ${results.somatotype.ectomorphy}/7. ${results.somatotype.description}`,
          tag: "SOMATOTYPE SCORE",
        };
      case "whr-health":
        return {
          badge: "WHO WAIST-TO-HIP RATIO (WHR) ASSESSMENT",
          title: `${results.whr} WHR`,
          subtitle: `${results.whrRisk} — ${results.whrRiskDescription}`,
          tag: "WHO CARDIOVASCULAR STANDARD",
        };
      case "whtr-metabolic":
        return {
          badge: "WAIST-TO-HEIGHT METABOLIC RATIO (WHtR)",
          title: `${results.whtr} WHtR`,
          subtitle: `${results.whtrRisk} — ${results.whtrRiskDescription}`,
          tag: "METABOLIC HEALTH INDEX",
        };
      case "body-volume":
        return {
          badge: "CIRCUMFERENCE & PROPORTION RATIOS",
          title: `${results.hipToWaistRatio}x Hip/Waist Ratio`,
          subtitle: `Bust/Waist Ratio: ${results.bustToWaistRatio}x | Bust/Hip Ratio: ${results.bustToHipRatio}x | High-Hip/Waist: ${results.highHipToWaistRatio}x`,
          tag: "PROPORTION METRICS",
        };
      case "wardrobe-style":
        return {
          badge: "CUSTOM WARDROBE & STYLING GUIDE",
          title: `${results.primaryShape} Wardrobe Strategy`,
          subtitle: `Recommended clothing cuts: ${results.stylingTips[0]?.recommendedStyles.join(", ")}.`,
          tag: "STYLING STRATEGY",
        };
      case "fitness-shaping":
        return {
          badge: "TARGETED FITNESS & BODY RECOMPOSITION PLAN",
          title: `${results.primaryShape} Shaping Plan`,
          subtitle: results.fitnessAdvice[0] || "Custom athletic workout and nutritional recommendations.",
          tag: "WORKOUT PLAN",
        };
      case "comparison":
        return {
          badge: "SHAPE MATCH PERCENTAGE MATRIX",
          title: `${results.shapeComparisons[0]?.matchPercentage}% ${results.primaryShape} Match`,
          subtitle: `Side-by-side match breakdown across all morphological categories.`,
          tag: "MATCH MATRIX",
        };
      case "male-structure":
        return {
          badge: "MALE STRUCTURAL FRAME CLASSIFICATION",
          title: results.primaryShape,
          subtitle: results.shapeDescription,
          tag: "MALE FRAME",
        };
      case "female-fashion":
      default:
        return {
          badge: "PRIMARY BODY SHAPE CLASSIFICATION",
          title: results.primaryShape,
          subtitle: results.shapeDescription,
          tag: `${results.gender.toUpperCase()} FRAME`,
        };
    }
  }, [mode, results]);

  // Modes Configuration
  const modesList: { id: BodyTypeMode; label: string; icon: any; desc: string }[] = [
    { id: "female-fashion", label: "Female Shapes", icon: User, desc: "7 Female shapes (NCSU)" },
    { id: "male-structure", label: "Male Frame", icon: ShieldAlert, desc: "V-Shape & Trapezoid" },
    { id: "somatotype", label: "Somatotype", icon: Award, desc: "Endo, Meso, Ecto scoring" },
    { id: "whr-health", label: "WHR Health Risk", icon: Heart, desc: "WHO Waist-to-Hip" },
    { id: "whtr-metabolic", label: "WHtR Ratio", icon: Scale, desc: "Waist-to-Height metric" },
    { id: "body-volume", label: "Body Proportion", icon: Maximize2, desc: "Proportion ratios" },
    { id: "wardrobe-style", label: "Wardrobe Guide", icon: Shirt, desc: "Clothing & styling tips" },
    { id: "fitness-shaping", label: "Fitness Plan", icon: Activity, desc: "Exercise guidance" },
    { id: "comparison", label: "Shape Matrix", icon: BarChart2, desc: "Shape match matrix" },
    { id: "custom", label: "Custom Eval", icon: Sliders, desc: "Morphological analysis" },
  ];

  // Bar Data for Circumference Ratios
  const ratioBarData = [
    { name: "Bust/Chest", val: results.bustChestInches, fill: "#06b6d4" },
    { name: "Waist", val: results.waistInches, fill: "#10b981" },
    { name: "High Hip", val: results.highHipInches, fill: "#8b5cf6" },
    { name: "Low Hip", val: results.hipInches, fill: "#f59e0b" },
  ];

  // Somatotype Bar Data
  const somatotypeBarData = [
    { name: "Endomorphy (Fat)", val: results.somatotype.endomorphy, fill: "#f43f5e" },
    { name: "Mesomorphy (Muscle)", val: results.somatotype.mesomorphy, fill: "#10b981" },
    { name: "Ectomorphy (Linear)", val: results.somatotype.ectomorphy, fill: "#06b6d4" },
  ];

  // CSV Export Handler
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Parameter,Value\n";
    csvContent += `Mode,${mode}\n`;
    csvContent += `Gender,${results.gender.toUpperCase()}\n`;
    csvContent += `Primary Body Shape,${results.primaryShape}\n`;
    csvContent += `Shape Description,"${results.shapeDescription}"\n`;
    csvContent += `Waist-to-Hip Ratio (WHR),${results.whr} (${results.whrRisk})\n`;
    csvContent += `Waist-to-Height Ratio (WHtR),${results.whtr} (${results.whtrRisk})\n`;
    csvContent += `Dominant Somatotype,${results.somatotype.dominantType} (Endo: ${results.somatotype.endomorphy}, Meso: ${results.somatotype.mesomorphy}, Ecto: ${results.somatotype.ectomorphy})\n\n`;

    csvContent += "Body Circumferences (Inches),Value\n";
    csvContent += `Bust/Chest,${results.bustChestInches}\n`;
    csvContent += `Waist,${results.waistInches}\n`;
    csvContent += `High Hip,${results.highHipInches}\n`;
    csvContent += `Low Hip,${results.hipInches}\n`;
    csvContent += `Height,${results.heightInches}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `body_type_${results.primaryShape.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Summary Handler
  const handleCopy = () => {
    const summaryText = `Body Type & Shape Analysis Results:\n• Primary Body Shape: ${results.primaryShape}\n• Mode Focus: ${heroContent.title}\n• Description: ${heroContent.subtitle}\n• Waist-to-Hip Ratio (WHR): ${results.whr} (${results.whrRisk})\n• Waist-to-Height Ratio (WHtR): ${results.whtr} (${results.whtrRisk})\n• Dominant Somatotype: ${results.somatotype.dominantType} (Endo: ${results.somatotype.endomorphy}, Meso: ${results.somatotype.mesomorphy}, Ecto: ${results.somatotype.ectomorphy})\nCalculated at Calculator Platform.`;
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
      calculatorName: "Professional Body Type & Shape Analytics Suite",
      reportTitle: "Anatomical Body Shape & Somatotype Analysis Report",
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
        label: "Primary Body Shape",
        value: results.primaryShape,
        subtitle: results.shapeCategory,
        colorTheme: "cyan",
      },
      {
        label: "Waist-to-Hip Ratio (WHR)",
        value: `${results.whr}`,
        subtitle: results.whrRisk,
        colorTheme: "emerald",
      },
      {
        label: "Waist-to-Height Ratio (WHtR)",
        value: `${results.whtr}`,
        subtitle: results.whtrRisk,
        colorTheme: "purple",
      },
      {
        label: "Dominant Somatotype",
        value: results.somatotype.dominantType,
        subtitle: `Endo: ${results.somatotype.endomorphy} | Meso: ${results.somatotype.mesomorphy} | Ecto: ${results.somatotype.ectomorphy}`,
        colorTheme: "amber",
      },
    ],
    sections: [
      {
        title: "Body Measurements & Proportion Ratios",
        items: [
          { label: "Gender", value: results.gender.toUpperCase() },
          { label: "Bust / Chest Size", value: `${results.bustChestInches} in (${Math.round(results.bustChestInches * 2.54)} cm)` },
          { label: "Natural Waist Size", value: `${results.waistInches} in (${Math.round(results.waistInches * 2.54)} cm)` },
          { label: "High Hip Size", value: `${results.highHipInches} in (${Math.round(results.highHipInches * 2.54)} cm)` },
          { label: "Low Hip Size", value: `${results.hipInches} in (${Math.round(results.hipInches * 2.54)} cm)` },
          { label: "Height & Weight", value: `${results.heightInches} in (${results.weightLbs} lbs)` },
          { label: "Bust-to-Waist Ratio", value: `${results.bustToWaistRatio}x` },
          { label: "Hip-to-Waist Ratio", value: `${results.hipToWaistRatio}x` },
        ],
      },
      {
        title: "Clinical Morphological Evaluation",
        items: [
          { label: "Anatomical Shape", value: results.primaryShape },
          { label: "Shape Description", value: results.shapeDescription },
          { label: "WHO Cardiovascular Risk", value: results.whrRiskDescription },
          { label: "WHtR Metabolic Guidance", value: results.whtrRiskDescription },
        ],
      },
    ],
    recommendation: {
      title: "Wardrobe & Styling Strategy",
      text: results.stylingTips[0]?.recommendedStyles.join(", ") || "Emphasize balanced proportion.",
      reasons: results.fitnessAdvice,
      score: Math.round(results.whr * 100),
      rating: results.whrRisk,
    },
    table: {
      title: "Body Shape Matching Matrix",
      headers: [
        { key: "shape", label: "Body Shape Category", align: "left" },
        { key: "match", label: "Match Score (%)", align: "right" },
        { key: "desc", label: "Description", align: "left" },
      ],
      rows: results.shapeComparisons.map((sc) => ({
        shape: sc.shapeName,
        match: `${sc.matchPercentage}%`,
        desc: sc.description,
      })),
    },
    notes: [
      "Body shape classifications are based on mathematical circumference differentials.",
      "Maintain a Waist-to-Height ratio under 0.50 for optimal cardiovascular longevity.",
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
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-600" />
                Body Measurements
              </h2>
            </div>

            {/* Sub-row for Gender & Unit System Toggles */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-1/2">
                <button
                  onClick={() => handleGenderChange("female")}
                  className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all ${
                    gender === "female"
                      ? "bg-white text-cyan-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Female
                </button>
                <button
                  onClick={() => handleGenderChange("male")}
                  className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all ${
                    gender === "male"
                      ? "bg-white text-cyan-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Male
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
                  Inches
                </button>
                <button
                  onClick={() => handleUnitSystemChange("metric")}
                  className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all ${
                    unitSystem === "metric"
                      ? "bg-white text-emerald-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  cm
                </button>
              </div>
            </div>
          </div>

          {/* Measurements Inputs Form */}
          {unitSystem === "us" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Bust / Chest (Inches)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min={20}
                    max={75}
                    value={bustChestInches}
                    onChange={(e) => setBustChestInches(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Fullest chest point</span>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Natural Waist (Inches)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min={15}
                    max={75}
                    value={waistInches}
                    onChange={(e) => setWaistInches(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Narrowest torso point</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    High Hip (Inches)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min={20}
                    max={80}
                    value={highHipInches}
                    onChange={(e) => setHighHipInches(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Upper hip bone swell</span>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Low Hip (Inches)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min={20}
                    max={85}
                    value={hipInches}
                    onChange={(e) => setHipInches(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Widest buttock point</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Height (Inches)
                  </label>
                  <input
                    type="number"
                    min={36}
                    max={90}
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
                    min={50}
                    max={450}
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Bust / Chest (cm)
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={190}
                    value={bustChestCm}
                    onChange={(e) => setBustChestCm(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Natural Waist (cm)
                  </label>
                  <input
                    type="number"
                    min={40}
                    max={190}
                    value={waistCm}
                    onChange={(e) => setWaistCm(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    High Hip (cm)
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={200}
                    value={highHipCm}
                    onChange={(e) => setHighHipCm(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Low Hip (cm)
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={210}
                    value={hipCm}
                    onChange={(e) => setHipCm(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    min={90}
                    max={230}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    min={20}
                    max={250}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Results & Interactive Visualizations */}
        <div className="lg:col-span-7 space-y-6">
          {/* Dynamic Key Metric Highlights Hero Card */}
          <div className="bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-700 p-6 rounded-2xl text-white shadow-xl shadow-cyan-600/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-cyan-100 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  {heroContent.badge}
                </div>
                <div className="text-3xl lg:text-4xl font-extrabold text-white mt-1">
                  {heroContent.title}
                </div>
                <div className="text-xs text-cyan-100 mt-1 max-w-lg leading-relaxed">
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

            {/* Sub-Metrics Cards Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-cyan-100 font-semibold uppercase">Waist-to-Hip (WHR)</div>
                <div className="text-xl font-black text-white mt-0.5">{results.whr}</div>
                <div className="text-[10px] text-cyan-100 truncate">{results.whrRisk}</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-cyan-100 font-semibold uppercase">Waist-to-Height (WHtR)</div>
                <div className="text-xl font-black text-white mt-0.5">{results.whtr}</div>
                <div className="text-[10px] text-cyan-100 truncate">Target &lt; 0.50</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-cyan-100 font-semibold uppercase">Dominant Somatotype</div>
                <div className="text-lg font-black text-white mt-0.5">{results.somatotype.dominantType}</div>
                <div className="text-[10px] text-cyan-100">Physique Class</div>
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
                onClick={() => setActiveTab("shape-ratios")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "shape-ratios"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Circumference Ratios
              </button>

              <button
                onClick={() => setActiveTab("somatotype-radar")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "somatotype-radar"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Somatotype Breakdown
              </button>

              <button
                onClick={() => setActiveTab("whr-spectrum")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "whr-spectrum"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Health Risk Meters
              </button>

              <button
                onClick={() => setActiveTab("wardrobe-grid")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "wardrobe-grid"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Wardrobe Styling
              </button>

              <button
                onClick={() => setActiveTab("action-plan")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "action-plan"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Fitness Guidance
              </button>
            </div>

            {/* TAB 1: Circumference Ratios Bar Chart */}
            {activeTab === "shape-ratios" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-cyan-600" />
                    Body Measurement Comparison ({unitSystem === "us" ? "Inches" : "cm"})
                  </h3>
                </div>

                <div className="h-64 w-full">
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ratioBarData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} domain={[0, "auto"]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderColor: "#cbd5e1",
                            borderRadius: "12px",
                            color: "#0f172a",
                          }}
                          formatter={(val: any) => [`${val} in`, "Circumference"]}
                        />
                        <Bar dataKey="val" radius={[6, 6, 0, 0]}>
                          {ratioBarData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-64 w-full bg-slate-50/50 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">Loading ratio chart...</div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: Somatotype Breakdown Bar Chart */}
            {activeTab === "somatotype-radar" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-600" />
                    Heath-Carter Somatotype Score Breakdown (1 to 7 Scale)
                  </h3>
                </div>

                <div className="h-64 w-full">
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={somatotypeBarData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} domain={[0, 7]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderColor: "#cbd5e1",
                            borderRadius: "12px",
                            color: "#0f172a",
                          }}
                          formatter={(val: any) => [`Score: ${val} / 7`, "Somatotype"]}
                        />
                        <Bar dataKey="val" radius={[6, 6, 0, 0]}>
                          {somatotypeBarData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-64 w-full bg-slate-50/50 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">Loading somatotype chart...</div>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-purple-50/60 p-3 rounded-xl border border-purple-100">
                  <strong>Somatotype Analysis:</strong> {results.somatotype.description}
                </p>
              </div>
            )}

            {/* TAB 3: Health Risk Meters */}
            {activeTab === "whr-spectrum" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-600" />
                  WHO Waist-to-Hip & Waist-to-Height Metabolic Risk Spectrum
                </h3>

                <div className="p-4 rounded-2xl border text-xs space-y-3 bg-slate-50 border-slate-200">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Waist-to-Hip Ratio (WHR): {results.whr}</div>
                    <p className="text-slate-600 mt-0.5">{results.whrRiskDescription}</p>
                  </div>

                  <div className="border-t border-slate-200 pt-2.5">
                    <div className="font-bold text-slate-900 text-sm">Waist-to-Height Ratio (WHtR): {results.whtr}</div>
                    <p className="text-slate-600 mt-0.5">{results.whtrRiskDescription}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Wardrobe & Clothing Styling Advice */}
            {activeTab === "wardrobe-grid" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Shirt className="w-4 h-4 text-cyan-600" />
                  Tailored Wardrobe & Styling Advice for {results.primaryShape}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.stylingTips.map((tip, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                      <div className="font-bold text-slate-900 text-sm text-cyan-700">{tip.category}</div>
                      <div>
                        <strong className="text-emerald-700">Recommended:</strong> {tip.recommendedStyles.join(", ")}
                      </div>
                      <div>
                        <strong className="text-rose-600">Avoid:</strong> {tip.stylesToAvoid.join(", ")}
                      </div>
                      <div className="text-slate-500 italic">
                        Fabric Tip: {tip.fabricGuidance}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: Fitness Guidance */}
            {activeTab === "action-plan" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  Fitness & Body Shaping Recommendations
                </h3>

                <div className="space-y-2.5">
                  {results.fitnessAdvice.map((plan, idx) => (
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
    </div>
  );
}

export default BodyTypeCalculator;
