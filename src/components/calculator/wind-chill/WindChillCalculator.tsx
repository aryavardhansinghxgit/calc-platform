"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Wind,
  Thermometer,
  ShieldAlert,
  Shirt,
  Flame,
  Activity,
  Sliders,
  Check,
  Copy,
  FileText,
  FileSpreadsheet,
  Code,
  Share2,
  Printer,
  Download,
  Info,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  RotateCcw,
  Save,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TempUnit,
  SpeedUnit,
  WeatherModel,
  ActivityMode,
  WindChillResult,
} from "@/app/calculators/wind-chill-calculator/types";
import {
  calculateWindChill,
  convertTempToF,
  convertTempToC,
} from "@/app/calculators/wind-chill-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function WindChillCalculator() {
  // Inputs State
  const [temp, setTemp] = useState<number>(10);
  const [tempUnit, setTempUnit] = useState<TempUnit>("F");
  const [windSpeed, setWindSpeed] = useState<number>(20);
  const [speedUnit, setSpeedUnit] = useState<SpeedUnit>("mph");
  const [humidity, setHumidity] = useState<number>(50);
  const [model, setModel] = useState<WeatherModel>("jag_ti");
  const [activity, setActivity] = useState<ActivityMode>("stationary");

  // Vulnerability Risk Toggles
  const [isWetClothing, setIsWetClothing] = useState<boolean>(false);
  const [isVulnerableGroup, setIsVulnerableGroup] = useState<boolean>(false);

  // UI State
  const [showChart, setShowChart] = useState<boolean>(true);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [hasSavedState, setHasSavedState] = useState<boolean>(false);

  // Check saved state on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user_wind_chill_saved_state");
      if (saved) setHasSavedState(true);
    }
  }, []);

  const triggerFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 2500);
  };

  // Compute Results
  const result: WindChillResult = useMemo(() => {
    return calculateWindChill(
      temp,
      tempUnit,
      windSpeed,
      speedUnit,
      humidity,
      model,
      activity,
      isWetClothing,
      isVulnerableGroup
    );
  }, [temp, tempUnit, windSpeed, speedUnit, humidity, model, activity, isWetClothing, isVulnerableGroup]);

  // Gradient background style based on wind chill temp
  const getGradientStyle = (wcF: number) => {
    if (wcF > 30) return "from-sky-500 via-blue-600 to-indigo-700";
    if (wcF > 15) return "from-blue-600 via-indigo-600 to-cyan-700";
    if (wcF > 0) return "from-indigo-600 via-sky-700 to-blue-800";
    if (wcF > -20) return "from-sky-700 via-indigo-800 to-purple-900";
    return "from-purple-900 via-indigo-950 to-slate-950";
  };

  // Reset to reference default state
  const handleReset = () => {
    setTemp(10);
    setTempUnit("F");
    setWindSpeed(20);
    setSpeedUnit("mph");
    setHumidity(50);
    setModel("jag_ti");
    setActivity("stationary");
    setIsWetClothing(false);
    setIsVulnerableGroup(false);
    triggerFeedback("Reset to default reference values");
  };

  // Save State
  const handleSaveState = () => {
    if (typeof window !== "undefined") {
      const stateToSave = {
        temp,
        tempUnit,
        windSpeed,
        speedUnit,
        humidity,
        model,
        activity,
        isWetClothing,
        isVulnerableGroup,
      };
      localStorage.setItem("user_wind_chill_saved_state", JSON.stringify(stateToSave));
      setHasSavedState(true);
      triggerFeedback("State saved successfully");
    }
  };

  // Restore State
  const handleRestoreState = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user_wind_chill_saved_state");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (typeof parsed.temp === "number") setTemp(parsed.temp);
          if (parsed.tempUnit) setTempUnit(parsed.tempUnit);
          if (typeof parsed.windSpeed === "number") setWindSpeed(parsed.windSpeed);
          if (parsed.speedUnit) setSpeedUnit(parsed.speedUnit);
          if (typeof parsed.humidity === "number") setHumidity(parsed.humidity);
          if (parsed.model) setModel(parsed.model);
          if (parsed.activity) setActivity(parsed.activity);
          setIsWetClothing(Boolean(parsed.isWetClothing));
          setIsVulnerableGroup(Boolean(parsed.isVulnerableGroup));
          triggerFeedback("State restored successfully");
        } catch {
          triggerFeedback("Error restoring saved state");
        }
      }
    }
  };

  // Copy Result
  const handleCopyResult = () => {
    const modelName = model === "jag_ti" ? "NWS / NOAA JAG/TI" : model === "steadman" ? "Australian Steadman AT" : "Siple-Passel";
    const text = `${tempUnit === "F" ? `${result.windChillF}°F` : `${result.windChillC}°C`} (${modelName} | Air: ${result.airTempF}°F | Wind: ${result.effectiveWindSpeedMph} mph | Risk: ${result.frostbiteMinutesText})`;
    navigator.clipboard.writeText(text);
    triggerFeedback("Result copied to clipboard");
  };

  // Copy Detailed Summary
  const handleCopySummary = () => {
    const modelName = model === "jag_ti" ? "NWS / NOAA JAG/TI (US/Canada Standard)" : model === "steadman" ? "Australian Steadman Apparent Temp" : "Pre-2001 Siple-Passel Antarctic Model";
    let text = `❄️ CalcPlatform Wind Chill & Cold Safety Briefing\n`;
    text += `====================================================\n`;
    text += `Engine Model: ${modelName}\n`;
    text += `Ambient Air Temperature: ${result.airTempF}°F (${result.airTempC}°C)\n`;
    text += `Base Wind Speed: ${result.windSpeedMph} mph (${speedUnit})\n`;
    text += `Activity Headwind: ${activity.toUpperCase()} (+${result.effectiveWindSpeedMph - result.windSpeedMph} mph)\n`;
    text += `Effective Airflow: ${result.effectiveWindSpeedMph} mph\n`;
    if (model === "steadman") text += `Relative Humidity: ${humidity}%\n`;
    text += `Modifiers: Wet Clothing: ${isWetClothing ? "ON (-15°F)" : "OFF"} | Vulnerable Group: ${isVulnerableGroup ? "ON (-10°F)" : "OFF"}\n`;
    text += `----------------------------------------------------\n`;
    text += `Calculated Wind Chill: ${tempUnit === "F" ? `${result.windChillF}°F` : `${result.windChillC}°C`}\n`;
    text += `Steadman Apparent Temperature: ${result.apparentTempF}°F (${result.apparentTempC}°C)\n`;
    text += `Frostbite Hazard: ${result.frostbiteMinutesText}\n`;
    text += `Recommended Outer Shell: ${result.clothing.outerShell}\n`;
    text += `Recommended Head/Hand Gear: ${result.clothing.headHandGear}\n`;
    if (result.domainNotice) text += `Notice: ${result.domainNotice}\n`;
    if (result.warningNote) text += `Warning: ${result.warningNote}\n`;
    text += `====================================================\n`;

    navigator.clipboard.writeText(text);
    triggerFeedback("Detailed summary copied");
  };

  // Export CSV (RFC-4180 compliant)
  const handleExportCSV = () => {
    const modelName = model === "jag_ti" ? "NWS / NOAA JAG/TI" : model === "steadman" ? "Australian Steadman AT" : "Siple-Passel";
    const headers = [
      "Model",
      "Air Temperature (°F)",
      "Air Temperature (°C)",
      "Base Wind Speed",
      "Speed Unit",
      "Effective Wind Speed (mph)",
      "Activity",
      "Relative Humidity (%)",
      "Wet Clothing Active",
      "Vulnerable Group Active",
      "Calculated Wind Chill (°F)",
      "Calculated Wind Chill (°C)",
      "Apparent Temperature (°F)",
      "Frostbite Risk Level",
      "Frostbite Exposure Countdown",
      "Outer Shell Recommendation",
    ];

    const values = [
      `"${modelName}"`,
      result.airTempF,
      result.airTempC,
      result.windSpeedMph,
      `"${speedUnit}"`,
      result.effectiveWindSpeedMph,
      `"${activity}"`,
      humidity,
      isWetClothing ? "YES" : "NO",
      isVulnerableGroup ? "YES" : "NO",
      result.windChillF,
      result.windChillC,
      result.apparentTempF,
      `"${result.frostbiteRisk}"`,
      `"${result.frostbiteMinutesText.replace(/"/g, '""')}"`,
      `"${result.clothing.outerShell.replace(/"/g, '""')}"`,
    ];

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), values.join(",")].join("\r\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `wind_chill_report_${result.windChillF}F.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerFeedback("CSV report downloaded");
  };

  // Export TXT
  const handleExportTXT = () => {
    const modelName = model === "jag_ti" ? "NWS / NOAA JAG/TI (US/Canada Standard)" : model === "steadman" ? "Australian Steadman Apparent Temp" : "Pre-2001 Siple-Passel Antarctic Model";
    let text = `WIND CHILL & COLD EXPOSURE HAZARD REPORT\n`;
    text += `Generated by CalcPlatform (calcplatform.com)\n`;
    text += `Timestamp: ${new Date().toISOString()}\n\n`;
    text += `ENGINE MODEL: ${modelName}\n`;
    text += `----------------------------------------------------\n`;
    text += `INPUT PARAMETERS:\n`;
    text += `  Ambient Air Temperature: ${result.airTempF}°F (${result.airTempC}°C)\n`;
    text += `  Wind Velocity: ${result.windSpeedMph} ${speedUnit} (Effective: ${result.effectiveWindSpeedMph} mph)\n`;
    text += `  Activity Mode: ${activity}\n`;
    if (model === "steadman") text += `  Relative Humidity: ${humidity}%\n`;
    text += `  Wet Clothing Modifier: ${isWetClothing ? "ACTIVE (+25x conductive heat loss)" : "INACTIVE"}\n`;
    text += `  Vulnerable Population: ${isVulnerableGroup ? "ACTIVE (reduced thermoregulation)" : "INACTIVE"}\n\n`;
    text += `CALCULATED RESULTS:\n`;
    text += `  Calculated Wind Chill: ${result.windChillF}°F (${result.windChillC}°C)\n`;
    text += `  Steadman Apparent Temperature: ${result.apparentTempF}°F (${result.apparentTempC}°C)\n`;
    text += `  Frostbite Hazard Countdown: ${result.frostbiteMinutesText}\n\n`;
    text += `PPE & COLD WEATHER RECOMMENDATIONS:\n`;
    text += `  Base Layer: ${result.clothing.baseLayer}\n`;
    text += `  Mid Layer: ${result.clothing.midLayer}\n`;
    text += `  Outer Shell: ${result.clothing.outerShell}\n`;
    text += `  Head/Hands: ${result.clothing.headHandGear}\n`;
    text += `  Footwear: ${result.clothing.footwear}\n\n`;
    if (result.domainNotice) text += `DOMAIN NOTICE:\n  ${result.domainNotice}\n\n`;
    if (result.warningNote) text += `SAFETY WARNING:\n  ${result.warningNote}\n\n`;
    text += `SCIENTIFIC FACT:\n`;
    text += `  Wind chill increases convective heat loss toward ambient air temperature,\n`;
    text += `  but inanimate objects (pipes, car radiators) will never cool below ${result.airTempF}°F.\n`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `wind_chill_report_${result.windChillF}F.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerFeedback("TXT report downloaded");
  };

  // Copy LaTeX
  const handleCopyLaTeX = () => {
    let latex = "";
    if (model === "jag_ti") {
      latex = `\\text{WCT}(^{\\circ}\\text{F}) = 35.74 + 0.6215 \\, T - 35.75 \\, V^{0.16} + 0.4275 \\, T \\, V^{0.16} \\\\\n` +
        `\\text{where } T = ${result.airTempF}^{\\circ}\\text{F}, \\; V = ${result.effectiveWindSpeedMph}\\,\\text{mph} \\implies \\text{WCT} = ${result.windChillF}^{\\circ}\\text{F}`;
    } else if (model === "steadman") {
      latex = `\\text{AT}(^{\\circ}\\text{C}) = T_a + 0.33 \\, e - 0.70 \\, v - 4.00 \\\\\n` +
        `e = \\frac{\\text{RH}}{100} \\times 6.105 \\times \\exp\\left(\\frac{17.27 T_a}{237.7 + T_a}\\right) \\\\\n` +
        `\\text{where } T_a = ${result.airTempC}^{\\circ}\\text{C}, \\; v = ${(result.effectiveWindSpeedMph / 2.23693629).toFixed(2)}\\,\\text{m/s}, \\; \\text{RH} = ${humidity}\\% \\implies \\text{AT} = ${result.windChillC}^{\\circ}\\text{C} \\; (${result.windChillF}^{\\circ}\\text{F})`;
    } else {
      latex = `H = (10.45 + 10\\sqrt{v} - v)(33 - T_c), \\quad \\text{WCT} = 33 - \\frac{H}{22} \\\\\n` +
        `\\text{where } T_c = ${result.airTempC}^{\\circ}\\text{C}, \\; v = ${(result.effectiveWindSpeedMph / 2.23693629).toFixed(2)}\\,\\text{m/s} \\implies \\text{WCT} = ${result.windChillC}^{\\circ}\\text{C} \\; (${result.windChillF}^{\\circ}\\text{F})`;
    }

    navigator.clipboard.writeText(latex);
    triggerFeedback("LaTeX equation copied");
  };

  // Direct Print
  const handleDirectPrint = () => {
    window.print();
  };

  // Report Modal Data for PDF
  const reportData: CalculatorReportData = useMemo(() => {
    const modelLabel = model === "jag_ti" ? "NWS / NOAA JAG/TI (US/Canada Standard)" : model === "steadman" ? "Australian Steadman Apparent Temp Model" : "Pre-2001 Siple-Passel Antarctic Model";
    return {
      meta: {
        reportTitle: "Wind Chill & Winter Cold Hazard Safety Briefing",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Wind Chill Calculator",
      },
      keyMetrics: [
        { label: "Calculated Wind Chill", value: `${result.windChillF}°F (${result.windChillC}°C)`, highlight: true },
        { label: "Frostbite Hazard Countdown", value: result.frostbiteMinutesText },
        { label: "Ambient Air Temperature", value: `${result.airTempF}°F (${result.airTempC}°C)` },
        { label: "Effective Relative Wind", value: `${result.effectiveWindSpeedMph} mph` },
      ],
      sections: [
        {
          title: "Cold Exposure Hazard Evaluation",
          items: [
            { label: "Selected Weather Engine Model", value: modelLabel },
            { label: "Activity Compensation", value: activity.toUpperCase() },
            { label: "Steadman Apparent Temperature", value: `${result.apparentTempF}°F (${result.apparentTempC}°C)` },
            { label: "Vulnerability Adjustments", value: result.warningNote || "Standard Baseline Exposure (Dry Clothing)" },
          ],
        },
        {
          title: "Recommended Winter PPE & Layering System",
          items: [
            { label: "Base Wicking Layer", value: result.clothing.baseLayer },
            { label: "Mid Insulation Layer", value: result.clothing.midLayer },
            { label: "Windproof Outer Shell", value: result.clothing.outerShell },
            { label: "Head & Hand Protection", value: result.clothing.headHandGear },
            { label: "Footwear & Socks", value: result.clothing.footwear },
          ],
        },
        {
          title: "Biophysical Physics Guarantee",
          items: [
            { label: "Inanimate Object Rule", value: `Wind chill accelerates heat loss rate toward ambient air temperature, but will NEVER cool objects below ${result.airTempF}°F.` },
            { label: "Above Freezing Tissue Rule", value: `Frostbite cannot physically occur when actual air temperature is above 32°F (0°C).` },
          ],
        },
      ],
      table: {
        title: "Official NWS JAG/TI Wind Chill Temperature Reference Matrix (°F)",
        headers: [
          { key: "speed", label: "Wind Speed (mph)" },
          { key: "t20", label: "20°F Air" },
          { key: "t10", label: "10°F Air" },
          { key: "t0", label: "0°F Air" },
          { key: "tneg10", label: "-10°F Air" },
          { key: "tneg20", label: "-20°F Air" },
        ],
        rows: [
          { speed: "10 mph", t20: "9°F", t10: "-4°F", t0: "-16°F", tneg10: "-28°F", tneg20: "-41°F" },
          { speed: "20 mph", t20: "4°F", t10: "-9°F", t0: "-22°F", tneg10: "-35°F", tneg20: "-48°F" },
          { speed: "30 mph", t20: "1°F", t10: "-12°F", t0: "-26°F", tneg10: "-39°F", tneg20: "-53°F" },
          { speed: "40 mph", t20: "-1°F", t10: "-15°F", t0: "-29°F", tneg10: "-43°F", tneg20: "-57°F" },
          { speed: "50 mph", t20: "-3°F", t10: "-17°F", t0: "-31°F", tneg10: "-45°F", tneg20: "-60°F" },
        ],
      },
    };
  }, [result, model, activity, isWetClothing, isVulnerableGroup, humidity, speedUnit]);

  // Matrix Temperatures & Wind Speeds for Visual Heat Map
  const matrixTemps = [20, 10, 0, -10, -20];
  const matrixSpeeds = [10, 20, 30, 40, 50];

  return (
    <div className="space-y-6">
      {/* 1. TOP TOOLBAR BAR & MODEL SELECTOR */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="engine-model-select" className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
            Engine Model:
          </label>
          <select
            id="engine-model-select"
            value={model}
            onChange={(e) => setModel(e.target.value as WeatherModel)}
            className="h-8 text-xs font-bold px-2.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer"
          >
            <option value="jag_ti">NWS / NOAA JAG/TI (US/Canada Standard)</option>
            <option value="steadman">Australian Steadman Apparent Temp (RH %)</option>
            <option value="siple_passel">Pre-2001 Siple-Passel Antarctic Model</option>
          </select>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={handleReset}
            className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1 cursor-pointer"
            title="Reset to default reference values (10°F, 20 mph, NWS JAG/TI)"
          >
            <RotateCcw className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" /> Reset
          </button>
          <button
            onClick={handleSaveState}
            className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1 cursor-pointer"
            title="Save current parameters to local storage"
          >
            <Save className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" /> Save
          </button>
          <button
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
            onClick={handleCopyResult}
            className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1 cursor-pointer"
            title="Copy primary result"
          >
            <Copy className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" /> Copy Result
          </button>
          <button
            onClick={handleCopySummary}
            className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1 cursor-pointer"
            title="Copy full hazard summary"
          >
            <Share2 className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" /> Summary
          </button>
          <button
            onClick={handleExportCSV}
            className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1 cursor-pointer"
            title="Export CSV data"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" /> CSV
          </button>
          <button
            onClick={handleExportTXT}
            className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1 cursor-pointer"
            title="Export structured text briefing"
          >
            <FileText className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" /> TXT
          </button>
          <button
            onClick={handleCopyLaTeX}
            className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1 cursor-pointer"
            title="Copy model LaTeX formula"
          >
            <Code className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" /> LaTeX
          </button>
          <button
            onClick={() => setShowReportModal(true)}
            className="px-2.5 py-1.5 rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 text-sky-700 dark:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer"
            title="Generate printable PDF report"
          >
            <Download className="h-3.5 w-3.5 text-sky-600" /> PDF
          </button>
          <button
            onClick={handleDirectPrint}
            className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1 cursor-pointer"
            title="Print this page"
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
          className="bg-sky-600 text-white text-xs font-semibold px-4 py-2 rounded-xl text-center shadow-md animate-fade-in"
        >
          ✓ {feedbackMsg}
        </div>
      )}

      {/* Domain Notice Banner if applicable */}
      {result.domainNotice && (
        <div
          role="alert"
          className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 rounded-xl text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2"
        >
          <Info className="h-4 w-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
          <span>{result.domainNotice}</span>
        </div>
      )}

      {/* 2. SPLIT PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT INPUT PANE (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-5">
          {/* Air Temperature Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="ambient-temp-input"
                className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5"
              >
                <Thermometer className="h-4 w-4 text-sky-600" /> Ambient Air Temperature
              </label>

              {/* Unit Toggle */}
              <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-xs font-bold" role="group" aria-label="Temperature Unit">
                <button
                  type="button"
                  onClick={() => setTempUnit("F")}
                  className={`px-2.5 py-1 rounded-md cursor-pointer ${
                    tempUnit === "F" ? "bg-white dark:bg-zinc-900 text-sky-600 shadow-xs" : "text-zinc-500"
                  }`}
                  aria-pressed={tempUnit === "F"}
                >
                  °F
                </button>
                <button
                  type="button"
                  onClick={() => setTempUnit("C")}
                  className={`px-2.5 py-1 rounded-md cursor-pointer ${
                    tempUnit === "C" ? "bg-white dark:bg-zinc-900 text-sky-600 shadow-xs" : "text-zinc-500"
                  }`}
                  aria-pressed={tempUnit === "C"}
                >
                  °C
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Input
                id="ambient-temp-input"
                type="number"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200 w-28"
                aria-label="Ambient Air Temperature value"
              />
              <input
                id="ambient-temp-slider"
                type="range"
                min={tempUnit === "F" ? -50 : -45}
                max={tempUnit === "F" ? 50 : 10}
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
                aria-label="Ambient Air Temperature slider"
              />
            </div>

            {/* Temperature Quick Preset Chips */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="text-[11px] text-zinc-400 font-medium">Presets:</span>
              {[32, 0, -20, -40].map((presetF) => {
                const val = tempUnit === "F" ? presetF : Math.round(convertTempToC(presetF, "F"));
                return (
                  <button
                    key={presetF}
                    type="button"
                    onClick={() => setTemp(val)}
                    className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-zinc-700 dark:text-zinc-300 font-sans tabular-nums text-[11px] font-bold cursor-pointer border border-zinc-200/60 dark:border-zinc-700"
                  >
                    {val}°{tempUnit}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wind Speed Section */}
          <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <label
                htmlFor="wind-speed-input"
                className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5"
              >
                <Wind className="h-4 w-4 text-sky-600" /> Wind Speed
              </label>

              <select
                id="wind-speed-unit-select"
                value={speedUnit}
                onChange={(e) => setSpeedUnit(e.target.value as SpeedUnit)}
                className="h-7 text-xs font-bold px-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer"
                aria-label="Wind speed unit"
              >
                <option value="mph">mph</option>
                <option value="kmh">km/h</option>
                <option value="ms">m/s</option>
                <option value="knots">knots</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <Input
                id="wind-speed-input"
                type="number"
                min={0}
                value={windSpeed}
                onChange={(e) => setWindSpeed(Number(e.target.value))}
                className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200 w-28"
                aria-label="Wind Speed numeric input"
              />
              <input
                id="wind-speed-slider"
                type="range"
                min={0}
                max={60}
                value={windSpeed}
                onChange={(e) => setWindSpeed(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
                aria-label="Wind Speed slider"
              />
            </div>
          </div>

          {/* Movement Compensator & Humidity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
            <div className="space-y-1.5">
              <label
                htmlFor="activity-mode-select"
                className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1"
              >
                <Activity className="h-3.5 w-3.5 text-sky-600" /> Activity Headwind Velocity
              </label>
              <select
                id="activity-mode-select"
                value={activity}
                onChange={(e) => setActivity(e.target.value as ActivityMode)}
                className="w-full h-9 font-bold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl cursor-pointer"
              >
                <option value="stationary">Stationary (+0 mph)</option>
                <option value="walking">Walking (+3 mph)</option>
                <option value="running">Running (+8 mph)</option>
                <option value="cycling">Cycling / Skiing (+20 mph)</option>
              </select>
            </div>

            {model === "steadman" && (
              <div className="space-y-1.5">
                <label htmlFor="humidity-slider" className="font-bold text-zinc-700 dark:text-zinc-300">
                  Relative Humidity ({humidity}%)
                </label>
                <input
                  id="humidity-slider"
                  type="range"
                  min={10}
                  max={100}
                  value={humidity}
                  onChange={(e) => setHumidity(Number(e.target.value))}
                  className="w-full h-2 mt-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  aria-label="Relative Humidity percentage slider"
                />
              </div>
            )}
          </div>

          {/* Hypothermia & Vulnerability Risk Toggles */}
          <div className="space-y-2 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
            <span className="font-bold text-zinc-700 dark:text-zinc-300 block">
              Vulnerability Risk Profile Options
            </span>
            <div className="flex flex-wrap items-center gap-4 text-slate-800 dark:text-slate-200 font-semibold">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  id="wet-clothing-checkbox"
                  type="checkbox"
                  checked={isWetClothing}
                  onChange={(e) => setIsWetClothing(e.target.checked)}
                  className="rounded text-sky-600 accent-sky-600 cursor-pointer"
                />
                Wet / Damp Clothing (+25x Conductive Heat Loss)
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  id="vulnerable-group-checkbox"
                  type="checkbox"
                  checked={isVulnerableGroup}
                  onChange={(e) => setIsVulnerableGroup(e.target.checked)}
                  className="rounded text-sky-600 accent-sky-600 cursor-pointer"
                />
                Child / Senior / High Altitude
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL RESULTS DASHBOARD (Col 5) */}
        <div
          aria-live="polite"
          className={`lg:col-span-5 bg-gradient-to-br ${getGradientStyle(result.windChillF)} text-white p-6 rounded-2xl shadow-md space-y-6`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-100 flex items-center gap-1.5">
                <Wind className="h-4 w-4 text-white" /> Calculated Wind Chill
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                {model === "jag_ti" ? "NWS JAG/TI" : model === "steadman" ? "Steadman AT" : "Siple-Passel"}
              </span>
            </div>

            {/* Primary Result */}
            <div className="space-y-1">
              <div className="text-6xl font-black font-sans tabular-nums tracking-tight text-white">
                {tempUnit === "F" ? `${result.windChillF}°F` : `${result.windChillC}°C`}
              </div>
              <p className="text-xs text-sky-100 font-medium">
                Actual Air Temp: {result.airTempF}°F ({result.airTempC}°C) | Wind: {result.effectiveWindSpeedMph} mph
              </p>
            </div>

            {/* Real-Time Frostbite Countdown Badge */}
            <div className={`p-4 rounded-xl border backdrop-blur-xs space-y-1 text-xs ${
              result.frostbiteRisk === "extreme"
                ? "bg-rose-950/80 border-rose-400 text-rose-100 animate-pulse"
                : result.frostbiteRisk === "danger"
                ? "bg-amber-950/80 border-amber-400 text-amber-100"
                : result.frostbiteRisk === "caution"
                ? "bg-yellow-900/60 border-yellow-300 text-yellow-100"
                : "bg-white/10 border-white/20 text-white"
            }`}>
              <span className="text-[10px] font-bold uppercase tracking-wider block opacity-90">
                Frostbite Hazard Countdown
              </span>
              <div className="font-extrabold text-sm flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" /> {result.frostbiteMinutesText}
              </div>
            </div>

            {result.warningNote && (
              <div
                role="alert"
                className="text-xs font-bold bg-rose-500/30 p-2.5 rounded-lg border border-rose-300/40 text-rose-100"
              >
                {result.warningNote}
              </div>
            )}

            {/* PPE Layering Summary */}
            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/20 space-y-1 text-xs">
              <span className="text-[10px] font-bold uppercase text-sky-200 flex items-center gap-1">
                <Shirt className="h-3.5 w-3.5" /> Recommended PPE & Layering
              </span>
              <p className="text-white font-medium text-[11px]">{result.clothing.outerShell}</p>
              <p className="text-sky-100 text-[11px]">{result.clothing.headHandGear}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE WIND CHILL HEAT-MAP CHART MATRIX */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => setShowChart(!showChart)}
          className="w-full p-4 flex items-center justify-between font-bold text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer"
          aria-expanded={showChart}
        >
          <span className="flex items-center gap-1.5">
            <Sliders className="h-4 w-4 text-sky-600" /> Interactive Wind Chill Temperature Heat-Map Matrix (°F)
          </span>
          {showChart ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showChart && (
          <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 overflow-x-auto text-xs">
            <table className="w-full text-center border-collapse font-sans tabular-nums text-[11px]">
              <caption className="sr-only">Official NWS JAG/TI Wind Chill Temperature Grid (°F) by Wind Speed and Air Temperature</caption>
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                  <th scope="col" className="p-2 border border-zinc-200 dark:border-zinc-700 font-sans">
                    Wind Speed \ Temp
                  </th>
                  {matrixTemps.map((t) => (
                    <th scope="col" key={t} className="p-2 border border-zinc-200 dark:border-zinc-700">
                      {t}°F
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {matrixSpeeds.map((s) => (
                  <tr key={s}>
                    <th scope="row" className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold bg-zinc-50 dark:bg-zinc-800/50 text-center">
                      {s} mph
                    </th>
                    {matrixTemps.map((t) => {
                      const wc = Math.round(35.74 + 0.6215 * t - 35.75 * Math.pow(s, 0.16) + 0.4275 * t * Math.pow(s, 0.16));
                      const isUserCell = Math.abs(result.airTempF - t) <= 5 && Math.abs(result.effectiveWindSpeedMph - s) <= 5;
                      let bgClass = "bg-sky-50 dark:bg-sky-950/20 text-sky-900 dark:text-sky-200";
                      if (wc <= -33) bgClass = "bg-rose-200 dark:bg-rose-950 text-rose-900 dark:text-rose-200 font-bold";
                      else if (wc <= -19) bgClass = "bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200";

                      return (
                        <td
                          key={t}
                          aria-current={isUserCell ? "true" : undefined}
                          className={`p-2 border border-zinc-200 dark:border-zinc-800 ${bgClass} ${
                            isUserCell ? "ring-2 ring-sky-500 font-black text-xs scale-105" : ""
                          }`}
                        >
                          {wc}°F
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

      {/* REPORT MODAL (PDF / PRINT PREVIEW) */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={reportData}
      />
    </div>
  );
}
