"use client";

import React, { useState, useMemo } from "react";
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
} from "@/lib/formulas/leanBodyMass";

import {
  LeanMassGauge,
  FormulaComparisonBarChart,
} from "./LeanBodyMassCharts";

import { LeanBodyMassTables } from "./LeanBodyMassTables";

export function LeanBodyMassCalculator() {
  // Inputs
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  const [gender, setGender] = useState<Gender>("male");
  const [isChild, setIsChild] = useState<boolean>(false);
  const [age, setAge] = useState<number>(30);

  // Imperial inputs
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(160);

  // Metric inputs
  const [heightCm, setHeightCm] = useState<number>(177.8);
  const [weightKg, setWeightKg] = useState<number>(72.5);

  // Saved calculations & copy state
  const [savedCalculations, setSavedCalculations] = useState<
    Array<{ id: string; timestamp: string; title: string; lbmLbs: number; lbmPct: number }>
  >([]);
  const [copied, setCopied] = useState(false);

  const handleReset = () => {
    setUnitSystem("imperial");
    setGender("male");
    setIsChild(false);
    setAge(30);
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

  const handleSaveCalculation = () => {
    const newItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: `${gender.toUpperCase()} (${isChild ? "Child" : "Adult"}) - ${result.consensusLbmLbs} lbs LBM`,
      lbmLbs: result.consensusLbmLbs,
      lbmPct: result.consensusLbmPercentage,
    };
    setSavedCalculations([newItem, ...savedCalculations]);
  };

  const handleCopySummary = () => {
    const summary = `Clinical Lean Body Mass Assessment Report (${new Date().toLocaleDateString()})
Subject: ${gender.toUpperCase()} (${isChild ? "Child ≤14" : `Adult, Age ${age}`})
Consensus Lean Body Mass: ${result.consensusLbmLbs} lbs (${result.consensusLbmKg} kg)
Lean Mass Percentage: ${result.consensusLbmPercentage}%
Fat Mass: ${result.fatMassLbs} lbs (${result.fatMassKg} kg) - ${result.bodyFatPercentage}% Body Fat
Fat Free Mass (FFM): ${result.fatFreeMassLbs} lbs (${result.fatFreeMassKg} kg)
Boer Formula LBM: ${result.formulaResults[0]?.lbmLbs || result.consensusLbmLbs} lbs
Calculated via CalcPlatform Clinical Health Engine`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Lean Body Mass Assessment",
          text: `My calculated Lean Body Mass is ${result.consensusLbmLbs} lbs (${result.consensusLbmPercentage}% of body weight). Calculate yours:`,
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
    const reportEl = document.getElementById("lbm-print-report");
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
          <title>Clinical Lean Body Mass &amp; Body Composition Report - CalcPlatform</title>
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
            .border-blue-600 { border-color: #2563eb; }
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
            .text-blue-700 { color: #1d4ed8; }
            .text-emerald-700 { color: #047857; }
            .text-rose-700 { color: #be123c; }
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
          .lbm-calculator-main-ui, nav, header, footer, sidebar {
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
                className="self-start sm:self-auto bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Defaults
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 space-y-6">
            {/* Top Control Bar: Unit System, Gender, & Age Category */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
              {/* Unit System */}
              <div>
                <Label className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 block">Unit System</Label>
                <div className="grid grid-cols-2 gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => handleUnitSystemToggle("imperial")}
                    className={`py-1 rounded transition-all ${unitSystem === "imperial" ? "bg-blue-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    US Units (lbs/ft)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitSystemToggle("metric")}
                    className={`py-1 rounded transition-all ${unitSystem === "metric" ? "bg-blue-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
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
                    onClick={() => setGender("male")}
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

              {/* Age Category */}
              <div>
                <Label className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 block">Age Bracket</Label>
                <div className="grid grid-cols-2 gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setIsChild(false)}
                    className={`py-1 rounded transition-all ${!isChild ? "bg-emerald-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    Adult (&gt;14 y/o)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsChild(true)}
                    className={`py-1 rounded transition-all ${isChild ? "bg-amber-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
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
                <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Age (years)</Label>
                <Input
                  type="number"
                  min={1}
                  max={110}
                  value={age}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setAge(val);
                    if (val <= 14) setIsChild(true);
                  }}
                  className="text-xs font-sans tabular-nums font-bold"
                />
              </div>

              {/* Height */}
              <div>
                <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Height</Label>
                {unitSystem === "imperial" ? (
                  <div className="grid grid-cols-2 gap-1.5">
                    <Input type="number" min={2} max={8} value={heightFeet} onChange={(e) => setHeightFeet(Number(e.target.value))} placeholder="ft" className="text-xs font-sans tabular-nums font-bold" />
                    <Input type="number" min={0} max={11} value={heightInches} onChange={(e) => setHeightInches(Number(e.target.value))} placeholder="in" className="text-xs font-sans tabular-nums font-bold" />
                  </div>
                ) : (
                  <Input type="number" step={0.1} min={50} max={250} value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="text-xs font-sans tabular-nums font-bold" />
                )}
              </div>

              {/* Weight */}
              <div>
                <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Body Weight ({unitSystem === "imperial" ? "lbs" : "kg"})</Label>
                <Input
                  type="number"
                  step={0.1}
                  min={10}
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

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              

              <div className="flex items-center gap-2">
                

                
              </div>
            </div>
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
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Consensus Body Composition Summary
                </h4>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                  BMI: {result.bmi}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Lean Body Mass</span>
                  <strong className="text-xl font-black text-blue-600 dark:text-blue-400 block mt-0.5">{result.consensusLbmLbs} lbs</strong>
                  <span className="text-[10px] text-zinc-400 block">{result.consensusLbmPercentage}% of weight</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Fat Mass</span>
                  <strong className="text-xl font-black text-rose-600 dark:text-rose-400 block mt-0.5">{result.fatMassLbs} lbs</strong>
                  <span className="text-[10px] text-zinc-400 block">{result.bodyFatPercentage}% body fat</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Fat Free Mass (FFM)</span>
                  <strong className="text-xl font-black text-purple-600 dark:text-purple-400 block mt-0.5">{result.fatFreeMassLbs} lbs</strong>
                  <span className="text-[10px] text-zinc-400 block">{result.fatFreeMassKg} kg</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Essential Fat Offset</span>
                  <strong className="text-xl font-black text-emerald-600 dark:text-emerald-400 block mt-0.5">{result.essentialFatLbs} lbs</strong>
                  <span className="text-[10px] text-zinc-400 block">{gender === "male" ? "3% Male" : "9% Female"}</span>
                </div>
              </div>
            </div>

            {/* Auxiliary Tables */}
            <LeanBodyMassTables result={result} />
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
              <h1 className="text-2xl font-black text-blue-600 mt-1">
                Clinical Lean Body Mass &amp; Body Composition Assessment
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                Boer, James, Hume, Janmahasatian &amp; Peters Pediatric Model Analysis
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
              <strong className="text-xl font-black text-blue-700 block mt-1">{result.consensusLbmLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">{result.consensusLbmPercentage}% of total</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Fat Mass</span>
              <strong className="text-xl font-black text-rose-700 block mt-1">{result.fatMassLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">{result.bodyFatPercentage}% Body Fat</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Fat Free Mass</span>
              <strong className="text-xl font-black text-purple-700 block mt-1">{result.fatFreeMassLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">{result.fatFreeMassKg} kg</span>
            </div>
            <div className="p-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Boer Formula</span>
              <strong className="text-xl font-black text-emerald-700 block mt-1">{result.formulaResults[0]?.lbmLbs || result.consensusLbmLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">Clinical Standard</span>
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
                  <td className="p-2 font-bold w-1/4">Boer LBM (1984):</td>
                  <td className="p-2 w-1/4">{result.formulaResults[0]?.lbmLbs || result.consensusLbmLbs} lbs</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="p-2 font-bold">Body Weight:</td>
                  <td className="p-2">{unitSystem === "imperial" ? `${weightLbs} lbs` : `${weightKg} kg`}</td>
                  <td className="p-2 font-bold">James LBM (1976):</td>
                  <td className="p-2">{result.formulaResults[1]?.lbmLbs || "N/A"} lbs</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="p-2 font-bold">Body Height:</td>
                  <td className="p-2">{unitSystem === "imperial" ? `${heightFeet}'${heightInches}"` : `${heightCm} cm`}</td>
                  <td className="p-2 font-bold">Hume LBM (1966):</td>
                  <td className="p-2">{result.formulaResults[2]?.lbmLbs || "N/A"} lbs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t border-zinc-300 pt-4 text-[10px] text-zinc-500 space-y-1">
            <p className="font-bold text-zinc-700">Clinical &amp; Medical Disclaimer:</p>
            <p>
              This report is generated using clinical anthropometric formulas (Boer, James, Hume, Janmahasatian, and Peters). For critical pharmaceutical dosage calibration or medical evaluations, consult a licensed healthcare professional or DEXA scan technician.
            </p>
            <p className="text-zinc-400">© CalcPlatform Clinical Health Lab • All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
