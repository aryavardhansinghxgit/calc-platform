"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Trash2,
  RotateCcw,
  Table,
  AlertTriangle,
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

interface SavedScenario {
  id: string;
  timestamp: string;
  title: string;
  unitSystem: UnitSystem;
  gender: Gender;
  age: number;
  heightFeet: number;
  heightInches: number;
  weightLbs: number;
  neckInches: number;
  waistInches: number;
  hipInches: number;
  heightCm: number;
  weightKg: number;
  neckCm: number;
  waistCm: number;
  hipCm: number;
  heightMeters: number;
  weightKgOther: number;
  targetBfpGoal: string;
  bfp: number;
  category: string;
  fatMassLbs: number;
  leanMassLbs: number;
}

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

  // Other Inputs
  const [heightMeters, setHeightMeters] = useState<number>(1.78);
  const [weightKgOther, setWeightKgOther] = useState<number>(69);

  // Target BFP Goal state
  const [targetBfpGoal, setTargetBfpGoal] = useState<string>("");

  // Saved calculations & action states
  const [savedCalculations, setSavedCalculations] = useState<SavedScenario[]>([]);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("body_fat_saved_scenarios");
      if (raw) {
        setSavedCalculations(JSON.parse(raw));
      }
    } catch (e) {
      console.error("Failed to load saved scenarios from localStorage", e);
    }
  }, []);

  // Hydrate from URL parameters
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.has("gender")) {
      const g = params.get("gender");
      if (g === "male" || g === "female") setGender(g);
    }
    if (params.has("unit")) {
      const u = params.get("unit");
      if (u === "us" || u === "metric" || u === "other") setUnitSystem(u);
    }
    if (params.has("age")) {
      const a = Number(params.get("age"));
      if (!isNaN(a) && a >= 2 && a <= 120) setAge(a);
    }
    if (params.has("hCm")) {
      const v = Number(params.get("hCm"));
      if (!isNaN(v) && v > 0) setHeightCm(v);
    }
    if (params.has("wKg")) {
      const v = Number(params.get("wKg"));
      if (!isNaN(v) && v > 0) setWeightKg(v);
    }
    if (params.has("nCm")) {
      const v = Number(params.get("nCm"));
      if (!isNaN(v) && v > 0) setNeckCm(v);
    }
    if (params.has("waistCm")) {
      const v = Number(params.get("waistCm"));
      if (!isNaN(v) && v > 0) setWaistCm(v);
    }
    if (params.has("hipCm")) {
      const v = Number(params.get("hipCm"));
      if (!isNaN(v) && v > 0) setHipCm(v);
    }
    if (params.has("hFt")) {
      const v = Number(params.get("hFt"));
      if (!isNaN(v) && v >= 0) setHeightFeet(v);
    }
    if (params.has("hIn")) {
      const v = Number(params.get("hIn"));
      if (!isNaN(v) && v >= 0) setHeightInches(v);
    }
    if (params.has("wLbs")) {
      const v = Number(params.get("wLbs"));
      if (!isNaN(v) && v > 0) setWeightLbs(v);
    }
    if (params.has("nIn")) {
      const v = Number(params.get("nIn"));
      if (!isNaN(v) && v > 0) setNeckInches(v);
    }
    if (params.has("wIn")) {
      const v = Number(params.get("wIn"));
      if (!isNaN(v) && v > 0) setWaistInches(v);
    }
    if (params.has("hipIn")) {
      const v = Number(params.get("hipIn"));
      if (!isNaN(v) && v > 0) setHipInches(v);
    }
    if (params.has("target")) {
      setTargetBfpGoal(params.get("target") || "");
    }
  }, []);

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
    } else if (newSystem === "other") {
      setHeightMeters(parseFloat((heightCm / 100).toFixed(2)));
      setWeightKgOther(weightKg);
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
    setHeightMeters(1.78);
    setWeightKgOther(69);
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
      heightMeters,
      weightKgOther,
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
    heightMeters,
    weightKgOther,
    targetBfpGoal,
  ]);

  const handleSaveCalculation = () => {
    const newItem: SavedScenario = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: `${age}y/o ${gender === "male" ? "Male" : "Female"} (${result.navyBfp}%)`,
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
      heightMeters,
      weightKgOther,
      targetBfpGoal,
      bfp: result.navyBfp,
      category: result.categoryInfo.category,
      fatMassLbs: result.fatMassLbs,
      leanMassLbs: result.leanMassLbs,
    };
    const updated = [newItem, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updated);
    try {
      localStorage.setItem("body_fat_saved_scenarios", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to persist scenario", e);
    }
  };

  const handleRestoreScenario = (sc: SavedScenario) => {
    setUnitSystem(sc.unitSystem);
    setGender(sc.gender);
    setAge(sc.age);
    setHeightFeet(sc.heightFeet);
    setHeightInches(sc.heightInches);
    setWeightLbs(sc.weightLbs);
    setNeckInches(sc.neckInches);
    setWaistInches(sc.waistInches);
    setHipInches(sc.hipInches);
    setHeightCm(sc.heightCm);
    setWeightKg(sc.weightKg);
    setNeckCm(sc.neckCm);
    setWaistCm(sc.waistCm);
    setHipCm(sc.hipCm);
    setHeightMeters(sc.heightMeters || 1.78);
    setWeightKgOther(sc.weightKgOther || 69);
    setTargetBfpGoal(sc.targetBfpGoal || "");
  };

  const handleDeleteScenario = (id: string) => {
    const updated = savedCalculations.filter((item) => item.id !== id);
    setSavedCalculations(updated);
    try {
      localStorage.setItem("body_fat_saved_scenarios", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update localStorage", e);
    }
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
    const params = new URLSearchParams();
    params.set("gender", gender);
    params.set("unit", unitSystem);
    params.set("age", age.toString());
    if (unitSystem === "metric" || unitSystem === "other") {
      params.set("hCm", heightCm.toString());
      params.set("wKg", weightKg.toString());
      params.set("nCm", neckCm.toString());
      params.set("waistCm", waistCm.toString());
      if (gender === "female") params.set("hipCm", hipCm.toString());
    } else {
      params.set("hFt", heightFeet.toString());
      params.set("hIn", heightInches.toString());
      params.set("wLbs", weightLbs.toString());
      params.set("nIn", neckInches.toString());
      params.set("wIn", waistInches.toString());
      if (gender === "female") params.set("hipIn", hipInches.toString());
    }
    if (targetBfpGoal) params.set("target", targetBfpGoal);

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Body Fat Assessment - CalcPlatform",
          text: `My estimated Body Fat is ${result.navyBfp}% (${result.categoryInfo.category}). Calculate yours:`,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(shareUrl);
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  };

  const handleExportCSV = () => {
    const dateStr = new Date().toISOString().split("T")[0];
    const rows = [
      ["Body Fat Assessment Report", "CalcPlatform Health Engine"],
      ["Date", dateStr],
      ["", ""],
      ["--- SUBJECT PROFILE & MEASUREMENTS ---", ""],
      ["Biological Gender", gender === "male" ? "Male" : "Female"],
      ["Age", `${age} years`],
      ["Active Unit System", unitSystem.toUpperCase()],
      ["Height (cm)", `${result.heightCm} cm`],
      ["Height (in)", `${result.heightInches} in`],
      ["Weight (kg)", `${result.weightKg} kg`],
      ["Weight (lbs)", `${result.weightLbs} lbs`],
      [
        "Neck Circumference",
        unitSystem === "us"
          ? `${neckInches} in (${(neckInches * 2.54).toFixed(1)} cm)`
          : `${neckCm} cm (${(neckCm / 2.54).toFixed(1)} in)`,
      ],
      [
        "Waist Circumference",
        unitSystem === "us"
          ? `${waistInches} in (${(waistInches * 2.54).toFixed(1)} cm)`
          : `${waistCm} cm (${(waistCm / 2.54).toFixed(1)} in)`,
      ],
      [
        "Hip Circumference",
        gender === "female"
          ? unitSystem === "us"
            ? `${hipInches} in (${(hipInches * 2.54).toFixed(1)} cm)`
            : `${hipCm} cm (${(hipCm / 2.54).toFixed(1)} in)`
          : "N/A (Male)",
      ],
      ["", ""],
      ["--- PRIMARY BODY COMPOSITION RESULTS ---", ""],
      ["U.S. Navy Body Fat Percentage", `${result.navyBfp}%`],
      ["ACE Category Classification", result.categoryInfo.category],
      ["Fat Mass (lbs)", `${result.fatMassLbs} lbs`],
      ["Fat Mass (kg)", `${result.fatMassKg} kg`],
      ["Lean Body Mass (lbs)", `${result.leanMassLbs} lbs`],
      ["Lean Body Mass (kg)", `${result.leanMassKg} kg`],
      ["", ""],
      ["--- SECONDARY & COMPARATIVE METRICS ---", ""],
      ["BMI Method Body Fat Percentage", `${result.bmiBfp}%`],
      ["Body Mass Index (BMI)", `${result.bmi}`],
      ["Fat-Free Mass Index (FFMI)", `${result.ffmi}`],
      ["Normalized FFMI (1.8m standardized)", `${result.ffmiNormalized}`],
      ["Jackson & Pollock Ideal BFP (Age Standard)", `${result.idealBfpJacksonPollock}%`],
      ["Target Weight for Ideal BFP (lbs)", `${result.targetWeightForIdealLbs} lbs`],
      ["Fat Difference to Ideal (lbs)", `${result.fatDifferenceLbs} lbs`],
      ["", ""],
      ["--- TARGET GOAL & FAT LOSS TIMELINE ---", ""],
      ["Goal Target BFP", `${result.customTargetBfp}%`],
      ["Target Body Weight (lbs)", `${result.customTargetWeightLbs} lbs`],
      ["Fat to Lose (lbs)", `${result.customFatToLoseLbs} lbs`],
      ["Conservative (0.5 lb/wk) Timeline", `${Math.ceil(Math.max(0, result.customFatToLoseLbs) / 0.5)} weeks (-250 kcal/day)`],
      ["Standard (1.0 lb/wk) Timeline", `${Math.ceil(Math.max(0, result.customFatToLoseLbs))} weeks (-500 kcal/day)`],
      ["Aggressive (1.5 lbs/wk) Timeline", `${Math.ceil(Math.max(0, result.customFatToLoseLbs) / 1.5)} weeks (-750 kcal/day)`],
      ["Maximum (2.0 lbs/wk) Timeline", `${Math.ceil(Math.max(0, result.customFatToLoseLbs) / 2.0)} weeks (-1000 kcal/day)`],
    ];

    const csvContent = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `body-fat-assessment-${gender}-${age}y-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
    <div className="w-full space-y-8">
      {/* Print stylesheet */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #body-fat-print-report,
          #body-fat-print-report * {
            visibility: visible;
          }
          #body-fat-print-report {
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
                  <Label htmlFor="bf-age" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                    Age (ages 2 – 120)
                  </Label>
                  <Input
                    id="bf-age"
                    type="number"
                    min={2}
                    max={120}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
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
                    <Label htmlFor="bf-us-height-ft" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                      Height
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <Input
                          id="bf-us-height-ft"
                          type="number"
                          min={3}
                          max={8}
                          value={heightFeet}
                          onChange={(e) => setHeightFeet(Number(e.target.value))}
                          className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                        />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">ft</span>
                      </div>
                      <div className="relative">
                        <Input
                          id="bf-us-height-in"
                          type="number"
                          step={0.5}
                          min={0}
                          max={11.5}
                          value={heightInches}
                          onChange={(e) => setHeightInches(Number(e.target.value))}
                          className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                        />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">in</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bf-us-weight" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                      Weight (lbs)
                    </Label>
                    <div className="relative">
                      <Input
                        id="bf-us-weight"
                        type="number"
                        min={50}
                        max={800}
                        value={weightLbs}
                        onChange={(e) => setWeightLbs(Number(e.target.value))}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">lbs</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bf-us-neck" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                      Neck Circumference
                    </Label>
                    <div className="relative">
                      <Input
                        id="bf-us-neck"
                        type="number"
                        step={0.25}
                        min={8}
                        max={30}
                        value={neckInches}
                        onChange={(e) => setNeckInches(Number(e.target.value))}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">in</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <Label htmlFor="bf-us-waist" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                      Waist Circumference (at navel)
                    </Label>
                    <div className="relative">
                      <Input
                        id="bf-us-waist"
                        type="number"
                        step={0.25}
                        min={15}
                        max={80}
                        value={waistInches}
                        onChange={(e) => setWaistInches(Number(e.target.value))}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">in</span>
                    </div>
                  </div>

                  {gender === "female" && (
                    <div>
                      <Label htmlFor="bf-us-hip" className="text-xs font-semibold text-rose-700 dark:text-rose-400 mb-1.5 block">
                        Hip Circumference (widest point - Required for Women)
                      </Label>
                      <div className="relative">
                        <Input
                          id="bf-us-hip"
                          type="number"
                          step={0.25}
                          min={20}
                          max={90}
                          value={hipInches}
                          onChange={(e) => setHipInches(Number(e.target.value))}
                          className="bg-white dark:bg-zinc-900 border-rose-300 dark:border-rose-800 text-xs font-semibold"
                        />
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
                    <Label htmlFor="bf-metric-height" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                      Height (cm)
                    </Label>
                    <div className="relative">
                      <Input
                        id="bf-metric-height"
                        type="number"
                        min={90}
                        max={250}
                        value={heightCm}
                        onChange={(e) => setHeightCm(Number(e.target.value))}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">cm</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bf-metric-weight" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                      Weight (kg)
                    </Label>
                    <div className="relative">
                      <Input
                        id="bf-metric-weight"
                        type="number"
                        step={0.5}
                        min={25}
                        max={350}
                        value={weightKg}
                        onChange={(e) => setWeightKg(Number(e.target.value))}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">kg</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bf-metric-neck" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                      Neck (cm)
                    </Label>
                    <div className="relative">
                      <Input
                        id="bf-metric-neck"
                        type="number"
                        step={0.5}
                        min={20}
                        max={80}
                        value={neckCm}
                        onChange={(e) => setNeckCm(Number(e.target.value))}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">cm</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <Label htmlFor="bf-metric-waist" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                      Waist (cm)
                    </Label>
                    <div className="relative">
                      <Input
                        id="bf-metric-waist"
                        type="number"
                        step={0.5}
                        min={40}
                        max={200}
                        value={waistCm}
                        onChange={(e) => setWaistCm(Number(e.target.value))}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">cm</span>
                    </div>
                  </div>

                  {gender === "female" && (
                    <div>
                      <Label htmlFor="bf-metric-hip" className="text-xs font-semibold text-rose-700 dark:text-rose-400 mb-1.5 block">
                        Hip (cm - Required for Women)
                      </Label>
                      <div className="relative">
                        <Input
                          id="bf-metric-hip"
                          type="number"
                          step={0.5}
                          min={40}
                          max={200}
                          value={hipCm}
                          onChange={(e) => setHipCm(Number(e.target.value))}
                          className="bg-white dark:bg-zinc-900 border-rose-300 dark:border-rose-800 text-xs font-semibold"
                        />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">cm</span>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* OTHER UNITS INPUTS (m, kg) */}
              <TabsContent value="other" className="space-y-4 m-0">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bf-other-height" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                      Height (meters)
                    </Label>
                    <div className="relative">
                      <Input
                        id="bf-other-height"
                        type="number"
                        step={0.01}
                        min={0.9}
                        max={2.5}
                        value={heightMeters}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setHeightMeters(val);
                          setHeightCm(Math.round(val * 100));
                        }}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">m</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bf-other-weight" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                      Weight (kg)
                    </Label>
                    <div className="relative">
                      <Input
                        id="bf-other-weight"
                        type="number"
                        step={0.5}
                        min={25}
                        max={350}
                        value={weightKgOther}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setWeightKgOther(val);
                          setWeightKg(val);
                        }}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">kg</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bf-other-neck" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                      Neck (cm)
                    </Label>
                    <div className="relative">
                      <Input
                        id="bf-other-neck"
                        type="number"
                        step={0.5}
                        min={20}
                        max={80}
                        value={neckCm}
                        onChange={(e) => setNeckCm(Number(e.target.value))}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">cm</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <Label htmlFor="bf-other-waist" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                      Waist (cm)
                    </Label>
                    <div className="relative">
                      <Input
                        id="bf-other-waist"
                        type="number"
                        step={0.5}
                        min={40}
                        max={200}
                        value={waistCm}
                        onChange={(e) => setWaistCm(Number(e.target.value))}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400">cm</span>
                    </div>
                  </div>

                  {gender === "female" && (
                    <div>
                      <Label htmlFor="bf-other-hip" className="text-xs font-semibold text-rose-700 dark:text-rose-400 mb-1.5 block">
                        Hip (cm - Required for Women)
                      </Label>
                      <div className="relative">
                        <Input
                          id="bf-other-hip"
                          type="number"
                          step={0.5}
                          min={40}
                          max={200}
                          value={hipCm}
                          onChange={(e) => setHipCm(Number(e.target.value))}
                          className="bg-white dark:bg-zinc-900 border-rose-300 dark:border-rose-800 text-xs font-semibold"
                        />
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
                <Label htmlFor="bf-target-goal" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 block">
                  Custom Goal Target BFP % (Optional Scenario Planner)
                </Label>
                <div className="relative max-w-xs">
                  <Input
                    id="bf-target-goal"
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

            {/* Responsive Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopySummary}
                  className="text-xs h-8 gap-1.5 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy Summary"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="text-xs h-8 gap-1.5 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  {shared ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  {shared ? "Link Copied!" : "Share"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveCalculation}
                  className="text-xs h-8 gap-1.5 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  <Bookmark className="w-3.5 h-3.5 text-purple-600" />
                  Save Calculation
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="text-xs h-8 gap-1.5 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  <Printer className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                  Print / PDF Report
                </Button>

                <Button
                  size="sm"
                  onClick={handleExportCSV}
                  className="text-xs h-8 gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                >
                  <Table className="w-3.5 h-3.5" />
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Saved Calculations Drawer */}
            {savedCalculations.length > 0 && (
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
                  Saved Calculation History ({savedCalculations.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {savedCalculations.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-zinc-900 dark:text-zinc-100">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-zinc-500">
                          {item.timestamp} &bull; Fat: {item.fatMassLbs} lbs &bull; Lean: {item.leanMassLbs} lbs
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRestoreScenario(item)}
                          className="h-7 px-2 text-[11px] text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                          title="Restore inputs"
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Restore
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteScenario(item.id)}
                          className="h-7 px-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          title="Delete scenario"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Validation Warning Alert */}
        {!result.isValid && (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600" />
            <div>
              <strong className="font-bold block">Input Notice:</strong>
              {result.errorMessage || "Please enter valid non-zero physical measurements."}
            </div>
          </div>
        )}

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
                  {result.isValid ? result.categoryInfo.category : "Awaiting Input"}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">U.S. Navy Body Fat</span>
                  <strong className="text-xl font-black text-blue-600 dark:text-blue-400 block mt-0.5">
                    {result.isValid ? `${result.navyBfp}%` : "--"}
                  </strong>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">BMI Method Fat</span>
                  <strong className="text-xl font-black text-sky-600 dark:text-sky-400 block mt-0.5">
                    {result.isValid ? `${result.bmiBfp}%` : "--"}
                  </strong>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Fat-Free Mass Index</span>
                  <strong className="text-xl font-black text-purple-600 dark:text-purple-400 block mt-0.5">
                    {result.isValid ? result.ffmi : "--"}
                  </strong>
                  <span className="text-[9px] text-zinc-400 block mt-0.5">
                    Norm: {result.isValid ? result.ffmiNormalized : "--"}
                  </span>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Ideal BFP (Age {age})</span>
                  <strong className="text-xl font-black text-emerald-600 dark:text-emerald-400 block mt-0.5">
                    {result.isValid ? `${result.idealBfpJacksonPollock}%` : "--"}
                  </strong>
                </div>
              </div>

              {/* Interpretation Note */}
              <div className="p-3 bg-blue-50/60 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900/40 text-xs text-zinc-700 dark:text-zinc-300">
                <strong className="text-blue-900 dark:text-blue-200 font-bold block mb-1">Clinical Interpretation:</strong>
                {result.isValid ? (
                  <>
                    {result.categoryInfo.description}. Based on Jackson &amp; Pollock age standards, your ideal body fat target is <strong>{result.idealBfpJacksonPollock}%</strong> (ideal target weight: <strong>{result.targetWeightForIdealLbs} lbs</strong>).
                  </>
                ) : (
                  result.errorMessage || "Please enter valid measurements to evaluate body fat percentage."
                )}
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
              <h2 className="text-2xl font-black text-blue-600 mt-1">
                Clinical Body Fat &amp; Composition Assessment Report
              </h2>
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
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-zinc-300 pb-1">
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
            <p className="text-zinc-400">&copy; CalcPlatform Anthropometrics Lab &bull; All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BodyFatCalculator;
