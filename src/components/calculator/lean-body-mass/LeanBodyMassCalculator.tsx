"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Activity,
  Bookmark,
  Share2,
  Printer,
  Copy,
  Check,
  RefreshCw,
  Info,
  Scale,
  Dumbbell,
  Layers,
  HeartPulse,
  Download,
  Trash2,
  RotateCcw,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  calculateLeanBodyMass,
  UnitSystem,
  Gender,
  LeanBodyMassResult,
  LBM_CONSTANTS,
} from "@/lib/formulas/leanBodyMass";

import {
  LeanMassGauge,
  FormulaComparisonBarChart,
} from "./LeanBodyMassCharts";

import { LeanBodyMassTables } from "./LeanBodyMassTables";

interface SavedScenario {
  id: string;
  timestamp: string;
  title: string;
  unitSystem: UnitSystem;
  gender: Gender;
  age: number;
  isChild: boolean;
  heightFeet: number;
  heightInches: number;
  heightCm: number;
  weightLbs: number;
  weightKg: number;
  lbmLbs: number;
  lbmPct: number;
  bodyFatPct: number;
}

export function LeanBodyMassCalculator() {
  // Primary State
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState<number>(30);
  const [isChild, setIsChild] = useState<boolean>(false);

  // Imperial Inputs
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(160);

  // Metric Inputs
  const [heightCm, setHeightCm] = useState<number>(177.8);
  const [weightKg, setWeightKg] = useState<number>(72.6);

  // UI / Tool States
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [showSavedTray, setShowSavedTray] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);

  // Synchronize Age & Age Bracket bidirectionally (Strict Child <= 14, Adult > 14)
  const handleAgeChange = (newAge: number) => {
    setAge(newAge);
    setIsChild(newAge <= 14);
  };

  const handleAgeBracketSelect = (childSelected: boolean) => {
    setIsChild(childSelected);
    if (childSelected && age > 14) {
      setAge(10); // set default pediatric age
    } else if (!childSelected && age <= 14) {
      setAge(30); // set default adult age
    }
  };

  // Reset Defaults (Canonical Baseline: Male, 30 y/o, 5'10", 160 lbs)
  const handleReset = () => {
    setUnitSystem("imperial");
    setGender("male");
    setAge(30);
    setIsChild(false);
    setHeightFeet(5);
    setHeightInches(10);
    setWeightLbs(160);
    setHeightCm(177.8);
    setWeightKg(72.6);
  };

  // Unit System Toggle with NIST conversion
  const handleUnitSystemToggle = (newSys: UnitSystem) => {
    if (newSys === unitSystem) return;
    if (newSys === "metric") {
      const totalInches = heightFeet * 12 + heightInches;
      setHeightCm(parseFloat((totalInches * LBM_CONSTANTS.INCH_TO_CM).toFixed(1)));
      setWeightKg(parseFloat((weightLbs * LBM_CONSTANTS.LB_TO_KG).toFixed(1)));
    } else {
      const totalInches = heightCm * LBM_CONSTANTS.CM_TO_INCH;
      const ft = Math.floor(totalInches / 12);
      const inc = Math.round(totalInches % 12);
      setHeightFeet(ft);
      setHeightInches(inc);
      setWeightLbs(parseFloat((weightKg * LBM_CONSTANTS.KG_TO_LB).toFixed(1)));
    }
    setUnitSystem(newSys);
  };

  // URL Hydration on Mount with Strict Invariant Normalization
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const uParam = params.get("unit");
      if (uParam === "metric" || uParam === "imperial") setUnitSystem(uParam);

      const gParam = params.get("gender");
      if (gParam === "male" || gParam === "female") setGender(gParam);

      const aParam = params.get("age");
      const cParam = params.get("child") || params.get("isChild");

      if (aParam && !isNaN(Number(aParam))) {
        const parsedAge = Number(aParam);
        setAge(parsedAge);
        // STRICT INVARIANT: If age > 14, NEVER allow child/pediatric mode even if child=true in URL
        setIsChild(parsedAge <= 14);
      } else if (cParam !== null) {
        const childVal = cParam === "true" || cParam === "1";
        setIsChild(childVal);
        setAge(childVal ? 10 : 30);
      }

      const wLbParam = params.get("weightLbs");
      if (wLbParam && !isNaN(Number(wLbParam))) setWeightLbs(Number(wLbParam));

      const wKgParam = params.get("weightKg");
      if (wKgParam && !isNaN(Number(wKgParam))) setWeightKg(Number(wKgParam));

      const hFtParam = params.get("ft");
      if (hFtParam && !isNaN(Number(hFtParam))) setHeightFeet(Number(hFtParam));

      const hInParam = params.get("in");
      if (hInParam && !isNaN(Number(hInParam))) setHeightInches(Number(hInParam));

      const hCmParam = params.get("cm");
      if (hCmParam && !isNaN(Number(hCmParam))) setHeightCm(Number(hCmParam));
    } catch {
      // Ignore URL hydration failures
    }
  }, []);

  const totalHeightInchesCombined = heightFeet * 12 + heightInches;

  // Primary Calculation Engine Call
  const result: LeanBodyMassResult = useMemo(() => {
    return calculateLeanBodyMass({
      unitSystem,
      gender,
      isChild,
      age,
      weightLbs,
      weightKg,
      heightInches: totalHeightInchesCombined,
      heightCm,
    });
  }, [unitSystem, gender, isChild, age, weightLbs, weightKg, totalHeightInchesCombined, heightCm]);

  // Save Scenario Handler (Full state snapshot)
  const handleSaveCalculation = () => {
    const newItem: SavedScenario = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: `${gender.toUpperCase()} (${isChild ? "Pediatric ≤14" : `Adult, Age ${age}`}) - ${result.consensusLbmLbs} lbs LBM`,
      unitSystem,
      gender,
      age,
      isChild,
      heightFeet,
      heightInches,
      heightCm,
      weightLbs,
      weightKg,
      lbmLbs: result.consensusLbmLbs,
      lbmPct: result.consensusLbmPercentage,
      bodyFatPct: result.bodyFatPercentage,
    };
    setSavedScenarios((prev) => [newItem, ...prev.slice(0, 9)]);
    setShowSavedTray(true);
  };

  // Restore Scenario Handler
  const handleRestoreScenario = (sc: SavedScenario) => {
    setUnitSystem(sc.unitSystem);
    setGender(sc.gender);
    setAge(sc.age);
    setIsChild(sc.isChild);
    setHeightFeet(sc.heightFeet);
    setHeightInches(sc.heightInches);
    setHeightCm(sc.heightCm);
    setWeightLbs(sc.weightLbs);
    setWeightKg(sc.weightKg);
  };

  const handleDeleteScenario = (id: string) => {
    setSavedScenarios((prev) => prev.filter((s) => s.id !== id));
  };

  // Copy Summary to Clipboard
  const handleCopySummary = () => {
    const summary = `Clinical Lean Body Mass Assessment Report (${new Date().toLocaleDateString()})
Subject: ${gender.toUpperCase()} (${isChild ? "Child ≤14 y/o" : `Adult, Age ${age}`})
Body Weight: ${unitSystem === "imperial" ? `${weightLbs} lbs` : `${weightKg} kg`}
Height: ${unitSystem === "imperial" ? `${heightFeet}'${heightInches}"` : `${heightCm} cm`}
BMI: ${result.bmi}
Consensus Lean Body Mass: ${result.consensusLbmLbs} lbs (${result.consensusLbmKg} kg)
Lean Mass Percentage: ${result.consensusLbmPercentage}%
Fat Mass: ${result.fatMassLbs} lbs (${result.fatMassKg} kg)
Estimated Body Fat: ${result.bodyFatPercentage}%
Fat-Free Mass (FFM): ${result.fatFreeMassLbs} lbs (${result.fatFreeMassKg} kg)
Essential Fat Component: ${result.essentialFatLbs} lbs (${result.essentialFatKg} kg)
Methodology: ${isChild ? "Peters Pediatric Model (2011)" : "Consensus Mean of Boer (1984), James (1976), Hume (1966) & Janmahasatian (2005)"}
Calculated via CalcPlatform Clinical Health Engine`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Share URL with serialized calculation parameters
  const handleShare = async () => {
    const params = new URLSearchParams();
    params.set("unit", unitSystem);
    params.set("gender", gender);
    params.set("age", age.toString());
    params.set("isChild", isChild.toString());
    if (unitSystem === "imperial") {
      params.set("weightLbs", weightLbs.toString());
      params.set("ft", heightFeet.toString());
      params.set("in", heightInches.toString());
    } else {
      params.set("weightKg", weightKg.toString());
      params.set("cm", heightCm.toString());
    }

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Lean Body Mass Assessment",
          text: `My calculated Lean Body Mass is ${result.consensusLbmLbs} lbs (${result.consensusLbmPercentage}% of weight).`,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(shareUrl);
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  };

  // Export CSV Handler (RFC-4180 Compliant)
  const handleExportCsv = () => {
    const headers = [
      "Timestamp",
      "Gender",
      "Age",
      "AgeBracket",
      "UnitSystem",
      "WeightLbs",
      "WeightKg",
      "HeightInches",
      "HeightCm",
      "BMI",
      "ConsensusLbmLbs",
      "ConsensusLbmKg",
      "ConsensusLbmPct",
      "FatMassLbs",
      "FatMassKg",
      "BodyFatPct",
      "FatFreeMassLbs",
      "EssentialFatLbs",
    ];

    const row = [
      new Date().toISOString(),
      gender,
      age,
      isChild ? "Child" : "Adult",
      unitSystem,
      unitSystem === "imperial" ? weightLbs : (weightKg * LBM_CONSTANTS.KG_TO_LB).toFixed(1),
      unitSystem === "imperial" ? (weightLbs * LBM_CONSTANTS.LB_TO_KG).toFixed(1) : weightKg,
      totalHeightInchesCombined,
      heightCm,
      result.bmi,
      result.consensusLbmLbs,
      result.consensusLbmKg,
      result.consensusLbmPercentage,
      result.fatMassLbs,
      result.fatMassKg,
      result.bodyFatPercentage,
      result.fatFreeMassLbs,
      result.essentialFatLbs,
    ];

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), row.join(",")].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `lbm_assessment_${gender}_age${age}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Native Print Execution (No popup blocker)
  const handlePrint = () => {
    window.print();
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
          .lbm-calculator-main-ui, nav, header, footer, sidebar, .no-print {
            display: none !important;
          }
          #lbm-print-report {
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

      <div className="lbm-calculator-main-ui space-y-6">
        {/* Main Interactive Calculator Card */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm">
          <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Lean Body Mass Calculator &amp; Clinical Suite
                </CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1">
                  Boer, James, Hume, Janmahasatian &amp; Peters Pediatric Equations
                </CardDescription>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="self-start sm:self-auto bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Defaults
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 space-y-6">
            {/* Top Control Bar: Unit System, Gender, & Age Bracket */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
              {/* Unit System */}
              <div>
                <Label className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 block">
                  Unit System
                </Label>
                <div className="grid grid-cols-2 gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => handleUnitSystemToggle("imperial")}
                    className={`py-1 rounded transition-all cursor-pointer ${
                      unitSystem === "imperial" ? "bg-blue-600 text-white" : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    US Units (lbs/ft)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitSystemToggle("metric")}
                    className={`py-1 rounded transition-all cursor-pointer ${
                      unitSystem === "metric" ? "bg-blue-600 text-white" : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    Metric (kg/cm)
                  </button>
                </div>
              </div>

              {/* Gender */}
              <div>
                <Label className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 block">
                  Biological Sex
                </Label>
                <div className="grid grid-cols-2 gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`py-1 rounded transition-all cursor-pointer ${
                      gender === "male" ? "bg-blue-600 text-white" : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`py-1 rounded transition-all cursor-pointer ${
                      gender === "female" ? "bg-purple-600 text-white" : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Age Bracket (Strictly synchronized with Age) */}
              <div>
                <Label className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 block">
                  Age Bracket
                </Label>
                <div className="grid grid-cols-2 gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => handleAgeBracketSelect(false)}
                    className={`py-1 rounded transition-all cursor-pointer ${
                      !isChild ? "bg-emerald-600 text-white" : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    Adult (&gt;14 y/o)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAgeBracketSelect(true)}
                    className={`py-1 rounded transition-all cursor-pointer ${
                      isChild ? "bg-amber-600 text-white" : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    Child (≤14 y/o)
                  </button>
                </div>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Age */}
              <div>
                <Label htmlFor="lbm-age" className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">
                  Age (years) {isChild ? <span className="text-amber-600 dark:text-amber-400 font-normal">(Pediatric ≤14)</span> : <span className="text-emerald-600 dark:text-emerald-400 font-normal">(Adult &gt;14)</span>}
                </Label>
                <Input
                  id="lbm-age"
                  type="number"
                  min={1}
                  max={110}
                  value={age}
                  onChange={(e) => handleAgeChange(Math.max(1, Math.min(110, Number(e.target.value) || 1)))}
                  className="text-xs font-sans tabular-nums font-bold"
                />
              </div>

              {/* Height */}
              <div>
                <Label htmlFor={unitSystem === "imperial" ? "lbm-height-ft" : "lbm-height-cm"} className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">
                  Height {unitSystem === "imperial" ? "(ft / in)" : "(cm)"}
                </Label>
                {unitSystem === "imperial" ? (
                  <div className="grid grid-cols-2 gap-1.5">
                    <Input
                      id="lbm-height-ft"
                      type="number"
                      min={2}
                      max={8}
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(Number(e.target.value))}
                      placeholder="ft"
                      aria-label="Height feet"
                      className="text-xs font-sans tabular-nums font-bold"
                    />
                    <Input
                      id="lbm-height-in"
                      type="number"
                      min={0}
                      max={11}
                      value={heightInches}
                      onChange={(e) => setHeightInches(Number(e.target.value))}
                      placeholder="in"
                      aria-label="Height inches"
                      className="text-xs font-sans tabular-nums font-bold"
                    />
                  </div>
                ) : (
                  <Input
                    id="lbm-height-cm"
                    type="number"
                    step={0.1}
                    min={40}
                    max={250}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="text-xs font-sans tabular-nums font-bold"
                  />
                )}
              </div>

              {/* Weight */}
              <div>
                <Label htmlFor="lbm-weight" className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">
                  Body Weight ({unitSystem === "imperial" ? "lbs" : "kg"})
                </Label>
                <Input
                  id="lbm-weight"
                  type="number"
                  step={0.1}
                  min={5}
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
            </div>

            {/* Action Bar (Full Clinical Tool Suite) */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveCalculation}
                  className="text-xs gap-1.5 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Save Scenario {savedScenarios.length > 0 ? `(${savedScenarios.length})` : ""}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopySummary}
                  className="text-xs gap-1.5 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied Report!" : "Copy Summary"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="text-xs gap-1.5 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 cursor-pointer"
                >
                  {shared ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  {shared ? "Link Copied!" : "Share URL"}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportCsv}
                  className="text-xs gap-1.5 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Export CSV
                </Button>

                <Button
                  variant="default"
                  size="sm"
                  onClick={handlePrint}
                  className="text-xs gap-1.5 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / PDF Report
                </Button>
              </div>
            </div>

            {/* Saved Scenarios Tray (With full restore & delete) */}
            {savedScenarios.length > 0 && showSavedTray && (
              <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2 mt-3">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  <span>Saved Clinical Scenarios ({savedScenarios.length}/10)</span>
                  <button
                    type="button"
                    onClick={() => setShowSavedTray(false)}
                    className="text-[11px] text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
                  >
                    Hide Tray
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {savedScenarios.map((sc) => (
                    <div
                      key={sc.id}
                      className="p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-zinc-900 dark:text-zinc-100 truncate">{sc.title}</div>
                        <div className="text-[10px] text-zinc-500">
                          {sc.unitSystem === "imperial" ? `${sc.weightLbs} lbs` : `${sc.weightKg} kg`} • LBM: {sc.lbmLbs} lbs ({sc.lbmPct}%) • {sc.timestamp}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRestoreScenario(sc)}
                          className="h-7 px-2 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 cursor-pointer"
                          title="Restore scenario"
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Load
                        </Button>
                        <button
                          type="button"
                          onClick={() => handleDeleteScenario(sc.id)}
                          className="p-1 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete scenario"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
            <LeanMassGauge result={result} />
            <FormulaComparisonBarChart result={result} />
          </div>

          {/* Result Cards & Method Comparison */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                    {isChild ? "Peters Pediatric Body Composition" : "Consensus Body Composition Summary"}
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {isChild
                      ? "Calculated using Peters (2011) pediatric extracellular volume model"
                      : "Arithmetic mean of Boer, James, Hume & Janmahasatian adult equations"}
                  </p>
                </div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800 font-sans tabular-nums">
                  BMI: {result.bmi}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Lean Body Mass</span>
                  <strong className="text-xl font-black text-blue-600 dark:text-blue-400 block mt-0.5 font-sans tabular-nums">
                    {result.consensusLbmLbs} lbs
                  </strong>
                  <span className="text-[10px] text-zinc-400 block font-sans tabular-nums">
                    {result.consensusLbmKg} kg ({result.consensusLbmPercentage}%)
                  </span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Fat Mass</span>
                  <strong className="text-xl font-black text-rose-600 dark:text-rose-400 block mt-0.5 font-sans tabular-nums">
                    {result.fatMassLbs} lbs
                  </strong>
                  <span className="text-[10px] text-zinc-400 block font-sans tabular-nums">
                    {result.fatMassKg} kg ({result.bodyFatPercentage}% BF)
                  </span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Fat-Free Mass (FFM)</span>
                  <strong className="text-xl font-black text-purple-600 dark:text-purple-400 block mt-0.5 font-sans tabular-nums">
                    {result.fatFreeMassLbs} lbs
                  </strong>
                  <span className="text-[10px] text-zinc-400 block font-sans tabular-nums">
                    {result.fatFreeMassKg} kg (2-compartment)
                  </span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Essential Fat Offset</span>
                  <strong className="text-xl font-black text-emerald-600 dark:text-emerald-400 block mt-0.5 font-sans tabular-nums">
                    {result.essentialFatLbs} lbs
                  </strong>
                  <span className="text-[10px] text-zinc-400 block">
                    {gender === "male" ? "~3% Male" : "~9% Female"}
                  </span>
                </div>
              </div>
            </div>

            {/* Auxiliary Tables */}
            <LeanBodyMassTables result={result} gender={gender} unitSystem={unitSystem} />
          </div>
        </div>
      </div>

      {/* Standalone Printable PDF Report Section */}
      <div id="lbm-print-report" className="hidden">
        <div className="p-8 max-w-4xl mx-auto space-y-6 bg-white text-zinc-900 font-sans">
          <div className="border-b-2 border-blue-600 pb-4 flex justify-between items-start">
            <div>
              <div className="text-xs font-black tracking-widest text-blue-700 uppercase">
                CalcPlatform Clinical Human Physiology &amp; Pharmacokinetics Lab
              </div>
              <h2 className="text-2xl font-black text-blue-600 mt-1">
                Clinical Lean Body Mass &amp; Body Composition Assessment
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                {isChild
                  ? "Peters Pediatric Model Analysis (Ages ≤14)"
                  : "Boer, James, Hume & Janmahasatian Adult Clinical Analysis"}
              </p>
            </div>
            <div className="text-right text-xs text-zinc-500">
              <p className="font-bold text-zinc-800" suppressHydrationWarning>Date: {new Date().toLocaleDateString()}</p>
              <p suppressHydrationWarning>Time: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              <p className="font-sans tabular-nums text-[10px] text-zinc-400 mt-1" suppressHydrationWarning>Ref ID: #LBM-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-center">
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Consensus LBM</span>
              <strong className="text-xl font-black text-blue-700 block mt-1 font-sans tabular-nums">{result.consensusLbmLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block font-sans tabular-nums">{result.consensusLbmPercentage}% of total</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Fat Mass</span>
              <strong className="text-xl font-black text-rose-700 block mt-1 font-sans tabular-nums">{result.fatMassLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block font-sans tabular-nums">{result.bodyFatPercentage}% Body Fat</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Fat Free Mass</span>
              <strong className="text-xl font-black text-purple-700 block mt-1 font-sans tabular-nums">{result.fatFreeMassLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block font-sans tabular-nums">{result.fatFreeMassKg} kg</span>
            </div>
            <div className="p-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Primary Formula</span>
              <strong className="text-xl font-black text-emerald-700 block mt-1 font-sans tabular-nums">
                {result.formulaResults[0]?.lbmLbs || result.consensusLbmLbs} lbs
              </strong>
              <span className="text-[9px] text-zinc-500 block">{result.formulaResults[0]?.formulaName || "Clinical"}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-zinc-300 pb-1">
              1. Anthropometric Parameters &amp; Clinical Formula Breakdown
            </h3>
            <table className="w-full text-xs text-left border border-zinc-200 border-collapse">
              <tbody>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <td className="p-2 font-bold w-1/4">Gender / Category:</td>
                  <td className="p-2 w-1/4">{gender.toUpperCase()} / {isChild ? "Child (≤14)" : `Adult (${age} y/o)`}</td>
                  <td className="p-2 font-bold w-1/4">{result.formulaResults[0]?.formulaName || "Boer LBM"}:</td>
                  <td className="p-2 w-1/4 font-sans tabular-nums">{result.formulaResults[0]?.lbmLbs || result.consensusLbmLbs} lbs</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="p-2 font-bold">Body Weight:</td>
                  <td className="p-2 font-sans tabular-nums">{unitSystem === "imperial" ? `${weightLbs} lbs` : `${weightKg} kg`}</td>
                  <td className="p-2 font-bold">{result.formulaResults[1]?.formulaName || "James LBM"}:</td>
                  <td className="p-2 font-sans tabular-nums">{result.formulaResults[1]?.lbmLbs ? `${result.formulaResults[1].lbmLbs} lbs` : "N/A"}</td>
                </tr>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <td className="p-2 font-bold">Body Height:</td>
                  <td className="p-2 font-sans tabular-nums">{unitSystem === "imperial" ? `${heightFeet}'${heightInches}"` : `${heightCm} cm`}</td>
                  <td className="p-2 font-bold">{result.formulaResults[2]?.formulaName || "Hume LBM"}:</td>
                  <td className="p-2 font-sans tabular-nums">{result.formulaResults[2]?.lbmLbs ? `${result.formulaResults[2].lbmLbs} lbs` : "N/A"}</td>
                </tr>
                {!isChild && result.formulaResults[3] && (
                  <tr>
                    <td className="p-2 font-bold">Calculated BMI:</td>
                    <td className="p-2 font-sans tabular-nums">{result.bmi}</td>
                    <td className="p-2 font-bold">{result.formulaResults[3].formulaName}:</td>
                    <td className="p-2 font-sans tabular-nums">{result.formulaResults[3].lbmLbs} lbs</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-zinc-300 pt-4 text-[10px] text-zinc-500 space-y-1">
            <p className="font-bold text-zinc-700">Clinical &amp; Medical Disclaimer:</p>
            <p>
              This report is generated using clinical anthropometric formulas (Boer, James, Hume, Janmahasatian, and Peters). For critical pharmaceutical dosage calibration or medical evaluations, consult a licensed healthcare professional or DEXA scan specialist.
            </p>
            <p className="text-zinc-400">© CalcPlatform Clinical Health Lab • All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
