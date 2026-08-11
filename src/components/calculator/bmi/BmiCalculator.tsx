"use client";

import React, { useState, useMemo, useEffect } from "react";
import { calculateBmi, BmiInput, UnitSystem, Gender, BmiResult } from "@/lib/formulas/bmi";
import {
  BmiArchGauge,
  BmiScaleMeter,
  WeightPositionIndicator,
  AdultBmiHeightWeightChart,
  ChildBmiPercentileChart,
} from "./BmiCharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Activity, Copy, Share2, Printer, Bookmark, Trash2, Check, RefreshCw, Flame, Target, Sparkles, AlertCircle, Heart, Scale } from "lucide-react";

export function BmiCalculator() {
  // Unit System
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");

  // Input states
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<Gender>("male");

  // US inputs
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(160);

  // Metric inputs
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(72.5);

  // Other units inputs
  const [otherHeightType, setOtherHeightType] = useState<"meters" | "inches" | "feet">("meters");
  const [otherHeightValue, setOtherHeightValue] = useState<number>(1.78);
  const [otherWeightType, setOtherWeightType] = useState<"kg" | "lbs">("kg");
  const [otherWeightValue, setOtherWeightValue] = useState<number>(72.5);

  // Advanced features state
  const [activityLevel, setActivityLevel] = useState<BmiInput["activityLevel"]>("sedentary");
  const [targetBmi, setTargetBmi] = useState<number>(22.5);

  // UI state
  const [copied, setCopied] = useState(false);
  const [savedHistory, setSavedHistory] = useState<Array<{ timestamp: string; bmi: number; category: string; weight: string }>>([]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bmi_calculator_history");
      if (stored) {
        setSavedHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Sync inputs on unit switch
  const handleUnitSystemChange = (system: UnitSystem) => {
    setUnitSystem(system);
  };

  // Live calculation result
  const result: BmiResult = useMemo(() => {
    const inputObj: BmiInput = {
      unitSystem,
      age,
      gender,
      heightFeet,
      heightInches,
      weightLbs,
      heightCm,
      weightKg,
      activityLevel,
      targetBmi,
    };

    if (unitSystem === "other") {
      if (otherHeightType === "meters") inputObj.heightMeters = otherHeightValue;
      if (otherHeightType === "inches") inputObj.heightOnlyInches = otherHeightValue;
      if (otherHeightType === "feet") inputObj.heightOnlyFeet = otherHeightValue;

      if (otherWeightType === "kg") inputObj.weightKg = otherWeightValue;
      if (otherWeightType === "lbs") inputObj.weightLbs = otherWeightValue;
    }

    return calculateBmi(inputObj);
  }, [
    unitSystem,
    age,
    gender,
    heightFeet,
    heightInches,
    weightLbs,
    heightCm,
    weightKg,
    otherHeightType,
    otherHeightValue,
    otherWeightType,
    otherWeightValue,
    activityLevel,
    targetBmi,
  ]);

  // Action Handlers
  const handleCopyResults = () => {
    const text = `My BMI: ${result.bmi} (${result.category})\nHealthy Weight Range: ${result.healthyWeightRangeLbs[0]} - ${result.healthyWeightRangeLbs[1]} lbs\nBMI Prime: ${result.bmiPrime}\nPonderal Index: ${result.ponderalIndexMetric} kg/m³\nCalculated on BMI Calculator Platform`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My BMI Result",
        text: `My Body Mass Index is ${result.bmi} (${result.category}). Check your BMI score online!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopyResults();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveResult = () => {
    const newEntry = {
      timestamp: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      bmi: result.bmi,
      category: result.category,
      weight: `${result.weightLbs} lbs (${result.weightKg} kg)`,
    };
    const updated = [newEntry, ...savedHistory.slice(0, 9)];
    setSavedHistory(updated);
    try {
      localStorage.setItem("bmi_calculator_history", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearHistory = () => {
    setSavedHistory([]);
    try {
      localStorage.removeItem("bmi_calculator_history");
    } catch (e) {}
  };

  const handleReset = () => {
    setAge(25);
    setGender("male");
    setHeightFeet(5);
    setHeightInches(10);
    setWeightLbs(160);
    setHeightCm(178);
    setWeightKg(72.5);
    setOtherHeightValue(1.78);
    setOtherWeightValue(72.5);
    setTargetBmi(22.5);
  };

  return (
    <div className="space-y-6">
      {/* Interactive Main Calculator Card */}
      <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm">
        <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                Body Mass Index (BMI) Calculator
              </CardTitle>
              <CardDescription className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1">
                Enter your physical details for instant WHO &amp; CDC clinical assessment
              </CardDescription>
            </div>

            {/* Reset button */}
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
                Other Units (m, in, ft)
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
                <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                  Biological Gender
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all border ${
                      gender === "male"
                        ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800 shadow-sm"
                        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all border ${
                      gender === "female"
                        ? "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 shadow-sm"
                        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    Female
                  </button>
                </div>
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
                    <div>
                      <Input
                        type="number"
                        min={1}
                        max={8}
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(Number(e.target.value))}
                        className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                      />
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 block">feet</span>
                    </div>
                    <div>
                      <Input
                        type="number"
                        min={0}
                        max={11}
                        value={heightInches}
                        onChange={(e) => setHeightInches(Number(e.target.value))}
                        className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                      />
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 block">inches</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                    Weight (Pounds - lbs)
                  </Label>
                  <Input
                    type="number"
                    min={30}
                    max={800}
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                  />
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 block">pounds (lbs)</span>
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
                  <Input
                    type="number"
                    min={50}
                    max={250}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                  />
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 block">cm (e.g. 175 cm)</span>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                    Weight (Kilograms - kg)
                  </Label>
                  <Input
                    type="number"
                    min={15}
                    max={350}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
                  />
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 block">kg (e.g. 70 kg)</span>
                </div>
              </div>
            </TabsContent>

            {/* OTHER UNITS INPUTS */}
            <TabsContent value="other" className="space-y-4 m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                    Height Dimension
                  </Label>
                  <div className="flex gap-2">
                    <select
                      value={otherHeightType}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setOtherHeightType(e.target.value as any)}
                      className="w-32 px-2 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="meters">Meters (m)</option>
                      <option value="inches">Inches (in)</option>
                      <option value="feet">Feet (ft)</option>
                    </select>
                    <Input
                      type="number"
                      step={0.01}
                      value={otherHeightValue}
                      onChange={(e) => setOtherHeightValue(Number(e.target.value))}
                      className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                    Weight Dimension
                  </Label>
                  <div className="flex gap-2">
                    <select
                      value={otherWeightType}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setOtherWeightType(e.target.value as any)}
                      className="w-32 px-2 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="kg">Kg</option>
                      <option value="lbs">Lbs</option>
                    </select>
                    <Input
                      type="number"
                      step={0.1}
                      value={otherWeightValue}
                      onChange={(e) => setOtherWeightValue(Number(e.target.value))}
                      className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Interactive Results Dashboard Section */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
            {/* Top Gauges & Hero Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Gauge Column (Col 5) */}
              <div className="lg:col-span-5 space-y-4">
                <BmiArchGauge result={result} />
              </div>

              {/* Right Hero Breakdown Column (Col 7) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Hero Stat Box */}
                <div className="p-5 bg-zinc-50 dark:bg-zinc-950/80 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between h-full space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Calculated Body Mass Index</span>
                      <div className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-100 mt-1 flex items-baseline gap-2">
                        {result.bmi}
                        <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">kg/m²</span>
                      </div>
                    </div>

                    <Badge className={`text-xs sm:text-sm font-bold px-3 py-1 border ${result.badgeClass}`}>
                      {result.category}
                    </Badge>
                  </div>

                  {/* Healthy range bar */}
                  <WeightPositionIndicator result={result} />

                  {/* Health Risk Guidance alert */}
                  <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-start gap-2.5 shadow-sm">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-zinc-800 dark:text-zinc-200 block">{result.healthRisk} Assessment</strong>
                      <span className="text-zinc-600 dark:text-zinc-400">{result.healthRiskDescription}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Linear Scale & Child CDC Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BmiScaleMeter result={result} />
              {result.isChild ? (
                <ChildBmiPercentileChart result={result} />
              ) : (
                <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                  <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Anthropometric Indices</h4>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="p-2.5 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-500 dark:text-zinc-400 block text-[10px]">BMI Prime Index</span>
                      <strong className="text-sky-700 dark:text-sky-400 text-sm font-bold">{result.bmiPrime}</strong>
                      <span className="text-[10px] text-zinc-500 block mt-0.5">&lt; 1.0 is healthy</span>
                    </div>
                    <div className="p-2.5 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-500 dark:text-zinc-400 block text-[10px]">Ponderal Index</span>
                      <strong className="text-indigo-700 dark:text-indigo-400 text-sm font-bold">{result.ponderalIndexMetric} kg/m³</strong>
                      <span className="text-[10px] text-zinc-500 block mt-0.5">({result.ponderalIndexImperial} in/lb⅓)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contour Heatmap Chart */}
            <AdultBmiHeightWeightChart result={result} />

            {/* ADVANCED HEALTH PANELS (Ideal Weight, BFP, Calories, Goal Planner) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Ideal Body Weight Breakdown Panel */}
              <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  Ideal Weight Formulas
                </div>
                <div className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                  <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                    <span className="text-zinc-500 dark:text-zinc-400">Devine Formula (1974):</span>
                    <span className="font-semibold">{result.idealWeight.devineLbs} lbs ({result.idealWeight.devineKg} kg)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                    <span className="text-zinc-500 dark:text-zinc-400">Robinson Formula (1983):</span>
                    <span className="font-semibold">{result.idealWeight.robinsonLbs} lbs ({result.idealWeight.robinsonKg} kg)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                    <span className="text-zinc-500 dark:text-zinc-400">Miller Formula (1983):</span>
                    <span className="font-semibold">{result.idealWeight.millerLbs} lbs ({result.idealWeight.millerKg} kg)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800/60">
                    <span className="text-zinc-500 dark:text-zinc-400">Hamwi Formula (1964):</span>
                    <span className="font-semibold">{result.idealWeight.hamwiLbs} lbs ({result.idealWeight.hamwiKg} kg)</span>
                  </div>
                  <div className="flex justify-between pt-1 font-bold text-emerald-700 dark:text-emerald-400">
                    <span>Clinical Average:</span>
                    <span>{result.idealWeight.averageLbs} lbs ({result.idealWeight.averageKg} kg)</span>
                  </div>
                </div>
              </div>

              {/* Body Fat & Metabolism Panel */}
              <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400 font-bold text-xs uppercase tracking-wider">
                  <Flame className="w-4 h-4" />
                  Body Fat &amp; Calories
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-zinc-50 dark:bg-zinc-950 rounded-lg flex justify-between items-center border border-zinc-200/80 dark:border-zinc-800">
                    <span className="text-zinc-500 dark:text-zinc-400">Est. Body Fat (Deurenberg):</span>
                    <strong className="text-sky-700 dark:text-sky-300 font-bold">{result.bodyFatPercentage}%</strong>
                  </div>
                  <div className="p-2 bg-zinc-50 dark:bg-zinc-950 rounded-lg flex justify-between items-center border border-zinc-200/80 dark:border-zinc-800">
                    <span className="text-zinc-500 dark:text-zinc-400">BMR (Resting Energy):</span>
                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{result.bmr} kcal/day</strong>
                  </div>
                  <div>
                    <Label className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-1 block">Activity Level for TDEE:</Label>
                    <select
                      value={activityLevel}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setActivityLevel(e.target.value as any)}
                      className="w-full px-2 py-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="sedentary">Sedentary (Little to no exercise)</option>
                      <option value="light">Lightly Active (1-3 days/week)</option>
                      <option value="moderate">Moderately Active (3-5 days/week)</option>
                      <option value="active">Very Active (6-7 days/week)</option>
                      <option value="very_active">Extra Active (Hard training)</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-amber-700 dark:text-amber-400 pt-1">
                    <span>Maintenance Calories:</span>
                    <span>{result.tdee} kcal/day</span>
                  </div>
                </div>
              </div>

              {/* Healthy BMI Goal Planner Panel */}
              <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold text-xs uppercase tracking-wider">
                  <Target className="w-4 h-4" />
                  Target Weight Goal Planner
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <Label className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-1 block">Desired Goal BMI:</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="number"
                        step={0.5}
                        min={18.5}
                        max={24.9}
                        value={targetBmi}
                        onChange={(e) => setTargetBmi(Number(e.target.value))}
                        className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-xs h-8 w-24 text-center font-bold text-zinc-900 dark:text-zinc-100"
                      />
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400">(Healthy: 18.5 – 24.9)</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-zinc-50 dark:bg-zinc-950 rounded-lg space-y-1 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-800">
                    <div className="flex justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">Target Weight:</span>
                      <strong className="text-purple-700 dark:text-purple-300">{result.goalPlanner.targetWeightLbs} lbs ({result.goalPlanner.targetWeightKg} kg)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">Weight to Change:</span>
                      <strong className={result.goalPlanner.weightDeltaLbs > 0 ? "text-amber-700 dark:text-amber-400" : "text-sky-700 dark:text-sky-400"}>
                        {Math.abs(result.goalPlanner.weightDeltaLbs)} lbs
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">Est. Timeline (0.5 kg/wk):</span>
                      <strong className="text-emerald-700 dark:text-emerald-400">{result.goalPlanner.weeksToGoal} weeks</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BAR: Save, Copy, Share, Print */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleSaveResult}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 shadow-sm"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  Save Result
                </Button>
                <Button
                  onClick={handleCopyResults}
                  variant="outline"
                  size="sm"
                  className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy Summary"}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Share
                </Button>
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  size="sm"
                  className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Export PDF
                </Button>
              </div>
            </div>

            {/* SAVED HISTORY DRAWER */}
            {savedHistory.length > 0 && (
              <div className="p-4 bg-zinc-50 dark:bg-zinc-950/70 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Bookmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Saved Calculation History
                  </h4>
                  <button
                    onClick={handleClearHistory}
                    className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Clear History
                  </button>
                </div>

                <div className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-xs">
                  {savedHistory.map((item, idx) => (
                    <div key={idx} className="py-2 flex justify-between items-center text-zinc-700 dark:text-zinc-300">
                      <div>
                        <strong className="text-zinc-900 dark:text-zinc-100">{item.bmi} BMI</strong> ({item.category})
                        <span className="text-zinc-500 block text-[10px]">{item.timestamp}</span>
                      </div>
                      <span className="font-mono text-zinc-600 dark:text-zinc-400">{item.weight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
