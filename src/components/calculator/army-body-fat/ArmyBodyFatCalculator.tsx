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
  AlertTriangle,
  History,
  Info,
  Scale,
  Ruler,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  calculateArmyWHtR,
  calculateArmyBodyFat,
  UnitSystem,
  Gender,
  CalculationMethod,
  ArmyComplianceMode,
  ArmyWHtRResult,
  ArmyBodyFatResult,
  CURRENT_ARMY_BODY_COMPOSITION_POLICY,
} from "@/lib/formulas/armyBodyFat";

import {
  ArmyWHtRGauge,
  HistoricalArmyComplianceGauge,
  BodyCompositionBarChart,
} from "./ArmyBodyFatCharts";

import { ArmyWHtRTables, HistoricalArmyTables } from "./ArmyBodyFatTables";

export function ArmyBodyFatCalculator() {
  // Mode selection: 2026 WHtR (sole official standard) vs Historical 2023 Reference
  const [complianceMode, setComplianceMode] = useState<ArmyComplianceMode>("current_2026_whtr");

  // Global inputs
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState<number>(25);

  // Imperial inputs (inches / lbs)
  const [heightInches, setHeightInches] = useState<number>(70);
  const [waistInches, setWaistInches] = useState<number>(34);
  const [weightLbs, setWeightLbs] = useState<number>(175);
  const [neckInches, setNeckInches] = useState<number>(15.5);
  const [hipInches, setHipInches] = useState<number>(38);

  // Metric inputs (cm / kg)
  const [heightCm, setHeightCm] = useState<number>(177.8);
  const [waistCm, setWaistCm] = useState<number>(86.4);
  const [weightKg, setWeightKg] = useState<number>(79.4);
  const [neckCm, setNeckCm] = useState<number>(39.4);
  const [hipCm, setHipCm] = useState<number>(96.5);

  // Historical 2023 inputs
  const [historicalMethod, setHistoricalMethod] = useState<CalculationMethod>("army_2023_single_site");
  const [acftScore, setAcftScore] = useState<number>(540);
  const [acftPassedAll80, setAcftPassedAll80] = useState<boolean>(true);
  const [enableAcftCheck, setEnableAcftCheck] = useState<boolean>(false);

  // Saved calculations & copy feedback
  const [savedCalculations, setSavedCalculations] = useState<
    Array<{ id: string; timestamp: string; title: string; metric: string; status: string }>
  >([]);
  const [copied, setCopied] = useState(false);

  const handleReset = () => {
    setUnitSystem("imperial");
    setGender("male");
    setAge(25);
    setHeightInches(70);
    setWaistInches(34);
    setWeightLbs(175);
    setNeckInches(15.5);
    setHipInches(38);
    setHeightCm(177.8);
    setWaistCm(86.4);
    setWeightKg(79.4);
    setNeckCm(39.4);
    setHipCm(96.5);
    setHistoricalMethod("army_2023_single_site");
    setAcftScore(540);
    setAcftPassedAll80(true);
    setEnableAcftCheck(false);
  };

  const handleUnitSystemToggle = (newSys: UnitSystem) => {
    if (newSys === unitSystem) return;
    if (newSys === "metric") {
      setHeightCm(parseFloat((heightInches * 2.54).toFixed(1)));
      setWaistCm(parseFloat((waistInches * 2.54).toFixed(1)));
      setWeightKg(parseFloat((weightLbs / 2.20462).toFixed(1)));
      setNeckCm(parseFloat((neckInches * 2.54).toFixed(1)));
      setHipCm(parseFloat((hipInches * 2.54).toFixed(1)));
    } else {
      setHeightInches(parseFloat((heightCm / 2.54).toFixed(1)));
      setWaistInches(parseFloat((waistCm / 2.54).toFixed(1)));
      setWeightLbs(parseFloat((weightKg * 2.20462).toFixed(1)));
      setNeckInches(parseFloat((neckCm / 2.54).toFixed(1)));
      setHipInches(parseFloat((hipCm / 2.54).toFixed(1)));
    }
    setUnitSystem(newSys);
  };

  // 1. Authoritative Current 2026 WHtR Result (Directive 2026-13)
  const whtrResult: ArmyWHtRResult = useMemo(() => {
    return calculateArmyWHtR({
      unitSystem,
      heightInches,
      heightCm,
      waistInches,
      waistCm,
      gender,
      age,
    });
  }, [unitSystem, heightInches, heightCm, waistInches, waistCm, gender, age]);

  // 2. Historical 2023 Result (Isolated Reference)
  const historicalResult: ArmyBodyFatResult = useMemo(() => {
    return calculateArmyBodyFat({
      unitSystem,
      gender,
      calculationMethod: historicalMethod,
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
    historicalMethod,
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
    acftScore,
    acftPassedAll80,
    enableAcftCheck,
  ]);

  const currentResultValid = complianceMode === "current_2026_whtr" ? whtrResult.isValid : historicalResult.isValid;

  const handleSaveCalculation = () => {
    if (!currentResultValid) return;
    const isWhtr = complianceMode === "current_2026_whtr";
    const newItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: isWhtr
        ? `Army WHtR: ${whtrResult.whtrDisplay} (${whtrResult.statusLabel})`
        : `Historical 2023 BF: ${historicalResult.bodyFatPercentage}% (${historicalResult.statusLabel})`,
      metric: isWhtr ? `WHtR ${whtrResult.whtrDisplay}` : `${historicalResult.bodyFatPercentage}% BF`,
      status: isWhtr ? whtrResult.statusLabel : historicalResult.statusLabel,
    };
    setSavedCalculations([newItem, ...savedCalculations.slice(0, 9)]);
  };

  const handleCopySummary = () => {
    if (!currentResultValid) return;
    const isWhtr = complianceMode === "current_2026_whtr";
    let summary = "";

    if (isWhtr) {
      summary = `U.S. Army Body Composition Assessment (Army Directive 2026-13)
Date: ${new Date().toLocaleDateString()}
Standard: Waist-to-Height Ratio (WHtR) < 0.550
Height: ${whtrResult.height} ${whtrResult.unitLabel}
Waist: ${whtrResult.waist} ${whtrResult.unitLabel} (Navel Measurement)
Calculated WHtR: ${whtrResult.whtrDisplay} (${whtrResult.whtrPercentageDisplay})
Army Status: ${whtrResult.statusLabel}
Max Compliant Waist: ${whtrResult.maxCompliantWaist} ${whtrResult.unitLabel}
${!whtrResult.isCompliant ? `Required Waist Reduction: ${whtrResult.requiredWaistReduction} ${whtrResult.unitLabel}` : "Compliant with published standard."}
Testing Frequency: Semi-annual (Twice per calendar year)
Note: Informational calculation based on published Army guidance. Official determinations are made by authorized unit personnel.`;
    } else {
      summary = `U.S. Army Historical Body Fat Assessment (2023 Tape Test Reference)
Date: ${new Date().toLocaleDateString()}
Soldier: ${gender.toUpperCase()} / Age: ${age}
Calculated Body Fat: ${historicalResult.bodyFatPercentage}%
Historical Standard: ${historicalResult.maxAllowableBodyFat}%
Status: ${historicalResult.statusLabel}
Notice: Historical reference only; superseded by Army Directive 2026-13.`;
    }

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (!currentResultValid) return;
    const isWhtr = complianceMode === "current_2026_whtr";
    if (navigator.share) {
      try {
        await navigator.share({
          title: isWhtr ? "U.S. Army WHtR Assessment" : "Historical Army Body Fat Assessment",
          text: isWhtr
            ? `My Army Waist-to-Height Ratio is ${whtrResult.whtrDisplay} (${whtrResult.statusLabel}). Army Directive 2026-13 Standard: < 0.55.`
            : `Historical Army body fat estimate: ${historicalResult.bodyFatPercentage}%.`,
          url: window.location.href,
        });
      } catch {
        handleCopySummary();
      }
    } else {
      handleCopySummary();
    }
  };

  const handlePrint = () => {
    if (!currentResultValid) return;
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Strict Print Isolation Stylesheet */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          nav, header, footer, sidebar, .army-calculator-main-ui, article, .prose, .no-print, [class*="RelatedCalculators"] {
            display: none !important;
            visibility: hidden !important;
          }
          body * {
            visibility: hidden;
          }
          #army-print-report, #army-print-report * {
            visibility: visible !important;
          }
          #army-print-report {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
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
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    Official 2026 Army Standard
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">Army Directive 2026-13</span>
                </div>
                <CardTitle className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  U.S. Army Waist-to-Height Ratio (WHtR) Calculator
                </CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1">
                  Current Army Body Composition Program (ABCP) compliance standard: Waist-to-Height Ratio &lt; 0.55
                </CardDescription>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Defaults
                </Button>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-zinc-100 dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setComplianceMode("current_2026_whtr")}
                  className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    complianceMode === "current_2026_whtr"
                      ? "bg-white dark:bg-zinc-900 text-emerald-700 dark:text-emerald-400 shadow-sm border border-zinc-200/80 dark:border-zinc-800"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  <Ruler className="w-4 h-4" />
                  Current Army Standard (AD 2026-13: WHtR &lt; 0.55)
                </button>
                <button
                  type="button"
                  onClick={() => setComplianceMode("historical_2023_tape")}
                  className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    complianceMode === "historical_2023_tape"
                      ? "bg-white dark:bg-zinc-900 text-amber-700 dark:text-amber-400 shadow-sm border border-zinc-200/80 dark:border-zinc-800"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  <History className="w-4 h-4" />
                  Historical Reference (2023 Tape-Test Body Fat)
                </button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 space-y-6">
            {/* Top Bar: Unit Toggle */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <div className="text-xs">
                <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Measurement Unit System</span>
                <span className="text-[11px] text-zinc-500">
                  {unitSystem === "imperial" ? "Inches (in) and Pounds (lbs)" : "Centimeters (cm) and Kilograms (kg)"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleUnitSystemToggle("imperial")}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                    unitSystem === "imperial" ? "bg-emerald-600 text-white" : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Imperial (inches)
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitSystemToggle("metric")}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                    unitSystem === "metric" ? "bg-emerald-600 text-white" : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Metric (cm)
                </button>
              </div>
            </div>

            {/* Validation Error Banner */}
            {((complianceMode === "current_2026_whtr" && !whtrResult.isValid) ||
              (complianceMode === "historical_2023_tape" && !historicalResult.isValid)) && (
              <div
                role="alert"
                className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl flex items-start gap-2.5 text-rose-800 dark:text-rose-200 text-xs font-medium"
              >
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block">Invalid Input Measurement</strong>
                  <span>
                    {complianceMode === "current_2026_whtr"
                      ? whtrResult.errorMessage || "Please enter valid, positive numbers for height and waist circumference."
                      : historicalResult.errorMessage || "Please enter valid, positive numbers for all required fields."}
                  </span>
                </div>
              </div>
            )}

            {/* MODE 1: CURRENT 2026 WHtR STANDARD (Directive 2026-13) */}
            {complianceMode === "current_2026_whtr" ? (
              <div className="space-y-6">
                {/* Input Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Height Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="whtr-height" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      Standing Height ({unitSystem === "imperial" ? "inches" : "cm"})
                    </Label>
                    <div className="relative">
                      <Input
                        id="whtr-height"
                        type="number"
                        step={unitSystem === "imperial" ? "0.25" : "0.5"}
                        min={unitSystem === "imperial" ? 48 : 120}
                        max={unitSystem === "imperial" ? 96 : 250}
                        value={unitSystem === "imperial" ? heightInches : heightCm}
                        onChange={(e) => {
                          const val = e.target.value === "" ? 0 : parseFloat(e.target.value);
                          if (unitSystem === "imperial") {
                            setHeightInches(val);
                            setHeightCm(parseFloat((val * 2.54).toFixed(1)));
                          } else {
                            setHeightCm(val);
                            setHeightInches(parseFloat((val / 2.54).toFixed(1)));
                          }
                        }}
                        className="font-sans tabular-nums text-sm font-bold bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 pr-12"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-zinc-400 pointer-events-none">
                        {unitSystem === "imperial" ? "in" : "cm"}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500">Measured without shoes, heels together, standing erect.</p>
                  </div>

                  {/* Waist Circumference Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="whtr-waist" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      Abdominal Waist Circumference ({unitSystem === "imperial" ? "inches" : "cm"})
                    </Label>
                    <div className="relative">
                      <Input
                        id="whtr-waist"
                        type="number"
                        step={unitSystem === "imperial" ? "0.25" : "0.5"}
                        min={unitSystem === "imperial" ? 18 : 45}
                        max={unitSystem === "imperial" ? 80 : 210}
                        value={unitSystem === "imperial" ? waistInches : waistCm}
                        onChange={(e) => {
                          const val = e.target.value === "" ? 0 : parseFloat(e.target.value);
                          if (unitSystem === "imperial") {
                            setWaistInches(val);
                            setWaistCm(parseFloat((val * 2.54).toFixed(1)));
                          } else {
                            setWaistCm(val);
                            setWaistInches(parseFloat((val / 2.54).toFixed(1)));
                          }
                        }}
                        className="font-sans tabular-nums text-sm font-bold bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 pr-12"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-zinc-400 pointer-events-none">
                        {unitSystem === "imperial" ? "in" : "cm"}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Measured at the navel (belly button) parallel to deck at the end of normal exhalation.
                    </p>
                  </div>
                </div>

                {/* Measurement Protocol Callout */}
                <div className="p-3 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-xl flex items-start gap-2.5 text-xs text-blue-950 dark:text-blue-200">
                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold block">Army Directive 2026-13 Protocol Rule:</strong>
                    <span>
                      Waist circumference is measured directly across the midpoint of the navel. The tape must be snug
                      against bare skin without compressing soft tissue. The compliance standard is{" "}
                      <strong>strictly less than 0.55</strong>. A ratio of 0.550 is non-compliant.
                    </span>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        type="button"
                        onClick={handlePrint}
                        disabled={!whtrResult.isValid}
                        variant="outline"
                        size="sm"
                        className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        Print Assessment
                      </Button>

                      <Button
                        type="button"
                        onClick={handleCopySummary}
                        disabled={!whtrResult.isValid}
                        variant="outline"
                        size="sm"
                        className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied!" : "Copy Summary"}
                      </Button>

                      <Button
                        type="button"
                        onClick={handleShare}
                        disabled={!whtrResult.isValid}
                        variant="outline"
                        size="sm"
                        className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        Share
                      </Button>
                    </div>

                    <Button
                      type="button"
                      onClick={handleSaveCalculation}
                      disabled={!whtrResult.isValid}
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      Save Calculation
                    </Button>
                  </div>
                </div>

                {/* Saved Calculations Drawer */}
                {savedCalculations.length > 0 && (
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      <span>Saved Calculations ({savedCalculations.length})</span>
                      <button
                        onClick={() => setSavedCalculations([])}
                        className="text-[10px] text-zinc-400 hover:text-rose-500 cursor-pointer"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-1.5 max-h-32 overflow-y-auto">
                      {savedCalculations.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center p-2 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs"
                        >
                          <span className="font-semibold text-zinc-800 dark:text-zinc-200">{item.title}</span>
                          <span className="text-[10px] text-zinc-400">{item.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* MODE 2: HISTORICAL 2023 TAPE TEST REFERENCE */
              <div className="space-y-6">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold block">Historical Reference Mode:</strong>
                    <span>
                      This mode executes the superseded June 12, 2023 single-site tape test and Navy equations. Under
                      current Army Directive 2026-13, Waist-to-Height Ratio (&lt; 0.55) is the sole official assessment
                      method.
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1 block">Gender</Label>
                    <div className="grid grid-cols-2 gap-1 bg-zinc-50 dark:bg-zinc-950 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setGender("male")}
                        className={`py-1 rounded ${gender === "male" ? "bg-blue-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                      >
                        Male
                      </button>
                      <button
                        type="button"
                        onClick={() => setGender("female")}
                        className={`py-1 rounded ${gender === "female" ? "bg-purple-600 text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                      >
                        Female
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="hist-age" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1 block">
                      Age (17–80)
                    </Label>
                    <Input
                      id="hist-age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(parseInt(e.target.value) || 25)}
                      className="text-xs font-bold"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hist-weight" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1 block">
                      Weight ({unitSystem === "imperial" ? "lbs" : "kg"})
                    </Label>
                    <Input
                      id="hist-weight"
                      type="number"
                      value={unitSystem === "imperial" ? weightLbs : weightKg}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        if (unitSystem === "imperial") {
                          setWeightLbs(val);
                          setWeightKg(parseFloat((val / 2.20462).toFixed(1)));
                        } else {
                          setWeightKg(val);
                          setWeightLbs(parseFloat((val * 2.20462).toFixed(1)));
                        }
                      }}
                      className="text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="hist-waist" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1 block">
                      Waist Circumference ({unitSystem === "imperial" ? "in" : "cm"})
                    </Label>
                    <Input
                      id="hist-waist"
                      type="number"
                      value={unitSystem === "imperial" ? waistInches : waistCm}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        if (unitSystem === "imperial") {
                          setWaistInches(val);
                          setWaistCm(parseFloat((val * 2.54).toFixed(1)));
                        } else {
                          setWaistCm(val);
                          setWaistInches(parseFloat((val / 2.54).toFixed(1)));
                        }
                      }}
                      className="text-xs font-bold"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1 block">
                      Historical 2023 ACFT 540+ Rule
                    </Label>
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="enable-acft"
                        checked={enableAcftCheck}
                        onChange={(e) => setEnableAcftCheck(e.target.checked)}
                        className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="enable-acft" className="text-xs text-zinc-600 dark:text-zinc-400">
                        Check ACFT 540+ Exemption (Historical 2023 policy)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dynamic Visual Dashboard & Results */}
        {complianceMode === "current_2026_whtr" ? (
          /* CURRENT 2026 WHtR DASHBOARD */
          whtrResult.isValid && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <ArmyWHtRGauge result={whtrResult} />
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                      Army Directive 2026-13 Compliance Overview
                    </h4>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        whtrResult.isCompliant
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                          : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800"
                      }`}
                    >
                      {whtrResult.statusLabel}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-500 text-[10px] block font-semibold">Calculated WHtR</span>
                      <strong
                        className={`text-2xl font-black block mt-0.5 ${
                          whtrResult.isCompliant
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {whtrResult.whtrDisplay}
                      </strong>
                      <span className="text-[10px] text-zinc-400">{whtrResult.whtrPercentageDisplay}</span>
                    </div>

                    <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-500 text-[10px] block font-semibold">Army Threshold</span>
                      <strong className="text-2xl font-black text-blue-600 dark:text-blue-400 block mt-0.5">
                        &lt; 0.550
                      </strong>
                      <span className="text-[10px] text-zinc-400">Strict Inequality</span>
                    </div>

                    <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-500 text-[10px] block font-semibold">Max Allowable Waist</span>
                      <strong className="text-2xl font-black text-purple-600 dark:text-purple-400 block mt-0.5">
                        {whtrResult.maxCompliantWaist} {whtrResult.unitLabel}
                      </strong>
                      <span className="text-[10px] text-zinc-400">At Height {whtrResult.height}</span>
                    </div>

                    <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-500 text-[10px] block font-semibold">Assessment Frequency</span>
                      <strong className="text-lg font-black text-zinc-800 dark:text-zinc-200 block mt-1.5">
                        Semi-Annual
                      </strong>
                      <span className="text-[10px] text-zinc-400">Twice / Year</span>
                    </div>
                  </div>
                </div>

                <ArmyWHtRTables whtrResult={whtrResult} />
              </div>
            </div>
          )
        ) : (
          /* HISTORICAL 2023 DASHBOARD */
          historicalResult.isValid && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <HistoricalArmyComplianceGauge result={historicalResult} />
                <BodyCompositionBarChart result={historicalResult} />
              </div>
              <div className="lg:col-span-2 space-y-6">
                <HistoricalArmyTables result={historicalResult} />
              </div>
            </div>
          )
        )}
      </div>

      {/* Standalone Printable Assessment Report Section */}
      {whtrResult.isValid && (
        <div id="army-print-report" className="hidden">
          <div className="p-8 max-w-4xl mx-auto space-y-6 bg-white text-zinc-900 font-sans">
            <div className="border-b-2 border-emerald-600 pb-4 flex justify-between items-start">
              <div>
                <div className="text-xs font-black tracking-widest text-emerald-700 uppercase">
                  CalcPlatform Military Health &amp; Readiness Lab
                </div>
                <h2 className="text-2xl font-black text-blue-600 mt-1">
                  U.S. Army Body Composition Assessment Report
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Army Directive 2026-13 • Waist-to-Height Ratio (WHtR &lt; 0.55) Standard
                </p>
              </div>
              <div className="text-right text-xs text-zinc-500">
                <p className="font-bold text-zinc-800" suppressHydrationWarning>
                  Date: {new Date().toLocaleDateString()}
                </p>
                <p suppressHydrationWarning>
                  Time: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
                <p className="font-sans tabular-nums text-[10px] text-zinc-400 mt-1" suppressHydrationWarning>
                  Ref ID: #ARMY-{Date.now().toString().slice(-6)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-center">
              <div className="p-2 border-r border-zinc-200">
                <span className="text-[10px] font-bold text-zinc-500 uppercase block">Waist-to-Height Ratio</span>
                <strong className="text-xl font-black text-emerald-700 block mt-1">
                  {whtrResult.whtrDisplay}
                </strong>
                <span className="text-[9px] text-zinc-500 block">{whtrResult.whtrPercentageDisplay}</span>
              </div>
              <div className="p-2 border-r border-zinc-200">
                <span className="text-[10px] font-bold text-zinc-500 uppercase block">Army Standard</span>
                <strong className="text-xl font-black text-blue-700 block mt-1">&lt; 0.550</strong>
                <span className="text-[9px] text-zinc-500 block">Strict Threshold</span>
              </div>
              <div className="p-2 border-r border-zinc-200">
                <span className="text-[10px] font-bold text-zinc-500 uppercase block">Compliance Status</span>
                <strong
                  className={`text-xl font-black block mt-1 ${
                    whtrResult.isCompliant ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {whtrResult.isCompliant ? "COMPLIANT" : "NON-COMPLIANT"}
                </strong>
                <span className="text-[9px] text-zinc-500 block">{whtrResult.category}</span>
              </div>
              <div className="p-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase block">Max Compliant Waist</span>
                <strong className="text-xl font-black text-purple-700 block mt-1">
                  {whtrResult.maxCompliantWaist} {whtrResult.unitLabel}
                </strong>
                <span className="text-[9px] text-zinc-500 block">At current height</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-zinc-300 pb-1">
                1. Assessment Parameters &amp; Measurement Protocol
              </h3>
              <table className="w-full text-xs text-left border border-zinc-200 border-collapse">
                <tbody>
                  <tr className="border-b border-zinc-200 bg-zinc-50">
                    <td className="p-2 font-bold w-1/4">Assessment Standard:</td>
                    <td className="p-2 w-1/4">Army Directive 2026-13 (WHtR)</td>
                    <td className="p-2 font-bold w-1/4">Testing Frequency:</td>
                    <td className="p-2 w-1/4">Semi-annual (Twice / Year)</td>
                  </tr>
                  <tr className="border-b border-zinc-200">
                    <td className="p-2 font-bold">Standing Height:</td>
                    <td className="p-2">
                      {whtrResult.height} {whtrResult.unitLabel}
                    </td>
                    <td className="p-2 font-bold">Abdominal Waist:</td>
                    <td className="p-2">
                      {whtrResult.waist} {whtrResult.unitLabel} (at navel)
                    </td>
                  </tr>
                  <tr className="bg-zinc-50">
                    <td className="p-2 font-bold">Waist vs. Threshold:</td>
                    <td className="p-2">
                      {whtrResult.isCompliant
                        ? `${(whtrResult.maxCompliantWaist - whtrResult.waist).toFixed(1)} ${whtrResult.unitLabel} below limit`
                        : `${whtrResult.requiredWaistReduction} ${whtrResult.unitLabel} above limit`}
                    </td>
                    <td className="p-2 font-bold">Measurement Site:</td>
                    <td className="p-2">Midpoint of navel parallel to deck</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border-t border-zinc-300 pt-4 text-[10px] text-zinc-500 space-y-1">
              <p className="font-bold text-zinc-700">Official Military Policy Notice:</p>
              <p>
                This assessment is calculated in accordance with published U.S. Army Directive 2026-13 and AR 600-9
                guidance. This online calculation is an informational tool and does not constitute an official Army
                administrative determination or replace certified evaluation conducted by authorized unit personnel.
              </p>
              <p className="text-zinc-400">© CalcPlatform Military Readiness Suite • All Rights Reserved</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
