"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Flame,
  Bookmark,
  Share2,
  Printer,
  Copy,
  Check,
  RefreshCw,
  Download,
  Trash2,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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

interface SavedScenario {
  id: string;
  timestamp: string;
  title: string;
  mode: "duration" | "distance";
  unitSystem: UnitSystem;
  activityId: string;
  distanceActivityId: string;
  durationHours: number;
  durationMinutes: number;
  distanceMiles: number;
  distanceKm: number;
  speedMph: number;
  speedKmh: number;
  weightLbs: number;
  weightKg: number;
  caloriesBurned: number;
  met: number;
}

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
  const [speedKmh, setSpeedKmh] = useState<number>(9.7);

  // Weight inputs
  const [weightLbs, setWeightLbs] = useState<number>(160);
  const [weightKg, setWeightKg] = useState<number>(72.6);

  // Saved scenarios & action feedbacks
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Hydrate state from URL query parameters on initial client mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const qMode = params.get("mode");
      const qUnit = params.get("unit");
      const qAct = params.get("activity");
      const qWeight = params.get("weight");
      const qHours = params.get("hours");
      const qMins = params.get("mins");
      const qDist = params.get("dist");
      const qSpeed = params.get("speed");

      if (qMode === "distance" || qMode === "duration") setMode(qMode);
      if (qUnit === "metric" || qUnit === "imperial") setUnitSystem(qUnit);

      if (qAct && ACTIVITIES_DATABASE.some((a) => a.id === qAct)) {
        if (qMode === "distance") setDistanceActivityId(qAct);
        else setActivityId(qAct);
      }

      if (qWeight && !isNaN(Number(qWeight))) {
        const numW = Number(qWeight);
        if (qUnit === "metric") {
          setWeightKg(numW);
          setWeightLbs(parseFloat((numW * 2.20462262).toFixed(1)));
        } else {
          setWeightLbs(numW);
          setWeightKg(parseFloat((numW / 2.20462262).toFixed(1)));
        }
      }

      if (qHours && !isNaN(Number(qHours))) setDurationHours(Math.max(0, Number(qHours)));
      if (qMins && !isNaN(Number(qMins))) setDurationMinutes(Math.max(0, Number(qMins)));

      if (qDist && !isNaN(Number(qDist))) {
        const numD = Number(qDist);
        if (qUnit === "metric") {
          setDistanceKm(numD);
          setDistanceMiles(parseFloat((numD / 1.609344).toFixed(1)));
        } else {
          setDistanceMiles(numD);
          setDistanceKm(parseFloat((numD * 1.609344).toFixed(1)));
        }
      }

      if (qSpeed && !isNaN(Number(qSpeed))) {
        const numS = Number(qSpeed);
        if (qUnit === "metric") {
          setSpeedKmh(numS);
          setSpeedMph(parseFloat((numS / 1.609344).toFixed(1)));
        } else {
          setSpeedMph(numS);
          setSpeedKmh(parseFloat((numS * 1.609344).toFixed(1)));
        }
      }
    } catch {
      // Fail safe on malformed URL parameters
    }
  }, []);

  // Canonical baseline reset
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
    setSpeedKmh(9.7);
    setWeightLbs(160);
    setWeightKg(72.6);
  };

  // True unit system conversion with mathematical scaling
  const handleUnitSystemToggle = (newSys: UnitSystem) => {
    if (newSys === unitSystem) return;
    if (newSys === "metric") {
      setWeightKg(parseFloat((weightLbs / 2.20462262).toFixed(1)));
      setDistanceKm(parseFloat((distanceMiles * 1.609344).toFixed(1)));
      setSpeedKmh(parseFloat((speedMph * 1.609344).toFixed(1)));
    } else {
      setWeightLbs(parseFloat((weightKg * 2.20462262).toFixed(1)));
      setDistanceMiles(parseFloat((distanceKm / 1.609344).toFixed(1)));
      setSpeedMph(parseFloat((speedKmh / 1.609344).toFixed(1)));
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
      speedKmh,
      weightLbs,
      weightKg,
    });
  }, [
    mode,
    unitSystem,
    activityId,
    distanceActivityId,
    totalDurationMinutesCombined,
    distanceMiles,
    distanceKm,
    speedMph,
    speedKmh,
    weightLbs,
    weightKg,
  ]);

  // Save Full Calculation Scenario
  const handleSaveCalculation = () => {
    const newScenario: SavedScenario = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: `${result.activityName} (${result.caloriesBurned} kcal)`,
      mode,
      unitSystem,
      activityId,
      durationHours,
      durationMinutes,
      distanceActivityId,
      distanceMiles,
      distanceKm,
      speedMph,
      speedKmh,
      weightLbs,
      weightKg,
      caloriesBurned: result.caloriesBurned,
      met: result.met,
    };
    setSavedScenarios((prev) => [newScenario, ...prev.slice(0, 9)]);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Restore Saved Scenario
  const handleRestoreScenario = (sc: SavedScenario) => {
    setMode(sc.mode);
    setUnitSystem(sc.unitSystem);
    setActivityId(sc.activityId);
    setDurationHours(sc.durationHours);
    setDurationMinutes(sc.durationMinutes);
    setDistanceActivityId(sc.distanceActivityId);
    setDistanceMiles(sc.distanceMiles);
    setDistanceKm(sc.distanceKm);
    setSpeedMph(sc.speedMph);
    setSpeedKmh(sc.speedKmh);
    setWeightLbs(sc.weightLbs);
    setWeightKg(sc.weightKg);
  };

  const handleDeleteScenario = (id: string) => {
    setSavedScenarios((prev) => prev.filter((s) => s.id !== id));
  };

  // Copy Clean Text Summary
  const handleCopySummary = () => {
    const summary = `Exercise Calorie Burn Assessment Report (${new Date().toLocaleDateString()})
Activity: ${result.activityName} (MET ${result.met})
Mode: ${result.mode.toUpperCase()}
Duration: ${result.durationMinutes} minutes
Body Weight: ${result.weightLbs} lbs (${result.weightKg} kg)
Total Calories Burned: ${result.caloriesBurned} kcal
Burn Rate: ${result.caloriesPerMinute} kcal/min (${result.caloriesPerHour} kcal/hour)
Fat-Equivalent Energy: ${result.fatMassLossLbs} lbs (${result.fatMassLossGrams} g)
Food Equivalent: ${result.foodEquivalents.pizzaSlices} slices of pepperoni pizza (~280 kcal/slice)
Disclaimer: MET calculations represent population-level bioenergetic estimates.
Calculated via CalcPlatform Exercise Energetics Lab`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // True State Serialization Share URL
  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set("mode", mode);
    url.searchParams.set("unit", unitSystem);
    url.searchParams.set("activity", mode === "duration" ? activityId : distanceActivityId);
    url.searchParams.set("weight", unitSystem === "imperial" ? weightLbs.toString() : weightKg.toString());

    if (mode === "duration") {
      url.searchParams.set("hours", durationHours.toString());
      url.searchParams.set("mins", durationMinutes.toString());
    } else {
      url.searchParams.set("dist", unitSystem === "imperial" ? distanceMiles.toString() : distanceKm.toString());
      url.searchParams.set("speed", unitSystem === "imperial" ? speedMph.toString() : speedKmh.toString());
    }

    const shareUrl = url.toString();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Calories Burned Assessment",
          text: `I burned ${result.caloriesBurned} kcal doing ${result.activityName}! Check your workout calorie expenditure:`,
          url: shareUrl,
        });
      } catch {
        navigator.clipboard.writeText(shareUrl);
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  // RFC-Compliant CSV Export
  const handleExportCsv = () => {
    const headers = [
      "Activity Name",
      "Category",
      "MET Value",
      "Body Weight (lbs)",
      "Body Weight (kg)",
      "Calculation Mode",
      "Duration (mins)",
      "Distance (miles)",
      "Speed (mph)",
      "Calories Burned (kcal)",
      "Calories Per Minute (kcal/min)",
      "Calories Per Hour (kcal/hr)",
      "Fat Mass Equivalent (lbs)",
      "Fat Mass Equivalent (grams)",
      "Pizza Slices Equivalent",
      "Bananas Equivalent",
    ];

    const values = [
      `"${result.activityName.replace(/"/g, '""')}"`,
      `"${result.category}"`,
      result.met,
      result.weightLbs,
      result.weightKg,
      `"${result.mode.toUpperCase()}"`,
      result.durationMinutes,
      mode === "distance" ? distanceMiles : "N/A",
      mode === "distance" ? speedMph : "N/A",
      result.caloriesBurned,
      result.caloriesPerMinute,
      result.caloriesPerHour,
      result.fatMassLossLbs,
      result.fatMassLossGrams,
      result.foodEquivalents.pizzaSlices,
      result.foodEquivalents.bananas,
    ];

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), values.join(",")].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `calories_burned_${result.activityName.toLowerCase().replace(/[^a-z0-9]/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dedicated direct print handler without popup blocker reliance
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* High-Fidelity Print Engine Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .cb-calculator-main-ui, nav, header, footer, sidebar, .no-print {
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
                  50+ Compendium MET Physical Activity Database (Duration &amp; Distance Modes)
                </CardDescription>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="text-xs font-semibold self-start sm:self-auto cursor-pointer"
                title="Reset to default baseline"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                Reset Defaults
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-5 space-y-5">
            {/* Mode & Unit System Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <Label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Calculation Mode
                </Label>
                <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setMode("duration")}
                    className={`flex-1 py-1.5 px-3 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      mode === "duration"
                        ? "bg-amber-600 text-white shadow-xs"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    By Duration
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("distance")}
                    className={`flex-1 py-1.5 px-3 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      mode === "distance"
                        ? "bg-amber-600 text-white shadow-xs"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    By Distance
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Unit System
                </Label>
                <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => handleUnitSystemToggle("imperial")}
                    className={`flex-1 py-1.5 px-3 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      unitSystem === "imperial"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    US Units (lbs/mi)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitSystemToggle("metric")}
                    className={`flex-1 py-1.5 px-3 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      unitSystem === "metric"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    Metric (kg/km)
                  </button>
                </div>
              </div>
            </div>

            {/* Input Fields */}
            {mode === "duration" ? (
              /* Duration Mode Inputs */
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="cb-activity-select" className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">
                    Physical Activity (50+ Database)
                  </Label>
                  <select
                    id="cb-activity-select"
                    value={activityId}
                    onChange={(e) => setActivityId(e.target.value)}
                    className="w-full h-9 px-3 text-xs font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    {ACTIVITIES_DATABASE.map((act) => (
                      <option key={act.id} value={act.id}>
                        {act.name} (MET {act.met})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="cb-weight-input" className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">
                    Body Weight ({unitSystem === "imperial" ? "lbs" : "kg"})
                  </Label>
                  <Input
                    id="cb-weight-input"
                    type="number"
                    step={0.1}
                    min={20}
                    max={600}
                    value={unitSystem === "imperial" ? weightLbs : weightKg}
                    onChange={(e) => {
                      const val = Math.max(0, Number(e.target.value));
                      if (unitSystem === "imperial") {
                        setWeightLbs(val);
                        setWeightKg(parseFloat((val / 2.20462262).toFixed(1)));
                      } else {
                        setWeightKg(val);
                        setWeightLbs(parseFloat((val * 2.20462262).toFixed(1)));
                      }
                    }}
                    className="text-xs font-sans tabular-nums font-bold"
                  />
                </div>

                <div className="sm:col-span-3 grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cb-duration-hours" className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">
                      Duration (Hours)
                    </Label>
                    <Input
                      id="cb-duration-hours"
                      type="number"
                      min={0}
                      max={24}
                      value={durationHours}
                      onChange={(e) => setDurationHours(Math.max(0, Number(e.target.value)))}
                      className="text-xs font-sans tabular-nums font-bold"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cb-duration-minutes" className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">
                      Duration (Minutes)
                    </Label>
                    <Input
                      id="cb-duration-minutes"
                      type="number"
                      min={0}
                      max={59}
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(Math.max(0, Number(e.target.value)))}
                      className="text-xs font-sans tabular-nums font-bold"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Distance Mode Inputs */
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cb-distance-activity-select" className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">
                    Activity Type
                  </Label>
                  <select
                    id="cb-distance-activity-select"
                    value={distanceActivityId}
                    onChange={(e) => setDistanceActivityId(e.target.value)}
                    className="w-full h-9 px-3 text-xs font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="walk-mod">Walking (General)</option>
                    <option value="run-6mph">Running (General)</option>
                    <option value="bike-mod">Cycling / Biking</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="cb-distance-input" className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">
                    Distance ({unitSystem === "imperial" ? "miles" : "km"})
                  </Label>
                  <Input
                    id="cb-distance-input"
                    type="number"
                    step={0.1}
                    min={0.1}
                    max={300}
                    value={unitSystem === "imperial" ? distanceMiles : distanceKm}
                    onChange={(e) => {
                      const val = Math.max(0.1, Number(e.target.value));
                      if (unitSystem === "imperial") {
                        setDistanceMiles(val);
                        setDistanceKm(parseFloat((val * 1.609344).toFixed(1)));
                      } else {
                        setDistanceKm(val);
                        setDistanceMiles(parseFloat((val / 1.609344).toFixed(1)));
                      }
                    }}
                    className="text-xs font-sans tabular-nums font-bold"
                  />
                </div>

                <div>
                  <Label htmlFor="cb-dist-weight-input" className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">
                    Body Weight ({unitSystem === "imperial" ? "lbs" : "kg"})
                  </Label>
                  <Input
                    id="cb-dist-weight-input"
                    type="number"
                    step={0.1}
                    min={20}
                    max={600}
                    value={unitSystem === "imperial" ? weightLbs : weightKg}
                    onChange={(e) => {
                      const val = Math.max(0, Number(e.target.value));
                      if (unitSystem === "imperial") {
                        setWeightLbs(val);
                        setWeightKg(parseFloat((val / 2.20462262).toFixed(1)));
                      } else {
                        setWeightKg(val);
                        setWeightLbs(parseFloat((val * 2.20462262).toFixed(1)));
                      }
                    }}
                    className="text-xs font-sans tabular-nums font-bold"
                  />
                </div>

                <div className="sm:col-span-3">
                  <Label htmlFor="cb-speed-input" className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">
                    Speed ({unitSystem === "imperial" ? "mph" : "km/h"})
                  </Label>
                  <Input
                    id="cb-speed-input"
                    type="number"
                    step={0.1}
                    min={0.5}
                    max={50}
                    value={unitSystem === "imperial" ? speedMph : speedKmh}
                    onChange={(e) => {
                      const val = Math.max(0.5, Number(e.target.value));
                      if (unitSystem === "imperial") {
                        setSpeedMph(val);
                        setSpeedKmh(parseFloat((val * 1.609344).toFixed(1)));
                      } else {
                        setSpeedKmh(val);
                        setSpeedMph(parseFloat((val / 1.609344).toFixed(1)));
                      }
                    }}
                    className="text-xs font-sans tabular-nums font-bold max-w-xs"
                  />
                </div>
              </div>
            )}

            {/* ACTION BAR (FULLY RESTORED & WIRED) */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSaveCalculation}
                  className="text-xs font-semibold cursor-pointer"
                  title="Save this calculation scenario"
                >
                  <Bookmark className={`w-3.5 h-3.5 mr-1.5 ${savedSuccess ? "text-emerald-600" : ""}`} />
                  {savedSuccess ? "Saved!" : "Save Scenario"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopySummary}
                  className="text-xs font-semibold cursor-pointer"
                  title="Copy formatted summary to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
                  {copied ? "Copied!" : "Copy Summary"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="text-xs font-semibold cursor-pointer"
                  title="Share link with preserved calculation parameters"
                >
                  <Share2 className="w-3.5 h-3.5 mr-1.5" />
                  {shared ? "Link Copied!" : "Share"}
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleExportCsv}
                  className="text-xs font-semibold cursor-pointer"
                  title="Download CSV spreadsheet"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
                  Export CSV
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="text-xs font-semibold cursor-pointer"
                  title="Print clinical assessment report"
                >
                  <Printer className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                  Print / PDF
                </Button>
              </div>
            </div>

            {/* Saved Scenarios Drawer / Pills */}
            {savedScenarios.length > 0 && (
              <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
                  Saved Scenarios ({savedScenarios.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {savedScenarios.map((sc) => (
                    <div
                      key={sc.id}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs"
                    >
                      <button
                        type="button"
                        onClick={() => handleRestoreScenario(sc)}
                        className="font-semibold text-zinc-800 dark:text-zinc-200 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer flex items-center gap-1"
                        title="Click to restore this calculation"
                      >
                        <span>{sc.title}</span>
                        <ChevronRight className="w-3 h-3 text-zinc-400" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteScenario(sc.id)}
                        className="text-zinc-400 hover:text-rose-600 cursor-pointer ml-1"
                        title="Delete saved scenario"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                  <strong className="text-xl font-black text-amber-600 dark:text-amber-400 block mt-0.5 font-sans tabular-nums">
                    {result.caloriesBurned} kcal
                  </strong>
                  <span className="text-[10px] text-zinc-400 block font-sans tabular-nums">{result.durationMinutes} mins</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Burn Rate</span>
                  <strong className="text-xl font-black text-blue-600 dark:text-blue-400 block mt-0.5 font-sans tabular-nums">
                    {result.caloriesPerMinute} kcal/min
                  </strong>
                  <span className="text-[10px] text-zinc-400 block font-sans tabular-nums">{result.caloriesPerHour} kcal / hour</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Fat-Equivalent Energy</span>
                  <strong className="text-xl font-black text-emerald-600 dark:text-emerald-400 block mt-0.5 font-sans tabular-nums">
                    {result.fatMassLossLbs} lbs
                  </strong>
                  <span className="text-[10px] text-zinc-400 block font-sans tabular-nums">{result.fatMassLossGrams} grams</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Pizza Slice Equivalent</span>
                  <strong className="text-xl font-black text-purple-600 dark:text-purple-400 block mt-0.5 font-sans tabular-nums">
                    {result.foodEquivalents.pizzaSlices} Slices
                  </strong>
                  <span className="text-[10px] text-zinc-400 block">~280 kcal/slice</span>
                </div>
              </div>
            </div>

            {/* Auxiliary Tables (Dynamic 1-Hr Matrix + Searchable 50+ DB) */}
            <CaloriesBurnedTables result={result} />
          </div>
        </div>
      </div>

      {/* Standalone Printable PDF Report Section (Single H1 compliance: uses H2) */}
      <div id="cb-print-report" className="hidden">
        <div className="p-8 max-w-4xl mx-auto space-y-6 bg-white text-zinc-900 font-sans">
          <div className="border-b-2 border-amber-600 pb-4 flex justify-between items-start">
            <div>
              <div className="text-xs font-black tracking-widest text-amber-700 uppercase">
                CalcPlatform Clinical Sports Physiology &amp; Energetics Lab
              </div>
              <h2 className="text-2xl font-black text-blue-600 mt-1">
                Clinical Exercise Calorie Expenditure Assessment
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Physical Activity MET Model Analysis
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
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Fat Equivalent</span>
              <strong className="text-xl font-black text-purple-700 block mt-1">{result.fatMassLossLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">{result.fatMassLossGrams} grams</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-zinc-300 pb-1">
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
              This report is generated using standard MET bioenergetic equations. Actual exercise calorie expenditure varies based on individual muscle mass, movement efficiency, elevation, and ambient temperature.
            </p>
            <p className="text-zinc-400">© CalcPlatform Clinical Health Lab • All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaloriesBurnedCalculator;
