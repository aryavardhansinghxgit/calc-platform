"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Droplets,
  Thermometer,
  Wind,
  ShieldAlert,
  Paintbrush,
  Cloud,
  Sliders,
  Check,
  Share2,
  Printer,
  ChevronUp,
  ChevronDown,
  Info,
  Sparkles,
  Layers,
  Copy,
  Download,
  FileSpreadsheet,
  FileText,
  Code,
  Bookmark,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TempUnit,
  TargetVariable,
  PsychrometricModel,
  DewPointResult,
} from "@/app/calculators/dew-point-calculator/types";
import {
  calculateDewPoint,
  convertFromC,
  convertToC,
  getModelConstants,
} from "@/app/calculators/dew-point-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

interface SavedState {
  targetVar: TargetVariable;
  unit: TempUnit;
  airTemp: number;
  rh: number;
  dewPointInput: number;
  model: PsychrometricModel;
  surfaceTemp: number;
}

export function DewPointCalculator() {
  // Inputs State
  const [targetVar, setTargetVar] = useState<TargetVariable>("dew_point");
  const [unit, setUnit] = useState<TempUnit>("F");
  const [airTemp, setAirTemp] = useState<number>(70);
  const [rh, setRh] = useState<number>(65);
  const [dewPointInput, setDewPointInput] = useState<number>(57.7);

  // Advanced Inputs
  const [model, setModel] = useState<PsychrometricModel>("alduchov_eskridge");
  const [surfaceTemp, setSurfaceTemp] = useState<number>(75);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showChart, setShowChart] = useState<boolean>(true);

  // UI Feedback State
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copiedResult, setCopiedResult] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [restoreSuccess, setRestoreSuccess] = useState<boolean>(false);
  const [hasSavedState, setHasSavedState] = useState<boolean>(false);

  // Check for saved state in localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dp_calc_saved_state");
      if (saved) {
        setHasSavedState(true);
      }
    } catch {
      // localStorage may be restricted in some environments
    }
  }, []);

  // Compute Results
  const result: DewPointResult = useMemo(() => {
    return calculateDewPoint(
      targetVar,
      airTemp,
      rh,
      dewPointInput,
      unit,
      model,
      surfaceTemp
    );
  }, [targetVar, airTemp, rh, dewPointInput, unit, model, surfaceTemp]);

  // Comfort badge and gradient styles
  const getComfortBadgeStyle = (cat: string) => {
    switch (cat) {
      case "severe_stress":
        return "bg-rose-950/80 border-rose-400 text-rose-100 font-bold";
      case "muggy":
        return "bg-amber-950/80 border-amber-400 text-amber-100 font-bold";
      case "sticky":
        return "bg-yellow-900/60 border-yellow-300 text-yellow-100 font-bold";
      case "comfortable":
        return "bg-emerald-950/80 border-emerald-400 text-emerald-100 font-bold";
      default:
        return "bg-sky-900/60 border-sky-300 text-sky-100";
    }
  };

  const getGradientStyle = (cat: string) => {
    switch (cat) {
      case "severe_stress":
        return "from-rose-700 via-purple-900 to-indigo-950";
      case "muggy":
        return "from-amber-600 via-orange-600 to-rose-900";
      case "sticky":
        return "from-yellow-600 via-amber-600 to-teal-800";
      case "comfortable":
        return "from-teal-600 via-emerald-600 to-sky-800";
      default:
        return "from-sky-500 via-blue-600 to-indigo-700";
    }
  };

  // Helper for model name display
  const getModelLabel = (m: PsychrometricModel) => {
    switch (m) {
      case "alduchov_eskridge":
        return "Alduchov & Eskridge (1996)";
      case "magnus_tetens":
        return "Magnus-Tetens (1930/1967)";
      case "buck":
        return "Buck (1996)";
      case "sonntag":
        return "Sonntag (1990)";
    }
  };

  // 1. Copy Solved Result
  const handleCopyResult = () => {
    if (!result.isValid) return;
    let resText = "";
    if (targetVar === "dew_point") {
      resText = `${result.dewPointF}°F (${result.dewPointC}°C)`;
    } else if (targetVar === "relative_humidity") {
      resText = `${result.relativeHumidity}% RH`;
    } else {
      resText = `${result.airTempF}°F (${result.airTempC}°C)`;
    }
    navigator.clipboard.writeText(resText);
    setCopiedResult(true);
    setTimeout(() => setCopiedResult(false), 2000);
  };

  // 2. Copy Full Psychrometric Summary
  const handleCopySummary = () => {
    if (!result.isValid) return;
    let text = `Dew Point Calculator Summary\n`;
    text += `----------------------------------------\n`;
    text += `Solve Target: ${targetVar === "dew_point" ? "Dew Point" : targetVar === "relative_humidity" ? "Relative Humidity" : "Air Temperature"}\n`;
    text += `Air Temperature: ${result.airTempF}°F (${result.airTempC}°C, ${result.airTempK} K)\n`;
    text += `Relative Humidity: ${result.relativeHumidity}%\n`;
    text += `Dew Point: ${result.dewPointF}°F (${result.dewPointC}°C, ${result.dewPointK} K)\n`;
    text += `Wet-Bulb Temperature: ${result.wetBulbF}°F (${result.wetBulbC}°C)\n`;
    text += `Frost Point: ${result.frostPointF}°F (${result.frostPointC}°C)\n`;
    text += `Absolute Humidity: ${result.absoluteHumidityGM3} g/m³ (${result.absoluteHumidityGrainsFt3} gr/ft³)\n`;
    text += `Actual Vapor Pressure: ${result.actualVaporPressureHpa} hPa (${result.actualVaporPressureInHg} inHg)\n`;
    text += `Saturation Vapor Pressure: ${result.saturationVaporPressureHpa} hPa\n`;
    text += `Aviation Cloud Base: ${result.cloudBaseFt.toLocaleString()} ft (${result.cloudBaseM.toLocaleString()} m)\n`;
    text += `Psychrometric Model: ${getModelLabel(model)}\n`;
    text += `Surface Substrate Temperature: ${surfaceTemp}°${unit}\n`;
    text += `Dew Point Margin: ${result.paintingRisk.marginF}°F (${result.paintingRisk.marginC}°C)\n`;
    text += `Coating Condensation Screening (5°F Margin): ${result.paintingRisk.statusText} - ${result.paintingRisk.recommendation}\n`;
    text += `Screening Disclaimer: This calculator uses a 5°F (approx. 2.8°C) surface-to-dew-point margin as a conservative screening benchmark for condensation risk. It is not a declaration of ISO 8502-4 compliance or a substitute for manufacturer application requirements.\n`;
    text += `Wet-Bulb Note: Estimated via Stull (2011) empirical approximation for standard sea-level pressure.\n`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // 3. Save State
  const handleSaveState = () => {
    const state: SavedState = {
      targetVar,
      unit,
      airTemp,
      rh,
      dewPointInput,
      model,
      surfaceTemp,
    };
    try {
      localStorage.setItem("dp_calc_saved_state", JSON.stringify(state));
      setHasSavedState(true);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    } catch {
      // ignore
    }
  };

  // 4. Restore State
  const handleRestoreState = () => {
    try {
      const savedStr = localStorage.getItem("dp_calc_saved_state");
      if (savedStr) {
        const state: SavedState = JSON.parse(savedStr);
        setTargetVar(state.targetVar);
        setUnit(state.unit);
        setAirTemp(state.airTemp);
        setRh(state.rh);
        setDewPointInput(state.dewPointInput);
        setModel(state.model);
        setSurfaceTemp(state.surfaceTemp);
        setRestoreSuccess(true);
        setTimeout(() => setRestoreSuccess(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  // 5. Reset to Golden Default
  const handleReset = () => {
    setTargetVar("dew_point");
    setUnit("F");
    setAirTemp(70);
    setRh(65);
    setDewPointInput(57.7);
    setModel("alduchov_eskridge");
    setSurfaceTemp(75);
  };

  // 6. CSV Export (RFC-4180 safe)
  const handleExportCSV = () => {
    const escapeCsv = (val: any) => {
      const str = String(val ?? "");
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const headers = [
      "Solve Target",
      "Air Temperature",
      "Temperature Unit",
      "Relative Humidity",
      "Dew Point",
      "Wet Bulb",
      "Frost Point",
      "Absolute Humidity",
      "Vapor Pressure",
      "Cloud Base",
      "Model",
      "Surface Temperature",
      "Dew Point Margin",
      "Comfort",
      "Coating Condensation Screening (5°F Benchmark)",
    ];

    const values = [
      targetVar === "dew_point" ? "Dew Point (Td)" : targetVar === "relative_humidity" ? "Relative Humidity (RH%)" : "Air Temp (T)",
      `${unit === "F" ? result.airTempF : unit === "C" ? result.airTempC : result.airTempK}`,
      `°${unit}`,
      `${result.relativeHumidity}%`,
      `${unit === "F" ? result.dewPointF : unit === "C" ? result.dewPointC : result.dewPointK}°${unit}`,
      `${unit === "F" ? result.wetBulbF : result.wetBulbC}°${unit === "K" ? "C" : unit}`,
      `${unit === "F" ? result.frostPointF : result.frostPointC}°${unit === "K" ? "C" : unit}`,
      `${result.absoluteHumidityGM3} g/m³`,
      `${result.actualVaporPressureHpa} hPa`,
      `${result.cloudBaseFt} ft`,
      getModelLabel(model),
      `${surfaceTemp}°${unit}`,
      `${result.paintingRisk.marginF}°F`,
      result.comfortTitle,
      result.paintingRisk.statusText,
    ];

    const csvContent = `${headers.map(escapeCsv).join(",")}\n${values.map(escapeCsv).join(",")}\n`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "dew-point-calculation.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 7. TXT Export
  const handleExportTXT = () => {
    let report = `==================================================================\n`;
    report += `               CALCPLATFORM DEW POINT CALCULATION REPORT          \n`;
    report += `==================================================================\n\n`;
    report += `Generated: ${new Date().toLocaleString()}\n`;
    report += `Solve Target: ${targetVar.toUpperCase()}\n`;
    report += `Calculation Model: ${getModelLabel(model)} (Empirical improved Magnus approximation)\n\n`;
    report += `PRIMARY INPUTS & RESULTS:\n`;
    report += `  - Air Temperature:          ${result.airTempF}°F / ${result.airTempC}°C / ${result.airTempK} K\n`;
    report += `  - Relative Humidity:        ${result.relativeHumidity}%\n`;
    report += `  - Calculated Dew Point:     ${result.dewPointF}°F / ${result.dewPointC}°C / ${result.dewPointK} K\n`;
    report += `  - Wet-Bulb Temperature:     ${result.wetBulbF}°F / ${result.wetBulbC}°C (Stull 2011 approximation)\n`;
    report += `  - Frost Point:              ${result.frostPointF}°F / ${result.frostPointC}°C\n\n`;
    report += `ATMOSPHERIC & PSYCHROMETRIC METRICS:\n`;
    report += `  - Absolute Humidity:        ${result.absoluteHumidityGM3} g/m³ (${result.absoluteHumidityGrainsFt3} grains/ft³)\n`;
    report += `  - Actual Vapor Pressure:    ${result.actualVaporPressureHpa} hPa (${result.actualVaporPressureInHg} inHg)\n`;
    report += `  - Saturation Vapor Press:   ${result.saturationVaporPressureHpa} hPa\n`;
    report += `  - Estimated Cloud Base:     ${result.cloudBaseFt.toLocaleString()} ft (${result.cloudBaseM.toLocaleString()} m)\n\n`;
    report += `HUMAN COMFORT (MUGGY INDEX):\n`;
    report += `  - Category:                 ${result.comfortTitle}\n`;
    report += `  - Description:              ${result.comfortDescription}\n\n`;
    report += `COATING CONDENSATION SCREENING (5°F BENCHMARK):\n`;
    report += `  - Surface Temperature:      ${surfaceTemp}°${unit}\n`;
    report += `  - Substrate Margin:         ${result.paintingRisk.marginF}°F (${result.paintingRisk.marginC}°C)\n`;
    report += `  - Screening Status:         ${result.paintingRisk.statusText}\n`;
    report += `  - Recommendation:           ${result.paintingRisk.recommendation}\n`;
    report += `  - Disclaimer:               This calculator uses a 5°F (approx. 2.8°C) surface-to-dew-point margin as a conservative screening benchmark for condensation risk. It is not a declaration of ISO 8502-4 compliance or a substitute for the coating manufacturer's application requirements or site-specific assessment.\n\n`;
    report += `==================================================================\n`;

    const blob = new Blob([report], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "dew-point-report.txt");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 8. LaTeX Export
  const handleExportLaTeX = () => {
    const { a, b } = getModelConstants(model);
    const latex = `\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{siunitx}

\\title{Psychrometric Dew Point Calculation Report}
\\author{CalcPlatform Precision Calculation Engine}
\\date{\\today}

\\begin{document}
\\maketitle

\\section{Input Parameters}
\\begin{itemize}
  \\item Ambient Air Temperature ($T$): $T = \\SI{${result.airTempC}}{\\celsius} = \\SI{${result.airTempF}}{\\degree F}$
  \\item Relative Humidity ($RH$): $RH = \\SI{${result.relativeHumidity}}{\\percent}$
  \\item Psychrometric Model: ${getModelLabel(model)} (empirical improved Magnus formulation with $a = ${a}$, $b = \\SI{${b}}{\\celsius}$)
\\end{itemize}

\\section{Governing Mathematical Formulations}
The intermediate Magnus psychrometric factor $\\gamma(T, RH)$ is formulated as:
\\begin{equation}
  \\gamma(T, RH) = \\ln\\left(\\frac{RH}{100}\\right) + \\frac{a \\cdot T}{b + T}
\\end{equation}

The dew point temperature $T_d$ is obtained by algebraic inversion:
\\begin{equation}
  T_d = \\frac{b \\cdot \\gamma(T, RH)}{a - \\gamma(T, RH)}
\\end{equation}

\\section{Calculated Psychrometric Outputs}
\\begin{itemize}
  \\item \\textbf{Dew Point Temperature ($T_d$):} $\\SI{${result.dewPointC}}{\\celsius} \\approx \\SI{${result.dewPointF}}{\\degree F} = \\SI{${result.dewPointK}}{\\kelvin}$
  \\item \\textbf{Wet-Bulb Temperature ($T_w$):} $\\SI{${result.wetBulbC}}{\\celsius} \\approx \\SI{${result.wetBulbF}}{\\degree F}$ (Stull 2011 empirical sea-level approximation)
  \\item \\textbf{Actual Vapor Pressure ($e$):} $\\SI{${result.actualVaporPressureHpa}}{\\hecto\\pascal}$
  \\item \\textbf{Absolute Humidity ($AH$):} $\\SI{${result.absoluteHumidityGM3}}{\\gram\\per\\cubic\\meter}$
  \\item \\textbf{Aviation Cumulus Cloud Base:} $\\SI{${result.cloudBaseFt}}{\\foot}$
\\end{itemize}

\\section{Coating Condensation Screening (5°F Surface Benchmark)}
\\begin{equation}
  \\Delta T = T_{\\text{substrate}} - T_d = \\SI{${result.paintingRisk.marginF}}{\\degree F}
\\end{equation}
\\textbf{Screening Status:} ${result.paintingRisk.statusText}.
\\begin{quote}
  \\textit{Disclaimer: This calculation uses a \\SI{5}{\\degree F} (approx. \\SI{2.8}{\\celsius}) surface-to-dew-point margin as a conservative screening benchmark for condensation risk. It is not a declaration of ISO 8502-4 compliance or a substitute for the coating manufacturer's application requirements or site-specific assessment.}
\\end{quote}

\\end{document}
`;

    const blob = new Blob([latex], { type: "application/x-tex;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "dew-point-calculation.tex");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Report Modal Data
  const reportData: CalculatorReportData = useMemo(() => {
    return {
      meta: {
        reportTitle: "Psychrometric & Dew Point Analysis Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Dew Point Calculator",
      },
      keyMetrics: [
        { label: "Calculated Dew Point", value: `${result.dewPointF}°F (${result.dewPointC}°C)`, highlight: true },
        { label: "Human Comfort Category", value: result.comfortTitle },
        { label: "Wet-Bulb Temperature", value: `${result.wetBulbF}°F (${result.wetBulbC}°C)` },
        { label: "Absolute Humidity", value: `${result.absoluteHumidityGM3} g/m³` },
      ],
      sections: [
        {
          title: "Psychrometric & Atmospheric Metrics",
          items: [
            { label: "Calculation Model Used", value: `${getModelLabel(model)} (Empirical Magnus Approximation)` },
            { label: "Air Temperature", value: `${result.airTempF}°F (${result.airTempC}°C, ${result.airTempK} K)` },
            { label: "Relative Humidity", value: `${result.relativeHumidity}%` },
            { label: "Wet-Bulb Temperature", value: `${result.wetBulbF}°F (${result.wetBulbC}°C) [Stull 2011 Sea-Level Approximation]` },
            { label: "Frost Point (Over Ice)", value: `${result.frostPointF}°F (${result.frostPointC}°C)` },
            { label: "Actual Vapor Pressure (e)", value: `${result.actualVaporPressureHpa} hPa (${result.actualVaporPressureInHg} inHg)` },
            { label: "Saturation Vapor Pressure (es)", value: `${result.saturationVaporPressureHpa} hPa` },
            { label: "Estimated Aviation Cloud Base", value: `${result.cloudBaseFt.toLocaleString()} Feet (${result.cloudBaseM.toLocaleString()} m)` },
          ],
        },
        {
          title: "Coating Condensation Screening & Surface Benchmark",
          items: [
            { label: "Substrate Surface Temperature", value: `${surfaceTemp}°${unit}` },
            { label: "Substrate vs Dew Point Margin", value: `${result.paintingRisk.marginF}°F (${result.paintingRisk.marginC}°C)` },
            { label: "Screening Benchmark Status", value: result.paintingRisk.statusText },
            { label: "Recommendation", value: result.paintingRisk.recommendation },
            {
              label: "Standards Qualification",
              value:
                "This calculator uses a 5°F (approx. 2.8°C) surface-to-dew-point margin as a conservative screening benchmark for condensation risk. It is not a declaration of ISO 8502-4 compliance or a substitute for the coating manufacturer's application requirements or site-specific assessment.",
            },
          ],
        },
      ],
      table: {
        title: "Dew Point Reference Matrix (°F)",
        headers: [
          { key: "temp", label: "Air Temp (°F)" },
          { key: "rh40", label: "40% RH" },
          { key: "rh60", label: "60% RH" },
          { key: "rh80", label: "80% RH" },
        ],
        rows: [
          { temp: "60°F", rh40: "36°F", rh60: "46°F", rh80: "54°F" },
          { temp: "70°F", rh40: "45°F", rh60: "55°F", rh80: "64°F" },
          { temp: "80°F", rh40: "54°F", rh60: "65°F", rh80: "73°F" },
          { temp: "90°F", rh40: "62°F", rh60: "74°F", rh80: "83°F" },
        ],
      },
    };
  }, [result, model, surfaceTemp, unit]);

  // Matrix Values
  const matrixTempsF = [60, 70, 80, 90, 100];
  const matrixRHs = [30, 40, 50, 60, 70, 80, 90];

  return (
    <div className="space-y-6">
      {/* 1. TOP TOOLBAR BAR: Solve Target & Actions */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 sm:p-4 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Solve Target Selector */}
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300">
          <span className="text-zinc-400 uppercase tracking-wider text-[11px]">Solve Target:</span>
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-xs font-bold" role="tablist">
            <button
              id="dp-target-dew-point"
              role="tab"
              aria-selected={targetVar === "dew_point"}
              onClick={() => setTargetVar("dew_point")}
              className={`px-3 py-1.5 rounded-md cursor-pointer transition-all ${
                targetVar === "dew_point"
                  ? "bg-white dark:bg-zinc-900 text-sky-600 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              Dew Point (Td)
            </button>
            <button
              id="dp-target-humidity"
              role="tab"
              aria-selected={targetVar === "relative_humidity"}
              onClick={() => setTargetVar("relative_humidity")}
              className={`px-3 py-1.5 rounded-md cursor-pointer transition-all ${
                targetVar === "relative_humidity"
                  ? "bg-white dark:bg-zinc-900 text-sky-600 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              Humidity (RH%)
            </button>
            <button
              id="dp-target-air-temp"
              role="tab"
              aria-selected={targetVar === "air_temp"}
              onClick={() => setTargetVar("air_temp")}
              className={`px-3 py-1.5 rounded-md cursor-pointer transition-all ${
                targetVar === "air_temp"
                  ? "bg-white dark:bg-zinc-900 text-sky-600 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              Air Temp (T)
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            id="dp-btn-copy-result"
            onClick={handleCopyResult}
            disabled={!result.isValid}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
            title="Copy calculated primary value to clipboard"
            aria-label="Copy Result"
          >
            {copiedResult ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedResult ? "Copied" : "Copy Result"}</span>
          </button>

          <button
            id="dp-btn-copy-summary"
            onClick={handleCopySummary}
            disabled={!result.isValid}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
            title="Copy detailed calculation briefing"
            aria-label="Copy Summary"
          >
            {copiedSummary ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{copiedSummary ? "Copied" : "Copy Summary"}</span>
          </button>

          <button
            id="dp-btn-save"
            onClick={handleSaveState}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold flex items-center gap-1 cursor-pointer"
            title="Save current calculation parameters"
            aria-label="Save State"
          >
            {savedSuccess ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Bookmark className="h-3.5 w-3.5" />}
            <span>{savedSuccess ? "Saved" : "Save"}</span>
          </button>

          {hasSavedState && (
            <button
              id="dp-btn-restore"
              onClick={handleRestoreState}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold flex items-center gap-1 cursor-pointer"
              title="Restore saved calculation"
              aria-label="Restore State"
            >
              {restoreSuccess ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <RotateCcw className="h-3.5 w-3.5" />}
              <span>{restoreSuccess ? "Restored" : "Restore"}</span>
            </button>
          )}

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-700 mx-0.5" />

          {/* Export dropdown / buttons */}
          <button
            id="dp-btn-export-csv"
            onClick={handleExportCSV}
            disabled={!result.isValid}
            className="px-2 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold flex items-center gap-1 cursor-pointer disabled:opacity-40"
            title="Export CSV"
            aria-label="Export CSV"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" />
            <span className="hidden sm:inline">CSV</span>
          </button>

          <button
            id="dp-btn-export-txt"
            onClick={handleExportTXT}
            disabled={!result.isValid}
            className="px-2 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold flex items-center gap-1 cursor-pointer disabled:opacity-40"
            title="Export Text Report"
            aria-label="Export TXT"
          >
            <FileText className="h-3.5 w-3.5 text-blue-600" />
            <span className="hidden sm:inline">TXT</span>
          </button>

          <button
            id="dp-btn-export-latex"
            onClick={handleExportLaTeX}
            disabled={!result.isValid}
            className="px-2 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold flex items-center gap-1 cursor-pointer disabled:opacity-40"
            title="Export LaTeX formulas"
            aria-label="Export LaTeX"
          >
            <Code className="h-3.5 w-3.5 text-purple-600" />
            <span className="hidden sm:inline">LaTeX</span>
          </button>

          <button
            id="dp-btn-pdf-report"
            onClick={() => setShowReportModal(true)}
            disabled={!result.isValid}
            className="px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold flex items-center gap-1 cursor-pointer disabled:opacity-40 shadow-xs"
            title="Generate full PDF psychrometric report"
            aria-label="Report Preview"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Report</span>
          </button>

          <button
            id="dp-btn-reset"
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 cursor-pointer"
            title="Reset to 70°F / 65% RH golden baseline"
            aria-label="Reset Calculator"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 2. SPLIT PANE INTERFACE: Inputs & Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT INPUT PANE (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Thermometer className="h-4 w-4 text-sky-600" /> Input Parameters
            </h3>

            {/* Temperature Unit Toggle */}
            <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-xs font-bold" role="group" aria-label="Temperature Unit">
              <button
                id="dp-unit-f"
                onClick={() => setUnit("F")}
                className={`px-2.5 py-1 rounded-md cursor-pointer transition-all ${
                  unit === "F" ? "bg-white dark:bg-zinc-900 text-sky-600 shadow-xs" : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                °F
              </button>
              <button
                id="dp-unit-c"
                onClick={() => setUnit("C")}
                className={`px-2.5 py-1 rounded-md cursor-pointer transition-all ${
                  unit === "C" ? "bg-white dark:bg-zinc-900 text-sky-600 shadow-xs" : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                °C
              </button>
              <button
                id="dp-unit-k"
                onClick={() => setUnit("K")}
                className={`px-2.5 py-1 rounded-md cursor-pointer transition-all ${
                  unit === "K" ? "bg-white dark:bg-zinc-900 text-sky-600 shadow-xs" : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                K
              </button>
            </div>
          </div>

          {/* Validation Notice Banner (role="alert") */}
          {!result.isValid && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-2.5 animate-fadeIn"
            >
              <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">{result.errorMessage}</p>
                <p className="text-[11px] opacity-80 mt-0.5">
                  Adjust inputs to physically realistic atmospheric ranges. Under normal meteorology, dew point cannot exceed ambient air temperature.
                </p>
              </div>
            </div>
          )}

          {/* Air Temperature Field */}
          <div className={`space-y-2 ${targetVar === "air_temp" ? "opacity-50 pointer-events-none" : ""}`}>
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="dp-air-temp-input" className="font-bold text-zinc-700 dark:text-zinc-300">
                Air Temperature ({unit})
              </label>
              <span className="font-sans tabular-nums font-bold text-sky-600">
                {airTemp}°{unit}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Input
                id="dp-air-temp-input"
                type="number"
                value={Number.isNaN(airTemp) ? "" : airTemp}
                onChange={(e) => setAirTemp(e.target.value === "" ? NaN : Number(e.target.value))}
                className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200 w-28"
              />
              <input
                id="dp-air-temp-slider"
                type="range"
                aria-label="Air Temperature Slider"
                min={unit === "F" ? -20 : unit === "C" ? -30 : 243}
                max={unit === "F" ? 140 : unit === "C" ? 60 : 333}
                step={0.5}
                value={Number.isNaN(airTemp) ? 70 : airTemp}
                onChange={(e) => setAirTemp(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>
          </div>

          {/* Relative Humidity Field */}
          <div className={`space-y-2 ${targetVar === "relative_humidity" ? "opacity-50 pointer-events-none" : ""}`}>
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="dp-rh-input" className="font-bold text-zinc-700 dark:text-zinc-300">
                Relative Humidity (%)
              </label>
              <span className="font-sans tabular-nums font-bold text-sky-600">{rh}% RH</span>
            </div>
            <div className="flex items-center gap-3">
              <Input
                id="dp-rh-input"
                type="number"
                min={0}
                max={100}
                value={Number.isNaN(rh) ? "" : rh}
                onChange={(e) => setRh(e.target.value === "" ? NaN : Number(e.target.value))}
                className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200 w-28"
              />
              <input
                id="dp-rh-slider"
                type="range"
                aria-label="Relative Humidity Slider"
                min={0}
                max={100}
                step={1}
                value={Number.isNaN(rh) ? 65 : rh}
                onChange={(e) => setRh(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>
          </div>

          {/* Known Dew Point Field (Only active if targetVar === 'relative_humidity' or 'air_temp') */}
          {targetVar !== "dew_point" && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="dp-known-dew-input" className="font-bold text-zinc-700 dark:text-zinc-300">
                  Known Dew Point Temperature ({unit})
                </label>
                <span className="font-sans tabular-nums font-bold text-sky-600">{dewPointInput}°{unit}</span>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  id="dp-known-dew-input"
                  type="number"
                  value={Number.isNaN(dewPointInput) ? "" : dewPointInput}
                  onChange={(e) => setDewPointInput(e.target.value === "" ? NaN : Number(e.target.value))}
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200 w-28"
                />
                <input
                  id="dp-known-dew-slider"
                  type="range"
                  aria-label="Known Dew Point Slider"
                  min={unit === "F" ? -40 : unit === "C" ? -40 : 233}
                  max={unit === "F" ? 120 : unit === "C" ? 50 : 323}
                  step={0.5}
                  value={Number.isNaN(dewPointInput) ? 57.7 : dewPointInput}
                  onChange={(e) => setDewPointInput(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
              </div>
            </div>
          )}

          {/* EXPANDABLE ADVANCED ACCORDION */}
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
            <button
              id="dp-toggle-advanced"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-sky-600 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" /> Advanced Parameters (Model, Surface Substrate Temp)
              </span>
              {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showAdvanced && (
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl space-y-3 text-xs border border-zinc-200 dark:border-zinc-700/60">
                <div className="space-y-1">
                  <label htmlFor="dp-model-select" className="font-bold text-zinc-700 dark:text-zinc-300 block">
                    Psychrometric Calculation Model
                  </label>
                  <select
                    id="dp-model-select"
                    value={model}
                    onChange={(e) => setModel(e.target.value as PsychrometricModel)}
                    className="w-full h-9 font-bold px-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer text-xs"
                  >
                    <option value="alduchov_eskridge">Alduchov & Eskridge (1996 High Precision ±0.01°C)</option>
                    <option value="magnus_tetens">Magnus-Tetens (1930/1967 Standard)</option>
                    <option value="buck">Buck (1996 Pressure Enhanced)</option>
                    <option value="sonntag">Sonntag (1990 European Standard)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="dp-surface-temp-input" className="font-bold text-zinc-700 dark:text-zinc-300 block">
                    Surface Substrate Temperature ({unit}) — Coating Condensation Screening
                  </label>
                  <Input
                    id="dp-surface-temp-input"
                    type="number"
                    value={Number.isNaN(surfaceTemp) ? "" : surfaceTemp}
                    onChange={(e) => setSurfaceTemp(e.target.value === "" ? NaN : Number(e.target.value))}
                    className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900 border-zinc-200"
                  />
                  <span className="text-[10px] text-zinc-500 block">
                    Substrate surface temperature evaluated against the conservative 5°F (approx. 2.8°C) screening benchmark for condensation risk.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DASHBOARD (Col 5) */}
        <div
          aria-live="polite"
          className={`lg:col-span-5 bg-gradient-to-br ${
            result.isValid ? getGradientStyle(result.comfortCategory) : "from-zinc-700 to-zinc-900"
          } text-white p-6 rounded-2xl shadow-md space-y-6 transition-colors duration-300`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-100 flex items-center gap-1.5">
                <Droplets className="h-4 w-4 fill-sky-200" /> Solved Metric
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                {model === "alduchov_eskridge" ? "Alduchov-Eskridge (Empirical)" : model === "magnus_tetens" ? "Magnus-Tetens" : model === "buck" ? "Buck (1996)" : "Sonntag (1990)"}
              </span>
            </div>

            {/* Primary Solved Reading */}
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-200 block">
                {targetVar === "dew_point"
                  ? "Calculated Dew Point"
                  : targetVar === "relative_humidity"
                  ? "Calculated Relative Humidity"
                  : "Calculated Air Temp"}
              </span>
              <div className="text-5xl sm:text-6xl font-black font-sans tabular-nums tracking-tight text-white">
                {!result.isValid
                  ? "—"
                  : targetVar === "dew_point"
                  ? `${unit === "F" ? result.dewPointF : unit === "C" ? result.dewPointC : result.dewPointK}°${unit}`
                  : targetVar === "relative_humidity"
                  ? `${result.relativeHumidity}%`
                  : `${unit === "F" ? result.airTempF : unit === "C" ? result.airTempC : result.airTempK}°${unit}`}
              </div>
              <p className="text-xs text-sky-100 font-medium">
                Air Temp: {result.airTempF}°F ({result.airTempC}°C) | RH: {result.relativeHumidity}%
              </p>
            </div>

            {/* Comfort Category Badge */}
            {result.isValid && (
              <div className={`p-4 rounded-xl border backdrop-blur-xs space-y-1 text-xs ${getComfortBadgeStyle(result.comfortCategory)}`}>
                <span className="text-[10px] font-bold uppercase tracking-wider block opacity-90">
                  Muggy Index Comfort Rating
                </span>
                <div className="font-extrabold text-sm">{result.comfortTitle}</div>
                <p className="text-[11px] font-medium opacity-90">{result.comfortDescription}</p>
              </div>
            )}

            {/* Side-by-side Mini Cards */}
            {result.isValid && (
              <div className="space-y-1.5">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div
                    className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/20"
                    title="Wet-bulb temperature is estimated using the Stull (2011) empirical approximation, developed for standard sea-level pressure. Not an exact psychrometric instrument measurement."
                  >
                    <span className="text-[10px] uppercase font-bold text-sky-200 block">Wet-Bulb (Tw)*</span>
                    <span className="font-sans tabular-nums font-bold text-sm text-white">
                      {result.wetBulbF}°F ({result.wetBulbC}°C)
                    </span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/20">
                    <span className="text-[10px] uppercase font-bold text-sky-200 block">Absolute Humidity</span>
                    <span className="font-sans tabular-nums font-bold text-sm text-white">
                      {result.absoluteHumidityGM3} g/m³
                    </span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/20">
                    <span className="text-[10px] uppercase font-bold text-sky-200 block">Actual Vapor Press</span>
                    <span className="font-sans tabular-nums font-bold text-sm text-white">
                      {result.actualVaporPressureHpa} hPa
                    </span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/20">
                    <span className="text-[10px] uppercase font-bold text-sky-200 block">Cloud Base</span>
                    <span className="font-sans tabular-nums font-bold text-sm text-white">
                      {result.cloudBaseFt.toLocaleString()} ft
                    </span>
                  </div>
                </div>
                <span className="text-[9.5px] opacity-70 block">
                  *Wet-bulb estimated via Stull (2011) empirical sea-level approximation (-20°C to 50°C, 5%–99% RH).
                </span>
              </div>
            )}

            {/* Coating Condensation Screening Card */}
            {result.isValid && (
              <div
                className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                  result.paintingRisk.isSafeToPaint
                    ? "bg-emerald-950/60 border-emerald-400/50 text-emerald-100"
                    : "bg-rose-950/60 border-rose-400/50 text-rose-100 font-bold"
                }`}
              >
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide">
                  <Paintbrush className="h-3.5 w-3.5" /> Coating Condensation Screening (5°F Benchmark)
                </div>
                <div className="font-sans tabular-nums text-xs">
                  {result.paintingRisk.statusText} (Margin: {result.paintingRisk.marginF}°F / {result.paintingRisk.marginC}°C)
                </div>
                <p className="text-[10.5px] opacity-90 font-medium leading-relaxed">
                  {result.paintingRisk.recommendation}
                </p>
                <span className="text-[9px] opacity-75 block leading-normal">
                  *This calculator uses a 5°F (approximately 2.8°C) surface-to-dew-point margin as a conservative screening benchmark for condensation risk. It is not a declaration of ISO 8502-4 compliance or a substitute for the coating manufacturer&apos;s application requirements or site-specific assessment.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE PSYCHROMETRIC HEAT-MAP GRID */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        <button
          id="dp-toggle-chart"
          onClick={() => setShowChart(!showChart)}
          className="w-full p-4 flex items-center justify-between font-bold text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Sliders className="h-4 w-4 text-sky-600" /> Interactive Dew Point Heat-Map Grid (°{unit})
          </span>
          {showChart ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showChart && (
          <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 overflow-x-auto text-xs">
            <table
              className="w-full text-center border-collapse font-sans tabular-nums text-[11px]"
              aria-label="Dew Point Matrix by Relative Humidity and Temperature"
            >
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                  <th scope="col" className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-sans">
                    Relative Humidity \ Temp
                  </th>
                  {matrixTempsF.map((tF) => {
                    const displayColTemp =
                      unit === "F"
                        ? `${tF}°F`
                        : unit === "C"
                        ? `${Math.round(((tF - 32) * 5) / 9)}°C`
                        : `${Math.round(((tF - 32) * 5) / 9 + 273.15)} K`;
                    return (
                      <th key={tF} scope="col" className="p-2.5 border border-zinc-200 dark:border-zinc-700">
                        {displayColTemp}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {matrixRHs.map((rhVal) => (
                  <tr key={rhVal}>
                    <th
                      scope="row"
                      className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans font-bold bg-zinc-50 dark:bg-zinc-800/50 text-left"
                    >
                      {rhVal}% RH
                    </th>
                    {matrixTempsF.map((tF) => {
                      const tC = ((tF - 32) * 5) / 9;
                      const gamma = Math.log(rhVal / 100) + (17.625 * tC) / (243.04 + tC);
                      const dewC = (243.04 * gamma) / (17.625 - gamma);
                      const dewF = Math.round(dewC * (9 / 5) + 32);

                      let displayVal = `${dewF}°F`;
                      if (unit === "C") {
                        displayVal = `${Math.round(dewC)}°C`;
                      } else if (unit === "K") {
                        displayVal = `${Math.round(dewC + 273.15)} K`;
                      }

                      // Active cell detection based on air temp and RH
                      const isUserCell =
                        result.isValid &&
                        Math.abs(result.airTempF - tF) <= 4.9 &&
                        Math.abs(result.relativeHumidity - rhVal) <= 5.0;

                      let bgClass = "bg-sky-50 dark:bg-sky-950/20 text-sky-900 dark:text-sky-200";
                      if (dewF >= 70) bgClass = "bg-rose-200 dark:bg-rose-950 text-rose-950 dark:text-rose-200 font-bold";
                      else if (dewF >= 65) bgClass = "bg-amber-200 dark:bg-amber-950 text-amber-950 dark:text-amber-200 font-bold";
                      else if (dewF >= 60) bgClass = "bg-yellow-100 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-200";

                      return (
                        <td
                          key={tF}
                          className={`p-2.5 border border-zinc-200 dark:border-zinc-800 transition-all ${bgClass} ${
                            isUserCell ? "ring-2 ring-sky-500 font-black text-xs scale-105 shadow-xs" : ""
                          }`}
                        >
                          {displayVal}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* REPORT MODAL */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={reportData}
      />
    </div>
  );
}
