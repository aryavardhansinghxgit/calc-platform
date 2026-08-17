"use client";

import React, { useState, useMemo } from "react";
import {
  Disc,
  Sliders,
  Share2,
  Printer,
  Check,
  ChevronUp,
  ChevronDown,
  Info,
  AlertTriangle,
  CheckCircle2,
  Gauge,
  Compass,
  ArrowRightLeft,
  Search,
  Maximize2,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TireDimensions,
  FitmentOffsetInputs,
  GearRatioInputs,
  TireComparisonResult,
} from "@/app/calculators/tire-size-calculator/types";
import {
  calculateTireComparison,
  parseTireCodeString,
} from "@/app/calculators/tire-size-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function TireSizeCalculator() {
  // Mode & Format State
  const [format, setFormat] = useState<"metric" | "flotation">("metric");
  const [visualView, setVisualView] = useState<"profile" | "tread">("profile");

  // Quick Auto Parser Input
  const [quickInput1, setQuickInput1] = useState<string>("");
  const [quickInput2, setQuickInput2] = useState<string>("");

  // Tire 1 State (Stock)
  const [t1Width, setT1Width] = useState<number>(225);
  const [t1Aspect, setT1Aspect] = useState<number>(50);
  const [t1Rim, setT1Rim] = useState<number>(17);
  const [t1FloatDia, setT1FloatDia] = useState<number>(32);
  const [t1FloatWidth, setT1FloatWidth] = useState<number>(11.5);

  // Tire 2 State (New)
  const [t2Width, setT2Width] = useState<number>(245);
  const [t2Aspect, setT2Aspect] = useState<number>(45);
  const [t2Rim, setT2Rim] = useState<number>(18);
  const [t2FloatDia, setT2FloatDia] = useState<number>(33);
  const [t2FloatWidth, setT2FloatWidth] = useState<number>(12.5);

  // Wheel Offset & Rim Width State
  const [enableOffset, setEnableOffset] = useState<boolean>(false);
  const [stockRimWidth, setStockRimWidth] = useState<number>(7.5);
  const [stockOffset, setStockOffset] = useState<number>(45);
  const [newRimWidth, setNewRimWidth] = useState<number>(8.5);
  const [newOffset, setNewOffset] = useState<number>(35);

  // Gear Ratio State
  const [enableGear, setEnableGear] = useState<boolean>(false);
  const [stockGearRatio, setStockGearRatio] = useState<number>(3.73);

  // UI State
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Parse Quick Code 1
  const handleApplyQuick1 = () => {
    const parsed = parseTireCodeString(quickInput1);
    if (parsed) {
      if (parsed.format === "flotation") {
        setFormat("flotation");
        setT1FloatDia(parsed.flotationDiameterInches);
        setT1FloatWidth(parsed.flotationWidthInches);
        setT1Rim(parsed.rimDiameterInches);
      } else {
        setFormat("metric");
        setT1Width(parsed.widthMm);
        setT1Aspect(parsed.aspectRatio);
        setT1Rim(parsed.rimDiameterInches);
      }
    }
  };

  // Parse Quick Code 2
  const handleApplyQuick2 = () => {
    const parsed = parseTireCodeString(quickInput2);
    if (parsed) {
      if (parsed.format === "flotation") {
        setFormat("flotation");
        setT2FloatDia(parsed.flotationDiameterInches);
        setT2FloatWidth(parsed.flotationWidthInches);
        setT2Rim(parsed.rimDiameterInches);
      } else {
        setFormat("metric");
        setT2Width(parsed.widthMm);
        setT2Aspect(parsed.aspectRatio);
        setT2Rim(parsed.rimDiameterInches);
      }
    }
  };

  // Construct Tire Inputs
  const tire1Inputs: TireDimensions = useMemo(
    () => ({
      format,
      widthMm: t1Width,
      aspectRatio: t1Aspect,
      rimDiameterInches: t1Rim,
      flotationDiameterInches: t1FloatDia,
      flotationWidthInches: t1FloatWidth,
    }),
    [format, t1Width, t1Aspect, t1Rim, t1FloatDia, t1FloatWidth]
  );

  const tire2Inputs: TireDimensions = useMemo(
    () => ({
      format,
      widthMm: t2Width,
      aspectRatio: t2Aspect,
      rimDiameterInches: t2Rim,
      flotationDiameterInches: t2FloatDia,
      flotationWidthInches: t2FloatWidth,
    }),
    [format, t2Width, t2Aspect, t2Rim, t2FloatDia, t2FloatWidth]
  );

  const offsetInputs: FitmentOffsetInputs | undefined = useMemo(() => {
    if (!enableOffset) return undefined;
    return {
      stockRimWidthIn: stockRimWidth,
      stockOffsetMm: stockOffset,
      newRimWidthIn: newRimWidth,
      newOffsetMm: newOffset,
    };
  }, [enableOffset, stockRimWidth, stockOffset, newRimWidth, newOffset]);

  const gearInputs: GearRatioInputs | undefined = useMemo(() => {
    if (!enableGear) return undefined;
    return { stockGearRatio };
  }, [enableGear, stockGearRatio]);

  // Calculate Comparison Results
  const result: TireComparisonResult = useMemo(() => {
    return calculateTireComparison(tire1Inputs, tire2Inputs, offsetInputs, gearInputs);
  }, [tire1Inputs, tire2Inputs, offsetInputs, gearInputs]);

  // Copy Summary Handler
  const handleCopySummary = () => {
    let text = `🚗 Tire Size & Wheel Fitment Comparison:\n`;
    text += `Stock Tire: ${result.tire1.formattedSize} (${result.tire1.diameterIn}" dia, ${result.tire1.widthIn}" width)\n`;
    text += `New Tire:   ${result.tire2.formattedSize} (${result.tire2.diameterIn}" dia, ${result.tire2.widthIn}" width)\n`;
    text += `Diameter Delta: ${result.diameterDiffIn > 0 ? "+" : ""}${result.diameterDiffIn}" (${result.diameterDiffPercent}% variance)\n`;
    text += `Speedometer @ 65mph: Actual GPS speed is ${result.speedAt65Mph} mph (${result.speedErrorPercent > 0 ? "faster" : "slower"})\n`;
    text += `Ride Height Shift: ${result.rideHeightChangeIn > 0 ? "+" : ""}${result.rideHeightChangeIn}" (${result.rideHeightChangeMm} mm)\n`;
    if (result.offsetResults) {
      text += `Inner Clearance: ${result.offsetResults.innerClearanceMm > 0 ? result.offsetResults.innerClearanceMm + "mm closer to strut" : Math.abs(result.offsetResults.innerClearanceMm) + "mm more clearance"}\n`;
      text += `Outer Fender Poke: ${result.offsetResults.outerPokeMm > 0 ? result.offsetResults.outerPokeMm + "mm extended outward" : Math.abs(result.offsetResults.outerPokeMm) + "mm tucked inward"}\n`;
    }
    if (result.gearResults) {
      text += `Effective Final Drive: ${result.gearResults.effectiveGearRatio} (Stock: ${stockGearRatio})\n`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Report Modal Data
  const reportData: CalculatorReportData = useMemo(() => {
    return {
      meta: {
        reportTitle: "Vehicle Tire & Wheel Fitment Briefing",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Tire Size Calculator",
      },
      keyMetrics: [
        { label: "Overall Diameter Delta", value: `${result.diameterDiffIn > 0 ? "+" : ""}${result.diameterDiffIn} in (${result.diameterDiffPercent}%)`, highlight: true },
        { label: "Speedometer @ 65 MPH", value: `${result.speedAt65Mph} MPH Actual GPS` },
        { label: "Ride Height Shift", value: `${result.rideHeightChangeIn > 0 ? "+" : ""}${result.rideHeightChangeIn} in (${result.rideHeightChangeMm} mm)` },
        { label: "Revs Per Mile Diff", value: `${result.revsPerMileDiff > 0 ? "+" : ""}${result.revsPerMileDiff} RPM` },
      ],
      sections: [
        {
          title: "Side-by-Side Geometry Comparison",
          items: [
            { label: "Stock Tire Size", value: result.tire1.formattedSize },
            { label: "Target / New Tire Size", value: result.tire2.formattedSize },
            { label: "Stock Overall Diameter", value: `${result.tire1.diameterIn} in (${result.tire1.diameterMm} mm)` },
            { label: "New Overall Diameter", value: `${result.tire2.diameterIn} in (${result.tire2.diameterMm} mm)` },
            { label: "Stock Sidewall Height", value: `${result.tire1.sidewallIn} in (${result.tire1.sidewallMm} mm)` },
            { label: "New Sidewall Height", value: `${result.tire2.sidewallIn} in (${result.tire2.sidewallMm} mm)` },
            { label: "Stock Section Width", value: `${result.tire1.widthIn} in (${result.tire1.widthMm} mm)` },
            { label: "New Section Width", value: `${result.tire2.widthIn} in (${result.tire2.widthMm} mm)` },
          ],
        },
        result.offsetResults
          ? {
              title: "Wheel Offset (ET) & Clearance Mechanics",
              items: [
                { label: "Stock Wheel Spec", value: `${stockRimWidth}" ET+${stockOffset}mm (Backspacing: ${result.offsetResults.backspacingStockIn}")` },
                { label: "New Wheel Spec", value: `${newRimWidth}" ET+${newOffset}mm (Backspacing: ${result.offsetResults.backspacingNewIn}")` },
                { label: "Inner Suspension Clearance", value: result.offsetResults.innerClearanceMm > 0 ? `${result.offsetResults.innerClearanceMm} mm closer to strut` : `${Math.abs(result.offsetResults.innerClearanceMm)} mm extra room` },
                { label: "Outer Fender Poke", value: result.offsetResults.outerPokeMm > 0 ? `${result.offsetResults.outerPokeMm} mm extended outward` : `${Math.abs(result.offsetResults.outerPokeMm)} mm tucked inward` },
              ],
            }
          : {
              title: "Speedometer Error Calibration Matrix",
              items: [
                { label: "30 MPH Indicated", value: `${result.speedDeltaTable[1]?.actualMph || 30} MPH Actual` },
                { label: "60 MPH Indicated", value: `${result.speedDeltaTable[3]?.actualMph || 60} MPH Actual` },
                { label: "70 MPH Indicated", value: `${result.speedDeltaTable[4]?.actualMph || 70} MPH Actual` },
                { label: "80 MPH Indicated", value: `${result.speedDeltaTable[5]?.actualMph || 80} MPH Actual` },
              ],
            },
      ],
    };
  }, [result, stockRimWidth, stockOffset, newRimWidth, newOffset]);

  return (
    <div className="space-y-4">
      {/* 1. TOP CONTROL TOOLBAR - LIGHT SLATE THEME WITH 3D BUTTONS */}
      <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Format Toggle Buttons (Col 5) */}
          <div className="md:col-span-5 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Tire Sizing Standard
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                onClick={() => setFormat("metric")}
                className={`py-1.5 px-3 rounded-lg text-center cursor-pointer transition-all ${
                  format === "metric"
                    ? "bg-blue-600 text-white font-extrabold shadow-md shadow-blue-600/30 border-b-2 border-blue-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Metric (e.g. 225/50R17)
              </button>
              <button
                onClick={() => setFormat("flotation")}
                className={`py-1.5 px-3 rounded-lg text-center cursor-pointer transition-all ${
                  format === "flotation"
                    ? "bg-blue-600 text-white font-extrabold shadow-md shadow-blue-600/30 border-b-2 border-blue-800 active:translate-y-0.5"
                    : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-bold border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 border-b-2 border-b-slate-300 dark:border-b-zinc-950"
                }`}
              >
                Flotation (33x12.50R15)
              </button>
            </div>
          </div>

          {/* Export & Share Buttons (Col 7) */}
          <div className="md:col-span-7 flex items-end justify-end gap-2">
            <Button
              onClick={handleCopySummary}
              variant="outline"
              size="sm"
              className="h-8 text-xs font-bold gap-1 cursor-pointer bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 border-b-2 border-b-slate-300"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy Log"}
            </Button>
            <Button
              onClick={() => setShowReportModal(true)}
              variant="outline"
              size="sm"
              className="h-8 text-xs font-bold gap-1 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white border-b-2 border-blue-800 shadow-md shadow-blue-600/20"
            >
              <Printer className="h-3.5 w-3.5" /> Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* 2. SPLIT PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT INPUT PANE (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* TIRE 1 (STOCK) */}
            <div className="bg-slate-50/70 dark:bg-zinc-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-700 pb-1.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                  <Disc className="h-4 w-4 text-blue-600" /> Stock Tire (Size 1)
                </span>
                <span className="text-xs font-sans tabular-nums font-black text-slate-800 dark:text-zinc-100 bg-blue-100 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-900">
                  {result.tire1.formattedSize}
                </span>
              </div>

              {/* Quick Text Parser Input 1 */}
              <div className="flex gap-1.5">
                <Input
                  type="text"
                  placeholder="e.g. 225/50R17 or 225 50 17"
                  value={quickInput1}
                  onChange={(e) => setQuickInput1(e.target.value)}
                  className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900"
                />
                <Button
                  onClick={handleApplyQuick1}
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs font-bold px-2 bg-slate-200 dark:bg-zinc-700 hover:bg-slate-300"
                >
                  <Search className="h-3 w-3" />
                </Button>
              </div>

              {format === "metric" ? (
                <div className="space-y-2 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between font-bold text-slate-700 dark:text-zinc-300">
                      <span>Section Width:</span>
                      <span className="font-sans tabular-nums text-blue-600">{t1Width} mm</span>
                    </div>
                    <input
                      type="range"
                      min={135}
                      max={355}
                      step={5}
                      value={t1Width}
                      onChange={(e) => setT1Width(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-bold text-slate-700 dark:text-zinc-300">
                      <span>Aspect Ratio:</span>
                      <span className="font-sans tabular-nums text-blue-600">{t1Aspect} %</span>
                    </div>
                    <input
                      type="range"
                      min={25}
                      max={85}
                      step={5}
                      value={t1Aspect}
                      onChange={(e) => setT1Aspect(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-bold text-slate-700 dark:text-zinc-300">
                      <span>Rim Diameter:</span>
                      <span className="font-sans tabular-nums text-blue-600">{t1Rim} in</span>
                    </div>
                    <input
                      type="range"
                      min={12}
                      max={28}
                      step={1}
                      value={t1Rim}
                      onChange={(e) => setT1Rim(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                </div>
              ) : (
                /* Flotation Mode Inputs */
                <div className="space-y-2 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-zinc-300">Outer Diameter (in)</label>
                    <Input
                      type="number"
                      value={t1FloatDia}
                      onChange={(e) => setT1FloatDia(Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-zinc-300">Section Width (in)</label>
                    <Input
                      type="number"
                      step="0.5"
                      value={t1FloatWidth}
                      onChange={(e) => setT1FloatWidth(Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-zinc-300">Rim Size (in)</label>
                    <Input
                      type="number"
                      value={t1Rim}
                      onChange={(e) => setT1Rim(Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
                    />
                  </div>
                </div>
              )}

              {/* Preset Chips */}
              <div className="flex flex-wrap gap-1 pt-1">
                {["205/55R16", "225/45R17", "245/40R18", "275/40R19"].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      const p = parseTireCodeString(preset);
                      if (p) {
                        setT1Width(p.widthMm);
                        setT1Aspect(p.aspectRatio);
                        setT1Rim(p.rimDiameterInches);
                      }
                    }}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 text-[10px] font-bold text-slate-600 dark:text-zinc-300 hover:bg-blue-50 border border-slate-200 dark:border-zinc-700 cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* TIRE 2 (TARGET / NEW) */}
            <div className="bg-slate-50/70 dark:bg-zinc-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-700 pb-1.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <Disc className="h-4 w-4 text-emerald-600" /> Target Tire (Size 2)
                </span>
                <span className="text-xs font-sans tabular-nums font-black text-slate-800 dark:text-zinc-100 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-900">
                  {result.tire2.formattedSize}
                </span>
              </div>

              {/* Quick Text Parser Input 2 */}
              <div className="flex gap-1.5">
                <Input
                  type="text"
                  placeholder="e.g. 245/45R18 or 33 12.5 15"
                  value={quickInput2}
                  onChange={(e) => setQuickInput2(e.target.value)}
                  className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900"
                />
                <Button
                  onClick={handleApplyQuick2}
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs font-bold px-2 bg-slate-200 dark:bg-zinc-700 hover:bg-slate-300"
                >
                  <Search className="h-3 w-3" />
                </Button>
              </div>

              {format === "metric" ? (
                <div className="space-y-2 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between font-bold text-slate-700 dark:text-zinc-300">
                      <span>Section Width:</span>
                      <span className="font-sans tabular-nums text-emerald-600">{t2Width} mm</span>
                    </div>
                    <input
                      type="range"
                      min={135}
                      max={355}
                      step={5}
                      value={t2Width}
                      onChange={(e) => setT2Width(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-bold text-slate-700 dark:text-zinc-300">
                      <span>Aspect Ratio:</span>
                      <span className="font-sans tabular-nums text-emerald-600">{t2Aspect} %</span>
                    </div>
                    <input
                      type="range"
                      min={25}
                      max={85}
                      step={5}
                      value={t2Aspect}
                      onChange={(e) => setT2Aspect(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-bold text-slate-700 dark:text-zinc-300">
                      <span>Rim Diameter:</span>
                      <span className="font-sans tabular-nums text-emerald-600">{t2Rim} in</span>
                    </div>
                    <input
                      type="range"
                      min={12}
                      max={28}
                      step={1}
                      value={t2Rim}
                      onChange={(e) => setT2Rim(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                  </div>
                </div>
              ) : (
                /* Flotation Mode Inputs 2 */
                <div className="space-y-2 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-zinc-300">Outer Diameter (in)</label>
                    <Input
                      type="number"
                      value={t2FloatDia}
                      onChange={(e) => setT2FloatDia(Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-zinc-300">Section Width (in)</label>
                    <Input
                      type="number"
                      step="0.5"
                      value={t2FloatWidth}
                      onChange={(e) => setT2FloatWidth(Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-zinc-300">Rim Size (in)</label>
                    <Input
                      type="number"
                      value={t2Rim}
                      onChange={(e) => setT2Rim(Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
                    />
                  </div>
                </div>
              )}

              {/* Preset Chips */}
              <div className="flex flex-wrap gap-1 pt-1">
                {["225/50R17", "245/45R18", "275/35R19", "315/30R20"].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      const p = parseTireCodeString(preset);
                      if (p) {
                        setT2Width(p.widthMm);
                        setT2Aspect(p.aspectRatio);
                        setT2Rim(p.rimDiameterInches);
                      }
                    }}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 text-[10px] font-bold text-slate-600 dark:text-zinc-300 hover:bg-emerald-50 border border-slate-200 dark:border-zinc-700 cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ACCORDION 1: WHEEL OFFSET (ET) & BACKSPACING FITMENT ENGINE */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-extrabold text-slate-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={enableOffset}
                  onChange={(e) => setEnableOffset(e.target.checked)}
                  className="rounded text-blue-600 accent-blue-600 cursor-pointer"
                />
                Include Wheel Offset (ET) &amp; Backspacing Mechanics
              </label>
            </div>

            {enableOffset && (
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl space-y-3 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-zinc-300">Stock Rim Width (in)</label>
                    <Input
                      type="number"
                      step="0.5"
                      value={stockRimWidth}
                      onChange={(e) => setStockRimWidth(Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-zinc-300">Stock Offset (ET mm)</label>
                    <Input
                      type="number"
                      value={stockOffset}
                      onChange={(e) => setStockOffset(Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-zinc-300">New Rim Width (in)</label>
                    <Input
                      type="number"
                      step="0.5"
                      value={newRimWidth}
                      onChange={(e) => setNewRimWidth(Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 dark:text-zinc-300">New Offset (ET mm)</label>
                    <Input
                      type="number"
                      value={newOffset}
                      onChange={(e) => setNewOffset(Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900"
                    />
                  </div>
                </div>

                {result.offsetResults && (
                  <div className="grid grid-cols-2 gap-2 p-2 bg-blue-50/60 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200 font-medium text-[11px]">
                    <div>
                      <span className="font-bold block">Inner Strut Clearance:</span>
                      {result.offsetResults.innerClearanceMm > 0
                        ? `${result.offsetResults.innerClearanceMm} mm closer to suspension strut`
                        : `${Math.abs(result.offsetResults.innerClearanceMm)} mm extra clearance`}
                    </div>
                    <div>
                      <span className="font-bold block">Outer Fender Poke:</span>
                      {result.offsetResults.outerPokeMm > 0
                        ? `${result.offsetResults.outerPokeMm} mm extended outward`
                        : `${Math.abs(result.offsetResults.outerPokeMm)} mm tucked inward`}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ACCORDION 2: DRIVETRAIN DIFFERENTIAL GEAR RATIO ADJUSTER */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-extrabold text-slate-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={enableGear}
                  onChange={(e) => setEnableGear(e.target.checked)}
                  className="rounded text-blue-600 accent-blue-600 cursor-pointer"
                />
                Include Axle Differential Gear Ratio Adjuster
              </label>
            </div>

            {enableGear && (
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-3">
                  <div className="space-y-1 flex-1">
                    <label className="font-bold text-slate-700 dark:text-zinc-300">Stock Axle Gear Ratio (e.g. 3.73)</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={stockGearRatio}
                      onChange={(e) => setStockGearRatio(Number(e.target.value))}
                      className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900 max-w-xs"
                    />
                  </div>
                  {result.gearResults && (
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200 text-[11px] flex-1">
                      <span className="font-bold block">Effective Final Drive: {result.gearResults.effectiveGearRatio}</span>
                      <span>Target Ratio Needed: {result.gearResults.equivalentRatioNeeded}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT DASHBOARD (Col 5) - INTERACTIVE VISUALIZER & COMPARISON */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 text-white p-4 rounded-2xl shadow-md space-y-4">
          {/* Header & Safety Badge */}
          <div className="flex items-center justify-between border-b border-white/20 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-100 flex items-center gap-1.5">
              <Gauge className="h-4 w-4 text-white" /> Fitment &amp; Speed Dashboard
            </span>
            <span
              className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                result.safetyRating === "safe"
                  ? "bg-emerald-500/30 text-emerald-200 border-emerald-400/40"
                  : result.safetyRating === "caution"
                  ? "bg-amber-500/30 text-amber-200 border-amber-400/40"
                  : "bg-rose-500/30 text-rose-200 border-rose-400/40"
              }`}
            >
              {result.safetyRating.toUpperCase()} ({result.diameterDiffPercent > 0 ? "+" : ""}{result.diameterDiffPercent}%)
            </span>
          </div>

          {/* Primary Result Headline */}
          <div className="grid grid-cols-2 gap-2 text-center bg-black/30 backdrop-blur-xs p-3 rounded-xl border border-white/20">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">Diameter Delta</span>
              <span className="text-xl sm:text-2xl font-black font-sans tabular-nums tracking-tight text-white">
                {result.diameterDiffIn > 0 ? "+" : ""}{result.diameterDiffIn}"
              </span>
              <span className="text-[10px] text-blue-200 block">{result.diameterDiffMm} mm</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">Speed @ 65 MPH</span>
              <span className="text-xl sm:text-2xl font-black font-sans tabular-nums tracking-tight text-emerald-300">
                {result.speedAt65Mph}
              </span>
              <span className="text-[10px] text-blue-200 block">Actual GPS Speed</span>
            </div>
          </div>

          {/* Safety Alert Banner - MIN HEIGHT min-h-[64px] FULL UNTRUNCATED TEXT */}
          <div
            className={`min-h-[64px] px-3.5 py-2.5 rounded-xl border text-xs flex items-center gap-2.5 transition-all duration-300 ${
              result.safetyRating === "safe"
                ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-100 shadow-sm shadow-emerald-900/30"
                : result.safetyRating === "caution"
                ? "bg-amber-950/60 border-amber-500/50 text-amber-100 shadow-sm shadow-amber-900/30"
                : "bg-rose-950/60 border-rose-500/50 text-rose-100 shadow-sm shadow-rose-900/30"
            }`}
          >
            {result.safetyRating === "safe" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400" />
            )}
            <div className="flex-1 min-w-0">
              <span className="font-extrabold uppercase text-[10px] tracking-wider block opacity-90">
                {result.safetyRating === "safe"
                  ? "OEM Fitment Spec Safe"
                  : result.safetyRating === "caution"
                  ? "Fitment Variance Caution"
                  : "Fitment Exceeds 3% Warning"}
              </span>
              <p className="text-[11px] leading-snug font-medium text-slate-100 dark:text-zinc-100">{result.safetyMessage}</p>
            </div>
          </div>

          {/* INTERACTIVE 2D SVG VISUAL OVERLAY - PREMIUM CAD STYLING */}
          <div className="bg-slate-950/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 shadow-inner space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 flex items-center gap-1.5">
                <Compass className="h-4 w-4 text-emerald-400" /> Scaled 2D Fitment Visualizer
              </span>
              <div className="flex gap-1 text-[10px] bg-slate-900/90 p-0.5 rounded-lg border border-slate-800">
                <button
                  onClick={() => setVisualView("profile")}
                  className={`px-2.5 py-1 rounded-md cursor-pointer font-extrabold transition-all ${
                    visualView === "profile"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Side Profile
                </button>
                <button
                  onClick={() => setVisualView("tread")}
                  className={`px-2.5 py-1 rounded-md cursor-pointer font-extrabold transition-all ${
                    visualView === "tread"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Tread Front
                </button>
              </div>
            </div>

            {/* SVG CANVAS DIAGRAM */}
            <div className="h-48 w-full relative flex items-center justify-center pt-1">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 340 180">
                <defs>
                  {/* Neon Glow & Metallic Gradients */}
                  <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <linearGradient id="alloyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="50%" stopColor="#475569" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                  <linearGradient id="treadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="50%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>
                </defs>

                {visualView === "profile" ? (
                  /* SIDE PROFILE OVERLAY DIAGRAM */
                  <g>
                    {/* Scale Math: Center (170, 85) */}
                    {(() => {
                      const cx = 170;
                      const cy = 85;
                      const maxDia = Math.max(result.tire1.diameterIn, result.tire2.diameterIn) || 30;
                      const r2 = 62; // New tire outer radius
                      const r1 = Math.min(72, Math.max(30, (result.tire1.diameterIn / maxDia) * 62)); // Stock outer radius
                      const rRim2 = Math.min(48, Math.max(18, (result.tire2.rimDiameterIn / maxDia) * 62));
                      const rRim1 = Math.min(48, Math.max(18, (result.tire1.rimDiameterIn / maxDia) * 62));

                      // Spoke angles for 5-spoke wheel
                      const spokeAngles = [0, 72, 144, 216, 288];

                      return (
                        <>
                          {/* Top Fender Arch Line */}
                          <path
                            d="M 60 22 Q 170 8 280 22"
                            fill="none"
                            stroke="#475569"
                            strokeWidth="2.5"
                            strokeDasharray="4 3"
                          />
                          <text x="170" y="14" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">
                            FENDER ARCH CLEARANCE
                          </text>

                          {/* Ground Level Line */}
                          <line x1="30" y1="155" x2="310" y2="155" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
                          <text x="170" y="167" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">
                            GROUND LEVEL — Ride Height Shift: {result.rideHeightChangeIn > 0 ? "+" : ""}{result.rideHeightChangeIn}" ({result.rideHeightChangeMm} mm)
                          </text>

                          {/* Stock Tire (Blue Dashed Outline) */}
                          <circle
                            cx={cx}
                            cy={cy}
                            r={r1}
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="6"
                            strokeDasharray="5 3"
                            opacity="0.85"
                          />
                          <circle
                            cx={cx}
                            cy={cy}
                            r={rRim1}
                            fill="none"
                            stroke="#60a5fa"
                            strokeWidth="2"
                            strokeDasharray="3 2"
                            opacity="0.7"
                          />

                          {/* New Tire Body (Dark Rubber Ring) */}
                          <circle
                            cx={cx}
                            cy={cy}
                            r={r2}
                            fill="none"
                            stroke="url(#treadGrad)"
                            strokeWidth="10"
                          />
                          {/* New Tire Glowing Neon Border (Emerald) */}
                          <circle
                            cx={cx}
                            cy={cy}
                            r={r2}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3"
                            filter="url(#emeraldGlow)"
                          />

                          {/* Vented Brake Rotor (Behind Spokes) */}
                          <circle
                            cx={cx}
                            cy={cy}
                            r={rRim2 * 0.7}
                            fill="none"
                            stroke="#475569"
                            strokeWidth="3"
                            strokeDasharray="4 2"
                            opacity="0.6"
                          />
                          <rect
                            x={cx + rRim2 * 0.4}
                            y={cy - 12}
                            width="10"
                            height="24"
                            rx="3"
                            fill="#ef4444"
                            stroke="#fca5a5"
                            strokeWidth="1"
                          />

                          {/* New Alloy Rim Circle */}
                          <circle
                            cx={cx}
                            cy={cy}
                            r={rRim2}
                            fill="rgba(15, 23, 42, 0.4)"
                            stroke="#34d399"
                            strokeWidth="2.5"
                          />

                          {/* 5 Sleek Alloy Wheel Spokes */}
                          {spokeAngles.map((angle, idx) => {
                            const rad = (angle * Math.PI) / 180;
                            const x2 = cx + rRim2 * 0.9 * Math.cos(rad);
                            const y2 = cy + rRim2 * 0.9 * Math.sin(rad);
                            return (
                              <line
                                key={idx}
                                x1={cx}
                                y1={cy}
                                x2={x2}
                                y2={y2}
                                stroke="url(#alloyGrad)"
                                strokeWidth="4"
                                strokeLinecap="round"
                              />
                            );
                          })}

                          {/* Metallic Hub Cap */}
                          <circle cx={cx} cy={cy} r="9" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                          <circle cx={cx} cy={cy} r="4" fill="#34d399" />

                          {/* 5 Lug Nuts */}
                          {spokeAngles.map((angle, idx) => {
                            const rad = ((angle + 36) * Math.PI) / 180;
                            const lx = cx + 6 * Math.cos(rad);
                            const ly = cy + 6 * Math.sin(rad);
                            return <circle key={idx} cx={lx} cy={ly} r="1.5" fill="#f8fafc" />;
                          })}

                          {/* Dynamic Legend */}
                          <g transform="translate(15, 20)">
                            <rect x="0" y="0" width="10" height="10" rx="2" fill="#3b82f6" />
                            <text x="14" y="9" fill="#93c5fd" fontSize="9" fontWeight="bold">
                              Stock: {result.tire1.formattedSize} ({result.tire1.diameterIn}")
                            </text>
                          </g>
                          <g transform="translate(180, 20)">
                            <rect x="0" y="0" width="10" height="10" rx="2" fill="#10b981" />
                            <text x="14" y="9" fill="#6ee7b7" fontSize="9" fontWeight="bold">
                              New: {result.tire2.formattedSize} ({result.tire2.diameterIn}")
                            </text>
                          </g>
                        </>
                      );
                    })()}
                  </g>
                ) : (
                  /* FRONT TREAD FACE VIEW DIAGRAM */
                  <g>
                    {(() => {
                      const cx = 170;
                      const cy = 85;
                      const maxW = Math.max(result.tire1.widthMm, result.tire2.widthMm) || 245;
                      const w2 = Math.min(130, Math.max(40, (result.tire2.widthMm / maxW) * 110));
                      const w1 = Math.min(130, Math.max(40, (result.tire1.widthMm / maxW) * 110));

                      return (
                        <>
                          {/* Inner Strut Block (Left) */}
                          <g transform="translate(25, 30)">
                            <rect x="0" y="0" width="20" height="100" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                            <text x="10" y="55" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold" transform="rotate(-90 10 55)">
                              STRUT
                            </text>
                          </g>

                          {/* Outer Fender Lip (Right) */}
                          <g transform="translate(295, 30)">
                            <path d="M 0 0 L 15 0 L 15 40 L 0 60 Z" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                            <text x="8" y="30" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold" transform="rotate(90 8 30)">
                              FENDER
                            </text>
                          </g>

                          {/* Stock Tread Face Box (Blue Dashed) */}
                          <rect
                            x={cx - w1 / 2}
                            y="25"
                            width={w1}
                            height="110"
                            rx="8"
                            fill="rgba(59, 130, 246, 0.1)"
                            stroke="#3b82f6"
                            strokeWidth="2.5"
                            strokeDasharray="4 2"
                          />

                          {/* New Tread Face Box (Emerald Solid) */}
                          <rect
                            x={cx - w2 / 2}
                            y="25"
                            width={w2}
                            height="110"
                            rx="8"
                            fill="rgba(16, 185, 129, 0.2)"
                            stroke="#10b981"
                            strokeWidth="3"
                            filter="url(#emeraldGlow)"
                          />

                          {/* Tread Channel Grooves (Vertical Lines) */}
                          {[-0.3, -0.1, 0.1, 0.3].map((pos, idx) => (
                            <line
                              key={idx}
                              x1={cx + (w2 / 2) * pos}
                              y1="28"
                              x2={cx + (w2 / 2) * pos}
                              y2="132"
                              stroke="#047857"
                              strokeWidth="2"
                              strokeDasharray="6 3"
                            />
                          ))}

                          {/* Wheel Hub Axle Line */}
                          <line x1={cx - w2 / 2 - 15} y1="80" x2={cx + w2 / 2 + 15} y2="80" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />

                          {/* Callout Width Text */}
                          <text x={cx} y="72" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="monospace">
                            {result.tire2.widthMm} mm ({result.tire2.widthIn}")
                          </text>
                          <text x={cx} y="88" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="extrabold">
                            {result.widthDiffMm > 0 ? "+" : ""}{result.widthDiffMm} mm ({result.widthDiffIn > 0 ? "+" : ""}{result.widthDiffIn}") wider
                          </text>

                          {/* Bottom Legend */}
                          <text x="170" y="162" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">
                            Stock Width: {result.tire1.widthMm}mm ({result.tire1.widthIn}") | New Width: {result.tire2.widthMm}mm ({result.tire2.widthIn}")
                          </text>
                        </>
                      );
                    })()}
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* SIDE-BY-SIDE DATA COMPARISON TABLE - SPACIOUS & DE-CONGESTED */}
          <div className="bg-slate-950/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 space-y-3 text-xs shadow-inner">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 block text-center border-b border-white/10 pb-2">
              Comprehensive Geometry Matrix
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/15 text-[10px] uppercase font-extrabold text-blue-200 tracking-wider">
                    <th className="py-2 px-1">Specification</th>
                    <th className="py-2 px-1 text-center">Stock ({result.tire1.formattedSize})</th>
                    <th className="py-2 px-1 text-center">New ({result.tire2.formattedSize})</th>
                    <th className="py-2 px-1 text-right">Difference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 font-sans tabular-nums text-[11px]">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-2.5 px-1 font-sans text-slate-200 font-bold">Overall Diameter</td>
                    <td className="py-2.5 px-1 text-center">
                      <span className="font-bold text-white block">{result.tire1.diameterIn} in</span>
                      <span className="text-[10px] text-blue-300 font-normal block">{result.tire1.diameterMm} mm</span>
                    </td>
                    <td className="py-2.5 px-1 text-center">
                      <span className="font-bold text-white block">{result.tire2.diameterIn} in</span>
                      <span className="text-[10px] text-emerald-300 font-normal block">{result.tire2.diameterMm} mm</span>
                    </td>
                    <td className="py-2.5 px-1 text-right">
                      <span className="font-extrabold text-emerald-300 block">
                        {result.diameterDiffIn > 0 ? "+" : ""}{result.diameterDiffIn} in
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold block">
                        {result.diameterDiffPercent > 0 ? "+" : ""}{result.diameterDiffPercent}%
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-2.5 px-1 font-sans text-slate-200 font-bold">Section Width</td>
                    <td className="py-2.5 px-1 text-center">
                      <span className="font-bold text-white block">{result.tire1.widthIn} in</span>
                      <span className="text-[10px] text-blue-300 font-normal block">{result.tire1.widthMm} mm</span>
                    </td>
                    <td className="py-2.5 px-1 text-center">
                      <span className="font-bold text-white block">{result.tire2.widthIn} in</span>
                      <span className="text-[10px] text-emerald-300 font-normal block">{result.tire2.widthMm} mm</span>
                    </td>
                    <td className="py-2.5 px-1 text-right">
                      <span className="font-extrabold text-emerald-300 block">
                        {result.widthDiffIn > 0 ? "+" : ""}{result.widthDiffIn} in
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold block">
                        {result.widthDiffMm > 0 ? "+" : ""}{result.widthDiffMm} mm
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-2.5 px-1 font-sans text-slate-200 font-bold">Sidewall Height</td>
                    <td className="py-2.5 px-1 text-center">
                      <span className="font-bold text-white block">{result.tire1.sidewallIn} in</span>
                      <span className="text-[10px] text-blue-300 font-normal block">{result.tire1.sidewallMm} mm</span>
                    </td>
                    <td className="py-2.5 px-1 text-center">
                      <span className="font-bold text-white block">{result.tire2.sidewallIn} in</span>
                      <span className="text-[10px] text-emerald-300 font-normal block">{result.tire2.sidewallMm} mm</span>
                    </td>
                    <td className="py-2.5 px-1 text-right">
                      <span className="font-extrabold text-emerald-300 block">
                        {result.sidewallDiffIn > 0 ? "+" : ""}{result.sidewallDiffIn} in
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold block">
                        {result.sidewallDiffMm > 0 ? "+" : ""}{result.sidewallDiffMm} mm
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-2.5 px-1 font-sans text-slate-200 font-bold">Circumference</td>
                    <td className="py-2.5 px-1 text-center">
                      <span className="font-bold text-white block">{result.tire1.circumferenceIn} in</span>
                      <span className="text-[10px] text-blue-300 font-normal block">{result.tire1.circumferenceMm} mm</span>
                    </td>
                    <td className="py-2.5 px-1 text-center">
                      <span className="font-bold text-white block">{result.tire2.circumferenceIn} in</span>
                      <span className="text-[10px] text-emerald-300 font-normal block">{result.tire2.circumferenceMm} mm</span>
                    </td>
                    <td className="py-2.5 px-1 text-right">
                      <span className="font-extrabold text-emerald-300 block">
                        {result.circumferenceDiffIn > 0 ? "+" : ""}{result.circumferenceDiffIn} in
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold block">
                        {result.circumferenceDiffMm > 0 ? "+" : ""}{result.circumferenceDiffMm} mm
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-2.5 px-1 font-sans text-slate-200 font-bold">Revs / Mile (RPM)</td>
                    <td className="py-2.5 px-1 text-center font-bold text-white">{result.tire1.revsPerMile}</td>
                    <td className="py-2.5 px-1 text-center font-bold text-white">{result.tire2.revsPerMile}</td>
                    <td className="py-2.5 px-1 text-right font-extrabold text-emerald-300">
                      {result.revsPerMileDiff > 0 ? "+" : ""}{result.revsPerMileDiff}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SPEED DELTA CALIBRATION MATRIX TABLE */}
          <div className="bg-black/40 backdrop-blur-xs p-3 rounded-xl border border-white/20 space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block text-center">
              Speedometer Calibration Delta Matrix
            </span>
            <div className="grid grid-cols-6 gap-1 text-center font-sans tabular-nums text-[10px]">
              {result.speedDeltaTable.map((pt) => (
                <div key={pt.indicatedMph} className="p-1 bg-white/10 rounded-md">
                  <span className="text-blue-200 block text-[9px]">{pt.indicatedMph} mph</span>
                  <span className="font-bold text-white block">{pt.actualMph}</span>
                  <span className="text-[8px] text-emerald-300 block">
                    {pt.actualMph >= pt.indicatedMph ? "+" : ""}{(pt.actualMph - pt.indicatedMph).toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
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
