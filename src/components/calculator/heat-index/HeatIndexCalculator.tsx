"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Sun,
  Thermometer,
  Droplets,
  AlertTriangle,
  ShieldAlert,
  Flame,
  Check,
  Copy,
  FileSpreadsheet,
  FileText,
  Code,
  Share2,
  Printer,
  Download,
  Sliders,
  ChevronUp,
  ChevronDown,
  Info,
  Clock,
  RotateCcw,
  Save,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TempUnit,
  HumidityInputMode,
  HeatIndexResult,
} from "@/app/calculators/heat-index-calculator/types";
import {
  calculateHeatIndex,
  calculateNwsHeatIndexF,
  calculateRothfuszHeatIndexF,
  convertTempToF,
  convertTempToC,
} from "@/app/calculators/heat-index-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function HeatIndexCalculator() {
  // Inputs State
  const [temp, setTemp] = useState<number>(85);
  const [tempUnit, setTempUnit] = useState<TempUnit>("F");
  const [humidityMode, setHumidityMode] = useState<HumidityInputMode>("rh");
  const [rhValue, setRhValue] = useState<number>(70);
  const [dewPointValue, setDewPointValue] = useState<number>(74);

  // Toggles
  const [isDirectSun, setIsDirectSun] = useState<boolean>(false);
  const [showHeatStress, setShowHeatStress] = useState<boolean>(false);

  // UI State
  const [showChart, setShowChart] = useState<boolean>(true);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [hasSavedState, setHasSavedState] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user_heat_index_saved_state");
      if (saved) setHasSavedState(true);
    }
  }, []);

  const triggerFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 2500);
  };

  // Compute Results
  const result: HeatIndexResult = useMemo(() => {
    return calculateHeatIndex(
      temp,
      tempUnit,
      humidityMode,
      rhValue,
      dewPointValue,
      isDirectSun
    );
  }, [temp, tempUnit, humidityMode, rhValue, dewPointValue, isDirectSun]);

  // Color & Badge style for Alert Categories
  const getAlertBadgeStyle = (cat: string) => {
    switch (cat) {
      case "extreme_danger":
        return "bg-purple-950/80 border-purple-400 text-purple-100 animate-pulse";
      case "danger":
        return "bg-rose-950/80 border-rose-400 text-rose-100 font-bold";
      case "extreme_caution":
        return "bg-amber-950/80 border-amber-400 text-amber-100 font-bold";
      default:
        return "bg-amber-900/60 border-amber-300 text-yellow-100";
    }
  };

  const getGradientStyle = (cat: string) => {
    switch (cat) {
      case "extreme_danger":
        return "from-rose-600 via-purple-700 to-purple-950";
      case "danger":
        return "from-amber-600 via-rose-600 to-rose-900";
      case "extreme_caution":
        return "from-amber-500 via-orange-600 to-rose-700";
      default:
        return "from-yellow-500 via-amber-600 to-orange-700";
    }
  };

  // Reset to Defaults
  const handleReset = () => {
    setTemp(85);
    setTempUnit("F");
    setHumidityMode("rh");
    setRhValue(70);
    setDewPointValue(74);
    setIsDirectSun(false);
    setShowHeatStress(false);
    triggerFeedback("Reset to default reference values (85°F, 70% RH, Shaded)");
  };

  // Save State
  const handleSaveState = () => {
    if (typeof window !== "undefined") {
      const state = {
        temp,
        tempUnit,
        humidityMode,
        rhValue,
        dewPointValue,
        isDirectSun,
        showHeatStress,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("user_heat_index_saved_state", JSON.stringify(state));
      setHasSavedState(true);
      triggerFeedback("Current parameters saved");
    }
  };

  // Restore State
  const handleRestoreState = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user_heat_index_saved_state");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (typeof parsed.temp === "number") setTemp(parsed.temp);
          if (parsed.tempUnit) setTempUnit(parsed.tempUnit);
          if (parsed.humidityMode) setHumidityMode(parsed.humidityMode);
          if (typeof parsed.rhValue === "number") setRhValue(parsed.rhValue);
          if (typeof parsed.dewPointValue === "number") setDewPointValue(parsed.dewPointValue);
          setIsDirectSun(Boolean(parsed.isDirectSun));
          setShowHeatStress(Boolean(parsed.showHeatStress || parsed.showWBGT));
          triggerFeedback("Heat Index state restored");
        } catch {
          triggerFeedback("Error restoring state");
        }
      }
    }
  };

  // Copy Result
  const handleCopyResult = () => {
    if (result.isInvalid) {
      triggerFeedback("Cannot copy invalid atmospheric state");
      return;
    }
    const dispVal = tempUnit === "F" ? `${result.heatIndexF}°F` : `${result.heatIndexC}°C`;
    const text = `${dispVal} (NOAA / NWS Complete Algorithm | Air: ${result.airTempF}°F | RH: ${result.relativeHumidity}% | Sun: ${result.isDirectSun ? "Direct Sun Conservative (+15°F)" : "Shaded"} | Hazard: ${result.alertTitle})`;
    navigator.clipboard.writeText(text);
    triggerFeedback("Result copied to clipboard");
  };

  // Copy Summary
  const handleCopySummary = () => {
    if (result.isInvalid) {
      triggerFeedback("Cannot copy invalid atmospheric state");
      return;
    }
    let text = `☀️ CalcPlatform Heat Hazard Safety Briefing\n`;
    text += `====================================================\n`;
    text += `Model: NOAA / NWS Complete Heat Index Algorithm\n`;
    text += `Algorithm Pathway: ${result.nwsPathway === "rothfusz_full" ? "Rothfusz 9-Term Regression with Humidity Adjustments" : "Steadman Linear Baseline"}\n`;
    text += `Ambient Air Temperature: ${result.airTempF}°F (${result.airTempC}°C)\n`;
    text += `Relative Humidity: ${result.relativeHumidity}% (Dew Point: ${result.dewPointF}°F / ${result.dewPointC}°C)\n`;
    text += `Solar Exposure: ${result.isDirectSun ? "Direct Sun Conservative Estimate (+15°F)" : "Shaded Apparent Temperature"}\n`;
    text += `----------------------------------------------------\n`;
    text += `Calculated Heat Index: ${result.heatIndexF}°F (${result.heatIndexC}°C)\n`;
    if (result.isDirectSun) {
      text += `Direct Sun Conservative Estimate (+15°F): ${result.directSunHeatIndexF}°F (${result.directSunHeatIndexC}°C)\n`;
    }
    if (showHeatStress) {
      text += `Adjusted Heat Stress Estimate: ${result.heatStressEstimateF}°F (${result.heatStressEstimateC}°C) [0.76×HI + 0.24×DewPoint moisture-weighted heuristic; not an on-site WBGT instrument reading]\n`;
    }
    text += `Hazard Classification: ${result.alertTitle}\n`;
    text += `Reference Work/Rest Benchmark: ${result.workRestPlan.workMinutes}m Work / ${result.workRestPlan.restMinutes}m Rest\n`;
    text += `Hydration Target: Approx. 1 cup (250 mL) cool water every 15–20 minutes during moderate exertion\n`;
    text += `Advisory: ${result.workRestPlan.advisory}\n`;
    text += `Notice: This is an illustrative planning benchmark and is not an official OSHA work/rest schedule. Actual occupational heat controls depend on environmental heat, workload, clothing/PPE, acclimatization and site-specific assessment.\n`;
    if (result.domainNotice) text += `Domain Notice: ${result.domainNotice}\n`;
    if (result.warningNote) text += `Warning: ${result.warningNote}\n`;
    text += `====================================================\n`;

    navigator.clipboard.writeText(text);
    triggerFeedback("Detailed safety briefing copied");
  };

  // Export CSV
  const handleExportCSV = () => {
    if (result.isInvalid) {
      triggerFeedback("Cannot export invalid atmospheric state");
      return;
    }
    const headers = [
      "Model",
      "Air Temperature (°F)",
      "Air Temperature (°C)",
      "Relative Humidity (%)",
      "Dew Point (°F)",
      "Moisture Input Mode",
      "Direct Sun Active",
      "Calculated Heat Index (°F)",
      "Calculated Heat Index (°C)",
      "Direct Sun Heat Index (°F)",
      "Adjusted Heat Stress Estimate (°F)",
      "Hazard Category",
      "Reference Work Minutes",
      "Reference Rest Minutes",
      "Hydration Cups Per Hour Target",
    ];

    const values = [
      `"NOAA / NWS Complete Heat Index Algorithm"`,
      result.airTempF,
      result.airTempC,
      result.relativeHumidity,
      result.dewPointF,
      `"${humidityMode}"`,
      result.isDirectSun ? "YES" : "NO",
      result.heatIndexF,
      result.heatIndexC,
      result.directSunHeatIndexF,
      result.heatStressEstimateF,
      `"${result.alertCategory}"`,
      result.workRestPlan.workMinutes,
      result.workRestPlan.restMinutes,
      result.workRestPlan.waterCupsPerHour,
    ];

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), values.join(",")].join("\r\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `heat_index_report_${result.heatIndexF}F.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerFeedback("CSV report downloaded");
  };

  // Export TXT
  const handleExportTXT = () => {
    if (result.isInvalid) {
      triggerFeedback("Cannot export invalid atmospheric state");
      return;
    }
    let text = `OCCUPATIONAL HEAT STRESS & HAZARD BRIEFING\n`;
    text += `Generated by CalcPlatform (calcplatform.com)\n`;
    text += `Timestamp: ${new Date().toISOString()}\n\n`;
    text += `PRIMARY METEOROLOGICAL PARAMETERS:\n`;
    text += `  Model: NOAA / NWS Complete Algorithm (${result.nwsPathway === "rothfusz_full" ? "Rothfusz Full Regression" : "Steadman Linear Baseline"})\n`;
    text += `  Ambient Temperature: ${result.airTempF}°F (${result.airTempC}°C)\n`;
    text += `  Relative Humidity: ${result.relativeHumidity}%\n`;
    text += `  Atmospheric Dew Point: ${result.dewPointF}°F (${result.dewPointC}°C)\n`;
    text += `  Solar Exposure: ${result.isDirectSun ? "Direct Sun Conservative Estimate (+15°F / +8.3°C added)" : "Shaded baseline"}\n\n`;
    text += `CALCULATED HEAT STRESS RESULTS:\n`;
    text += `  Shaded Heat Index: ${result.heatIndexF}°F (${result.heatIndexC}°C)\n`;
    if (result.isDirectSun) {
      text += `  Direct Sun Conservative Estimate (+15°F): ${result.directSunHeatIndexF}°F (${result.directSunHeatIndexC}°C)\n`;
    }
    if (showHeatStress) {
      text += `  Adjusted Heat Stress Estimate: ${result.heatStressEstimateF}°F (${result.heatStressEstimateC}°C) (Moisture-weighted index; not an on-site WBGT reading)\n`;
    }
    text += `  Hazard Alert Tier: ${result.alertTitle}\n`;
    text += `  Clinical Guidance: ${result.alertDescription}\n\n`;
    text += `REFERENCE OCCUPATIONAL WORK / REST BENCHMARK (NIOSH-INFORMED):\n`;
    text += `  Hourly Cycle: ${result.workRestPlan.workMinutes} Minutes Labor / ${result.workRestPlan.restMinutes} Minutes Rest\n`;
    text += `  Hydration Guidance: Approx. 1 cup (250 mL) cool water every 15–20 minutes during moderate exertion\n`;
    text += `  Worksite Benchmark Note: ${result.workRestPlan.advisory}\n`;
    text += `  Benchmark Notice: This is an illustrative planning benchmark and is not an official OSHA work/rest schedule. Actual occupational heat controls depend on environmental heat, workload, clothing/PPE, acclimatization and site-specific assessment.\n\n`;
    if (result.domainNotice) text += `DOMAIN NOTICE:\n  ${result.domainNotice}\n\n`;
    if (result.warningNote) text += `SAFETY WARNING:\n  ${result.warningNote}\n\n`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `heat_index_report_${result.heatIndexF}F.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerFeedback("TXT briefing downloaded");
  };

  // Copy LaTeX
  const handleCopyLaTeX = () => {
    if (result.isInvalid) {
      triggerFeedback("Cannot generate formula for invalid atmospheric state");
      return;
    }
    const latex = `\\text{HI} = -42.379 + 2.04901523 \\, T + 10.14333127 \\, R - 0.22475541 \\, TR \\\\\n` +
      `- 0.00683783 \\, T^2 - 0.05481717 \\, R^2 + 0.00122874 \\, T^2 R + 0.00085282 \\, T R^2 - 0.00000199 \\, T^2 R^2 \\\\\n` +
      `\\text{where } T = ${result.airTempF}^{\\circ}\\text{F}, \\; R = ${result.relativeHumidity}\\% \\implies \\text{HI} = ${result.heatIndexF}^{\\circ}\\text{F}`;

    navigator.clipboard.writeText(latex);
    triggerFeedback("Rothfusz LaTeX formula copied");
  };

  // Direct Print
  const handleDirectPrint = () => {
    window.print();
  };

  // Report Modal Data
  const reportData: CalculatorReportData = useMemo(() => {
    return {
      meta: {
        reportTitle: "Occupational Heat Hazard Safety Briefing",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Heat Index Calculator",
      },
      keyMetrics: [
        { label: "Calculated Heat Index", value: result.isInvalid ? "Invalid Input" : `${result.heatIndexF}°F (${result.heatIndexC}°C)`, highlight: true },
        { label: "Heat Hazard Level", value: result.alertTitle },
        { label: "Ambient Air Temperature", value: `${result.airTempF}°F (${result.airTempC}°C)` },
        { label: "Relative Humidity / Dew Point", value: result.isInvalid ? "Invalid (Dew Point > Air Temp)" : `${result.relativeHumidity}% RH (Dew Point ${result.dewPointF}°F)` },
      ],
      sections: [
        {
          title: "Heat Stress Analysis Details",
          items: [
            { label: "NWS Algorithm Pathway", value: result.nwsPathway === "rothfusz_full" ? "Rothfusz Full Regression with Humidity Adjustments" : "Steadman Linear Baseline" },
            { label: "Solar Exposure Adjustment", value: result.isDirectSun ? "Direct Sun Conservative Estimate (+15°F / +8.3°C added)" : "Shaded Conditions" },
            { label: "Adjusted Heat Stress Estimate", value: result.isInvalid ? "—" : `${result.heatStressEstimateF}°F (${result.heatStressEstimateC}°C) [Moisture-weighted index]` },
            { label: "Hazard Category Description", value: result.alertDescription },
          ],
        },
        {
          title: "Reference Work / Rest Benchmark (NIOSH-Informed)",
          items: [
            { label: "Work / Rest Cycle", value: `${result.workRestPlan.workMinutes} Minutes Work / ${result.workRestPlan.restMinutes} Minutes Rest` },
            { label: "Hydration Intake Guidance", value: `Approx. 1 cup (250 mL) cool water every 15–20 minutes during moderate exertion` },
            { label: "Safety Advisory", value: result.workRestPlan.advisory },
            { label: "Benchmark Disclaimer", value: "This is an illustrative planning benchmark and is not an official OSHA work/rest schedule. Actual occupational heat controls depend on environmental heat, workload, clothing/PPE, acclimatization and site-specific assessment." },
          ],
        },
      ],
      table: {
        title: "NOAA Heat Index Safety Reference Matrix (°F)",
        headers: [
          { key: "rh", label: "Relative Humidity" },
          { key: "t80", label: "80°F Air" },
          { key: "t85", label: "85°F Air" },
          { key: "t90", label: "90°F Air" },
          { key: "t95", label: "95°F Air" },
          { key: "t100", label: "100°F Air" },
        ],
        rows: [
          { rh: "40% RH", t80: "80°F", t85: "84°F", t90: "91°F", t95: "99°F", t100: "109°F" },
          { rh: "50% RH", t80: "81°F", t85: "87°F", t90: "95°F", t95: "105°F", t100: "118°F" },
          { rh: "60% RH", t80: "82°F", t85: "89°F", t90: "100°F", t95: "113°F", t100: "130°F" },
          { rh: "70% RH", t80: "83°F", t85: "93°F", t90: "106°F", t95: "123°F", t100: "143°F" },
          { rh: "80% RH", t80: "84°F", t85: "97°F", t90: "113°F", t95: "134°F", t100: "158°F" },
          { rh: "90% RH", t80: "86°F", t85: "102°F", t90: "122°F", t95: "147°F", t100: "176°F" },
        ],
      },
    };
  }, [result]);

  // Matrix Grid Axes
  const matrixTemps = [80, 85, 90, 95, 100];
  const matrixRHs = [40, 50, 60, 70, 80, 90];

  return (
    <div className="space-y-6">
      {/* 1. TOP TOOLBAR BAR */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <label
            htmlFor="direct-sun-checkbox"
            className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-900"
            title="NWS notes that direct sunlight can increase Heat Index by up to 15°F (+8.3°C). This calculator uses +15°F as a conservative maximum-load estimate; it is not a universal NWS correction for every sunny environment."
          >
            <input
              id="direct-sun-checkbox"
              type="checkbox"
              checked={isDirectSun}
              onChange={(e) => setIsDirectSun(e.target.checked)}
              className="rounded text-amber-600 accent-amber-600 cursor-pointer"
            />
            <Sun className="h-3.5 w-3.5 fill-amber-500" /> Direct Sun Conservative Estimate (+15°F / +8.3°C)
          </label>

          <label
            htmlFor="heat-stress-checkbox"
            className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-slate-800 dark:text-slate-200"
            title="Moisture-weighted heat stress index (0.76 × HI + 0.24 × Dew Point). Note: This is an empirical ambient estimate, not an on-site WBGT instrument measurement."
          >
            <input
              id="heat-stress-checkbox"
              type="checkbox"
              checked={showHeatStress}
              onChange={(e) => setShowHeatStress(e.target.checked)}
              className="rounded text-amber-600 accent-amber-600 cursor-pointer"
            />
            Show Heat Stress Estimate
          </label>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1 cursor-pointer"
            title="Reset to default reference values (85°F, 70% RH, Shaded)"
          >
            <RotateCcw className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" /> Reset
          </button>
          <button
            type="button"
            onClick={handleSaveState}
            className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1 cursor-pointer"
            title="Save parameters to localStorage"
          >
            <Save className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" /> Save
          </button>
          <button
            type="button"
            onClick={handleRestoreState}
            disabled={!hasSavedState}
            className={`px-2.5 py-1.5 rounded-lg border font-semibold flex items-center gap-1 ${
              hasSavedState
                ? "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer"
                : "border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-50"
            }`}
            title="Restore saved parameters"
          >
            <FolderOpen className="h-3.5 w-3.5" /> Restore
          </button>
          <button
            type="button"
            onClick={handleCopyResult}
            className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1 cursor-pointer"
            title="Copy heat index result"
          >
            <Copy className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" /> Copy Result
          </button>
          <button
            type="button"
            onClick={handleCopySummary}
            className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1 cursor-pointer"
            title="Copy safety summary"
          >
            <Share2 className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" /> Summary
          </button>
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1 cursor-pointer"
            title="Export CSV data"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" /> CSV
          </button>
          <button
            type="button"
            onClick={handleExportTXT}
            className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1 cursor-pointer"
            title="Export text report"
          >
            <FileText className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" /> TXT
          </button>
          <button
            type="button"
            onClick={handleCopyLaTeX}
            className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1 cursor-pointer"
            title="Copy Rothfusz LaTeX formula"
          >
            <Code className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" /> LaTeX
          </button>
          <button
            type="button"
            onClick={() => setShowReportModal(true)}
            className="px-2.5 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-700 dark:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
            title="Generate printable PDF report"
          >
            <Download className="h-3.5 w-3.5 text-amber-600" /> PDF
          </button>
          <button
            type="button"
            onClick={handleDirectPrint}
            className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1 cursor-pointer"
            title="Print page"
          >
            <Printer className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" /> Print
          </button>
        </div>
      </div>

      {/* Dynamic Feedback Toast */}
      {feedbackMsg && (
        <div
          role="status"
          aria-live="polite"
          className="bg-amber-600 text-white text-xs font-semibold px-4 py-2 rounded-xl text-center shadow-md"
        >
          ✓ {feedbackMsg}
        </div>
      )}

      {/* Domain Notice Banner if applicable */}
      {result.domainNotice && (
        <div
          role="alert"
          className="p-3.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-800/60 rounded-xl text-blue-900 dark:text-blue-200 text-xs flex items-start gap-2"
        >
          <Info className="h-4 w-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
          <span>{result.domainNotice}</span>
        </div>
      )}

      {/* Warning Notice Banner if applicable */}
      {result.warningNote && (
        <div
          role="alert"
          className="p-3.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-800/60 rounded-xl text-rose-900 dark:text-rose-200 text-xs flex items-start gap-2"
        >
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
          <span>{result.warningNote}</span>
        </div>
      )}

      {/* 2. SPLIT PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT INPUT PANE (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-5">
          {/* Temperature Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="air-temp-input"
                className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5"
              >
                <Thermometer className="h-4 w-4 text-amber-600" /> Air Temperature
              </label>

              {/* Unit Toggle */}
              <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-xs font-bold" role="group" aria-label="Temperature unit">
                <button
                  type="button"
                  onClick={() => setTempUnit("F")}
                  className={`px-2.5 py-1 rounded-md cursor-pointer ${
                    tempUnit === "F" ? "bg-white dark:bg-zinc-900 text-amber-600 shadow-xs" : "text-zinc-500"
                  }`}
                  aria-pressed={tempUnit === "F"}
                >
                  °F
                </button>
                <button
                  type="button"
                  onClick={() => setTempUnit("C")}
                  className={`px-2.5 py-1 rounded-md cursor-pointer ${
                    tempUnit === "C" ? "bg-white dark:bg-zinc-900 text-amber-600 shadow-xs" : "text-zinc-500"
                  }`}
                  aria-pressed={tempUnit === "C"}
                >
                  °C
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Input
                id="air-temp-input"
                type="number"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200 w-28"
                aria-label="Air Temperature numerical value"
              />
              <input
                id="air-temp-slider"
                type="range"
                min={tempUnit === "F" ? 70 : 20}
                max={tempUnit === "F" ? 120 : 50}
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                aria-label="Air Temperature slider"
              />
            </div>
          </div>

          {/* Moisture Input: Dual Mode Toggle */}
          <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Droplets className="h-4 w-4 text-blue-600" /> Moisture Input Method
              </span>

              <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-xs font-bold" role="group" aria-label="Moisture mode">
                <button
                  type="button"
                  onClick={() => setHumidityMode("rh")}
                  className={`px-3 py-1 rounded-md cursor-pointer ${
                    humidityMode === "rh" ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-xs" : "text-zinc-500"
                  }`}
                  aria-pressed={humidityMode === "rh"}
                >
                  Relative Humidity (%)
                </button>
                <button
                  type="button"
                  onClick={() => setHumidityMode("dewpoint")}
                  className={`px-3 py-1 rounded-md cursor-pointer ${
                    humidityMode === "dewpoint" ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-xs" : "text-zinc-500"
                  }`}
                  aria-pressed={humidityMode === "dewpoint"}
                >
                  Dew Point (°{tempUnit})
                </button>
              </div>
            </div>

            {humidityMode === "rh" ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="rh-input-slider" className="font-bold text-zinc-700 dark:text-zinc-300">
                    Relative Humidity
                  </label>
                  <span className="font-sans tabular-nums font-bold text-blue-600">{rhValue}% RH</span>
                </div>
                <input
                  id="rh-input-slider"
                  type="range"
                  min={10}
                  max={100}
                  value={rhValue}
                  onChange={(e) => setRhValue(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  aria-label="Relative Humidity slider"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="dewpoint-input" className="font-bold text-zinc-700 dark:text-zinc-300">
                    Dew Point Temperature
                  </label>
                  <span className="font-sans tabular-nums font-bold text-blue-600">{dewPointValue}°{tempUnit}</span>
                </div>
                <Input
                  id="dewpoint-input"
                  type="number"
                  value={dewPointValue}
                  onChange={(e) => setDewPointValue(Number(e.target.value))}
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                  aria-label="Dew Point Temperature numerical value"
                />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DASHBOARD (Col 5) */}
        <div
          aria-live="polite"
          className={`lg:col-span-5 bg-gradient-to-br ${getGradientStyle(result.alertCategory)} text-white p-6 rounded-2xl shadow-md space-y-6`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-100 flex items-center gap-1.5">
                <Flame className="h-4 w-4 fill-amber-400" /> Heat Hazard Analysis
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                NWS Complete Algorithm
              </span>
            </div>

            {/* Primary Heat Index Reading */}
            <div className="space-y-1">
              <div className="text-6xl font-black font-sans tabular-nums tracking-tight text-white">
                {result.isInvalid ? "—" : (tempUnit === "F" ? `${result.heatIndexF}°F` : `${result.heatIndexC}°C`)}
              </div>
              <p className="text-xs text-amber-100 font-medium">
                {result.isInvalid
                  ? (result.warningNote || "Dew point cannot exceed air temperature for this atmospheric input.")
                  : `Shaded Apparent Temperature (${result.relativeHumidity}% RH | Dew Point ${result.dewPointF}°F)`}
              </p>
            </div>

            {/* Direct Sun Additional Line */}
            {result.isDirectSun && (
              <div className="p-3 bg-amber-500/30 rounded-xl border border-amber-300/40 text-xs font-bold text-amber-100 space-y-0.5">
                <span>Direct Sun Conservative Estimate (+15°F):</span>
                <div className="text-2xl font-black font-sans tabular-nums text-white">
                  {result.isInvalid ? "—" : (tempUnit === "F" ? `${result.directSunHeatIndexF}°F` : `${result.directSunHeatIndexC}°C`)}
                </div>
                <p className="text-[10px] text-amber-200/90 font-normal">
                  NWS notes that direct sunlight can increase Heat Index by up to approximately 15°F. This calculator uses +15°F as a conservative maximum-load estimate; it is not a universal fixed NWS correction for every sunny environment.
                </p>
              </div>
            )}

            {/* Adjusted Heat Stress Estimate Line if enabled */}
            {showHeatStress && (
              <div className="p-3 bg-blue-500/30 rounded-xl border border-blue-300/40 text-xs font-bold text-blue-100 space-y-0.5">
                <span>Adjusted Heat Stress Estimate (Moisture-Weighted):</span>
                <div className="text-2xl font-black font-sans tabular-nums text-white">
                  {result.isInvalid ? "—" : (tempUnit === "F" ? `${result.heatStressEstimateF}°F` : `${result.heatStressEstimateC}°C`)}
                </div>
                <p className="text-[10px] text-blue-200 font-normal">
                  Empirical moisture-weighted index (0.76 × HI + 0.24 × Dew Point). Note: This is an ambient heuristic estimate, not an on-site calibrated WBGT measurement.
                </p>
              </div>
            )}

            {/* Alert Category Badge */}
            <div className={`p-4 rounded-xl border backdrop-blur-xs space-y-1 text-xs ${getAlertBadgeStyle(result.alertCategory)}`}>
              <span className="text-[10px] font-bold uppercase tracking-wider block opacity-90">
                Heat Hazard Classification
              </span>
              <div className="font-extrabold text-sm flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" /> {result.alertTitle}
              </div>
              <p className="text-[11px] font-medium opacity-90">{result.alertDescription}</p>
            </div>

            {/* Reference Work/Rest Plan */}
            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/20 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold uppercase text-amber-200 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> Reference Work / Rest Benchmark
              </span>
              <div className="font-sans tabular-nums font-bold text-sm text-white">
                {result.isInvalid ? "—" : `${result.workRestPlan.workMinutes}m Work / ${result.workRestPlan.restMinutes}m Rest`}
              </div>
              <p className="text-[11px] text-amber-100">{result.workRestPlan.advisory}</p>
              <p className="text-[10px] text-amber-200/80 italic pt-1 border-t border-white/10">
                This is an illustrative planning benchmark and is not an official OSHA work/rest schedule. Actual occupational heat controls depend on environmental heat, workload, clothing/PPE, acclimatization and site-specific assessment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE HEAT SAFETY MATRIX TABLE (FIXED HI-MATRIX-001) */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => setShowChart(!showChart)}
          className="w-full p-4 flex items-center justify-between font-bold text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer"
          aria-expanded={showChart}
        >
          <span className="flex items-center gap-1.5">
            <Sliders className="h-4 w-4 text-amber-600" /> NOAA Heat Index Reference Matrix Grid (°F)
          </span>
          {showChart ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showChart && (
          <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 overflow-x-auto text-xs">
            <table className="w-full text-center border-collapse font-sans tabular-nums text-[11px]">
              <caption className="sr-only">Official NWS Heat Index Grid (°F) by Relative Humidity and Air Temperature</caption>
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                  <th scope="col" className="p-2 border border-zinc-200 dark:border-zinc-700 font-sans">
                    Relative Humidity \ Temp
                  </th>
                  {matrixTemps.map((t) => (
                    <th scope="col" key={t} className="p-2 border border-zinc-200 dark:border-zinc-700">
                      {t}°F
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {matrixRHs.map((rh) => (
                  <tr key={rh}>
                    <th scope="row" className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold bg-zinc-50 dark:bg-zinc-800/50 text-center">
                      {rh}% RH
                    </th>
                    {matrixTemps.map((t) => {
                      // Accurate NWS complete calculation across all matrix coordinates
                      const hi = Math.round(calculateNwsHeatIndexF(t, rh).heatIndexF);
                      const isUserCell = Math.abs(result.airTempF - t) <= 2 && Math.abs(result.relativeHumidity - rh) <= 5;
                      let bgClass = "bg-amber-50 text-amber-900 dark:bg-amber-950/20 dark:text-amber-200";
                      if (hi >= 125) bgClass = "bg-purple-200 dark:bg-purple-950 text-purple-950 dark:text-purple-200 font-bold";
                      else if (hi >= 104) bgClass = "bg-rose-200 dark:bg-rose-950 text-rose-900 dark:text-rose-200 font-bold";
                      else if (hi >= 91) bgClass = "bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-100";

                      return (
                        <td
                          key={t}
                          aria-current={isUserCell ? "true" : undefined}
                          className={`p-2 border border-zinc-200 dark:border-zinc-800 ${bgClass} ${
                            isUserCell ? "ring-2 ring-amber-500 font-black text-xs scale-105" : ""
                          }`}
                        >
                          {hi}°F
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
