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

  // Hydration Mounted & Active Tab State
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "ckd-stage" | "formula-comp" | "age-decline" | "kdigo-matrix" | "action-plan"
  >("ckd-stage");

  // Modal & Copy State
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update mode when switching patient type
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

  // Results Calculation Memo
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

  // Modes Configuration
  const modesList: { id: GfrCalculationMode; label: string; icon: any; desc: string }[] = [
    { id: "adult-ckdepi2021", label: "CKD-EPI 2021", icon: Activity, desc: "NKF-ASN Race-Free standard" },
    { id: "adult-ckdepi2009", label: "CKD-EPI 2009", icon: Layers, desc: "Original race-adjusted equation" },
    { id: "mdrd", label: "MDRD Study", icon: Sliders, desc: "IDMS-traceable renal equation" },
    { id: "mayo", label: "Mayo Quadratic", icon: Sparkles, desc: "Preserved function & living donors" },
    { id: "cockcroft-gault", label: "Cockcroft-Gault", icon: Scale, desc: "Creatinine clearance (CrCl)" },
    { id: "pediatric-schwartz", label: "Bedside Schwartz", icon: User, desc: "Pediatric formula (<18 yrs)" },
    { id: "cystatin-c", label: "Cystatin C Combo", icon: Award, desc: "Creatinine + Cystatin C combined" },
    { id: "kdigo-risk", label: "KDIGO 2024 Grid", icon: ShieldAlert, desc: "Prognosis risk matrix (eGFR+uACR)" },
    { id: "comparison", label: "Multi-Formula", icon: BarChart2, desc: "Side-by-side formula comparison" },
    { id: "custom", label: "Custom Renal", icon: Heart, desc: "Custom clinical evaluation" },
  ];

  // Formula Comparison Bar Data
  const formulaBarData = results.formulaComparisons.map((fc) => ({
    name: fc.formulaName.split(" ")[0],
    eGFR: fc.egfrValue,
  }));

  // CSV Export Handler
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Parameter,Value\n";
    csvContent += `Mode,${results.mode}\n`;
    csvContent += `Patient Type,${results.patientType.toUpperCase()}\n`;
    csvContent += `Primary Formula,${results.primaryFormulaUsed}\n`;
    csvContent += `Serum Creatinine,${results.creatinineMgDl} mg/dL (${results.creatinineUmolL} umol/L)\n`;
    csvContent += `Estimated GFR (eGFR),${results.eGfr} mL/min/1.73m2\n`;
    csvContent += `CKD Stage,${results.ckdStage}\n`;
    csvContent += `Kidney Function Capacity,${results.kidneyFunctionPercent}%\n`;
    csvContent += `KDIGO Risk Category,${results.kdigoRisk.riskCategory} (${results.kdigoRisk.gStage}${results.kdigoRisk.aStage})\n\n`;

    csvContent += "Formula Name,eGFR (mL/min/1.73m2),CKD Stage,Difference\n";
    results.formulaComparisons.forEach((fc) => {
      csvContent += `"${fc.formulaName}",${fc.egfrValue},${fc.ckdStage},${fc.differenceFromDefault}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gfr_assessment_${results.eGfr}_egfr.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Summary Handler
  const handleCopy = () => {
    const summaryText = `GFR & Kidney Function Results:\n• Estimated GFR (eGFR): ${results.eGfr} mL/min/1.73m²\n• CKD Stage: ${results.ckdStage} (${results.stageName})\n• Kidney Function Capacity: ${results.kidneyFunctionPercent}%\n• Primary Formula: ${results.primaryFormulaUsed}\n• KDIGO Risk Category: ${results.kdigoRisk.riskCategory} (${results.kdigoRisk.gStage}${results.kdigoRisk.aStage})\n• Serum Creatinine: ${results.creatinineMgDl} mg/dL (${results.creatinineUmolL} µmol/L)\nCalculated at Calculator Platform.`;
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
          { label: "Height & Weight", value: `${heightCm} cm (${weightKg} kg)` },
          { label: "Urine Albumin-Creatinine Ratio (uACR)", value: `${uACR} mg/g (${results.kdigoRisk.aStage})` },
          { label: "Serum Cystatin C", value: `${cystatinC} mg/L` },
          { label: "Primary Formula Used", value: results.primaryFormulaUsed },
          { label: "Creatinine Clearance (Cockcroft-Gault)", value: `${results.creatinineClearance} mL/min` },
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
        { key: "egfr", label: "eGFR (mL/min/1.73m²)", align: "right" },
        { key: "stage", label: "CKD Stage", align: "right" },
        { key: "diff", label: "Variance", align: "right" },
      ],
      rows: results.formulaComparisons.map((fc) => ({
        formula: fc.formulaName,
        egfr: `${fc.egfrValue}`,
        stage: fc.ckdStage,
        diff: `${fc.differenceFromDefault > 0 ? "+" : ""}${fc.differenceFromDefault}`,
      })),
    },
    notes: [
      "eGFR values should be interpreted alongside clinical signs, blood pressure, and urine tests.",
      "A single reduced eGFR reading should be confirmed after 3 months to diagnose Chronic Kidney Disease.",
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
                onClick={() => {
                  setCalculationMode(m.id);
                  if (m.id === "pediatric-schwartz") setPatientType("child");
                  else setPatientType("adult");
                }}
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
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-600" />
              Patient Lab Parameters
            </h2>

            {/* Patient Type & Creatinine Unit Toggles */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  onClick={() => handlePatientTypeChange("adult")}
                  className={`px-2 py-1 rounded-lg font-bold transition-all ${
                    patientType === "adult"
                      ? "bg-white text-cyan-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Adult
                </button>
                <button
                  onClick={() => handlePatientTypeChange("child")}
                  className={`px-2 py-1 rounded-lg font-bold transition-all ${
                    patientType === "child"
                      ? "bg-white text-cyan-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Child
                </button>
              </div>

              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  onClick={() => setCreatinineUnit("mg/dL")}
                  className={`px-2 py-1 rounded-lg font-bold transition-all ${
                    creatinineUnit === "mg/dL"
                      ? "bg-white text-emerald-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  mg/dL
                </button>
                <button
                  onClick={() => setCreatinineUnit("umol/L")}
                  className={`px-2 py-1 rounded-lg font-bold transition-all ${
                    creatinineUnit === "umol/L"
                      ? "bg-white text-emerald-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  µmol/L
                </button>
              </div>
            </div>
          </div>

          {/* Serum Creatinine & Age Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Serum Creatinine ({creatinineUnit})
              </label>
              <input
                type="number"
                step="0.01"
                min={0.1}
                max={20}
                value={serumCreatinine}
                onChange={(e) => setSerumCreatinine(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Normal: 0.6 – 1.2 mg/dL</span>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Age (Years)
              </label>
              <input
                type="number"
                min={1}
                max={110}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">{patientType === "child" ? "Pediatric (<18)" : "Adult (≥18)"}</span>
            </div>
          </div>

          {/* Gender & Race Selection */}
          <div className="grid grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Race (Legacy 2009/MDRD)
              </label>
              <select
                value={race}
                onChange={(e) => setRace(e.target.value as RaceType)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
              >
                <option value="non-black">Non-Black</option>
                <option value="black">Black / African Descent</option>
              </select>
            </div>
          </div>

          {/* Height & Weight Inputs */}
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Body Dimensions (Required for Schwartz & Cockcroft-Gault)
            </h3>

            {unitSystem === "us" ? (
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Height (Feet)
                  </label>
                  <input
                    type="number"
                    min={2}
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
                    min={10}
                    max={500}
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
                    min={40}
                    max={230}
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
                    min={5}
                    max={250}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Advanced Markers: Cystatin C & uACR */}
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Advanced Biomarkers & KDIGO Staging
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Serum Cystatin C (mg/L)
                </label>
                <input
                  type="number"
                  step="0.05"
                  min={0.2}
                  max={10}
                  value={cystatinC}
                  onChange={(e) => setCystatinC(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Urine Albumin uACR (mg/g)
                </label>
                <input
                  type="number"
                  min={0}
                  max={3000}
                  value={uACR}
                  onChange={(e) => setUACR(Number(e.target.value))}
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
                  Estimated Glomerular Filtration Rate (eGFR)
                </div>
                <div className="text-3xl lg:text-4xl font-extrabold text-white mt-1">
                  {results.eGfr} <span className="text-lg font-normal text-cyan-100">mL/min/1.73m²</span>
                </div>
                <div className="text-xs text-cyan-100 mt-1">
                  Primary Formula: <span className="text-white font-bold">{results.primaryFormulaUsed}</span>
                </div>
              </div>

              <div className="text-right">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm"
                >
                  {results.ckdStage}
                </span>
                <div className="text-xs text-cyan-100 mt-1.5 font-medium">{results.stageName.split(":")[1] || results.stageName}</div>
              </div>
            </div>

            {/* Sub-Metrics Cards Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-cyan-100 font-semibold uppercase">Kidney Capacity</div>
                <div className="text-xl font-black text-white mt-0.5">{results.kidneyFunctionPercent}%</div>
                <div className="text-[10px] text-cyan-100">Baseline 100</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-cyan-100 font-semibold uppercase">KDIGO Risk</div>
                <div className="text-lg font-black text-white mt-0.5">{results.kdigoRisk.riskCategory}</div>
                <div className="text-[10px] text-cyan-100">{results.kdigoRisk.gStage}{results.kdigoRisk.aStage} Prognosis</div>
              </div>

              <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
                <div className="text-[11px] text-cyan-100 font-semibold uppercase">Creatinine Clearance</div>
                <div className="text-xl font-black text-white mt-0.5">{results.creatinineClearance}</div>
                <div className="text-[10px] text-cyan-100">mL/min (Cockcroft)</div>
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
                onClick={() => setActiveTab("ckd-stage")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "ckd-stage"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                CKD Stage Meter
              </button>

              <button
                onClick={() => setActiveTab("formula-comp")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "formula-comp"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                7 Formula Comparison
              </button>

              <button
                onClick={() => setActiveTab("age-decline")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "age-decline"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Age GFR Decline Curve
              </button>

              <button
                onClick={() => setActiveTab("kdigo-matrix")}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === "kdigo-matrix"
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                KDIGO Risk Grid
              </button>

              <button
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

            {/* TAB 1: CKD Stage Spectrum Meter */}
            {activeTab === "ckd-stage" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-600" />
                    Chronic Kidney Disease (CKD) Stage Spectrum
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">eGFR: {results.eGfr} mL/min/1.73m²</span>
                </div>

                {/* Visual Progress Bar Meter */}
                <div className="space-y-2">
                  <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
                    <div className="h-full bg-emerald-500 flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "30%" }}>G1 (≥90)</div>
                    <div className="h-full bg-teal-500 flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "25%" }}>G2 (60-89)</div>
                    <div className="h-full bg-amber-500 flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "15%" }}>G3a</div>
                    <div className="h-full bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "15%" }}>G3b</div>
                    <div className="h-full bg-rose-500 flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "10%" }}>G4</div>
                    <div className="h-full bg-purple-700 flex items-center justify-center text-[10px] text-white font-bold" style={{ width: "5%" }}>G5</div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <strong>Current Assessment:</strong> {results.stageDescription}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: 7 Formula Comparison Bar Chart */}
            {activeTab === "formula-comp" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-cyan-600" />
                    Multi-Formula Equation Comparison
                  </h3>
                </div>

                <div className="h-64 w-full">
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={formulaBarData}>
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
                          formatter={(val: any) => [`${val} mL/min/1.73m²`, "eGFR"]}
                        />
                        <Bar dataKey="eGFR" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-64 w-full bg-slate-50/50 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">Loading formula comparison chart...</div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: Age-Related Normal GFR Decline Line Chart */}
            {activeTab === "age-decline" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <LineIcon className="w-4 h-4 text-emerald-600" />
                    Expected Age-Related GFR Decline Curve
                  </h3>
                </div>

                <div className="h-64 w-full">
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.ageDeclineCurve}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="age" stroke="#64748b" fontSize={11} label={{ value: "Age (Years)", position: "insideBottom", offset: -5 }} />
                        <YAxis stroke="#64748b" fontSize={11} domain={[40, 130]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderColor: "#cbd5e1",
                            borderRadius: "12px",
                            color: "#0f172a",
                          }}
                        />
                        <Line type="monotone" dataKey="averageGfr" name="Population Average" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="patientProjectedGfr" name="Patient Trajectory" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-64 w-full bg-slate-50/50 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">Loading decline curve...</div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: KDIGO Prognosis Risk Grid */}
            {activeTab === "kdigo-matrix" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  KDIGO 2024 CKD Risk Staging Grid
                </h3>

                <div className="p-4 rounded-2xl border text-xs space-y-2" style={{ backgroundColor: `${results.kdigoRisk.colorHex}15`, borderColor: `${results.kdigoRisk.colorHex}40` }}>
                  <div className="font-bold text-sm" style={{ color: results.kdigoRisk.colorHex }}>
                    Prognosis Class: {results.kdigoRisk.riskCategory} ({results.kdigoRisk.gStage}{results.kdigoRisk.aStage})
                  </div>
                  <p className="text-slate-700 leading-relaxed">{results.kdigoRisk.description}</p>
                </div>
              </div>
            )}

            {/* TAB 5: Clinical Action Plan */}
            {activeTab === "action-plan" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                  Nephrology Action Plan & Monitoring Guidance
                </h3>

                <div className="space-y-2.5">
                  {results.actionPlan.map((plan, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{plan}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Smart Insights & Personalized Recommendations */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 print:hidden">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Smart Clinical Recommendations
            </h3>

            <div className="space-y-2.5">
              {results.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{rec}</span>
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

export default GfrCalculator;
