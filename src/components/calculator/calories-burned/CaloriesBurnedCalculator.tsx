"use client";

import React, { useState, useMemo } from "react";
import {
  Flame,
  Bookmark,
  Share2,
  Printer,
  Copy,
  Check,
  RefreshCw,
  Info,
  Scale,
  Activity,
  Layers,
  Timer,
  Navigation,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  calculateCaloriesBurned,
  UnitSystem,
  ACTIVITIES_DATABASE,
  CaloriesBurnedResult,
} from "@/lib/formulas/caloriesBurned";

import {
  CaloriesBurnedGauge,
  CaloriesBurnedActivityBarChart,
} from "./CaloriesBurnedCharts";

import { CaloriesBurnedTables } from "./CaloriesBurnedTables";

export function CaloriesBurnedCalculator() {
  // Mode & Unit System
  const [mode, setMode] = useState<"duration" | "distance">("duration");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");

  // Duration Mode inputs
  const [activityId, setActivityId] = useState<string>("walk-mod");
  const [durationHours, setDurationHours] = useState<number>(0);
  const [durationMinutes, setDurationMinutes] = useState<number>(45);

  // Distance Mode inputs
  const [distanceActivityId, setDistanceActivityId] = useState<string>("run-6mph");
  const [distanceMiles, setDistanceMiles] = useState<number>(5);
  const [distanceKm, setDistanceKm] = useState<number>(8);
  const [speedMph, setSpeedMph] = useState<number>(6.0);

  // Weight inputs
  const [weightLbs, setWeightLbs] = useState<number>(160);
  const [weightKg, setWeightKg] = useState<number>(72.5);

  // Saved calculations & copy state
  const [savedCalculations, setSavedCalculations] = useState<
    Array<{ id: string; timestamp: string; title: string; caloriesBurned: number; met: number }>
  >([]);
  const [copied, setCopied] = useState(false);

  const handleReset = () => {
    setMode("duration");
    setUnitSystem("imperial");
    setActivityId("walk-mod");
    setDurationHours(0);
    setDurationMinutes(45);
    setDistanceActivityId("run-6mph");
    setDistanceMiles(5);
    setDistanceKm(8);
    setSpeedMph(6.0);
    setWeightLbs(160);
    setWeightKg(72.5);
  };

  const handleUnitSystemToggle = (newSys: UnitSystem) => {
    if (newSys === unitSystem) return;
    if (newSys === "metric") {
      setWeightKg(parseFloat((weightLbs / 2.20462).toFixed(1)));
      setDistanceKm(parseFloat((distanceMiles * 1.60934).toFixed(1)));
    } else {
      setWeightLbs(parseFloat((weightKg * 2.20462).toFixed(1)));
      setDistanceMiles(parseFloat((distanceKm / 1.60934).toFixed(1)));
    }
    setUnitSystem(newSys);
  };

  const totalDurationMinutesCombined = durationHours * 60 + durationMinutes;

  // Primary Calculation Engine Call
  const result: CaloriesBurnedResult = useMemo(() => {
    return calculateCaloriesBurned({
      mode,
      unitSystem,
      activityId: mode === "duration" ? activityId : distanceActivityId,
      durationMinutes: totalDurationMinutesCombined,
      distanceMiles,
      distanceKm,
      speedMph,
      weightLbs,
      weightKg,
    });
  }, [mode, unitSystem, activityId, distanceActivityId, totalDurationMinutesCombined, distanceMiles, distanceKm, speedMph, weightLbs, weightKg]);

  const handleSaveCalculation = () => {
    const newItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: `${result.activityName} - ${result.caloriesBurned} kcal`,
      caloriesBurned: result.caloriesBurned,
      met: result.met,
    };
    setSavedCalculations([newItem, ...savedCalculations]);
  };

  const handleCopySummary = () => {
    const summary = `Clinical Calories Burned Assessment Report (${new Date().toLocaleDateString()})
Activity: ${result.activityName} (MET ${result.met})
Duration: ${result.durationMinutes} minutes
Body Weight: ${result.weightLbs} lbs (${result.weightKg} kg)
Total Calories Burned: ${result.caloriesBurned} kcal
Burn Rate: ${result.caloriesPerMinute} kcal/min (${result.caloriesPerHour} kcal/hr)
Fat Mass Burned: ${result.fatMassLossLbs} lbs (${result.fatMassLossGrams} g)
Food Equivalent: ${result.foodEquivalents.pizzaSlices} slices of pizza (${result.foodEquivalents.bananas} bananas)
Calculated via CalcPlatform Clinical Health Engine`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Calories Burned Assessment",
          text: `I burned ${result.caloriesBurned} kcal doing ${result.activityName}! Calculate your workout calorie burn:`,
          url: window.location.href,
        });
      } catch {
        handleCopySummary();
      }
    } else {
      handleCopySummary();
    }
  };

  // Dedicated Standalone Popup Print Engine
  const handlePrint = () => {
    const reportEl = document.getElementById("cb-print-report");
    if (!reportEl) {
      window.print();
      return;
    }

    const printWindow = window.open("", "_blank", "width=900,height=1100");
    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Clinical Exercise Calorie Expenditure Report - CalcPlatform</title>
          <style>
            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              background-color: #ffffff !important;
              color: #18181b !important;
              padding: 24px;
              line-height: 1.5;
            }
            .p-8 { padding: 1.5rem; }
            .max-w-4xl { max-width: 56rem; margin-left: auto; margin-right: auto; }
            .space-y-6 > * + * { margin-top: 1.5rem; }
            .space-y-4 > * + * { margin-top: 1rem; }
            .space-y-2 > * + * { margin-top: 0.5rem; }
            .space-y-1 > * + * { margin-top: 0.25rem; }
            .bg-white { background-color: #ffffff; }
            .bg-zinc-50 { background-color: #fafafa; }
            .bg-zinc-100 { background-color: #f4f4f5; }
            .border { border: 1px solid #e4e4e7; }
            .border-b { border-bottom: 1px solid #e4e4e7; }
            .border-b-2 { border-bottom: 2px solid; }
            .border-t { border-top: 1px solid #e4e4e7; }
            .border-r { border-right: 1px solid #e4e4e7; }
            .border-zinc-200 { border-color: #e4e4e7; }
            .border-zinc-300 { border-color: #d4d4d8; }
            .border-amber-600 { border-color: #d97706; }
            .rounded-xl { border-radius: 0.75rem; }
            .p-4 { padding: 1rem; }
            .p-2 { padding: 0.5rem; }
            .pb-4 { padding-bottom: 1rem; }
            .pb-1 { padding-bottom: 0.25rem; }
            .pt-4 { padding-top: 1rem; }
            .mt-1 { margin-top: 0.25rem; }
            .mt-0\\.5 { margin-top: 0.125rem; }
            .flex { display: flex; }
            .justify-between { justify-content: space-between; }
            .items-start { align-items: flex-start; }
            .grid { display: grid; }
            .grid-cols-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
            .gap-3 { gap: 0.75rem; }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .text-left { text-left: left; }
            .text-xs { font-size: 0.75rem; line-height: 1rem; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .text-\\[10px\\] { font-size: 10px; }
            .text-\\[9px\\] { font-size: 9px; }
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            .font-black { font-weight: 900; }
            .font-sans tabular-nums { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
            .text-zinc-900 { color: #18181b; }
            .text-zinc-800 { color: #27272a; }
            .text-zinc-700 { color: #3f3f46; }
            .text-zinc-500 { color: #71717a; }
            .text-zinc-400 { color: #a1a1aa; }
            .text-amber-700 { color: #b45309; }
            .text-blue-700 { color: #1d4ed8; }
            .text-emerald-700 { color: #047857; }
            .uppercase { text-transform: uppercase; }
            .tracking-wider { letter-spacing: 0.05em; }
            .tracking-widest { letter-spacing: 0.1em; }
            .w-full { width: 100%; }
            .w-1\\/4 { width: 25%; }
            .border-collapse { border-collapse: collapse; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 6px 10px; border: 1px solid #e4e4e7; }
            th { background-color: #f4f4f5; font-weight: 700; }
            @page {
              size: A4;
              margin: 10mm;
            }
          </style>
        </head>
        <body>
          ${reportEl.innerHTML}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 300);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      {/* Printable Report Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .cb-calculator-main-ui, nav, header, footer, sidebar {
            display: none !important;
          }
          #cb-print-report {
            display: block !important;
            visibility: visible !important;
            position: static !important;
            width: 100% !important;
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>

      <div className="cb-calculator-main-ui space-y-6">
        {/* Main Interactive Calculator Card */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm">
          <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Flame className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  Calories Burned Calculator &amp; MET Suite
                </CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1">
                  50+ ACSM MET Physical Activity Database (Duration &amp; Distance Modes)
                </CardDescription>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="self-start sm:self-auto bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Defaults
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 space-y-6">
            {/* Top Controls: Calculation Mode & Unit System */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
              {/* Mode Tabs */}
              <div className="w-full sm:w-auto">
                <Label className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 block">Calculation Mode</Label>
                <div className="grid grid-cols-2 gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setMode("duration")}
                    className={`py-1 px-3 rounded transition-all flex items-center justify-center gap-1.5 ${mode === "duration" ? "bg-amber-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    <Timer className="w-3.5 h-3.5" />
                    By Duration
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("distance")}
                    className={`py-1 px-3 rounded transition-all flex items-center justify-center gap-1.5 ${mode === "distance" ? "bg-amber-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    By Distance
                  </button>
                </div>
              </div>

              {/* Unit System */}
              <div className="w-full sm:w-auto">
                <Label className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 block">Unit System</Label>
                <div className="grid grid-cols-2 gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => handleUnitSystemToggle("imperial")}
                    className={`py-1 px-3 rounded transition-all ${unitSystem === "imperial" ? "bg-blue-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    US Units (lbs/mi)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitSystemToggle("metric")}
                    className={`py-1 px-3 rounded transition-all ${unitSystem === "metric" ? "bg-blue-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    Metric (kg/km)
                  </button>
                </div>
              </div>
            </div>

            {/* Mode-Specific Inputs */}
            {mode === "duration" ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Activity Selector */}
                <div className="sm:col-span-2">
                  <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Physical Activity</Label>
                  <select
                    value={activityId}
                    onChange={(e) => setActivityId(e.target.value)}
                    className="w-full h-9 px-3 text-xs font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {ACTIVITIES_DATABASE.map((act) => (
                      <option key={act.id} value={act.id}>
                        {act.name} (MET {act.met})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Body Weight */}
                <div>
                  <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Body Weight ({unitSystem === "imperial" ? "lbs" : "kg"})</Label>
                  <Input
                    type="number"
                    step={0.1}
                    min={30}
                    max={600}
                    value={unitSystem === "imperial" ? weightLbs : weightKg}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (unitSystem === "imperial") setWeightLbs(val);
                      else setWeightKg(val);
                    }}
                    className="text-xs font-sans tabular-nums font-bold"
                  />
                </div>

                {/* Duration Hours & Minutes */}
                <div className="sm:col-span-3 grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Duration (Hours)</Label>
                    <Input type="number" min={0} max={24} value={durationHours} onChange={(e) => setDurationHours(Number(e.target.value))} className="text-xs font-sans tabular-nums font-bold" />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Duration (Minutes)</Label>
                    <Input type="number" min={0} max={59} value={durationMinutes} onChange={(e) => setDurationMinutes(Number(e.target.value))} className="text-xs font-sans tabular-nums font-bold" />
                  </div>
                </div>
              </div>
            ) : (
              /* Distance Mode Inputs */
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Activity Type</Label>
                  <select
                    value={distanceActivityId}
                    onChange={(e) => setDistanceActivityId(e.target.value)}
                    className="w-full h-9 px-3 text-xs font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md"
                  >
                    <option value="walk-mod">Walking</option>
                    <option value="run-6mph">Running</option>
                    <option value="bike-mod">Bicycling</option>
                  </select>
                </div>

                <div>
                  <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Distance ({unitSystem === "imperial" ? "miles" : "km"})</Label>
                  <Input
                    type="number"
                    step={0.1}
                    min={0.1}
                    max={200}
                    value={unitSystem === "imperial" ? distanceMiles : distanceKm}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (unitSystem === "imperial") setDistanceMiles(val);
                      else setDistanceKm(val);
                    }}
                    className="text-xs font-sans tabular-nums font-bold"
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Body Weight ({unitSystem === "imperial" ? "lbs" : "kg"})</Label>
                  <Input
                    type="number"
                    step={0.1}
                    min={30}
                    max={600}
                    value={unitSystem === "imperial" ? weightLbs : weightKg}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (unitSystem === "imperial") setWeightLbs(val);
                      else setWeightKg(val);
                    }}
                    className="text-xs font-sans tabular-nums font-bold"
                  />
                </div>

                <div className="sm:col-span-3">
                  <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Speed ({unitSystem === "imperial" ? "mph" : "km/h"})</Label>
                  <Input
                    type="number"
                    step={0.1}
                    min={0.5}
                    max={30}
                    value={speedMph}
                    onChange={(e) => setSpeedMph(Number(e.target.value))}
                    className="text-xs font-sans tabular-nums font-bold max-w-xs"
                  />
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleSaveCalculation} className="bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 text-xs gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  Save Calculation
                </Button>

                <Button variant="outline" size="sm" onClick={handleCopySummary} className="bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 text-xs gap-1.5">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
                  {copied ? "Copied!" : "Copy Summary"}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleShare} className="bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 text-xs gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  Share
                </Button>

                <Button variant="outline" size="sm" onClick={handlePrint} className="bg-amber-600 text-white hover:bg-amber-700 border-amber-600 text-xs gap-1.5 shadow-sm">
                  <Printer className="w-3.5 h-3.5" />
                  Print / PDF Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <CaloriesBurnedGauge result={result} />
            <CaloriesBurnedActivityBarChart result={result} />
          </div>

          {/* Result Cards & Method Comparison */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Exercise Energy Expenditure Summary
                </h4>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                  MET {result.met}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Total Calories Burned</span>
                  <strong className="text-xl font-black text-amber-600 dark:text-amber-400 block mt-0.5">{result.caloriesBurned} kcal</strong>
                  <span className="text-[10px] text-zinc-400 block">{result.durationMinutes} mins</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Burn Rate</span>
                  <strong className="text-xl font-black text-blue-600 dark:text-blue-400 block mt-0.5">{result.caloriesPerMinute} kcal/min</strong>
                  <span className="text-[10px] text-zinc-400 block">{result.caloriesPerHour} kcal / hour</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Fat Mass Loss</span>
                  <strong className="text-xl font-black text-emerald-600 dark:text-emerald-400 block mt-0.5">{result.fatMassLossLbs} lbs</strong>
                  <span className="text-[10px] text-zinc-400 block">{result.fatMassLossGrams} grams</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Pizza Slice Equivalent</span>
                  <strong className="text-xl font-black text-purple-600 dark:text-purple-400 block mt-0.5">{result.foodEquivalents.pizzaSlices} Slices</strong>
                  <span className="text-[10px] text-zinc-400 block">~280 kcal/slice</span>
                </div>
              </div>
            </div>

            {/* Auxiliary Tables */}
            <CaloriesBurnedTables result={result} />
          </div>
        </div>
      </div>

      {/* Standalone Printable PDF Report Section */}
      <div id="cb-print-report" className="hidden">
        <div className="p-8 max-w-4xl mx-auto space-y-6 bg-white text-zinc-900 font-sans">
          <div className="border-b-2 border-amber-600 pb-4 flex justify-between items-start">
            <div>
              <div className="text-xs font-black tracking-widest text-amber-700 uppercase">
                CalcPlatform Clinical Sports Physiology &amp; Energetics Lab
              </div>
              <h1 className="text-2xl font-black text-zinc-900 mt-1">
                Clinical Exercise Calorie Expenditure Assessment
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                ACSM Compendium of Physical Activities MET Model Analysis
              </p>
            </div>
            <div className="text-right text-xs text-zinc-500">
              <p className="font-bold text-zinc-800" suppressHydrationWarning>Date: {new Date().toLocaleDateString()}</p>
              <p suppressHydrationWarning>Time: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              <p className="font-sans tabular-nums text-[10px] text-zinc-400 mt-1" suppressHydrationWarning>Ref ID: #CB-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-center">
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Calories Burned</span>
              <strong className="text-xl font-black text-amber-700 block mt-1">{result.caloriesBurned} kcal</strong>
              <span className="text-[9px] text-zinc-500 block">{result.durationMinutes} mins</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Activity MET</span>
              <strong className="text-xl font-black text-blue-700 block mt-1">MET {result.met}</strong>
              <span className="text-[9px] text-zinc-500 block">{result.category}</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Burn Rate</span>
              <strong className="text-xl font-black text-emerald-700 block mt-1">{result.caloriesPerMinute} kcal/min</strong>
              <span className="text-[9px] text-zinc-500 block">{result.caloriesPerHour} kcal/hr</span>
            </div>
            <div className="p-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Fat Mass Loss</span>
              <strong className="text-xl font-black text-purple-700 block mt-1">{result.fatMassLossLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">{result.fatMassLossGrams} grams</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-300 pb-1">
              1. Physical Activity Parameters &amp; MET Energy Breakdown
            </h3>
            <table className="w-full text-xs text-left border border-zinc-200 border-collapse">
              <tbody>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <td className="p-2 font-bold w-1/4">Activity Name:</td>
                  <td className="p-2 w-1/4">{result.activityName}</td>
                  <td className="p-2 font-bold w-1/4">Body Weight:</td>
                  <td className="p-2 w-1/4">{result.weightLbs} lbs ({result.weightKg} kg)</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="p-2 font-bold">Calculation Mode:</td>
                  <td className="p-2">{result.mode.toUpperCase()} MODE</td>
                  <td className="p-2 font-bold">Duration:</td>
                  <td className="p-2">{result.durationMinutes} minutes</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="p-2 font-bold">Food Equivalents:</td>
                  <td className="p-2" colSpan={3}>
                    {result.foodEquivalents.pizzaSlices} slices of pizza | {result.foodEquivalents.bananas} bananas | {result.foodEquivalents.cheeseburgers} cheeseburgers
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t border-zinc-300 pt-4 text-[10px] text-zinc-500 space-y-1">
            <p className="font-bold text-zinc-700">Clinical &amp; Medical Disclaimer:</p>
            <p>
              This report is generated using the Compendium of Physical Activities MET equations. Actual exercise calorie expenditure varies based on individual muscle mass, movement efficiency, and ambient temperature.
            </p>
            <p className="text-zinc-400">© CalcPlatform Clinical Health Lab • All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
