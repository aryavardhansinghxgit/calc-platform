"use client";

import React, { useState, useMemo } from "react";
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
} from "@/app/calculators/dew-point-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

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

  // UI State
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

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

  // Color & Badge style for Comfort Category
  const getComfortBadgeStyle = (cat: string) => {
    switch (cat) {
      case "severe_stress":
        return "bg-rose-950/80 border-rose-400 text-rose-100 animate-pulse font-bold";
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

  // Copy Summary
  const handleCopySummary = () => {
    let text = `💧 CalcPlatform Psychrometric & Dew Point Briefing:\n`;
    text += `Air Temp: ${result.airTempF}°F (${result.airTempC}°C) | RH: ${result.relativeHumidity}%\n`;
    text += `Calculated Dew Point: ${result.dewPointF}°F (${result.dewPointC}°C)\n`;
    text += `Wet-Bulb Temp: ${result.wetBulbF}°F | Frost Point: ${result.frostPointF}°F\n`;
    text += `Absolute Humidity: ${result.absoluteHumidityGM3} g/m³ | Vapor Press: ${result.actualVaporPressureHpa} hPa\n`;
    text += `Comfort Category: ${result.comfortTitle}\n`;
    text += `Est. Cloud Base: ${result.cloudBaseFt.toLocaleString()} ft\n`;
    text += `ISO 8502-4 Painting Advisory: ${result.paintingRisk.recommendation}\n`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            { label: "Calculation Model Used", value: model === "alduchov_eskridge" ? "Alduchov-Eskridge (1996 High Precision)" : model === "magnus_tetens" ? "Magnus-Tetens (1930/1967)" : model === "buck" ? "Buck (1996)" : "Sonntag (1990)" },
            { label: "Frost Point (Over Ice)", value: `${result.frostPointF}°F (${result.frostPointC}°C)` },
            { label: "Actual Vapor Pressure (e)", value: `${result.actualVaporPressureHpa} hPa (${result.actualVaporPressureInHg} inHg)` },
            { label: "Saturation Vapor Pressure (es)", value: `${result.saturationVaporPressureHpa} hPa` },
            { label: "Estimated Aviation Cloud Base", value: `${result.cloudBaseFt.toLocaleString()} Feet (${result.cloudBaseM.toLocaleString()} m)` },
          ],
        },
        {
          title: "ISO 8502-4 Industrial Painting & Surface Risk Advisory",
          items: [
            { label: "Substrate Surface Temperature", value: `${surfaceTemp}°${unit}` },
            { label: "Substrate vs Dew Point Margin", value: `${result.paintingRisk.marginF}°F (${result.paintingRisk.marginC}°C)` },
            { label: "Safety Status", value: result.paintingRisk.statusText },
            { label: "Recommendation", value: result.paintingRisk.recommendation },
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
          { temp: "60°F", rh40: "35.5°F", rh60: "45.7°F", rh80: "53.6°F" },
          { temp: "70°F", rh40: "44.6°F", rh60: "55.2°F", rh80: "63.4°F" },
          { temp: "80°F", rh40: "53.6°F", rh60: "64.7°F", rh80: "73.1°F" },
          { temp: "90°F", rh40: "62.5°F", rh60: "74.1°F", rh80: "82.8°F" },
        ],
      },
    };
  }, [result, model, surfaceTemp, unit]);

  // Matrix Values
  const matrixTemps = [60, 70, 80, 90, 100];
  const matrixRHs = [30, 40, 50, 60, 70, 80, 90];

  return (
    <div className="space-y-6">
      {/* 1. TOP TOOLBAR BAR */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300">
          <span className="text-zinc-400 uppercase tracking-wider text-[11px]">Solve Target:</span>
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-xs font-bold">
            <button
              onClick={() => setTargetVar("dew_point")}
              className={`px-3 py-1 rounded-md cursor-pointer ${
                targetVar === "dew_point" ? "bg-white dark:bg-zinc-900 text-sky-600 shadow-xs" : "text-zinc-500"
              }`}
            >
              Dew Point (Td)
            </button>
            <button
              onClick={() => setTargetVar("relative_humidity")}
              className={`px-3 py-1 rounded-md cursor-pointer ${
                targetVar === "relative_humidity" ? "bg-white dark:bg-zinc-900 text-sky-600 shadow-xs" : "text-zinc-500"
              }`}
            >
              Humidity (RH%)
            </button>
            <button
              onClick={() => setTargetVar("air_temp")}
              className={`px-3 py-1 rounded-md cursor-pointer ${
                targetVar === "air_temp" ? "bg-white dark:bg-zinc-900 text-sky-600 shadow-xs" : "text-zinc-500"
              }`}
            >
              Air Temp (T)
            </button>
          </div>
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
            className="h-8 text-xs font-bold gap-1 cursor-pointer bg-sky-50 text-sky-700 hover:bg-sky-100 dark:bg-sky-950/40 dark:text-sky-300 border-sky-200"
          >
            <Printer className="h-3.5 w-3.5" /> PDF Safety Report
          </Button>
        </div>
      </div>

      {/* 2. SPLIT PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT INPUT PANE (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Sliders className="h-4 w-4 text-sky-600" /> Input Parameters
            </h3>

            {/* Temperature Unit Toggle */}
            <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-xs font-bold">
              <button
                onClick={() => setUnit("F")}
                className={`px-2.5 py-1 rounded-md cursor-pointer ${
                  unit === "F" ? "bg-white dark:bg-zinc-900 text-sky-600 shadow-xs" : "text-zinc-500"
                }`}
              >
                °F
              </button>
              <button
                onClick={() => setUnit("C")}
                className={`px-2.5 py-1 rounded-md cursor-pointer ${
                  unit === "C" ? "bg-white dark:bg-zinc-900 text-sky-600 shadow-xs" : "text-zinc-500"
                }`}
              >
                °C
              </button>
              <button
                onClick={() => setUnit("K")}
                className={`px-2.5 py-1 rounded-md cursor-pointer ${
                  unit === "K" ? "bg-white dark:bg-zinc-900 text-sky-600 shadow-xs" : "text-zinc-500"
                }`}
              >
                K
              </button>
            </div>
          </div>

          {/* Air Temperature Field */}
          <div className={`space-y-2 ${targetVar === "air_temp" ? "opacity-50 pointer-events-none" : ""}`}>
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-zinc-700 dark:text-zinc-300">Air Temperature ({unit})</label>
              <span className="font-sans tabular-nums font-bold text-sky-600">{airTemp}°{unit}</span>
            </div>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                value={airTemp}
                onChange={(e) => setAirTemp(Number(e.target.value))}
                className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200 w-28"
              />
              <input
                type="range"
                min={unit === "F" ? -20 : -30}
                max={unit === "F" ? 120 : 50}
                value={airTemp}
                onChange={(e) => setAirTemp(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>
          </div>

          {/* Relative Humidity Field */}
          <div className={`space-y-2 ${targetVar === "relative_humidity" ? "opacity-50 pointer-events-none" : ""}`}>
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-zinc-700 dark:text-zinc-300">Relative Humidity (%)</label>
              <span className="font-sans tabular-nums font-bold text-sky-600">{rh}% RH</span>
            </div>
            <input
              type="range"
              min={1}
              max={100}
              value={rh}
              onChange={(e) => setRh(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
          </div>

          {/* Dew Point Field (Only active if targetVar === 'relative_humidity' or 'air_temp') */}
          {targetVar !== "dew_point" && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <label className="font-bold text-xs text-zinc-700 dark:text-zinc-300">Known Dew Point Temperature ({unit})</label>
              <Input
                type="number"
                value={dewPointInput}
                onChange={(e) => setDewPointInput(Number(e.target.value))}
                className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
              />
            </div>
          )}

          {/* EXPANDABLE ADVANCED ACCORDION */}
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-sky-600 cursor-pointer"
            >
              <span className="flex items-center gap-1">
                <Layers className="h-3.5 w-3.5" /> Advanced Parameters (Model, Surface Temp)
              </span>
              {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showAdvanced && (
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 block">Psychrometric Calculation Model</label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value as PsychrometricModel)}
                    className="w-full h-8 font-bold px-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer text-xs"
                  >
                    <option value="alduchov_eskridge">Alduchov & Eskridge (1996 High Precision ±0.01°C)</option>
                    <option value="magnus_tetens">Magnus-Tetens (1930/1967 Standard)</option>
                    <option value="buck">Buck (1996 Pressure Enhanced)</option>
                    <option value="sonntag">Sonntag (1990 European Standard)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 block">
                    Surface Substrate Temperature ({unit}) — ISO 8502-4 Painting Check
                  </label>
                  <Input
                    type="number"
                    value={surfaceTemp}
                    onChange={(e) => setSurfaceTemp(Number(e.target.value))}
                    className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900 border-zinc-200"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DASHBOARD (Col 5) */}
        <div className={`lg:col-span-5 bg-gradient-to-br ${getGradientStyle(result.comfortCategory)} text-white p-6 rounded-2xl shadow-md space-y-6`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-100 flex items-center gap-1.5">
                <Droplets className="h-4 w-4 fill-sky-200" /> Solved Metric
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                {model === "alduchov_eskridge" ? "Alduchov-Eskridge" : "Magnus Model"}
              </span>
            </div>

            {/* Primary Solved Reading */}
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-200 block">
                {targetVar === "dew_point" ? "Calculated Dew Point" : targetVar === "relative_humidity" ? "Calculated Relative Humidity" : "Calculated Air Temp"}
              </span>
              <div className="text-6xl font-black font-sans tabular-nums tracking-tight text-white">
                {targetVar === "dew_point"
                  ? `${result.dewPointF}°F`
                  : targetVar === "relative_humidity"
                  ? `${result.relativeHumidity}%`
                  : `${result.airTempF}°F`}
              </div>
              <p className="text-xs text-sky-100 font-medium">
                Air Temp: {result.airTempF}°F ({result.airTempC}°C) | RH: {result.relativeHumidity}%
              </p>
            </div>

            {/* Comfort Category Badge */}
            <div className={`p-4 rounded-xl border backdrop-blur-xs space-y-1 text-xs ${getComfortBadgeStyle(result.comfortCategory)}`}>
              <span className="text-[10px] font-bold uppercase tracking-wider block opacity-90">
                Muggy Index Comfort Rating
              </span>
              <div className="font-extrabold text-sm">{result.comfortTitle}</div>
              <p className="text-[11px] font-medium opacity-90">{result.comfortDescription}</p>
            </div>

            {/* Side-by-side Mini Cards */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/20">
                <span className="text-[10px] uppercase font-bold text-sky-200 block">Wet-Bulb (Tw)</span>
                <span className="font-sans tabular-nums font-bold text-sm text-white">{result.wetBulbF}°F ({result.wetBulbC}°C)</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/20">
                <span className="text-[10px] uppercase font-bold text-sky-200 block">Absolute Humidity</span>
                <span className="font-sans tabular-nums font-bold text-sm text-white">{result.absoluteHumidityGM3} g/m³</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/20">
                <span className="text-[10px] uppercase font-bold text-sky-200 block">Actual Vapor Press</span>
                <span className="font-sans tabular-nums font-bold text-sm text-white">{result.actualVaporPressureHpa} hPa</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/20">
                <span className="text-[10px] uppercase font-bold text-sky-200 block">Cloud Base</span>
                <span className="font-sans tabular-nums font-bold text-sm text-white">{result.cloudBaseFt.toLocaleString()} ft</span>
              </div>
            </div>

            {/* ISO 8502-4 Industrial Painting Card */}
            <div className={`p-3 rounded-xl border text-xs space-y-1 ${
              result.paintingRisk.isSafeToPaint
                ? "bg-emerald-950/60 border-emerald-400/50 text-emerald-100"
                : "bg-rose-950/60 border-rose-400/50 text-rose-100 font-bold"
            }`}>
              <div className="flex items-center gap-1 text-[11px] font-bold uppercase">
                <Paintbrush className="h-3.5 w-3.5" /> ISO 8502-4 Painting Advisory
              </div>
              <div className="font-sans tabular-nums text-xs">{result.paintingRisk.statusText} (Margin: {result.paintingRisk.marginF}°F)</div>
              <p className="text-[10px] opacity-90 font-medium">{result.paintingRisk.recommendation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE PSYCHROMETRIC HEAT-MAP GRID */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
        <button
          onClick={() => setShowChart(!showChart)}
          className="w-full p-4 flex items-center justify-between font-bold text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Sliders className="h-4 w-4 text-sky-600" /> Interactive Dew Point Heat-Map Grid (°F)
          </span>
          {showChart ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showChart && (
          <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 overflow-x-auto text-xs">
            <table className="w-full text-center border-collapse font-sans tabular-nums text-[11px]">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700 font-sans">Relative Humidity \ Temp</th>
                  {matrixTemps.map((t) => (
                    <th key={t} className="p-2 border border-zinc-200 dark:border-zinc-700">{t}°F</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {matrixRHs.map((rhVal) => (
                  <tr key={rhVal}>
                    <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold bg-zinc-50 dark:bg-zinc-800/50">
                      {rhVal}% RH
                    </td>
                    {matrixTemps.map((t) => {
                      const tC = (t - 32) * (5 / 9);
                      const gamma = Math.log(rhVal / 100) + (17.625 * tC) / (243.04 + tC);
                      const dewC = (243.04 * gamma) / (17.625 - gamma);
                      const dewF = Math.round(dewC * (9 / 5) + 32);

                      const isUserCell = Math.abs(result.airTempF - t) <= 4 && Math.abs(result.relativeHumidity - rhVal) <= 5;
                      let bgClass = "bg-sky-50 dark:bg-sky-950/20 text-sky-900 dark:text-sky-200";
                      if (dewF >= 70) bgClass = "bg-rose-200 dark:bg-rose-950 text-rose-950 dark:text-rose-200 font-bold";
                      else if (dewF >= 65) bgClass = "bg-amber-200 dark:bg-amber-950 text-amber-950 dark:text-amber-200 font-bold";
                      else if (dewF >= 60) bgClass = "bg-yellow-100 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-200";

                      return (
                        <td
                          key={t}
                          className={`p-2 border border-zinc-200 dark:border-zinc-800 ${bgClass} ${
                            isUserCell ? "ring-2 ring-sky-500 font-black text-xs scale-105" : ""
                          }`}
                        >
                          {dewF}°F
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
