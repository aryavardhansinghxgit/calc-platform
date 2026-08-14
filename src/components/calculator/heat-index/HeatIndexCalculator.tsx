"use client";

import React, { useState, useMemo } from "react";
import {
  Sun,
  Thermometer,
  Droplets,
  AlertTriangle,
  ShieldAlert,
  Flame,
  Check,
  Share2,
  Printer,
  Sliders,
  ChevronUp,
  ChevronDown,
  Info,
  Clock,
  Sparkles,
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
  const [showWBGT, setShowWBGT] = useState<boolean>(false);

  // UI State
  const [showChart, setShowChart] = useState<boolean>(true);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

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
        return "from-purple-900 via-rose-900 to-amber-950";
      case "danger":
        return "from-rose-600 via-orange-600 to-amber-700";
      case "extreme_caution":
        return "from-amber-600 via-orange-500 to-yellow-600";
      default:
        return "from-amber-500 via-yellow-600 to-amber-700";
    }
  };

  // Copy Summary
  const handleCopySummary = () => {
    let text = `☀️ CalcPlatform Heat Safety Briefing:\n`;
    text += `Air Temp: ${result.airTempF}°F (${result.airTempC}°C) | Relative Humidity: ${result.relativeHumidity}%\n`;
    text += `Calculated Heat Index: ${result.heatIndexF}°F (${result.heatIndexC}°C)\n`;
    if (result.isDirectSun) {
      text += `Direct Sun Heat Index (+15°F Solar Load): ${result.directSunHeatIndexF}°F\n`;
    }
    text += `Hazard Alert: ${result.alertTitle}\n`;
    text += `OSHA Work/Rest Plan: ${result.oshaPlan.workMinutes}m Work / ${result.oshaPlan.restMinutes}m Rest (${result.oshaPlan.advisory})\n`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        { label: "Calculated Heat Index", value: `${result.heatIndexF}°F (${result.heatIndexC}°C)`, highlight: true },
        { label: "Heat Hazard Level", value: result.alertTitle },
        { label: "Ambient Air Temperature", value: `${result.airTempF}°F (${result.airTempC}°C)` },
        { label: "Relative Humidity / Dew Point", value: `${result.relativeHumidity}% RH (Dew Point ${result.dewPointF}°F)` },
      ],
      sections: [
        {
          title: "Heat Stress Analysis Details",
          items: [
            { label: "Solar Exposure Adjustment", value: result.isDirectSun ? "Direct Sunlight (+15°F Radiant Load Added)" : "Shaded Conditions" },
            { label: "Estimated WBGT (Wet-Bulb Globe)", value: `${result.wbgtEstimateF}°F (${result.wbgtEstimateC}°C)` },
            { label: "Hazard Category Description", value: result.alertDescription },
          ],
        },
        {
          title: "OSHA Occupational Work / Rest Protocol",
          items: [
            { label: "Work / Rest Cycle", value: `${result.oshaPlan.workMinutes} Minutes Work / ${result.oshaPlan.restMinutes} Minutes Rest` },
            { label: "Hydration Intake Target", value: `${result.oshaPlan.waterCupsPerHour} Cups (1 Liter) Water Per Hour` },
            { label: "Safety Advisory", value: result.oshaPlan.advisory },
          ],
        },
      ],
      table: {
        title: "NOAA Heat Index Safety Reference Matrix (°F)",
        headers: [
          { key: "temp", label: "Air Temp (°F)" },
          { key: "rh50", label: "50% RH" },
          { key: "rh70", label: "70% RH" },
          { key: "rh90", label: "90% RH" },
        ],
        rows: [
          { temp: "80°F", rh50: "81°F", rh70: "85°F", rh90: "90°F" },
          { temp: "85°F", rh50: "88°F", rh70: "95°F", rh90: "105°F" },
          { temp: "90°F", rh50: "96°F", rh70: "106°F", rh90: "122°F" },
          { temp: "95°F", rh50: "107°F", rh70: "124°F", rh90: "135°F+" },
        ],
      },
    };
  }, [result]);

  // Matrix Values
  const matrixTemps = [80, 85, 90, 95, 100];
  const matrixRHs = [40, 50, 60, 70, 80, 90];

  return (
    <div className="space-y-6">
      {/* 1. TOP TOOLBAR BAR */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-900">
            <input
              type="checkbox"
              checked={isDirectSun}
              onChange={(e) => setIsDirectSun(e.target.checked)}
              className="rounded text-amber-600 accent-amber-600 cursor-pointer"
            />
            <Sun className="h-3.5 w-3.5 fill-amber-500" /> Direct Sun Exposure (+15°F / +8.3°C Radiant Load)
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-zinc-600 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={showWBGT}
              onChange={(e) => setShowWBGT(e.target.checked)}
              className="rounded text-amber-600 accent-amber-600 cursor-pointer"
            />
            Show WBGT Estimate
          </label>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleCopySummary}
            variant="outline"
            size="sm"
            className="h-8 text-xs font-bold gap-1 cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Share Summary"}
          </Button>

          <Button
            onClick={() => setShowReportModal(true)}
            variant="outline"
            size="sm"
            className="h-8 text-xs font-bold gap-1 cursor-pointer bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200"
          >
            <Printer className="h-3.5 w-3.5" /> Safety Briefing PDF
          </Button>
        </div>
      </div>

      {/* 2. SPLIT PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT INPUT PANE (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-5">
          {/* Temperature Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Thermometer className="h-4 w-4 text-amber-600" /> Air Temperature
              </label>

              {/* Unit Toggle */}
              <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-xs font-bold">
                <button
                  onClick={() => setTempUnit("F")}
                  className={`px-2.5 py-1 rounded-md cursor-pointer ${
                    tempUnit === "F" ? "bg-white dark:bg-zinc-900 text-amber-600 shadow-xs" : "text-zinc-500"
                  }`}
                >
                  °F
                </button>
                <button
                  onClick={() => setTempUnit("C")}
                  className={`px-2.5 py-1 rounded-md cursor-pointer ${
                    tempUnit === "C" ? "bg-white dark:bg-zinc-900 text-amber-600 shadow-xs" : "text-zinc-500"
                  }`}
                >
                  °C
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Input
                type="number"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="h-10 text-sm font-mono font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200 w-28"
              />
              <input
                type="range"
                min={tempUnit === "F" ? 70 : 20}
                max={tempUnit === "F" ? 120 : 50}
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>
          </div>

          {/* Moisture Input: Dual Mode Toggle */}
          <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Droplets className="h-4 w-4 text-blue-600" /> Moisture Input Method
              </label>

              <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-xs font-bold">
                <button
                  onClick={() => setHumidityMode("rh")}
                  className={`px-3 py-1 rounded-md cursor-pointer ${
                    humidityMode === "rh" ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-xs" : "text-zinc-500"
                  }`}
                >
                  Relative Humidity (%)
                </button>
                <button
                  onClick={() => setHumidityMode("dewpoint")}
                  className={`px-3 py-1 rounded-md cursor-pointer ${
                    humidityMode === "dewpoint" ? "bg-white dark:bg-zinc-900 text-blue-600 shadow-xs" : "text-zinc-500"
                  }`}
                >
                  Dew Point (°{tempUnit})
                </button>
              </div>
            </div>

            {humidityMode === "rh" ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300">Relative Humidity</span>
                  <span className="font-mono font-bold text-blue-600">{rhValue}% RH</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={rhValue}
                  onChange={(e) => setRhValue(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300">Dew Point Temperature</span>
                  <span className="font-mono font-bold text-blue-600">{dewPointValue}°{tempUnit}</span>
                </div>
                <Input
                  type="number"
                  value={dewPointValue}
                  onChange={(e) => setDewPointValue(Number(e.target.value))}
                  className="h-10 text-sm font-mono font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DASHBOARD (Col 5) */}
        <div className={`lg:col-span-5 bg-gradient-to-br ${getGradientStyle(result.alertCategory)} text-white p-6 rounded-2xl shadow-md space-y-6`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-100 flex items-center gap-1.5">
                <Flame className="h-4 w-4 fill-amber-400" /> Heat Hazard Analysis
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                NOAA Rothfusz Regression
              </span>
            </div>

            {/* Primary Heat Index Reading */}
            <div className="space-y-1">
              <div className="text-6xl font-black font-mono tracking-tight text-white">
                {tempUnit === "F" ? `${result.heatIndexF}°F` : `${result.heatIndexC}°C`}
              </div>
              <p className="text-xs text-amber-100 font-medium">
                Shaded Apparent Temperature ({result.relativeHumidity}% RH | Dew Point {result.dewPointF}°F)
              </p>
            </div>

            {/* Direct Sun Additional Line */}
            {result.isDirectSun && (
              <div className="p-3 bg-amber-500/30 rounded-xl border border-amber-300/40 text-xs font-bold text-amber-100 space-y-0.5">
                <span>Direct Sun Heat Index (+15°F Solar Load):</span>
                <div className="text-2xl font-black font-mono text-white">
                  {tempUnit === "F" ? `${result.directSunHeatIndexF}°F` : `${result.directSunHeatIndexC}°C`}
                </div>
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

            {/* OSHA Work/Rest Plan */}
            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/20 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold uppercase text-amber-200 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> OSHA Work / Rest Schedule
              </span>
              <div className="font-mono font-bold text-sm text-white">
                {result.oshaPlan.workMinutes}m Work / {result.oshaPlan.restMinutes}m Rest
              </div>
              <p className="text-[11px] text-amber-100">{result.oshaPlan.advisory}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE HEAT SAFETY MATRIX TABLE */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        <button
          onClick={() => setShowChart(!showChart)}
          className="w-full p-4 flex items-center justify-between font-bold text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Sliders className="h-4 w-4 text-amber-600" /> NOAA Heat Index Reference Matrix Grid (°F)
          </span>
          {showChart ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showChart && (
          <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 overflow-x-auto text-xs">
            <table className="w-full text-center border-collapse font-mono text-[11px]">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700 font-sans">Relative Humidity \ Temp</th>
                  {matrixTemps.map((t) => (
                    <th key={t} className="p-2 border border-zinc-200 dark:border-zinc-700">{t}°F</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {matrixRHs.map((rh) => (
                  <tr key={rh}>
                    <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold bg-zinc-50 dark:bg-zinc-800/50">
                      {rh}% RH
                    </td>
                    {matrixTemps.map((t) => {
                      // Rough Heat Index grid estimation
                      const hi = Math.round(-42.379 + 2.049 * t + 10.14 * rh - 0.224 * t * rh - 0.0068 * t * t - 0.054 * rh * rh + 0.0012 * t * t * rh);
                      const isUserCell = Math.abs(result.airTempF - t) <= 2 && Math.abs(result.relativeHumidity - rh) <= 5;
                      let bgClass = "bg-amber-50 text-amber-900 dark:bg-amber-950/20 dark:text-amber-200";
                      if (hi >= 125) bgClass = "bg-purple-200 dark:bg-purple-950 text-purple-950 dark:text-purple-200 font-bold";
                      else if (hi >= 104) bgClass = "bg-rose-200 dark:bg-rose-950 text-rose-900 dark:text-rose-200 font-bold";
                      else if (hi >= 91) bgClass = "bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-100";

                      return (
                        <td
                          key={t}
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
