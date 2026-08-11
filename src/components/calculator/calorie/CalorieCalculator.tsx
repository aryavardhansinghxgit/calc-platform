"use client";

import React, { useState, useMemo } from "react";
import {
  Flame,
  Activity,
  Calendar,
  PieChart,
  Utensils,
  Zap,
  Bookmark,
  Share2,
  Printer,
  Copy,
  Check,
  RefreshCw,
  Info,
  Scale,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  calculateCalorie,
  UnitSystem,
  Gender,
  BmrFormula,
  ActivityLevel,
  CalorieResult,
} from "@/lib/formulas/calorie";

import {
  CalorieArchGauge,
  ZigzagBarChart,
  MacroDonutChart,
} from "./CalorieCharts";

import { CalorieTables } from "./CalorieTables";

export function CalorieCalculator() {
  // Input states
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<Gender>("male");
  const [bmrFormula, setBmrFormula] = useState<BmrFormula>("mifflin");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [bodyFatPercentage, setBodyFatPercentage] = useState<string>("");

  // US Inputs
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(165);

  // Metric Inputs
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(72.5);

  // Other Inputs
  const [otherHeightValue, setOtherHeightValue] = useState<number>(1.78);
  const [otherWeightValue, setOtherWeightValue] = useState<number>(72.5);

  // Energy Converter State
  const [converterInputKcal, setConverterInputKcal] = useState<number>(2000);

  // Saved calculations
  const [savedCalculations, setSavedCalculations] = useState<
    Array<{ id: string; timestamp: string; title: string; tdee: number; bmr: number }>
  >([]);
  const [copied, setCopied] = useState(false);

  // Handlers
  const handleUnitSystemChange = (newSystem: UnitSystem) => {
    setUnitSystem(newSystem);
    if (newSystem === "metric") {
      const cm = Math.round((heightFeet * 12 + heightInches) * 2.54);
      const kg = parseFloat((weightLbs * 0.45359237).toFixed(1));
      setHeightCm(cm);
      setWeightKg(kg);
    } else if (newSystem === "us") {
      const totalInches = Math.round(heightCm / 2.54);
      setHeightFeet(Math.floor(totalInches / 12));
      setHeightInches(totalInches % 12);
      setWeightLbs(Math.round(weightKg / 0.45359237));
    }
  };

  const handleReset = () => {
    setUnitSystem("us");
    setAge(25);
    setGender("male");
    setBmrFormula("mifflin");
    setActivityLevel("moderate");
    setBodyFatPercentage("");
    setHeightFeet(5);
    setHeightInches(10);
    setWeightLbs(165);
    setHeightCm(178);
    setWeightKg(72.5);
    setOtherHeightValue(1.78);
    setOtherWeightValue(72.5);
  };

  // Calculation Engine Call
  const result: CalorieResult = useMemo(() => {
    const bfpNum = bodyFatPercentage !== "" ? Number(bodyFatPercentage) : undefined;
    return calculateCalorie({
      unitSystem,
      age,
      gender,
      heightFeet,
      heightInches,
      weightLbs,
      heightCm,
      weightKg,
      heightMeters: otherHeightValue,
      weightKgOther: otherWeightValue,
      bmrFormula,
      bodyFatPercentage: bfpNum,
      activityLevel,
    });
  }, [
    unitSystem,
    age,
    gender,
    heightFeet,
    heightInches,
    weightLbs,
    heightCm,
    weightKg,
    otherHeightValue,
    otherWeightValue,
    bmrFormula,
    bodyFatPercentage,
    activityLevel,
  ]);

  const handleSaveCalculation = () => {
    const newItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: `${age}y/o ${gender === "male" ? "Male" : "Female"} (${result.tdee} kcal)`,
      tdee: result.tdee,
      bmr: result.bmr,
    };
    setSavedCalculations([newItem, ...savedCalculations]);
  };

  const handleCopySummary = () => {
    const summary = `Calorie & TDEE Assessment (${new Date().toLocaleDateString()})
Age: ${age} | Gender: ${gender} | Height: ${result.heightCm} cm | Weight: ${result.weightLbs} lbs (${result.weightKg} kg)
BMR (${result.bmrFormulaUsed}): ${result.bmr} kcal/day
Maintenance TDEE: ${result.tdee} kcal/day
Mild Weight Loss (0.5 lb/wk): ${result.tiers.mildLoss.caloriesPerDay} kcal/day
Weight Loss (1.0 lb/wk): ${result.tiers.weightLoss.caloriesPerDay} kcal/day
Extreme Weight Loss (2.0 lb/wk): ${result.tiers.extremeLoss.caloriesPerDay} kcal/day
Calculated via CalcPlatform Calorie Engine`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Calorie & TDEE Assessment",
          text: `My TDEE is ${result.tdee} kcal/day. Check your daily calorie target:`,
          url: window.location.href,
        });
      } catch {
        // Fallback copy
        handleCopySummary();
      }
    } else {
      handleCopySummary();
    }
  };

  const handlePrint = () => {
    const reportEl = document.getElementById("calorie-print-report");
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
          <title>Clinical Caloric Expenditure Assessment Report - CalcPlatform</title>
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
            .bg-emerald-50\\/60 { background-color: rgba(236, 253, 245, 0.6); }
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
            .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
            .text-zinc-900 { color: #18181b; }
            .text-zinc-800 { color: #27272a; }
            .text-zinc-700 { color: #3f3f46; }
            .text-zinc-500 { color: #71717a; }
            .text-zinc-400 { color: #a1a1aa; }
            .text-emerald-700 { color: #047857; }
            .text-emerald-800 { color: #065f46; }
            .text-sky-700 { color: #0369a1; }
            .text-blue-700 { color: #1d4ed8; }
            .text-purple-700 { color: #7e22ce; }
            .text-orange-700 { color: #c2410c; }
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
          .calorie-calculator-main-ui, nav, header, footer, sidebar {
            display: none !important;
          }
          #calorie-print-report {
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

      <div className="calorie-calculator-main-ui space-y-6">

      {/* Main Interactive Calculator Card */}
      <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm">
        <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Flame className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                Calorie &amp; TDEE Calculator
              </CardTitle>
              <CardDescription className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1">
                Calculate BMR, TDEE maintenance, weight loss targets, zigzag cycling &amp; macronutrient ratios
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
          {/* Unit System Toggles */}
          <Tabs value={unitSystem} onValueChange={(val) => handleUnitSystemChange(val as UnitSystem)}>
            <TabsList className="grid grid-cols-3 bg-zinc-100 dark:bg-zinc-950 p-1 border border-zinc-200 dark:border-zinc-800 rounded-xl mb-6">
              <TabsTrigger value="us" className="text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-emerald-700 data-[state=active]:dark:text-emerald-400 shadow-sm">
                US Units (ft/in, lbs)
              </TabsTrigger>
              <TabsTrigger value="metric" className="text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-sky-700 data-[state=active]:dark:text-sky-400 shadow-sm">
                Metric Units (cm, kg)
              </TabsTrigger>
              <TabsTrigger value="other" className="text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-purple-700 data-[state=active]:dark:text-purple-400 shadow-sm">
                Other Units (m, kg)
              </TabsTrigger>
            </TabsList>

            {/* Demographics & Activity Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5 p-4 bg-zinc-50 dark:bg-zinc-950/60 rounded-xl border border-zinc-200 dark:border-zinc-800/80">
              {/* Age */}
              <div>
                <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                  Age (ages 15 – 120)
                </Label>
                <Input
                  type="number"
                  min={15}
                  max={120}
                  value={age}
                  onChange={(e) => setAge(Math.max(15, Math.min(120, Number(e.target.value) || 25)))}
                  className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                />
              </div>

              {/* Gender */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Biological Gender
                  </Label>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    {gender === "male" ? "♂ Male" : "♀ Female"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`py-2 px-3 rounded-lg text-xs font-black transition-all border flex items-center justify-center gap-1 cursor-pointer ${
                      gender === "male"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/30"
                        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <span>♂</span> Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`py-2 px-3 rounded-lg text-xs font-black transition-all border flex items-center justify-center gap-1 cursor-pointer ${
                      gender === "female"
                        ? "bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-500/30"
                        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <span>♀</span> Female
                  </button>
                </div>
              </div>

              {/* Formula Selection */}
              <div>
                <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                  BMR Equation Formula
                </Label>
                <select
                  value={bmrFormula}
                  onChange={(e) => setBmrFormula(e.target.value as BmrFormula)}
                  className="w-full h-9 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 text-xs font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  <option value="mifflin">Mifflin-St Jeor (Standard)</option>
                  <option value="harris">Revised Harris-Benedict</option>
                  <option value="katch">Katch-McArdle (Requires Body Fat %)</option>
                </select>
              </div>
            </div>

            {/* US UNITS INPUTS */}
            <TabsContent value="us" className="space-y-4 m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                    Height (Feet &amp; Inches)
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <Input
                        type="number"
                        min={3}
                        max={8}
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(Number(e.target.value))}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">ft</span>
                    </div>
                    <div className="relative">
                      <Input
                        type="number"
                        min={0}
                        max={11}
                        value={heightInches}
                        onChange={(e) => setHeightInches(Number(e.target.value))}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">in</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                    Weight (Pounds - lbs)
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      min={50}
                      max={800}
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(Number(e.target.value))}
                      className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">lbs</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* METRIC UNITS INPUTS */}
            <TabsContent value="metric" className="space-y-4 m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                    Height (Centimeters - cm)
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      min={90}
                      max={250}
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">cm</span>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                    Weight (Kilograms - kg)
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      min={20}
                      max={350}
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">kg</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* OTHER UNITS INPUTS */}
            <TabsContent value="other" className="space-y-4 m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                    Height (Meters - m)
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      step={0.01}
                      value={otherHeightValue}
                      onChange={(e) => setOtherHeightValue(Number(e.target.value))}
                      className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">m</span>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                    Weight (Kilograms - kg)
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      step={0.1}
                      value={otherWeightValue}
                      onChange={(e) => setOtherWeightValue(Number(e.target.value))}
                      className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">kg</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Activity Level & Body Fat % Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="sm:col-span-2">
                <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                  Daily Physical Activity Level
                </Label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                  className="w-full h-9 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 text-xs font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  <option value="sedentary">Basal / Sedentary (little to no exercise)</option>
                  <option value="light">Light Exercise (1 – 3 times per week)</option>
                  <option value="moderate">Moderate Exercise (4 – 5 times per week)</option>
                  <option value="active">Active Exercise (daily or intense 3-4x/wk)</option>
                  <option value="very_active">Very Active (intense 6 – 7 times/wk)</option>
                  <option value="extra_active">Extra Active (very intense daily / physical job)</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                  Body Fat % (Optional)
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    min={4}
                    max={60}
                    placeholder={`Est: ${result.estimatedBfp}%`}
                    value={bodyFatPercentage}
                    onChange={(e) => setBodyFatPercentage(e.target.value)}
                    className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-semibold"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">%</span>
                </div>
              </div>
            </div>
          </Tabs>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveCalculation}
                className="bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 text-xs gap-1.5"
              >
                <Bookmark className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Save Calculation
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleCopySummary}
                className="bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 text-xs gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
                {copied ? "Copied!" : "Copy Summary"}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 text-xs gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                Share
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-600 text-xs gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / PDF Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Results Display & Multi-Tab Analysis */}
      <Tabs defaultValue="targets" className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-5 bg-zinc-100 dark:bg-zinc-950 p-1 border border-zinc-200 dark:border-zinc-800 rounded-xl mb-6">
          <TabsTrigger value="targets" className="text-xs font-bold gap-1.5 data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-emerald-700">
            <Flame className="w-3.5 h-3.5" /> Calorie Targets
          </TabsTrigger>
          <TabsTrigger value="zigzag" className="text-xs font-bold gap-1.5 data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-blue-700">
            <Calendar className="w-3.5 h-3.5" /> Zigzag Cycling
          </TabsTrigger>
          <TabsTrigger value="macros" className="text-xs font-bold gap-1.5 data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-purple-700">
            <PieChart className="w-3.5 h-3.5" /> Macro Ratios
          </TabsTrigger>
          <TabsTrigger value="food" className="text-xs font-bold gap-1.5 data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-amber-700">
            <Utensils className="w-3.5 h-3.5" /> Foods &amp; Exercise
          </TabsTrigger>
          <TabsTrigger value="converter" className="text-xs font-bold gap-1.5 data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-rose-700">
            <Zap className="w-3.5 h-3.5" /> Energy Converter
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: CALORIE TARGETS */}
        <TabsContent value="targets" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <CalorieArchGauge result={result} />
            </div>

            {/* Comprehensive Caloric Goal Tiers Table */}
            <div className="lg:col-span-2 p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Daily Calorie Estimates for Weight Goals
                </h4>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  TDEE: {result.tdee} kcal/day
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="py-3 px-3">Weight Goal Tier</th>
                      <th className="py-3 px-3">Target Intake</th>
                      <th className="py-3 px-3">% of TDEE</th>
                      <th className="py-3 px-3">Weekly Change</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
                    <tr className="bg-emerald-50/40 dark:bg-emerald-950/20 font-bold">
                      <td className="py-2.5 px-3 text-emerald-900 dark:text-emerald-200">Maintain Weight</td>
                      <td className="py-2.5 px-3 font-mono text-emerald-700 dark:text-emerald-400 text-sm">{result.tiers.maintain.caloriesPerDay} kcal</td>
                      <td className="py-2.5 px-3">100%</td>
                      <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400">0 lb/week</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">Mild Weight Loss</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-sky-600 dark:text-sky-400">{result.tiers.mildLoss.caloriesPerDay} kcal</td>
                      <td className="py-2.5 px-3">{result.tiers.mildLoss.percentOfTdee}%</td>
                      <td className="py-2.5 px-3 text-sky-600 dark:text-sky-400">-0.5 lb/week (-0.25 kg)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">Weight Loss (Standard)</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">{result.tiers.weightLoss.caloriesPerDay} kcal</td>
                      <td className="py-2.5 px-3">{result.tiers.weightLoss.percentOfTdee}%</td>
                      <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">-1.0 lb/week (-0.5 kg)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">Extreme Weight Loss</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-orange-600 dark:text-orange-400">{result.tiers.extremeLoss.caloriesPerDay} kcal</td>
                      <td className="py-2.5 px-3">{result.tiers.extremeLoss.percentOfTdee}%</td>
                      <td className="py-2.5 px-3 text-orange-600 dark:text-orange-400">-2.0 lb/week (-1.0 kg)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">Mild Weight Gain</td>
                      <td className="py-2.5 px-3 font-mono text-zinc-900 dark:text-zinc-100">{result.tiers.mildGain.caloriesPerDay} kcal</td>
                      <td className="py-2.5 px-3">{result.tiers.mildGain.percentOfTdee}%</td>
                      <td className="py-2.5 px-3">+0.5 lb/week (+0.25 kg)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">Weight Gain</td>
                      <td className="py-2.5 px-3 font-mono text-zinc-900 dark:text-zinc-100">{result.tiers.weightGain.caloriesPerDay} kcal</td>
                      <td className="py-2.5 px-3">{result.tiers.weightGain.percentOfTdee}%</td>
                      <td className="py-2.5 px-3">+1.0 lb/week (+0.5 kg)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold">Fast Weight Gain</td>
                      <td className="py-2.5 px-3 font-mono text-zinc-900 dark:text-zinc-100">{result.tiers.fastGain.caloriesPerDay} kcal</td>
                      <td className="py-2.5 px-3">{result.tiers.fastGain.percentOfTdee}%</td>
                      <td className="py-2.5 px-3">+2.0 lb/week (+1.0 kg)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Activity Comparison Table */}
          <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              TDEE &amp; Caloric Expenditure Across Activity Levels
            </h4>
            <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="py-2.5 px-3">Activity Level</th>
                    <th className="py-2.5 px-3">Multiplier</th>
                    <th className="py-2.5 px-3 font-mono text-emerald-700 dark:text-emerald-400">Daily TDEE Burn</th>
                    <th className="py-2.5 px-3">Weekly Active Burn (Above BMR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
                  {result.activityComparisonTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                      <td className="py-2 px-3 font-semibold text-zinc-900 dark:text-zinc-100">{row.activityLabel}</td>
                      <td className="py-2 px-3 font-mono text-zinc-500">{row.multiplier}×</td>
                      <td className="py-2 px-3 font-mono font-bold text-emerald-700 dark:text-emerald-400">{row.tdee} kcal</td>
                      <td className="py-2 px-3 font-mono text-sky-700 dark:text-sky-400">~{row.weightLossPotentialLbs} lbs/week burn equivalent</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: ZIGZAG CALORIE CYCLING */}
        <TabsContent value="zigzag" className="space-y-6">
          <ZigzagBarChart result={result} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Schedule 1 Table */}
            <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-blue-700 dark:text-blue-400">
                  Zigzag Schedule 1 (3 High / 4 Low)
                </h4>
                <span className="text-xs font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                  Avg: {result.tiers.weightLoss.caloriesPerDay} kcal
                </span>
              </div>
              <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-100 dark:bg-zinc-950 font-bold border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="py-2 px-3">Day</th>
                      <th className="py-2 px-3">Day Type</th>
                      <th className="py-2 px-3 font-mono text-blue-600">Calorie Target</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
                    {result.zigzagSchedule.map((d, i) => {
                      const isHigh = i === 0 || i === 3 || i === 6;
                      return (
                        <tr key={i}>
                          <td className="py-2 px-3 font-bold text-zinc-900 dark:text-zinc-100">{d.dayName}</td>
                          <td className="py-2 px-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isHigh ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300"}`}>
                              {isHigh ? "High Calorie" : "Low Calorie"}
                            </span>
                          </td>
                          <td className="py-2 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">{d.schedule1Calories} kcal</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Schedule 2 Table */}
            <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-purple-700 dark:text-purple-400">
                  Zigzag Schedule 2 (Progressive Wave)
                </h4>
                <span className="text-xs font-mono font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded">
                  Avg: {result.tiers.weightLoss.caloriesPerDay} kcal
                </span>
              </div>
              <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-100 dark:bg-zinc-950 font-bold border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="py-2 px-3">Day</th>
                      <th className="py-2 px-3">Wave Ratio</th>
                      <th className="py-2 px-3 font-mono text-purple-600">Calorie Target</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
                    {result.zigzagSchedule.map((d, i) => (
                      <tr key={i}>
                        <td className="py-2 px-3 font-bold text-zinc-900 dark:text-zinc-100">{d.dayName}</td>
                        <td className="py-2 px-3 text-zinc-500">Day {i + 1} Wave</td>
                        <td className="py-2 px-3 font-mono font-bold text-purple-600 dark:text-purple-400">{d.schedule2Calories} kcal</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TAB 3: MACRONUTRIENT RATIOS */}
        <TabsContent value="macros" className="space-y-6">
          <MacroDonutChart result={result} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(result.macros).map((m, idx) => (
              <div key={idx} className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">{m.name}</h4>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                    <span className="text-[10px] text-amber-700 font-semibold block">Carbs</span>
                    <strong className="font-mono text-amber-900 dark:text-amber-200 block text-sm">{m.carbsGrams}g</strong>
                    <span className="text-[10px] text-zinc-500">{m.carbsPercent}%</span>
                  </div>
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                    <span className="text-[10px] text-emerald-700 font-semibold block">Protein</span>
                    <strong className="font-mono text-emerald-900 dark:text-emerald-200 block text-sm">{m.proteinGrams}g</strong>
                    <span className="text-[10px] text-zinc-500">{m.proteinPercent}%</span>
                  </div>
                  <div className="p-2 bg-rose-50 dark:bg-rose-950/20 rounded-lg">
                    <span className="text-[10px] text-rose-700 font-semibold block">Fat</span>
                    <strong className="font-mono text-rose-900 dark:text-rose-200 block text-sm">{m.fatGrams}g</strong>
                    <span className="text-[10px] text-zinc-500">{m.fatPercent}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* TAB 4: FOODS & EXERCISE */}
        <TabsContent value="food" className="space-y-6">
          <CalorieTables />
        </TabsContent>

        {/* TAB 5: FOOD ENERGY CONVERTER */}
        <TabsContent value="converter" className="space-y-6">
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Food Energy Unit Converter
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Convert dietary Calories (kcal) into International System energy units (kJ, Joules, Megajoules, Watt-hours)
              </p>
            </div>

            <div className="max-w-xs">
              <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                Energy in Calories (kcal)
              </Label>
              <Input
                type="number"
                value={converterInputKcal}
                onChange={(e) => setConverterInputKcal(Number(e.target.value))}
                className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 bg-sky-50 dark:bg-sky-950/30 rounded-xl border border-sky-200 dark:border-sky-800">
                <span className="text-xs font-semibold text-sky-700 dark:text-sky-300 block">Kilojoules (kJ)</span>
                <strong className="text-xl font-mono font-black text-sky-900 dark:text-sky-100 block mt-1">
                  {(converterInputKcal * 4.1868).toFixed(1)} kJ
                </strong>
                <span className="text-[10px] text-sky-600 dark:text-sky-400 block mt-0.5">1 kcal = 4.1868 kJ</span>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 block">Joules (J)</span>
                <strong className="text-xl font-mono font-black text-emerald-900 dark:text-emerald-100 block mt-1">
                  {Math.round(converterInputKcal * 4186.8).toLocaleString()} J
                </strong>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">1 kcal = 4,186.8 J</span>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
                <span className="text-xs font-semibold text-purple-700 dark:text-purple-300 block">Megajoules (MJ)</span>
                <strong className="text-xl font-mono font-black text-purple-900 dark:text-purple-100 block mt-1">
                  {(converterInputKcal * 0.0041868).toFixed(3)} MJ
                </strong>
                <span className="text-[10px] text-purple-600 dark:text-purple-400 block mt-0.5">1 kcal = 0.0041868 MJ</span>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 block">Watt-Hours (Wh)</span>
                <strong className="text-xl font-mono font-black text-amber-900 dark:text-amber-100 block mt-1">
                  {(converterInputKcal * 1.163).toFixed(1)} Wh
                </strong>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 block mt-0.5">1 kcal = 1.163 Wh</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      </div> {/* End calorie-calculator-main-ui */}

      {/* Professional Printable PDF Report Section */}
      <div id="calorie-print-report" className="hidden">
        <div className="p-8 max-w-4xl mx-auto space-y-6 bg-white text-zinc-900 font-sans">
          {/* Header */}
          <div className="border-b-2 border-emerald-600 pb-4 flex justify-between items-start">
            <div>
              <div className="text-xs font-black tracking-widest text-emerald-700 uppercase">
                CalcPlatform Metabolic &amp; Clinical Nutrition Labs
              </div>
              <h1 className="text-2xl font-black text-zinc-900 mt-1">
                Clinical Caloric Expenditure &amp; TDEE Assessment Report
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                Official Caloric Intake, BMR Equations, Zigzag Cycling &amp; Macronutrient Profile
              </p>
            </div>
            <div className="text-right text-xs text-zinc-500">
              <p className="font-bold text-zinc-800" suppressHydrationWarning>Date: {new Date().toLocaleDateString()}</p>
              <p suppressHydrationWarning>Time: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              <p className="font-mono text-[10px] text-zinc-400 mt-1" suppressHydrationWarning>Ref ID: #CALC-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>

          {/* Executive Summary Cards */}
          <div className="grid grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-center">
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Basal Metabolic Rate</span>
              <strong className="text-xl font-black text-sky-700 block mt-1">{result.bmr} kcal</strong>
              <span className="text-[9px] text-zinc-500 block">Resting Energy</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">TDEE Maintenance</span>
              <strong className="text-xl font-black text-emerald-700 block mt-1">{result.tdee} kcal</strong>
              <span className="text-[9px] text-zinc-500 block">100% Daily Energy</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Weight Loss (1 lb/wk)</span>
              <strong className="text-xl font-black text-blue-700 block mt-1">{result.tiers.weightLoss.caloriesPerDay} kcal</strong>
              <span className="text-[9px] text-zinc-500 block">-500 kcal deficit</span>
            </div>
            <div className="p-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Est. Body Fat</span>
              <strong className="text-xl font-black text-purple-700 block mt-1">{result.estimatedBfp}%</strong>
              <span className="text-[9px] text-zinc-500 block">Deurenberg formula</span>
            </div>
          </div>

          {/* Section 1: Subject Profile & Physical Demographics */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-300 pb-1">
              1. Subject Physical Demographics &amp; Metabolic Baseline
            </h3>
            <table className="w-full text-xs text-left border border-zinc-200 border-collapse">
              <tbody>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <td className="p-2 font-bold w-1/4">Age &amp; Biological Gender:</td>
                  <td className="p-2 w-1/4">{age} years ({gender})</td>
                  <td className="p-2 font-bold w-1/4">BMR Formula Equation:</td>
                  <td className="p-2 w-1/4">{result.bmrFormulaUsed}</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="p-2 font-bold">Height:</td>
                  <td className="p-2">{result.heightCm} cm ({result.heightInches} inches)</td>
                  <td className="p-2 font-bold">Daily Activity Level:</td>
                  <td className="p-2">{activityLevel.toUpperCase()} ({result.activityMultiplier}× multiplier)</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="p-2 font-bold">Weight:</td>
                  <td className="p-2">{result.weightLbs} lbs ({result.weightKg} kg)</td>
                  <td className="p-2 font-bold">Estimated Body Fat %:</td>
                  <td className="p-2">{result.estimatedBfp}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 2: Caloric Goal Targets */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-300 pb-1">
              2. Target Daily Calorie Intake Tiers
            </h3>
            <table className="w-full text-xs text-left border border-zinc-200 border-collapse">
              <thead className="bg-zinc-100 font-bold border-b border-zinc-300">
                <tr>
                  <th className="p-2 border-r border-zinc-200">Weight Goal Tier</th>
                  <th className="p-2 border-r border-zinc-200">Daily Target</th>
                  <th className="p-2 border-r border-zinc-200">% of TDEE</th>
                  <th className="p-2">Expected Weekly Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <tr className="bg-emerald-50/60 font-bold">
                  <td className="p-2 border-r border-zinc-200">Maintain Weight</td>
                  <td className="p-2 border-r border-zinc-200 text-emerald-800">{result.tiers.maintain.caloriesPerDay} kcal/day</td>
                  <td className="p-2 border-r border-zinc-200">100%</td>
                  <td className="p-2 text-emerald-800">0 lbs/week</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-zinc-200 font-semibold">Mild Weight Loss</td>
                  <td className="p-2 border-r border-zinc-200 font-mono font-bold text-sky-700">{result.tiers.mildLoss.caloriesPerDay} kcal/day</td>
                  <td className="p-2 border-r border-zinc-200">{result.tiers.mildLoss.percentOfTdee}%</td>
                  <td className="p-2 text-sky-700">-0.5 lb/week (-0.25 kg)</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-zinc-200 font-semibold">Weight Loss (Standard)</td>
                  <td className="p-2 border-r border-zinc-200 font-mono font-bold text-blue-700">{result.tiers.weightLoss.caloriesPerDay} kcal/day</td>
                  <td className="p-2 border-r border-zinc-200">{result.tiers.weightLoss.percentOfTdee}%</td>
                  <td className="p-2 text-blue-700">-1.0 lb/week (-0.5 kg)</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-zinc-200 font-semibold">Extreme Weight Loss</td>
                  <td className="p-2 border-r border-zinc-200 font-mono font-bold text-orange-700">{result.tiers.extremeLoss.caloriesPerDay} kcal/day</td>
                  <td className="p-2 border-r border-zinc-200">{result.tiers.extremeLoss.percentOfTdee}%</td>
                  <td className="p-2 text-orange-700">-2.0 lb/week (-1.0 kg)</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-zinc-200 font-semibold">Weight Gain</td>
                  <td className="p-2 border-r border-zinc-200 font-mono font-bold">{result.tiers.weightGain.caloriesPerDay} kcal/day</td>
                  <td className="p-2 border-r border-zinc-200">{result.tiers.weightGain.percentOfTdee}%</td>
                  <td className="p-2">+1.0 lb/week (+0.5 kg)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 3: 7-Day Zigzag Calorie Cycling Schedule */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-300 pb-1">
              3. 7-Day Zigzag Calorie Cycling Schedule (Weight Loss Goal)
            </h3>
            <table className="w-full text-xs text-left border border-zinc-200 border-collapse">
              <thead className="bg-zinc-100 font-bold border-b border-zinc-300">
                <tr>
                  <th className="p-2 border-r border-zinc-200">Day</th>
                  <th className="p-2 border-r border-zinc-200">Schedule 1 (3 High / 4 Low)</th>
                  <th className="p-2">Schedule 2 (Progressive Wave)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {result.zigzagSchedule.map((d, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border-r border-zinc-200 font-bold">{d.dayName}</td>
                    <td className="p-2 border-r border-zinc-200 font-mono font-bold text-blue-700">{d.schedule1Calories} kcal</td>
                    <td className="p-2 font-mono font-bold text-purple-700">{d.schedule2Calories} kcal</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 4: Macronutrient Distribution Ratios */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-300 pb-1">
              4. Daily Macronutrient Breakdown Options ({result.tiers.weightLoss.caloriesPerDay} kcal Target)
            </h3>
            <table className="w-full text-xs text-left border border-zinc-200 border-collapse">
              <thead className="bg-zinc-100 font-bold border-b border-zinc-300">
                <tr>
                  <th className="p-2 border-r border-zinc-200">Diet Type</th>
                  <th className="p-2 border-r border-zinc-200">Carbohydrates</th>
                  <th className="p-2 border-r border-zinc-200">Protein</th>
                  <th className="p-2">Dietary Fat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {Object.values(result.macros).map((m, i) => (
                  <tr key={i}>
                    <td className="p-2 border-r border-zinc-200 font-bold">{m.name}</td>
                    <td className="p-2 border-r border-zinc-200 font-mono">{m.carbsGrams}g ({m.carbsPercent}%)</td>
                    <td className="p-2 border-r border-zinc-200 font-mono font-bold text-emerald-800">{m.proteinGrams}g ({m.proteinPercent}%)</td>
                    <td className="p-2 font-mono">{m.fatGrams}g ({m.fatPercent}%)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Disclaimer */}
          <div className="border-t border-zinc-300 pt-4 text-[10px] text-zinc-500 space-y-1">
            <p className="font-bold text-zinc-700">Clinical &amp; Medical Disclaimer:</p>
            <p>
              This report is generated for informational and educational energy planning purposes based on standardized mathematical metabolic equations (Mifflin-St Jeor, Revised Harris-Benedict, Katch-McArdle). Individual metabolic rates may vary based on endocrine function, genetics, and lean body mass. Consult a licensed Registered Dietitian (RDN) or healthcare provider before initiating severe caloric restriction.
            </p>
            <p className="text-zinc-400">© CalcPlatform Metabolic Labs • All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
