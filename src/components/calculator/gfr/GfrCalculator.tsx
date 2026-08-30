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
  Award,
  Layers,
  Calendar,
  AlertTriangle,
  User,
  Heart,
  PieChart as PieIcon,
  LineChart as LineIcon,
  BarChart2,
  Bookmark,
  Share2,
  RotateCcw,
  Check,
  Trash2,
  X,
  ExternalLink,
  ChevronRight,
  Info,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { calculateGfrCalculator } from "@/app/calculators/gfr-calculator/calculator";
import {
  GfrCalculationMode,
  PatientType,
  UnitSystem,
  CreatinineUnit,
  Gender,
  RaceType,
} from "@/app/calculators/gfr-calculator/types";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

interface SavedGfrScenario {
  id: string;
  name: string;
  timestamp: number;
  mode: GfrCalculationMode;
  patientType: PatientType;
  unitSystem: UnitSystem;
  creatinineUnit: CreatinineUnit;
  age: number;
  gender: Gender;
  race: RaceType;
  serumCreatinine: number;
  heightFeet: number;
  heightInches: number;
  heightCm: number;
  weightLbs: number;
  weightKg: number;
  cystatinC: number;
  uACR: number;
  eGfr: number;
  ckdStage: string;
}

export function GfrCalculator() {
  // Mode & Unit State
  const [calculationMode, setCalculationMode] = useState<GfrCalculationMode>("adult-ckdepi2021");
  const [patientType, setPatientType] = useState<PatientType>("adult");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");
  const [creatinineUnit, setCreatinineUnit] = useState<CreatinineUnit>("mg/dL");

  // Basic Inputs State
  const [age, setAge] = useState<number>(50);
  const [gender, setGender] = useState<Gender>("male");
  const [race, setRace] = useState<RaceType>("non-black");
  const [serumCreatinine, setSerumCreatinine] = useState<number>(0.9);

  // Body Dimensions State
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightLbs, setWeightLbs] = useState<number>(160);
  const [weightKg, setWeightKg] = useState<number>(70);

  // Advanced Inputs State
  const [cystatinC, setCystatinC] = useState<number>(0.9);
  const [uACR, setUACR] = useState<number>(15);

  // Hydration & Active Tab State
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "ckd-stage" | "formula-comp" | "age-decline" | "kdigo-matrix" | "action-plan"
  >("ckd-stage");

  // Feedback State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showSavedTray, setShowSavedTray] = useState(false);
  const [savedScenarios, setSavedScenarios] = useState<SavedGfrScenario[]>([]);

  // 1. Initial Mount & URL Param Hydration
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem("gfr_saved_scenarios");
      if (stored) {
        setSavedScenarios(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage errors
    }

    if (typeof window !== "undefined" && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const urlAge = params.get("age");
      const urlScr = params.get("scr");
      const urlUnit = params.get("cUnit");
      const urlSys = params.get("uSys");
      const urlSex = params.get("sex");
      const urlRace = params.get("race");
      const urlMode = params.get("mode");
      const urlType = params.get("type");
      const urlHtFt = params.get("htFt");
      const urlHtIn = params.get("htIn");
      const urlHtCm = params.get("htCm");
      const urlWtLbs = params.get("wtLbs");
      const urlWtKg = params.get("wtKg");
      const urlCys = params.get("cys");
      const urlUacr = params.get("uacr");

      if (urlAge) {
        const parsedAge = parseInt(urlAge, 10);
        if (!isNaN(parsedAge) && parsedAge > 0 && parsedAge <= 120) {
          setAge(parsedAge);
          if (parsedAge < 18) {
            setPatientType("child");
            setCalculationMode("pediatric-schwartz");
          } else {
            setPatientType("adult");
          }
        }
      }

      if (urlScr) {
        const parsedScr = parseFloat(urlScr);
        if (!isNaN(parsedScr) && parsedScr > 0 && parsedScr <= 30) {
          setSerumCreatinine(parsedScr);
        }
      }

      if (urlUnit === "mg/dL" || urlUnit === "umol/L") setCreatinineUnit(urlUnit as CreatinineUnit);
      if (urlSys === "us" || urlSys === "metric") setUnitSystem(urlSys as UnitSystem);
      if (urlSex === "male" || urlSex === "female") setGender(urlSex as Gender);
      if (urlRace === "black" || urlRace === "non-black") setRace(urlRace as RaceType);
      if (urlType === "adult" || urlType === "child") setPatientType(urlType as PatientType);

      if (urlHtFt) {
        const p = parseInt(urlHtFt, 10);
        if (!isNaN(p) && p >= 1 && p <= 8) setHeightFeet(p);
      }
      if (urlHtIn) {
        const p = parseInt(urlHtIn, 10);
        if (!isNaN(p) && p >= 0 && p <= 11) setHeightInches(p);
      }
      if (urlHtCm) {
        const p = parseFloat(urlHtCm);
        if (!isNaN(p) && p >= 30 && p <= 250) setHeightCm(p);
      }
      if (urlWtLbs) {
        const p = parseFloat(urlWtLbs);
        if (!isNaN(p) && p >= 5 && p <= 700) setWeightLbs(p);
      }
      if (urlWtKg) {
        const p = parseFloat(urlWtKg);
        if (!isNaN(p) && p >= 2 && p <= 350) setWeightKg(p);
      }
      if (urlCys) {
        const p = parseFloat(urlCys);
        if (!isNaN(p) && p > 0 && p <= 20) setCystatinC(p);
      }
      if (urlUacr) {
        const p = parseFloat(urlUacr);
        if (!isNaN(p) && p >= 0 && p <= 5000) setUACR(p);
      }
      if (urlMode) setCalculationMode(urlMode as GfrCalculationMode);
    }
  }, []);

  // 2. Bidirectional Age & Patient Type Handler
  const handleAgeChange = (val: number) => {
    const sanitized = isNaN(val) ? 1 : Math.max(1, Math.min(120, val));
    setAge(sanitized);
    if (sanitized < 18 && patientType !== "child") {
      setPatientType("child");
      setCalculationMode("pediatric-schwartz");
    } else if (sanitized >= 18 && patientType === "child") {
      setPatientType("adult");
      setCalculationMode("adult-ckdepi2021");
    }
  };

  const handlePatientTypeChange = (type: PatientType) => {
    setPatientType(type);
    if (type === "child") {
      setCalculationMode("pediatric-schwartz");
      if (age >= 18) setAge(10);
    } else {
      setCalculationMode("adult-ckdepi2021");
      if (age < 18) setAge(50);
    }
  };

  // 3. Mode Selection Handler
  const handleModeSelect = (mId: GfrCalculationMode) => {
    setCalculationMode(mId);
    if (mId === "pediatric-schwartz") {
      setPatientType("child");
      if (age >= 18) setAge(10);
      setActiveTab("ckd-stage");
    } else {
      setPatientType("adult");
      if (age < 18) setAge(50);
    }

    if (mId === "kdigo-risk") {
      setActiveTab("kdigo-matrix");
    } else if (mId === "comparison") {
      setActiveTab("formula-comp");
    } else if (mId === "custom") {
      setActiveTab("action-plan");
    } else {
      setActiveTab("ckd-stage");
    }
  };

  // 4. Creatinine Unit Switcher with Numerical Conversion
  const handleCreatinineUnitToggle = (newUnit: CreatinineUnit) => {
    if (newUnit === creatinineUnit) return;
    setCreatinineUnit(newUnit);
    if (newUnit === "umol/L") {
      setSerumCreatinine(Math.round(serumCreatinine * 88.4 * 10) / 10);
    } else {
      setSerumCreatinine(Math.round((serumCreatinine / 88.4) * 100) / 100);
    }
  };

  // 5. Unit System Switcher with Measurement Normalization
  const handleUnitSystemToggle = (newSys: UnitSystem) => {
    if (newSys === unitSystem) return;
    setUnitSystem(newSys);
    if (newSys === "metric") {
      const totalInches = heightFeet * 12 + heightInches;
      setHeightCm(Math.round(totalInches * 2.54));
      setWeightKg(Math.round(weightLbs * 0.45359237 * 10) / 10);
    } else {
      const totalInches = Math.round(heightCm / 2.54);
      setHeightFeet(Math.floor(totalInches / 12));
      setHeightInches(totalInches % 12);
      setWeightLbs(Math.round(weightKg * 2.20462262));
    }
  };

  // 6. Calculation Engine Hook
  const results = useMemo(() => {
    return calculateGfrCalculator({
      calculationMode,
      patientType,
      unitSystem,
      creatinineUnit,
      age,
      gender,
      race,
      serumCreatinine,
      heightFeet,
      heightInches,
      heightCm,
      weightLbs,
      weightKg,
      cystatinC,
      uACR,
    });
  }, [
    calculationMode,
    patientType,
    unitSystem,
    creatinineUnit,
    age,
    gender,
    race,
    serumCreatinine,
    heightFeet,
    heightInches,
    heightCm,
    weightLbs,
    weightKg,
    cystatinC,
    uACR,
  ]);

  // 7. Modes List
  const modesList: { id: GfrCalculationMode; label: string; icon: any; desc: string }[] = [
    { id: "adult-ckdepi2021", label: "CKD-EPI 2021", icon: Activity, desc: "NKF-ASN Race-Free Standard" },
    { id: "cystatin-c", label: "Cr-Cys Combo", icon: Award, desc: "2021 Creatinine + Cystatin C" },
    { id: "cystatin-c-alone", label: "Cys C Alone", icon: Award, desc: "2012 Cystatin C (Non-creatinine)" },
    { id: "adult-ckdepi2009", label: "CKD-EPI 2009", icon: Layers, desc: "Historical Race-Adjusted" },
    { id: "mdrd", label: "MDRD Study", icon: Sliders, desc: "IDMS-Traceable Legacy" },
    { id: "mayo", label: "Mayo Quadratic", icon: Sparkles, desc: "Preserved Function / Donors" },
    { id: "cockcroft-gault", label: "Cockcroft-Gault", icon: Scale, desc: "Creatinine Clearance (CrCl)" },
    { id: "pediatric-schwartz", label: "Bedside Schwartz", icon: User, desc: "Pediatric Formula (<18 yrs)" },
    { id: "kdigo-risk", label: "KDIGO 2024 Grid", icon: ShieldAlert, desc: "Prognosis Risk Matrix" },
    { id: "comparison", label: "Multi-Formula", icon: BarChart2, desc: "Side-by-Side Comparison" },
  ];

  // 8. Formula Comparison Bar Data
  const formulaBarData = results.formulaComparisons.map((fc) => ({
    name: fc.formulaName.replace(" (Pediatric)", "").replace(" (Unindexed)", "").replace(" (Legacy)", "").replace(" (IDMS)", "").replace(" (Alone)", ""),
    eGFR: fc.egfrValue,
  }));

  // 9. Save Scenario Handler
  const handleSaveScenario = () => {
    const newScenario: SavedGfrScenario = {
      id: Date.now().toString(),
      name: `${patientType.toUpperCase()} ${gender === "male" ? "M" : "F"}${age} - ${results.eGfr} mL/min`,
      timestamp: Date.now(),
      mode: calculationMode,
      patientType,
      unitSystem,
      creatinineUnit,
      age,
      gender,
      race,
      serumCreatinine,
      heightFeet,
      heightInches,
      heightCm,
      weightLbs,
      weightKg,
      cystatinC,
      uACR,
      eGfr: results.eGfr,
      ckdStage: results.ckdStage,
    };
    const updated = [newScenario, ...savedScenarios.slice(0, 9)];
    setSavedScenarios(updated);
    try {
      localStorage.setItem("gfr_saved_scenarios", JSON.stringify(updated));
    } catch {
      // Ignore
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleRestoreScenario = (sc: SavedGfrScenario) => {
    setCalculationMode(sc.mode);
    setPatientType(sc.patientType);
    setUnitSystem(sc.unitSystem);
    setCreatinineUnit(sc.creatinineUnit);
    setAge(sc.age);
    setGender(sc.gender);
    setRace(sc.race);
    setSerumCreatinine(sc.serumCreatinine);
    setHeightFeet(sc.heightFeet);
    setHeightInches(sc.heightInches);
    setHeightCm(sc.heightCm);
    setWeightLbs(sc.weightLbs);
    setWeightKg(sc.weightKg);
    setCystatinC(sc.cystatinC);
    setUACR(sc.uACR);
    setShowSavedTray(false);
  };

  const handleDeleteScenario = (id: string) => {
    const filtered = savedScenarios.filter((s) => s.id !== id);
    setSavedScenarios(filtered);
    try {
      localStorage.setItem("gfr_saved_scenarios", JSON.stringify(filtered));
    } catch {
      // Ignore
    }
  };

  // 10. Reset to Default Handler
  const handleResetDefaults = () => {
    setCalculationMode("adult-ckdepi2021");
    setPatientType("adult");
    setUnitSystem("us");
    setCreatinineUnit("mg/dL");
    setAge(50);
    setGender("male");
    setRace("non-black");
    setSerumCreatinine(0.9);
    setHeightFeet(5);
    setHeightInches(10);
    setHeightCm(170);
    setWeightLbs(160);
    setWeightKg(70);
    setCystatinC(0.9);
    setUACR(15);
    setActiveTab("ckd-stage");
  };

  // 11. Share URL Handler
  const handleShareUrl = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set("age", age.toString());
    url.searchParams.set("sex", gender);
    url.searchParams.set("race", race);
    url.searchParams.set("scr", serumCreatinine.toString());
    url.searchParams.set("cUnit", creatinineUnit);
    url.searchParams.set("uSys", unitSystem);
    url.searchParams.set("type", patientType);
    url.searchParams.set("mode", calculationMode);
    url.searchParams.set("cys", cystatinC.toString());
    url.searchParams.set("uacr", uACR.toString());
    if (unitSystem === "us") {
      url.searchParams.set("htFt", heightFeet.toString());
      url.searchParams.set("htIn", heightInches.toString());
      url.searchParams.set("wtLbs", weightLbs.toString());
    } else {
      url.searchParams.set("htCm", heightCm.toString());
      url.searchParams.set("wtKg", weightKg.toString());
    }

    navigator.clipboard.writeText(url.toString());
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  };

  // 12. Copy Summary Handler
  const handleCopy = () => {
    const summaryText = `Clinical GFR & Kidney Function Assessment:
• Primary eGFR: ${results.eGfr} mL/min/1.73m² (${results.primaryFormulaUsed})
• CKD Category / Stage: ${results.stageName}
• KDIGO 2024 Prognosis: ${results.kdigoRisk.riskCategory} (${results.kdigoRisk.gStage}${results.kdigoRisk.aStage})
• Serum Creatinine: ${results.creatinineMgDl} mg/dL (${results.creatinineUmolL} µmol/L)
• Serum Cystatin C: ${cystatinC} mg/L
• Urine Albumin uACR: ${uACR} mg/g
• Creatinine Clearance (Cockcroft-Gault): ${results.creatinineClearance} mL/min (Unindexed)
• Patient Demographics: ${age} yo ${gender.toUpperCase()}, ${patientType.toUpperCase()}
Calculated via CalcPlatform GFR Suite.`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // 13. CSV Export Handler (RFC-4180 with UTF-8 BOM)
  const handleExportCSV = () => {
    const rows = [
      ["Metric / Parameter", "Value", "Unit / Context"],
      ["Primary eGFR", results.eGfr.toString(), "mL/min/1.73m2"],
      ["Primary Formula", results.primaryFormulaUsed, "Clinical Standard"],
      ["CKD Category", results.ckdStage, results.stageName],
      ["KDIGO 2024 Risk", results.kdigoRisk.riskCategory, `${results.kdigoRisk.gStage}${results.kdigoRisk.aStage} Prognosis`],
      ["Serum Creatinine (mg/dL)", results.creatinineMgDl.toString(), "mg/dL"],
      ["Serum Creatinine (umol/L)", results.creatinineUmolL.toString(), "umol/L"],
      ["Serum Cystatin C", cystatinC.toString(), "mg/L"],
      ["Urine Albumin (uACR)", uACR.toString(), "mg/g"],
      ["Creatinine Clearance (CrCl)", (results.creatinineClearance || 0).toString(), "mL/min (Cockcroft-Gault)"],
      ["Patient Age", age.toString(), "Years"],
      ["Biological Sex", gender.toUpperCase(), ""],
      ["Demographic Race (Legacy)", race === "black" ? "Black" : "Non-Black", "For 2009/MDRD models"],
      ["Patient Population", patientType.toUpperCase(), ""],
      ["Height", unitSystem === "us" ? `${heightFeet}ft ${heightInches}in` : `${heightCm}cm`, ""],
      ["Weight", unitSystem === "us" ? `${weightLbs}lbs` : `${weightKg}kg`, ""],
      ["Age-Matched Baseline GFR", results.ageExpectedGfr.toString(), "mL/min/1.73m2"],
      ["Percent of Age Baseline", `${results.agePercentile}%`, ""],
      [],
      ["Formula Comparison Name", "Calculated Value", "Unit", "Category", "Variance vs Primary"],
      ...results.formulaComparisons.map((fc) => [
        fc.formulaName,
        fc.egfrValue.toString(),
        fc.unit,
        fc.ckdStage,
        fc.differenceFromDefault.toString(),
      ]),
    ];

    const csvString = "\uFEFF" + rows.map((r) => r.map((cell) => `"${(cell || "").replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gfr_assessment_${age}yo_${gender}_${results.eGfr}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 14. Report Modal Data Structure
  const reportData: CalculatorReportData = {
    meta: {
      calculatorName: "Professional GFR Calculator & Kidney Health Suite",
      reportTitle: "Clinical Glomerular Filtration Rate & Renal Function Report",
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
        label: "Estimated GFR (eGFR)",
        value: `${results.eGfr} mL/min/1.73m²`,
        subtitle: results.primaryFormulaUsed,
        colorTheme: "cyan",
      },
      {
        label: "CKD Staging Classification",
        value: results.ckdStage,
        subtitle: results.stageName,
        colorTheme: "emerald",
      },
      {
        label: "Kidney Function Capacity",
        value: `${results.kidneyFunctionPercent}%`,
        subtitle: `Age Baseline: ${results.ageExpectedGfr} mL/min/1.73m²`,
        colorTheme: "purple",
      },
      {
        label: "KDIGO Risk Class",
        value: `${results.kdigoRisk.riskCategory}`,
        subtitle: `${results.kdigoRisk.gStage}${results.kdigoRisk.aStage} Prognosis`,
        colorTheme: "amber",
      },
    ],
    sections: [
      {
        title: "Patient Parameters & Lab Findings",
        items: [
          { label: "Patient Population", value: patientType.toUpperCase() },
          { label: "Age & Gender", value: `${age} yrs (${gender.toUpperCase()})` },
          { label: "Serum Creatinine", value: `${results.creatinineMgDl} mg/dL (${results.creatinineUmolL} µmol/L)` },
          { label: "Height & Weight", value: unitSystem === "us" ? `${heightFeet}'${heightInches}" (${weightLbs} lbs)` : `${heightCm} cm (${weightKg} kg)` },
          { label: "Urine Albumin-Creatinine Ratio (uACR)", value: `${uACR} mg/g (${results.kdigoRisk.aStage})` },
          { label: "Serum Cystatin C", value: `${cystatinC} mg/L` },
          { label: "Primary Formula Used", value: results.primaryFormulaUsed },
          { label: "Creatinine Clearance (Cockcroft-Gault)", value: `${results.creatinineClearance} mL/min (Unindexed)` },
        ],
      },
      {
        title: "Clinical Evaluation & Staging",
        items: [
          { label: "eGFR Value", value: `${results.eGfr} mL/min/1.73m²` },
          { label: "CKD Stage", value: results.ckdStage },
          { label: "Stage Description", value: results.stageDescription },
          { label: "Age-Adjusted Percentile", value: `${results.agePercentile}% of normal` },
        ],
      },
    ],
    recommendation: {
      title: "Nephrology Action Plan & Risk Mitigation",
      text: results.recommendations[0] || "Routine monitoring recommended.",
      reasons: results.actionPlan,
      score: results.kidneyFunctionPercent,
      rating: results.kdigoRisk.riskCategory,
    },
    table: {
      title: "Multi-Formula Equation Comparison",
      headers: [
        { key: "formula", label: "Equation Name", align: "left" },
        { key: "egfr", label: "Value", align: "right" },
        { key: "unit", label: "Unit", align: "center" },
        { key: "stage", label: "Category", align: "right" },
        { key: "diff", label: "Variance", align: "right" },
      ],
      rows: results.formulaComparisons.map((fc) => ({
        formula: fc.formulaName,
        egfr: `${fc.egfrValue}`,
        unit: fc.unit,
        stage: fc.ckdStage,
        diff: `${fc.differenceFromDefault > 0 ? "+" : ""}${fc.differenceFromDefault}`,
      })),
    },
    notes: [
      "eGFR is a mathematical estimate. Clinical diagnosis of CKD requires evidence of persistent kidney damage (e.g., uACR ≥ 30 mg/g) for ≥ 3 months.",
      "In the absence of markers of kidney damage, eGFR values ≥ 60 mL/min/1.73m² (G1 and G2) do not indicate Chronic Kidney Disease.",
      "Cockcroft-Gault estimates unadjusted Creatinine Clearance (mL/min) for pharmacological drug dosing and is not interchangeable with BSA-indexed eGFR.",
    ],
  };

  // 15. 2D KDIGO Prognosis Matrix Grid Config
  const kdigoMatrixData = [
    { g: "G1", gLabel: "Normal or High (≥90)", gDesc: "≥90", a1: "Low", a2: "Moderate", a3: "High" },
    { g: "G2", gLabel: "Mildly Decreased (60-89)", gDesc: "60–89", a1: "Low", a2: "Moderate", a3: "High" },
    { g: "G3a", gLabel: "Mild-Moderate (45-59)", gDesc: "45–59", a1: "Moderate", a2: "High", a3: "Very High" },
    { g: "G3b", gLabel: "Moderate-Severe (30-44)", gDesc: "30–44", a1: "High", a2: "Very High", a3: "Very High" },
    { g: "G4", gLabel: "Severely Decreased (15-29)", gDesc: "15–29", a1: "Very High", a2: "Very High", a3: "Very High" },
    { g: "G5", gLabel: "Kidney Failure (<15)", gDesc: "<15", a1: "Very High", a2: "Very High", a3: "Very High" },
  ];

  const getRiskColorClass = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800";
      case "Moderate":
        return "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800";
      case "High":
        return "bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-800";
      case "Very High":
        return "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 print:p-0 font-sans">
      {/* 1. Mode Selector Bar */}
      <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Clinical Formula &amp; Analysis Modes
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSavedTray(!showSavedTray)}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5" />
              Saved Scenarios ({savedScenarios.length})
            </button>
            <button
              onClick={handleResetDefaults}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1 cursor-pointer ml-2"
              title="Reset inputs to standard baseline"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {modesList.map((m) => {
            const Icon = m.icon;
            const isSelected = calculationMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleModeSelect(m.id)}
                className={`flex items-center gap-2 p-2 rounded-xl transition-all duration-200 text-left cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold scale-[1.01]"
                    : "bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60"
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg shrink-0 ${
                    isSelected ? "bg-white/20 text-white" : "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold leading-tight truncate">
                    {m.label}
                  </div>
                  <div className={`text-[10px] leading-tight truncate hidden sm:block ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                    {m.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Slide-Out Saved Scenarios Drawer */}
      {showSavedTray && (
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/80 rounded-2xl border border-slate-200 dark:border-zinc-700 space-y-3 print:hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Saved Patient Profiles ({savedScenarios.length})
            </span>
            <button
              onClick={() => setShowSavedTray(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {savedScenarios.length === 0 ? (
            <p className="text-xs text-slate-500 py-2">No saved patient scenarios. Click &ldquo;Save Scenario&rdquo; on the results card to bookmark scenarios for immediate review.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto">
              {savedScenarios.map((sc) => (
                <div
                  key={sc.id}
                  className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-700 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <button
                      onClick={() => handleRestoreScenario(sc)}
                      className="text-left font-bold text-xs text-slate-800 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 truncate block cursor-pointer"
                    >
                      {sc.name}
                    </button>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {sc.eGfr} mL/min/1.73m² · {sc.ckdStage}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteScenario(sc.id)}
                    className="text-slate-300 hover:text-rose-500 p-1 cursor-pointer"
                    title="Delete scenario"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. Main Calculation & Inputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Inputs Form */}
        <div className="lg:col-span-5 space-y-5 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs print:hidden">
          {/* Card Header with Patient Type & Unit Switchers */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3.5 space-y-3">
            <h2 className="text-base font-bold text-blue-600 dark:text-blue-400">
              Patient Lab Parameters
            </h2>

            {/* Sub-row for Patient Population & Creatinine Units */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Population
                </label>
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                  <button
                    type="button"
                    onClick={() => handlePatientTypeChange("adult")}
                    className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all cursor-pointer ${
                      patientType === "adult"
                        ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    Adult
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePatientTypeChange("child")}
                    className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all cursor-pointer ${
                      patientType === "child"
                        ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    Child
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Creatinine Unit
                </label>
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                  <button
                    type="button"
                    onClick={() => handleCreatinineUnitToggle("mg/dL")}
                    className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all cursor-pointer ${
                      creatinineUnit === "mg/dL"
                        ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    mg/dL
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCreatinineUnitToggle("umol/L")}
                    className={`w-1/2 py-1 rounded-lg font-bold text-center transition-all cursor-pointer ${
                      creatinineUnit === "umol/L"
                        ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    µmol/L
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Serum Creatinine & Age Fields */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="gfr-scr" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Serum Creatinine ({creatinineUnit})
              </label>
              <input
                id="gfr-scr"
                type="number"
                step="0.01"
                min={0.1}
                max={25}
                value={serumCreatinine}
                onChange={(e) => setSerumCreatinine(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white font-bold text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Normal: 0.6–1.2 mg/dL</span>
            </div>

            <div>
              <label htmlFor="gfr-age" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Age (Years)
              </label>
              <input
                id="gfr-age"
                type="number"
                min={1}
                max={120}
                value={age}
                onChange={(e) => handleAgeChange(parseInt(e.target.value, 10))}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white font-bold text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                {patientType === "child" ? "Pediatric (<18 yrs)" : "Adult (≥18 yrs)"}
              </span>
            </div>
          </div>

          {/* Gender & Race Selection */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="gfr-gender" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Biological Sex
              </label>
              <select
                id="gfr-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label htmlFor="gfr-race" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Race (Legacy 2009/MDRD)
              </label>
              <select
                id="gfr-race"
                value={race}
                onChange={(e) => setRace(e.target.value as RaceType)}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="non-black">Non-Black</option>
                <option value="black">Black / African Descent</option>
              </select>
            </div>
          </div>

          {/* Height & Weight Inputs with Unit Toggle */}
          <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Body Dimensions (Schwartz &amp; Cockcroft)
              </h3>
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleUnitSystemToggle("us")}
                  className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${
                    unitSystem === "us" ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs" : "text-slate-500"
                  }`}
                >
                  US (ft/lb)
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitSystemToggle("metric")}
                  className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${
                    unitSystem === "metric" ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs" : "text-slate-500"
                  }`}
                >
                  Metric (cm/kg)
                </button>
              </div>
            </div>

            {unitSystem === "us" ? (
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label htmlFor="gfr-ht-ft" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Height (ft)
                  </label>
                  <input
                    id="gfr-ht-ft"
                    type="number"
                    min={1}
                    max={8}
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="gfr-ht-in" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Height (in)
                  </label>
                  <input
                    id="gfr-ht-in"
                    type="number"
                    min={0}
                    max={11}
                    value={heightInches}
                    onChange={(e) => setHeightInches(parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="gfr-wt-lb" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Weight (lbs)
                  </label>
                  <input
                    id="gfr-wt-lb"
                    type="number"
                    min={5}
                    max={700}
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="gfr-ht-cm" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Height (cm)
                  </label>
                  <input
                    id="gfr-ht-cm"
                    type="number"
                    min={30}
                    max={250}
                    value={heightCm}
                    onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="gfr-wt-kg" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    id="gfr-wt-kg"
                    type="number"
                    min={2}
                    max={350}
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Advanced Biomarkers: Cystatin C & uACR */}
          <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Advanced Biomarkers &amp; KDIGO Prognosis
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="gfr-cys" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Serum Cystatin C (mg/L)
                </label>
                <input
                  id="gfr-cys"
                  type="number"
                  step="0.05"
                  min={0.1}
                  max={15}
                  value={cystatinC}
                  onChange={(e) => setCystatinC(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Normal: 0.6–1.0 mg/L</span>
              </div>

              <div>
                <label htmlFor="gfr-uacr" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Urine Albumin uACR (mg/g)
                </label>
                <input
                  id="gfr-uacr"
                  type="number"
                  min={0}
                  max={5000}
                  value={uACR}
                  onChange={(e) => setUACR(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Normal A1: &lt; 30 mg/g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Results & Interactive Visualizations */}
        <div className="lg:col-span-7 space-y-5">
          {/* Key Metric Highlights Hero Card */}
          <div className="bg-gradient-to-br from-blue-600 via-teal-600 to-emerald-700 p-5 sm:p-6 rounded-2xl text-white shadow-lg shadow-blue-600/10 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-blue-100 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  Estimated Glomerular Filtration Rate (eGFR)
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  {results.eGfr} <span className="text-base sm:text-lg font-normal text-blue-100">mL/min/1.73m²</span>
                </div>
                <div className="text-xs text-blue-100 mt-1">
                  Primary Formula: <span className="text-white font-bold">{results.primaryFormulaUsed}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-xs">
                  {results.ckdStage}
                </span>
                <div className="text-xs text-blue-100 mt-1 font-medium max-w-xs">{results.stageName}</div>
              </div>
            </div>

            {/* Sub-Metrics Cards Grid */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-white/15 backdrop-blur-md p-3 rounded-xl border border-white/20 text-center">
                <div className="text-[10px] sm:text-[11px] text-blue-100 font-semibold uppercase">Kidney Capacity</div>
                <div className="text-lg sm:text-xl font-black text-white mt-0.5">{results.kidneyFunctionPercent}%</div>
                <div className="text-[9px] sm:text-[10px] text-blue-100">Baseline 100</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3 rounded-xl border border-white/20 text-center">
                <div className="text-[10px] sm:text-[11px] text-blue-100 font-semibold uppercase">KDIGO Risk</div>
                <div className="text-base sm:text-lg font-black text-white mt-0.5 truncate">{results.kdigoRisk.riskCategory}</div>
                <div className="text-[9px] sm:text-[10px] text-blue-100">{results.kdigoRisk.gStage}{results.kdigoRisk.aStage} Prognosis</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3 rounded-xl border border-white/20 text-center">
                <div className="text-[10px] sm:text-[11px] text-blue-100 font-semibold uppercase">Creatinine Clearance</div>
                <div className="text-lg sm:text-xl font-black text-white mt-0.5">{results.creatinineClearance}</div>
                <div className="text-[9px] sm:text-[10px] text-blue-100">mL/min (Cockcroft)</div>
              </div>
            </div>

            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-white/20 pt-3.5 print:hidden">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsReportOpen(true)}
                  className="flex items-center gap-1.5 bg-white text-blue-800 hover:bg-blue-50 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  PDF Report
                </button>
                <button
                  type="button"
                  onClick={handleSaveScenario}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-sm transition-all cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  {savedSuccess ? "Saved!" : "Save"}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-2.5 py-1.5 rounded-xl text-xs font-medium backdrop-blur-sm transition-all cursor-pointer"
                  title="Export CSV Data"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" /> CSV
                </button>
                <button
                  type="button"
                  onClick={handleShareUrl}
                  className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-2.5 py-1.5 rounded-xl text-xs font-medium backdrop-blur-sm transition-all cursor-pointer"
                  title="Share parameter link"
                >
                  <Share2 className="w-3.5 h-3.5" /> {shared ? "Copied Link!" : "Share"}
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-2.5 py-1.5 rounded-xl text-xs font-medium backdrop-blur-sm transition-all cursor-pointer"
                  title="Copy summary to clipboard"
                >
                  <Copy className="w-3.5 h-3.5" /> {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Visualizations Container */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5 print:hidden">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl overflow-x-auto text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("ckd-stage")}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "ckd-stage"
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                CKD Stage Meter
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("formula-comp")}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "formula-comp"
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Formula Comparison
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("age-decline")}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "age-decline"
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Age Decline Curve
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("kdigo-matrix")}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "kdigo-matrix"
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                KDIGO 2024 Grid
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("action-plan")}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "action-plan"
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Clinical Action Plan
              </button>
            </div>

            {/* TAB 1: CKD Stage Spectrum Meter */}
            {activeTab === "ckd-stage" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
                    Chronic Kidney Disease (CKD) Stage Spectrum
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">eGFR: {results.eGfr} mL/min/1.73m²</span>
                </div>

                <div className="space-y-2">
                  <div className="h-6 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex border border-slate-200 dark:border-slate-700">
                    <div className="h-full bg-emerald-500 flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "30%" }}>G1 (≥90)</div>
                    <div className="h-full bg-teal-500 flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "25%" }}>G2 (60-89)</div>
                    <div className="h-full bg-amber-500 flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "15%" }}>G3a</div>
                    <div className="h-full bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "15%" }}>G3b</div>
                    <div className="h-full bg-rose-500 flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "10%" }}>G4</div>
                    <div className="h-full bg-purple-700 flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "5%" }}>G5</div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                    <strong>Current Assessment:</strong> {results.stageDescription}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: Formula Comparison Bar Chart & Table */}
            {activeTab === "formula-comp" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
                    Multi-Formula Equation Comparison Suite
                  </h3>
                </div>

                <div className="h-60 w-full">
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={formulaBarData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} angle={-25} textAnchor="end" interval={0} />
                        <YAxis stroke="#64748b" fontSize={11} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderColor: "#cbd5e1",
                            borderRadius: "12px",
                            color: "#0f172a",
                            fontSize: "12px",
                          }}
                          formatter={(val: any) => [`${val}`, "Calculated Output"]}
                        />
                        <Bar dataKey="eGFR" fill="#0284c7" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-60 w-full bg-slate-50 dark:bg-slate-800/40 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">Loading formula comparison chart...</div>
                  )}
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
                      <tr>
                        <th className="py-2 px-3">Equation</th>
                        <th className="py-2 px-3">Result</th>
                        <th className="py-2 px-3">Unit</th>
                        <th className="py-2 px-3">Category</th>
                        <th className="py-2 px-3">Variance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      {results.formulaComparisons.map((fc, i) => (
                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="py-2 px-3 font-semibold text-slate-900 dark:text-white">{fc.formulaName}</td>
                          <td className="py-2 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">{fc.egfrValue}</td>
                          <td className="py-2 px-3 text-[11px] text-slate-400">{fc.unit}</td>
                          <td className="py-2 px-3 font-medium">{fc.ckdStage}</td>
                          <td className="py-2 px-3 font-mono text-[11px]">{fc.differenceFromDefault > 0 ? `+${fc.differenceFromDefault}` : fc.differenceFromDefault}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: Age-Related Normal GFR Decline Line Chart */}
            {activeTab === "age-decline" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
                    Expected Age-Related GFR Decline Curve
                  </h3>
                </div>

                <div className="h-60 w-full">
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.ageDeclineCurve} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="age" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} domain={[40, 130]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderColor: "#cbd5e1",
                            borderRadius: "12px",
                            color: "#0f172a",
                            fontSize: "12px",
                          }}
                        />
                        <Line type="monotone" dataKey="averageGfr" name="Population Average" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="patientProjectedGfr" name="Patient Projection" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-60 w-full bg-slate-50 dark:bg-slate-800/40 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">Loading decline curve...</div>
                  )}
                </div>
                <p className="text-xs text-slate-500">Normal human kidney filtration physiologically decreases by approximately 0.8–1.0 mL/min/1.73m² per year after age 40 due to natural nephron senescence.</p>
              </div>
            )}

            {/* TAB 4: 2D KDIGO 2024 Heat Map Grid */}
            {activeTab === "kdigo-matrix" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
                    KDIGO 2024 CKD Prognosis Risk Grid (eGFR × Albuminuria)
                  </h3>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-center text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
                        <th className="py-2.5 px-3 text-left border-b border-slate-200 dark:border-slate-700">eGFR Category (mL/min/1.73m²)</th>
                        <th className="py-2.5 px-2 border-b border-slate-200 dark:border-slate-700">
                          A1: Normal<br /><span className="text-[10px] font-normal text-slate-500">&lt; 30 mg/g</span>
                        </th>
                        <th className="py-2.5 px-2 border-b border-slate-200 dark:border-slate-700">
                          A2: Moderate<br /><span className="text-[10px] font-normal text-slate-500">30–300 mg/g</span>
                        </th>
                        <th className="py-2.5 px-2 border-b border-slate-200 dark:border-slate-700">
                          A3: Severe<br /><span className="text-[10px] font-normal text-slate-500">&gt; 300 mg/g</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {kdigoMatrixData.map((row) => {
                        const isCurrentG = results.kdigoRisk.gStage === row.g;
                        const isCurrentA1 = isCurrentG && results.kdigoRisk.aStage === "A1";
                        const isCurrentA2 = isCurrentG && results.kdigoRisk.aStage === "A2";
                        const isCurrentA3 = isCurrentG && results.kdigoRisk.aStage === "A3";

                        return (
                          <tr key={row.g}>
                            <td className="py-2 px-3 text-left font-semibold text-slate-900 dark:text-white">
                              {row.g}: {row.gDesc}
                            </td>
                            <td className={`py-2 px-2 border ${getRiskColorClass(row.a1)} ${isCurrentA1 ? "ring-2 ring-blue-600 font-extrabold shadow-sm scale-105" : ""}`}>
                              {row.a1} {isCurrentA1 && "★ (You)"}
                            </td>
                            <td className={`py-2 px-2 border ${getRiskColorClass(row.a2)} ${isCurrentA2 ? "ring-2 ring-blue-600 font-extrabold shadow-sm scale-105" : ""}`}>
                              {row.a2} {isCurrentA2 && "★ (You)"}
                            </td>
                            <td className={`py-2 px-2 border ${getRiskColorClass(row.a3)} ${isCurrentA3 ? "ring-2 ring-blue-600 font-extrabold shadow-sm scale-105" : ""}`}>
                              {row.a3} {isCurrentA3 && "★ (You)"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="p-3.5 rounded-xl border text-xs space-y-1.5" style={{ backgroundColor: `${results.kdigoRisk.colorHex}15`, borderColor: `${results.kdigoRisk.colorHex}40` }}>
                  <div className="font-bold text-sm" style={{ color: results.kdigoRisk.colorHex }}>
                    Prognosis Classification: {results.kdigoRisk.riskCategory} ({results.kdigoRisk.gStage}{results.kdigoRisk.aStage})
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{results.kdigoRisk.description}</p>
                </div>
              </div>
            )}

            {/* TAB 5: Clinical Action Plan */}
            {activeTab === "action-plan" && (
              <div className="space-y-3.5">
                <h3 className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
                  Nephrology Action Plan &amp; Monitoring Guidance
                </h3>

                <div className="space-y-2">
                  {results.actionPlan.map((plan, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
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

export default GfrCalculator;
