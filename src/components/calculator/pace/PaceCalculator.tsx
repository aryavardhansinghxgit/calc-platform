"use client";

import React, { useState, useMemo } from "react";
import {
  Activity,
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
  HeartPulse,
  Plus,
  Trash2,
  Zap,
  Table,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  calculatePace,
  calculateMultipointSplits,
  convertDistanceToMeters,
  getPresetEventMeters,
  DistanceUnit,
  PaceUnit,
  PresetEvent,
  CalculationMode,
  PaceResult,
  SplitSegmentInput,
} from "@/lib/formulas/pace";

import {
  PaceSpeedometerGauge,
  SegmentSplitsBarChart,
} from "./PaceCharts";

import { PaceTables } from "./PaceTables";

export function PaceCalculator() {
  // Main Sub-Tool Tab state
  const [activeTab, setActiveTab] = useState<string>("pace_calc");

  // Mode 1 Input states
  const [calcMode, setCalcMode] = useState<CalculationMode>("calculate_pace");
  const [presetEvent, setPresetEvent] = useState<PresetEvent>("5k");
  const [timeHours, setTimeHours] = useState<number>(0);
  const [timeMinutes, setTimeMinutes] = useState<number>(25);
  const [timeSeconds, setTimeSeconds] = useState<number>(0);
  const [distanceValue, setDistanceValue] = useState<number>(5);
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>("km");
  const [paceMinutes, setPaceMinutes] = useState<number>(5);
  const [paceSeconds, setPaceSeconds] = useState<number>(0);
  const [paceUnit, setPaceUnit] = useState<PaceUnit>("min_km");
  const [age, setAge] = useState<number>(30);

  // Helper to convert distance between units
  const convertValue = (val: number, fromUnit: DistanceUnit, toUnit: DistanceUnit): number => {
    if (fromUnit === toUnit) return val;
    const meters = convertDistanceToMeters(val, fromUnit);
    switch (toUnit) {
      case "miles":
        return parseFloat((meters / 1609.344).toFixed(3));
      case "km":
        return parseFloat((meters / 1000).toFixed(3));
      case "meters":
        return Math.round(meters);
      case "yards":
        return Math.round(meters / 0.9144);
      case "feet":
        return Math.round(meters / 0.3048);
      default:
        return val;
    }
  };

  const handleDistanceUnitChange = (newUnit: DistanceUnit) => {
    if (presetEvent !== "custom") {
      const meters = getPresetEventMeters(presetEvent);
      const converted = convertValue(meters, "meters", newUnit);
      setDistanceValue(converted);
    } else {
      const converted = convertValue(distanceValue, distanceUnit, newUnit);
      setDistanceValue(converted);
    }
    setDistanceUnit(newUnit);
  };

  const handlePresetEventChange = (newEvent: PresetEvent) => {
    setPresetEvent(newEvent);
    if (newEvent !== "custom") {
      const meters = getPresetEventMeters(newEvent);
      const converted = convertValue(meters, "meters", distanceUnit);
      setDistanceValue(converted);
    }
  };

  // Mode 2: Multipoint Segment Splits State
  const [splitSegments, setSplitSegments] = useState<SplitSegmentInput[]>([
    { id: "1", distanceValue: 1, distanceUnit: "km", timeHours: 0, timeMinutes: 5, timeSeconds: 0 },
    { id: "2", distanceValue: 1, distanceUnit: "km", timeHours: 0, timeMinutes: 4, timeSeconds: 55 },
    { id: "3", distanceValue: 1, distanceUnit: "km", timeHours: 0, timeMinutes: 4, timeSeconds: 50 },
  ]);

  // Saved calculations
  const [savedCalculations, setSavedCalculations] = useState<
    Array<{ id: string; timestamp: string; title: string; paceMile: string; paceKm: string }>
  >([]);
  const [copied, setCopied] = useState(false);

  const handleReset = () => {
    setCalcMode("calculate_pace");
    setPresetEvent("5k");
    setTimeHours(0);
    setTimeMinutes(25);
    setTimeSeconds(0);
    setDistanceValue(5);
    setDistanceUnit("km");
    setPaceMinutes(5);
    setPaceSeconds(0);
    setPaceUnit("min_km");
    setAge(30);
    setSplitSegments([
      { id: "1", distanceValue: 1, distanceUnit: "km", timeHours: 0, timeMinutes: 5, timeSeconds: 0 },
      { id: "2", distanceValue: 1, distanceUnit: "km", timeHours: 0, timeMinutes: 4, timeSeconds: 55 },
      { id: "3", distanceValue: 1, distanceUnit: "km", timeHours: 0, timeMinutes: 4, timeSeconds: 50 },
    ]);
  };

  // Primary Pace Engine Call
  const result: PaceResult = useMemo(() => {
    return calculatePace({
      calcMode,
      presetEvent,
      timeHours,
      timeMinutes,
      timeSeconds,
      distanceValue,
      distanceUnit,
      paceMinutes,
      paceSeconds,
      paceUnit,
      age,
    });
  }, [
    calcMode,
    presetEvent,
    timeHours,
    timeMinutes,
    timeSeconds,
    distanceValue,
    distanceUnit,
    paceMinutes,
    paceSeconds,
    paceUnit,
    age,
  ]);

  // Multipoint Splits Call
  const multipointResult = useMemo(() => {
    return calculateMultipointSplits(splitSegments);
  }, [splitSegments]);

  const handleAddSegment = () => {
    if (splitSegments.length >= 12) return;
    const newId = Date.now().toString();
    const lastSeg = splitSegments[splitSegments.length - 1];
    setSplitSegments([
      ...splitSegments,
      {
        id: newId,
        distanceValue: lastSeg ? lastSeg.distanceValue : 1,
        distanceUnit: lastSeg ? lastSeg.distanceUnit : "km",
        timeHours: 0,
        timeMinutes: 5,
        timeSeconds: 0,
      },
    ]);
  };

  const handleRemoveSegment = (id: string) => {
    if (splitSegments.length <= 1) return;
    setSplitSegments(splitSegments.filter((s) => s.id !== id));
  };

  const handleUpdateSegment = (id: string, field: keyof SplitSegmentInput, val: any) => {
    setSplitSegments(
      splitSegments.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  const handleSaveCalculation = () => {
    const newItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: `${result.totalDistanceKm} km in ${result.totalTimeFormatted}`,
      paceMile: result.pacePerMileFormatted,
      paceKm: result.pacePerKmFormatted,
    };
    setSavedCalculations([newItem, ...savedCalculations]);
  };

  const handleCopySummary = () => {
    const summary = `Pace & Athletic Performance Report (${new Date().toLocaleDateString()})
Distance: ${result.totalDistanceMiles} miles (${result.totalDistanceKm} km)
Total Time: ${result.totalTimeFormatted}
Pace per Mile: ${result.pacePerMileFormatted} /mi
Pace per Kilometer: ${result.pacePerKmFormatted} /km
Speed: ${result.speedMph} mph (${result.speedKmh} km/h)
Predicted Marathon Time (Riegel): ${result.riegelPredictions[3]?.predictedTimeFormatted || "N/A"}
Max Heart Rate (Age ${age}): ${result.maxHeartRateFox} bpm
Calculated via CalcPlatform Health Engine`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Athletic Pace Assessment",
          text: `My Pace is ${result.pacePerKmFormatted} /km (${result.pacePerMileFormatted} /mi). Calculate your pace splits:`,
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
    const reportEl = document.getElementById("pace-print-report");
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
          <title>Clinical Athletic Pace &amp; Performance Report - CalcPlatform</title>
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
          .pace-calculator-main-ui, nav, header, footer, sidebar {
            display: none !important;
          }
          #pace-print-report {
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

      <div className="pace-calculator-main-ui space-y-6">
        {/* Main Interactive Calculator Card */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm">
          <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Pace Calculator &amp; Athletic Performance Suite
                </CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1">
                  Pace/Time/Distance, Multipoint Segment Splits, Riegel Race Predictor &amp; HR Zones
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
            {/* Top Tool Suite Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 sm:grid-cols-5 bg-zinc-100 dark:bg-zinc-950 p-1 border border-zinc-200 dark:border-zinc-800 rounded-xl mb-6">
                <TabsTrigger value="pace_calc" className="text-xs font-bold gap-1 data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-blue-700">
                  <Activity className="w-3.5 h-3.5" /> Pace / Time
                </TabsTrigger>
                <TabsTrigger value="splits" className="text-xs font-bold gap-1 data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-emerald-700">
                  <Table className="w-3.5 h-3.5" /> Segment Splits
                </TabsTrigger>
                <TabsTrigger value="converter" className="text-xs font-bold gap-1 data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-purple-700">
                  <Zap className="w-3.5 h-3.5" /> Converter
                </TabsTrigger>
                <TabsTrigger value="riegel" className="text-xs font-bold gap-1 data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-amber-700">
                  <Award className="w-3.5 h-3.5" /> Race Predictor
                </TabsTrigger>
                <TabsTrigger value="hr_zones" className="text-xs font-bold gap-1 data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-900 data-[state=active]:text-rose-700">
                  <HeartPulse className="w-3.5 h-3.5" /> HR Zones
                </TabsTrigger>
              </TabsList>

              {/* TAB 1: PACE / TIME / DISTANCE CALCULATOR */}
              <TabsContent value="pace_calc" className="space-y-5 m-0">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Calculation Goal:</Label>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setCalcMode("calculate_pace")}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          calcMode === "calculate_pace" ? "bg-blue-600 text-white" : "bg-white dark:bg-zinc-900 text-zinc-600 border border-zinc-200 dark:border-zinc-800"
                        }`}
                      >
                        Pace
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcMode("calculate_time")}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          calcMode === "calculate_time" ? "bg-blue-600 text-white" : "bg-white dark:bg-zinc-900 text-zinc-600 border border-zinc-200 dark:border-zinc-800"
                        }`}
                      >
                        Time
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcMode("calculate_distance")}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          calcMode === "calculate_distance" ? "bg-blue-600 text-white" : "bg-white dark:bg-zinc-900 text-zinc-600 border border-zinc-200 dark:border-zinc-800"
                        }`}
                      >
                        Distance
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Preset Event:</Label>
                    <select
                      value={presetEvent}
                      onChange={(e) => handlePresetEventChange(e.target.value as PresetEvent)}
                      className="h-8 px-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                    >
                      <option value="custom">Custom Distance</option>
                      <option value="5k">5K (5.0 km / 3.1 mi)</option>
                      <option value="10k">10K (10.0 km / 6.2 mi)</option>
                      <option value="half_marathon">Half Marathon (13.1 mi)</option>
                      <option value="marathon">Marathon (26.2 mi)</option>
                      <option value="1500m">1,500 meters</option>
                      <option value="1mile">1 Mile</option>
                      <option value="800m">800 meters</option>
                      <option value="400m">400 meters</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Time Input */}
                  <div className={`p-3 rounded-xl border ${calcMode === "calculate_time" ? "bg-blue-50/50 border-blue-200" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"}`}>
                    <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5 block">Time (hh:mm:ss)</Label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <Input type="number" min={0} placeholder="hh" value={timeHours} onChange={(e) => setTimeHours(Number(e.target.value))} className="text-xs font-sans tabular-nums font-bold" readOnly={calcMode === "calculate_time"} />
                      <Input type="number" min={0} max={59} placeholder="mm" value={timeMinutes} onChange={(e) => setTimeMinutes(Number(e.target.value))} className="text-xs font-sans tabular-nums font-bold" readOnly={calcMode === "calculate_time"} />
                      <Input type="number" min={0} max={59} placeholder="ss" value={timeSeconds} onChange={(e) => setTimeSeconds(Number(e.target.value))} className="text-xs font-sans tabular-nums font-bold" readOnly={calcMode === "calculate_time"} />
                    </div>
                  </div>

                  {/* Distance Input */}
                  <div className={`p-3 rounded-xl border ${calcMode === "calculate_distance" ? "bg-blue-50/50 border-blue-200" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"}`}>
                    <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5 block">Distance</Label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <Input
                        type="number"
                        step={0.01}
                        min={0.01}
                        value={calcMode === "calculate_distance" ? convertValue(result.totalDistanceMeters, "meters", distanceUnit) : distanceValue}
                        onChange={(e) => {
                          setDistanceValue(Number(e.target.value));
                          setPresetEvent("custom");
                        }}
                        className="text-xs font-sans tabular-nums font-bold"
                        readOnly={calcMode === "calculate_distance"}
                      />
                      <select
                        value={distanceUnit}
                        onChange={(e) => handleDistanceUnitChange(e.target.value as DistanceUnit)}
                        className="h-10 px-2 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                      >
                        <option value="km">Kilometers</option>
                        <option value="miles">Miles</option>
                        <option value="meters">Meters</option>
                        <option value="yards">Yards</option>
                      </select>
                    </div>
                  </div>

                  {/* Pace Input */}
                  <div className={`p-3 rounded-xl border ${calcMode === "calculate_pace" ? "bg-blue-50/50 border-blue-200" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"}`}>
                    <Label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5 block">Pace (mm:ss)</Label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <Input type="number" min={0} placeholder="mm" value={paceMinutes} onChange={(e) => setPaceMinutes(Number(e.target.value))} className="text-xs font-sans tabular-nums font-bold" readOnly={calcMode === "calculate_pace"} />
                      <Input type="number" min={0} max={59} placeholder="ss" value={paceSeconds} onChange={(e) => setPaceSeconds(Number(e.target.value))} className="text-xs font-sans tabular-nums font-bold" readOnly={calcMode === "calculate_pace"} />
                      <select value={paceUnit} onChange={(e) => setPaceUnit(e.target.value as PaceUnit)} className="h-10 px-1 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-semibold" disabled={calcMode === "calculate_pace"}>
                        <option value="min_km">/ km</option>
                        <option value="min_mile">/ mile</option>
                      </select>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* TAB 2: MULTIPOINT SEGMENT SPLITS TOOL */}
              <TabsContent value="splits" className="space-y-4 m-0">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-zinc-800">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase">Multipoint Segment Split Entry (Up to 12 Legs)</h4>
                    <p className="text-[11px] text-zinc-500">Calculate segment pace per lap and overall cumulative performance</p>
                  </div>
                  <Button size="sm" onClick={handleAddSegment} disabled={splitSegments.length >= 12} className="bg-emerald-600 text-white text-xs gap-1">
                    <Plus className="w-3.5 h-3.5" /> Add Leg Split
                  </Button>
                </div>

                <div className="space-y-2">
                  {splitSegments.map((s, idx) => (
                    <div key={s.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center p-2.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs">
                      <span className="sm:col-span-1 font-bold text-zinc-500">Leg #{idx + 1}</span>

                      <div className="sm:col-span-4 flex items-center gap-1">
                        <Input type="number" step={0.1} min={0.1} value={s.distanceValue} onChange={(e) => handleUpdateSegment(s.id, "distanceValue", Number(e.target.value))} className="h-8 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900" />
                        <select value={s.distanceUnit} onChange={(e) => handleUpdateSegment(s.id, "distanceUnit", e.target.value)} className="h-8 px-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs">
                          <option value="km">km</option>
                          <option value="miles">mi</option>
                          <option value="meters">m</option>
                        </select>
                      </div>

                      <div className="sm:col-span-5 flex items-center gap-1">
                        <Input type="number" min={0} placeholder="hh" value={s.timeHours} onChange={(e) => handleUpdateSegment(s.id, "timeHours", Number(e.target.value))} className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900" />
                        <span>:</span>
                        <Input type="number" min={0} max={59} placeholder="mm" value={s.timeMinutes} onChange={(e) => handleUpdateSegment(s.id, "timeMinutes", Number(e.target.value))} className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900" />
                        <span>:</span>
                        <Input type="number" min={0} max={59} placeholder="ss" value={s.timeSeconds} onChange={(e) => handleUpdateSegment(s.id, "timeSeconds", Number(e.target.value))} className="h-8 text-xs font-sans tabular-nums bg-white dark:bg-zinc-900" />
                      </div>

                      <div className="sm:col-span-2 flex justify-end">
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveSegment(s.id)} disabled={splitSegments.length <= 1} className="h-8 w-8 p-0 text-rose-500 hover:bg-rose-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/40 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-emerald-800 dark:text-emerald-300 font-bold block">Cumulative Totals:</span>
                    <span className="text-emerald-700 dark:text-emerald-400">{multipointResult.cumulativeDistanceKm} km ({multipointResult.cumulativeDistanceMiles} mi) in {multipointResult.cumulativeTimeFormatted}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-800 dark:text-emerald-300 font-bold block">Average Pace:</span>
                    <span className="font-sans tabular-nums text-emerald-700 dark:text-emerald-400 font-bold">{multipointResult.overallAveragePacePerKmFormatted} /km ({multipointResult.overallAveragePacePerMileFormatted} /mi)</span>
                  </div>
                </div>

                <SegmentSplitsBarChart segments={multipointResult.segments} />
              </TabsContent>

              {/* TAB 3: CONVERTER */}
              <TabsContent value="converter" className="space-y-4 m-0">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase">Pace &amp; Speed Unit Conversion Matrix</h4>
                    <p className="text-[11px] text-zinc-500">Instant equivalencies calculated from current input ({result.pacePerMileFormatted} /mi = {result.pacePerKmFormatted} /km)</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-500 text-[10px] block font-semibold uppercase tracking-wider">Pace / Mile</span>
                      <strong className="text-xl font-black text-blue-600 dark:text-blue-400 block mt-1">{result.pacePerMileFormatted}</strong>
                      <span className="text-[10px] text-zinc-400 block mt-0.5">min / mile</span>
                    </div>

                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-500 text-[10px] block font-semibold uppercase tracking-wider">Pace / Kilometer</span>
                      <strong className="text-xl font-black text-emerald-600 dark:text-emerald-400 block mt-1">{result.pacePerKmFormatted}</strong>
                      <span className="text-[10px] text-zinc-400 block mt-0.5">min / km</span>
                    </div>

                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-500 text-[10px] block font-semibold uppercase tracking-wider">Speed (mph)</span>
                      <strong className="text-xl font-black text-purple-600 dark:text-purple-400 block mt-1">{result.speedMph}</strong>
                      <span className="text-[10px] text-zinc-400 block mt-0.5">miles per hour</span>
                    </div>

                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-500 text-[10px] block font-semibold uppercase tracking-wider">Speed (km/h)</span>
                      <strong className="text-xl font-black text-amber-600 dark:text-amber-400 block mt-1">{result.speedKmh}</strong>
                      <span className="text-[10px] text-zinc-400 block mt-0.5">km per hour</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center text-xs pt-1 border-t border-zinc-200/60 dark:border-zinc-800">
                    <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-500 text-[10px] block font-semibold">400m Track Lap</span>
                      <strong className="text-sm font-bold text-zinc-800 dark:text-zinc-200 block mt-0.5">{result.pace400mFormatted}</strong>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-500 text-[10px] block font-semibold">100m Dash Split</span>
                      <strong className="text-sm font-bold text-zinc-800 dark:text-zinc-200 block mt-0.5">{result.pace100mFormatted}</strong>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-500 text-[10px] block font-semibold">Velocity (m/s)</span>
                      <strong className="text-sm font-bold text-zinc-800 dark:text-zinc-200 block mt-0.5">{result.speedMs} m/s</strong>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* TAB 4: RIEGEL PREDICTOR */}
              <TabsContent value="riegel" className="space-y-4 m-0">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-4 text-xs">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase">Peter Riegel's Race Finish Time Predictor</h4>
                    <p className="text-zinc-500 mt-0.5">
                      Predicts finish times across standard race distances using Riegel's formula: <code className="font-sans tabular-nums text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">T₂ = T₁ × (D₂ / D₁)^1.06</code> based on baseline ({result.totalDistanceKm} km in {result.totalTimeFormatted}):
                    </p>
                  </div>

                  {/* Riegel Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {result.riegelPredictions.map((r, idx) => (
                      <div key={idx} className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1.5 text-center shadow-xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 block px-2 py-0.5 bg-blue-50 dark:bg-blue-950/60 rounded-full">
                          {r.eventName}
                        </span>
                        <strong className="text-xl font-black text-zinc-900 dark:text-zinc-100 block tracking-tight">
                          {r.predictedTimeFormatted}
                        </strong>
                        <div className="pt-1 border-t border-zinc-100 dark:border-zinc-800/80 text-[10px] text-zinc-500 space-y-0.5">
                          <div>Req. Pace: <span className="font-sans tabular-nums font-bold text-zinc-700 dark:text-zinc-300">{r.predictedPacePerMileFormatted} /mi</span></div>
                          <div>Req. Pace: <span className="font-sans tabular-nums font-bold text-emerald-600 dark:text-emerald-400">{r.predictedPacePerKmFormatted} /km</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* TAB 5: HEART RATE ZONES */}
              <TabsContent value="hr_zones" className="space-y-4 m-0">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase">Heart Rate Training Zones Calculator</h4>
                      <p className="text-[11px] text-zinc-500">Fox &amp; Haskell (220 - Age) &amp; Tanaka (208 - 0.7 × Age) formulas</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-xs font-semibold">Subject Age:</Label>
                      <Input type="number" min={10} max={90} value={age} onChange={(e) => setAge(Math.max(10, Math.min(90, Number(e.target.value) || 30)))} className="w-16 h-8 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
                    {result.hrZones.map((z) => (
                      <div key={z.zoneNumber} className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-1">
                        <span className="text-[10px] font-bold uppercase block px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${z.color}20`, color: z.color }}>
                          Zone {z.zoneNumber}
                        </span>
                        <strong className="text-sm font-black text-zinc-900 dark:text-zinc-100 block">{z.minBpm}–{z.maxBpm} bpm</strong>
                        <span className="text-[9px] text-zinc-400 block">{z.percentRange}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

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
            <PaceSpeedometerGauge result={result} />
          </div>

          {/* Result Cards & Method Comparison */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Athletic Performance Summary
                </h4>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                  {result.speedMph} MPH
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Pace / Mile</span>
                  <strong className="text-xl font-black text-blue-600 dark:text-blue-400 block mt-0.5">{result.pacePerMileFormatted}</strong>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Pace / Kilometer</span>
                  <strong className="text-xl font-black text-emerald-600 dark:text-emerald-400 block mt-0.5">{result.pacePerKmFormatted}</strong>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Predicted Marathon</span>
                  <strong className="text-xl font-black text-purple-600 dark:text-purple-400 block mt-0.5">{result.riegelPredictions[3]?.predictedTimeFormatted || "N/A"}</strong>
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block font-semibold">Max Heart Rate</span>
                  <strong className="text-xl font-black text-rose-600 dark:text-rose-400 block mt-0.5">{result.maxHeartRateFox} bpm</strong>
                </div>
              </div>
            </div>

            {/* Auxiliary Tables */}
            <PaceTables result={result} />
          </div>
        </div>
      </div>

      {/* Standalone Printable PDF Report Section */}
      <div id="pace-print-report" className="hidden">
        <div className="p-8 max-w-4xl mx-auto space-y-6 bg-white text-zinc-900 font-sans">
          <div className="border-b-2 border-blue-600 pb-4 flex justify-between items-start">
            <div>
              <div className="text-xs font-black tracking-widest text-blue-700 uppercase">
                CalcPlatform Clinical Athletic &amp; Sports Physiology Lab
              </div>
              <h1 className="text-2xl font-black text-blue-600 mt-1">
                Clinical Athletic Pace &amp; Performance Report
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                Pace/Time/Distance, Riegel Race Predictor &amp; Heart Rate Training Zones
              </p>
            </div>
            <div className="text-right text-xs text-zinc-500">
              <p className="font-bold text-zinc-800" suppressHydrationWarning>Date: {new Date().toLocaleDateString()}</p>
              <p suppressHydrationWarning>Time: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              <p className="font-sans tabular-nums text-[10px] text-zinc-400 mt-1" suppressHydrationWarning>Ref ID: #PACE-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-center">
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Pace / Mile</span>
              <strong className="text-xl font-black text-blue-700 block mt-1">{result.pacePerMileFormatted}</strong>
              <span className="text-[9px] text-zinc-500 block">{result.speedMph} mph</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Pace / Km</span>
              <strong className="text-xl font-black text-emerald-700 block mt-1">{result.pacePerKmFormatted}</strong>
              <span className="text-[9px] text-zinc-500 block">{result.speedKmh} km/h</span>
            </div>
            <div className="p-2 border-r border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Predicted Marathon</span>
              <strong className="text-xl font-black text-purple-700 block mt-1">{result.riegelPredictions[3]?.predictedTimeFormatted}</strong>
              <span className="text-[9px] text-zinc-500 block">Riegel Exponent 1.06</span>
            </div>
            <div className="p-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase block">Max Heart Rate</span>
              <strong className="text-xl font-black text-rose-700 block mt-1">{result.maxHeartRateFox} bpm</strong>
              <span className="text-[9px] text-zinc-500 block">Age {age}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b border-zinc-300 pb-1">
              1. Primary Performance Parameters
            </h3>
            <table className="w-full text-xs text-left border border-zinc-200 border-collapse">
              <tbody>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <td className="p-2 font-bold w-1/4">Total Time:</td>
                  <td className="p-2 w-1/4">{result.totalTimeFormatted}</td>
                  <td className="p-2 font-bold w-1/4">Predicted 5K:</td>
                  <td className="p-2 w-1/4">{result.riegelPredictions[0]?.predictedTimeFormatted}</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="p-2 font-bold">Total Distance:</td>
                  <td className="p-2">{result.totalDistanceKm} km ({result.totalDistanceMiles} mi)</td>
                  <td className="p-2 font-bold">Predicted 10K:</td>
                  <td className="p-2">{result.riegelPredictions[1]?.predictedTimeFormatted}</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="p-2 font-bold">Average Speed:</td>
                  <td className="p-2">{result.speedMph} mph ({result.speedKmh} km/h)</td>
                  <td className="p-2 font-bold">Predicted Half Marathon:</td>
                  <td className="p-2">{result.riegelPredictions[2]?.predictedTimeFormatted}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t border-zinc-300 pt-4 text-[10px] text-zinc-500 space-y-1">
            <p className="font-bold text-zinc-700">Clinical &amp; Athletic Disclaimer:</p>
            <p>
              This report is generated based on standard sports physiology formulas and Riegel's fatigue equation. Environmental factors like heat, humidity, wind, and elevation will alter actual race performance. Consult a certified coach before starting high-intensity Zone 5 protocols.
            </p>
            <p className="text-zinc-400">© CalcPlatform Sports Physiology Lab • All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
