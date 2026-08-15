"use client";

import React, { useState, useMemo } from "react";
import {
  ShieldCheck,
  Bookmark,
  Share2,
  Printer,
  Copy,
  Check,
  RefreshCw,
  Info,
  Award,
  AlertTriangle,
  Scale,
  Activity,
  Flame,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  calculateArmyBodyFat,
  UnitSystem,
  Gender,
  CalculationMethod,
  ArmyBodyFatResult,
} from "@/lib/formulas/armyBodyFat";

import {
  ArmyComplianceGauge,
  BodyCompositionBarChart,
} from "./ArmyBodyFatCharts";

import { ArmyBodyFatTables } from "./ArmyBodyFatTables";

export function ArmyBodyFatCalculator() {
  // Input states
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  const [gender, setGender] = useState<Gender>("male");
  const [method, setMethod] = useState<CalculationMethod>("army_2023_single_site");
  const [age, setAge] = useState<number>(25);

  // Imperial inputs
  const [weightLbs, setWeightLbs] = useState<number>(175);
  const [heightInches, setHeightInches] = useState<number>(70);
  const [waistInches, setWaistInches] = useState<number>(34);
  const [neckInches, setNeckInches] = useState<number>(15.5);
  const [hipInches, setHipInches] = useState<number>(38);

  // Metric inputs
  const [weightKg, setWeightKg] = useState<number>(79.4);
  const [heightCm, setHeightCm] = useState<number>(177.8);
  const [waistCm, setWaistCm] = useState<number>(86.4);
  const [neckCm, setNeckCm] = useState<number>(39.4);
  const [hipCm, setHipCm] = useState<number>(96.5);

  // ACFT Exemption states
  const [acftScore, setAcftScore] = useState<number>(540);
  const [acftPassedAll80, setAcftPassedAll80] = useState<boolean>(true);
  const [enableAcftCheck, setEnableAcftCheck] = useState<boolean>(false);

  // Saved calculations & copy feedback
  const [savedCalculations, setSavedCalculations] = useState<
    Array<{ id: string; timestamp: string; title: string; bfPct: number; status: string }>
  >([]);
  const [copied, setCopied] = useState(false);

  const handleReset = () => {
    setUnitSystem("imperial");
    setGender("male");
    setMethod("army_2023_single_site");
    setAge(25);
    setWeightLbs(175);
    setHeightInches(70);
    setWaistInches(34);
    setNeckInches(15.5);
    setHipInches(38);
    setWeightKg(79.4);
    setHeightCm(177.8);
    setWaistCm(86.4);
    setNeckCm(39.4);
    setHipCm(96.5);
    setAcftScore(540);
    setAcftPassedAll80(true);
    setEnableAcftCheck(false);
  };

  const handleUnitSystemToggle = (newSys: UnitSystem) => {
    if (newSys === unitSystem) return;
    if (newSys === "metric") {
      setWeightKg(parseFloat((weightLbs / 2.20462).toFixed(1)));
      setHeightCm(parseFloat((heightInches * 2.54).toFixed(1)));
      setWaistCm(parseFloat((waistInches * 2.54).toFixed(1)));
      setNeckCm(parseFloat((neckInches * 2.54).toFixed(1)));
      setHipCm(parseFloat((hipInches * 2.54).toFixed(1)));
    } else {
      setWeightLbs(parseFloat((weightKg * 2.20462).toFixed(1)));
      setHeightInches(parseFloat((heightCm / 2.54).toFixed(1)));
      setWaistInches(parseFloat((waistCm / 2.54).toFixed(1)));
      setNeckInches(parseFloat((neckCm / 2.54).toFixed(1)));
      setHipInches(parseFloat((hipCm / 2.54).toFixed(1)));
    }
    setUnitSystem(newSys);
  };

  // Primary Calculation Engine Call
  const result: ArmyBodyFatResult = useMemo(() => {
    return calculateArmyBodyFat({
      unitSystem,
      gender,
      calculationMethod: method,
      age,
      weightLbs,
      weightKg,
      heightInches,
      heightCm,
      waistInches,
      waistCm,
      neckInches,
      neckCm,
      hipInches,
      hipCm,
      acftScore: enableAcftCheck ? acftScore : 0,
      acftPassedAllEvents80: enableAcftCheck ? acftPassedAll80 : false,
    });
  }, [
    unitSystem,
    gender,
    method,
    age,
    weightLbs,
    weightKg,
    heightInches,
    heightCm,
    waistInches,
    waistCm,
    neckInches,
    neckCm,
    hipInches,
    hipCm,
    enableAcftCheck,
    acftScore,
    acftPassedAll80,
  ]);

  const handleSaveCalculation = () => {
    const newItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: `${gender.toUpperCase()} (${age} y/o) - ${result.bodyFatPercentage}% Body Fat`,
      bfPct: result.bodyFatPercentage,
      status: result.isCompliant ? "PASS" : "ABCP FAIL",
    };
    setSavedCalculations([newItem, ...savedCalculations]);
  };

  const handleCopySummary = () => {
    const summary = `U.S. Army Body Fat Assessment Report (${new Date().toLocaleDateString()})
Gender: ${gender.toUpperCase()} | Age: ${age} (${result.ageBracketLabel})
Calculated Body Fat: ${result.bodyFatPercentage}%
Max Allowable Army Limit: ${result.maxAllowableBodyFat}%
AR 600-9 Compliance Status: ${result.isAcftExempt ? "EXEMPT (ACFT 540+ Rule)" : result.isCompliant ? "PASS" : "ABCP OVERWEIGHT FLAG"}
Lean Mass: ${result.leanMassLbs} lbs (${result.leanMassKg} kg)
Fat Mass: ${result.fatMassLbs} lbs (${result.fatMassKg} kg)
Method: ${result.methodUsedLabel}
Calculated via CalcPlatform Military Health Engine`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "U.S. Army Body Fat & AR 600-9 Assessment",
          text: `My Army Body Fat is ${result.bodyFatPercentage}% (AR 600-9 Limit: ${result.maxAllowableBodyFat}%). Assessment Status: ${result.isCompliant ? "PASS" : "FAIL"}. Calculate yours:`,
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
    const reportEl = document.getElementById("army-print-report");
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
          <title>U.S. Army Body Fat &amp; AR 600-9 Compliance Report - CalcPlatform</title>
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
          .army-calculator-main-ui, nav, header, footer, sidebar {
            display: none !important;
          }
          #army-print-report {
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

      <div className="army-calculator-main-ui space-y-6">
        {/* Main Interactive Calculator Card */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm">
          <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  U.S. Army Body Fat Calculator &amp; AR 600-9 Suite
                </CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1">
                  June 12, 2023 Directive 1-Site Tape Test, Navy 3-Site Method &amp; ACFT 540+ Exemption Evaluator
                </CardDescription>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Defaults
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 space-y-6">
            {/* Top Control Bar: Unit Toggle, Gender, & Method */}
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
                    Imperial (lbs / in)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitSystemToggle("metric")}
                    className={`py-1 rounded transition-all ${unitSystem === "metric" ? "bg-emerald-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    Metric (kg / cm)
                  </button>
                </div>
              </div>

              {/* Gender */}
              <div>
                <Label className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 block">Soldier Gender</Label>
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

              {/* Tape Calculation Method */}
              <div>
                <Label className="text-[11px] font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1 block">Testing Protocol</Label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as CalculationMethod)}
                  className="w-full h-8 px-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  <option value="army_2023_single_site">Army 2023 Directive (1-Site Waist)</option>
                  <option value="navy_traditional_multi_site">DoD / Navy Traditional (Multi-Site Tape)</option>
                </select>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Age */}
              <div>
                <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Soldier Age (years)</Label>
                <Input
                  type="number"
                  min={17}
                  max={80}
                  value={age}
                  onChange={(e) => setAge(Math.max(17, Math.min(80, Number(e.target.value) || 25)))}
                  className="text-xs font-sans tabular-nums font-bold"
                />
              </div>

              {/* Weight */}
              <div>
                <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Body Weight ({unitSystem === "imperial" ? "lbs" : "kg"})</Label>
                <Input
                  type="number"
                  step={0.1}
                  min={80}
                  max={500}
                  value={unitSystem === "imperial" ? weightLbs : weightKg}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (unitSystem === "imperial") setWeightLbs(val);
                    else setWeightKg(val);
                  }}
                  className="text-xs font-sans tabular-nums font-bold"
                />
              </div>

              {/* Height */}
              <div>
                <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Height ({unitSystem === "imperial" ? "inches" : "cm"})</Label>
                <Input
                  type="number"
                  step={0.1}
                  min={40}
                  max={90}
                  value={unitSystem === "imperial" ? heightInches : heightCm}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (unitSystem === "imperial") setHeightInches(val);
                    else setHeightCm(val);
                  }}
                  className="text-xs font-sans tabular-nums font-bold"
                />
              </div>

              {/* Abdominal Waist */}
              <div>
                <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Abdominal Waist ({unitSystem === "imperial" ? "inches" : "cm"})</Label>
                <Input
                  type="number"
                  step={0.1}
                  min={20}
                  max={70}
                  value={unitSystem === "imperial" ? waistInches : waistCm}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (unitSystem === "imperial") setWaistInches(val);
                    else setWaistCm(val);
                  }}
                  className="text-xs font-sans tabular-nums font-bold"
                />
              </div>

              {/* Multi-site inputs (Neck / Hip) if Navy method selected */}
              {method === "navy_traditional_multi_site" && (
                <>
                  <div>
                    <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Neck Circumference ({unitSystem === "imperial" ? "inches" : "cm"})</Label>
                    <Input
                      type="number"
                      step={0.1}
                      min={10}
                      max={30}
                      value={unitSystem === "imperial" ? neckInches : neckCm}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (unitSystem === "imperial") setNeckInches(val);
                        else setNeckCm(val);
                      }}
                      className="text-xs font-sans tabular-nums font-bold"
                    />
                  </div>

                  {gender === "female" && (
                    <div>
                      <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1 block">Hip Circumference ({unitSystem === "imperial" ? "inches" : "cm"})</Label>
                      <Input
                        type="number"
                        step={0.1}
                        min={20}
                        max={70}
                        value={unitSystem === "imperial" ? hipInches : hipCm}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (unitSystem === "imperial") setHipInches(val);
                          else setHipCm(val);
                        }}
                        className="text-xs font-sans tabular-nums font-bold"
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ACFT 540+ Score Exemption Check Box */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="acft-exemption"
                  checked={enableAcftCheck}
                  onChange={(e) => setEnableAcftCheck(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                />
                <Label htmlFor="acft-exemption" className="text-xs font-bold text-zinc-900 dark:text-zinc-100 cursor-pointer">
                  Enable ACFT 540+ Score Exemption Rule (June 12, 2023 Directive)
                </Label>
              </div>

              {enableAcftCheck && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-zinc-200/60 dark:border-zinc-800 text-xs">
                  <div>
                    <Label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Total Record ACFT Score (0 - 600)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={600}
                      value={acftScore}
                      onChange={(e) => setAcftScore(Number(e.target.value))}
                      className="text-xs font-sans tabular-nums font-bold"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-4">
                    <input
                      type="checkbox"
                      id="acft-all-80"
                      checked={acftPassedAll80}
                      onChange={(e) => setAcftPassedAll80(e.target.checked)}
                      className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <Label htmlFor="acft-all-80" className="text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer">
                      Scored 80+ points in every single ACFT event
                    </Label>
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleSaveCalculation} className="bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 text-xs gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
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
            <ArmyComplianceGauge result={result} />
            <BodyCompositionBarChart result={result} />
          </div>

          {/* Result Cards & Method Comparison */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  U.S. Army Compliance Dashboard
                </h4>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${result.isCompliant ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800" : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800"}`}>
                  {result.isAcftExempt ? "EXEMPT (ACFT 540+)" : result.isCompliant ? "AR 600-9 PASS" : "ABCP OVERWEIGHT FLAG"}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Body Fat %</span>
                  <strong className={`text-2xl font-black block mt-0.5 ${result.isCompliant ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{result.bodyFatPercentage}%</strong>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Max Army Limit ({result.ageBracketLabel})</span>
                  <strong className="text-2xl font-black text-blue-600 dark:text-blue-400 block mt-0.5">{result.maxAllowableBodyFat}%</strong>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Lean Muscle Mass</span>
                  <strong className="text-2xl font-black text-purple-600 dark:text-purple-400 block mt-0.5">{result.leanMassLbs} lbs</strong>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Fat Mass</span>
                  <strong className="text-2xl font-black text-amber-600 dark:text-amber-400 block mt-0.5">{result.fatMassLbs} lbs</strong>
                </div>
              </div>
            </div>

            {/* Auxiliary Tables */}
            <ArmyBodyFatTables result={result} />
          </div>
        </div>
      </div>

      {/* Standalone Printable PDF Report Section */}
      <div id="army-print-report" className="hidden">
        <div className="p-8 max-w-4xl mx-auto space-y-6 bg-white text-zinc-900 font-sans">
          <div className="border-b-2 border-emerald-600 pb-4 flex justify-between items-start">
            <div>
              <div className="text-xs font-black tracking-widest text-emerald-700 uppercase">
                CalcPlatform Military Health &amp; Readiness Lab
              </div>
              <h1 className="text-2xl font-black text-blue-600 mt-1">
                Official U.S. Army Body Fat &amp; AR 600-9 Compliance Assessment
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                June 12, 2023 Directive 1-Site Tape Test &amp; ACFT Readiness Standard
              </p>
            </div>
            <div className="text-right text-xs text-zinc-500">
              <p className="font-bold text-zinc-800" suppressHydrationWarning>Date: {new Date().toLocaleDateString()}</p>
              <p suppressHydrationWarning>Time: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              <p className="font-sans tabular-nums text-[10px] text-zinc-400 mt-1" suppressHydrationWarning>Ref ID: #ARMY-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-center">
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Body Fat %</span>
              <strong className="text-xl font-black text-emerald-700 block mt-1">{result.bodyFatPercentage}%</strong>
              <span className="text-[9px] text-zinc-500 block">{result.category}</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Max Army Standard</span>
              <strong className="text-xl font-black text-blue-700 block mt-1">{result.maxAllowableBodyFat}%</strong>
              <span className="text-[9px] text-zinc-500 block">{result.ageBracketLabel}</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">AR 600-9 Status</span>
              <strong className={`text-xl font-black block mt-1 ${result.isCompliant ? "text-emerald-700" : "text-rose-700"}`}>
                {result.isAcftExempt ? "EXEMPT" : result.isCompliant ? "PASS" : "FAIL"}
              </strong>
              <span className="text-[9px] text-zinc-500 block">{result.isAcftExempt ? "ACFT 540+ Rule" : "AR 600-9 Compliant"}</span>
            </div>
            <div className="p-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Lean Mass</span>
              <strong className="text-xl font-black text-purple-700 block mt-1">{result.leanMassLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">{result.leanMassKg} kg</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-zinc-300 pb-1">
              1. Assessment Parameters &amp; Body Composition
            </h3>
            <table className="w-full text-xs text-left border border-zinc-200 border-collapse">
              <tbody>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <td className="p-2 font-bold w-1/4">Gender / Age:</td>
                  <td className="p-2 w-1/4">{gender.toUpperCase()} / {age} years</td>
                  <td className="p-2 font-bold w-1/4">Assessment Protocol:</td>
                  <td className="p-2 w-1/4">{result.methodUsedLabel}</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="p-2 font-bold">Body Weight:</td>
                  <td className="p-2">{unitSystem === "imperial" ? `${weightLbs} lbs` : `${weightKg} kg`}</td>
                  <td className="p-2 font-bold">Abdominal Waist:</td>
                  <td className="p-2">{unitSystem === "imperial" ? `${waistInches} in` : `${waistCm} cm`}</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="p-2 font-bold">Fat Mass:</td>
                  <td className="p-2">{result.fatMassLbs} lbs ({result.fatMassKg} kg)</td>
                  <td className="p-2 font-bold">Required Weight Loss:</td>
                  <td className="p-2">{result.requiredWeightLossLbs} lbs ({result.requiredWeightLossKg} kg)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t border-zinc-300 pt-4 text-[10px] text-zinc-500 space-y-1">
            <p className="font-bold text-zinc-700">Official Military Disclaimer:</p>
            <p>
              This calculation is based on U.S. Army Regulation AR 600-9 and June 12, 2023 Army Directive guidelines. Formal flagging or ABCP enrollment requires certified measurement by trained unit personnel.
            </p>
            <p className="text-zinc-400">© CalcPlatform Military Readiness Lab • All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
