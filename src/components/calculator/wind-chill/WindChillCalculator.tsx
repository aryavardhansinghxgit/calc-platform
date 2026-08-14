"use client";

import React, { useState, useMemo } from "react";
import {
  Wind,
  Thermometer,
  ShieldAlert,
  Shirt,
  Flame,
  Activity,
  Sliders,
  Check,
  Share2,
  Printer,
  Download,
  Info,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Sparkles,
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
  const [copied, setCopied] = useState<boolean>(false);

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

  // Copy Summary
  const handleCopySummary = () => {
    let text = `❄️ CalcPlatform Wind Chill & Cold Safety Briefing:\n`;
    text += `Air Temp: ${result.airTempF}°F (${result.airTempC}°C) | Wind Speed: ${result.windSpeedMph} mph\n`;
    text += `Wind Chill: ${result.windChillF}°F (${result.windChillC}°C)\n`;
    text += `Frostbite Risk: ${result.frostbiteMinutesText}\n`;
    text += `Apparent Temp: ${result.apparentTempF}°F\n`;
    if (result.warningNote) text += `⚠️ ${result.warningNote}\n`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Report Modal Data
  const reportData: CalculatorReportData = useMemo(() => {
    return {
      meta: {
        reportTitle: "Wind Chill & Winter Cold Hazard Safety Briefing",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Wind Chill Calculator",
      },
      keyMetrics: [
        { label: "Calculated Wind Chill", value: `${result.windChillF}°F (${result.windChillC}°C)`, highlight: true },
        { label: "Frostbite Risk Countdown", value: result.frostbiteMinutesText },
        { label: "Ambient Air Temperature", value: `${result.airTempF}°F (${result.airTempC}°C)` },
        { label: "Effective Relative Wind", value: `${result.effectiveWindSpeedMph} mph` },
      ],
      sections: [
        {
          title: "Cold Exposure Hazard Evaluation",
          items: [
            { label: "Selected Weather Engine Model", value: model === "jag_ti" ? "NWS JAG/TI (US/Canada Standard)" : model === "steadman" ? "Australian Steadman Model" : "Pre-2001 Siple-Passel Antarctic Model" },
            { label: "Activity Compensation", value: activity.toUpperCase() },
            { label: "Steadman Apparent Temperature", value: `${result.apparentTempF}°F (${result.apparentTempC}°C)` },
            { label: "Vulnerability Adjustments", value: result.warningNote || "Standard Baseline Exposure" },
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
      ],
      table: {
        title: "Wind Chill Temperature Reference Matrix (°F)",
        headers: [
          { key: "speed", label: "Wind Speed (mph)" },
          { key: "t20", label: "20°F Air" },
          { key: "t10", label: "10°F Air" },
          { key: "t0", label: "0°F Air" },
          { key: "tneg10", label: "-10°F Air" },
        ],
        rows: [
          { speed: "10 mph", t20: "9°F", t10: "-4°F", t0: "-16°F", tneg10: "-28°F" },
          { speed: "20 mph", t20: "4°F", t10: "-9°F", t0: "-22°F", tneg10: "-35°F" },
          { speed: "30 mph", t20: "1°F", t10: "-12°F", t0: "-26°F", tneg10: "-39°F" },
          { speed: "40 mph", t20: "-1°F", t10: "-15°F", t0: "-29°F", tneg10: "-43°F" },
        ],
      },
    };
  }, [result, model, activity]);

  // Matrix Temperatures & Wind Speeds for Visual Heat Map
  const matrixTemps = [20, 10, 0, -10, -20];
  const matrixSpeeds = [10, 20, 30, 40, 50];

  return (
    <div className="space-y-6">
      {/* 1. TOP TOOLBAR BAR */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Engine Model:</span>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value as WeatherModel)}
            className="h-8 text-xs font-bold px-2.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer"
          >
            <option value="jag_ti">NWS / NOAA JAG/TI (US/Canada Standard)</option>
            <option value="steadman">Australian Steadman Apparent Temp (RH %)</option>
            <option value="siple_passel">Pre-2001 Siple-Passel Antarctic Model</option>
          </select>
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
            <Printer className="h-3.5 w-3.5" /> Safety Briefing PDF
          </Button>
        </div>
      </div>

      {/* 2. SPLIT PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT INPUT PANE (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-5">
          {/* Air Temperature Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Thermometer className="h-4 w-4 text-sky-600" /> Ambient Air Temperature
              </label>

              {/* Unit Toggle */}
              <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-xs font-bold">
                <button
                  onClick={() => setTempUnit("F")}
                  className={`px-2.5 py-1 rounded-md cursor-pointer ${
                    tempUnit === "F" ? "bg-white dark:bg-zinc-900 text-sky-600 shadow-xs" : "text-zinc-500"
                  }`}
                >
                  °F
                </button>
                <button
                  onClick={() => setTempUnit("C")}
                  className={`px-2.5 py-1 rounded-md cursor-pointer ${
                    tempUnit === "C" ? "bg-white dark:bg-zinc-900 text-sky-600 shadow-xs" : "text-zinc-500"
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
                min={tempUnit === "F" ? -50 : -45}
                max={tempUnit === "F" ? 50 : 10}
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
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
                    onClick={() => setTemp(val)}
                    className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-zinc-700 dark:text-zinc-300 font-mono text-[11px] font-bold cursor-pointer border border-zinc-200/60 dark:border-zinc-700"
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
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Wind className="h-4 w-4 text-sky-600" /> Wind Speed
              </label>

              <select
                value={speedUnit}
                onChange={(e) => setSpeedUnit(e.target.value as SpeedUnit)}
                className="h-7 text-xs font-bold px-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer"
              >
                <option value="mph">mph</option>
                <option value="kmh">km/h</option>
                <option value="ms">m/s</option>
                <option value="knots">knots</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <Input
                type="number"
                value={windSpeed}
                onChange={(e) => setWindSpeed(Number(e.target.value))}
                className="h-10 text-sm font-mono font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200 w-28"
              />
              <input
                type="range"
                min={0}
                max={60}
                value={windSpeed}
                onChange={(e) => setWindSpeed(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>
          </div>

          {/* Movement Compensator & Humidity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <Activity className="h-3.5 w-3.5 text-sky-600" /> Activity Headwind Velocity
              </label>
              <select
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
                <label className="font-bold text-zinc-700 dark:text-zinc-300">Relative Humidity ({humidity}%)</label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={humidity}
                  onChange={(e) => setHumidity(Number(e.target.value))}
                  className="w-full h-2 mt-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
              </div>
            )}
          </div>

          {/* Hypothermia Risk Toggles */}
          <div className="space-y-2 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block">
              Vulnerability Risk Profile Options
            </label>
            <div className="flex flex-wrap items-center gap-4 text-zinc-600 dark:text-zinc-300">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isWetClothing}
                  onChange={(e) => setIsWetClothing(e.target.checked)}
                  className="rounded text-sky-600 accent-sky-600 cursor-pointer"
                />
                Wet / Damp Clothing (+25x Conductive Heat Loss)
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
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
        <div className={`lg:col-span-5 bg-gradient-to-br ${getGradientStyle(result.windChillF)} text-white p-6 rounded-2xl shadow-md space-y-6`}>
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
              <div className="text-6xl font-black font-mono tracking-tight text-white">
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
              <p className="text-xs font-bold bg-rose-500/30 p-2.5 rounded-lg border border-rose-300/40 text-rose-100">
                {result.warningNote}
              </p>
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
          onClick={() => setShowChart(!showChart)}
          className="w-full p-4 flex items-center justify-between font-bold text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Sliders className="h-4 w-4 text-sky-600" /> Interactive Wind Chill Temperature Heat-Map Matrix (°F)
          </span>
          {showChart ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showChart && (
          <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 overflow-x-auto text-xs">
            <table className="w-full text-center border-collapse font-mono text-[11px]">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                  <th className="p-2 border border-zinc-200 dark:border-zinc-700 font-sans">Wind Speed \ Temp</th>
                  {matrixTemps.map((t) => (
                    <th key={t} className="p-2 border border-zinc-200 dark:border-zinc-700">{t}°F</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {matrixSpeeds.map((s) => (
                  <tr key={s}>
                    <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-sans font-bold bg-zinc-50 dark:bg-zinc-800/50">
                      {s} mph
                    </td>
                    {matrixTemps.map((t) => {
                      const wc = Math.round(35.74 + 0.6215 * t - 35.75 * Math.pow(s, 0.16) + 0.4275 * t * Math.pow(s, 0.16));
                      const isUserCell = Math.abs(result.airTempF - t) <= 5 && Math.abs(result.effectiveWindSpeedMph - s) <= 5;
                      let bgClass = "bg-sky-50 dark:bg-sky-950/20 text-sky-900 dark:text-sky-200";
                      if (wc <= -33) bgClass = "bg-rose-200 dark:bg-rose-950 text-rose-900 dark:text-rose-200 font-bold";
                      else if (wc <= -19) bgClass = "bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200";

                      return (
                        <td
                          key={t}
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

      {/* REPORT MODAL */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={reportData}
      />
    </div>
  );
}
