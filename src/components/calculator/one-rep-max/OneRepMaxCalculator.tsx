"use client";

import React, { useState, useMemo } from "react";
import {
  Dumbbell,
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
  Zap,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  calculateOneRepMax,
  UnitSystem,
  ExerciseType,
  OneRepMaxResult,
} from "@/lib/formulas/oneRepMax";

import {
  OneRepMaxGauge,
  FormulaComparisonBarChart,
} from "./OneRepMaxCharts";

import { OneRepMaxTables } from "./OneRepMaxTables";

export function OneRepMaxCalculator() {
  // Inputs
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  const [exercise, setExercise] = useState<ExerciseType>("bench");
  const [weightLifted, setWeightLifted] = useState<number>(185);
  const [reps, setReps] = useState<number>(5);

  // Saved calculations & copy state
  const [savedCalculations, setSavedCalculations] = useState<
    Array<{ id: string; timestamp: string; title: string; maxWeight: number; exercise: string }>
  >([]);
  const [copied, setCopied] = useState(false);

  const handleReset = () => {
    setUnitSystem("imperial");
    setExercise("bench");
    setWeightLifted(185);
    setReps(5);
  };

  const handleUnitSystemToggle = (newSys: UnitSystem) => {
    if (newSys === unitSystem) return;
    if (newSys === "metric") {
      setWeightLifted(parseFloat((weightLifted / 2.20462).toFixed(1)));
    } else {
      setWeightLifted(parseFloat((weightLifted * 2.20462).toFixed(1)));
    }
    setUnitSystem(newSys);
  };

  // Primary Calculation Engine Call
  const result: OneRepMaxResult = useMemo(() => {
    return calculateOneRepMax({
      unitSystem,
      exercise,
      weightLifted,
      reps,
    });
  }, [unitSystem, exercise, weightLifted, reps]);

  const handleSaveCalculation = () => {
    const newItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: `${result.exerciseName}: ${result.consensusOneRepMax} ${result.unitLabel} 1RM`,
      maxWeight: result.consensusOneRepMax,
      exercise: result.exerciseName,
    };
    setSavedCalculations([newItem, ...savedCalculations]);
  };

  const handleCopySummary = () => {
    const summary = `Clinical One Rep Max (1RM) Assessment Report (${new Date().toLocaleDateString()})
Exercise: ${result.exerciseName}
Input Performance: ${result.weightLifted} ${result.unitLabel} × ${result.repsPerformed} reps
Consensus 1RM: ${result.consensusOneRepMax} ${result.unitLabel}
Epley Formula 1RM: ${result.formulaResults[0]?.oneRepMax || result.consensusOneRepMax} ${result.unitLabel}
Brzycki Formula 1RM: ${result.formulaResults[1]?.oneRepMax || result.consensusOneRepMax} ${result.unitLabel}
5RM Working Target: ${result.repBreakdown[4]?.weight || "N/A"} ${result.unitLabel}
10RM Working Target: ${result.repBreakdown[9]?.weight || "N/A"} ${result.unitLabel}
Calculated via CalcPlatform Clinical Strength Engine`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My One Rep Max Assessment",
          text: `My calculated 1RM for ${result.exerciseName} is ${result.consensusOneRepMax} ${result.unitLabel}! Calculate yours:`,
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
    const reportEl = document.getElementById("orm-print-report");
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
          <title>Clinical One Rep Max Assessment Report - CalcPlatform</title>
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
            .border-purple-600 { border-color: #9333ea; }
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
            .text-purple-700 { color: #7e22ce; }
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
          .orm-calculator-main-ui, nav, header, footer, sidebar {
            display: none !important;
          }
          #orm-print-report {
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

      <div className="orm-calculator-main-ui space-y-6">
        {/* Main Interactive Calculator Card */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm">
          <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Dumbbell className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  One Rep Max (1RM) Calculator &amp; Strength Suite
                </CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1">
                  Epley, Brzycki, Lombardi, Mayhew, O'Conner, Wathan &amp; Lander Strength Equations
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
            {/* Top Control Bar: Unit System & Exercise Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
              {/* Unit System */}
              <div>
                <Label className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 block">Unit System</Label>
                <div className="grid grid-cols-2 gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => handleUnitSystemToggle("imperial")}
                    className={`py-1 rounded transition-all ${unitSystem === "imperial" ? "bg-purple-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    US Pounds (lbs)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitSystemToggle("metric")}
                    className={`py-1 rounded transition-all ${unitSystem === "metric" ? "bg-purple-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    Metric (kg)
                  </button>
                </div>
              </div>

              {/* Exercise Type */}
              <div>
                <Label className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 block">Exercise Selection</Label>
                <select
                  value={exercise}
                  onChange={(e) => setExercise(e.target.value as ExerciseType)}
                  className="w-full h-9 px-3 text-xs font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="bench">Bench Press</option>
                  <option value="squat">Barbell Squat</option>
                  <option value="deadlift">Deadlift</option>
                  <option value="press">Overhead Press</option>
                  <option value="custom">Custom Movement</option>
                </select>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Weight Lifted */}
              <div>
                <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Weight Lifted ({result.unitLabel})</Label>
                <Input
                  type="number"
                  step={0.5}
                  min={1}
                  max={1500}
                  value={weightLifted}
                  onChange={(e) => setWeightLifted(Number(e.target.value))}
                  className="text-xs font-sans tabular-nums font-bold"
                />
              </div>

              {/* Repetitions Performed */}
              <div>
                <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Repetitions Performed (1-15 reps)</Label>
                <Input
                  type="number"
                  min={1}
                  max={15}
                  value={reps}
                  onChange={(e) => setReps(Number(e.target.value))}
                  className="text-xs font-sans tabular-nums font-bold"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleSaveCalculation} className="bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 text-xs gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  Save Calculation
                </Button>

                <Button variant="outline" size="sm" onClick={handleCopySummary} className="bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 text-xs gap-1.5">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
                  {copied ? "Copied!" : "Copy Summary"}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleShare} className="bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 text-xs gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Share
                </Button>

                <Button variant="outline" size="sm" onClick={handlePrint} className="bg-purple-600 text-white hover:bg-purple-700 border-purple-600 text-xs gap-1.5 shadow-sm">
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
            <OneRepMaxGauge result={result} />
            <FormulaComparisonBarChart result={result} />
          </div>

          {/* Result Cards & Method Comparison */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Consensus Strength &amp; 1RM Summary
                </h4>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 rounded-full border border-purple-200 dark:border-purple-800">
                  {result.exerciseName}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Consensus 1RM</span>
                  <strong className="text-xl font-black text-purple-600 dark:text-purple-400 block mt-0.5">{result.consensusOneRepMax} {result.unitLabel}</strong>
                  <span className="text-[10px] text-zinc-400 block">7 Formula Mean</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Epley 1RM</span>
                  <strong className="text-xl font-black text-blue-600 dark:text-blue-400 block mt-0.5">{result.formulaResults[0]?.oneRepMax || result.consensusOneRepMax} {result.unitLabel}</strong>
                  <span className="text-[10px] text-zinc-400 block">Standard Formula</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Brzycki 1RM</span>
                  <strong className="text-xl font-black text-emerald-600 dark:text-emerald-400 block mt-0.5">{result.formulaResults[1]?.oneRepMax || result.consensusOneRepMax} {result.unitLabel}</strong>
                  <span className="text-[10px] text-zinc-400 block">Clinical Powerlifting</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">5RM Working Weight</span>
                  <strong className="text-xl font-black text-amber-600 dark:text-amber-400 block mt-0.5">{result.repBreakdown[4]?.weight || "N/A"} {result.unitLabel}</strong>
                  <span className="text-[10px] text-zinc-400 block">87% of 1RM</span>
                </div>
              </div>
            </div>

            {/* Auxiliary Tables */}
            <OneRepMaxTables result={result} />
          </div>
        </div>
      </div>

      {/* Standalone Printable PDF Report Section */}
      <div id="orm-print-report" className="hidden">
        <div className="p-8 max-w-4xl mx-auto space-y-6 bg-white text-zinc-900 font-sans">
          <div className="border-b-2 border-purple-600 pb-4 flex justify-between items-start">
            <div>
              <div className="text-xs font-black tracking-widest text-purple-700 uppercase">
                CalcPlatform Clinical Neuromuscular &amp; Sports Science Lab
              </div>
              <h1 className="text-2xl font-black text-blue-600 mt-1">
                Clinical One Rep Max (1RM) &amp; Strength Performance Assessment
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                Epley, Brzycki, Lombardi, Mayhew, O'Conner, Wathan &amp; Lander Strength Analysis
              </p>
            </div>
            <div className="text-right text-xs text-zinc-500">
              <p className="font-bold text-zinc-800" suppressHydrationWarning>Date: {new Date().toLocaleDateString()}</p>
              <p suppressHydrationWarning>Time: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              <p className="font-sans tabular-nums text-[10px] text-zinc-400 mt-1" suppressHydrationWarning>Ref ID: #1RM-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-center">
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Consensus 1RM</span>
              <strong className="text-xl font-black text-purple-700 block mt-1">{result.consensusOneRepMax} {result.unitLabel}</strong>
              <span className="text-[9px] text-zinc-500 block">Peak Neuromuscular Force</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Lifted Performance</span>
              <strong className="text-xl font-black text-blue-700 block mt-1">{result.weightLifted} {result.unitLabel}</strong>
              <span className="text-[9px] text-zinc-500 block">× {result.repsPerformed} repetitions</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">5RM Hypertrophy</span>
              <strong className="text-xl font-black text-emerald-700 block mt-1">{result.repBreakdown[4]?.weight || "N/A"} {result.unitLabel}</strong>
              <span className="text-[9px] text-zinc-500 block">87% of 1RM</span>
            </div>
            <div className="p-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">10RM Endurance</span>
              <strong className="text-xl font-black text-amber-700 block mt-1">{result.repBreakdown[9]?.weight || "N/A"} {result.unitLabel}</strong>
              <span className="text-[9px] text-zinc-500 block">75% of 1RM</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-zinc-300 pb-1">
              1. Strength Parameters &amp; Clinical Formula Breakdown
            </h3>
            <table className="w-full text-xs text-left border border-zinc-200 border-collapse">
              <tbody>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <td className="p-2 font-bold w-1/4">Exercise Movement:</td>
                  <td className="p-2 w-1/4">{result.exerciseName}</td>
                  <td className="p-2 font-bold w-1/4">Epley 1RM (1985):</td>
                  <td className="p-2 w-1/4">{result.formulaResults[0]?.oneRepMax || result.consensusOneRepMax} {result.unitLabel}</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="p-2 font-bold">Input Weight &amp; Reps:</td>
                  <td className="p-2">{result.weightLifted} {result.unitLabel} × {result.repsPerformed} reps</td>
                  <td className="p-2 font-bold">Brzycki 1RM (1993):</td>
                  <td className="p-2">{result.formulaResults[1]?.oneRepMax || "N/A"} {result.unitLabel}</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="p-2 font-bold">Unit System:</td>
                  <td className="p-2">{result.unitSystem.toUpperCase()}</td>
                  <td className="p-2 font-bold">Lombardi 1RM (1989):</td>
                  <td className="p-2">{result.formulaResults[2]?.oneRepMax || "N/A"} {result.unitLabel}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t border-zinc-300 pt-4 text-[10px] text-zinc-500 space-y-1">
            <p className="font-bold text-zinc-700">Clinical &amp; Exercise Science Disclaimer:</p>
            <p>
              This report is generated using recognized strength equations (Epley, Brzycki, Lombardi, Mayhew, O'Conner, Wathan, and Lander). Always ensure proper warm-up, spotter presence, and strict biomechanical execution during maximal weight attempts.
            </p>
            <p className="text-zinc-400">© CalcPlatform Clinical Health Lab • All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
