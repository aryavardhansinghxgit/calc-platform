"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Activity,
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
  Layers,
  Heart,
  BarChart2,
  User,
  Share2,
  BookmarkPlus,
  RotateCcw,
  Trash2,
  X,
  ExternalLink,
  ChevronRight,
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
import { calculateBsaCalculator } from "@/app/calculators/body-surface-area-calculator/calculator";
import {
  BsaMode,
  Gender,
  UnitSystem,
  SavedBsaScenario,
} from "@/app/calculators/body-surface-area-calculator/types";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

const LOCAL_STORAGE_KEY = "bsa_calculator_saved_scenarios_v1";

export function BsaCalculator() {
  // Mode & Unit State
  const [mode, setMode] = useState<BsaMode>("mosteller-clinical");
  const [gender, setGender] = useState<Gender>("male");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");
  const [ageYears, setAgeYears] = useState<number>(35);

  // US Imperial State
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10); // 5'10"
  const [weightLbs, setWeightLbs] = useState<number>(165);

  // Metric State
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(75);

  // Chemotherapy Dosing Inputs
  const [targetChemoDoseMgM2, setTargetChemoDoseMgM2] = useState<number>(175);
  const [capObeseBsaAt2m2, setCapObeseBsaAt2m2] = useState<boolean>(false);
  const [targetCarboplatinAuc, setTargetCarboplatinAuc] = useState<number>(5);
  const [targetGFR, setTargetGFR] = useState<number>(100);

  // Hemodynamic Inputs
  const [cardiacOutputLmin, setCardiacOutputLmin] = useState<number>(5.0);
  const [heartRateBpm, setHeartRateBpm] = useState<number>(72);

  // Renal Inputs
  const [unadjustedGfrMlMin, setUnadjustedGfrMlMin] = useState<number>(90);

  // UI Interactive State
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "formula-variance" | "population-benchmarks" | "chemo-dosing-grid" | "hemodynamic-spectrum" | "action-plan"
  >("formula-variance");

  // Modal, Drawer & Feedback State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [savedScenarios, setSavedScenarios] = useState<SavedBsaScenario[]>([]);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // 1. Initial Mount: LocalStorage Scenarios & URL Query Hydration
  useEffect(() => {
    setIsMounted(true);

    // Hydrate saved scenarios from LocalStorage
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setSavedScenarios(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage errors
    }

    // Hydrate state from URL query parameters if present
    if (typeof window !== "undefined" && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const m = params.get("mode") as BsaMode;
      if (m) setMode(m);

      const g = params.get("gender") as Gender;
      if (g === "male" || g === "female") setGender(g);

      const u = params.get("unit") as UnitSystem;
      if (u === "us" || u === "metric") setUnitSystem(u);

      const a = params.get("age");
      if (a && !isNaN(Number(a))) setAgeYears(Number(a));

      const ft = params.get("ft");
      if (ft && !isNaN(Number(ft))) setHeightFeet(Number(ft));

      const inch = params.get("in");
      if (inch && !isNaN(Number(inch))) setHeightInches(Number(inch));

      const lbs = params.get("lbs");
      if (lbs && !isNaN(Number(lbs))) setWeightLbs(Number(lbs));

      const cm = params.get("cm");
      if (cm && !isNaN(Number(cm))) setHeightCm(Number(cm));

      const kg = params.get("kg");
      if (kg && !isNaN(Number(kg))) setWeightKg(Number(kg));

      const dose = params.get("dose");
      if (dose && !isNaN(Number(dose))) setTargetChemoDoseMgM2(Number(dose));

      const cap = params.get("cap");
      if (cap !== null) setCapObeseBsaAt2m2(cap === "1" || cap === "true");

      const auc = params.get("auc");
      if (auc && !isNaN(Number(auc))) setTargetCarboplatinAuc(Number(auc));

      const gfr = params.get("gfr");
      if (gfr && !isNaN(Number(gfr))) setTargetGFR(Number(gfr));

      const co = params.get("co");
      if (co && !isNaN(Number(co))) setCardiacOutputLmin(Number(co));

      const hr = params.get("hr");
      if (hr && !isNaN(Number(hr))) setHeartRateBpm(Number(hr));

      const ugfr = params.get("ugfr");
      if (ugfr && !isNaN(Number(ugfr))) setUnadjustedGfrMlMin(Number(ugfr));
    }
  }, []);

  // Sync Saved Scenarios to LocalStorage
  const persistScenarios = (list: SavedBsaScenario[]) => {
    setSavedScenarios(list);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    } catch {
      // Ignore
    }
  };

  // Unit System Toggle with Precise Conversion
  const handleUnitSystemChange = (u: UnitSystem) => {
    if (u === "metric" && unitSystem === "us") {
      const totalInches = heightFeet * 12 + heightInches;
      setHeightCm(Math.round(totalInches * 2.54 * 10) / 10);
      setWeightKg(Math.round(weightLbs * 0.45359237 * 10) / 10);
    } else if (u === "us" && unitSystem === "metric") {
      const totalInches = heightCm / 2.54;
      setHeightFeet(Math.floor(totalInches / 12));
      setHeightInches(Math.round(totalInches % 12));
      setWeightLbs(Math.round(weightKg * 2.20462262));
    }
    setUnitSystem(u);
  };

  // Synchronized Mode Selection Handler
  const handleModeSelect = (selectedMode: BsaMode) => {
    setMode(selectedMode);
    if (selectedMode === "chemo-dosing") {
      setActiveTab("chemo-dosing-grid");
    } else if (selectedMode === "cardiac-index" || selectedMode === "gfr-normalization") {
      setActiveTab("hemodynamic-spectrum");
    } else if (selectedMode === "formula-comparison") {
      setActiveTab("formula-variance");
    } else if (selectedMode === "pediatric-bsa" || selectedMode === "haycock-pediatric") {
      setActiveTab("population-benchmarks");
    } else if (selectedMode === "custom-oncology") {
      setActiveTab("action-plan");
    } else {
      setActiveTab("formula-variance");
    }
  };

  // Reset to Canonical Defaults
  const handleReset = () => {
    setMode("mosteller-clinical");
    setGender("male");
    setUnitSystem("us");
    setAgeYears(35);
    setHeightFeet(5);
    setHeightInches(10);
    setWeightLbs(165);
    setHeightCm(178);
    setWeightKg(75);
    setTargetChemoDoseMgM2(175);
    setCapObeseBsaAt2m2(false);
    setTargetCarboplatinAuc(5);
    setTargetGFR(100);
    setCardiacOutputLmin(5.0);
    setHeartRateBpm(72);
    setUnadjustedGfrMlMin(90);
    setActiveTab("formula-variance");
  };

  // Calculation Results Memo
  const results = useMemo(() => {
    return calculateBsaCalculator({
      mode,
      gender,
      unitSystem,
      ageYears,
      heightFeet,
      heightInches,
      weightLbs,
      heightCm,
      weightKg,
      targetChemoDoseMgM2,
      capObeseBsaAt2m2,
      targetCarboplatinAuc,
      targetGFR,
      cardiacOutputLmin,
      heartRateBpm,
      unadjustedGfrMlMin,
    });
  }, [
    mode,
    gender,
    unitSystem,
    ageYears,
    heightFeet,
    heightInches,
    weightLbs,
    heightCm,
    weightKg,
    targetChemoDoseMgM2,
    capObeseBsaAt2m2,
    targetCarboplatinAuc,
    targetGFR,
    cardiacOutputLmin,
    heartRateBpm,
    unadjustedGfrMlMin,
  ]);

  // Dynamic Hero Card Content based on Selected Mode
  const heroContent = useMemo(() => {
    switch (mode) {
      case "chemo-dosing":
        return {
          badge: "CHEMOTHERAPY BSA DOSE ESTIMATOR",
          title: `${results.chemoDosing?.finalDoseMg || 0} mg Estimated Dose`,
          subtitle: `Protocol Dose: ${targetChemoDoseMgM2} mg/m² × BSA ${results.primaryBsaM2} m²${results.chemoDosing?.isCapped ? " (Protocol Cap Applied)" : " (Full Uncapped Body Size)"}. Calvert Carboplatin Estimate: ${results.chemoDosing?.carboplatinAucDoseMg} mg.`,
          tag: "CHEMO ESTIMATOR",
        };
      case "cardiac-index":
        return {
          badge: "HEMODYNAMIC CARDIAC INDEX (CI) ASSESSMENT",
          title: `${results.cardiacIndex?.cardiacIndexLminM2 || 0} L/min/m²`,
          subtitle: `Cardiac Output: ${cardiacOutputLmin} L/min | Stroke Volume Index: ${results.cardiacIndex?.strokeVolumeIndexMlM2} mL/beat/m². ${results.cardiacIndex?.clinicalCategory}.`,
          tag: "HEMODYNAMIC INDEX",
        };
      case "gfr-normalization":
        return {
          badge: "RENAL CLEARANCE SURFACE NORMALIZATION",
          title: `${results.gfrNormalization?.normalizedGfrMlMin173m2 || 0} mL/min/1.73m²`,
          subtitle: `Unadjusted Clearance: ${unadjustedGfrMlMin} mL/min | CKD Stage: ${results.gfrNormalization?.ckdStage}.`,
          tag: "RENAL NORMALIZATION",
        };
      case "dubois-classic":
        return {
          badge: "DU BOIS & DU BOIS (1916) EQUATION",
          title: `${results.primaryBsaM2} m² (${results.primaryBsaFt2} ft²)`,
          subtitle: `Classic 9-subject metabolic chamber equation. BMI: ${results.bmi} kg/m² (${results.bmiCategory}).`,
          tag: "DU BOIS (1916)",
        };
      case "haycock-pediatric":
      case "pediatric-bsa":
        return {
          badge: "HAYCOCK PEDIATRIC & INFANT EQUATION (1978)",
          title: `${results.primaryBsaM2} m² (${results.primaryBsaFt2} ft²)`,
          subtitle: `Validated pediatric surface equation across infants and children. Devine Ideal Weight: ${results.idealBodyWeightKg} kg.`,
          tag: "PEDIATRIC EQUATION",
        };
      case "schlich-gender":
        return {
          badge: "SCHLICH 3D LASER BODY SCAN EQUATION (2010)",
          title: `${results.primaryBsaM2} m² (${results.primaryBsaFt2} ft²)`,
          subtitle: `Gender-differentiated equation based on modern 3D laser anatomical scans.`,
          tag: "3D LASER SCAN",
        };
      case "formula-comparison":
        return {
          badge: "9-FORMULA BSA VARIANCE & MATRIX",
          title: `${results.primaryBsaM2} m² Baseline`,
          subtitle: `9-Formula Variance Range: ${results.minBsaM2} m² to ${results.maxBsaM2} m² (Average: ${results.averageBsaM2} m²).`,
          tag: "9-FORMULA MATRIX",
        };
      case "custom-oncology":
        return {
          badge: "COMPREHENSIVE CLINICAL EVALUATION",
          title: `${results.primaryBsaM2} m² BSA`,
          subtitle: `BMI: ${results.bmi} kg/m² | Ideal Weight: ${results.idealBodyWeightKg} kg | Lean Mass: ${results.leanBodyMassKg} kg.`,
          tag: "CLINICAL EVAL",
        };
      case "mosteller-clinical":
      default:
        return {
          badge: "PRIMARY CLINICAL BODY SURFACE AREA (BSA)",
          title: `${results.primaryBsaM2} m² (${results.primaryBsaFt2} ft²)`,
          subtitle: `Calculated via Mosteller equation. BMI: ${results.bmi} kg/m² (${results.bmiCategory}).`,
          tag: "MOSTELLER STANDARD",
        };
    }
  }, [mode, results, targetChemoDoseMgM2, cardiacOutputLmin, unadjustedGfrMlMin]);

  // Modes Configuration List
  const modesList: { id: BsaMode; label: string; icon: any; desc: string }[] = [
    { id: "mosteller-clinical", label: "Mosteller Standard", icon: Activity, desc: "Standard clinical equation" },
    { id: "dubois-classic", label: "Du Bois Classic", icon: Layers, desc: "Historical equation 1916" },
    { id: "haycock-pediatric", label: "Haycock Pediatric", icon: User, desc: "Infant & pediatric precision" },
    { id: "schlich-gender", label: "Schlich 3D Scan", icon: Sparkles, desc: "Gender-differentiated 3D" },
    { id: "chemo-dosing", label: "Chemo Estimator", icon: ShieldAlert, desc: "BSA mg/m² & Calvert" },
    { id: "cardiac-index", label: "Cardiac Index", icon: Heart, desc: "Hemodynamic CI (L/min/m²)" },
    { id: "gfr-normalization", label: "GFR Normalization", icon: Scale, desc: "Renal clearance surface" },
    { id: "pediatric-bsa", label: "Pediatric BSA", icon: User, desc: "Infants & children" },
    { id: "formula-comparison", label: "9-Formula Matrix", icon: BarChart2, desc: "Side-by-side variance" },
    { id: "custom-oncology", label: "Custom Eval", icon: Sliders, desc: "Clinical evaluation" },
  ];

  // Bar Data for 9-Formula Variance Chart
  const formulaBarData = results.formulaList.map((f) => ({
    name: f.formulaName.split(" ")[0],
    bsa: f.bsaM2,
    var: f.varianceFromMosteller,
  }));

  // Save Scenario Action
  const handleSaveScenario = () => {
    const newScenario: SavedBsaScenario = {
      id: "bsa_" + Date.now(),
      name: `${gender === "male" ? "Male" : "Female"}, ${ageYears}y (${unitSystem === "us" ? `${heightFeet}'${heightInches}" ${weightLbs}lbs` : `${heightCm}cm ${weightKg}kg`})`,
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      inputs: {
        mode,
        gender,
        unitSystem,
        ageYears,
        heightFeet,
        heightInches,
        weightLbs,
        heightCm,
        weightKg,
        targetChemoDoseMgM2,
        capObeseBsaAt2m2,
        targetCarboplatinAuc,
        targetGFR,
        cardiacOutputLmin,
        heartRateBpm,
        unadjustedGfrMlMin,
      },
      primaryBsaM2: results.primaryBsaM2,
      primaryBsaFt2: results.primaryBsaFt2,
      bmi: results.bmi,
      formulaName: results.primaryFormulaUsed,
    };

    const updated = [newScenario, ...savedScenarios].slice(0, 20);
    persistScenarios(updated);
    setSaveSuccessNotice("Scenario saved!");
    setTimeout(() => setSaveSuccessNotice(null), 2500);
  };

  // Restore Scenario Action
  const handleRestoreScenario = (sc: SavedBsaScenario) => {
    if (sc.inputs.mode) setMode(sc.inputs.mode);
    if (sc.inputs.gender) setGender(sc.inputs.gender);
    if (sc.inputs.unitSystem) setUnitSystem(sc.inputs.unitSystem);
    if (sc.inputs.ageYears !== undefined) setAgeYears(sc.inputs.ageYears);
    if (sc.inputs.heightFeet !== undefined) setHeightFeet(sc.inputs.heightFeet);
    if (sc.inputs.heightInches !== undefined) setHeightInches(sc.inputs.heightInches);
    if (sc.inputs.weightLbs !== undefined) setWeightLbs(sc.inputs.weightLbs);
    if (sc.inputs.heightCm !== undefined) setHeightCm(sc.inputs.heightCm);
    if (sc.inputs.weightKg !== undefined) setWeightKg(sc.inputs.weightKg);
    if (sc.inputs.targetChemoDoseMgM2 !== undefined) setTargetChemoDoseMgM2(sc.inputs.targetChemoDoseMgM2);
    if (sc.inputs.capObeseBsaAt2m2 !== undefined) setCapObeseBsaAt2m2(sc.inputs.capObeseBsaAt2m2);
    if (sc.inputs.targetCarboplatinAuc !== undefined) setTargetCarboplatinAuc(sc.inputs.targetCarboplatinAuc);
    if (sc.inputs.targetGFR !== undefined) setTargetGFR(sc.inputs.targetGFR);
    if (sc.inputs.cardiacOutputLmin !== undefined) setCardiacOutputLmin(sc.inputs.cardiacOutputLmin);
    if (sc.inputs.heartRateBpm !== undefined) setHeartRateBpm(sc.inputs.heartRateBpm);
    if (sc.inputs.unadjustedGfrMlMin !== undefined) setUnadjustedGfrMlMin(sc.inputs.unadjustedGfrMlMin);
    setIsSavedDrawerOpen(false);
  };

  // Delete Scenario Action
  const handleDeleteScenario = (id: string) => {
    const updated = savedScenarios.filter((s) => s.id !== id);
    persistScenarios(updated);
  };

  // Share URL Generator Action
  const handleShareUrl = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set("mode", mode);
    url.searchParams.set("gender", gender);
    url.searchParams.set("unit", unitSystem);
    url.searchParams.set("age", ageYears.toString());
    if (unitSystem === "us") {
      url.searchParams.set("ft", heightFeet.toString());
      url.searchParams.set("in", heightInches.toString());
      url.searchParams.set("lbs", weightLbs.toString());
    } else {
      url.searchParams.set("cm", heightCm.toString());
      url.searchParams.set("kg", weightKg.toString());
    }
    if (mode === "chemo-dosing") {
      url.searchParams.set("dose", targetChemoDoseMgM2.toString());
      url.searchParams.set("cap", capObeseBsaAt2m2 ? "1" : "0");
      url.searchParams.set("auc", targetCarboplatinAuc.toString());
      url.searchParams.set("gfr", targetGFR.toString());
    }
    if (mode === "cardiac-index") {
      url.searchParams.set("co", cardiacOutputLmin.toString());
      url.searchParams.set("hr", heartRateBpm.toString());
    }
    if (mode === "gfr-normalization") {
      url.searchParams.set("ugfr", unadjustedGfrMlMin.toString());
    }

    navigator.clipboard.writeText(url.toString());
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2500);
  };

  // CSV Export Handler with UTF-8 BOM
  const handleExportCSV = () => {
    let csv = "\uFEFF";
    csv += "Category,Parameter,Value\r\n";
    csv += `Calculation Mode,"${results.mode}"\r\n`;
    csv += `Gender,"${results.gender.toUpperCase()}"\r\n`;
    csv += `Primary BSA (m²),${results.primaryBsaM2}\r\n`;
    csv += `Primary BSA (ft²),${results.primaryBsaFt2}\r\n`;
    csv += `Primary Formula Used,"${results.primaryFormulaUsed}"\r\n`;
    csv += `Body Mass Index (BMI),${results.bmi} kg/m² (${results.bmiCategory})\r\n`;
    csv += `Ideal Body Weight (Devine),${results.idealBodyWeightKg} kg\r\n`;
    csv += `Lean Body Mass (Boer),${results.leanBodyMassKg} kg\r\n\r\n`;

    csv += "Formula Name,Year,BSA (m²),BSA (ft²),Variance from Mosteller (%)\r\n";
    results.formulaList.forEach((f) => {
      csv += `"${f.formulaName}",${f.year},${f.bsaM2},${f.bsaFt2},${f.varianceFromMosteller}%\r\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bsa_report_${results.primaryBsaM2}m2.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy Summary Handler
  const handleCopy = () => {
    const summaryText = `Body Surface Area (BSA) Clinical Estimation:\n• Primary BSA: ${results.primaryBsaM2} m² (${results.primaryBsaFt2} ft²)\n• Formula Used: ${results.primaryFormulaUsed}\n• Mode Focus: ${heroContent.title}\n• Description: ${heroContent.subtitle}\n• BMI: ${results.bmi} kg/m² (${results.bmiCategory})\n• Ideal Weight (Devine): ${results.idealBodyWeightKg} kg | Lean Mass: ${results.leanBodyMassKg} kg\nCalculated at Calculator Platform.`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Report Modal Data Structure
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Clinical Body Surface Area (BSA) Suite",
      reportTitle: "Body Surface Area & Anthropometric Assessment",
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
        label: "Body Surface Area (BSA)",
        value: `${results.primaryBsaM2} m²`,
        subtitle: `${results.primaryBsaFt2} ft² (${results.primaryFormulaUsed})`,
        colorTheme: "cyan",
      },
      {
        label: "Body Mass Index (BMI)",
        value: `${results.bmi} kg/m²`,
        subtitle: results.bmiCategory,
        colorTheme: "emerald",
      },
      {
        label: "Ideal Body Weight (Devine)",
        value: `${results.idealBodyWeightKg} kg`,
        subtitle: `Lean Mass: ${results.leanBodyMassKg} kg`,
        colorTheme: "purple",
      },
      {
        label: "Formula Variance Range",
        value: `${results.minBsaM2} – ${results.maxBsaM2} m²`,
        subtitle: `Average: ${results.averageBsaM2} m² across 9 equations`,
        colorTheme: "amber",
      },
    ],
    sections: [
      {
        title: "Patient Anthropometrics & Measurements",
        items: [
          { label: "Gender", value: results.gender.toUpperCase() },
          { label: "Age", value: `${ageYears} Years` },
          { label: "Height", value: `${results.heightCm} cm (${Math.floor(results.heightInchesTotal / 12)}' ${Math.round(results.heightInchesTotal % 12)}")` },
          { label: "Weight", value: `${results.weightKg} kg (${results.weightLbs} lbs)` },
          { label: "Primary Formula Used", value: results.primaryFormulaUsed },
          { label: "Mosteller BSA", value: `${results.formulaList[0]?.bsaM2} m²` },
          { label: "Du Bois & Du Bois BSA", value: `${results.formulaList[1]?.bsaM2} m²` },
          { label: "Haycock Pediatric BSA", value: `${results.formulaList[2]?.bsaM2} m²` },
        ],
      },
      {
        title: "Clinical Sub-Module Evaluation",
        items: [
          { label: "Chemotherapy Target Dose", value: `${targetChemoDoseMgM2} mg/m²` },
          { label: "Calculated Total Dose", value: `${results.chemoDosing?.finalDoseMg || "N/A"} mg` },
          { label: "Cardiac Index (CI)", value: `${results.cardiacIndex?.cardiacIndexLminM2 || "N/A"} L/min/m²` },
          { label: "Normalized GFR", value: `${results.gfrNormalization?.normalizedGfrMlMin173m2 || "N/A"} mL/min/1.73m²` },
        ],
      },
    ],
    recommendation: {
      title: "Clinical Dosing & Guidance",
      text: results.clinicalRecommendations[0] || "BSA is an estimation metric; verify narrow therapeutic index drug dosing.",
      reasons: results.actionPlan,
      score: Math.round(results.primaryBsaM2 * 50),
      rating: results.bmiCategory,
    },
    table: {
      title: "9-Formula Side-by-Side Comparison",
      headers: [
        { key: "formula", label: "Formula Name", align: "left" },
        { key: "year", label: "Year", align: "center" },
        { key: "m2", label: "BSA (m²)", align: "right" },
        { key: "ft2", label: "BSA (ft²)", align: "right" },
        { key: "variance", label: "Variance vs Mosteller", align: "right" },
      ],
      rows: results.formulaList.map((f) => ({
        formula: f.formulaName,
        year: f.year,
        m2: `${f.bsaM2} m²`,
        ft2: `${f.bsaFt2} ft²`,
        variance: `${f.varianceFromMosteller > 0 ? "+" : ""}${f.varianceFromMosteller}%`,
      })),
    },
    notes: [
      "BSA-based dose calculation: Prescribed dose (mg/m²) × calculated BSA (m²).",
      "ASCO 2021 clinical practice guideline update (Griggs et al.) recommends full weight-based cytotoxic chemotherapy dosing in adults with obesity without routine arbitrary BSA capping (e.g. 2.0 m²). Follow drug-specific labeling for regimen-specific maximums.",
      "Clinical note: This calculator performs mathematical dose estimation only. Actual chemotherapy dosing must be verified against the applicable drug labeling, treatment protocol, institutional policy, and qualified oncology/pharmacy review.",
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 print:p-0 font-sans">
      {/* Light Theme Mode Selector Bar */}
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

      {/* Main Calculation & Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Inputs Form */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm print:hidden">
          {/* Card Header with Toggles & Reset */}
          <div className="border-b border-slate-100 pb-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">
                Patient Anthropometrics
              </h2>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                title="Reset to defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* Sub-row for Gender & Unit System Toggles */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-1/2">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all ${
                    gender === "male"
                      ? "bg-white text-cyan-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all ${
                    gender === "female"
                      ? "bg-white text-cyan-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Female
                </button>
              </div>

              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-1/2">
                <button
                  type="button"
                  onClick={() => handleUnitSystemChange("us")}
                  className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all ${
                    unitSystem === "us"
                      ? "bg-white text-emerald-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  US (ft/lbs)
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitSystemChange("metric")}
                  className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all ${
                    unitSystem === "metric"
                      ? "bg-white text-emerald-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Metric (cm/kg)
                </button>
              </div>
            </div>
          </div>

          {/* Height & Weight Inputs */}
          {unitSystem === "us" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bsa-height-feet" className="block text-sm font-semibold text-slate-700 mb-1">
                    Height (Feet & Inches)
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="bsa-height-feet"
                      type="number"
                      min={1}
                      max={8}
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(Number(e.target.value))}
                      className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                      placeholder="ft"
                    />
                    <input
                      id="bsa-height-inches"
                      type="number"
                      min={0}
                      max={11}
                      value={heightInches}
                      onChange={(e) => setHeightInches(Number(e.target.value))}
                      className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                      placeholder="in"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="bsa-weight-lbs" className="block text-sm font-semibold text-slate-700 mb-1">
                    Body Weight (lbs)
                  </label>
                  <input
                    id="bsa-weight-lbs"
                    type="number"
                    step="0.5"
                    min={2}
                    max={750}
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bsa-height-cm" className="block text-sm font-semibold text-slate-700 mb-1">
                    Height (cm)
                  </label>
                  <input
                    id="bsa-height-cm"
                    type="number"
                    min={30}
                    max={250}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="bsa-weight-kg" className="block text-sm font-semibold text-slate-700 mb-1">
                    Body Weight (kg)
                  </label>
                  <input
                    id="bsa-weight-kg"
                    type="number"
                    step="0.5"
                    min={1}
                    max={350}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Age Input */}
          <div>
            <label htmlFor="bsa-age-years" className="block text-sm font-semibold text-slate-700 mb-1">
              Patient Age (Years)
            </label>
            <input
              id="bsa-age-years"
              type="number"
              min={0}
              max={110}
              value={ageYears}
              onChange={(e) => setAgeYears(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
            />
          </div>

          {/* Sub-Module Dynamic Input Parameters */}
          {mode === "chemo-dosing" && (
            <div className="space-y-4 border-t border-slate-100 pt-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Chemotherapy BSA Dose Estimator
                </h3>
              </div>

              <div>
                <label htmlFor="bsa-target-chemo-dose" className="block text-xs font-semibold text-slate-700 mb-1">
                  Example Prescribed Protocol Dose (mg/m²)
                </label>
                <input
                  id="bsa-target-chemo-dose"
                  type="number"
                  value={targetChemoDoseMgM2}
                  onChange={(e) => setTargetChemoDoseMgM2(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Calculated from prescribed mg/m² dose &times; patient BSA. Actual dosing must follow specific drug labeling and treatment protocol.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <span className="font-semibold text-slate-800">ASCO Obesity Dosing Guidance:</span>
                <p className="text-[11px] leading-relaxed">
                  ASCO clinical practice guidelines (Griggs et al., 2021) generally recommend full weight-based cytotoxic chemotherapy dosing for adult patients with obesity, rather than routine arbitrary BSA capping (such as 2.0 m²). Follow drug-specific labeling for any regimen-specific dose limits.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Calvert Formula — Carboplatin AUC-Based Estimate
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bsa-carboplatin-auc" className="block text-xs font-semibold text-slate-700 mb-1">
                      Carboplatin Target AUC
                    </label>
                    <input
                      id="bsa-carboplatin-auc"
                      type="number"
                      step="0.5"
                      min={1}
                      max={10}
                      value={targetCarboplatinAuc}
                      onChange={(e) => setTargetCarboplatinAuc(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="bsa-target-gfr" className="block text-xs font-semibold text-slate-700 mb-1">
                      Patient GFR (mL/min)
                    </label>
                    <input
                      id="bsa-target-gfr"
                      type="number"
                      min={10}
                      max={200}
                      value={targetGFR}
                      onChange={(e) => setTargetGFR(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500">
                  Calvert equation: Dose (mg) = Target AUC &times; (GFR + 25). Input renal function must correspond to the protocol-required estimation method.
                </p>
              </div>
            </div>
          )}

          {mode === "cardiac-index" && (
            <div className="space-y-4 border-t border-slate-100 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Hemodynamic Parameters
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bsa-cardiac-output" className="block text-xs font-semibold text-slate-700 mb-1">
                    Cardiac Output (L/min)
                  </label>
                  <input
                    id="bsa-cardiac-output"
                    type="number"
                    step="0.1"
                    min={1}
                    max={15}
                    value={cardiacOutputLmin}
                    onChange={(e) => setCardiacOutputLmin(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="bsa-heart-rate" className="block text-xs font-semibold text-slate-700 mb-1">
                    Heart Rate (BPM)
                  </label>
                  <input
                    id="bsa-heart-rate"
                    type="number"
                    min={30}
                    max={220}
                    value={heartRateBpm}
                    onChange={(e) => setHeartRateBpm(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {mode === "gfr-normalization" && (
            <div className="space-y-4 border-t border-slate-100 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Renal Clearance Parameters
              </h3>

              <div>
                <label htmlFor="bsa-unadjusted-gfr" className="block text-xs font-semibold text-slate-700 mb-1">
                  Unadjusted Absolute GFR (mL/min)
                </label>
                <input
                  id="bsa-unadjusted-gfr"
                  type="number"
                  min={5}
                  max={200}
                  value={unadjustedGfrMlMin}
                  onChange={(e) => setUnadjustedGfrMlMin(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                />
              </div>
            </div>
          )}

          {/* Action Row: Save Scenario & Saved Drawer Toggle */}
          <div className="border-t border-slate-100 pt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleSaveScenario}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
            >
              <BookmarkPlus className="w-4 h-4 text-cyan-600" />
              {saveSuccessNotice || "Save Scenario"}
            </button>

            <button
              type="button"
              onClick={() => setIsSavedDrawerOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-cyan-700 hover:text-cyan-800 transition-colors"
            >
              Saved Scenarios ({savedScenarios.length})
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
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
                <div className="text-[11px] text-cyan-100 font-semibold uppercase">Body Surface (ft²)</div>
                <div className="text-xl font-black text-white mt-0.5">{results.primaryBsaFt2}</div>
                <div className="text-[10px] text-cyan-100 truncate">Square Feet</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-cyan-100 font-semibold uppercase">Body Mass Index</div>
                <div className="text-xl font-black text-white mt-0.5">{results.bmi}</div>
                <div className="text-[10px] text-cyan-100 truncate">{results.bmiCategory}</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-cyan-100 font-semibold uppercase">Ideal Weight (Devine)</div>
                <div className="text-lg font-black text-white mt-0.5">{results.idealBodyWeightKg} kg</div>
                <div className="text-[10px] text-cyan-100">Lean: {results.leanBodyMassKg} kg</div>
              </div>
            </div>

            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-4 print:hidden">
              <button
                type="button"
                onClick={() => setIsReportOpen(true)}
                className="flex items-center gap-2 bg-white text-cyan-800 hover:bg-cyan-50 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all"
              >
                <Download className="w-4 h-4 text-cyan-600" />
                Generate PDF Clinical Report
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShareUrl}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all"
                  title="Share URL link"
                >
                  <Share2 className="w-4 h-4" />
                  {urlCopied ? "Link Copied!" : "Share"}
                </button>

                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm transition-all"
                  title="Export CSV Data"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  CSV
                </button>

                <button
                  type="button"
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

          {/* Interactive Visualizations Container */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 print:hidden">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl overflow-x-auto text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("formula-variance")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "formula-variance"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                9-Formula BSA Variance
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("population-benchmarks")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "population-benchmarks"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Population Benchmarks
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("chemo-dosing-grid")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "chemo-dosing-grid"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Chemo Dosing Calculator
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("hemodynamic-spectrum")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "hemodynamic-spectrum"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Cardiac & GFR Meters
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("action-plan")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "action-plan"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Clinical Action Plan
              </button>
            </div>

            {/* TAB 1: 9-Formula Variance Bar Chart */}
            {activeTab === "formula-variance" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                    BSA Values Across 9 Clinical Formulas (m²)
                  </h3>
                </div>

                <div className="h-64 w-full">
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={formulaBarData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} domain={["auto", "auto"]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderColor: "#cbd5e1",
                            borderRadius: "12px",
                            color: "#0f172a",
                          }}
                          formatter={(val: any) => [`${val} m²`, "BSA"]}
                        />
                        <Bar dataKey="bsa" fill="#06b6d4" radius={[6, 6, 0, 0]}>
                          {formulaBarData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? "#0d9488" : "#06b6d4"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-64 w-full bg-slate-50/50 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">
                      Loading formula chart...
                    </div>
                  )}
                </div>

                {/* Formula Table Breakdown */}
                <div className="overflow-x-auto mt-4 border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5">Formula Name</th>
                        <th className="p-2.5 text-center">Year</th>
                        <th className="p-2.5 text-right">BSA (m²)</th>
                        <th className="p-2.5 text-right">BSA (ft²)</th>
                        <th className="p-2.5 text-right">Variance vs Mosteller</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {results.formulaList.map((f, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-2.5 font-medium text-slate-800">{f.formulaName}</td>
                          <td className="p-2.5 text-center text-slate-500">{f.year}</td>
                          <td className="p-2.5 text-right font-bold text-slate-900">{f.bsaM2} m²</td>
                          <td className="p-2.5 text-right text-slate-600">{f.bsaFt2} ft²</td>
                          <td className="p-2.5 text-right font-semibold">
                            {f.varianceFromMosteller === 0 ? (
                              <span className="text-slate-500">Baseline</span>
                            ) : f.varianceFromMosteller > 0 ? (
                              <span className="text-amber-600">+{f.varianceFromMosteller}%</span>
                            ) : (
                              <span className="text-cyan-600">{f.varianceFromMosteller}%</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: Population Benchmarks Bar Chart */}
            {activeTab === "population-benchmarks" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                  Population Standard BSA Benchmarks (m²)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {results.benchmarks.map((b, idx) => (
                    <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-900">{b.category}</div>
                      <div className="text-cyan-700 font-semibold">{b.averageBsaM2} m² ({b.averageBsaFt2} ft²)</div>
                      <div className="text-[11px] text-slate-500">
                        Patient difference: {b.userDiffPercent > 0 ? `+${b.userDiffPercent}%` : `${b.userDiffPercent}%`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Chemotherapy Dosing Calculator Grid */}
            {activeTab === "chemo-dosing-grid" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                  Chemotherapy BSA Dose Estimator &amp; Calvert Carboplatin Protocol
                </h3>

                <div className="p-4 rounded-2xl border text-xs space-y-4 bg-slate-50 border-slate-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-slate-500 font-semibold">Example Prescribed Protocol Dose:</div>
                      <div className="text-base font-bold text-slate-900">{targetChemoDoseMgM2} mg/m²</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Calculated using patient BSA: {results.primaryBsaM2} m²</div>
                    </div>
                    <div>
                      <div className="text-slate-500 font-semibold">Generic Calculated Dose:</div>
                      <div className="text-xl font-black text-emerald-600">
                        {results.chemoDosing?.finalDoseMg || Math.round(results.primaryBsaM2 * targetChemoDoseMgM2)} mg
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Dose = {targetChemoDoseMgM2} mg/m² &times; {results.primaryBsaM2} m² = {Math.round(results.primaryBsaM2 * targetChemoDoseMgM2)} mg
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <div className="font-bold text-slate-900 text-sm">
                      Calvert Formula — Carboplatin AUC-Based Dose: {results.chemoDosing?.carboplatinAucDoseMg || Math.round(targetCarboplatinAuc * (targetGFR + 25))} mg
                    </div>
                    <p className="text-slate-600 mt-1 leading-relaxed">
                      Carboplatin is dosed by target Area Under the Curve (AUC) and renal clearance using the Calvert formula: <strong>Dose (mg) = Target AUC ({targetCarboplatinAuc}) &times; [GFR ({targetGFR} mL/min) + 25]</strong>. Calvert AH et al., <em>J Clin Oncol.</em> 1989.
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-3 text-[11px] text-slate-600 bg-white p-3 rounded-xl border border-slate-200/80 space-y-1">
                    <div className="font-bold text-slate-800">ASCO Obesity Dosing Guidance (Griggs et al., 2021):</div>
                    <p>
                      ASCO guideline update recommends full weight-based cytotoxic chemotherapy dosing for adult patients with obesity without routine arbitrary BSA capping (such as 2.0 m²). Dose modifications should follow drug-specific prescribing information, institutional protocol, organ function, and qualified oncology/pharmacy review.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Hemodynamic Cardiac & GFR Spectrum Meters */}
            {activeTab === "hemodynamic-spectrum" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                  Hemodynamic Cardiac Index & Renal Normalization
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-900 text-sm text-cyan-700">Cardiac Index (CI)</div>
                    <div className="text-2xl font-black text-slate-900">
                      {results.cardiacIndex?.cardiacIndexLminM2 || Number((cardiacOutputLmin / (results.primaryBsaM2 || 1)).toFixed(2))} L/min/m²
                    </div>
                    <p className="text-slate-600">{results.cardiacIndex?.interpretation || "Hemodynamic perfusion metric."}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-900 text-sm text-emerald-700">Normalized GFR</div>
                    <div className="text-2xl font-black text-slate-900">
                      {results.gfrNormalization?.normalizedGfrMlMin173m2 || Number(((unadjustedGfrMlMin * 1.73) / (results.primaryBsaM2 || 1)).toFixed(1))} mL/min/1.73m²
                    </div>
                    <p className="text-slate-600">{results.gfrNormalization?.ckdStage || "Normalized to standard 1.73 m² BSA."}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: Clinical Action Plan */}
            {activeTab === "action-plan" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2">
                  Clinical Recommendations & Protocols
                </h3>

                <div className="space-y-2.5">
                  {results.clinicalRecommendations.map((plan, idx) => (
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

      {/* Saved Scenarios Slide-Out Drawer */}
      {isSavedDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BookmarkPlus className="w-5 h-5 text-cyan-600" />
                  Saved Patient Scenarios
                </h3>
                <button
                  onClick={() => setIsSavedDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {savedScenarios.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs space-y-2">
                  <BookmarkPlus className="w-8 h-8 mx-auto text-slate-300" />
                  <p>No saved scenarios yet.</p>
                  <p className="text-[11px] text-slate-400">
                    Use &ldquo;Save Scenario&rdquo; in the inputs panel to save configurations.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedScenarios.map((s) => (
                    <div
                      key={s.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white transition-all space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-xs text-slate-900">{s.name}</div>
                          <div className="text-[10px] text-slate-400">{s.timestamp}</div>
                        </div>
                        <button
                          onClick={() => handleDeleteScenario(s.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete scenario"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="font-extrabold text-cyan-700">
                          {s.primaryBsaM2} m² ({s.primaryBsaFt2} ft²)
                        </span>
                        <button
                          onClick={() => handleRestoreScenario(s)}
                          className="bg-cyan-600 hover:bg-cyan-700 text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors"
                        >
                          Load
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {savedScenarios.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => persistScenarios([])}
                  className="w-full py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors border border-red-200"
                >
                  Clear All Saved Scenarios
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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

export default BsaCalculator;
