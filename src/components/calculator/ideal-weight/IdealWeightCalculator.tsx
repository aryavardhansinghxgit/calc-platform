"use client";

import React, { useState, useMemo } from "react";
import {
  Scale,
  Award,
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
  Activity,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  calculateIdealWeight,
  UnitSystem,
  Gender,
  FrameSize,
  IdealWeightResult,
} from "@/lib/formulas/idealWeight";

import {
  IdealWeightArchGauge,
  IdealWeightFormulaBarChart,
} from "./IdealWeightCharts";

import { IdealWeightTables } from "./IdealWeightTables";

export function IdealWeightCalculator() {
  // Input states
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState<number>(25);

  // US Inputs
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [currentWeightLbs, setCurrentWeightLbs] = useState<string>("");
  const [wristInches, setWristInches] = useState<string>("");

  // Metric Inputs
  const [heightCm, setHeightCm] = useState<number>(178);
  const [currentWeightKg, setCurrentWeightKg] = useState<string>("");
  const [wristCm, setWristCm] = useState<string>("");

  // Frame size state
  const [frameSize, setFrameSize] = useState<FrameSize>("medium");

  // Saved calculations
  const [savedCalculations, setSavedCalculations] = useState<
    Array<{ id: string; timestamp: string; title: string; ibw: number; bmiRange: string }>
  >([]);
  const [copied, setCopied] = useState(false);

  // Unit system change handler
  const handleUnitSystemChange = (newSystem: UnitSystem) => {
    setUnitSystem(newSystem);
    if (newSystem === "metric") {
      const cm = Math.round((heightFeet * 12 + heightInches) * 2.54);
      setHeightCm(cm);
      if (currentWeightLbs !== "") {
        const kg = parseFloat((Number(currentWeightLbs) * 0.45359237).toFixed(1));
        setCurrentWeightKg(kg.toString());
      }
      if (wristInches !== "") {
        const wCm = parseFloat((Number(wristInches) * 2.54).toFixed(1));
        setWristCm(wCm.toString());
      }
    } else if (newSystem === "us") {
      const totalInches = Math.round(heightCm / 2.54);
      setHeightFeet(Math.floor(totalInches / 12));
      setHeightInches(parseFloat((totalInches % 12).toFixed(1)));
      if (currentWeightKg !== "") {
        const lbs = Math.round(Number(currentWeightKg) / 0.45359237);
        setCurrentWeightLbs(lbs.toString());
      }
      if (wristCm !== "") {
        const wIn = parseFloat((Number(wristCm) / 2.54).toFixed(1));
        setWristInches(wIn.toString());
      }
    }
  };

  const handleReset = () => {
    setUnitSystem("us");
    setGender("male");
    setAge(25);
    setHeightFeet(5);
    setHeightInches(10);
    setCurrentWeightLbs("");
    setWristInches("");
    setHeightCm(178);
    setCurrentWeightKg("");
    setWristCm("");
    setFrameSize("medium");
  };

  // Calculation Engine Call
  const result: IdealWeightResult = useMemo(() => {
    const wLbs = currentWeightLbs !== "" ? Number(currentWeightLbs) : undefined;
    const wKg = currentWeightKg !== "" ? Number(currentWeightKg) : undefined;
    const wrIn = wristInches !== "" ? Number(wristInches) : undefined;
    const wrCm = wristCm !== "" ? Number(wristCm) : undefined;

    return calculateIdealWeight({
      unitSystem,
      gender,
      age,
      heightFeet,
      heightInches,
      currentWeightLbs: wLbs,
      wristInches: wrIn,
      heightCm,
      currentWeightKg: wKg,
      wristCm: wrCm,
      frameSize,
    });
  }, [
    unitSystem,
    gender,
    age,
    heightFeet,
    heightInches,
    currentWeightLbs,
    wristInches,
    heightCm,
    currentWeightKg,
    wristCm,
    frameSize,
  ]);

  const handleSaveCalculation = () => {
    const newItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: `${age}y/o ${gender === "male" ? "Male" : "Female"} (${result.consensusLbs} lbs IBW)`,
      ibw: result.consensusLbs,
      bmiRange: `${result.whoMinLbs}–${result.whoMaxLbs} lbs`,
    };
    setSavedCalculations([newItem, ...savedCalculations]);
  };

  const handleCopySummary = () => {
    const summary = `Ideal Weight Assessment Report (${new Date().toLocaleDateString()})
Age: ${age} | Gender: ${gender} | Height: ${result.heightCm} cm | Frame Size: ${result.frameSize}
Consensus Ideal Weight: ${result.consensusLbs} lbs (${result.consensusKg} kg)
Healthy BMI Range (18.5–25.0): ${result.whoMinLbs} lbs to ${result.whoMaxLbs} lbs
Devine Formula: ${result.devine.weightLbs} lbs | Hamwi: ${result.hamwi.weightLbs} lbs | Robinson: ${result.robinson.weightLbs} lbs | Miller: ${result.miller.weightLbs} lbs | Lemmens: ${result.lemmens.weightLbs} lbs
Calculated via CalcPlatform Health Engine`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Ideal Weight Assessment",
          text: `My Consensus Ideal Weight target is ${result.consensusLbs} lbs (${result.whoMinLbs}-${result.whoMaxLbs} lbs healthy range). Calculate yours:`,
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
    const reportEl = document.getElementById("ideal-weight-print-report");
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
          <title>Clinical Ideal Weight Assessment Report - CalcPlatform</title>
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
          .ideal-weight-calculator-main-ui, nav, header, footer, sidebar {
            display: none !important;
          }
          #ideal-weight-print-report {
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

      <div className="ideal-weight-calculator-main-ui space-y-6">
        {/* Main Interactive Calculator Card */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm">
          <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Scale className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Ideal Weight Calculator
                </CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1">
                  Hamwi, Devine, Robinson, Miller, Lemmens formulas &amp; WHO Healthy BMI Range ($18.5 - 25.0$)
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

              {/* Demographics: Age & Gender */}
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
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                      Current Scale Weight (Optional)
                    </Label>
                    <div className="relative">
                      <Input type="number" placeholder="e.g. 165" value={currentWeightLbs} onChange={(e) => setCurrentWeightLbs(e.target.value)} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold" />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">lbs</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                      Wrist Circumference (Optional Evaluator)
                    </Label>
                    <div className="relative">
                      <Input type="number" step={0.25} placeholder="e.g. 6.5" value={wristInches} onChange={(e) => setWristInches(e.target.value)} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold" />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">in</span>
                    </div>
                  </div>
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
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">Current Weight (kg)</Label>
                    <div className="relative">
                      <Input type="number" step={0.5} placeholder="e.g. 75" value={currentWeightKg} onChange={(e) => setCurrentWeightKg(e.target.value)} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold" />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">kg</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">Wrist (cm)</Label>
                    <div className="relative">
                      <Input type="number" step={0.5} placeholder="e.g. 16.5" value={wristCm} onChange={(e) => setWristCm(e.target.value)} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold" />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">cm</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Frame Size Selector Bar */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Body Frame Size Sizing Adjustment
                </Label>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  Current: {result.frameSize} frame ({result.frameMultiplier > 1 ? "+10%" : result.frameMultiplier < 1 ? "-10%" : "baseline"})
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: "small", label: "Small Frame (-10%)", desc: "Fine bone structure & slender wrist" },
                  { key: "medium", label: "Medium Frame (Baseline)", desc: "Average proportioned bone breadth" },
                  { key: "large", label: "Large Frame (+10%)", desc: "Broad bone structure & wide wrist" },
                ].map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFrameSize(f.key as FrameSize)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      frameSize === f.key
                        ? "bg-blue-50 dark:bg-blue-950/40 border-blue-600 ring-2 ring-blue-500/20"
                        : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{f.label}</div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">{f.desc}</div>
                  </button>
                ))}
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
            <IdealWeightArchGauge result={result} />
            <IdealWeightFormulaBarChart result={result} />
          </div>

          {/* Result Cards & Method Comparison */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Consensus Ideal Weight &amp; Healthy BMI Range
                </h4>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                  {result.frameSize.toUpperCase()} FRAME
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Consensus Ideal Weight</span>
                  <strong className="text-xl font-black text-blue-600 dark:text-blue-400 block mt-0.5">{result.consensusLbs} lbs</strong>
                  <span className="text-[9px] text-zinc-400 block mt-0.5">{result.consensusKg} kg</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Healthy BMI Range</span>
                  <strong className="text-xl font-black text-emerald-600 dark:text-emerald-400 block mt-0.5">{result.whoMinLbs}–{result.whoMaxLbs}</strong>
                  <span className="text-[9px] text-zinc-400 block mt-0.5">lbs (18.5–25.0 BMI)</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Devine Standard (1974)</span>
                  <strong className="text-xl font-black text-sky-600 dark:text-sky-400 block mt-0.5">{result.devine.weightLbs} lbs</strong>
                  <span className="text-[9px] text-zinc-400 block mt-0.5">{result.devine.weightKg} kg</span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Lemmens BMI 22 (2005)</span>
                  <strong className="text-xl font-black text-purple-600 dark:text-purple-400 block mt-0.5">{result.lemmens.weightLbs} lbs</strong>
                  <span className="text-[9px] text-zinc-400 block mt-0.5">{result.lemmens.weightKg} kg</span>
                </div>
              </div>

              {/* Interpretation Note */}
              <div className="p-3 bg-blue-50/60 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900/40 text-xs text-zinc-700 dark:text-zinc-300">
                <strong className="text-blue-900 dark:text-blue-200 font-bold block mb-1">Clinical Guidance:</strong>
                For a height of <strong>{result.heightCm} cm</strong> ({result.heightInches} in) with a <strong>{result.frameSize}</strong> frame size, the recommended consensus ideal weight target is <strong>{result.consensusLbs} lbs</strong> ({result.consensusKg} kg). The World Health Organization healthy weight envelope spans <strong>{result.whoMinLbs} lbs</strong> to <strong>{result.whoMaxLbs} lbs</strong>.
              </div>
            </div>

            {/* Auxiliary Tables */}
            <IdealWeightTables result={result} />
          </div>
        </div>
      </div>

      {/* Standalone Printable PDF Report Section */}
      <div id="ideal-weight-print-report" className="hidden">
        <div className="p-8 max-w-4xl mx-auto space-y-6 bg-white text-zinc-900 font-sans">
          <div className="border-b-2 border-blue-600 pb-4 flex justify-between items-start">
            <div>
              <div className="text-xs font-black tracking-widest text-blue-700 uppercase">
                CalcPlatform Clinical Health &amp; Anthropometrics Lab
              </div>
              <h1 className="text-2xl font-black text-blue-600 mt-1">
                Clinical Ideal Body Weight (IBW) Assessment Report
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                Hamwi, Devine, Robinson, Miller, Lemmens Equations &amp; WHO Healthy BMI Range
              </p>
            </div>
            <div className="text-right text-xs text-zinc-500">
              <p className="font-bold text-zinc-800" suppressHydrationWarning>Date: {new Date().toLocaleDateString()}</p>
              <p suppressHydrationWarning>Time: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              <p className="font-sans tabular-nums text-[10px] text-zinc-400 mt-1" suppressHydrationWarning>Ref ID: #IBW-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-center">
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Consensus IBW</span>
              <strong className="text-xl font-black text-blue-700 block mt-1">{result.consensusLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">{result.consensusKg} kg</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Devine Standard</span>
              <strong className="text-xl font-black text-sky-700 block mt-1">{result.devine.weightLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">1974 Formula</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Healthy BMI Range</span>
              <strong className="text-xl font-black text-emerald-700 block mt-1">{result.whoMinLbs}–{result.whoMaxLbs} lbs</strong>
              <span className="text-[9px] text-zinc-500 block">WHO 18.5–25.0</span>
            </div>
            <div className="p-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Body Frame</span>
              <strong className="text-xl font-black text-purple-700 block mt-1 uppercase">{result.frameSize}</strong>
              <span className="text-[9px] text-zinc-500 block">{result.frameMultiplier > 1 ? "+10%" : result.frameMultiplier < 1 ? "-10%" : "Baseline"}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-zinc-300 pb-1">
              1. Subject Physical Demographics &amp; Parameters
            </h3>
            <table className="w-full text-xs text-left border border-zinc-200 border-collapse">
              <tbody>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <td className="p-2 font-bold w-1/4">Age &amp; Gender:</td>
                  <td className="p-2 w-1/4">{age} years ({gender})</td>
                  <td className="p-2 font-bold w-1/4">Devine Target (1974):</td>
                  <td className="p-2 w-1/4">{result.devine.weightLbs} lbs ({result.devine.weightKg} kg)</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="p-2 font-bold">Height:</td>
                  <td className="p-2">{result.heightCm} cm ({result.heightInches} in)</td>
                  <td className="p-2 font-bold">Robinson Target (1983):</td>
                  <td className="p-2">{result.robinson.weightLbs} lbs ({result.robinson.weightKg} kg)</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="p-2 font-bold">Current Weight:</td>
                  <td className="p-2">{result.currentWeightLbs ? `${result.currentWeightLbs} lbs (${result.currentWeightKg} kg)` : "Not Specified"}</td>
                  <td className="p-2 font-bold">Miller Target (1983):</td>
                  <td className="p-2">{result.miller.weightLbs} lbs ({result.miller.weightKg} kg)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t border-zinc-300 pt-4 text-[10px] text-zinc-500 space-y-1">
            <p className="font-bold text-zinc-700">Clinical &amp; Medical Disclaimer:</p>
            <p>
              This report is generated based on standard IBW predictive equations (Devine 1974, Hamwi 1964, Robinson 1983, Miller 1983, Lemmens 2005). Individual muscle mass and athletic composition may alter targets. Consult a physician before embarking on aggressive weight loss programs.
            </p>
            <p className="text-zinc-400">© CalcPlatform Anthropometrics Lab • All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
