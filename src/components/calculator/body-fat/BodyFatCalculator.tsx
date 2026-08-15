"use client";

import React, { useState, useMemo } from "react";
import {
  Activity,
  Award,
  Scale,
  Bookmark,
  Share2,
  Printer,
  Copy,
  Check,
  RefreshCw,
  Info,
  Calendar,
  Target,
  ShieldCheck,
  User,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  calculateBodyFat,
  UnitSystem,
  Gender,
  BodyFatResult,
} from "@/lib/formulas/bodyFat";

import {
  BodyFatArchGauge,
  BodyCompositionBar,
} from "./BodyFatCharts";

import { BodyFatTables } from "./BodyFatTables";

export function BodyFatCalculator() {
  // Input states
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState<number>(25);

  // US Inputs
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10.5);
  const [weightLbs, setWeightLbs] = useState<number>(152);
  const [neckInches, setNeckInches] = useState<number>(15);
  const [waistInches, setWaistInches] = useState<number>(31.5);
  const [hipInches, setHipInches] = useState<number>(38);

  // Metric Inputs
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(69);
  const [neckCm, setNeckCm] = useState<number>(38);
  const [waistCm, setWaistCm] = useState<number>(80);
  const [hipCm, setHipCm] = useState<number>(96);

  // Target BFP Goal state
  const [targetBfpGoal, setTargetBfpGoal] = useState<string>("");

  // Saved calculations
  const [savedCalculations, setSavedCalculations] = useState<
    Array<{ id: string; timestamp: string; title: string; bfp: number; category: string }>
  >([]);
  const [copied, setCopied] = useState(false);

  // Unit system change handler
  const handleUnitSystemChange = (newSystem: UnitSystem) => {
    setUnitSystem(newSystem);
    if (newSystem === "metric") {
      const cm = Math.round((heightFeet * 12 + heightInches) * 2.54);
      const kg = parseFloat((weightLbs * 0.45359237).toFixed(1));
      const nCm = parseFloat((neckInches * 2.54).toFixed(1));
      const wCm = parseFloat((waistInches * 2.54).toFixed(1));
      const hCm = parseFloat((hipInches * 2.54).toFixed(1));
      setHeightCm(cm);
      setWeightKg(kg);
      setNeckCm(nCm);
      setWaistCm(wCm);
      setHipCm(hCm);
    } else if (newSystem === "us") {
      const totalInches = Math.round(heightCm / 2.54);
      setHeightFeet(Math.floor(totalInches / 12));
      setHeightInches(parseFloat((totalInches % 12).toFixed(1)));
      setWeightLbs(Math.round(weightKg / 0.45359237));
      setNeckInches(parseFloat((neckCm / 2.54).toFixed(1)));
      setWaistInches(parseFloat((waistCm / 2.54).toFixed(1)));
      setHipInches(parseFloat((hipCm / 2.54).toFixed(1)));
    }
  };

  const handleReset = () => {
    setUnitSystem("us");
    setGender("male");
    setAge(25);
    setHeightFeet(5);
    setHeightInches(10.5);
    setWeightLbs(152);
    setNeckInches(15);
    setWaistInches(31.5);
    setHipInches(38);
    setHeightCm(178);
    setWeightKg(69);
    setNeckCm(38);
    setWaistCm(80);
    setHipCm(96);
    setTargetBfpGoal("");
  };

  // Calculation Engine Call
  const result: BodyFatResult = useMemo(() => {
    const targetBfpNum = targetBfpGoal !== "" ? Number(targetBfpGoal) : undefined;
    return calculateBodyFat({
      unitSystem,
      gender,
      age,
      heightFeet,
      heightInches,
      weightLbs,
      neckInches,
      waistInches,
      hipInches,
      heightCm,
      weightKg,
      neckCm,
      waistCm,
      hipCm,
      targetBfpGoal: targetBfpNum,
    });
  }, [
    unitSystem,
    gender,
    age,
    heightFeet,
    heightInches,
    weightLbs,
    neckInches,
    waistInches,
    hipInches,
    heightCm,
    weightKg,
    neckCm,
    waistCm,
    hipCm,
    targetBfpGoal,
  ]);

  const handleSaveCalculation = () => {
    const newItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: `${age}y/o ${gender === "male" ? "Male" : "Female"} (${result.navyBfp}%)`,
      bfp: result.navyBfp,
      category: result.categoryInfo.category,
    };
    setSavedCalculations([newItem, ...savedCalculations]);
  };

  const handleCopySummary = () => {
    const summary = `Body Fat Assessment Report (${new Date().toLocaleDateString()})
Age: ${age} | Gender: ${gender} | Height: ${result.heightCm} cm | Weight: ${result.weightLbs} lbs (${result.weightKg} kg)
U.S. Navy Body Fat: ${result.navyBfp}% (${result.categoryInfo.category})
BMI Method Body Fat: ${result.bmiBfp}%
Fat Mass: ${result.fatMassLbs} lbs (${result.fatMassKg} kg)
Lean Body Mass: ${result.leanMassLbs} lbs (${result.leanMassKg} kg)
FFMI: ${result.ffmi} (Normalized: ${result.ffmiNormalized})
Jackson & Pollock Ideal BFP for Age: ${result.idealBfpJacksonPollock}%
Calculated via CalcPlatform Health Engine`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Body Fat Assessment",
          text: `My Body Fat is ${result.navyBfp}% (${result.categoryInfo.category}). Calculate your body fat percentage:`,
          url: window.location.href,
        });
      } catch {
        handleCopySummary();
      }
    } else {
      handleCopySummary();
    }
  };

  // Dedicated Print Engine
  const handlePrint = () => {
    const reportEl = document.getElementById("body-fat-print-report");
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
          <title>Clinical Body Fat Assessment Report - CalcPlatform</title>
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
            .text-rose-700 { color: #be123c; }
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
          .body-fat-calculator-main-ui, nav, header, footer, sidebar {
            display: none !important;
          }
          #body-fat-print-report {
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

      <div className="body-fat-calculator-main-ui space-y-6">
        {/* Main Interactive Calculator Card */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm">
          <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Body Fat Calculator
                </CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1">
                  U.S. Navy Method &amp; Deurenberg BMI body fat assessment with ACE clinical classification
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
            {/* Unit System Navigation Tabs */}
            <Tabs value={unitSystem} onValueChange={(val) => handleUnitSystemChange(val as UnitSystem)}>
              <TabsList className="grid grid-cols-3 bg-zinc-100 dark:bg-zinc-950 p-1 border border-zinc-200 dark:border-zinc-800 rounded-xl mb-6">
                <TabsTrigger value="us" className="text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-blue-700 data-[state=active]:dark:text-blue-400 shadow-sm">
                  US Units (ft/in, lbs)
                </TabsTrigger>
                <TabsTrigger value="metric" className="text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-emerald-700 data-[state=active]:dark:text-emerald-400 shadow-sm">
                  Metric Units (cm, kg)
                </TabsTrigger>
                <TabsTrigger value="other" className="text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-purple-700 data-[state=active]:dark:text-purple-400 shadow-sm">
                  Other Units (m, kg)
                </TabsTrigger>
              </TabsList>

              {/* Global Demographics: Age & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 p-4 bg-zinc-50 dark:bg-zinc-950/60 rounded-xl border border-zinc-200 dark:border-zinc-800/80">
                <div>
                  <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                    Age (ages 2 – 120)
                  </Label>
                  <Input
                    type="number"
                    min={2}
                    max={120}
                    value={age}
                    onChange={(e) => setAge(Math.max(2, Math.min(120, Number(e.target.value) || 25)))}
                    className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Biological Gender
                    </Label>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">
                      {gender === "male" ? "♂ Male Selected" : "♀ Female Selected"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender("male")}
                      className={`py-2 px-3 rounded-lg text-xs font-black transition-all border flex items-center justify-center gap-1.5 cursor-pointer ${
                        gender === "male"
                          ? "bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-500/30"
                          : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <span>♂</span> Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender("female")}
                      className={`py-2 px-3 rounded-lg text-xs font-black transition-all border flex items-center justify-center gap-1.5 cursor-pointer ${
                        gender === "female"
                          ? "bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-500/30"
                          : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <span>♀</span> Female
                    </button>
                  </div>
                </div>
              </div>

              {/* US UNITS INPUTS */}
              <TabsContent value="us" className="space-y-4 m-0">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">Height</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <Input type="number" min={3} max={8} value={heightFeet} onChange={(e) => setHeightFeet(Number(e.target.value))} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold" />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">ft</span>
                      </div>
                      <div className="relative">
                        <Input type="number" step={0.5} min={0} max={11.5} value={heightInches} onChange={(e) => setHeightInches(Number(e.target.value))} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold" />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">in</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">Weight (lbs)</Label>
                    <div className="relative">
                      <Input type="number" min={50} max={800} value={weightLbs} onChange={(e) => setWeightLbs(Number(e.target.value))} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold" />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">lbs</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">Neck Circumference</Label>
                    <div className="relative">
                      <Input type="number" step={0.25} min={8} max={30} value={neckInches} onChange={(e) => setNeckInches(Number(e.target.value))} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold" />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">in</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                      Waist Circumference (at navel)
                    </Label>
                    <div className="relative">
                      <Input type="number" step={0.25} min={15} max={80} value={waistInches} onChange={(e) => setWaistInches(Number(e.target.value))} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold" />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">in</span>
                    </div>
                  </div>

                  {gender === "female" && (
                    <div>
                      <Label className="text-xs font-semibold text-rose-700 dark:text-rose-400 mb-1.5 block">
                        Hip Circumference (widest point - Required for Women)
                      </Label>
                      <div className="relative">
                        <Input type="number" step={0.25} min={20} max={90} value={hipInches} onChange={(e) => setHipInches(Number(e.target.value))} className="bg-white dark:bg-zinc-900 border-rose-300 dark:border-rose-800 text-xs font-semibold" />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">in</span>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* METRIC UNITS INPUTS */}
              <TabsContent value="metric" className="space-y-4 m-0">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">Height (cm)</Label>
                    <div className="relative">
                      <Input type="number" min={90} max={250} value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold" />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">cm</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">Weight (kg)</Label>
                    <div className="relative">
                      <Input type="number" step={0.5} min={25} max={350} value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold" />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">kg</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">Neck (cm)</Label>
                    <div className="relative">
                      <Input type="number" step={0.5} min={20} max={80} value={neckCm} onChange={(e) => setNeckCm(Number(e.target.value))} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold" />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">cm</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">Waist (cm)</Label>
                    <div className="relative">
                      <Input type="number" step={0.5} min={40} max={200} value={waistCm} onChange={(e) => setWaistCm(Number(e.target.value))} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold" />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">cm</span>
                    </div>
                  </div>

                  {gender === "female" && (
                    <div>
                      <Label className="text-xs font-semibold text-rose-700 dark:text-rose-400 mb-1.5 block">Hip (cm - Required for Women)</Label>
                      <div className="relative">
                        <Input type="number" step={0.5} min={40} max={200} value={hipCm} onChange={(e) => setHipCm(Number(e.target.value))} className="bg-white dark:bg-zinc-900 border-rose-300 dark:border-rose-800 text-xs font-semibold" />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">cm</span>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Target BFP Scenario Planner Bar */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                  Custom Goal Target BFP % (Optional Scenario Planner)
                </Label>
                <div className="relative max-w-xs">
                  <Input
                    type="number"
                    step={0.5}
                    placeholder={`Ideal for Age: ${result.idealBfpJacksonPollock}%`}
                    value={targetBfpGoal}
                    onChange={(e) => setTargetBfpGoal(e.target.value)}
                    className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">%</span>
                </div>
              </div>

              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                <span>Jackson &amp; Pollock Ideal BFP: </span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{result.idealBfpJacksonPollock}%</strong>
              </div>
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

                <Button variant="outline" size="sm" onClick={handlePrint} className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600 text-xs gap-1.5 shadow-sm">
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
            <BodyFatArchGauge result={result} />
            <BodyCompositionBar result={result} />
          </div>

          {/* Result Cards & Method Comparison */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Body Composition &amp; Assessment Summary
                </h4>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                  {result.categoryInfo.category}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">U.S. Navy Body Fat</span>
                  <strong className="text-xl font-black text-blue-600 dark:text-blue-400 block mt-0.5">{result.navyBfp}%</strong>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">BMI Method Fat</span>
                  <strong className="text-xl font-black text-sky-600 dark:text-sky-400 block mt-0.5">{result.bmiBfp}%</strong>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Fat-Free Mass Index</span>
                  <strong className="text-xl font-black text-purple-600 dark:text-purple-400 block mt-0.5">{result.ffmi}</strong>
                  <span className="text-[9px] text-zinc-400 block mt-0.5">Norm: {result.ffmiNormalized}</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Ideal BFP (Age {age})</span>
                  <strong className="text-xl font-black text-emerald-600 dark:text-emerald-400 block mt-0.5">{result.idealBfpJacksonPollock}%</strong>
                </div>
              </div>

              {/* Interpretation Note */}
              <div className="p-3 bg-blue-50/60 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900/40 text-xs text-zinc-700 dark:text-zinc-300">
                <strong className="text-blue-900 dark:text-blue-200 font-bold block mb-1">Clinical Interpretation:</strong>
                {result.categoryInfo.description}. Based on the Jackson &amp; Pollock age standards, your ideal body fat target is <strong>{result.idealBfpJacksonPollock}%</strong> (ideal target weight: <strong>{result.targetWeightForIdealLbs} lbs</strong>).
              </div>
            </div>

            {/* Auxiliary Tables */}
            <BodyFatTables result={result} />
          </div>
        </div>
      </div>

      {/* Standalone Printable PDF Report Section */}
      <div id="body-fat-print-report" className="hidden">
        <div className="p-8 max-w-4xl mx-auto space-y-6 bg-white text-zinc-900 font-sans">
          <div className="border-b-2 border-blue-600 pb-4 flex justify-between items-start">
            <div>
              <div className="text-xs font-black tracking-widest text-blue-700 uppercase">
                CalcPlatform Clinical Health &amp; Anthropometrics Lab
              </div>
              <h1 className="text-2xl font-black text-zinc-900 mt-1">
                Clinical Body Fat &amp; Composition Assessment Report
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                U.S. Navy Method, BMI Equations, FFMI &amp; ACE Category Classification
              </p>
            </div>
            <div className="text-right text-xs text-zinc-500">
              <p className="font-bold text-zinc-800" suppressHydrationWarning>Date: {new Date().toLocaleDateString()}</p>
              <p suppressHydrationWarning>Time: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              <p className="font-sans tabular-nums text-[10px] text-zinc-400 mt-1" suppressHydrationWarning>Ref ID: #BF-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-center">
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">U.S. Navy Body Fat</span>
              <strong className="text-xl font-black text-blue-700 block mt-1">{result.navyBfp}%</strong>
              <span className="text-[9px] text-zinc-500 block">{result.categoryInfo.category}</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Fat Mass</span>
              <strong className="text-xl font-black text-rose-700 block mt-1">{result.fatMassLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">{result.fatMassKg} kg</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Lean Mass</span>
              <strong className="text-xl font-black text-emerald-700 block mt-1">{result.leanMassLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">{result.leanMassKg} kg</span>
            </div>
            <div className="p-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">FFMI Index</span>
              <strong className="text-xl font-black text-purple-700 block mt-1">{result.ffmi}</strong>
              <span className="text-[9px] text-zinc-500 block">Norm: {result.ffmiNormalized}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-300 pb-1">
              1. Subject Physical Measurements
            </h3>
            <table className="w-full text-xs text-left border border-zinc-200 border-collapse">
              <tbody>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <td className="p-2 font-bold w-1/4">Age &amp; Gender:</td>
                  <td className="p-2 w-1/4">{age} years ({gender})</td>
                  <td className="p-2 font-bold w-1/4">Neck Circumference:</td>
                  <td className="p-2 w-1/4">{neckInches} in ({neckCm} cm)</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="p-2 font-bold">Height:</td>
                  <td className="p-2">{result.heightCm} cm ({result.heightInches} in)</td>
                  <td className="p-2 font-bold">Waist Circumference:</td>
                  <td className="p-2">{waistInches} in ({waistCm} cm)</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="p-2 font-bold">Weight:</td>
                  <td className="p-2">{result.weightLbs} lbs ({result.weightKg} kg)</td>
                  <td className="p-2 font-bold">Hip Circumference:</td>
                  <td className="p-2">{gender === "female" ? `${hipInches} in (${hipCm} cm)` : "N/A (Male)"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t border-zinc-300 pt-4 text-[10px] text-zinc-500 space-y-1">
            <p className="font-bold text-zinc-700">Clinical &amp; Medical Disclaimer:</p>
            <p>
              This report is generated based on standard Navy circumference equations (Hodgdon &amp; Beckett 1984) and Deurenberg BMI formulas. Individual muscle density and bone mass variations may alter estimates. Consult a medical professional before starting any body composition modification program.
            </p>
            <p className="text-zinc-400">© CalcPlatform Anthropometrics Lab • All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
