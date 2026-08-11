"use client";

import React, { useState, useMemo } from "react";
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
  Activity,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  calculateHealthyWeight,
  UnitSystem,
  Gender,
  BodyFrame,
  ActivityLevel,
  HealthyWeightResult,
} from "@/lib/formulas/healthyWeight";

import {
  HealthyWeightGauge,
  HealthyWeightMethodBarChart,
} from "./HealthyWeightCharts";

import { HealthyWeightTables } from "./HealthyWeightTables";

export function HealthyWeightCalculator() {
  // Inputs
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  const [gender, setGender] = useState<Gender>("male");
  const [bodyFrame, setBodyFrame] = useState<BodyFrame>("medium");
  const [age, setAge] = useState<number>(30);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [isPregnant, setIsPregnant] = useState<boolean>(false);

  // Imperial inputs
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(160);

  // Metric inputs
  const [heightCm, setHeightCm] = useState<number>(177.8);
  const [weightKg, setWeightKg] = useState<number>(72.5);

  // Saved calculations & copy state
  const [savedCalculations, setSavedCalculations] = useState<
    Array<{ id: string; timestamp: string; title: string; currentLbs: number; targetLbs: number }>
  >([]);
  const [copied, setCopied] = useState(false);

  const handleReset = () => {
    setUnitSystem("imperial");
    setGender("male");
    setBodyFrame("medium");
    setAge(30);
    setActivityLevel("moderate");
    setIsPregnant(false);
    setHeightFeet(5);
    setHeightInches(10);
    setWeightLbs(160);
    setHeightCm(177.8);
    setWeightKg(72.5);
  };

  const handleUnitSystemToggle = (newSys: UnitSystem) => {
    if (newSys === unitSystem) return;
    if (newSys === "metric") {
      const totalInches = heightFeet * 12 + heightInches;
      setHeightCm(parseFloat((totalInches * 2.54).toFixed(1)));
      setWeightKg(parseFloat((weightLbs / 2.20462).toFixed(1)));
    } else {
      const totalInches = heightCm / 2.54;
      const ft = Math.floor(totalInches / 12);
      const inc = Math.round(totalInches % 12);
      setHeightFeet(ft);
      setHeightInches(inc);
      setWeightLbs(parseFloat((weightKg * 2.20462).toFixed(1)));
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
      age,
      weightLbs,
      weightKg,
      heightInches: totalHeightInchesCombined,
      heightCm,
      activityLevel,
      isPregnant,
    });
  }, [unitSystem, gender, bodyFrame, age, weightLbs, weightKg, totalHeightInchesCombined, heightCm, activityLevel, isPregnant]);

  const handleSaveCalculation = () => {
    const newItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: `${gender.toUpperCase()} (${bodyFrame} frame) - ${result.currentWeightLbs} lbs`,
      currentLbs: result.currentWeightLbs,
      targetLbs: result.targetHealthyWeightLbs,
    };
    setSavedCalculations([newItem, ...savedCalculations]);
  };

  const handleCopySummary = () => {
    const summary = `Clinical Healthy Weight & Ideal Body Composition Assessment (${new Date().toLocaleDateString()})
Subject: ${gender.toUpperCase()} (Age ${age}, ${bodyFrame} frame)
Current Weight: ${result.currentWeightLbs} lbs (${result.currentWeightKg} kg) - BMI ${result.bmi} (${result.bmiCategory})
WHO Healthy Weight Range: ${result.minHealthyWeightLbs} lbs to ${result.maxHealthyWeightLbs} lbs
Prime Target Weight: ${result.targetHealthyWeightLbs} lbs (${result.targetHealthyWeightKg} kg)
Devine Ideal Weight: ${result.methods[2]?.idealWeightLbs || result.targetHealthyWeightLbs} lbs
Assessment: ${result.insightMessage}
Calculated via CalcPlatform Clinical Health Engine`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Healthy Weight & IBW Assessment",
          text: `My healthy weight range is ${result.minHealthyWeightLbs} – ${result.maxHealthyWeightLbs} lbs. Calculate yours:`,
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
            .text-left { text-left: left; }
            .text-xs { font-size: 0.75rem; line-height: 1rem; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .text-\\[10px\\] { font-size: 10px; }
            .text-\\[9px\\] { font-size: 9px; }
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            .font-black { font-weight: 900; }
            .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
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
          .hw-calculator-main-ui, nav, header, footer, sidebar {
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
                  WHO BMI Range, Devine, Hamwi, Robinson, Miller &amp; Peterson IBW Equations
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
            {/* Top Control Bar: Unit System, Gender, & Body Frame */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
              {/* Unit System */}
              <div>
                <Label className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 block">Unit System</Label>
                <div className="grid grid-cols-2 gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => handleUnitSystemToggle("imperial")}
                    className={`py-1 rounded transition-all ${unitSystem === "imperial" ? "bg-emerald-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    US Units (lbs/ft)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitSystemToggle("metric")}
                    className={`py-1 rounded transition-all ${unitSystem === "metric" ? "bg-emerald-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    Metric (kg/cm)
                  </button>
                </div>
              </div>

              {/* Gender */}
              <div>
                <Label className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 block">Gender</Label>
                <div className="grid grid-cols-2 gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => { setGender("male"); setIsPregnant(false); }}
                    className={`py-1 rounded transition-all ${gender === "male" ? "bg-blue-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`py-1 rounded transition-all ${gender === "female" ? "bg-purple-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Body Frame Size */}
              <div>
                <Label className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 block">Body Frame Size</Label>
                <div className="grid grid-cols-3 gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setBodyFrame("small")}
                    className={`py-1 rounded transition-all ${bodyFrame === "small" ? "bg-amber-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    Small (-10%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBodyFrame("medium")}
                    className={`py-1 rounded transition-all ${bodyFrame === "medium" ? "bg-emerald-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    onClick={() => setBodyFrame("large")}
                    className={`py-1 rounded transition-all ${bodyFrame === "large" ? "bg-indigo-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    Large (+10%)
                  </button>
                </div>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Age */}
              <div>
                <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Age (years)</Label>
                <Input
                  type="number"
                  min={18}
                  max={110}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="text-xs font-mono font-bold"
                />
              </div>

              {/* Height */}
              <div>
                <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Height</Label>
                {unitSystem === "imperial" ? (
                  <div className="grid grid-cols-2 gap-1.5">
                    <Input type="number" min={3} max={8} value={heightFeet} onChange={(e) => setHeightFeet(Number(e.target.value))} placeholder="ft" className="text-xs font-mono font-bold" />
                    <Input type="number" min={0} max={11} value={heightInches} onChange={(e) => setHeightInches(Number(e.target.value))} placeholder="in" className="text-xs font-mono font-bold" />
                  </div>
                ) : (
                  <Input type="number" step={0.1} min={100} max={250} value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="text-xs font-mono font-bold" />
                )}
              </div>

              {/* Current Weight */}
              <div>
                <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Current Weight ({unitSystem === "imperial" ? "lbs" : "kg"})</Label>
                <Input
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
                  className="text-xs font-mono font-bold"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleSaveCalculation} className="bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 text-xs gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
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

                <Button variant="outline" size="sm" onClick={handlePrint} className="bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-600 text-xs gap-1.5 shadow-sm">
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
            <HealthyWeightGauge result={result} />
            <HealthyWeightMethodBarChart result={result} />
          </div>

          {/* Result Cards & Dynamic Insights */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Clinical Body Composition &amp; IBW Summary
                </h4>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  BMI Prime: {result.bmiPrime}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Healthy Range (WHO)</span>
                  <strong className="text-lg font-black text-emerald-600 dark:text-emerald-400 block mt-0.5">{result.minHealthyWeightLbs} – {result.maxHealthyWeightLbs} lbs</strong>
                  <span className="text-[10px] text-zinc-400 block">{result.minHealthyWeightKg} – {result.maxHealthyWeightKg} kg</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Prime Target Weight</span>
                  <strong className="text-lg font-black text-blue-600 dark:text-blue-400 block mt-0.5">{result.targetHealthyWeightLbs} lbs</strong>
                  <span className="text-[10px] text-zinc-400 block">{result.targetHealthyWeightKg} kg (BMI 21.7)</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Devine IBW Formula</span>
                  <strong className="text-lg font-black text-purple-600 dark:text-purple-400 block mt-0.5">{result.methods[2]?.idealWeightLbs || result.targetHealthyWeightLbs} lbs</strong>
                  <span className="text-[10px] text-zinc-400 block">Clinical Standard</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Frame Adjustment</span>
                  <strong className="text-lg font-black text-indigo-600 dark:text-indigo-400 block mt-0.5">{result.frameAdjustedMinWeightLbs} – {result.frameAdjustedMaxWeightLbs} lbs</strong>
                  <span className="text-[10px] text-zinc-400 block">{bodyFrame.toUpperCase()} Frame</span>
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

      {/* Standalone Printable PDF Report Section */}
      <div id="hw-print-report" className="hidden">
        <div className="p-8 max-w-4xl mx-auto space-y-6 bg-white text-zinc-900 font-sans">
          <div className="border-b-2 border-emerald-600 pb-4 flex justify-between items-start">
            <div>
              <div className="text-xs font-black tracking-widest text-emerald-700 uppercase">
                CalcPlatform Clinical Human Physiology &amp; Epidemiology Lab
              </div>
              <h1 className="text-2xl font-black text-zinc-900 mt-1">
                Clinical Healthy Weight &amp; Ideal Body Composition Assessment
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                WHO BMI Range, Devine, Hamwi, Robinson, Miller &amp; Peterson IBW Models
              </p>
            </div>
            <div className="text-right text-xs text-zinc-500">
              <p className="font-bold text-zinc-800" suppressHydrationWarning>Date: {new Date().toLocaleDateString()}</p>
              <p suppressHydrationWarning>Time: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              <p className="font-mono text-[10px] text-zinc-400 mt-1" suppressHydrationWarning>Ref ID: #HW-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-center">
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Current Weight</span>
              <strong className="text-xl font-black text-emerald-700 block mt-1">{result.currentWeightLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">BMI {result.bmi} ({result.bmiCategory})</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">WHO Healthy Range</span>
              <strong className="text-xl font-black text-blue-700 block mt-1">{result.minHealthyWeightLbs}–{result.maxHealthyWeightLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">BMI 18.5 – 24.9</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Devine IBW</span>
              <strong className="text-xl font-black text-purple-700 block mt-1">{result.methods[2]?.idealWeightLbs || result.targetHealthyWeightLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">Clinical Dosage Benchmark</span>
            </div>
            <div className="p-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Prime Target</span>
              <strong className="text-xl font-black text-indigo-700 block mt-1">{result.targetHealthyWeightLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">BMI 21.7 Target</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-300 pb-1">
              1. Anthropometric Parameters &amp; Clinical IBW Breakdown
            </h3>
            <table className="w-full text-xs text-left border border-zinc-200 border-collapse">
              <tbody>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <td className="p-2 font-bold w-1/4">Gender / Body Frame:</td>
                  <td className="p-2 w-1/4">{gender.toUpperCase()} / {bodyFrame.toUpperCase()} Frame</td>
                  <td className="p-2 font-bold w-1/4">Hamwi IBW (1964):</td>
                  <td className="p-2 w-1/4">{result.methods[1]?.idealWeightLbs || "N/A"} lbs</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="p-2 font-bold">Body Weight:</td>
                  <td className="p-2">{unitSystem === "imperial" ? `${weightLbs} lbs` : `${weightKg} kg`}</td>
                  <td className="p-2 font-bold">Devine IBW (1974):</td>
                  <td className="p-2">{result.methods[2]?.idealWeightLbs || "N/A"} lbs</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="p-2 font-bold">Body Height:</td>
                  <td className="p-2">{unitSystem === "imperial" ? `${heightFeet}'${heightInches}"` : `${heightCm} cm`}</td>
                  <td className="p-2 font-bold">Peterson IBW (2016):</td>
                  <td className="p-2">{result.methods[5]?.idealWeightLbs || "N/A"} lbs</td>
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
