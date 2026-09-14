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
    "shape-ratios" | "somatotype-radar" | "whr-spectrum" | "similarity-matrix" | "wardrobe-grid" | "action-plan"
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

  // Reset to initial clean defaults
  const handleReset = () => {
    setGender("female");
    setMode("female-fashion");
    setUnitSystem("us");
    setAge(30);
    setBustChestInches(36);
    setWaistInches(26);
    setHighHipInches(32);
    setHipInches(36);
    setHeightInches(66);
    setWeightLbs(140);
    setBustChestCm(91);
    setWaistCm(66);
    setHighHipCm(81);
    setHipCm(91);
    setHeightCm(168);
    setWeightKg(63.5);
    setActiveTab("shape-ratios");
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
    } else if (selectedMode === "comparison") {
      setActiveTab("similarity-matrix");
    } else if (selectedMode === "body-volume") {
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
    if (!results.isValid) {
      return {
        badge: "INPUT VALIDATION NOTICE",
        title: "Invalid Measurements",
        subtitle: results.validationError || "Please enter valid measurements strictly greater than zero.",
        tag: "ATTENTION",
      };
    }

    switch (mode) {
      case "somatotype":
        return {
          badge: "ANTHROPOMETRIC SOMATOTYPE PROXY",
          title: `${results.somatotype.dominantType} Physique`,
          subtitle: `Endomorphy: ${results.somatotype.endomorphy}/7 | Mesomorphy: ${results.somatotype.mesomorphy}/7 | Ectomorphy: ${results.somatotype.ectomorphy}/7. ${results.somatotype.description}`,
          tag: "SOMATOTYPE PROXY",
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
          subtitle: `Recommended clothing cuts: ${results.stylingTips[0]?.recommendedStyles.join(", ") || "Balanced tailored cuts"}.`,
          tag: "STYLING STRATEGY",
        };
      case "fitness-shaping":
        return {
          badge: "TARGETED FITNESS & STRUCTURAL CONDITIONING",
          title: `${results.primaryShape} Conditioning`,
          subtitle: results.fitnessAdvice[0] || "Custom athletic conditioning and nutritional guidance.",
          tag: "WORKOUT GUIDANCE",
        };
      case "comparison":
        return {
          badge: "SHAPE SIMILARITY SCORE MATRIX",
          title: `${results.primaryShape} (Similarity: ${results.shapeComparisons[0]?.matchPercentage || 90} / 100)`,
          subtitle: `Proportional similarity calculated dynamically across all documented shape profiles.`,
          tag: "SIMILARITY SCORE",
        };
      case "male-structure":
        return {
          badge: "MALE FRAME CLASSIFICATION",
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
    { id: "female-fashion", label: "Female Shapes", icon: User, desc: "7 Female shapes reference" },
    { id: "male-structure", label: "Male Frame", icon: ShieldAlert, desc: "5 Male frames model" },
    { id: "somatotype", label: "Somatotype", icon: Award, desc: "Estimated somatotype proxy" },
    { id: "whr-health", label: "WHR Health Risk", icon: Heart, desc: "WHO Waist-to-Hip" },
    { id: "whtr-metabolic", label: "WHtR Ratio", icon: Scale, desc: "Waist-to-Height metric" },
    { id: "body-volume", label: "Body Proportion", icon: Maximize2, desc: "Proportion ratios" },
    { id: "wardrobe-style", label: "Wardrobe Guide", icon: Shirt, desc: "Clothing & styling tips" },
    { id: "fitness-shaping", label: "Fitness Plan", icon: Activity, desc: "Exercise guidance" },
    { id: "comparison", label: "Shape Similarity", icon: BarChart2, desc: "Similarity score matrix" },
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
    { name: "Endomorphy (Adiposity)", val: results.somatotype.endomorphy, fill: "#f43f5e" },
    { name: "Mesomorphy (Muscularity)", val: results.somatotype.mesomorphy, fill: "#10b981" },
    { name: "Ectomorphy (Linearity)", val: results.somatotype.ectomorphy, fill: "#06b6d4" },
  ];

  // CSV Export Handler
  const handleExportCSV = () => {
    if (!results.isValid) return;
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Parameter,Value\n";
    csvContent += `Mode,${mode}\n`;
    csvContent += `Gender,${results.gender.toUpperCase()}\n`;
    csvContent += `Primary Body Shape,${results.primaryShape}\n`;
    csvContent += `Shape Description,"${results.shapeDescription}"\n`;
    csvContent += `Waist-to-Hip Ratio (WHR),${results.whr} (${results.whrRisk})\n`;
    csvContent += `Waist-to-Height Ratio (WHtR),${results.whtr} (${results.whtrRisk})\n`;
    csvContent += `High-Hip-to-Waist Ratio,${results.highHipToWaistRatio}\n`;
    csvContent += `Estimated Somatotype Proxy,${results.somatotype.dominantType} (Endo: ${results.somatotype.endomorphy}, Meso: ${results.somatotype.mesomorphy}, Ecto: ${results.somatotype.ectomorphy})\n\n`;

    csvContent += "Body Circumferences (Inches),Value\n";
    csvContent += `Bust/Chest,${results.bustChestInches}\n`;
    csvContent += `Waist,${results.waistInches}\n`;
    csvContent += `High Hip,${results.highHipInches}\n`;
    csvContent += `Low Hip,${results.hipInches}\n`;
    csvContent += `Height,${results.heightInches}\n`;
    csvContent += `Weight,${results.weightLbs}\n\n`;

    csvContent += "Shape Similarity Score Matrix,Similarity Score (out of 100)\n";
    results.shapeComparisons.forEach((sc) => {
      csvContent += `"${sc.shapeName}",${sc.matchPercentage} / 100\n`;
    });

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
    if (!results.isValid) return;
    const summaryText = `Body Type & Morphological Analytics Results:
• Primary Body Shape: ${results.primaryShape}
• Shape Similarity Score: ${results.shapeComparisons[0]?.matchPercentage || 90} / 100
• Waist-to-Hip Ratio (WHR): ${results.whr} (${results.whrRisk})
• Waist-to-Height Ratio (WHtR): ${results.whtr} (${results.whtrRisk})
• Estimated Somatotype Proxy: ${results.somatotype.dominantType} (Endo: ${results.somatotype.endomorphy}/7, Meso: ${results.somatotype.mesomorphy}/7, Ecto: ${results.somatotype.ectomorphy}/7)
Notice: Body shape classification and similarity scores are mathematical estimates, not medical diagnoses.`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Print Handler
  const handlePrint = () => {
    if (!results.isValid) return;
    window.print();
  };

  // Report Modal Data Structure
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Professional Body Type & Shape Analytics Suite",
      reportTitle: "Anatomical Body Shape & Morphological Analysis Report",
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
        subtitle: `Similarity Score: ${results.shapeComparisons[0]?.matchPercentage || 90} / 100`,
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
        label: "Estimated Somatotype Proxy",
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
          { label: "High-Hip-to-Waist Ratio", value: `${results.highHipToWaistRatio}x` },
        ],
      },
      {
        title: "Morphological & Health Interpretation",
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
      score: results.shapeComparisons[0]?.matchPercentage || 90,
      rating: results.whrRisk,
    },
    table: {
      title: "Dynamic Shape Similarity Comparison",
      headers: [
        { key: "shape", label: "Body Shape Category", align: "left" },
        { key: "match", label: "Similarity Score", align: "right" },
        { key: "desc", label: "Description", align: "left" },
      ],
      rows: results.shapeComparisons.map((sc) => ({
        shape: sc.shapeName,
        match: `${sc.matchPercentage} / 100`,
        desc: sc.description,
      })),
    },
    notes: [
      "Shape Similarity Scores compare entered proportions against calculator shape criteria on a 0–100 scale; they represent mathematical proximity and do not constitute statistical probability or diagnostic certainty.",
      "BODY SHAPE ≠ BODY COMPOSITION ≠ HEALTH RISK ≠ MEDICAL DIAGNOSIS. WHR and WHtR are epidemiological screening indicators, not diagnostic tests.",
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 font-sans">
      {/* Embedded Print Isolation Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #body-type-print-report,
          #body-type-print-report * {
            visibility: visible !important;
          }
          #body-type-print-report {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 24px !important;
            display: block !important;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>

      {/* DEDICATED PRINT REPORT (Visible ONLY during Browser Print Ctrl+P) */}
      <div id="body-type-print-report" className="hidden">
        <div className="border-b-2 border-slate-900 pb-4 mb-6">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Body Type &amp; Morphological Analytics Report
          </h2>
          <p className="text-xs text-slate-600 mt-1" suppressHydrationWarning>
            {isMounted
              ? `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()} • CalcPlatform`
              : "Generated on Report Date • CalcPlatform"}
          </p>
        </div>

        {results.isValid ? (
          <div className="space-y-6 text-sm">
            {/* Primary Classification */}
            <div className="p-4 rounded-xl border border-slate-300 bg-slate-50 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Primary Classification
              </span>
              <div className="text-2xl font-black text-slate-900">
                {results.primaryShape}{" "}
                <span className="text-sm font-normal text-slate-600">
                  (Similarity Score: {results.shapeComparisons[0]?.matchPercentage || 90} / 100)
                </span>
              </div>
              <p className="text-xs text-slate-700">{results.shapeDescription}</p>
            </div>

            {/* Anthropometric Metrics Grid */}
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3 border border-slate-300 rounded-lg">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">WHR (Low Hip)</span>
                <span className="text-lg font-black text-slate-900 block">{results.whr}</span>
                <span className="text-[10px] text-slate-600">{results.whrRisk}</span>
              </div>
              <div className="p-3 border border-slate-300 rounded-lg">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">WHtR</span>
                <span className="text-lg font-black text-slate-900 block">{results.whtr}</span>
                <span className="text-[10px] text-slate-600">Target &lt; 0.50</span>
              </div>
              <div className="p-3 border border-slate-300 rounded-lg">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">High-Hip/Waist</span>
                <span className="text-lg font-black text-slate-900 block">{results.highHipToWaistRatio}x</span>
                <span className="text-[10px] text-slate-600">Shelf Ratio</span>
              </div>
              <div className="p-3 border border-slate-300 rounded-lg">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Somatotype Proxy</span>
                <span className="text-lg font-black text-slate-900 block">{results.somatotype.dominantType}</span>
                <span className="text-[10px] text-slate-600">
                  {results.somatotype.endomorphy}-{results.somatotype.mesomorphy}-{results.somatotype.ectomorphy}
                </span>
              </div>
            </div>

            {/* Body Dimensions Table */}
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">Recorded Measurements</h2>
              <table className="w-full text-left text-xs border border-slate-300 border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300">
                    <th className="p-2">Measurement Landmark</th>
                    <th className="p-2">Inches</th>
                    <th className="p-2">Centimeters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2 font-medium">Bust / Chest</td>
                    <td className="p-2">{results.bustChestInches} in</td>
                    <td className="p-2">{Math.round(results.bustChestInches * 2.54 * 10) / 10} cm</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Natural Waist (Narrowest)</td>
                    <td className="p-2">{results.waistInches} in</td>
                    <td className="p-2">{Math.round(results.waistInches * 2.54 * 10) / 10} cm</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">High Hip (Iliac Crest Swell)</td>
                    <td className="p-2">{results.highHipInches} in</td>
                    <td className="p-2">{Math.round(results.highHipInches * 2.54 * 10) / 10} cm</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Low Hip (Widest Buttock)</td>
                    <td className="p-2">{results.hipInches} in</td>
                    <td className="p-2">{Math.round(results.hipInches * 2.54 * 10) / 10} cm</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">Standing Height &amp; Weight</td>
                    <td className="p-2">{results.heightInches} in</td>
                    <td className="p-2">{Math.round(results.heightInches * 2.54 * 10) / 10} cm ({Math.round(results.weightLbs * 0.453592 * 10) / 10} kg)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Shape Similarity Matrix */}
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">Shape Similarity Analysis</h2>
              <table className="w-full text-left text-xs border border-slate-300 border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300">
                    <th className="p-2">Shape Profile</th>
                    <th className="p-2">Similarity Score</th>
                    <th className="p-2">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {results.shapeComparisons.slice(0, 5).map((sc, i) => (
                    <tr key={i}>
                      <td className="p-2 font-semibold">{sc.shapeName}</td>
                      <td className="p-2 font-bold">{sc.matchPercentage} / 100</td>
                      <td className="p-2">{sc.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Disclaimer */}
            <div className="pt-4 border-t border-slate-300 text-[10px] text-slate-500 leading-relaxed space-y-1">
              <p>
                <strong>Methodological Notice:</strong> Body shape calculations represent mathematical heuristics
                adapted from apparel anthropometric research and WHO / NICE risk screening guidelines. Similarity scores
                reflect continuous mathematical feature proximity rather than clinical certainty or statistical probabilities.
              </p>
              <p className="font-semibold text-slate-700">
                BODY SHAPE ≠ BODY COMPOSITION ≠ HEALTH RISK ≠ MEDICAL DIAGNOSIS.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 border border-rose-300 bg-rose-50 rounded-xl text-rose-800 text-sm">
            Report cannot be generated: Invalid measurements provided. All physical measurements must be positive numbers greater than zero.
          </div>
        )}
      </div>

      {/* WEB INTERFACE CONTROLS (Hidden during Print) */}
      <div className="print:hidden space-y-8">
        {/* Light Theme Mode Selector Bar */}
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {modesList.map((m) => {
              const Icon = m.icon;
              const isSelected = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => handleModeSelect(m.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl transition-all duration-200 text-left cursor-pointer ${
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

        {/* Validation Error Banner */}
        {!results.isValid && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <strong className="block font-bold">Input Validation Warning</strong>
              <p className="mt-0.5">{results.validationError}</p>
            </div>
          </div>
        )}

        {/* Main Calculation & Inputs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Inputs Form */}
          <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            {/* Card Header with Clean Sub-Row Toggles */}
            <div className="border-b border-slate-100 pb-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">
                  Body Measurements
                </h2>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Reset all measurements to default"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Defaults
                </button>
              </div>

              {/* Sub-row for Gender & Unit System Toggles */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-1/2">
                  <button
                    onClick={() => handleGenderChange("female")}
                    className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all cursor-pointer ${
                      gender === "female"
                        ? "bg-white text-cyan-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Female
                  </button>
                  <button
                    onClick={() => handleGenderChange("male")}
                    className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all cursor-pointer ${
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
                    className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all cursor-pointer ${
                      unitSystem === "us"
                        ? "bg-white text-emerald-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Inches
                  </button>
                  <button
                    onClick={() => handleUnitSystemChange("metric")}
                    className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all cursor-pointer ${
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
                      step="0.25"
                      min={15}
                      max={85}
                      value={bustChestInches || ""}
                      onChange={(e) => setBustChestInches(e.target.value === "" ? 0 : Number(e.target.value))}
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
                      step="0.25"
                      min={12}
                      max={85}
                      value={waistInches || ""}
                      onChange={(e) => setWaistInches(e.target.value === "" ? 0 : Number(e.target.value))}
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
                      step="0.25"
                      min={15}
                      max={95}
                      value={highHipInches || ""}
                      onChange={(e) => setHighHipInches(e.target.value === "" ? 0 : Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">Upper hip bone swell</span>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Low Hip (Inches)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      min={15}
                      max={95}
                      value={hipInches || ""}
                      onChange={(e) => setHipInches(e.target.value === "" ? 0 : Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">Widest buttock point</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Standing Height (Inches)
                    </label>
                    <input
                      type="number"
                      min={36}
                      max={96}
                      value={heightInches || ""}
                      onChange={(e) => setHeightInches(e.target.value === "" ? 0 : Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Weight (lbs)
                    </label>
                    <input
                      type="number"
                      min={40}
                      max={600}
                      value={weightLbs || ""}
                      onChange={(e) => setWeightLbs(e.target.value === "" ? 0 : Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Metric Input Mode (cm / kg) */
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Bust / Chest (cm)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min={40}
                      max={220}
                      value={bustChestCm || ""}
                      onChange={(e) => setBustChestCm(e.target.value === "" ? 0 : Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Natural Waist (cm)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min={30}
                      max={220}
                      value={waistCm || ""}
                      onChange={(e) => setWaistCm(e.target.value === "" ? 0 : Number(e.target.value))}
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
                      step="0.5"
                      min={40}
                      max={240}
                      value={highHipCm || ""}
                      onChange={(e) => setHighHipCm(e.target.value === "" ? 0 : Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Low Hip (cm)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min={40}
                      max={240}
                      value={hipCm || ""}
                      onChange={(e) => setHipCm(e.target.value === "" ? 0 : Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Standing Height (cm)
                    </label>
                    <input
                      type="number"
                      min={90}
                      max={240}
                      value={heightCm || ""}
                      onChange={(e) => setHeightCm(e.target.value === "" ? 0 : Number(e.target.value))}
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
                      max={300}
                      value={weightKg || ""}
                      onChange={(e) => setWeightKg(e.target.value === "" ? 0 : Number(e.target.value))}
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
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm">
                    {heroContent.tag}
                  </span>
                </div>
              </div>

              {/* Sub-Metrics Cards Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                  <div className="text-[11px] text-cyan-100 font-semibold uppercase">Waist-to-Hip (WHR)</div>
                  <div className="text-xl font-black text-white mt-0.5">{results.isValid ? results.whr : "—"}</div>
                  <div className="text-[10px] text-cyan-100 truncate">{results.isValid ? results.whrRisk : "N/A"}</div>
                </div>

                <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                  <div className="text-[11px] text-cyan-100 font-semibold uppercase">Waist-to-Height (WHtR)</div>
                  <div className="text-xl font-black text-white mt-0.5">{results.isValid ? results.whtr : "—"}</div>
                  <div className="text-[10px] text-cyan-100 truncate">Target &lt; 0.50</div>
                </div>

                <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                  <div className="text-[11px] text-cyan-100 font-semibold uppercase">Somatotype Proxy</div>
                  <div className="text-lg font-black text-white mt-0.5">{results.isValid ? results.somatotype.dominantType : "—"}</div>
                  <div className="text-[10px] text-cyan-100">Physique Class</div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-4">
                <div className="flex items-center gap-2">
                  <button
                    disabled={!results.isValid}
                    onClick={() => setIsReportOpen(true)}
                    className="flex items-center gap-2 bg-white text-cyan-800 hover:bg-cyan-50 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-cyan-600" />
                    Generate PDF Report
                  </button>

                  <button
                    disabled={!results.isValid}
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all cursor-pointer"
                    title="Print Summary Sheet"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={!results.isValid}
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all cursor-pointer"
                    title="Export CSV Data"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    CSV
                  </button>

                  <button
                    disabled={!results.isValid}
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all cursor-pointer"
                    title="Copy Summary"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Visualizations Container */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl overflow-x-auto text-xs">
                <button
                  onClick={() => setActiveTab("shape-ratios")}
                  className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === "shape-ratios"
                      ? "bg-white text-cyan-700 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Circumference Comparison
                </button>

                <button
                  onClick={() => setActiveTab("somatotype-radar")}
                  className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === "somatotype-radar"
                      ? "bg-white text-cyan-700 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Somatotype Proxy
                </button>

                <button
                  onClick={() => setActiveTab("whr-spectrum")}
                  className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === "whr-spectrum"
                      ? "bg-white text-cyan-700 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Health Risk Meters
                </button>

                <button
                  onClick={() => setActiveTab("similarity-matrix")}
                  className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === "similarity-matrix"
                      ? "bg-white text-cyan-700 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Shape Similarity
                </button>

                <button
                  onClick={() => setActiveTab("wardrobe-grid")}
                  className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === "wardrobe-grid"
                      ? "bg-white text-cyan-700 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Wardrobe Styling
                </button>

                <button
                  onClick={() => setActiveTab("action-plan")}
                  className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
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
                    <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
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
                      <div className="h-64 w-full bg-slate-50/50 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">
                        Loading ratio chart...
                      </div>
                    )}
                  </div>

                  {/* Accessible Screen Reader Table */}
                  <div className="sr-only">
                    <table>
                      <caption>Body measurement circumferences in inches</caption>
                      <thead>
                        <tr>
                          <th>Landmark</th>
                          <th>Value (in)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ratioBarData.map((r, i) => (
                          <tr key={i}>
                            <td>{r.name}</td>
                            <td>{r.val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: Somatotype Breakdown Bar Chart */}
              {activeTab === "somatotype-radar" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                      Estimated Anthropometric Somatotype Proxy (1 to 7 Scale)
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
                            formatter={(val: any) => [`Score: ${val} / 7`, "Component Score"]}
                          />
                          <Bar dataKey="val" radius={[6, 6, 0, 0]}>
                            {somatotypeBarData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-64 w-full bg-slate-50/50 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">
                        Loading somatotype chart...
                      </div>
                    )}
                  </div>

                  {/* Accessible Screen Reader Table */}
                  <div className="sr-only">
                    <table>
                      <caption>Somatotype component scores on 1-7 scale</caption>
                      <thead>
                        <tr>
                          <th>Component</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {somatotypeBarData.map((s, i) => (
                          <tr key={i}>
                            <td>{s.name}</td>
                            <td>{s.val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-purple-50/60 p-3 rounded-xl border border-purple-100">
                    <strong>Somatotype Proxy Assessment:</strong> {results.somatotype.description}
                  </p>
                </div>
              )}

              {/* TAB 3: Health Risk Meters */}
              {activeTab === "whr-spectrum" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                    WHO Waist-to-Hip &amp; NICE Waist-to-Height Metabolic Risk Spectrum
                  </h3>

                  <div className="p-4 rounded-2xl border text-xs space-y-3 bg-slate-50 border-slate-200">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        Waist-to-Hip Ratio (WHR): {results.whr}
                      </div>
                      <p className="text-slate-600 mt-0.5">{results.whrRiskDescription}</p>
                    </div>

                    <div className="border-t border-slate-200 pt-2.5">
                      <div className="font-bold text-slate-900 text-sm">
                        Waist-to-Height Ratio (WHtR): {results.whtr}
                      </div>
                      <p className="text-slate-600 mt-0.5">{results.whtrRiskDescription}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Wardrobe & Clothing Styling Advice */}
              {activeTab === "wardrobe-grid" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                    Tailored Wardrobe &amp; Styling Advice for {results.primaryShape}
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
                        <div className="text-slate-500 italic">Fabric Tip: {tip.fabricGuidance}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: Fitness Guidance */}
              {activeTab === "action-plan" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                    Fitness &amp; Body Composition Guidance
                  </h3>

                  <div className="space-y-2.5">
                    {results.fitnessAdvice.map((plan, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{plan}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: Shape Similarity Matrix */}
              {activeTab === "similarity-matrix" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                        Dynamic Shape Similarity Score Matrix
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Proportional similarity calculated dynamically across all supported shape profiles.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>Interpretation Notice:</strong> This score is a calculator-generated similarity measure based on the proportional features used by this tool (bust-waist drop, hip-waist drop, bust-hip differential, and high-hip shelf ratio). It is not a probability, medical diagnosis, or scientifically validated percentage of classification accuracy.
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-50 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3">Body Shape Category</th>
                          <th className="p-3 text-right">Shape Similarity Score</th>
                          <th className="p-3">Silhouette Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {results.shapeComparisons.map((sc, i) => (
                          <tr key={i} className={i === 0 ? "bg-cyan-50/50 font-semibold" : "hover:bg-slate-50/50"}>
                            <td className="p-3 flex items-center gap-2">
                              {i === 0 && <span className="text-[10px] bg-cyan-600 text-white font-bold px-1.5 py-0.5 rounded">PRIMARY</span>}
                              {sc.shapeName}
                            </td>
                            <td className="p-3 text-right font-mono font-bold text-slate-900">
                              {sc.matchPercentage} / 100
                            </td>
                            <td className="p-3 text-slate-600">{sc.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
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

export default BodyTypeCalculator;
