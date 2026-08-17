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
  Activity,
  Layers,
  Zap,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  calculateTargetHeartRate,
  MhrMode,
  MhrFormula,
  CalculationMethod,
  TargetHeartRateResult,
} from "@/lib/formulas/targetHeartRate";

import {
  TargetHeartRateGauge,
  FormulaComparisonBarChart,
  TargetHeartRatePyramid,
} from "./TargetHeartRateCharts";

import { TargetHeartRateTables } from "./TargetHeartRateTables";

export function TargetHeartRateCalculator() {
  // Inputs
  const [mhrMode, setMhrMode] = useState<MhrMode>("estimate");
  const [age, setAge] = useState<number>(30);
  const [manualMhr, setManualMhr] = useState<number>(190);
  const [rhr, setRhr] = useState<number>(70);
  const [formula, setFormula] = useState<MhrFormula>("haskell");
  const [method, setMethod] = useState<CalculationMethod>("karvonen");
  const [borg620Rating, setBorg620Rating] = useState<number>(13);
  const [borgCR10Rating, setBorgCR10Rating] = useState<number>(4);

  // Saved calculations & copy state
  const [savedCalculations, setSavedCalculations] = useState<
    Array<{ id: string; timestamp: string; title: string; mhr: number; rhr: number }>
  >([]);
  const [copied, setCopied] = useState(false);

  const handleReset = () => {
    setMhrMode("estimate");
    setAge(30);
    setManualMhr(190);
    setRhr(70);
    setFormula("haskell");
    setMethod("karvonen");
    setBorg620Rating(13);
    setBorgCR10Rating(4);
  };

  // Primary Calculation Engine Call
  const result: TargetHeartRateResult = useMemo(() => {
    return calculateTargetHeartRate({
      mhrMode,
      age,
      manualMhr,
      rhr,
      formula,
      method,
      borg620Rating,
      borgCR10Rating,
    });
  }, [mhrMode, age, manualMhr, rhr, formula, method, borg620Rating, borgCR10Rating]);

  const handleSaveCalculation = () => {
    const newItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: `Age ${age}: MHR ${result.calculatedMhr} BPM (RHR ${result.rhr})`,
      mhr: result.calculatedMhr,
      rhr: result.rhr,
    };
    setSavedCalculations([newItem, ...savedCalculations]);
  };

  const handleCopySummary = () => {
    const summary = `Clinical Target Heart Rate Assessment Report (${new Date().toLocaleDateString()})
Maximum Heart Rate (MHR): ${result.calculatedMhr} BPM (${result.formulaName})
Resting Heart Rate (RHR): ${result.rhr} BPM | Heart Rate Reserve (HRR): ${result.hrr} BPM
Calculation Method: ${result.methodName}
Zone 1 (Recovery): ${result.zones[0].minBpm} – ${result.zones[0].maxBpm} BPM
Zone 2 (Fat Burn): ${result.zones[1].minBpm} – ${result.zones[1].maxBpm} BPM
Zone 3 (Aerobic): ${result.zones[2].minBpm} – ${result.zones[2].maxBpm} BPM
Zone 4 (Anaerobic): ${result.zones[3].minBpm} – ${result.zones[3].maxBpm} BPM
Zone 5 (VO2 Max): ${result.zones[4].minBpm} – ${result.zones[4].maxBpm} BPM
Calculated via CalcPlatform Clinical Cardiovascular Engine`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Target Heart Rate Assessment",
          text: `My calculated MHR is ${result.calculatedMhr} BPM with Zone 2 Fat Burn at ${result.zones[1].minBpm}-${result.zones[1].maxBpm} BPM! Calculate yours:`,
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
    const reportEl = document.getElementById("thr-print-report");
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
          <title>Clinical Target Heart Rate Assessment Report - CalcPlatform</title>
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
            .font-sans tabular-nums { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
            .text-zinc-900 { color: #18181b; }
            .text-zinc-800 { color: #27272a; }
            .text-zinc-700 { color: #3f3f46; }
            .text-zinc-500 { color: #71717a; }
            .text-zinc-400 { color: #a1a1aa; }
            .text-emerald-700 { color: #047857; }
            .text-blue-700 { color: #1d4ed8; }
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
          .thr-calculator-main-ui, nav, header, footer, sidebar {
            display: none !important;
          }
          #thr-print-report {
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

      <div className="thr-calculator-main-ui space-y-6">
        {/* Main Interactive Calculator Card */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm">
          <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <HeartPulse className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  Target Heart Rate Calculator &amp; Cardio Suite
                </CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1">
                  Haskell &amp; Fox, Tanaka, Nes, Gellish Formulas &amp; Karvonen HRR Engine
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
            {/* Top Controls: MHR Mode Toggle */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
              <Label className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400 block">Max Heart Rate Calculation Mode</Label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setMhrMode("estimate")}
                  className={`py-2 px-3 rounded-lg border transition-all ${mhrMode === "estimate" ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800"}`}
                >
                  Estimate MHR from Age
                </button>
                <button
                  type="button"
                  onClick={() => setMhrMode("manual")}
                  className={`py-2 px-3 rounded-lg border transition-all ${mhrMode === "manual" ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800"}`}
                >
                  Enter Test Result MHR
                </button>
              </div>
            </div>

            {/* Main Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Age */}
              {mhrMode === "estimate" ? (
                <div>
                  <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Age (years)</Label>
                  <Input
                    type="number"
                    min={15}
                    max={110}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="text-xs font-sans tabular-nums font-bold"
                  />
                </div>
              ) : (
                <div>
                  <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Manual Max HR (BPM)</Label>
                  <Input
                    type="number"
                    min={100}
                    max={250}
                    value={manualMhr}
                    onChange={(e) => setManualMhr(Number(e.target.value))}
                    className="text-xs font-sans tabular-nums font-bold"
                  />
                </div>
              )}

              {/* Resting Heart Rate */}
              <div>
                <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Resting Heart Rate (BPM)</Label>
                <Input
                  type="number"
                  min={30}
                  max={120}
                  value={rhr}
                  onChange={(e) => setRhr(Number(e.target.value))}
                  className="text-xs font-sans tabular-nums font-bold"
                />
              </div>

              {/* Formula Selector */}
              {mhrMode === "estimate" && (
                <div>
                  <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">MHR Formula</Label>
                  <select
                    value={formula}
                    onChange={(e) => setFormula(e.target.value as MhrFormula)}
                    className="w-full h-9 px-3 text-xs font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="haskell">Haskell &amp; Fox (220 - Age)</option>
                    <option value="tanaka">Tanaka et al. (208 - 0.7 × Age)</option>
                    <option value="nes">Nes et al. (211 - 0.64 × Age)</option>
                    <option value="gellish">Gellish et al. (207 - 0.7 × Age)</option>
                  </select>
                </div>
              )}

              {/* Method Selector */}
              <div>
                <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Intensity Calculation Method</Label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as CalculationMethod)}
                  className="w-full h-9 px-3 text-xs font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="karvonen">Karvonen Method (Uses HRR)</option>
                  <option value="standard">Standard Maximum HR %</option>
                  <option value="borg620">Borg RPE Scale (6 to 20)</option>
                  <option value="borgCR10">Borg CR10 Scale (0 to 10)</option>
                </select>
              </div>
            </div>

            {/* Borg Rating Inputs if active */}
            {method === "borg620" && (
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 space-y-2">
                <Label className="text-xs font-bold text-purple-900 dark:text-purple-200 block">Select Borg 6-20 Exertion Rating ({borg620Rating})</Label>
                <input
                  type="range"
                  min={6}
                  max={20}
                  step={1}
                  value={borg620Rating}
                  onChange={(e) => setBorg620Rating(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
                <div className="flex justify-between text-[10px] text-purple-700 dark:text-purple-300 font-semibold">
                  <span>6: No exertion</span>
                  <span>13: Somewhat hard</span>
                  <span>20: Maximal effort</span>
                </div>
              </div>
            )}

            {method === "borgCR10" && (
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 space-y-2">
                <Label className="text-xs font-bold text-purple-900 dark:text-purple-200 block">Select Borg CR10 Rating ({borgCR10Rating})</Label>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.5}
                  value={borgCR10Rating}
                  onChange={(e) => setBorgCR10Rating(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
                <div className="flex justify-between text-[10px] text-purple-700 dark:text-purple-300 font-semibold">
                  <span>0: Rest</span>
                  <span>4: Somewhat difficult</span>
                  <span>10: Maximal</span>
                </div>
              </div>
            )}

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
            <TargetHeartRateGauge result={result} />
            <FormulaComparisonBarChart result={result} />
            <TargetHeartRatePyramid result={result} />
          </div>

          {/* Result Cards & Method Comparison */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Cardiovascular Parameters &amp; Target Zones
                </h4>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {result.methodName}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Max Heart Rate (MHR)</span>
                  <strong className="text-xl font-black text-emerald-600 dark:text-emerald-400 block mt-0.5">{result.calculatedMhr} BPM</strong>
                  <span className="text-[10px] text-zinc-400 block">{result.formulaName}</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Resting HR (RHR)</span>
                  <strong className="text-xl font-black text-blue-600 dark:text-blue-400 block mt-0.5">{result.rhr} BPM</strong>
                  <span className="text-[10px] text-zinc-400 block">Baseline Fitness</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Heart Rate Reserve</span>
                  <strong className="text-xl font-black text-purple-600 dark:text-purple-400 block mt-0.5">{result.hrr} BPM</strong>
                  <span className="text-[10px] text-zinc-400 block">MHR − RHR Range</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Zone 2 Fat Burning</span>
                  <strong className="text-xl font-black text-amber-600 dark:text-amber-400 block mt-0.5">{result.zones[1]?.minBpm} – {result.zones[1]?.maxBpm}</strong>
                  <span className="text-[10px] text-zinc-400 block">60% – 70% Range</span>
                </div>
              </div>
            </div>

            {/* Auxiliary Tables */}
            <TargetHeartRateTables result={result} />
          </div>
        </div>
      </div>

      {/* Standalone Printable PDF Report Section */}
      <div id="thr-print-report" className="hidden">
        <div className="p-8 max-w-4xl mx-auto space-y-6 bg-white text-zinc-900 font-sans">
          <div className="border-b-2 border-emerald-600 pb-4 flex justify-between items-start">
            <div>
              <div className="text-xs font-black tracking-widest text-emerald-700 uppercase">
                CalcPlatform Clinical Cardiovascular &amp; Sports Science Lab
              </div>
              <h1 className="text-2xl font-black text-blue-600 mt-1">
                Clinical Target Heart Rate Assessment Report
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                Haskell &amp; Fox, Tanaka, Nes, Gellish &amp; Karvonen HRR Cardiovascular Analysis
              </p>
            </div>
            <div className="text-right text-xs text-zinc-500">
              <p className="font-bold text-zinc-800" suppressHydrationWarning>Date: {new Date().toLocaleDateString()}</p>
              <p suppressHydrationWarning>Time: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              <p className="font-sans tabular-nums text-[10px] text-zinc-400 mt-1" suppressHydrationWarning>Ref ID: #THR-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-center">
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Max Heart Rate</span>
              <strong className="text-xl font-black text-emerald-700 block mt-1">{result.calculatedMhr} BPM</strong>
              <span className="text-[9px] text-zinc-500 block">{result.formulaName}</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Resting HR (RHR)</span>
              <strong className="text-xl font-black text-blue-700 block mt-1">{result.rhr} BPM</strong>
              <span className="text-[9px] text-zinc-500 block">Baseline Measurement</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Heart Rate Reserve</span>
              <strong className="text-xl font-black text-purple-700 block mt-1">{result.hrr} BPM</strong>
              <span className="text-[9px] text-zinc-500 block">MHR - RHR Range</span>
            </div>
            <div className="p-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Zone 2 Fat Burn</span>
              <strong className="text-xl font-black text-amber-700 block mt-1">{result.zones[1]?.minBpm} - {result.zones[1]?.maxBpm} BPM</strong>
              <span className="text-[9px] text-zinc-500 block">60% - 70% Range</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-zinc-300 pb-1">
              1. 5 Standard Target Heart Rate Training Zones
            </h3>
            <table className="w-full text-xs text-left border border-zinc-200 border-collapse">
              <thead>
                <tr className="bg-zinc-100 font-bold">
                  <th className="p-2 border border-zinc-200">Zone</th>
                  <th className="p-2 border border-zinc-200">Intensity Range</th>
                  <th className="p-2 border border-zinc-200">Target BPM Range</th>
                  <th className="p-2 border border-zinc-200">Primary Training Benefit</th>
                </tr>
              </thead>
              <tbody>
                {result.zones.map((z) => (
                  <tr key={z.zoneNumber} className="border-b border-zinc-200">
                    <td className="p-2 font-bold">{z.zoneName}</td>
                    <td className="p-2 font-sans tabular-nums font-bold text-emerald-700">{z.percentageRange}</td>
                    <td className="p-2 font-sans tabular-nums font-bold text-blue-700">{z.minBpm} – {z.maxBpm} BPM</td>
                    <td className="p-2 text-zinc-600">{z.benefit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-zinc-300 pt-4 text-[10px] text-zinc-500 space-y-1">
            <p className="font-bold text-zinc-700">Clinical &amp; Exercise Science Disclaimer:</p>
            <p>
              This report is generated using recognized cardiovascular equations (Haskell &amp; Fox, Tanaka, Nes, Gellish, and Karvonen). Always consult your cardiologist or physician before starting high-intensity Zone 4/5 exercise protocols.
            </p>
            <p className="text-zinc-400">© CalcPlatform Clinical Health Lab • All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
