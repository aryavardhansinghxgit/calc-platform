"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  HeartPulse,
  Bookmark,
  Share2,
  Printer,
  Copy,
  Check,
  RefreshCw,
  Info,
  Scale,
  Target,
  Layers,
  Download,
  Trash2,
  History,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  calculateHealthyWeight,
  evaluateFrameSizeFromWrist,
  UnitSystem,
  Gender,
  BodyFrame,
  FrameMode,
  ActivityLevel,
  HealthyWeightResult,
} from "@/lib/formulas/healthyWeight";

import {
  HealthyWeightGauge,
  HealthyWeightMethodBarChart,
} from "./HealthyWeightCharts";

import { HealthyWeightTables } from "./HealthyWeightTables";

interface SavedScenario {
  id: string;
  timestamp: string;
  title: string;
  unitSystem: UnitSystem;
  gender: Gender;
  bodyFrame: BodyFrame;
  frameMode: FrameMode;
  age: number;
  heightFeet: number;
  heightInches: number;
  heightCm: number;
  weightLbs: number;
  weightKg: number;
  wristInches: number;
  wristCm: number;
  currentLbs: number;
  targetLbs: number;
}

export function HealthyWeightCalculator() {
  // Inputs State
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  const [gender, setGender] = useState<Gender>("male");
  const [frameMode, setFrameMode] = useState<FrameMode>("manual");
  const [bodyFrame, setBodyFrame] = useState<BodyFrame>("medium");
  const [age, setAge] = useState<number>(30);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [isPregnant, setIsPregnant] = useState<boolean>(false);

  // Imperial inputs
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(160);
  const [wristInches, setWristInches] = useState<number>(7.0);

  // Metric inputs
  const [heightCm, setHeightCm] = useState<number>(177.8);
  const [weightKg, setWeightKg] = useState<number>(72.6);
  const [wristCm, setWristCm] = useState<number>(17.8);

  // UI / Feedback State
  const [savedCalculations, setSavedCalculations] = useState<SavedScenario[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

  // 1. URL State Restoration on Initial Mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has("unit")) {
        const u = params.get("unit") as UnitSystem;
        if (u === "imperial" || u === "metric") setUnitSystem(u);
      }
      if (params.has("gender")) {
        const g = params.get("gender") as Gender;
        if (g === "male" || g === "female") setGender(g);
      }
      if (params.has("age")) {
        const a = parseInt(params.get("age") || "30", 10);
        if (!isNaN(a) && a >= 18 && a <= 120) setAge(a);
      }
      if (params.has("hFt")) {
        const hf = parseInt(params.get("hFt") || "5", 10);
        if (!isNaN(hf)) setHeightFeet(hf);
      }
      if (params.has("hIn")) {
        const hi = parseInt(params.get("hIn") || "10", 10);
        if (!isNaN(hi)) setHeightInches(hi);
      }
      if (params.has("hCm")) {
        const hc = parseFloat(params.get("hCm") || "177.8");
        if (!isNaN(hc)) setHeightCm(hc);
      }
      if (params.has("wLbs")) {
        const wl = parseFloat(params.get("wLbs") || "160");
        if (!isNaN(wl)) setWeightLbs(wl);
      }
      if (params.has("wKg")) {
        const wk = parseFloat(params.get("wKg") || "72.6");
        if (!isNaN(wk)) setWeightKg(wk);
      }
      if (params.has("wrist")) {
        const wr = parseFloat(params.get("wrist") || "7.0");
        if (!isNaN(wr)) {
          setWristInches(wr);
          setWristCm(parseFloat((wr * 2.54).toFixed(1)));
        }
      }
      if (params.has("frameMode")) {
        const fm = params.get("frameMode") as FrameMode;
        if (fm === "auto" || fm === "manual") setFrameMode(fm);
      }
      if (params.has("frame")) {
        const f = params.get("frame") as BodyFrame;
        if (f === "small" || f === "medium" || f === "large") setBodyFrame(f);
      }
    } catch {}
  }, []);

  // 2. Auto Frame Evaluation Effect
  const currentHeightCm = unitSystem === "imperial" ? (heightFeet * 12 + heightInches) * 2.54 : heightCm;
  const currentWristInches = unitSystem === "imperial" ? wristInches : wristCm / 2.54;

  useEffect(() => {
    if (frameMode === "auto") {
      const autoFrame = evaluateFrameSizeFromWrist(gender, currentHeightCm, wristCm, wristInches);
      setBodyFrame(autoFrame);
    }
  }, [frameMode, gender, currentHeightCm, wristCm, wristInches]);

  const handleReset = () => {
    setUnitSystem("imperial");
    setGender("male");
    setFrameMode("manual");
    setBodyFrame("medium");
    setAge(30);
    setActivityLevel("moderate");
    setIsPregnant(false);
    setHeightFeet(5);
    setHeightInches(10);
    setWeightLbs(160);
    setWristInches(7.0);
    setHeightCm(177.8);
    setWeightKg(72.6);
    setWristCm(17.8);
  };

  const handleUnitSystemToggle = (newSys: UnitSystem) => {
    if (newSys === unitSystem) return;
    if (newSys === "metric") {
      const totalInches = heightFeet * 12 + heightInches;
      setHeightCm(parseFloat((totalInches * 2.54).toFixed(1)));
      setWeightKg(parseFloat((weightLbs / 2.20462).toFixed(1)));
      setWristCm(parseFloat((wristInches * 2.54).toFixed(1)));
    } else {
      const totalInches = heightCm / 2.54;
      const ft = Math.floor(totalInches / 12);
      const inc = Math.round(totalInches % 12);
      setHeightFeet(ft);
      setHeightInches(inc);
      setWeightLbs(parseFloat((weightKg * 2.20462).toFixed(1)));
      setWristInches(parseFloat((wristCm / 2.54).toFixed(1)));
    }
    setUnitSystem(newSys);
  };

  const totalHeightInchesCombined = heightFeet * 12 + heightInches;

  // Primary Calculation Engine Call
  const result: HealthyWeightResult = useMemo(() => {
    return calculateHealthyWeight({
      unitSystem,
      gender,
      bodyFrame,
      frameMode,
      age,
      weightLbs,
      weightKg,
      heightInches: totalHeightInchesCombined,
      heightCm,
      wristInches,
      wristCm,
      activityLevel,
      isPregnant,
    });
  }, [unitSystem, gender, bodyFrame, frameMode, age, weightLbs, weightKg, totalHeightInchesCombined, heightCm, wristInches, wristCm, activityLevel, isPregnant]);

  // Action Handlers
  const handleSaveCalculation = () => {
    const newItem: SavedScenario = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: `${gender.toUpperCase()} (Age ${age}, ${bodyFrame} frame) - ${result.currentWeightLbs.toFixed(1)} lbs`,
      unitSystem,
      gender,
      bodyFrame,
      frameMode,
      age,
      heightFeet,
      heightInches,
      heightCm,
      weightLbs,
      weightKg,
      wristInches,
      wristCm,
      currentLbs: result.currentWeightLbs,
      targetLbs: result.targetHealthyWeightLbs,
    };
    setSavedCalculations([newItem, ...savedCalculations]);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handleRestoreScenario = (s: SavedScenario) => {
    setUnitSystem(s.unitSystem);
    setGender(s.gender);
    setFrameMode(s.frameMode);
    setBodyFrame(s.bodyFrame);
    setAge(s.age);
    setHeightFeet(s.heightFeet);
    setHeightInches(s.heightInches);
    setHeightCm(s.heightCm);
    setWeightLbs(s.weightLbs);
    setWeightKg(s.weightKg);
    setWristInches(s.wristInches);
    setWristCm(s.wristCm);
  };

  const handleDeleteScenario = (id: string) => {
    setSavedCalculations(savedCalculations.filter((c) => c.id !== id));
  };

  const handleCopySummary = () => {
    const summary = `Clinical Healthy Weight & Ideal Body Composition Assessment (${new Date().toLocaleDateString()})
Subject: ${gender.toUpperCase()} (Age ${age}, ${bodyFrame.toUpperCase()} frame [${frameMode.toUpperCase()} mode])
Current Weight: ${result.currentWeightLbs.toFixed(1)} lbs (${result.currentWeightKg.toFixed(1)} kg) - BMI ${result.bmi} (${result.bmiCategory})
WHO Healthy Weight Range: ${result.minHealthyWeightLbs.toFixed(1)} lbs to ${result.maxHealthyWeightLbs.toFixed(1)} lbs
Prime Target Weight: ${result.targetHealthyWeightLbs.toFixed(1)} lbs (${result.targetHealthyWeightKg.toFixed(1)} kg)
Multi-Formula Reference Average: ${result.consensusIdealWeightLbs.toFixed(1)} lbs
Frame-Adjusted Reference Target: ${result.frameAdjustedTargetLbs.toFixed(1)} lbs
Devine Ideal Weight: ${result.methods[2]?.idealWeightLbs.toFixed(1)} lbs
Peterson Universal IBW: ${result.methods[5]?.idealWeightLbs.toFixed(1)} lbs
Assessment: ${result.insightMessage}
Calculated via CalcPlatform Clinical Health Engine`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    const params = new URLSearchParams({
      unit: unitSystem,
      gender,
      age: age.toString(),
      hFt: heightFeet.toString(),
      hIn: heightInches.toString(),
      hCm: heightCm.toString(),
      wLbs: weightLbs.toString(),
      wKg: weightKg.toString(),
      wrist: (unitSystem === "imperial" ? wristInches : wristCm).toString(),
      frameMode,
      frame: bodyFrame,
    });
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Age",
      "Gender",
      "Unit System",
      "Height",
      "Current Weight",
      "Wrist Circumference",
      "Frame Mode",
      "Frame Size",
      "BMI",
      "BMI Prime",
      "BMI Category",
      "WHO Minimum Weight (lbs)",
      "WHO Maximum Weight (lbs)",
      "WHO Target Weight (lbs)",
      "Devine IBW (lbs)",
      "Hamwi IBW (lbs)",
      "Robinson IBW (lbs)",
      "Miller IBW (lbs)",
      "Peterson Universal IBW (2016) (lbs)",
      "Multi-Formula Reference Average (lbs)",
      "Frame-Adjusted Reference Target (lbs)",
      "Difference From Current (lbs)",
    ];

    const values = [
      age,
      gender,
      unitSystem,
      unitSystem === "imperial" ? `${heightFeet}'${heightInches}"` : `${heightCm} cm`,
      unitSystem === "imperial" ? `${weightLbs} lbs` : `${weightKg} kg`,
      unitSystem === "imperial" ? `${wristInches} in` : `${wristCm} cm`,
      frameMode,
      bodyFrame,
      result.bmi,
      result.bmiPrime,
      result.bmiCategory,
      result.minHealthyWeightLbs.toFixed(1),
      result.maxHealthyWeightLbs.toFixed(1),
      result.targetHealthyWeightLbs.toFixed(1),
      result.methods[2]?.idealWeightLbs.toFixed(1) || "N/A",
      result.methods[1]?.idealWeightLbs.toFixed(1) || "N/A",
      result.methods[3]?.idealWeightLbs.toFixed(1) || "N/A",
      result.methods[4]?.idealWeightLbs.toFixed(1) || "N/A",
      result.methods[5]?.idealWeightLbs.toFixed(1) || "N/A",
      result.consensusIdealWeightLbs.toFixed(1),
      result.frameAdjustedTargetLbs.toFixed(1),
      result.weightDifferenceFromTargetLbs.toFixed(1),
    ];

    const csvContent = [headers.map((h) => `"${h}"`).join(","), values.map((v) => `"${v}"`).join(",")].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `healthy_weight_assessment_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const reportEl = document.getElementById("hw-print-report");
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
          <title>Clinical Healthy Weight &amp; IBW Assessment Report - CalcPlatform</title>
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
            .border-emerald-600 { border-color: #059669; }
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
            .text-left { text-align: left; }
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
            .text-blue-700 { color: #1d4ed8; }
            .text-emerald-700 { color: #047857; }
            .text-purple-700 { color: #7e22ce; }
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
          .hw-calculator-main-ui, nav, header, footer, sidebar, article {
            display: none !important;
          }
          #hw-print-report {
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

      <div className="hw-calculator-main-ui space-y-6">
        {/* Main Interactive Calculator Card */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm">
          <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <HeartPulse className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  Healthy Weight Calculator &amp; Clinical Suite
                </CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1">
                  WHO BMI Range, Devine, Hamwi, Robinson, Miller &amp; Peterson (2016) IBW Equations
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
            {/* Sub-5-Foot Clinical Advisory Banner */}
            {result.isSub5Feet && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-xl flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block">Historical Formula Height Advisory:</strong>
                  <span>
                    Some historical IBW equations (Devine, Hamwi, Robinson, Miller) are anchored at 5 ft (60 in) and may not be appropriate for shorter adults or pediatric assessment. Treat these results as reference estimates rather than clinical targets.
                  </span>
                </div>
              </div>
            )}

            {/* Top Control Bar: Unit System, Gender, & Body Frame Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
              {/* Unit System */}
              <div>
                <Label id="unit-system-label" className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 block">Unit System</Label>
                <div role="radiogroup" aria-labelledby="unit-system-label" className="grid grid-cols-2 gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={unitSystem === "imperial"}
                    onClick={() => handleUnitSystemToggle("imperial")}
                    className={`py-1 rounded transition-all cursor-pointer ${unitSystem === "imperial" ? "bg-emerald-600 text-white" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"}`}
                  >
                    US Units (lbs/ft)
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={unitSystem === "metric"}
                    onClick={() => handleUnitSystemToggle("metric")}
                    className={`py-1 rounded transition-all cursor-pointer ${unitSystem === "metric" ? "bg-emerald-600 text-white" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"}`}
                  >
                    Metric (kg/cm)
                  </button>
                </div>
              </div>

              {/* Gender */}
              <div>
                <Label id="gender-label" className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 block">Gender</Label>
                <div role="radiogroup" aria-labelledby="gender-label" className="grid grid-cols-2 gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={gender === "male"}
                    onClick={() => { setGender("male"); setIsPregnant(false); }}
                    className={`py-1 rounded transition-all cursor-pointer ${gender === "male" ? "bg-blue-600 text-white" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"}`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={gender === "female"}
                    onClick={() => setGender("female")}
                    className={`py-1 rounded transition-all cursor-pointer ${gender === "female" ? "bg-purple-600 text-white" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"}`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Body Frame Mode & Selection */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label id="frame-mode-label" className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400">Body Frame</Label>
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setFrameMode("auto")}
                      className={`px-1.5 py-0.5 rounded font-bold transition-all cursor-pointer ${frameMode === "auto" ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300" : "text-zinc-400 hover:text-zinc-600"}`}
                    >
                      Auto
                    </button>
                    <span className="text-zinc-300 dark:text-zinc-700">|</span>
                    <button
                      type="button"
                      onClick={() => setFrameMode("manual")}
                      className={`px-1.5 py-0.5 rounded font-bold transition-all cursor-pointer ${frameMode === "manual" ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300" : "text-zinc-400 hover:text-zinc-600"}`}
                    >
                      Manual
                    </button>
                  </div>
                </div>

                <div role="radiogroup" aria-labelledby="frame-mode-label" className="grid grid-cols-3 gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[11px] font-bold">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={bodyFrame === "small"}
                    disabled={frameMode === "auto"}
                    onClick={() => setBodyFrame("small")}
                    className={`py-1 rounded transition-all ${frameMode === "auto" ? "cursor-default opacity-80" : "cursor-pointer"} ${bodyFrame === "small" ? "bg-amber-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    Small (-10%)
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={bodyFrame === "medium"}
                    disabled={frameMode === "auto"}
                    onClick={() => setBodyFrame("medium")}
                    className={`py-1 rounded transition-all ${frameMode === "auto" ? "cursor-default opacity-80" : "cursor-pointer"} ${bodyFrame === "medium" ? "bg-emerald-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={bodyFrame === "large"}
                    disabled={frameMode === "auto"}
                    onClick={() => setBodyFrame("large")}
                    className={`py-1 rounded transition-all ${frameMode === "auto" ? "cursor-default opacity-80" : "cursor-pointer"} ${bodyFrame === "large" ? "bg-indigo-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    Large (+10%)
                  </button>
                </div>
              </div>
            </div>

            {/* Inputs Grid: Age, Height, Weight, & Wrist Circumference */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {/* Age */}
              <div>
                <Label htmlFor="input-age" className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Age (years)</Label>
                <Input
                  id="input-age"
                  type="number"
                  min={18}
                  max={110}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="text-xs font-sans tabular-nums font-bold"
                />
              </div>

              {/* Height */}
              <div>
                <Label htmlFor="input-height-primary" className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">
                  Height ({unitSystem === "imperial" ? "ft & in" : "cm"})
                </Label>
                {unitSystem === "imperial" ? (
                  <div className="grid grid-cols-2 gap-1.5">
                    <Input
                      id="input-height-primary"
                      type="number"
                      min={3}
                      max={8}
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(Number(e.target.value))}
                      placeholder="ft"
                      className="text-xs font-sans tabular-nums font-bold"
                    />
                    <Input
                      id="input-height-inches"
                      type="number"
                      min={0}
                      max={11}
                      value={heightInches}
                      onChange={(e) => setHeightInches(Number(e.target.value))}
                      placeholder="in"
                      className="text-xs font-sans tabular-nums font-bold"
                    />
                  </div>
                ) : (
                  <Input
                    id="input-height-primary"
                    type="number"
                    step={0.1}
                    min={100}
                    max={250}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="text-xs font-sans tabular-nums font-bold"
                  />
                )}
              </div>

              {/* Current Weight */}
              <div>
                <Label htmlFor="input-weight" className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">
                  Current Weight ({unitSystem === "imperial" ? "lbs" : "kg"})
                </Label>
                <Input
                  id="input-weight"
                  type="number"
                  step={0.1}
                  min={30}
                  max={700}
                  value={unitSystem === "imperial" ? weightLbs : weightKg}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (unitSystem === "imperial") setWeightLbs(val);
                    else setWeightKg(val);
                  }}
                  className="text-xs font-sans tabular-nums font-bold"
                />
              </div>

              {/* Wrist Circumference */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="input-wrist" className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    Wrist ({unitSystem === "imperial" ? "in" : "cm"})
                  </Label>
                  {frameMode === "auto" && (
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">
                      Detected: {bodyFrame.toUpperCase()}
                    </span>
                  )}
                </div>
                <Input
                  id="input-wrist"
                  type="number"
                  step={0.1}
                  min={unitSystem === "imperial" ? 4.0 : 10.0}
                  max={unitSystem === "imperial" ? 11.0 : 28.0}
                  value={unitSystem === "imperial" ? wristInches : wristCm}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (unitSystem === "imperial") {
                      setWristInches(val);
                      setWristCm(parseFloat((val * 2.54).toFixed(1)));
                    } else {
                      setWristCm(val);
                      setWristInches(parseFloat((val / 2.54).toFixed(1)));
                    }
                  }}
                  className="text-xs font-sans tabular-nums font-bold"
                />
              </div>
            </div>

            {/* Action Bar with Full Interactivity */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSaveCalculation}
                  className="text-xs gap-1.5 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  {savedFeedback ? "Saved!" : "Save"}
                  {savedCalculations.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                      {savedCalculations.length}
                    </span>
                  )}
                </Button>

                {savedCalculations.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                    className="text-xs gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 cursor-pointer"
                  >
                    <History className="w-3.5 h-3.5" />
                    {isHistoryOpen ? "Hide History" : "View History"}
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopySummary}
                  className="text-xs gap-1.5 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
                  {copied ? "Copied!" : "Copy Summary"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="text-xs gap-1.5 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 cursor-pointer"
                >
                  {shared ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-zinc-500" />}
                  {shared ? "Link Copied!" : "Share Link"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleExportCSV}
                  className="text-xs gap-1.5 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-500" />
                  Export CSV
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="text-xs gap-1.5 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-zinc-500" />
                  Print / PDF
                </Button>
              </div>
            </div>

            {/* Saved Calculations Drawer */}
            {isHistoryOpen && savedCalculations.length > 0 && (
              <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-blue-600" /> Saved Scenarios ({savedCalculations.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setSavedCalculations([])}
                    className="text-[10px] text-zinc-400 hover:text-red-500 cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {savedCalculations.map((item) => (
                    <div
                      key={item.id}
                      className="p-2 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-between font-sans tabular-nums text-xs"
                    >
                      <div className="truncate pr-2">
                        <span className="font-bold text-zinc-800 dark:text-zinc-200">{item.title}</span>
                        <span className="text-zinc-400 text-[10px] ml-2">[{item.timestamp}]</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleRestoreScenario(item)}
                          className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 font-semibold text-[11px] cursor-pointer"
                        >
                          Restore
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteScenario(item.id)}
                          className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer"
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
            <HealthyWeightGauge result={result} />
            <HealthyWeightMethodBarChart result={result} />
          </div>

          {/* Result Cards & Dynamic Insights */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Clinical Body Composition &amp; IBW Summary
                </h3>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  BMI Prime: {result.bmiPrime}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                {/* Card 1: WHO Healthy Range (strictly unscaled by frame) */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Healthy Range (WHO)</span>
                  <strong className="text-lg font-black text-emerald-600 dark:text-emerald-400 block mt-0.5">
                    {result.minHealthyWeightLbs.toFixed(1)} – {result.maxHealthyWeightLbs.toFixed(1)} lbs
                  </strong>
                  <span className="text-[10px] text-zinc-400 block">
                    {result.minHealthyWeightKg.toFixed(1)} – {result.maxHealthyWeightKg.toFixed(1)} kg
                  </span>
                </div>

                {/* Card 2: Prime Target Weight */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Prime Target Weight</span>
                  <strong className="text-lg font-black text-blue-600 dark:text-blue-400 block mt-0.5">
                    {result.targetHealthyWeightLbs.toFixed(1)} lbs
                  </strong>
                  <span className="text-[10px] text-zinc-400 block">
                    {result.targetHealthyWeightKg.toFixed(1)} kg (BMI 21.7)
                  </span>
                </div>

                {/* Card 3: Devine IBW Formula */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Devine IBW Formula</span>
                  <strong className="text-lg font-black text-purple-600 dark:text-purple-400 block mt-0.5">
                    {result.methods[2]?.idealWeightLbs.toFixed(1)} lbs
                  </strong>
                  <span className="text-[10px] text-zinc-400 block">Clinical Standard</span>
                </div>

                {/* Card 4: Frame-Adjusted Consensus Target */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Frame-Adjusted Target</span>
                  <strong className="text-lg font-black text-indigo-600 dark:text-indigo-400 block mt-0.5">
                    {result.frameAdjustedTargetLbs.toFixed(1)} lbs
                  </strong>
                  <span className="text-[10px] text-zinc-400 block">
                    {bodyFrame.toUpperCase()} Frame ({result.frameMultiplier > 1 ? "+10%" : result.frameMultiplier < 1 ? "-10%" : "Base"})
                  </span>
                </div>
              </div>

              {/* Dynamic Health Insight Box */}
              <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2.5">
                <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-emerald-950 dark:text-emerald-100 block mb-0.5">Clinical Evaluation Insight:</strong>
                  <span>{result.insightMessage}</span>
                </div>
              </div>
            </div>

            {/* Auxiliary Tables */}
            <HealthyWeightTables result={result} />
          </div>
        </div>
      </div>

      {/* Standalone Printable PDF Report Section (Single H1 compliance: Uses H2 for internal report header) */}
      <div id="hw-print-report" className="hidden">
        <div className="p-8 max-w-4xl mx-auto space-y-6 bg-white text-zinc-900 font-sans">
          <div className="border-b-2 border-emerald-600 pb-4 flex justify-between items-start">
            <div>
              <div className="text-xs font-black tracking-widest text-emerald-700 uppercase">
                CalcPlatform Clinical Human Physiology &amp; Epidemiology Lab
              </div>
              <h2 className="text-2xl font-black text-blue-600 mt-1">
                Clinical Healthy Weight &amp; Ideal Body Composition Assessment
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                WHO BMI Range, Devine, Hamwi, Robinson, Miller &amp; Peterson (2016) IBW Models
              </p>
            </div>
            <div className="text-right text-xs text-zinc-500">
              <p className="font-bold text-zinc-800" suppressHydrationWarning>Date: {new Date().toLocaleDateString()}</p>
              <p suppressHydrationWarning>Time: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              <p className="font-sans tabular-nums text-[10px] text-zinc-400 mt-1" suppressHydrationWarning>Ref ID: #HW-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-center">
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Current Weight</span>
              <strong className="text-xl font-black text-emerald-700 block mt-1">{result.currentWeightLbs.toFixed(1)} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">BMI {result.bmi} ({result.bmiCategory})</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">WHO Healthy Range</span>
              <strong className="text-xl font-black text-blue-700 block mt-1">{result.minHealthyWeightLbs.toFixed(1)}–{result.maxHealthyWeightLbs.toFixed(1)} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">BMI 18.5 – 24.9</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Devine IBW</span>
              <strong className="text-xl font-black text-purple-700 block mt-1">{result.methods[2]?.idealWeightLbs.toFixed(1)} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">Clinical Dosage Benchmark</span>
            </div>
            <div className="p-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Prime Target</span>
              <strong className="text-xl font-black text-indigo-700 block mt-1">{result.targetHealthyWeightLbs.toFixed(1)} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">BMI 21.7 Target</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-zinc-300 pb-1">
              1. Anthropometric Parameters &amp; Clinical IBW Breakdown
            </h3>
            <table className="w-full text-xs text-left border border-zinc-200 border-collapse">
              <tbody>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <td className="p-2 font-bold w-1/4">Gender / Body Frame:</td>
                  <td className="p-2 w-1/4">{gender.toUpperCase()} / {bodyFrame.toUpperCase()} Frame ({frameMode.toUpperCase()} mode)</td>
                  <td className="p-2 font-bold w-1/4">Hamwi IBW (1964):</td>
                  <td className="p-2 w-1/4">{result.methods[1]?.idealWeightLbs.toFixed(1) || "N/A"} lbs</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="p-2 font-bold">Body Weight:</td>
                  <td className="p-2">{unitSystem === "imperial" ? `${weightLbs} lbs` : `${weightKg} kg`}</td>
                  <td className="p-2 font-bold">Devine IBW (1974):</td>
                  <td className="p-2">{result.methods[2]?.idealWeightLbs.toFixed(1) || "N/A"} lbs</td>
                </tr>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <td className="p-2 font-bold">Body Height:</td>
                  <td className="p-2">{unitSystem === "imperial" ? `${heightFeet}'${heightInches}"` : `${heightCm} cm`}</td>
                  <td className="p-2 font-bold">Robinson IBW (1983):</td>
                  <td className="p-2">{result.methods[3]?.idealWeightLbs.toFixed(1) || "N/A"} lbs</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="p-2 font-bold">Wrist Circumference:</td>
                  <td className="p-2">{unitSystem === "imperial" ? `${wristInches} in` : `${wristCm} cm`}</td>
                  <td className="p-2 font-bold">Miller IBW (1983):</td>
                  <td className="p-2">{result.methods[4]?.idealWeightLbs.toFixed(1) || "N/A"} lbs</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="p-2 font-bold">Multi-Formula Reference Average:</td>
                  <td className="p-2 font-bold text-blue-600">{result.consensusIdealWeightLbs.toFixed(1)} lbs</td>
                  <td className="p-2 font-bold">Peterson Universal IBW (2016):</td>
                  <td className="p-2">{result.methods[5]?.idealWeightLbs.toFixed(1) || "N/A"} lbs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t border-zinc-300 pt-4 text-[10px] text-zinc-500 space-y-1">
            <p className="font-bold text-zinc-700">Clinical &amp; Medical Disclaimer:</p>
            <p>
              This report is generated using clinical anthropometric equations (WHO BMI, Hamwi, Devine, Robinson, Miller, and Peterson). For individualized nutritional intervention or medical evaluations, consult a licensed healthcare professional or registered dietitian.
            </p>
            <p className="text-zinc-400">© CalcPlatform Clinical Health Lab • All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
